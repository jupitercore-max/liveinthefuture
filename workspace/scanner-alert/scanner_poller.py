#!/usr/bin/env python3
"""
Scanner Alert Poller
Polls Firebase RTDB scanner/calls for new entries.
Checks transcripts for security keywords and writes alerts.
Designed to run via cron every 5 minutes.
"""

import json
import re
import os
import sys
import urllib.request
from datetime import datetime

FIREBASE_URL = "https://rayhenet-default-rtdb.firebaseio.com/scanner/calls.json"
STATE_FILE = os.path.expanduser("~/workspace/scanner-alert/state.json")
ALERT_FILE = os.path.expanduser("~/workspace/scanner-alert/pending_alerts.json")
LOG_FILE = os.path.expanduser("~/workspace/scanner-alert/poller.log")

# Keywords that trigger alerts
HIGH_PRIORITY = [
    r'\bstolen\b', r'\bburglary\b', r'\bburglaries\b', r'\bbreaking\s+and\s+entering\b',
    r'\bb\s*&\s*e\b', r'\bbreak[\s-]?in\b', r'\bhot\s+plate\b',
    r'\bstolen\s+(vehicle|car|plate|license)\b',
    r'\barmed\b', r'\bgunshot\b', r'\bshots?\s+fired\b', r'\brobbery\b',
    r'\bcarjack\b', r'\bhome\s+invasion\b',
    r'\b459\b', r'\b211\b', r'\b10-?851\b', r'\b484\b',
]

MEDIUM_PRIORITY = [
    r'\bsuspicious\b', r'\bprowler\b', r'\btrespass\b', r'\bvandal\b',
    r'\bpackage\s+theft\b', r'\bcatalytic\b', r'\balarm\b',
    r'\b602\b', r'\b594\b',
    r'\bmenlo\s*park\b', r'\batherton\b', r'\bpalo\s*alto\b',
    r'\bcolby\b', r'\bmenlo\s*oaks\b', r'\bwoodside\b',
]

os.makedirs(os.path.dirname(STATE_FILE), exist_ok=True)


def log(msg):
    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    line = f"[{ts}] {msg}"
    print(line, flush=True)
    with open(LOG_FILE, "a") as f:
        f.write(line + "\n")


def load_state():
    try:
        with open(STATE_FILE) as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return {"last_seen_keys": [], "last_poll": None}


def save_state(state):
    state["last_poll"] = datetime.now().isoformat()
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=2)


def check_keywords(text):
    if not text:
        return None, []
    text_lower = text.lower()

    high_matches = [p for p in HIGH_PRIORITY if re.search(p, text_lower)]
    if high_matches:
        return "HIGH", high_matches

    med_matches = [p for p in MEDIUM_PRIORITY if re.search(p, text_lower)]
    if med_matches:
        return "MEDIUM", med_matches

    return None, []


def fetch_calls():
    """Fetch all current calls from Firebase."""
    try:
        req = urllib.request.Request(FIREBASE_URL)
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = json.loads(resp.read().decode())
            return data if isinstance(data, dict) else {}
    except Exception as e:
        log(f"Fetch error: {e}")
        return {}


def main():
    state = load_state()
    seen_keys = set(state.get("last_seen_keys", []))

    calls = fetch_calls()
    if not calls:
        log("No calls in Firebase. Pipeline may not be running.")
        save_state(state)
        return

    new_calls = {k: v for k, v in calls.items() if k not in seen_keys}
    log(f"Fetched {len(calls)} calls, {len(new_calls)} new")

    alerts = []
    for key, call in new_calls.items():
        if not isinstance(call, dict):
            continue

        transcript = call.get("transcript", "")
        priority, matches = check_keywords(transcript)

        if priority:
            tag = call.get("talkgroup_tag", f"TG {call.get('talkgroup', '?')}")
            alert = {
                "key": key,
                "timestamp": datetime.now().isoformat(),
                "priority": priority,
                "matches": [str(m) for m in matches],
                "talkgroup_tag": tag,
                "transcript": transcript,
                "start_time": call.get("start_time", ""),
                "audio_url": call.get("audio_url", call.get("url", "")),
            }
            alerts.append(alert)
            log(f"🚨 {priority}: [{tag}] {transcript[:100]}")

    # Write pending alerts for heartbeat to pick up
    if alerts:
        existing = []
        try:
            with open(ALERT_FILE) as f:
                existing = json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            pass

        existing.extend(alerts)
        with open(ALERT_FILE, "w") as f:
            json.dump(existing, f, indent=2)

        log(f"Wrote {len(alerts)} new alerts ({len(existing)} total pending)")

    # Update state with all current keys
    state["last_seen_keys"] = list(calls.keys())[-500:]  # keep last 500 to avoid unbounded growth
    save_state(state)


if __name__ == "__main__":
    main()

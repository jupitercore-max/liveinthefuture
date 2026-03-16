#!/usr/bin/env python3
"""
Scanner Alert Listener
Subscribes to Firebase RTDB scanner/calls via SSE.
Filters for security-relevant keywords and notifies via file-based IPC.
"""

import json
import re
import sys
import time
import urllib.request
import os
from datetime import datetime

FIREBASE_URL = "https://rayhenet-default-rtdb.firebaseio.com/scanner/calls.json"
ALERT_DIR = os.path.expanduser("~/workspace/scanner-alert/alerts")
LOG_FILE = os.path.expanduser("~/workspace/scanner-alert/scanner.log")

# Keywords that trigger alerts - grouped by severity
HIGH_PRIORITY = [
    r'\bstolen\b', r'\bburglary\b', r'\bburglaries\b', r'\bbreaking\s+and\s+entering\b',
    r'\bb\s*&\s*e\b', r'\bbreak[\s-]?in\b', r'\bhot\s+plate\b', r'\bstolen\s+(vehicle|car|plate|license)\b',
    r'\barmed\b', r'\bgunshot\b', r'\bshots?\s+fired\b', r'\brobbery\b',
    r'\bcarjack\b', r'\bhome\s+invasion\b', r'\bsuspect\s+in\s+custody\b',
    r'\b459\b',  # CA penal code for burglary
    r'\b211\b',  # robbery
    r'\b10-?851\b',  # stolen vehicle
    r'\b484\b',  # theft/larceny
]

MEDIUM_PRIORITY = [
    r'\bsuspicious\b', r'\bprowler\b', r'\btrespass\b', r'\bvandal\b',
    r'\bpackage\s+theft\b', r'\bporch\s+pirate\b', r'\bcatalytic\b',
    r'\bgarage\b.*\bopen\b', r'\balarm\b', r'\bpedestrian\s+stop\b',
    r'\b602\b',  # trespass
    r'\b594\b',  # vandalism
    r'\bmenlo\s*park\b', r'\batherton\b', r'\bpalo\s*alto\b',
    r'\bcolby\b', r'\bmenlo\s*oaks\b',
]

os.makedirs(ALERT_DIR, exist_ok=True)


def log(msg):
    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    line = f"[{ts}] {msg}"
    print(line, flush=True)
    try:
        with open(LOG_FILE, "a") as f:
            f.write(line + "\n")
    except Exception:
        pass


def check_keywords(text):
    """Check transcript against keyword lists. Returns (priority, matches)."""
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


def write_alert(call_data, priority, matches):
    """Write alert to file for the cron/heartbeat to pick up."""
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    alert_file = os.path.join(ALERT_DIR, f"{priority.lower()}_{ts}.json")

    alert = {
        "timestamp": datetime.now().isoformat(),
        "priority": priority,
        "matches": [str(m) for m in matches],
        "talkgroup": call_data.get("talkgroup", "unknown"),
        "talkgroup_tag": call_data.get("talkgroup_tag", "unknown"),
        "transcript": call_data.get("transcript", ""),
        "start_time": call_data.get("start_time", ""),
        "freq": call_data.get("freq", ""),
        "audio_url": call_data.get("audio_url", call_data.get("url", "")),
        "notified": False,
    }

    with open(alert_file, "w") as f:
        json.dump(alert, f, indent=2)

    log(f"🚨 {priority} ALERT written: {alert_file}")
    return alert_file


def process_call(call_data):
    """Process a single scanner call."""
    if not isinstance(call_data, dict):
        return

    transcript = call_data.get("transcript", "")
    tag = call_data.get("talkgroup_tag", f"TG {call_data.get('talkgroup', '?')}")

    if transcript:
        log(f"[{tag}] {transcript[:120]}")

    priority, matches = check_keywords(transcript)
    if priority:
        write_alert(call_data, priority, matches)


def listen_sse():
    """Connect to Firebase SSE stream and process events."""
    log("Connecting to Firebase SSE stream...")

    req = urllib.request.Request(
        FIREBASE_URL,
        headers={
            "Accept": "text/event-stream",
            "Cache-Control": "no-cache",
        }
    )

    while True:
        try:
            with urllib.request.urlopen(req, timeout=300) as resp:
                log("Connected. Listening for scanner calls...")
                event_type = None
                data_buf = []

                for raw_line in resp:
                    line = raw_line.decode("utf-8").strip()

                    if line.startswith("event:"):
                        event_type = line[6:].strip()
                        data_buf = []
                    elif line.startswith("data:"):
                        data_buf.append(line[5:].strip())
                    elif line == "" and event_type and data_buf:
                        # End of event
                        full_data = "".join(data_buf)
                        try:
                            payload = json.loads(full_data)
                        except json.JSONDecodeError:
                            event_type = None
                            data_buf = []
                            continue

                        if event_type == "put":
                            path = payload.get("path", "/")
                            data = payload.get("data")

                            if data is None:
                                pass  # deletion
                            elif path == "/" and isinstance(data, dict):
                                # Initial dump or bulk update
                                for key, call in data.items():
                                    process_call(call)
                            elif isinstance(data, dict) and "transcript" in data:
                                # Single new call
                                process_call(data)
                            elif isinstance(data, dict):
                                # Could be a nested update
                                for key, val in data.items():
                                    if isinstance(val, dict):
                                        process_call(val)

                        elif event_type == "patch":
                            data = payload.get("data", {})
                            if isinstance(data, dict):
                                for key, val in data.items():
                                    if isinstance(val, dict):
                                        process_call(val)

                        event_type = None
                        data_buf = []

        except KeyboardInterrupt:
            log("Shutting down.")
            sys.exit(0)
        except Exception as e:
            log(f"Connection error: {e}. Reconnecting in 10s...")
            time.sleep(10)


if __name__ == "__main__":
    log("Scanner Alert Listener starting...")
    log(f"Monitoring: {FIREBASE_URL}")
    log(f"Alerts dir: {ALERT_DIR}")
    listen_sse()

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

RESEND_API_KEY = "re_6xFJoFPt_8s3YZRGZiTvYp96pa7jyLkuX"
ALERT_EMAIL = "rayche@gmail.com"
FROM_EMAIL = "scanner@liveinthefuture.org"

FIREBASE_URL = "https://rayhenet-default-rtdb.firebaseio.com/scanner/calls.json"
STATE_FILE = os.path.expanduser("~/workspace/scanner-alert/state.json")
ALERT_FILE = os.path.expanduser("~/workspace/scanner-alert/pending_alerts.json")
LOG_FILE = os.path.expanduser("~/workspace/scanner-alert/poller.log")

# Keywords that trigger alerts
HIGH_PRIORITY = [
    r'\bstolen\b', r'\bburglary\b', r'\bburglaries\b', r'\bbreaking\s+and\s+entering\b',
    r'\bb\s*&\s*e\b', r'\bbreak[\s-]?in\b', r'\bhot\s+plate\b',
    r'\bstolen\s+(vehicle|car|plate|license)\b', r'\bstolen\s+plate\b',
    r'\bhome\s+invasion\b', r'\bkick\w*\s+in\s+(the\s+)?door\b',
    r'\bforced\s+entry\b', r'\bpried\s+open\b',
    r'\b459\b',  # burglary code
]

MEDIUM_PRIORITY = [
    r'\bsuspicious\b', r'\bprowler\b', r'\btrespass\b', r'\bvandal\b',
    r'\bpackage\s+theft\b', r'\bcatalytic\b',
    r'\barmed\b', r'\bgunshot\b', r'\bshots?\s+fired\b', r'\brobbery\b',
    r'\bcarjack\b',
    r'\b211\b', r'\b602\b', r'\b594\b', r'\b10-?851\b',
]

# ~1 mile radius from Colby Ave & Menlo Oaks Dr, Menlo Park
WITHIN_1_MILE = [
    r'\bcolby\b', r'\bmenlo\s*oaks\b', r'\bsharon\s*(rd|road|heights)?\b',
    r'\baltschul\b', r'\boakdell\b', r'\bringwood\b', r'\bolive\b.*\b(ln|lane)\b',
    r'\bfelton\b', r'\bcloud\b', r'\bavy\b', r'\bcedro\b',
    r'\blindenwood\b', r'\bsherwood\b', r'\bvalparaiso\b',
    r'\balameda\s*(de\s*las\s*pulgas)?\b', r'\bsand\s*hill\b',
    r'\bmanzanita\b', r'\blaurel\b.*\bmenlo\b', r'\bcoleman\b',
    r'\bsharon\s*park\b', r'\bsharon\s*heights\b',
    r'\b(oak|willow)\s*ct\b.*\bmenlo\b',
    r'\bsanta\s*cruz\s*ave\b.*\b(university|johnson|curtis)\b',
]

# ~2 mile radius — includes above plus broader Menlo Park / Atherton / near Woodside
WITHIN_2_MILES = WITHIN_1_MILE + [
    r'\bmenlo\s*park\b', r'\batherton\b',
    r'\bsanta\s*cruz\s*ave\b', r'\bel\s*camino\b.*\bmenlo\b',
    r'\bmiddlefield\b.*\bmenlo\b', r'\bwillow\b.*\bmenlo\b',
    r'\bravenswood\b', r'\bglenwood\b', r'\bfremont\b.*\bmenlo\b',
    r'\bmarket\s*pl\b', r'\bcrane\b.*\bmenlo\b',
    r'\bencinal\b', r'\bfair\s*oaks\b.*\b(menlo|atherton)\b',
    r'\bwoodside\b.*\b(rd|road)\b', r'\balpine\b.*\b(rd|road)\b',
    r'\bstockbridge\b', r'\bbarry\b.*\batherton\b',
    r'\bselby\b', r'\bwalnut\b.*\batherton\b',
    r'\bel\s*camino\b.*\batherton\b', r'\bfletch\w*\b.*\batherton\b',
    r'\bpark\s*ln\b.*\batherton\b', r'\bdinkelspiel\b',
    r'\bmcCormick\b', r'\bpartridge\b.*\batherton\b',
    r'\bmarsh\b.*\bmenlo\b', r'\bhamilton\b.*\bmenlo\b',
    r'\barboretum\b', r'\boak\s*grove\b.*\bmenlo\b',
    r'\buniversity\s*ave\b.*\bmenlo\b', r'\bchestnut\b.*\bmenlo\b',
    r'\blive\s*oak\b.*\bmenlo\b', r'\bhobbs\b', r'\bpark\s*forest\b',
]

# Talkgroups to SKIP entirely (EMS, fire dispatch, medical)
SKIP_TALKGROUPS = [
    r'ems', r'medic', r'ambulance', r'fire\s*dispatch', r'medical',
    r'calfire', r'hospital',
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


def check_keywords(text, talkgroup_tag=""):
    if not text:
        return None, []
    text_lower = text.lower()
    tag_lower = talkgroup_tag.lower()

    # Skip EMS/medical/fire talkgroups entirely
    for skip in SKIP_TALKGROUPS:
        if re.search(skip, tag_lower):
            return None, []

    # Also skip if transcript is clearly medical
    medical_phrases = [r'\bmedic\s*\d', r'\bambulance\b', r'\bpatient\b', r'\bcpr\b',
                       r'\bchest\s*pain\b', r'\bdifficulty\s*breathing\b', r'\bmedical\s*alarm\b',
                       r'\b(?:year|yr)[\s-]*old\s+(?:fe)?male\b.*\b(?:fall|pain|breath|conscious)\b']
    for mp in medical_phrases:
        if re.search(mp, text_lower):
            return None, []

    # Check location proximity
    within_1mi = any(re.search(loc, text_lower) for loc in WITHIN_1_MILE)
    within_2mi = within_1mi or any(re.search(loc, text_lower) for loc in WITHIN_2_MILES)

    # HIGH: break-ins, stolen plates/vehicles, home invasion — only within 1 mile
    high_matches = [p for p in HIGH_PRIORITY if re.search(p, text_lower)]
    if high_matches and within_1mi:
        return "HIGH", high_matches

    # MEDIUM: suspicious, prowler, armed, robbery, etc — within 2 miles
    med_matches = [p for p in MEDIUM_PRIORITY if re.search(p, text_lower)]
    if med_matches and within_2mi:
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


def send_alert_email(alert):
    """Send alert via Resend API."""
    priority = alert["priority"]
    tag = alert["talkgroup_tag"]
    transcript = alert["transcript"]
    matches = ", ".join(alert["matches"])
    timestamp = alert.get("start_time", alert["timestamp"])

    subject = f"🚨 {priority} Scanner Alert: {tag}"
    html = f"""
    <div style="font-family: -apple-system, sans-serif; max-width: 600px;">
        <div style="background: {'#dc2626' if priority == 'HIGH' else '#f59e0b'}; color: white; padding: 12px 16px; border-radius: 8px 8px 0 0;">
            <strong>{priority} PRIORITY</strong> — {tag}
        </div>
        <div style="border: 1px solid #e5e7eb; padding: 16px; border-radius: 0 0 8px 8px;">
            <p style="font-size: 15px; line-height: 1.6; margin: 0 0 12px 0;">{transcript}</p>
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 12px 0;">
            <p style="font-size: 12px; color: #6b7280; margin: 0;">
                <strong>Matched:</strong> {matches}<br>
                <strong>Time:</strong> {timestamp}<br>
                <strong>Source:</strong> OpenMHz → Firebase → Scanner Poller
            </p>
        </div>
    </div>
    """

    payload = json.dumps({
        "from": FROM_EMAIL,
        "to": [ALERT_EMAIL],
        "subject": subject,
        "html": html,
    }).encode()

    req = urllib.request.Request(
        "https://api.resend.com/emails",
        data=payload,
        headers={
            "Authorization": f"Bearer {RESEND_API_KEY}",
            "Content-Type": "application/json",
            "User-Agent": "ScannerAlert/1.0",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            result = json.loads(resp.read().decode())
            log(f"📧 Email sent to {ALERT_EMAIL}: {result.get('id', '?')}")
    except Exception as e:
        log(f"📧 Email failed: {e}")


def main():
    state = load_state()
    seen_keys = set(state.get("last_seen_keys", []))
    # Separate set of keys we've already sent emails for — never email twice
    alerted_keys = set(state.get("alerted_keys", []))

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

        # Skip if we already emailed about this call
        if key in alerted_keys:
            continue

        transcript = call.get("transcript", "")
        tag = call.get("talkgroup_tag", f"TG {call.get('talkgroup', '?')}")
        priority, matches = check_keywords(transcript, tag)

        if priority:
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
            alerted_keys.add(key)
            log(f"🚨 {priority}: [{tag}] {transcript[:100]}")
            send_alert_email(alert)

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

    # Update state with all current keys — keep enough to cover the full call window
    # Use ALL current Firebase keys as the seen set — no truncation
    state["last_seen_keys"] = list(calls.keys())
    # Keep alerted keys forever (they're small) — prevents duplicate emails even if seen_keys rolls over
    state["alerted_keys"] = list(alerted_keys)[-5000:]
    save_state(state)


if __name__ == "__main__":
    main()

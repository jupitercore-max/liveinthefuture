---
id: scanner-poller
enabled: true
mode: task
schedule:
  kind: interval
  timezone: UTC
  at: 2026-03-16T05:05:00Z
  every: 5m
execution:
  target: isolated
---
Poll the scanner for security alerts.

1. Run: `python3 ~/workspace/scanner-alert/scanner_poller.py`
2. Check if `~/workspace/scanner-alert/pending_alerts.json` has any alerts
3. If HIGH priority alerts exist, notify the main agent immediately with `notify_main_agent()` including the transcript and talkgroup
4. If MEDIUM priority alerts exist near Menlo Park/Colby/Menlo Oaks, also notify
5. After notifying, clear the notified alerts from pending_alerts.json

If the poller returns "No calls in Firebase", that's fine — the pipeline on Ray's VM may not be running. Just exit quietly.

---
id: scanner-poller
enabled: true
mode: task
schedule:
  kind: interval
  timezone: UTC
  at: 2026-03-28T23:35:00Z
  every: 30m
delivery:
  - surface: main
  - surface: telegram
    to: '8781372712'
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
Poll the scanner for security alerts. Standalone cron, NOT part of heartbeat.

1. Run: `python3 ~/workspace/scanner-alert/scanner_poller.py`
2. Check if `~/workspace/scanner-alert/pending_alerts.json` has any alerts
3. If HIGH priority alerts exist (stolen plate/vehicle, robbery, burglary, armed, pursuit near Menlo Oaks):
   - Notify main agent IMMEDIATELY with full transcript + talkgroup
   - Send Telegram alert to Ray (chat_id: 8781372712)
4. If MEDIUM priority alerts exist near Menlo Park area, notify main agent
5. After notifying, clear the notified alerts from pending_alerts.json

If the poller returns "No calls in Firebase", exit quietly.

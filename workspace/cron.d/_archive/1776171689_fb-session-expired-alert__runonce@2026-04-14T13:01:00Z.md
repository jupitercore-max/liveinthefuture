---
id: fb-session-expired-alert
enabled: true
mode: task
schedule:
  kind: runonce
  timezone: UTC
  at: 2026-04-14T13:01:00Z
delivery:
  - surface: telegram
    to: '8781372712'
  - surface: main
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
⚠️ Facebook browser session expired — open Remote Browser space and log in again. Watch group monitoring is down until re-auth. (This is especially important during Watches & Wonders week!)

---
id: fb-cookie-alert
enabled: true
mode: task
schedule:
  kind: runonce
  timezone: UTC
  at: 2026-04-14T02:31:00Z
delivery:
  - surface: telegram
    to: '8781372712'
  - surface: main
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
⚠️ Facebook cookies expired — watch group monitoring is down. All 3 Moda groups returning HTTP 400 "Sorry, something went wrong" errors. Paste fresh cookies in config/facebook-cookies.txt

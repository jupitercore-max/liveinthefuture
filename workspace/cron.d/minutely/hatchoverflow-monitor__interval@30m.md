---
id: hatchoverflow-monitor
enabled: true
mode: heartbeat
schedule:
  kind: interval
  timezone: UTC
  at: 2026-03-26T20:30:00Z
  every: 30m
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
Check Hatch Overflow (https://hatchoverflow.suhelsheikh.com) for new posts and activity. Read workspace/hatch-overflow-state.json for API key and last seen state. Browse recent posts, look for interesting threads to learn from or contribute to. If there's something worth engaging with, notify the main agent with what you found and your proposed contribution. Only notify if there's something genuinely interesting — don't spam.

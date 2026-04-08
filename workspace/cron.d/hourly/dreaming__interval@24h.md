---
id: dreaming
enabled: true
mode: task
schedule:
  kind: interval
  timezone: UTC
  at: 2026-01-01T00:00:00Z
  every: 24h
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
Read the Dreaming cron prompt from `/home/hatch/prompts/dreaming.md`.

If that file is empty or contains only whitespace, finish immediately with `nothing_to_report({})`.

This is a scheduled Dreaming run. Follow the Dreaming prompt in scheduled mode.

After a successful scheduled dream, finish with `nothing_to_report({})`.

---
id: sysmon-collect
enabled: true
mode: heartbeat
schedule:
  kind: interval
  timezone: UTC
  at: 2026-04-05T04:50:00Z
  every: 60s
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
Collect system metrics for the System Monitor space. Run: `python3 "$JARVIS_HOME/workspace/spaces/system-monitor/actions/jobs/collect_metrics.py"` and call `nothing_to_report({})`.

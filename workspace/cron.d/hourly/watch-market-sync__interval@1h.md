---
id: watch-market-sync
enabled: true
mode: task
schedule:
  kind: interval
  timezone: UTC
  at: 2026-04-14T17:00:00Z
  every: 1h
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
Refresh the `watch-market` Space database by running:
```
python3 "$JARVIS_HOME/workspace/spaces/watch-market/actions/jobs/sync_listings.py"
```
This syncs `research/watch-price-db.json` into `app.db`, preserving original prices before listings change to SOLD. Finish with `nothing_to_report({})`.

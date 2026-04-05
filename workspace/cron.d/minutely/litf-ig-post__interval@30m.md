---
id: litf-ig-post
enabled: false
mode: heartbeat
schedule:
  kind: interval
  timezone: UTC
  at: 2026-04-05T00:00:00Z
  every: 30m
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
Post the next article from the LITF Instagram queue to @litf.ai.

DISABLED: No valid Instagram Content Publishing API token. The Facebook Ads token (ads_read scope) doesn't have instagram_content_publish permission. instagram-cli is read-only. Only Threads account available is xallthey (Ray's personal), not LITF.

To re-enable: Ray needs to generate an Instagram Graph API token with instagram_content_publish scope for the litf.ai (17841438809671808) account.

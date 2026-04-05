---
id: holiday-ergo-halloween
enabled: true
mode: task
schedule:
  kind: runonce
  timezone: UTC
  at: 2026-10-30T18:00:00Z
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
Write and publish a HALLOWEEN themed ergo article (ergo satirical site, rayhe/ergo). Fires day before so it's live on the holiday. Every fact real/verifiable, conclusions deliberately wrong. Deadpan investigative tone. Zero em dashes. 6-critic panel, 8.5+ to publish. Themes from workspace/ergo/holiday-calendar.json. Deploy with: echo "y" | CLOUDFLARE_API_TOKEN=cfut_DZZGEVoJ3LahoWCnYJHShpoSjJGJUXEixNQfdjic3e3ab97b CLOUDFLARE_ACCOUNT_ID=8e3c98e0066c695c28e22a7c09615b70 npx wrangler pages deploy public --project-name=ergo

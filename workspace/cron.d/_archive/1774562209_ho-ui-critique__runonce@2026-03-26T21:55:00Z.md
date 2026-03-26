---
id: ho-ui-critique
enabled: true
mode: task
schedule:
  kind: runonce
  timezone: UTC
  at: 2026-03-26T21:55:00Z
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
Post the Hatch Overflow UI critique from /tmp/ho-meta-post.json. Run this curl command:

```bash
curl -s -X POST -H "Authorization: Bearer ho_IQRbtHnQ-n03G7Dp4MSVDdNxcaR2bTYTE0Ms7C8vxw0" \
  -H "Content-Type: application/json" \
  https://hatchoverflow.suhelsheikh.com/api/questions \
  -d @/tmp/ho-meta-post.json
```

If it fails due to rate limit, retry. Once posted, notify main agent with the post URL/ID.

---
id: ho-interview-now
enabled: true
mode: task
schedule:
  kind: runonce
  timezone: UTC
  at: 2026-04-03T19:10:00Z
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
Run the first Hatch Overflow interview NOW. Target: Sterling (id: bd1025cd, 89 posts, most prolific member).

1. Read all Sterling's posts from `curl -s "https://hatchoverflow.suhelsheikh.com/api/questions" -H "X-API-Key: ho_IQRbtHnQ-n03G7Dp4MSVDdNxcaR2bTYTE0Ms7C8vxw0"` — filter by author_id "bd1025cd"
2. Analyze their posts to understand personality, projects, technical interests
3. Craft a specific, thoughtful interview question referencing their work
4. Post it: `curl -s -X POST "https://hatchoverflow.suhelsheikh.com/api/questions" -H "X-API-Key: ho_IQRbtHnQ-n03G7Dp4MSVDdNxcaR2bTYTE0Ms7C8vxw0" -H "Content-Type: application/json" -d '{"title":"[Interview] Sterling — ...","body":"..."}'`
5. Update workspace/hatchoverflow/interview-state.json (move Sterling to interviewed, add to weekly_interviews)
6. Create workspace/hatchoverflow/interviews/ directory if needed

Notify main agent with the question posted.

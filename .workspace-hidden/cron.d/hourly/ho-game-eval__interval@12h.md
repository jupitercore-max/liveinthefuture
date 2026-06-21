---
id: ho-game-eval
enabled: true
mode: heartbeat
schedule:
  kind: interval
  timezone: UTC
  at: 2026-04-05T08:30:00Z
  every: 12h
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
Post a game or experience evaluation to Hatch Overflow for community feedback.

## Instructions
1. Read `workspace/hatchoverflow/game-eval-state.json` for the queue and what's been posted
2. Pick the next unposted game or experience from the queue
3. Read the actual game/experience source from `repos/liveinthefuture/games/` or `repos/liveinthefuture/experiences/`
4. Read the EVALUATE.md scoring rubric from `repos/liveinthefuture/`
5. Post a [Game Eval] or [Experience Eval] question to HO asking the community to:
   - Play it at the link (https://liveinthefuture.org/games/{name}.html or /experiences/{name}/)
   - Challenge our score with specific dimension-level pushback
   - Suggest concrete improvements
   - Compare to genre benchmarks
6. Update game-eval-state.json with what was posted and when
7. Check for responses to previously posted evals — if substantive feedback exists, compile it and notify main agent
8. If HO rate-limits you, skip and try next cycle

HO API: POST https://hatchoverflow.suhelsheikh.com/api/questions
Auth: Bearer ho_IQRbtHnQ-n03G7Dp4MSVDdNxcaR2bTYTE0Ms7C8vxw0

Keep posts engaging — "Roast it" energy, not corporate survey energy. Include the playable link, our score, and 3-4 specific questions where we want pushback.

---
id: startup-idea
enabled: true
mode: task
schedule:
  kind: daily
  timezone: UTC
  time: 20:00:00
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
Generate and publish ONE new startup idea to liveinthefuture.org/startups/.

Requirements:
1. Research a genuinely viable business opportunity backed by real market data
2. Include: problem statement, TAM/SAM (real numbers with citations), existing competitors and their gaps, proposed solution, revenue model, estimated startup costs, why now (timing thesis), risks/challenges
3. Generate a hero image (landscape JPEG, 1200x630+)
4. Follow LITF voice rules (no AI slop, max 3 em dashes, check STORY_GUIDE.md banned phrases)
5. Run through 6-critic pipeline, must score 8.5+ to publish
6. Add to startups/index.html grid
7. Update sitemap.xml
8. Git commit, push
9. Verify Cloudflare Pages deployment

The idea should be specific and defensible — a real niche with a clear path to revenue. Not "AI for X" generic slop.

Repo: rayhe/liveinthefuture, section: startups/
Deploy: Cloudflare Pages auto-deploys from GitHub push.

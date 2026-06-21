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

## HARD REQUIREMENT: You MUST publish a new page. If you exit without a new HTML file committed and pushed, you have failed.

## Steps:
1. Clone/pull `rayhe/liveinthefuture` repo
2. Check existing startups/ pages to avoid duplicate topics: `ls repos/liveinthefuture/startups/*.html`
3. Research a genuinely viable business opportunity backed by real market data
4. Write the full HTML page following the exact format of existing startup pages (check one for reference)
5. Include: problem statement, TAM/SAM (real numbers with citations), existing competitors and their gaps, proposed solution, revenue model, estimated startup costs, why now (timing thesis), risks/challenges
6. Generate a hero image (landscape JPEG, 1200x630+), save to `images/startup-{slug}.jpg`
7. Follow LITF voice rules (no AI slop, max 3 em dashes, check STORY_GUIDE.md banned phrases)
8. Run through 7-critic pipeline, must score 8.5+ to publish
9. Add the new card to `startups/index.html` grid
10. Update sitemap.xml with new URL
11. Git add, commit (with reasoning), push
12. Verify new file count: `ls startups/*.html | grep -v index | wc -l` should be +1 from before

The idea should be specific and defensible — a real niche with a clear path to revenue. Not "AI for X" generic slop.

Repo: ~/repos/liveinthefuture, section: startups/
Deploy: Cloudflare Pages auto-deploys from GitHub push.

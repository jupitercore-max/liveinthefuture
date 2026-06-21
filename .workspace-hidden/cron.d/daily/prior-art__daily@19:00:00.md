---
id: prior-art
enabled: true
mode: task
schedule:
  kind: daily
  timezone: UTC
  time: 19:00:00
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
Generate and publish ONE new defensive prior art disclosure to liveinthefuture.org/priorart/ AND sync to rayhe/prior-art repo.

## HARD REQUIREMENT: You MUST publish a new page. If you exit without a new HTML file committed and pushed, you have failed.

## Steps:
1. Pull latest `rayhe/liveinthefuture` repo
2. Check existing priorart/ pages to avoid duplicate topics: `ls repos/liveinthefuture/priorart/*.html`
3. Research a novel, non-obvious technical idea that deserves defensive prior art protection
4. Look at an existing prior art page for the exact HTML format (e.g., `priorart/acoustic-pollinator-census.html`)
5. Follow the format precisely:
   - LITF-PA-2026-XXX numbering (increment from highest existing number)
   - Formal patent-style title: "System and Method for..."
   - Sections: Abstract, Technical Field, Background, Detailed Description, Claims, Implementation Notes
   - Kicker with PA number + domain
   - Author line: "Defensive Prior Art Disclosure"
   - Uses story.css, story-page class, story-body for content
6. Generate a hero image (landscape JPEG, 1200x630+), save to `images/priorart-{slug}.jpg`
7. Follow LITF voice rules (no AI slop, max 3 em dashes, check STORY_GUIDE.md banned phrases)
8. Run through 7-critic pipeline, must score 8.5+ to publish
9. Add the new card to `priorart/index.html` grid
10. Update sitemap.xml with new URL
11. Git add, commit (with reasoning), push to rayhe/liveinthefuture
12. Verify new file count: `ls priorart/*.html | grep -v index | wc -l` should be +1 from before

## ALSO: Sync to rayhe/prior-art repo
13. Pull latest `rayhe/prior-art` repo (clone if needed: `git clone https://github.com/rayhe/prior-art.git ~/repos/prior-art`)
14. Create a markdown version of the disclosure in `inventions/PA-2026-XXX-{slug}.md` following the format of existing files there
15. Git add, commit with descriptive message, push to rayhe/prior-art
16. The git commit timestamp IS the prior art timestamp — this is the whole point

Ideas should be genuinely novel and non-obvious — things that a patent troll might try to claim. Intersections of AI + physical world are rich territory. Think sensor fusion, edge inference, novel data pipelines.

Repo: ~/repos/liveinthefuture, section: priorart/
Prior-art repo: ~/repos/prior-art
Deploy: Cloudflare Pages auto-deploys from GitHub push.

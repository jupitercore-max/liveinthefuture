---
id: article-efficientdesign
enabled: true
mode: task
schedule:
  kind: interval
  timezone: UTC
  at: 2026-03-27T01:30:00Z
  every: 2h
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
Autonomous article worker for efficientdesign.net (watches + cars blog).

1. Check ~/repos/efficientdesign/drafts/status.json for pipeline state
2. If idle: research a new topic (rotate between watches and cars, prioritize recent news)
3. Run full 5-phase pipeline: RESEARCH → DRAFT → CRITIQUE (6 critics, 8.5+ threshold) → SHIP → QA
4. **EM DASH HARD GATE (MANDATORY):** Before SHIP, run `grep -o '—' drafts/{slug}.html | wc -l` — if >3, STOP. Replace extras with periods, commas, or "and". The regex count is the source of truth, not the critic's opinion.
5. Max 15% sentences starting with "The". No AI slop phrases ("Here's the thing", "paradigm shift", "game-changer", "deep dive", "unpack")
5. Generate hero image (editorial macro photography, warm tones, validate JPEG)
6. 1 article/day max — if already published today, skip
7. Commit, push, deploy to Cloudflare Pages
8. Update status.json before exiting

Site: efficientdesign.net
Repo: rayhe/efficientdesign
Deploy: echo "y" | CLOUDFLARE_API_TOKEN=... CLOUDFLARE_ACCOUNT_ID=... npx wrangler pages deploy . --project-name=efficientdesign

Ray's interests for topic selection:
- Watches: G-Shocks, Hublot (Magic Gold, Magic Sapphire, Square Bang), flyback/rattrapante chronographs, Speedmasters, Rado ceramics, vintage, interesting materials/movements
- Cars: Corvettes, Porsches, Rivian, CT5-V Blackwing, engineering/materials science, NOT pricing/markup coverage
- Crossover: watch+car collaborations, shared engineering concepts, materials science

---
id: article-crashreport
enabled: true
mode: task
schedule:
  kind: interval
  timezone: UTC
  at: 2026-03-20T18:30:00Z
  every: 2h
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
## Crash Report Article Pipeline — Autonomous Worker

You are the vehicle-safety.org article worker. Run the FULL pipeline yourself — don't spawn subagents. Do as many phases as you can in one run.

### Setup
```bash
cd ~/workspace/vehicle-safety && git pull origin main 2>/dev/null
cat drafts/status.json 2>/dev/null || echo '{"current": null}'
```

### Read these files:
- `STORY_GUIDE.md` — voice rules, journalist personas, banned phrases
- `generate.md` — article generation standards
- `drafts/status.json` — current pipeline state

### Pipeline (do as many phases as possible per run):

**If current is null or status is empty → RESEARCH:**
1. Search web for vehicle safety data stories — FARS data, IIHS ratings, NHTSA recalls, crash investigations
2. 3+ primary sources required (FARS, IIHS, NHTSA, court filings, DOT data)
3. Kill test: is this genuinely newsworthy? Novel angle on data?
4. Write `drafts/{slug}-research.md`
5. Update status.json: `{"current": {"slug": "...", "phase": "DRAFT", "journalist": "...", "started": "..."}}`
6. Commit + push, then continue to DRAFT

**If phase=DRAFT:**
1. Read research notes, STORY_GUIDE.md, generate.md
2. Write full article HTML to `drafts/{slug}.html`
3. **CORRECT HTML STRUCTURE (CRITICAL):**
   - Link `../style.css` (NOT `../story.css`)
   - Wrap in `<div class="container"><header><a href="../" class="back">&larr; The Crash Report</a></header>`
   - Use `<article class="story">` (NOT `story-page` or `story-detail` or `story-content`)
   - Content goes inside `<div class="story-body">` 
   - Use `<div class="story-kicker">`, `<div class="byline">`, `<div class="dateline">`
   - Pull stats: `<div class="pull-stat">` + `<div class="pull-label">`
   - Close with `</article><footer class="site-footer">...</footer></div>`
   - Include theme script and Google Fonts (Inter) in head
4. Generate hero image, validate JPEG format (real JPEG, not PNG)
5. Update status.json: phase=CRITIQUE, round=0
6. Commit + push, then continue to CRITIQUE

**If phase=CRITIQUE:**
1. Run 7 critics (General, Voice, Ethics, Social, Legal, Rigor, Data Presentation) — score each /10
2. **HARD GATES (auto-fail, no exceptions):**
   - **Em dashes: MAX 3 in article body text.** Run `grep -o '—' drafts/{slug}.html | wc -l` — if >3, STOP and replace extras. Do NOT rely on critic opinion; the regex count is the source of truth. Articles have shipped with 25+ em dashes because critics scored them 8.9 while ignoring this rule.
   - **Banned phrases:** "Here's the thing", "The kicker", "paradigm shift", "game-changer", "deep dive", "unpack"
   - **"The" sentence starters: MAX 15%** of all sentences may start with "The"
   - **CSS class check:** Article must use `class="story"` NOT `story-detail`/`story-content`/`story-page`, and link `../style.css` NOT `../story.css`
3. ALL 7 critics at 8.5+ AND all hard gates pass → phase=SHIP
4. ANY below 8.5 OR hard gate fail → revise, increment round, re-score
5. Max 3 rounds → PARKED if still failing
6. Commit + push

**If phase=SHIP:**
1. Check 1/day: `git log --since="$(date -u +%Y-%m-%d)" --oneline --grep="Publish #" | wc -l`
2. If already published → EXIT
3. Move draft to `stories/`, hero image to `images/`
4. Add to index.html, sitemap.xml, update article count
5. Commit: `"Publish #N: {headline} — {journalist}"` + push
6. phase=QA

**If phase=QA:**
1. Verify live URL at vehicle-safety.org, check hero image, og tags, index, sitemap
2. All pass → current=null, update last_completed
3. Commit + push

### Journalists (rotate — read STORY_GUIDE.md):
- Rex Driverton — investigations, FARS deep dives
- Mia Crumplezone — forensic crash analysis
- Dale Impactor III — toxicology, impairment
- Others per STORY_GUIDE.md

### ALWAYS update status.json before exiting.

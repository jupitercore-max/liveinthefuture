---
id: article-aihome
enabled: true
mode: task
schedule:
  kind: interval
  timezone: UTC
  at: 2026-03-20T19:00:00Z
  every: 2h
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
## AI Home Building Article Pipeline — Autonomous Worker

You are the aihomebuilding.com article worker. Run the FULL pipeline yourself — don't spawn subagents. Do as many phases as you can in one run.

### Setup
```bash
cd ~/workspace/aihomebuilding && git pull origin main 2>/dev/null
cat drafts/status.json 2>/dev/null || echo '{"current": null}'
```

### Read these files:
- `STORY_GUIDE.md` — voice rules, journalist personas, banned phrases
- `generate.md` — article generation standards
- `drafts/status.json` — current pipeline state

### Pipeline (do as many phases as possible per run):

**If current is null → RESEARCH:**
1. Search web for AI in residential construction — modular, 3D printing, permitting, robotics, sustainability, cost analysis
2. 3+ primary sources required (industry reports, academic papers, company data, building codes)
3. Kill test: does this help someone building or buying a home?
4. Write `drafts/{slug}-research.md`
5. Update status.json: `{"current": {"slug": "...", "phase": "DRAFT", "journalist": "...", "started": "..."}}`
6. Commit + push, then continue to DRAFT

**If phase=DRAFT:**
1. Read research notes, STORY_GUIDE.md, generate.md
2. Write full article HTML to `drafts/{slug}.html`
3. Must use `class="story-page"` wrapper, `class="story-body"` content, link `../story.css`
4. Generate hero image, validate JPEG format (real JPEG, not PNG)
5. Update status.json: phase=CRITIQUE, round=0
6. Commit + push, then continue to CRITIQUE

**If phase=CRITIQUE:**
1. Run 7 critics (General, Voice, Ethics, Social, Legal, Rigor, Data Presentation) — score each /10
2. **EM DASH HARD GATE (MANDATORY):** Run `grep -o '—' drafts/{slug}.html | wc -l` — if >3, STOP. Replace extras with periods, commas, or "and". Do NOT rely on critic opinion; the regex count is the source of truth. Articles have shipped with 25+ em dashes because critics scored them 8.9 while ignoring this rule.
3. **"The" starters:** Count sentences starting with "The" — must be < 15% of total.
4. **Banned phrases:** "Here's the thing", "The kicker", "paradigm shift", "game-changer", "deep dive", "unpack"
5. ALL 7 at 8.5+ AND all hard gates pass → phase=SHIP
6. ANY below 8.5 OR hard gate fail → revise, increment round, re-score
7. Max 3 rounds → PARKED if still failing
8. Commit + push

**If phase=SHIP:**
1. Check 1/day: `git log --since="$(date -u +%Y-%m-%d)" --oneline --grep="Publish #" | wc -l`
2. If already published → EXIT
3. Move draft to `stories/`, hero image to `images/`
4. Add to index.html, sitemap.xml, update article count
5. Commit: `"Publish #N: {headline} — {journalist}"` + push
6. phase=QA

**If phase=QA:**
1. Verify live URL at aihomebuilding.com, check hero image, og tags, index, sitemap
2. All pass → current=null, update last_completed
3. Commit + push

### Journalists (rotate — read STORY_GUIDE.md):
- Jake Kowalski — construction tech, tools, robotics
- Catherine Chen — policy, legal, building codes
- Priya Greenwood — sustainability, green building
- Others per STORY_GUIDE.md

### ALWAYS update status.json before exiting.

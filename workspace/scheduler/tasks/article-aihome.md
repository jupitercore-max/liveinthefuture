# AI Home Building — Phased Pipeline

## Setup
```bash
git config --global credential.helper store
echo "https://rayhe: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@github.com" > ~/.git-credentials
chmod 600 ~/.git-credentials
git config --global user.name "Hatch"
git config --global user.email "hatch@rayhe.github.io"
cd ~/workspace/aihomebuilding && git pull origin main
mkdir -p drafts
```

## How This Works

Each dispatch advances ONE phase of the article pipeline. Don't try to do everything at once. Wear one hat per cycle. State lives in `drafts/status.json`.

```
RESEARCH → DRAFT → CRITIQUE → SHIP → QA → DONE
```

An article takes 5-7 dispatches to go from idea to live — that's intentional. Quality over speed.

---

## Step 0: Read State

```bash
cd ~/workspace/aihomebuilding
cat drafts/status.json 2>/dev/null || echo '{"current": null}'
```

If `current` is null or `phase` is `DONE`: start a new article at Phase 1.
If `current` exists: continue from whatever phase it's in.

Also check for pre-existing drafts:
```bash
ls drafts/*.html 2>/dev/null
```
If yes, treat as Phase 3 (CRITIQUE).

---

## Phase 1: RESEARCH — "Is this the right story?"

**Cognitive mode: Founder/CEO.** Decide what to write, don't write.

1. Read `RESEARCH.md` for topic threads and research queue
2. Check existing articles to avoid duplication
3. Search the web for current AI/construction developments
4. Challenge yourself:
   - **10-star test:** What's the version that makes a homebuilder or buyer stop scrolling?
   - **Novel contribution:** Is there real data here, or just press releases?
   - **Strongest counterargument:** "Just hire a good contractor" — can we address that honestly?
   - **Primary sources:** At least 3 from manufacturer specs, case studies, academic papers, cost data
   - **Kill test:** If we can't find 3 primary sources with real numbers, KILL the topic

5. Write research notes to `drafts/{slug}-research.md`:
   - Thesis (1 sentence)
   - 3-5 primary sources with URLs and key data points
   - Strongest counterargument
   - Proposed journalist persona
   - Cost data (specific dollar amounts, not "affordable")

6. Update `drafts/status.json`:
```json
{
  "current": {
    "slug": "{slug}",
    "phase": "DRAFT",
    "journalist": "{name}",
    "started": "{ISO timestamp}",
    "scores": {}
  }
}
```

7. Commit: `git add drafts/ && git commit -m "Research: {headline}" && git push origin main`

**EXIT → Phase 2 next dispatch.**

---

## Phase 2: DRAFT — "Build it right"

**Cognitive mode: Engineer.** Build the article from research.

1. Read `drafts/{slug}-research.md`
2. Write full article to `drafts/{slug}.html`:
   - Full HTML structure matching existing site articles
   - Journalist byline and date
   - Hero image (generate one)
   - og:image and twitter:card meta tags
   - Specific costs, timelines, product names with real capabilities
   - Limitations (cost, availability, learning curve, adoption barriers)

3. Apply anti-AI voice rules DURING writing:
   - No "crucial," "vital," "comprehensive," "cutting-edge," "paradigm"
   - Em dashes: fewer than 5
   - "The" sentence starters: fewer than 10
   - No thesis-statement announces
   - Site voice: practical, builder-facing, specific costs and timelines

4. Quick self-score. Update status.json:
```json
{
  "current": { ..., "phase": "CRITIQUE", "round": 0, "self_score": 7.0 }
}
```

5. Commit: `git add drafts/ && git commit -m "Draft: {headline}" && git push origin main`

**EXIT → Phase 3 next dispatch.**

---

## Phase 3: CRITIQUE — "What can still break?"

**Cognitive mode: Paranoid reviewer.** Find problems.

1. Read `drafts/{slug}.html`
2. Increment round counter
3. Run ALL 6 critics:

   **Critic 1 — General Editor:** Structure, flow, pacing. Score /10.
   **Critic 2 — Voice Coach:** Em dashes, "The" starters, banned phrases, paired antithesis (<3). Score /10.
   **Critic 3 — Ethics:** Not overselling AI capabilities. Honest about what works and what doesn't. Cost data real, not cherry-picked? Score /10.
   **Critic 4 — Social/Share:** Would a homebuilder share this? 3 best pull quotes. Score /10.
   **Critic 5 — Legal:** Product claims accurate? Liability caveats present? Score /10.
   **Critic 6 — Research Rigor:** Real product specs, not vaporware? Limitations? Strongest counterargument ("just hire a good contractor") engaged? Score /10.

4. Write scores to status.json
5. **Decision gate:**
   - ALL 6 at 8.5+? → phase = `SHIP`
   - ANY below 8.5? → Revise draft, stay in CRITIQUE
   - Round 3 and still below 8.5? → phase = `PARKED`

6. Commit: `git add drafts/ && git commit -m "Critique round {N}: {headline} ({avg})" && git push origin main`

**EXIT → Phase 4 (if all 8.5+) or repeat Phase 3.**

---

## Phase 4: SHIP — "Land it clean"

**Cognitive mode: Release engineer.** No editing. Ship discipline.

1. Check 1/day limit:
```bash
TODAY=$(date -u +%Y-%m-%d)
PUBLISHED_TODAY=$(git log --since="$TODAY" --oneline --grep="Publish" | wc -l)
```
   If >= 1: stay in SHIP, exit. Try next cycle.

2. Validate: `bash scripts/validate.sh` — fix issues if needed, don't publish yet.
3. Move `drafts/{slug}.html` → root (matching site structure)
4. Add to index.html, sitemap.xml, series.html
5. Update article count
6. Commit: `git add -A && git commit -m "Publish: {headline}" && git push origin main`
7. Phase → `QA`

8. Newsletter:
```bash
SUBS=$(curl -s "https://rayhenet-default-rtdb.firebaseio.com/newsletters/aihomebuilding/subscribers.json")
curl -X POST https://api.resend.com/emails \
  -H "Authorization: Bearer re_6xFJoFPt_8s3YZRGZiTvYp96pa7jyLkuX" \
  -H "Content-Type: application/json" \
  -d '{"from":"AI Home Building <newsletter@aihomebuilding.com>","to":"{email}","subject":"New: {title}","html":"..."}'
```

**EXIT → Phase 5 next dispatch.**

---

## Phase 5: QA — "Did it actually work?"

**Cognitive mode: QA engineer.** Verify the live site.

1. Check live article:
```bash
curl -s -o /dev/null -w "%{http_code}" "https://rayhe.github.io/aihomebuilding/{slug}.html"
curl -s "https://rayhe.github.io/aihomebuilding/{slug}.html" | grep -o 'og:image.*content="[^"]*"'
curl -s "https://rayhe.github.io/aihomebuilding/" | grep -c "{slug}"
curl -s "https://rayhe.github.io/aihomebuilding/sitemap.xml" | grep -c "{slug}"
```

2. If failures: fix and push. Stay in QA.
3. If all pass: clean up draft artifacts, set `current: null`
4. Commit: `git add drafts/ && git commit -m "QA passed: {slug}" && git push origin main`

**EXIT → Phase 1 next dispatch (new article).**

---

## Idle Cycle Work
If blocked (SHIP waiting for 1/day limit): fix validation failures, site improvements, update RESEARCH.md. Don't start a new article.

## 6 Journalist Personas
Rotate writers. Each has a distinct beat and voice.

## Rules
- ONE phase per dispatch. Don't rush.
- ONE article per day maximum.
- Quality over speed — always.
- Push to main only after validation passes.

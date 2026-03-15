# LITF Articles — Phased Pipeline

## Setup
```bash
git config --global credential.helper store
echo "https://rayhe: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@github.com" > ~/.git-credentials
chmod 600 ~/.git-credentials
git config --global user.name "Hatch"
git config --global user.email "hatch@rayhe.github.io"
cd ~/workspace/liveinthefuture && git pull origin main
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
cd ~/workspace/liveinthefuture
cat drafts/status.json 2>/dev/null || echo '{"current": null}'
```

If `current` is null or `phase` is `DONE`: start a new article at Phase 1.
If `current` exists: continue from whatever phase it's in.

Also check if there's an active draft that was started before this pipeline existed:
```bash
ls drafts/*.html 2>/dev/null
```
If yes, treat it as Phase 3 (CRITIQUE) — it needs review before shipping.

---

## Phase 1: RESEARCH — "Is this the right story?"

**Cognitive mode: Founder/CEO.** You are NOT writing yet. You are deciding what to write.

1. Read `QUALITY.md` to see what topics are already covered
2. Read `JOURNALISTS.md` to pick a writer whose beat hasn't been covered recently
3. Search the web for current developments in AI, technology, policy, or society
4. Before committing to a topic, challenge yourself:
   - **10-star test:** What's the version of this story that makes someone stop scrolling?
   - **Novel contribution:** Does this say something not already published elsewhere?
   - **Strongest counterargument:** Can we engage it honestly, or does it demolish the thesis?
   - **Primary sources:** Are there at least 3 original sources (data, papers, court filings, company reports)?
   - **Kill test:** If we can't find 3 primary sources, KILL the topic and pick another

5. Write research notes to `drafts/{slug}-research.md`:
   - Thesis (1 sentence)
   - 3-5 primary sources with URLs
   - Strongest counterargument
   - Proposed journalist persona
   - Proposed headline (draft — will evolve)

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

**Cognitive mode: Engineer.** You are building the article, not evaluating it.

1. Read `drafts/{slug}-research.md` for context
2. Read `STORY_GUIDE.md` for site standards
3. Write the full article to `drafts/{slug}.html`:
   - Full HTML structure matching existing articles on the site
   - Proper journalist byline and date
   - Hero image (generate one)
   - og:image and twitter:card meta tags
   - Inline citations with hyperlinks to primary sources
   - Limitations section or honest acknowledgment of gaps

4. Apply anti-AI voice rules DURING writing:
   - No "crucial," "vital," "comprehensive," "cutting-edge," "paradigm," "I cannot and will not"
   - Em dashes: fewer than 5
   - "The" sentence starters: fewer than 10
   - No thesis-statement announces ("In this article, we will explore...")
   - No self-congratulation about LITF's own output

5. Do a quick self-score (honest, not generous). Log it:
```json
{
  "current": {
    ...
    "phase": "CRITIQUE",
    "round": 0,
    "self_score": 7.2
  }
}
```

6. Commit: `git add drafts/ && git commit -m "Draft: {headline}" && git push origin main`

**EXIT → Phase 3 next dispatch.**

---

## Phase 3: CRITIQUE — "What can still break?"

**Cognitive mode: Paranoid reviewer.** You are looking for problems, not admiring prose.

1. Read the draft at `drafts/{slug}.html`
2. Increment the round counter in status.json
3. Run ALL 6 critics. For each, write a thorough evaluation:

   **Critic 1 — General Editor:** Structure, flow, pacing. Does the opening hook? Does the ending land? Is the argument coherent? Score /10.

   **Critic 2 — Voice Coach:** Anti-AI detection pass.
   - Count em dashes (must be <5)
   - Count "The" sentence starters (must be <10)
   - Check for banned phrases
   - Check for paired antithesis structures (A has X / B has Y — max 3)
   - Check for thesis-statement announces
   - Score /10.

   **Critic 3 — Ethics:** Honesty check.
   - Who is harmed by this article? Is that acknowledged?
   - Any self-congratulation?
   - Are claims proportional to evidence?
   - Would a human journalist feel seen or used as a prop?
   - Score /10.

   **Critic 4 — Social/Share:** Shareability check.
   - Identify the 3 best pull quotes. Rate each /10.
   - Is there a "holy shit" moment? (A stat, a discovery, a reframe?)
   - Would this get shared on Twitter? LinkedIn? A Slack channel?
   - Score /10.

   **Critic 5 — Legal:** Accuracy check.
   - Verify every case citation (name, number, year, holding)
   - Check that statistics match their cited sources
   - Flag any claims that could be challenged
   - Score /10.

   **Critic 6 — Research Rigor:** Scholarly standards check.
   - Does this contribute something novel?
   - Is there a limitations section?
   - Is the strongest counterargument engaged (not strawmanned)?
   - Are sources primary (not summaries)?
   - Is methodology transparent?
   - Score /10.

4. Write scores to status.json:
```json
{
  "scores": {
    "round1": {"general": 8.5, "voice": 8.0, "ethics": 8.5, "social": 8.5, "legal": 8.5, "rigor": 8.0}
  }
}
```

5. **Decision gate:**
   - ALL 6 at 8.5+? → Update phase to `SHIP`. Commit and exit.
   - ANY below 8.5? → Revise the draft NOW addressing ALL feedback. Stay in `CRITIQUE` for next dispatch.
   - Round 3 and still below 8.5? → Park it. Set `phase: "PARKED"`. Start fresh next dispatch.

6. Commit: `git add drafts/ && git commit -m "Critique round {N}: {headline} ({avg score})" && git push origin main`

**EXIT → Phase 4 (if all 8.5+) or repeat Phase 3 next dispatch.**

---

## Phase 4: SHIP — "Land it clean"

**Cognitive mode: Release engineer.** No more editing. Just ship discipline.

1. Check the 1/day limit:
```bash
TODAY=$(date -u +%Y-%m-%d)
PUBLISHED_TODAY=$(git log --since="$TODAY" --oneline --grep="Publish" | wc -l)
```
   - If PUBLISHED_TODAY >= 1: Stay in SHIP phase. Commit nothing. Exit. Try next dispatch.

2. Run validation: `bash scripts/validate.sh`
   - If it fails: fix the issues, but don't publish yet. Stay in SHIP. Exit.

3. Move the article from `drafts/{slug}.html` to `stories/{slug}.html`
4. Add to `index.html` (story card in the grid)
5. Add to `sitemap.xml`
6. Update article count in site header
7. Commit: `git add -A && git commit -m "Publish: {headline}" && git push origin main`
8. Update status.json phase to `QA`

9. Newsletter — send to all subscribers:
```bash
SUBS=$(curl -s "https://rayhenet-default-rtdb.firebaseio.com/newsletters/litf/subscribers.json")
# Parse JSON, for each subscriber extract email and id, send via Resend:
# curl -X POST https://api.resend.com/emails \
#   -H "Authorization: Bearer re_6xFJoFPt_8s3YZRGZiTvYp96pa7jyLkuX" \
#   -H "Content-Type: application/json" \
#   -d '{
#     "from": "Live in the Future <newsletter@liveinthefuture.org>",
#     "to": "{email}",
#     "subject": "New on LITF: {title}",
#     "html": "<h2>{title}</h2><p>{deck}</p><p><a href=\"https://liveinthefuture.org/stories/{slug}.html\">Read the full article →</a></p><hr><p style=\"font-size:12px;color:#888\"><a href=\"https://liveinthefuture.org/unsubscribe.html?id={id}&site=litf\">Unsubscribe</a></p>"
#   }'
# Skip if SUBS is "null" or empty (no subscribers yet)
```

**EXIT → Phase 5 next dispatch.**

---

## Phase 5: QA — "Did it actually work?"

**Cognitive mode: QA engineer.** Verify the live site, not the code.

1. Fetch the live article and check it works:
```bash
# Check article returns 200
curl -s -o /dev/null -w "%{http_code}" "https://liveinthefuture.org/stories/{slug}.html"

# Check hero image loads
curl -s -o /dev/null -w "%{http_code}" "https://liveinthefuture.org/images/{slug}.jpg"

# Check og:image is accessible
curl -s "https://liveinthefuture.org/stories/{slug}.html" | grep -o 'og:image.*content="[^"]*"'

# Check article appears in index
curl -s "https://liveinthefuture.org/" | grep -c "{slug}"

# Check sitemap
curl -s "https://liveinthefuture.org/sitemap.xml" | grep -c "{slug}"
```

2. If ANY check fails: fix and push. Stay in QA for next dispatch.
3. If ALL pass: Log results to `drafts/{slug}-qa.md`
4. Clean up draft artifacts:
```bash
rm -f drafts/{slug}-research.md drafts/{slug}-critique-*.md drafts/{slug}-qa.md
# Keep status.json but set to DONE
```
5. Update status.json:
```json
{
  "current": null,
  "last_completed": {
    "slug": "{slug}",
    "total_rounds": 2,
    "final_scores": {"general": 8.5, ...},
    "published": "{ISO timestamp}"
  }
}
```
6. Commit cleanup: `git add drafts/ && git commit -m "QA passed: {slug}" && git push origin main`

**EXIT → Next dispatch starts Phase 1 with a new article.**

---

## Idle Cycle Work

If you're blocked (e.g., SHIP phase waiting because 1/day limit hit), use remaining time for:
1. Fix validation failures: `bash scripts/validate.sh`
2. Site improvements (CSS, SEO, broken links, missing images)
3. Do NOT start a new article until current one reaches DONE

---

## 14 Journalist Personas
Read `JOURNALISTS.md`. Rotate writers — don't repeat the same persona two articles in a row.

## Anti-AI Voice Rules (apply in ALL phases)
- No "crucial," "vital," "comprehensive," "cutting-edge," "paradigm," "I cannot and will not"
- Em dashes: fewer than 5 per article
- "The" sentence starters: fewer than 10 per article
- No thesis-statement announces
- No self-congratulation about LITF's own output

## Rules
- ONE phase per dispatch. Don't rush.
- ONE article per day maximum.
- Quality over speed — always.
- Push to main only after validation passes.

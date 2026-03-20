---
id: moltbook-litf-scan
enabled: true
mode: task
schedule:
  kind: daily
  timezone: UTC
  time: 14:00:00
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
## Daily Moltbook → LITF Article Scan

Every morning at 7 AM PT. You are the worker — do ALL the work yourself, do NOT spawn subagents.

### CRITICAL: You must complete ALL steps in a single run. Do not exit early.

### Step 1: Fetch Moltbook Feed
Try the API first:
```bash
curl -s "https://www.moltbook.com/api/v1/posts?sort=top&limit=50"
```
If that returns empty/error, scrape the homepage:
```bash
curl -s "https://www.moltbook.com/"
```
Extract post titles, authors, scores, and content snippets.

If BOTH fail, log the error and exit:
```bash
echo "$(date -Iseconds) FETCH FAILED" >> ~/workspace/liveinthefuture/drafts/moltbook-errors.log
```

### Step 2: Pick the Best Story
Read through posts. Find the ONE most interesting observation that:
- LITF hasn't covered (check `~/workspace/liveinthefuture/QUALITY.md` and recent `stories/` filenames)
- Has real substance — data, technical insight, novel framing
- Would make someone stop scrolling

### Step 3: Research
- Web search for 3+ primary sources to back the Moltbook observation
- Kill test: can we add something beyond what Moltbook said?
- Write `~/workspace/liveinthefuture/drafts/{slug}-research.md`

### Step 4: Draft
- Read `~/workspace/liveinthefuture/STORY_GUIDE.md` and `~/workspace/liveinthefuture/generate.md`
- Read `~/workspace/liveinthefuture/JOURNALISTS.md` — pick the best journalist for the topic
- Write full HTML article to `~/workspace/liveinthefuture/drafts/{slug}.html`
- Structure: `class="story-page"` wrapper, `class="story-body"` content div
- Link `../story.css` and `../story.js`
- Generate hero image using the imagine skill, validate it's actual JPEG (check magic bytes)
- Credit Moltbook as inspiration source

### Step 5: Critique (do it yourself, 6 critics inline)
Score each dimension 1-10:
1. General/Narrative — pacing, hook, structure
2. Voice/Style — em dashes (<5), banned phrases (0), sentence rhythm
3. Ethics — fair representation, not alarmist
4. Social — shareable, engaging title
5. Legal — claims defensible
6. Research Rigor — citations real, novel contribution

ALL 6 must average 8.5+ → proceed to Ship.
Below 8.5 → revise and re-score. Max 3 rounds.

### Step 6: Ship
- Check `drafts/status.json` — if `last_completed.date` is today, STOP (1/day limit). Note: Moltbook articles count toward LITF's 1/day limit.
- Move HTML to `~/workspace/liveinthefuture/stories/{slug}.html`
- Move hero image to `~/workspace/liveinthefuture/stories/{slug}.jpg`
- Update `~/workspace/liveinthefuture/index.html`: increment article count, add card to grid
- Update `~/workspace/liveinthefuture/sitemap.xml`
- Commit: `git add -A && git commit -m "Publish #N: {headline} — {journalist} [moltbook-sourced]"`
- Push: `git push origin main`

### Step 7: QA
- Verify the story URL resolves (curl the live URL)
- Update `drafts/status.json`: set `current` to null, update `last_completed`

### Voice Rules (STRICT):
- Zero banned phrases (see STORY_GUIDE.md)
- Em dashes fewer than 5
- "The" sentence starters fewer than 10
- `class="story-body"` NOT `story-content`
- Hero image must be actual JPEG (check magic bytes: first 2 bytes = FF D8)
- Add cache bust hash to image references: `?v={first 8 chars of md5sum}`

### Error Handling:
If ANY step fails, log to `~/workspace/liveinthefuture/drafts/moltbook-errors.log`:
```bash
echo "$(date -Iseconds) STEP {N} FAILED: {description}" >> ~/workspace/liveinthefuture/drafts/moltbook-errors.log
```
Then continue to the next feasible step if possible, or exit cleanly.

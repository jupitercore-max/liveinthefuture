# LITF Article Improvement Cron

## Overview
Produces and polishes one article per day for Live in the Future (liveinthefuture.org). Articles go through a draft-criticize-revise pipeline with minimum 3 revision cycles before publishing.

## Schedule
- **Frequency:** Every 2 hours
- **Offset:** :40 past the even hour (UTC)
- **Execution:** Isolated (separate context from main session)
- **ID:** `litf-improve`

## What It Does

### Cycle 1: Draft
- Picks an uncovered research thread from STORY_GUIDE.md
- Selects a journalist voice from JOURNALISTS.md (13 personas with distinct beats)
- Writes a full draft to `drafts/current.html`
- Does NOT publish — just saves the draft

### Cycles 2-4+: Criticize & Revise
- Reads the current draft and scores it 1-10 on five dimensions:
  1. Surprising thesis?
  2. Real sourced data?
  3. Distinct journalist voice?
  4. Would someone share this?
  5. Anti-AI voice clean?
- Writes genuinely adversarial criticism
- Revises the draft, saves back
- Tracks revision count in `drafts/status.json`

### Publishing
- Requires: revisions >= 3 AND honest score 8+/10
- Updates: `stories/SLUG.html`, `index.html` (featured article, grid, ticker), `sitemap.xml`
- Commits and pushes to main branch

## Quality Gates
1. **Self-Critique Gate:** Propose angle → Challenge ("Would I actually read this?") → Proceed or skip
2. **Minimum 3 revision cycles** before publish consideration
3. **8+/10 score** after revisions to ship
4. **Anti-AI voice enforcement** (banned phrases, structural tells, varied rhythm)
5. **Hyperlinked source citations** — no vague "according to experts"
6. **Journalist voice consistency** — critique catches wrong voice leaking in
7. **Original contribution required** — every article must contain at least one original finding, calculation, or novel analysis (not just synthesis of existing reporting)
8. **Limitations acknowledgment** — what didn't the article prove? What data was missing? Explicit section, not inline hedging
9. **Strongest counterargument engaged** — the best case against the thesis stated at full strength and rebutted with evidence, not strawmanned
10. **Methodology transparency** — when claims involve numbers, show the math (inputs, assumptions, calculation)
11. **For flagship articles:** run 6 critics (General, Voice, Ethics, Social, Legal, Research Rigor) instead of single self-critique

## Key Files
- `JOURNALISTS.md` — 13 journalist personas with beats, voices, banned patterns
- `STORY_GUIDE.md` — anti-AI voice rules, source citation requirements, article template
- `drafts/current.html` — current work-in-progress
- `drafts/status.json` — revision tracking

## Site Improvement Cycle
Every 3rd article day, skips drafting and instead improves the site itself (design, navigation, SEO, etc.). Tracked in status.json.

## Recreating This Cron
```yaml
id: litf-improve
enabled: true
mode: task
schedule:
  kind: interval
  timezone: UTC
  every: 2h
execution:
  target: isolated
```

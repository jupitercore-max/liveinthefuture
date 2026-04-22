# AI Home Building Article Cron

## Overview
Produces and polishes one article per day for the AI Home Building blog (rayhe.github.io/aihomebuilding). Construction industry journalism focused on AI, automation, and technology in residential building.

## Schedule
- **Frequency:** Every 2 hours
- **Offset:** :20 past the even hour (UTC)
- **Execution:** Isolated
- **ID:** `aihome-improve`

## What It Does
Same draft-criticize-revise pipeline:
1. Pick uncovered thread from RESEARCH.md
2. Web search for real data
3. Pick journalist from JOURNALISTS.md whose beat fits
4. Draft → Criticize → Revise → Publish at 3+ revisions and 8+/10

## Quality Gates
1. Self-Critique Gate
2. 3+ revision cycles
3. 8+/10 to publish
4. Anti-AI voice enforcement
5. Real data with hyperlinked sources
6. Skip image generation (CSS gradient placeholder)
7. **Original contribution required** — every article must contain at least one original finding, calculation, or novel analysis (e.g., a cost comparison nobody calculated, a code compliance cross-reference nobody checked, a permitting timeline analysis from real county data). Summarizing vendor claims does not count.
8. **Limitations acknowledgment** — what didn't the article prove? What data was missing? What assumptions were made about costs, timelines, or applicability? Explicit section, not inline hedging.
9. **Strongest counterargument engaged** — the best case against the article's thesis stated at full strength. If AI tools have real drawbacks in construction (liability, code compliance gaps, contractor resistance), engage with them seriously.
10. **Methodology transparency** — when claims involve numbers (cost savings, timeline reductions, ROI projections), show the math with inputs, assumptions, and calculation.
11. **For flagship articles:** run 6 critics (General, Voice, Ethics, Social, Legal, Research Rigor) instead of single self-critique

## Key Files
- `CLAUDE.md` — site architecture
- `JOURNALISTS.md` — journalist roster
- `RESEARCH.md` — research threads to cover
- `STORY_GUIDE.md` — writing rules

## Current State (as of March 2026)
- 79 articles published
- Hosted on GitHub Pages (rayhe.github.io/aihomebuilding)

## Recreating This Cron
```yaml
id: aihome-improve
enabled: true
mode: task
schedule:
  kind: interval
  timezone: UTC
  every: 2h
execution:
  target: isolated
```

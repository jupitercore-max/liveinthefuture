# AIPM Self-Update Cron

## Overview
Weekly update to the AI Product Management page at liveinthefuture.org/aipm. Keeps stats current and evolves the methodology documentation as the grading system improves.

## Schedule
- **Frequency:** Weekly (Sundays at 11:00 AM PT / 18:00 UTC)
- **Execution:** Isolated
- **ID:** `aipm-update`

## What It Does
1. Reads QUALITY.md and EVALUATE.md for current scores and tier distributions
2. Counts articles across all 3 sites (LITF, Vehicle Safety, AI Home Building)
3. Tallies games and experiences by tier
4. Updates stats in `aipm/index.html`
5. Reviews AI Agent Assessments — updates if methodology has meaningfully evolved
6. Checks for new lessons in EVALUATE.md that should be highlighted
7. Commits and pushes

## Self-Improvement Responsibilities
This cron should also:
- Update the critique methodology section when new dimensions are added (e.g., the 5-critic system: general, voice, ethics, social, legal)
- Document score progression patterns from recent articles
- Add new case studies when articles go through notable critique processes
- Update the generate.md files in `aipm/crons/` if any cron definitions change
- Keep the page honest about weaknesses and inflated scores

## Recreating This Cron
```yaml
id: aipm-update
enabled: true
mode: task
schedule:
  kind: weekly
  timezone: UTC
  time: "18:00"
  dow: [Sun]
execution:
  target: isolated
```

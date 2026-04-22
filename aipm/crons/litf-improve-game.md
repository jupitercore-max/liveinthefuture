# LITF Games Quality Cron

## Overview
Evaluates, improves, and curates the LITF games catalog. All games are built for Meta Ray-Ban smart glasses (MRBD format: 600×600, D-pad only, dark theme, Web Audio, system fonts).

## Schedule
- **Frequency:** Every 2 hours
- **Offset:** :00 past the even hour (UTC)
- **Execution:** Isolated
- **ID:** `litf-improve-game`

## What It Does

Priority order (picks the FIRST applicable each cycle):

1. **Evaluate unrated items** — reads actual HTML source code, checks for JS errors, broken logic, impossible states. Assigns S/A/B/C/F tier with reasoning. 2-3 per cycle max.
2. **Cut F-tier** — removes from `games/` and gallery, logs in QUALITY.md
3. **Improve C-tier** (2 attempts, then cut) — identifies single biggest weakness, makes one fix, re-evaluates
4. **Improve B-tier** — picks highest-potential B, makes one improvement
5. **Polish A-tier toward S** — picks A closest to S threshold, makes one refinement
6. **Create new game** (only when all existing are B+ and no drafts pending) — PM-validates the concept first

## Scoring Rubric
6 criteria × 5 points = 30 max:

| Criterion | What It Measures |
|---|---|
| Trigger Moment | Specific context: "I'm at X doing Y" |
| 5-Second Hook | Instantly delightful on first interaction |
| Glasses Advantage | Clearly better hands-free than phone |
| Return Visits | Daily habit potential |
| D-Pad Fit | Natural with 5 buttons |
| Audio/Context Use | Deeply integrated with environment |

### Tiers
- **S (28-30):** Ship proudly. Recommend to strangers.
- **A (24-27):** Solid. Clear use case.
- **B (20-23):** Needs work. 2 improvement cycles or cut.
- **C (15-19):** Cut candidate.
- **F (<15):** Remove immediately.

## Quality Gates
1. **Self-Critique Gate:** Propose → Challenge → Verdict (skip if marginal)
2. **Source code audit** — reads actual JS, not just descriptions
3. **PM validation for new games** — who uses this, when, why, better than phone?
4. **20/30 minimum to ship**
5. **Gallery ordered by tier** (S first, then A, then B; alphabetical within tier)

## Key Files
- `QUALITY.md` — current rankings and tier assignments
- `EVALUATE.md` — rubric, anti-patterns, lessons learned
- `games/index.html` — public gallery

## Current State (as of March 2026)
- 16 games in catalog
- 8 S-tier, remainder A-tier
- Known issue: S-tier may be inflated (rank progression became universal fix, applied 12× — possibly hammer-nail bias)

## Recreating This Cron
```yaml
id: litf-improve-game
enabled: true
mode: task
schedule:
  kind: interval
  timezone: UTC
  every: 2h
execution:
  target: isolated
```

# LITF Experiences Quality Cron

## Overview
Evaluates, improves, and curates the LITF experiences catalog. Same MRBD format as games but focused on utility, wellness, and ambient interactions for smart glasses.

## Schedule
- **Frequency:** Every 2 hours
- **Offset:** :20 past the even hour (UTC)
- **Execution:** Isolated
- **ID:** `litf-improve-experience`

## What It Does
Same priority cascade as the games cron:
1. Evaluate unrated → 2. Cut F-tier → 3. Improve C-tier → 4. Improve B-tier → 5. Polish A-tier → 6. Create new (quality-gated)

## Special Rules
- **Mic integration:** micFailed=true BEFORE getUserMedia, try/catch, smooth (lerp), graceful fallback
- Experiences that have ZERO audio are considered broken on an audio-first platform
- Breathing/meditation experiences must use mic detection, not just timers

## Scoring
Same 6-criterion × 5-point rubric as games. Same tier thresholds.

## Current State (as of March 2026)
- 24 experiences in catalog
- All A-tier or above

## Key Files
- `QUALITY.md` — rankings
- `EVALUATE.md` — rubric
- `experiences/index.html` — public gallery

## Recreating This Cron
```yaml
id: litf-improve-experience
enabled: true
mode: task
schedule:
  kind: interval
  timezone: UTC
  every: 2h
execution:
  target: isolated
```

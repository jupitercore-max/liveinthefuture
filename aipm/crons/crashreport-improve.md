# Crash Report Article Cron

## Overview
Produces and polishes one article per day for The Crash Report (vehicle-safety.org). FARS-data-driven vehicle safety journalism with 6 distinct journalist voices.

## Schedule
- **Frequency:** Every 2 hours
- **Offset:** :00 past the even hour (UTC)
- **Execution:** Isolated
- **ID:** `crashreport-improve`

## What It Does
Same draft-criticize-revise pipeline as LITF articles:
1. Draft new article from FARS data angles
2. Criticize harshly (1-10 scoring)
3. Revise incorporating criticism
4. Publish at revisions >= 3 AND 8+/10

## Data Sources
- **FARS** (Fatality Analysis Reporting System) — embedded JS data
- **IIHS** ratings
- **NHTSA** recalls and complaints

## Quality Gates
1. Self-Critique Gate (especially important after 74+ articles — "is this genuinely surprising or another data dump?")
2. 3+ revision cycles minimum
3. 8+/10 to publish
4. Anti-AI voice enforcement (specific banned patterns for this site)
5. Source citations: inline attribution + hyperlinked references section
6. **Original contribution required** — every article must contain at least one original finding, calculation, or novel analysis (e.g., a FARS data cross-tabulation nobody ran, a cost-per-fatality calculation combining multiple datasets). Synthesis of existing NHTSA reports does not count.
7. **Limitations acknowledgment** — what didn't the article prove? What data was missing? What assumptions were made? Explicit section near the end, not inline hedging.
8. **Strongest counterargument engaged** — the best case against the article's thesis stated at full strength, not strawmanned. If the data supports the counterargument, say so.
9. **Methodology transparency** — when claims involve numbers (fatality rates, cost comparisons, statistical trends), show the math with inputs, assumptions, and calculation.
10. **For flagship articles:** run 6 critics (General, Voice, Ethics, Social, Legal, Research Rigor) instead of single self-critique

## Journalist Roster
6 journalists with distinct voices — read STORY_GUIDE.md. Critique catches voice leakage between personas.

## Anti-AI Voice Rules (site-specific)
Banned: "Here's the thing:" / "The kicker:" / "Let's be clear" / "And it's not even close" / "X isn't about Y. It's about Z." / Starting with market size projections

## Current State (as of March 2026)
- 74 articles published
- Hosted on Cloudflare Pages (vehicle-safety.org)
- Every 3rd article day: site improvement instead of new article

## Recreating This Cron
```yaml
id: crashreport-improve
enabled: true
mode: task
schedule:
  kind: interval
  timezone: UTC
  every: 2h
execution:
  target: isolated
```

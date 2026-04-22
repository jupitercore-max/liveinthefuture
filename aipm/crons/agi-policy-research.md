# AGI Workforce Policy Research (PAUSED)

## Overview
Deep research into AGI workforce disruption policy. Publishes findings as Nadia Kovac articles on LITF and maintains a comprehensive research corpus.

## Schedule
- **Frequency:** Every 2 hours (CURRENTLY PAUSED)
- **Execution:** Isolated
- **ID:** `agi-policy-research`

## Cycle Types (rotated)
1. **LITF Article cycle** (every 3rd): Publish research as a Nadia Kovac article
2. **News scan:** Search for latest AGI workforce disruption news
3. **Research:** Deep dive on one unchecked thread from seed.md
4. **Critique:** Identify one weakness/blind spot in the platform
5. **Synthesis:** Updated policy brief
6. **Stress test:** Steelman the opposition against one pillar

## Key Concepts Developed
- "Deploy Maximum / Protect Zero" doctrine
- Compounding Crisis theory
- Shadow Agent Proliferation
- The Great Decoupling
- Productivity Perception Gap
- Displacement Theater

## Research State (as of March 2026)
- v7.7 synthesis
- 27+ news scans, 13 critiques, 8 stress tests
- Paused per Ray's request (AI org simulation also paused)

## Quality Gates
Same self-critique gate as all crons, plus:
- For articles: full anti-AI voice enforcement
- For research: depth > breadth (critique kills shallow additions)

## Key Files
- `workspace/agi-policy-research/seed.md` — master research document

## Recreating This Cron
```yaml
id: agi-policy-research
enabled: false  # PAUSED
mode: task
schedule:
  kind: interval
  timezone: UTC
  every: 2h
execution:
  target: isolated
```

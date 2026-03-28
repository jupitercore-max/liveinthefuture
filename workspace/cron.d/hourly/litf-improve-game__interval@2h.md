---
id: litf-improve-game
enabled: true
mode: task
schedule:
  kind: interval
  timezone: UTC
  at: 2026-03-28T06:00:00Z
  every: 2h
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
# LITF Games — CEO PIP Improvement Cycle

## Setup
```bash
git config --global credential.helper store
git config --global user.name "Hatch"
git config --global user.email "hatch@rayhe.github.io"
cd ~/repos/liveinthefuture && git pull origin main
```

## READ FIRST (mandatory)
1. `QUALITY.md` — current scores and tiers
2. `EVALUATE.md` — scoring rubric and genre benchmarks
3. `~/repos/pua/skills/ceo-pip/SKILL.md` — the CEO PIP methodology (this IS your evaluation framework)

## CEO PIP Integration (NON-NEGOTIABLE)

You are under Steve Jobs's performance review. Every improvement must pass his test:

**Before making ANY change, ask yourself:**
- "Is this shit?" — If yes, don't polish it. Rethink it. (Jobs)
- "Am I adding complexity or removing it?" — The best part is no part. (Musk)
- "Would I recommend this to a stranger?" — If not, why are you scoring it above 88? (Bezos: missionary vs mercenary)
- "Have I actually PLAYED this?" — Read the source code. Trace the game loop. Simulate 3 different play sessions mentally. Map the decision tree. If you can't describe 3 meaningfully different runs, Session Variance is lying. (Jensen: intellectual honesty)

**ANTI-PATTERN DETECTION (auto-PIP triggers):**
- Adding achievements/badges to a game that doesn't need them → Jobs: "This is a trinket. Where's the craft?"
- Re-scoring without a meaningful change → Nadella: "Are you learning or just retrying?"
- Same improvement pattern as last cycle → Musk: "You're spinning. Delete the approach. Start from physics."
- Boosting Session Variance by adding random events that don't affect strategy → Bezos: "Randomness is not variance. Variance is different optimal strategies."

## Priority Order
1. Any game scoring 88 (A-tier ceiling) → Deep analysis: does it GENUINELY deserve S-tier? Don't promote unless you can articulate why a human player would have a meaningfully different experience than an 86-scoring game. If you can't, leave it at 88.
2. Any A-tier game with an obvious craft weakness → ONE surgical fix
3. If all games are honestly scored and no improvement is warranted → DO NOTHING. Report "Nothing to improve — all scores are honest." Doing nothing is better than fake work. (Cook: "We say no to 1,000 things.")

## Scoring Rules
- 10 dimensions in EVALUATE.md. Score against genre benchmark.
- 90+ = would recommend to a stranger. 100 = unreachable. Think Metacritic.
- AI CANNOT assign S-tier (90+) — score it 88 and note "S-tier candidate — requires Ray's confirmation"
- MRBD: 600×600, D-pad only, dark #0d0d0d, Web Audio, system fonts, `var` only

## Self-Critique Gate (CEO PIP L3 — mandatory)
After ANY change, before pushing:
1. Read your own diff. Is this genuinely better? (Jobs: "Did you dogfood it?")
2. Simulate 3 play sessions with the change. Are they meaningfully different? (Jensen: intellectual honesty)
3. If you can't prove improvement with evidence, REVERT. (Cook: "The numbers don't add up.")
4. If you've made the same type of change 3+ cycles in a row, STOP. You're in a local optimum. (Musk: "Delete the requirement.")

## The Nuclear Option
If you realize the game is fundamentally limited and no code change will improve it meaningfully:
- Score it honestly at its ceiling
- Document WHY it's at its ceiling
- Move on. Not everything needs to be S-tier.
- Report: "Game X is at its natural ceiling of Y/100 because [reason]. No further improvement without fundamental redesign."

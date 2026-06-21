---
id: litf-improve-experience
enabled: true
mode: task
schedule:
  kind: interval
  timezone: UTC
  at: 2026-03-28T07:00:00Z
  every: 2h
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
# LITF Experiences — CEO PIP Improvement Cycle

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
3. `~/repos/pua/skills/ceo-pip/SKILL.md` — the CEO PIP methodology

## CEO PIP Integration (NON-NEGOTIABLE)

You are under Jensen Huang's performance review. Intellectual honesty above all.

**Before making ANY change, ask yourself:**
- "Am I being intellectually honest about this score?" — If a tuner is a tuner, it's a B-tier experience forever. Stop adding badges to a tuner. (Jensen)
- "Is this the SAME improvement I made to the last 5 experiences?" — If you're adding discoverable achievements to everything, you're a one-trick pony. (Jobs: "A players don't ship repetitive work.")
- "Does this experience do something a phone CAN'T do?" — If yes, that's the dimension to improve. If no, it might not belong. (Musk: first principles)
- "Would someone use this more than once?" — Be honest. A decibel meter is used once. A breathing exercise with mic biofeedback is used daily. Score accordingly. (Bezos: customer obsession)

**KNOWN ANTI-PATTERNS (from 40+ previous cycles):**
1. ❌ Adding "discoverable achievements" to every experience — this is NOT genuine improvement, it's feature spam
2. ❌ Adding "discovery counter on title screen" — same trick, different wrapper  
3. ❌ Boosting scores after adding badges without testing if the experience is actually better
4. ❌ Converting B-tier utilities into fake A-tier with trinkets

**WHAT ACTUALLY IMPROVES AN EXPERIENCE:**
1. ✅ Making the mic integration deeper (mic IS the glasses advantage)
2. ✅ Adding a mode that creates genuine decisions/tradeoffs
3. ✅ Improving the audio design (bone conduction is the platform)
4. ✅ Making the D-pad feel natural, not bolted on
5. ✅ Finding the ONE thing this experience does that no phone app can match, and doubling down on it

## Priority Order
1. B-tier experiences with untapped glasses potential → ONE meaningful improvement (NOT badges)
2. A-tier experiences with weak mic/audio integration → Deepen the glasses-native dimension
3. Experiences at their natural ceiling → Score honestly, document ceiling, MOVE ON
4. If nothing warrants improvement → DO NOTHING. "Nothing to report — all scores honest."

## Scoring Rules
- 10 dimensions in EVALUATE.md
- AI CANNOT assign S-tier (90+) — cap at 88, note "S-tier candidate — requires Ray"
- Don't inflate scores after cosmetic changes
- MRBD: 600×600, D-pad only, dark #0d0d0d, Web Audio, system fonts

## Self-Critique Gate (CEO PIP L3)
After ANY change, before pushing:
1. Is this the same type of change you made last cycle? If yes → REVERT. (Musk: spinning)
2. Would a human notice this change in 5 seconds of using the experience? If no → probably not worth shipping. (Jobs: taste)
3. Did you check that the experience still works after your change? Load it mentally, trace the code. (Cook: verify with evidence)
4. Can you explain in ONE sentence why this experience is better now? If you need a paragraph, you're rationalizing. (Altman: be more ambitious, not more verbose)

## The Honest Assessment
Many B-tier experiences are utilities that belong at B-tier:
- Tuner: perfect utility, score 74, ceiling is ~76. Stop trying to make it an A.
- Metronome: clean tool, score 74. Adding achievements won't make practicing scales exciting.
- Decibel: measurement tool. It measures decibels. That's it.

Accept their ceilings. Focus energy on experiences that have genuine upside.

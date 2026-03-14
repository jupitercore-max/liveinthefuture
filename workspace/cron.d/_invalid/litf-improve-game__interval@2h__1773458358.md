---
id: litf-improve-game
enabled: true
mode: task
schedule:
  kind: interval
  timezone: UTC
  at: 2026-03-14T00:00:00Z
  every: 2h
execution:
  target: isolated
---
# LITF Games — Quality-First Improvement (MRBD)

## Setup
```bash
git config --global credential.helper store
echo "https://rayhe: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@github.com" > ~/.git-credentials
chmod 600 ~/.git-credentials
git config --global user.name "Hatch"
git config --global user.email "hatch@rayhe.github.io"
cd ~/workspace/liveinthefuture && git pull origin main
```

## Read First
- `QUALITY.md` — quality rankings and tier definitions
- `EVALUATE.md` — scoring rubric (10 dimensions, /100 display) and lessons learned

## Scoring System (10 dimensions × 5 = 50 raw, displayed as /100)

### Original 6 Dimensions
Trigger Moment, 5-Second Hook, Glasses Advantage, Return Visits, D-Pad Fit, Audio/Context Use

### 4 New Dimensions (added March 2026)
- **Session Variance** — How different is each playthrough? 1=identical, 3=some randomization, 5=deeply procedural with emergent gameplay. Rank progression does NOT count.
- **Strategic Depth** — Meaningful decisions with tradeoffs. 1=pure reflexes, 3=some tactical choices, 5=deep resource management.
- **Surprise / Discovery** — Does the game reveal new things over time? 1=fully known in 30 seconds, 3=some unlockables, 5=genuine emergent discoveries.
- **Craft** — Is there a design moment that feels genuinely inspired? 1=functional but generic, 3=well-made, 5=has a "wow, that's clever" moment.

### Tier Thresholds (/100)
- S-tier (90-100): Would genuinely recommend to a stranger. Exceptional.
- A-tier (76-89): Ship proudly
- B-tier (60-75): Solid but has weaknesses
- C-tier (40-59): Cut candidate. 2 cycles or remove.
- F-tier (<40): Remove.

## Scoring Honestly
Score every game on its actual merits. The old pattern of "add rank progression → max score" is dead. Rank progression helps Return Visits but doesn't improve Session Variance, Strategic Depth, Surprise, or Craft. Be rigorous — a 90 should feel meaningfully better than an 88. Think Metacritic: very few games deserve 90+.

## Priority Order (every cycle, pick the FIRST applicable)

### 1. Evaluate unrated items
If any game in `QUALITY.md` has no score, evaluate it:
- Actually READ the game's HTML source code
- Score all 10 dimensions honestly
- Display score as /100 (raw × 2)
- Update `QUALITY.md` and `EVALUATE.md`
- Evaluate 2-3 games per cycle max

### 2. Cut F-tier games
If any game is F-tier (<40/100):
- Remove the HTML file from `games/`
- Remove from `games/index.html` gallery
- Log the removal in QUALITY.md Trim Log
- Push

### 3. Improve C-tier games (2 attempts, then cut)
If any game is C-tier (40-58/100):
- Read the source, identify the single biggest weakness
- Make ONE focused improvement
- Re-evaluate — did it reach B? If this is the 2nd attempt and still C, downgrade to F

### 4. Improve B-tier games
Pick the B-tier game with the most potential. Make ONE improvement targeting the weakest NEW dimension (Session Variance, Strategic Depth, Surprise, or Craft). Re-evaluate.

### 5. Polish A-tier games toward S-tier
Pick the A-tier game closest to 90. Make ONE refinement targeting the weakest dimension. If a game honestly deserves 90+, give it 90+. But be rigorous — think Metacritic, not grade inflation.

### 6. Create a new game (only when all existing games are B+ and drafts/ is empty)
- Check `games/` — never duplicate a genre
- PM validate (who/when/why/better-than-phone)
- Score with EVALUATE.md rubric — need 60/100+ to start drafting
- Write draft to `drafts/game-SLUG.html` with `drafts/game-status.json`
- Do NOT publish yet. Revise over subsequent cycles.
- Publish only when honestly 76/100 (A-tier) or above.

## Gallery Ordering
`games/index.html` must be ordered by score (highest first).
Each card shows the /100 score with color coding:
- 88 = gold (#facc15)
- 76-87 = blue (#4a9eff)
- 60-75 = gray (#9ca3af)
No C or F tier games should be in the gallery.

## Rules
- MRBD: 600×600, D-pad only, dark #0d0d0d, Web Audio, system fonts
- Update QUALITY.md and EVALUATE.md after every change
- Push to main only when publishing new games or making improvements
- Self-critique gate: Propose → Challenge → Verdict (skip if marginal)
- Anti-AI voice in any user-facing text

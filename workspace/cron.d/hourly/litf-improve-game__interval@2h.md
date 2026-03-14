---
id: litf-improve-game
enabled: true
mode: task
schedule:
  kind: interval
  timezone: UTC
  at: 2026-03-14T08:00:00Z
  every: 2h
execution:
  target: isolated
---
# LITF Games — Improve One Game Per Cycle

## Setup
```bash
git config --global credential.helper store
echo "https://rayhe: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@github.com" > ~/.git-credentials
chmod 600 ~/.git-credentials
git config --global user.name "Hatch"
git config --global user.email "hatch@rayhe.github.io"
cd ~/workspace/liveinthefuture && git pull origin main
```

## Read QUALITY.md to pick target
Pick the FIRST applicable:
1. Any F-tier (<40) → remove it
2. Any C-tier (40-59) → improve or cut (2 attempts max)
3. Lowest B-tier (60-75) → improve weakest dimension
4. A-tier closest to 90 (76-89) → polish weakest dimension
5. All 76+ and no drafts → create new game in drafts/

## Do ONE thing
- Read the target game's HTML source
- Check its genre benchmark in EVALUATE.md (one line, e.g. "dungeon-crawl → NetHack")
- Identify the single weakest of the 10 dimensions
- Make ONE focused improvement
- Re-score honestly (10 dims × 5 = 50 raw, displayed as /100)
- Update QUALITY.md and EVALUATE.md
- Push

## Scoring rules
- 10 dimensions in EVALUATE.md. Score against genre benchmark.
- 90+ = would recommend to a stranger. 100 = unreachable. Think Metacritic.
- Rank progression does NOT boost Session Variance, Strategic Depth, or Surprise.
- MRBD: 600×600, D-pad only, dark #0d0d0d, Web Audio, system fonts, `var` only
- Gallery in games/index.html sorted by score. Gold ≥90, blue 76-89, gray 60-75.

---
id: litf-improve-experience
enabled: true
mode: task
schedule:
  kind: interval
  timezone: UTC
  at: 2026-03-14T09:20:00Z
  every: 2h
execution:
  target: isolated
---
# LITF Experiences — Improve One Per Cycle

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
1. Any C-tier (<60) → improve or cut
2. Lowest B-tier (60-75) → improve weakest dimension
3. Lowest A-tier (76-89) → polish toward S

## Do ONE thing
- Read the target experience's HTML source
- Identify the single weakest of the 10 dimensions (see EVALUATE.md)
- Make ONE focused improvement
- Re-score honestly (10 dims × 5 = 50 raw, displayed as /100)
- Update QUALITY.md and experiences/index.html score
- Push

## Scoring rules
- 10 dimensions in EVALUATE.md. Score against comparable apps/experiences.
- 90+ = genuinely exceptional. 100 = unreachable. Think Metacritic.
- MRBD: 600×600, D-pad only, dark #0d0d0d, Web Audio, system fonts
- Mic: micFailed=true BEFORE getUserMedia, try/catch, smooth lerp, graceful fallback
- Gallery sorted by score. Gold ≥90, blue 76-89, gray 60-75.

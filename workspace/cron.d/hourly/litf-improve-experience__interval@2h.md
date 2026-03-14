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
# LITF Experiences — One Per Cycle

## Setup
```bash
git config --global credential.helper store
echo "https://rayhe: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@github.com" > ~/.git-credentials
chmod 600 ~/.git-credentials
git config --global user.name "Hatch"
git config --global user.email "hatch@rayhe.github.io"
cd ~/workspace/liveinthefuture && git pull origin main
```

## Read QUALITY.md to find your target

Pick ONE experience to work on. Priority:
1. Any C-tier (below 60) — improve or cut
2. Lowest B-tier — improve toward A
3. Lowest A-tier — polish toward S

## Do ONE thing

Read the experience's HTML source. Identify its single weakest dimension from the 10-dimension rubric (Trigger, Hook, Glasses Advantage, Return, D-Pad Fit, Audio, Session Variance, Strategic Depth, Surprise, Craft).

Make ONE focused improvement targeting that dimension. Keep it small and testable.

## Score honestly

Re-score all 10 dimensions after the change. Display as /100 (raw × 2). Update QUALITY.md with new score and brief note on what changed. Update experiences/index.html score if it changed.

Think Metacritic — 90+ means genuinely exceptional. Don't inflate.

## Constraints
- MRBD: 600×600, D-pad only (←→↑↓ + Enter), dark #0d0d0d, Web Audio, system fonts
- Mic: micFailed=true BEFORE getUserMedia, try/catch, smooth lerp, graceful fallback
- ONE experience per cycle. Don't try to do everything.
- Push to main when done.

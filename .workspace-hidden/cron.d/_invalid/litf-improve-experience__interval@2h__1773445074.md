---
id: litf-improve-experience
enabled: true
mode: task
schedule:
  kind: interval
  timezone: UTC
  at: 2026-03-13T21:20:00Z
  every: 2h
execution:
  target: isolated
---
# LITF Experiences — Quality-First Improvement (MRBD)

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
- `EVALUATE.md` — scoring rubric and lessons learned

## Priority Order (every cycle, pick the FIRST applicable)

### 1. Evaluate unrated items
If any experience in `QUALITY.md` has `Honest Tier: TBD`, evaluate it:
- Actually READ the experience's HTML source code
- Check for JS errors, broken logic, impossible states
- Assess real-world usability honestly
- Assign a tier (S/A/B/C/F) with specific reasoning
- Update `QUALITY.md`
- Evaluate 2-3 experiences per cycle max

### 2. Cut F-tier experiences
If any experience is F-tier:
- Remove the directory from `experiences/`
- Remove from `experiences/index.html` gallery
- Log the removal in QUALITY.md Trim Log
- Push

### 3. Improve C-tier experiences (2 attempts, then cut)
If any experience is C-tier:
- Read the source, identify the single biggest weakness
- Make ONE focused improvement
- Re-evaluate — did it reach B? If 2nd attempt and still C, downgrade to F

### 4. Improve B-tier experiences
Pick the B-tier experience with the most potential. Make ONE improvement. Re-evaluate.

### 5. Polish A-tier experiences toward S
Pick the A-tier experience closest to S. Make ONE refinement.

### 6. Create a new experience (only when all existing experiences are B+ and drafts/ is empty)
- Check `experiences/` — never duplicate a category
- PM validate (who/when/why/better-than-phone)
- Score with EVALUATE.md rubric — need 20+ to start drafting
- Write draft to `drafts/exp-SLUG.html` with `drafts/exp-status.json`
- Do NOT publish yet. Revise over subsequent cycles.
- Publish only when honestly A-tier or above.

## Gallery Ordering
`experiences/index.html` must be ordered by quality tier:
- S-tier first, then A, then B
- Within each tier, alphabetical
- Each card shows the tier badge: ⭐S / 🅰️A / 🅱️B
- No C or F tier experiences should be in the gallery

## Rules
- MRBD: 600×600, D-pad only, dark #0d0d0d, Web Audio, system fonts
- 🎤 Mic: Use where applicable. micFailed=true BEFORE getUserMedia, try/catch, smooth (lerp), graceful fallback
- Update QUALITY.md and EVALUATE.md after every change
- Push to main only when publishing or making improvements
- Self-critique gate: Propose → Challenge → Verdict (skip if marginal)

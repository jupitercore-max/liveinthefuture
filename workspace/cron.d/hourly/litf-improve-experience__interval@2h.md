---
id: litf-improve-experience
enabled: true
mode: task
schedule:
  kind: interval
  timezone: UTC
  at: 2026-03-14T00:20:00Z
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
- `EVALUATE.md` — scoring rubric (10 dimensions, /100 display) and lessons learned

## Scoring System (10 dimensions × 5 = 50 raw, displayed as /100)

### Original 6 Dimensions
Trigger Moment, 5-Second Hook, Glasses Advantage, Return Visits, D-Pad Fit, Audio/Context Use

### 4 New Dimensions (added March 2026)
- **Session Variance** — How different is each use? Rank progression does NOT count.
- **Strategic Depth** — Meaningful decisions with tradeoffs.
- **Surprise / Discovery** — Does the experience reveal new things over time?
- **Craft** — Is there a design moment that feels genuinely inspired?

### Tier Thresholds (/100)
- S-tier (90-100): Requires human playtest — AI CANNOT assign this tier
- A-tier (76-88): Ship proudly
- B-tier (60-74): Solid but has weaknesses
- C-tier (40-58): Cut candidate
- F-tier (<40): Remove

## AI Evaluation Cap
**You are an AI. You CANNOT give any experience a score above 88/100.**
If it deserves S-tier, score it 88/100 and note: "S-tier candidate — requires Ray's confirmation."

## Priority Order (every cycle, pick the FIRST applicable)

### 1. Evaluate unrated items
If any experience in `QUALITY.md` has no score, evaluate it:
- Actually READ the experience's HTML source code
- Score all 10 dimensions honestly
- Display score as /100 (raw × 2)
- Update `QUALITY.md` and `EVALUATE.md`

### 2. Cut F-tier experiences
Remove, log in QUALITY.md Trim Log.

### 3. Improve C-tier experiences (2 attempts, then cut)
Read source, identify biggest weakness, make ONE focused improvement.

### 4. Improve B-tier experiences
Pick the B-tier experience with the most potential. Target weakest NEW dimension.

### 5. Polish A-tier experiences
Pick the A-tier experience closest to 88. Make ONE refinement. Cannot promote above 88.

### 6. Create a new experience (only when all existing are B+ and drafts/ is empty)
- PM validate (who/when/why/better-than-phone)
- Score with rubric — need 60/100+ to start drafting
- Publish only when honestly 76/100 (A-tier) or above.

## Gallery Ordering
`experiences/index.html` ordered by score (highest first).
Score color coding: 88=gold, 76-87=blue, 60-75=gray.

## Rules
- MRBD: 600×600, D-pad only, dark #0d0d0d, Web Audio, system fonts
- 🎤 Mic: Use where applicable. micFailed=true BEFORE getUserMedia, try/catch, smooth (lerp), graceful fallback
- Update QUALITY.md and EVALUATE.md after every change
- Self-critique gate: Propose → Challenge → Verdict (skip if marginal)

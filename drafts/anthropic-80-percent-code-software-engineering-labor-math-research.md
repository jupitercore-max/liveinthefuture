# Research Notes: Anthropic 80% Code / Software Engineering Labor Math

## Primary Source
- **Title:** "When AI Builds Itself" — Anthropic blog post, June 4, 2026
- **Authors:** Marina Favaro (Anthropic Institute Lead) + Jack Clark (Anthropic Co-Founder)
- **URL:** https://www.anthropic.com/engineering/when-ai-builds-itself (also at anthropic.com/research/)

## Key Data Points (from Anthropic report)

### Code Authorship
- **80%+ of merged code** at Anthropic written by Claude (as of May 2026)
- Before Claude Code launch (Feb 2025): **low single digits**
- Engineers merging **8× as much code per quarter** as 2021-2024 baseline

### Internal Survey
- March 2026 poll of **130 employees** across research teams
- Median respondent: **~4× as much output** using Mythos Preview vs no AI
- Anthropic acknowledges respondent bias likely overstates the real gain

### Open-Ended Engineering Tasks
- Success rate: **76% in May 2026**, up 50 percentage points in 6 months
- Example: Claude fixed 800+ API errors (reduced error class by 1000×), estimated **4 human-years** of work
- Example: Routine dependency upgrade crashing training jobs → Claude isolated obscure debugging flag, fixed in 2 hours (human: 2-3 days)

### Research Performance
- Training speedup benchmark: **52× in April 2026** (vs 3× in May 2025 with Claude Opus 4)
- Human researcher baseline: 4-8 hours for ~4× improvement
- Open-ended research project: agents recovered **97% of performance gap** on AI safety question; two human researchers recovered 23% working a week
- Cost: ~800 compute-hours, $18,000
- Research direction: Mythos Preview chose better next steps than humans **64% of the time** (April 2026, up from 51% in Nov 2025)

### Autonomous Task Duration
- Claude Mythos Preview: 16+ hours sustained reliable performance (METR evaluation)
- Opus 4.6: tasks taking a skilled human **12 hours** (up from 4 minutes in March 2024)

### Benchmarks
- Task duration doubling every **4 months** (accelerated from 7 months)
- SWE-bench: low single digits to near-saturation in 2 years
- CORE-Bench (reproducing research papers): 20% → saturation in 15 months

### Employee Quotes
- "I started leaning hard into Claudifying about a year ago. It's now been roughly five months since I last wrote any code myself."
- "The comparative advantage of humans as of right now is still in seeing the bigger picture and thinking beyond the confines of the immediate task."

### Three Scenarios
1. S-curves flatten, diminishing returns (Anthropic says **unlikely**)
2. Efficiency compounds, humans retain direction-setting (current trajectory)
3. Full autonomous recursive self-improvement, humans shift to oversight

### Pause Proposal
- Would slow/pause "alongside other frontier developers" if done "in a verifiable manner"
- NOT unilateral — conditional on competitors doing the same
- "Training runs are easier to conceal than missile silos"
- Anthropic Institute committing to convene policymakers + labs

## US Software Engineering Labor Data

### Employment (BLS/MarketWatch, May 2026)
- Software development + computer design: **2.37M** jobs (May 2026)
- Peak: **2.48M** (2023) → down steadily since
- 7,000 positions eliminated Jan-May 2026 in this category alone
- Internet/data center jobs: 466,100 (down from 489,000 peak 3 years ago)
- Combined tech employment: down **4.5% from 2.97M peak** (2023)

### AI-Linked Layoffs (Challenger, Gray & Christmas)
- 2026 YTD: **87,714** AI-cited job cuts (more than 2024 + 2025 combined)
- 2025 full year: 54,836
- 2024 full year: 12,742
- May 2026 alone: **38,579** (40% of all May cuts, highest monthly since tracking began)
- AI is now **leading cause** of announced job cuts, 3 months running (March-May)
- Tech YTD: 123,653 cuts, up 65% YoY

### BCG Forecast
- 50-55% of US jobs reshaped by AI in 2-3 years
- 10-15% face full elimination
- Rest see augmentation

## IPO / Valuation Context
- Anthropic confidential IPO filing: days before report
- Last valuation: ~$965 billion (funding round)
- Revenue run rate implied by the pace of enterprise adoption

## Skeptic/Critic Reactions

### Noah Giansiracusa (Assoc. Prof. Mathematics, Bentley University)
- "I don't think it's a genuine call to slow down"
- "It's literally impossible. Zero chance there will be a slowdown. I'm not even talking China — Elon Musk would never slow down."
- Evidence Anthropic cites suggests technology is helpful, "rather than a great leap"

### Mark Riedl (Prof. Interactive Computing, Georgia Tech)
- "The big AI companies are all jumping on the 'recursive self-improvement' hype train" (Bluesky)

### Sam Altman (OpenAI CEO)
- "It is clearly incredible marketing to say, 'We have built a bomb, we are about to drop it on your head. We will sell you a bomb shelter for $100 million.'" (said previously)
- Called Anthropic's approach "fear-based marketing"

### LinkedIn critics
- "How can a company be genuinely concerned about a risk while still being structurally committed to creating more of that risk?"
- Pattern: Mythos withheld (too good at finding vulns), then pause call, then IPO filing

## ORIGINAL CONTRIBUTION: The Workforce Displacement Math

### Direct Extrapolation (if industry achieves Anthropic-level gains)
- At 8× productivity: 2.37M / 8 = **296,250** developers needed → 2.07M displaced (87%)
- At 4× (Anthropic's own conservative self-report): 592,500 needed → 1.78M displaced (75%)
- At 2× (conservative, partial adoption): 1.185M needed → 1.185M displaced (50%)

### Why This Understates the Problem
- 80% → from low single digits in ~16 months
- BLS data already shows 110,000 tech jobs gone from peak (4.5%)
- Trajectory: doubling every 4 months means the 80% figure is already stale
- "Five months since I wrote any code" = anecdotal confirmation of transition

### Why This Overstates the Problem (Jevons Paradox)
- When code gets cheaper, more code gets written → more demand
- Historical: ATMs didn't kill bank tellers (rose 300K→550K, 1970-2010)
- At 8× velocity, companies build what was previously impossible
- New categories: AI safety engineering, prompt engineering, AI ops
- GitHub Copilot data (2023-2025): companies using AI coding tools hired MORE developers, not fewer

### Counter-Counter
- ATM analogy breaks: ATMs handled one function (cash dispensing); AI handles the CORE function
- The quote matters: "five months since I last wrote any code myself" — this isn't augmentation, it's replacement of the activity itself
- Anthropic's own framing: "humans will stop writing code entirely and shift to only reviewing it"
- Review becomes bottleneck → review gets automated → ??
- Anthropic says Scenario 1 (S-curves) is "unlikely based on current evidence"

## Differentiation from Existing LITF Articles
- `anthropic-pause-verification-game-theory.html` → focuses on arms control verification analogy
- This article → focuses on the LABOR MATH, what 80% AI-authored code means for 2.37M workers
- No overlap in thesis or original contribution

## Related LITF Articles for Footer
1. ai-layoffs-capex-trade.html — "150,000 Tech Workers Were Laid Off to Buy GPUs"
2. ai-entry-level-paradox.html — Entry-level AI paradox
3. anthropic-pause-verification-game-theory.html — The pause/verification angle

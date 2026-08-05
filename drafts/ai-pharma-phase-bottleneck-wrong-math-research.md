# Research: AI Drug Discovery's Phase Problem

## Core Thesis
AI drug discovery has a phase-adjusted value problem. AI-designed molecules succeed 80-90% of the time in Phase 1 (vs. 50% historical), but their Phase 2 success rate falls back to the industry's ordinary ~40%. ALL of AI's improvement is concentrated in the cheapest phase ($4M avg), with zero improvement in Phase 2 ($13M) or Phase 3 ($20M+). Run the math: AI's actual contribution to reducing the $2.6 billion average cost of bringing a drug to market is far less impressive than the headline numbers suggest.

## Primary Sources

### BCG Analysis (cited in ProMarket, July 2, 2026)
- AI-designed molecules in Phase 1: 80-90% success (vs. ~50% historical)
- AI-designed molecules in Phase 2: ~40% success (same as historical average)
- Phase 3: first AI-designed drugs only now reaching Phase 3, no track record
- Net effect: end-to-end odds roughly double, from 5-10% to 9-18%
- "Every point of that gain is banked in the cheap early stage"
- Source: ProMarket/BCG, July 2, 2026

### Phase Cost Data
- Phase 1 trial: ~$4 million average
- Phase 2 trial: ~$13 million average
- Phase 3 trial: ~$20 million average (often far more)
- Total cost to bring a drug to market: ~$2.6 billion (Tufts CSDD, standard industry estimate)
- Source: BCG via ProMarket; Tufts CSDD

### MDPI Study (June 2026) — "AI in Drug Discovery: Clinical Failures"
- Clinical success rate (overall approval probability): ~8-12% for both AI and traditional pipelines
- "AI has not yet reduced Phase II/III attrition significantly"
- AI mainly improves earlier pipeline speed, not approval speed
- Key real-world evidence: DSP-1181 (failure), REC-994 (failure), Rentosertib (Phase II signal), REC-4881 (emerging signal)
- Source: Pharmaceuticals journal (MDPI), 2026, 19(6), 916

### Epistemic AI / Nature Reviews Drug Discovery (January 2026)
- Analysis of 3,180 terminated trials between 2013-2023
- Late-stage termination rate doubled from 11% to 22% over the decade
- "Strategic and Business" factors now outpace clinical efficacy as leading cause of Phase 2-3 terminations
- Phase 3 costs: $50-250M per asset
- Source: Nature Reviews Drug Discovery, January 8, 2026

### BullFrog AI CEO (July 2026)
- "More than 90% of AI deals in pharma are missing their milestones"
- "Most companies are wrapping open-source tools rather than innovating"
- Source: Interview with Vin Singh, BullFrog AI

### Existing LITF Coverage
- "173 AI-Designed Drugs Are Now in Human Trials" — positive story
- "The First Drug Designed Entirely by AI Just Improved Lung Function in Humans" — positive story
- THIS article is the necessary contrarian follow-up

## Original Calculations

### 1. Phase-Adjusted Cost Savings Per Candidate

Traditional pipeline expected cost per successful drug:
- Need ~12 Phase 1 candidates to get 6 through (50% success)
- Need ~6 Phase 2 candidates to get 2.4 through (40% success)
- Need ~2.4 Phase 3 candidates to get 1.4 through (58% success)
- Need ~1.4 NDA submissions to get 1 approval (91% success)

Cost: 12×$4M + 6×$13M + 2.4×$20M + regulatory = $48M + $78M + $48M + ~$5M = $179M in trial costs alone

AI pipeline expected cost per successful drug:
- Need ~7 Phase 1 candidates to get 6 through (85% success) — IMPROVED
- Need ~6 Phase 2 candidates to get 2.4 through (40% success) — SAME
- Need ~2.4 Phase 3 candidates to get 1.4 through (58% success) — SAME
- Need ~1.4 NDA submissions to get 1 approval — SAME

Cost: 7×$4M + 6×$13M + 2.4×$20M + regulatory = $28M + $78M + $48M + ~$5M = $159M

Savings: $179M - $159M = $20M per successful drug
Percentage: $20M / $179M = 11.2% reduction in trial costs

BUT: Total drug development cost is ~$2.6B (including failed programs)
$20M / $2.6B = 0.77% of total development cost

### 2. Where the Money Actually Burns
Phase 1: $4M × (avg candidates per approval)
Phase 2: $13M × candidates = 3.25× Phase 1 cost
Phase 3: $20M × candidates = 5× Phase 1 cost (but often $50-250M)

AI improves Phase 1 success by 35 percentage points but saves only $20M.
A 1 percentage point improvement in Phase 3 success would save more than AI's entire Phase 1 contribution.

### 3. The AI Pharma Investment-to-Savings Ratio
Total AI in pharma investment: estimated $15-20B+ deployed across biotech AI platforms (2020-2026)
Annual drug development cost savings from Phase 1 improvement: ~$20M × ~50 new drugs/year = ~$1B/year at full adoption
ROI timeline: 15-20 years to recoup AI investment through Phase 1 savings alone

### 4. The "Wrong Bottleneck" Math
- Phase 1 is 2.2% of total drug development cost ($4M / $179M trial costs)
- Phase 3 is 26.8% ($48M / $179M)
- AI has 35 percentage point improvement in the 2.2% slice
- AI has 0 percentage point improvement in the 26.8% slice
- The bottleneck that matters most (Phase 2/3 biology) is exactly where AI adds nothing

## Kill Test
Original calculation: YES — the phase-adjusted savings per approved drug ($20M, or 0.77% of total development cost), the "wrong bottleneck" percentage breakdown, and the investment-to-savings ratio are all novel calculations using published but uncombined data points.

## Strongest Counterargument
AI's Phase 1 improvement means more candidates survive to enter Phase 2, creating a larger pool of potential winners. Some argue this increases the raw number of drugs that eventually reach patients even if per-candidate success rates are unchanged. The quality of AI-selected Phase 1 candidates may also improve Phase 2 success over time as training data grows.

## Limitations
- BCG analysis covers "about two dozen" AI-discovered molecules — a small sample
- Phase 3 data doesn't exist yet for AI-designed drugs (first ones entering now)
- The $2.6B Tufts estimate includes opportunity cost of capital; direct out-of-pocket is ~$1.4B
- Success rates vary enormously by therapeutic area (oncology much lower than average)

## Journalist
Priya Desai — covers biotech/longevity/medical tech

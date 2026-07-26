# SpaceX's $15B Rocket vs $400M Falcon 9 — The Reusability Scissors

## Core Thesis
SpaceX spent $15 billion developing Starship — 37.5× what Falcon 9 cost. After 13 test flights, the booster still can't land, it can't reach orbit, and its V3 Starlinks burned up 20 minutes after deployment. Meanwhile, Starlink ARPU fell 33% in 2.5 years (from $99 to $66). The S-1 filing shows the math only works with full reusability — which keeps failing. This is the ARPU-reusability scissors problem.

## Key Data Points

### Starship Development
- Total investment: $15B+ (S-1 filing via Reuters)
- 2025 R&D alone: ~$3B (TechRepublic analysis of S-1)
- Falcon 9 development cost: $400M (Reuters comparison)
- Ratio: 37.5× more expensive than Falcon 9
- Test flights completed: 13 (as of July 25, 2026)
- Commercial flights: 0
- Boosters successfully reused: 0
- Falcon 9 flights: 400+ and counting
- Sources: Reuters ($15B), TechRepublic ($3B/yr), SpaceX S-1 filing

### Test Flight 13 (July 25, 2026)
- Booster: Failed simulated landing, exploded on water impact (2nd V3 booster failure)
- Ship: Survived reentry, performed simulated landing, floated (first time it didn't explode when tipping)
- Payload: 20 V3 Starlink satellites deployed, communicated successfully, but burned up ~20 min later (can't reach orbit)
- Prior abort July 17: 4 engines didn't light due to frozen water seizing turbopumps
- 6 engines replaced before July 25 attempt
- Source: TechCrunch (Sean O'Kane, July 24)

### SpaceX S-1 Financial Data (2025)
- Total revenue: $18.7B
- Net loss: $4.9B
- EBITDA: $6.58B
- Revenue growth 2024→2025: 33%
- Q1 2026 YoY revenue growth: 15%

### By Segment (2025)
- Starlink (Connectivity): $11.4B revenue, $4.4B operating income, 61% of total, 63% EBITDA margin
- Space (Launch): $4.1B revenue, $657M operating loss (Starship R&D drag)
- AI (xAI, acquired Feb 2026): $3.2B revenue, $6.4B operating loss
- Source: SpaceX S-1, PitchBook analysis, Morningstar, LinkedIn analysis

### Starlink ARPU Decline (from S-1)
| Period | ARPU |
|--------|------|
| 2023 | $99 |
| 2024 | $91 |
| 2025 | $81 |
| Q1 2026 | $66 |
- 33% decline in ~2.5 years
- Driven by international expansion into lower-priced markets
- SpaceX expects ARPU to continue declining
- Source: SpaceX S-1 filing, Motley Fool analysis

### Starlink Subscriber Data
- Total subscribers: 10M+
- Growth rate falling per Q1 2026 (Quilty Space, Tim Farrar)
- Quilty Space projection: 16.8M end of 2026 (requires doubling quarterly growth rate)
- Source: SpaceX S-1, TechCrunch (Tim Fernholz)

### Starlink Capex Treadmill
- Satellite business capex since 2023: $11.4B (equals total Starlink revenue for 2025)
- Need to replace ~20% of constellation annually
- Each dollar of Starlink revenue matched by $1 of capex
- Source: TechCrunch (Tim Fernholz analysis of S-1)

### Reusability Economics (the scissors)
**Without reusability (expendable Starship):**
- Cost per launch: ~$100M (Tim Farrar estimate)
- Cost per kg: ~$1,000
- "Not much lower than Falcon 9" per Farrar
- Manufacturing bottleneck: constrained by rate of second-stage production + first-stage refurbishment

**With full reusability:**
- Target cost per launch: $10M (Musk estimate)
- Target cost per kg: ~$100
- 90% reduction vs Falcon 9 commercial price
- Requires catching booster with tower arms + rapid turnaround

**The gap:** 10× cost difference between expendable and reusable
- Source: Tim Farrar client note (via TechCrunch), SpaceX S-1

### V3 Starlink Satellites
- Capacity: ~1 Tbps downlink each (20× V2 Mini)
- Construction cost: $1.2M each (Motley Fool, SpaceX disclosure)
- Per Starship launch: 60 satellites (vs 23 V2 on Falcon 9)
- 20× capacity increase per launch vs Falcon 9
- V3 satellites too large for Falcon 9 — require Starship
- Production target: 10,000/year
- Source: Motley Fool, SpaceX S-1, Memeburn analysis

### Stock Performance
- IPO price: ~$135 (June 2026, largest IPO ever at $1.75T valuation)
- Peak: >$200
- Current (July 25): ~$115 (down ~15% from IPO)
- Trading at ~40× estimated 2026 sales
- $29.1B total debt including $20B bridge loan maturing 15 months post-IPO
- First quarterly earnings report: ~2 weeks away
- Source: Barron's, TechCrunch, PitchBook

### SpaceX S-1 Warning Language
"Our ability to execute our growth strategy is highly dependent on the successful development and scaling of Starship"
"If this reusability is not achieved then the cost of launch on Starship may not be much lower than Falcon 9" (Farrar)
"Without a fully-reusable Starship, progress on Starlink would be at a slower pace and higher cost" (S-1)
- Source: SpaceX S-1 filing, Tim Farrar client note

## Original Calculations

### 1. Cost per Gbps Deployed to Orbit
Including launch + satellite construction costs:
- V2 Mini on Falcon 9 (internal cost ~$28M): (23 × ~50 Gbps) / ($28M + 23 × $0.25M) = 1,150 Gbps / $33.75M = **34.1 Gbps per $M**
- V3 on expendable Starship: (60 × 1,000 Gbps) / ($100M + 60 × $1.2M) = 60,000 / $172M = **348.8 Gbps per $M** (10.2× V2/F9)
- V3 on reusable Starship: (60 × 1,000 Gbps) / ($10M + 60 × $1.2M) = 60,000 / $82M = **731.7 Gbps per $M** (21.5× V2/F9)
- Reusable vs expendable Starship: 2.1× difference

### 2. $15B Break-Even Flight Count
Savings per flight (reusable vs expendable): $100M - $10M = $90M
Break-even flights: $15B / $90M = **167 fully reusable flights**
At projected 2027 cadence of ~24 Starship flights/year: ~7 years to payback
At projected 2030 cadence of ~100/year: 1.67 years
Note: This ignores time value of money, ongoing R&D, and infrastructure maintenance

### 3. ARPU-Reusability Scissors
Annual Starlink revenue at current ARPU ($66) × 10M users = $7.92B
Annual Starlink capex (running rate): ~$4.56B/year
Gross margin: $3.36B (42.4%)
At $99 ARPU (2023): $11.88B revenue, $7.32B gross margin (61.6%)
ARPU decline per year: ~$11/year
At this rate, ARPU reaches ~$44 by 2028
At $44 ARPU × projected 16M users: $8.45B revenue vs growing capex
Without reusability capex stays high; with reusability it drops dramatically

### 4. The $400M vs $15B Comparison
Falcon 9 investment: $400M → 400+ flights → ~$1M amortized development cost per flight
Starship investment: $15B → 0 commercial flights → undefined (∞)
At 167 flights: $15B / 167 = $89.8M per flight (just development cost amortization)
At 1,000 flights: $15B / 1,000 = $15M per flight
Falcon 9 has generated estimated $20B+ in launch revenue on a $400M investment (50× return)
Starship needs to fly 1,500+ times at $10M/flight just to match Falcon 9's development ROI

## Strongest Counterargument
SpaceX has demonstrated it can catch and reuse boosters (Falcon 9 lands routinely). Starship V1 boosters were caught at the tower (flights 5, 7). The V3 booster failures may be version-specific teething issues, not fundamental architecture problems. The company has 13 test flights of data to iterate on. If SpaceX achieves reusability at Musk's target cadence, the economics flip dramatically — 731 Gbps per dollar-million vs 34 Gbps currently. The bet could pay off by orders of magnitude.

## Limitations
- Internal Falcon 9 launch costs are estimated ($28M marginal); SpaceX doesn't disclose this
- V2 satellite capacity (~50 Gbps) is approximated from industry estimates
- V3 satellite construction cost ($1.2M) comes from a single SpaceX disclosure; actual costs may vary
- ARPU decline trajectory may not be linear (enterprise deals could stabilize it)
- Starship development spending may include infrastructure (launch pads, manufacturing) with independent utility
- We do not have per-launch cost breakdowns from the S-1; Tim Farrar's $100M expendable estimate is one analyst's projection

## Primary Sources
1. SpaceX S-1 Filing (SEC, May 20, 2026)
2. Reuters: SpaceX spending on Starship tops $15 billion (May 1, 2026) — https://www.reuters.com/business/autos-transportation/spacex-spending-starship-tops-15-billion-rush-airline-like-rocketry-2026-05-01/
3. TechCrunch: SpaceX launches new V3 Starlink satellites but suffers another booster failure (July 24, 2026) — https://techcrunch.com/2026/07/24/spacex-launches-new-v3-starlink-satellites-but-suffers-another-booster-failure/
4. TechCrunch: Starship's path to reusability looks murky after SpaceX's S-1 (May 26, 2026) — https://techcrunch.com/2026/05/26/starships-path-to-reusability-looks-murky-after-spacexs-s-1/
5. PitchBook: Q2 2026 SpaceX Update (S-1 dissection) — https://pitchbook.com/news/reports/q2-2026-spacex-update-starlink-prints-ai-burns-a-dissection-of-its-s-1
6. Morningstar: 6 Charts on SpaceX's Pre-IPO Financials — https://www.morningstar.com/stocks/6-charts-spacexs-s-1-financials
7. Motley Fool: SpaceX $66 ARPU metric — https://www.fool.com/investing/2026/05/28/spacex-could-soon-be-worth-2-trillion-this-66-metr/
8. Barron's: SpaceX Starship Aces Test 13 — https://www.barrons.com/articles/spacex-stock-starship-launch-delay-1a512dc8
9. Tim Farrar (TMF Associates): client note on Starship economics (May 2026, cited by TechCrunch)
10. SpaceX press release: Starship Flight 13 details (spacex.com)

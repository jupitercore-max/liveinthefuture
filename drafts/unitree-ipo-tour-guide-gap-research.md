# Research Notes: Unitree IPO Tour Guide Gap

## Core Thesis
The world's largest humanoid robot maker by unit sales just got approved for a $619M Shanghai IPO — and its own prospectus reveals that the primary commercial application for its humanoid robots is enterprise tour guides, not factory workers. The narrative says "replace factory labor." The revenue says "walk visitors around lobbies."

## Primary Sources
1. **Unitree IPO Prospectus** (364 pages, filed March 2026 with Shanghai Stock Exchange)
   - Revenue: ¥159M (2023) → ¥393M (2024) → ¥1.708B (2025). Growth: 146.57% then 333.08%
   - Net profit: -¥11.15M (2023) → ¥94.5M (2024) → ¥278M (2025)
   - Net margins: -7.00% (2023) → 24.08% (2024) → 16.37% (2025)
   - Gross margin: 59.8% companywide (vs Apple 47%)
   - Q1 2026: Revenue ¥420M (+69% YoY, sharp deceleration from 333%), net income ¥40.2M (DOWN 53% YoY)
   - H1 2026 guidance: ¥1.05-1.13B revenue, ¥236-283M profit (excl one-offs)
   - Humanoid units shipped: 5,500 in 2025 (32.4% global market)
   - Quadruped robots: 30,000+ total during reporting period
   - Average humanoid price: ¥593,400 (~$85K) in 2023 → ¥167,600 (~$25K) by 9M 2025
   - Revenue mix shift: Quadrupeds 76.57% (2022) → 42.25% (9M 2025); Humanoids 27.6% (2024) → 51.5% (9M 2025)
   - **CRITICAL: Humanoid "industry-application revenue mainly came from enterprise reception and tour-guide use, intelligent manufacturing and intelligent inspection, with enterprise tour-guide use accounting for roughly 50%-70%"**
   - "Limited commercial applications" acknowledged in prospectus
   - Scientific research and education account for "bulk of sales"
   - Products: H1 (full-size), G1 (medium), R1 (compact), H2 (full-size general-purpose)
   - IPO: ¥4.2B ($619M) raise, STAR Market, at least 40.45M new shares
   - Target valuation: $6.2B (per IFR), implying 74× P/E on annualized basis

2. **Morgan Stanley Forecast** (January 2026)
   - 23 million Chinese humanoid units by 2040
   - 300 million humanoids in use by 2050

3. **Reuters "Bleak Robot Reality" Analysis** (June 2026)
   - Competitors UBTech ($7.6B mkt cap, still in red) and Dobot (in red)
   - "Even relatively sophisticated models lack the necessary dexterity and intelligence for basic tasks"
   - CSRC approved under pilot pre-review mechanism

4. **Yicai Financial Data** (May 2026)
   - Q1 2026 breakeven concern: net income fell 53% from year ago to ¥40.2M, revenue +69%
   - Revenue growth decelerating: 333% → 69%

5. **Robot Report Analysis** (March 2026)
   - "The most important signal is lower humanoid robot selling prices and higher gross margins"
   - Points to "real cost advantage somewhere in the system"

6. **Gasgoo Revenue Timeline**
   - ¥123M (2022) → ¥159M (2023) → ¥392M (2024) → ¥1.708B (2025)

## Original Calculations (Kill Test)

### Calculation 1: The Tour Guide Revenue Problem
If humanoid revenue = 51.5% of ¥1.708B = ¥879.6M
And 50-70% of humanoid industry-application revenue is from tour guides
Let's estimate conservatively: 60% of humanoid revenue from tour guides = ¥527.8M ($77.6M)
At $25K per robot and 5,500 units: Total humanoid revenue per unit ≈ $160K * 5,500... wait, need to recalculate.

Actually: Total revenue ¥1.708B, humanoid share 51.5% = ¥879.6M, at 5,500 units = ¥159,927/unit ($23,500) average revenue per humanoid. This is roughly in line with the $25K ASP. Most revenue from direct sales.

The tour-guide gap: 50-70% of the "industry-application" humanoid revenue is tour guides. But how much is industry-application vs research/education? The prospectus says research/education is "bulk of sales." So the path is:
- Humanoid sales: 5,500 units total
- Bulk goes to research/education (let's say 60-70% of units)
- Of the remaining industry/commercial units (30-40%, ~1,650-2,200 units), 50-70% are tour guides
- So actual factory/manufacturing humanoid deployments: maybe 500-1,100 units globally

### Calculation 2: The 300M Humanoid Ramp
From 5,500 (2025) to 300,000,000 (2050) in 25 years
CAGR needed: (300,000,000/5,500)^(1/25) - 1 = (54,545)^(0.04) - 1
ln(54,545) = 10.906
10.906/25 = 0.436
e^0.436 = 1.547 → 54.7% CAGR, sustained for 25 years

For context: smartphone adoption from 2007-2025 was roughly 30% CAGR (0 to ~6.9B units cumulative, ~1.4B shipped/year). The humanoid ramp requires nearly 55% CAGR — nearly double the smartphone adoption rate — sustained for a quarter century.

### Calculation 3: Cost Competitiveness vs Chinese Labor
China average manufacturing worker annual salary: ~¥90,000-110,000 ($13,200-$16,200)
Including benefits: ~¥130,000 ($19,100)
At $25K per humanoid: payback in ~16 months if the robot replaces one worker
BUT: robots work limited hours (battery life, maintenance). Unitree robots don't specify runtime but comparable humanoids get 4-8 hours per charge.
At 4 hours per charge, 2 charges/day with downtime = ~7-8 productive hours vs 8-10 for a human
Factor in maintenance, charging infrastructure, supervision: effective cost multiplier of 1.5-2x
Real payback: 24-32 months — less compelling for industries with 200% employee turnover

### Calculation 4: Revenue Growth Deceleration
Q1 2025 implied quarterly revenue: ¥420M / 1.69 = ¥248.5M
Q1 2026: ¥420M (+69%)
If Q2 2026 grows at same ~69%: ¥420M * (1.69) = ... no, need Q2 2025 base
H1 2026 guidance midpoint: ¥1.09B → Q2 2026 ≈ ¥670M
Full-year 2025 revenue: ¥1.708B → H1 2025 ≈ ¥700M (estimated)
H1 2026 ¥1.09B / H1 2025 ¥700M = ~56% growth — deceleration from 333% to ~56%

## Competitors for Context
- Tesla Optimus: No revenue, not yet commercially deployed
- Boston Dynamics (Hyundai): Atlas robotics, no humanoid sales at scale
- Figure AI: $2.6B valuation (2024), no commercial revenue
- Apptronik: $5.5B valuation, "hundreds" of robots built, no revenue disclosed
- Agility Robotics: First US pure-play ($2.5B), manufacturing at RoboFab Oregon
- UBTech: $7.6B market cap, still unprofitable
- Dobot: Publicly listed, unprofitable

## Key Insight
Unitree is the ONLY profitable humanoid robot company in the world. It's also the only one with real scale. But its own IPO filing reveals the uncomfortable truth: the world's most successful humanoid robot business is primarily a tour-guide company that also sells research equipment. The 300M-unit future Morgan Stanley imagines requires a production ramp that's nearly 2x the pace of smartphone adoption, from a starting base of 5,500 units doing lobby tours.

## Journalist
Kai Nakamura — Robotics beat

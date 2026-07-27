# Research Notes: Tesla's 380,000-Mile Robotaxi Safety Claim — Statistical Significance

## Core Thesis
Tesla VP of AI Ashok Elluswamy announced on the Q2 2026 earnings call (July 22) that Tesla's robotaxi fleet has driven 380,000 unsupervised miles with "zero notable incidents." Markets and media treated this as a validation of Tesla's approach. But a Poisson significance test reveals the claim is mathematically meaningless: a human driver has a 34.8% probability of also recording zero injury crashes over the same distance. Tesla would need at least 1.08 million unsupervised miles — nearly 3× its current total — before zero incidents reaches even 95% statistical confidence against the human baseline.

## Original Calculation: The Poisson Test Nobody Ran
- Human injury crash rate: 2.78 per million miles (from Waymo/arXiv benchmark study, 7.1M miles, comparing ADS to human benchmarks)
- Expected injury crashes at 380K miles: 1.06
- P(zero injuries at human rate | 380K miles) = e^(-1.06) = 34.8%
- P(zero police-reported | human rate, 4.85 IPMM) = e^(-1.84) = 15.8%
- For 95% confidence (P < 0.05): need λ > 3.0 → need 1,077,602 miles minimum
- At current fleet size (~50 cars × 200 mi/day = ~70K mi/week): 15 weeks more to reach significance threshold

## Key Data Points (Q2 2026 Earnings)

### Tesla Q2 2026 Results
- Revenue: $28.24B (beat $26.42B estimate)
- EPS: $0.33 (missed $0.50 estimate by $0.17 — 34% miss)
- Auto gross margin ex-credits: 16.3% (down from 17.3% Q1)
- Deliveries: 480,126 (+25% YoY) — record, but at margin cost
- Net income: $1.15B (down 17% YoY despite revenue growth)
- Free cash flow: NEGATIVE (~$2.9B burn)
- Capex: $5.8B in Q2, guided $25B for full year 2026 (vs <$10B in 2025)
- Stock fell 14.5% on earnings day, to lowest in 2026
- P/E ratio: 289.85x trailing
- Market cap: ~$1.18 trillion

### Robotaxi Specifics
- 380,000 unsupervised miles (no in-vehicle safety monitor)
- 2.5 million total miles (including monitored rides)
- Operating in 6 cities, 2 states: Austin, Dallas, Houston, Miami, Tampa, Orlando
- Fleet size: "dozens" of vehicles (Wells Fargo asked "why not hundreds")
- Tampa and Orlando launched day before earnings (after missing 7-city June target)
- Service areas limited to "less-trafficked neighborhoods outside city centers" (Reuters)
- Musk: "We want to grow as fast as possible with robotaxi, without harm to anyone"
- Elluswamy: Growth is "literally exponential. Just, it's in the early part of the exponential."

### Waymo Comparison (220M Autonomous Miles, March 2026)
- 220 million fully autonomous miles (578× Tesla's unsupervised total)
- 4 million miles per week
- Operating in LA, SF, Phoenix, Austin, Atlanta
- Safety: 94% fewer serious/fatal injuries, 82% fewer airbag deployments, 93% fewer pedestrian injuries
- IIHS: 68% lower crash involvement rate over 50M driverless miles
- arXiv study: Injury rate 0.41 IPMM vs 2.78 IPMM human benchmark (85% reduction)
- P(zero injuries | 220M miles at human rate) ≈ 0 — genuinely significant

### Valuation Decomposition (Original)
- Tesla market cap: $1.18T on trailing EPS of $1.08
- Industry-standard auto P/E: ~6x (GM: ~6x, Ford: ~5-7x)
- Auto business at 6x: $24.4B
- Implied AI/Robotaxi/Optimus premium: $1,155.6B (98% of market cap)
- Premium per unsupervised robotaxi mile: $3,040,975
- Premium per total robotaxi mile: $462,228

### Capex Context
- $25B 2026 capex = 5.4× annualized net income ($4.6B)
- $25B = 43.1% of GM's entire market cap ($58B)
- Terafab chip-manufacturing facility in Texas (shared with SpaceX)
- Optimus production line construction started at Fremont
- Optimus v4 facility planned in Austin: 10 million robots/year capacity

## Strongest Counterargument
Tesla's fleet is growing at a "double-digit weekly rate" per Elluswamy. If true, the statistical significance threshold of 1.08M miles could be reached within months. And Tesla's camera-only approach, if validated, would be far cheaper to scale than Waymo's lidar-heavy sensor suite ($75K+ per vehicle). Tesla can retrofit its existing fleet of millions of vehicles; Waymo must build custom Jaguar I-PACEs. The exponential growth argument means judging Tesla by today's mileage is like judging Amazon's e-commerce business in 1999 by its book sales.

## Limitations
- "Zero notable incidents" ≠ "zero incidents." Tesla has not defined "notable." NHTSA reports show 200+ crashes involving Tesla automated driving systems, though these may be from FSD/Autopilot rather than dedicated robotaxi service.
- Our Poisson model assumes uniform crash probability, ignoring that Tesla's robotaxi geofences may be selected for lower-risk environments.
- Tesla's service areas are in "less-trafficked neighborhoods" — comparing to the general human crash rate may not be fair to either side.
- We use Waymo's arXiv benchmark (2.78 IPMM) for the human rate. The actual rate in Tesla's specific operating areas may differ.

## Sources
1. Tesla Q2 2026 Earnings Call transcript, July 22, 2026 — Ashok Elluswamy, Elon Musk quotes
2. Reuters, "Tesla's once-bullish tone on robotaxis shifts," July 23, 2026 — fleet size, expansion details
3. Fox Business, "Tesla touts 380,000 unsupervised robotaxi miles," July 23, 2026
4. MarketBeat, Tesla Q2 2026 earnings data
5. Investors.com, "Elon Musk Preaches Patience On Robotaxi," July 23, 2026
6. Waymo/arXiv, "Comparison of Waymo Rider-Only Crash Data to Human Benchmarks at 7.1M Miles" (arXiv:2312.12675)
7. Waymo Safety Data Hub update, June 2026 — 220M miles, 94% fewer serious injuries
8. CleanTechnica, "Waymo Shares Stunning Safety Update," June 24, 2026
9. WSJ, "Waymo Is Racking Up Thousands of Dollars of Parking Fines in Austin," July 26, 2026
10. IIHS / Torque News, "IIHS Says Waymo Data Point to Lower Crash Rates," July 7, 2026
11. USA Today, "Musk worries about 'Robotaxi'-crash headlines," July 23, 2026
12. TheStreet, "GM displays Q2 growth in key areas," July 25, 2026

## Journalist
Kai Nakamura — Semiconductor/Computing beat, quantitative analysis specialization. This article is primarily a financial/statistical analysis of a Q2 earnings claim.

## Category
🚗 Transport

## Headline Options
1. "Tesla's Robotaxi Drove 380,000 Miles With Zero Incidents. A Human Driver Had a 35% Chance of the Same Result."
2. "Tesla Says Its Robotaxi Is 'Impeccably Safe.' The Math Says You Need 3× More Miles to Know."
3. "Investors Paid $3 Million Per Unsupervised Robotaxi Mile. Here's What That Actually Bought."

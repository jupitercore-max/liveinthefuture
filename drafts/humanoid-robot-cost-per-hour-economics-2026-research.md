# Research: The $2-to-$30 Question — What Humanoid Robots Actually Cost Per Hour

## Core Thesis
Everyone in the humanoid robot industry quotes a different cost-per-hour figure. Roland Berger says $2. IDTechEx says sub-$5 by 2030. Agility charges $30 via RaaS. Bain cites cost parity "within reach." These numbers aren't contradictory — they measure different things at different stages. Nobody has built the comparison table that explains what each figure actually includes. This article does that, with an original calculation showing the true effective cost per human-equivalent productive hour.

## Kill Test: Original Analysis
1. Cross-reference BLS March 2026 fully-loaded employer costs by industry against current robot pricing models (RaaS, purchase, projected) to calculate exact crossover points
2. Calculate the "productivity-adjusted cost" — what the effective cost is when you factor in that robots don't yet match 100% of human task throughput
3. Build the bridge from $2/hr to $30/hr — show what each estimate includes/excludes

## Primary Sources

### BLS Employer Costs for Employee Compensation (March 2026)
- Source: U.S. Bureau of Labor Statistics, ECEC release USDL-26-0827, June 12, 2026
- URL: https://www.bls.gov/news.release/ecec.nr0.htm

| Industry | Wages | Benefits | Total Comp/hr |
|---|---|---|---|
| All Private | $32.60 | $14.01 | $46.60 |
| Manufacturing | $32.20 | $16.07 | $48.27 |
| Transportation & Warehousing | $32.60 | $16.44 | $49.04 |
| Construction | $35.54 | $15.69 | $51.23 |
| Retail | $20.41 | $6.23 | $26.64 |
| Accommodation/Food | $16.12 | $3.80 | $19.92 |

Union manufacturing: $37.34 wages + benefits (supplemental $2.61, retirement $5.05, leave $4.78, legally req $4.46, insurance $8.55) = significantly higher

Detroit CSA: $51.93 total comp
San Jose-SF-Oakland CSA: $75.12 total comp

### Robot Economics Data

**Agility Digit (Digit v4/v5)**
- RaaS rate: ~$30/hr per robot (bundles HW, SW, fleet mgmt, maintenance)
- Monthly: ~$8,500/month
- Revenue per robot over 5-year life: ~$500,000
- Customer payback: <1 year under RaaS
- BOM (Digit v4): ~$125,000
- Target BOM at scale: ~$30,000
- Sources: SPAC investor deck June 2026, SEC filings, TechTimes, RoboZaps
- RoboFab capacity: 10,000 units/year (theoretical)
- Real deployments: GXO (100K+ totes), Toyota Canada (7 robots, RAV4 line), Schaeffler, Mercado Libre

**IDTechEx Projections (May 2026 report)**
- ASP 2024: $114,700
- ASP 2030 projected: ~$37,000 (68% decline)
- High-utilization cost per hour by 2030: sub-$5
- Payback at high utilization 2026: ~6 months
- Payback at medium utilization: ~15 months
- Market: $25B by early 2030s, $29.5B by 2036
- 1.8M annual shipments by 2036

**Roland Berger (April 2026)**
- Projected operating cost at scale: ~$2/hr
- Market potential: $300B by 2035 (base), $750B (optimistic), $4T (long-term)
- "Convergence Moment" study

**Bain & Company**
- Unit cost dropped 40% between 2022-2024
- EU labor costs +5% 2023-2024
- Unitree robot: $16,000

**Tesla Optimus**
- Target price: ~$30,000 (revised from $20,000)
- External sales target: 2026

### Real Deployment Data

**BMW/Figure AI:**
- Figure 02 at Spartanburg SC: 10-hour daily shifts, 10 months
- Result: supported 30,000+ BMW X3 builds, moved 90,000+ sheet metal parts
- ~1,250 operating hours
- Productivity: ~72 parts/hour

**GXO/Agility:**
- Digit at Flowery Branch, GA
- 100,000+ totes moved (first commercial humanoid deployment)
- Multi-year RaaS contract

**Humanoid Ltd/Schaeffler:**
- Deal for 1,000-2,000 robots across global sites by 2032
- Initial rollout Dec 2026 - Jun 2027 at two German sites
- 5-year actuator supply deal (1M+ units)

**China:**
- Government target: 10,000 humanoid robots deployed by end 2026
- 100+ application scenarios
- UBTech: targeting 10,000 units/year production

### Labor Shortage Data
- NAM: 3.8M manufacturing jobs needed by 2033, up to half unfilled
- BLS Aug 2025: ~409,000 unfilled manufacturing positions
- Manufacturing employment: ~12.6M workers (BLS April 2026)
- Avg hourly earnings production workers: $30.10 (first time above $30)
- Deloitte/Manufacturing Institute: 67% have moderate-to-severe shortage

### Safety/Regulatory
- Figure AI whistleblower: forces 2x skull fracture threshold alleged
- No OSHA regulations specific to humanoid robots
- ISO 25785-1 (walking robots) under development
- American Security Robotics Act: Cotton/Schumer bipartisan, bars federal purchase from adversary-linked companies
- Unitree PLA-connected funding disclosed

## Original Calculation: The Cost Bridge

### What each estimate actually measures:

**$2/hr (Roland Berger)** = Operating cost only at scale
- Hardware amortized: $30K over 5 years ÷ 4,000 productive hrs/yr = $1.50/hr
- Energy: ~$0.15/hr (0.5 kWh × $0.10 + charging infrastructure)
- Maintenance reserve: ~$0.35/hr
- Total: ~$2/hr
- Does NOT include: integration, software, fleet management, downtime, training data

**$5/hr (IDTechEx 2030)** = Total cost of ownership, high utilization
- Hardware amortized: $37K over 5 years ÷ 4,000 hrs = $1.85/hr
- Software/AI: ~$1.00/hr
- Maintenance: ~$0.75/hr  
- Integration/overhead: ~$1.00/hr
- Energy: ~$0.40/hr
- Total: ~$5/hr
- Assumes structured industrial environment, optimized workflow

**$30/hr (Agility RaaS 2026)** = All-in subscription
- Hardware amortized: $125K/5yr ÷ ~2,000 productive hrs = $12.50/hr
- Software/fleet management: ~$5/hr
- Maintenance + support: ~$4/hr
- Agility margin: ~$6/hr
- Integration overhead: ~$2.50/hr
- Total: ~$30/hr
- Includes everything. Turn-key.

### Productivity-Adjusted Effective Cost:

To compare apples-to-apples with human labor, divide by productivity ratio:

| Scenario | Robot $/hr | Productivity vs Human | Effective $/human-eq-hr | vs Manufacturing $48.27 |
|---|---|---|---|---|
| Digit RaaS 2026 (high util) | $30 | 80% | $37.50 | 22% cheaper |
| Digit RaaS 2026 (med util) | $30 | 50% | $60.00 | 24% more expensive |
| IDTechEx 2030 (high util) | $5 | 85% | $5.88 | 88% cheaper |
| Roland Berger at scale | $2 | 80% | $2.50 | 95% cheaper |
| Direct purchase 2026 ($114K, 3yr) | ~$19 | 60% | $31.67 | 34% cheaper |

### The Breakeven Productivity Threshold
At $30/hr RaaS vs $48.27/hr manufacturing: robot must achieve ≥62.2% of human productivity to break even.
At $30/hr RaaS vs $49.04/hr transport/warehouse: must achieve ≥61.2%
At $30/hr RaaS vs $26.64/hr retail: must achieve ≥112.7% — NOT viable in retail at current RaaS pricing.

This is the key insight: humanoid robots are already economically viable in manufacturing and warehousing RIGHT NOW at modest productivity levels, but won't touch retail or food service until costs drop below ~$15/hr.

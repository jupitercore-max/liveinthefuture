# Research: Agility Robotics IPO — Humanoid Robot Unit Economics at Public Market Scale

## Story Angle
The first pure-play humanoid robot company is going public on US exchanges. Agility Robotics' $2.5B SPAC merger with Churchill Capital Corp XI (announced June 24, 2026) gives us the first public-market data point for what the industry thinks a humanoid robot company is worth. Combined with 65,000+ operational hours of real factory data, BLS manufacturing wage data, and competing platforms' disclosed economics, we can calculate — for the first time — what the public market is actually pricing per robot-hour of factory labor and whether the unit economics justify the bet.

## Key Original Contribution
**Break-even calculation nobody has run:** At the $2.5B valuation, we can reverse-engineer the implied revenue per robot-hour, unit economics, and required fleet size, then compare to the actual cost of a US manufacturing worker (BLS data May 2026). The math reveals a specific utilization threshold that determines whether the entire industry thesis works.

## Primary Sources

### 1. Agility Robotics / Churchill Capital SPAC Merger (June 24, 2026)
- Source: Reuters, TechCrunch, Morningstar press release
- $2.5B pre-money equity value
- $620M+ gross proceeds (incl. $200M PIPE led by Foxconn at $10/share)
- Ticker: AGLT
- $300M+ in multi-year contracted Digit v5 orders
- Pipeline of 30+ potential customers evaluating large-scale deployments
- 65,000+ operational hours across 9 customer sites
- Customers: Schaeffler, GXO, Toyota Motor Manufacturing Canada, Mercado Libre
- Backed by: Amazon, NVIDIA, SoftBank Vision Fund 2, DCVC, Foxconn, Schaeffler
- Previous Digit estimated at ~$250K/unit
- CEO Peggy Johnson: "Humanoids are at a meaningful inflection point in commercial adoption"
- "First U.S. publicly listed pure-play humanoid company with proven, active commercial deployments"

### 2. BLS Manufacturing Wage Data (May 2026, FRED/BLS)
- All manufacturing employees avg hourly earnings: $36.71 (May 2026)
- Production workers avg hourly: $30.19 (May 2026)  
- Production worker avg weekly hours: 41.6
- Benefits loading typically adds 30-40% (BLS Employer Costs for Employee Compensation)
- Total loaded compensation, all employees: ~$47.72-$51.39/hr
- Total loaded compensation, production workers: ~$39.25-$42.27/hr
- Team assemblers median: $22.19/hr ($46,140/year)
- Inspectors/testers/sorters median: $23.69/hr ($49,270/year)
- Annual total compensation (loaded, all mfg): ~$99K-$107K per worker

### 3. AGIBot G2 Factory Deployment Data (RobotsBeat, InterestingEngineering)
- Deployed at Longcheer Technology tablet production facility
- Throughput: 310 units/hour
- Cycle time: 19-20 seconds per operation
- Success rate: 99%+ (99.5% per RobotShift analysis)
- Integration time: 36 hours
- Each shift: ~3,000 units produced
- Cumulative: 140+ hours continuous operation
- Downtime losses: below 4%
- 1 robot = 2 human worker stations
- AGIBot produced 10,000th humanoid in March 2026
- Scaling to 100 robots per factory by Q3 2026
- 6-day global livestream Jun 23-28 from Nanchang factory

### 4. Boston Dynamics Atlas Pricing & Deployment (KED Global, Notebookcheck)
- Target price: below $320,000 (below 2 US manufacturing workers × 2 years)
- Current production cost: ~$300,000 per unit
- Planned scaled production cost (2030): ~$130,000 (with 70% actuator cost reduction via Hyundai Mobis)
- Factory of 30,000 units/year planned by 2028
- 25,000 Atlas robots planned for Hyundai factories from 2028
- European distributor pricing: €350K-€420K ($380K-$455K) fully loaded
- Hyundai Motor union: "Not a single robot without labor deal"
- Korea weighing "robot tax" as AI-driven job losses loom
- iM Securities analyst: "Once militant union cohort retires, gap filled with humanoids rather than new hires"

### 5. PayScale Manufacturing Worker Data
- Avg base hourly rate: $20.33 (manufacturing worker, 2026)
- Total pay range: $32K-$63K
- Entry level: $17.08/hr total comp
- Mid-career: $19.11/hr

## Original Calculations

### Calculation 1: Implied Valuation Per Deployed Robot-Hour
- $2.5B valuation / 65,000 cumulative hours = $38,462 per deployed hour
- But this is misleading — the valuation is forward-looking
- Better: What annual revenue does $2.5B require?

### Calculation 2: Revenue Required to Justify Valuation
- Industrial automation companies trade at 3-6x revenue (Fanuc ~5x, ABB ~3x, Rockwell ~6x)
- High-growth tech: 10-15x revenue
- At 8x revenue (growth premium): $2.5B / 8 = $312.5M annual revenue required
- At 5x revenue (maturing): $2.5B / 5 = $500M annual revenue required
- $300M backlog suggests current run rate well below these thresholds
- Implies market is pricing in significant growth trajectory

### Calculation 3: Unit Economics Per Robot
- At $250K/unit, $300M orders = 1,200 Digit v5 units
- 1,200 units × $250K = $300M (confirms order math)
- To reach $500M annual revenue: need 2,000 units/year at $250K
- OR: 1,200 units/year + $200M in recurring service/software revenue
- Recurring revenue model likely: RaaS (Robot-as-a-Service)

### Calculation 4: Robot Cost vs. Human Worker (Hourly)
**Inputs:**
- Robot capital cost: $250,000
- Useful life: 5 years (conservative)
- Operating hours: 16 hrs/day × 350 days = 5,600 hrs/year
- Uptime: 90% (conservative from AGIBot's 96%)
- Productive hours/year: 5,040
- Over 5 years: 25,200 productive hours

**Robot hourly cost:**
- Capital: $250,000 / 25,200 = $9.92/hr
- Maintenance (est 10% of capital/year): $25,000/yr / 5,040 = $4.96/hr
- Energy (~1 kW average): $0.12/kWh × 1kW = $0.12/hr
- Integration & support (15% of capital, year 1 only): $37,500 / 5,040 = $7.44/hr year 1, $0 after
- Software/licensing (est $3,000/month): $36,000/yr / 5,040 = $7.14/hr
- **Total year 1: $29.58/hr**
- **Total years 2-5: $22.14/hr**
- **Blended 5-year: $23.63/hr**

**Human worker loaded hourly cost:**
- BLS all manufacturing employees: $36.71/hr base
- With 35% benefits loading: $49.56/hr
- Annual: $49.56 × 2,080 hours = $103,085

**Savings per robot-hour (years 2-5): $49.56 - $22.14 = $27.42/hr = 55.3% savings**
**At 5,040 productive hours/year: $138,197 annual savings per robot**
**5-year total savings: $138,197 × 4 + ($49.56-$29.58) × 5,040 = $653,535**

BUT: This assumes the robot can perform 100% of the tasks a human would. Real task coverage is likely 40-70%.

**At 50% task coverage:**
- Robot replaces 0.5 FTE = $51,543 annual labor savings
- Net savings: $51,543 - $22.14 × 5,040 = -$60,023 (LOSS in years 2-5 at full hourly cost)

Wait, let me redo this correctly:
- 1 robot doing 50% task coverage replaces 0.5 workers
- Labor displaced: 0.5 × $103,085 = $51,543/year
- Robot annual cost: $22.14/hr × 5,040 hrs = $111,586/year
- Net: -$60,043/year (robot more expensive)

**Crossover point: Robot must cover ≥108% of a single worker's task output to break even at $250K**

This is the key finding. At Agility's $250K price point, the Digit robot needs to replace MORE than one full worker's output to break even — which is possible if it runs 16 hours/day while a human works 8, but only if task coverage is high enough.

**Real break-even:**
- Human cost per productive hour: $49.56/hr × 2,080 hrs = $103,085/year
- Robot cost per year: ~$111,586
- Robot runs 5,040 hrs vs human 2,080 hrs = 2.42× more hours
- If robot = 1 human-equivalent during overlap hours, it replaces 2.42 FTE
- 2.42 × $103,085 = $249,466 in labor displaced
- Net savings: $249,466 - $111,586 = $137,880/year

**This only works if the robot can genuinely do the same tasks at equivalent speed.** Current evidence suggests humanoid robots perform at 50-80% of human speed/capability on narrow tasks. At 65% effectiveness:
- 2.42 FTE × 0.65 = 1.57 FTE replaced
- 1.57 × $103,085 = $161,843
- Net savings: $161,843 - $111,586 = $50,257/year
- Payback period including year 1 integration: ($111,586 + $37,500 - $161,843) = -$12,757 loss in year 1
- Break-even in year 2, profitable from year 3

### Calculation 5: What the Market Is Actually Pricing
At $2.5B valuation and $300M backlog:
- Implied 3-year growth to $500M+ annual revenue
- At $250K/unit: 2,000 units shipped/year
- At 65% task effectiveness and 2.42× hours advantage: each robot saves $50,257/year
- Customer ROI: $50,257 annual savings on $250K investment = 20.1% annual return
- 5-year payback is ~4 years (including integration costs)
- Competitive with industrial automation ROI benchmarks of 2-5 years

## Strongest Counterargument
The 65,000 operational hours across 9 sites sounds impressive, but divides to ~7,222 hours per site. If each site runs 5-10 robots, that's 722-1,444 hours per robot — roughly 30-60 days of 24-hour operation. This is a pilot, not proof of production-scale reliability. Industrial equipment typically requires 40,000+ hours of MTBF (mean time between failures) data before customers commit to volume deployment. Agility's fleet has not yet demonstrated that level of durability, and the $2.5B valuation prices in a leap from pilot to production that hasn't happened yet.

## Limitations
- Agility has not disclosed per-unit pricing for Digit v5 (the $250K is an estimate based on prior gen)
- Maintenance costs are estimated; no public data on actual Digit maintenance burden
- Task coverage / effectiveness varies enormously by deployment type
- 65,000 hours is cumulative across all robots and sites; per-robot hours not disclosed
- Chinese competitors (AGIBot) operate in a fundamentally different labor market; direct price comparison is limited
- SPAC valuations have historically overstated company worth (DeSPAC performance data: median DeSPAC stock falls 30-50% within 2 years)

## Related LITF Articles
- "AGIBOT Shipped Its 10,000th Humanoid Robot. At $25,000 a Unit, the Math Against Human Workers Is Now Brutal."
- "1X's NEO Factory Is Open. The 49-Minute Ceiling Determines Whether the Business Model Lives."

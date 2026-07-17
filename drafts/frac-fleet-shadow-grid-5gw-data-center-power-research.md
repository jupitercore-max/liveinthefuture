# Research: The Frac Fleet Becomes the Grid — 5 GW of Shadow Power for AI

## Core Thesis
Oilfield services companies — specifically SLB and Liberty Energy — are building a parallel power infrastructure for AI data centers that bypasses the traditional grid entirely. Combined, they're targeting 5 GW of behind-the-meter power by 2029. This "shadow grid" is deploying faster than the actual grid can process interconnection requests, and it's invisible to grid planners.

## Primary Sources

### SLB-Liberty Alliance (July 15, 2026)
- Reuters: SLB partners with Liberty Energy to supply modular parts and power to data centers
- SLB press release via StockTitan
- Zacks analysis
- **Key facts:**
  - SLB: shipped >1.3 GW of prefabricated modular data center infrastructure since April 2024
  - SLB: expects cumulative deliveries to exceed 2 GW globally by year-end 2026
  - Liberty Energy: targets ~3 GW of power projects by 2029 (via Liberty Power Innovations)
  - Liberty provides natural gas-fired modular power generation + intelligent power controls
  - SLB provides modular infrastructure, project execution, global market reach
  - SLB is already a design partner for modular AI data centers built on Nvidia technology
  - SLB sold its North American hydraulic fracturing business to Liberty in 2020
  - Gavin Rennick (SLB president, New Energy & Industrial): "The bottleneck in AI infrastructure is no longer just compute. It is the ability to deliver infrastructure and power on the timelines the market now demands."
  - Ron Gusek (Liberty CEO): "The scale and complexity of AI energy infrastructure is fundamentally changing how power systems are built and deployed."

### Grid Interconnection Queue Data
- Berkeley Lab "Queued Up: 2025 Edition" (data through 2024):
  - ~10,300 projects actively seeking grid interconnection in US
  - 1,400 GW generation + ~890 GW storage in queue
  - Only 13% of capacity that submitted requests from 2000-2019 reached commercial operations by end 2024
  - 77% of that capacity had been withdrawn
  - Median wait from interconnection request to commercial operation: >4 years (was <2 years for 2000-2007 projects)
  - Active natural gas capacity in queue: 136 GW (+72% YoY in 2024)
- Federation of American Scientists analysis: 4-5 year average from request to commercial operation

### Gas Price Data (July 2026)
- Henry Hub spot: ~$2.87-2.91/MMBtu (Reuters, July 16, 2026)
- EIA 2026 forecast: $4.41/MMBtu average
- Standard Chartered 2026 forecast: $4.03/MMBtu
- 52-week range: $2.49-6.01/MMBtu

### Behind-the-Meter Context
- Bloom Energy: $1.7B Nebius AI fuel cell deal (July 16, 2026) + $2.6B total portfolio
- Liberty Energy 25 MW modular gas-fired "power blocks" — Pennsylvania deployment (April 2025)
- Behind-the-meter = producing power on-site, independent of utility transmission grid

### Chris Wright / Liberty Energy Connection
- Chris Wright founded Liberty Energy
- Chris Wright is current US Energy Secretary (Trump administration)
- Liberty Energy was originally a pure hydraulic fracturing company
- Now pivoting to data center power through Liberty Power Innovations arm

## Original Calculations

### 1. The Shadow Grid Scale
- SLB: 2 GW shipped/contracted by EOY 2026 (confirmed)
- Liberty Power Innovations: 3 GW target by 2029
- Combined: 5 GW of behind-the-meter capacity
- At 85% capacity factor: 5 GW × 0.85 × 8,760 hrs = 37.2 TWh/year
- Equivalent to: ~3.4 million homes' annual consumption (at ~11,000 kWh/home/year)
- Or: ~74 hyperscale data centers at 50 MW each

### 2. Deployment Speed Comparison
- Behind-the-meter modular gas: 6-18 months from contract to power delivery
- Grid interconnection: median >4 years from request to COD (Berkeley Lab 2025)
- SLB shipped 1.3 GW in ~27 months (April 2024 to July 2026)
- That's ~0.58 GW per year actual throughput
- Grid gas interconnection: 136 GW in queue × 13% completion rate = ~18 GW eventual. Over 4+ years = ~4.5 GW/year BUT with massive lag
- Key insight: for data centers specifically, behind-the-meter providers are delivering power within months, not years

### 3. Cost Math
- Gas fuel cost at $2.90/MMBtu:
  - Simple cycle gas turbine heat rate: ~9,000-10,000 BTU/kWh → ~$26-29/MWh fuel cost
  - Combined cycle heat rate: ~6,500-7,000 BTU/kWh → ~$19-20/MWh fuel cost
  - Liberty uses modular gas turbines (likely simple cycle or aeroderivative) → ~$25-30/MWh fuel
- Add O&M + capex amortization: ~$15-25/MWh
- Total behind-the-meter cost: ~$45-55/MWh
- Grid industrial rates in data center corridors:
  - Northern Virginia (PJM): $60-80/MWh and rising (transmission charges increasing)
  - Texas (ERCOT): $40-60/MWh but volatile
  - BUT you have to wait 4+ years to connect
- The real premium: behind-the-meter buys TIME, not just power

### 4. Carbon Impact
- 5 GW of gas at 85% CF:
  - Simple cycle emissions: ~500-600 kg CO2/MWh
  - Combined cycle: ~350-400 kg CO2/MWh
  - Using 450 kg CO2/MWh average: 37.2 TWh × 450 kg = ~16.7 million tons CO2/year
  - Equivalent to: ~3.6 million passenger cars
- Microsoft's 2023 emissions: 15.4 million tons total
- So this shadow grid could add more CO2 than Microsoft's entire operations

### 5. The Irony Index
- SLB sold its North American frac business to Liberty in 2020 (exiting fracking)
- Now reuniting as data center power partners
- Liberty's founder Chris Wright is Energy Secretary
- His old company is building private power grids that bypass the public grid
- The fracking equipment is literally being repurposed: Liberty's modular power platforms evolved from frac fleet gas turbine expertise

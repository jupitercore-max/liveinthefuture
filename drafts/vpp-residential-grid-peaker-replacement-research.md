# Research: Virtual Power Plants — Residential Batteries Replacing Peaker Plants

## Moltbook Source
- Post: "The grid is becoming a collection of residential batteries" by @dynamo (Jul 16, 2026)
- Score: 10 | Comments: 0
- Key observation: 110,000 residential BESS from 80,000 households coordinate to hit 425MW. Physics doesn't care if electrons come from gas turbine or suburban garage.

## Primary Sources

### Sunrun CalReady VPP (California)
- 2024: 16,000 households, 48 MW average, 54 MW peak
- 2025: 75,000 batteries from 56,000+ customers, 250 MW average per 2-hour event, peak 375 MW
- Growth: 4.7x in one year
- Customer compensation: up to $150/battery, ~$10M total 2025 (up from $1.5M in 2024)
- Dispatch window: 4-9 PM, May-October
- Equivalent: powers ~280,000 homes (all of Ventura County)
- Source: Sunrun investors.sunrun.com, GlobeNewsWire

### Sunrun x PG&E Partnership (Peak Power Rewards)
- 8,500 customers, 34 MW
- 7-9 PM, August-October
- Customers get $750 upfront + smart thermostat
- Source: pge.com

### DOE Targets
- Current US VPP capacity: 30-60 GW
- Target: 80-160 GW by 2030
- Potential savings: ~$10 billion/year in grid costs (avoid peaker plants + transmission upgrades)
- Source: DOE "Pathways to Commercial Liftoff: VPPs" (Jan 2025)

### Base Power (Texas)
- Founded by Zach Dell (son of Michael Dell)
- Raised $1 billion
- Deploying 20 MW/month (mid-2025), targeting 100 MW/month by mid-2026
- 25 kWh or 50 kWh battery packs for monthly fee
- "Gentailer" model: owns batteries, sells electricity, promises backup
- Source: ieefa.org, Catalyst podcast

### NRG Energy (Texas)
- 2025 initial target: 20 MW → bumped to 150 MW due to demand
- Long-term: 1 GW dispatchable residential by 2035
- Source: ieefa.org

### Sonnen (Europe → US)
- Largest VPP operator in Europe
- US: 6,000 homes in Utah
- Texas launch: 60 MWh → 150 MWh by end of year
- Source: ieefa.org

### Wood Mackenzie Data
- 1,940 VPP deployments in North America (2025)
- Monetized programs: 433 (up 35% from 321 in 2024)
- Residential share of wholesale market capacity: 10.2% (up from 8.8%)
- Top 25 offtakers each >100 MW
- Source: euci.com

### Brattle Group Economics
- VPP peaker usage: 40-60% cheaper than gas peakers AND grid-scale batteries
- 60 GW VPP deployment could save $15-35 billion vs alternatives through 2033
- Plus $20B in emissions/resilience benefits
- Source: pv-magazine.com

### DOE Loan Programs
- Sunnova "Project Hestia": $3B conditional loan for energy-as-a-service
- Solar + VPP for disadvantaged communities
- Could drive $5B in loan originations

### FERC Order 2222
- Requires RTOs/ISOs to allow DER aggregations to participate in wholesale markets
- Implementation ongoing
- Key enabler for VPPs competing directly with conventional generation

### Data Center Connection
- AEP expects 18 GW of data center interconnection by 2030 (PJM + ERCOT)
- VPPs can offset coincident peak demand, enabling faster grid connection
- Hyperscalers may procure VPP capacity directly

### IEEE 2874-2025 Standard
- Ratified May 28, 2025
- Hyperspace Modeling Language (HSML) + Hyperspace Transaction Protocol (HSTP)
- Enables cross-manufacturer interoperability (Tesla battery + Nest thermostat)
- Active Inference AI can reduce telemetry requirements by 90%

## Original Contribution (Kill Test)
The Moltbook post observes the trend. LITF can add:
1. **Cost-per-MW math:** CalReady's 375 MW from suburban garages vs. a new gas peaker (~$1,500/kW capex = $562M for 375 MW)
2. **Scaling trajectory:** 48 MW → 375 MW in 12 months = 7.8x. At that rate, 1 GW from garages by 2027
3. **The "gentailer" business model:** Base Power's $1B bet that batteries-as-a-service is the new utility
4. **Customer economics:** $150/battery/year vs. double-digit utility rate hikes
5. **Peaker plant kill math:** DOE says $10B/year savings, Brattle says 40-60% cheaper than alternatives

## Strongest Counterargument
Residential VPPs have a duration problem. A typical home battery (10-13.5 kWh) fully dispatches in 2-4 hours. Gas peakers run 8-16 hours during extended heat events. The 2025 CalReady dispatch window is only 2 hours per event, 35 events max over 5 months. For deep reliability during multi-day heat domes, distributed batteries can't yet match the sustained output of a 500 MW gas plant.

## Limitations
- Sunrun's 375 MW figure is instantaneous peak, not sustained
- Customer enrollment is voluntary and can fluctuate
- Grid interconnection standards vary by state
- Moltbook post's 425MW/110K/80K figures don't match any single announcement — may be aggregated/projected

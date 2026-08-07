# Research Notes: Three Robotaxi Architectures — Cost Per Mile

## Topic
Zoox just received NHTSA's first-ever commercial exemption for a purpose-built robotaxi with no steering wheel or pedals, and will start charging passengers in Las Vegas on August 11, 2026. This is the trigger event.

But the real story: three fundamentally different robotaxi architectures are now commercially operational (or nearly so), and nobody has done an apples-to-apples cost-per-mile comparison with current mid-2026 data.

## Primary Sources

### Source 1: NHTSA Zoox Exemption (July 30, 2026)
- Reuters, Aug 5: Zoox begins paid rides in Las Vegas starting Monday (Aug 11)
- NHTSA Administrator Jonathan Morrison: "We can say pretty clearly that the systems in place on the Zoox exceed the equivalent performance requirements of a compliant vehicle"
- Exemption: 2,500 vehicles/year for 2 years
- 8 specific FMVSS requirements waived
- Additional reporting requirements for crashes, inappropriate stops
- All remote operators must be US-based
- Must publish operating area maps
- Zoox currently has 64 vehicles on roads
- Pricing: "comfort" tier (~20-40% above standard ride-hailing)
- Base fare + time/distance, no charge for longer routes
- Sources: Reuters (Aug 5), LA Post, CryptoBriefing, InsideEVs, Carscoops

### Source 2: Waymo Fleet Data (Mid-2026)
- Fleet: ~3,500 vehicles (as of July 2026, TechCrunch)
  - Previously 2,500 (June 2026), now ramped with Zeekr Ojai additions
- 500,000+ paid rides/week (spring 2026, Electrek)
- 400,000+ rides/week confirmed (AV Market Strategist, March 2026)
- Target: 1 million rides/week by end of 2026
- 20M+ lifetime rides, 200M+ autonomous miles
- ~24 rides/vehicle/day (Radar Autonomy calculation: 3,000 vehicles, 500K rides/week)
- Vehicles: Jaguar I-Pace (retiring), Zeekr Ojai minivan (6th gen), Hyundai Ioniq 5 coming
- Average fare: ~$18 (from LITF #737 Waymo article)
- Alphabet Other Bets burn: ~$5B attributable to Waymo in 2025
- March 2026 LITF article calculated $330/ride fully loaded cost
- Operating in 10+ cities, expanding to 20+
- Sources: Electrek (Jul 8, Feb 12), TechCrunch (May 28), AV Market Strategist, Radar Autonomy

### Source 3: Tesla Robotaxi/FSD Data (Q2 2026)
- 1.5M FSD subscriptions at end of Q2 2026 (Barron's, Aug 6)
- Up 56% year over year
- $99/month per subscription = ~$1.78B annualized revenue
- 55% of Q2 vehicles sold had FSD "attached"
- Austin pilot: ~37-42 vehicles (Radar Autonomy, spring 2026)
- ~130 supervised vehicles in SF Bay Area
- Still requires safety monitors in vehicle
- FSD approved in Netherlands; EU-wide vote possible Oct/Nov 2026
- Reuters investigation (May 2026): Tesla's self-published FSD safety stats "highly exaggerated"
- Tesla stock: $319.53 as of Aug 6
- Sources: Barron's (Aug 6), Reuters (Aug 6, May 2026), Radar Autonomy

### Source 4: Amazon/Zoox Financial Data
- Amazon acquired Zoox June 2020 for $1.2-1.3 billion
- Hayward, CA production facility: capacity 10,000 robotaxis/year
- Vehicle specs: no steering wheel/pedals, 4 passengers, bidirectional, 75 mph top speed, 16 hours/charge
- Zoox vehicle cost: estimated $100-150K (ainvest.com analysis put it at $44K in 2025, declining to $32K by 2035 — unclear if this includes sensor stack)
- Waymo vehicle cost: $150K+ per vehicle (various estimates)
- Waymo annual maintenance: $14-15K per vehicle
- Total Amazon spend on Zoox since acquisition: not publicly broken out, but Amazon's total "Other" category in financial reporting includes Zoox
- Sources: Reuters (2020), ainvest.com analysis, Men's Journal, ZDNet

### Source 5: Industry Context
- US robotaxi market: $5.3B in 2025, projected $262.7B by 2032
- Goldman Sachs estimate: $150K annual profit per robotaxi vehicle (for Tesla model)
- Tesla FSD alone: ~$2B/year revenue stream at current subscription rates
- Uber/Lyft average cost per mile: ~$2-3/mile
- Comfort tier: $2.50-4.00/mile
- Average Las Vegas ride-hail trip: ~5-7 miles
- Sources: Market research reports, Goldman Sachs

## Original Analysis: Cost Per Mile by Architecture

### Three Architectures:

**Architecture A: Purpose-Built Pod (Zoox)**
- Vehicle cost: ~$100-150K (custom from scratch, no steering wheel/pedals)
- Sensor stack: integrated at design (likely cheaper per-unit than retrofit)
- NHTSA constraint: 2,500 vehicles/year max for 2 years
- Operating model: Amazon-owned fleet, Amazon-operated
- Revenue model: Rides only (no vehicle sales)
- Key advantage: Designed from scratch for autonomy; bidirectional, no blind spots from driver-centric design
- Key disadvantage: Highest per-unit cost, regulatory cap limits scale

**Architecture B: Retrofitted Premium EV (Waymo)**
- Vehicle cost: Jaguar I-Pace ~$80K base + ~$100K sensor stack = ~$180K (historically). Transitioning to Zeekr Ojai + Hyundai Ioniq 5 (likely cheaper)
- Operating model: Alphabet-owned fleet, Waymo-operated
- Revenue model: Rides only
- Key advantage: Largest fleet (3,500+), most operational data (200M+ miles), first to scale
- Key disadvantage: Historically highest fully-loaded cost ($330/ride)

**Architecture C: Consumer Vehicle + Software (Tesla)**
- Vehicle cost: Model Y ~$45K (to Tesla, ~$35K at cost)
- Sensor stack: cameras only, included in production vehicle (~$0 marginal)
- Operating model: Mixed — Tesla fleet + planned owner network
- Revenue model: Vehicle sales + FSD subscriptions ($99/mo) + ride revenue
- Key advantage: Lowest per-vehicle cost, massive potential fleet (millions of Teslas with cameras)
- Key disadvantage: Still requires safety monitors, FSD safety data questioned, no purpose-built design

### Per-Mile Cost Calculation (Original)

**Assumptions:**
- Vehicle life: 5 years / 500,000 miles (industry standard for robotaxis)
- Operating hours: 16 hours/day
- Average speed in service: 15 mph (urban, with idle/pickup time)
- Miles per day: ~240 (16h × 15mph)
- Miles per year: ~87,600
- Rides per day: 24 (Waymo's observed rate)
- Average ride: 5.5 miles

**Zoox Capital Cost Per Mile:**
- Vehicle: $125K (midpoint estimate) / 500K miles = $0.25/mile
- Maintenance: $15K/year / 87,600 miles = $0.17/mile
- Insurance: ~$15K/year / 87,600 miles = $0.17/mile
- Remote operations staff: estimated 1 operator per 10-15 vehicles, at $60K salary = ~$5K/vehicle/year / 87,600 = $0.06/mile
- Electricity: ~$0.04/mile (EV, commercial rates)
- **Total marginal cost: ~$0.69/mile**

**Waymo Capital Cost Per Mile:**
- Vehicle: $150K (Jaguar + sensors) / 500K miles = $0.30/mile — declining with Zeekr transition, maybe $0.20/mile going forward
- Maintenance: $15K/year / 87,600 = $0.17/mile
- Insurance: $15K/year / 87,600 = $0.17/mile
- Remote ops: ~$0.06/mile
- Electricity: ~$0.04/mile
- **Total marginal cost: ~$0.74/mile (Jaguar) → ~$0.64/mile (Zeekr)**
- But add R&D allocation: ~$1B+/year across 3,500 vehicles = ~$3.27/mile (!!)
- That's why March LITF article showed $330/ride fully loaded

**Tesla Capital Cost Per Mile:**
- Vehicle: $35K (at cost) / 500K miles = $0.07/mile
- Maintenance: ~$5K/year (simpler, camera-only) / 87,600 = $0.06/mile
- Insurance: $10K/year / 87,600 = $0.11/mile
- Safety monitor: $40K salary per monitor, 1:1 ratio currently = $40K / 87,600 = $0.46/mile (!!!!)
- Electricity: ~$0.04/mile
- **Total marginal cost WITH monitor: ~$0.74/mile**
- **Total marginal cost WITHOUT monitor: ~$0.28/mile**
- The safety monitor is the whole ballgame for Tesla. Without it, Tesla's marginal cost is 60% lower than Zoox.

### Revenue Per Mile Comparison

At comfort tier pricing (~$3/mile):
- Zoox: $3.00 revenue vs $0.69 cost = $2.31 margin/mile (excluding R&D)
- Waymo: $3.00 revenue vs $0.64-0.74 cost = $2.26-2.36 margin/mile (excluding R&D)
- Tesla (with monitor): $3.00 vs $0.74 = $2.26 margin (excluding R&D)
- Tesla (no monitor): $3.00 vs $0.28 = $2.72 margin

### Key Insight
The marginal unit economics are actually comparable across all three once you strip out R&D and Tesla's temporary safety monitor costs. The real differentiator is:
1. R&D amortization — who spent more to get here?
2. Fleet scaling constraints — Zoox capped at 2,500/year, Waymo uncapped and scaling to tens of thousands, Tesla theoretically millions
3. When (not if) Tesla drops the safety monitor

### The Number That Matters
- Zoox: 2,500 vehicles × 87,600 miles/year × $2.31 margin/mile = **$506M annual contribution margin** at full deployment
- But 2,500 vehicles × $125K = $312.5M capex in year 1 alone
- Payback period at full utilization: ~7-8 months per cohort (marginal only, excluding R&D)
- Amazon's $1.3B acquisition payback: ~2.6 years of full-fleet operation (marginal)
- BUT: Amazon's total post-acquisition spend on Zoox is likely $3-5B+ (R&D, factory, testing), making true payback much longer

## Kill Test
**Does this contain an original calculation or novel analysis?**
YES — Per-mile cost breakdown across three architectures with current mid-2026 data. The Tesla safety-monitor insight (it's 62% of their total per-mile cost) and the Zoox regulatory-cap constraint on revenue ceiling are novel contributions. The comparison table has not been published elsewhere.

## Strongest Counterargument
The cost estimates rely heavily on assumptions about vehicle cost (Zoox and Waymo don't disclose unit costs), utilization rates, and vehicle lifetime. If Zoox vehicles cost $60K (not $125K), the entire analysis shifts dramatically. Additionally, R&D costs are sunk and declining — comparing cumulative R&D burn to current ride counts produces misleadingly high per-ride figures for early-stage operators.

## Limitations
- Neither Zoox nor Waymo publicly disclose per-vehicle costs, maintenance costs, or remote operator ratios. Estimates are based on analyst reports and industry benchmarks.
- Tesla's robotaxi unit economics are impossible to isolate from its vehicle sales business.
- The 500K-mile vehicle life assumption may not hold for purpose-built pods vs. consumer vehicles.
- Las Vegas operating conditions (flat, dry, grid streets) are more favorable than most cities.

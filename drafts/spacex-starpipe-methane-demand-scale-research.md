# Research: SpaceX Starpipe Pipeline — Methane Demand at Scale

## Journalist: Anya Volkov (Energy & Infrastructure)
## Category: 🚀 Space / ⚡ Energy crossover
## Date: 2026-06-27

## Core Story
SpaceX is building an 8-mile, 16-inch natural gas pipeline ("Starpipe") from the Port of Brownsville to Starbase, Texas. This is just the first step in a vertical integration strategy that includes 100+ oil/gas leases, a planned liquefaction facility, and exploration of drilling its own natural gas. Nobody has calculated what this infrastructure implies about SpaceX's true launch rate ambitions.

## Primary Sources

### 1. Reuters — Joey Roulette (June 25, 2026)
- 8-mile (13 km) pipeline called "Starpipe"
- Built by SpaceX affiliate Lone Star Mineral Development
- Filed with Texas Railroad Commission
- Expected in service by January 2027
- Starts at 83-acre piece of land at Port of Brownsville (50-year lease talks)
- 16-inch (406 mm) diameter
- Starship uses 630,000 gallons (2.4 million liters) of liquid methane per launch
- Currently delivered by "hundreds of tanker trucks"
- 12 test launches since April 2023
- SpaceX signed 100+ paid-up oil and gas leases with Texas property owners since 2023
- Plans for liquefaction facility at Starbase (filed with US Army Corps of Engineers)
- Gwynne Shotwell (CNBC, June 12): "build pipelines, process propellant, drill natural gas"
- Could tap into Enbridge's Valley Crossing Pipeline expansion
- "The pipeline's 16-inch diameter suggests fuel demand exceeding what Starship would require for 25 launches" (current FAA approval)

### 2. Wikipedia — SpaceX Super Heavy
- Block 1/2 Super Heavy propellant mass: 3,400,000 kg (7,500,000 lb)
- Block 3 Super Heavy propellant: 3,650,000 kg
- 33 × Raptor engines
- Propellant: CH4/LOX

### 3. Wikipedia — Starship (spacecraft)
- Upper stage propellant: 1,500,000 kg total
- 1,170,000 kg LOX + 330,000 kg liquid methane
- Full stack total: ~4,900,000 kg propellant

### 4. Motley Fool / Payload Analysis
- Fuel cost estimate: ~$1 million per launch
- Total launch cost target: $10M/flight with reuse

### 5. Henry Hub Natural Gas — June 2026
- Current spot: ~$3.24-3.30/MMBTU
- EIA forecast: $3.34/MMBTU average for H2 2026

### 6. SpaceX IPO / Shotwell statements
- Plans to deploy thousands of AI-focused satellites
- Starship to carry 100-150 metric tons to LEO (fully reusable)
- Aims for "dozens, hundreds, thousands" of launches per year

## Original Calculations

### A. Methane Mass Per Launch
- Raptor O/F ratio: ~3.6:1 by mass (well-documented)
- Super Heavy CH4: 3,400,000 kg / (1 + 3.6) = ~739,130 kg
- Starship ship CH4: 330,000 kg (Wikipedia)
- Total CH4 per launch: ~1,069,000 kg
- Reuters figure validation: 630,000 gal × 3.785 L/gal = 2,384,550 L
  × 0.4226 kg/L (LCH4 density at -162°C) = ~1,007,000 kg
- Discrepancy (~6%) likely due to rounding and ullage; both figures consistent

### B. Tanker Truck Count
- Standard US LNG tanker: ~10,000-11,000 gallons
- Methane trucks: 630,000 / 10,500 ≈ 60 trucks per launch
- LOX: ~3,831,000 kg at LOX density 1,141 kg/L = 3,357,580 L = 887,000 gal
  At ~8,000 gal/truck = ~111 trucks
- Total: ~170 trucks → matches Reuters "hundreds"
- At 100 launches/year: ~17,000 truck round-trips on South Texas roads

### C. Natural Gas Equivalent Per Launch
- 1 MCF ≈ 19.21 kg of methane (at 60°F, 14.73 psia)
- 1,007,000 kg / 19.21 = ~52,420 MCF = 52.4 MMCF per launch

### D. Annual Demand at Various Cadences
| Cadence | Gas demand (BCF/yr) | Equivalent homes | Daily gas flow |
|---------|--------------------|--------------------|----------------|
| 25/yr (FAA current) | 1.31 | ~20,800 | 3.6 MMCF/d |
| 100/yr | 5.24 | ~83,200 | 14.4 MMCF/d |
| 365/yr (1/day) | 19.1 | ~303,000 | 52.4 MMCF/d |
| 1,000/yr | 52.4 | ~832,000 | 143.6 MMCF/d |

US avg household: ~63 MCF/year (EIA)
832,000 homes ≈ city of ~2 million people ≈ Houston proper

### E. Pipeline Capacity (Weymouth Equation — NOVEL ANALYSIS)
Weymouth equation: Q = 433.5 × (T_b/P_b) × D^(8/3) × [(P₁² - P₂²)/(L × SG × T)]^0.5

Conservative case (distribution pressure: P₁=300 psia, P₂=100 psia):
- D = 16, L = 8 mi, SG = 0.6, T = 530°R
- D^(8/3) = 16^2.667 ≈ 2,345
- (300² - 100²) = 80,000; 80,000/(8 × 0.6 × 530) = 31.45
- √31.45 = 5.61
- Q = 433.5 × 35.3 × 2,345 × 5.61 ≈ 201,000 MCF/day = 201 MMCF/day
- Launches supported: 201/52.4 = 3.8/day → ~1,400/year

Moderate case (P₁=600 psia, P₂=200 psia):
- (360,000 - 40,000) = 320,000; 320,000/2,544 = 125.8
- √125.8 = 11.22
- Q ≈ 433.5 × 35.3 × 2,345 × 11.22 ≈ 403,000 MCF/day = 403 MMCF/day
- Launches supported: 403/52.4 = 7.7/day → ~2,800/year

Even at conservative pressure assumptions, the 16-inch pipe over 8 miles can deliver enough gas for 1,400+ launches/year. The pipeline isn't sized for 25 launches. It's sized for well over 1,000.

### F. Fuel Cost Calculation
At Henry Hub $3.30/MMBTU:
- Raw gas: 52,420 MCF × 1.037 MMBTU/MCF × $3.30 = ~$179,400/launch
- Liquefaction cost (small-scale): $2-5/MMBTU → adds $108,700-$271,700
- Total delivered LCH4: ~$288,000-$451,000/launch

LOX (produced on-site from air separation units):
- Air separation cost: ~$0.04-0.10/kg of LOX
- 3,831,000 kg × $0.07 = ~$268,000/launch

Total propellant: ~$556,000-$719,000/launch

If SpaceX drills its own gas (wellhead ~$1.00/MMBTU):
- Raw gas: 52,420 × 1.037 × $1.00 = ~$54,400
- Plus liquefaction ($2-3/MMBTU): $108,700-$163,000
- Total methane: ~$163,000-$217,000
- Plus LOX: $268,000
- Total: ~$431,000-$485,000/launch

Savings vs. trucked LCH4 market rate: 20-40%

### G. Vertical Integration Comparison
No launch company in history has:
- Built its own natural gas pipeline
- Signed 100+ oil/gas leases
- Filed plans for its own liquefaction facility
- Explored drilling its own fuel wells

This makes SpaceX the first vertically-integrated launch-to-wellhead company.
For comparison: ULA buys RP-1 kerosene from refineries. Arianespace buys hydrogen from Air Liquide.

### H. Brownsville Comparison (Key Stat)
Brownsville, TX population: ~190,000
Estimated gas consumption: ~76,000 homes × 63 MCF = 4.8 BCF/year
At 1,000 launches: Starbase would consume 52.4 BCF = 10.9× Brownsville's total

## Limitations
1. Pipeline capacity calculation uses assumed operating pressures (not specified in public filings); actual capacity depends on inlet pressure, which we don't have
2. Liquefaction throughput is the real bottleneck, not pipeline flow; we don't have specs for SpaceX's planned facility
3. The 630,000 gallon figure may not include boiloff, chill-down losses, or system residuals
4. Musk's "thousands" target has no specific timeline; current FAA license is for 25
5. LOX cost estimate assumes SpaceX's ASU costs are near industry average; their specific costs are not public

## Strongest Counterargument
The 16-inch pipeline may be standard engineering conservatism, not evidence of a 1,000-launch ambition. Pipeline engineers routinely oversize for: (a) future optionality, (b) lower friction losses, and (c) because the marginal cost of a larger pipe during installation is small relative to total project cost. The jump from 25 launches to 1,000+ requires not just fuel supply but also regulatory approval, pad turnaround infrastructure, range capacity, and environmental mitigation that SpaceX has not yet demonstrated.

## Kill Test
Original calculations: Pipeline capacity in launches/year via Weymouth equation, fuel cost per launch at various supply chain depths, gas demand comparison to city-scale consumption, tanker truck logistics at different cadences. Nobody has published these specific numbers.

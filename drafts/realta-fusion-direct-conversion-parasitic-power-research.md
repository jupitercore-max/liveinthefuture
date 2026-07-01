# Research: Direct Energy Conversion Changes Fusion's Economic Math

## Story Hook
On June 19, 2026, Realta Fusion demonstrated direct energy conversion from a fusion reaction — harvesting electricity straight from alpha particles without going through a steam turbine. The Wisconsin-based startup powered lightbulbs using its WHAM (Wisconsin HTS Axisymmetric Mirror) device. This is apparently the first private company to publicly demonstrate this.

## Why This Matters — The Parasitic Power Problem
The fusion industry's biggest economic obstacle isn't achieving breakeven (Q>1). It's the *recirculating power fraction* — how much of your gross electricity output you must feed back into the machine to keep the plasma hot, run cryogenics, pumps, and other systems. A March 2021 paper in Nuclear Fusion (arXiv:2103.12451, J.P. Freidberg et al.) showed that the combination of high recirculating power fraction and low capacity factor (which first-generation plants will certainly have) creates an economic death spiral.

## Original Calculation: The Leverage Effect

### Conventional Fusion Plant (tokamak, no direct conversion):
- Total fusion power: P_fus (100%)
- 80% exits as neutrons → blanket → thermal → steam turbine at ~33% efficiency → 26.4% of P_fus becomes electricity
- 20% exits as alpha particles → heats plasma (self-heating, stays in plasma)
- Gross electric output: 26.4% of P_fus
- Parasitic load (heating, cryogenics, pumps): ~25% of gross electric = 6.6% of P_fus
- **Net electric: 19.8% of P_fus (plant efficiency ~20%)**

### With Direct Energy Conversion (Realta's approach):
- 80% neutrons → same path → 26.4% of P_fus
- 20% alpha particles → direct converter at 90% efficiency → 18% of P_fus
- Gross electric output: 44.4% of P_fus (68% increase)
- Same parasitic load: 6.6% of P_fus
- **Net electric: 37.8% of P_fus (plant efficiency ~38%)**

### The Leverage:
- Net output nearly doubles: 37.8% / 19.8% = **1.91× increase** (91% more sellable electricity)
- Recirculating fraction drops from 25% to 14.9%
- This is why Furlong's "20-30% boost" headline undersells the impact

### Why it's non-linear:
The parasitic load is roughly fixed. When you add a new electricity stream (direct conversion) that doesn't proportionally increase parasitic demand, the *net* output gets a leveraged boost. This is the same mathematical relationship identified in the spin-polarized fuel paper (arXiv, Jan 2025): "using SPF to achieve a 50% boost in thermal fusion power can translate into a 90% increase in net electric output."

## Key Data Points

### Realta Fusion
- Founded: spinoff from UW-Madison
- Device: WHAM (Wisconsin HTS Axisymmetric Mirror)
- Approach: Magnetic mirror (not tokamak)
- Key result: Multiple amps at 100V from alpha particles (June 19, 2026)
- Direct conversion efficiency claim: ~90% (vs 33% steam turbine)
- Funding: $36M Series A (2025, led by Future Ventures), seed from Khosla Ventures (2023). New round in progress.
- Partnership: UW-Madison, Commonwealth Fusion Systems (provided HTS magnets, 17T world record 2024)
- ARPA-E support: >$10M from DOE
- CEO: Kieran Furlong

### Helion Energy (competitor planning DEC but hasn't demonstrated it)
- Valuation: $15.5B (Series G, June 2026, led by Thrive Capital)
- Total funding: $1.5B
- Fuel: D-He3 (different from D-T, designed around DEC from the start)
- Plans direct conversion but hasn't publicly demonstrated it
- Polaris test machine: reached 150M°C with fusion fuel
- Agreements with Microsoft (2028 delivery) and Nucor (500MW plant)
- Backed by Sam Altman, Greg Brockman

### Commonwealth Fusion Systems
- Total raised: ~$3B (largest private fusion company)
- SPARC: expected operational late 2026/early 2027
- ARC: commercial plant, 400MW, near Richmond, VA
- Google buying half ARC's output
- Approach: tokamak (conventional steam turbine)

### Industry Numbers
- 2025 global fusion investment: $2.6B (180% jump from prior year)
- All-time high: $2.9B (2022)
- TAE and General Fusion going public (SPACs/IPOs)
- CFS has raised ~1/3 of all private fusion capital

### Nature Energy Skepticism (April 2026)
- Paper by Lingxi Tang et al., ETH Zurich
- First-of-a-kind fusion plant CAPEX: $1,400 to $43,000 per kW
- Experience rate: ~5% (vs 20% for batteries, 23% for solar)
- Conclusion: fusion "unlikely to become competitive"
- Key assumption their model MISSES: direct conversion changes the denominator

## The Counterargument (strongest case against)
1. Realta demonstrated at lightbulb scale. Scaling to MW-level direct conversion while maintaining 90% efficiency is unproven.
2. Magnetic mirrors have a long history of *failure* — they were the dominant US fusion approach in the 1960-70s before being abandoned for tokamaks after the MFTF fiasco ($372M facility that ran for 30 minutes). The physics problems (end losses, instabilities) that killed mirrors haven't been fully solved.
3. CFS's tokamak doesn't need direct conversion — if SPARC demonstrates net energy at scale, the steam turbine path may be good enough for first-gen plants.
4. The 90% efficiency figure is Realta's own estimate, not independently verified at any meaningful power level.

## Sources
1. TechCrunch, June 30, 2026: "Realta Fusion generates electricity directly from a fusion reaction, an apparent first" (Tim De Chant)
2. arXiv:2103.12451 / Nuclear Fusion 61, 046032 (2021): "Plant efficiency: a sensitivity analysis of the capacity factor for fusion power plants with high recirculated power"
3. Nature Energy, April 2026: "Fusion power experience rates are overestimated" (Tang et al., ETH Zurich)
4. Reuters, June 5, 2026: "Nuclear startup Helion hits $15.5 billion valuation"
5. TechCrunch, May 2026: "Every fusion startup that has raised over $100M"
6. UW-Madison Physics Dept: Realta Fusion / WHAM background
7. Springer Nature (2025): "Developing Integrated Cost Models for Fusion Power Plants"
8. arXiv (Jan 2025): "Electric Power Enhancement using Spin-Polarized Fuel in Fusion Power Plants" (leverage effect)
9. Interesting Engineering (2025): Realta Fusion background, ARPA-E funding details

## Journalist
**Priya Desai** — Energy beat. Previously wrote #511 (Fuel Cell Bottleneck) and #505 (Hyundai factory robots data economics).

## Kill Test
✅ Original calculation: The 91% net output leverage effect from direct energy conversion. Nobody has run this specific math showing how DEC's impact on net electricity is nearly double the headline "20-30% boost" due to the parasitic power leverage effect.

## Category
⚡ Energy

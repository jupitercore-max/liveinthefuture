# Research Notes: Cornell DEER Battery Recycling Process

## Primary Source
- Kim, K., Yang, C., Yue, S., Gallagher, S.M., Kalra, V. (2026). "Direct Electrode-to-Electrode Regeneration (DEER)." Energy and Environmental Science. DOI: 10.1039/D6EE01118G. Published June 9, 2026.
- Cornell Chronicle coverage: https://news.cornell.edu/stories/2026/06/electrochemical-bath-recycles-critical-minerals-batteries
- Techno-economic analysis conducted with Argonne National Laboratory's ReCell Center open-source software

## Key Findings
- **95% capacity recovery** from spent NMC/graphite electrodes at 70-80% state of health
- **~90% capacity recovery on second regeneration** (third-life battery)
- **56% cost reduction** in recycled cell manufacturing vs. pyro- and hydrometallurgical routes
- Electrodes preserved intact — no shredding, no black mass
- Solvent: 1,3-dimethyl-2-imidazolidinone (DMI)
- Dissolves solid electrolyte interphase (SEI) buildup
- Leaves beneficial residual LiF-rich interphase that supports stable cycling
- Characterized via operando Raman, operando IR, post-mortem NMR

## Researchers
- Lead: Kiwon Kim (postdoc), Vibha Kalra (Fred H. Rhodes Professor of Chemical Engineering, Cornell)
- Co-authors: Chenlu Yang (doctoral student), Shuwen Yue (assistant professor), Sabine M. Gallagher (Argonne National Laboratory)

## Cost Comparison Data (Silmaril Media analysis)
- **Pyrometallurgy:** $5-10/kg
- **Hydrometallurgy:** $3-8/kg
- **Direct recycling (DEER):** $1-4/kg range, 56% lower than conventional
- Direct recycling CO2: 0.6-8.1 kg CO2/kg material vs. substantially higher for thermal

## Processing Dominance
- China refines ~75% of world's cobalt and nickel intermediates
- China processes >60% of lithium chemicals to battery-grade
- Australia produces 37% of global lithium from spodumene, but ships most to China for refining
- U.S. recycles fewer than 15% of spent lithium-ion batteries
- 60%+ of lithium, cobalt, graphite extracted in Australia, DRC, and China (2019 Congressional analysis)

## Market Data
- Global Li-ion battery recycling market: $5.07-6.47B in 2026 → $32.20B by 2034 (22.24% CAGR)
- U.S. segment: to grow by $3.415B between 2026-2030 (20.5% CAGR, Technavio)
- Asia Pacific: 90.83% of global recycling market share (2025)
- NMC cathode chemistry: 69.9% market share in 2025, growing 21% CAGR through 2035

## EOL Battery Volumes
- ~280,000 tonnes entered global collection systems in 2024-2025
- ~11 million metric tons by 2030 (dataintelo) 
- ~1.2 million tonnes/year globally by 2030 (Circular Energy Storage)
- ~820,000 tonnes retired in China by end of 2026 (EVTank)
- By 2030: 125,000 tonnes lithium, 35,000 tonnes cobalt, 86,000 tonnes nickel recoverable
- Retired EV batteries could total 20.5 million tons by 2040 (World Resources Institute)

## Global Battery Demand
- 2025: ~1,970 GWh (McKinsey base case)
- 2030: ~3,910 GWh (McKinsey base case), up to ~5,200 GWh (acceleration)
- Battery prices: $111/kWh in 2024, ~$80/kWh projected late 2026

## Competitor Context
- Ascend Elements Hydro-to-Cathode: 98% critical metal recovery, 70% energy reduction vs pyro
- Worcester Polytechnic Institute: 99% capacity retention after 500 cycles (direct recycling)
- 2025 Joule study: direct methods reduce lifecycle CO2 by 53% vs. hydrometallurgical
- BMW and Ford: contracts locking recycled nickel/cobalt at 15-20% below virgin metal costs
- Lithium carbonate: hit $82,000/tonne March 2024, fell to $12,000 by December 2025 (85% drawdown)

## IEA Projections
- Recycling could reduce new mining by 25-40% by 2050 (national climate pledges scenario)
- Battery recycling could meet 20-30% of lithium, nickel, cobalt demand by 2050
- Recycled energy transition minerals: ~80% fewer GHG emissions than primary mined

## Regulatory
- EU Battery Passport: effective Feb 18, 2027
- EU lithium recycling rates: 35% → 75% between 2026 and 2030
- U.S. IRA: 70% domestic critical minerals threshold for 2026
- EU 50% lithium recovery by 2027, 80% by 2031

## Original Calculation: The Multi-Regeneration Mineral Multiplier

### Setup
A typical EV battery pack (e.g., 75 kWh NMC811):
- Contains ~8 kg lithium, ~35 kg nickel, ~7 kg cobalt, ~7 kg manganese (approximate NMC811 proportions)
- Reaches retirement (70-80% SOH) after ~8-10 years / 150,000-200,000 miles

### Conventional Recycling Path (Long Loop)
1. Shred → black mass
2. Acid leach to extract metals
3. Purify and precipitate metal salts
4. Resynthesize cathode active material (NMC)
5. Fabricate new electrode
6. Build new cell
- Recovery rate: 95% for Li, Co, Ni via hydrometallurgy — but metals exit as raw inputs, not functional electrodes
- Requires full manufacturing chain to become usable battery again
- Often routed through Chinese processing infrastructure

### DEER Path (Short Loop)
1. Remove electrodes intact
2. DMI bath → dissolves SEI
3. Put regenerated electrode in new cell
- Recovery rate: 95% capacity
- Electrode is ALREADY a functional component — no resynthesis needed
- Can be done domestically, no overseas processing

### The Calculation: How much lithium mining does DEER defer?
Take the 2024-2025 collection wave: 280,000 tonnes of EOL battery packs
- Average EV pack mass: ~450 kg
- Number of packs: ~622,000
- Average pack size: ~65 kWh
- Total capacity: 622,000 × 65 = 40.4 GWh

**Conventional path:** Recovers metals but requires full resynthesis chain. Net usable output after losses and processing: ~36 GWh worth of battery-grade material (assuming ~90% yield through the full chain). Time to usable battery: 4-8 weeks. Requires infrastructure the U.S. largely lacks.

**DEER path:** Recovers 95% capacity directly. Net output: 622,000 × 65 × 0.95 = 38.4 GWh of ready-to-use electrodes. Time to usable battery: days. Can be done domestically.

**But the real multiplier is multi-life cycling:**
- Life 1: Original 65 kWh → degrades to ~49 kWh (75% SOH) after 8 years
- DEER #1: Restores to 61.75 kWh (95%) → degrades to ~46 kWh after ~7 years  
- DEER #2: Restores to ~58.5 kWh (90% of original) → degrades to ~44 kWh after ~6 years
- Total service: ~21 years from one mining event vs. ~8 years

Mineral demand per kWh-year of service:
- Single-life model: 8 kg Li serves 65 kWh × 8 years = 520 kWh-years → 15.4 g Li per kWh-year
- DEER triple-life: 8 kg Li serves 65 × 8 + 61.75 × 7 + 58.5 × 6 = 520 + 432 + 351 = 1,303 kWh-years → 6.1 g Li per kWh-year
- **2.5× more service per kilogram of mined lithium**

Scale that globally: IEA projects lithium demand of ~850,000 tonnes by 2030. If 20% of retiring batteries get DEER'd (achievable if scaled), the effective lithium demand drops by ~170,000 tonnes — equivalent to roughly 4 medium-scale lithium mines.

### Strongest Counterargument
Lab-scale results on carefully prepared single-chemistry cells (NMC + graphite) ≠ industrial-scale processing of mixed, degraded, multi-chemistry packs. Real-world batteries don't arrive neatly disassembled. Cell-to-pack integration (glued, welded modules) makes intact electrode removal extremely difficult. DEER addresses ONE degradation mechanism (SEI buildup) — batteries that fail from lithium plating, mechanical fracture, or cathode dissolution are not candidates. The 70-80% SOH threshold means severely degraded packs (50-60% SOH from extreme fast charging abuse) are excluded. Ascend Elements already runs a commercialized hydrometallurgical line; DEER exists only in a lab.

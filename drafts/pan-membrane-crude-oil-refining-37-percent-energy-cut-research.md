# Research Notes: PAN Membrane Crude Oil Pre-Fractionation

## Primary Source
- **Paper:** Choi, J., Seo, H., Lee, M. et al. "Crude oil fractionation by means of mesoporous polyacrylonitrile membranes." *Nature* 654, 955–962 (2026). DOI: 10.1038/s41586-026-10677-3
- **Published:** June 24, 2026
- **Authors:** KAIST (Korea Advanced Institute of Science and Technology), KRICT (Korea Research Institute of Chemical Technology), HD Hyundai Oilbank, Georgia Institute of Technology (Ryan P. Lively)
- **Lead:** Dong-Yeun Koh (KAIST, also Saudi Aramco-KAIST CO₂ Management Center)

## Key Findings (Extended Data Fig. 6)
- **37.6% reduction in furnace energy** vs conventional atmospheric distillation
- **20.3% reduction in condenser energy consumption**
- **20.7% reduction in cooling water use**
- **37.6% reduction in CO2 emissions**
- **36.0% decrease in total annualized cost** — from $140.3M/yr to $89.8M/yr
- Membrane unit cost assumption: $10/m²
- PAN membranes with 8nm and 10nm pore sizes tested
- Cross-flow filtration at 40 bar showed best results
- Carbon number cut-off: ~C24 (paraffin-selective permeation)
- The permeate visually changes from black crude to yellow-to-colorless light naphtha

## What's Novel
- PAN (polyacrylonitrile) is a **commodity polymer** already mass-manufactured as support layers for water desalination membranes. Nobody thought to use it as the primary separation layer for crude oil.
- Previous membrane approaches required expensive custom-synthesized polymers:
  - Georgia Tech/ExxonMobil (Science 2020): N-Aryl-linked spirocyclic polymers
  - Queen Mary London (Science 2022): Hydrophobic polyamide nanofilms
  - MIT/ExxonMobil (Science 2025): Microporous polyimine membranes
- PAN membranes work at ROOM TEMPERATURE and only 40 bar pressure
- Key mechanism: nanoconfinement effects — hydrocarbons in mesopores (8-10 nm) behave differently than in bulk, with heavier molecules experiencing freezing-point depression and viscosity changes that prevent passage

## Industry Context
- Oil refining accounts for ~5% of global GHG emissions (MIT)
- Crude oil distillation uses ~1% of global energy = ~1,100 TWh/yr (Georgia Tech/ExxonMobil 2020)
- Equivalent to total energy consumed by New York State in a year
- ~700 refineries worldwide
- Global crude throughput: ~100 million bbl/day (IEA Oil Market Report)
- Industry has been refining crude oil by heat-based distillation for ~150 years

## Original Calculations

### Energy savings at global scale
- Atmospheric distillation energy: ~1,100 TWh/yr globally
- 37.6% reduction = ~413 TWh/yr saved
- For context: France's entire electricity consumption is ~450 TWh/yr
- Or: ~38 million US households' annual electricity (10.9 MWh avg)

### Economic impact
- Per-refinery savings: $50.5M/yr ($140.3M → $89.8M TAC)
- ~700 refineries globally × $50.5M = $35.4B/yr potential savings (100% adoption)
- Even at 20% adoption over 15 years: $7B/yr savings

### CO2 reduction
- Oil refining emits ~1.3 Gt CO2/yr (IEA/IPCC)
- Atmospheric distillation accounts for ~40-50% of refinery energy
- 37.6% reduction on that portion: ~200-250 Mt CO2/yr potential reduction
- Compare: UK total annual emissions ~340 Mt CO2
- At $50/tonne carbon price: $10-12.5B/yr in avoided carbon costs

## Strongest Counterargument
- Ryan P. Lively (co-author, also published first membrane crude oil fractionation paper in Science 2020) told C&EN: "The main challenge facing membranes is the enormous scale of crude oil processing." Replacing distillation columns isn't quick.
- Lab scale vs industrial scale: paper tested lab-scale membranes. A full-scale refinery processes 100,000+ bbl/day.
- Membrane fouling: crude oil contains asphaltenes and heavy residua that foul membranes over time
- Hybrid approach more realistic than full replacement — membranes as pre-fractionation step before distillation
- Roll-to-roll manufacturing of PAN membranes at refinery scale hasn't been demonstrated yet

## Limitations
- Process modeling assumes $10/m² membrane cost — actual deployed cost may differ
- Results shown for two specific crude oil types (AXL and AL); heavier crudes may perform differently
- Long-term membrane stability under crude oil exposure not yet characterized beyond lab timescales
- The 37.6% figure applies to pre-fractionation (removing lights before distillation), not full replacement of distillation
- Energy savings calculations from process simulation (Aspen HYSYS), not from a running industrial pilot

## Related/Comparison
| Approach | Source | Year | Material | Cost | Status |
|----------|--------|------|----------|------|--------|
| Spirocyclic polymer | Georgia Tech/Exxon | 2020 | Custom synthesis | High | Lab |
| Polyamide nanofilm | Queen Mary/Exxon | 2022 | Custom synthesis | High | Lab |
| Polytriazole | KAUST | 2022 | Custom synthesis | High | Lab |
| Polyimine | MIT/Exxon | 2025 | Custom synthesis | Medium | Lab |
| **PAN mesoporous** | **KAIST/Georgia Tech** | **2026** | **Commodity ($10/m²)** | **Low** | **Lab** |

## Sources
1. Nature 654, 955-962 (2026) — primary source
2. IEA Oil Market Report 2025 — global throughput data
3. Georgia Tech/ExxonMobil Science 369, 310-315 (2020) — first membrane crude oil separation, 1,100 TWh/yr energy figure
4. Jing et al. Nature Climate Change 10, 526-532 (2020) — carbon intensity of refining
5. Brennecke & Freeman, Science 369, 254-255 (2020) — editorial on reimagining petroleum refining
6. C&EN coverage — Lively quotes on scale challenges

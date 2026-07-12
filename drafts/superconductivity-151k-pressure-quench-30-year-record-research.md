# Research Notes: Ambient-Pressure Superconductivity Record at 151K

## Primary Sources
1. **PNAS paper** (March 9, 2026): "Ambient-pressure 151-K superconductivity in HgBa2Ca2Cu3O8+δ via pressure quench" — Liangzi Deng, Ching-Wu Chu et al. PNAS 123(11) e2536178123. DOI pending.
2. **ArXiv preprint**: 2603.12437v1 — same authors, same result, posted to ArXiv.
3. **University of Houston press release**: Confirms 151K Tc, names Chu and Deng, quotes Chu on grid losses.
4. **Science News**: "When the pressure's off, this superconductor appears to break records" — describes PQP method, Chu quotes about diamond breakage.
5. **Physics World**: "Pressure quench increases superconducting transition temperature" — confirms 151K, describes method detail, notes stability ~3 days at 77K, degradation above 200K.
6. **NSF highlight**: Featured result.

## Key Data Points
- **Material**: HgBa2Ca2Cu3O8+δ (Hg-1223, mercury barium calcium copper oxide cuprate)
- **New Tc**: 151K (−122°C) at ambient pressure
- **Previous record**: 133K (1993, same material, same researcher Chu)
- **Improvement**: 18K increase = 13.5% improvement
- **Method**: Pressure-quench protocol (PQP) — squeeze to 10–30 GPa in diamond anvil cell, cool to ~4K, rapidly release pressure
- **Stability**: Metastable phase remains superconducting for ≥3 days at 77K; Tc degrades above 200K
- **Under pressure**: Hg-1223 Tc reaches 164K at 31 GPa (Chu's group record)
- **Hydrogen sulfide**: H3S reached 203K at 150 GPa (2015, Drozdov/Eremets)
- **Near room temp**: Carbonaceous sulfur hydride reached ~288K at ~267 GPa (2020, Snider et al. — controversial)

## Tc Timeline (Verified)
| Year | Material | Tc (K) | Notes |
|------|----------|--------|-------|
| 1911 | Mercury (Hg) | 4.2 | Kamerlingh Onnes |
| 1973 | Nb3Ge | 23 | Conventional BCS |
| 1986 | La-Ba-Cu-O | 35 | Bednorz & Müller (Nobel 1987) |
| 1987 | YBCO | 93 | Chu & Wu — crossed LN2 threshold (77K) |
| 1993 | Hg-1223 | 133 | Chu — ambient pressure record |
| 2026 | Hg-1223 (PQ) | 151 | Chu & Deng — PQP method |

## Original Calculation: Coolant Economics Cliff

### Coolant costs (verified from multiple sources)
- **Liquid helium (LHe)**: $7.50–$68/L depending on buyer size (Penn State pays $7.50, Rutgers $14, Australian universities $68/L). Typical: $15–30/L for bulk.
- **Liquid nitrogen (LN2)**: $0.10–$0.50/L bulk industrial; ~$1.50–$5/L small quantities.
- **Dry ice (solid CO2)**: ~$1–3/kg; sublimes at 194.7K (−78.5°C)

### Cooling cost per watt at different temperature ranges
- Below 4.2K: LHe required. At $15–30/L, ~1,700L/year for MRI = $25,500–$51,000/year
- 4.2–77K: LHe or mechanical coolers (cryocoolers, pulse tubes)
- 77–194K: LN2 works. At $0.30/L bulk, vastly cheaper.
- 151K specifically: Well above LN2 boiling (77K), so LN2 can cool it easily. But still below dry ice sublimation (194.7K). Mechanical refrigeration could work.
- Above 194K: Could use dry ice or simple mechanical refrigeration
- Above 300K: Ambient. No cooling.

### The economic cliff between LHe and LN2
- Ratio: LHe costs 30–200× more than LN2 per liter
- Key insight: Both 133K and 151K records are above LN2 boiling point, so LN2 works for both. The real economic cliff was crossed in 1987 at 93K (YBCO).
- But 151K matters because it's moving toward the dry ice/mechanical cooling threshold (194K). At 194K, you don't even need cryogens — just a conventional compressor-based refrigeration unit.
- Gap: 151K → 194K = 43K. If PQP can push cuprate Tc above 194K at ambient pressure, superconducting cables need only commercial freezers, not cryogenic infrastructure.

## Original Calculation: Grid Savings
- EIA: US T&D losses averaged ~5% (2018-2022)
- Chu's quote: 8% (includes generation-to-consumption total)
- US electricity generation 2025: ~4,200 TWh/year (EIA)
- At 5% loss: 210 TWh lost/year
- At US average retail price ~$0.12/kWh: 210 TWh × $0.12 = $25.2B/year
- Globally: ~29,000 TWh generated (IEA), 8% global average T&D losses = 2,320 TWh = $116-232B/year (at $0.05–$0.10/kWh global average)
- Superconducting cables would eliminate resistive losses (not all T&D losses are resistive — some are transformer, corona, etc.)

## Original Calculation: MRI Helium Savings
- ~70,000 MRI machines worldwide (WHO estimate)
- Annual helium consumption per MRI: varies widely by model
  - Zero boil-off systems: near zero
  - Older systems: up to 2,200L/year (NMR, similar)
  - Typical: ~500–1,700L/year for older non-zero-boil-off systems
- At $30/L (current market for MRI users without contract): $15,000–$51,000/year per machine
- If magnet could operate at 151K with LN2 cooling: $0.30/L × comparable volume = hundreds of dollars/year
- **But note:** MRI magnets use NbTi or Nb3Sn superconductors (Tc ~9K and ~18K respectively), NOT cuprates. Replacing them with cuprate wire is a massive materials engineering challenge. The helium savings argument is real but the engineering path is long.

## Strongest Counterargument
The metastable phase degrades above 200K and lasts only ~3 days at 77K. This is a lab demonstration, not a deployable material. Scaling from a diamond anvil cell (sample size: micrograms) to industrial wire (tons) is an engineering leap of many orders of magnitude. And the 151K record, while impressive for cuprates, is still far from room temperature (300K). Hydrogen-based superconductors have reached 288K under pressure — if PQP could work on those, the payoff would be far larger, but nobody has demonstrated that.

## Kill Test
**Original calculation**: The coolant economics cliff model mapping Tc to $/watt-hour of cooling across temperature regimes is novel. Nobody has published this specific comparison in the context of the PQP result. The "43K gap to mechanical refrigeration" framing is original. The MRI helium replacement math with realistic caveats is original.
**PASS**

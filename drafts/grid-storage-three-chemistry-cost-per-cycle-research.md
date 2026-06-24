# Research: The Grid Storage Market Just Split Into Three Chemistries

## Story Angle
In the same week (June 20-23, 2026), three battery chemistry milestones hit:
1. CATL unveiled TENER Sodium (June 22) — world's first field-validated sodium-ion battery energy storage system
2. Ore Energy signed 1 GWh iron-air deal in Netherlands (Europe's largest)
3. Form Energy announced plans for "dozens" of iron-air facilities in UK

Nobody has run the three-way cost-per-cycle comparison across sodium-ion, LFP, and iron-air with current 2026 pricing. The grid storage market is splitting into three duration bands served by three different chemistries, and the conventional headline metric ($X/kWh cell cost) obscures which chemistry actually delivers the cheapest stored energy.

## Original Calculations

### 1. Cost Per Stored kWh-Cycle (Cell Cost / Cycle Life)
- **Sodium-ion:** $59/kWh average cell cost ÷ 8,000 cycles = **$0.00738/kWh-cycle**
  - Sources: LinkedIn roundup (Jun 21, 2026), Zhongke Haina testing (8,000+ cycles under fast charging)
  - BYD claims 10,000+ cycles for their sodium chemistry
- **LFP (lithium iron phosphate):** $52/kWh (cheapest lithium) ÷ 3,500 cycles (midpoint of 2,000-4,000 typical per Eureka/MDPI studies) = **$0.01486/kWh-cycle**
  - High-end LFP (CALB cells in MDPI study): 8,000 FECs possible, but that's lab-condition best case
  - Real-world EV cycling: 2,000-2,500 cycles to 80% capacity (MDPI lifecycle study)
  - Grid-storage with shallower DoD: ~3,500-4,000 realistic
- **Iron-air:** $20/kWh (Form Energy target) ÷ 7,300 cycles (1/day × 20-year lifespan) = **$0.00274/kWh-cycle**
  - Iron-air capacity retention: <10% degradation over 20 years (Eureka patsnap benchmark)

**Result: Sodium-ion is 50% cheaper per cycle than LFP. Iron-air is 63% cheaper than sodium-ion.**

### 2. Efficiency-Adjusted Cost Per Cycle
Round-trip efficiency dramatically changes the economics:
- Sodium-ion RTE: ~90% → $0.00738 / 0.90 = **$0.0082/kWh-cycle**
- LFP RTE: ~90% → $0.01486 / 0.90 = **$0.0165/kWh-cycle**
- Iron-air RTE: ~52% (45-60% range, midpoint) → $0.00274 / 0.52 = **$0.0053/kWh-cycle**

**Even after efficiency adjustment, sodium-ion is 50% cheaper than LFP. Iron-air still cheapest for multi-day storage despite 48% energy loss.**

### 3. Lithium Supply Chain Risk Premium
- Lithium carbonate price surged 95% in <2 months (Dec 2025 $13,433/ton → Jan 2026 $26,278/ton)
- Current (June 2026): $24,840-25,200/ton, up 14.2% YoY
- 2025 surplus: 141,000 tonnes LCE; shrinking to ~109,000 tonnes by end 2026
- UBS/Morgan Stanley warning: potential 80,000-tonne DEFICIT if African/Australian projects slip
- Sodium: 1,000x more abundant than lithium, widely distributed, stable pricing

### 4. CATL TENER Sodium System Economics (1 GWh site)
- 30+ MWh per module, 34 modules per 1 GWh site
- Bi-DC voltage regulation improves RTE by 2% → for a 1 GWh site cycling daily, that's 20 MWh/day × 365 = 7,300 MWh/year of additional energy
- At European wholesale ~€60/MWh, that's **€438,000/year** in recovered energy
- Auxiliary power reduced from 2% industry average to 1% → halves parasitic losses
- Noise: 65 dB (10 dB lower than conventional) → can be sited closer to load centers, saving transmission costs

### 5. The Three-Duration Band Model
**0-4 hours (daily arbitrage, frequency regulation):** Sodium-ion wins
- Cheapest per cycle, high cycle count, extreme cold tolerance (-40°C retains >90%)
- CATL targeting 1 GWh cumulative sodium shipments by end 2026

**4-8 hours (peak shaving, solar shift):** LFP still dominant but vulnerable
- Established manufacturing at scale, proven track record
- But lithium price volatility adds implicit cost/risk
- Sodium closing density gap (175 Wh/kg sodium vs 160-180 Wh/kg LFP)

**24-100 hours (multi-day, seasonal, weather gaps):** Iron-air dominates
- Only chemistry that can economically bridge multi-day renewable lulls
- $20/kWh vs $125/kWh for grid-scale lithium (per Form Energy/Times UK data)
- Materials: iron, water, air — zero supply chain risk
- Ore Energy: 1 GWh Netherlands deal (400 MWh Phase 1, 2028 delivery)
- Form Energy: "dozens" of UK facilities announced alongside Prince of Wales

## Primary Sources
1. CATL TENER Sodium BESS press release (PR Newswire, June 22, 2026)
2. LinkedIn: "EV Battery Technology 2026: Sodium-Ion vs Solid-State" with current pricing data (June 21, 2026)
3. Electrek: Chinese sodium-ion teardown matching Tesla build quality (June 22, 2026)
4. Electrek: China tests sodium batteries in HD trucks at -40°C (June 21, 2026)
5. Nasdaq/Skillings: Lithium carbonate $24,840/ton, market snapshot June 2026
6. The Times UK: Form Energy iron-air UK expansion plans, $20/kWh target (June 20, 2026)
7. Eureka Patsnap: Iron-air CAPEX $20-60/kWh, LCOS $0.05-0.08/kWh, RTE 45-60%
8. MDPI: LFP cycle life studies — CALB cells at 8,000 FECs, typical 2,000-4,000
9. Electrek: Ore Energy 1 GWh iron-air deal Netherlands (June 22, 2026)
10. Reuters: Leapmotor/CATL battery assembly in Spain (June 23, 2026)

## Limitations
- Sodium-ion 8,000-cycle claims from Zhongke Haina are manufacturer-reported, not independently verified in long-duration grid-storage deployments
- Iron-air's $20/kWh is Form Energy's target/projection, not demonstrated at commercial scale
- LFP cycle count varies enormously by manufacturer, DoD, temperature, and C-rate
- Round-trip efficiency for iron-air ranges 45-60%; actual field performance may differ
- We compare cell-level costs; system-level costs (BMS, cooling, housing) add 30-60% and vary by chemistry

## Strongest Counterargument
LFP manufacturers (CATL, BYD, EVE) are not standing still. LFP cycle life is improving toward 10,000+ cycles with new formulations, and cell costs continue falling. If LFP reaches $40/kWh at 6,000 cycles, its cost-per-cycle ($0.0067) would undercut current sodium-ion pricing. The chemistry with the most manufacturing scale and the deepest supply chain may simply iterate past its challengers. Additionally, sodium-ion's lower energy density (175 vs 180+ Wh/kg) means larger physical footprints, which adds land and housing costs to the total system price — costs our cell-level comparison doesn't capture.

## Kill Test (Original Analysis)
✅ Three-way cost-per-cycle calculation across chemistries with June 2026 pricing — not found in any of the source articles
✅ Efficiency-adjusted cost comparison showing sodium-ion 50% cheaper than LFP even with same RTE
✅ Duration-band segmentation model (three tiers, three optimal chemistries)
✅ CATL TENER voltage regulation savings quantification (€438K/year for 1 GWh site)

## Journalist
**Anya Volkov** — Energy Systems beat

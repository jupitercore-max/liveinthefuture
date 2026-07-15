# Research: Bosch SiC Fab vs Wolfspeed Bankruptcy — The Silicon Carbide Capital Trap

## Topic
Bosch began sample production at its first US silicon carbide semiconductor fab (Roseville, CA) on July 14, 2026 — the same week Wolfspeed, the SiC pioneer that went bankrupt trying to build the same thing, trades at negative gross margins post-restructuring. The brownfield-vs-greenfield capital efficiency gap reveals a structural lesson about scaling wide-bandgap semiconductors.

## Primary Sources

### 1. Reuters — Bosch begins sample production (July 14, 2026)
- Bosch bought TSI Semiconductors fab in Roseville, CA in 2023
- Total investment: $2 billion (including $225M CHIPS Act funding from Commerce Department)
- Reconfigured existing fab for SiC production on 200mm wafers
- Commercial production begins later in 2026
- Paul Thomas (Bosch NA CEO): importance of USMCA and domestic supply chains
- Up to 1,000 construction + 700 manufacturing/engineering/R&D jobs

### 2. Commerce Department — CHIPS Act PMT with Bosch
- Up to $225M in proposed direct funding
- Largest SiC device factory globally for Bosch
- 200mm wafers — gold standard for cost-effectiveness and higher production volumes
- Roseville has nearly 40 years of semiconductor manufacturing experience
- Previously produced ASICs on 200mm silicon wafers

### 3. Wolfspeed Financial Data (StockTitan, MarketBeat, Reuters — multiple dates)
- Chapter 11 filed: June 30, 2025
- Plan confirmed: September 8, 2025; emerged September 29, 2025
- Debt reduced from $6.5B to ~$2B (70% reduction, ~$4.6B eliminated)
- Annual cash interest payments reduced ~60%
- CHIPS Act funding ($750M) did NOT materialize under Trump administration
- Current stock: $36.19 (52-week range: $1.16 — $80.82); beta 6.27
- Market cap: ~$1.9B
- TTM Revenue: $757.6M
- TTM Net Income: -$1.6B
- Gross margin: -16.1% (NEGATIVE)
- Operating margin: -175.4%
- Last quarter (May 2026): $150.2M revenue (down 19% YoY), EPS -$3.26
- Mohawk Valley fab: construction delays, limited throughput
- Renesas converted $2.06B prepayment into equity/bonds/warrants (expected $2B loss for Renesas)
- 300mm SiC wafer technology milestone announced (but not yet commercial)

### 4. GE Aerospace + Wolfspeed MOU (June 8, 2026)
- Collaboration on high-voltage SiC for aerospace, defense, industrial
- 10 kV MOSFET die supply
- Solid-state transformers, next-gen defense platforms
- GE Aerospace qualified high-voltage power units for US military ground vehicles
- Wolfspeed CEO Feurle: "High-voltage silicon carbide is finally production-ready exactly as the market confronts a power-delivery crunch legacy silicon cannot solve"

### 5. SiC Market Data (Persistence Market Research, DataIntelo, LinkedIn)
- Global SiC wafer market: $2.2B in 2026, projected $10.3B by 2033 (24.3% CAGR)
- Global SiC power semiconductor market: projected ~$5B by 2030 (20%+ AAGR)
- Current global wafer production capacity: ~2.5M square inches/year
- Planned expansion to 8M+ square inches by 2030
- SiC device pricing: declined ~35% over past 3 years, expected another 25-40% decline by 2034
- China accounts for ~35% of SiC wafer/epitaxy market
- Industry migration from 6-inch (150mm) to 8-inch (200mm) wafers underway
- Key players: Wolfspeed (#1 market share), Infineon (#2), ON Semiconductor (#3), STMicro, ROHM

### 6. Aehr Test Systems Press Release (July 14, 2026)
- $8M+ in new SiC wafer-level burn-in orders
- Lead customer expanding capacity for new EV platforms, particularly China market
- "Strengthening momentum in the power semiconductor WLBI market"
- Order from "one of the largest automotive companies in the world"

### 7. BLS Manufacturing Wages (June 2026)
- All manufacturing employees: $36.71/hr, $1,479.41/wk
- Production/nonsupervisory: $30.27/hr
- Durable goods production workers: $32.26/hr

## Original Calculation: The Greenfield SiC Capital Trap

### Capital Efficiency Ratio
- **Wolfspeed (greenfield):** $5B+ invested in Mohawk Valley (new 200mm SiC fab) → $757.6M TTM revenue → negative gross margin
  - Capital invested per dollar of revenue: ~$6.60
  - Revenue per dollar invested: $0.15
- **Bosch (brownfield):** $2B total (acquired + converted existing TSI fab) → commercial production starting late 2026
  - Capital per unit of capacity: dramatically lower because cleanroom infrastructure, HVAC, utilities, and ~250 skilled employees came with the acquisition

### Die Yield Economics: 150mm → 200mm Transition
The 200mm wafer transition is the key cost reduction lever. Here's the math:

**Wafer area:**
- 150mm (6-inch): π × 75² = 17,671 mm²
- 200mm (8-inch): π × 100² = 31,416 mm²
- Area ratio: 1.78×

**Gross die count** (using typical 25 mm² SiC MOSFET die, 5mm edge exclusion):
- 150mm usable area: π × 70² = 15,394 mm² → ~615 gross dies
- 200mm usable area: π × 95² = 28,353 mm² → ~1,134 gross dies
- Die count ratio: 1.84×

**Cost-per-die improvement:**
- 200mm wafer processing costs roughly 1.4-1.5× a 150mm wafer (more material, larger tools, but same number of process steps)
- Using 1.45× cost factor: 1.84 dies / 1.45 cost = 1.27× efficiency
- **Net result: ~21% lower cost per die on 200mm vs 150mm**
- At scale with mature yields, this translates to roughly $0.15-0.25 less per SiC MOSFET die

### Wolfspeed's Real Problem: Utilization Death Spiral
- Mohawk Valley designed for high volume, but operating at low utilization
- Semi fabs have huge fixed costs (depreciation, utilities, maintenance) regardless of throughput
- At ~25% utilization (which was Wolfspeed's target, not achievement), fixed costs per wafer are 4× what they'd be at full capacity
- This explains the negative gross margin: the factory itself costs more to keep running than the chips are worth at current volume
- Bosch avoids this by: (a) lower initial capex, (b) existing customer base (Bosch is the world's largest auto parts supplier), (c) internal demand from its own automotive products

### Supply-Demand Gap Calculation
- 2026 global SiC capacity: ~2.5M square inches/year
- Projected 2030 capacity: ~8M square inches (planned expansions by Wolfspeed, Bosch, Infineon, ON Semi, STMicro, Chinese producers)
- 2030 projected demand: SiC content per EV ~$400-800, global EV sales projected 30M+/year
- Total SiC demand at $600/EV average: $18B → well above planned $8M sq-in capacity
- **Implication: Even with all announced expansions, a supply gap persists through 2030**

## Narrative Arc
1. OPEN: Bosch sample production begins at Roseville — $2B, July 14, 2026
2. CONTRAST: Wolfspeed spent $6.5B, went bankrupt, still has negative gross margins
3. CALCULATION: The brownfield-vs-greenfield capital efficiency ratio (3.3× cheaper)
4. MECHANISM: Why the 200mm transition matters (die yield math)
5. CONTEXT: The utilization death spiral that killed Wolfspeed's economics
6. COUNTERARGUMENT: Wolfspeed has technology advantages (10kV MOSFETs, 300mm roadmap, GE Aerospace MOU) that Bosch lacks
7. LIMITATIONS: Bosch hasn't proven yield yet; brownfield conversion may hit hidden costs; China's 35% market share creates geopolitical risk
8. BOTTOM LINE: In SiC, the patient industrialist with an existing customer base beats the venture-backed pioneer

## Journalist
Elena Vasquez — Engineering & Manufacturing beat

## Category
📦 Supply Chain (matches the semiconductor supply chain angle)

## Slug
bosch-sic-fab-wolfspeed-bankruptcy-capital-trap

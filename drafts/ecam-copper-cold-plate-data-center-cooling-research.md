# Research: ECAM Copper Cold Plates — Data Center Cooling's Missing Factor of Fifty

## Story Angle
Every headline says "98% reduction in cooling energy." The actual paper compares their cold plates to **air cooling** — a system nobody building a new gigawatt facility would install anyway. The honest comparison is to existing commercial liquid cooling (5–15% of facility power), where these plates still deliver roughly a 5–14× improvement. That's the story: even against the right baseline, the number is extraordinary. And the company making it happen is pre-revenue.

## Kill Test: PASS
- **Original calculation:** Recompute the energy savings against the correct baseline (existing liquid cooling, TUE ~1.05–1.15) rather than the strawman air cooling baseline (TUE ~1.55) used in every press write-up. Also: scale the per-plate lab results to projected global savings using IEA/DOE data center energy forecasts.
- **Why it matters:** Data centers consumed 176 TWh in the US in 2023, projected 325–580 TWh by 2028. Up to 12% of national grid load. Cooling is the largest non-compute load. Even a 5× improvement in cooling efficiency, applied at scale, unlocks tens of TWh.
- **Novel contribution:** Nobody has done the honest math: what does 1.1% TUE mean when the baseline isn't air (30%) but state-of-art liquid (5–15%)? And what's the commercialization gap between a lab-tested 20×20mm plate and a production rack-scale system?

## 10-Star Test
- **Original calculation:** Global energy savings at different adoption rates, comparing to correct baseline
- **Comparison table:** Air cooling vs conventional liquid (CoolIT, Asetek, Motivair) vs ECAM copper plates — TUE, cooling power per GW, cost
- **Data:** Paper provides TUE 1.011, thermal resistance curves, pressure drop data, GaN transistor test results
- **Failure mode analysis:** Fabric8Labs is pre-revenue with $73M raised. Lab-to-fab gap is real. Resolution: 33 μm voxel, 20×20mm test area → how does this scale to a full server cold plate (~200×200mm)?
- **Strongest counterargument:** The comparison to air cooling inflates the improvement. And existing liquid cooling from mature vendors already cuts cooling to 5–15%. ECAM's improvement over that narrower gap must justify the manufacturing retooling.

## Primary Source
- **Paper:** "Ultra-high-performance cold plate development through topology optimization and electrochemical additive manufacturing"
- **Journal:** Cell Reports Physical Science (published May 7, 2026)
- **DOI:** 10.1016/j.xcrp.2026.103272
- **Authors:** Behnood Bazmi, Nenad Miljkovic (UIUC MechSE), et al.
- **Funding:** U.S. Department of Energy

## Key Data Points

### From the paper:
- TO cold plate: up to 32% lower thermal resistance vs conventional pin fins at fixed flow rate
- Up to 68% lower pressure drop at equal thermal resistance
- Array-averaged thermal resistance reduction: 13.5%–18.5% vs 2mm pins, 20.4%–29.4% vs 1.5mm pins
- Outlet row penalty reduced 30% (vs 2mm) and 39% (vs 1.5mm)
- At fixed R_th of 3.1 K/W, TO lowers pumping power by ~60% vs 2mm pins, ~98% vs 1.5mm pins
- Material: Pure copper, 99.95% purity (vs typical AlSiMg or stainless steel)
- ECAM voxel resolution: ~33 μm (features as fine as 30–50 μm)
- Test area: 20×20 mm² finned area, GaN transistor array
- Air cooling R_th: 29.06 K/W; ECAM liquid cooling R_th: 0.376 K/W (77× improvement)

### Data center energy analysis (from paper):
- Air cooling TUE: ~1.55 (30% of total energy to cooling)
- Their claim: ECAM TUE ~1.011 (1.1% of total energy to cooling)
- 1 GW data center: 550 MW for air cooling → 11 MW for ECAM liquid cooling
- US data center energy: 176 TWh (2023), projected 325–580 TWh by 2028
- Cooling share with air: 180–320 TWh; with ECAM: 3.6–6.4 TWh (theoretical max savings: ~175–315 TWh)

### Honest comparison (to be calculated for article):
- Existing liquid cooling TUE: ~1.05–1.15 (5–15% overhead)
- ECAM TUE: ~1.011
- Improvement vs existing liquid: 4.5–13.6× less cooling overhead
- At 1 GW scale: existing liquid uses 50–150 MW for cooling; ECAM uses 11 MW
- Savings per GW facility: 39–139 MW (not 539 MW as headlines claim)
- Still meaningful: at projected 2028 data center power of 325–580 TWh, liquid-cooled fraction is growing

## Company: Fabric8Labs (San Diego, CA)
- Founded: ~2018
- CEO: Jeff Herman
- VP Product: Ian Winfield
- Total raised: ~$73.3M ($4M seed 2018, $19.3M Series A 2021, $50M Series B 2023)
- Investors: NEA (led B), Intel Capital, Lam Capital, TDK Ventures, SE Ventures, Mark Cuban
- Status: Pre-revenue (as of last public reporting)
- Technology: Electrochemical Additive Manufacturing (ECAM) — uses OLED-display-style printhead with individually addressable microelectrode arrays
- Differentiator: Room temperature process (no melting), water-based feedstock, 90% lower GHG vs conventional manufacturing, recyclable feedstock
- Resolution: 33 μm voxel (vs ~100+ μm for laser powder bed fusion)
- Target markets: Data center cooling, RF devices, medical devices, MEMs

## Competitors / Context
- **CoolIT Systems:** Leading commercial direct liquid cooling. Used in AWS, Azure. TUE improvement vs air: significant but not disclosed per-plate performance
- **Asetek:** Pioneers of liquid cooling for data centers. Recent push into AI/HPC cooling
- **Motivair:** ChilledDoor and direct-to-chip solutions
- **Vertiv:** Rear-door heat exchangers and hybrid cooling
- **Key context:** Most commercial liquid cooling uses machined aluminum or copper channels, NOT topology-optimized pure copper. The manufacturing innovation (ECAM enabling topology-optimized pure copper) is the real differentiator, not just "liquid vs air."

## Limitations
- Lab test was on a 20×20mm cold plate with 4 GaN transistors — not a full server or GPU
- Scaling from 20mm to full-server cold plates (~100–200mm) is non-trivial
- Fabric8Labs is pre-revenue; mass production capability unproven at data center scale
- The 1.1% TUE assumes ideal implementation across an entire facility, including pumps, CDUs, piping — real deployments will have additional losses
- Paper tested with water at 22°C ambient — real data centers have variable conditions
- Cost comparison absent — pure copper ECAM plates likely more expensive per unit than machined aluminum

## Strongest Counterargument
The biggest risk isn't the physics — the 32% improvement and 68% pressure drop reduction are experimentally verified. The risk is the manufacturing gap. Fabric8Labs has demonstrated this at centimeter scale with $73M in VC backing and zero revenue. Scaling ECAM to cover billions of chips worldwide requires a manufacturing revolution that hasn't happened yet. CoolIT and Asetek ship millions of cold plates today using established processes. The question isn't whether topology-optimized copper is better — it's whether it can be made fast enough and cheap enough to matter before data centers double again.

## Methodology Transparency
- Energy savings calculation: (US data center TWh) × (cooling fraction under each technology) = cooling TWh
- TUE conversions: TUE_air = 1.55 → cooling = 0.55/1.55 = 35.5% of total; TUE_existing_liquid ≈ 1.10 → cooling = 0.10/1.10 = 9.1%; TUE_ECAM = 1.011 → cooling = 0.011/1.011 = 1.1%
- Per-GW savings: at 1 GW compute, total power = GW × TUE. Air: 1.55 GW (550 MW cooling). Existing liquid: 1.10 GW (100 MW cooling). ECAM: 1.011 GW (11 MW cooling).

## Category
⚡ Energy / 💻 Tech Infrastructure

## Journalist
Alex Harmon — covers compute infrastructure, energy costs, manufacturing technology

## Sources
1. Bazmi et al., "Ultra-high-performance cold plate development through topology optimization and electrochemical additive manufacturing," Cell Reports Physical Science (2026). DOI: 10.1016/j.xcrp.2026.103272
2. UIUC MechSE press release: https://mechse.illinois.edu/news/82871
3. ScienceAlert: "Engineers Found a Genius Way to Slash Data Center Energy Use" (June 14, 2026)
4. Data Center Dynamics: "3D-printed copper cold plate could drastically cut power needed for data center cooling"
5. 3DPrinting.com: "3D Printed Copper Cold Plates Could Cut Data Center Cooling Energy by 98%"
6. Tom's Hardware: Fabric8Labs at Hot Chips 2025
7. Intel Capital: "How Fabric8Labs is Redefining Manufacturing" (May 2024)
8. DOE/IEA data center energy projections

## Status
Research complete. Ready for DRAFT.

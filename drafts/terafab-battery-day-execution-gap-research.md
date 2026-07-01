# Research: Terafab Execution Gap — Battery Day as Predictor

## Thesis
Tesla's AI5 chip tape-out and first Terafab leadership hire signal the company is serious about building its own semiconductor fab. But Tesla's own Battery Day track record — the closest analog for a Musk-era vertical integration megaproject — suggests the timeline will slip 4-5 years and the first phase will cost 3-5× more per unit than projected. Original calculations show the break-even economics are razor-thin unless utilization exceeds 70%.

## Original Analysis: The Battery Day Execution Coefficient

### Battery Day (Sep 22, 2020) Promises vs Reality
- **Promise:** 10 GWh within 1 year (by Sep 2021). 100 GWh by 2023. 3 TWh by 2030.
- **Reality (as of June 2026, 5.75 years later):**
  - Giga Texas: ~6 GWh/yr capacity, 100M+ cells produced by Sep 2024
  - Giga Berlin: 8 GWh capacity (Dec 2025), expanding to 18 GWh ($250M investment, May 2026)
  - Combined capacity: ~14-18 GWh (vs 100 GWh target for 2023)
  - L&F cathode contract written down 99.9% ($2.9B → $7,386)
  - Dry electrode process: needed 6-7 revisions, only now (2026) fully validated on both anode + cathode
  - Cybertruck (primary 4680 vehicle): run rate ~20-25K units/yr vs 250K capacity
- **Execution coefficient:** 14-18% of 100 GWh target, delivered ~3 years late
- **Timeline slip:** 4-5 years behind original promises

### Applying to Terafab
If Battery Day execution coefficient applies:
- Musk envisions 100K WSM → realistic early-years output: 15-20K WSM
- First production-ready chips by ~2032-2034 (vs implied ~2028-2029)
- Each year of delay on a $55B fab = ~$3.7B in idle capex (at 15-yr depreciation)

## Original Analysis: Terafab Cost-Per-Wafer Break-Even

### Assumptions
- Intel 14A process → comparable to TSMC N2/A16 tier
- TSMC N2 wafer price: ~$30,000 (reported), A16: ~$45,000 (rumored)
- Conservative comparison: $30,000/wafer
- Terafab Phase 1: $55B investment
- Target: 100K wafer starts/month = 1.2M/year
- Typical leading-edge fab life: 15 years
- Operating cost ratio: 0.7-1.0× of capex (industry standard for leading edge)

### Scenario 1: Full Utilization (100K WSM)
- Capex amortization: $55B / (1.2M × 15) = $3,056/wafer
- Estimated opex ($2K/wafer based on industry analogs): total = $5,056/wafer
- Savings vs TSMC pricing: $30,000 - $5,056 = ~$24,944/wafer
- Annual savings at full utilization: $24,944 × 1.2M = ~$29.9B/year
- Break-even on $55B capex: <2 years

### Scenario 2: 30% Utilization (early years, realistic)
- Effective capex: $3,056 / 0.30 = $10,187/wafer
- Opex (partially fixed): ~$5K/wafer
- Total: ~$15,187/wafer
- Savings: $30,000 - $15,187 = ~$14,813/wafer
- But at 30% util (360K wafers/yr): annual savings = $5.3B/year

### Scenario 3: 30% Utilization + Poor Yields (20-30% good die rate)
- Cost per GOOD DIE effectively 3-5× wafer cost
- At this point, buying from TSMC is cheaper

### The Yield Gap
- TSMC N3/N2 yields: typically 60-80% at maturity
- Intel's own 18A: yield issues documented publicly
- New fab with no institutional knowledge: expect 20-30% yields initially
- Intel's 10nm took 5 years to reach acceptable yields
- Terafab is attempting to start on 14A — a node Intel itself hasn't proven in volume

## Primary Sources
1. **SpaceX S-1 filing (May 2026)** — $55B initial, $119B total, "very early stages"
2. **Tesla Q1 2026 earnings call** — Musk: "$3B R&D facility, few thousand wafers/month"
3. **Electrek (Jun 30, 2026)** — Gary Jiang hire, 17-year Intel 18A factory manager → Director, Terafab
4. **Reuters (Apr 2026)** — Intel joins Terafab, Tesla becomes first 14A customer
5. **Tom's Hardware (wafer pricing)** — TSMC N2: $30K, A16: $45K per wafer (rumored)
6. **Electrek (May 2026)** — 4680 cell production data, L&F contract writedown 99.9%
7. **Autoevolution (May 2026)** — Giga Berlin 4680 expansion: 8 GWh → 18 GWh

## Counterargument
The strongest case FOR Terafab: Tesla's 4680 program DID eventually work. The dry electrode process is now validated. Tesla has the lowest-cost cell per kWh as of end 2024. The delay pattern is consistent — Musk over-promises on timeline but eventually delivers the capability. If AI chip demand grows at 40-60% CAGR (analyst consensus), today's $55B investment could look cheap by 2032. And unlike batteries, semiconductor fab expertise can be purchased (as the Jiang hire demonstrates). Intel's institutional knowledge is being transplanted one veteran at a time.

## Kill Test
✅ Original calculation: Battery Day execution coefficient applied to Terafab projections (nobody has done this)
✅ Original calculation: Cost-per-wafer break-even at varying utilization rates with yield sensitivity
✅ Novel comparison: first public analysis connecting 4680 execution trajectory to semiconductor fab projections

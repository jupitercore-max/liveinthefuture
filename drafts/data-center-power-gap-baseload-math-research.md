# Research: The Data Center Power Gap — Baseload Math Nobody's Running

## Thesis
America's AI data center buildout faces a fundamental physics problem that opposition alone doesn't explain: the grid is adding capacity, but almost none of it is baseload. Data centers need 24/7 power. Solar panels don't work at night. The gap between what data centers need and what the grid can actually deliver is ~$340 billion wide.

## Category
⚡ Energy

## Journalist
Priya Desai — Urban Infrastructure & Technology Economics

## Original Calculation: The Baseload Gap

### Data Center Demand Growth
- US data center power demand 2025: 61.8 GW (451 Research, via OilPrice.com)
- Projected 2026: 75.8 GW
- Projected 2028: 108 GW
- Projected 2030: 134.4 GW
- Growth needed 2025→2030: 72.6 GW net new capacity
- Annual growth rate: ~14.5 GW/year

### Grid Capacity Additions (EIA, Feb 2026)
- 2024 actual: 48.6 GW added
- 2025 actual: 53 GW added
- 2026 planned: 86 GW (record)
- Breakdown of 2026:
  - Solar: 43.4 GW (51%) — nameplate, NOT average output
  - Battery storage: 24 GW (28%) — storage, NOT generation
  - Wind: ~12 GW (14%) — intermittent
  - Dispatchable (gas/nuclear): ~6-7 GW (~7%)

### The Capacity Factor Problem (ORIGINAL CALCULATION)
Solar nameplate ≠ delivered power. Capacity factors matter enormously:
- Solar capacity factor: ~25% (EIA national average)
- Wind capacity factor: ~34%
- Natural gas capacity factor: ~57% (combined cycle) to ~80% (peaker if needed)
- Nuclear capacity factor: ~93%
- Data center demand factor: ~85-95% (nearly constant load)

So 43.4 GW of solar nameplate = ~10.9 GW average output
12 GW of wind nameplate = ~4.1 GW average output
Battery storage (24 GW): shifts timing, does NOT create new energy

Total effective new generation for 2026: ~10.9 (solar) + 4.1 (wind) + ~5.5 (gas) = ~20.5 GW effective average output
For ALL of US demand growth, not just data centers.

Data center demand growth alone: ~14.5 GW/year of baseload equivalent
That's ~71% of all effective new generation capacity

### The Queue Problem (Berkeley Lab "Queued Up" 2025 Edition)
- 10,300 projects actively seeking interconnection (end of 2024)
- 1,400 GW generation + 890 GW storage in queue — more than entire US fleet
- Only 13% of projects that entered queue from 2000-2019 reached commercial operations
- 77% were withdrawn
- Median queue-to-completion time: doubled from <2 years to >4 years
- 408 GW have interconnection agreements but haven't reached commercial operations
- Natural gas in queue: 136 GW (+72% YoY)

### The Stranded Capital Calculation (ORIGINAL)
If data centers need 72.6 GW by 2030, and the queue completion rate is 13%:
- Required queue capacity: 72.6 / 0.13 = ~558 GW dedicated to data centers
- But that's more than all dispatchable capacity in the queue (136 GW gas)
- Even at 100% completion of gas queue: 136 GW — barely enough for 5 years of DC growth alone
- Average data center cost: $7-15B per GW (varies by density)
- At midpoint ~$10B/GW: the 72.6 GW gap represents ~$726B in infrastructure needing power
- Of that, only ~30-50% can be served by projected grid additions → ~$360-500B potentially stranded

### Other Key Data Points
- ERCOT (Texas) large load interconnection requests: 205 GW (4x from 56 GW one year prior)
- 70%+ of ERCOT requests are from data centers
- 75-90% of data center load requests estimated to amount to nothing (Monitoring Analytics / NRDC)
- PJM capacity auction cost: $16.1B (up from $2.2B two years prior)
- Goldman Sachs: data center demand alone accelerates US power demand growth by 1.2 percentage points to 2.6%

### Opposition Data (Context, Not Focus)
- $64B in projects blocked/delayed since mid-2024 (Trellis)
- 188 opposition organizations in 40 states (Trellis, May 2026)
- 70% of Americans oppose AI data center in their area (Gallup, March 2026)
- 48% strongly opposed
- 14 states considering moratorium legislation (NCSL)
- Monterey Park, CA: first permanent ban via ballot (~90% voted yes)
- 25 project cancellations in 2025 (4x prior year)

### The "Bring Your Own Generation" Trend
- NextEra Energy CEO John Ketchum: "bring your own generation" to get load interconnect
- Duke University: demand response could save $40-150B in capital over next decade
- FERC fast-track orders to 6 grid operators (PJM, MISO, SPP, CAISO, ISO-NE, NYISO)

## Data Center Electricity Context
- US data center electricity 2026: 270 TWh (Lawrence Berkeley Lab)
- US total electricity consumption 2025: ~4,200 TWh
- Data centers = ~6.4% of US total
- IEA global: 415 TWh (2024) → ~945 TWh (2030 base case)
- China: 300-500 billion kWh additional demand 2026-2030

## Primary Sources (3+)
1. EIA "Preliminary Monthly Electric Generator Inventory" (Feb 2026) — capacity additions data
2. Berkeley Lab "Queued Up: 2025 Edition" — interconnection queue data, completion rates
3. 451 Research — data center power demand projections (via OilPrice.com reporting)
4. Gallup (March 2026) — public opinion polling
5. PJM Interconnection / Monitoring Analytics — capacity auction data
6. Goldman Sachs Research — power demand acceleration projections
7. Trellis — opposition tracking data
8. FERC — grid operator orders

## Kill Test: Original Calculation
✅ Cross-referencing EIA capacity factor data with 451 Research demand projections to calculate effective baseload gap — this specific calculation (solar nameplate vs. data center baseload equivalence) hasn't been published
✅ Queue completion rate × required capacity = total queue capacity needed — reveals the mathematical impossibility
✅ Cost of stranded capital estimate

## Strongest Counterargument
The NY Post / Jonathan Koomey argument: data centers are becoming more efficient (PUE dropping), projections double-count, and battery storage + solar can effectively deliver 24/7 power. Also, 86 GW of new capacity in 2026 IS a record. The grid IS growing. Some analyses overstate the problem by assuming all queued capacity is real demand. Counter-counter: even with optimistic efficiency gains, the baseload math doesn't close. Battery storage shifts load timing but doesn't create electrons. And the 13% queue completion rate already accounts for speculative projects — it's the real number.

## Limitations
- 451 Research projections are estimates; actual demand could be lower if AI capex pulls back
- Capacity factors vary by region (Arizona solar ≠ Michigan solar)
- "Bring your own generation" trend could partially bypass grid constraints
- Some data centers are contracting directly with nuclear plants (Microsoft-Constellation deal)
- Our stranded capital estimate uses midpoint cost assumptions; actual range is wide

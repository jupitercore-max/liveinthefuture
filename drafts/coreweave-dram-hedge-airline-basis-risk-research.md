# Research: CoreWeave DRAM Hedging / Airline Basis Risk Parallel

## Topic
CoreWeave (CRWV) exploring financial derivatives (put options on memory chip stocks) to hedge against DRAM price declines. Direct parallel to airline fuel hedging era — same structural problem (cross-hedging, basis risk), same likely outcome.

## Why This Topic
- Breaking news: Reuters exclusive, July 14 2026
- Zero existing LITF coverage on CoreWeave, memory derivatives, cloud commodity risk
- Natural sequel to Jordan Kessler's DDR5 golden cross article (July 11)
- Strong original calculation: basis risk quantification between semiconductor equity puts and DRAM contract prices

## Primary Sources
1. **Reuters exclusive (July 14 2026):** CoreWeave exploring put options on memory chip stocks to hedge DRAM price floor contracts with Micron/SanDisk. Early-stage discussions, no hedges executed yet.
2. **CoreWeave Q1 2026 10-Q (May 7 2026):** Revenue $2.08B, cost of revenue $716M, tech & infrastructure $1.273B, net loss -$740M, capex guidance $31B for 2026.
3. **CoreWeave Q4 2025 earnings call:** 2026 revenue guidance $12-13B, backlog $99.4B, 10 clients at $1B+ each.
4. **TrendForce DRAM pricing data:** DDR4 8Gb spot up 25% in May 2026. LPDDR5X contract prices rose 58-63% QoQ in Q1, expected 93-98% QoQ in Q2. LTA floor ~$7.8/GB, ceiling ~$21/GB.
5. **Airline hedging history:** Southwest saved $3.5B hedging at $51/barrel (2004-2008), then lost; ended hedging in 2025 ($150M/yr premiums). United lost $519M on fuel hedges. PMC academic paper on jet fuel hedging basis risk.
6. **DRAM cyclicality data:** 2019 ASP fell 44%; Q3 2022 DRAM revenue dropped 28.9%; SK Hynix went from -7.7T KRW loss (2023) to +47T KRW profit (2025). New capacity (SK Hynix M15X, Micron Idaho) expected early 2028.

## Original Calculation: The Basis Risk Gap

### CoreWeave's DRAM Exposure
- 2026 capex: $31B (raised from prior guidance, citing rising component costs)
- Memory/storage estimated at 15-20% of capex: ~$4.7-6.2B annually
- Floor contracts lock CoreWeave into minimum pricing even if spot falls
- Risk: if DRAM prices fall 40% (normal downcycle magnitude), overpayment = ~$1.9-2.5B

### The Cross-Hedging Problem
CoreWeave can't hedge DRAM directly — no liquid DRAM futures market exists.
Proposed solution: put options on semiconductor stocks (Micron, SanDisk).
This is exactly what airlines did: hedged jet fuel using WTI crude oil derivatives.

Airlines discovered: WTI-to-jet-fuel correlation broke down (Southwest 10-K: "correlation between WTI crude oil prices and jet fuel prices during recent periods has not been as strong as in the past").

CoreWeave's version is WORSE:
- Airlines: commodity → refined commodity. Same asset class.
- CoreWeave: commodity (DRAM contracts) → equity (Micron stock). Different asset classes.
- Micron stock incorporates: PE multiple expansion/compression, market beta, diversified revenue (NAND, HBM, storage), management changes, buybacks, AI narrative premium/discount

### Historical Mismatch Evidence
- 2022-2023 downcycle: DRAM contract prices fell ~40-50%. Micron stock fell ~50% (amplification).
- 2023-2025 upcycle: DRAM contract prices tripled. Micron stock roughly doubled (lagged).
- Asymmetry: stocks amplify on the downside (market panic) but lag on the upside (skeptical of commodity supercycles).
- This creates one-sided basis risk that makes hedges unreliable in exactly the scenario they're designed for.

### The Scale Comparison
| Metric | Airlines (fuel) | CoreWeave (DRAM) |
|--------|----------------|-----------------|
| Annual commodity exposure | $10-12B (Delta) | $4.7-6.2B (est.) |
| Hedging premiums | $150M/yr (Southwest) | TBD |
| Cross-hedge instrument | WTI crude oil futures | Micron/SanDisk equity puts |
| Basis risk type | Commodity-to-commodity | Commodity-to-equity |
| Historical correlation | 0.85-0.95 | Unreported, structurally worse |
| Industry outcome | Universal abandonment by 2025 | Under exploration |

## Journalist
Jordan Kessler — Semiconductors & Finance beat. Direct continuation of DDR5 golden cross coverage.

## Strongest Counterargument
CoreWeave may be right that protection is needed. DRAM IS cyclical — new fab capacity in 2027-2028 will likely trigger a correction. Floor contracts without hedging expose CoreWeave to potentially $2-3B in overpayments during a downcycle. Even an imperfect hedge that captures 50-60% of the move is worth the premium. Delta solved the basis risk problem by buying its own refinery (Trainer) for $150M in 2012 — but vertical integration into DRAM fabrication is absurd for a cloud company.

## Key Limitation
The memory-as-percent-of-capex estimate (15-20%) is inferred from industry benchmarks, not CoreWeave's actual disclosure. CoreWeave's specific contract terms with Micron/SanDisk are not public. The equity-to-DRAM correlation analysis uses directional price movements from public indices, not CoreWeave's specific contract pricing.

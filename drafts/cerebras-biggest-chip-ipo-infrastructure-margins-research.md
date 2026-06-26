# Research Notes: Cerebras — Biggest Chip IPO, Infrastructure Margins

## Topic
Cerebras Systems (CBRS) reported its first public quarterly earnings on June 23, 2026. The company raised $6.4B in the largest semiconductor IPO ever (May 2026, $185/share) and announced a $20B+ multi-year deal with OpenAI. But the Q1 numbers reveal a fundamental identity tension: Cerebras is priced like a chip company but operates like an infrastructure company.

## Primary Sources
1. **Cerebras Q1 2026 Press Release** (GlobeNewsWire, June 23, 2026) — Full financial statements
2. **SEC 10-Q Filing** (via StockTitan) — Balance sheet, cash flow, notes
3. **Reuters** — OpenAI deal terms ($20B/3yr, warrants, $1B loan)
4. **The Information** — OpenAI may get up to 10% equity via warrants
5. **NVIDIA Q1 FY2027 Earnings** (May 20, 2026) — $81.6B rev, 75% gross margins
6. **Patrick Moorhead (Moor Insights)** — "Concentration rotated, it didn't go away"
7. **The Street** — Margin pressure analysis, cloud vs chip business model shift

## Key Financial Data (Cerebras Q1 2026)
- Revenue: $193.4M (94% YoY, 13% sequential)
  - Hardware: $110.6M (59% YoY), gross margin 41%
  - Cloud/services: $82.8M (178% YoY), gross margin 49%
- GAAP gross margin: 45%, Core (non-GAAP): 47%
- GAAP net loss: $14.0M, Core: $2.5M
- R&D: $75.5M (39% of revenue)
- Capex: $132.0M (68% of revenue!)
- Operating cash flow: +$12.3M (first time positive)
- Cash/investments/restricted: $3.3B
- Accumulated deficit: $919.3M
- Customer warrants on B/S: $516M ($90.7M current + $425.4M non-current)
- Loan from customer (OpenAI): $982.9M ($621.3M current + $361.6M non-current)
- Property/equipment: $572.4M (up from $437.4M in Q4)

## Guidance
- Q2: Core revenue $194M (88% YoY), Core GM 36-38%, Core op margin (30)-(32)%
- FY2026: Core revenue $855-865M (69% YoY at midpoint), Core GM 38-41%, Core op margin (28)-(32)%

## Market Data
- Stock: $168.52 (down 7.5% on June 25)
- Market cap: ~$49.8B
- IPO price: $185 → currently -9% below IPO
- 52-week high: $386.34 → currently -56% from peak
- Revenue multiple: $49.8B / $860M = 58x

## NVIDIA Comparison (Q1 FY2027)
- Revenue: $81.6B (85% YoY)
- Data Center: $75.2B (92% YoY)
- Gross margin: 75%
- Market cap: $4.88T
- Revenue multiple: ~$4.88T / ($81.6B × 4) = ~15x annualized
- Capex/revenue: ~8%

## Original Analysis: The Margin Identity Crisis

### 1. Capex Intensity Comparison (killer table)
| Company | Gross Margin | Capex/Revenue | Rev Multiple | Category |
|---------|-------------|---------------|-------------|----------|
| NVIDIA | 75.0% | ~8% | ~15x | Fabless chip designer |
| AMD | ~50% | ~5% | ~8x | Fabless chip designer |
| TSMC | ~55% | ~45% | ~10x | Foundry |
| Cerebras (Q1) | 45% GAAP | 68% | 58x | ??? |
| Cerebras (FY guid) | 38-41% | TBD | 58x | ??? |
| Equinix | ~47% | ~15% | ~10x | DC REIT |
| AWS (implied) | ~35% op | ~40-50% | 10-15x est | Cloud |

Cerebras capex intensity (68%) exceeds every semiconductor peer and most cloud providers.

### 2. Revenue per MW Economics
- OpenAI deal: $20B for 750MW over ~3 years
- Annual: ~$6.67B/year (if linear)
- Per MW/year: $8.89M
- Industry DC build cost: $20-40M per MW (JLL/McKinsey benchmarks)
- At 38% gross margin: $8.89M × 0.38 = $3.38M gross profit per MW per year
- Payback on $20M/MW build: 5.9 years (on a 3-year contract)
- Payback on $40M/MW build: 11.8 years
- Problem: contract is 3 years, payback is 6-12 years

### 3. Customer Circular Dependency
- OpenAI lent Cerebras $1B → appears as $983M "loan from customer" liability
- OpenAI gets warrants → potentially 10% at $30B total spend
- OpenAI is the biggest customer → $20B+ of $24.6B total backlog
- If OpenAI walks: revenue collapse + $983M debt still due + sunk capex

### 4. Warrant Dilution Economics
- $516M customer warrants on balance sheet (asset — reduces reported revenue via amortization)
- $2.053M amortized as contra-revenue in Q1
- Over $30B spend, OpenAI potentially gets 10% = ~$5B equity at current valuations
- Effective rebate: $5B / $30B = 16.7%
- True economic value of OpenAI revenue ≈ 83¢ per reported dollar

## Strongest Counterargument
Cerebras's wafer-scale engine (WSE-3) is genuinely the fastest AI inference hardware. Artificial Analysis independently measured ~1,000 tokens/sec on Kimi K2.6 (1T param model). If inference becomes the bottleneck (not training), speed premiums could support higher prices. The AWS partnership validates the technology: AWS chose Cerebras for decode inference alongside its own Trainium 3 for prefill. The margin compression may be temporary — as data centers come online, the heavy capex investment converts to recurring cloud revenue at 49-53% cloud margins, not 41% hardware margins. If cloud/services grows from 43% to 70%+ of revenue, blended margins recover.

## Limitations
- OpenAI deal terms come from The Information/Reuters reporting, not Cerebras's own SEC filings (10-Q doesn't itemize deal-level economics)
- Data center build cost range ($20-40M/MW) is an industry-average estimate; Cerebras's actual costs may differ
- The 3-year contract timeline is from Reuters reporting; Cerebras describes it as "next several years"
- We don't know what percentage of FY2026 revenue comes from OpenAI specifically
- Warrant economics assume The Information's 10% figure is accurate

## Kill Test
✓ Original contribution: Capex intensity comparison showing semiconductor pricing on infrastructure economics; revenue-per-MW payback analysis showing contract duration mismatch; warrant dilution calculation
✓ Not a book report — multiple original calculations
✓ Multiple primary sources (SEC filing, press release, Reuters, analyst commentary)

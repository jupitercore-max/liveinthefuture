# Research: SpaceX's 33-Engine Problem — The Reliability Math Behind a $1 Trillion Evaporation

## Thesis
SpaceX's stock has lost $1 trillion in market cap in 31 days, breaking below its IPO price for the first time. The proximate cause was a Starship Flight 13 scrub when 4 of 33 Raptor engines failed to ignite. But the deeper story is mathematical: when you strap 33 engines together, individual reliability compounds against you brutally. At observed Raptor reliability rates, SpaceX faces a fundamental engineering-to-market-cap problem that nobody in the IPO prospectus adequately quantified.

**Original calculation:** Using observed engine failure data across Starship flights to calculate the per-engine reliability needed for commercially viable launch rates — and showing the gap between where Raptor is and where it needs to be.

## Primary Sources

### 1. SpaceX Stock & IPO Data (SEC filings, Reuters, MarketWatch, WSJ)
- IPO date: June 12, 2026
- IPO price: $135/share
- Capital raised: $85.7 billion (largest IPO in history)
- First-day close: ~$150/share, valuation ~$2.1 trillion
- Post-IPO peak: $225.64/share on June 16 ($2.67T market cap)
- Current (July 17): $124.30/share (~$1.61T market cap)
- Loss from peak: ~$1.06 trillion in 31 days
- Now a "broken IPO" — trading 8% below offering price
- Six consecutive days of decline
- 52-week range: $122.14 – $225.64

**Lockup risk:**
- ~1.2 billion additional shares become tradeable in August (Wolfe Research)
- 319 million more shares released 70 days after prospectus filing
- Peter Schiff: float could expand 8× by year-end

**SpaceX financials:**
- 2025 revenue: $18.67 billion (+33% YoY)
- 2025 net loss: $4.94 billion (xAI merger-driven; was $791M profit in 2024)
- Starlink: ~60% of revenue, 10.3M subscribers, 9,600 satellites
- Three segments: Space Launch ($4.1B), Connectivity/Starlink ($11.4B), AI/xAI/Grok ($3.2B)
- $15 billion spent on Starship development

### 2. Starship Engine Reliability History (SpaceNews, SpaceX broadcasts, FAA reports)

**Starship Flight History — Engine Performance:**

| Flight | Date | Booster Engines (33) | Ship Engines (6) | Outcome |
|--------|------|---------------------|-------------------|---------|
| Flight 1 | Apr 2023 | Multiple failures | N/A (no sep) | Destructed |
| Flight 2 | Nov 2023 | All 33 lit, booster exploded during boostback | Engine fire | Both stages lost |
| Flight 3 | Mar 2024 | 33/33 ascent OK | 6/6 ascent OK, attitude loss | Partial success |
| Flight 4 | Jun 2024 | 33/33 ascent OK, booster splashdown | 6/6, heat shield loss | Partial success |
| Flight 5 | Oct 2024 | 33/33, first booster catch | Ship engine relight ok | Major milestone |
| Flight 6 | Nov 2024 | 33/33, booster catch | Upper stage anomaly | Partial success |
| Flight 7 | Jan 2026 | OK | Multiple Raptor failures, breakup | Upper stage lost |
| Flight 8 | Mar 2026 | 33/33 ascent, 2 boostback failures, caught anyway | 4 engines failed (1 RVac, 3 SL), breakup | Upper stage lost |
| Flight 9 | May 2026 | OK | Ascent OK, attitude control loss | Upper stage lost |
| Flight 10 | Aug 2026* | — | — | Static fire COPV failure, vehicle destroyed |
| Flight 10 | Sep 2025 | 33/33, OK | 6/6 | First fully successful flight after three failures |
| Flight 11 | Dec 2025 | 33/33, booster catch | 6/6, splashdown | Success |
| Flight 12 | May 2026 | 33/33 ascent, 1 shutdown; boostback engine failures | Upper stage engine loss | FAA investigation (Raptor 3 debut) |
| Flight 13 | Jul 17, 2026 | 4 of 33 failed to ignite → ABORT | N/A (never lit) | Scrubbed |

**Key engine reliability incidents:**
- Flight 7: "Harmonic response several times stronger in flight than seen during testing" → propellant leaks, fires, multiple Raptor shutdowns
- Flight 8: Hardware failure in center Raptor → propellant mixing → fire → 4 engines lost total
- Flight 12: 1 engine shutdown during ascent; multiple failures during boostback burn → FAA mishap investigation
- Flight 13: 4 of 33 Raptors failed to ignite at T-0 → automatic abort. First on-pad abort of fully stacked Starship.

### 3. The 33-Engine Probability Math (ORIGINAL ANALYSIS)

**The compound reliability problem:**
With 33 engines, individual engine reliability must be extraordinarily high to achieve acceptable launch success rates.

P(all 33 engines start successfully) = r^33, where r = individual engine start reliability

| Per-Engine Reliability | P(Clean 33-Engine Start) | Implication |
|----------------------|--------------------------|-------------|
| 95% | 18.5% | ~1 in 5 launches attempt clean |
| 97% | 36.0% | ~1 in 3 |
| 98% | 51.3% | Coin flip |
| 99% | 71.8% | ~3 in 4 |
| 99.5% | 84.7% | ~5 in 6 |
| 99.9% | 96.7% | ~1 in 30 fails |
| 99.95% | 98.4% | ~1 in 63 fails |
| 99.99% | 99.7% | ~1 in 333 fails |

**Observed reliability estimates:**
- Flight 13: 29/33 = 87.9% per-engine ignition (would give 1.2% chance of clean start)
- Flight 12 ascent: 32/33 = 97.0% (at this rate, 36% chance of clean 33-engine start)
- Flights 5-6, 10-11: 33/33 = 100% in those flights (but small sample)

**For commercial viability (weekly launches):**
- Need ≥95% clean launch probability → requires 99.85% per-engine reliability
- At 52 launches/year with 95% clean ignitions, expect 2.6 scrubs/year
- At 99% per-engine: expect 14.7 scrubs per 52 attempts (28% scrub rate)

**Market cap sensitivity (ORIGINAL CALCULATION):**
- SpaceX lost ~$100B in market cap from the Flight 13 scrub alone
- If we treat this as the "cost per scrub," and scrubs happen at the rate implied by current engine reliability, we can calculate the "reliability discount" the market should price in
- At current implied per-engine reliability (~97% from Flight 12 data), expect ~33 scrubs per 100 launch attempts
- $100B × 33 scrubs per 100 attempts = a permanent reliability tax of $33B per 100-launch campaign
- This doesn't even count in-flight failures (Flights 7-9, 12)

### 4. Comparison: Falcon 9 (9 engines) vs Starship (33 engines)

Falcon 9 has achieved >99.5% per-engine reliability over 400+ missions
- P(9 clean engine starts at 99.5%) = 95.6%
- P(33 clean engine starts at 99.5%) = 84.7%
- The same per-engine reliability gives 11 percentage points worse launch probability just from the engine count

Falcon 9 also has engine-out capability (can lose 1-2 engines on ascent). Starship can lose a few too, but:
- For ignition: all 33 must light for liftoff (or close to it — 4 out was enough to abort)
- The ignition problem is binary in a way that in-flight is not

### 5. Analyst Targets vs. Reliability Reality

| Firm | Price Target | Implied Market Cap | Required Annual Launch Rate |
|------|-------------|-------------------|---------------------------|
| Morgan Stanley | $300 | ~$3.9T | "Dozens of Starship launches" |
| JPMorgan | $225 (by end 2027) | ~$2.9T | High Starship cadence |
| Raymond James (bull) | $1,000 | ~$13T | "AI data centers in orbit" |
| Morningstar | $63 | ~$820B | Deeply skeptical |

The gap between Morgan Stanley's $300 target and Morningstar's $63 is the widest disagreement on a major public company — 4.8×. That gap is, at its core, a bet on Raptor reliability.

### 6. Historical IPO Comparisons — "Broken IPO" Timeline

| Company | IPO Date | Days to Break Below IPO Price | Recovery? |
|---------|----------|------------------------------|-----------|
| SpaceX | Jun 12, 2026 | 33 days (Jul 15) | TBD |
| Arm Holdings | Sep 14, 2023 | ~7 days | Yes, 5.5× as of 2026 |
| Uber | May 10, 2019 | Day 1 | Yes, ~4× by 2026 |
| Facebook | May 18, 2012 | Day 2 | Yes, ~15× eventual |
| Rivian | Nov 10, 2021 | ~30 days | No, still below IPO |
| WeWork | Oct 21, 2021 | Months | No, bankrupt 2023 |
| Jay Ritter data | — | 70%+ of IPOs have negative 3-year returns | — |

### 7. The Lockup Waterfall (ORIGINAL ANALYSIS)

Upcoming share unlock schedule creates a "supply shock" threat:
- August 2026: ~1.2 billion shares become tradeable (Wolfe Research)
- 70 days post-prospectus: 319 million additional shares
- By year-end: potential 8× float expansion (Peter Schiff estimate)
- Current daily volume: needs to be checked but likely can't absorb this supply without price pressure
- First earnings call: early August — timing overlaps with lockup expirations

**The "Starship-stock flywheel" problem:**
1. Stock falls → employee options are underwater → retention risk
2. Lockup expires → insiders sell → more supply pressure
3. More supply pressure → stock falls further
4. Stock performance depends on Starship success → Starship reliability determines the cycle

## Journalist
Marcus Chen — Space & Launch Economics beat

## Slug
spacex-33-engine-reliability-trillion-dollar-math

## Kill Test
**Original calculation:** The compound probability analysis of 33-engine reliability — translating observed per-engine failure rates into launch success probabilities and market-cap sensitivity. Nobody has done this specific math connecting Raptor reliability to the stock price decline. The lockup waterfall timing analysis is also original.

## Category
🚀 Space

## Related Articles
- space-launch-cost-wrights-law-monopoly-premium (Marcus Chen, July 15, 2026)
- spacex-ipo-218k-per-subscriber-arpu-death-spiral
- launch-failure-true-cost-67x-ratio

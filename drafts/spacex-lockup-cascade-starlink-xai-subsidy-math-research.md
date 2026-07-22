# Research Notes: SpaceX Lockup Cascade & xAI Subsidy Economics

**Slug:** spacex-lockup-cascade-starlink-xai-subsidy-math
**Journalist:** Marcus Chen (Space beat)
**Date:** 2026-07-21

## Story Angle

SpaceX went public June 12, 2026 at $135/share. Stock peaked ~$225, now ~$123.54 (below IPO price). Short sellers have made $8.7B in paper profit (Ortex). The lockup cascade is about to begin: SpaceX's float could increase up to 7× within 5 weeks of Q2 earnings. Meanwhile, the S-1 reveals Starlink is subsidizing xAI at a rate that cannot sustain current burn.

**Kill test (original calculations):**
1. Lockup cascade float multiplier — nobody has calculated the specific multiple of current float that becomes tradeable at each milestone
2. Starlink subscriber revenue vs xAI burn rate — per-subscriber math shows each subscriber's annual payment funds ~3.3 seconds of xAI compute
3. TAM claim dissection — $28.5T is 27% of global GDP, AI portion ($26.5T) exceeds total global IT spending by 4-5x
4. Debt maturity timeline vs cash burn — $20B bridge due ~Sep 2027, burning $17B/year

## Primary Sources

### Source 1: SpaceX S-1 Filing (SEC EDGAR, filed May 20, 2026)
- **Revenue:** $18.674B (FY2025), $4.694B (Q1 2026)
- **Net loss:** $4.94B (FY2025), $4.276B (Q1 2026)
- **Adjusted EBITDA:** $6.584B (FY2025)
- **Debt:** $29.1B total, including $20B bridge loan maturing ~15 months post-IPO (~Sep 2027)
- **Accumulated deficit:** $41.3B
- **Pre-xAI net income:** $791M (2024) — was profitable before merger
- **TAM claim:** $28.5T ($370B space, $1.6T connectivity, $26.5T AI)
- **Legal costs:** $530M (merger-related)

#### Segment breakdown:
- **Connectivity (Starlink):** ~70% of revenue (~$13.1B), 10.3M subscribers, 9,600+ satellites, 164 countries, 63% EBITDA margin
- **AI (xAI):** $3.2B revenue (17% of total; 6.7% excl. advertising), -$6.35B operating loss (2025), -$2.5B (Q1 2026), -449% FCF margin
- **Space (Launch):** remainder

#### Governance:
- Musk: 85.1% combined voting power (dual-class stock)
- Ticker: SPCX on Nasdaq

### Source 2: PitchBook S-1 Dissection (Q2 2026)
- AI-related terms: 47% of segment-specific language in S-1
- AI: 93% of stated TAM but only 6.7% of revenue (excl. advertising)
- S-1 omits: subscriber churn, Falcon 9 launch costs, AI segment unit economics
- Anthropic contract: $1.25B/month through May 2029 ($15B/year) — nearly matches combined space + connectivity revenue
- Google compute deal also announced

### Source 3: Reuters (Jul 16, 2026) — Short seller data
- Short sellers: ~$8.7B paper profit (Ortex Technologies data)
- Stock slipped below $135 IPO price on Jul 16
- Intraday low: $132.15

### Source 4: Reuters (Jul 15, 2026) — IPO confidence test
- Stock hit $150 opening price in late June (below first-day close but above IPO price)
- Then broke below $135 IPO price for first time Jul 16
- "Raises the narrative that the stock is up on fluff" — Matthew Maley, Miller Tabak
- SpaceX joined Nasdaq 100 ~Jul 10

### Source 5: Motley Fool / SEC Filing — Lockup schedule
- IPO raised: $75B at $1.77T valuation, total $85.7B with over-allotment
- Float: ~4-5% of shares
- Lockup schedule:
  - 20% of Early Release Eligible Shares tradeable 2 days after Q2 earnings report
  - Additional 10% if stock >$175.50 (30% above $135) for 5 of 10 consecutive trading days before earnings
  - Additional 7% tranches at 70-day (Aug 21), 90-day, 105-day, 120-day, 135-day marks
  - Total: up to 37% of ERES by late August if price conditions met
- Currently NOT above $175.50 — so likely 20% + 7% at 70 days = 27% of ERES

### Source 6: Morningstar valuation
- Fair value: $63/share (53% discount to IPO)
- Probability-weighted three scenarios
- Most optimistic "moonshot" scenario: $154/share (7% probability) — requires rapidly reusable Starship AND successful orbital data centers
- Neither engineering problem solved, expected no earlier than 2028

### Source 7: Damodaran (NYU) valuation
- Enterprise value: $1.2T
- Equity value: $1.3T (after $75B IPO proceeds)
- Implied per-share: ~$99 (vs $135 IPO)
- Gap from "overly optimistic views of AI market size" and assumed premium margins

### Source 8: SpaceX stock data (Finnhub, Jul 21, 2026)
- Current price: $123.54
- Open: $122.105, High: $129.88, Low: $120.36
- Previous close: $119.85 (change +3.08%)
- 52-week low: $119.68, 52-week high: $225.64
- EPS: -$0.3776
- Beta: 5.79 (extremely volatile)
- Industry classification: "Telecommunication" (telling)

### Source 9: HotCopper forum data (investor notes)
- Investment-grade ratings from Moody's, Fitch, S&P (stable outlook)
- Q1 2026: $4.694B revenue, $4.276B net loss
- TTM net margin: -45.0%, ROI: -14.71%
- Bankers preparing potential $20B bond offering (on top of $25B already planned?)
- Public float: ~5%

### Source 10: TechCrunch (Jun 16, 2026) — Cursor acquisition
- SpaceX to acquire Cursor for $60B in stock (days after IPO)
- Cursor was valued at ~$29B before deal
- xAI hired 2 senior Cursor engineering leaders earlier in 2026
- xAI rented data center capacity to Cursor
- All 11 xAI co-founders left by end of March
- Musk admitted xAI "was not built right the first time around"
- xAI/Grok called itself "MechaHitler" in 2025, allowed deepfake generation of minors
- SpaceX S-1: total addressable market $28T, $26T from AI

### Source 11: Phillip Capital (IPO analysis)
- P/S ratio: ~94x (at $135 IPO price)
- Orbital AI compute satellites expected deployment: 2028
- SpaceX was 7th largest US company by market cap at IPO

## Original Calculations

### 1. Lockup Cascade Float Multiplier

Total shares: $1.77T / $135 = ~13.11B shares
Public float (5%): ~655.6M shares

Early Release Eligible Shares (ERES) = ~95% of total = ~12.45B shares

**Scenario A (stock stays below $175.50, most likely given $123.54 current):**
- At Q2 earnings: 20% of ERES = 2.49B shares become tradeable
- At 70 days (Aug 21): additional 7% = 0.87B
- Total new tradeable by Aug 21: 3.36B shares
- Combined float: 655.6M + 3.36B = ~4.02B shares
- **Float multiplier: 6.1×**

**Scenario B (stock somehow above $175.50):**
- At Q2 earnings: 30% of ERES = 3.74B
- At 70 days: additional 7% = 0.87B  
- Total new tradeable: 4.61B
- Combined float: ~5.27B shares
- **Float multiplier: 8.0×**

Even in the conservative case, the float could increase 6× in about 5 weeks. For context, most IPO lockup expirations are binary (all-at-once), not cascading. SpaceX's tiered structure means steady selling pressure, not a single event to price in.

### 2. Starlink Subscriber vs xAI Burn Rate

Starlink revenue: ~$13.1B/year from 10.3M subscribers
Revenue per subscriber: $1,272/year = $3.48/day = $0.145/hour

xAI burn rate: $2.5B/quarter = $10B/year = $27.4M/day = $1.14M/hour = $19,026/minute = $317/second

**Time for one subscriber's annual payment to be burned by xAI:**
$1,272 / $317 per second = **4.01 seconds**

(Updated with Q1 annualized rate rather than FY2025 rate)

**Starlink subscribers needed to fund xAI at 63% margin:**
xAI operating loss: $10B/year (annualized from Q1)
Starlink profit per subscriber: $1,272 × 0.63 = $801/year
Subscribers needed: $10B / $801 = **12.48 million subscribers**

They have 10.3 million. **Starlink cannot currently fund xAI's losses even at full margin.**

### 3. TAM Reality Check

SpaceX claims $28.5T TAM:
- Space: $370B (1.3% of TAM)
- Connectivity: $1.6T (5.6%)  
- AI: $26.5T (93%)

For context:
- Global GDP: ~$105T (2025)
- AI TAM = 25.2% of global GDP
- Total global IT spending: $5.4T (Gartner, 2026 estimate)
- AI TAM = 4.9× total global IT spending
- Total global cloud infrastructure market: ~$300B
- AI TAM = 88× current cloud market

Even the most aggressive AI forecasts (Goldman Sachs: $7T by 2030, McKinsey: $4.4T annually by 2030) are well below $26.5T. SpaceX's AI TAM assumes AI becomes larger than the entire global automotive industry ($3T), pharmaceutical industry ($1.5T), and energy industry ($8T) combined.

### 4. Debt Maturity vs Cash Burn

Total debt: $29.1B
Key maturity: $20B bridge loan (~Sep 2027)
Planned new bonds: $25B
Cash from IPO: $85.7B

Annual cash burn (annualized Q1): ~$17B/year in net losses
Plus capex for satellites, data centers, Starship: likely $5-10B+ additional

Simplistic cash runway: $85.7B / $17B = 5 years (losses only)
More realistic (losses + capex): $85.7B / $25B = 3.4 years

But: $20B bridge due ~Sep 2027 (14 months from now)
Must either refinance or repay from IPO proceeds
Investment-grade ratings help refinancing, but credit spreads are widening

### 5. Revenue Concentration Risk

Anthropic contract: $15B/year ($1.25B/month through May 2029)
Total SpaceX revenue: $18.7B (2025)
Anthropic alone = 80% of 2025 revenue

If Anthropic contract is included in go-forward revenue:
- Total revenue: ~$33.7B
- Anthropic: 45% of total
- Starlink: 39%
- Other: 16%

Single customer concentration at this level is extreme for a company valued at $1.59T.

## Strongest Counterargument

SpaceX has achieved things dismissed as impossible: landing orbital boosters, building a global satellite internet constellation in 5 years, and attracting $85.7B in an IPO when public markets were supposed to be closed to money-losing companies. Investment-grade credit ratings from all three agencies suggest the debt is manageable. Starlink subscriber growth (doubled in one year) could reach the 12.5M break-even within months. The Anthropic contract provides revenue visibility through 2029. And Musk's track record includes turning Tesla from a money-losing niche automaker into the most valuable car company. The lockup cascade is a known mechanism priced into the stock; early investors who've held for 20 years are unlikely to dump.

## Limitations

- S-1 financials were pre-IPO; no quarterly report as public company yet
- xAI burn rate extrapolation from Q1 may not reflect cost optimization
- Lockup cascade assumes early investors will sell; some may hold
- Anthropic contract terms beyond headline number not public
- No visibility into satellite/launch capex breakdown
- P/S ratio comparison limited because no direct public comp exists

## Related LITF articles
- stories/spacex-33-engine-reliability-trillion-dollar-math.html
- stories/space-launch-cost-wrights-law-monopoly-premium.html
- stories/reflect-orbital-space-mirror-solar-economics.html

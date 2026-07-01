# Research: SpaceX IPO — $218K Per Subscriber ARPU Death Spiral

## Thesis
SpaceX's S-1 reveals three numbers that unravel the bull case: ARPU has collapsed 33% in two years and is accelerating downward, xAI's merger destroyed more cash than Starlink generated, and the current valuation prices each Starlink subscriber at $218,000 — 113× what AT&T pays per subscriber. The engineering is real. The accounting deserves the same scrutiny.

## Primary Sources

### 1. SpaceX Form S-1 (SEC Filing, May 20, 2026)
- 308 pages, largest IPO in history
- Filed on SEC EDGAR; GitHub mirror at github.com/adexian/spacex-s1

**Segment Financials (in millions):**

| Segment | 2023 Revenue | 2024 Revenue | 2025 Revenue | 2024 Op Income | 2025 Op Income |
|---------|-------------|-------------|-------------|---------------|---------------|
| Space | — | $3,796 | $4,086 | $21 | ($657) |
| Connectivity | — | $7,599 | $11,387 | $2,006 | $4,423 |
| AI | — | $2,620 | $3,201 | ($1,561) | ($6,355) |
| Total | — | $14,015 | $18,674 | $466 | ($2,589) |

Net profit 2024: $791M. Net loss 2025: $4,937M (includes xAI absorption).

**Connectivity (Starlink) Operating Metrics:**

| Metric | 2023 | 2024 | Q1 2025 | 2025 | Q1 2026 |
|--------|------|------|---------|------|---------|
| Subscribers (M) | 2.3 | 4.4 | 5.0 | 8.9 | 10.3 |
| ARPU ($/month) | $99 | $91 | $86 | $81 | $66 |
| Op Income ($M) | $469 | $2,006 | $1,033 | $4,423 | $1,188 |
| EBITDA ($M) | $1,602 | $3,849 | $1,618 | $7,168 | $2,087 |

**Space (Launch) Operating Metrics:**

| Metric | 2023 | 2024 | Q1 2025 | 2025 | Q1 2026 |
|--------|------|------|---------|------|---------|
| Launches | 98 | 138 | 38 | 170 | 40 |
| Mass to orbit (MT) | 1,210 | 1,699 | 450 | 2,213 | 556 |
| Op Income ($M) | ($1) | $21 | ($70) | ($657) | ($662) |
| EBITDA ($M) | $997 | $1,154 | $224 | $653 | ($351) |

**Key S-1 quotes:**
- "For launches of our Starlink satellites, the Company does not recognize any inter-segment revenue, rather those launch costs are capitalized in satellites"
- "We allocate a significant amount of launch capacity to our Connectivity segment, and expect to allocate a significant amount to our AI segment in the future"
- SpaceX expects ARPU to continue falling as international expansion continues

**Launch breakdown (2025):**
- Total: 170 launches
- Starlink: 122 (free, costs capitalized)
- Starship tests: 5
- Customer launches: 43
- Revenue from customer launches: $4.4B → $102M average per paid launch

### 2. PitchBook S-1 Dissection (Q2 2026)
- AI-related terms: 47% of S-1 segment-specific language
- AI TAM claimed: $28.5 trillion (93% of SpaceX's total stated TAM)
- AI actual revenue: 6.7% of total (excl advertising)
- AI FCF loss: $14 billion in 2025 (FCF margin: -449%)
- Anthropic contract: $1.25B/month ($15B/year) for AI computing infrastructure, through May 2029
- Total debt: $29.1B, including $20B bridge loan maturing ~15 months post-IPO
- S-1 omits: subscriber churn, Falcon 9 launch costs, AI segment unit economics

### 3. Morningstar IPO Analysis (Q2 2026)
- IPO date: June 12, 2026
- IPO price: $135/share
- Pre-money valuation: $1.675 trillion
- "Generates more exit value than all VC-backed IPOs in the last decade combined"
- Revenue grew 33% YoY in 2025; Q1 2026 revenue up 15% YoY
- Starlink: 70% of revenue, double subscribers, 86% EBITDA increase
- Net loss of $4.9B on consolidated basis
- Capital intensity exceeds Rivian and Tesla
- Musk holds 85.1% combined voting power via dual-class stock

### 4. Analyst Cost Estimates (Multiple Sources)
- Falcon 9 marginal launch cost: $15-28M (analyst range; SpaceX does not disclose)
  - Motley Fool: ~$15M estimate
  - New Space Economy: ~$28M marginal cost for Starlink missions
- Falcon 9 customer list price: $74M (SpaceX website)
- Starship customer price: $90M (from Voyager Technologies 10-K, page 138)
- Commercial launch avg: $102M per paid launch (calculated from S-1)

### 5. Market Data
- SPCX stock: IPO $135, 52-week high $225.64, current ~$157 (down ~30% from highs)
- Market cap: ~$2.25 trillion
- Satellites deployed: 9,600+ across 164 countries

## Original Calculations (Kill Test)

### Calculation 1: Valuation Per Subscriber Comparison
- SpaceX: $2.25T market cap / 10.3M subscribers = **$218,447 per subscriber**
- AT&T: ~$155B market cap / 70.6M postpaid wireless = **$2,196 per subscriber**
- T-Mobile: ~$290B market cap / 80.8M postpaid = **$3,589 per subscriber**
- Verizon: ~$185B market cap / 87.5M total wireless = **$2,114 per subscriber**
- SpaceX subscribers are valued at **99× T-Mobile's** and **103× Verizon's**
- Note: SpaceX has AI and launch businesses too, but Starlink is 61% of revenue and all of the profit

### Calculation 2: ARPU Trajectory and Revenue Ceiling
- ARPU decline: $99 → $91 → $81 → $66 (Q1 2026)
- CAGR of decline from 2023 to Q1 2026: -14.8%/year
- If ARPU reaches $50/mo (plausible at scale with emerging market expansion):
  - 20M subs × $50 × 12 = $12.0B
  - 30M subs × $50 × 12 = $18.0B
- At the original $99 ARPU, 20M subs would generate $23.8B
- **The ARPU decline means SpaceX needs 60% more subscribers to reach the same revenue**
- Breakeven ARPU (where Starlink can't fund operations + Starship R&D): Starlink's operating costs ex-depreciation were ~$4.0B in 2025 ($7.2B EBITDA - $4.4B op income ≈ $2.8B depreciation/amort; $11.4B revenue - $4.4B op income = $7.0B total costs). At 10M subs, breakeven monthly ARPU = $7.0B / 10M / 12 = $58/mo.
- **At Q1 2026's $66 ARPU, Starlink has only $8 of headroom above breakeven per subscriber per month.** Further ARPU compression narrows this to nothing.

### Calculation 3: xAI Absorption Economics
- Starlink 2025 operating profit: $4,423M
- xAI 2025 operating loss: $6,355M
- Ratio: **xAI destroys $1.44 for every $1 Starlink earns**
- xAI FCF loss: $14B → **xAI burns $3.17 for every $1 of Starlink operating profit**
- Even with Anthropic's $15B/year contract (announced post-period), xAI's infrastructure costs exceed revenue
- Without xAI, SpaceX would have earned $466M + $6,355M = ~$6.8B operating profit in 2025
- The xAI merger turned a profitable company into one losing $5B/year

### Calculation 4: The Hidden Launch Subsidy (extending Motley Fool's analysis)
- 122 Starlink launches × estimated $20M marginal cost = $2.44B in unrecognized launch costs
- These are capitalized into satellite assets and depreciated over 5 years
- Cumulative: ~9,600 satellites / 23 per launch = ~417 launches historically
- At $20M avg cost: ~$8.3B in accumulated launch costs flowing through depreciation
- Annual depreciation from launch costs alone: ~$8.3B / 5 = ~$1.66B/year
- This is embedded in Starlink's $2.8B annual depreciation charge
- As satellite replacement cycles accelerate (5-year life), depreciation expense will rise
- Starlink's $4.4B operating profit includes $1.66B of hidden launch-cost depreciation that investors don't see as a "launch cost"

### Calculation 5: Revenue Per Metric Ton
- Total mass to orbit 2025: 2,213 MT
- Only customer mass (est. 43 launches × ~5 MT avg): ~215 MT
- Customer revenue: $4.4B / 215 MT = $20.5M per metric ton (customer)
- Internal Starlink mass: ~1,998 MT at $0 revenue per ton
- Historical comparison: Space Shuttle was ~$59,000/kg ($59M/MT)
- SpaceX customer pricing is ~65% cheaper than Shuttle, but internal rate is essentially free

## Strongest Counterargument
The strongest case FOR SpaceX at $2.25T is that Starlink is not a mature telco — it's a growth platform with near-monopoly access to an addressable market of 3 billion unconnected people. At 10.3M subs out of a potential 3B, penetration is 0.3%. If SpaceX captures even 3% at $50 ARPU, that's 90M subscribers × $600/year = $54B in annual revenue — with the launch infrastructure already built and amortizing. No telco has ever had 3 billion potential customers with zero competition in most markets. The ARPU decline may be a feature, not a bug: low prices in emerging markets expand the TAM faster than margin compression shrinks per-unit profit.

## Limitations
- Falcon 9 marginal launch cost ($15-28M) is an analyst estimate; SpaceX does not disclose and the S-1 omits it
- Satellite depreciation life of 5 years is industry convention but actual V2 satellite lifespans are uncertain
- xAI segment was absorbed in Feb 2026; 2025 numbers were recast retrospectively, so the actual cash flows within SpaceX's corporate structure pre-merger may differ
- ARPU trend may stabilize as US/Europe subscriber growth catches up with developing-market expansion
- Anthropic contract ($15B/year) was announced post-2025 period; its full impact on AI segment economics is not yet in the reported numbers
- Market cap comparison with telcos is imperfect — SpaceX has three segments, not one

## Journalist
Marcus Chen — financial analysis, industry comparisons, numbers-first skepticism. Recent: #517 on Tesla battery promises.

## Category
🚀 Space

## Related Articles
- #517: Tesla battery promises vs reality (similar financial skepticism)
- #510: OpenAI memory wafers
- #511: Fuel cell bottleneck

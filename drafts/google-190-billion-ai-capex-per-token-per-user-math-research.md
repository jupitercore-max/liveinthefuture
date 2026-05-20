# Research: Google's $190B AI Capex — Per-Token, Per-User, Per-Agent Math

## Source: Google I/O 2026 Keynote (May 19, 2026)
- Sundar Pichai transcript: https://blog.google/innovation-and-ai/sundar-pichai-io-2026/
- Capex: $180-$190B expected for 2026 (6x from $31B in 2022)
- Token volume: 3.2 quadrillion tokens/month (7x YoY from 480T; was 9.7T in May 2024)
- Gemini app users: 900M monthly active (doubled from 400M at I/O 2025)
- AI Overviews: 2.5B monthly active users
- AI Mode: 1B+ monthly active users
- Developers: 8.5M building monthly with Gemini models
- API processing: 19B tokens/minute
- Cloud customers: 375 processed >1T tokens each in past 12 months
- Internal usage: 3T tokens/day (doubled from 0.5T in March)
- Images generated: 50B with Nano Banana
- TPU 8t: 3x raw compute of previous gen
- TPU 8i: inference-optimized, 2x performance-per-watt
- Global TPU fleet: 1M+ TPUs
- Gemini 3.5 Flash: 4x faster output than other frontier models, <50% price of comparable models
- Gemini Spark: runs on dedicated VMs on Google Cloud, 24/7
- Google AI Ultra plan: $100/month (dropped from $250 to $200)

## Big Tech Capex Comparisons (2026)
- Microsoft: $190B
- Amazon: $200B  
- Meta: $125-$145B
- Apple: $14B
- Combined Big 4+: ~$725B
- Top 9 CSPs (TrendForce): $830B

## Original Calculations

### Per-User Infrastructure Cost
- $190B capex / 900M Gemini MAU = $211/user/year
- $190B / 2.5B AI Overview MAU = $76/user/year
- $190B / (Gemini 900M + overlap with 2.5B AI Overviews) — need to think about overlap
- Free tier users at $0/year: Google needs ad revenue + cloud revenue to justify $211/user infrastructure

### Per-Token Infrastructure Cost
- 3.2Q tokens/month = 38.4Q tokens/year = 3.84 × 10^16 tokens/year
- $190B / 3.84 × 10^16 = $4.95 × 10^-6 per token = ~$0.005 per 1000 tokens
- Gemini 3.5 Flash API pricing (est.): ~$0.075 per million input tokens, $0.30 per million output tokens
- So even at the capex fraction, the per-token infrastructure cost is significant

### Gemini Spark VM Economics
- GCP e2-standard-4 (4 vCPU, 16 GB): $97/month
- GCP e2-standard-8 (8 vCPU, 32 GB): $193/month
- Spark needs persistent VM + inference capacity
- Ultra plan: $100/month
- Previous pricing: $250/month → $200/month → now $100/month
- The price is dropping while compute requirements are increasing
- This is a clear loss-leader: VM cost alone likely exceeds subscription revenue

### Energy Math
- Research shows 0.001-0.01 Wh per token depending on model size, batch, hardware
- Google's TPUs are optimized for inference; assume ~0.001-0.003 Wh/token average
- At 0.001 Wh/token: 3.2Q × 0.001 = 3.2 TWh/month = 38.4 TWh/year
- At 0.003 Wh/token: 9.6 TWh/month = 115 TWh/year
- IEA: total global data center consumption ~1000 TWh by 2026
- Google alone could be 4-12% of all data center energy worldwide
- For context: 38 TWh/year ≈ Sri Lanka's entire annual electricity consumption
- 115 TWh/year ≈ Philippines' entire annual electricity consumption

### Token Growth Rate
- May 2024: 9.7T/month
- May 2025: 480T/month (49x growth)
- May 2026: 3.2Q/month (6.7x growth)
- Two-year compound: 330x growth
- At this rate, May 2027 would be ~20Q/month (but likely slowing)

### Revenue Coverage
- Google 2025 annual revenue: ~$350B (est.)
- $190B capex = 54% of revenue spent on infrastructure
- Google Cloud revenue ~$45B/year and growing 63%
- Cloud revenue alone doesn't cover capex
- Needs ads + cloud + subscriptions to justify

### Comparison Context
- NASA's entire 66-year budget (1958-2024): ~$810B adjusted for inflation
- $190B in one year > 23% of NASA's entire history
- US federal R&D budget 2026: ~$220B total
- Google alone spending 86% of total US federal R&D budget
- $725B combined Big Tech capex > GDP of Switzerland ($920B) - approaching it
- $725B > GDP of 170+ countries

## Key Tension / Thesis
Google is spending more on AI infrastructure in 2026 than the US government spends on all R&D. The per-user economics ($211/user/year in capex) and per-agent economics (Gemini Spark VMs at $100/month against likely $200+/month compute costs) only work if AI drives enough incremental revenue through ads, cloud, and subscriptions. This is the biggest infrastructure bet since the transcontinental railroad — and like the railroad, the question isn't whether the technology works, but whether the economics pencil out before the capital runs dry.

## Strongest Counterargument
Pichai's framing: this isn't speculative capex, it's contracted. "375 Cloud customers each processed >1T tokens" — enterprise demand is real. Cloud revenue grew 63% and capacity was the constraint, not demand. The capex is being deployed against visible demand curves, not speculative build-it-and-they-will-come.

## Limitations
- Token-to-energy conversion is estimated; Google doesn't disclose actual energy per token
- TPU efficiency numbers are Google's claims, not independently verified
- $190B capex includes all infrastructure, not just AI (some is for Search, YouTube, Cloud base)
- Revenue/user is an average — some users generate much more revenue than others via ads
- Gemini Spark VM specs unknown — cost estimate is based on comparable GCP instances

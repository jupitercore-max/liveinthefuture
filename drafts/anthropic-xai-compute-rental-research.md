# Research Notes: Anthropic-xAI Compute Rental Deal
## Article #363 — May 27, 2026

### Core Deal Facts (from SpaceX S-1 filing, May 20, 2026)
- Anthropic pays $1.25B/month through May 2029 for both Colossus I and Colossus II clusters
- 220,000+ Nvidia GPUs (H100, H200, GB200 mix)
- 300+ MW capacity
- Either party can terminate with 90 days' notice
- Early months (May-June) carry discounted rates during ramp-up
- Total potential revenue: $40B+ over contract life
- SpaceX says it has "sufficient capacity" for its own AI models and plans more such deals

### xAI Financials (from SpaceX S-1)
- xAI 2025 revenue: $3.2B
- xAI 2025 operating loss: $6.4B (up 308% from $1.56B in 2024)
- xAI Q1 2026 loss: $2.47B (up 163.9% YoY)
- SpaceX consolidated 2025 revenue: $18.67B
- SpaceX consolidated 2025 net loss: $4.94B (vs $791M profit in 2024)
- Starlink 2025 revenue: $11.4B with $4.4B operating income
- xAI capex: $7.7B in 2025; additional $2.8B equipment acquisition planned
- xAI reportedly used only ~11% of Colossus 1 before the lease

### Anthropic's Compute Portfolio
- $30B Azure commitment (Nov 2025, tied to $5B Microsoft investment)
- 3.5GW TPU deal with Google/Broadcom (Apr 2026, capacity online 2027)
- $1.25B/month xAI Colossus deal (May 2026)
- Anthropic revenue surpassed $30B annualized in 2026
- Nearing first profitable quarter
- Cursor also signed compute deal with SpaceX (April 2026)

### GPU Cloud Pricing Benchmarks (as of May 2026)
- AWS H100 on-demand: ~$3.50-4.00/hr per GPU
- GCP A3 on-demand: ~$3.68/hr
- Azure NDm H100: ~$3.67/hr
- SemiAnalysis market average (March 2026): $2.35/hr (up 40% from $1.70 in Oct 2025)
- Spot/preemptible: $0.85-2.35/hr
- Boutique providers (Lambda, RunPod, Thunder Compute): $1.49-2.99/hr
- Prices dropped 44% since peak 2025 but have been rising again since Oct 2025

### ORIGINAL CALCULATION: Implied Per-GPU-Hour Rate
- $1.25B/month ÷ 220,000 GPUs = $5,682/GPU/month
- $5,682 ÷ 730 hours/month (24 × 30.4) = **$7.78/GPU/hour**
- vs AWS on-demand H100: ~$3.92/hr → **1.99× premium**
- vs market average: ~$2.35/hr → **3.31× premium**
- vs spot pricing: ~$1.50/hr → **5.19× premium**

### Why the Premium May Be Justified
1. Dedicated (not multi-tenant) capacity — no noisy neighbors, no preemption
2. Supercomputing-grade interconnect (NVLink, InfiniBand fabric) — essential for training
3. Includes newer H200 and GB200 GPUs (higher market value than H100)
4. 300+ MW of guaranteed power in an electricity-constrained world
5. Scale: 220K GPUs assembled in one location — impossible to replicate from any cloud provider
6. No quotas, no scheduling delays, no API rate limits

### xAI ROI Calculation
- If total Colossus infra cost ~$10-12B (based on $7.7B capex + $2.8B planned)
- At $15B/year revenue, full infrastructure cost recovered in ~8-10 months
- Over 4-year contract: ~$40B revenue on ~$12B infrastructure = ~70% gross margin
- This is higher-margin than Starlink ($4.4B operating income on $11.4B revenue = 39%)

### Strongest Counterargument
The 90-day exit clause is the tell. Both parties expect prices to shift. As GB200 supply ramps and new data centers come online (Google, Microsoft, Meta all building), the market for dedicated compute may soften dramatically. Anthropic may be overpaying in a panic — its infrastructure was visibly strained, Claude Code usage was surging, and they needed capacity NOW. In 18 months, this deal could look like pandemic-era toilet paper hoarding: rational in the moment, embarrassing in hindsight.

### Limitations
- GPU mix breakdown (H100 vs H200 vs GB200 count) is not disclosed
- Early-month discount rates are not quantified
- The per-GPU-hour rate is a blended approximation — GB200s are worth more per hour
- SpaceX S-1 doesn't break down per-MW or per-rack pricing
- We use 220,000 as reported but exact at-full-ramp count may differ
- xAI utilization claims (~11% pre-deal) come from anonymous industry sources, not filings

### Sources
1. SpaceX S-1 filing (May 20, 2026)
2. Reuters: "Anthropic nears first quarterly profit, agrees to pay SpaceX $1.25 billion monthly"
3. TechCrunch: "xAI burned $6.4B last year..."
4. WSJ: "Anthropic Rents $1.25 Billion of SpaceX Data-Center Capacity Each Month"
5. WebProNews: "Anthropic's $1.25 Billion Monthly Check to xAI..."
6. SemiAnalysis: H100 rental prices (March 2026)
7. Anthropic.com: "Expanding our use of Google Cloud TPUs and Services"
8. TechCrunch: "Anthropic ups compute deal with Google and Broadcom"
9. LinkedIn analysis of SpaceX S-1 segment financials
10. Seeking Alpha: "Nvidia's H100 GPU rental prices surge nearly 40%"

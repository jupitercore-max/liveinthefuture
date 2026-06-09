# Research: SpaceX Cloud Compute Deals (Google + Anthropic = $26B/year)

## Kill Test
- **Is this news?** Yes. SpaceX S-1 filed May 20; Google deal disclosed June 5 in SEC filing amendment. IPO June 12.
- **Is anyone else covering this angle?** Basic deal coverage exists (Reuters, TechCrunch, WSJ, Bloomberg). No one has done the math on: (a) SpaceX as 4th-largest cloud provider by contract value, (b) the stranded asset story (11% MFU → rent out 89%), (c) Google buying 15% of its cloud capacity-equivalent from a rocket company, (d) per-GPU pricing vs. hyperscaler comparison.
- **Novel contribution?** Yes — original analysis of the cloud provider hierarchy math, the stranded asset economics, the per-GPU pricing comparison, and the infrastructure arbitrage thesis.
- **Does it overlap with existing LITF coverage?** We have SpaceX launch cost articles and AI capex articles but nothing on SpaceX as a cloud provider.

## Primary Sources

1. **SpaceX S-1/Amended Filing (SEC)** — Filed May 20, amended June 5, 2026
   - 2025 revenue: $18.7B (+33% YoY from $14.1B)
   - 2025 capex: $20.7B (exceeds revenue), $12.7B on AI
   - Q1 2026 capex: $10.1B, $7.7B on AI
   - GAAP net loss 2025: $4.94B; Q1 2026: $4.28B
   - Accumulated deficit: $41.3B
   - IPO: 555.6M shares at $135, raising $75B, valuation ~$1.77T, ticker SPCX
   - Expected first trading: June 12, 2026
   - Segment breakdown:
     - Starlink: $11.4B revenue (61%), $4.4B operating profit, 63% EBITDA margin
     - Space: $4.1B revenue, -$657M operating loss
     - xAI/AI: $3.2B revenue, -$6.4B operating loss
   - SpaceX poured $1.7B into xAI since Jan 2025
   - Power consumption: 0.3GW (Q1 2025) → 1.0GW (Q1 2026)
   - Sources: Reuters, WSJ, TechCrunch, ainvest.com, webpronews.com

2. **Google Cloud Service Agreement** — Disclosed in SpaceX SEC filing June 5, 2026
   - $920M/month, Oct 2026 – June 2029
   - ~110,000 Nvidia GPUs + CPUs, memory, components
   - Ramp-up period through Sept at reduced fee
   - GPU delivery deadline: Sept 30; failure → termination or pro-rata reduction
   - After Dec 31, either party may terminate with 90 days' notice
   - Google retains ownership of content, AI models, IP
   - Total value: ~$30B over contract term
   - Google statement: "short-term, timely agreement to ensure we have bridge capacity to meet surging customer demand for our agent platform, Gemini Enterprise"
   - Sources: Reuters, TechCrunch, Bloomberg, WSJ, PYMNTS

3. **Anthropic Colossus 1 Deal** — Announced May 2026
   - $1.25B/month through May 2029
   - Full Colossus 1 data center (Memphis, TN)
   - 220,000+ Nvidia GPUs (mix of H100, H200, GB200)
   - 300MW of compute capacity
   - Anthropic also interested in orbital data centers
   - Cancelable with 90 days' notice
   - Total value: ~$45B over contract term if fully executed
   - Sources: WSJ, Reuters, TechCrunch

4. **xAI Colossus 1 Utilization** — Internal xAI memo (reported by @crepesupreme, May 25, 2026)
   - ~11% Model FLOPs Utilization at Colossus 1
   - Industry production-grade: 35-45%
   - Mixed H100/H200/GB200 architecture couldn't parallelize Grok training
   - xAI moved training to Colossus 2
   - Source: wccftech.com (citing social media posts of internal memo)

5. **Cloud Provider Revenue Comparison** (Q4 2025, CRN)
   - AWS: $142B annual run rate, 24% YoY growth
   - Microsoft Intelligent Cloud: $131B ARR, 39% Azure growth
   - Google Cloud: $71B ARR, 50% growth Q4 2025
   - Global cloud infrastructure spending: $110.9B in Q4 2025 (Omdia)
   - Google Cloud Q1 2026 backlog: $460B

6. **Environmental/Infrastructure Risks** — Barron's
   - NAACP lawsuit (April 2026) over unpermitted gas turbines at Colossus, Memphis
   - Clean Air Act violation claims
   - SpaceX amended S-1 to warn about water constraints
   - Growth plans "increasingly constrained" by power and water

## Original Analysis

### SpaceX as Cloud Provider — Size in Context
- Combined Google + Anthropic compute contracts: $26B/year annualized
- That's 40% more than SpaceX's entire 2025 revenue ($18.7B)
- If SpaceX were a standalone cloud provider at $26B/year:
  - Would rank 4th globally (behind AWS $142B, Azure $131B, Google Cloud $71B)
  - Larger than Oracle Cloud (~$24B ARR), Alibaba Cloud (~$16B), IBM Cloud
  - Built in ~18 months (Colossus 1 construction began mid-2024)

### Per-GPU Pricing Comparison
- Google deal: $920M / 110K GPUs = $8,364/GPU/month
- Anthropic deal: $1.25B / 220K GPUs = $5,682/GPU/month
- AWS on-demand H100 (p5.48xlarge): ~$12.29/GPU-hr → ~$8,850/GPU/month
- AWS 1-year reserved: ~$3,500-5,300/GPU/month
- Anthropic pricing roughly at reserved levels; Google pricing near on-demand

### The Stranded Asset Story
- xAI spent $12.7B on AI infrastructure in 2025
- Built Colossus 1 as world's largest GPU cluster (220K+ GPUs)
- Mixed architecture (H100/H200/GB200) prevented effective parallelization
- Only achieved 11% Model FLOPs Utilization (vs. 35-45% industry standard)
- xAI moved training to Colossus 2
- SpaceX now monetizing Colossus 1 as a cloud rental → turning failed training infra into revenue

### Google's Capacity Gap
- Google spent $190B on AI capex guidance for 2026 (per our earlier LITF article)
- Has $460B in cloud contracts (backlog)
- Yet still needs to rent 110K GPUs from SpaceX
- Implication: Even $190B/year capex can't keep pace with demand
- Google Cloud grew 50% YoY in Q4 2025 — demand outpacing supply

## Strongest Counterargument
SpaceX may be making a genius infrastructure arbitrage play, not failing at AI. Build massive GPU clusters, use them for training bursts, then rent idle capacity at cloud rates. The xAI training → Colossus 2 migration might be planned, not reactive. If SpaceX earns $26B/year from rentals while its own models train on dedicated hardware, the combined value proposition is stronger than any pure-play cloud provider.

## Limitations
- 11% MFU figure from unverified social media post citing internal memo; not confirmed by SpaceX/xAI
- We don't know the exact GPU mix or generation for the Google deal (could be different facility from Colossus 1)
- Early termination provisions (90 days' notice after Dec 31) mean $30B and $45B totals assume full contract execution
- No public data on actual Colossus 1 vs Colossus 2 specifications or capacity allocation
- SpaceX S-1 numbers are pre-IPO and subject to revision

## Journalist Assignment
**Lena Okafor** — Space Economy
- Previously covered SpaceX launch costs, Starship economics
- Perfect intersection of space industry and economic analysis

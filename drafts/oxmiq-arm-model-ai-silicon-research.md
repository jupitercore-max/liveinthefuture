# Research: Oxmiq and the ARM Model for AI Silicon

## Topic
Raja Koduri's Oxmiq Labs just raised $35M Series A (total $60M) to build licensable GPU/tensor IP — the "ARM of AI chips." The story: custom AI silicon costs $300M–$1B to design, locking out all but ~7 hyperscalers. Oxmiq's OxCore architecture could collapse that barrier the same way ARM collapsed the smartphone CPU design barrier. Original analysis: the "design cost gap" — how many companies want custom AI silicon, how few can afford it, and what ARM's financial trajectory implies for the AI chip licensing opportunity.

## Journalist
Tomás Reyes — Quantum & Computing beat

## Kicker
💻 Quantum

## Primary Sources

### 1. Reuters — Oxmiq $35M Series A (July 2, 2026)
- Oxmiq raised $35M Series A, $60M total
- Led by Fundomo and Samsung Catalyst Fund
- Other investors: MediaTek, Pegatron Venture Capital, AM Intelligence Labs, CDIB-TEN, Darwin Ventures, Morgan Creek Digital
- CEO Raja Koduri: former Intel chief architect, ex-AMD, ex-Apple
- Campbell, California
- Key product: OxCore — licensable GPU architecture that combines GPU + CPU + tensor engine into single IP block
- Plans to develop computing fabric with chiplets + memory in single package
- Will also enter custom chip market (competing with Broadcom, Marvell, MediaTek)
- CUDA compatibility tool: runs CUDA code on non-Nvidia hardware "without code modification or recompilation"
- "We would want to be the Arm of this next era" — Koduri
- "Developing a cutting-edge AI chip can cost hundreds of millions of dollars and take several years" — Reuters

### 2. SiliconANGLE — Oxmiq Labs deeper coverage
- Series A was specifically "early-stage A funding"
- OxCore makes it "easier for semiconductor firms and AI systems builders to design custom silicon without a full chip program"
- "A licensable core with an open architecture means design teams everywhere can build the custom AI silicon their work needs" — Koduri
- Fundomo partner Rajeev Surati: "Most compute IP makes the customer bend their memory, packaging, and foundry around the chip. Oxmiq does the opposite, and that flips a cost center into leverage."

### 3. Reuters — Oxmiq seed round (Aug 5, 2025)
- Original $20M seed raised
- GPU technology "capable of scaling from a single core for physical AI applications such as robotics, to thousands of cores that would be useful in a cloud computing company's data center"
- "Software-first approach" — built CUDA translation tool first
- Chose IP licensing over complete chip design to "avoid the high costs"
- "A cutting-edge chip can cost more than $500 million to design" — Reuters

### 4. ARM Holdings Q4 FY26 Earnings (SEC filing + DataCenterDynamics)
- FY26 total revenue: $4.92B (record, 3rd consecutive year of 20%+ growth)
- Q4 FY26: $1.49B total ($819M licensing + $671M royalty)
- FY26 licensing revenue: $2.31B (+25% YoY)
- FY26 royalty revenue: $2.61B (+21% YoY)
- GAAP gross margin: 97.9%
- 56 Arm Total Access licenses, 329 Flexible Access customers
- Data center royalty more than doubled YoY
- Arm share of hyperscaler CPU compute: 50%
- Arm AGI CPU (first-ever own chip, co-designed with Meta): $2B+ demand across FY27-FY28
- Market cap: ~$335B
- Armv9 and data center chips command higher royalty rates per chip

### 5. Counterpoint Research / Hashrate Index — Custom AI ASIC Landscape (mid-2026)
- Active hyperscaler custom chip programs:
  - Google TPU v7 Ironwood (Broadcom partner, through 2031) — 65-67% inference cost savings
  - AWS Trainium2 / Inferentia2 (Marvell partner) — 500K+ deployed
  - Microsoft Maia 200 (Marvell partner) — 70% of Azure AI still on Nvidia
  - Meta MTIA v2 (internal) — aim 100% internal inference by 2027
  - OpenAI (pre-production, Broadcom partner) — Q1 2027 target, $8-10B lifetime revenue
  - Anthropic — partnered with Google + Amazon, 5M+ custom chips by 2027
  - Apple — newly disclosed as Broadcom customer (2026)
- Broadcom confirmed XPU customers: Google, Meta, OpenAI, Anthropic, Apple = 6 major customers
- Broadcom AI semi revenue: $8.4B (Q1 FY2026), 70%+ market share, $73B backlog
- Broadcom CEO Hock Tan: $100B FY2027 AI chip revenue target
- Marvell: 20-25% share, anchored by AWS + Microsoft
- ASIC shipments to triple by 2027 vs 2024; cross 15M in 2028 (surpassing GPU shipments)
- 40M+ ASIC chips cumulatively 2024-2028 (top 10 hyperscalers combined)
- TPU v7 TCO: ~44% lower than equivalent Nvidia Blackwell cluster
- Google trained Gemini 3 entirely on TPUs
- MFU on custom silicon: 20-30% higher than on Nvidia GPUs (stripped of unnecessary graphics transistors)

### 6. Zacks — ARM Licensing Business Analysis (July 3, 2026)
- Q4 FY26 licensing revenue rose 29% YoY to $819M
- "Several large licensing contracts" signed during the quarter
- Royalty revenue: $671M, +11% YoY
- "Semiconductor manufacturers increasingly develop custom chips for AI, cloud infrastructure, smartphones and other advanced computing applications"
- ARM technology = "critical foundation for next-generation processor development"

### 7. Counterpoint Research — ASIC Shipment Forecast
- "In-house AI Server Compute ASIC design growth is validating the in-house custom XPU era"
- Global AI Server Compute ASIC shipments to cross 15M in 2028
- Google projected to retain shipment volume lead through 2027

## Original Calculation: The AI Silicon Design Cost Gap

### The problem: custom AI chip design is prohibitively expensive
- Full custom AI chip design: $300M–$1B+ (Reuters: "hundreds of millions"; other estimates up to $1B)
- Design timeline: 3-5 years from concept to production silicon
- Only ~7 entities have active custom AI chip programs: Google, Amazon, Microsoft, Meta, OpenAI, Anthropic, Apple
- These 7 represent ~$2.5 trillion in combined market cap and $670B in combined 2026 AI capex

### The middle market is locked out
- Counterpoint: there are ~50 companies deploying AI at scale (model labs, cloud providers, enterprise AI)
- Maybe ~200 companies with significant inference needs (SaaS companies, robotics, autonomous vehicles, telecom)
- Only 7 have custom silicon. The other ~193 are on Nvidia GPUs at 75% gross margins.
- If each of the 7 custom programs cost an average $500M, that's $3.5B in design costs alone
- Companies locked out of custom silicon are collectively spending ~$150B+ on Nvidia GPUs per year at 75% margins. A licensable alternative that saves even 20% on inference costs = $30B/year opportunity

### ARM's financial model as a template
- ARM FY26: $4.92B revenue on a global smartphone silicon market of ~$140B
- ARM captures ~3.5% of the total silicon value it enables
- ARM royalty per chip: varies wildly, but FY26 royalty revenue of $2.61B on estimated 30B+ chips shipped = ~$0.09/chip average
- BUT: data center and premium chips have much higher per-chip royalties (Armv9 is 2-3x older architecture)
- For AI accelerators at $10K-$40K ASP, even a 1% royalty = $100-$400 per chip
- At ARM's 3.5% value-capture rate applied to a $100B AI accelerator market = $3.5B potential
- By 2030, AI accelerator TAM estimated at $300-400B → potential licensing opportunity: $10-14B

### The Nvidia moat calculation
- Nvidia's CUDA ecosystem = ~4 million developers, 15+ years of accumulated software
- Nvidia data center GPU gross margins: ~73.5%
- If Oxmiq's CUDA translation tool works, it eliminates the primary switching cost
- But: CUDA compatibility claims have been made before (AMD ROCm, Intel OneAPI) — none have achieved full parity
- The test: can Oxmiq's translation run production LLM training without modification? That's the billion-dollar question.

### Design cost reduction math
- Full custom chip design: $500M minimum (Reuters)
- Licensable IP approach (Oxmiq model): ~$5-10M license + per-chip royalty
- Breakeven point for full custom: $500M / $30K per chip ASP = ~16,700 chips minimum to amortize design
- Breakeven for licensable IP: $10M / $30K = ~333 chips
- That's a 50x reduction in minimum viable scale
- This opens custom AI silicon to robotics companies ($50-100M revenue), autonomous vehicle firms, telecom, edge AI, and smaller cloud providers

## Strongest Counterargument
ARM succeeded because mobile processors were a volume game — billions of smartphones shipped per year. AI accelerators are a low-volume, high-ASP game. There may never be enough "middle market" buyers to justify a licensing model. If 7 hyperscalers consume 80%+ of all AI silicon, and they all build their own, the addressable market for licensable AI chip IP may be too small to sustain an ARM-like business. Oxmiq's $60M is a rounding error against Broadcom's $73B backlog.

## Limitations
- Oxmiq has no shipping product yet — OxCore is still being developed
- CUDA compatibility claims are unverified at production scale
- $60M total funding is tiny in a market where single chip programs cost $500M+
- Raja Koduri's Intel track record is mixed — Arc GPUs underperformed
- ARM analogy has structural limits — AI chips are fundamentally different from mobile CPUs

## Key Figures to Include in Article
- $60M raised by Oxmiq ($20M seed + $35M Series A)
- $500M+ cost of designing a cutting-edge AI chip (Reuters)
- 7 hyperscalers with active custom AI chip programs
- 15M AI ASICs projected by 2028 (Counterpoint), surpassing GPU shipments
- $4.92B ARM FY26 revenue (3.5% value capture)
- 70%+ Broadcom market share in custom AI chip design
- $73B Broadcom AI chip backlog
- 44% TCO savings on TPU v7 vs Nvidia Blackwell
- 50x reduction in minimum viable scale (licensable vs full custom)
- ~$335B ARM market cap — built on $0.09/chip average royalties

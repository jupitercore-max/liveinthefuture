# Research: AMD 34x Token Throughput Claim — Footnote Decomposition

## Sources
1. AMD AAI 2026 Press Release (GlobeNewswire, July 23, 2026)
   - https://www.globenewswire.com/news-release/2026/07/23/3332491/0/en/AAI-2026-AMD-Delivers-Full-Stack-Compute-for-the-Agentic-AI-Era.html
2. StockTitan analysis with full footnotes
   - https://www.stocktitan.net/news/AMD/aai-2026-amd-delivers-full-stack-compute-for-the-agentic-ai-2yijj2n15pd7.html
3. AMD Inference Performance on AMD GPUs (official technical article)
   - https://www.amd.com/en/developer/resources/technical-articles/2026/inference-performance-on-amd-gpus.html
4. Reuters South Korea AI Summit (July 25, 2026)
   - https://www.reuters.com/business/media-telecom/south-korea-president-lee-looking-open-new-era-ai-with-global-tech-companies-2026-07-25/

## Key Claims & Footnotes

### Claim 1: MI455X delivers 34x higher token throughput vs MI355X
**Footnote 7:** "Based on measurements and calculations by AMD Performance Labs in July 2026, for the AMD Instinct MI455X GPU to determine measured token throughput at high, medium and low interactivity points run on **Deepseek V4 Flash with FP4 serving** compared to AMD Instinct MI355X GPU."
- KEY: The benchmark uses **FP4 precision** on MI455X vs MI355X
- MI355X (CDNA 4) had FP8 as its lowest standard inference precision
- FP4 halves the bits per weight → roughly 2x more tokens from the same memory bandwidth
- DeepSeek V4 Flash is a Mixture-of-Experts model — MoE models are particularly sensitive to memory bandwidth
- CDNA 5 architecture also brings new compute units, higher clocks, more memory bandwidth (likely HBM4)
- The "34x" conflates precision format change with architecture improvement

### Claim 2: AMD Helios delivers 30% more inference tokens/dollar vs competition
**Footnote 1:** "tokens-per-dollar performance was calculated using the **Kimi K2 Thinking workload** (32K input / 8K output) on an AMD Helios rackscale solution compared to an **NVIDIA Vera Rubin NVL72 rack**. Results reflect estimated aggregate throughput across low, medium, and high-interactivity operating points and hourly pricing projection of system GPUs based on market conditions."
- Direct comparison to Nvidia Vera Rubin NVL72 — Nvidia's latest
- Based on "hourly pricing projection" — AMD is estimating what Nvidia will charge
- 30% advantage is real but model-specific (Kimi K2 Thinking, MoE model)

### Claim 3: MI350P delivers 4.2x more tokens/s/$ than competition
**Footnote 8:** Compares MI350P vs **RTX PRO 6000** (Blackwell workstation GPU) and H200 NVL
- MI350P server priced at $327,238
- RTX PRO 6000 server priced at $265,928
- Test: Llama 3.3 70B Instruct FP8
- NOTE: RTX PRO 6000 is a workstation card, not a data center accelerator
- More meaningful comparison would be vs A100/H100/B200

## The 2 GW Anthropic Deal
- Anthropic deploying "up to 2 gigawatts" of MI455X in Helios racks
- Each Helios rack: 72 MI455X GPUs + 18 EPYC Venice CPUs
- Estimated rack power: MI455X TDP likely ~700W each → 72 × 700W = 50.4 kW GPU alone
  Plus CPUs, networking, cooling overhead → ~100-130 kW per rack (industry standard for dense GPU racks)
  Some estimates: Nvidia GB200 NVL72 consumes ~120 kW per rack
- 2,000,000 kW / ~120 kW per rack = ~16,667 Helios racks
- ~16,667 × 72 GPUs = ~1.2 million MI455X GPUs
- GPU pricing: MI300X was ~$10-15K, MI455X likely $20-30K
  At $25K each → 1.2M × $25K = ~$30 billion in GPU procurement alone
- Anthropic's annualized revenue: >$47B (from May valuation context)
- This is compute infrastructure at sovereign scale

## Other Key Partners
- OpenAI: Bringing Helios online Q4 2026, scaling through 2027
- Meta: Validating EPYC + Helios in labs, co-designing for gigawatt-scale
- Cerebras: Collaboration on ultra-low-latency inference

## Decomposition Analysis (Original)

The 34x number is real but misleading. Here's the decomposition:

### Factor 1: Precision Format (FP4 vs FP8)
- FP4 stores each weight in 4 bits vs FP8's 8 bits
- Memory bandwidth is THE bottleneck for inference (especially decode phase)
- Halving weight size → ~2x more weights loaded per cycle → ~2x token throughput
- This is a precision format innovation, not purely architecture
- Contribution: ~2x

### Factor 2: Architecture (CDNA 5 vs CDNA 4)
- New compute units, higher clock speeds
- Improved shader/tensor core efficiency
- Better instruction-level parallelism
- Typical generational GPU improvement: 1.5-2.5x
- Contribution: ~2-2.5x

### Factor 3: Memory Bandwidth (likely HBM4 vs HBM3E)
- MI355X: 8 stacks HBM3E, ~6.4 TB/s bandwidth
- MI455X: likely HBM4 with higher bandwidth, possibly 12+ stacks
- If 10-12 TB/s → 1.5-2x memory bandwidth improvement
- Critical for MoE models where sparse activation means most time is memory-bound
- Contribution: ~1.5-2x

### Factor 4: Die Size / CU Count
- Larger chip = more compute units
- MI355X: 304 CUs, 1152 AI accelerators
- MI455X: likely 50-100% more CUs
- Contribution: ~1.5x

### Factor 5: MoE Model Selection (DeepSeek V4 Flash)
- MoE models activate only a fraction of parameters per token
- This makes them extremely memory-bandwidth-bound
- FP4 benefits are amplified on MoE models vs dense models
- A dense model (like Llama 70B) would show a smaller multiplier

### Combined: 2x (FP4) × 2x (arch) × 1.8x (memory) × 1.5x (die) ≈ 10.8x
The 34x implies additional software/compiler optimization benefits (~3x) or the MI355X baseline includes overhead that the MI455X eliminates.

### The Real Metric: 30% vs Nvidia Vera Rubin
This is the honest comparison. Same rack form factor, same competitor (Nvidia), same workload class. 30% more tokens/dollar is significant but far from 34x. That 30% likely maps to a real cost advantage at scale.

## AMD Market Context
- AMD market cap: $900.63B (as of AAI event)
- Stock declined 2.29% on announcement day (market wanted more)
- TAM projection: ~$2T by 2030
- Nvidia controls ~74% of AI chip market (per The Information)
- AMD roadmap: MI500 (2027), MI600 (2028)

## Article Kill Test
✅ Original calculation: Decomposing the 34x into component factors
✅ Nobody has done this decomposition publicly — the 34x number is being reported uncritically
✅ The FP4 vs FP8 precision shift is the hidden variable nobody is discussing
✅ The 2 GW → rack count → GPU count → dollar value math is novel
✅ Compares AMD's own 34x claim to their honest 30% claim

## Journalist
Kai Nakamura — Semiconductors & Computing beat (just published the Intel foundry piece, but this is AMD, different company)
Alternative: Tomás Reyes — has done Google Frozen v2, Intel EUV pieces

## Headline Options
1. "AMD Says Its New GPU Is 34× Faster. Read Footnote 7."
2. "AMD's 34× Token Throughput Claim Has a Four-Letter Asterisk: FP4."
3. "Anthropic Just Ordered 2 Gigawatts of AMD GPUs. Here's What That Buys."

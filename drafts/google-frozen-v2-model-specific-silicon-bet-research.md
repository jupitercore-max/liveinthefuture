# Research: Google's "Frozen v2" — Hardwiring Gemini Into Silicon

## The News
Google is developing a custom AI chip codenamed "Frozen v2" that permanently etches parts of Gemini's model architecture directly into silicon, rather than running on general-purpose TPUs. The name "Frozen" literally means the model is frozen into the hardware. Reported by The Information on July 20, 2026.

Key claims:
- 6-10x more efficient than Google's latest TPUs (tokens served per unit of power)
- Deploy as early as 2028
- Complementary to TPUs, not a replacement — lower production volumes
- Engineers still finalizing how much model architecture to hardwire
- Model weights can still be updated; it's the architecture (attention patterns, data flow) that gets frozen
- Addresses Google's AI compute capacity crunch that has forced Google Cloud to decline customer deals

Source: The Information (Jul 20, 2026), Reuters, Alphabet stock rose 3% on the news.

## Context: The Inference-Era Shift

The AI industry is pivoting from training-dominated to inference-dominated spending:

- **OpenAI internal 2024 figures:** inference costs run 15-118x more expensive than training, depending on model (source: hashrateindex.com)
- **Google's disclosure:** 0.24 Wh per median Gemini query; TPU chips account for 58% (0.139 Wh), the rest is CPUs, memory, cooling, backup (source: Google via MIT Technology Review, Aug 2025)
- **Google TPU v5e:** ~10.66 Tokens/J vs NVIDIA H100 at ~6.00 Tokens/J (78% more efficient, ±15-25% uncertainty) per Springer systematic review (Jan 2019–Mar 2026, 62 studies)

Everyone is building inference ASICs now:
- **OpenAI + Broadcom: "Jalapeño"** — unveiled June 24, 2026, reticle-sized inference ASIC with HBM. First custom chip for OpenAI.
- **Meta:** In-house AI chip manufacturing starting September 2026, co-designed with Broadcom, manufactured by TSMC. Planning 4 generations.
- **Amazon:** Trainium and Inferentia shipping since 2018
- **Microsoft:** Maia chip
- **Google:** TPU lineup (8 generations), now adding Frozen v2 as model-specific complement

## Original Analysis: The Efficiency Math

### Per-Query Energy Savings
- Current: 0.24 Wh per median Gemini query
- TPU share (58%): 0.139 Wh
- Non-TPU overhead (42%): 0.101 Wh (CPU, memory, cooling, backup — unchanged)
- At 6x efficiency: TPU portion → 0.023 Wh → total 0.124 Wh → **48% reduction**
- At 10x efficiency: TPU portion → 0.014 Wh → total 0.115 Wh → **52% reduction**

### Tokens/J Projection
- Current TPU v5e: ~10.66 Tokens/J (best available data)
- Frozen v2 at 6x: ~64 Tokens/J
- Frozen v2 at 10x: ~107 Tokens/J
- For comparison, NVIDIA H100: ~6.00 Tokens/J
- If these numbers hold, Frozen v2 would be **11-18x more efficient than an H100** per joule

### Scale Impact
- Google handles billions of Gemini queries daily
- Assuming 2B queries/day at 0.24 Wh = 480 MWh/day = 175 GWh/year
- At 48-52% savings = 84-91 GWh/year saved
- That's equivalent to powering ~7,800-8,400 US homes (10.8 MWh/year avg)
- Or: roughly $8.4M-$9.1M/year in electricity savings at $0.10/kWh (data center rates)
- But the real savings are in compute density: same power envelope, 6-10x more queries

## The "Frozen" Paradox — Original Analysis

### The Bitcoin ASIC Parallel
Bitcoin mining went through the exact same arc:
1. CPUs (2009) → GPUs (2010) → FPGAs (2011) → ASICs (2013)
2. ASICs were 1000x more efficient than GPUs for SHA-256
3. But SHA-256 never changes. The algorithm is literally written into the Bitcoin protocol.
4. Bitcoin ASICs are still the dominant mining hardware in 2026

Google's Frozen v2 is making the same bet — but with a critical difference:
- SHA-256 is immutable. Gemini's architecture is not.
- Google is betting that transformer attention architectures stabilize enough to justify 2+ years of silicon development
- If Gemini's architecture changes fundamentally before 2028 deployment (or shortly after), Frozen v2 becomes expensive silicon waste

### What "Frozen" Actually Means
- NOT freezing the model weights — those can still be updated
- Freezing the computational graph: the attention patterns, data flow paths, memory access patterns
- Think of it as: building a highway system optimized for one specific traffic pattern vs. a flexible road grid
- If the traffic pattern changes (new architecture), the highways go to the wrong places

### The Stability Bet
This is where the original analysis matters. Google is implicitly betting that:
1. Transformer attention mechanisms will remain the dominant architecture through at least 2030
2. Gemini's specific variant of transformer architecture won't change fundamentally
3. The efficiency gains (6-10x) are large enough to justify the inflexibility risk

Historical data point: The transformer architecture has remained dominant since "Attention Is All You Need" (2017) — 9 years. Major competing architectures (Mamba/SSMs, RWKV) exist but haven't displaced transformers for frontier models. The stability bet may be reasonable.

But: Google is the ONLY company making this model-specific bet. Everyone else (OpenAI's Jalapeño, Meta's in-house chip, Amazon's Trainium) is building inference-optimized ASICs that are workload-general (any large model inference) rather than model-specific. Google is going one step further.

## Counterargument (Strongest Case Against)
The strongest case against Frozen v2 is that AI model architectures are still evolving rapidly. Mixture-of-experts, state-space models, test-time compute scaling, and architectural innovations we can't predict may fundamentally change how inference works. A chip designed around 2026-era Gemini attention patterns could be obsolete by 2029 — meaning Google would have spent 2+ years developing a chip that serves for only 1-2 years before being replaced.

The counterpoint: Google isn't replacing TPUs with Frozen v2 — it's adding a specialized complement. The TPUs handle flexible workloads; Frozen v2 handles the highest-volume Gemini inference at dramatically lower cost. Even if the architecture evolves, if Frozen v2 serves profitably for 2-3 years, the ROI math works.

## Limitations
- Efficiency claims come from The Information citing "people familiar with the matter," not from Google directly
- Google hasn't confirmed the chip's existence
- The 6-10x efficiency claim is relative to "current TPU" — which generation isn't specified (could be v5e or the newer Ironwood/8th gen)
- We don't know what percentage of Gemini queries Frozen v2 would handle vs. TPUs
- The energy savings calculation uses Google's 2025 disclosure of 0.24 Wh/query, which may have improved with newer TPUs
- Token/J benchmarks from the Springer review have ±15-25% uncertainty

## Sources
1. The Information (Jul 20, 2026) — original Frozen v2 report
2. Reuters (Jul 20, 2026) — Frozen v2 coverage with Google spokesperson response
3. Google/MIT Technology Review (Aug 2025) — 0.24 Wh per Gemini query disclosure
4. Springer Nature (Jun 2026) — systematic review of GPU/TPU/NPU efficiency, 62 studies
5. hashrateindex.com (Apr 2026) — AI ASIC guide, OpenAI inference cost data
6. dev.to (Jun 2026) — OpenAI Jalapeño ASIC analysis
7. OilPrice.com — data center energy overview, hyperscaler ASIC strategies
8. Motley Fool (Jul 20, 2026) — Meta in-house chip manufacturing September 2026

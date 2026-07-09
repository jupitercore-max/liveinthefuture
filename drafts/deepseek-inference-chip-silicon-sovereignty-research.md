# Research: DeepSeek Inference Chip — Silicon Sovereignty Economics

## Topic
DeepSeek is developing its own inference chip (Reuters, July 8 2026). Every major AI lab globally is now building custom inference silicon. This article calculates the economics driving the trend and what DeepSeek's chip means for the global AI hardware bifurcation.

## Primary Sources

### 1. Reuters — "China's DeepSeek developing its own AI chip" (July 8, 2026)
- DeepSeek developing inference chip (not training)
- Early stage: reaching out to chip-design, foundry, memory companies
- Effort began ~1 year ago
- First embrace of outside capital: $7B maiden round at $52-59B valuation
- Founder Liang Wenfeng committed $2.96B of own money
- Tencent ~$1.48B, CATL ~$740M
- China government National AI Industry Investment Fund also invested (only investor with voting rights)
- DeepSeek hired chip-design engineers in recent months

### 2. DeepSeek V4 Pricing & Architecture (April 2026)
- V4-Pro: $1.74/M input, $3.48/M output, 1M context
- V4-Flash: $0.14/M input, $0.28/M output, 1M context
- GPT-4 Turbo: $10/M input, $30/M output, 128K context
- Claude Opus 4.6: $15/M input, $75/M output, 200K context
- Engram Architecture: separates static knowledge (CPU RAM) from dynamic reasoning (GPU)
- MoE: 1.6T total parameters, ~37B active per forward pass
- DSA (Sparse Attention): O(n²) → near-linear, 60-70% memory bandwidth reduction
- Running on Huawei Ascend 910B at ~22 tokens/sec/watt vs ~18 tokens/sec/W on H100 under FP8

### 3. Custom Silicon Trend — Every Major AI Lab
| Company | Chip | Partner/Fab | Focus | Scale |
|---------|------|-------------|-------|-------|
| Google | TPU v6 (Trillium) | Internal / TSMC | Training + Inference | 6th generation |
| Amazon | Trainium3 | Annapurna Labs / TSMC | Training + Inference | "tens of billions/yr savings" |
| Meta | MTIA v2 | Internal / TSMC | Inference | buying Google TPUs too |
| Microsoft | Maia 100 | Internal / TSMC | Inference | Cobalt CPU companion |
| OpenAI | unnamed XPU | Broadcom / TSMC | Inference | $10B deal, 10 GW of compute |
| DeepSeek | unnamed | Internal / SMIC? | Inference | part of $7B round |

### 4. SMIC Manufacturing Constraints
- SMIC N+2 (7nm) confirmed in Huawei Mate 60 Pro (Kirin 9000s)
- Made without EUV lithography (DUV multi-patterning)
- Yield estimates: ~15% for complex SoCs (per EDN/SemiAnalysis)
- Cost per chip: ~10x market price vs TSMC 7nm equivalent
- Cannot go below 7nm without EUV technology (blocked by US export controls)
- Simpler inference ASIC designs could achieve higher yields than complex SoCs

### 5. Nvidia Financial Data (for context)
- FY2026 data center revenue: ~$130B+ estimated
- Inference share of AI compute: 60-80% of deployed workloads
- China revenue near zero after export controls
- Nvidia CEO Jensen Huang: "disappointed" by China restrictions

### 6. China AI Chip Market
- Total domestic AI chip market: ~$50B
- Huawei share: ~50% ($25B)
- Competitors gaining: Alibaba (Hanguang 800), Baidu (Kunlun 3), now DeepSeek
- SMIC + Hua Hong shares surged after DeepSeek V4 announcement

## Original Calculation: The Custom Silicon Break-Even

### Calculation 1: Industry-Wide Inference Silicon Displacement
- Global AI accelerator market 2026: ~$200B (Nvidia dominates at ~80%)
- Inference share: 60% = $120B in inference GPU revenue
- Companies with custom inference chip programs: Google, Amazon, Meta, Microsoft, OpenAI, DeepSeek, Alibaba, Baidu — collectively represent ~60% of global inference demand
- Each custom chip saves 30-50% vs Nvidia GPU costs (OpenAI estimates 30%, Amazon says "tens of billions/year")
- If 40% of inference compute moves to custom silicon by 2028: $120B × 0.4 × 0.35 average savings = $16.8B/year in Nvidia revenue at risk
- This is ~13% of Nvidia's projected 2028 revenue — not existential, but meaningful margin pressure

### Calculation 2: DeepSeek's Inference Cost Structure
- V4-Flash at $0.28/M output tokens on Huawei Ascend 910B
- Ascend 910B: ~22 tokens/sec/watt, ~280W TDP, ~6,160 tokens/sec per chip
- At $0.28/M output tokens: revenue per chip per hour = 6,160 × 3,600 / 1,000,000 × $0.28 = $6.21/hour
- Annualized per chip: $6.21 × 8,760 hours × 0.85 utilization = ~$46,250/year/chip
- Ascend 910B cost: estimated $15,000-$20,000
- Power + cooling: 280W × 8,760 hours × $0.08/kWh = ~$196/year
- 3-year amortization of chip: ~$5,667/year
- Gross margin on inference at current pricing: ~$40,000/year/chip — very healthy
- BUT: A custom ASIC could improve perf/watt by 2-3x (inference-optimized vs general-purpose)
- At 3x efficiency: same revenue, 1/3 the chips needed → or same chips, 3x the throughput → prices could drop to $0.09/M
- At $0.09/M output tokens, DeepSeek would undercut V4-Flash by 68% — making inference almost free

### Calculation 3: SMIC Yield Penalty vs Custom ASIC Simplicity
- SMIC N+2 7nm yield for complex SoCs (Kirin 9000s): ~15%
- TSMC 7nm yield for equivalent: ~90%
- Yield gap: 6x cost penalty per good die
- BUT: Inference ASICs are much simpler than mobile SoCs
  - No CPU cores, GPU, NPU, modem, camera ISP, display controller
  - Repetitive compute array (systolic/tensor) with simpler logic
  - Inference ASICs at TSMC typically achieve 95%+ yields
  - At SMIC 7nm, simpler design could realistically achieve 40-60% yield
- At 50% yield: cost penalty vs TSMC drops from 6x to ~1.8x
- If Huawei marks up Ascend 910B to $15-20K (estimated gross margin 40-50%), DeepSeek's own chip could cost $8-12K at SMIC prices
- Break-even on $500M chip development at 50,000 chips: $10,000/chip savings × 50,000 = $500M
- DeepSeek's inference cluster likely needs 10,000-50,000 chips over 3-5 years: break-even feasible at scale

## Key Insight
The story isn't just about DeepSeek vs Huawei or China vs US. It's about a structural shift: **inference is where AI companies become chip companies.** Training still requires Nvidia's generalist architecture because model architectures change rapidly. But inference workloads are stable — you optimize for a known model architecture. That makes custom ASICs rational.

Every major AI lab has reached the same conclusion independently. DeepSeek is the latest, but the math is identical for all of them.

## Journalist
Tomás Reyes · AI Infrastructure

## Strongest Counterargument
Custom chip programs have a terrible track record. Intel Nervana, Graphcore, Habana Labs, Cerebras — the graveyard of AI chip startups is vast. And those had access to TSMC. DeepSeek would be building on SMIC's constrained process, with no guarantee of yields, while simultaneously trying to keep up with a model architecture that changes every 6 months. If V5 has a fundamentally different inference pattern than V4, the custom chip could be obsolete before it ships.

## Limitations
- No public data on Huawei Ascend 910B pricing (estimates range widely)
- SMIC 7nm yield figures are from industry observers, not official
- DeepSeek's inference volume is unknown — they don't disclose API usage metrics
- Custom chip development timelines in China under sanctions are highly uncertain
- Comparison assumes current pricing holds — competitive dynamics could change

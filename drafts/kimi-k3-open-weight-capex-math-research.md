# Research Notes: Kimi K3 and the Open-Weight Intelligence Cost Curve

## Slug: kimi-k3-open-weight-capex-math
## Journalist: Marcus Chen (Technology beat)

## Core Thesis
Moonshot AI's Kimi K3 — the first open-weight model at 2.8 trillion parameters — sent the semiconductor index into bear market territory in a single week. But the market panic misses the structural question: what does it actually cost to buy a unit of intelligence from an open-weight model versus a closed one, and what does that ratio mean for the $125-145 billion in AI capex planned by hyperscalers in 2026?

## Original Analysis (Kill Test)
**Cost-per-intelligence-unit model:** Compare the price/performance ratio across frontier models — K3 at $3/$15/MTok vs Claude Fable 5 at ~$15/$75/MTok vs GPT-5.6 Sol pricing — normalized against Arena AI Elo scores and key benchmark performance. Calculate what "intelligence parity per dollar" looks like, and model the capex sustainability implications at different open-weight adoption rates.

**Semiconductor bear market exposure calculation:** The SOX index lost ~10% in one week ($X billion in market cap). Calculate the implied revenue assumption baked into current semiconductor valuations (Nvidia forward P/E, TSMC, etc.) and model what happens if 20%, 30%, or 50% of AI workloads shift to open-weight models that require less compute-per-intelligence-unit.

## Primary Sources
1. **Moonshot AI announcement (Jul 16, 2026):** 2.8T params, MoE architecture, $3/$15 per MTok, 1M context window, Kimi Delta Attention (6.3x faster decoding), open weights July 27
2. **WSJ (Jul 18):** "China's Moonshot AI Adds More Fuel to Wall Street's Chip Selloff" — SOX index entered bear market, down 20% from late June high, 10% weekly drop (worst since April 2025)
3. **Reuters (Jul 18):** PHLX Semiconductor Index down ~9% weekly, Micron down ~30% from high but still up 200% YTD
4. **Barron's (Jul 18):** Arena AI evaluations confirm K3 outperformed Anthropic and OpenAI peers on coding benchmarks; PitchBook analyst Harrison Rolfes on capex floor risk
5. **CNN (Jul 18):** Nasdaq -1.4%, S&P -1%, Dow -407, Taiwan benchmark -6%, Japan -4%
6. **WCCFtech (Jul 17):** K3 autonomously designed a functional chip in 48 hours (4mm², Nangate 45nm, >8,700 tokens/sec); built MiniTriton GPU compiler from scratch beating parts of Nvidia's Triton
7. **Meta Q1 2026 earnings:** Capex guidance $125-145B (from MEMORY.md)
8. **David Sacks (PCAST co-chair):** "This is concerning" re: Moonshot's lead over top US models

## Benchmark Data (Self-Reported by Moonshot + Arena AI)
- Terminal-Bench 2.1: K3 = 88.3 (behind only GPT-5.6 Sol)
- Arena AI overall Elo: K3 = 1547 (behind only Claude Fable 5)
- Outperforms: Claude Opus 4.8 max, GPT-5.5 high
- Trails: Claude Fable 5, GPT-5.6 Sol

## Pricing Comparison
| Model | Input $/MTok | Output $/MTok | Type |
|-------|-------------|---------------|------|
| Kimi K3 | $3.00 | $15.00 | Open-weight |
| Kimi K3 (cached) | ~$0.30 | $15.00 | Open-weight |
| Claude Sonnet | ~$3.00 | ~$15.00 | Closed |
| Claude Fable 5 | ~$15+ | ~$75+ | Closed |
| GPT-5.6 Sol | TBD | TBD | Closed |
| GPT-5 | $1.25 | $10.00 | Closed |

## Key Technical Innovations
- Kimi Delta Attention (KDA): Up to 6.3x faster decoding at million-token contexts
- Attention Residuals: ~25% higher training efficiency at <2% additional compute
- MXFP4 weights / MXFP8 activations (quantization-aware from training)
- K3 Swarm Max variant for large-scale parallel processing

## Autonomous Capabilities Demonstrated
1. Chip design: 4mm² chip, Nangate 45nm, >8,700 tokens/sec, 48 hours, zero human intervention
2. GPU compiler: MiniTriton — beats/matches parts of Nvidia's official Triton
3. Video editing: 56 raw clips → polished teaser, frame-level beat sync, multiple revision rounds
4. 3Blue1Brown-style motion graphics explaining its own architecture

## Strongest Counterargument
DeepSeek R1 caused a similar panic in January 2025, and US AI stocks fully recovered within weeks. The SOX index remains up 60%+ for the year. Open-weight models consistently underperform on the hardest tasks — K3 still trails Claude Fable 5 and GPT-5.6 Sol. Self-reported benchmarks from Chinese AI labs have historically overstated real-world performance. And the bulk of AI capex goes to training clusters, not inference — open-weight inference savings don't directly threaten training infrastructure demand.

## Limitations
- K3 benchmarks are largely self-reported; independent Arena AI evaluation is limited
- Open weights not yet released (July 27) — claims about self-hostability are untested at scale
- Pricing comparison is API-to-API; enterprise self-hosting costs on private hardware are different
- Market cap loss calculation uses a single week's data during broader market rotation
- Chinese AI companies face US chip export restrictions that constrain future training runs

## Xi Jinping Context
Xi spoke at WAIC (World Artificial Intelligence Conference) in Shanghai same day, endorsing open-source AI and criticizing US for "overstretching national security" in AI. This is state-backed positioning, not just a startup story. Moonshot backed by Alibaba Group. US response: Trump admin temporarily blocked access to Anthropic's Mythos model citing national security.

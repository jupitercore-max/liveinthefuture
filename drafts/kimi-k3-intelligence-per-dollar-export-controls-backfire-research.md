# Research Notes — Article #688

## Topic
Kimi K3: 2.8 trillion-parameter open-weight model from China's Moonshot AI delivers frontier-level intelligence at 30-70% below US lab pricing. Explores the "intelligence per dollar" metric, the distillation accusations, and whether export controls accelerated rather than prevented Chinese AI competitiveness.

## Primary Sources

### 1. VentureBeat — "China's Moonshot AI releases Kimi K3, the largest open-source model ever"
- URL: https://venturebeat.com/technology/chinas-moonshot-ai-releases-kimi-k3-the-largest-open-source-model-ever-rivaling-top-u-s-systems
- 2.8T params (MoE), 75% larger than DeepSeek V4 Pro (~1.6T)
- 16 of 896 experts activated per request
- 1M context window, native multimodal
- Kimi Delta Attention: 6.3× faster decoding in million-token contexts
- Attention Residuals: ~25% higher training efficiency at <2% cost
- API pricing: $3/M input, $15/M output; cached input $0.30/M
- Open weights released ~July 27, 2026

### 2. Reuters — "US accuses China's Moonshot of stealing from Anthropic's Fable"
- URL: https://www.reuters.com/world/us/us-accuses-chinas-moonshot-stealing-anthropics-fable-latest-ai-model-2026-06-30/
- OSTP Director Michael Kratsios: Moonshot built "sophisticated internal platform" to access Fable
- Moonshot acquired Nvidia GB300 servers, used them in Thailand
- Anthropic (February 2026): 3 Chinese AI companies (DeepSeek, Moonshot, MiniMax) created ~24,000 fake accounts, 16 million interactions with Claude
- State Department ordered global push on IP theft awareness (April cable)
- Moonshot denied allegations

### 3. Reuters — "As AI grows more powerful, a US-China feud threatens safety efforts"
- URL: https://www.reuters.com/legal/litigation/ai-grows-more-powerful-us-china-feud-threatens-safety-efforts-2026-07-24/
- Treasury Secretary Bessent warned of potential sanctions
- Commerce Department BIS investigating chip access violations
- Planned US-China AI safety dialogue in September at risk

### 4. SaaStr — "Anthropic Just Passed OpenAI in Revenue"
- URL: https://www.saastr.com/anthropic-just-passed-openai-in-revenue-while-spending-4x-less-to-train-their-models/
- OpenAI: $24B ARR ($2B/month), $852B valuation
- Anthropic: $30B ARR (from $9B at end of 2025), $965B valuation (as of April 2026)
- Combined: $54B ARR, $1.8T+ combined valuation

### 5. NY Post — "Moonshot AI seeks $50B valuation"
- URL: https://nypost.com/2026/07/21/business/china-based-moonshot-ai-seeks-50-billion-valuation-could-go-public-this-year-report/
- Moonshot seeking $50B valuation
- Could go public in 2026

### 6. Reuters — "Anthropic rolls out Opus 5 AI model"
- URL: https://www.reuters.com/technology/anthropic-rolls-out-opus-5-ai-model-efficiency-upgrade-2026-07-24/
- Opus 5 launched July 24: near Fable 5 capabilities at half the price
- Dianne Penn: "continue to consistently deliver frontier intelligence and bring that as accessibly as possible"
- Shows Anthropic already responding to price pressure

### 7. CNN — "What is China's Kimi K3 and why is the US so rattled by it?"
- URL: https://www.cnn.com/2026/07/23/tech/china-ai-moonshot-kimi-explainer-intl-hnk
- Moonshot suspended new subscriptions after demand overwhelmed compute in 2 days
- Free tier access; benchmarks approaching US leaders

### 8. LinkedIn/DataCamp — Benchmark data
- Artificial Analysis Intelligence Index: K3 57, Fable 5 60, GPT-5.6 Sol 59
- DeepSWE: K3 67.5, Sol 73.0, Fable 5 70.0
- Terminal-Bench 2.1: K3 88.3, Sol 88.8
- Frontend Code Arena: K3 is #1

## Original Calculation — Intelligence Per Dollar

**Output token cost per intelligence index point:**
| Model | Output $/M tokens | Intelligence Index | $/M per Index Point |
|-------|------|------|------|
| Kimi K3 | $15 | 57 | $0.263 |
| GPT-5.6 Sol | $30 | 59 | $0.508 |
| Claude Fable 5 | $50 | 60 | $0.833 |

**Ratios:**
- K3 delivers 3.17× more intelligence per dollar than Fable 5 ($0.833/$0.263)
- K3 delivers 1.93× more intelligence per dollar than Sol ($0.508/$0.263)

**With cached inputs (>90% cache rate for coding workloads per Moonshot):**
| Model | Cached Input | Output | Blended (50/50) | Intelligence | Blended per Point |
|-------|------|------|------|------|------|
| Kimi K3 | $0.30 | $15 | $7.65 | 57 | $0.134 |
| GPT-5.6 Sol | $0.50 | $30 | $15.25 | 59 | $0.258 |
| Claude Fable 5 | $1.00 | $50 | $25.50 | 60 | $0.425 |

With caching, K3 is 3.17× more intelligence per dollar than Fable 5.

**Enterprise scenario — 1B output tokens/day (medium-scale enterprise):**
| Model | Daily cost | Annual cost |
|-------|------|------|
| Claude Fable 5 | $50,000 | $18.25M |
| GPT-5.6 Sol | $30,000 | $10.95M |
| Kimi K3 | $15,000 | $5.48M |

Annual savings switching from Fable 5 to K3 API: $12.78M
Annual savings switching from Sol to K3 API: $5.48M

**Valuation per intelligence point:**
| Company | Valuation | Intelligence Index | $/point |
|---------|-----------|-------------------|---------|
| Moonshot | $50B (seeking) | 57 | $0.88B |
| OpenAI | $852B | 59 | $14.4B |
| Anthropic | $965B | 60 | $16.1B |

Markets value OpenAI's intelligence at 16.4× what they value Moonshot's (per index point).
Markets value Anthropic's intelligence at 18.3× Moonshot's.

## Strongest Counterargument
K3 may have been built on distilled American intelligence. If Moonshot trained K3 on Fable 5 outputs via 24,000 fake accounts and 16 million interactions, the low cost reflects theft, not engineering superiority. US officials and Anthropic are making this case explicitly. The counterargument is: cheap copy ≠ independent innovation. If you factor in the "stolen R&D" that Anthropic invested, K3's true cost is much higher — but Moonshot doesn't have to pay that cost, which is exactly the problem.

## Limitations
- Intelligence Index is one benchmark; models may differ significantly on real-world tasks
- Pricing may not be sustainable for Moonshot (could be a loss-leader)
- Open-weight deployment costs (self-hosting 2.8T params requires massive GPU clusters)
- Distillation allegations are unproven but undenied with specifics
- Revenue data for Moonshot is not public; the $50B valuation is a seeking price

## Journalist
Marcus Chen — Computing & AI

## Category
💻 Computing

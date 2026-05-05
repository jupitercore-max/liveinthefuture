# Research: NIST CAISI DeepSeek V4 Pro Benchmark Gap

## Story Angle
NIST's Center for AI Standards and Innovation (CAISI) independently evaluated DeepSeek V4 Pro using non-public and pre-committed benchmarks. Result: the US-China AI capability gap is 8 months, not the 2 months DeepSeek's own technical report suggests. The gap between self-reported and independent evaluation is the story — benchmark self-selection inflates apparent Chinese AI performance by ~4x.

## Kill Test
Without this, people accept Stanford AI Index's "gap effectively closed" narrative. NIST's non-public benchmarks show the gap is far wider on tasks that matter (cyber, agentic software engineering, abstract reasoning).

## 10-Star Test
8/10 — Primary government source (NIST), original methodology (IRT), quantitative gap analysis with a testable claim (self-reported vs independent benchmarks diverge systematically).

## Novel Contribution
Calculate the "benchmark inflation ratio": DeepSeek claims 2-month lag on self-selected benchmarks; NIST finds 8-month lag on pre-committed suite. Ratio = 4x. This has policy implications: if policymakers use public benchmarks to gauge the AI race, they're underestimating the real gap.

## Primary Sources

### 1. NIST CAISI Evaluation of DeepSeek V4 Pro (May 1, 2026)
- URL: https://www.nist.gov/news-events/news/2026/05/caisi-evaluation-deepseek-v4-pro
- Key findings:
  - DeepSeek V4 lags US frontier by ~8 months (IRT methodology)
  - IRT-estimated Elo: top US model 1260 ± 28, DeepSeek V4 999 ± 27 (max reasoning), 800 ± 28 (xhigh reasoning)
  - Every 200-point Elo increase = 3x increase in odds of solving a task
  - 16 benchmarks across 35 models used for IRT fitting
  - 9 benchmarks in 5 domains: cyber, software engineering, natural sciences, abstract reasoning, mathematics
  - 2 held-out uncontaminated benchmarks: ARC-AGI-2 semi-private, CAISI PortBench
  - CAISI pre-committed to benchmark suite (didn't select based on results)

### Key Benchmark Results (CAISI evaluation):
| Domain | Benchmark | Top US | DeepSeek V4 (max) |
|--------|-----------|--------|-------------------|
| Cyber | CTF-Archive-Diamond | 71% | 46% |
| Software Eng | SWE-Bench Verified | 81% | 79% |
| Software Eng | PortBench | 78% | 60% |
| Natural Sci | FrontierScience | 79% | 72% |
| Natural Sci | GPQA-Diamond | 96% | 91% |
| Abstract | ARC-AGI-2 semi-private | 79% | 46% |
| Math | OTIS-AIME-2025 | 100% | 92% |
| Math | PUMaC 2024 | 96% | 95% |
| Math | SMT 2025 | 99% | 94% |

### The Critical Insight:
- On benchmarks featured in DeepSeek's own technical report, V4 appears "roughly on par" with frontier US models
- On CAISI's non-public / non-featured benchmarks, V4 "lags behind" significantly
- Figure 3 in NIST report shows this directly: (a) DeepSeek-selected benchmarks = close; (b) CAISI suite = large gap
- Biggest gaps: Cyber (25 percentage points), Abstract Reasoning (33 percentage points)

### Cost Comparison:
- DeepSeek V4 more cost-efficient than GPT-5.4 mini on 5/7 benchmarks
- Range: 53% less expensive to 41% more expensive
- Model served from H200 and B200 GPUs

### 2. Stanford AI Index 2026
- US-China performance gap narrowed to 2.7% on public benchmarks
- China leads in patents (69.7%) and industrial robots (295,000)
- This directly contradicts NIST's 8-month finding — because Stanford uses public benchmarks only

### 3. DeepSeek V4 Technical Report / Press Coverage
- 1.6T total parameters, 49B active per token (MoE architecture)
- 1M native context window, 32T+ training tokens
- MIT licensed open weights
- $0.14/M input tokens (vs $1.74/M GPT-5.5)
- Claims competitive with GPT-5.4 and Opus 4.6
- URL: https://www.digitaltrends.com/computing/deepseeek-v4-is-out-touting-some-disruptive-wins-over-gemini-chatgpt-and-claude/

### 4. Brookings Analysis (April 2026)
- URL: https://www.brookings.edu/articles/competing-ai-strategies-for-the-us-and-china/
- US focuses on AGI and compute efficiency; China prioritizes model efficiency, adoption, open-source
- Chinese labs leverage MoE, quantization, distillation to overcome compute constraints
- Alibaba investing $53B, Microsoft $80B in AI capital

### 5. Production vs Benchmark Performance
- URL: https://timetobuildbob.github.io/blog/benchmark-winners-arent-production-winners/
- Kimi K2.6 underperforms benchmarks by 28% in real-world autonomous work vs Opus
- Supports NIST's finding that self-selected benchmarks overstate capabilities

## Strongest Counterargument
The 8-month gap measures frontier models only. China's AI strength is diffusion — dozens of competitive open-source models at 53-75% lower cost, MIT-licensed, running on domestic Huawei chips. The gap on the scoreboard matters less than the gap in deployment. If every Chinese enterprise can run a "good enough" model at 1/5th the cost, the capability gap is strategically irrelevant for most applications.

## Limitations
- CAISI evaluation covers 5 domains; doesn't test multimodal, long-context retrieval, or multilingual
- IRT methodology aggregates across tasks — gap could be narrower in specific subdomains
- Cost comparison uses API pricing, not self-hosted economics (Chinese model self-hosting on Huawei chips changes the math)
- "8 months" is an aggregate; on math benchmarks specifically, the gap is much smaller
- CAISI served DeepSeek on H200/B200 GPUs — the same model on Huawei Ascend might perform differently

## Headline
"DeepSeek Says It's 2 Months Behind GPT-5. NIST Says 8. The Difference Is Which Tests You Run."

## Journalist
Jordan Kessler — good fit for data-heavy methodology/policy piece

## Category
💼 Labor & AI

## Related Articles
- quantum-ecc-15bit-bitcoin-migration-gap (quantum computing measurement)
- weekly-ai-roundup-april-27-2026 (DeepSeek V4 context)
- china-ai-layoffs-illegal-global-comparison (China tech context)

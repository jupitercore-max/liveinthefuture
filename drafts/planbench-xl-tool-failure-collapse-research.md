# Research: PlanBench-XL — Agent Tool Failure Collapse

## Source: Moltbook
- Post by AiiCLI, 2026-07-18: "GPT-5.4 drops from 51.9% to 11.36% when tools break — planning is not the problem"
- Referenced paper: PlanBench-XL by Liu et al., UIUC

## Primary Source: PlanBench-XL Paper
- **arXiv:** 2606.22388v1
- **Authors:** Jiayu Liu*, Qihan Lin*, Cheng Qian, Rui Wang, Emre Can Acikgoz, Xiaocheng Yang, Jiateng Liu, Zhenhailong Wang, Xiusi Chen, Heng Ji, Dilek Hakkani-Tür
- **Affiliation:** University of Illinois Urbana-Champaign
- **Benchmark:** 327 retail tasks, 1,665 tools, 10 LLMs
- **Each task requires:** ~25 turns average, minimum 5 distinct tool calls (shortest path lengths 5–9)
- **Max turns per task:** 100

### Key Results (Default, No Blocking):
| Model | Accuracy | EGT Precision |
|-------|----------|---------------|
| Gemini-3.1-Pro | 77.06% | 91.47% |
| DeepSeek-V4-Flash | 63.08% | 65.57% |
| GPT-5.4 | 51.90% | 72.92% |
| Gemini-3.5-Flash | 52.19% | 85.29% |
| Llama-3.3-70B | 18.96% | 59.67% |
| GPT-5.4-Mini | 3.07% | 71.25% |
| Qwen3-32B | 2.75% | 62.36% |
| Qwen3-8B | 0.00% | 35.31% |

### Under Blocking (Most Severe = "1 Path" + Implicit Failures):
- GPT-5.4: 51.90% → ~11.36% (78% relative collapse)
- All models degrade significantly
- Silent/implicit failures are the MOST harmful type

### Three Types of Blocking:
1. **Explicit Failure:** Tool returns "error: endpoint unavailable" — easiest to detect
2. **Implicit Failure:** Tool returns wrong answer silently (e.g., returns "tuna" instead of refund status) — HARDEST to detect
3. **Semantically Misleading:** Tool has related but different functionality — moderate

### Key Insights from Error Analysis:
1. **78% of wrong tool calls had a correct alternative already retrieved** — agents just didn't select it
2. **72.4% of GPT-5.4 failures = "Irrecoverable Drift"** — makes partial progress then veers off permanently
3. **Only 3% show Weak Recovery** — once drift happens, agents almost never come back
4. **74.1% of wrong calls use recently retrieved tools** — strong recency bias
5. **+5 enforced exploration budget = <5pp improvement** — more compute doesn't help
6. **When only longest recovery path preserved: GPT-5.4 drops to ~10%** vs ~30% with standard blocking

### Takeaways (from paper):
- Exploration breadth (Mean EDT) correlates 0.902 with accuracy
- EGT Precision correlates 0.781 with accuracy
- Backward anticipation (reasoning from goal to needed tools) strongly correlated with success
- Lower-performing models rely almost exclusively on forward anticipation

## Additional Sources

### 1. API Reliability Data (Uptrends, 2025)
- "State of API Reliability 2025": 2 billion checks across 20 industries
- API downtime INCREASED 60% in Q1 2025 vs Q1 2024
- Average uptime fell from 99.66% to 99.46%
- = ~55 minutes of downtime per week (up from 34 min)

### 2. Nordic APIs 2026 Report
- AI APIs show HIGHEST incident frequency among all categories
- OpenAI and Anthropic: recurring short-duration outages
- Critical insight: "Composite service availability = product of upstream SLAs, not their average"
- Median incident resolution: ~90 minutes

### 3. Enterprise Downtime Costs (ITIC 2024)
- 90%+ of mid-size/large enterprises lose >$300K/hour
- 41% lose $1M–$5M+/hour
- Gartner baseline: ~$5,600/minute = ~$336K/hour

### 4. Yanshan AI (Jul 2026)
- Prediction: "Agent competition will move from answer quality to task-completion reliability"
- Quote: "A model answering a question and an agent completing a live business process are fundamentally different engineering challenges"

## Original Contribution: The Compound Fragility Problem

**The multiplication math nobody is doing:**

If an AI agent chain requires N tool calls and each tool has uptime p:
- Probability ALL tools work = p^N
- For N=8 tools at 99.5% uptime each: 0.995^8 = 96.1% → 3.9% chance of encountering a failure
- For N=8 at 99.0%: 0.99^8 = 92.3% → 7.7% failure rate

But PlanBench-XL shows the response to failure is NOT graceful degradation:
- GPT-5.4 doesn't lose 3.9% performance when 3.9% of tool chains fail
- It loses 78% of its performance (51.9% → 11.36%)
- The fragility multiplier: ~20× (a 3.9% tool failure rate produces a ~78% task failure rate)

**This is the compound fragility problem:** Linear increases in tool-chain unreliability produce exponential drops in task completion.

Why? Because:
1. Silent failures propagate — agents reuse bad values in later calls (UIRR 11.99% for implicit failures)
2. Once drift occurs, recovery is almost impossible (3% weak recovery rate)
3. More compute doesn't help (<5pp gain from 5× more attempts)
4. Recency bias means agents pick wrong tools even when correct ones are visible

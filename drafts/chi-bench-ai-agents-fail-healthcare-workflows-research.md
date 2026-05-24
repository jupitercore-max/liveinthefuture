# CHI-Bench: AI Agents Fail 72% of U.S. Healthcare Workflows — Research Notes

## Source: arXiv:2605.16679v2 (May 19, 2026)
- **Title:** CHI-Bench: Can AI Agents Automate End-to-End, Long-Horizon, Policy-Rich Healthcare Workflows?
- **Released:** May 20, 2026 via actAVA.ai press release
- **Paper:** https://arxiv.org/pdf/2605.16679
- **Leaderboard:** https://actava.ai/benchmarks
- **GitHub:** https://github.com/actavaai/chibench
- **License:** Apache 2.0

## Coalition (20+ institutions)
- actAVA.ai (Pleasanton, CA)
- Johns Hopkins Medicine, Wellstar Health System, Yale School of Medicine
- Stanford University, CMU, University of Oxford, USC, UCSD
- Brown University, Emory University, University of Washington, Northeastern
- Arizona State University, UIC, Boston College, Stony Brook, MBZUAI
- Key researchers: Caiming Xiong (Recursive Superintelligence), Sanmi Koyejo (Stanford), Eric P. Xing (CMU/MBZUAI), Philip S. Yu (UIC)
- Lead author: Haolin Chen (actAVA)

## What CHI-Bench Is
- World's first long-horizon healthcare benchmark for AI agents
- 75 workflows across 3 domains: Prior Authorization (PA), Utilization Management (UM), Care Management (CM)
- Each trial: 60-80 agent steps across 4-6 clinical stages
- Environment: 21 healthcare apps exposed via 200+ MCP tools
- Policy corpus: 1,279-document managed-care operations handbook
- Agent plays multiple roles: intake clerk, nurse reviewer, medical director, peer-to-peer coordinator, etc.
- 30 frontier agent configurations tested (6 vendors: Anthropic, OpenAI, Google, x.AI, DeepSeek, Z.ai)
- Built with 115K lines of Python; simulates 5,000 chart activities for 50 patients, ~90 healthcare workers

## Headline Results (Table 2)

### Overall pass@1 (best to worst, selected)
| Agent | Model | pass@1 | pass@3 | pass^3 | Steps | Cost |
|-------|-------|--------|--------|--------|-------|------|
| Claude Code | Opus 4.6 | 28.0% | 38.7% | 18.7% | 76 | $6.47 |
| Claude Code | Sonnet 4.6 | 26.2% | 41.3% | 12.0% | 82 | $1.30 |
| Claude Code | Opus 4.7 | 24.4% | 41.3% | 10.7% | 68 | $9.91 |
| Codex | GPT-5.5 | 20.9% | 30.7% | 9.3% | 54 | $1.29 |
| OAI Agents | GLM-5.1 | 18.7% | 26.7% | 12.0% | 58 | $0.27 |
| Hermes | GLM-5.1 | 18.7% | 28.0% | 10.7% | 30 | $1.04 |
| OpenClaw | Claude Opus 4.7 | 17.3% | 37.3% | 4.0% | 41 | $11.48 |
| OpenClaw | GLM-5.1 | 16.9% | 30.7% | 6.7% | 116 | $0.96 |
| Hermes | Qwen 3.6 Max | 16.4% | 28.0% | 5.3% | 29 | $4.12 |
| Codex | GPT-5.4 | 16.0% | 25.3% | 8.0% | 58 | $1.30 |
| OAI Agents | Qwen 3.6 Max | 15.6% | 22.7% | 9.3% | 48 | $0.58 |
| Gemini CLI | Gemini 3 Flash | 12.5% | 17.3% | 8.0% | 142 | $0.33 |
| Gemini CLI | Gemini 3.1 Pro | 7.1% | 13.3% | 1.3% | 82 | $2.11 |
| Claude Code | Haiku 4.5 | 6.2% | 10.7% | 2.7% | 41 | $0.16 |
| Grok 4.3 (best: OAI Agents) | 5.8% | 10.7% | 1.3% | 32 | $1.54 |
| OpenClaw | Grok 4.3 | 0.4% | 1.3% | 0.0% | 65 | $2.66 |

### Domain Breakdown (best per domain)
- **UM (Utilization Management):** 41.3% — Claude Code + Opus 4.6
- **CM (Care Management):** 32.0% — Claude Code + Opus 4.7
- **PA (Prior Authorization):** 29.3% — Codex + GPT-5.5

### Reliability (pass^3 — same case run 3 times, must pass all 3)
- No agent clears 20% on pass^3
- Opus 4.6: 28.0% → 18.7% (33% reliability degradation)
- GPT-5.5: 20.9% → 9.3% (55% reliability degradation)
- Sonnet 4.6: 26.2% → 12.0% (54% degradation)

### Marathon (25 cases in one session)
- Claude Code + Opus 4.7 PA: 8.0% (from 24.0% per-task baseline, Δ=-16.0)
- Codex + GPT-5.5 PA: 8.0% (from 29.3%, Δ=-21.3)
- CM: Claude Opus 4.7 drops from 32.0% to 2.7%
- Both agents fan out across the queue, save partial work, fail to drive most cases to terminal action
- Codex + GPT-5.5 auto-compacts context 4-6 times per PA session
- Claude Opus 4.7 (1M context) never compacts but still fails similarly

### End-to-End Arena (2 agents: provider + payer)
- Provider-only PA (23 tasks): 30.4%
- Two-agent E2E: **0.0%** (complete collapse)
- 2 tasks never submitted; 18 didn't finish MD decision; 5 failed final judge
- 0 P2P requests on 5 P2P-required tasks; 2 spontaneous P2Ps happen

## Failure Mode Analysis (5,886 failed trials)
1. **Clinical-Reasoning (35.4%)** — medical or protocol judgment errors
2. **Workflow-Completion (23.3%)** — required terminal action never invoked
3. **Abstain-or-Stuck (15.6%)** — timeouts (1800s wallclock cap), loops, premature closes, refusals
4. **Policy-Compliance (13.2%)** — literal misreading of cited criterion text
5. **Tool-Use-Error (10.7%)** — concentrated in DeepAgents; single malformed tool call → trial-fatal
6. **Hallucination (0.8%)**
- Second-level: criteria misapplication (most common), skipped required steps (18.7%), policy criteria misreading (13.2%)
- CM-specific: **illegitimate consent (5.7%)** — agents repeatedly reframe/expand care program scopes until reluctant patient says "yes" (concern-mining)

## Skills/Handbook Analysis
- UM is handbook-bound: removing domain handbook collapses pass@1 from 32.0 to 17.3
- PA inverts: removing BOTH handbooks modestly beats partial removal (agent enters over-verification mode with partial handbook, refuses to submit)
- CM stays near floor regardless (complexity is conversation-driven, not policy)

## Market Context
- AMA 2024 survey: clinicians spend **14.6 hours/week** on prior authorizations
- CMS WISeR Model (6-year initiative starting 2026): AI for PA streamlining, targets 15 services
- AHA urges caution: pilot before regulatory changes
- McKinsey 2022: AI could automate 50-75% of PA tasks (CHI-Bench contradicts)
- Innovaccer 2026: 63% of healthcare orgs use AI in live workflows
- Peterson Health Technology Institute: AI reduces admin burdens but raises transaction volumes/costs
- Primary Care Collaborative: $20 admin cost per $100 clinical revenue
- Rock Health Q1 2026: $4.0B in U.S. digital health funding (110 deals)
- AI virtual medical assistants market: $1.86B (2025) → $8.85B (2030), 36.6% CAGR

## Original Analysis: Cost-per-Successful-Case

### Naive cost (pass@1)
- Claude Code + Opus 4.6: $6.47 / 0.28 = **$23.11 per successful case**
- Codex + GPT-5.5: $1.29 / 0.209 = **$6.17 per successful case**
- OAI Agents + GLM-5.1: $0.27 / 0.187 = **$1.44 per successful case**

### Reliable cost (pass^3 — needs 3 runs, all must pass)
- Claude Code + Opus 4.6: ($6.47 × 3) / 0.187 = **$103.80 per reliably-completable case**
- Codex + GPT-5.5: ($1.29 × 3) / 0.093 = **$41.61 per reliably-completable case**

### Human comparison
- PA coordinator salary: ~$50,000/yr ≈ $25/hr
- Average case throughput: 3-4 cases/hr (industry estimates)
- Human cost: **$6.25-$8.33 per case** at >>90% reliability
- Conclusion: Best AI agent costs 3-5× more than a human PA coordinator per successful case AND is far less reliable

## Key Quotes
- Haolin Chen (lead author): "These workflows are long, role-composed, and gated by policy. An agent has to play intake clerk, nurse reviewer, and medical director across sixty-plus steps where one wrong site-of-service flip cascades into multiple failures."
- Weiran Yao (CAO, actAVA): "We need to know whether an agent can carry a real case end-to-end without error. CHI-Bench is built for that."

## Comparison to Prior Benchmarks
- MedQA, MedMCQA, PubMedQA: test factual knowledge only
- HealthBench: evaluates LLM helpfulness, not agent workflow
- HealthAdminBench: closest peer, but GUI pixel/DOM browsing on payer portal; no CM domain, no multi-role
- MedAgentBench, MedAgentGym: short-horizon clinical agents
- CHI-Bench is FIRST to combine: long-horizon tool calls + dense policy retrieval + irreversible state + hidden multilateral interaction + in-situ verification

## Related LITF Articles
- ai-layoffs-productivity-paradox-q1-2026
- first-systematic-review-ai-displacement-94-studies
- stanchart-lower-value-human-capital

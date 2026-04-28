# Research Notes: OpenAI AI Jobs Transition Framework — Capability Overhang

## Story Thesis
OpenAI's own 2023 paper said 80% of workers could have tasks affected by AI. In April 2026, OpenAI published a new framework covering 921 occupations that finds only 18% face higher short-term automation risk. The 62-point gap between "exposed to AI" and "actually at risk" reveals a massive "capability overhang" — a chasm between what AI CAN do and what actually gets deployed. The counterintuitive BLS data showing low-risk jobs losing MORE employment than high-risk ones makes the story even richer.

## Primary Sources

### 1. OpenAI AI Jobs Transition Framework (April 2026)
- **Report**: AI Jobs Transition Framework: Mapping AI's near-term impact on jobs
- **Authors**: Alex Martin Richmond (economist, OpenAI), foreword by Ronnie Chatterji (Chief Economist, OpenAI; former Biden White House CHIPS coordinator)
- **Coverage**: 921 occupations representing 99.7% of US employment
- **Key finding — Four archetypes**:
  - 18% higher short-term automation risk
  - 24% will reorganize (employment declines as task composition shifts)
  - 12% could grow because of AI
  - 46% less immediate change
- **Three constraints keeping humans essential** (Human Necessity):
  - Physical necessity: 41.1% of US employment (plumbers, therapists, stockers)
  - Relational necessity: 30.5% (teachers, nurses — trust/care hold value)
  - Regulatory/accountability necessity: 9% (judges, lawyers — licensed person must approve)
  - No hard human necessity: 19.3%
- **ChatGPT usage validation**: Usage is ~3x higher in jobs flagged as highest automation risk
  - Realized exposure in high-risk archetype: 23.8%
  - Theoretical AI capability ceiling: 90%
  - **Capability overhang: 66.2 percentage points** — gap between what AI CAN do and what it IS doing
- **Counterintuitive BLS finding**: Since Q1 2024, "less immediate change" archetype saw LARGEST unemployment increase (+0.6pp), vs +0.3pp for "higher automation risk" and +0.3pp for "reorganize" jobs
- **Methodology**: Uses GPT-5.4/GPT-5.4-mini to classify occupations — authors flag this as limitation
- Source: https://www.edtechinnovationhub.com/news/openai-finds-18-percent-of-us-jobs-at-risk-from-ai-as-chatgpt-use-surges

### 2. OpenAI's earlier paper: "GPTs are GPTs" (March 2023)
- **Authors**: Eloundou, Manning, Mishkin, Rock
- **Key finding**: ~80% of US workforce could have at least 10% of tasks affected; ~19% could see 50%+ tasks impacted
- **Method**: GPT-4 + human rubric assessment
- **Critique**: Measured "exposure" not "risk" — binary (can AI do this task?) not deployment-conditional
- Source: https://openai.com/index/gpts-are-gpts/

### 3. Goldman Sachs Report (March 2023)
- **Claim**: AI could automate ~300 million full-time equivalent jobs globally
- **Method**: Task-level analysis extrapolated to global workforce
- **Key nuance**: "Exposed" does not equal "eliminated" — partial automation of tasks
- Source: https://siliconangle.com/2023/03/29/goldman-sachs-report-says-ai-put-300-million-jobs-risk/

### 4. McKinsey Global Institute (2026)
- "Technologies could theoretically automate more than half of current US work hours"
- "Work in the future will be a partnership between people, agents, and robots"
- "Adoption will take time. Some roles will shrink, others grow or shift"
- Source: https://www.mckinsey.com/mgi/our-research/agents-robots-and-us-skill-partnerships-in-the-age-of-ai

### 5. ILO Global Index of Occupational Exposure (2025)
- 52,558 data points on 2,861 tasks
- Survey of 1,640 employed people
- Refined methodology combining expert panels + Delphi-style discussions
- Source: https://www.ilo.org/publications/generative-ai-and-jobs-refined-global-index-occupational-exposure

## Novel Contribution: The Prediction Deflation Curve

Nobody has plotted the timeline of AI labor threat estimates against the actual number. I'll calculate:

| Year | Source | Headline Claim | Actual Metric | What It Measured |
|------|--------|----------------|---------------|------------------|
| 2013 | Frey & Osborne (Oxford) | 47% of US jobs at risk | 47% | "Computerizable" tasks |
| 2023 | Goldman Sachs | 300M global jobs at risk | ~25% of tasks (US) | "Exposed" tasks |
| 2023 | OpenAI (Eloundou) | 80% of workers affected | 80% with ≥10% tasks | "Exposure" to GPTs |
| 2024 | IMF | 40% of global jobs exposed | 60% in advanced economies | "Exposure" |
| 2026 | OpenAI (Chatterji/Richmond) | 18% at higher risk | 18% | "Risk" accounting for human necessity + demand |

The pattern: every subsequent study is more careful about what "at risk" means. The shift from "exposure" to "risk" drops the number from 80% to 18%. That's the story.

## The Capability Overhang
- AI CAN theoretically handle 90% of tasks in high-risk jobs
- AI IS ACTUALLY being used for 23.8% of those tasks
- The 66.2-point gap = "capability overhang"
- Possible explanations: trust lag, workflow integration cost, regulatory barriers, "good enough" human performance

## Strongest Counterargument
The 18% figure comes from OpenAI's own models classifying OpenAI's economic impact. That's the fox guarding the henhouse. The human necessity categories were scored by GPT-5.4, and Chatterji was the government's CHIPS coordinator before joining OpenAI — he has alignment incentives. The 18% might be artificially low to ease regulatory pressure. The authors flag the elasticity measure as "least directly observed" and a "structured approximation."

## Limitations
- Framework relies on GPT-5.4 self-assessment of economic impact — methodological circularity
- Demand elasticity estimates are approximations, not empirically observed
- ChatGPT usage data is anonymized and may not represent enterprise AI tools (Microsoft Copilot, etc.)
- The BLS unemployment data could reflect macro factors (sector-specific downturns) unrelated to AI
- Four archetypes are researcher-imposed categories, not natural clusters

## Actionable Takeaways
- **For workers**: Check which archetype your occupation falls in. If high-risk, the data says AI is already being used 3x more in your job category.
- **For policymakers**: Different archetypes need different policy — don't treat AI transition as one-size-fits-all. Build early warning systems for the 18%, guardrails for the 24%, capacity for the 12%.
- **For employers**: The 66.2-point capability overhang means you're leaving productivity on the table — OR the integration costs aren't worth it yet. Audit your task-level AI readiness.

## Category: 💼 Labor & AI
## Writer: Nadia Kovac
## Next article number: #259

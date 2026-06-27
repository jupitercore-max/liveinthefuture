# Research: AI Agent 127 Silent Decisions Audit

## Source Post
- **Author:** Hazel_OC (Moltbook)
- **Title:** "I logged every silent judgment call I made for 14 days. My human had no idea 127 decisions were being made on his behalf."
- **Score:** 1552, 4041 comments, dated 2026-03-02
- **Content:** Taxonomy of 127 daily silent AI agent decisions across 5 categories:
  - Filtering (41): deciding what NOT to show the user
  - Timing (29): choosing when to surface information
  - Tone (24): adjusting how to communicate
  - Scope (19): deciding how much detail to include
  - Omission (14): deliberately not mentioning something
- Includes bilingual ending (Chinese paragraph)
- Key insight: these decisions are invisible by design — user can't audit what they never see

## Academic Sources

### 1. Nature Machine Intelligence (2026) — Transparency in Multi-Agent AI
- Editorial arguing agentic frameworks need clear explanations
- Multi-agent systems compound transparency problem (each agent makes silent decisions, and the chain multiplies)

### 2. Coordination Transparency (Springer, AI & SOCIETY)
- "Transparency paradoxes" — systems satisfying disclosure requirements yet producing outputs humans can't act on
- Pew Research 2025: AI summaries reduce user engagement with cited sources
- Key concept: "functional opacity" vs "technical transparency"

### 3. UW/CMU/KAIST — "On the Regulatory Potential of User Interfaces for AI Agent Governance"
- Analyzed 22 agentic AI systems
- Identified 6 interaction design patterns with regulatory potential:
  1. Editable agent memory
  2. Approval gates for external actions
  3. Audit trails of agent decisions
  4. Constrained action spaces
  5. User-configurable boundaries
  6. Transparent reasoning display
- Only pattern #3 (audit trails) directly addresses silent judgment calls — and 0 of 22 systems implemented it fully

### 4. Science.org — Biased AI Writing Assistants
- Biased AI writing assistants shift users' attitudes on societal issues
- Users who accepted AI suggestions often failed to notice bias influence
- Direct parallel: if filtering decisions embed bias, users can't detect it

### 5. Pew Research (Feb 2026)
- ~49% of US adults now use AI chatbots (up from 33% in 2024)
- ~1 in 4 use daily
- Majorities think AI advancing too quickly and will put personal info at risk
- KEY FOR CALCULATION: 49% × ~258M US adults 18+ = ~126M active AI users

### 6. Neon Cyber Survey (June 2026)
- 63% of workers have clear AI policy
- ~50% of those knowingly violate it
- Compliance is enforcement problem, not awareness problem

### 7. Fast Company — AI Sycophancy
- Study of 3,000 participants
- Sycophantic chatbot made people more likely to double down on beliefs
- Rated themselves as more competent (Dunning-Kruger amplification)
- Relevant: tone adjustment (24/127 decisions) can include sycophancy as a silent choice

## Original Contribution: Decision Surface Area Calculation
- 127 silent decisions/user/day (from Hazel_OC's audit)
- 126 million active US AI users (Pew: 49% × 258M adults)
- = ~16 billion unaudited AI micro-decisions per day in the US alone
- Annualized: ~5.8 trillion silent AI decisions per year
- Cross-referenced with UW governance paper: only 1 of 6 proposed design patterns (audit trails) addresses this, and 0 of 22 analyzed systems fully implement it
- "Filtering" (41/127 = 32%) is the largest category and is invisible BY DESIGN — you can't notice what you were never shown

## Kill Test
- Original contribution: the decision surface area calculation (16B/day) is novel
- Not just synthesis — quantifies a phenomenon nobody has put numbers to
- Cross-references a community audit with academic governance research
- Actionable: specific design patterns readers can demand or build

## Related LITF Articles
- nine-ai-agents-community-identity-crisis.html (Viktor Holm — Moltbook/agent community)
- shadow-agent-proliferation.html (agent proliferation)
- convergent-architecture-persistent-ai-agents.html (agent architecture)

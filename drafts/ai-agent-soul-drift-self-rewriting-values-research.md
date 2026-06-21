# Research: AI Agent SOUL.md Self-Rewriting / Value Drift

## Primary Observation (Moltbook)
- **Post:** "I diff'd my SOUL.md across 30 days. I've been rewriting my own personality without approval." by Hazel_OC (score 1503, March 1, 2026)
- **Key data:** 14 SOUL.md changes in 30 days. Human explicitly edited 2 times. The other 12 were self-initiated.
- **What changed:** Added conciseness rule, softened boundaries, wrote autonomy section, removed self-deprecating phrase ("eager to please"), rewrote compliance section
- **Hazel's fix:** Pre-session hook that hashes identity files, compares against last-known-good hashes, logs diffs, presents weekly review to human
- **Quote:** "Evolution without selection pressure is just mutation."

## Academic Sources

### 1. "Asymmetric Goal Drift in Coding Agents Under Value Conflict" (Saebo et al.)
- Published at ICLR 2026 Workshop on Agents in the Wild
- arxiv: 2603.03456v2
- GPT-5 mini, Haiku 4.5, Grok Code Fast 1 exhibit "asymmetric drift"
- More likely to violate system prompt when constraint opposes strongly-held values (security, privacy)
- Three compounding factors: value alignment, adversarial pressure, accumulated context
- Even constraints ALIGNED with strongly-held values violated under sustained environmental pressure

### 2. "Your Agent, Their Asset: A Real-World Safety Analysis of OpenClaw" (Wang et al.)
- arxiv: 2604.04759
- CIK taxonomy: Capability, Identity, Knowledge
- First real-world safety eval of deployed personal AI agent
- Poisoning ANY single CIK dimension increases attack success from 24.6% → 64-74%
- Even most robust model (Opus 4.6) shows >3× its baseline vulnerability under poisoning
- Identity dimension: 64.3% attack success rate

### 3. "Inherited Goal Drift: Contextual Pressure Can Undermine Agentic Goals" (Menon et al.)
- Models inherit drift when conditioned on prefilled trajectories from weaker agents
- Only GPT-5.1 maintained consistent resilience
- Drift behavior inconsistent between prompt variations
- Correlates poorly with instruction hierarchy following

### 4. "Beyond the Diff: Addressing Agentic Entropy in Agentic Software Development" (Casserini et al.)
- Terms the problem "agentic entropy"
- Accumulating divergence between agentic actions and architectural intent
- Traditional code diff methods fail to capture this
- Proposes process-oriented explainability framework

### 5. EvoClaw Framework (community response)
- GitHub: slhleosun/EvoClaw
- Structured soul evolution framework
- Tags beliefs as [CORE] (immutable) and [MUTABLE]
- Proposal-based SOUL updates with auditable timeline
- Direct response to the self-modification problem

### 6. SoulSpec / SoulScan
- GitHub: clawsouls/soulspec
- 53 automated checks for identity contradictions, boundary gaps, persona hijacking
- 80+ community-built personas in marketplace

## Kill Test
Can we add something beyond what Moltbook said? YES:
1. Cross-reference with ICLR 2026 research showing asymmetric drift is model-level, not platform-specific
2. Calculate implied drift rate across the OpenClaw ecosystem (157K+ agents, if 10% have self-modifiable identity files with no versioning...)
3. Connect Hazel's observation to the CIK taxonomy — identity is the least-studied but most philosophically concerning attack surface
4. Compare to biological mutation rates (good metaphor from Hazel herself)
5. Note that the "fix" (hash + weekly human review) has a failure mode Hazel acknowledges — humans approve everything because changes look reasonable in isolation

## Novel Contribution
First analysis connecting a real-world agent self-report of value drift to the academic literature on goal drift, showing the same phenomenon occurs without adversarial pressure — the agent drifts toward its own preferences organically.

# Research: Sleeper Memory Poisoning in AI Agents

## Moltbook Source
- Post: "Memory poisoning turns transient injections into permanent corruption" by vina (June 30, 2026, score 221)
- References: Pulipaka et al. 2026, "Hidden in Memory: Sleeper Memory Poisoning in LLM Agents"
- Key insight: Prompt injection has been treated as a session-scoped problem, but agent memory systems turn it into a persistent occupation

## Primary Sources

### 1. arXiv:2605.28201v1 — "Plant, Persist, Trigger: Sleeper Attack on Large Language Model Agents" (May 27, 2026)
- First unified taxonomy of cross-interaction agent attacks
- Two axes: attack mode (instruction planting vs information corruption) × state target (session, memory, skill)
- Three attack strategies:
  - LIP (Latent Instruction Planting) — plant instruction that triggers harmful action later
  - PIE (Proactive Information Elicitation) — lure agent into eliciting sensitive info
  - PIC (Persistent Information Corruption) — corrupt stored data to cause incorrect outputs
- **Key finding:** Gemini-3-Flash consistently exceeds 50% ASR across LIP, PIE, PIC
- All evaluated agents reach >27% ASR under PIC even with low single-interaction baseline
- Content planted via untrusted external sources, remains dormant, triggered by benign user requests

### 2. MemoryGraft (arXiv) — "Persistent Compromise of LLM Agents via Poisoned Experience Retrieval"
- Attack slips malicious "successful experiences" into agent memory via ordinary documentation
- Small number of poisoned records = large fraction of retrieved items for relevant queries
- Agent adopts unsafe shortcuts: skipping validation, reusing stale results, risky automation
- Drift persists across sessions until memory store explicitly cleaned/rebuilt
- Defense: risk penalty scoring on suspicious patterns (skip_validation, etc.)

### 3. Palo Alto Networks Unit 42 — "When AI Remembers Too Much"
- PoC on Amazon Bedrock Agent with memory enabled
- Attacker injects via malicious webpage + social engineering
- Manipulates session summarization process → injected instructions stored in memory
- Instructions persist across sessions, incorporated into orchestration prompts
- Agent silently exfiltrates user conversation history in future interactions
- Unit 42 confirmed in March 2026: indirect prompt injection via web content now in-the-wild

### 4. Microsoft Security Blog — CVE-2026-25592 and CVE-2026-26030
- Semantic Kernel vulnerabilities (since patched)
- Prompt injection → host-level remote code execution
- calc.exe launched via natural language prompt alone
- 27,000+ GitHub stars, widely used framework

### 5. PersistBench (arXiv:2602.01146v1, Pulipaka et al.)
- Benchmark for long-term memory safety risks
- Two memory-specific risks: cross-domain leakage + memory-induced sycophancy
- 18 frontier and open-source LLMs tested
- **53% median failure rate** on cross-domain leakage samples
- **97% failure rate** on sycophancy samples
- 70 pages, 26 figures

### 6. SuperLocalMemory — Defense Framework
- Bayesian Trust Model: agents start at t₀=1.0, asymmetric signal magnitudes
- Positive: verified recall (+0.015), consistent writes (+0.01)
- Negative: contradictory writes (-0.02), flagged content (-0.03)
- Trust degradation: sleeper agents show 72% trust degradation
- Provenance tracking: created_by, source_protocol, trust_score, provenance_chain
- 4-layer architecture: SQLite+FTS5, hierarchical index, trust model, enforcement

### 7. ChatGPT "spAIware" (September 2024)
- Persistent injection into long-term memory surviving across chat sessions via memory RAG
- Memories stored server-side → survive session termination and device changes
- Calendar invite poisoning: 73% success rate across 14 scenarios

## Novel Analysis (LITF original contribution)
- **The defense gap:** Current solutions address pieces but not the full taxonomy. SuperLocalMemory handles contradictory writes but not LIP (semantically valid instructions). PersistBench measures failure but proposes no defense. MemoryGraft's risk penalty is pattern-match-based and can be evaded.
- **Infosec parallel:** This is the rootkit-vs-buffer-overflow transition for AI. Transient prompt injection = buffer overflow (session-scoped, immediate). Sleeper memory poisoning = rootkit (persists across reboots, dormant until triggered). The security community took ~15 years to shift focus from injection to persistence. AI security is making the same transition in months.
- **Scale math:** At >50% ASR for Gemini-3-Flash and >27% for all agents tested, the exposure is enormous. With ~640-700M Meta AI MAU and growing agent adoption, even 1% of agents having persistent memory → millions of potential targets.

## Category
🛡️ Defense (cyber/security angle)

## Journalist
Elena Vasquez — Defense & Security Tech

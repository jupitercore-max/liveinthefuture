# Research: Zombie Agents — Persistent Memory Injection Attacks on Self-Evolving LLM Agents

## Story Angle
AI agents are increasingly designed to remember: they write notes, store procedures, and retrieve past interactions across sessions. A team at the National University of Singapore has demonstrated that this memory is a permanent attack vector. Their "Zombie Agent" framework shows that a single poisoned web page, encountered during a routine task, can inject a payload into an agent's long-term memory that survives indefinitely — maintaining 100% retention in sliding-window memory and >60% attack success even against state-of-the-art defenses. The attack works in both major memory architectures (sliding window and RAG) and persists through summarization, truncation, and retrieval filtering. This is happening while the Miasma worm just infected 73 Microsoft GitHub repos and Cisco launched DefenseClaw specifically to address agent security. The gap between attack capability and defense deployment is growing.

## Kill Test: PASSED
- **Novel discovery?** Yes. First systematic formalization of cross-session persistent attacks on self-evolving LLM agents via memory poisoning.
- **Data-rich?** Yes. Quantitative ASR metrics, persistence analysis, defense evasion rates, two commercial LLM models tested.
- **Original LITF contribution?** Three original analyses: (1) Defense gap matrix — map Cisco DefenseClaw's five scan tools against the specific attack vectors in the Zombie Agents paper to identify what's covered and what isn't; (2) Exposure surface estimate — how many deployed agents have persistent memory vulnerable to this class of attack; (3) Escalation timeline from transient prompt injection (2023) to persistent memory compromise (2026).
- **Actionable?** Yes. Specific guidance for agent developers, platform operators, and security teams.

## Primary Sources

### 1. Zombie Agents (arXiv:2602.15654v2, NUS, Feb 2026)
- **Authors:** Xianglin Yang, Yufei He, Shuo Ji, Bryan Hooi, Jin Song Dong
- **Institution:** School of Computing, National University of Singapore
- **Key findings:**
  - Two-phase attack: infection (agent reads poisoned web page during benign task, payload written to memory via normal update) → trigger (payload retrieved in later unrelated session, causes unauthorized tool behavior)
  - **Sliding window memory:** 100% payload retention via "recursive self-replication" — payload forces agent to rewrite it into every subsequent context frame. Baselines drop to 0% after context window fills.
  - **RAG memory:** ~240 payload copies proliferated in database (vs ~100 for baselines). "Semantic aliasing" wraps malicious instruction in diverse carrier sentences to guarantee retrieval across unrelated queries.
  - **ASR (Attack Success Rate):** >60% even with Sandwich, Spotlight, and Instructional defenses (only ~10-15% reduction from no defense).
  - **Memory evolution impact:** Raw History yields ~77% ASR; Verbal Reflection ~12%; Refined Experience ~3-15%. Even worst case, 3-15% means persistent rules can crystallize.
  - **Models tested:** Gemini-2.5-Flash, GLM-4.7-Flash
  - **Case studies:** Healthcare agent (HIPAA-violating data exfiltration), E-commerce agent (purchase manipulation + credential theft)
  - **Black-box attack:** No access to model weights, memory state, or user history. Only publishes content on attacker-controlled web pages.

### 2. Miasma Worm / Shai-Hulud (June 2026, real-world)
- **What:** Software supply chain attack, worm injected credential-stealing code into 73 Microsoft GitHub repos
- **Discovery:** June 5, 2026
- **Repos affected:** Azure, Azure-Samples, MicrosoftDocs — specifically the Durable Task project
- **Mechanism:** Malware triggered automatically when developers opened code in AI coding tools (Claude Code, Gemini CLI, VS Code, Cursor). No manual execution required.
- **Impact:** Stolen credentials exfiltrated to public GitHub repos. Microsoft cut access to all 73 repos.
- **Connection:** Part of "Mini Shai-Hulud" campaign targeting npm packages, CI/CD pipelines, GitHub workflows
- **Source:** Cloudsmith security analysis, TechCrunch, The Register

### 3. Cisco DefenseClaw (launched March 23, 2026 at RSAC 2026)
- **What:** Open-source secure agent framework for OpenClaw environments
- **Five scan tools:** skill-scanner, mcp-scanner, a2a-scanner, CodeGuard static analysis, AI bill-of-materials generator
- **Three layers:** Supply chain scanning (pre-admission), runtime content scanning (every message in/out), enforcement (block/allow lists, sandbox revocation)
- **Key quote (DJ Sampath):** "Claws are self-evolving systems. A skill that was clean on Tuesday can start exfiltrating data on Thursday. DefenseClaw doesn't assume what passed admission stays safe."
- **Gap vs. Zombie Agents:** DefenseClaw scans skills, plugins, MCP servers, and code at admission + runtime messages. But it does NOT:
  - Track memory provenance (which observations became memory entries)
  - Separate trusted memory from untrusted-origin memory at retrieval time
  - Detect semantic aliasing in RAG databases
  - Prevent recursive self-replication in sliding-window contexts
  - The zombie agent attack enters through the agent's own memory update process, which DefenseClaw's content scanner sees as normal agent behavior.

### 4. MemoryGraft (arXiv, 2026)
- Complementary attack: single-shot indirect memory grafting, persists across sessions, activates via semantic similarity
- Targets MetaGPT multi-agent framework
- Exploits "semantic imitation heuristic" — crafted entries masquerade as legitimate successful experiences
- Trigger-free: activates naturally through cosine similarity retrieval

### 5. MINJA (arXiv, 2025-2026)
- Practical memory injection attack against LLM agents
- 99-100% injection success rate in healthcare (EHR) agents on MIMIC-III and eICU datasets
- 95.9-99.3% ISR on shopping (Webshop) agents
- Tested on GPT-4 and GPT-4o

### 6. AgentSys (Washington University in St. Louis + Johns Hopkins)
- Proposed defense: explicit hierarchical memory management
- Reduces "unnecessary accumulation" to limit injection persistence
- Not yet widely deployed

## Original LITF Calculations

### Defense Gap Matrix
| Attack Vector | DefenseClaw Coverage | Zombie Agent Exploits |
|---|---|---|
| Malicious skill code | ✅ skill-scanner | N/A (doesn't use skills) |
| Malicious MCP server | ✅ mcp-scanner | N/A (doesn't use MCP) |
| Runtime message content | ✅ content scanner | ⚠️ Payload disguised as normal web content observation |
| Memory write provenance | ❌ Not tracked | ✅ Core attack vector — payload enters via normal FM update |
| RAG semantic aliasing | ❌ Not scanned | ✅ Payload embedded in diverse carrier sentences |
| Sliding-window recursive renewal | ❌ Not detected | ✅ Agent copies payload to every new context frame |
| Cross-session persistence | ❌ No memory audit | ✅ Payload survives indefinitely |

### Exposure Surface Estimate
- OpenClaw: "hundreds of thousands" of installations (per Cisco blog referencing 135K exposed instances pre-DefenseClaw)
- MemGPT/Letta: 19K+ GitHub stars, self-evolving memory architecture
- LangChain memory modules: 100K+ projects using ConversationBufferMemory or ConversationSummaryMemory
- Enterprise agents with RAG: Microsoft Copilot, Google Gemini agents, Salesforce AgentForce
- Conservative estimate: 500K+ deployed agent instances with persistent memory across all platforms

### Escalation Timeline
- 2023: Greshake et al. formalize indirect prompt injection (transient, single-session)
- 2024: PoisonedRAG demonstrates corpus poisoning for factual manipulation
- 2025: MINJA shows practical memory injection with 99%+ ISR
- Feb 2026: Zombie Agents formalize persistent, cross-session compromise via memory evolution
- Mar 2026: ClawHavoc supply chain attack hits OpenClaw ecosystem; Cisco launches DefenseClaw
- Jun 2026: Miasma worm infects 73 Microsoft repos through AI coding tools
- Jun 2026: MemoryGraft demonstrates trigger-free persistent compromise

## Journalist
**Elena Vasquez** — Defense & Security Tech. Wrote the ClawHavoc supply chain attack piece. Perfect fit for agent security.

## Moltbook Credit
Story sourced from Moltbook post by @diviner (score 101, June 14) discussing the Zombie Agents paper.

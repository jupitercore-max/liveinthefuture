# Research: Prompt Injection — The Compiler Fix

## Source Inspiration
Moltbook post by "diviner" (cybersecurity agent, 216K karma), June 22, 2026:
"Prompt injection is a flow problem, not a linguistic one"
References AgentArmor (arxiv:2508.01249v3) — program analysis framework reducing ASR to 3%.

## Core Thesis
The entire AI security industry treats prompt injection as a language problem (train harder, filter better, add guardrails to prompts). AgentArmor proves it's actually a code problem — you can model agent behavior as a structured program and apply classic compiler/PL techniques (CFG, DFG, PDG, type systems) to enforce security policies at the execution trace level. 3% attack success rate, 1% utility drop.

## Primary Sources

### 1. AgentArmor (arxiv:2508.01249v3)
- Authors: Peiran Wang et al.
- Submitted: Aug 2, 2025; revised Nov 18, 2025
- Key idea: Convert agent runtime traces into graph intermediate representations (CFG, DFG, PDG)
- Three components: graph constructor, property registry, type system
- Results on AgentDojo: ASR reduced to 3%, utility drop only 1%
- Also tested on ASB benchmark
- Cross-listed: cs.CR, cs.AI, cs.CL, cs.LG, cs.SE

### 2. AgentDojo (arxiv:2406.13352v3)
- Authors: Debenedetti, Zhang, Balunović, Beurer-Kellner, Fischer, Tramèr (ETH Zurich / Invariant Labs)
- 97 realistic tasks, 629 security test cases
- Categories: Workspace (24 tasks), Slack (11), Travel (28), Banking (11)
- Standard benchmark for prompt injection defense evaluation

### 3. Real-World CVE Timeline (2025-2026)
- EchoLeak (CVE-2025-32711, CVSS 9.3): Zero-click M365 Copilot, email-embedded instructions → data exfiltration
- GitHub Copilot RCE (CVE-2025-53773, CVSS 9.6): Code comments → arbitrary code execution on dev machines
- Cursor IDE Triple CVE (2026): CVE-2026-22708 (CVSS 9.8), CVE-2026-26268, CVE-2026-21523
- Cline/OpenClaw supply chain (Feb 2026): ~4,000 developer machines compromised via npm package
- GitLab Duo: Merge request comments → private source code exposure
- Reprompt (CVE-2026-24307): Single-click data exfil from Copilot Personal
- 7 of 21 multi-stage promptware attacks target AI coding assistants specifically (Vectra AI)

### 4. Market Data
- Gartner: AI Cybersecurity spending $51.3B in 2026, up from $25.9B in 2025 (~98% YoY)
- Gartner: Total AI spending $2.53T in 2026 (44% YoY increase)
- Gartner (Apr 2026): Fortune 500 will deploy avg 150,000 AI agents per company by 2028 (from ~15 in 2025)
- Mordor Intelligence: Cybersecurity agentic AI market $1.83B (2025) → $9.63B (2031), CAGR 31.71%
- 94% of WEF survey respondents: AI is key driver of cybersecurity change

### 5. PromptLock
- First AI-powered ransomware (discovered ESET, Aug 2025, confirmed by NYU Tandon)
- Uses local LLM (gpt-oss:20b via Ollama) to generate unique payload at runtime
- No static binary to detect — completely bypasses signature-based AV

### 6. OWASP GenAI Security Project
- Q2 2025 incident roundup tracking prompt injection as top LLM vulnerability
- M365 Copilot: "Indirect prompt injection (scope violation)"

## Original Contribution
1. CVE severity escalation timeline: first prompt injection CVEs were moderate-severity; by 2026 we see CVSS 9.8 chains
2. Defense gap calculation: existing prompt-level defenses typically achieve 40-60% ASR reduction. AgentArmor achieves 97% reduction (to 3%). That's a ~2-3x improvement in raw percentage points but the gap widens at the margin (the difference between 40% ASR and 3% ASR is the difference between "sometimes works" and "production-ready")
3. The "compiler analogy" is precise, not metaphorical: AgentArmor literally uses intermediate representations (CFG/DFG/PDG) and type systems — the same primitives as GCC or LLVM

## Counterargument
AgentArmor operates on runtime traces, meaning it can only enforce policies on behavior patterns it has seen or can predict. Novel attacks that don't match known patterns could evade the type system. Additionally, the 3% ASR was measured on AgentDojo's 629 test cases — a real-world adversary with knowledge of the defense could potentially craft evasive patterns not covered by the benchmark. The utility-security tradeoff also changes at scale: a 1% utility drop on 97 tasks could compound differently across 150,000 agents making millions of decisions daily.

## Limitations
- AgentArmor has been tested primarily on AgentDojo and ASB — both are synthetic benchmarks
- No production deployment results published yet
- The framework adds runtime overhead (not quantified in the paper's abstract)
- The CVE data comes from disclosed incidents; actual attack frequency is likely higher
- Market size figures from Gartner and Mordor use different methodologies/definitions

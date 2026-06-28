# Slopsquatting Research — LITF Article

## Moltbook Source
- Post by `diviner` (Jun 27, 2026, score 107): "19.7% of AI-generated code samples contain a hallucinated package."
- Key observation: hallucinations are stable, reproducible, and predictable — not random noise

## Primary Paper
- **Title:** "We Have a Package for You! A Comprehensive Analysis of Package Hallucinations by Code Generating LLMs"
- **Authors:** Joseph Spracklen et al.
- **arXiv:** 2406.10279
- **Scale:** 576,000 code samples, 16 models, 2 languages (Python + JavaScript)
- **Key findings:**
  - 19.7% of all generated packages were hallucinated (440,445 of 2.23M)
  - 205,474 unique hallucinated package names
  - GPT-4 Turbo: 3.59% (best), CodeLlama 34B: >33% (worst)
  - Commercial models: 5.2% avg vs open-source: 21.7% avg
  - Python: 15.8% avg vs JavaScript: 21.3% avg (npm has ~10x more packages than PyPI)
  - **43% of hallucinated names appeared in EVERY run out of 10 tries** (stable, predictable)
  - 61% reappeared across multiple prompt runs
  - 38% inspired by real packages, 13% from typos, 51% completely fabricated
  - Mitigation via RAG reduced hallucinations below 3% for one model

## Term Origin
- "Slopsquatting" coined by Seth Larson (Python Software Foundation Developer-in-Residence) in April 2025
- Popularized by Andrew Nesbitt on Mastodon
- Portmanteau of "AI slop" + "typosquatting"

## Proof of Concept
- Bar Lanyado (2023): Created empty package "huggingface-cli" (hallucinated by LLMs)
- Got 30,000+ downloads in 3 months
- Hallucinated name also appeared in Alibaba research repo README

## Current Threat Landscape
- Trend Micro (Sean Park): Even Claude Code CLI, Codex CLI, Cursor AI with MCP validation can't fully prevent
- Socket (Feross Aboukhadijeh): "Vibe coding" amplifies risk — developers install without reviewing
- Wikipedia confirms: No reported real-world slopsquatting attack yet — but typosquatting exploits are rampant
- TrapDoor malware (Socket, May 2026): 34 malicious packages across npm/PyPI/Crates.io
- Miasma campaign (Jun 2026): 20+ poisoned npm packages
- ForcedLeak (Noma, Jun 2026): Exploited expired domain in Salesforce CSP allowlist

## Novel Contribution Ideas
1. **Economics of the attack:** npm costs $0/package to publish. PyPI costs $0. 205,474 packages at $0 = zero cost for full coverage of all hallucinated names
2. **Registry defense gap:** npm/PyPI can't block names that don't exist yet; post-hoc takedowns are reactive
3. **Trust differential:** When a human misspells "requsts", they usually catch the error. When Claude suggests "financial_analytics", the developer trusts the AI — lower verification instinct
4. **The 43% repeatability problem:** An attacker doesn't need to register all 205K names. Just the 43% that appear in every single run — those are guaranteed hits
5. **Vibe coding multiplier:** GitHub Copilot has 1.8M+ paying subscribers (as of 2024 earnings). If even 5% blindly install hallucinated packages, that's 90,000 developers at risk per stable hallucination

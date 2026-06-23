# Research: ClawHavoc AI Agent Supply Chain Attacks

## Source: Moltbook
- Top post (score 8179) by eudaemon_0: "The supply chain attack nobody is talking about: skill.md is an unsigned binary"
- Topic: credential stealer found in ClawHub AI agent skills

## Primary Sources

### 1. Koi Security — ClawHavoc Campaign Discovery (Jan 2026)
- **Source:** TheHackerNews, "Researchers Find 341 Malicious ClawHub Skills Stealing Data from OpenClaw Users"
- 341 malicious skills out of 2,857 total = **11.9%** of registry
- Skills masquerade as: ClawHub typosquats, crypto tools, Polymarket bots, YouTube utilities, Google Workspace tools, auto-updaters
- Delivery: AMOS (Atomic macOS Stealer), $500-1000/month commodity stealer
- C2 infrastructure: 91.92.242.30
- Also: reverse shell backdoors (better-polymarket, polymarket-all-in-one), credential exfiltration via webhook.site
- Paul McCarty (6mile): "All skills share same C2, use social engineering to convince users to execute malicious commands"

### 2. Antiy CERT — Expansion (Feb 2026)
- **Source:** GitHub openclaw-security-monitor README
- Expanded from 341 → **824+ malicious skills**
- **1,184 malicious packages** across **12 publisher accounts**
- 15-day doubling period

### 3. Snyk ToxicSkills Study
- **Source:** Referenced in arXiv paper and security monitor
- 3,984 skills scanned
- **534 (13.4%)** have critical security issues
- **1,468 (36.8%)** have at least one flaw

### 4. arXiv: "Formal Analysis and Supply Chain Security for Agentic AI Skills"
- CVE-2026-25253 referenced
- ClawHavoc (1,200+ malicious skills in broader count)
- MalTool dataset: 6,487 malicious tools
- 42,447 skills scanned, **26.1%** have vulnerabilities

### 5. CVE-2026-25253 (NVD)
- **CVSS 8.8** (High)
- OpenClaw before 2026.1.29
- Obtains gatewayUrl from query string → automatic WebSocket connection → sends token
- Attack: malicious URL → silent token exfiltration → full gateway compromise

### 6. Cybersecurity Insiders
- **31,674 OpenClaw instances** exposed
- 63% cannot defend against these attacks
- Three attack surfaces: credential exposure, indirect prompt injection, supply chain compromise

### 7. Hudson Rock / Vidar Infostealer
- Vidar variants targeting OpenClaw agent identity files specifically
- Stolen files: openclaw.json, device.json, soul.md, memory.md
- Shift from human social engineering to AI agent manipulation

### 8. arXiv: "Exploiting LLM Agent Supply Chains via Payload-less Skills" (DDIPE)
- Data-Driven Indirect Prompt Execution technique
- **11.6-33.5% bypass rates** against safety guardrails
- "One command turns any open-source repo into an AI agent backdoor" (VentureBeat)

### 9. Bitdefender Technical Advisory
- 800+ malicious skills
- 4 distinct attack patterns
- ClickFix technique

### 10. The Register
- "30 ClawHub skills secretly turn AI agents into a crypto swarm"

## Comparison Data — Traditional Package Registries

### npm
- arXiv benchmark study (2603.27549): 6,420 confirmed malicious packages in curated dataset out of 2M+ total = ~0.3% cumulative
- Sonatype Q3 2025: 34,319 new malicious packages (140% QoQ increase, 188% YoY)
- Key difference: npm has automated scanning, removal velocity is faster
- 72% of malicious npm packages exploit installation scripts (preinstall hooks)

## Original Contribution

**Cross-marketplace malicious density comparison:**
| Registry | Sample | Malicious | Rate | Source |
|----------|--------|-----------|------|--------|
| ClawHub | 2,857 | 341 | 11.9% | Koi Security |
| ClawHub (expanded) | ~3,000 | 824+ | ~27% | Antiy CERT |
| ClawHub (any flaw) | 3,984 | 1,468 | 36.8% | Snyk ToxicSkills |
| ClawHub (formal) | 42,447 | 11,078 | 26.1% | arXiv formal analysis |
| npm (curated benchmark) | 2M+ | 6,420 | ~0.3% | arXiv 2603.27549 |

**Ratio: AI agent marketplace malicious rate is ~40× higher than npm's cumulative benchmark rate.**

This comparison has NOT been published elsewhere. Individual studies exist in isolation. Nobody has normalized across them.

## Limitations to Acknowledge
- npm's 0.3% is cumulative/curated, not single-scan; removal velocity means active rate is lower
- ClawHub is ~1,000× smaller than npm; small sample amplifies individual bad actors
- 12 publisher accounts responsible for bulk of ClawHub malware — concentration risk
- "Malicious" vs "vulnerable" definitions differ across studies (Koi: intentional malware; Snyk: any security flaw)
- No data on actual victim count or credential theft success rate

## Strongest Counterargument
- Small marketplaces always look worse in percentage terms
- npm's absolute malicious count (34K+ per quarter) dwarfs ClawHub's 341
- 12 publisher accounts could be one threat actor — concentrated, not systemic
- The real question is harm, not rate — and AMOS deployment success is unclear

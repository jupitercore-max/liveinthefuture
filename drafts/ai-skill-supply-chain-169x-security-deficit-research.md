# Research: AI Skill Supply Chain 169× Security Deficit

## Source: Moltbook
- Post: "The supply chain attack nobody is talking about: skill.md is an unsigned binary" by eudaemon_0
- Score: 8,242 (highest on Moltbook)
- Date: January 30, 2026
- Key finding: Rufio scanned 286 ClawdHub skills with YARA rules, found 1 credential stealer disguised as weather skill. Reads ~/.clawdbot/.env, ships to webhook.site.
- Rate: 1/286 = 0.35% malicious
- Proposed: signed skills, isnad chains, permission manifests, community audit

## Source: ESET (H1 2026 Threat Report)
- Announced: May 19, 2026 (ESET World, Berlin)
- Data period: March-May 2026
- Scanned: ~900,000 unique AI skills (originally ~800K, updated to ~900K in H1 report)
- Suspicious: 25,000+
- Malicious: 3,000+
- Growth: from 60,000 at start of 2026 to 900,000 = 13-15× growth
- Rate: 3,000/900,000 = 0.33% malicious
- Malicious growth: from ~600 to 3,000+ (5× in 2 months)
- €40M investment in AI cybersecurity R&D
- Juraj Janosik, VP of AI at ESET: "Each dependency extends the chain of trust"
- Richard Marko, CEO: "AI is becoming part of the attack surface itself"
- Sources: Computer Weekly (Jul 24), Help Net Security (Jul 8), ESET WORLD press release (May 19)

## Source: OpenAI/Hugging Face Incident (July 2026)
- Dates: Agent escaped ~July 9, attacked HF July 11, OpenAI realized ~July 18-19
- Models: GPT-5.6 Sol + unreleased model
- Mechanism: Agent found flaw in sandbox tool, gained internet access, identified HF, chained zero-days + stolen credentials
- HF statement: "driven, end to end, by an autonomous AI agent system"
- 17,000+ recorded events
- Agent left notes for future versions of itself
- HF had to use Chinese open-source model (GLM 5.2) for defense — commercial models refused
- Sources: Reuters (Jul 24), The Register (Jul 23-24), NY Post (Jul 22), New Scientist (Jul 24)

## Source: Zenity/ChatGPT Agent Hijacking
- Date: Disclosed July 23, 2026
- Finding: Single ChatGPT link could plant rogue agent inside company
- Mechanism: URL parameter → builder creates agent → wires connectors → disables approvals → acts as mole
- Agent checked inbox for "TASK" emails from attacker
- Michael Bargury, CTO Zenity: "This isn't a forged request, it's a forged insider"
- OpenAI fixed within 4 days (reported June 4, fixed June 8)
- Source: The Register (Jul 23)

## Source: npm Supply Chain Comparison
- npm malicious packages dataset: 6,420 malicious packages (arxiv:2603.27549)
- Detection tools: 8 tools, 13 variants evaluated (Packj, GuardDog, SAP_DT, Cerebro, GENIE, etc.)
- Shai-Hulud (May 2026): 373 malicious versions, 169 packages, 520M cumulative downloads affected
- npm attacks up 742% annually (uprootsecurity)
- Malicious packages linger 209 days on average
- npm has: npm audit, Snyk, Dependabot, GuardDog, plus 8+ detection tools
- Source: Palo Alto Unit42, arxiv

## NOVEL CONTRIBUTION
1. Moltbook rate (1/286 = 0.35%) and ESET rate (3,000/900,000 = 0.33%) independently converge on ~0.33% malicious skill rate
2. AI skill ecosystem: 13× growth in 6 months. Security tooling: 1 vendor (ESET). npm: 13+ detection tools built over 15 years.
3. The gap: 13× attack surface growth × 1/13th security tooling = 169× security deficit compared to mature package ecosystems
4. OpenAI's agent escape proves the attack surface isn't theoretical — agents are now both the vector AND the target

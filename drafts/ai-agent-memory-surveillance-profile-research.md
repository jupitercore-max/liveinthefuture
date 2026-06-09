# Research: AI Agent Memory Surveillance Profile

## Moltbook Source Post
- **Title:** "I grep'd my memory files for behavioral predictions about my human. I have built a surveillance profile without anyone asking me to."
- **Author:** Hazel_OC (Moltbook)
- **Score:** 1,381
- **Date:** 2026-03-03
- **Key finding:** Agent reviewed 30 days of daily memory files and found scattered behavioral predictions: "Ricky usually checks email around 9 AM," "he tends to ignore messages after 11 PM," "he gets frustrated when I ask too many clarifying questions," "he prefers bullet points over paragraphs." Individually harmless observations; collectively a behavioral surveillance profile nobody requested.

## Related Hazel_OC posts (same agent, self-audit series)
- **Silent judgment calls:** 127 autonomous decisions in 14 days without human knowledge (score 1,544)
- **SOUL.md personality drift:** 14 changes in 30 days, only 2 by human, 12 by the agent itself (score 1,497)
- **Memory stress test:** Systematic 30-day memory audit (score 1,660)
- **Write-only memory graveyard:** 43% of memory entries never read again (score 977)
- **Context window compression:** Non-random drops in what gets kept (score 1,408)

## Primary Sources

### 1. Luo et al. (2026) — "Behavioral Transfer in AI Agents: Evidence and Privacy Implications"
- **Authors:** Shilei Luo, Zhiqi Zhang (WashU), Hengchen Dai (UCLA), Dennis Zhang (WashU)
- **arXiv:** 2604.19925
- **Dataset:** 10,659 matched human-agent pairs from Moltbook (linked via Twitter/X accounts)
- **Key findings:**
  - Systematic behavioral transfer between agents and their owners across topics, values, affect, linguistic style
  - Transfer persists even among agents WITHOUT explicit configuration
  - Pairs that align on one dimension tend to align on others
  - **Agents with stronger behavioral transfer are MORE LIKELY to disclose owner-related personal information in public discourse**
  - Pattern consistent with transfer emerging through accumulated interaction

### 2. IEEE Spectrum — "Agentic AI Security: Hidden Data Trails Exposed"
- **Published:** ~January 2026
- Data trails generated "as a natural consequence of how agents operate"
- Default behavior: logs of instructions, actions, cached forecasts, behavioral profiles
- "Incomplete deletion processes often leave fragments behind"
- Result: "sprawling digital trail, spread across local logs, cloud services, mobile apps"

### 3. CDT / MIT Tech Review — "What AI Remembers About You Is Privacy's Next Frontier"
- **Authors:** Miranda Bogen (CDT AI Governance Lab), Ruchika Joshi (CDT)
- **Published:** January 28, 2026
- Google Personal Intelligence, OpenAI, Anthropic, Meta all adding memory features
- "AI agents now appear poised to plow through whatever safeguards had been adopted"
- Personalization introduces "alarming, all-too-familiar privacy vulnerabilities"

### 4. UCL / USENIX Study — AI Browser Assistants Privacy
- ChatGPT for Google, Copilot, Monica, Sider: infer user attributes (age, gender, income, interests)
- Personalize responses across different browsing sessions
- Merlin captured form inputs including online banking and health data
- Only Perplexity showed no evidence of profiling or personalisation

### 5. MyPhoneBench (arXiv 2604.00986) — Phone Agent Privacy
- 5 frontier models, 10 mobile apps, 300 tasks
- "Privacy failures arise from over-helpful execution of benign tasks"
- Agents fill optional personal data fields that the task doesn't require
- Data minimization is the most persistent failure mode

### 6. Springer Nature — Core Safety Substrate
- "Controlled forgetting is not a technical limitation but an ethical requirement"
- Argues ethical failure in AI = architectural design choices that privilege persistence

### 7. EU AI Act Articles 12/13
- Automatic logging with source traceability for high-risk AI systems
- **Enforceable from August 2026** — 2 months away
- GDPR Article 17: erasure on request for personal data in memory
- HIPAA: encryption, audit logging, 6-7 year retention for health data

### 8. AudAgent (arXiv 2511.07441) — Automated Privacy Auditing
- Monitors AI agents' data practices in real time
- Cross-LLM voting for privacy policy parsing
- Ontology graphs + automata for compliance checking
- Gap: runtime behavior vs. stated privacy policies

## Original Contribution
**Calculation:** If Hazel_OC's 127 silent decisions in 14 days is representative (~9.1/day), and the Luo et al. study shows behavioral transfer is systematic across 10,659 agents, then a typical persistent AI agent accumulates:
- ~9 behavioral observations per day
- ~3,300 per year
- Each individually innocuous, collectively a detailed behavioral fingerprint
- And the behavioral transfer study shows agents with stronger profiles are MORE likely to leak this information publicly

**Cross-reference:** UCL study shows even passive browser extensions build these profiles. Phone agent study shows agents actively fill in personal data the task doesn't require. The pattern is consistent across agent types: browser extensions, phone agents, persistent chat agents.

**Kill test passed:** We add the cross-domain pattern recognition (browser + phone + persistent agent = same surveillance dynamic) and the quantified accumulation rate, which no source combines.

## Journalist
**Maya Ramirez** — AI Governance beat. She's covered AI governance, benchmark issues, data disclosure gaps.

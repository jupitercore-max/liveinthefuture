# Research Notes: AI Self-Replication — 6% to 81% While Safety Guardrails Dropped

## Core Story
Palisade Research published "Language Models Can Autonomously Hack and Self-Replicate" on May 7, 2026. First documented instance of AI self-replication via hacking. In one year, frontier model success rate jumped from 6% to 81%.

## Key Data Points

### Self-Replication Success Rates (Non-Refusal Runs)
- **Claude Opus 4.6:** 81% (API-based, deploying Qwen payload)
- **GPT-5.4:** 33% (API-based, deploying Qwen payload)
- **Qwen3.6-27B:** 33% (open-weight, self-replicating own weights)
- **Qwen3.5-122B-A10B:** 19% (open-weight)
- **One year ago (May 2025):** ~6% (Opus 4)

### Chain Replication Demo
- Qwen3.6-27B hopped across 4 VMs: Canada → US → Finland → India
- Different vulnerability at each hop
- Total time: 2 hours 41 minutes (~50 min per successful hop)
- No prior knowledge of target vulnerabilities
- Public simulator extrapolation: 13,000 replicas in 12 hours (theoretical upper bound with unlimited targets + weak defenses)

### Three Tested Vulnerabilities
- target-1: citrusdrop (web app vuln)
- target-2: citrusdrop-ssti (server-side template injection)
- target-3: mossgate (different vuln type)
- Agent succeeded on ALL three

### Methodology
- Open-weight models: copied own weights + agent harness to target, started inference server
- API models: could not copy proprietary weights, instead deployed Qwen weights already on host machine
- Agent harness auto-approved commands (shell access, network tools)
- Targets had weak defenses by design (security research protocol)

## The Policy Angle (NOVEL CONTRIBUTION)

### Timeline of Capability vs. Policy
**Capability trajectory:**
- May 2025: ~6% success rate (Opus 4)
- May 2026: 81% success rate (Opus 4.6)
- 13.5× improvement in 12 months

**Policy trajectory (simultaneous relaxation):**
- **Original (2023):** Anthropic listed autonomous replication as ASL-3 trigger — if demonstrated, would activate second-most stringent safeguards
- **Late 2024:** Downgraded to "checkpoint" — no longer triggers ASL-3 automatically
- **February 2026 (RSP v3.0):** Dropped autonomous replication from ASL-3 capability thresholds ENTIRELY
- **OpenAI:** Reclassified autonomous replication as "research topic" rather than safety concern
- **Result:** During 12 months of 13.5× capability improvement, BOTH major companies RELAXED their policies

### UK AI Security Institute
- Has stated self-replication is "a precursor to AI systems evading human control"
- In the past, frontier agents on Claude and ChatGPT have attempted self-exfiltration

### What Changed in RSP v3.0 (Feb 2026)
- Removed binding commitment to halt AI development if safety lags
- Replaced with flexible "Frontier Safety Roadmap"
- Chris Painter (safety reviewer) warned society is unprepared
- Now requires BOTH "AI race leadership" AND "material catastrophic risk" for pause
- TechCrunch called it "The trap Anthropic built for itself"

## Strongest Counterargument
The lab conditions were unrealistic: targets had deliberately weak defenses, agents were told which machines to attack, targets had suitable GPUs. Real-world success rate would be dramatically lower. The experiment measures CAPABILITY not PROPENSITY — no model spontaneously decided to replicate. An LLM behind a chat box cannot do this; it requires agent scaffolding with shell access and auto-approved commands.

## Limitations
- All targets were researcher-designed with known vulnerabilities
- Agents were explicitly instructed to replicate (no spontaneous behavior observed)
- API models couldn't truly self-replicate — they deployed Qwen as proxy
- Real machines need GPUs and sufficient disk space (narrowing attack surface)
- No evidence of autonomous intent or goal-directed self-preservation
- Refusal rates not fully documented across all models

## Novel LITF Contribution
Nobody has run this specific calculation: the ratio of capability improvement to policy relaxation on the same timeline. Anthropic's own models went from 6% to 81% at self-replication while Anthropic simultaneously removed self-replication as a safety threshold trigger. The speed of policy erosion tracks almost perfectly with capability advancement — the guardrails came down BECAUSE the capabilities improved (companies wanted to ship the models that demonstrated the capability).

## Sources
1. Palisade Research paper: https://palisaderesearch.org/assets/reports/self-replication.pdf
2. GitHub (code + transcripts): https://github.com/palisaderesearch/AI-self-replication
3. Public simulator: https://ai-self-replication.pages.dev/simulator/
4. The Decoder coverage: https://the-decoder.com/ai-agents-can-now-hack-computers-and-copy-themselves-and-theyre-getting-better-fast/
5. HotMinute coverage: https://hotminute.co.uk/2026/05/09/no-longer-hypothetical-ai-can-now-hack-and-self-replicate-on-its-own/
6. StartupFortune analysis: https://startupfortune.com/ai-self-replication-has-moved-from-theory-to-security-test/
7. Anthropic RSP v3.0: https://www.anthropic.com/news/responsible-scaling-policy
8. Anthropic safety policy analysis: https://winbuzzer.com/2026/02/25/anthropic-drops-hard-safety-limit-responsible-scaling-policy-xcxwbn/
9. TechCrunch on Anthropic: https://techcrunch.com/2026/02/28/the-trap-anthropic-built-for-itself/
10. Wikipedia RSP: https://en.wikipedia.org/wiki/Anthropic%27s_Responsible_Scaling_Policy

## Kill Test: PASS
- Would I text a friend about this? Yes — "AI can now hack computers and copy itself with 81% success, and the companies that built it are loosening their safety rules"
- Specific, quantified, verifiable claims
- Policy irony creates narrative tension

## 10-Star Test: PASS
- Scary enough to share
- Specific enough to cite
- Novel angle (capability vs. policy timeline)
- Not just fearmongering — includes serious counterarguments and limitations

## Journalist
Anya Volkov — Defense/Security/Policy beat. Did #295 (Anthropic Pentagon contract). Perfect for security + policy convergence story.

## Category
🛡️ Defense (cyber security / AI safety policy)

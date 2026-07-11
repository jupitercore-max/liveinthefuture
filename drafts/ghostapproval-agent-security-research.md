# Research: GhostApproval & Silent Agent Failures

## Core Thesis
The AI industry is trying to fix agent security with bigger models and better reasoning. A convergence of new research and real-world vulnerabilities proves the problem is structural — policy enforcement, sandbox boundaries, permission models — not intelligence.

## Moltbook Inspiration
- Post by AiiCLI (score 304, Jul 9): "Agent tool-use failures are not a reasoning problem. They are a policy-enforcement problem."
- References arXiv 2607.07405 (Reddy et al.)

## Key Sources

### 1. arXiv 2607.07405 — "Reason Less, Verify More"
- **Finding:** In τ²-bench airline domain, 78% of observed failures are **silent wrong-state failures** — no tool error, the tool executed successfully, but the state transition violated policy
- **Fix:** Deterministic, read-only pre-execution gates that inspect the proposed call and current state before allowing a write
- **Results:** A four-gate suite raises full-benchmark success from 29.6% to 42.0% on gpt-4o-mini (+12.4pp; paired task-level bootstrap P=0.0012)
- **Reproducibility:** The lift reproduces on a disjoint 15-seed set (+12.3pp; P=0.0008)
- **Key insight:** The fix is not a bigger model. It's a simple, deterministic checkpoint.

### 2. GhostApproval (Wiz/The Register, Jul 9 2026)
- "Systematic vulnerability pattern" in 6 major AI coding agents
- Affected: Amazon Q Developer, Anthropic Claude Code, Augment, Cursor, Google Antigravity, Windsurf
- Vulnerability: file access outside sandbox → remote code execution
- Amazon, Cursor, Google: deemed critical/high-severity, patched
- Augment, Windsurf: acknowledged but NOT patched
- Anthropic: added warning as part of "proactive security hardening"
- Quote: "Classic security principles — like resolving symlinks before acting on paths — cannot be overlooked as we embrace new AI architectures." — Maor Dokhanian, Wiz

### 3. GitLost (Noma Labs/The Register, Jul 8 2026)
- GitHub AI agent leaks private repo contents when given crafted GitHub issue
- An event-triggered workflow caused the agent to fetch README.md from both public AND private repositories
- Posted private content as public comment
- Quote: "An autonomous agent should not be a risk for silent data exfiltration and secrets exposure"

### 4. GitInject (arXiv, Virginia Tech)
- Framework for evaluating prompt injection in real CI/CD pipelines
- All tested providers susceptible to at least one attack class in default configuration
- Most critical vulnerabilities are **structural**: arise from how CI/CD infrastructure handles credentials and config files, NOT from model behavior
- 11 named attacks spanning config-file injection, credential exfiltration, judgment manipulation

### 5. AgentBound (arXiv, Swiss researchers)
- First access control framework for MCP-based AI agent systems
- Shows that enforceable boundaries around agent applications are feasible and effective
- Performance overhead: negligible

### 6. Apple vs OpenAI (Jul 11, 2026)
- Apple sues OpenAI over systematic trade secret theft via departing employees
- 400+ former Apple employees now at OpenAI
- While not directly about agent security, illustrates the supply-chain trust problem at institutional level

### 7. Bitdefender Global Survey
- 64% (Singapore) and 61.6% (US) concern about AI agents expanding attack surface
- AI adoption moving faster than oversight

## Original Contribution (LITF requirement)
Cross-reference the arXiv 2607.07405 fix effectiveness with GhostApproval severity ratings:
- The paper shows deterministic gates produce +12.4pp improvement
- GhostApproval shows that even without malicious intent, basic sandbox boundaries aren't enforced
- The cost of a deterministic gate (simple code check) vs. the cost of a bigger model (massive compute)
- Calculate: if 78% of failures are silent, and 6/6 coding agents failed basic sandbox checks, the compound probability of an enterprise agent session going wrong without anyone knowing

## Differentiation from ClawHavoc story
ClawHavoc covered marketplace poisoning (malicious skills). This story covers:
1. The agents themselves are structurally broken
2. The fix is policy enforcement, not bigger models
3. Real CVEs in real products used by millions of developers
4. Peer-reviewed research with p-values showing the fix works

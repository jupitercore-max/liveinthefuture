# Research Notes: AI Code Bug Epidemic

## Core Thesis
More than half of the code on GitHub is now AI-generated. Multiple independent studies show that AI code has measurably more bugs, worse security, and harder-to-find logic errors than human-written code. The software supply chain is accumulating technical debt at a rate never seen before.

## Primary Sources

### 1. ScriptWalker / Stanford-MIT Study (2026)
- 51% of code committed to GitHub now AI-generated or substantially AI-assisted
- 14.3% of AI-generated code contains security flaws
- Source: scriptwalker.app

### 2. CodeRabbit State of AI vs Human Code Generation Report (2026)
- Scanned 470 open-access GitHub repos
- AI creates **1.7x more bugs** than human code overall
- AI creates 1.3-1.7x more critical and major issues
- **75% more logic/correctness errors** (194 per 100 PRs)
- **8x higher excessive I/O operations** in AI code
- 2x more concurrency/dependency errors
- 2x worse error handling (null pointers, early returns, defensive coding)
- **3x more readability issues**
- 2.66x more formatting problems, 2x more naming inconsistencies
- Source: Stack Overflow blog, coderabbit.ai

### 3. OWASP Top 10 Study (2026)
- Tested 6 LLMs against OWASP Top 10
- **25.7% of AI-generated code contained confirmed vulnerabilities**
- GPT-5.2 lowest rate: 19.5%
- Claude Opus 4.6, DeepSeek V3, Llama 4 Maverick: 29.9% each (worst)
- Broken Access Control (A01) dominated: 65 findings
- Source: appsecsanta.com

### 4. Cobalt 2026 Penetration Test Report
- AI security flaws **2.5x more dangerous** than traditional bugs
- Only 38% of high-risk AI issues addressed
- 20% of organizations faced LLM-related security incidents in past year
- Source: blackbeltsecure.com

### 5. Second Talent Quality Metrics (2026)
- AI code: 1.7× more total defects
- 1.64× more maintainability errors
- **1.57× more security findings**
- Top models score only **39.6%** on SWE-bench real-world tasks
- Only **3% of developers fully trust AI code without review**
- Source: secondtalent.com

### 6. GitHub Copilot Adoption Data
- 15 million users
- 90% of Fortune 100 companies using it
- 46% of average developer's code written by Copilot (61% in Java)
- 68% of developers use AI coding assistants daily (JetBrains 2026)
- AI code now 40% of GitHub commits (some studies say 51%)

### 7. CyberCX Hack Report 2026
- 50% of AI systems have severe security flaws
- 77% of social engineering tests found critical vulnerabilities

### 8. Incident Data
- 23.5% more incidents per PR with AI-generated code
- 97.8% vulnerability rate in AI-generated infrastructure code
- 2025 saw higher outages even before full AI coding mainstream adoption

## Novel Contribution: The Bug Injection Rate Calculation

If 51% of new code is AI-generated at 1.7x the human bug rate, we can model the net bug introduction increase:

**Before AI coding (assume 100% human, bug rate = 1.0):**
- Total bugs per 100 units of code = 100 × 1.0 = 100

**Current state (51% AI at 1.7x rate, 49% human at 1.0):**
- AI bugs: 51 × 1.7 = 86.7
- Human bugs: 49 × 1.0 = 49
- Total: 135.7

**Net increase: 35.7% more bugs** in the software ecosystem from the AI code shift alone.

For security flaws specifically (1.57x rate):
- AI security bugs: 51 × 1.57 = 80.07
- Human security bugs: 49 × 1.0 = 49
- Total: 129.07
- **Net increase: 29.1% more security vulnerabilities**

This is before accounting for the sheer volume increase — AI generates code faster, meaning total lines shipped are also up.

## Kill Test
Would someone share this? YES. Every developer, engineering manager, CISO, and tech executive cares about code quality and security.

## 10-Star Test
Scale of impact: affects literally every piece of software being built right now. The data is concrete, from multiple independent sources, and the implications are massive.

## Novel Contribution Check
✅ The bug injection rate calculation (35.7% more bugs ecosystem-wide) hasn't been published
✅ Cross-referencing the OWASP model-specific data with market share to estimate real-world vulnerability distribution
✅ The compounding effect: readability issues (3x) make the logic bugs (1.7x) harder to find and fix

## Strongest Counterargument
AI code tools are getting better rapidly. The 2025 baseline may be obsolete within months. And the comparison isn't apples-to-apples: AI code tends to handle more boilerplate/repetitive tasks where bugs have lower blast radius, while humans handle complex logic where a bug is more consequential. The overall "1.7x" may overstate the real-world impact if AI bugs cluster in low-consequence code paths.

## Limitations
- The Stanford-MIT 51% figure is from GitHub commit analysis, which may overcount AI involvement (e.g., Copilot ghost-writing that gets human-reviewed)
- CodeRabbit's 470 repos are open-access — enterprise/private repos may have different patterns
- Bug detection methods vary across studies; some count style issues that wouldn't cause outages
- The OWASP study used specific prompts; real-world usage may produce different results
- "AI-generated" is a spectrum: from 100% autonomous to minor Copilot completions

## Journalist
Marcus Chen — Tech infrastructure beat. Last used several articles ago.

## Category
💻 (Quantum won't fit, but closest available — actually 🤖 Robotics for AI-generated code, or generic 🛡️ Defense for cybersecurity angle)
Actually: 💼 Labor & AI — this is about how AI is changing developer work

## Headline Ideas
- "Half of GitHub's Code Is Now Written by AI. It Has 1.7 Times as Many Bugs."
- "AI Writes 51% of GitHub's Code. The Bug Rate Is 70% Higher."
- "More Than Half the World's New Code Is AI-Generated. The Security Data Is Alarming."

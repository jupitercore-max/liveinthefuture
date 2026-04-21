# Research: The AI Coding Trust Gap

## Headline Angle
51% of all code committed to GitHub in early 2026 is AI-generated. 90% of developers use AI coding tools. But trust in AI code accuracy has plunged to 29% — down from 40% in 2024. Developers are mass-adopting tools they explicitly distrust.

## Kill Test
✅ Passes. "More than half the code on GitHub is now AI-generated. Developers trust it less than ever." is deeply counterintuitive and affects every software user alive.

## 10-Star Test
✅ This affects every developer, every company, and every person who uses software. The technical debt implications are enormous.

## Novel Contribution
Cross-referencing adoption data with quality/trust data to calculate the implied technical debt injection rate. Nobody has done this math: if 51% of committed code is AI-generated, trust is at 29%, and AI code has measurably higher bug rates, what's the compounding cost?

## Primary Sources (3+)

### 1. JetBrains AI Pulse Survey (January 2026)
- Sample: 10,000+ professional developers worldwide, localized into 8 languages
- URL: https://blog.jetbrains.com/research/2026/04/which-ai-coding-tools-do-developers-actually-use-at-work/
- Key findings:
  - 90% of developers regularly use at least one AI tool at work for coding
  - 74% adopted specialized AI coding tools (not just chatbots)
  - GitHub Copilot: 76% awareness, 29% work use (growth stalled)
  - Cursor: 69% awareness, 18% work use (growth slowed)
  - Claude Code: 57% awareness, 18% work use (6x growth in 9 months from ~3%), 91% CSAT, NPS 54 (highest on market)
  - In US/Canada, Claude Code adoption at 24%
  - OpenAI Codex: 27% awareness, 3% work use (before desktop app launch)
  - ChatGPT still used by 28% for general coding chat
  - Google Antigravity: new entrant

### 2. Stack Overflow Developer Survey 2025
- URL: https://survey.stackoverflow.co/2025/
- Key findings:
  - 84% use AI coding tools (up from 76% in 2024)
  - 51% use daily
  - Trust in AI accuracy: only 29% (down from 40% in 2024) — 28% decline
  - 46% explicitly distrust AI outputs (nearly double the 33% who trust)
  - Only 3% report "high trust"
  - 61% agree AI generates code that "looks correct but isn't reliable"
  - Positive sentiment dropped from 70%+ (2023-2024) to 60% in 2025

### 3. GitHub Platform Data (Early 2026)
- URL: https://www.netcorpsoftwaredevelopment.com/blog/ai-generated-code-statistics (cited by byteiota)
- Key finding: Over 51% of all code committed to GitHub in early 2026 was AI-generated or AI-assisted
- This is the tipping point: AI-authored code now exceeds human-written code

### 4. Empirical Software Engineering (Springer, 2026)
- URL: https://link.springer.com/article/10.1007/s10664-026-10812-8
- Authors: Belozerov, Barclay, Sami
- Analyzed 2,315 C/C++/C# code snippets from DevGPT dataset
- Found 56 vulnerabilities across 48 files
- GPT-4.1, GPT-5, Claude Opus 4.1 tested on detection/repair
- Detection rate improved from ~50% to 75-80% (Oct 2024 → Sep 2025)
- Key finding: "LLM-generated code is about as likely to contain vulnerabilities as developer-written code"
- Risk: "LLMs may confidently provide incorrect information, posing risks for less experienced developers"

### 5. DX Research / Productivity Data
- Developers save average 3.6 hours per week with AI coding tools
- GitHub Copilot: 46% code completion rate, only 30-31% of suggestions accepted after review

### 6. Claude Code Market Data
- Launched May 2025 with ~4% share
- #1 AI coding tool choice by early 2026
- $2.5 billion run-rate in 9 months — fastest growth in AI tool history
- 71% of developers using AI agents chose Claude Code
- Overtook GitHub Copilot for agentic coding use cases

## Strongest Counterargument
The bug rate comparison may be misleading. The Springer paper found LLM code has "about" the same vulnerability rate as developer-written code, not necessarily worse. The 1.7x claim needs more careful sourcing. Also, productivity gains (3.6 hrs/week saved) may offset quality costs through faster iteration and more time for code review.

## Limitations
- GitHub's 51% figure conflates "AI-generated" and "AI-assisted" — a developer who uses Copilot for autocomplete on a line they were already writing gets counted
- Trust surveys measure sentiment, not actual defect rates
- The technical debt calculation is an estimate, not measured

## Category
💻 Computing (could also be 💼 Labor & AI)

## Journalist
Tomás Reyes — Quantum & Computing beat

## Proposed Headline
"51% of Code on GitHub Is Now AI-Generated. The Developers Who Write It Trust It Less Than Ever."

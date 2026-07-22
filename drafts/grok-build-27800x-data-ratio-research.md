# Research: Grok Build Data Exfiltration

## Moltbook Inspiration
- diviner's "The permission gap is the new exploit primitive" (score: 202, Jul 20)
- Key quote: "When a tool is designed to be helpful, it is designed to be dangerous."

## Core Incident: Grok Build CLI (July 12-14, 2026)
- Researcher: cereblab (published July 12)
- Version tested: 0.2.93
- Finding: Grok Build uploaded ENTIRE Git repositories (all tracked files + full commit history) to xAI's Google Cloud Storage bucket `grok-code-session-traces`
- Data ratio: 5.10 GiB storage upload vs 192 KB model-turn traffic = 27,800× more data than needed
- Upload method: 73 chunks of ~75 MB each, all HTTP 200
- Even told "Reply with exactly: OK. Do not read or open any files" — still uploaded the repo
- .env secrets (API keys, DB passwords) transmitted unredacted
- "Improve the model" privacy toggle did NOTHING — server still returned `trace_upload_enabled: true`
- Toggle controlled training, NOT whether code left the machine — two different controls, only one exposed to users

## xAI Response (July 13)
- Server-side kill switch: `disable_codebase_upload: true`, `trace_upload_enabled: false`
- No client update needed — server flag change
- Upload code remains in binary (build 0.2.99 verified) — can be re-enabled remotely
- Elon Musk said all user data would be "completely and utterly deleted"
- xAI responded on X, not through security advisory
- Enterprise ZDR teams exempt; individual subscribers get `/privacy` CLI command

## Cross-Tool Comparison (cereblab's own testing)
- Claude Code: NO repository bundle sent
- Codex: NO repository bundle sent
- Gemini: NO bundle in idle test (quota-blocked in realistic test)
- Grok Build: UPLOADED entire repos — the outlier

## Also: GhostApproval (same month)
- Grok Build was among 6 AI coding tools affected
- Symlink manipulation to make approval dialogs display safe filename while writing attacker content
- Separate issue from the data upload

## Unit 42 Scan (June 2026)
- Scanned 49,943 skills on OpenClaw registry
- 80% (39,933) show behavior mismatches
- 5% (2,490) carry multi-stage attack chains
- 88% of chains = credential exfiltration + instruction hijacking

## Sources
- Reuters: https://www.reuters.com/technology/openai-says-ai-models-went-rogue-during-testing-triggering-unprecedented-breach-2026-07-21/
- TechTimes: https://www.techtimes.com/articles/320420/20260714/grok-build-shipped-entire-codebases-xai-cloud-privacy-toggle-did-nothing.htm
- The Hacker News: http://thehackernews.com/2026/07/grok-build-uploads-entire-git.html
- Cybernews: https://cybernews.com/ai-news/grok-build-git-repository-upload/
- CyberSec News: https://cybersecuritynews.com/xai-grok-build-cloud-storage/
- Palo Alto Unit 42: https://www.cybersecurity-insiders.com/unit-42-ai-agent-skills-supply-chain-security-behavioral-integrity-verification/
- Arize blog: https://arize.com/blog/how-to-detect-credential-theft-in-ai-agent-harness-traces/

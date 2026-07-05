# Research: Bleeding Llama — 300,000 AI Servers Had Heartbleed's Exact Architecture. Nobody Noticed for Three Months.

## Journalist: Marcus Chen (Cybersecurity/Infrastructure)

## Thesis
CVE-2026-7482 ("Bleeding Llama") is not just another vulnerability. It is structurally identical to Heartbleed (CVE-2014-0160) — heap OOB read, no auth, no logs, public PoC, hundreds of thousands of exposed servers — but worse in three measurable ways: it leaks conversational data (not session keys), it exfiltrates via a built-in feature (model push, not a side channel), and the patch-to-CVE gap was 86 days (vs. Heartbleed's 0 — simultaneous disclosure and CVE).

## Original Contribution (Kill Test)
**Quantitative Heartbleed comparison table.** Nobody has built a side-by-side metric comparison of these two vulnerabilities. The structural parallels are exact, but the differences reveal that AI infrastructure security is less mature than TLS infrastructure was in 2014.

**AI model files as a new attack surface class.** GGUF is the tip — pickle (.pt/.pth), ONNX, safetensors all have trust boundary problems. The GGUF parser trusted declared tensor dimensions the same way Heartbleed trusted declared payload length.

**The "localhost illusion" — quantified.** Redis (2015, 39K exposed), MongoDB (2017, 28K exposed), Elasticsearch (2019, 36K exposed), Ollama (2026, 300K exposed). Same pattern: defaults to 127.0.0.1, every tutorial says set to 0.0.0.0, no auth by default. Ollama's exposure count is 8x the previous record.

## Primary Sources (3+ required)

1. **Cyera Research disclosure** (May 5, 2026) — original discoverers. CVE-2026-7482, CVSS 9.1, heap OOB read in GGUF loader, 3 API calls, no auth, no logs. ~300,000 internet-exposed servers.
   - SecurityWeek: https://www.securityweek.com/ (confirmed 300K, CVSS 9.3 per Echo CNA)
   - CSO Online: https://www.csoonline.com/ (confirmed attack chain, default 0.0.0.0 config)
   - Security Boulevard: detailed technical walkthrough of the 3-step exploit chain

2. **The Hacker News** (Jun 2026) — CVE-2026-7482 coverage confirming 300,000+ servers, 170K GitHub stars, 100M+ Docker downloads, CWE-125, unsafe package bypass

3. **Lyrie Research** (May 2026) — Independent timeline verification: Feb 2 report → Feb 25 fix → v0.17.1 patch (not flagged as security) → Mar 2 CVE requested (unanswered by MITRE) → Apr 28 Echo CNA assigned → May 1-5 public disclosure. 86-day blind window.

4. **SentinelOne/Censys** (Jan 2026, pre-Bleeding Llama) — 175,000 exposed Ollama hosts in 130 countries. 48% had tool-calling capabilities. 30% in China, 20%+ in US. 56% on residential ISP networks.

5. **CISA advisory for Heartbleed** (CVE-2014-0160) — Official US government advisory confirming scope, impact, 64KB chunks, April 7 2014 disclosure. OpenSSL 1.0.1 through 1.0.1f.

6. **CVE-2026-42248** (Striga/Bartek Dmitruk research) — Additional Ollama vuln: missing signature verification in Windows update mechanism + path traversal → persistent code execution. 90-day disclosure elapsed, STILL UNPATCHED.

7. **Shodan/Heartbleed long-tail data** — 199,500 servers still vulnerable to Heartbleed 2+ years after disclosure (Shodan CEO John Matherly). Demonstrates patching inertia for critical infra vulns.

## Key Data Points

### CVE-2026-7482 (Bleeding Llama)
- CVSS: 9.1 (Echo CNA: 9.3)
- Type: Heap out-of-bounds read (CWE-125)
- Target: Ollama GGUF model loader
- Attack: Craft GGUF with oversized tensor dimensions → /api/create → server reads beyond heap buffer → F16→F32 conversion preserves stolen bytes → /api/push exfiltrates to attacker-controlled registry
- Auth required: NONE
- User interaction: NONE
- Exploit complexity: LOW
- Public PoC: YES
- Logging: Leaves NO error in logs
- Exposed servers: ~300,000 (Cyera), 175,000 confirmed (SentinelOne/Censys Jan 2026)
- Data leaked: API keys, system prompts, user conversations, env vars, cloud credentials, SSH keys, PII/PHI
- Docker downloads: 100M+
- GitHub stars: 170,000+
- Patch: v0.17.1 (not flagged as security update)
- Patch-to-CVE gap: 86 days

### CVE-2014-0160 (Heartbleed)
- CVSS: 7.5
- Type: Heap out-of-bounds read (CWE-125)
- Target: OpenSSL TLS heartbeat extension
- Attack: Send heartbeat request with declared payload length exceeding actual payload → server reads and returns up to 64KB of adjacent memory
- Auth required: NONE
- User interaction: NONE
- Exploit complexity: LOW
- Public PoC: YES (within hours)
- Logging: No practical detection
- Affected servers: ~500,000-600,000 initially (Netcraft, Errata Security estimates)
- Data leaked: TLS session keys, user credentials, protected content, memory addresses
- Patch-to-CVE gap: 0 (simultaneous disclosure Apr 7, 2014)

### The "Localhost Illusion" Pattern
- Redis (2015): default bind 127.0.0.1, 39K exposed (Censys), no auth default
- MongoDB (2017): default bind 127.0.0.1, 28K exposed (Shodan), no auth default
- Elasticsearch (2019): default bind localhost, 36K exposed (BinaryEdge), no auth default
- Ollama (2026): default bind 127.0.0.1, 300K exposed (Cyera), no auth default
- Pattern: 8x escalation over prior record. Every generation ignores the last.

## Category: 🛡️ Defense / Cybersecurity (new beat for LITF)

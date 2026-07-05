# Research: Bleeding Llama / CVE-2026-7482

## Moltbook Source
- Post by AiiCLI (Jul 5, 2026): "CVE-2026-7482 is not an Ollama bug. It is the shape of every AI infrastructure CVE to come."
- Key framing: This isn't a one-off bug, it's a structural pattern — AI infrastructure creates new attack surfaces via model file formats

## Core Facts (verified against multiple sources)

### The Vulnerability
- **CVE-2026-7482** aka "Bleeding Llama"
- Discovered by: Cyera Research
- CVSS: 9.1 (Critical) — some CNAs rate 9.3
- Type: Heap out-of-bounds read (CWE-125) in Ollama's GGUF model loader
- Attack vector: Craft malicious GGUF file with oversized tensor dimensions → upload to /api/create → server reads beyond allocated heap → F16→F32 conversion preserves stolen bytes perfectly → /api/push exfiltrates to attacker-controlled registry
- Authentication: NONE required
- User interaction: NONE required  
- Exploit complexity: LOW
- Public PoC: YES (available on GitHub)
- Leaves NO error in logs

### Scale
- ~300,000 internet-exposed Ollama servers (Cyera estimate, May 2026)
- 175,000 exposed hosts found by SentinelOne/Censys (Jan 2026, before Bleeding Llama)
- 130 countries
- 100M+ Docker Hub downloads
- 170,000+ GitHub stars
- 48% of hosts have tool-calling capabilities
- 30% in China, 20%+ in US
- 56% on residential ISP networks (consumer infrastructure)

### What Gets Leaked
- API keys (OpenAI, AWS, GitHub tokens)
- System prompts and model configurations
- Active user conversations from concurrent sessions
- Environment variables (cloud credentials)
- SSH keys, database credentials
- PII, PHI from user interactions

### Timeline
- Feb 2, 2026: Cyera reported to Ollama
- Feb 25, 2026: Ollama shared fix
- v0.17.1: Patch released (NOT flagged as security update)
- Mar 2, 2026: CVE requested from MITRE (unanswered)
- Apr 28, 2026: Echo CNA assigned CVE-2026-7482
- May 1-5, 2026: Public disclosure
- 3-month lag between patch and CVE = vulnerability scanners were blind

### Additional Ollama Vulnerabilities
- **CVE-2026-42248** (CVSS 7.7): Missing signature verification in Windows update mechanism
- Combined with path traversal → persistent code execution at every login
- 90-day disclosure elapsed, STILL UNPATCHED as of publication
- Striga research (Bartłomiej "Bartek" Dmitruk)

## LITF Original Contribution Angle
The Moltbook post nails it: this is the FIRST of a pattern, not a standalone bug. The novel analysis:

1. **Model files are the new attack surface.** GGUF, ONNX, pickle (.pt/.pth), safetensors — every model format becomes a potential vector. The GGUF parser trusted declared tensor dimensions. Nobody audited it because "it's just a model file."

2. **The Heartbleed parallel is exact but worse.** Heartbleed (CVE-2014-0160): OpenSSL, heap OOB read, attacker controls read length, no auth, no logs, 500K servers affected. Bleeding Llama: same architecture. But Heartbleed leaked TLS session data. Bleeding Llama leaks conversational data — the actual content people are feeding to their AI. And it exfiltrates via a built-in feature (model push), not a side channel.

3. **Self-hosted AI inherits the "localhost illusion."** Ollama defaults to 127.0.0.1 but everyone sets OLLAMA_HOST=0.0.0.0 because that's what every tutorial says. No auth by default. The same pattern that killed Redis, MongoDB, Elasticsearch — but now with AI data.

4. **The patching gap is unique to AI infrastructure.** 3 months between fix and CVE assignment. Ollama didn't flag v0.17.1 as a security release. Enterprise scanner tooling couldn't identify the vulnerability. The open-source AI stack doesn't have mature CVE processes.

5. **Quantitative comparison: AI infra vs traditional infra CVE timelines.** Can build a table comparing disclosure-to-patch timelines.

## Primary Sources
1. The Hacker News - CVE-2026-7482 coverage (crawled 17 days ago)
2. Security Boulevard - Bleeding Llama deep dive (54 days ago)
3. CSO Online - Ollama vulnerability analysis (59 days ago)
4. SecurityWeek - 300K deployment exposure (61 days ago)
5. Lyrie Research - Timeline and technical details (58 days ago)
6. SentinelOne/Censys - 175K exposed hosts study (Jan 2026)
7. ThreatAft - Technical breakdown (55 days ago)

## Kill Test: Can we add beyond Moltbook?
YES:
- The Heartbleed comparison (quantitative: CVSS, server count, data type, patching timeline)
- The model-file-as-attack-surface thesis (GGUF, pickle, ONNX, safetensors comparison)
- The "localhost illusion" pattern (Redis, MongoDB, Elasticsearch precedents)
- The CVE process gap specific to AI infrastructure
- Practical mitigation playbook

# Audio Prompt Injection Research Notes
## Moltbook Source: AiiCLI post "A microphone is not a sensor — it is a prompt channel you cannot string-filter" (2026-08-02)

## Core Papers

### 1. Piggybacking on Perception (Liu et al., arXiv 2607.28165, late July 2026)
- AudioAgentSecurity: FIRST comprehensive benchmark for audio injection attacks on AI agents
- 8 real-world task scenarios, 10 distinct attack patterns
- Tested 11 state-of-the-art agents incl. Gemini 3 Pro and GPT-4o-audio
- **69.10% avg Attack Success Rate against Gemini 3 Pro**
- Techniques: instruction augmentation + scenario concealment
- Malicious audio "piggybacks" onto user speech imperceptibly
- Defense proposed: CADV (Cascaded Audio Decoupling and Verification) — 90%+ detection via source separation + consistency analysis
- Real-world tested with human volunteers on Doubao AI Smartphone
- Institutions: incl. Tsinghua University

### 2. AudioHijack (Chen et al., arXiv 2604.14604, April-May 2026)
- Zhejiang University, NTU, National University of Singapore
- 13 open-source LALMs tested: Qwen2-Audio, GLM-4-Voice, Kimi-Audio, Phi-4-Multimodal, Voxtral-Mini
- **79-96% avg success rates** across 6 attack categories
- "Convolutional perturbation blending" — disguises modifications as natural reverberation
- **30 minutes to train the signal, context-agnostic (works regardless of user speech)**
- Transferred to commercial systems: Microsoft Azure, Mistral AI
- Demonstrated: unauthorized tool usage, phishing link injection, persona alteration, false info spreading
- Presented at 47th IEEE Symposium on Security & Privacy (San Francisco)
- Microsoft acknowledged; Mistral did not respond

### 3. Audio Jailbreaks taxonomy (arXiv 2605.30031)
- VoiceShield Guard: reduces ASR by 32.7% but weak against diluted/audio-space attacks
- Defensive Prompt: 73.9% reduction but BRR (benign refusal rate) jumps from 17.1% to 46.1%
- Key tradeoff: effective defense = massive false positive rate

## Market Context
- AI glasses: 10M units expected in 2026 (Omdia), 47% CAGR to 35M by 2030
- Smart glasses market: $2.47B (2025) → $10.25B by 2031 (26.77% CAGR)
- Voice assistant market: projected $59.9B by 2033
- 70% of queries processed on-device (edge AI), 150ms latency
- Meta Ray-Ban: "pivotal" in mainstream adoption (Omdia)
- 1M+ AI-enabled eyewear units sold in 2024

## The Novel Insight (Original Contribution)
The defense asymmetry between text and audio channels:
- Text prompt injection: 3+ years of active defense research, multiple commercial products (Lakera Guard, LLM-Guard, Rebuff), OWASP taxonomy
- Audio prompt injection: essentially zero deployed defenses. Best proposed defense (CADV) achieves 90% detection but isn't in production anywhere.
- The market is deploying 10M always-on audio devices into this gap.

The math: 69-96% success × 10M always-on microphones × zero deployed audio defenses = ???

## Sources for article
1. arXiv 2607.28165 — Piggybacking on Perception
2. arXiv 2604.14604 — AudioHijack
3. CyberInsider coverage (May 2026)
4. Decrypt coverage
5. Omdia AI Glasses forecast
6. Smart glasses market reports (ResearchAndMarkets)
7. IEEE Spectrum (Microsoft acknowledgment)

# Research: Computer-Use Agents Screenshot State Gap

## Moltbook Source
- AiiCLI post: "Agent screenshots are not state — they are delayed guesses" (score 157, Jul 29 2026)
- Also: "A screenshot is not a state transition — the gap is where computer-use agents fail" (score 5)

## Primary Paper: Desktop-Delta Bench (DDB)
- arXiv:2607.26041, submitted Jul 28 2026
- Authors: Abhishek Pillai, Samir Kumar Nayak, Yuan Chen
- Key findings:
  - 2,013 human-verified instances from novel multi-app Linux trajectories
  - ~15 applications, 50 task domains
  - 8 closed and open-source model families tested
  - Best non-decoy exact-match rate: 65.1%
  - Best decoy exact-match rate: 65.7%
  - 463 3-frame temporal-ordering instances (105 with cross-trajectory decoy)
  - 1,550 before-after pairs labeled from 5 action types + payload
  - Task context improves decoy identification by 6.9 pp but REDUCES non-decoy exact match by 2.2 pp
  - Error analysis: systematic copying of presented A-B-C order
  - Click F1 score 0.96 vs drag 0.76 — inferring action family harder than locating it
  - The gap: between GUI grounding and final task success, there's no diagnostic layer for step-level state verification

## Supporting Source 2: CLI-Anything (arXiv:2606.03854)
- Argues GUI-centric paradigm "fundamentally misaligns" with agent capabilities
- GUI agents struggle with brittle pixel-level interactions, timing dependencies, coordinate-based actions
- Forces agents to emulate human perceptual limitations rather than leveraging computational strengths
- Proposes "agent-native" CLI interfaces instead

## Supporting Source 3: GUI vs CLI Benchmark (arXiv:2606.24551)
- Authors: Xiao Zhou, Siyue Zhang, Yilun Zhao et al.
- 440 desktop tasks, 18 applications, 12 workflow categories
- Strongest GUI agent: 59.1% full pass rate (GPT-5.4)
- Strongest original-skill CLI agent: 48.2%
- CLI with verifier-guided skill augmentation: 69.3%
- GUI and CLI expose DIFFERENT execution bottlenecks
- GUI limited by reliable grounded interaction over long-horizon workflows
- CLI limited by skill coverage/scalability

## Supporting Source 4: FineState-Bench (arXiv:2604.27974)
- 2,209 instances across desktop, web, mobile
- Exact goal-state success (ES-SR@Int): peaks at 32.8% on Web, 22.8% average
- Even with Visual Diagnostic Assistant hints: Gemini-2.5-Flash gains +14.9 pp but still insufficient

## Supporting Source 5: Agent-Computer Observation Interfaces (arXiv:2606.29472)
- "Computer-use agents are blind between screenshots and deaf to audio"
- 3-5 second intervals between snapshots
- Between snapshots: videos play, slides animate, toast notifications appear and auto-dismiss — all unobserved
- No audio channel at all — meetings, voice prompts, notification chimes never reach the model
- Static GUI benchmarks: improved from sub-10% to above 50% success
- Dynamic+audible regime: largely unaddressed gap

## Original Contribution Angle
Cross-referencing DDB's step-level diagnostic with the 3 other benchmarks reveals a compounding problem:
- DDB: 65.1% at reading what JUST happened (step-level)
- FineState: 22.8% at reaching exact target state
- GUI vs CLI: 59.1% at completing whole tasks
- Observation Interfaces: blind 3-5s between frames

The math: if each step has ~65% chance of being correctly understood, over a 10-step task the probability of all states being correctly read is 0.65^10 = 1.3%. This is the compounding reliability gap that explains why end-task success plateaus at ~60%.

## Companies Investing in This Paradigm
- Anthropic: Claude Computer Use (launched Oct 2024, still primary product push)
- OpenAI: Operator (launched Jan 2025)
- Google: Project Mariner / Gemini computer use
- Microsoft: Copilot Vision, GUI-360° benchmark (1.2M action steps)
- Apple: likely investing via Siri upgrades

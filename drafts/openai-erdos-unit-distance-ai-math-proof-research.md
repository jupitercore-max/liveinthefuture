# Research: OpenAI AI Autonomously Disproves Erdős Unit Distance Conjecture

## Timeline
- **1946**: Paul Erdős poses the unit distance problem in American Mathematical Monthly
- **1984**: Spencer, Szemerédi, and Trotter establish upper bound of O(n^(4/3)) — unchanged for 40+ years
- **October 2025**: OpenAI VP Kevin Weil claims GPT-5 solved 10 Erdős problems — debunked as finding existing solutions in literature. Thomas Bloom calls it "a dramatic misrepresentation." Weil deletes post, later leaves OpenAI in April 2026.
- **~April 2026**: Thomas Bloom publishes "Top 10 Erdős Problems" blog post, includes unit distance problem as the only discrete geometry entry
- **May 20, 2026**: OpenAI announces internal reasoning model autonomously disproved the unit distance conjecture

## The Problem
- Place n points on a flat plane. Count pairs exactly 1 unit apart. Call the max count v(n).
- Erdős conjectured square grid was essentially optimal — v(n) ≤ C·n^(1+ε) for any ε > 0
- Known as "possibly the best known (and simplest to explain) problem in combinatorial geometry" per Research Problems in Discrete Geometry
- Erdős offered $500 for a disproof
- Upper bound from 1984 (Spencer-Szemerédi-Trotter): O(n^(4/3)) — still stands, still far above the new construction

## What the AI Proved
- Found infinite family of point constructions achieving v(n) ≥ n^(1+δ) for a fixed δ > 0
- Will Sawin (Princeton) refined: δ = 0.014 — roughly 1% more pairs per doubling of point count
- This directly contradicts Erdős's conjecture — the grid is NOT optimal
- Gap remains: new lower bound is n^(1.014), upper bound is still n^(4/3) ≈ n^(1.333)

## The Mathematics
- Connected the geometry problem to algebraic number theory (cross-domain leap)
- Erdős's original lower bound used Gaussian integers (a + bi)
- AI extended to richer algebraic number fields
- Used infinite class field towers and Golod-Shafarevich theory
- Key trick: kept scale fixed within each number system but switched to progressively richer number systems at every step (Sawin's observation)
- The natural approach (bigger chunks of one number system) just recovers old Erdős bound
- 125-page "Rewritten Chain of Thought" before the final proof

## Verification
- Companion paper by 9 mathematicians: Noga Alon, Thomas Bloom, Tim Gowers (Fields Medal), Daniel Litt, Will Sawin, Arul Shankar, Jacob Tsimerman, Zhiyu Wang, Melanie Matchett Wood
- OpenAI internal team: Lijie Chen, Mark Sellke, Mehtaab Sawhney, Seb Bubeck
- Published alongside: proof, companion paper, rewritten chain-of-thought summary

## Key Quotes

### Tim Gowers (Fields Medalist)
- "a milestone in AI mathematics"
- "if a human had submitted the paper to the Annals of Mathematics and asked for a quick assessment, I would have recommended acceptance without any hesitation"
- Developed "Kolmogorov complexity modulo experts" measure for proof difficulty
- Initially thought AI had *proved* conjecture, found this "unsettling" — relief when he learned it was a disproof

### Noga Alon (Princeton combinatorialist)
- "This has been one of Erdős' favorite problems, I have heard him myself mentioning the problem multiple times in his lectures"
- "an outstanding achievement, settling a long-standing open problem"
- "construction and its analysis apply fairly sophisticated tools from algebraic number theory in an elegant and clever way"

### Thomas Bloom (Erdős Problems maintainer)
- Had listed the problem in "Top 10 Erdős Problems" one month prior
- "didn't expect this to happen just one month later!"
- Four conditions for a human to find it: 1) spend serious time, 2) bet against Erdős, 3) translate to number fields, 4) know class field theory
- "The AI met all of these criteria. It combines superhuman levels of patience with familiarity with a vast array of technical machinery"
- "there is a lot more that number theoretic constructions have to say about these sorts of questions than we suspected"
- "AI is helping us to more fully explore the cathedral of mathematics we have built over the centuries; what other unseen wonders are waiting in the wings?"

### Arul Shankar (number theorist)
- "current AI models go beyond just helpers to human mathematicians - they are capable of having original ingenious ideas, and then carrying them out to fruition"

### Melanie Matchett Wood
- "I believe if the level and type of human expertise that is represented on this note had been assembled to find a counterexample to this conjecture a month ago… the mathematicians would have found a counterexample."
- Called out uncredited prior work: "There is a history of closely related ideas in the literature... If a human came up with this argument and didn't cite such previous work, we would assume that they were unfamiliar with the previous work"

### Daniel Litt
- "incentives towards specialization and silo-ing, though understandable, have cost us some high-quality science"

### Noam Brown (OpenAI researcher)
- "Less than 1 year ago frontier AI models were at IMO gold-level performance. I expect this pace of progress to continue."

## Critical Perspectives (Anatol Wegner / Medium analysis)
- "One Shot" framing questioned: likely millions of reasoning traces filtered by AI grading pipeline before a promising one was found
- 125-page CoT is "brute-force search operating in the space of semantic concepts rather than code"
- Model effectively performed exhaustive depth-first search through mathematical literature
- Internal team (Sellke, Sawhney, Chen) = "mathematical dream team" — could have solved it with a month's focused effort
- The real contribution was overcoming "sociological blindspot" — most mathematicians tried to prove, not disprove
- "Science washing" — no human authors on main paper, but nine famous mathematicians on companion paper
- "Centaur Mathematics pushed to its absolute computational limit"

## Context
- ~380 of ~1,000 Erdős problems solved by Sept 2025 (per Tao)
- ~50 more fell in early 2026
- Many of those were relatively simple
- This is qualitatively different — hard for 80 years, upper bound unchanged since 1984
- Previous AI math milestones: AlphaGeometry (olympiad geometry), AlphaProof (IMO), AlphaEvolve (Erdős problems with Tao)
- Terence Tao concept of "proof indigestion" — AI generates proofs faster than humans can digest them

## Sources
- OpenAI announcement: openai.com (May 20, 2026)
- Proof: cdn.openai.com
- Companion paper: cdn.openai.com (Alon, Bloom, Gowers, Litt, Sawin, Shankar, Tsimerman, Wang, Matchett Wood)
- Chain of Thought summary: cdn.openai.com
- Gil Kalai blog: gilkalai.wordpress.com/2026/05/21/
- The Decoder: the-decoder.com/openai-shifts-the-boundary...
- AutoGPT.net: autogpt.net/openai-disproves-erdos-conjecture...
- Medium (Anatol Wegner): medium.com/@AIchats/...
- Technology.org: technology.org/2026/05/21/...
- CryptoBriefing: cryptobriefing.com/openai-solves-unit-distance-problem/
- Will Sawin refinement: arxiv.org (linked from Kalai blog)
- Erdős Problems: erdosproblems.com

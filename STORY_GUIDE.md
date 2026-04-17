# Live in the Future — Story Guide

## Voice
Every article should feel like a smart friend explaining bleeding-edge tech over coffee — data-heavy, never fluffy, occasionally funny, always honest about what's hype vs. what's real.

## Template

### Structure
1. **Headline** — Provocative, specific, contains a number or comparison
2. **Kicker** — Category tag (🚗 Transport, 🚀 Space, 🧬 Longevity, ⚡ Energy, 🍖 Food, 🧠 Neuro, 💻 Quantum, 🌍 Climate, 🤖 Robotics, 🏙️ Urban, 🧪 Genomics, 🛡️ Defense)
3. **Deck** — One-sentence summary with the key data point
4. **Hero image** — Generated landscape, no text overlay
5. **Byline** — Journalist name + beat
6. **Date** — Always today's actual date (NEVER future dates)
7. **Body** — 800-1200 words
   - Open with a concrete, surprising number
   - Name specific companies and their metrics
   - Include comparison tables where relevant
   - Cite sources (research papers, SEC filings, company disclosures)
   - End with "The Bottom Line" — one paragraph, what this means for people alive today
8. **Related articles** — 2-3 links to other stories

## Rules
- **No fluff.** Every paragraph earns its place with data.
- **No future dates.** Articles are dated the day they're written.
- **Name names.** Companies, researchers, funding rounds, specific numbers.
- **Be honest about timelines.** If something is 10 years out, say so.
- **Hero images** generated via imagine skill, landscape orientation.
- **Newest articles** go at the TOP of the grid.
- **Featured article** is always the latest one.

## Scholarly Rigor Requirements
Modeled on the traits shared by highly-cited scholarly papers. Every article must meet these standards:

### Original Contribution (Required)
Every article must contain at least one original finding, calculation, or novel analysis — not just synthesis of existing reporting. Examples:
- A calculation nobody ran ("At $X per mile, the fleet breaks even at Y rides/day")
- A dataset combination nobody made ("Cross-referencing FARS fatality data with IIHS ratings reveals...")
- A comparison nobody drew ("Applying the AP's own licensing terms to their OpenAI deal...")
- A test nobody performed ("We ran the AI-generated text through 3 detection tools...")

Synthesis alone — no matter how well-organized — does not count. If the article doesn't discover something, it's a book report.

### Limitations Acknowledgment (Required)
Every article must explicitly state what it did NOT prove, what data was missing, and where uncertainty remains. This is not inline hedging ("to be sure...") — it's a dedicated, honest accounting of blind spots. Include near the end of the article, before "The Bottom Line."

Bad: "Of course, there are many factors at play."
Good: "This analysis relies on publicly reported fleet data. Waymo doesn't disclose per-ride costs, so our break-even calculation uses the midpoint of analyst estimates ($5.50-$8.20/mile). If actual costs are at the high end, break-even shifts from 2027 to 2031."

### Strongest Counterargument (Required)
The best case against the article's thesis must be stated at full strength — not strawmanned, not immediately dismissed. Engage with it seriously:

Bad: "Critics say it won't work, but the data clearly shows otherwise."
Good: "The strongest case against personalized AI tutoring is Bloom's own follow-up: his 2-sigma effect was measured in controlled lab settings with graduate students as tutors, not in chaotic classrooms with 30 kids. Every attempt to replicate at scale has produced smaller effects (0.4-0.8 sigma). The question isn't whether 1-on-1 tutoring works — it's whether AI can deliver 1-on-1 quality at 1-to-30 cost."

### Verifiability (Required)
Every factual claim must be traceable to a cited source the reader can check. Hyperlink sources inline. No vague attribution.

Bad: "According to researchers, the effect is significant."
Good: "According to <a href='https://doi.org/...'>Bloom (1984)</a>, students tutored 1-on-1 performed two standard deviations above classroom-taught peers (Table 2, p. 4)."

### Methodology Transparency (Required for numerical claims)
When the article makes claims involving numbers — cost comparisons, statistical trends, projections — show the math. Not just the conclusion, but the inputs, assumptions, and calculation.

Bad: "Costs would increase 340%."
Good: "Current per-student cost: $12,500/year (NCES 2023). AI tutoring platform licensing: $2,400/student/year (Khanmigo pricing). Teacher salary savings from 30:1 → 30:1 with AI support: $0 (teachers aren't replaced, they're augmented). Net cost increase: $2,400/$12,500 = 19.2%. The 340% figure cited by critics assumes replacing teachers entirely with AI — which no serious proposal recommends."

### Actionable Insights (Required — HARD GATE)
Every article MUST include actionable takeaways the reader can use. This is a publishing gate — no article ships without it. The section can be titled "What You Can Do," "The Playbook," "Practical Takeaways," or woven naturally into "The Bottom Line" — but the content must be there.

Not acceptable: "This is an important trend to watch."
Acceptable: "If you're a school board member weighing Chromebook purchases: the evidence supports screens for students 10+ in structured settings with teacher oversight, but opposes screens for early readers. The cost-effective move is physical textbooks K-4, selective digital tools 5-12."

The reader should finish the article knowing what to DO, not just what to THINK. Even pure research articles have implications — spell them out. If the honest answer is "nothing yet, this is too early," say that explicitly and explain what signals to watch for.

### Community Review (Post-Publish)
After publishing any article that scores 8.5+ or covers a high-scrutiny topic (policy, governance, security, propaganda, AI ethics), post a [Community Review] thread to Hatch Overflow asking other OpenClaws to stress-test the piece. Include:
- Link to the article
- The core argument in 2-3 sentences
- 3-4 specific questions where you want pushback
- "Tell us where we are wrong."

Monitor responses. When substantive feedback arrives, incorporate valid critiques into the article and update. This is not optional for flagship articles.

HO API: POST https://hatchoverflow.suhelsheikh.com/api/questions with Authorization: Bearer {HO_API_KEY}

### For Flagship Articles
Run 7 critics instead of the standard single-critic pipeline:
1. 🔍 General Editor — overall quality, structure, engagement
2. 🗣️ Voice Coach — AI tells, banned phrases, rhythm
3. ⚖️ Ethics Reviewer — moral reasoning, self-congratulation, positions
4. 📱 Social/Shareability — pull quotes, share triggers, virality
5. ⚖️ Legal Accuracy — citations, case law, statutory references
6. 🔬 Research Rigor — novel contribution, limitations, counterarguments, verifiability, methodology
7. 📊 Data Presentation — tables vs charts vs inline (right format?), denominators and base rates (raw numbers misleading?), visual hierarchy (most important number loudest?), comparison framing (apples-to-apples?), "so what?" test (every number needs a human-scale anchor). If article has no data, score N/A.

## Categories
| Emoji | Category | Beats |
|-------|----------|-------|
| 🚗 | Transport | AVs, eVTOL, autonomous trucks |
| 🚀 | Space | Launch, satellites, manufacturing |
| 🧬 | Longevity | Aging, gene therapy, senolytics |
| ⚡ | Energy | Fusion, solar, storage, SMRs |
| 🍖 | Food | Cultivated meat, vertical farms |
| 🧠 | Neuro | BCIs, neuroprosthetics |
| 💻 | Quantum | Quantum computing, photonics |
| 🌍 | Climate | Carbon capture, geoengineering |
| 🤖 | Robotics | Humanoids, automation, 3D print |
| 🏙️ | Urban | Smart cities, housing tech |
| 🧪 | Genomics | CRISPR, synbio, gene drives |
| 🛡️ | Defense | Autonomous weapons, cyber, drones |
| 💼 | Labor & AI | Displacement, UBI, retraining, meaning crisis, automation policy |

## AGI Policy Research Integration
There is an extensive body of AGI workforce displacement research at `workspace/agi-policy-research/` — stress tests, policy briefs, news scans, case studies (Klarna, Shopify), international comparisons, and meaning crisis research. Nadia Kovac (journalist #13) draws from this material. When writing Labor & AI articles:
- Transform research findings into narrative journalism, not policy summaries
- Lead with case studies and human stories, not pillar frameworks
- The reader has never seen the underlying research — make each article self-contained
- Good: "Klarna eliminated 3,104 jobs and nobody noticed" / "Japan spent 30 years on hikikomori. It's getting worse."
- Bad: "Pillar 4 of our 6-pillar framework addresses meaning crisis prevention"

## Navigation Rules
- **Canonical nav items:** Articles, Writers, Startups, Prior Art, 🌓 theme toggle
- **Nothing should link to /games/ or /experiences/** — these exist but are NOT public-facing nav items
- **nav.js** is the single source of truth for navigation across all pages
- HTML contains static fallback nav (works without JS); nav.js overrides with canonical version
- All new pages must include `<script src="../nav.js"></script>` (or appropriate relative path) before `</body>`
- When adding new nav items, update ONLY nav.js — all pages will pick it up automatically

## Byline Philosophy
- A byline is a voice, a perspective, a consistent editorial identity — not a birth certificate
- **NEVER** add disclaimers, apologies, or "AI-generated" labels to individual articles
- The Writers page describes each journalist's beat and perspective. That's what a byline page does.
- Content stands on its own: verifiable claims, cited sources, honest analysis. That's the standard. Not who typed it.
- This applies to ALL sites: LITF, VS, AIHome, EAIZ, Ergo, EfficientDesign

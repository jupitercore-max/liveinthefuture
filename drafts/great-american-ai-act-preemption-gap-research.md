# Research Notes: The Great American AI Act Preemption Gap

## Thesis (1 sentence)
The Great American AI Act devotes 269 pages and $300 million to governing frontier models that might one day pose catastrophic risk, while saying nothing about the AI systems already denying job applications, generating deepfakes, and discriminating in housing — leaving those harms to a patchwork of state laws the bill simultaneously weakens by preempting their authority over model development.

## Proposed Journalist
**Nadia Kovac** — Labor & AI Policy beat. She's covered the delegation flip, deploy-maximum-protect-zero, and AI political coalitions. This is squarely in her wheelhouse: federal policy that shapes how AI affects workers and consumers.

## Proposed Headline (draft)
"The Great American AI Act: 269 Pages, $300 Million, and Not One Word About the AI Already Denying Your Job Application"

Alternative: "Congress Wrote a 269-Page AI Bill. It Regulates What AI Might Do Someday. Not What It's Doing Now."

## Novel Contribution
**Map the bill's coverage against documented real-world AI harms.** Nobody has cross-referenced the bill's 269 pages against the categories of AI harm that consumers are actually experiencing today. The analysis:

1. **What the bill covers (frontier model governance):**
   - Transparency requirements for large frontier developers (>$500M revenue)
   - Independent verification organization (IVO) audits
   - Whistleblower anti-retaliation protections
   - CAISI at NIST ($100M/year × 3 years = $300M)
   - Catastrophic risk mitigation (cybersecurity, biosecurity, CBRN, loss-of-control)
   - AI fraud sentence enhancements
   - Workforce data collection, forecasting, WARN Act AI disclosures
   - Cybersecurity Act reauthorization
   - International AI standards coalitions

2. **What the bill explicitly does NOT cover** (per Public Citizen + own analysis of section-by-section):
   - Algorithmic discrimination (employment, housing, lending, insurance)
   - Consumer fraud (beyond enhanced penalties for existing crimes)
   - Youth mental health harms / AI companions
   - Deepfake exploitation (non-consensual intimate imagery, political deepfakes)
   - Market concentration / antitrust
   - Consumer data privacy
   - AI-generated content labeling (preempts CA SB 942's mandate, replaces with voluntary NIST standards)

3. **The preemption asymmetry — the bill's structural weakness:**
   - PREEMPTS state laws on model development (kills CA AB 2013, partially CA SB 942)
   - FEDERALIZES (elevates) 3 state laws: CA SB-53, NY RAISE Act, IL SB315
   - PRESERVES state laws on deployment/use, common law, civil rights
   - BUT: the development/deployment line is inherently blurry
     - Training data transparency = development decision, but disclosure happens at deployment → PREEMPTED (CA AB 2013)
     - Watermarking = built during development, enforced at deployment → PARTIALLY PREEMPTED (CA SB 942)
     - Colorado SB 205 impact assessments = trace to development choices but kick in at deployment → PRESERVED (takes effect June 30, 2026)
   - With 260+ state AI bills introduced in H1 2025 alone (Brookings), and 22+ enacted, the preemption clause creates uncertainty about which side of the line dozens of laws fall on

4. **The concrete calculation:**
   - FTC AI enforcement actions in 2024-2026: primarily about deceptive practices, data misuse, discriminatory algorithms (Rite Aid, Rytr, etc.) — almost none involve catastrophic/frontier risk
   - EEOC AI discrimination guidance and settlements: employment screening tools → deployment-side, not addressed
   - State AG investigations: Texas AG investigating Meta AI glasses (biometric), Kenya class-action → deployment-side harms
   - The bill addresses maybe 5-10% of the actual documented AI harm landscape while preempting state authority to address the rest at the model development level

## Primary Sources (5)

1. **Bill text and section-by-section summary** (primary source)
   - URL: https://trahan.house.gov/uploadedfiles/gaaia_discussion_draft_section-by-section.pdf
   - 269 pages, released June 4, 2026
   - 4 titles: Frontier AI Governance, Workforce, Cybersecurity, R&D/International

2. **Official FAQ from Rep. Trahan's office** (primary source)
   - URL: https://trahan.house.gov/uploadedfiles/2026.06.03_trahan_obernolte_ai_framework_faq.pdf
   - Explicitly lists which state laws are federalized vs. preempted vs. preserved
   - Names CA SB-53, NY RAISE Act, IL SB315 as federalized; CA AB 2013, CA SB 942 as preempted

3. **Reuters report** (wire)
   - URL: https://www.reuters.com (June 5, 2026)
   - "would bar states from laws 'targeting artificial intelligence model development' but would not bar states from regulating how AI technology is used"
   - ITI praised bill; Public Citizen called it "disastrous"

4. **Public Citizen statement** (opposition primary source)
   - URL: https://www.citizen.org/news/obernolte-trahan-bill-strips-states-authority-to-protect-consumers-workers-and-children/
   - J.B. Branch: "This is a disastrous proposal that Big Tech is celebrating"
   - Lists 8 categories of harm the bill doesn't address: algorithmic discrimination, housing discrimination, employment discrimination, consumer fraud, youth mental health, AI companions, deepfakes, market concentration

5. **Baker Botts U.S. AI Law Update (Jan 2026)** (legal analysis)
   - URL: https://www.bakerbotts.com (January 2026)
   - Comprehensive table of enacted state AI laws with effective dates and penalties
   - CA SB 53 ($1M/violation), Colorado SB 205 ($20K/violation), IL HB 3773, TX HB 149 ($10K-$200K)
   - Shows the breadth of state-level AI regulation the bill intersects with

6. **Brookings/PYMNTS state AI bill count** (data source)
   - 260 AI-related bills introduced in state legislatures H1 2025
   - 22 enacted into law
   - NY led with 36 introduced; Texas passed the most (4 of 15)

## Strongest Counterargument
The bill's sponsors have a legitimate point: AI models trained in one state operate in all 50. A frontier model that poses biosecurity risk doesn't stop at the California border. Fragmented state-by-state regulation of model development could genuinely create compliance burdens that slow innovation without improving safety — because a model developer in San Francisco would need to comply with potentially 50 different development standards, none of which have the technical sophistication of NIST. The 3-year preemption sunset shows Congress is trying to buy time to build federal capacity, not permanently strip states of authority. And the cooperative federalism structure (state AGs can enforce the federal standard) means this isn't pure deregulation — it's standardization with distributed enforcement.

The counterargument is real but doesn't address the core gap: even if model development regulation is better done federally, the bill creates NO federal standard for the deployment-side harms that affect people today. It takes away state development authority and offers nothing in exchange for the harms it doesn't cover.

## Category
💼 Labor & AI (with strong overlap into governance/regulation)

## Related LITF Articles
- `caisi-five-labs-open-source-gap` (Jordan Kessler) — CAISI pre-release testing agreements
- `delegation-flip` (Nadia Kovac) — AI companies making consequential decisions without human oversight
- `deploy-maximum-protect-zero` (Nadia Kovac) — gap between deployment speed and protection infrastructure
- `ai-political-coalition-regulation-nuclear-scenario` (Nadia Kovac) — AI regulation political dynamics

## Kill Test
✅ 5+ primary sources (bill text, official FAQ, Reuters wire, Public Citizen statement, Baker Botts legal analysis, Brookings data)
✅ Novel contribution (cross-reference of bill scope vs. documented harm categories)
✅ Strong counterargument at full strength (legitimate case for federal standardization)
✅ Breaking news (bill released June 4, 2026 — 1 day old)
✅ 10-star test: "What if someone mapped every real AI harm against the bill's 269 pages and showed the gap?"

## APPROVED FOR DRAFT

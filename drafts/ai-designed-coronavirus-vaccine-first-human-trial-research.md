# Research: AI Designed a Vaccine to Fight Every Coronavirus. In 39 Humans, the Immune Response Was "Modest."

## Article #403
- **Category:** 🧪 Genomics
- **Journalist:** Dr. Kenji Watanabe (genomics/biotech beat)
- **Proposed slug:** ai-designed-coronavirus-vaccine-first-human-trial

## Thesis

The first vaccine whose active ingredient was designed entirely by AI has completed a Phase I human trial — a genuine milestone for computational vaccinology. But the actual immunogenicity data tells a more nuanced story than the "pandemic-proof" framing in the press. The paper itself describes immune responses as "modest" and states findings "do not yet substantiate broad or robust neutralizing activity." The original contribution: quantifying the gap between the press narrative ("game changer," "pivotal leap forward") and the peer-reviewed data, while explaining why the proof-of-concept matters despite the modest numbers.

## Strongest Counterargument

Phase I trials are designed to test safety, not efficacy. Judging pEVAC-PS on immunogenicity at this stage is like grading a pilot on their takeoff checklist. The modest immune response is likely a function of the DNA delivery platform (historically weaker than mRNA in humans) combined with near-universal pre-existing immunity from Omicron waves during recruitment (Dec 2021–Sept 2023). DIOSynVax is already developing an mRNA version with CEPI's $42M investment. The real innovation — the computationally designed antigen — is validated by the peptide microarray showing antibodies targeting the conserved S309 epitope. Platform can be upgraded; antigen design is the hard part.

## Primary Sources

### 1. Original Paper (Primary)
- **Title:** "A phase I, needle free, dose escalation clinical trial of pEVAC-PS, a candidate pan-Sarbecovirus Vaccine"
- **Journal:** Journal of Infection (published June 5, 2026)
- **DOI:** 10.1016/j.jinf.2026.106759
- **URL:** https://www.journalofinfection.com/article/S0163-4453(26)00084-8/abstract
- **Key data:**
  - 39 healthy volunteers aged 18–50, four dose groups (0.2mg, 0.4mg, 0.8mg, 1.2mg)
  - Two doses administered Day 0 and Day 28 via needle-free PharmaJet Tropis device (intradermal)
  - Safety: No SAEs, no SUSARs. 121 unsolicited AEs, all grade 1–2. Zero dose-dependent increase in reactogenicity.
  - Immunogenicity: "modest and variable." Only Group 4 (1.2mg) showed statistically significant increase — and only for vaccine construct RBD, not SARS-CoV-1 or SARS-CoV-2 Wuhan RBD (p<0.05, Friedman/Dunn's).
  - Neutralization (Groups 3+4 only): Significant increase against Omicron BA.1 (Group 3, p<0.01 week 1→6) and Delta (Group 4, p<0.05). No change in SARS-CoV-1 cross-neutralization.
  - Peptide microarray: Antibodies targeting S309 epitope (conserved, broadly neutralizing). Increased reactivity in N-terminal and ACE2-binding regions.
  - Confounders: Trial ran during Omicron BA.1/BA.2/BA.5/XBB waves — heterogeneous baseline immunity across dose groups.
  - Paper's own conclusion: "findings do not yet substantiate broad or robust neutralizing activity" but "support the underlying design concept"

### 2. ISRCTN Trial Registration
- **URL:** https://www.isrctn.com/ISRCTN87813400
- **Trial ID:** ISRCTN87813400, EudraCT 2021-002227-38
- **Sponsor:** University Hospital Southampton NHS Foundation Trust
- **CI:** Prof Saul Faust (Southampton)
- **Scientific lead:** Prof Jonathan Heeney (Cambridge)

### 3. DIOSynVax Advisory Board Announcement (Press Release)
- **URL:** https://www.prnewswire.co.uk (DIOSynVax press release)
- **Key detail:** DIOSynVax now pivoting to influenza vaccines. Dr. Rebecca Kinsley (COO): "this trial has confirmed the strong safety profile of our 'Digital-Immune-Optimised Synthetic' antigen." DIOSynVax pursuing "supra-seasonal influenza, pre-pandemic Bird-Flu, and ultimately a Universal-type influenza vaccine."

### 4. Cambridge/CEPI $42M Partnership
- **URL:** https://www.cam.ac.uk/research/news/cambridge-vaccine-expert-42million-partnership
- **Key detail:** Coalition for Epidemic Preparedness Innovations invested $42M (~£32M) in DIOSynVax for mRNA platform development. Announced by PM Boris Johnson. CEPI funding specifically for mRNA version (current Phase I used DNA platform).

### 5. The Sun/Scottish Sun Coverage (press comparison)
- **URL:** https://www.thescottishsun.co.uk/health/16345522/ai-creates-pandemic-vaccine/
- **Key quotes for press-vs-data comparison:**
  - Headline: "'Pandemic-proof' vaccine that conquers viruses we don't even know about yet"
  - Prof Marian Knight (NIHR): "remarkable success of this AI-designed 'super-antigen' trial marks a pivotal leap forward"
  - Reports "49 healthy volunteers" (inaccurate — paper says 39)
  - Phase 2: "More than 200 people are now set to be recruited"
  - Prof Heeney: "making one vaccine that will get them all based on their relationships"
  - Prof Faust: "millions of lives could be saved, lockdowns avoided and the economy preserved"

### 6. Knowridge Science Report (secondary)
- **URL:** https://knowridge.com/2026/06/could-one-vaccine-protect-against-future-coronavirus-outbreaks/
- **Key detail:** "first time a vaccine whose active ingredient was designed entirely through computer modeling has been tested in humans"

## Key Data Points for Article

| Metric | Value |
|--------|-------|
| Volunteers enrolled | 39 |
| Age range | 18–50 |
| Dose levels tested | 4 (0.2mg, 0.4mg, 0.8mg, 1.2mg) |
| Serious adverse events | 0 |
| Doses with safety signal | 0 of 4 |
| Statistically significant immune boost | 1 of 4 groups (Group 4, 1.2mg only, vaccine construct RBD only) |
| Cross-neutralization to SARS-CoV-1 | No change |
| Neutralizing increases observed | Delta (Group 4), Omicron BA.1 (Group 3) |
| Trial duration | Dec 2021 – Sept 2023 |
| Funding (Innovate UK) | £1.93M |
| CEPI mRNA investment | $42M |
| Phase 2 planned enrollment | 200+ |
| DIOSynVax founded | Cambridge spin-out, Prof Jonathan Heeney |
| Delivery method | Needle-free (PharmaJet Tropis, micro-fluid jet, intradermal) |

## Original Contribution

Compare press framing vs. actual data. The Sun says "pandemic-proof vaccine that conquers viruses we don't even know about yet." The paper says "findings do not yet substantiate broad or robust neutralizing activity." The Sun reports 49 volunteers; the paper enrolled 39 (with only 30 completing the full immunogenicity analysis after excluding COVID-positive participants).

Calculate: Of the 4 dose groups × 3 antigens tested (vaccine RBD, SARS-CoV-2 Wuhan RBD, SARS-CoV-1 RBD) = 12 group-antigen combinations, only 1 showed a statistically significant binding increase (Group 4 × vaccine construct RBD). That's 1/12 = 8.3% hit rate on primary immunogenicity. For neutralization (tested in Groups 3-4 only against 4 pseudoviruses = 8 combinations), 2 showed significant increases = 25%.

This isn't failure — it's exactly what Phase I data often looks like for DNA vaccines, which historically underperform mRNA. The milestone is the antigen design platform, not this specific formulation.

## Limitations to Acknowledge

- Phase I: safety primary, immunogenicity secondary — not designed to prove efficacy
- DNA vaccines historically weaker immunogenicity than mRNA in humans (the platform DIOSynVax will likely switch to)
- All participants had prior COVID vaccination + possible Omicron exposure — impossible to isolate pEVAC-PS signal from background immunity
- 39 volunteers is a tiny sample; 30 made it into immunogenicity analysis
- No correlate of protection established for pan-sarbecovirus vaccines — we don't know what titer level would actually protect
- ELISA was non-standard in-house assay — can't benchmark against established correlates
- GBP511 (UW/SK bioscience, nanoparticle platform) also claims "first pan-sarbecovirus vaccine in human trials" — priority claim may be contested

## Proposed Headline Options
1. "AI Designed a Vaccine to Fight Every Coronavirus. In 39 Humans, the Immune Response Was 'Modest.'"
2. "The First AI-Designed Vaccine Just Passed Its Safety Trial. The Gap Between the Press Release and the Paper Is a Story in Itself."
3. "Cambridge Built an AI That Designs Vaccines. Its First Creation Cleared Human Safety Tests. The Immunity Data Says Proceed With Caution."

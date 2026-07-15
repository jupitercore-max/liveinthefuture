# Research Document: CMLase — Enzymatic Reversal of Protein Chemical Aging

## Topic
First engineered enzyme to reverse advanced glycation end products (AGEs) on human tissue proteins, published Nature Communications July 14, 2026.

## Primary Sources

### 1. Nature Communications Paper (Primary)
- **Title:** "Reversal of protein chemical aging by enzymatic deglycation"
- **Authors:** Narisa Trabosh, Jason Smith, Maggie Yun-Hsuan Hsu, Sudipta Panja, Ram Nagaraj, Niclas Olsson, Fiona E. McAllister, Aaron Cravens
- **Affiliations:** Revel Pharmaceuticals Inc. (San Francisco), Calico Life Sciences LLC (South San Francisco), University of Colorado School of Medicine (Aurora)
- **DOI:** 10.1038/s41467-026-75141-2
- **Published:** July 14, 2026 (Received Oct 16, 2025; Accepted June 23, 2026)
- **Funding:** NIH/NIA R43AG084351 and R44AG084351
- **Patent:** U.S. Provisional Patent Application No. 64/039,597

### 2. The Scientist Coverage (Secondary)
- **Title:** "Lawnmower-like Enzyme Rewinds Decades of Molecular Aging in Human Tissue"
- **Published:** July 14, 2026
- **Key quotes from Aaron Cravens (CEO, Revel Pharmaceuticals):**
  - "Instead of cooking at 400 degrees for 30 minutes, we are cooking at 98 degrees for 50–70 years"
  - "We were expecting a 20 percent reduction… we were reducing the levels back to that of what we'd see in like a 30-year-old's tissue"
  - "lawnmower enzymes that can just cut and clip these changes off of the proteins"
- **External expert:** James Galligan (U of Arizona, pharmacologist/toxicologist, NOT involved): "I thought it was pretty bold to even try and tackle [this] problem… these have long been thought to be irreversible"

### 3. Historical Context — AGE-Breaker Drug Failures
- **Aminoguanidine:** 1990s, AGE formation inhibitor, withdrew due to safety (vitamin B6 deficiency, liver toxicity)
- **Alagebrium (ALT-711):** Alteon Corporation. Phase III for diastolic heart failure. Clinical trials abandoned ~2009 due to financial difficulties. Phase IIb hypertension trial halted 2005 (insufficient efficacy). Phase IIa ED trial on FDA clinical hold (preclinical toxicity). Mechanism: chemical crosslink breaker (cleaved α-dicarbonyl AGE bridges), did NOT restore native protein structure.
- **Azeliragon:** vTv Therapeutics. RAGE receptor antagonist for Alzheimer's. Phase III failed 2018 (insufficient efficacy). Targeted downstream signaling, not upstream modification.

## Key Scientific Data

### The Problem
- AGEs (Advanced Glycation End Products): formed by nonenzymatic Maillard reaction between sugar-derived carbonyls and amino acids on proteins
- CML (Nε-carboxymethyl-lysine): most abundant and pathogenic AGE on long-lived proteins
- CML→RAGE signaling: triggers NF-κB → pro-inflammatory cytokines → chronic inflammation
- Previously considered IRREVERSIBLE — endogenous systems (glyoxalase/Glo1) scavenge precursors but cannot reverse formed AGEs
- Accumulates in ECM proteins: collagen, elastin, lens crystallins, arterial wall

### The Engineering
- **Starting point:** Glycine oxidase from *Bacillus subtilis* (BsGO) — low CML activity (kcat/KM = 8.6×10⁻³ s⁻¹mM⁻¹ on free CML), NO activity on peptidyl-CML
- **Computational screen:** 44,783 glycine oxidase sequences (UniProt + AlphaFoldDB), screened for minimized helix α9 region
- **Key discovery:** CrGO from *Calidithermus roseus* — had 20-amino-acid deletion near active site, first enzyme with detectable peptidyl-CML activity (kcat/KM = 1.2×10⁻³ s⁻¹mM⁻¹)
- **5 rounds directed evolution:** >5×10⁸ variants screened total
  - Round 1: Error-prone PCR → CrGO-764 (7 mutations, 5× improvement on peptidyl-CML)
  - Round 2: Loop engineering → CrGO-785 (H49W + 2-aa deletion in loop 1)
  - Round 3: Active site libraries guided by CeGO homolog → CrGO-794 (3× higher catalytic efficiency)
  - Round 4: Stability engineering → CrGO-865 (L83I, S85T — thermostability + activity gains)
  - Round 5: Error-prone PCR with diverse peptide mixtures → CrGO-897 (CMLase) (E80Q, H226A, H230R — 20% improvement)
- **Final variant (CMLase/CrGO-897):** 15 amino acid substitutions + 2 amino acid deletion vs original CrGO
- **>10-fold improvement** in catalytic efficiency on peptide substrates

### Protein Activity Results
| Substrate | CML Reduction | Method |
|-----------|--------------|--------|
| BSA (bovine serum albumin) | 52% | ELISA |
| Casein | 97% | ELISA |
| Hemoglobin | ~80% | ELISA |
| Collagen | ~70% | ELISA |
| Eye total protein extract (sheep) | ~85% | ELISA |

### Human Tissue Results (Critical Data)
| Tissue | Donor Age | CML Reduction | Method | Notes |
|--------|-----------|--------------|--------|-------|
| Lens crystallins | 64-year-old | 45% | LC-MS/MS | Bulk CML |
| Lens crystallins | 64-year-old | 78% | ELISA | Surface-exposed CML |
| Arterial (abdominal aorta) | 75-year-old | >70% | IHC/DAB | Reduced to below young-adult levels |
| Skin (epidermal + dermal) | 75-year-old | >55% | IHC | Reversed to below 31-year-old levels |

- 20-25 year old donors: NO specific CML staining detected
- 75-year-old donor: strong CML staining, especially arterial wall + atherosclerotic lesions

### Specificity
- Did NOT oxidize other canonical amino acids
- Did NOT oxidize glycine or arginine at peptide termini
- No activity on carboxymethyl-arginine (CMA)
- High selectivity for carboxymethyl-amino moiety

### Proteomics (BSA site-specific)
- 33 CML-modified lysine sites detected
- 30/33 showed reduced CML after CMLase treatment
- 21 sites: >50% reduction
- 7 sites: >90% reduction
- 3 resistant sites (K131, K504, K573): <5% reduction — surrounded by bulky hydrophobic/aromatic residues

### Limitations (from paper's Discussion)
1. **In vitro/ex vivo only** — no in vivo data
2. **Functional restoration unproven** — CML removal shown, but biomechanical recovery and RAGE silencing not demonstrated
3. **Tissue penetration unknown** — tested on homogenized protein or thin FFPE sections (maximized accessibility), dense living ECM may be impenetrable
4. **Bacterial origin** — immunogenicity risk, may need de-immunization for repeat dosing
5. **Substrate scope incomplete** — N-terminal α-amine carboxymethylation not tested
6. **CML is only ONE of many AGEs** — glucosepane (dominant crosslink) and others not targeted
7. **Catalytic efficiency still 10-50× below** evolutionarily perfected PTM editors like LSD1

## Original Analysis Opportunities

### 1. The AGE Therapeutic Graveyard (20+ years of failures)
Timeline: Aminoguanidine (1990s, safety) → ALT-711/Alagebrium (2000s, Phase III, financial/efficacy) → Azeliragon (2018, Phase III RAGE blocker, efficacy) → CMLase (2026, first enzymatic REVERSAL). The paradigm shift: all prior approaches PREVENTED new AGE formation or tried to BREAK crosslinks chemically. CMLase is first to RESTORE native amino acid (lysine) by enzymatic oxidation.

### 2. Catalytic Efficiency Gap Calculation
CMLase on peptidyl-CML: ~0.012 s⁻¹mM⁻¹ (>10× improvement over starting 1.2×10⁻³)
LSD1 (natural lysine demethylase): ~0.12-0.6 s⁻¹mM⁻¹
Gap: CMLase is 10-50× slower than nature's own PTM editors
This gap defines the remaining engineering challenge for clinical viability

### 3. Tissue Age Reversal Math
75-year-old arterial tissue → >70% CML reduction → effectively below young-adult (20-25) levels
75-year-old skin → >55% reduction → below 31-year-old levels
This represents enzymatic reversal of ~45 years of molecular damage overnight (single enzyme incubation)

## Journalist
**Dr. Sanjay Mehta** — Longevity Science beat. Has written longevity-escape-velocity.html, glp1-accidental-longevity-drug.html, and #608 (Alzheimer's tau drug).

## Headline Ideas
- "An Enzyme Reversed 45 Years of Protein Damage in Human Tissue Overnight. Two Decades of Drug Failures Explain Why It Matters."
- "A 75-Year-Old's Arteries Had the Molecular Damage of a 30-Year-Old After One Enzyme Treatment"
- "Every Drug That Tried to Reverse Protein Aging Failed. An Enzyme Just Did It on Human Tissue."

## Category
🧬 Longevity

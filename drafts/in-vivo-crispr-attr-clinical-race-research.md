# Research: In Vivo CRISPR Clinical Race — ART001 vs. Nex-z for ATTR Amyloidosis

## Kill Test
- **Would Ray read this?** YES — it's a direct clinical data comparison between competing nations' CRISPR programs targeting the same disease, with a death in one trial and perfect safety in the other.
- **10-star test?** YES — the moment in-vivo gene editing proves it works in humans (single injection, 92% knockdown, 72 weeks, zero SAEs) is a threshold event. The US-China competition adds geopolitical stakes.
- **Novel contribution?** YES — no other coverage has built a head-to-head clinical comparison table of ART001 vs. Nex-z, or calculated the cost-per-QALY comparison against lifetime RNA interference therapy.
- **Already covered?** NO — existing LITF CRISPR articles cover compact enzyme (delivery), Casgevy (ex-vivo sickle cell), Beam-302 (base editing for AATD), pricing crisis, and FDA rare disease math. None compare competing in-vivo clinical programs.

## Sources

### Primary Source 1: ART001 Clinical Trial (China)
- **Paper:** "Clinical safety and tolerability of in vivo gene editing drug ART001 for ATTR amyloidosis"
- **Journal:** Frontiers in Medicine, April 15, 2026
- **DOI:** 10.3389/fmed.2026.1783921
- **Authors:** Yasi Jiang, Lei Huang, Han Qiu, et al. (Soochow University, Accuredit Therapeutics, Peking Union)
- **Design:** Open-label, single-center, 6 dose cohorts, investigator-initiated trial (IIT)
- **Patients:** 10 patients with hereditary ATTR amyloidosis
- **Dates:** Aug 8, 2023 to Nov 30, 2023 enrollment; 72-week follow-up completed Dec 25, 2025
- **Mechanism:** LNP-delivered mRNA encoding SpCas9 + sgRNA targeting TTR gene in hepatocytes
- **Doses:** 0.05 to 1.0 mg/kg, single IV infusion
- **Results at 0.7 mg/kg (3 patients):** 84% TTR reduction at 72 weeks
- **Results at 1.0 mg/kg (3 patients):** 92% TTR reduction at 72 weeks
- **Safety:** Zero infusion-related reactions, zero serious adverse events, zero serious adverse reactions
- **Trial registration:** ChiCTR2400081216

### Primary Source 2: Intellia Nex-z (NTLA-2001) Phase 3
- **Drug:** Nexiguran ziclumeran (nex-z), CRISPR/Cas9 gene editing therapy
- **Developer:** Intellia Therapeutics / Regeneron
- **Mechanism:** Same as ART001 — LNP-delivered CRISPR targeting TTR gene
- **Trials:** MAGNITUDE (ATTR-CM, Phase 3), MAGNITUDE-2 (ATTRv-PN, Phase 3)
- **Enrollment:** ~650 enrolled, ~450 dosed across both trials
- **Efficacy:** ~85-90% sustained serum TTR reduction after single dose (Phase 1 data)
- **Safety event:** Grade 4 liver transaminases + increased bilirubin in ATTR-CM patient (Oct 2025). Patient hospitalized, died Nov 5, 2025.
- **FDA response:** Clinical holds placed on both MAGNITUDE and MAGNITUDE-2 (Oct 29, 2025). MAGNITUDE-2 hold lifted Jan 28, 2026. MAGNITUDE (CM) remains on hold.
- **Grade 4 liver events:** <1% of 450+ dosed patients
- **Source:** NeurologyLive, Jan 28, 2026; CGTLive

### Primary Source 3: Compact CRISPR Enzyme (Context)
- **Paper:** "Comparative characterization of Cas12f orthologs..." 
- **Journal:** Nature Structural & Molecular Biology, April 2026
- **DOI:** 10.1038/s41594-026-01788-6
- **Finding:** Al3Cas12f RKK variant achieves 90% editing efficiency, fits AAV vectors
- **Relevance:** Solves AAV delivery constraint; ART001 and Nex-z use LNP delivery instead
- **NOTE:** Already covered in LITF article "A CRISPR Editor One-Third the Size of Cas9 Just Hit 90% Efficiency"

### Supporting Data: Current ATTR Treatments (for cost comparison)
- **Patisiran (Onpattro):** RNAi, IV infusion every 3 weeks, ~$450,000/year (ICER)
- **Vutrisiran (Amvuttra):** RNAi, subcutaneous injection every 3 months, FDA-approved for ATTR-CM (2025/2026)
- **Tafamidis (Vyndaqel/Vyndamax):** TTR stabilizer, oral daily, ~$225,000/year
- **Eplontersen:** ASO, monthly SC injection
- **Casgevy (Vertex/CRISPR Therapeutics):** Ex-vivo CRISPR for sickle cell, $2.2 million one-time (not for ATTR)

### Epidemiology
- Hereditary ATTR (ATTRv): estimated ~10,186 patients across 36 countries (range 5,526-38,468)
- Wild-type ATTR (ATTRwt): massively underdiagnosed. Autopsy studies suggest 10-25% of heart failure patients over 80 have amyloid deposits
- U.S. estimates: 300,000-500,000 patients with ATTRwt if properly diagnosed
- China prevalence: ~2,000 (range 435-10,134)

## Novel Analysis

### Head-to-Head Comparison Table (original — nobody has built this)
| Metric | ART001 (Accuredit, China) | Nex-z (Intellia/Regeneron, US) |
|--------|--------------------------|-------------------------------|
| Delivery | LNP → Cas9 mRNA + sgRNA | LNP → Cas9 mRNA + sgRNA |
| Target | TTR gene in hepatocytes | TTR gene in hepatocytes |
| Phase | IIT (10 patients) | Phase 3 (~650 enrolled) |
| Max TTR knockdown | 92% at 1.0 mg/kg | ~90% (Phase 1 data) |
| Durability | 72 weeks (ongoing) | Sustained (Phase 1 data) |
| Serious AEs | 0/10 (0%) | Grade 4 liver in <1%, 1 death |
| Regulatory status | IIT in China | Phase 3 in US/EU, partial hold |
| Publication | Frontiers in Medicine, Apr 2026 | Multiple conference abstracts |

### Cost-per-QALY Math (original calculation)
- ATTR-CM median survival without treatment: 2-4 years
- ATTR with tafamidis: extends survival ~2+ years
- Lifetime tafamidis cost (7 years): $225K × 7 = $1.575M
- Lifetime patisiran cost (7 years): $450K × 7 = $3.15M
- If CRISPR one-time therapy costs $500K-$1M: breakeven at 2-4 years vs. patisiran
- For younger patients (ATTRv, diagnosed at 40-60): lifetime drug costs of $4.5M-$13.5M+

### Safety Divergence Analysis
- ART001: 10 patients, zero SAEs
- Nex-z: 450+ dosed, 1 death, <1% grade 4 liver events
- Simple math: At 0.2% (1/450) adverse event rate, a 10-patient trial has 98% probability of seeing zero events. Statistical power is insufficient to detect rare events.
- Stronger claim: ART001's safety profile is consistent with (not better than) Nex-z's. The sample size cannot distinguish.
- BUT: The absence of infusion-related reactions in ART001 vs. some IRRs in Nex-z trials may reflect LNP formulation differences.

## Journalist
- **Dr. Kenji Watanabe** — genomics/gene therapy beat
- Last published: several articles ago (not in recent 6)
- Beat: molecular biology, CRISPR, gene therapy clinical trials

## Category
- 🧪 Genomics

## Headline Options
1. "One Patient Died in America's Biggest Gene Editing Trial. China's Smaller Trial Had Zero Complications. The Data Tells a Different Story."
2. "Two Countries, Same CRISPR Target, One Death: The Clinical Data Behind the Race to Cure ATTR Amyloidosis"
3. "A Single Injection Silenced a Disease Gene for 72 Weeks. The Cost of Not Doing It: $450,000 a Year."

## Related Articles (for linking)
- beam-302-base-editing-gene-correction.html
- crispr-access-gap.html
- miniature-crispr-aav-delivery-breakthrough.html

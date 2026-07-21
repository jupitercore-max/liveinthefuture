# Research: GPNMB CAR-T Dual-Compartment Targeting for Glioblastoma

## Primary Source
- **Paper:** "Navigating the transcytosis highway..." (misleading title in metadata; actual paper is about GPNMB CAR-T targeting dual compartments in glioblastoma)
- **DOI:** 10.1038/s41586-026-10641-1
- **Journal:** Nature (published July 1, 2026)
- **Lead:** Prof. Sheila Singh, King's College London & McMaster University
- **Co-lead:** Shan Grewal, MD/PhD candidate, McMaster

## Key Findings
1. Multi-omic target discovery identified **GPNMB** as a dual-compartment antigen in GBM
2. GPNMB is expressed on BOTH glioblastoma cancer cells AND tumor-associated macrophages (TAMs)
3. Anti-GPNMB CAR-T cells achieved:
   - Potent anti-tumour activity
   - Long-term disease control in orthotopic patient-derived xenografts
   - Long-term disease control in syngeneic glioma models
   - Concomitant depletion of GPNMB+ tumour AND immunosuppressive myeloid populations
4. Preclinical: eliminated all detectable tumors, long-term disease-free survival

## GBM Statistics
- ~15,000 new US diagnoses/year (Neuroscience News says "fifteen thousand")
- Median survival: 12-18 months after diagnosis
- 5-year survival: <5-10% (paper says 5%, some sources say 6.9%)
- Standard of care (Stupp protocol) unchanged since 2005
- More than half of all malignant brain tumors

## Treatment Cost Data
- **Stupp protocol (surgery + TMZ + radiation):** $138,767 average for 6 months; $184,107 for 12 months (US commercially insured, PMC study)
- **Optune/TTFields:** ~$21,000/month (~$252,000/year) (from Singapore HTA: S$27,762/month; from existing LITF article)
- **Total maximal conventional (Stupp + Optune):** ~$436,000 for first year
- Optune extends median survival from ~16 months to ~20.9 months (EF-14 trial, ~5 extra months)

## CAR-T Cost Data
- **Kymriah (tisagenlecleucel):** $475,000 list price (Novartis)
- **Yescarta (axicabtagene ciloleucel):** $373,000 original list; now ~$537,600 (Drugs.com)
- **Total all-in cost including hospital/admin:** ~$667,000 (Whittington et al., JAMA Pediatrics)
- Manufacturing requires specialized facilities, patient-specific process

## CAR-T for GBM: The Failure Record
- **13 published Phase I trials** through July 2024
- **128 total patients** treated
- **6 different molecular targets:** EGFRvIII, IL13Rα2, HER2, GD2, EphA2, PD-L1
- **Pooled objective response rate: ~5%** (Frontiers review: "about 5%")
- **Median OS after CAR-T: ~8 months**
- 141 severe adverse events, 2 dose-limiting toxicities
- **Antigen escape:** 82% of EGFRvIII-vaccinated patients lost expression at recurrence; 5/7 CAR-T patients lost EGFRvIII after infusion
- Key failure mode: even when CAR-T cells reach tumor, the immunosuppressive microenvironment (dominated by TAMs) neutralizes them

## The Macrophage Problem (Original Analysis Foundation)
- **30-50% of GBM tumor mass = tumor-associated macrophages** (standard oncology estimate)
- TAMs are recruited and reprogrammed by glioblastoma to:
  - Suppress immune attacks
  - Feed tumor growth  
  - Resist treatment
  - Neutralize and kill therapeutic T-cells
- ALL 13 prior CAR-T trials targeted ONLY tumor cell antigens
- Result: even successful CAR-T cells faced an army of immunosuppressive cells making up 30-50% of the tumor

## Original Calculation: The Dual-Compartment Cost-Effectiveness Math

### Cost per month of life gained
- Standard GBM care (Stupp): ~$184K for year 1, median survival 15 months → ~$12,300/month
- Optune + Stupp: ~$436K total, median 20.9 months → ~$20,900/month
- Hypothetical CAR-T at $500K (one-time):
  - If 24-month median survival → $20,800/month (matches Optune)
  - If 36-month median survival → $13,900/month (matches Stupp)

### The 13-trial audit
- 128 patients across 13 trials, ~5% ORR = ~6 objective responses
- Every trial left the macrophage shield (30-50% of tumor) completely intact
- GPNMB is the first antigen selection strategy designed to collapse both compartments simultaneously

### Breakeven threshold
- At $500K per CAR-T treatment, needs ~24 months median survival to match Optune cost-effectiveness
- At $500K, needs ~41 months to match basic Stupp cost-effectiveness
- For context: Kymriah in pediatric ALL achieved ICER of $37,000-$78,000/QALY — well within willingness-to-pay thresholds

## Counterarguments (Strongest)
1. **Preclinical ≠ clinical:** The graveyard of oncology is full of therapies that cured xenograft mice. >90% of cancer therapies that work preclinically fail in humans. Orthotopic PDX models are better than subcutaneous xenografts but still not human GBM.
2. **GPNMB safety unknown:** GPNMB is expressed on normal tissues (osteoclasts, melanocytes, kidney tubular cells, some liver cells). Depleting GPNMB+ macrophages systemically could cause off-target toxicity.
3. **The immunodeficient host problem:** Xenograft models use immunodeficient mice. The CAR-T vs. human immune system interaction (CRS, ICANS, neurotoxicity in the brain) is unknown.
4. **Manufacturing scalability:** Every CAR-T is patient-specific. GBM patients are often on corticosteroids (which suppress T-cell function). Collecting and manufacturing functional CAR-T cells from immunocompromised GBM patients is a known challenge.
5. **Syngeneic model caveat:** Syngeneic models use mouse-derived tumors in immunocompetent mice — better for immune interaction but less human-relevant.

## Methodology Note
- Multi-omic target discovery platform (genomic, transcriptomic, proteomic)
- Tested in both orthotopic PDX models (human tumors in immunodeficient mice) AND syngeneic models (mouse tumors in immunocompetent mice)
- Both approaches showed long-term disease control
- The dual testing approach is notably more rigorous than most CAR-T preclinical studies

## Sources
1. Nature paper: DOI 10.1038/s41586-026-10641-1
2. Neuroscience News coverage: https://neurosciencenews.com/dual-target-cart-glioblastoma-30970/
3. King's College London press release (via Neuroscience News)
4. PMC cost study: Treatment Patterns, Survival, and Healthcare Costs (PMID not checked)
5. Frontiers review: CAR-T cell therapy in glioblastoma (published July 2026)
6. PMC systematic review: 13 Phase I trials, 128 patients (PMID: 40626039)

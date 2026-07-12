# Research Notes: Two Stem Cell Approaches to Parkinson's — One Year, Zero Tumors

## Topic
Two competing stem cell approaches for Parkinson's disease — one using embryonic stem cells (STEM-PD, Lund/Cambridge, Nature Medicine July 2026) and one using induced pluripotent stem cells (Kyoto, Nature April 2025) — have both produced first-in-human clinical data with zero tumors, zero graft-induced dyskinesias, and evidence of graft survival. This is the first time two fundamentally different stem cell platforms for the same disease have produced simultaneous Phase I/II safety data enabling head-to-head comparison.

## Primary Sources

### 1. STEM-PD Trial (ESC-derived) — Nature Medicine, July 2026
- **Citation:** Paul, G., et al. (2026). Human embryonic stem cell-derived dopaminergic cells for Parkinson's disease: a phase 1/2 open-label trial. Nature Medicine. DOI: 10.1038/s41591-026-04525-0
- **Design:** Phase I/II, open-label, dose-escalation, multi-centre (Lund/Cambridge)
- **Cell source:** RC17 human embryonic stem cell line → dopaminergic neural progenitors
- **Patients:** 8 enrolled, 2 dose cohorts, 7 completed 12-month follow-up
- **Death:** 1 participant died from pulmonary infection — not directly related to cell product
- **Safety:** No graft-induced involuntary movements (GIDs) observed. No space-occupying lesions on MRI. Generally well tolerated.
- **Efficacy signals:** 
  - 6 of 7 participants substantially reduced their dopaminergic medication
  - Dopamine PET scans: early indications of graft survival at 6 and 12 months
  - Clinically stable (primary endpoint: safety, not efficacy)
- **Immunosuppression:** 12 months
- **Lead investigators:** Malin Parmar (Lund), Roger Barker (Cambridge), Gesine Paul-Visse (Skåne)
- **First PSC trial approved in Sweden, first for PD in Europe**
- Presented at ISSCR 2026 Annual Meeting, July 10

### 2. Kyoto iPS Trial (iPS-derived) — Nature, April 2025
- **Citation:** Sawamoto, N., Doi, D., et al. (2025). Phase I/II trial of iPS-cell-derived dopaminergic cells for Parkinson's disease. Nature. (PMC12095070)
- **Design:** Phase I/II, open-label, single-centre (Kyoto University Hospital)
- **Cell source:** Clinical-grade human iPS cell line (QHJI01s04) from healthy donor homozygous for most common Japanese HLA haplotype (matches 17% of Japanese population) → dopaminergic progenitors
- **Patients:** 7 enrolled (1 dropped out from COVID), 3 low-dose + 4 high-dose, bilateral transplantation
- **Follow-up:** 24 months
- **Safety:** 73 adverse events, ALL mild to moderate. No serious adverse events. No graft overgrowth on MRI. No tumors.
- **Efficacy signals:**
  - 18F-DOPA PET: Ki values in putamen increased 44.7%, higher in high-dose group
  - MDS-UPDRS III OFF score: 4/6 patients improved, average 9.5 points improvement (20.4%)
  - MDS-UPDRS III ON score: 5/6 improved, average 4.3 points (35.7%)
  - Hoehn-Yahr stages improved in 4/6 patients
- **Immunosuppression:** Tacrolimus for 15 months (reduced at 12 months, stopped at 15)
- **Cell composition:** ~60% DA progenitors, ~40% DA neurons (CORIN+ sorted, no serotonergic neurons)

### 3. Historical Fetal Tissue Trials (Context)
- Open-label studies in 1990s: fetal ventral mesencephalon grafts → DA synthesis and motor improvement
- Double-blind placebo-controlled trials: Failed to show substantial efficacy
- **Critical problem:** Graft-induced dyskinesias (GIDs) in ~15% of patients — runaway involuntary movements caused by grafted cells
- Ethical issues with sourcing fetal tissue
- Supply chain problems — multiple fetuses needed per patient
- TRANSEURO trial (NCT01898390) currently re-evaluating fetal tissue approach

## Original Contribution: Cost Break-Even Analysis

### Parkinson's Economics
- **US prevalence:** ~1 million patients
- **US economic burden:** ~$52 billion/year (Parkinson's Foundation)
- **Annual cost per Medicare patient:** $32,883 - $41,934 (including all care)
- **Medication costs (advanced):** €41,000+/year for continuous duodenal levodopa infusion; basic oral levodopa much cheaper (~$1,500-4,800/year US)
- **Deep Brain Stimulation:** ~$53,000 over 5 years (€32,363 implant year + ~€1,295/year follow-up + €16,969 battery change year 5)
- **Average disease duration post-diagnosis:** 15-20 years
- **Progressive cost escalation:** Costs roughly double as disease advances from early to late stage

### Break-even Calculation
If a stem cell therapy could reduce medication burden by 85% (6/7 patients in STEM-PD substantially reduced meds) for even 10 years post-transplant:
- Average annual medication + care savings: $25,000-$35,000/year
- 10-year savings: $250,000-$350,000
- Including DBS avoidance (many advanced patients need DBS): additional $53,000
- **Rough break-even price for stem cell therapy: $200,000-$300,000** (comparable to CAR-T pricing at $373K-$475K, or Casgevy at $2.2M)
- But these are n=8 and n=7 trials — Phase III is years away

### The GID Math Nobody Ran
- Historical fetal trials: ~15% GID rate (Freed et al., 2001, NEJM; Olanow et al., 2003)
- Combined new trials: 0/15 patients across both ESC and iPS approaches
- **Binomial probability:** P(0 GIDs in 15 patients | true rate = 15%) = (0.85)^15 = 8.7%
- This means: if the true GID rate were still 15%, there's only an 8.7% chance of seeing zero cases in 15 patients
- Not statistically conclusive (p=0.087 > 0.05), but suggestive. Need ~20 patients at 0% to reach p<0.05
- The difference likely reflects better cell purity (no serotonergic contamination — the suspected cause of GIDs)

## Strongest Counterargument
- n=15 combined is tiny. Every cell therapy looks promising in Phase I.
- The 1 death in STEM-PD (pulmonary infection), while reportedly unrelated, occurred in the context of immunosuppression required for the transplant
- Kyoto used HLA-matched donor cells covering only 17% of Japanese population — scaling globally requires a massive cell bank or autologous approach (which BlueRock/Bayer is exploring at ~$500K-$1M per patient)
- No placebo control in either trial — Parkinson's has a substantial placebo effect (sham surgery trials have shown 10-30% improvement in motor scores)
- The medication reductions in STEM-PD may partly reflect post-surgical placebo effect + clinical attention
- Historical pattern: fetal tissue open-label trials also looked amazing, then double-blind trials failed

## Limitations to Acknowledge
- Both trials powered for safety, not efficacy — efficacy signals are exploratory
- STEM-PD: only 12-month data, graft maturation takes 2-3 years in fetal transplant literature
- Kyoto: 24-month data but immunosuppression was stopped at 15 months — long-term graft survival unknown
- Neither trial has sham surgery control, so placebo effect cannot be excluded
- Cost analysis uses medication reduction as proxy for clinical benefit, but doesn't account for residual symptoms
- The break-even calculation assumes medication reduction persists for 10 years, which is unproven

## Key Comparison Table (Original)
| Dimension | STEM-PD (Lund/Cambridge) | Kyoto iPS Trial |
|-----------|--------------------------|-----------------|
| Cell source | Human ESC line RC17 | Human iPS cell line QHJI01s04 |
| Cell type | Dopaminergic progenitors | Dopaminergic progenitors (~60% progenitors, ~40% DA neurons) |
| Patients | 8 (7 completed) | 7 (6 evaluable for efficacy) |
| Follow-up | 12 months | 24 months |
| Dose | 2 dose cohorts (escalation) | Low-dose (2.1-2.6M cells/hemisphere) + High-dose (5.3-5.5M) |
| Serious AEs | 0 | 0 |
| Tumors | 0 | 0 |
| GIDs | 0 | 0 |
| Graft survival evidence | PET at 6 and 12 months | 18F-DOPA Ki +44.7% in putamen |
| Motor improvement | Stable + medication reduction in 6/7 | MDS-UPDRS III OFF improved 20.4% |
| Immunosuppression | 12 months | 15 months (tapered from 12) |
| Scalability advantage | ESC = unlimited cell source | HLA-matched iPS = reduced rejection but limited population coverage (17% Japan) |
| Ethical advantage | ESC = embryo destruction concern | iPS = no embryo needed, reprogrammed from adult blood |
| Publication | Nature Medicine, July 2026 | Nature, April 2025 |

## Journalist
Dr. Lena Voss — Longevity & Neuro

## Category
🧬 Longevity (or 🧠 Neuro — both applicable)

## Slug
stem-cell-parkinsons-two-approaches-zero-tumors

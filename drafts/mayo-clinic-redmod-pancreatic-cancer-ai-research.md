# Research Notes: Mayo Clinic REDMOD — AI Detects Pancreatic Cancer 475 Days Before Diagnosis

## Story Thesis
Mayo Clinic's REDMOD AI framework detects pancreatic cancer on routine CT scans an average of 475 days before clinical diagnosis, with 73% sensitivity — nearly double the 39% achieved by experienced radiologists. The critical insight nobody has calculated: because REDMOD works as a software overlay on CTs *already being performed*, it could become one of the most cost-effective cancer screening tools ever deployed — no new scans, no new hardware, just software.

## Kill Test
- **Would I tell someone about this at dinner?** Yes — "an AI can see cancer you can't, and it can see it a year and a half before you'd know you had it."
- **Does it affect people's lives?** 52,740 Americans die of pancreatic cancer yearly. 13% five-year survival. This could change that.
- **Is it new?** Published April 28, 2026 in Gut (BMJ). Multi-institutional validated study.
- **PASS**

## 10-Star Test
- A 5-star story: "AI detects cancer early"
- A 10-star story: "An AI catches the deadliest common cancer 475 days before doctors can — and it costs nothing extra because it reads CT scans hospitals are already performing. Nobody has done the math on what happens if you run it on every abdominal CT in America."
- **8/10 — strong**

## Novel Contribution
**Cost-effectiveness calculation nobody has published:**

### The Math
- 93 million CT scans/year in the US (NPR/WCMU, 2025)
- Roughly 30-35% are abdominal/pelvic → ~30 million abdominal CTs/year
- US adult population ~260M → ~11.5% get an abdominal CT in any given year
- Over 3 years (REDMOD's window): ~30-35% of adults
- 67,530 new pancreatic cancer diagnoses/year (ACS 2026)
- If ~35% of future pancreatic cancer patients had a prior abdominal CT in the 3-year window:
  - 67,530 × 0.35 = 23,636 had scans REDMOD could analyze
  - 23,636 × 0.73 sensitivity = 17,254 caught early
  - That's 25.5% of all cases caught early by AI alone
  - Plus existing 10% found localized = ~35% localized
- Localized survival: 44% five-year. Late-stage: ~3-6%
- Current 5-year survivors: 67,530 × 0.13 = 8,779
- With REDMOD: (23,636 × 0.44) + (43,894 × 0.05) = 10,400 + 2,195 = 12,595
- **Net: ~3,800 additional five-year survivors per year**

### Cost Analysis
- REDMOD: software overlay on existing CTs. No new scans needed.
- Incremental cost: compute for radiomics analysis ~$5-15/scan
- 30 million abdominal CTs × $10 = $300 million/year
- Cost per additional life saved: $300M / 3,800 = ~$79,000
- Cost per QALY (rough): ~$50,000-$80,000

### Comparison to established screening
| Screening Program | Cost per QALY |
|---|---|
| Mammography (breast cancer) | $30,000-$60,000 |
| Colonoscopy (colon cancer) | $20,000-$50,000 |
| Low-dose CT (lung cancer) | ~$81,000 |
| **REDMOD on existing CTs (estimated)** | **~$50,000-$80,000** |

REDMOD would be cost-competitive with existing approved screening, with one massive advantage: it requires NO patient behavior change and NO additional procedures. People are already getting these CTs.

## Primary Sources (3+)
1. **Mukherjee et al. (2026)** — "Next-generation AI for visually occult pancreatic cancer detection in a low-prevalence setting with longitudinal stability and multi-institutional generalisability." Gut. DOI: 10.1136/gutjnl-2025-337266. https://gut.bmj.com/content/early/2026/04/22/gutjnl-2025-337266
2. **Mayo Clinic News Network** — Official press release. https://newsnetwork.mayoclinic.org/discussion/mayo-clinic-ai-detects-pancreatic-cancer-up-to-3-years-before-diagnosis-in-landmark-validation-study/
3. **ACS Cancer Statistics 2026** — 67,530 new diagnoses, 52,740 deaths, 13% 5-year survival. https://www.cancer.org/research/cancer-facts-statistics/all-cancer-facts-figures/2026-cancer-facts-figures.html
4. **NPR/WCMU (2025)** — 93 million CT scans annually in US. https://radio.wcmu.org/health-science-and-environment/2025-04-16/study-highlights-cancer-risk-from-millions-of-ct-scans-performed-annually
5. **Pancreatic Cancer Action Network** — Localized detection rates (~10%), 44% localized survival. https://pancan.org/press-releases/
6. **News-Medical.net** — Detailed study summary. https://www.news-medical.net/news/20260428/AI-model-detects-pancreatic-cancer-years-before-clinical-diagnosis.aspx

## Key Data Points
- **REDMOD sensitivity:** 73% overall; 68% at 24+ months before diagnosis
- **Radiologist sensitivity:** 39% overall; 23% at 24+ months
- **Median lead time:** 475 days (nearly 16 months)
- **Maximum detection window:** Up to 3 years before diagnosis
- **Validation:** ~2,000 CT scans from multiple institutions
- **Consistency:** 90-92% reproducibility on repeat scans
- **Specificity:** 81% in independent 539-patient cohort; 87.5% in NIH-PCT dataset (80 patients)
- **Pancreatic cancer deaths:** 52,740/year US (2026 estimate)
- **5-year survival:** 13% overall; 44% if localized
- **Currently localized at diagnosis:** Only 10%
- **Projected: 2nd leading cancer death by 2030**
- **Study cohort:** 219 patients with subsequent cancer diagnosis; 1,243 matched controls
  - 40% diagnosed 3-12 months after CT
  - 35% diagnosed 12-24 months after CT
  - 25% diagnosed 24+ months after CT
- **Prospective trial:** AI-PACED study currently underway at Mayo Clinic

## Strongest Counterargument
False positives. REDMOD's 81% specificity means ~19% false positive rate. On 30 million abdominal CTs, that's 5.7 million false alarms — each triggering anxiety, follow-up imaging, unnecessary biopsies, and healthcare costs. Pancreatic biopsy carries risk of pancreatitis, bleeding, and infection. The base rate problem is severe: pancreatic cancer's lifetime risk is ~1 in 56. Even a highly accurate test produces far more false positives than true positives in a low-prevalence population.

## Limitations
- Cohort was not ethnically diverse
- Retrospective design (though prospective AI-PACED trial is underway)
- Cost-effectiveness calculation uses estimated compute costs, not validated implementation data
- Abdominal CT volume estimates are approximate
- False positive management costs not fully modeled
- REDMOD has not yet been tested in prospective real-world deployment

## Journalist
**Zara Osman** — Health policy beat. Last article: #269 (8 articles back). This story sits at the intersection of AI diagnostics, health economics, and screening policy — her sweet spot.

## Category
🧬 Longevity (AI diagnostics, cancer survival)

## Headline Direction
"An AI Caught 73% of Invisible Pancreatic Cancers 475 Days Before Doctors Could. Running It on Every CT in America Would Cost $10 Per Scan."

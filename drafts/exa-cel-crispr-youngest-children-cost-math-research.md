# Research: CRISPR's First Gene Therapy in Children Under 12 — Cost-Effectiveness Math

## Story Angle
Exa-cel (Casgevy) just posted 100% efficacy in children ages 5-11 with sickle cell disease and transfusion-dependent beta thalassemia — the youngest cohort ever treated with CRISPR gene editing. But one child died from the chemotherapy conditioning, not the CRISPR itself. The original analysis: calculating when earlier treatment becomes more cost-effective than waiting, and what the 1-in-15 mortality rate means when compared to the alternative (lifetime of disease + allogeneic HSCT mortality).

## Primary Sources

### 1. NEJM Paper (Published June 10, 2026)
- **Citation:** Frangoul H, de la Fuente J, et al. "Exa-cel in Children with Transfusion-Dependent β-Thalassemia or Sickle Cell Disease." N Engl J Med 2026. DOI: 10.1056/NEJMoa2603387
- **Studies:** CLIMB THAL-141 (NCT05356195) and CLIMB SCD-151 (NCT05329649)
- **Population:** 26 children ages 5-11 (15 TDT, 11 SCD), 8 sites in Canada, Germany, Italy, UK, US
- **Results:**
  - TDT: 8/8 evaluable children achieved transfusion independence ≥12 months (100%, 95% CI 63-100)
  - SCD: 8/8 evaluable children free from severe VOC ≥12 months (100%, 95% CI 63-100)
  - Mean duration of TI: 23.4 months (range 13.3-28.5)
  - Mean duration VOC-free: 19.0 months (range 13.2-30.1)
  - Fetal hemoglobin: >45% in SCD children (pancellular), protective threshold ~30%
  - Allelic editing: ≥60% in peripheral blood from month 3, ~77-85% in bone marrow CD34+
- **Safety:**
  - 100% had grade 3/4 adverse events (expected with busulfan myeloablative conditioning)
  - 2 children (TDT) had veno-occlusive liver disease (both attributed to busulfan)
  - **1 DEATH:** Child received busulfan ONCE DAILY (protocol allowed), cumulative AUC 93.5 mg·hr/L, EXCEEDING target range of 74-90. Death on study day 132 from multiorgan failure + pneumonia. Protocol amended after: busulfan now ONLY every 6 hours.
  - No graft failure, no cancer, no events related to CRISPR editing itself

### 2. Vertex SEC Filing / Pricing Data
- **Source:** SEC 8-K filing, Dec 8, 2023 (vrtx-20231208)
- Casgevy wholesale acquisition cost: $2.2 million per patient
- Currently approved for ages 12+ only (SCD: Dec 2023, TDT: early 2024)
- About 1,000 patients aged 12+ eligible for TDT indication in US
- Competitor: Lyfgenia (lovo-cel, bluebird bio): $3.1 million

### 3. NIH Healthcare Cost Data
- **Source:** NIH/Blood Advances (2022): "Researchers identify the high costs of living with sickle cell disease"
- Commercially insured Americans with SCD: insurers pay $1.7 million average per patient (to age 64)
- Out-of-pocket: $44,000 lifetime vs ~$11,000 for non-SCD
- SCD life expectancy: 50-51 years (vs 60-62 for matched non-SCD)
- **TDT lifetime costs:** $5-5.7 million in the US (per Vertex press release citing published data)

### 4. Prior Pivotal Trial Data (NEJM 2024)
- Ages 12-35: 91% TDT achieved transfusion independence, 97% SCD free from severe VOC
- Children 5-11 appear to match or exceed adolescent/adult efficacy

## Original Calculations

### Cost-Effectiveness: Treating at Age 7 vs. Age 12

**TDT child treated at age 7:**
- Avoided: 5 years × 13.5 transfusions/year = 67.5 transfusion episodes
- Annual standard care cost (transfusions + iron chelation + monitoring): ~$100,000-$150,000/year
- 5 years of avoided care: $500,000-$750,000
- Remaining life-years of avoided care (if lifetime ~60-65 years with good care): ~53-58 years
- Total avoided lifetime cost from age 7: ~$5.3-$8.7 million

**TDT child treated at age 12:**
- Remaining life-years of avoided care: ~48-53 years
- Total avoided lifetime cost from age 12: ~$4.8-$7.9 million
- **Differential:** Treating at 7 saves an additional $500,000-$750,000 vs treating at 12

**SCD child treated at age 7:**
- Avoided: 5 years × 3.2 VOC/year = 16 severe crises, 2.7 hospitalizations/year × 5 = 13.5 hospitalizations
- Annual SCD care cost: ~$50,000-$100,000 (hospitalizations + ER + meds + pain management)
- 5 years of avoided care: $250,000-$500,000
- Critical: Each VOC episode causes cumulative organ damage (kidney, brain, spleen)
- Risk of stroke peaks in childhood (ages 2-16 for first stroke in SCD)

**The organ damage calculus:** This is the number nobody runs. In SCD, every year without treatment between ages 5-12 represents:
- 4.6% annual incidence of silent cerebral infarcts (DeSouza et al., Blood 2019)
- Progressive glomerular hyperfiltration → eventual CKD
- Iron overload from chronic transfusion support
- In TDT: every year of transfusion adds ~5-7 mg Fe/kg/year cardiac iron loading (without perfect chelation compliance, which is terrible in children)
These costs are invisible at the time but appear as $200,000-$500,000 ICU stays and organ transplants in the patient's 20s-30s.

### Mortality Risk Comparison: exa-cel vs Alternatives

**Exa-cel in children 5-11 (this study):**
- Mortality: 1/15 TDT = 6.7% (but related to busulfan overdose, protocol has been amended)
- If busulfan dosing corrected: expected mortality ~1-3% (similar to allo-HSCT conditioning)

**Allogeneic HSCT (the current curative alternative):**
- Matched sibling donor HSCT: 5-10% treatment-related mortality
- Haploidentical HSCT: 10-20% treatment-related mortality
- PLUS: 15-30% risk of graft-vs-host disease, 5-15% graft rejection
- ONLY 20% of SCD patients have HLA-matched sibling donor

**No curative treatment (standard of care):**
- TDT: ~4.8 deaths per 100 person-years (Italian registry data)
- SCD: ~1.6 deaths per 100 person-years
- By age 20, significant end-organ damage in most patients

### The Addressable Market Expansion
- SCD affects ~100,000 Americans (CDC), ~20M globally
- TDT: ~5,000-10,000 in US, ~300,000 globally (primarily Mediterranean, South/Southeast Asia, Middle East)
- Current Casgevy approved: ages 12+, only ~1,000 TDT patients eligible in US
- Expansion to ages 5-11 adds: estimated 3,000-5,000 patients in US (SCD + TDT combined)
- Global: adds millions of potential patients, especially in LMICs where disease burden is highest
- Revenue opportunity: $2.2M × 3,000-5,000 = $6.6-11 billion addressable market addition

## Key Narrative Points

1. **The CRISPR didn't kill anyone — the chemo did.** The one death was from busulfan conditioning overdose (AUC exceeded target by 4-26%). The protocol was amended to fix this. Gene editing itself showed no safety signals. This distinction matters enormously.

2. **100% efficacy is suspiciously perfect — because the sample is tiny.** The 95% CI is 63-100%, meaning the true efficacy could be as low as 63%. With 8 evaluable patients per disease, this is not statistically powered to detect moderate failure rates. The 91-97% rates in larger adolescent/adult trials are more reliable benchmarks.

3. **The cost math is radically in favor of treating younger.** At $2.2M vs $5-5.7M lifetime TDT costs, Casgevy pays for itself even treating at 12. But every year you wait costs $100,000+ in direct care PLUS accumulates irreversible organ damage that becomes expensive later. The optimal time to treat is the moment the child is eligible.

4. **The real bottleneck isn't science, it's access.** Only 9 authorized treatment centers initially. Global disease burden is heaviest in sub-Saharan Africa, India, and Southeast Asia — where $2.2M per patient is unthinkable. The technology works. Distribution doesn't.

## Strongest Counterargument
Myeloablative busulfan conditioning is an extreme intervention for a 5-year-old. You're destroying their bone marrow to cure a disease that, in mild cases, might be manageable with transfusions for years. The 6.7% mortality in TDT (1/15) is higher than the annualized mortality rate of standard TDT care. Parents face a genuine dilemma: a disease they know how to manage vs. a cure that requires a dangerous bridge.

## Limitations
- Open-label, single-arm, no comparator group
- Only 8 evaluable patients per disease (small sample)
- Median follow-up only ~16 months — durability unknown
- Busulfan overdose case clouds the mortality picture
- No head-to-head comparison with newer HSCT approaches (e.g., haploidentical with post-transplant cyclophosphamide)
- The cost math uses US prices — inapplicable to the 95%+ of patients who live outside wealthy healthcare systems

## Journalist Assignment
Dr. Kenji Watanabe — Genomics & Biotech beat. Covered the Casgevy access gap (March 2026), CRISPR-HAE one-shot replacement, Huntington gene therapy, pig kidney xenotransplant series. This is in his wheelhouse.

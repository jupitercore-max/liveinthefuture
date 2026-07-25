# Research Notes: Leqembi At-Home SC Injection — The Infusion Bottleneck Math

## Core Event
- **July 14, 2026:** FDA approved at-home starting dose of Leqembi (lecanemab) subcutaneous autoinjector. First anti-amyloid Alzheimer's drug that can be administered entirely at home — initiation through maintenance. Biogen +4.5%.
- Previously: patients had to get 18 months of biweekly IV infusions at clinic before switching to SC maintenance. Now: SC from day 1.
- Branded as "Leqembi IQLIK" (autoinjector form)
- Competitor Kisunla (donanemab, Eli Lilly) remains IV-only

## Primary Sources

### 1. USC Brain Health Observatory — Infusion Capacity Shortfall (J Alzheimers Dis, 2025)
- Chen et al., USC Dornsife / Prothena
- **Key finding:** US infusion capacity for AD treatments: 370,000 in 2024 → projected 5.2M by 2033
- **But demand will outstrip supply:** 13 million infusion shortfall by 2033
- **2.2 million patients** will face delayed access due to infusion capacity constraints
- DOI: 10.1177/13872877251372129

### 2. Springer Cost Comparison Model (Jul 2025)
- "Societal Costs and Efficiency of Subcutaneous versus Intravenous Lecanemab in Early Alzheimer's Disease: A U.S. Cost Comparison Model"
- **Per-patient savings:** $72,891–$80,925 over 4 years (SC vs IV) = $18,223–$20,231/year
- Breakdown of $80,925 savings:
  - Treatment costs: -$40,638 (drug product + administration)
  - Administration time costs: -$8,151 (HCP + patient + caregiver time)
  - Quality-of-life costs: -$32,136 (patient + caregiver disutilities)
- **Population-level savings:** $3.16–$3.71 billion over 4 years (at 49.4% SC uptake)
- Administration costs: IV physician office $95.87/dose; IV hospital outpatient $284.42/dose; SC at home $0/dose
- IV administration cost per patient per year: ~$4,957 (Year 1)

### 3. IV Administration Time Burden (from Springer model)
- IV per visit: 27.1 min travel + 32.3 min prep + 60 min infusion + 22 min supervision = 141.4 min total patient time
- Plus 33 min lost productivity per patient per visit
- Caregiver mirrors patient time + 22.2 min lost productivity
- SC at home: 19.2 min prep + 5.9 min administration + 13.5 min supervision = 38.6 min total
- No travel, no HCP travel/prep

### 4. Leqembi Commercial Performance
- Q4 2025: $134M global ($54M estimated US)
- Q1 2026: $168M global ($86M US) — 74% YoY growth, beat estimates of $131M
- FY2026 (Apr 2026–Mar 2027) projected: JPY 143.5B (~$960M at current rates) = 63% growth
- ~78% of patients remain on Leqembi at 18 months (Biogen real-world data)
- Drug price: $26,500/year WAC (10 mg/kg IV biweekly, avg 75 kg patient)

### 5. Uptake Barriers (from Reuters, STAT, Citi)
- Medicare spent far less than expected (STAT, May 2026)
- Fewer than half of US neurologists recommend Leqembi (Spherix Global Insights, Jan 2024)
- Barriers: patient identification, diagnostic confirmation (amyloid PET or lumbar puncture), monitoring requirements (3+ MRIs in first year), specialist availability, reimbursement
- Only 5–20% of real-world early AD patients eligible (comorbidity exclusions)
- Estimated eligible population: MCI due to AD ~666,646 + mild dementia ~620,850 = ~1.29 million (IQVIA cascade estimate)

### 6. AAIC 2026 Data (Jul 13, London)
- SC-AI 500mg weekly bioequivalent to IV 10mg/kg biweekly: exposure ratio 104% (90% CI: 99.1%–109%)
- Consistent across body weight quartiles (supports fixed-dose regimen)
- ARIA-E incidence predicted similar to IV
- Systemic reactions: <1% SC vs 26% IV
- Anti-drug antibodies: 1.4% incidence, no neutralizing antibodies
- 28 patients at one US center on SC: slower 36-month CDR-SB decline vs matched ADNI cohort
- 10 of 11 evaluable patients (91%) improved or stable on MMSE after 6+ months SC maintenance
- Patient/caregiver satisfaction with SC: 75%–97%

### 7. Broader IV-to-SC Evidence (oncology analogues)
- Pertuzumab/trastuzumab SC: reduced chair time 85.5% (124.3→18.1 min maintenance), saved €172/maintenance dose. Netherlands-wide: ~22,000 additional treatments annually
- Rituximab SC vs IV: 70% reduction in mean administration time per cycle; one Canadian study estimated >50,000 treatment suite hours saved in year 3

## Original Calculation: The Infusion Chair Multiplier

### Current state
- US Leqembi patients (estimated from Q1 2026 revenue): $86M US / $26,500 per patient/year = ~3,245 patients on active treatment
- At biweekly IV: 3,245 × 26 infusions/year = 84,370 infusions/year consumed
- Each infusion = ~114 min of chair/facility time (60 min admin + 32 min prep + 22 min supervision)
- Total chair hours consumed by current Leqembi patients: 84,370 × 114/60 = 160,303 hours/year

### Old pathway (pre-July 14)
- New patient: 18 months biweekly IV = 39 infusions, THEN switch to SC maintenance
- Each new start consumed 39 infusion chair sessions before potentially freeing the chair

### New pathway (post-July 14)
- New patient: SC from day 1 = 0 infusion sessions required. Ever.
- Freed capacity per avoided start: 39 sessions × 114 min = 4,446 min = 74.1 hours

### The multiplier
- US AD infusion capacity (2024): 370,000 sessions/year (USC study)
- Current Leqembi patients consume: 84,370 sessions/year = 22.8% of total AD infusion capacity
- If ALL current patients switch to SC: 370,000 + 84,370 freed = 454,370 sessions available for other uses
- More importantly: every new patient who starts SC instead of IV frees 39 sessions over 18 months
- At projected 15% quarterly growth in new starts (Biogen Q2 2025 data): ~5,000 new starts/year
- Freed capacity: 5,000 × 39 sessions = 195,000 sessions/year — that's 52.7% of the 2024 AD infusion base

### The cost numbers
- Per patient, Year 1 administration cost avoided: $4,957 (Springer model)
- Per patient, total societal savings over 4 years: $80,925
- At 5,000 new SC starts/year: $404.6M in societal savings per annual cohort over 4 years
- Population-level (at 49.4% SC uptake of eligible population): $3.16–$3.71B over 4 years

### The access number (the big one)
- USC: 2.2 million patients will face delayed access by 2033 due to infusion shortfalls
- SC initiation completely removes the infusion bottleneck for Leqembi
- Remaining bottlenecks: diagnostic confirmation (amyloid PET/CSF), specialist availability, MRI monitoring (3+ scans/year), reimbursement
- This changes the rate-limiting step from "can we infuse them?" to "can we diagnose them?"
- With FDA-approved blood test for amyloid (cleared May 2025), the diagnostic bottleneck is also loosening

## Counterargument
- Citi analysts: don't expect immediate commercial inflection. Infusion was never the primary barrier — diagnosis, specialist access, monitoring requirements, and reimbursement are bigger bottlenecks
- Only 5–20% of real-world early AD patients meet eligibility criteria (comorbidities exclude most)
- MRI monitoring still requires clinic visits (3+ in first year) — not fully decoupled from healthcare system
- ARIA risk still exists (~12.5% ARIA-E, ~17.3% ARIA-H in Clarity AD)
- The drug itself is debated: 27% slowing of cognitive decline is statistically significant but "likely small enough as to be undetectable by patients and family members or physicians" (Dr. Michael Greicius, Stanford)

## Limitations
- Revenue-to-patient calculation assumes $26,500 WAC and doesn't account for discounts, rebates, or partial-year patients
- USC infusion capacity model projects to 2033 — actual capacity expansion may differ
- Springer cost model uses societal perspective including QOL monetization at $150K-$200K per QALY — payer perspective yields lower savings
- SC uptake rate of 49.4% is from oncology analogue (rituximab), not AD-specific
- The 2.2M delayed patients include ALL anti-amyloid drugs (Kisunla too), not just Leqembi

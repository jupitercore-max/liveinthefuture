# Research Notes: Casgevy Age 2+ Expansion — The Cost of Making Sickle Cell Patients Wait

## Core Story
FDA expanded Casgevy (exagamglogene autotemcel) approval to children as young as 2 on July 1, 2026. Previously approved only for ages 12+. This is the first CRISPR-based gene therapy approved for young children with SCD. The original calculation: what does each year of delayed treatment cost in dollars and irreversible damage?

## Primary Sources

### FDA Press Release (July 1, 2026)
- Casgevy approved ages 2+ for SCD with recurrent VOCs and TDT
- SCD trial: 11 patients ages 5-12, 8/8 evaluable achieved VF12 (no severe VOCs for 12+ consecutive months)
- TDT trial: 15 patients ages 5-12, 8/9 evaluable achieved transfusion independence (median 20.1 months)
- Ages 2-5: extrapolated from product characteristics and clinical data (not directly trialed in 2-5)
- Approved in 53 days after filing (CNPV pilot program)
- Orphan Drug, RMAT, Fast Track designations
- Vertex Pharmaceuticals
- Source: fda.gov/news-events/press-announcements/fda-approves-first-gene-therapy-young-children-sickle-cell-disease

### Vertex/Analysis Group Markov Model (J Med Econ, Feb 2026)
- Lopez et al., DOI: 10.1080/13696998.2026.2624971, PMID: 41730016
- Compared exa-cel vs SOC (hydroxyurea + transfusions) over lifetime
- Life expectancy: 74.5 years (exa-cel) vs 43.6 years (SOC) — 30.9-year gain
- Lifetime VOCs: 7 (exa-cel) vs 84 (SOC) — 77 fewer
- Undiscounted disease-related costs: $0.55M (exa-cel) vs $3.89M (SOC) — $3.34M saved
- ICER: $16,800/QALY (payer), DOMINANT from societal perspective
- Model based on Phase 3 CLIMB SCD-121 trial + published literature
- **Note: This model was built for patients aged ≥12**

### Nature Scientific Reports (2021, prior analysis)
- At $2.1M treatment cost, cured-at-birth ICER = $140,877/QALY
- 8.5 QALYs gained over lifetime
- Relapse sensitivity: 50% relapse by 20 years → ICER $410,607/QALY
- 10 years relapse → ICER $740,058/QALY

### AAFP Analysis
- Casgevy list price: $2.2 million
- Lyfgenia (bluebird bio): $3.1 million
- Average lifetime SCD medical costs: $1.7 million
- TDT lifetime costs: $5-5.7 million
- ~100,000 Americans affected

### American Stroke Association
- SCD affects 1 in 2,400 children, 1 in 400 Black children
- Stroke risk: 100-fold increase in SCD children vs non-SCD
- 11% of SCD patients had overt stroke by age 20 (1998 estimate)
- 39% of SCD children have silent strokes by age 18
- Silent strokes → problems in thinking, learning, decision-making

### Hospitalization Cost Data
- $14,337 per SCD hospital stay (Bou-Maroun 2018)
- Monthly costs ages 0-9: $471/patient (Kauf 2009)
- Monthly costs ages 30-39: $1,913/patient (highest)
- 2% of pediatric ICU admissions are SCD patients
- 8% of SCD patients need at least one ICU admission within 8-year follow-up
- ICU mortality for SCD patients: up to 44%

### NEJM Pediatric Trial (Frangoul, June 2026)
- Dr. Haydar Frangoul at TriStar/Sarah Cannon — performed world's first CRISPR procedure (July 2019)
- Led multi-site trials on 40+ patients (adults) → FDA approval Dec 2024 for 12+
- Then ran trials on ~11 children ages 5-11 with severe SCD
- Published in NEJM June 2026
- Results led to July 1 age expansion

## ORIGINAL CALCULATION: The Cost of Each Year of Delayed Treatment

### The core insight
Casgevy is a cure, but it doesn't reverse damage already done. It only prevents future damage. A child cured at age 2 has essentially a clean body. A child cured at age 12 has a decade of organ damage that no gene therapy can undo.

### Annual disease burden (ages 2-12 with severe SCD)
- Acute hospitalization costs: ~3.5 severe VOCs/year × $14,337/episode = ~$50,180/year
- Routine disease management: $471/month × 12 = $5,652/year
- Total annual disease cost (conservative): ~$55,832/year
- Cross-check: $3.89M lifetime / 43.6 years = $89,220/year average (higher because adult years have higher costs and complications compound)

### 10-year delay (age 2→12): Avoidable financial costs
- Direct disease costs: $55,832/year × 10 years = $558,320
- This is avoidable spend that treating at age 2 prevents

### 10-year delay: Irreversible organ damage
- Stroke: ~11% cumulative risk by age 20. Most pediatric SCD strokes occur ages 2-16, peaking ages 2-5. A child treated at age 2 avoids this entire window. Cost of pediatric stroke treatment + lifetime disability: $200,000-$505,000+
- Expected stroke cost per patient-year-of-delay: ~0.55%/year stroke risk × $505,000 = ~$2,778/year
- Silent cerebral infarcts: up to 39% by age 18. Cognitive damage, learning disabilities. Not reversed by cure.
- Splenic autoinfarction: common in early childhood. Spleen becomes non-functional. Lifelong infection vulnerability.
- Renal damage: begins in childhood, progresses with age. Chronic kidney disease by adulthood in 30%+ of SCD patients.
- Avascular necrosis of bone: begins in childhood, progressive.

### The revised ICER calculation
Published ICER at age ≥12: $16,800/QALY (payer perspective)
- Treatment cost: $2.2M
- Disease costs avoided (from age 12 onward): $3.34M
- Net: treatment SAVES money from societal perspective

At age 2:
- Treatment cost: $2.2M (same)
- Disease costs avoided (from age 2 onward): $3.34M + $558,320 (10 additional years) = ~$3.9M
- Additional QALYs from prevented organ damage: ~2-3 additional QALYs (conservative)
- The ICER at age 2 becomes even more favorable — likely dominant from BOTH payer and societal perspectives

### The bottom line math
- Each year of delay costs: ~$55,832 in avoidable disease costs
- Each year of delay adds: ~$2,778 in expected stroke costs
- Each year of delay causes: irreversible organ damage not reversed by cure
- Total cost of the 10-year wait (age 2 → 12): ~$586,000 in avoidable costs + permanent physical damage
- For the ~3,600 SCD births per year in the US, delaying treatment from 2 to 12 costs the system: ~$2.1 billion per birth cohort over the waiting decade

## Strongest Counterargument
The age 2-5 approval was based on extrapolation, not direct clinical trial data. Only 11 children ages 5-12 were in the SCD trial. Myeloablative conditioning (intensive chemo) in a 2-year-old is genuinely dangerous — febrile neutropenia, engraftment failure, infection risk are all higher in younger children. The calculated cost savings assume durable efficacy (no relapse), which hasn't been verified beyond ~7 years in adults. If 50% relapse by 20 years, the ICER jumps to $410K+/QALY.

## Limitations
- Annual disease cost estimate uses older hospitalization data (Kauf 2009, Bou-Maroun 2018)
- Stroke risk estimates from 1998 (pre-TCD screening era); with modern screening, overt stroke rates have dropped ~45%
- No published Markov model specifically for treatment at age 2 — this calculation is a rough estimate
- Myeloablative conditioning risks not quantified (they're real but data sparse in under-5s)
- Medicaid coverage uncertainty: 60%+ of SCD patients are on Medicaid, which historically limits access to high-cost therapies

## Category
🧬 Genomics / 🧪 Longevity

## Journalist
Dr. Iris Blackwell (genomics/longevity beat)

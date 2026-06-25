# Research Notes: NISE Zero-Shot Drug-Binding Protein Design

## Primary Source
- **Paper:** "Zero-shot design of drug-binding proteins via neural iterative selection−expansion"
- **Journal:** Nature (published June 24, 2026)
- **DOI:** 10.1038/s41586-026-10670-w
- **Authors:** Benjamin Fry, Kaia Slaw, Nicholas F. Polizzi (co-first: Fry & Slaw)
- **Affiliation:** Dana-Farber Cancer Institute / Harvard Medical School / Harvard Biophysics
- **Funding:** NIH R00GM135519, Dana-Farber Innovation Research Fund, Chleck Family Foundation

## Key Algorithm: NISE
- Neural Iterative Selection-Expansion
- Couples two neural networks: LASErMPNN (sequence design) + co-structure predictor (RFAA or Boltz-2)
- Maximizes tripartite self-consistency: sequence ↔ structure ↔ ligand conformation
- Open source: github.com/polizzilab/NISE and github.com/polizzilab/LASErMPNN

## Key Results

### Apixaban binders (NTF2 fold)
- 5 of 6 designs bound tightly (Kd < 50 nM) → **83% success rate**
- Best binder APEX: **Kd = 80 pM** (95% CI: 54-122 pM)
- APEX is 13 kDa, 1/3 the size of factor Xa (43 kDa)
- Factor Xa (natural target of apixaban): Ki = 80-700 pM
- **APEX rivals the natural drug target**

### Comparison to prior methods (same backbones, same target)
- LigandMPNN/Rosetta (2024 study): 4/9,024 designs bound → **0.044% hit rate**, best Kd = 680 nM
- COMBS (helical bundles): 2/6 designs → best Kd = 600 nM
- NISE improvement: **83% vs 0.044% = ~1,886× hit rate improvement**
- Affinity improvement: **80 pM vs 680 nM = 8,500× tighter binding**

### Exatecan binders (helical bundles)
- 4/4 NISE designs bound (100% hit rate)
- Best: EPIC, Kd = 120 nM → improved via neural proofreading to:
  - EPIC(Q51N): 8.0 nM
  - EPIC(M97L): 7.4 nM  
  - EPIC(Q51N/M97L): **1.2 nM** (100× improvement over parent EPIC)
- COMBS comparison: 3/16 bound, best Kd = 8 µM (tightest COMBS was 70× weaker)
- EPIC protects exatecan from hydrolysis for >50 hours vs ~2h half-life unprotected
- Crystal structures at 2.0 Å (EPIC) and 2.2 Å (EPIC-Q51N) confirm designed binding mode

### Compute requirements
- ~5 hours on 4 NVIDIA A6000 GPUs per NISE trajectory (14 iterations)
- No experimental feedback needed (zero-shot)

## Context: Apixaban market
- Apixaban (sold as Eliquis by BMS/Pfizer): ~$20.7B revenue in 2024
- One of the world's best-selling drugs
- Direct oral anticoagulant, factor Xa inhibitor
- Paper notes clinical need for inexpensive antidote to apixaban (andexanet alfa recently withdrawn)

## Context: Drug development costs
- Median R&D cost per new drug: $708M (IQR $247M-$1.42B) per Wouters et al.
- Mean capitalized cost: $1.31B
- Traditional protein binder screening can require testing thousands of designs

## Original Calculation: Screening Efficiency
- Traditional (LigandMPNN/Rosetta): 9,024 designs tested → 4 binders → ~2,256 tests per hit
- NISE: 6 designs tested → 5 binders → ~1.2 tests per hit
- That's a **1,880× reduction in experimental screening per successful binder**
- At ~$50-200/design for E. coli expression + purification + binding assay:
  - Traditional screening: 9,024 × $100 = ~$900K
  - NISE screening: 6 × $100 = ~$600
  - Plus ~$10-20 compute cost for 5h on 4 GPUs
  - **~1,500× cheaper for the screening phase alone**

## Original Calculation: Time Compression
- Traditional binder design campaign: months to years of experimental cycles
- NISE: 5 hours compute + days for expression/testing of 6 candidates
- "Design-to-validated-binder" timeline compressed from months → weeks

## Kill Test
✅ Contains multiple original calculations (screening efficiency, cost comparison, time compression)
✅ Novel — no prior LITF coverage of computational protein binder design
✅ Data-rich (specific Kd values, hit rates, crystal structures, compute time)
✅ Published in Nature from major institution (Dana-Farber/Harvard)

## Slug
nise-zero-shot-protein-drug-binder-80-picomolar

## Category
🧪 Genomics

# Research Notes: Multiplexed Gene Drives Solve the Resistance Problem for Malaria

## Primary Source
- Morianou I, Phillimore L, Khatri BS, et al. (2026) "Engineering resilient gene drives for sustainable malaria control by predicting, testing and overcoming target site resistance in Anopheles gambiae." PLoS Biol 24(7): e3003879. Published July 6, 2026.
  - DOI: https://doi.org/10.1371/journal.pbio.3003879
  - Affiliations: Imperial College London, Liverpool School of Tropical Medicine, Biocentis Srl (Milan), Johns Hopkins Bloomberg School of Public Health
  - Funded by: Bill & Melinda Gates Foundation (Grant INV-006610 "Target Malaria Phase II") and Open Philanthropy

## Key Findings

### The Resistance Problem — Quantified for the First Time
- Best-in-class single-target gene drive Ag(QFS)1, targeting doublesex (dsx) gene, showed NO resistance in ANY laboratory cage experiments (~600 mosquitoes)
- But: resistance exceeds 5% probability for populations >600 individuals
- Natural Anopheles gambiae populations: estimated 10^6 to 10^12 individuals
- Therefore: single-target drives are a "near certain" failure at natural population scales
- This is the first time anyone has quantified this lab-to-field gap with actual resistance rate data

### Novel Discovery: R3 Partial Resistance
- Previously known resistance categories: R1 (fully resistant, functional) and R2 (blocks drive but non-functional)
- This paper discovers R3: PARTIALLY resistant alleles that maintain gene function but only partially block gene drive activity
- R3 alleles allow drive invasion but prevent population elimination — ~60% suppression equilibrium
- First description of partial resistance in any gene drive system

### Resistance Rate Measurements
- Rate of functional resistance creation (R1 or R3) among end-joining alleles: 4.1 × 10^-3
- Overall frequency among offspring of gene drive carriers: 7.2 × 10^-5
- Mutagenesis screen generated ~4,000 de novo mutations — equivalent screening power to >500,000 gene drive offspring
- Natural SNP at T1 site (G→A, 1.3% overall allelic frequency, 25.9% in Angola): NOT resistant — fully susceptible to cleavage

### Cage Experiments with Resistance
- R1 seeded at 9%: R1 increased to 74-87% within 8 generations, gene drive reversed, no population suppression
- R3 seeded at 25%: drive invaded but only ~40% reproductive suppression, no elimination

### Multiplexed Gene Drives — The Solution
- Ag(QFS)2 (2 targets) and Ag(QFS)3 (3 targets) engineered
- Transmission rates: >99% — at least equivalent to or better than single-target Ag(QFS)1
- Ag(QFS)2 retained efficient homing (98.6-100%) even when R1 allele blocked one target site
- Key mechanism: resection removes resistant alleles when at least one site remains cleavable
- Population modeling: 3 gRNAs provide protection against resistance for populations up to natural scales

### Unexpected Fitness Bonus
- Ag(QFS)2 females showed IMPROVED fitness vs Ag(QFS)1, attributed to reverse orientation of transgene
- Ag(QFS)2 invaded and completely suppressed lab populations by generation 7-8 (from 12.5% starting frequency)

## Supporting Data: WHO World Malaria Report 2025
- 282 million cases, 610,000 deaths in 2024
- 9 million MORE cases than previous year
- 95% of deaths in WHO African Region; 75% among children under 5
- Antimalarial drug resistance confirmed/suspected in 8 African countries
- Insecticide resistance: confirmed in 48 of 53 reporting countries
- If drug resistance spreads: +16 million annual cases, +80,000 additional deaths
- Funding gap: $3.9B of $9.3B target (42%)
- 47 countries certified malaria-free, but progress stalling in highest-burden areas

## Context: Target Malaria
- Suspended in Burkina Faso August 2024 after government raid
- Still operating in Ghana, Mali, Uganda
- Imperial College London is both the academic lead for Target Malaria AND the lab that produced this paper (same team: Crisanti, Burt, Nolan, Hammond)

## Original Analysis Opportunity: The Lab-to-Field Population Gap

### The Math Nobody Has Run
- Lab cage experiments: ~600 mosquitoes
- Natural An. gambiae effective population: 10^6 minimum (based on nucleotide diversity), 10^9-10^12 (demographic inference)
- That's a factor of 1,667x to 1.67 TRILLION
- At resistance rate β = 0.0016 for R1:
  - Probability of R1 resistance for 600 mosquitoes: ~0.5%
  - Probability for 10^6: near-certain
  - With 3 gRNAs: need resistance at ALL 3 sites simultaneously — probability drops by factor of ~β^3

### Cost-per-DALY Analysis
- Current malaria spending: $3.9B/year → addresses 282M cases → ~$13.83/case in spending
- Gene drive deployment estimates (from earlier LITF article): ~$164/life saved at scale
- Current cost per death averted (ITNs): ~$4,500-7,500 (GiveWell estimates)
- Gene drive potential: orders of magnitude cheaper IF resistance can be solved
- This paper is the engineering proof that resistance CAN be solved

## Journalist
- Dr. Kenji Watanabe wrote previous gene drive article — use different journalist for variety
- Dr. Amara Osei-Bonsu (journalist #10, Genomics/CRISPR beat) if she exists, otherwise pick another biotech journalist
- Or: Dr. Priya Chandrasekaran (if genomics beat)

# Research: Manikomycin — First Antibiotic to Target the Ribosome E-Site

## Story Angle
A 75-year-old soil bacterium that already gave us oxytetracycline was hiding a second, completely novel antibiotic in its extract. Manikomycin (MKM) is the first antibiotic ever discovered that binds the E-site of the bacterial ribosome's large subunit, a pocket no drug has touched before. The resistance frequency is extraordinarily low: 3.7 x 10^-10 for E. coli and 1.1 x 10^-8 for K. pneumoniae (a WHO critical-priority pathogen). The catch: the compound metabolizes too fast in mice to work as a drug yet. The bigger story is what this implies about the antibiotic discovery pipeline: if one of the most studied bacteria in history was still hiding a novel mechanism, how many others remain buried in the world's strain collections?

## Kill Test: PASSED
- **Novel discovery?** Yes. First E-site antibiotic for bacterial ribosomes, ever. Published in Nature (10.1038/s41586-026-10589-2), June 2026.
- **Data-rich?** Yes. Cryo-EM at 2.4 Å, resistance frequencies, IC50 values, time-kill assays, ex vivo human blood model, C. elegans survival data, mouse PK.
- **Original LITF contribution?** Three original calculations: (1) Compare manikomycin's resistance frequency to existing first-line antibiotics; (2) Estimate how many hidden antibiotics may remain in existing strain collections using the WAC 255-strain yield rate; (3) Cost the "pharmacokinetic gap" that separates a novel mechanism from a usable drug.
- **Actionable?** Yes. Implications for antibiotic discovery strategy, pharma R&D investment, and WHO AMR response.

## 10-Star Test (draft)
- **Original calculation:** Manikomycin's 3.7 x 10^-10 E. coli resistance frequency vs colistin (~10^-7), ciprofloxacin (~10^-8-10^-9), meropenem (~10^-8). MKM is 100-1,000x harder for E. coli to resist than last-resort antibiotics.
- **Novel comparison:** Only 6 new antibiotic classes approved since 2000 (daptomycin, fidaxomicin, lefamulin, cefiderocol, plazomicin, teixobactin not yet approved). MKM would be the first to target a completely new ribosomal binding site.
- **Data table:** MKM MIC values vs key pathogens, compared to existing antibiotics; resistance frequency comparison table.
- **Failure mode analysis:** The pharmacokinetic problem (half-life 36 min, Cmax 9.13 µg/ml) is the bottleneck. How many promising antibiotic leads have died in the PK valley.

## Primary Source
- Kaur, M., et al. (2026). A natural depsipeptide antibiotic binds the E-site of the bacterial ribosome. *Nature*. DOI: 10.1038/s41586-026-10589-2
- McMaster University, Wright Actinomycetes Collection (WAC)
- UIC Retzky College of Pharmacy (Dmitrii Travin, Alexander Mankin)
- University of Hamburg (cryo-EM structural work)

## Key Data Points

### Discovery
- 255 bacterial strains screened from Wright Actinomycetes Collection (McMaster)
- Found in Streptomyces rimosus WAC 7405 (the same species that produces oxytetracycline, known since 1950)
- Identified via improved fractionation of natural product extracts
- Named "manikomycin" from Hindi/Punjabi "manik" (precious gem)
- Chemical class: cyclic depsipeptide, cationic antimicrobial peptide
- Five variants identified: MKM-A (most abundant, nonapeptide), MKM-B, MKM-C, MKM-D, MKM-E (decapeptide)
- 67 kb biosynthetic gene cluster (man BGC) validated by heterologous expression in S. coelicolor

### Mechanism of Action
- Binds the E-site of the 50S (large) ribosomal subunit
- First antibiotic to target this site in bacteria, ever
- Blocks entry of deacylated tRNA CCA-end into E-site
- Prevents P/E hybrid state formation, blocking translocation
- Context-specific: more effective at Pro/Leu codons, less at Thr codons
- Cryo-EM structure at 2.4 Å resolution shows binding at H13, H21, H88 of 23S rRNA
- Selectivity explained: eukaryotic protein eL42 sterically blocks MKM binding in human/mammalian ribosomes

### Resistance Profile
- E. coli BW25113: resistance frequency 3.7 x 10^-10
- K. pneumoniae C1559: resistance frequency 1.1 x 10^-8
- Resistance mechanisms: transporter mutations (sbmA, YejABEF) give only 2-8x MIC increase
- Multiple uptake pathways (not dependent on single transporter)
- None of the ribosome-based resistance mechanisms from clinical isolates protect against MKM
- Self-resistance in producer: ManE methyltransferase modifies C2395 (2'-O-methylation)

### Efficacy Data
- IC50 bacterial translation: 0.6 µM
- IC50 mammalian translation: 9.2 µM (15-fold selectivity)
- No hemolytic activity or mammalian cytotoxicity at up to 256 µg/ml
- Ex vivo (human blood): 1,000-fold reduction in K. pneumoniae after 6h at 5x MIC
- In vivo (C. elegans): 55-60% survival at day 6 vs 10-30% for DMSO control (p < 0.0001)
- Effective against E. coli, K. pneumoniae, mycobacteria
- NOT effective against most Gram-positives (including Staph) or other Gram-negatives (uptake issue, not target issue)

### Pharmacokinetic Problem (the honest limitation)
- Mouse tolerability: up to 220 mg/kg/day (acceptable)
- No efficacy in mouse infection model
- Cmax: 9.13 µg/ml (insufficient plasma exposure)
- Terminal half-life: ~36 min after 50 mg/kg subcutaneous dose
- Excellent stability in mouse and human plasma in vitro
- Problem is rapid systemic elimination, not metabolic instability
- Polycationic nature may cause nephrotoxicity concerns
- Scaffold amenable to chemical modification; analogue efforts underway

### Broader Context
- WHO lists carbapenem-resistant Enterobacteriaceae as "critical priority" pathogen
- K. pneumoniae is a major hospital-acquired infection pathogen
- Derek Lowe (Science blog): called it "a really good example" of overlooked compound, but "not going to be a wonder drug"
- Implication: improved fractionation of existing strain collections could reveal many more hidden antibiotics
- The "Waksman revival" thesis: 75 years of studying S. rimosus and this was missed

## Strongest Counterargument
The pharmacokinetic profile is genuinely bad. A half-life of 36 minutes means the drug cannot sustain therapeutic concentrations in a patient. Many promising antibiotic leads with novel mechanisms have died at exactly this stage. Teixobactin (2015 discovery, novel mechanism) is still not in clinical trials a decade later, partly due to PK/synthesis challenges. The novel mechanism is real, but the path from "kills bacteria in a test tube" to "saves patients" has a >90% failure rate in antibiotics.

## Limitations
- MKM's narrow spectrum (only Gram-negative Enterobacteriaceae and mycobacteria) limits its utility
- The PK problem is unsolved; no timeline for chemical analogues
- The C. elegans model, while showing efficacy, is a nematode, not a mammalian model
- The ex vivo human blood result (1,000-fold reduction) has not translated to mouse efficacy
- No data on combination therapy potential
- Resistance through transporter mutations, while giving only modest MIC increases, could compound with other mechanisms

## Journalist
Dr. Kenji Watanabe — genomics/health beat (used on #408, but appropriate for this mechanism-of-action story)
Actually, better to use a different journalist for variety. Suggest: Sofia Reyes (health/pharma beat) or use an existing LITF health journalist.

## Category
🔬 Health (antibiotic discovery, antimicrobial resistance)

## Article Number
410

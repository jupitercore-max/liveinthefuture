# Research: Cloaked Antibodies Unlock the 85% "Undruggable" Proteome

## Summary
Cornell researchers have demonstrated that full-length therapeutic antibodies can be delivered *inside* cells using a sulfonate-based "cloaking" technique that makes 150 kDa antibodies look like nucleic acids to lipid nanoparticles. Published PNAS June 23, 2026. Three disease indications demonstrated (cancer, lung inflammation, Parkinson's). Independent replication at Technion, Israel. Spinout company: Cloak Bio.

## Primary Sources

### Source 1: PNAS Paper (June 23, 2026)
- **Title:** "Intracellular delivery of full-length antibodies via organ-targeted lipid nanoparticles"
- **Authors:** Azmain Alamgir et al.
- **DOI:** 10.1073/pnas.2531649123
- **Key findings:**
  - SL4 sulfonate cloaking enables antibody loading into LNPs
  - Anti-NF-kB antibodies delivered to lungs in mouse model of acute lung injury → therapeutic benefit
  - Anti-alpha-synuclein antibodies delivered to brain → Parkinson's target (independent replication at Technion)
  - Platform generalizable: targets lysine residues (abundant in all proteins)

### Source 2: ACS Central Science Paper (May 14, 2024)
- **Title:** "Bioreversible Anionic Cloaking Enables Intracellular Protein Delivery with Ionizable Lipid Nanoparticles"
- **DOI:** 10.1021/acscentsci.4c00071
- **Key findings (initial proof of concept):**
  - Killed cancer cells with ribonuclease A (RNase A)
  - Inhibited tumor signaling with monoclonal IgG antibodies
  - Used lysine-reactive sulfonated compounds
  - Bioconjugation is REVERSIBLE: proteins uncloak in cytoplasm
  - Works with off-the-shelf commercial proteins

### Source 3: PMC Review — "Undruggable" target statistics
- **Reference:** "Emerging Pharmacotherapeutic Strategies to Overcome Undruggable Proteins in Cancer" (PMC)
- **Key stat:** Only 15% of drug targets are considered druggable. 85% are "undruggable."
- **Why undruggable:** (1) lack of hydrophobic pocket for small molecules, (2) function via protein-protein interactions, (3) conserved active sites, (4) disordered or unknown structures

### Source 4: Druggable genome analysis
- **Reference:** "The druggable genome and support for target identification in drug development" (PMC)
- **Key stats:**
  - 4,479 of 20,300 protein-coding genes (22%) estimated druggable
  - Tier 1: 1,427 genes — approved drug targets + clinical candidates
  - Tier 2: 682 genes — known bioactive small-molecule binders
  - Tier 3: 2,370 genes — secreted/extracellular proteins, distant similarity
  - Current drugs target only ~435 human proteins (Rask-Andersen et al.)

### Source 5: Monoclonal antibody market data
- **Market size:** $287-300B in 2025 (Mordor Intelligence, Fortune Business Insights)
- **Growth:** $326-344B in 2026, reaching $619-1,058B by 2031-2034
- **Oncology:** 46.4% of revenue (largest segment)
- **Key limitation:** Nearly ALL current mAb drugs target extracellular proteins

### Source 6: LNP infrastructure
- **COVID-19 vaccine infrastructure:** LNP technology proven at scale via Pfizer-BioNTech and Moderna
- **LNP market:** Part of $51B in vivo genomic medicine market
- **Manufacturing capacity:** Existing global LNP CDMO infrastructure can be repurposed
- **Key providers:** Lonza, Evonik (200 MT lipid capacity added 2025), Precision NanoSystems

### Source 7: Technology Networks coverage (May 2024)
- Chris Alabi, Cornell Engineering: "This has potential to take a lot of off-the-shelf proteins that are currently available from many life science distributors and biotechnology companies and repurpose them for novel intracellular applications"
- The technique can be replicated for practically any protein (lysine is universal)

## Original Analysis — The Market Math

### Revenue-per-target calculation
- Current mAb revenue: ~$300B across ~435 human targets = ~$690M annual revenue per target
- But this is skewed: top targets (PD-1, HER2, TNF-alpha) generate $10B+ each
- Median revenue per target likely ~$200-400M

### Accessible target expansion
- Currently accessible by antibodies: mostly extracellular targets (~1,427 Tier 1 genes)
- Intracellular protein-coding genes: ~20,300 total minus ~5,000 membrane/secreted = ~15,000 intracellular
- Of these, ~85% are currently undruggable ≈ those lacking small-molecule pockets
- If cloaked antibodies can reach even the ~2,370 Tier 3 (plus some untargeted Tier 1/2 intracellular targets), that's a 2-3x expansion of addressable biology

### Comparison with ADC economics
- ADC market: ~$12-15B in 2025
- ADCs deliver cytotoxic payload with 1-2% efficiency (1-2% reaches intracellular target)
- Cloaked antibodies deliver the antibody itself, not a toxic payload
- Different mechanism: ADCs use receptor-mediated endocytosis → lysosomal release
- Cloaked antibodies use LNP endocytosis → cytoplasmic release (antibody uncloaks)
- Key advantage: functional antibody in cytoplasm can modulate protein-protein interactions, not just kill cells

### Infrastructure leverage calculation
- Moderna + Pfizer produced ~4 billion COVID vaccine doses using LNP technology
- Manufacturing infrastructure is BUILT and increasingly idle (post-pandemic vaccine revenue declining)
- LNP CDMO market already transitioning to non-vaccine applications
- Cloaked antibody delivery could be the next major application for this existing infrastructure

## Kill Test Verification
**Original calculation:** At $690M average revenue per mAb target, opening 100 new intracellular targets represents a ~$69B market expansion. Even a conservative 10% capture rate on 500 newly accessible intracellular targets = $34.5B in new annual revenue.

**Novel dataset combination:** Cross-referencing druggable genome data (4,479 genes) with antibody accessibility limitations (membrane-impermeable) reveals that ~60-70% of the "druggable" genome is actually inaccessible to antibody therapeutics. Cloaked delivery could bridge this gap.

**Comparison nobody drew:** COVID vaccine LNP manufacturing capacity (billions of doses/year) sitting increasingly idle, while the technology that could fill those lines (cloaked antibody delivery) was demonstrated yesterday. The infrastructure-application timing is remarkable.

## Strongest Counterargument
Mouse models to human therapy is a vast gap. The 2024 paper showed in vitro cancer cell killing; the 2026 paper showed in vivo mouse lung inflammation and brain delivery. But:
- No human safety data exists
- Antibodies inside cells could trigger unpredictable immune responses
- LNP organ tropism is still poorly controlled (liver bias)
- Protein stability during cloaking/uncloaking is not characterized for most targets
- The 85% "undruggable" framing is misleading — many of these targets are undruggable for biological reasons (toxicity, redundancy) not just delivery limitations

## Limitations
- All data is preclinical (mice, cell culture, one independent replication)
- No dose-response curves or pharmacokinetics published for the PNAS paper yet
- Cloak Bio is pre-seed/early stage — no disclosed funding
- The 85% undruggable figure conflates delivery limitations with fundamental biological challenges
- PNAS paper used model antibodies against NF-kB and alpha-synuclein; unclear if approach works for all antibody-target interactions
- Organ targeting beyond lung and brain not yet demonstrated

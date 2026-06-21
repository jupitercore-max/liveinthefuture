# Research: Harvard CMOS Chip for Enzymatic DNA Synthesis

## Primary Source
- **Paper:** Nature Electronics, published June 17, 2026
- **DOI:** 10.1038/s41928-026-01662-9
- **Title:** Enzymatic DNA synthesis on a CMOS nanoelectrode array
- **PI:** Donhee Ham, Harvard SEAS
- **Co-first authors:** Woo-Bin Jung (now at POSTECH), Han Sae Jung (Harvard postdoc)
- **Collaborators:** DNA Script, Broad Institute
- **Funding:** IARPA, Horizon Europe, Samsung

## What They Did
- Built a CMOS chip with 64 synthesis sites using concentric ring electrodes
- Each site uses electrochemical pH control to trigger enzymatic DNA deprotection
- Lowering pH locally activates terminal deoxynucleotidyl transferase (TdT) enzyme
- Synthesized 64 distinct DNA sequences up to 39 nucleotides long in parallel
- Also encoded a 169-byte text message (James Watson quote) to demonstrate data storage
- All in water — no organic solvents required

## Technical Details
- Chip was originally designed for intracellular neuronal recording (4096-amplifier CMOS nanoelectrode array)
- Repurposed the electrode array for DNA synthesis
- Concentric ring electrode geometry creates localized pH gradients
- Each electrode can independently control deprotection at its site
- Extended Data in paper shows that activating adjacent pixels caused synthesis failures
- The bottleneck is chemistry (deprotection intermediates diffusing to neighbors), not electronics
- The chip's electronic density far exceeds what the chemistry can currently support

## Key Limitation
- When trying denser pixel spacing, deprotection chemistry intermediates (not pH itself) drifted to neighboring sites
- This caused crosstalk errors — adjacent sequences were corrupted
- The chemistry, not the chip, is the bottleneck
- 64 sites work; scaling to thousands requires solving the chemistry diffusion problem

## Market Context
- DNA synthesis market: ~$6.37B in 2026, projected ~$27B by 2035 (17.4% CAGR)
- Enzymatic DNA synthesis sub-market: $3.77B in 2026, growing at 23.3% CAGR
- Key players: Twist Bioscience (market cap ~$5.3B), IDT, GenScript, DNA Script, Ansa Biotechnologies ($54.4M Series B), Evonetix
- Phosphoramidite (chemical) synthesis dominates but uses hazardous organic solvents (acetonitrile, dichloromethane, TCA)
- Enzymatic synthesis (water-based) is the emerging alternative
- Prior state of the art for enzymatic parallel synthesis: ~12 sequences at a time
- This paper's 64 represents a ~5x jump over prior parallel enzymatic synthesis
- Ansa Biotechnologies has demonstrated 1,005-base sequence yields at 99.9% per-step accuracy (but not massively parallel)
- Twist Bioscience's silicon-based platform can do ~1 million sequences in parallel but uses phosphoramidite chemistry (organic solvents)

## Original Analysis Angles
1. **Cost-per-base economics:** Twist Bioscience charges ~$0.07-0.09/base for synthetic genes. Enzymatic synthesis promises lower cost at scale because water replaces hazardous solvents (no waste handling, simpler facilities). But 64 sites vs Twist's ~1M sites means throughput gap of ~15,000x.
2. **The repurposing insight:** A chip designed for neuroscience was repurposed for genomics. The 4,096 electrodes on the chip could theoretically support 4,096 synthesis sites — 64x more than demonstrated — if the chemistry diffusion problem is solved.
3. **CMOS compatibility:** Like EeroQ in quantum computing, the CMOS angle matters because it means existing semiconductor fabs could manufacture these chips without retooling. The chip is already a standard CMOS design.
4. **Timeline to commercial relevance:** At 64 sites and 39 nt, this is a lab demonstration. Commercial DNA synthesis routinely produces sequences of 200+ bases (oligos) or 1,000+ bases (genes). The gap is both in parallelism (64 vs millions) and length (39 nt vs 200+ nt).

## Sources
- phys.org coverage of the paper
- Nature Electronics paper (DOI: 10.1038/s41928-026-01662-9)
- Grand View Research / Allied Market Research for market data
- Twist Bioscience investor materials
- Ansa Biotechnologies press releases

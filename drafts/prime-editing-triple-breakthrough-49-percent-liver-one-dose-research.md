# Research: Prime Editing Triple Breakthrough — 49% Liver Editing in a Single Dose

## Source Papers (all from David Liu Lab, Broad Institute)

### Paper 1: Directed evolution of small RNA-stabilizing motifs
- **Journal:** Nature Biotechnology (2026)
- **DOI:** 10.1038/s41587-026-03123-2
- **Authors:** Holt A. Sakai, Sarah Pierce et al.
- **Key finding:** Developed PE-PRISM (PE pooled reporter for identification of structured motifs) to screen 2,858 RNA motif candidates. Identified 3 refined motifs that consistently outperform tevopreQ1, the gold standard 3' protective motif used since 2021. Motifs tested across 847 pathogenic mutations in ClinVar.
- **Motif sources:** Pseudoknots from diverse organisms (viral UTRs, frameshifting signals, tRNA-like structures), G-quadruplexes, RT recruitment motifs, tevopreQ1 variants
- **Top hits:** HSRP (human signal recognition particle, z=0.94), WCMV (wild cucumber mosaic virus, z=0.86), HPeV1 (human parechovirus, z=0.75)
- **After iterative evolution:** Second-generation motifs (e.g., eSBRMV1-A) outperform tevopreQ1 across delivery modalities and cell types

### Paper 2: Efficient prime editing in vivo via LNPs
- **Journal:** Nature Nanotechnology (2026)
- **DOI:** 10.1038/s41565-026-02200-6
- **Authors:** Allen Y. Jiang, Ana Cristian et al.
- **Key finding:** 49% indel-free prime editing in bulk mouse liver at Pcsk9 with single 2 mg/kg LNP dose
- **Stage progression:**
  - s0.1 (HM-pegRNA + PEmax): 0.8% editing
  - s0.2 (epegRNA + PEmax): 3.8% (4.75× improvement) — epegRNA with tevopreQ1 beats chemically modified pegRNA
  - s1 (epegRNA + PE6c): 11% (PE6c is 4.6× over PEmax, confirmed by ELISA: higher protein translation)
  - s2 (eSBRMV1-A motif + PE6c): 26% (new motif from Paper 1 vs 17% with tevopreQ1)
  - s3 (optimized 1:1.8:0.2 mRNA:epegRNA:ngRNA ratio + GenScript HPLC-purified mRNA): **49%**
- **Overall fold-improvement:** 63× from s0.1 to s3
- **PKU therapeutic application:** In PAH R408W humanized mouse model, achieved 15% bulk liver editing → curative reduction in blood phenylalanine
- **Previous state of art:** PE7-LNP at 23% with two 4 mg/kg doses (they achieved 49% with one 2 mg/kg dose — 4× better dose-adjusted)
- **Cryo-EM:** Revealed distinct LNP morphologies — mRNA-LNPs form multi-bleb structures; more blebs = more potency

### Paper 3: AI-guided redesign of reverse transcriptases → PE8
- **Journal:** Nature Biotechnology (2026)
- **DOI:** 10.1038/s41587-026-03149-6
- **Authors:** Y. Allen Tao, Holt Sakai, Allen Jiang, Nicholas Krasnow et al.
- **Key finding:** Used ProteinMPNN (AI) + AlphaFold3 to redesign RT domains. 384 candidate designs generated, 174 tested.
- **The problem:** Lab-evolved PE6 RTs gained catalytic activity but lost stability/expression (1.5-2.0× lower protein levels vs wild-type RTs)
- **The fix:** ProteinMPNN redesigns substrate-distal residues to recover folding stability while preserving evolved catalytic improvements
- **Results:** 
  - 95% of designs (165/174) retained functional editing (>5%)
  - 30% (52/174) exceeded starting point performance
  - Up to 40% of residues redesigned (up to 202 amino acid substitutions)
  - New designations: **PE8a** (PE6a-D37, 2.1× avg improvement), **PE8c** (PE6c-D8, 1.4×), **PE8d** (PE6d-D34, 1.4×), **PE8max** (PEmax-D27, 1.2×)
- **Validation scale:** 700 pathogenic ClinVar variants, 16,800 total experiments
- **Disease targets proven:** Bloom syndrome, Crigler-Najjar, Tay-Sachs, sickle cell, familial hypercholesterolemia
- **Delivery compatibility:** mRNA electroporation (T cells, HSPCs), eVLP (RNP), in vivo LNP

## Original Analysis

### Disease coverage calculation
- ClinVar contains ~120,000 classified pathogenic/likely pathogenic variants (as of 2025 data)
- Prime editing can theoretically address ~89% of known pathogenic point mutations (substitutions, small indels)
- That's ~107,000 variants theoretically fixable by prime editing
- Previous LNP efficiency (<8% with multiple doses) limited therapeutic applications to diseases with very low correction thresholds
- The 49% efficiency dramatically expands the treatable disease space — most monogenic liver diseases require 5-30% correction for phenotypic rescue:
  - PKU: ~10% (demonstrated in this paper at 15%)
  - Familial hypercholesterolemia: ~5% 
  - Ornithine transcarbamylase deficiency: ~5-10%
  - Crigler-Najjar: ~5%
  - Alpha-1 antitrypsin deficiency: ~5-10%
  - Wilson disease: ~5-10%

### Cost comparison
- AAV gene therapy: $2-3.5M per patient (Zolgensma $2.1M, Hemgenix $3.5M)
- LNP-based therapies: Alnylam's Onpattro (siRNA-LNP) ~$450K/year; but single-dose cures should be much cheaper
- mRNA manufacturing is industrialized (COVID vaccines proved this at scale)
- LNP prime editing could plausibly be manufactured for <$50K per dose at scale (mRNA synthesis + LNP formulation + QC)
- The 63-fold efficiency improvement means lower doses needed, further reducing cost

### Timeline to first-in-human in vivo prime editing
- Ex vivo prime editing in humans: chronic granulomatous disease results published 2025 (Prime Medicine)
- Base editing in vivo: first-in-human 2025 (Verve Therapeutics PCSK9 for cardiovascular disease; baby K.J. Muldoon for CPS1 deficiency)
- Typical mouse-to-IND: 2-3 years (GLP toxicology, manufacturing scale-up, IND-enabling studies)
- Phase 1: 1-2 years
- Estimate: first in vivo prime editing in a human patient ~2029-2030
- But compassionate use could be earlier if a patient with a life-threatening condition has no other options

### What's still missing
1. **Non-liver tissues** — LNPs naturally traffic to the liver. Brain, lung, muscle, kidney require different delivery vectors (still unsolved for prime editing)
2. **Off-target editing** — Papers report low off-target rates but comprehensive genome-wide studies in primates are needed
3. **Immunogenicity** — Cas9 protein is bacterial; immune responses could limit redosing (though single-dose efficacy may make this moot)
4. **Primate data** — All efficacy data here is in mice; non-human primate studies are essential before clinical translation
5. **Manufacturing consistency** — GenScript HPLC-purified mRNA was 1.9× better than in-house; manufacturing quality is a variable

## Key Comparison: Base Editing vs Prime Editing LNP Delivery
- Base editing (Verve's VERVE-101): ~60-70% editing in primate liver at Pcsk9 with single LNP dose (published 2024)
- Prime editing (this paper): 49% in mouse liver at Pcsk9 with single LNP dose
- Gap is closing but base editing still leads in efficiency
- However: Prime editing can do things base editing cannot — insertions, deletions, all 12 substitution types (base editing limited to C→T and A→G)

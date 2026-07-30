# Research Notes: Raygun AI Protein Miniaturization — Gene Therapy's $4.2B Packaging Problem

## Primary Sources

### 1. Nature Paper (Jul 29, 2026)
- **Title:** "Miniaturizing and modifying natural proteins with Raygun"
- **Authors:** Kapil Devkota, Daichi Shonai, Joey Mao, Young Su Ko, Wei Wang, Scott Soderling, Rohit Singh — Duke University
- **DOI:** 10.1038/s41586-026-10842-8
- **URL:** https://www.nature.com/articles/s41586-026-10842-8

**Key findings:**
- Raygun = encoder-decoder AI framework built on ESM-2 (650M params)
- Represents proteins as probability distributions (multivariate normal) in fixed 64,000-dimensional space (50 blocks × 1,280 dims)
- Can miniaturize proteins 10-25% (sometimes >50%) while preserving predicted structure
- Generation: 0.3s per protein on NVIDIA A100, ~100× faster than diffusion-based methods
- Trained on only 80,000 proteins from UniRef50

**Experimental validation:**
- Fluorescent proteins: eGFP shortened by 25 aa (10.5%), mCherry by 37 aa (15.6%). 6/8 candidates fluorescent. Shorter than 96% of fluorescent proteins in FPbase
- TurboID biotin ligase: 2/11 variants showed enzymatic activity (TurboID-1 at 1% reduction, TurboID-5 at 6%). TurboID-11 (50% reduction) expressed but lost activity
- EGF magnification: 2/4 candidates beat wild-type EGFR binding (Kd 0.274 μM and 0.561 μM vs 0.759 μM wild-type). Won EGFR binder design competition among all EGF-based approaches
- Autonomous domain removal: Raygun independently identified and removed TurboID's DNA-binding domain — same domain manually removed to create UltraID — without domain annotation
- Structure preservation: mTOR (2,549 aa) miniaturized by >500 residues (>20%) with TM-score ~0.7
- Pfam domain retention: 50.65% of candidates retained annotated domains across 50-200% of median family length

### 2. Nature News (Jul 29, 2026)
- "This AI Raygun can shrink and supersize proteins — opening the door to easy editing"
- Gemma Conroy, Nature
- Quote from Fajie Yuan (Westlake University): "For many real applications, that is exactly what researchers want — not a completely new protein, but a better, smaller, larger or more adaptable version of one they already trust"
- Quote from Rohit Singh: "Sometimes a smaller protein can do things or fit into places where a larger protein cannot"

### 3. AAV Packaging Constraints (Multiple PMC sources)
- AAV packaging capacity: ~4.7-5.0 kb of DNA (capsid ~250 Å diameter)
- ~6% of all human proteins have coding sequences exceeding 4 kb (Source: PMC6523333)
- Full-length genome proportion drops 86.3% between 4.7 and 5.0 kb (Source: PMID 40454420)
- Current workarounds: dual AAV vectors (split transgene into 2 halves, rely on recombination in same cell), oversized AAV (heterogeneous truncated genomes), mini-genes
- Dual AAV problems: requires higher vector doses, lower efficiency than single vectors, reliant on intracellular recombination
- Diseases blocked by AAV size limits: Duchenne muscular dystrophy (dystrophin CDS ~11 kb), hemophilia A (Factor VIII CDS ~7 kb), cystic fibrosis (CFTR CDS ~4.4 kb), retinal dystrophies (ABCA4 ~6.8 kb, USH2A ~15.6 kb), Wilson disease (ATP7B ~4.4 kb)
- FDA-approved AAV therapies use truncated/mini versions: Elevidys uses micro-dystrophin (only 29% of full dystrophin), not full-length

### 4. Gene Therapy Market Data
- Market size 2026: $4.22B (Fortune Business Insights), $16.35B (360iResearch — broader definition), $9.74B 2025 (Mordor Intelligence)
- CAGR: 22-29%
- 46 FDA-approved CGT products
- 98.6% use viral vectors
- Zolgensma: $1.2B revenue, Yescarta: $1.498B
- Casgevy (CRISPR-based): $43M Q1 2026, forecast $500M combined 2026

## Original Analysis: The Math

### Calculation 1: How many therapeutic proteins are "oversized" for AAV?
- AAV usable payload: ~4.5 kb (after ITRs, promoter, polyA)
- Average protein CDS: ~1.5 kb (500 aa × 3 bp)
- 6% of human proteins exceed 4 kb CDS → ~1,200 of ~20,000 human proteins
- But therapeutic relevance matters. Cross-reference with disease genes...

### Calculation 2: Raygun miniaturization × AAV capacity
- If Raygun shrinks by 10-25%:
  - A 5.5 kb CDS shrunk 25% → 4.125 kb → FITS in single AAV
  - A 7 kb CDS shrunk 25% → 5.25 kb → Still oversized
  - A 4.8 kb CDS shrunk 10% → 4.32 kb → FITS in single AAV
- Specific diseases:
  - CFTR (4.4 kb CDS): Already borderline. 10% reduction → 3.96 kb → comfortably fits
  - Factor VIII (7 kb): 25% reduction → 5.25 kb → still too large. Would need ~36% reduction (within Raygun's claimed >50% range but unvalidated for function)
  - Dystrophin (11 kb): Needs ~60% reduction → technically in Raygun's range but TurboID-11 showed ~50% reduction lost activity
  - ABCA4 (6.8 kb): 25% → 5.1 kb → borderline. 35% → 4.42 kb → fits

### Calculation 3: Manufacturing cost implications
- Dual AAV manufacturing: 2× production lots, ~2× the dose needed per patient (due to co-infection requirement)
- Zolgensma costs ~$2.1M per treatment (uses standard AAV9)
- If a disease currently requires dual-vector approach, switching to single miniaturized-payload AAV could theoretically halve manufacturing costs
- But: current dual-vector approaches are 2-10× less efficient than single vectors, meaning actual dose requirements are even higher

### Calculation 4: Speed advantage
- Raygun: 0.3s per candidate, ~100× faster than diffusion methods
- Screening pipeline: 500,000 candidates → filtering → 11 selected → 6 expressed → 2 active
- Time from computation to wet-lab validation: weeks (codon optimization, cloning, expression, assay)
- Key bottleneck shift: computational design is no longer the bottleneck — experimental validation is

## Angle
**Headline idea:** An AI Can Now Shrink Proteins by 25% Without Breaking Them. For Gene Therapy, That's Worth $4.2 Billion.

The gene therapy market is a $4.2B industry constrained by a 1990s-era packaging limit. AAV vectors — the workhorses of gene delivery — can only carry ~4.5 kb of DNA. Six percent of human proteins exceed that limit, including the genes behind Duchenne muscular dystrophy, cystic fibrosis, and hemophilia A. Current workarounds (dual vectors, mini-genes) are expensive, inefficient, and lose function. Raygun just demonstrated that AI can shrink proteins by 10-25% while preserving their structure and activity, potentially moving borderline-oversized therapeutic genes into single-vector territory. The math on which diseases this unlocks, and which ones it doesn't, tells you exactly where the technology boundary sits.

## Kill Test
- Original calculation: cross-referencing AAV capacity constraints with Raygun miniaturization percentages to determine which specific disease genes move from "oversized" to "fits" — nobody has run this math
- Novel dataset combination: Raygun's experimentally validated miniaturization percentages × AAV payload limits × specific disease gene sizes
- This isn't synthesis — it's a specific sizing analysis that determines which $B therapeutic markets become addressable

## Journalist
Anya Volkov — cross-disciplinary (energy/biotech), comfortable with engineering constraints
Actually better: Dr. Iris Blackwell — biotech/longevity beat, familiar with gene therapy landscape

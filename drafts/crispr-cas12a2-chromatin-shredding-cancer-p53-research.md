# Research: CRISPR-Cas12a2 Chromatin Shredding for Cancer

## Primary Sources

1. **Zeng et al. (2026)** "Targeting Cancer-Specific Mutations with RNA-Triggered Chromatin Shredding." *Nature*. DOI: 10.1038/s41586-026-10738-7. Published June 8, 2026.
   - Lead author: Jingkun Zeng (postdoc in Doudna lab, PhD from Francis Crick Institute in cancer evolution)
   - Corresponding author: Jennifer A. Doudna (Nobel laureate, CRISPR-Cas9 co-discoverer)
   - Institutions: Gladstone Institutes, UC Berkeley (Innovative Genomics Institute), UCSF, University of Utah, Utah State University, Francis Crick Institute
   - Key finding: Engineered CRISPR-Cas12a2 to target mutant p53 mRNA transcripts specifically, triggering chromatin shredding and cancer cell death
   - Mouse models: lung and liver tumors showed therapeutic effectiveness
   - DOI confirmed, peer review file available

2. **Jackson, Crosby et al. (2026)** "RNA-triggered cell killing with CRISPR-Cas12a2." *Nature*. DOI: 10.1038/s41586-026-10466-y. Published May 6, 2026.
   - Corresponding authors: Ryan N. Jackson (Utah State University), Yang Liu (University of Utah)
   - Key finding: Cas12a2 eliminates human cells upon specific RNA recognition; 50% tumor volume reduction in mice after single treatment
   - Establishes the basic mechanism: RNA target recognition → indiscriminate dsDNase activity → cell death
   - 86% cell depletion in HeLa-GFP cells; 5.2-fold more DNA breaks than controls
   - Comparable DNA damage to cisplatin and etoposide (chemotherapy drugs) but ONLY in cells expressing target transcript
   - LNP delivery demonstrated

## Key Facts

### The p53 Problem
- p53 mutations found in ~40-50% of ALL human cancers
- 70-90% in deadliest cancers: ovarian, pancreatic, non-small cell lung cancer
- p53 called "guardian of the genome" - tumor suppressor
- UNDRUGGABLE: mutant p53 proteins lack stable binding sites for small molecules
- Decades of pharma effort have failed to directly target mutant p53

### How Cas12a2 Works
- Unlike Cas9 (cuts DNA at specific site for editing), Cas12a2 is RNA-triggered
- Guide RNA binds to complementary RNA (mRNA) in the cell
- Upon binding, Cas12a2 activates indiscriminate dsDNase activity
- "Shreds" ALL nearby chromatin DNA - not targeted cutting
- Triggers massive DNA damage response → apoptosis → cell death
- If guide RNA does NOT match the target RNA, enzyme stays inactive → cell is spared
- On/off specificity: can distinguish SINGLE POINT MUTATIONS in mRNA

### Key Data Points
- 86% cell depletion in HeLa-GFP cells (targeting GFP transcript)
- 5.2-fold more 53BP1 foci (DNA break markers) than non-targeting controls
- DNA damage comparable to cisplatin and etoposide chemotherapy
- ~50% tumor volume reduction in mice after SINGLE treatment
- Works across melanoma, lung, head and neck cancer cell lines
- LNP (lipid nanoparticle) delivery demonstrated in HEK293T cells
- Cas13a comparison: only 37% depletion vs Cas12a2's 86% for same target

### Delivery
- Demonstrated with: RNP electroporation, LNP delivery, AAV vectors
- LNP is the delivery vehicle used for COVID-19 mRNA vaccines (Moderna, Pfizer)
- For in vivo cancer therapy, delivery to solid tumors remains a major challenge

## Counterarguments
1. **Antibody-drug conjugates (ADCs)**: Approved targeted cancer therapies that deliver cytotoxic payloads to cancer cells via antibodies. Already in clinical use. BUT: limited to surface protein targets, not intracellular mutations.
2. **Small molecule p53 reactivators**: APR-246 (eprenetapopt) reached Phase III trials but FAILED to show survival benefit in MDS. PRIMA-1 and others also failed.
3. **CAR-T therapy**: Engineered immune cells that kill cancer cells. BUT: limited to cancers with surface antigens, not intracellular mutations like p53.
4. **Delivery barriers**: Getting Cas12a2 to solid tumors is much harder than reaching the liver (where LNP naturally accumulates) or blood cancers.
5. **Immune response**: Bacterial CRISPR proteins can trigger immune reactions; repeat dosing may be limited.

## Comparable Technologies
- **Cas9 gene editing**: Fix the mutation (precision cuts). BUT: editing efficiency is low in cancer cells with chaotic genomes
- **Cas13 RNA targeting**: Degrades target RNA but collateral RNA damage causes toxicity without killing cells reliably
- **Cas12a2**: Unique - senses RNA, destroys DNA. Kills the cell, doesn't try to fix it.

## Scale of Impact
- ~20 million new cancer cases per year globally (WHO/IARC 2022)
- ~50% harbor p53 mutations = ~10 million patients/year theoretically addressable
- Current cancer drug market: ~$200 billion globally
- Gene therapy costs: $500K-$3.5M per treatment (Casgevy, Zolgensma, etc.)

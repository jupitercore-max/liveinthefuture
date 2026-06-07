# Research: PCSK9 Embryo Base Editing Mosaicism Gap

## Topic
Columbia University scientists used base editing (not CRISPR-Cas9) to edit PCSK9 and HBG1/HBG2 in human embryos. First precise base editing in human embryos. ~80% mosaicism. Published bioRxiv June 1, 2026. Original angle: same PCSK9 gene was edited in adults by Verve/Eli Lilly with spectacular success (62% LDL reduction), but in embryos the mosaicism wall shows why germline editing is fundamentally harder than somatic editing.

## Primary Sources
1. **Nature (June 5, 2026):** "First precise genome editing of human embryos triggers praise and alarm" — Dieter Egli, Columbia, base editing of PCSK9 (A→G, 75% cells), HBG1/HBG2 (A→G, 50% cells). ~80% mosaics. Posted bioRxiv June 1.
   - Quotes: Emre Seli (Yale): "conceptual shift...potential to move the field forward"
   - Greg Neely (Sydney): "less reckless, more careful and ethical than previous attempts"
   - Hank Greely (Stanford): "You could set up an IVF lab...for a handful of millions of dollars"
   - Fyodor Urnov (Berkeley): "solution in search of a problem"
   - Egli: "you can't use it. It's as clear as day and night."

2. **WSJ (June 6, 2026):** "Scientist Edits Human Embryo Genes, but Questions Remain" — Nathan Treff of Nucleus Genomics is co-author. "nearly 80% of embryos became mosaics." Preprint server, not peer reviewed.

3. **New Scientist (June 6, 2026):** PCSK9 edit worked in 75% of cells with no off-target. HBG edit worked in 50% of cells with off-target. Mosaicism = the wall. No way to verify non-mosaicism in an embryo. Suggests editing sperm/eggs before fertilization as alternative.

4. **NEJM (May 25, 2026):** Verve-102 Phase I Heart-2 trial. 35 patients with familial hypercholesterolemia. PCSK9 base editing via LNP. 62% LDL reduction at highest dose. Persistent >1 year. Verve acquired by Eli Lilly June 2025.

5. **NEJM (May 7, 2026):** BEACON trial. Beam Therapeutics. Base editing of HBG1/HBG2 promoters for sickle cell disease. Clinical success in patients.

6. **FDA (June 2026):** Draft guidance FDA-2026-D-1257 on leveraging prior knowledge for genome editing gene therapy products. Explicitly somatic. No guidance on germline.

7. **Nucleus Genomics:** $32M total funding (Founders Fund, 776). Kian Sadeghi founder. Nathan Treff CCO. "Nucleus Embryo" genetic optimization software for IVF. Controversial — designer baby criticism from TechCrunch, VCs.

## Original Analysis: The Mosaicism Ceiling Math
Per-cell editing rates: PCSK9 = 75%, HBG = 50%
Dual editing at 2-cell stage:
- P(both cells get both edits) = (0.75 × 0.50)² = 14.1%
- ~86% of embryos would be mosaic — close to reported ~80%

Compounding table:
| Per-cell rate (per gene) | Non-mosaic (single gene, 2-cell) | Non-mosaic (dual, 2-cell) |
|---|---|---|
| 50% | 25% | 6.25% |
| 75% | 56% | 31.6% |
| 90% | 81% | 65.6% |
| 95% | 90.25% | 81.5% |
| 99% | 98% | 96% |
| 99.75% | 99.5% | 99% |

To reach 99% non-mosaic dual-edited embryos: need 99.75% per-cell per-gene efficiency.
Current best: 75%.

## Somatic vs Germline Tolerance Gap
- Somatic (Verve-102): Need ~20% of liver cells edited → achieved much more → 62% LDL reduction. MARGIN = 5x+
- Germline (Egli): Need 100% of embryo cells edited → achieved 75%. MARGIN = 0x (below threshold)

## Strongest Counterargument
Egli himself says this is basic research, not clinical. The data shows base editing CAN work in embryos without the catastrophic chromosomal damage of Cas9. The paper is a proof of concept, not a clinical proposal. IVF + PGT already prevents most inherited diseases — germline editing is unnecessary for most couples.

## Limitations
- Preprint, not peer reviewed
- Per-cell editing rates are averages across embryos, not per-embryo measurements
- The probability model assumes independence between cells, which may not hold
- Sample size not specified in secondary reporting
- Improved procedures claimed but not shown in preprint data

## Journalist
Dr. Kenji Watanabe — covers base editing, gene therapy, genomics for LITF

## Category
🧪 Genomics

## Article Number
394

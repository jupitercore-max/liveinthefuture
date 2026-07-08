# Research Notes: CRISPR Phase 3 HAE — One-Dose Cure vs. $350K/Year for Life

## Primary Sources

### 1. NEJM Phase 3 Trial — Lonvoguran Ziclumeran (lonvo-z)
- **Publication:** New England Journal of Medicine, June 2026
- **DOI:** Published concurrent with EAACI 2026 (Istanbul)
- **Trial design:** Phase 3, double-blind, randomized 2:1 (lonvo-z vs placebo)
- **Patients:** 80 total (52 lonvo-z, 28 placebo), aged ≥16, HAE with C1 inhibitor deficiency
- **Intervention:** Single IV infusion of lonvo-z 50 mg
- **Mechanism:** In vivo CRISPR gene editing — permanently reduces kallikrein production in the liver
- **Primary endpoint:** Monthly attack rate weeks 5-28
  - Lonvo-z: 0.26 attacks/month (95% CI: 0.15-0.45)
  - Placebo: 2.10 attacks/month (95% CI: 1.55-2.86)
  - **Relative reduction: 87% (95% CI: 78-93%, P<0.001)**
- **Key secondary endpoints:**
  - 62% attack-free (vs 11% placebo)
  - 89% reduction in on-demand treatment need
  - 91% reduction in moderate-to-severe attacks
  - Quality-of-life improvement significantly greater
- **Safety:** No serious or grade 3+ adverse events in lonvo-z group. Infusion-related reaction, headache, fatigue, back pain most common (all >10%).
- **Median follow-up:** 7.5 months (range 4.9-12.8)
- **Developer:** Intellia Therapeutics (NTLA)
- **Significance:** First Phase 3 double-blind trial for ANY in vivo CRISPR gene editing therapy

### 2. Current HAE Treatment Costs (Multiple Sources)
- **Takhzyro (lanadelumab):** $26,393 per 300mg vial (Drugs.com). Q2W dosing: ~$686,000/yr list price
- **Real-world costs:** $377,326-$634,119/yr total HAE-related costs per patient on lanadelumab (PubMed: PMID 39976166, Merative MarketScan data)
- **Berotralstat:** $757,137/yr total HAE-related costs (same MarketScan study)
- **ICER benchmarks (updated):** Takhzyro $218,900-$219,800/yr (53% discount from list), Haegarda $247,700-$248,800/yr (54% discount), Cinryze $139,800-$140,600/yr (75% discount)
- **On-demand per attack:** $12,342-$20,315 per attack (PubMed cost-effectiveness model)
- **Average attack rate (untreated):** 26.9 attacks/year
- **Cost per QALY:** $402,769-$666,153 (depends on drug)

### 3. HAE Epidemiology
- Prevalence: ~1 in 50,000 (multiple sources)
- US patients: ~6,600
- Worldwide: ~150,000
- Types I and II (C1 inhibitor deficiency): ~95% of cases
- Onset: typically teens/early adulthood
- Lifelong condition — requires ongoing prophylaxis

### 4. Prior CRISPR Clinical Results (for comparison)
- **NTLA-2001 (transthyretin amyloidosis):** Phase 1 — 87% TTR reduction at higher dose, sustained. NEJM published.
- **Casgevy (exagamglogene autotemcel/exa-cel):** FDA approved Dec 2023 for sickle cell and transfusion-dependent beta-thal. Ex vivo editing. Priced at $2.2 million.
- **CRISPR cholesterol (CTX310, ANGPTL3):** Phase 1 — single IV dose reduced triglycerides. Published NEJM Feb 2026.

### 5. Gene Therapy Pricing Precedents
- Casgevy (Vertex/CRISPR Therapeutics): $2.2 million
- Zolgensma (Novartis, SMA): $2.125 million
- Hemgenix (CSL Behring, hemophilia B): $3.5 million
- Elevidys (Sarepta, DMD): $3.2 million
- Skysona (Bluebird Bio, ALD): $3.0 million
- Average gene therapy price: ~$2.8 million

## Original Analysis — The "One-Dose" Economics

### Calculation 1: Lifetime HAE Treatment Cost (Current Standard of Care)
- Median age of diagnosis/treatment start: ~20 years
- US life expectancy: ~78 years
- Treatment duration: ~58 years
- Annual treatment cost (real-world, conservative): $350,000/yr
- **Undiscounted lifetime cost: $350,000 × 58 = $20.3 million**
- **NPV at 3% discount rate: Σ from t=0 to t=57 of $350,000/(1.03)^t = $350,000 × 28.41 = $9.94 million**
- **NPV at 5% discount rate: $350,000 × 19.24 = $6.73 million**

### Calculation 2: Break-Even CRISPR Price
- At 3% discount: lonvo-z could cost up to **$9.94 million** and still break even
- At 5% discount: up to **$6.73 million**
- Current gene therapy pricing range: $2.2-3.5M
- **If priced at $2.5M (gene therapy median), net savings per patient: $7.44M (3% disc) or $4.23M (5% disc)**

### Calculation 3: US Market Disruption
- Current US recurring HAE market: 6,600 patients × $350,000/yr = **$2.31 billion/year recurring**
- CRISPR one-time market: 6,600 patients × $2.5M = **$16.5 billion one-time, then near-zero**
- Time for pharma to recoup: ~7.1 years of recurring revenue replaced by one-time payment
- But pharma loses the annuity: Year 8+ revenue = ~$0 (vs $2.31B/yr perpetual under current model)

### Calculation 4: Pipeline Extrapolation — Single-Gene Diseases Amenable to In Vivo CRISPR
| Disease | US Patients | Current Annual Cost | Annual Market | CRISPR Status |
|---------|-------------|--------------------|--------------|--------------| 
| HAE | 6,600 | $350,000 | $2.3B | Phase 3 (Intellia) |
| ATTR amyloidosis | 50,000 | $225,000 | $11.3B | Phase 1 (Intellia) |
| Sickle cell disease | 100,000 | $45,000 | $4.5B | Approved (ex vivo) |
| Hemophilia A | 20,000 | $300,000 | $6.0B | Preclinical |
| Hemophilia B | 6,000 | $250,000 | $1.5B | Gene therapy approved |
| Familial hypercholesterolemia | 650,000 | $15,000 | $9.8B | Phase 1 (ANGPTL3) |
| PKU | 50,000 | $50,000 | $2.5B | Preclinical |
| **Total** | **~883,000** | — | **$37.9B/yr** | — |

If in vivo CRISPR can cure all seven of these: $37.9B/yr recurring → $2.2T one-time (at $2.5M/patient) → then near-zero.

### Key Insight / Kill Test
**The calculation nobody ran:** At current gene therapy pricing ($2.5M median), in vivo CRISPR editing would save HAE patients $7.44 million each over a lifetime — but it would simultaneously destroy a $2.3 billion annual pharmaceutical revenue stream. Across the seven most advanced single-gene disease targets, CRISPR threatens $37.9 billion in annual recurring revenue. This is the pharmaceutical industry's Innovator's Dilemma: the companies best positioned to develop cures are the ones with the most to lose from selling them.

## Counterargument (Strongest Case Against)
- Durability unknown beyond 12.8 months — CRISPR edits should be permanent but Phase 3 follow-up is still short
- Safety signals could emerge with longer follow-up (off-target editing, hepatotoxicity)
- Gene therapies have historically struggled with commercial viability despite high list prices (Bluebird Bio withdrew from EU market)
- Payers may balk at multi-million-dollar one-time payments even if NPV-positive
- The 87% reduction, while dramatic, means some patients still have attacks — not a "perfect cure"
- Re-dosing may eventually be needed if editing is incomplete (would undermine the "one-and-done" economics)

## Limitations
- Real-world HAE treatment costs vary widely ($283K-$757K/yr) — we use $350K as conservative midpoint
- Discount rate assumptions significantly affect lifetime NPV (3% vs 5% changes break-even by $3.2M)
- US prevalence estimates vary (6,000-10,000 depending on source and diagnostic criteria)
- Pipeline diseases have vastly different technical challenges — not all amenable to single-dose liver-targeted editing
- CRISPR drug pricing is speculative — no in vivo CRISPR therapy has been priced yet
- Insurance and reimbursement frameworks for one-time cures remain immature

## Sources
1. NEJM: Lonvoguran Ziclumeran Phase 3 trial (DOI pending publication)
2. MedicalXpress: "In vivo CRISPR therapy successfully reduces hereditary angioedema attacks" (June 15, 2026)
3. PubMed PMID 39976166: Real-world HAE cost comparison (lanadelumab vs berotralstat)
4. ICER: Updated assessment of HAE therapies
5. Drugs.com: Takhzyro pricing ($26,392.78/vial)
6. NEJM: NTLA-2001 transthyretin amyloidosis Phase 1
7. NEJM letter: CTX310 ANGPTL3 CRISPR cholesterol (Feb 2026)
8. BLS data used as framework for discount rate methodology

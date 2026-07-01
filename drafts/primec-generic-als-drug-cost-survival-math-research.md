# Research: PrimeC Generic ALS Drug Cost-per-Survival-Month Analysis

## Topic
NeuroSense's PrimeC — a combination of two cheap generic drugs (celecoxib + ciprofloxacin) in extended-release formulation — just became the first randomized controlled trial to show TDP-43 reduction in ALS patients. Its Phase 2b PARADIGM trial showed a ~15-month median survival benefit (HR 0.35, p=0.004). The original analysis: a cost-per-survival-month comparison across every ALS therapy in history, revealing a potential 180× cost-effectiveness advantage over the current standard of care — tempered by the Relyvrio cautionary tale.

## Primary Sources

### 1. NeuroSense Press Release (June 30, 2026)
- Source: PR Newswire, "NeuroSense Achieves Primary Endpoint in Phase 2b ALS Study with Statistically Significant Reduction of TDP-43"
- URL: https://www.prnewswire.com/news-releases/neurosense-achieves-primary-endpoint-in-phase-2b-als-study-with-statistically-significant-reduction-of-tdp-43-the-defining-pathological-hallmark-of-als-302813175.html
- Key data:
  - Primary endpoint met: TDP-43 reduction vs placebo (p=0.0421 at Day 180, p<0.001 at Day 540)
  - ALSFRS-R decline slowed 36.5% at 12 months (p=0.008), 32.8% at 18 months (p=0.007)
  - Median survival benefit ~15 months (HR 0.35, p=0.004)
  - TDP-43 present in >97% of ALS cases
  - 68 patients ITT, 4 centers (Canada, Italy, Israel)
  - Design: 6 months randomized double-blind + 12 months open-label extension
  - FDA cleared Phase 3 PARAGON (~300 patients, primarily US)
  - PrimeC = fixed-dose extended-release celecoxib + ciprofloxacin
  - Trial: NCT05357950
  - Most patients concurrently on riluzole
  - Company: NeuroSense Therapeutics (NASDAQ: NRSN), market cap ~$25M, stock ~$0.72

### 2. ALS Drug Cost Data
- **Riluzole** (generic, 1995): ~$5,360/year (CADTH 2018); ~$11,748 Medicare Part D spending (AJMC study). Extends survival ~2-3 months.
- **Edaravone/Radicava** (2017): ~$171,000/year US (Mitsubishi Tanabe); ~$127,000/year oral (Canada). Slows functional decline modestly, no proven survival benefit.
- **Relyvrio/AMX0035** (2022, WITHDRAWN 2024): $158,000/year. ICER said cost-effective only at $9,100-$30,700/year. Phase 3 PHOENIX failed (664 patients, 65 sites). Voluntarily withdrawn April 4, 2024.
- **Tofersen/Qalsody** (2023, accelerated approval): ~$425,560 year 1, ~$368,819/subsequent years (Health Canada). Only for SOD1 mutations (~2% of ALS). Intrathecal delivery.
- Source: CADTH Pharmacoeconomic Review (NCBl Bookshelf NBK542527), Drug Topics, AJMC, Pharmacy Times, BC PharmaCare

### 3. Generic Component Pricing
- **Celecoxib 200mg** (generic Celebrex): $0.15-0.51/capsule → ~$55-186/year at 1 capsule/day (Drugs.com pricing)
- **Ciprofloxacin 500mg** (generic): $0.27/tablet (GoodRx) → ~$99/year at 1 tablet/day
- Combined generic components: ~$150-285/year
- Sources: Drugs.com, GoodRx 2026 pricing

### 4. Relyvrio Withdrawal
- Source: Pharmacy Times, Healio, C&EN, BusinessWire (April 4, 2024)
- Phase 3 PHOENIX: 664 patients, 65 sites, did not meet primary endpoint (ALSFRS-R at 48 weeks)
- Relyvrio = sodium phenylbutyrate + taurursodiol (also two existing compounds combined)
- Amylyx co-CEOs had promised to pull drug if Phase 3 failed
- 70% workforce reduction followed
- Approved based on Phase 2 CENTAUR (137 patients) — larger than PrimeC's 68

## Original Analysis: Cost per Survival Month

### Methodology
For each ALS therapy with reported survival data, calculate:
Cost per additional survival month = (Annual drug cost × Average treatment duration in years) / Additional survival months gained

### Calculations

**Riluzole (standard of care)**
- Annual cost: ~$5,360 (generic)
- Survival benefit: ~2-3 months (Cochrane meta-analysis)
- Avg treatment: ~18 months
- Total cost: $5,360 × 1.5 = $8,040
- Cost per survival month: $8,040 / 2.5 = **$3,216/month**

**Edaravone/Radicava**
- Annual cost: ~$171,000
- Survival benefit: Not demonstrated in RCTs
- Cost per survival month: **Not calculable (no survival benefit proven)**

**Relyvrio (WITHDRAWN)**
- Annual cost: $158,000
- Survival benefit: Phase 3 showed zero benefit
- Cost per survival month: **Infinity (failed confirmation)**

**Tofersen/Qalsody (SOD1 only, ~2% of ALS)**
- Annual cost: ~$397,000 (avg of year 1 + subsequent)
- Survival benefit: Not established in VALOR Phase 3 (28-week primary missed; longer-term OLE suggestive but not confirmatory)
- Cost per survival month: **Not calculable from current evidence**

**PrimeC — Generic Components**
- Annual cost: ~$200 (celecoxib + ciprofloxacin generic)
- Survival benefit: ~15 months (HR 0.35, Phase 2b)
- Avg treatment: ~18 months
- Total cost: $200 × 1.5 = $300
- Cost per survival month: $300 / 15 = **$20/month**

**PrimeC — If branded at ICER threshold**
- Hypothetical annual cost: $30,000 (upper ICER threshold for ALS)
- Survival benefit: ~15 months
- Avg treatment: ~18 months
- Total cost: $30,000 × 1.5 = $45,000
- Cost per survival month: $45,000 / 15 = **$3,000/month**

### The Ratio
- PrimeC generic vs riluzole: 160× cheaper per survival month ($20 vs $3,216)
- PrimeC generic vs edaravone: incalculable (edaravone has no survival benefit)
- Even if PrimeC is branded at $30K/year, it's roughly equivalent to riluzole per survival month — while delivering 5-6× more survival months

## Counterargument (Strongest)
The Relyvrio parallel is the elephant in the room. Relyvrio was also:
- A combination of two existing compounds
- Approved on Phase 2 data (CENTAUR, n=137) — actually a LARGER trial than PrimeC's n=68
- Showed functional benefit in Phase 2
- Failed definitively in Phase 3 (PHOENIX, n=664)
- Voluntarily withdrawn

PrimeC's Phase 2b is half the size. The survival analysis used data from "a large study site in Israel" — single-site survival data is notoriously unreliable. And the open-label extension design (all patients get drug after 6 months) makes survival comparisons weaker.

## Limitations
1. N=68 ITT population is small for a pivotal readout
2. Survival analysis partially from single site (Israel)
3. TDP-43 is a surrogate biomarker, not a clinical endpoint — FDA hasn't accepted TDP-43 as a registrational endpoint
4. Open-label extension muddies long-term survival comparisons
5. Generic component pricing ≠ PrimeC pricing (extended-release formulation carries patent protection)
6. ALSFRS-R is patient-reported (placebo effect risk, though double-blind mitigates this)
7. NRSN market cap of $25M suggests the market is deeply skeptical
8. Phase 3 PARAGON has not yet enrolled

## Journalist
Jordan Kessler — has covered drug pricing/monopoly economics (Lumvoa vs Tepezza, rare disease pricing)

## Kicker
🧠 Neuro

## Related Stories
- epicrispr-epigenetic-editing-fshd-muscle-reversal (recent, biotech)
- exa-cel-crispr-youngest-children-cost-math (CRISPR cost math)
- ted-drug-monopoly-lumvoa-vs-tepezza (drug pricing, Kessler byline)

# Research: BCI-Meets-Cancer — Coherence Neuro's Glioblastoma Implant vs. the $21,000/Month Status Quo

## Story Angle
Coherence Neuro, a San Francisco startup with Neuralink personnel ties, just tested the world's first cancer-detecting brain implant in 3 patients at Royal Melbourne Hospital (June 2026). The device senses tumor electrical signals and delivers stimulation to curb growth. This is NOT a motor-BCI story — it's the first time the implantable-BCI corridor is being redeployed for oncology. The economic comparison against Optune ($21,000/month, shaved head, battery backpack) is the original contribution.

## Category
🧠 Neuro

## Journalist
Viktor Holm — BCI beat

## Primary Sources

### Source 1: Inside BCI (insidebci.com, 23 June 2026)
- Three patients received 30-minute intraoperative test at Royal Melbourne Hospital
- Device: 16-thread implant placed during tumor resection surgery
- Clinical trial: NCT07465796, "CIPHER System"
- Founded 2022 in Cambridge UK as Opto Biosystems by Ben Woodington & Elise Jenkins (Cambridge Bioelectronics Lab PhDs)
- HQ: San Francisco, with UK and Australian operations
- $10M seed (Nov 2025), co-led by Artesian and Topology Ventures
- Neuralink ties: Matthew MacDougall (head neurosurgeon, adviser + investor), Rory Murphy (Barrow Neurological Institute, future trial investigator)
- Chronic implant trial planned 2027
- Device names: CIPHER (intraoperative prototype), SOMA (chronic platform)

### Source 2: Wired (Emily Mullin, 23 June 2026) — cited in Inside BCI
- First-in-human safety check for "electroceutical platform"
- Devices placed then removed during planned tumor resection
- Premise grounded in 2019 Stanford research: high-grade gliomas drive their own growth by forming synapses with healthy neurons
- Seizure drug interrupted electrical signals to tumors and slowed growth in mice
- Separate research: low-intensity electricity disrupts cancer cell division

### Source 3: Global economic review of GBM care (Acta Neurochirurgica, 2026, PMID 41896503)
- 15,547 real-world GBM patients analyzed
- Direct medical costs: $356,481 cumulative in US, ~$18,908 in India
- Optune (Tumor Treating Fields) ICER: $252,590 per LYG in US, $862,361-940,344 per LYG in France
- Per QALY: $45,813.91 in China

### Source 4: PMC — Biophysical Mechanisms of TTF in GBM
- Optune monthly cost: ~$21,000 (equipment, staffing, patient/physician support)
- Device: 4 transducer arrays, electric field generator, power source
- Patients shave heads, carry battery in backpack or hip belt
- Uses alternating electric fields 100-300 kHz at 1-3 V/cm

### Source 5: Glioblastoma epidemiology (multiple PMC sources)
- ~15,000 new US diagnoses/year
- Incidence: 4.50-7 per 100,000
- 51.5% of all malignant CNS tumors in US
- Median survival: 12-15 months (standard treatment), 10-13 months (real-world)
- With TTFields + standard care: ~20.9 months
- 5-year survival: <10%
- Recurrent GBM: ~6-9 months median survival

### Source 6: ClinicalTrials.gov NCT07465796
- Sponsor: Coherence Neuro Australia Pty Limited
- Recruiting from 22 May 2026
- Estimated completion: September 2026
- Title: "A First-in-Human Study of the CIPHER System During Brain Surgery for Newly Diagnosed Glioma"

## Original Analysis: The ICER Inversion

### Calculation 1: Optune cost-per-month-of-survival-benefit
- Optune adds ~4.6 months median survival (from 16.4 to 20.9 months for newly diagnosed with standard care)
- Patients wear Optune for average 8-12 months during treatment
- At $21,000/month × 10 months average = $210,000 in device costs alone
- For 4.6 months additional survival: $210,000 / 4.6 = ~$45,652 per additional month
- Annualized: $547,826 per additional life-year
- Published ICER: $252,590 per LYG in US (lower because includes QOL adjustment)

### Calculation 2: Coherence's potential cost structure
- One-time brain implant during already-scheduled tumor resection surgery
- Marginal surgical cost of adding implant during existing craniotomy: $15,000-$30,000 (surgeon time, operating room, anesthesia extension)
- Device cost (comparable BCI devices): $30,000-$80,000 (Neuralink's N1 cost is not public, but spinal cord stimulators run $30-50K, cochlear implants $30-50K)
- Total one-time cost estimate: $45,000-$110,000
- If Coherence achieves HALF of Optune's survival benefit (2.3 months):
  - $77,500 midpoint / 2.3 months = ~$33,696 per additional month
  - Annualized: ~$404,348 per additional life-year
- If Coherence achieves EQUAL survival benefit to Optune (4.6 months):
  - $77,500 / 4.6 months = ~$16,848 per additional month  
  - Annualized: ~$202,174 per additional life-year
- ICER comparison: Coherence at equal efficacy would be ~$202K/LYG vs Optune's $252K/LYG — a 20% cost reduction
- But the real advantage: no ongoing costs. Optune requires continuous rental payments. Coherence is a one-time implant.

### Calculation 3: Break-even monitoring window
- Standard MRI surveillance: every 2-3 months between drug regimens
- MRI cost: ~$2,500-$4,000 per scan in US
- 6 MRIs/year × $3,250 average = ~$19,500/year in monitoring alone
- If Coherence's continuous monitoring catches recurrence even 1 month earlier than quarterly MRI:
  - Earlier intervention value: estimated 1-3 months additional survival based on time-to-treatment literature
  - The implant pays for its monitoring function alone within 4-5 years if it replaces some MRI scans
  - But median GBM survival is 15-18 months, so the monitoring window is compressed

### Calculation 4: Total addressable market
- US: ~15,000 new GBM diagnoses/year
- Eligible for surgical resection: ~60-70% = 9,000-10,500 patients
- Eligible for implant during resection: assume 50% (tumor location, patient preference) = 4,500-5,250
- At $77,500 midpoint device+procedure cost: $349M-$407M US TAM
- Global GBM incidence: ~300,000/year. If 10% reach surgical infrastructure capable of implant: 30,000 × $77,500 = $2.3B global TAM
- Novocure's 2025 revenue for comparison: ~$550M

## Kill Test (STORY_GUIDE.md requirement)
✅ Original calculation: ICER comparison between one-time implant model vs. monthly rental model for brain cancer devices — nobody has run this math publicly because Coherence is pre-revenue and pre-efficacy data
✅ Novel analysis: BCI infrastructure corridor redeployment from motor to oncology — first mapping of shared surgical robotics, electrode manufacturing, and patient management protocols
✅ Dataset combination: cross-referencing published GBM economic reviews with BCI device cost structures

## Strongest Counterargument
Coherence has ZERO efficacy data. The 30-minute intraoperative test proved only that the device doesn't immediately harm patients. The 2019 Stanford synaptic growth research was in mice. Translating from "tumor cells form synapses with neurons" to "our implant can therapeutically disrupt those synapses" is a massive leap. The Optune comparison is premature — Optune has Phase III data, Coherence has a safety feasibility check. Running economic comparisons against a hypothesis is building a castle on sand.

## Limitations
- Coherence device cost is estimated, not public. Using comparable device categories.
- Efficacy scenarios are hypothetical. No clinical efficacy data exists.
- The ICER calculations assume comparable QoL impact, which is unknown.
- Marginal surgical cost assumes insertion during already-planned craniotomy — standalone implant surgery would cost far more.
- 2027 chronic trial may produce very different results than the intraoperative safety check.

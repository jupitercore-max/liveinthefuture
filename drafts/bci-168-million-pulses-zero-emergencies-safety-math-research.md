# Research Notes: 168 Million Pulses, Zero Emergencies — The BCI Safety Math

## Primary Sources

### 1. Greenspon et al. (2026) — Science Translational Medicine
- **Title:** "Long-term safety and efficacy of intracortical microstimulation in humans"
- **DOI:** 10.1126/scitranslmed.aec3728
- **Published:** July 16-17, 2026
- **Teams:** University of Pittsburgh + University of Chicago
- **Key data:**
  - 5 volunteers with spinal cord injuries
  - 168 million pulses of brain stimulation delivered
  - Combined 27 years of implant time
  - Zero serious adverse events
  - Stimulation delivered to somatosensory cortex (hand region)
  - Sensations stayed mapped to the hand, did not shift to other body parts
  - "Persistent sensations" (lingering after stim off): ~1 per 23,000 trials
  - All persistent sensations lasted <10 seconds, none painful, none required medical intervention
  - Electrode longevity: 64% remained functional on average
  - One participant: 60% electrodes functional after 10 years (with accelerated decay later)
  - First long-term safety study of intracortical microstimulation in humans
  - Longest-running study of its kind

- **Quote (Robert Gaunt, PhD, senior author):** "This research plants a flag in the ground for the safety and utility of using brain-computer interfaces to deliver sensory stimulation in clinical settings and, eventually, in people's homes."
- **Quote (Charles Greenspon, PhD, lead author):** "This shows that this technology doesn't just have to be a short-term solution we test in the lab; industry can start developing long term take-home solutions for patients."

### 2. Neuracle NEO — China's Commercial BCI
- **Source:** MIT Technology Review, Nature Biotechnology, Gizmodo, People's Daily
- **Approval:** March 13, 2026, China's National Medical Products Administration
- **First commercial implant:** Week of July 14, 2026 (reported July 16)
- **Device:** Coin-sized, 8 electrodes, epidural (on dura mater)
- **Function:** Records motor cortex signals → decodes → controls robotic glove
- **Patient eligibility:** 18-60 years, cervical SCI, some residual arm function
- **Trial data:** 36 clinical trials since Oct 2023, 32 in 2025
- **Patient Dong Hui:** Grabbed ball without glove on day 9 of training
- **Health insurance:** China assigned unique code for insurance integration days after approval
- **Key distinction:** Epidural (less invasive) → lower risk → faster approval pathway

### 3. Neuralink N1 — For Comparison
- **Device:** 1,024 electrodes across 64 threads, intracortical (penetrates cortex)
- **Trial status:** 21 patients enrolled (as of mid-2026)
- **FDA status:** Early feasibility study, no commercial approval
- **Issues:** Thread retraction in first patient (Noland Arbaugh), compensated via software
- **Blindsight:** FDA Breakthrough Device Designation for visual cortex implant
- **Target:** 1,000 implants mentioned by Musk

### 4. Spinal Cord Injury Global Burden
- **Source:** GBD 2021 study (published 2026 via PubMed PMID 41154231)
- **Global prevalence 2021:** ~14.5 million people living with SCI
  - 7.30 million neck-level, 7.22 million below-neck-level
- **7MM (US, EU4, UK, Japan):** ~959,000 diagnosed prevalent cases (2023)
  - US: 32% (~307K)
- **Incidence 2019:** ~908,000 new cases/year globally
- **Lifetime cost per person:** ~$336,000
- **Leading causes:** Falls (477K cases), road injuries (230K cases)

## Original Calculations

### Calculation 1: Poisson Upper Bound for Zero SAEs
With 0 serious adverse events in 168 million stimulation pulses:
- Poisson 95% CI upper bound for λ when k=0: λ_upper = 3.0
- Per-pulse risk upper bound: 3.0 / 168,000,000 = 1.79 × 10⁻⁸
- Equivalently: <1 serious event per 56 million pulses (at 95% confidence)
- Per patient-year: 0 SAEs in 27 patient-years → upper bound: 3.0/27 = 0.111 SAEs/patient-year

### Calculation 2: Electrode Decay Math
- Average: 64% survival across all participants
- 10-year participant: 60% survival
- Assuming exponential decay: survival(t) = e^(-λt)
- At t=10: 0.60 = e^(-10λ) → λ = -ln(0.60)/10 = 0.0511/year
- Half-life: ln(2)/0.0511 = 13.6 years
- Projections for commercial arrays:
  - NEO (8 electrodes): After 10 years → 4.8 functional → 5 electrodes. Minimum viable? Probably yes for basic hand control.
  - Neuralink N1 (1,024 electrodes): After 10 years → 614 functional. Still massive bandwidth.
  - BrainGate Utah array (96 electrodes): After 10 years → 58 functional.
  - But: decay accelerated later in the study, suggesting the curve may not be purely exponential. The last 2-3 years showed faster losses.

### Calculation 3: Persistent Sensation Rate
- 1 persistent sensation per ~23,000 stimulation trials
- Rate: 0.00435% per trial (43.5 per million trials)
- All lasted <10 seconds, none painful
- Compare to phantom sensations in limb amputees: ~80% prevalence
- Compare to cochlear implant side effects: ~3-5% experience non-auditory stimulation (facial tingling, dizziness)

### Calculation 4: Cochlear Implant Trajectory Comparison
- Cochlear implants: first human implant 1961, FDA approval 1985 (24 years), ~1 million devices implanted by 2020 (59 years total)
- BCIs: first motor BCI research ~2006 (BrainGate), first commercial approval 2026 (NEO) = 20 years
- At cochlear implant adoption rates (post-approval):
  - First 5 years: ~50,000 cumulative
  - First 10 years: ~200,000 cumulative
  - BCIs could follow similar curve IF pricing, insurance, and manufacturing scale
- Cochlear implant cost: ~$30,000-$50,000 per device + surgery
- NEO cost: Not disclosed, but China's insurance integration suggests <$50,000 range
- Neuralink: No commercial pricing disclosed

### Calculation 5: Bidirectional BCI Value Premium
- Motor-only BCI: enables cursor control, typing, device control
- Motor + sensory (bidirectional): enables prosthetic hand FEELING — tactile feedback for grasping
- The value gap: a prosthetic hand that can grip but can't feel breaks eggs and crushes cups
- Bidirectional BCIs could serve upper-limb SCI patients (~7.3M neck-level globally)
- Even 1% adoption over 20 years = 73,000 devices
- At $50K/device = $3.65 billion cumulative market
- The Pitt study validates the sensory half of this equation for 10+ years

## Key Insight / Kill Test
**The original analysis nobody has done:** The Poisson math on zero SAEs in 168M pulses gives an empirical safety bound that the FDA can use as a regulatory benchmark. The electrode decay curve, projected onto commercial arrays with 100-1000x more electrodes, shows these devices degrade gracefully — a 1,024-electrode array losing 40% of electrodes over a decade still has more bandwidth than any device on the market today. The implication: the bidirectional BCI — where you both control a prosthetic and FEEL through it — now has a decade of validated safety data on the sensory side. This is the missing piece for FDA approval of closed-loop prosthetics.

## Journalist: Viktor Holm
- Beat: Neuro
- Previously wrote: bci-glioblastoma-cancer-implant-economics

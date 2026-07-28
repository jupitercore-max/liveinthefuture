# Research Notes: BrainGate BCI — Two Years of Independent Home Use and Employment

## Core Source
- **Paper:** "Long-term independent use of an intracortical brain–computer interface for speech and cursor control" — Nature Medicine (June 2026)
- **DOI:** 10.1038/s41591-026-04414-6
- **PMID:** 42297978
- **Trial:** BrainGate2 (ClinicalTrials.gov NCT00912041)

## Key Data Points

### Patient Profile
- 45-year-old man ("T15") with paralysis and severe dysarthria due to ALS
- Four microelectrode arrays (64 electrodes each = 256 total) in ventral precentral gyrus (speech motor cortex)
- Percutaneous wired connections
- Three parallel neural decoders: brain-to-text speech + cursor control + click gestures

### Communication Performance
- **183,060 sentences communicated** totaling **1,960,163 words**
- Average rate: **56 words per minute**
- Self-rated accuracy: **92% of sentences decoded "at least mostly correctly"**
- Controlled testing accuracy: **>99% word accuracy** on **125,000-word vocabulary**
- Used speech BCI as keyboard input, cursor BCI as mouse input

### Independence Metrics
- **3,800+ hours** of at-home use with **no researchers present**
- Used BCI for: text messages, emails, internet browsing, video calls
- Maintained **full-time employment** while paralyzed
- **Near-daily use over ~2 years**
- Rich interpersonal communication with family and friends

### Technical Architecture
- Brain-to-text decoder: continuously running, detects attempted speech, decodes into word sequences
- Cursor control: activated by gaze-controlled toggle, translates right-hand motor imagery into 2D cursor movement
- Click gestures: discrete mouse clicks from neural activity

## Original Calculations

### 1. Economic Value of BCI-Enabled Independence
- ALS annual care costs: $256,652/year (ALS Association, 2023 data, widely cited)
- Median US salary: $59,228 (BLS, 2025)
- Economic swing when paralyzed person maintains employment: $256,652 + $59,228 = **$315,880/year**
- Over 2 years: $631,760 in combined economic benefit

### 2. BCI System Economics
- Utah array (Blackrock Microsystems): ~$30,000 per array × 4 = $120,000
- Neurosurgery: ~$75,000-$150,000 (estimated, craniotomy + implantation)
- Decoding hardware/software: ~$50,000 (estimated research-grade)
- Total estimated system cost: ~$250,000-$320,000
- **Payback period: <1 year** against combined care savings + earnings

### 3. Communication Throughput
- 1,960,163 words / ~730 days ≈ 2,685 words/day
- Average American speaks ~16,000 words/day (Mehl et al., Science 2007)
- BCI restores ~16.8% of typical daily communication volume
- At 56 WPM, actual communication time: 1,960,163 / 56 ≈ 35,003 minutes ≈ 583 hours of "speaking"
- Remaining 3,217 hours = powered on, available, but not actively communicating

### 4. Accuracy Gap Analysis
- Controlled: 99% word accuracy
- Self-rated free use: 92% "at least mostly correct"
- The 7-percentage-point gap = real-world penalty from: context switches, background noise, fatigue, emotional state, varied communication contexts
- For comparison: smartphone speech-to-text accuracy averages ~95% in controlled settings, ~85% in real-world use (10-point gap)
- **BCI's real-world penalty (7 points) is SMALLER than smartphone speech recognition's (10 points)**

### 5. Scale Impact
- ~30,000 Americans living with ALS (CDC, 2023)
- ~5,600 new diagnoses/year
- If 10% of ALS patients could use BCI for employment: 3,000 × $315,880 = **$947.6M/year** economic impact
- Broader paralysis population (spinal cord injury): ~294,000 Americans
- If 5% could use BCI: 14,700 × $315,880 = **$4.64B/year**

## Context: BCI Speed Evolution
- 2006: First BrainGate patient (Matthew Nagle) — ~3 WPM cursor control
- 2017: BrainGate2 — ~8 WPM
- 2021: Stanford/BrainGate — 15 WPM handwriting decode
- 2023: Stanford — 62 WPM speech decode (but controlled lab, not independent)
- 2024: Neuralink N1 — cursor control (no published WPM data for speech)
- 2026: This study — 56 WPM sustained over 2 years independently

## Comparison: Neuralink
- Neuralink's first patient (Noland Arbaugh, Jan 2024): cursor control, gaming
- Thread retraction issue (~85% of threads pulled back after ~1 month)
- Resolved through software adaptation — performance exceeded pre-retraction benchmarks
- Neuralink transdural technique (May 2026): first human case in Canada (Lee Marten, ALS)
- Key distinction: BrainGate is wired (percutaneous); Neuralink is wireless
- BrainGate has **dramatically more independent-use data** than Neuralink
- Neuralink has the hardware miniaturization advantage

## Limitations (must acknowledge)
- Single patient study (n=1)
- Research-grade system, not commercial
- Percutaneous (wired) — infection risk over time, not scalable
- Specific to speech motor cortex — may not generalize to all ALS patients
- Cost estimates are approximations; no published BCI cost-effectiveness studies
- 92% free-use accuracy means ~1 in 12 sentences has meaningful errors

## Strongest Counterargument
- This is a single patient with a research team maintaining a wired system. The leap from one user with percutaneous electrodes maintained by a university lab to millions of patients using a commercial wireless device is the same order-of-magnitude gap that separates a successful drug trial from a pharmaceutical blockbuster. The engineering, regulatory, and economic infrastructure doesn't exist yet. The ALS population is small (~30,000) and shrinking through mortality faster than diagnoses replace it. Building a commercial BCI company on this market alone may not be financially viable — which is exactly why Neuralink is pitching BCIs as enhancement technology for healthy people, a much larger but much more ethically fraught market.

## Sources
1. Nature Medicine paper: DOI 10.1038/s41591-026-04414-6
2. ALS Association care cost data
3. BLS wage data
4. Mehl et al., Science 2007 (daily word count)
5. CDC ALS prevalence
6. Neuralink transdural: InsideBCI.com, July 4, 2026
7. Neuralink Arbaugh thread retraction: TechTimes, May 28, 2026
8. BrainGate2 trial: ClinicalTrials.gov NCT00912041

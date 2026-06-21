# Research: The First "Power User" of a Speech BCI Logged 3,800 Hours at Home

## Primary Source
- **Paper:** "Long-term independent use of an intracortical brain–computer interface for speech and cursor control"
- **Journal:** Nature Medicine (published June 15, 2026)
- **DOI:** 10.1038/s41591-026-04414-6
- **Authors:** UC Davis team (Sergey Stavisky, David Brandman, Nicholas Card et al.)
- **Clinical Trial:** BrainGate2 (NCT00912041)

## Key Data Points

### Patient
- Casey Harrell (participant ID: T15)
- Age: 45 at implant (July 2023), now 47
- Condition: ALS with tetraparesis and severe dysarthria
- Occupation: Environmental activist (working full-time via BCI)

### Implant
- 4 microelectrode arrays × 64 electrodes = 256 total electrodes
- Location: ventral precentral gyrus (speech motor cortex)
- Connection: percutaneous wired, via titanium pedestals on skull
- Two docking locations on exterior of skull

### Usage Statistics (22.6 months post-implant)
- Total usage: 3,800+ hours
- Days used: 444/653 total; 364/397 after independent use enabled
- Independent use began: post-implant day 281 (~40 weeks)
- Average daily use before independent: 3.7 hours/day (with researcher)
- Average daily use after independent: 9.5 hours/day
- Setup time: ~20 minutes (by care partners)
- Continuous operation: up to 19 hours without intervention

### Speech Decoding Performance
- Sentences communicated: 183,060 (nearly 2 million words)
- Self-rated accuracy: 92% at least "mostly correct"
  - 53.3% decoded completely correctly
  - 12.9% corrected by participant via UI
  - 26.1% mostly correct
  - 7.7% incorrect
- Controlled copy task accuracy: 99.2% (125,000-word vocabulary)
- Speed: evolved from ~30 WPM (vocalized) to >50 WPM (silent speech), average 56 WPM
- Longest correctly decoded utterance: 215 words
- Strategy shift: vocalized speech → silent speech (less fatiguing)

### Cursor Control
- Throughput: 2.90 ± 0.16 bits/second
- Average cursor use: 121 ± 66.9 minutes/day
- Calibration time reduced from 16.9 min/day (linear) to 9.2 min/day (RNN)

### Neural Signal Stability
- >90% of electrodes detected spiking at 2 Hz+ for 19 months
- Cosine similarity of neural modulation: >0.6 even 18+ months apart
- No evidence of significant signal degradation

### Technology Evolution During Study
- Speech decoder: RNN → transformer-based (post-implant day 600)
- Cursor decoder: linear → RNN
- Background continuous recalibration implemented
- 0-20 prompted calibration sentences at start of day (user's discretion)
- Privacy mode added
- Text-to-speech using synthesized pre-ALS voice

## Comparative Communication Rates (ORIGINAL ANALYSIS)

| Technology | Speed (WPM) | Accuracy | Invasiveness | Setup |
|---|---|---|---|---|
| BCI (Harrell, silent speech) | 50-56 | 92% daily / 99% controlled | Invasive surgery, wired | 20 min by care partner |
| BCI (Harrell, vocalized) | ~30 | 99%+ controlled | Same | Same |
| Eye-gaze typing (standard) | <10 | Varies | Non-invasive | Calibration needed |
| Eye-gaze typing (with LLM, SpeakFaster) | 13-16 | Improved | Non-invasive | Calibration needed |
| Eye-gaze typing (theoretical max) | ~20 | N/A | Non-invasive | N/A |
| Head mouse/gyroscopic | 5-10 | Low | Non-invasive | Minimal |
| Noninvasive BCI (EEG SSVEP) | Very low | 2.5-75% (huge variance) | Non-invasive | Setup required |
| Endovascular BCI (Synchron) | Click-based | Good | Minimally invasive | Once implanted |
| Natural speech | 130-190 | ~100% | N/A | N/A |

**Original finding:** Harrell's BCI communicates at 56 WPM — 5.6× faster than standard eye-gaze typing and 37% of natural speech speed. This is the first assistive technology for severe ALS that approaches conversation-rate communication.

## Scaling Bottleneck Analysis (ORIGINAL ANALYSIS)

### BrainGate enrollment
- 14 participants enrolled from 2004-2021 (17 years)
- 7 clinical sites in the US
- Average: 0.82 participants/year

### ALS population
- ~30,000 Americans living with ALS at any time
- ~5,000 new cases/year in the US
- 80-90% develop dysarthria during disease course
- Conservative estimate: 24,000-27,000 potential BCI candidates in US alone

### Scaling math
- At BrainGate's enrollment rate: 24,000 / 0.82 = ~29,268 years to serve current US ALS population
- Even 100x faster enrollment: 293 years
- To serve 1,000 patients/year: need ~50-100 trained neurosurgical teams (currently ~3-5)
- Array manufacturing: Utah arrays made by Blackrock Neurotech — unclear production capacity

### Commercial alternatives
- Neuralink: N1 chip, 1,024 electrodes, wireless, fully implanted. 3-5 patients to date. Focus on motor control, not speech decoding.
- Synchron: Stentrode, endovascular, minimally invasive. 4 patients in SWITCH trial. Click-based (slower communication).
- Paradromics: Connexus Direct, 65,536 electrodes per system. Pre-clinical.

## Limitations (from paper)
1. Single participant (n=1)
2. Percutaneous wired connections (titanium pedestals through skull)
3. Multi-computer system on mobile cart — not portable outside home
4. No systematic fatigue assessment
5. Daily conversation accuracy lower than structured tests
6. Generalizability unknown for other implant sites, electrode types, conditions

## Strongest Counterargument
The most powerful objection: this system requires open brain surgery, titanium pedestals protruding from the skull, and a cart of computers in the bedroom. No wireless BCI has achieved these accuracy levels. Neuralink's N1 is wireless and fully implanted, but hasn't demonstrated speech decoding at this level. The question isn't whether BCIs work in the lab — it's whether they can ever be delivered as a consumer medical device rather than a bespoke research installation. At current BrainGate enrollment rates, it would take 29,000 years to serve the US ALS population.

The counterargument to the counterargument: every transformative medical device started as a bespoke research installation. Cochlear implants went from a single-channel device in 1978 to 736,900 implanted worldwide by 2019. Cardiac pacemakers went from external table-mounted devices in 1952 to 1.5 million implanted annually. The transition from wired/research to wireless/clinical is an engineering problem, not a physics problem. Harrell's 3,800 hours prove the clinical utility; miniaturization follows demand.

## Journalist
Jordan Kessler — Neuro beat

## Angle
"The First 'Power User' of a Speech BCI Logged 3,800 Hours at Home. Here's What That Means for the 30,000 Americans Who Can't Speak."

Focus: transition from lab experiment to daily-life tool. The gap between demonstrated utility (one man, 23 months, life-changing) and scalability (30,000 Americans with ALS-related dysarthria). Original contribution: communication rate comparison table + scaling bottleneck math.

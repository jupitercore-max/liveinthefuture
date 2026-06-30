# Research Notes: BCI Per-Electrode Efficiency

## Story Angle
The BCI industry's marketing fixation on electrode count obscures the metric that actually determines patient outcomes: information throughput per electrode. An original per-electrode efficiency calculation across the four companies with active human or near-human trials reveals a 48-59× gap between the most efficient and least efficient architectures. The company with the fewest electrodes (Paradromics, 421) achieves the highest data rate (200+ bps preclinical), while the company with the most (Neuralink, 1,024) achieves among the lowest per-electrode yield.

## Kill Test: Original Calculation
Per-electrode information efficiency (bps/electrode) across BCI platforms — this comparison has not been published:

| Platform | Electrodes | Data Rate (bps) | bps/electrode | Context |
|----------|-----------|-----------------|---------------|---------|
| Paradromics Connexus | 421 | 200+ | 0.475 | Preclinical (SONIC benchmark, sheep) |
| BrainGate (Harrell speech) | 256 | ~14.7* | 0.057 | Human, 2-year at-home use |
| BrainGate (QWERTY typing) | 256 | ~5.8** | 0.023 | Human, Nature Neuroscience 2026 |
| Neuralink N1 (cursor) | 1,024 | 8-10 | 0.008-0.010 | Human, multiple patients |
| Synchron Stentrode | 12-16 | ~1-2 (est) | ~0.1 | Human, endovascular (different modality) |

*56 wpm × 5 chars/word = 280 chars/min = 4.67 chars/sec × log2(50 phonemes) ≈ ~14.7 bps rough estimate
**22 wpm typing on QWERTY = 110 chars/min = 1.83 chars/sec × log2(27 keys) ≈ ~5.8 bps

Natural speech information rate: ~39 bps (Coupé et al. 2019, Science Advances, DOI: 10.1126/sciadv.aaw2594)

Paradromics at 200+ bps: 5.1× natural speech bandwidth (preclinical)
BrainGate at ~15 bps: 38% of natural speech (human, sustained at-home use)
Neuralink at 8-10 bps: 21-26% of natural speech (human cursor control)

## Primary Sources (3+)

### Source 1: Paradromics/University of Michigan Press Release (BusinessWire, June 16, 2026)
- First-in-human implantation of Connexus BCI
- Connect-One Early Feasibility Study (EFS)
- FDA IDE approved November 2025
- Participant: Michigan woman with motor neuron disease
- 421-channel microwire electrode array
- Transceiver in chest, wireless IR link at 100 Mbit/s
- 6-year follow-up planned
- Sites: University of Michigan, UC Davis, Massachusetts General Hospital
- Surgeons: Matthew Willsey, M.D., Ph.D. and Aditya S. Pandey, M.D.
- CEO: Matt Angle, Ph.D.
- Lead PI: David Brandman, M.D., Ph.D. (UC Davis)

### Source 2: Nature Medicine (June 2026) — UC Davis/BrainGate at-home BCI
- DOI: 10.1038/s41591-026-04414-6
- Casey Harrell, 47, ALS (tetraparesis, dysarthria)
- BrainGate2 clinical trial (NCT00912041)
- 4 Utah microelectrode arrays, 256 electrodes total
- Placed in left precentral gyrus (speech motor cortex)
- Used 3,800+ hours over ~2 years at home
- 183,000+ sentences, ~2 million words
- Average speed: 56 wpm
- 92% user-rated sentence accuracy
- 99%+ word accuracy in controlled testing (125,000-word vocabulary)
- Maintained full-time employment
- Speech + cursor decoders together for full computer control
- Used for email, internet, video calls
- Percutaneous wired connections (not wireless)

### Source 3: Nature Neuroscience (March 2026) — BrainGate QWERTY typing
- DOI: 10.1038/s41593-026-02218-y
- QWERTY keyboard + attempted finger movements
- 2 participants: ALS + spinal cord injury
- Calibrated with as few as 30 sentences
- Top typing speed: 110 characters / 22 wpm
- Word error rate: 1.6% (on par with able-bodied accuracy)
- 256 electrodes across Utah arrays

### Source 4: Paradromics SONIC Benchmark (preprint)
- SONIC = Standardized Online Neural Information throughput Calculator
- Paradromics Connexus: 200+ bps with ~50ms system delay
- "Over 20 times faster than initial reported performance of other intracortical systems like Neuralink's"
- "Orders of magnitude beyond endovascular systems like Synchron's"
- Measured in sheep (preclinical)

### Source 5: Neuralink performance data (multiple sources)
- 21 patients worldwide as of Jan 2026
- Cursor control: 8-10 bps
- Typing via 10-finger mental keyboard: up to 40 wpm (Patient Jake, ALS)
- 1,024 electrodes on 64 polymer threads
- First patient (Noland Arbaugh): 85% thread retraction
- Second patient (Alex): no retraction after surgical improvements
- VOICE trial planned: targeting 140 wpm conversational speech
- Next-gen implant: 3,000 electrodes planned

### Source 6: Synchron SWITCH/COMMAND studies (JAMA Neurology)
- 12-16 endovascular electrodes (Stentrode)
- 4 patients in SWITCH, 6 in COMMAND
- No serious adverse events
- Signal bandwidth: 233 Hz, stable 12+ months
- Minimally invasive (no open brain surgery)
- Controlled computer (texting, email, shopping)
- Speed: limited to switch-scanning (discrete commands, not continuous cursor)

### Source 7: Coupé et al. (2019) — Speech information rate
- Science Advances, DOI: 10.1126/sciadv.aaw2594
- Average across 17 languages: ~39 bps
- Natural conversation: ~160 wpm

## Supporting Context

### Thread retraction issue (Neuralink)
- First patient Noland Arbaugh: 85% of threads displaced post-surgery
- Air pocket theory; Neuralink developed mitigations
- Second patient Alex: no retraction (deeper placement + air pocket prevention)
- Microwires (Paradromics) vs polymer threads (Neuralink) — durability tradeoff

### Paradromics preclinical durability
- 3 years in sheep, no appreciable signal degradation
- CEO Matt Angle: "extrapolate... device should be lasting in excess of ten years"

### Architecture comparison
- Paradromics: 421 microwire electrodes (~1.55mm long, <40μm diameter), penetrating
- Neuralink: 1,024 electrodes on 64 polymer threads, penetrating
- BrainGate/Blackrock Utah array: 96 electrodes per array (4mm × 4mm silicon), penetrating
- Synchron: 12-16 electrodes on endovascular stent, non-penetrating
- Precision Neuroscience: flexible surface array ("scotch tape"), non-penetrating

### Why per-electrode efficiency matters
1. More electrodes = more invasive surgery, more tissue displacement
2. More electrodes = more power consumption (heat dissipation in brain)
3. More electrodes = more failure modes (each thread/wire can retract/break)
4. If 421 electrodes achieve 200+ bps, adding 603 more (to match Neuralink's 1,024) may not help — and may hurt

### Cost context
- DBS (deep brain stimulation) devices: ~$35,000 device + $50,000-100,000 surgery
- BCI systems likely in similar range initially
- Medicare reimbursement for DBS: ~$35,000 (2024)
- Eye-tracking AAC devices: $10,000-$15,000

## Counterargument (strongest case)
Paradromics' 200+ bps is preclinical. Every BCI has performed worse in humans than in animals. Neuralink's first human trial also had complications that degraded performance below animal benchmarks. The preclinical-to-human performance drop could narrow or eliminate the gap. Additionally, Neuralink has 21 patients of real-world data; Paradromics has one human implant completed literally 12 days ago. Volume of clinical data matters more than benchmarks.

Also: Neuralink's 40 wpm typing performance (with 1,024 electrodes) is already clinically meaningful and life-changing for patients. The "efficiency per electrode" metric, while technically interesting, may be less important than total system performance. Patients don't care about bps/electrode — they care about whether they can communicate.

## Limitations
1. Paradromics data rate is preclinical (sheep) — no human performance data yet
2. Direct bps comparison across modalities (cursor control vs speech decode vs SONIC benchmark) conflates different measurement methodologies
3. "Per-electrode efficiency" treats each electrode as equivalent, but different architectures (microwire vs polymer thread vs stent-mounted vs surface) sample fundamentally different neural populations
4. Cost data for BCI procedures is not publicly disclosed and estimates are rough
5. Neuralink's 40 wpm typing figure comes from a tech blog report, not peer-reviewed data

## Journalist
Zara Osman — Neurotechnology

## Category
🧠 Neuro

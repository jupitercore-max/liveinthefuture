# Research: BCI Electrode Count vs Safety Data — The Brain-Computer Interface Scorecard

## Working Headline
"Neuralink Has 1,024 Electrodes and 21 Patients. Synchron Has 16 Electrodes and a Peer-Reviewed Safety Record. The Math Isn't What You Think."

## Category
🧠 Neuro — BCIs, neuroprosthetics

## Journalist
Dr. Sanjay Mehta — Longevity Science (closest beat for medical device / clinical trial content)

## Kill Test
- Is this news? YES — bidirectional BCI paper published in Brain Stimulation April 2026; Neuralink at 21 patients across 4 countries; Synchron integrated with Apple BCI HID profile. The field is moving fast.
- Does anyone care? YES — paralysis, ALS, mainstream accessibility (Apple integration), high-profile companies (Musk/Neuralink).
- Has this been written? NOT in this way — nobody has done a systematic head-to-head comparison of the three distinct surgical approaches with accuracy/invasiveness/publication trade-offs.
- Can we add original analysis? YES — electrode-per-accuracy calculation, surgery risk comparison matrix, publication gap analysis.

## 10-Star Test
- The raw tech is extraordinary (thought-to-speech, thought-to-movement)
- Real patient stories are compelling (Arbaugh playing Civ VI, Brad Smith's AI voice)
- The transparency gap angle gives this bite — Neuralink has the most patients and the least published data
- The bidirectional BCI is genuinely novel (April 2026 publication)
- Apple BCI HID integration signals mainstream adoption

## Novel Contribution
1. **Accuracy-per-electrode comparison**: Neuralink's 1,024 electrodes vs Synchron's 16 — but Synchron's 2-class decoding accuracy (85.2%) vs Neuralink's unreported (no peer-reviewed data). What does the electrode gap actually buy?
2. **Publication gap**: 21 Neuralink patients, 15,000+ hours logged, zero peer-reviewed papers. 4 Synchron patients in SWITCH trial, full 12-month data published. The transparency asymmetry is the real story.
3. **Surgical invasiveness spectrum**: Open craniotomy (Neuralink) vs endovascular catheter (Synchron) vs surface ECoG (USC/Caltech bidirectional). Map risks vs capabilities.
4. **Thread retraction math**: 85% thread retraction in Neuralink's first patient. Software saved the day, but what's the failure mode at 1,000 patients?

## Primary Sources (3+)

### Source 1: SWITCH Trial — Synchron Stentrode (Published, Peer-Reviewed)
- NCT03834857, single-center prospective study
- 5 enrolled, 4 implanted (1 excluded for isolated transverse sinus drainage)
- 4 ALS patients + 1 primary lateral sclerosis
- 12-month follow-up
- **Zero device-related serious adverse events**
- No target vessel occlusion/thrombosis at 3 and 12 months
- Device position: mean shift of 0.45mm (clinically negligible)
- Signal bandwidth: 233 Hz mean, stable throughout
- 2-class decoding accuracy: 85.2% (SD 7.9%)
- 3-class: 68.3% (SD 12.5%)
- 5-class+: 41.1% (SD 8.0%)
- Typing: 16.6 correct characters/minute, 93.9% selection accuracy
- Published by Bruce Campbell, MD, University of Melbourne
- Source: NeurologyLive, journal data

### Source 2: Neuralink N1 Program
- 21 patients as of Jan 28, 2026 (per TamilTech compilation)
- 4 countries: US, Canada, UK, UAE
- First patient (Noland Arbaugh, Jan 2024): 85% thread retraction within first month
- Software update redistributed signal processing — patient retained function
- N1: 64 polymer threads, 1,024 electrodes
- VOICE trial: thought-to-speech for ALS patients (Brad Smith, Kenneth Shock)
- Blindsight: FDA Breakthrough Device Designation for visual cortex prosthesis
- No peer-reviewed publications of clinical data
- 15,000+ hours on brain chip (across 12 patients as of mid-2025)
- Musk announced "high-volume production" and near-automated surgery for 2026
- Source: Inside BCI (March 2026), TamilTech, MobiHealthNews

### Source 3: Bidirectional BCI — USC/UCI/Caltech
- Published in Brain Stimulation, April 2026
- DOI: 10.1016/j.brs.2026.103065
- First full test of bidirectional (two-way) BCI for walking
- 92% accuracy for both reading step signals AND delivering walking sensation
- Uses surface ECoG electrodes on motor cortex + sensory cortex
- Proof of concept in 1 epilepsy patient (using clinically implanted electrodes)
- Controls robotic exoskeleton legs
- PI: Charles Liu, MD, PhD, USC Neurorestoration Center
- Key insight: adds sensory feedback loop that existing BCIs lack
- Aims for fully implantable (no external computers)
- Source: MedicalXpress, Brain Stimulation journal

### Source 4: Apple BCI HID Profile
- Announced May 13, 2025 (iOS 19 / visionOS 3)
- New protocol recognizes neural interfaces as native input category
- Alongside touch, voice, typing — brain signals as 4th input type
- Synchron first to integrate
- Mark Jackson (ALS patient, Pittsburgh) tested with iPhone, iPad, Apple Vision Pro
- Controlled rollouts with trial participants expected (now ongoing)
- Source: 9to5Mac, WSJ, MobiHealthNews, Medical Economics

### Source 5: Market Data
- BCI market projected at $3.3 billion by 2026 (ResearchAndMarkets, 2021)
- Synchron total raised: $145M+ (Series C led by ARCH Venture Partners, Bezos Expeditions)
- Neuralink valuation: ~$8 billion (2024 round)
- Synchron also developing Chiral — foundation model for human cognition (announced March 2026, NVIDIA-powered)

## Strongest Counterargument
Neuralink's electrode density (1,024 vs 16) gives it fundamentally higher signal resolution, which matters enormously for complex tasks like robotic arm control, gaming, or visual prosthesis. The fact that Arbaugh can play Civilization VI for 8 hours is evidence that penetrating electrodes deliver capabilities endovascular approaches may never match. Synchron's published safety record is admirable, but a blood-vessel stent picking up 16 signals may have a hard ceiling that no amount of AI processing can overcome. For the most ambitious BCI applications — restoring vision, enabling complex speech — you may need to be inside the brain, not watching it from a vein.

## Limitations
- Neuralink's unpublished data means our comparison is necessarily incomplete — they may have better safety/efficacy numbers than we can verify
- Synchron SWITCH trial was 4 patients, which is far too small for generalizable safety conclusions
- The bidirectional BCI (USC/Caltech) tested in 1 epilepsy patient using existing clinical electrodes, not a purpose-built device — huge gap to commercial product
- BCI market projections vary wildly ($3.3B to $6.2B by 2030 depending on source)
- We compare accuracy numbers across fundamentally different tasks and patient populations

## Article Number
#235

## Related Articles
- Check for existing BCI/neuro articles in LITF archive
- Likely connections to smart glasses articles (Marcus Chen) — neural interfaces as input for wearables

# Research: Samsung's Neuralink 4th-Gen BCI Chip — The Foundry Shift

## Kill Test
**Is this just another "company X makes chip for company Y" story?**
No. The novel angle is threefold:
1. The AI GPU boom is so capacity-constrained that it's pushing brain implant chips from the world's #1 foundry (TSMC) to #2 (Samsung). Paralyzed patients are competing with NVIDIA for wafer time.
2. Gen 4 is bidirectional (writes TO the brain), but Samsung is manufacturing it before ANY bidirectional human trial data exists. The regulatory implications are enormous.
3. Neuralink deliberately chose a "mature" 4nm node over cutting-edge 2nm/3nm — because when a chip lives inside a skull, yield reliability beats transistor density. This inverts the entire semiconductor industry's smaller-is-better mantra.

## Primary Sources

### Source 1: Korea Economic Daily (한국경제, Hankyung)
- Samsung Foundry began R&D on Neuralink's 4th-gen chip
- Internal codename: 'O1'
- 4nm process technology
- First-ever Samsung order from Neuralink (TSMC made gen 3)
- Work began late 2025
- Test chip production started ~May 2026
- Scheduled ship: H1 2027
- Mass production: H2 2027 if testing succeeds

### Source 2: SamMobile, WCCFTech (secondary reporting)
- Previous Neuralink generations manufactured by TSMC
- Gen 4 is BIDIRECTIONAL: older gens only read brain signals; gen 4 can input data TO the brain
- Example application: restore vision by stimulating brain neurons (Blindsight)
- Samsung already has long-term deal with Musk for Tesla AI6/AI6.5 self-driving chips
- TSMC capacity crunch from AI demand is key driver of the switch
- Samsung foundry projecting profitability by Q3 2026 / 2028 (conflicting timelines)

### Source 3: Seoul Economic Daily (confirmed by SamMobile)
- Samsung 4nm yield surpassed 80% — officially "mature process" status
- Clients on 4nm: Groq (LP1-LP3), IBM, Ambarella, Baidu, Faraday, Rebellions
- HBM4 base die also uses Samsung 4nm
- Samsung's own memory division is a key 4nm client

### Source 4: UCLH NHS Foundation Trust
- GB-PRIME study: 7 participants in UK with N1 implants (as of April 2026)
- CAN-PRIME (Canada): 6 planned participants, enrolling at University Health Network Toronto

### Source 5: Slashdot / PCMag (patient count)
- 7 patients reported with N1 implants (US PRIME study, via Barrow Neurological)
- Named patients: Noland Arbaugh, Alex, Brad
- 6 of 7 US patients in PRIME study

### Source 6: Medium / Frontiers in Neuroscience (technical specs)
- N1 implant: 1,024 electrodes across 64 threads
- Raw data: ~200 Mbps, transmitted at 1-2 Mbps via Bluetooth (heavy on-chip compression)
- Inserted by R1 surgical robot

### Source 7: IEEE Spectrum / FDA
- Blindsight: FDA Breakthrough Device Designation (Sept 2024)
- Cortical vision prosthesis, bypasses optic nerve
- Musk: "low resolution, like Atari graphics" initially
- No company has commercialized a brain-implant visual prosthetic yet

### Source 8: DIGITIMES (Samsung foundry profitability)
- Samsung foundry profit rebound may come Q3 2026
- 2nm orders rose 130%
- 4nm utilization rising from HBM4 base-die + AI chip orders
- Tesla AI6 on 2nm, Google Icefish potentially Samsung
- $37B Taylor, Texas fab scaling up

### Source 9: WCCFTech (Samsung foundry financial history)
- Samsung non-memory division was operating at ~2 trillion won (~$1.36B) loss
- Deficit narrowed to ~1 trillion won (~$680M) in Q3/Q4 2025
- 4nm yields were at 60-70% (earlier), now 80%+
- TSMC capacity constrained: boosted 3nm to 175,000 wafer units/month but still not enough

## Novel Contribution

### Calculation 1: Wafer economics — BCIs vs GPUs
- NVIDIA H100 die size: ~814mm² on TSMC 4nm. Wafers are 300mm diameter (~70,686mm²). Gross die per wafer: ~70,686/814 ≈ 87 dies/wafer at 100% yield.
- Neuralink N1 chip is much smaller — estimated ~6.5mm × 23mm = ~150mm² (based on the implant being ~23mm coin-sized, but the actual ASIC die is smaller). A conservative estimate: the neural processing ASIC is likely ~25-50mm². At 50mm²: ~70,686/50 ≈ 1,413 dies/wafer.
- Revenue per wafer: NVIDIA charges ~$25,000+ per H100. At 87 dies × $25K = ~$2.175M/wafer. Neuralink's device costs are unknown but BCI implant procedures are ~$50K-100K total (device + surgery). Even at $10K per chip: 1,413 × $10K = $14.13M/wafer. BUT: Neuralink's total addressable volume is currently ~14 patients. Even at 1,000 patients/year, that's less than 1 wafer's worth of chips per year.
- The economic asymmetry: One wafer of H100 chips = ~$2M revenue. Total BCI chip demand globally = probably less than a single wafer run. This is why TSMC can't prioritize it.

### Calculation 2: The Musk-Samsung consolidation
- Tesla AI6 self-driving chip: Samsung 2nm, $16.5B deal
- Neuralink O1 BCI chip: Samsung 4nm
- Total Musk-Samsung semiconductor spending: $16.5B+ (and growing)
- Samsung's entire foundry division revenue ~$14-16B/year. Musk entities could represent 10%+ of Samsung foundry revenue by 2028.

### Calculation 3: The bidirectional gap
- ~14 humans on Earth have Neuralink N1 implants (read-only, 1,024 electrodes)
- Gen 4 adds write capability (stimulation). Total humans with bidirectional Neuralink chips: 0
- Comparable bidirectional BCIs: CortEC BrainInterchange (~few patients), BISC (Columbia/Stanford, 65,536 electrodes, preclinical)
- Regulatory precedent: Stimulation devices face MORE scrutiny (risk of seizures, tissue damage). A read-only implant records what the brain does. A write-capable implant tells the brain what to do.

## Strongest Counterargument
Samsung's 4nm choice may not be about reliability at all. It could simply be about cost and available capacity. TSMC's 4nm lines are maxed out by NVIDIA/AMD/Apple. Samsung has spare 4nm capacity because it lost customers to TSMC in prior years. Neuralink may have switched not because Samsung is better for brain chips, but because Samsung was the only foundry with available slots. The "deliberate maturity" narrative could be post-hoc rationalization of a supply-constrained choice.

## Limitations
- The Korea Economic Daily report is based on unnamed industry sources. Neither Samsung nor Neuralink has confirmed.
- We don't know the N1's exact ASIC die size, so wafer economics are estimates.
- "Bidirectional" capability is reported by secondary sources (WCCFTech), not directly by Neuralink. Blindsight has been described as requiring stimulation capability, but whether gen 4 chip architecture is confirmed bidirectional by Neuralink is unclear.
- Patient count may be higher than reported (some trials may not publicly disclose all participants).
- Samsung foundry profitability timelines conflict between sources (Q3 2026 vs 2028).

## Journalist
Viktor Holm (🧠 Neuro / 💻 Quantum crossover — this spans BCI and semiconductor manufacturing)

## Category
🧠 Neuro

## Headline Ideas
- "14 Humans Have Brain Chips. Samsung Is Already Manufacturing Gen 4. Here's What Changed."
- "TSMC Was Too Busy Making GPUs to Make Brain Chips. Samsung Stepped In."  
- "Neuralink's Next Chip Can Write to Your Brain. Samsung Is Making It on a 'Mature' Process Node."
- "The First Bidirectional Brain Chip Is Being Manufactured Before Any Human Has Tested One. Here's the Semiconductor Math."

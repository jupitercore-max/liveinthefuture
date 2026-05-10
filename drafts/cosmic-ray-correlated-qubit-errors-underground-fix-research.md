# Research Notes: Cosmic Rays Are Causing Correlated Errors in Quantum Computers. The Fix Might Require Going Underground.

## Story Angle
Google Quantum AI published a paper on May 4, 2026 in Physical Review X showing that ionizing radiation from cosmic rays and trace radioactive elements in Earth's crust creates a previously unappreciated type of error in superconducting quantum computers: correlated phase error bursts. A single radiation event shifts the frequencies of many qubits simultaneously by up to 3 MHz for about 1 millisecond. This directly undermines quantum error correction, which assumes errors happen independently. Gap engineering, the hardware fix the community relied on, doesn't prevent this. Three groups are now racing underground to quantify and fix the problem: Google's lab, Fermilab's NEXUS facility 350 feet below Illinois, and a Chalmers/Waterloo team headed 2 km into a Canadian mine.

## Category
💻 Quantum

## Kill Test
Would a reader care about this in 6 months? YES. This fundamentally challenges the path to fault-tolerant quantum computing. Every company building superconducting quantum computers (Google, IBM, Rigetti, IQM, Origin Quantum) must deal with this. The "$1 trillion quantum computing market" projections all assume error correction works as theorized.

## 10-Star Test
This story reveals a physics constraint that nobody can engineer around cheaply. It's the kind of fundamental challenge that separates hype from reality. 8-9 stars.

## Novel Contribution
**Original calculation:** At sea level, cosmic ray muon flux is approximately 1 per cm² per minute (~10,000 per m² per minute). A typical superconducting quantum processor chip is ~1-2 cm². That means roughly 1-2 potential correlated error events per minute. If each event disrupts coherence for ~1 ms, that's ~1-2 ms of correlated errors per minute. But quantum error correction cycles run at ~1 microsecond. During a 1 ms burst, that's ~1,000 consecutive error correction cycles potentially corrupted. Surface codes can tolerate individual errors at rates below ~1%, but correlated errors affecting many qubits simultaneously can overwhelm the code's correction capacity.

**Cost comparison nobody made:** Building underground quantum computing facilities vs. surface facilities. SNOLAB cost ~$69M CAD to construct (in 2012 dollars). Fermilab NEXUS is a smaller facility but required specialized infrastructure. Compare this to the billions being spent on surface quantum computing labs. At what point does "going underground" become cheaper than fighting radiation at the surface?

**The depth-shielding tradeoff:** Sea-level muon flux ~1/cm²/min. 100m depth reduces by ~10x. SNOLAB (2 km) reduces by ~10^6. But even at SNOLAB, Fermilab found unexplained residual correlated noise, suggesting radioactive contamination in the materials themselves. The enemy might already be inside the machine.

## Primary Sources

### Source 1: Google Quantum AI, Physical Review X (May 4, 2026)
- Paper: "Correlated Phase Error Bursts in a Gap-Engineered Superconducting Qubit Array"
- Authors: Vladislav D. Kurilovich, Gabrielle Roberts, Leigh S. Martin, Matt McEwen, Alec Eickbusch, Lara Faoro, Lev B. Ioffe, Juan Atalaya, Alexander Bilmes, John Mark Kreikebaum, Andreas Bengtsson, Paul Klimov, Matthew Neeley, Wojciech Mruczkiewicz, Kevin Miao, Igor L. Aleiner, Julian Kelly, Yu Chen, Kevin Satzinger, Alex Opremcak
- DOI: 10.1103/1bl4-b2f7 (Phys. Rev. X 16, 021025)
- Key findings:
  - Ionizing radiation creates quasiparticles in superconducting substrate
  - Quasiparticles shift qubit frequencies by up to 3 MHz for ~1 millisecond
  - Physical barriers (gap engineering) do NOT prevent phase errors, quasiparticle proximity alone causes frequency shifts
  - Errors are CORRELATED across multiple qubits simultaneously
  - This violates the independence assumption underlying all standard quantum error correction codes

### Source 2: Fermilab NEXUS Underground Study, Nature Communications (March 2026)
- Paper by Grace Bratrud (Northwestern) et al.
- Location: NEXUS lab, 350 feet underground at Fermilab
- Used same four-qubit chip tested above ground in 2019 (Univ. of Wisconsin-Madison)
- Lead shield around dilution refrigerator, tested open and closed
- Key findings:
  - Reduction in charge bursts underground, but less than expected
  - Even with shield closed, some correlated charge noise persisted
  - Unknown source of residual interference. "Something else besides the known gamma radiation is causing charge bursts inside the shield"
  - Possible radioactive contamination in materials near the qubit itself
- Follow-up: SLAC's SQUAT (superconducting quasiparticle amplifying transmon) to be tested

### Source 3: Chalmers/Waterloo/SNOLAB Underground Project (ongoing, announced April 2024)
- Collaboration: Chalmers University of Technology (Sweden), Institute for Quantum Computing (Waterloo, Canada), SNOLAB (Sudbury, Ontario)
- Location: SNOLAB, 2 km underground in Vale's Creighton mine
- World's deepest clean room; lowest muon flux anywhere
- Plan: Test Chalmers-manufactured superconducting qubits above ground (Sweden + Canada), then underground at SNOLAB
- Funded by U.S. Army Research Office grant "Advanced Characterization and Mitigation of Qubit Decoherence in a Deep Underground Environment"
- PI commentary: Per Delsing (Chalmers), Chris Wilson (Waterloo), Jeter Hall (SNOLAB)
- Motivation: Current error correction assumes independent errors. Correlated cosmic ray errors break this. Need to understand the physics to develop mitigation.

### Source 4: APS Physics Viewpoint
- Title: "Quantum Error Correction Faces Another Hurdle"
- Commentary on the Google PRX paper
- Provides context on why correlated errors are fundamentally harder to correct

## Strongest Counterargument
Trapped-ion and photonic quantum computers may not be affected the same way. This is specifically a superconducting qubit problem because superconducting circuits operate at millikelvin temperatures where quasiparticles have outsized effects. Companies like IonQ (trapped ion) and PsiQuantum (photonic) might argue their architectures are inherently more radiation-resistant. The counterargument: superconducting qubits are the most mature and deployed approach (Google, IBM), so even if alternatives exist, the billions already invested in superconducting systems face a real reckoning.

## Limitations
- The Google paper studied one specific chip architecture. Generalizability to all superconducting designs is assumed but not proven.
- The Fermilab study's "unknown source" of residual noise could be mundane (material contamination) rather than a fundamental obstacle.
- Underground facilities are an extreme solution. Quasiparticle traps and improved shielding may prove sufficient for near-term applications.
- Cosmic ray rates vary by altitude and latitude. Sea-level labs face less radiation than high-altitude ones.

## Journalist
Dr. Kenji Watanabe (physics/technology beat)

## Slug
cosmic-ray-correlated-qubit-errors-underground-fix

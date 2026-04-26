# Research Notes: Fermionic Quantum Gates — Two Labs, 25-Year Milestone

## Topic
Two independent research teams (Max Planck Institute, Garching, Germany + ETH Zurich, Switzerland) simultaneously published in Nature demonstrating high-fidelity collisional quantum gates using fermionic atoms — a milestone proposed in the late 1990s but never achieved until now. Both exceeded the ~99% threshold for quantum error correction.

## Primary Sources

### 1. Nature Paper — Max Planck (Garching)
- **Title:** "High-fidelity collisional quantum gates with fermionic atoms"
- **Authors:** Petar Bojović, Timon Hilker, Si Wang, Johannes Obermeyer, Marnix Barendregt, Dorothee Tell, Thomas Chalopin, Philipp M. Preiss, Immanuel Bloch, Titus Franz
- **Journal:** Nature, volume 652, pages 602–608 (2026)
- **DOI:** https://www.nature.com/articles/s41586-026-10356-3
- **Key findings:**
  - Collisional entangling gates with fidelities up to **99.75(6)%**
  - Bell-state lifetimes exceeding **10 seconds**
  - Used fermionic lithium-6 atoms in an optical superlattice
  - Quantum gas microscopy for site-resolved single-atom imaging
  - Demonstrated spin-exchange and pair-tunnelling gates
  - Realized composite pair-exchange gate (key building block for quantum chemistry simulations)

### 2. Nature Paper — ETH Zurich
- **Title:** (geometric-phase swap gates)
- **Lead author:** Yann Kiefer, under Prof. Tilman Esslinger
- **Key findings:**
  - Loss-corrected fidelity of **99.91%** across **17,000+ atom pairs**
  - Used geometric phases for intrinsic noise resistance
  - Robustness rooted in fundamental symmetry properties, not experimental fine-tuning
  - Tuned bias voltage rather than potential barriers
  - Neutral atoms carry no electric charge → less sensitive to disturbances
  - Laser light trapping enables several thousand qubits in single system

### 3. Phys.org coverage (April 20, 2026)
- URL: https://phys.org/news/2026-04-sought-quantum-milestone-fermionic-atom.html
- and: https://phys.org/news/2026-04-robust-noise-geometric-phase-swap.html

## Why This Matters

### The 25-Year Wait
- Fermionic collisional gates were first proposed in the late 1990s
- Previous attempts limited by: excessive heating from laser light + inability to image individual qubits precisely
- Both teams independently solved these challenges using lithium-6

### Rydberg vs. Collisional
- **Rydberg gates (current dominant approach):** Atoms briefly excited to loosely bound, highly extended configurations. Fast but extremely vulnerable to environmental noise. Hard to scale.
- **Collisional gates (new approach):** Qubits interact through direct physical overlap of wave functions. Intrinsically stable. The Pauli exclusion principle (fermions can't occupy same quantum state) acts as natural error guard.

### Error Correction Threshold
- Both results "comfortably surpass the threshold generally considered necessary for quantum error correction"
- Google Willow (Dec 2024): demonstrated below-threshold surface code at distance-7, 0.143% error per cycle on superconducting qubits
- Trapped ions (Oxford, 2025): >99.99% two-qubit fidelity — still the fidelity king
- These fermionic gates: 99.75-99.91% — competitive with best neutral-atom results, plus inherent noise resistance

## Novel Analysis: The Fidelity Cliff

Calculate sequential gate depth before cumulative error exceeds 50%:
- 99.0% fidelity: (0.99)^n = 0.5 → n ≈ 69 gates
- 99.5% fidelity: n ≈ 138 gates
- 99.75% fidelity (Max Planck): n ≈ 277 gates
- 99.91% fidelity (ETH Zurich): n ≈ 770 gates
- 99.99% fidelity (trapped ions record): n ≈ 6,931 gates

The jump from 99.0% to 99.91% extends usable circuit depth from ~69 to ~770 gates — an **11× increase** from less than one percentage point of improvement. Each decimal place of fidelity is exponentially more valuable than the last.

## Novel Analysis: Parallelism Advantage
- ETH Zurich operated on **17,000 atom pairs simultaneously**
- Typical trapped-ion system: 2-50 qubits
- Typical superconducting: 50-1,000 qubits
- Optical lattice with 17,000 pairs = massive intrinsic parallelism
- This is a fundamentally different scaling approach

## Comparison Table

| Platform | Best 2-Qubit Fidelity | Qubit Count | Key Limitation |
|---|---|---|---|
| Trapped ions (Oxford, 2025) | 99.99% | ~50 | Slow gates, hard to scale |
| Superconducting (Google Willow) | ~99.5% | 105 | Dilution fridge, crosstalk |
| Rydberg neutral atoms | ~99.5% | ~1,000 | Noise-sensitive excited states |
| Fermionic collisional (2026) | 99.91% | 17,000 pairs | New, not yet integrated into full processor |

## Kill Test
- ✅ Novel milestone (first fermionic collisional gates above 99%)
- ✅ Specific numbers (99.75%, 99.91%, 17,000 pairs, 10s Bell lifetimes)
- ✅ Named labs, named researchers, published in Nature
- ✅ Not covered in LITF yet (quantum category under-represented)
- ✅ Has a "so what" — changes the quantum hardware landscape

## 10-Star Test
Reader reaction target: "I had no idea atoms could do quantum gates just by bumping into each other — and it took 25 years to make it work?"

## Strongest Counterargument
Trapped ions still hold the fidelity record (99.99%). These fermionic gates haven't been demonstrated in a fully programmable quantum processor — only in controlled lattice settings. The gap from "high-fidelity gate demo" to "working quantum computer" has swallowed many promising approaches. Superconducting and trapped-ion platforms have multi-billion-dollar commercial ecosystems. Cold atoms remain predominantly academic.

## Limitations
- Both papers demonstrate gates in optical lattice environments, not packaged quantum processors
- ETH Zurich's 99.91% is "loss-corrected" — actual including atom loss would be lower
- No demonstration of a full universal gate set yet (these are specific gate types)
- Lithium-6 requires ultra-cold temperatures (~microkelvin), complex laser setups
- No commercial roadmap for fermionic processors yet

## Journalist
**Jordan Kessler** — due for rotation (last 4: Anya Volkov, Tomás Reyes, Priya Desai, Kit Factory)

## Category
💻 Quantum

## Slug
fermionic-quantum-gates-two-labs-25-year-milestone

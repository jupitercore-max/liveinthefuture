# Research Notes: IBM's Dual-Modality Quantum Bet

## Topic
IBM acquires HRL Laboratories — the lab that invented the laser — for its silicon spin qubit technology, just as two Nature papers demonstrate spin qubits have leapt from 2 qubits at 4% error to 18 qubits at 0.2% error in three years. IBM is betting $10B+ that combining its superconducting qubit empire with spin qubits built on standard silicon fab could be the path to scalable fault-tolerant quantum computing.

## Primary Sources

### 1. Nature Papers (July 28, 2026)
- **HRL Quantum Team**: "A digitally controlled silicon quantum processing unit" — *Nature* 655, 1154–1159 (2026)
  - 18 spin qubits (56 quantum dots)
  - ~0.2% error rate on complex measurements
  - Distance-5 repetition code demonstrated
  - Distance improvement factor Λ5/3 = 4.7 (error rate shrank with more qubits)
  - Logical error rate (LER): 5.0 × 10⁻³ for distance-5, 2.4 × 10⁻² for distance-3
  - Operated at approximately zero magnetic field using external coils
  - Single cryogenic control chip + superconducting ribbon cable
  - Leakage reduction units (LRUs) prevent leakage buildup
  - [[4,2,2]] code demonstrated: logical fidelity comparable across all 4 input states
  - Each distance-5 experiment: 1,805 initializations, 805 measurements, 335,422 exchange pulses

- **QuTech (Delft)**: Undseth, B. et al. "Weight-four parity checks in a spin-shuttling architecture" — *Nature* 655, 1160–1166 (2026)
  - 5 spin qubits with ~0.2% error rate
  - Spin-shuttling architecture (electrons physically moved between zones)

- **Nature News & Views**: "How silicon-chip technology is being re-engineered for quantum computing" — *Nature* 655, 1141–1142 (2026)
- **Nature Comment**: "Quantum meets capitalism" — d41586-026-02310-0

### 2. IBM Acquisition of HRL (July 23, 2026)
- Source: IBM Newsroom (newsroom.ibm.com/2026-07-23)
- Definitive agreement signed
- HRL owned by Boeing and GM — both will continue partnering
- Jay Gambetta (IBM Director of Research): "The HRL team will help IBM push even farther forward"
- Expected close: end of Q3 2026
- Financial terms not disclosed
- IBM says HRL's tech will "fuel its quantum program for decades to come"

### 3. IBM's $10B Quantum Investment (June 2, 2026)
- Source: IBM Newsroom (newsroom.ibm.com/2026-06-02)
- $10B+ over 5 years: R&D, capex, manufacturing, M&A, ecosystem
- Anderon: new quantum wafer foundry in Albany, NY ($1B DoC + $1B IBM match)
- 300mm quantum wafer manufacturing — first pure-play quantum foundry in US
- Roadmap milestones:
  - IBM Quantum Starling (2029): first large-scale fault-tolerant quantum computer
  - IBM Quantum Blue Jay (2033): 1 billion quantum operations, 2,000 qubits
- 90+ quantum systems deployed (more than all competitors combined)
- 340+ organizations running real workloads
- $1.1B in client contracts since 2017
- 120-qubit Nighthawk chip: 25,000× faster than previous gen
- Arvind Krishna: "The quantum era is no longer ahead of us, it has started"

### 4. Additional Spin Qubit Results (2026)
- **RIKEN (Japan)**: 5-qubit system with ultra-low error rate <0.01% (preprint, July 2026)
- **Groove Quantum (Delft)**: 18-qubit germanium device, ~0.2% error rate (arXiv, April 2026)
- **IQM**: Directional tile codes — 1,000× error rate reduction vs surface code at ~30 physical qubits per logical qubit (June 2026)

### 5. Historical Baseline
- 3 years ago (2023): state-of-the-art was 2 spin qubits at ~4% error rate
- Today: 18 qubits at 0.2% = 9× qubit scaling + 20× error reduction in 3 years
- Superconducting circuits: 100+ qubits but surface code overhead is massive (~1,000 physical per logical)
- Neutral atoms: thousands of qubits but different scaling challenges

### 6. HRL History
- Founded as Hughes Research Lab by Howard Hughes (Hughes Aircraft Company), 1948
- Invented the laser (1960) — Theodore Maiman, Irnee D'Haenens, Charles Asawa
- Self-aligned gate MOS transistor (1965) — Robert Bower, enabling all modern ICs
- First autonomous cross-country navigation software for DARPA (1984)
- Ultralight metallic microlattices (2011)
- First memristor array on CMOS (2012)
- 1,100+ patents
- Nearly died: mass layoffs in early 2026 after losing US government contracts
- Now being acquired by IBM

## Original Calculation: Error Rate Trajectory & Logical Qubit Cost

**Spin qubit improvement rate:**
- 2023: 2 qubits, 4% error rate
- 2026: 18 qubits, 0.2% error rate
- Error reduction: 4% → 0.2% = 20× improvement in 3 years ≈ 2.71× per year
- Qubit scaling: 2 → 18 = 9× in 3 years ≈ 2.08× per year
- RIKEN already at <0.01% on 5 qubits (400× better than 2023 baseline)

**Superconducting qubit error floor:**
- Google's surface code: ~3% logical error per round (2023 Nature)
- Surface code overhead: ~1,000 physical qubits per logical qubit at current error rates
- IBM's plan: 2,000 qubits → Blue Jay (2033) = limited logical qubits at scale

**The CMOS advantage math:**
- Spin qubits use standard silicon fab — same lithography, same wafer sizes
- TSMC's advanced nodes: ~100 million transistors per mm² at 3nm
- Quantum dots for spin qubits: spacing ~90nm apart (QuTech data)
- At 90nm pitch: (10mm / 0.09μm)² ≈ 12,300 quantum dots per mm² (rough)
- A 300mm wafer could theoretically hold millions of quantum dot positions
- Superconducting Josephson junctions: ~100μm scale, need massive dilution refrigerators
- At 100μm pitch: (10mm / 100μm)² = 10,000 junctions per cm² — 100× less dense

**IQM's directional tile codes unlock spin qubits:**
- Surface code: ~1,000 physical qubits per logical qubit
- IQM directional tile codes: ~30 physical per logical, 1,000× error reduction
- At 30:1 overhead + spin qubit density: a single advanced chip could hold thousands of logical qubits
- At 1,000:1 overhead + superconducting density: room-sized fridges for hundreds of logical qubits

**Back-of-envelope comparison:**
- For 10,000 logical qubits (meaningful drug discovery, cryptography):
  - Superconducting + surface code: 10,000 × 1,000 = 10 million physical qubits → multiple room-sized cryostats
  - Spin qubits + directional tile codes: 10,000 × 30 = 300,000 physical qubits → potentially fits on a single chip
- This is IBM's real bet: if spin qubits reach fault-tolerant error rates at scale, the existing semiconductor infrastructure can mass-produce quantum processors

## Kill Test
✅ Original calculation: Cross-referencing spin qubit error improvement trajectory (20× per 3 years) against qubit density comparisons (spin vs superconducting) to quantify the scaling advantage. Nobody has run this specific comparison using the new Nature paper data + IQM tile codes + IBM's roadmap milestones to calculate what the CMOS integration path means for logical qubit density.

## Angle
The lab that invented the laser nearly died this year. Then it published two breakthrough papers and got bought by the biggest quantum computing company on Earth. IBM isn't just buying talent — it's betting that the transistor industry's trillion-dollar infrastructure can build quantum computers too. The numbers suggest they might be right.

## Journalist
Marcus Chen — tech systems beat, analytical

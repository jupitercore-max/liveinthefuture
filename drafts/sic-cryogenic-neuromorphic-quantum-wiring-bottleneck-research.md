# Research Notes: SiC Cryogenic Neuromorphic Circuits for Quantum Computing

## Story Selection

**Kill test:** "A single transistor that mimics a neuron at the temperature where quantum computers run" — YES, this is wild and shareable.

**10-star test:** Original contribution is a thermodynamic budget calculation showing WHY moving even simple control logic to the mixing chamber stage matters exponentially for scaling. Nobody has done this math linking the HKU paper's energy efficiency claims to specific dilution refrigerator cooling budgets.

**Novel contribution check:** No existing LITF coverage of SiC, cryogenic neuromorphic computing, or the wiring bottleneck problem specifically. Quantum articles to date focus on error correction, speedups, and qubit count milestones.

## Primary Sources

### 1. Nature Communications Paper
- **Title:** "Cryogenic neuromorphic circuits using gate-controlled negative differential resistance in silicon carbide"
- **Authors:** Xin Yang#, Matthew Porter#, Yuan Qin, Zineng Yang, Hehe Gong, Liyang Jin, Zichen Xi, Han Wang, Liyan Zhu, Yuhao Zhang*, Linbo Shao*
- **DOI:** 10.1038/s41467-026-70963-6
- **Published:** March 23, 2026
- **Institutions:** HKU (CASIC + ECE) + Virginia Tech (CPES + ECE + Physics/Quantum)
- **Key findings:**
  - SiC MOSFETs exhibit S-shape NDR below 2K via electron-donor impact ionization (EDII)
  - On/off current ratio >10^7
  - Works at temperatures as low as 10 mK
  - "Thousands of times more energy-efficient" than conventional electronics
  - Three neuron types demonstrated: sensory, logic, integrate-and-fire
  - Mechanism intrinsic to SiC atomic structure (not thermal) — robust and repeatable
  - Industry-standard SiC, manufacturable on 300mm wafers

### 2. Arxiv Review: "Integration and Resource Estimation of Cryoelectronics for Superconducting Fault-Tolerant Quantum Computers" (Kawabata, 2026)
- **Key data points:**
  - Cryo-CMOS at 4K: Underwood et al. — 23 mW/qubit (14nm FinFET)
  - Cryo-CMOS at 4K: Bardin et al. — <2 mW/qubit (28nm bulk CMOS)
  - Cooling power: "a few tens of μW at 10-20 mK, around the mW level near 100 mK, and at most a few W near 4 K"
  - Fermilab Colossus: ~300 μW at 20 mK
  - 10^5-10^6 physical qubits needed for fault-tolerant regime
  - RSA-2048: ~9×10^5 physical qubits (Gidney estimate)
  - Each physical qubit requires multiple control/readout connections

### 3. Bluefors Specs (manufacturer data)
- LD400/LD450: 14-16 μW at 20 mK, 350-500 μW at 100 mK
- Base temp: 10 mK

### 4. Industry wiring data
- Google 72-qubit: 168 coaxial cables (2.3 per qubit)
- IBM Condor 1,121-qubit: "over a mile of high-density cryogenic flex I/O wiring" inside a single dilution refrigerator
- Delft Circuits Cri/oFlex: increases lab-fridge capacity from 50 to 500 channels, enabling ~100 qubits per lab fridge
- APS Physics (2026): wire-sharing/time multiplexing studies show theoretical hope but need electronic switches that don't exist yet

### 5. IBM Quantum Roadmap
- Condor (2023): 1,121 qubits, proof they can manage extreme wiring
- Heron (2023): 133 qubits, focus shifted to error rates over qubit count
- Target: 100,000-qubit system by 2033

## Original Contribution: The Thermodynamic Budget

### The calculation nobody has done:

**At 4K (where cryo-CMOS lives):**
- Cooling budget: ~1.5W
- Best cryo-CMOS: 2 mW/qubit
- Max qubits controlled: 1,500 mW / 2 mW = 750 qubits
- IBM's Condor (1,121 qubits) already exceeds this for active simultaneous control

**At mixing chamber (10-20 mK, where qubits live):**
- Cooling budget: 16 μW (standard Bluefors) to 300 μW (Fermilab Colossus)
- Best cryo-CMOS: 2 mW = 2,000 μW → ZERO qubits at mixing chamber
- This FORCES all control electronics to 4K stage
- Every qubit needs a physical wire from 4K → 10 mK

**SiC "thousands of times" more efficient:**
- Conservative (1,000×): 2 μW/circuit-element
- Aggressive (10,000×): 0.2 μW/circuit-element
- At 2 μW with 300 μW budget (Colossus): 150 circuit elements at mixing chamber
- At 0.2 μW with 300 μW: 1,500 circuit elements

**The exponential leverage:**
- If neuromorphic local controllers multiplex even 10:1, those 150 elements handle 1,500 qubits locally
- Wire reduction: from 3,000-4,500 wires (1,500 × 2-3) down to ~150 data links
- 20-30× fewer wires between temperature stages
- This doesn't solve the million-qubit problem alone, but it proves the paradigm shift is thermodynamically feasible

### Important caveats for Limitations section:
- The paper demonstrates individual neurons, not complete qubit controllers
- A full qubit controller needs multiple neurons + analog front-ends
- Power numbers for complete circuits will be higher than single-transistor demos
- No qubit control demonstration in this paper — it's neuromorphic computing proof-of-concept
- Gap between "a single transistor spiking" and "a functioning controller" is significant
- SiC foundry capacity is currently optimized for power electronics, not digital logic

## Journalist
Tomás Reyes — quantum/physics beat (wrote quantum-3000x-speedup, magnon-lifetime articles)

## Category
💻 Quantum (but with materials science crossover)

## Slug
sic-cryogenic-neuromorphic-quantum-wiring-bottleneck

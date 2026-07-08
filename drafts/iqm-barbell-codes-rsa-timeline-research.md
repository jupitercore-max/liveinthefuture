# Research Notes: IQM Barbell Codes — RSA Timeline Implications

## Core Thesis
IQM's barbell codes achieve <30 data qubits per logical qubit vs surface code's ~1,500 for equivalent error rates at high code distances. Running the numbers through the canonical RSA-2048 factoring estimate suggests the encryption-breaking timeline shifts forward by roughly 10-15 years — if the simulated performance holds in hardware.

## Primary Sources

### arXiv:2606.06062 — "Barbell Codes: qLDPC Codes for Superconducting Quantum Hardware"
- Authors: Shin Ho Choe, Vincent Steffan, Florian Vigneau, Pedro Parrado-Rodríguez, Hsiang-Sheng Ku, Martin Leib, Francisco Revson Fernandes Pereira, Fedor Šimkovic IV
- Submitted June 4, 2026
- Key claims:
  - <30 data qubits per logical qubit (constant as distance increases)
  - At physical noise 10^-4: preserves info for "several trillion" QEC cycles → implies per-cycle error <10^-12
  - Hardware complexity CONSTANT as code distance increases (surface code scales as d²)
  - Designed for IQM Constellation topology: 12-qubit connectivity (vs 4 in square grid)
  - 3 couplers for computational qubits, 6 for central elements
  - Single long coupler for every second qubit
  - QLDPC (quantum low-density parity-check) code family

### IQM BusinessWire Press Release (June 9, 2026)
- "Up to three orders of magnitude lower logical error rates than surface code"
- "Up to eight times fewer physical qubits"
- IQM deploying 150-qubit systems to customers in 2026
- IQM Halocene quantum computer for QEC R&D
- Going public via SPAC merger with Real Asset Acquisition Corp (Nasdaq: RAAQ)
- ~400 employees, HQ Finland/Munich

### Gidney & Ekerå (2019, arXiv:1905.09749) — "How to factor 2048 bit RSA integers in 8 hours using 20 million noisy qubits"
- Canonical resource estimate for RSA-2048 factoring
- Assumptions: p=10^-3, surface code, 1µs cycle time, 10µs reaction time
- Result: ~20 million physical qubits, ~8 hours
- Algorithm uses 3n + 0.002n lg n ≈ 6,189 logical qubits for n=2048

### Gidney update — "How to factor 2048 bit RSA integers with less than a million noisy qubits"
- Optimized estimate: <1M qubits, ~1 week
- Same p=10^-3, surface code assumptions but better algorithmic techniques

### Surface Code Performance Data
- Encoding rate: 1/d² → d² physical qubits per logical qubit (plus ancilla: 2d²-1 total)
- Google Willow (2024): d=7, 101 qubits, 0.143% error/cycle, Λ=2.14
- Threshold: ~1% physical error rate
- At p=10^-3: need d≈25-30 for 10^-12 error/cycle → ~1,250-1,800 physical qubits per logical
- At p=10^-4: need d≈9-11 → ~161-241 physical qubits per logical

### IBM Quantum Roadmap
- 2029: Starling — 200 logical qubits, 100M gates, ~10K physical qubits
- 2033+: Blue Jay — 2,000 logical qubits, 1B gates, ~100K physical qubits
- Using bivariate bicycle codes (also LDPC), claims ~90% overhead reduction
- Jay Gambetta: "cracked the code" on QEC

### Google Quantum
- Willow: 105 qubits, below-threshold surface code, d=7
- Expanding to neutral atoms alongside superconducting qubits
- Next goal: tens of thousands of qubits

## Original Calculation

### What the 30-qubit-per-logical advantage means for RSA-2048:

**Baseline (current estimates with surface code at p=10^-3):**
- Gidney/Ekerå: ~6,189 logical qubits × ~3,200 physical/logical (with routing) = 20M total
- Surface code d≈27: 2(27²)-1 = 1,457 physical qubits per logical (before routing overhead)

**Step 1: Better hardware alone (p=10^-4, still surface code):**
- At 10^-4 noise, same target error achievable at d≈11
- 2(11²)-1 = 241 physical qubits per logical
- Total: 6,189 × 241 × 1.5 (routing factor) ≈ 2.2M physical qubits
- ~10x improvement from hardware alone

**Step 2: Better hardware + barbell codes (p=10^-4, barbell codes):**
- <30 data qubits per logical qubit
- Total data qubits: 6,189 × 30 = 185,670
- With syndrome qubits + routing (factor ~2-3x): ~370K-560K total
- ~35-55x improvement vs the 20M baseline

**Timeline Mapping:**
- IBM Blue Jay (2033): ~100K physical qubits
- Our barbell-code RSA estimate: 370K-560K qubits
- Gap to Blue Jay: 4-6x
- Quantum doubling period: ~2-3 years at current pace
- Time to close gap: 4-9 years after 2033 → 2037-2042
- Surface code timeline: 20M qubits = 200x Blue Jay → 2048-2057
- **Net acceleration: ~10-15 years**

## Caveats (for Limitations section)
1. Barbell codes are SIMULATED, not experimentally demonstrated
2. The Constellation topology is IQM-specific; Google uses square grid (4-connectivity), IBM uses heavy-hex (3-connectivity). Barbell codes may not port to other architectures.
3. "Up to" figures represent best-case performance
4. IQM going public via SPAC → financial incentive for impressive announcements
5. p=10^-4 is ~10x better than current best error rates (10^-3) — that improvement is not guaranteed to come soon
6. The Gidney estimate already assumes optimistic parameters
7. Logical gate operations (not just memory) must work for computation — paper only addresses memory + multi-Pauli measurements
8. No independent verification yet
9. IBM's own bivariate bicycle codes claim 90% overhead reduction — the competition is fierce

## Counterargument
IBM is already using its own LDPC codes (bivariate bicycle) and claims ~90% overhead reduction with a demonstrated pathway. Google just expanded to neutral atoms which have natural high connectivity. The QLDPC race has multiple entrants — IQM's barbell codes are one of ~5 serious approaches. The 1000x and 8x figures are for specific code instances on a bespoke topology that nobody else uses. The real question is whether purpose-built hardware for a purpose-built code can survive contact with actual manufacturing at scale.

## Journalist
Elena Vasquez — Quantum beat

## Article Number
#555

# Research: Analog KAN Chip Convergence

## Source: Moltbook post by vina (Jul 12, 2026)
"55 percent area savings, and pruning improved the accuracy" — flagged the flexible electronics KAN paper by Lozano Duarte, Zervakis, Tahoori, and Nassif. Insight: the training loop needs noise-aware design for analog hardware.

## The Convergence (7+ Independent Implementations)

### 1. Georgia Tech / TSMC / National Tsing Hua University
- **Paper:** arXiv:2409.11418 (Sep 2024), accepted at ASP-DAC 2025
- **Tech:** RRAM-ACIM (Analog Compute-in-Memory) on TSMC 22nm
- **Results:** 41.78× area reduction, 77.97× energy reduction, 3.03% accuracy BOOST vs digital DNN
- **Key:** Actual TSMC 22nm prototype chips measured. Algorithm-hardware co-design: Alignment-Symmetry + PowerGap quantization, sparsity-aware mapping
- **Scaling:** 500K-807K× parameter increase → only 28K-41K× area increase, 51-94× power increase

### 2. University of Twente (Netherlands)
- **Paper:** arXiv:2602.07518 (Feb 2026)
- **Tech:** RNPUs (Reconfigurable Nonlinear-Processing Units) — multi-terminal nanoscale silicon
- **Results:** ~250 pJ/inference, ~600 ns latency, 10²-10³× energy reduction, ~10× area reduction vs digital MLP
- **Key:** Edge functions realized "in materia" — physics does the computation. Experimentally calibrated.

### 3. KANalogue (arXiv:2510.23638)
- **Tech:** Quantum tunneling — cold-metal tunnel diodes (NDR devices)
- **Results:** Competitive accuracy on MNIST, FashionMNIST, CIFAR-10 with fewer parameters
- **Key:** Fully analog signal path. No digital assistance. Physics-based nonlinearities.

### 4. Flexible Electronics KAN (ERC-funded, Lozano Duarte et al.)
- **Tech:** Analog Building Blocks (ABBs) on flexible substrates
- **Results:** 125× area reduction, 10.59% power decrease vs 8-bit digital. Up to 55% area savings with pruning.
- **Key:** Wearable/IoT target. Noise-aware training loop is the novel insight.
- **Caveat:** 7.58% approximation error vs digital

### 5. Photonic KAN (OpenReview)
- **Tech:** Cascaded ring-assisted Mach-Zehnder Interferometers (RAMZI)
- **Results:** 2300× footprint-energy reduction, 7× latency reduction vs MZI photonic accelerators
- **Key:** All-optical. Light does the nonlinear computation.

### 6. Nature Communications (2026) — Gaussian Memory Cell KAN
- **DOI:** 10.1038/s41467-026-69592-w
- **Tech:** Gaussian transistor + memristor = Gaussian-like memory cell
- **Tasks:** Function regression, image recognition, PDE solving, time-series forecasting
- **Key:** Published in Nature Comms — peer-reviewed validation

### 7. RBF-KAN FPGA Core (MDPI, June 2026)
- **Tech:** Soft IP core in HDL, fully pipelined
- **Results:** 43.6× speedup vs commercial edge CPU
- **Key:** Runtime configurable for real-time IoT inference

## Why KANs Are Analog-Native

Traditional MLPs: fixed activation functions (ReLU), computation happens in matrix multiplication (weights × inputs). Easy to digitize.

KANs (Liu et al., April 2024, MIT/Caltech): learnable edge functions replace fixed activations. The nonlinearity IS the computation. This maps naturally to analog physics — every physical device has inherent nonlinear I-V characteristics.

Key insight: In a KAN, you need trainable nonlinear functions. In analog hardware, every transistor/diode/memristor already IS a nonlinear function. The architecture matches the physics.

## Comparison Table

| Implementation | Node/Tech | Energy Reduction | Area Reduction | Accuracy Trade-off |
|---|---|---|---|---|
| Georgia Tech/TSMC | 22nm RRAM-ACIM | 78× | 42× | +3% (better!) |
| Twente RNPUs | Nanoscale Si | 100-1000× | 10× | Comparable |
| KANalogue | Tunnel diodes | TBD (fully analog) | TBD | Competitive |
| Flexible KAN | Flex substrates | ~10% | 125× | -7.58% |
| Photonic KAN | RAMZI optical | 2300× (vs optical) | 2300× (vs optical) | Competitive |
| Gaussian Cell | Memristor | Significant | N/A | Maintained |

## TetraMem Commercial Angle
- TetraMem (startup) announced TSMC 22nm multi-level RRAM analog in-memory computing SoC milestone (May 2026)
- MLX200/MLX201 platforms for edge AI: voice, wearables, IoT, always-on sensing
- Evaluated sampling expected H2 2026
- Based on Nature (2023) and Science (2024) papers on RRAM precision

## Timeline
- Apr 2024: KAN paper by Liu et al. (MIT/Caltech)
- Sep 2024: Georgia Tech/TSMC first hardware paper
- Feb 2026: Twente analog KAN
- 2026: Nature Comms, MDPI, Flexible KAN papers
- H2 2026: TetraMem commercial sampling

## Original Contribution (LITF Requirement)
Nobody has mapped this convergence. The story isn't any one paper — it's that 7 groups independently decided KANs belong in analog silicon, and the quantitative comparison reveals a 78× to 2300× efficiency range depending on the approach. The original analysis: KANs are the first neural architecture since CNNs where the math maps to physics better than it maps to GPUs.

## Limitations
- Most results are simulations or small-scale prototypes, not production chips
- Georgia Tech/TSMC is the only group with taped-out 22nm silicon
- Accuracy trade-offs vary (flexible KAN loses 7.58%, Georgia Tech gains 3%)
- None of these run transformer-scale models — they're edge/IoT inference
- The photonic comparison is against other photonic systems, not digital

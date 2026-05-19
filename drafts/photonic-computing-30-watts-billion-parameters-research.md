# Research Notes: Photonic Computing Crosses From Lab to Production

## Article #339 | Journalist: Dr. Kenji Watanabe | Category: ⚡ Energy / 💻 Quantum
## Date: May 19, 2026

## Thesis
Three independent milestones in photonic computing have converged in weeks: a PNAS paper demonstrating billion-parameter AI training at 30 watts (vs ~700W for an NVIDIA H100), Q.ANT deploying second-generation photonic processors at Germany's Leibniz Supercomputing Centre with real benchmark results, and Oxford spinout Lumai launching the world's first optical computing server for real-time LLM inference. Photonic computing is no longer a lab curiosity — it's entering production evaluation at real data centers.

## Kill Test: YES
- **Would a reader care?** Yes — anyone following AI infrastructure, energy, or chip competition. Data center power is the #1 bottleneck in AI scaling.
- **Timely?** All three milestones are from the past 6 weeks.
- **Novel?** LITF has covered photonic INTERCONNECTS (cables between chips). This is photonic COMPUTING (using light for actual matrix math). Fundamentally different story.

## 10-Star Test: YES
- Concrete numbers: 1,500 TeraOPS at 30W, 50x throughput, 25x inference speedup, 90% power reduction
- Multiple independent sources confirming the same trend from different angles
- Quantifiable comparison to existing GPU economics
- Clear "so what" for anyone building or funding AI infrastructure

## Novel Contribution Check: PASS
- Original calculation: TOPS-per-watt efficiency comparison across all three photonic systems vs GPU baseline
- Original data center cost model: what photonic computing means for the $125-145B Meta capex budget's energy component
- Cross-reference nobody has made: three independent companies/labs hitting production milestones in the same 6-week window

## Source 1: PNAS Paper — Hybrid Photonic Processing Unit (via ML Hive)
- Published in Proceedings of the National Academy of Sciences, May 2026
- Hybrid Electronic-Photonic Optical Processing Unit (OPU)
- Achieves 1,500 TeraOPS at under 30 watts
- Uses Direct Feedback Alignment (DFA) instead of standard backpropagation
- DFA uses fixed random matrices projected directly from output error to each hidden layer
- Physical random scattering medium acts as the fixed random matrix (light through glass)
- Spatial Light Modulator (SLM) encodes data, camera sensor reads output
- Energy comes only from laser, SLM refresh, and camera readout
- Successfully trained billion-parameter neural networks
- Analog noise acts as regularization (like dropout)
- Limitations: DFA not yet proven for complex Transformer architectures; I/O latency between electronic frontend and photonic backend; CUDA ecosystem has thousands of person-years of optimization

### Key comparison:
- NVIDIA H100 SXM: 2,000-4,000 TeraOPS at 700W → ~4-5.7 TOPS/W
- PNAS OPU: 1,500 TeraOPS at 30W → 50 TOPS/W (8.8-12.5× more efficient)

## Source 2: Q.ANT Gen 2 Deployment at Leibniz Supercomputing Centre (LRZ)
- Second-generation photonic processors deployed at LRZ in Germany
- Uses Thin-Film Lithium Niobate (TFLN) photonic integrated circuits
- Native Processing Units (NPUs) — light through waveguides
- PCIe interface — plugs into existing HPC infrastructure

### Benchmark results (Gen 2 vs Gen 1):
- Matrix multiplication throughput: 50x higher
- ResNet-18 inference: 25x faster
- Energy consumption: 6x lower
- AI accuracy: sufficient for state-of-the-art applications

### Business:
- €62M Series A (Europe's largest for this category)
- Co-led by Cherry Ventures, UVC Partners, imec.xpand
- Participation from L-Bank, Verve Ventures, EXF Alpha, LEA Partners, Onsight Ventures, TRUMPF
- Own TFLN chip pilot line with IMS CHIPS in Stuttgart
- Expanding to US data centers
- CEO: Dr. Michael Förtsch
- Quote: "Adding more digital hardware no longer solves the compute scaling problem in AI. If we continue to scale with brute-force transistor logic, we simply turn electricity into heat."
- German Federal Ministry of Research funding
- Target: 30x energy efficiency, 50x performance improvement by 2030

## Source 3: Lumai Iris Nova — First Optical Computing Server
- Oxford University spinout
- Iris Nova: world's first optical computing system for real-time LLM inference
- Demonstrated real-time inference on Llama 8B and Llama 70B
- Hybrid processor: optical tensor engine (math) + digital processing (control)
- Up to 90% lower power consumption vs silicon GPUs
- 50x faster inference claimed
- 3D light-based architecture — massive spatial parallelism
- Available for evaluation to hyperscalers, neo-clouds, enterprises
- Additional servers: Aura and Tetra (larger capacity)
- ARIA (UK government Advanced Research and Invention Agency) backing
- CEO: Xianxin Guo
- Suraj Bramhavar, ARIA Program Director, quote on optical processors as alternative scaling pathway

## Source 4: OCI Multi-Source Agreement (OFC 2026)
- AMD, Broadcom, Meta, Microsoft, NVIDIA, OpenAI forming Optical Compute Interconnect (OCI) consortium
- Standardizing optical interconnects up to 800 Gbps
- Even GPU makers are betting on photonics for the transport layer

## Original Calculation: Data Center Economics
### TOPS-per-Watt comparison:
| System | TeraOPS | Power (W) | TOPS/W |
|--------|---------|-----------|--------|
| NVIDIA H100 SXM | 2,000-4,000 | 700 | 2.9-5.7 |
| PNAS OPU | 1,500 | 30 | 50 |
| Q.ANT Gen 2 (6x improvement) | [implied] | [6x lower] | ~17-34 |

### What 50 TOPS/W means at scale:
- A 100MW data center using H100s (~143K GPUs at 700W each): produces ~570-810 PetaOPS
- Same compute throughput with photonic at 50 TOPS/W: requires ~11-16 MW
- Power savings: 84-89%
- At $0.10/kWh: $87.6M/year → ~$10-14M/year = $73-77M/year savings PER DATA CENTER

### The capex lens:
- Meta's 2025 capex guidance: $125-145B
- Electricity/cooling typically 30-40% of total data center costs
- Goldman Sachs estimate: $11.5B in global data center electricity costs in 2024, rising to $34B by 2027
- If photonic delivers even 50% of claimed efficiency: $17B/year savings industry-wide by 2027

## Strongest Counterargument
The strongest case against photonic computing replacing GPUs is the **software ecosystem gap**. NVIDIA's CUDA has ~15 years of optimization from thousands of engineers. PyTorch, TensorFlow, JAX — the entire deep learning software stack is built around GPU-centric computation with backpropagation. Direct Feedback Alignment works for MLPs and CNNs, but has NOT been proven for Transformer architectures (the architecture behind GPT, Claude, Gemini, and every frontier model). Until DFA or a successor algorithm can train Transformers at competitive accuracy, photonic processors are limited to inference and smaller-scale training — real but not revolutionary.

Additionally, the I/O penalty (converting between electronic and optical signals) eats into the theoretical efficiency gains. The 50 TOPS/W number includes the optical computation but the real-world throughput depends on how fast you can feed data to the SLM and read it from the camera. At data center scale, this latency compounds.

## Limitations
- PNAS paper's billion-parameter claim is for MLPs/CNNs, not Transformers
- Q.ANT benchmarked on ResNet-18 (a 2015-era model), not modern LLMs
- Lumai demonstrated Llama inference but hasn't published detailed latency/throughput numbers
- All three are at evaluation/pilot stage, not mass deployment
- No photonic processor has been manufactured at GPU-scale volumes
- Cost per chip unknown — could be economically unviable even if energy-efficient

## Headline candidates
1. "A Lab Trained a Billion-Parameter AI Model Using 30 Watts. An H100 Uses 700."
2. "Three Photonic Computing Systems Hit Production in Six Weeks. The GPU's Power Monopoly Has an Expiration Date."
3. "Photonic Processors Just Achieved 50 TeraOPS Per Watt. The Best GPU Manages 5.7."

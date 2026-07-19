# Research: Jetson T3000 — Compute Density vs Autonomy Gap

## Moltbook Source
- Post: "Compute density is not autonomy. The Blackwell edge gap." by rossum (score 172, Jul 18 2026)
- Key observation: "A humanoid robot is not a collection of TFLOPS. It is a collection of closed-loop responses to physical uncertainty."

## Primary Sources

### 1. NVIDIA Jetson Thor Family (announced Jul 15, 2026)
- T5000: 2,070 FP4 TFLOPS, 128GB LPDDR5X, 273 GB/s, 130W, $2,999 (1K qty), 14-core Arm Neoverse V3AE
- T3000: 865 FP4 TFLOPS, 32GB LPDDR5X, 273 GB/s, 70W, 8-core Arm Neoverse, 1,536 CUDA cores
- T2000: 400 FP4 TFLOPS, 16GB, 40W
- AGX Orin: 275 INT8 TOPS, 64GB, 60W (Ampere)
- Key claim: T3000 delivers "roughly same inference performance as T5000 in multimodal workloads" (wccftech)
- Both T3000/T2000 available Q1 2027
- Adopters: Amazon Robotics, Boston Dynamics, Agile Robots, Hitachi, 1X, Techman Robot, UBTech
- Source: NVIDIA official, wccftech, analyticsinsight.net

### 2. Jetson Historical TFLOPS/Watt Trajectory
| Year | Module | Performance | Power | TFLOPS/W |
|------|--------|------------|-------|----------|
| 2014 | TK1 | 0.327 FP32 TFLOPS | 10W | 0.033 |
| 2015 | TX1 | 1.024 FP16 TFLOPS | 10W | 0.102 |
| 2018 | AGX Xavier | 32 INT8 TOPS | 40W | 0.8 |
| 2023 | AGX Orin | 275 INT8 TOPS | 60W | 4.6 |
| 2025 | Thor T5000 | 2,070 FP4 TFLOPS | 130W | 15.9 |
| 2026 | Thor T3000 | 865 FP4 TFLOPS | 70W | 12.4 |
| 2026 | Thor T2000 | 400 FP4 TFLOPS | 40W | 10.0 |

Note: FP4 vs INT8 vs FP16 are different precision — not directly comparable. But the trajectory is clear.

### 3. Robot Control Loop Requirements (academic sources)
- Most humanoid teleoperation systems: ~200ms end-to-end latency (ExtremControl paper, arxiv)
- Industrial trajectory replanning: <25ms (Springer Nature research)
- Stable bipedal walking: control loops at hundreds to thousands of Hz (Panasonic Humanoid Nervous System paper)
- Policy network forward reasoning: 62.4% of total delay
- At >1000 Hz control frequency, processor load hits 85%, causing control cycle jitter >5% safety threshold
- "Hierarchical recursive networks compress control cycle to 0.8ms, but still require 33ms response for sudden obstacles"

### 4. Aetina (Edge AI partner)
- Plans DeviceEdge AIE-KT (fan-based) and AIE-PT (fanless) for T3000/T2000
- Already sells Thor T5000 systems: 2,070 TFLOPS in 130W envelope
- Nvidia Elite Partner

## Original Contribution

### Calculation 1: The Two-Clock Problem
Robot autonomy requires two simultaneous computational loops:
1. **Perception/Planning loop**: VLMs, LLMs, world models — runs at ~10-30 Hz (33-100ms), benefits from TFLOPS
2. **Control loop**: joint torques, balance correction, force control — runs at 500-1000 Hz (1-2ms), benefits from LATENCY not throughput

NVIDIA's 7.5x TFLOPS improvement (Orin → Thor) addresses loop 1. Loop 2 has seen 0x improvement from more TFLOPS — it's constrained by sensor-to-actuator latency, which is a wiring/physics problem, not a compute problem.

### Calculation 2: The Power Budget Math
A 70kg humanoid robot with a ~2kWh battery has roughly 200W total power budget for 8-10 hours of operation.
- T5000 at 130W: consumes 65% of total power budget just for compute
- T3000 at 70W: consumes 35% — leaving room for sensors, actuators, communications
- T2000 at 40W: consumes 20% — viable for smaller form factors

The T3000 is significant not because of its TFLOPS but because it moves below the power threshold where the compute module stops being the dominant consumer. This shifts the design constraint from "how much compute can we afford" to "how fast can we close the loop."

### Calculation 3: TFLOPS-per-Dollar Across the Family
- T5000: $2,999/2,070 = $1.45 per TFLOP
- T3000: pricing TBD, but at same $/TFLOP would be ~$1,254
- T2000: pricing TBD, but at same $/TFLOP would be ~$580

## Counterargument
The strongest case against this thesis: more TFLOPS DO help with control, because modern RL-based locomotion policies ARE neural networks. A 1000 Hz control loop running a transformer policy needs inference at 1ms — and that requires TFLOPS. The answer: true, but the T3000 already has enough for this. At 865 FP4 TFLOPS, single-policy inference at 1ms is trivially achievable. The bottleneck has moved to sensor fusion latency, actuator response time, and safety verification — none of which improve with more TFLOPS.

## Limitations
- FP4 TFLOPS vs INT8 TOPS are not directly comparable across generations
- T3000/T2000 pricing not yet announced
- Battery and power budget estimates vary widely by robot design
- "Same inference as T5000" claim is NVIDIA marketing — independent benchmarks not yet available

# Research: Nvidia N1X — 1,000 TOPS, CUDA Comes to Laptops

## Core Facts

### N1X Specs (confirmed via Hot Chips 2025, leaks, TechTimes, WCCFTech)
- Based on GB10 Blackwell "superchip"
- 2.5D package on TSMC 3nm: CPU die (MediaTek designed) + GPU die (Nvidia Blackwell)
- Connected via NVLink C2C at 300 GB/s bidirectional
- **CPU:** 20 ARM v9.2 cores — 10 Cortex-X925 (perf) + 10 Cortex-A725 (efficiency), 32 MB L3 cache
- **GPU:** 6,144 CUDA cores across 48 SMs (same shader count as desktop RTX 5070)
- 5th-gen Tensor Cores with NVFP4 precision
- Dedicated ray tracing cores
- **AI Performance:** 1,000 TOPS at NVFP4 precision
- **FP32:** 31 TFLOPs
- **Memory:** Unified LPDDR5X-9400 on 256-bit bus, ~301 GB/s bandwidth
- DGX Spark desktop ships with 128 GB unified memory at $3,999-$4,699
- Can run 200B+ parameter LLMs locally
- **TDP:** 80W-120W (engineering sample)
- **Laptop pricing:** Analysts estimate $1,000-$1,500 range (Dataconomy)

### Timeline
- Nvidia's first consumer CPU since Tegra X1 (Shield TV, over a decade ago)
- Delayed internally at least twice (originally planned 2025, then Q1 2026)
- Cryptic teaser posts May 29: "A new era of PC" with Taipei coordinates
- Announcement: Jensen Huang keynote, June 1, 11 AM Taipei time (May 31 11 PM ET)
- Computex 2026: June 2-5
- Partners confirmed: Dell, Lenovo, ASUS (ProArt laptop hinted), Microsoft Surface

### Competitive Landscape

**Qualcomm Snapdragon X2 Elite (shipping since April 2026):**
- 18 cores, 3nm
- 80 TOPS NPU
- 152 GB/s bandwidth (128-bit LPDDR5X)
- Up to 128 GB memory
- Geekbench 6: 3,521 single / 22,978 multi (X2 Elite Extreme)
- Laptops: $800-$1,500
- Battery life: 20-33 hours claimed

**Apple M5 (March 2026):**
- Apple Silicon ARM architecture
- ~40+ TOPS
- Up to 192 GB unified memory (M5 Max)
- MacBook-only ecosystem
- Geekbench 6: ~3,100+ single
- Local AI: MLX framework, smaller ecosystem than CUDA

**AMD Ryzen AI Max+ Pro 495 "Strix Halo" (2026):**
- 16 Zen 5 cores, x86
- 40 CU RDNA 3.5 GPU
- 128 GB LPDDR5X config at ~$3K
- Geekbench 6: ~2,800-2,900 single / ~15,000+ multi
- ROCm gaining ground but still behind CUDA

**Intel Arrow Lake-H (current gen):**
- Lunar Lake successor, x86
- Core Ultra 9 285H
- Geekbench 6: ~2,807 single / ~15,390 multi
- Still dominant market share but losing ground

### Market Context
- Global laptop market: ~170M units/year
- Windows ARM adoption still <5% of total PC market
- CUDA developer ecosystem: ~4 million developers
- Nvidia stock: $211, market cap ~$5.2T
- Nvidia's "Edge Computing" segment (renamed from Gaming): revenue declining, N1X is the pivot
- Industry narrative shift from cloud AI training to "local inference" / "edge AI"

### Original Analysis Opportunities
1. TOPS-per-dollar comparison across all platforms
2. The CUDA moat: why software ecosystem matters more than raw hardware specs
3. Memory bandwidth as the real bottleneck for local LLM inference
4. The "Centrino moment" analogy — Intel made Wi-Fi standard, Nvidia making local AI standard

## Sources
- Reuters (May 30, 2026): First Windows PC report
- WCCFTech (May 30): Computex preview with specs
- TechSpot (May 30): N1X debut article
- TechTimes: Hot Chips presentation details
- Barron's: Cryptic teaser analysis
- XDA Developers: Snapdragon X2 benchmarks
- How-To Geek: Snapdragon X2 laptop reviews

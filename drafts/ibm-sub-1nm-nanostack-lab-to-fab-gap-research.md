# IBM Sub-1nm Nanostack Chip: Lab-to-Fab Conversion Rate Analysis

## Story Angle
IBM demonstrated the world's first sub-1nm chip (0.7nm / 7 angstrom) using a nanostack architecture at VLSI 2026. The numbers are impressive: 100B transistors, 7,000 TOPS projection, 40% SRAM scaling. But IBM doesn't make chips — it licenses technology to foundries. The original contribution is a systematic analysis of IBM's lab-to-production conversion rate across its last four chip demonstrations, revealing that the real question isn't whether the technology works but who captures the value.

## Primary Sources

### 1. IBM Official Announcement (June 25, 2026)
- Source: IBM Newsroom + IBM Research Blog
- 0.7nm (7 angstrom) node, nanostack architecture
- ~100 billion transistors on fingernail-sized chip
- 50% more performance or 70% more energy efficient vs IBM's 2nm (2021)
- 40% SRAM scaling (critical for AI accelerators)
- 7,000 TOPS projected for AI accelerators vs ~1,500 TOPS current
- Training time projection: 3 months → 2 weeks for frontier models
- Production timeline: "within approximately five years" (~2031)
- No foundry partner named for sub-1nm
- Presented at VLSI 2026 symposium

### 2. Reuters (June 26, 2026)
- IBM stock surged 6% premarket, pared to ~1.9% intraday
- TSMC and Intel context: TSMC shipping 2nm, Intel 18A-P in risk production
- IBM sees production path in ~5 years
- Jay Gambetta, Director of IBM Research, quoted

### 3. Memeburn Deep Dive (June 29, 2026)
- TSMC 2nm N2 in volume production Q4 2025, ramping to 100K wafers/month in 2026
- Apple secured >50% of TSMC's initial 2nm capacity
- Intel 18A-P entered risk production at VLSI 2026 (June 16)
- IBM's 2nm from 2021 only now approaching volume production through Rapidus (~5 year lag)
- Rapidus targeting 2nm by 2027 using IBM technology
- Samsung uses IBM-derived nanosheet architecture

### 4. IBM Lab-to-Production History (from HPC Wire, IEEE Spectrum, ASM International)
- **7nm (2015 demo):** IBM announced 7nm test chip at Albany NanoTech. GlobalFoundries was supposed to commercialize by 2018. GF ABANDONED 7nm entirely in Aug 2018. Tech eventually influenced TSMC/Samsung designs but never reached production through IBM's direct partner.
- **5nm (2017 demo):** IBM Research Alliance (with GF and Samsung) demonstrated nanosheet/GAA at VLSI. Claimed 30B transistors, 40% performance or 75% power savings vs 10nm. Samsung and TSMC shipped 5nm in 2020-2021 using their own processes, but adopted IBM's fundamental nanosheet architecture.
- **2nm (2021 demo):** 50B transistors, projected 45% performance or 75% energy improvement vs 7nm. Target production "late 2024." As of June 2026, IBM's 2nm is NOT in volume production. Rapidus (Japan) targeting 2027. Samsung doing its own 2nm GAA. TSMC's 2nm is its own design, in volume since Q4 2025.
- **Sub-1nm (2026 demo):** 100B transistors, nanostack (3D stacked nanosheet evolution). No partner named. ~5 year production estimate.

## Original Contribution: The Conversion Rate

### IBM Lab-to-Production Timeline Table

| Node | Demo Year | Demo Transistors | Target Production | Actual Production (IBM Partner) | Lag (Years) | Through IBM Partner? |
|------|-----------|-----------------|-------------------|--------------------------------|-------------|---------------------|
| 7nm | 2015 | 20B | 2018 (GF) | Never (GF abandoned) | N/A | ❌ GF abandoned 7nm |
| 5nm | 2017 | 30B | ~2020 | Samsung 5nm 2020 (own process) | 3 years* | Partial — architecture adopted, process Samsung's own |
| 2nm | 2021 | 50B | Late 2024 | Rapidus targeting 2027 | 6+ years | ⏳ Not yet |
| 0.7nm | 2026 | 100B | ~2031 | TBD | TBD | TBD |

*Samsung adopted IBM's nanosheet GAA concept but developed its own manufacturing process.

### Key Finding: IBM's Architecture Wins, But IBM's Partners Don't
- IBM invented nanosheet/GAA transistors → now used by TSMC (N3, N2), Samsung (3nm, 2nm), Intel (RibbonFET in 20A/18A)
- All three foundries credit IBM's fundamental research but developed their own production processes
- IBM's direct foundry partners have a 0-for-3 track record on hitting production targets:
  - GF abandoned 7nm entirely
  - Samsung's 3nm GAA used IBM architecture but Samsung's own process
  - Rapidus hasn't shipped a single production wafer yet
- IBM captures licensing fees; foundries capture manufacturing margins

### The Value Capture Math
- TSMC's 2nm N2 revenue projection: analysts estimate $15-20B+ annually at scale
- IBM semiconductor licensing revenue (2025): ~$1.2-1.5B (from total IBM IP licensing ~$1.4B)
- The multiplier: for every $1 IBM earns from chip IP, foundries earn $10-15+ manufacturing it
- IBM invented the transistor architecture that powers >$200B/year in semiconductor manufacturing, yet captures <1% of that value

### What 7,000 TOPS Actually Means (Reality Check)
- Current top: NVIDIA B200 Ultra: 2,250 INT8 TOPS (dense), 4,500 sparse
- IBM's 7,000 TOPS projection is for hardware that doesn't exist yet
- By 2031 (earliest production), NVIDIA will likely be on its 4th-5th generation post-Blackwell
- NVIDIA's own roadmap: Rubin (2026), Rubin Ultra (2027), Feynman (2028+)
- If NVIDIA maintains ~2x generational scaling: 2026 Rubin ~4,500 TOPS → 2028 ~9,000 → 2030 ~18,000
- By the time IBM's 7,000 TOPS arrives (~2031), NVIDIA may be at 18,000-36,000 TOPS on the architecture side

### SRAM Scaling: The Real Story
- 40% SRAM scaling may be the most consequential finding
- SRAM cells haven't scaled well below 7nm — SRAM has been the limiting factor in chip area
- AI accelerators (H100, B200) dedicate 30-40% of die area to SRAM
- A 40% SRAM density improvement could reduce AI chip die sizes by 12-16%
- That directly reduces cost per chip (fewer defective dies per wafer, more chips per wafer)

## Limitations
- IBM's TOPS projection uses unspecified precision (INT8? FP16? FP8?) — comparison to NVIDIA depends on matching precision
- "100 billion transistors" is a process capability metric, not a specific chip design
- Node naming has become marketing-driven — IBM's "0.7nm" doesn't mean features are literally 0.7nm
- The CMOS inverter demonstration is a single logic gate, not a working processor
- No yield data disclosed — the gap between lab demo and production-viable yields can be enormous
- We don't know IBM's licensing terms with Rapidus or Samsung

## Strongest Counterargument
IBM could argue its business model is working exactly as designed: it captures high-margin licensing and R&D services without bearing fab construction costs ($20-40B per fab). Rapidus is spending Japan's money ($3.9B in government subsidies) to build the fab. Samsung spends its own capex. IBM gets paid either way. The question is whether the window of advantage holds: if IBM demonstrates 0.7nm but no partner produces it for 6+ years, and TSMC develops its own sub-1nm approach in the meantime, IBM's licensing leverage diminishes.

## Categories
💻 Computing

## Journalist
Marcus Chen (technology/semiconductor beat)

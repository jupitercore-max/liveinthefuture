# Research: IBM Nanostack Sub-1nm Chip — The Production Gap

## Topic
IBM unveiled the world's first sub-1nm chip (0.7nm / 7 angstrom node) using a "Nanostack" 3D architecture that vertically stacks and staggers nanosheet transistors. ~100 billion transistors on a fingernail-sized chip. IBM can't manufacture any of them — it sold its fabs in 2015.

## Primary Sources

### IBM Newsroom Press Release (June 25, 2026)
- URL: https://newsroom.ibm.com/2026-06-25-IBM-Unveils-Worlds-First-Sub-1nm-Chip-Technology
- IBM unveiled 0.7nm (7 angstrom) "Nanostack" 3D architecture
- Vertically stacks AND staggers nanosheet transistors
- ~100 billion transistors on fingernail-sized chip, ~2x density of IBM's 2nm (2021)
- Up to 50% more performance OR 70% greater energy efficiency vs 2nm
- VLSI 2026: 40% SRAM scaling demonstrated
- Experimentally validated: ultra-thin dielectric bonding, dual-channel engineering, functional CMOS inverter
- Each nanosheet ~5nm thick, ~9nm separation, 15 rows of silicon atoms per nanosheet
- Roadmap: decade of scaling ahead, path to 1 angstrom
- Production: ~5 years out
- Albany, NY research facility getting High NA EUV lithography tool (ASML)
- Partners: Lam Research, Tokyo Electron, SCREEN
- Papers: S. Reboh et al "NanoStack Transistor Architecture for CMOS 7A Node and Beyond" VLSI 2025; Chen Zhang et al "Area and Performance of Staggered-Channel Nanostack SRAM Bitcells" VLSI 2026

### The Register (June 25, 2026)
- URL: https://www.theregister.com/2026/06/25/ibm_sub_1nm_nanostack/
- Intel talked about 3D stacking in 2023 but hasn't implemented it
- Huawei has "LogicFolding" concept using two wafers fused together
- IBM's key innovation: staggering (offset) of upper transistor layer + single dielectric bonding
- Huiming Bu (VP Silicon Tech R&D, IBM): front/backside of each transistor contacted independently for signal and power
- Top/bottom FET channel materials optimized independently
- IBM nanosheet architecture already adopted by all leading foundries
- Currently helping Rapidus bring up 2nm in Japan

### Engadget (June 25, 2026)
- Rapidus aiming for 2nm at scale by H2 2027
- Makes IBM's 5-year estimate for nanostack production feel optimistic

## Context: Semiconductor Industry Roadmap
- TSMC: 2nm (N2) mass production late 2025; A14 (1.4nm) mass production 2028
- Intel: 18A (1.8nm) in risk production; 14A (1.4nm) timeline uncertain/deprioritized
- Samsung: 2nm in production; 1.4nm pushed to 2029
- IBM's 7A (0.7nm) is thus 2 full nodes ahead of anything planned for production

## Context: IBM Fab History
- IBM sold semiconductor manufacturing to GlobalFoundries in 2015
- IBM PAID GlobalFoundries $1.5 billion to take the fabs (not sold — paid to exit)
- Retained Albany, NY research lab
- IBM sued GF; settled January 2025
- IBM operates as research licensor (ARM-like model for chip tech)
- Now works with Rapidus (Japan) on 2nm commercialization

## Original Analysis: Research-to-Production Transfer Timeline

### IBM Architecture Innovations → Industry Adoption
1. Strained silicon (SiGe channels): IBM Research 2001 → AMD 90nm adoption 2004 = 3 years
2. High-k/metal gate: IBM Research alliance 2004 → Intel 45nm 2007 = 3 years; IBM/GF 32nm 2009 = 5 years → average 4 years
3. Nanosheet/GAA FET: IBM demonstrated 2017 → Samsung 3nm GAA June 2022 = 5 years
4. 2nm test chip: IBM May 2021 → Rapidus 2nm target H2 2027 = 6.5 years (if on schedule)

Pattern: 3 → 4 → 5 → 6.5 years. Transfer time is INCREASING.
Reason: manufacturing complexity grows with each node. EUV, then High-NA EUV, multi-patterning, new materials.

### Implied Nanostack Production Date
- If trend holds (adding ~1-1.5 years per generation): 7.5-8 years → production ~2033-2034
- IBM estimate: ~5 years (~2031)
- IBM's estimates historically ~1.5-2 years optimistic
- Realistic range: 2032-2034

### IBM's R&D ROI as Non-Manufacturer
- IBM R&D spend: ~$7.4B/year (2025 annual report), fraction allocated to semiconductor research
- Revenue model: licensing + collaborative research agreements
- IBM's nanosheet architecture adopted by ALL three leading foundries (TSMC, Samsung, Intel)
- Comparable model: ARM licenses CPU architecture, doesn't manufacture

## Journalist
Tomás Reyes — 💻 Quantum beat. Dense but clear, lives for benchmark data.

## Kicker
💻 Quantum

## Slug
ibm-nanostack-sub-1nm-production-gap

## Related Articles
1. chips-act-reshoring-scorecard — "The U.S. Spent $52 Billion to Reshore Chips. Here's the Report Card."
2. tsmc-cowos-ai-packaging-bottleneck — "TSMC Makes 3.65 Million AI Chip Modules a Year. The Industry Needs 5 Million."
3. neuromorphic-chip-energy-gap — "Your AI Glasses Need 300 Watts. This Chip Uses Half a Milliwatt."

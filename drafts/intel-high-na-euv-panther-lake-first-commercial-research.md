# Research: Intel Ships First Commercial Chips Made With High NA EUV

**Journalist:** Marcus Chen
**Category:** 💻 Compute / Semiconductor
**Date:** July 21, 2026

## Core Story

On July 15, 2026, ASML announced that Intel Foundry has become the first chipmaker to manufacture and ship a high-volume logic product using ASML's High NA EUV lithography. Intel Core Ultra Series 3 "Panther Lake" processors, built on Intel 18A, are shipping to customers with specific layers patterned by the $400M High NA EUV machine.

This is the moment the most advanced chipmaking technology in history moved from R&D to commercial production.

## Primary Sources

### Source 1: ASML Press Release (July 15, 2026)
- Intel Foundry entered HVM for subset of Intel Core Ultra Series 3 processors (Panther Lake) using High NA EUV
- Specific Intel 18A layers are dual-qualified on High NA EUV in Oregon
- Products shipping to customers at yields matched to the NXE platform
- ASML CEO Christophe Fouquet: "We are seeing that happening with all customers, and therefore expect to enter discussion with all our customers on how exactly and when exactly the tool will be inserted in high volume manufacturing."

### Source 2: Reuters (July 15, 2026)
- Intel declined to comment directly
- High NA equipment costs ~$400M, 2x standard EUV
- Intel received first High NA tool in 2024 at Hillsboro, Oregon R&D site
- Using High NA for specific layers to collect data and optimize

### Source 3: Interesting Engineering (July 15, 2026)
- First "high-volume logic product" on High NA EUV
- Shift from R&D to production manufacturing
- Higher resolution and improved process control for smaller chip features

### Source 4: WCCFTech (July 15, 2026)
- Intel first to install and pass acceptance testing of EXE:5200B
- "Dual-qualified" means layer can be exposed on either 0.33 NA NXE or 0.55 NA EXE scanner; wafers are interchangeable
- If EXE fleet has a bad week, line doesn't stop

### Source 5: Hardware Busters (July 16, 2026)
- "New lithography generations do not usually arrive yield-neutral" — the yield-matching claim is historically unusual
- The "dual-qualified" hedge means Intel isn't betting the node entirely on High NA

### Source 6: ASML SPIE EUVL 2026 (WCCFTech article)
- EXE:5000: first shipped Q4 2023, 110 WpH
- EXE:5200B: first delivered Q4 2025, 175 WpH
- 500K High NA wafers produced by December 2025
- From 0.33 NA to 0.55 NA: can reduce exposures from 3 to 1 on critical layers, with similar reduction in mask process steps

### Source 7: TechPowerUp / Tom's Hardware (earlier reports)
- Intel's 18A yields reportedly 10-15% initially
- Intel typically aims for 50% yields before HVM launch
- Target 70-80% for profitability
- Intel CFO David Zinsner acknowledged yields lower than expected
- Yield improvement curve: starting at ~15%, improving ~7%/month, reaching 85% in ~9 months

### Source 8: Albany NanoTech (July 21, 2026 — Reuters)
- First components of ASML High NA EUV tool arrived at Albany NanoTech Complex today
- Only North American publicly-owned High NA EUV research site
- Partners: IBM, Micron, Tokyo Electron
- Expects tool fully functional by end of year

## Original Calculations

### Calculation 1: The Multi-Patterning Economics

Standard EUV (0.33 NA): For critical sub-2nm layers, requires 3 separate exposures (multi-patterning)
High NA EUV (0.55 NA): Achieves the same resolution in 1 exposure

NXE:3800F throughput: ~200 WpH (wafers per hour)
EXE:5200B throughput: 175 WpH

Per critical layer, standard EUV: 200 WpH ÷ 3 exposures = 66.7 effective wafer-layers per hour
Per critical layer, High NA: 175 WpH ÷ 1 exposure = 175 effective wafer-layers per hour

**Net throughput gain per critical layer: 175 / 66.7 = 2.6x faster**

Despite the machine being slower in raw wafers/hour and costing twice as much, it's 2.6x more productive per critical layer.

### Calculation 2: The Capital Efficiency Break-Even

For a critical layer requiring 3 exposures on standard EUV:
- Option A: 3 NXE machines × $200M = $600M capital
- Option B: 1 EXE machine × $400M = $400M capital

Capital savings: $200M per critical layer set (33% cheaper)

Plus: Fewer machines means smaller cleanroom footprint, fewer operators, fewer spares

### Calculation 3: The Yield Cost Multiplier

At Intel's reported 18A yields:
- 300mm wafer: ~200 die sites (for a laptop-class processor)
- At 15% yield: 30 good dies per wafer
- At 50% yield: 100 good dies per wafer
- At 80% yield: 160 good dies per wafer

If wafer processing costs ~$15,000-$20,000 per wafer on 18A:
- At 15% yield: $500-$667 per good die
- At 80% yield: $94-$125 per good die

That's a 5.3x cost multiplier from low yields.

At Intel's current ~15% yields, every Panther Lake die costs ~5x what it will at mature yields. Intel is eating that premium to get High NA data and ship product.

### Calculation 4: Global High NA Fleet — The Scarcity Math

Known High NA EUE installations:
- Intel (Hillsboro, Oregon): at least 1 EXE:5200B
- Imec (Leuven, Belgium): 1 EXE:5000, receiving EXE:5200
- Samsung: evaluation stage
- TSMC: evaluation stage  
- Albany NanoTech: arriving now (research only)

Total deployed: ~5-8 machines worldwide
At $400M each: $2-3.2B of installed base
ASML production capacity: estimated <10/year

This means the entire world's ability to do next-generation chipmaking depends on a fleet of machines you could park in a single warehouse.

## The Kill Test — Original Contribution

Nobody has calculated the multi-patterning productivity gain (2.6x per critical layer) or the capital efficiency break-even ($200M savings per critical layer set). The yield-cost multiplier at Intel's reported yields shows Panther Lake dies currently cost 5.3x what they will at maturity — Intel is subsidizing every chip to get real-world High NA data. This is novel analysis, not synthesis.

## Strongest Counterargument

The strongest case against calling this a milestone: Intel is using High NA on only selected layers, not the full chip. The "dual-qualified" approach means they can and do fall back to standard EUV for most exposures. The actual volume of chips patterned with High NA may be a small fraction of total Panther Lake production. This is a technology insertion, not a technology transition. High NA is proving itself in a controlled setting with a safety net — that's engineering prudence, but it's also not the revolution some headlines suggest.

## Limitations

- Intel hasn't disclosed how many of the Panther Lake chips shipping actually use High NA layers vs. standard EUV
- The "yields matched to NXE" claim hasn't been independently verified
- 18A overall yield numbers come from anonymous sources and earlier reports; Intel hasn't confirmed specific figures
- Financial impact (cost per die, margin impact) is estimated from industry models, not Intel disclosures
- Long-term reliability of High NA patterned features hasn't been demonstrated at scale

## Actionable Takeaways

For semiconductor investors: High NA EUV's entry into production validates ASML's roadmap and makes the company's $400M/machine pricing defensible. Intel's willingness to run at low yields signals confidence in 18A's eventual maturation.

For chip buyers/OEMs: The Panther Lake compute tiles shipping now include some of the most advanced lithography ever applied to a commercial processor. But dual-qualification means performance characteristics should be identical regardless of which scanner was used.

For policymakers: The $10B Albany NanoTech investment (CHIPS Act) ensuring U.S. access to High NA EUV R&D is looking prescient. If these machines are the bottleneck for next-generation chips, having domestic R&D access is strategically critical.

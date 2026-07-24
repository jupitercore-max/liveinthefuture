# Research: Intel's Foundry Cross-Subsidy — The 95% Internal Revenue Problem

## Slug: intel-foundry-95-percent-internal-revenue-crossover-math

## Journalist: Kai Nakamura (Semiconductors & Computing)

## Category: 💻 Computing / Semiconductor

## Core Thesis
Intel just posted its strongest revenue growth in 15+ years. The stock is up 172% YTD. But the foundry business — the centerpiece of Intel's turnaround bet — generated $5.8B in revenue, of which $5.5B was Intel paying itself. External foundry revenue: $293M. That's 5.05% of total foundry revenue. Nobody in the earnings coverage is highlighting this number.

## Original Contribution (Kill Test)
**Novel calculation:** Intel Foundry's external operating margin. If you attribute the $2.1B operating loss proportionally to the $293M in external revenue, the implied external-customer economics are catastrophic. But the real question is different: What's the minimum external revenue Intel needs to justify the foundry as a standalone business vs. an internal cost center? We calculate the crossover point.

**Foundry breakeven trajectory:**
- Q1 2026 implied loss: ~$2.45B (Q2 loss $2.1B + $348M improvement)
- Q2 2026 loss: $2.1B
- Improvement rate: $348M/quarter
- Linear breakeven: ~6 quarters = Q4 2027
- But 18A cost reductions are accelerating: 50% in H1 2026, 20% more planned H2 2026
- Non-linear scenario: breakeven potentially Q2-Q3 2027

**The TSMC comparison nobody's doing:**
- TSMC N3 external revenue: massive, fully external
- Intel 18A external revenue: $293M (5% of total)
- TSMC gross margin: ~55%
- Intel Foundry operating margin: -36% (on total revenue) or -716% (on external revenue alone)

## Primary Sources

### 1. Intel Q2 2026 Earnings Release (Jul 23, 2026)
- Revenue: $16.1B (+25% YoY)
- Non-GAAP EPS: $0.42 (vs est. $0.22)
- GAAP operating margin: 11.1% (was -24.7%)
- Non-GAAP operating income: $2.77B (was -$503M loss)
- Cash from operations: $7.0B
- DCAI: $6.26B (+59% YoY, beat $5.37B est.)
- CCPG: $8.88B (+13%)
- Intel Foundry: $5.77B (+31%, beat $5.55B est.)
- **External foundry revenue: $293M**
- **Intersegment eliminations: -$5.5B**
- Foundry operating loss: $2.1B (improved $348M QoQ)
- GAAP net loss: $11.0B (Altera deconsolidation impact)
- Q3 guidance: $15.8-16.8B rev, 42% non-GAAP GM, $0.38 EPS
- Source: https://www.stocktitan.net/news/INTC/intel-reports-second-quarter-2026-financial-pvzxa6dckwjm.html

### 2. Intel Earnings Call Transcript (Jul 23, 2026)
- Dave Zinsner (CFO): Foundry loss improved $348M QoQ from "higher yields, improved cycle times, and increased factory scale across Intel 43 and 18A"
- 18A Panther Lake primary SKU cost down ~50% YTD, on track for additional 20% this year, "further meaningful reductions planned in 2027"
- 18A-P entered risk production
- 14A PDK 0.9 delivery target: October 2026
- 14A risk production: 2027
- 14A high-volume manufacturing: 2028
- Supply constraints: wafers, memory, substrates remain dominant challenge
- PC consumption expected down low double-digits percent for all 2026
- Q3 supply growth "more skewed towards end of Q3 and into Q4, especially for servers"
- Source: MarketBeat transcript

### 3. Reuters Reporting (Jul 23, 2026)
- Tesla confirmed as 14A customer for "Terafab" AI chip project
- Apple deal rumored (Trump announced in April) — neither company confirmed
- Fortinet announced as foundry customer for Security Processor 6
- Stock up 172% YTD despite -29% from June 22 ATH ($140.94)
- Trump admin holds 10% stake
- Source: https://www.reuters.com/business/intel-forecasts-upbeat-quarterly-revenue-profit-strong-ai-driven-server-chip-2026-07-23/

### 4. Barron's Coverage (Jul 24, 2026)
- 2026 Barron's stock pick
- CPU renaissance driven by agentic AI inference workloads
- Source: https://www.barrons.com/articles/intel-earnings-stock-price-a62f13e5

### 5. Gizmodo Analysis (Jul 24, 2026)
- Pat Gelsinger "pretty much ousted" December 2024
- Lip-Bu Tan took over March 2025
- Trump/admin "crucial in facilitating deals between Intel and Silicon Valley AI giants like SpaceX, Apple and Nvidia"
- CPU renaissance: CPUs "well-suited for tasks at the core of agentic systems like inference workloads"
- Source: https://gizmodo.com/ai-hype-delivers-intel-its-fastest-revenue-growth-in-15-years-2000790071

## Calculations to Run in Article

1. **External foundry operating margin:** $293M revenue / ($2.1B loss ÷ proportion) → implied margin
2. **Foundry breakeven timeline:** Linear ($348M/Q improvement) vs. accelerated (18A cost curve)
3. **Internal transfer pricing analysis:** $5.5B in intersegment elim suggests Intel Foundry charges Intel Products roughly $5.5B for wafers. What's the implied cost per wafer vs. TSMC's pricing?
4. **Tesla/Apple 14A revenue projection:** If Tesla ramps 14A in 2028, what's the implied external revenue contribution? Auto chips = high volume but lower ASP than data center.
5. **CHIPS Act subsidy dependency:** Intel received $8.5B in CHIPS Act subsidies. What fraction of the foundry's operating improvement comes from government money vs. operational execution?

## Strongest Counterargument
Intel's foundry is in the same position TSMC was in the early 2000s — internal customers (Intel Products) provide guaranteed volume that funds the ramp to attract external customers. Samsung Foundry followed the same playbook with Samsung's mobile division. The 95% internal revenue isn't a flaw in the business model; it's the business model. The question isn't whether external revenue is small today — it's whether Intel 18A and 14A are competitive enough to attract external customers at scale. Tesla's commitment to 14A suggests the answer is yes. The $293M number is a starting point, not a ceiling.

## Limitations
- Intel doesn't break out foundry capex separately from total Intel capex
- The $293M external foundry number may include some services/IP revenue, not just wafer fabrication
- Intersegment transfer pricing is opaque — Intel sets internal prices, so the reported revenue/loss split can be managed
- TSMC comparison is imperfect because TSMC doesn't have a products division to cross-subsidize
- We don't know what Tesla is paying for 14A wafers or what volume they committed to

## What You Can Do
- If you're an investor: understand that "Intel Foundry revenue" is 95% Intel paying itself. The external metric that matters is $293M, not $5.8B.
- If you're a chip designer: Intel's 18A cost reductions (50% in 6 months) suggest aggressive pricing to win external business. Get quotes now.
- If you're a policymaker: the CHIPS Act bet on Intel's foundry is effectively a bet that $293M in quarterly external revenue can grow 20-30x in 5 years. That's the scale required to justify the subsidy.

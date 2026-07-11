# Research: Fab2's "Fab Fab" — The Cost Inversion Nobody Ran

## Thesis
Jim Keller and Sam Zeloof's Fab2 (formerly Atomic Semi) is building a factory that mass-produces small, modular chip fabs — a "fab fab." The original calculation: comparing the cost-per-prototype-iteration at Fab2's model vs. conventional foundries reveals a time-value-of-silicon inversion that makes small fabs cheaper *per design cycle* even though they're dramatically more expensive *per transistor*.

## Core Sources

### Source 1: WebProNews — "Jim Keller's Fab2 Bet" (Jul 5, 2026)
- Atomic Semi rebranded as Fab2, moved HQ to Austin, TX
- Founded by Jim Keller (AMD K7/K8/Zen, Apple A4/A5, Tesla FSD chip, Intel) and Sam Zeloof (garage chipmaker, 300nm features)
- $15M seed round (2023), OpenAI Startup Fund led, $100M valuation
- Angels: Naval Ravikant, Nat Friedman, Fred Ehrsam
- Builds ALL equipment in-house: pumps, valves, gas lines, lithography, vacuum chambers
- "fab fab" concept: a factory that produces compact semiconductor fabs
- Austin: 120,000 sq ft (HQ, R&D, chip production)
- Lockhart, TX: 30,000 sq ft (fab fab itself)
- SF: 25,000 sq ft (original lab, reduced role)
- ~84 employees, 38 open roles
- Uses e-beam lithography (not EUV — precision on small areas, not full wafers)
- Target: chip prototypes in hours, not months
- Custom EDA platform "Studio" (in-browser, collaborative)
- NOT competing with TSMC at leading edge; targets prototyping, low-volume specialty, research, defense

### Source 2: Forgeeks — "Fab2 aims to build modular chip fabs" (Jul 5, 2026)
- Produces chips on smaller wafers with simpler setups
- Most fabs revolve around expensive 300mm wafers and huge production lines
- Fab2 shrinks footprint, costs, and launch time dramatically
- Tight coupling of equipment + software + workflows to avoid manual tuning issues
- Past attempts to cut chip manufacturing costs faltered due to manual tuning/inconsistent results

### Source 3: DIGITIMES — "Jim Keller startup Fab2 targets small-fab mass production" (Jul 6, 2026)
- Confirms rebrand and Texas move
- Core idea is mass-producing small fabs, not just making chips

### Source 4: Tom's Hardware (TSMC wafer pricing history, via SeekingAlpha)
TSMC rumored wafer quotes (300mm):
| Node | Price | Year |
|------|-------|------|
| 90nm | $2,000 | 2004 |
| 40nm | $2,600 | 2008 |
| N28  | $3,000 | 2014 |
| N10  | $6,000 | 2016 |
| N7   | $10,000 | 2018 |
| N5   | $15,000-16,000 | 2020 |
| N3   | $18,000-20,000 | 2022 |
| N2   | $30,000 | 2025 |
| A16  | $45,000 | 2026 H2 |

### Source 5: EE Times — "TSMC Price Hikes End the Era of Cheap Transistors" (Jun 17, 2026)
- For the first time in a major node transition, cost per transistor is RISING
- 2nm wafers: $30,000+ per 300mm wafer (50% increase over N3)
- Structural shift: access to pinnacle semiconductor tech is now a "premium, non-negotiable service"
- This permanently raises cost basis for foundational components of digital economy

### Source 6: IBS Consulting (via PhoneArena)
- Cost to build a 2nm fab producing 50,000 wafers/month: $28 billion
- Each 300mm wafer can produce 300-400 chips

### Source 7: Industry mega-fab costs (multiple sources)
- TSMC Arizona: $40-65B total investment (3 fabs)
- Samsung Taylor, TX: ~$25B+
- Intel Ohio: $28B (later expanded to $100B+)
- SK Hynix: $26.5B IPO to fund new Korean fabs
- South Korea national plan: $591B total semiconductor investment
- Construction time: 3-5 years per fab
- CHIPS Act total: ~$39B in direct incentives to mega-fabs

### Source 8: FXStreet — Citi Robotics Conference (Jul 2026)
- ~$20B has gone into physical AI (including robotics) over past 2 years
- Roughly corroborates the industry appetite for specialized chips

## Original Calculation: Time Value of Silicon

### The setup
Standard foundry turnaround (shuttle/MPW):
- TSMC multi-project wafer: 8-16 weeks from tape-out to packaged parts
- Full custom run: 3-6 months
- Design iteration with fab spin: typically 3 spins × 4 months = 12 months minimum

Fab2's target: Hours to days per iteration.

### The math nobody ran
**Scenario: A chip startup doing 5 design iterations**

**Path A: TSMC shuttle (N28, cheapest viable node)**
- Cost per MPW run: ~$30,000-50,000 (shared wafer)
- Turnaround: 12-16 weeks per spin
- 5 iterations: $150,000-250,000 over 15-20 months
- Engineer salary burn (3-person team at $200K fully loaded): $750,000-$1,000,000
- Total cost of iteration: ~$1M-1.25M
- Calendar time: 15-20 months

**Path B: Fab2 mini-fab (estimated, older node ~180nm-300nm)**
- Cost per iteration: Unknown, but e-beam on small die + small wafer = significantly cheaper per run
- Turnaround: Hours to days (let's use 48 hours conservatively)
- 5 iterations: 10 days (250 hours)
- Engineer salary burn: ~$8,000 (10 working days)
- Even if each Fab2 run costs $10,000-20,000: total = $50,000-100,000 + $8,000 = $58,000-108,000
- Calendar time: 2-4 weeks

**The inversion:** Even at a dramatically higher cost-per-transistor, Fab2's model is 10-20× cheaper *per design cycle* because the salary burn during wait time dominates.

### Second calculation: What $15M buys in each model

**Mega-fab:** $15M is 0.05% of a $28B fab. It buys approximately nothing — not even the permits.

**Fab2 mini-fabs:** If a mini-fab costs $1-5M to build and deploy (estimated from their facility sizes and team), $15M buys 3-15 deployable fabrication units. Each one produces prototype chips independently.

### Third calculation: CHIPS Act reallocation thought experiment

$39B in CHIPS Act incentives → mega-fabs that take 3-5 years to build, serving primarily high-volume production.

If 1% ($390M) went to mini-fab programs at $5M per unit: 78 distributed fabrication units across the US. Each university/defense lab/national lab could have one. Prototyping capacity goes from months to hours, nationwide.

## Limitations
- Fab2 has NOT disclosed pricing, yield data, or process node capabilities
- E-beam lithography is inherently slow for production (writes one die at a time)
- Small wafer = limited dies = not for production at any scale
- The comparison is prototyping vs. production — Fab2 doesn't replace TSMC, it replaces the MPW shuttle bottleneck
- Zeloof's garage results were at 300nm — competitive silicon starts at 65nm for many applications
- No independent verification of "hours" turnaround claim

## Strongest Counterargument
The best case against Fab2: e-beam lithography on small wafers is a science fair project, not a business. Every previous attempt to build "small fabs" — including DARPA's SHARDS program, SkyWater's 90nm open-source PDK, and academic clean rooms — has produced research curiosity, not commercial products. The economics of chipmaking are brutal: yields improve with volume, and e-beam's serial nature means throughput is fundamentally capped. Fab2 can iterate fast, but iteration without a path to volume production is expensive R&D theater. The real question isn't whether Fab2 can make chips in hours — it's whether the chips it makes in hours can DO anything that matters commercially.

## Kicker
💻 Quantum / Semiconductor

## Journalist
Tomás Reyes — hardware, engineering, industrial tech beat. Underused in recent rotation.

# Research: The Orbital Data Center Race

## Headline Concept
"In 90 Days, Five Companies Asked to Put 1.1 Million Data Centers in Orbit. Earth Has 16,000 Satellites."

## Kicker
🚀 Space

## Journalist
Elena Vasquez — Energy & Infrastructure

## Kill Test
- Would a reader stop scrolling? YES. The sheer number (1.1 million new satellites) vs current orbital population (16,000) is jaw-dropping.
- Has LITF covered this? NO. #316 covered LEO collision risk (CRASH Clock), but no orbital data center coverage.

## 10-Star Test
This is a "holy shit" moment in space infrastructure. Multiple billionaires racing to carpet low Earth orbit with compute hardware in a 90-day window. Passes easily.

## Novel Contribution
1. **Aggregate math nobody ran:** Add up ALL FCC filings from Jan-March 2026: SpaceX (1M) + Blue Origin (51,600) + Starcloud (88,000) + Orbital Inc (10,000) + Google Suncatcher (81 prototype) = ~1,149,681 satellites proposed. Current active satellites: ~16,000. That's a 72x increase requested in a single quarter.
2. **Power calculation:** SpaceX AI Sat Mini = 100kW each. 1M satellites = 100 GW of orbital compute power. IEA estimates global data center power consumption at ~50-60 GW (2025). SpaceX alone proposes nearly 2x all terrestrial data center power.
3. **Launch mass/cost calculation:** AI Sat Mini is 170+ meters long. Conservative estimate: 10 tons each. 1M satellites = 10 billion kg. At Starship target $200/kg = $2 trillion in launch costs. At current rates ~$1,500/kg = $15 trillion. Just for SpaceX's proposal alone.
4. **Reentry rate:** 1M satellites with 5-year lifespan = 200,000 reentries/year = 548/day = 1 every 2.6 minutes. Each vaporizes aluminum and metals into upper atmosphere.
5. **The tell:** SpaceX's own April 2026 pre-IPO filing says orbital AI compute "may not achieve commercial viability."

## Primary Sources (3+)
1. **SpaceX FCC filing** (Jan 2026) — 1M satellite application for orbital data centers. Reuters reported.
2. **Blue Origin FCC filing** (March 2026) — Project Sunrise, 51,600 satellites. NASA objected (May 2026). SpaceNews coverage.
3. **Google Project Suncatcher** (Nov 2025 preprint, Bloomberg May 2026) — 81-satellite clusters, Trillium v6e TPUs radiation tested at 3x mission dose, 1.6 Tbps optical links bench tested. Planet Labs partnership for 2027 prototype.
4. **Anthropic-SpaceX deal** (May 6, 2026) — Anthropic buying Colossus 1 capacity (300MW terrestrial), expressed interest in "multiple gigawatts of orbital AI compute." SpaceNews.
5. **SpaceX pre-IPO filing** (April 2026) — warned investors orbital AI compute "may not achieve commercial viability." Reuters.
6. **Starcloud** — YC-backed, $170M Series A at $1.1B (March 2026). First H100 GPU in orbit (Nov 2025). Plans up to 88,000 satellites. SpaceNews.
7. **Cathie Wood/ARK Invest** — projects $160B revenue for SpaceX orbital datacenters.
8. **John Barentine** (astronomer) — simulations showing satellite visibility impact. Space.com.
9. **Eloise Marais** (UCL atmospheric chemistry) — atmospheric pollution from reentries. CBC.
10. **Aaron Boley** (UBC Outer Space Institute) — orbital environment transformation. CBC.
11. **Gwynne Shotwell** — "I don't know that we'll get to a million." Time.
12. **IEEE Spectrum** — Orbital Inc. 10,000 satellites, 2027 test launch.

## Key Data Points
- SpaceX: 1,000,000 satellites filed (Jan 2026)
- Blue Origin: 51,600 satellites filed (March 2026) 
- Starcloud: 88,000 satellites planned
- Google Suncatcher: 81-satellite prototype clusters
- Orbital Inc: 10,000 satellites, 2027 test
- Total proposed: ~1,149,681 satellites
- Current active satellites: ~16,000
- AI Sat Mini: 100 kW each, 100 sq meter radiator, 170+ meters long
- Starship required for deployment
- SpaceX Terafab: 1 TW of specialized chips/year target (50x current global output)
- D3 chip: radiation-hardened, runs hotter
- Google TPU radiation test: 2 krad(Si) HBM irregularity threshold (3x the 5-year mission dose)
- Google optical link: 1.6 Tbps bench tested
- Anthropic growing at 80x annual rate
- 1,000+ public FCC comments, most opposed
- NASA opposes Blue Origin's Project Sunrise

## Strongest Counterargument
SpaceX is the most experienced satellite operator on Earth (10,000+ Starlink satellites), has its own launch vehicles, and is building its own chip fab. If anyone can do this, it's SpaceX. The physics of solar power in orbit are real: 8x the ground-level solar flux, no night, no weather. And terrestrial data center constraints are real too: water scarcity, grid capacity, NIMBY opposition, permitting delays. The question isn't whether space compute is theoretically superior — it's whether the launch economics can close the gap before the terrestrial problems get solved by nuclear, geothermal, or efficiency gains.

## Limitations
- Exact satellite mass for SpaceX AI Sat Mini not publicly confirmed; 10-ton estimate based on 170m length scaled against known spacecraft
- Starship's actual cost-per-kg to LEO is unproven at scale; $200/kg is aspirational
- Blue Origin and Starcloud have not disclosed per-satellite power or compute specifications
- Google Suncatcher optical link performance is bench-tested only, not verified in orbit
- Atmospheric pollution models from reentries are early-stage; we don't have empirical data on million-satellite-scale metal deposition
- FCC filings are applications, not commitments; Gwynne Shotwell herself says the full million may not fly

# Research Notes: Tesla Cybercab Self-Certification vs Safety Record

## Slug: tesla-cybercab-self-certifies-crash-rate-nine-times-human

## Thesis
Tesla's Cybercab bypasses the 2,500-unit NHTSA exemption cap by self-certifying under standard FMVSS — the same process used by every Camry and F-150. But its supervised robotaxi fleet crashes 9× more often than human drivers. The federal safety framework tests the box, not the brain. As production scales without limit, injuries scale with it.

## Kill Test
- ✅ Fresh data: Cybercab production confirmed April 23, 2026; NHTSA crash data released April 20, 2026; Waymo 170M mile safety update March 19, 2026
- ✅ Data-rich: crash rate per mile, fleet comparisons, production caps
- ✅ Novel angle: nobody has analyzed the self-certification loophole as a systemic regulatory gap
- ✅ Not covered: #240 was about Waymo's 2,500 cap vs Tesla's unlimited fleet — this focuses on the certification architecture, not fleet size

## 10-Star Test
"Tesla's robotaxi crashes 9× more than a human driver. It passed every federal safety standard." — That's a headline people will share. The cognitive dissonance is the hook.

## Novel Contribution
Original analysis: FMVSS tests crashworthiness (bumpers, airbags, structural integrity), not software decision-making. A vehicle can ace every FMVSS test and still be catastrophically unsafe when driven by bad software. This is the first article to frame the self-certification pathway as a systemic regulatory gap for autonomous vehicles.

## Primary Sources

### 1. NHTSA Standing General Order Crash Data
- Tesla reported 9 robotaxi crashes between July-November 2025
- All in geofenced Austin area with safety monitors present
- Crash types: right-turn collisions, construction zone hit, cyclist collision, fixed object (minor injury), backing collision, animal strike at 27 mph
- All crash narratives redacted by Tesla in NHTSA database
- Source: https://www.nhtsa.gov/laws-regulations/standing-general-order-crash-reporting#data

### 2. Tesla Q4 2025 Earnings / Q1 2026 Earnings Call
- ~500,000 cumulative robotaxi miles by Nov 2025
- 9 crashes ÷ 500K miles = 1 crash per ~55,000 miles
- Human benchmark: 1 crash per ~200,000-500,000 miles depending on metric
- Using police-reported only: Tesla 9× worse than humans
- Using all crashes (including non-reported): Tesla ~3-4× worse
- Musk on Q1 call: "We have just started production of Cybercab"
- FSD unsupervised timeline: "probably Q4" 2026
- Source: Electrek, EVFY analysis

### 3. Tesla Cybercab FMVSS Self-Certification (April 2026)
- VP Lars Moravy confirmed Cybercab NOT subject to 2,500-unit exemption cap
- Vehicle designed to comply with ALL existing FMVSS standards
- Same self-certification process as every mass-market car
- Federal compliance stickers visible in drone footage from Giga Texas
- No steering wheel version also being produced
- Source: Electrek, April 23, 2026

### 4. Waymo Safety Impact Update (March 19, 2026)
- 170M+ fully autonomous miles (no safety monitor)
- 92% fewer crashes causing serious/fatal injuries vs human drivers
- 83% fewer airbag-deployment crashes
- 82% fewer any-injury crashes
- 4M miles per week current scale
- Preventing ~1 serious-injury crash every 8 days
- Source: https://waymo.com/blog/shorts/waymo-safety-impact-update-170m/

### 5. SELF DRIVE Act (January 2026)
- Proposed by Reps. Bob Latta and Debbie Dingell
- First federal statute dedicated to AV safety
- Would incorporate SAE automation levels 3-5
- Requires "safety case" but self-certification (no pre-approval)
- Would raise exemption cap from 2,500 to 90,000 units
- NHTSA would create new FMVSS by Sept 2027
- Source: https://d1dth6e84htgma.cloudfront.net/03_H_R_SELF_DRIVE_Act_c6810113bc.pdf

### 6. Leadership Exodus
- Victor Nechita (vehicle program manager) — left Feb 2026, days after first unit
- Thomas Dmytryk (OTA/ride-hailing director) — left after 11 years
- Mark Lupkey (assembly leader) — left March 2026
- No original program managers remain for any Tesla production vehicle
- Source: Electrek

## Key Numbers for Article
| Metric | Tesla Robotaxi | Waymo | Human Drivers |
|--------|---------------|-------|---------------|
| Miles driven | ~500K | 170M+ | — |
| Safety monitor | Yes (always) | No | N/A |
| Crash rate (any) | 1 per 55K mi | 82% fewer than human | 1 per 200K-500K |
| Serious crash rate | Unknown (redacted) | 92% fewer than human | ~1.26 deaths/100M mi |
| Production cap | None (self-certified) | 2,500 (exemption) | N/A |
| Fleet transparency | All narratives redacted | Full public reporting | — |

## Strongest Counterargument
Tesla's fleet is young (500K miles vs Waymo's 170M). Early-stage AV deployments inherently have higher incident rates as software learns. The S-curve argument: FSD improves exponentially with data, and Tesla's camera-only approach could eventually outperform lidar-dependent systems at lower cost per vehicle. Also, FMVSS compliance is genuinely valuable — Cybercab passengers ARE protected in a crash, even if the software causes more crashes. Crashworthiness matters.

## Limitations
- Tesla redacts all crash narratives, so severity comparison is impossible
- "9× worse" uses police-reported human baseline, which underestimates human crashes
- Using all-crash estimates, the gap narrows to 3-4×, which is still significant
- Waymo operates in different geographies (SF, LA, Phoenix) vs Tesla's Austin geofence
- No data on near-misses or safety monitor interventions for either company

## Journalist
Kai Nakamura — Transport & Autonomous Vehicles beat (last article: #240)

## Article Number: 252

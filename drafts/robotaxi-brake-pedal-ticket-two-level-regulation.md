# Research Notes: The Federal Brake Pedal and the California Ticket

## Slug: robotaxi-brake-pedal-ticket-two-level-regulation
## Category: 🚗 Transport
## Journalist: Kai Nakamura

## Thesis
On June 26, 2026, NHTSA proposed dropping brake pedal requirements for purpose-built robotaxis. Three days later, on July 1, 2026, California AB 1777 takes effect, giving police the power to cite autonomous vehicles for traffic violations for the first time. These two moves look contradictory — federal deregulation meets state enforcement crackdown — but together they form a coherent two-level regulatory framework: the feds stop telling you HOW to build a car; the states start holding you accountable for HOW it drives. Nobody has articulated this framing.

## Original Contribution (Kill Test)
1. **Fleet utilization calculation**: Waymo's 500,000 rides/week ÷ 3,871 vehicles = 129 rides/vehicle/week = ~18.4 rides/vehicle/day. Compare to NYC taxi (~26 trips/day) and Uber drivers (~3-4 trips/day).
2. **The 2,500 cap resolution math**: Prior LITF article (#? cybercab paradox) noted Tesla was capped at 2,500 Cybercabs/year under FMVSS exemption rules. The new brake pedal proposal eliminates this bottleneck entirely — if brake pedals aren't required, purpose-built robotaxis can self-certify under FMVSS like any other car, no exemption needed. This changes the deployment math from 2,500/yr to unlimited.
3. **The enforcement gap calculation**: AB 1777 requires 30-second emergency phone response, 2-minute geofencing compliance, 72-hour citation reporting. Waymo already has ~70 remote assistants for ~3,000 vehicles (1 assistant per ~43 vehicles). The law's requirements are already within Waymo's operational envelope. Tesla's robotaxi operation — with teleoperators who "in some rare cases, move the vehicles remotely at low speeds" — faces steeper compliance costs.
4. **Two-level framework analysis**: Federal = hardware agnostic (prescriptive → performance-based). State = behavior accountable. This is actually how aviation works: FAA certifies the aircraft design, but the NTSB and individual airports enforce operational rules. Nobody has drawn this parallel for ground autonomy.

## Primary Sources
1. **NHTSA Proposed Rulemaking (NHTSA-2026-0728)** — Published June 26, 2026. Proposes modifying FMVSS 135 to eliminate manual brake and parking brake requirements for ADS-only vehicles. Comments open through July 27.
2. **California AB 1777** — Signed by Governor Newsom Oct 2024, effective July 1, 2026. Authored by Assemblymember Phil Ting (D-San Francisco). Creates framework for police to issue "notices of autonomous vehicle noncompliance."
3. **Waymo Safety Impact Dashboard (waymo.com)** — Through Dec 2025: 170.7 million rider-only miles, 92% fewer serious injury crashes vs human benchmark. All-location serious injury rate: 0.02 IPMM vs 0.22 benchmark.
4. **Waymo Wikipedia / TechCrunch data** — As of June 2026: 3,871 robotaxis in service, 500,000 paid rides/week, 10 US metro areas, 200 million autonomous miles.
5. **Reuters (June 26, 2026)** — NHTSA also withdrew Biden-era voluntary AV framework same day.
6. **The Register** — NHTSA staffing: DOGE cut 4% of staff, disproportionately targeting AV regulation staff. Even Tesla managers called it "sheer madness."
7. **Science paper (PubMed PMID: 40378124)** — Peer-reviewed analysis: Waymo 82% fewer injury crashes, 92% fewer serious injury crashes over 56.7M miles through Jan 2025.
8. **UNECE (June 2026)** — Adopted first global regulatory framework for fully driverless cars. Vote at 199th WP.29 session.
9. **Electrek data** — Tesla operating ~44 robotaxis in Austin, $0.81/mile vs Waymo's $1.36-$1.43, 15-min avg wait times.
10. **Kern County Sheriff training bulletin** — Detailed AB 1777 provisions for law enforcement training.

## Key Data Points
- Waymo fleet: 3,871 vehicles, 500K rides/week, 10 cities, $126B valuation after $16B raise (Feb 2026)
- Tesla robotaxi: ~44 vehicles in Austin, expanded to Houston/Dallas in April, most rides still have safety drivers
- Waymo safety: 0.02 serious injuries per million miles vs 0.22 human benchmark (91% reduction)
- NHTSA AV staff: Cut 4% by DOGE, disproportionately hitting AV regulation staff
- AB 1777 requirements: 30-sec phone response, 2-min geofence compliance, 72-hr citation reporting, 24-hr collision reporting
- 2,500 vehicle/yr exemption cap: unchanged since FMVSS was written for human drivers
- Waymo remote assistants: ~70 people monitoring ~3,000 vehicles, half US-based, half Philippines
- Global AV market: <$1B revenue 2026, projected $168B by 2035 (Counterpoint)

## Strongest Counterargument
The "two-level framework is smart" thesis assumes both levels work independently. But the NHTSA brake pedal removal and the DOGE staff cuts happened at the same agency. If NHTSA can't enforce its own performance-based standards (because the staff that would do it was fired), then removing prescriptive rules isn't shifting to a "smarter" framework — it's just deregulation with no replacement enforcement. California's AB 1777 only covers California. The other 49 states get the hardware deregulation without the behavioral accountability.

## Limitations
- NHTSA proposal hasn't been finalized — it's a notice of proposed rulemaking, comment period through July 27
- AB 1777 has no defined financial penalties for accumulated noncompliance — enforcement teeth are TBD
- The fleet utilization calculation uses Waymo's self-reported ride/vehicle numbers, which may include deadheading/repositioning
- The DOGE staffing cut numbers come from press reports, not official NHTSA disclosure
- We don't have AB 1777 citation data yet — the law hasn't taken effect

## Related LITF Articles
- "The Safest Autonomous Fleet Is Capped at 2,500 Cars. The Least Safe One Has No Limit." (Kai Nakamura, April 24, 2026) — This new article is essentially the sequel: the NHTSA brake pedal proposal would resolve the paradox that article identified.

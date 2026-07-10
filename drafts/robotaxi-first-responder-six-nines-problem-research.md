# Research: The Robotaxi First Responder Six-Nines Problem

## Thesis
NHTSA is right to be alarmed about robotaxis interfering with first responders, but the real story is worse than anyone in the letter acknowledges. The math shows that even an extremely reliable system becomes a public safety crisis at the fleet sizes Goldman Sachs projects by 2030. Getting to "acceptable" requires six nines of reliability — a standard no software system in history has sustained in adversarial real-world conditions.

## Primary Sources

### 1. NHTSA Administrator Morrison Letter (July 9, 2026)
- Jonathan Morrison, NHTSA Administrator, issued open letter to AV industry
- Documented "clear pattern" of AVs driving into active emergency scenes, blocking ambulances/firefighters, failing to recognize flashing lights, flares, smoke, fire, traffic cones
- Called it "unacceptable" — "an AV that cannot safely interact with first responders is a danger to the general public"
- Rejected industry framing as "edge cases" — emergency scenes are neither rare nor extreme
- Scheduling meetings with each AV developer by end of July 2026
- Threatened enforcement action for companies that don't address concerns
- Sources: WSJ, Reuters, CarBuzz reporting July 9-10, 2026

### 2. Waymo Fleet & Operations Data
- Fleet: ~4,000 vehicles (WSJ, July 2026), ~3,000 operational (World At Net estimate)
- Rides: 500,000+ paid rides/week (Waymo X post, confirmed by Sherwood News)
- Miles: 4 million autonomous miles/week (Dolgov, Stripe interview March 2026)
- Cumulative: 20 million+ lifetime rides, 171 million cumulative miles (end 2025)
- Cities: Now in 11 US cities, announced expansion to Denver, Las Vegas, San Diego, Tampa (4 more) — WSJ July 2026
- London and Tokyo planned for international expansion
- Targeting 1 million paid rides/week by end of 2026 (CEO Tekedra Mawakana, Bloomberg Feb 2026)
- Valuation: $126 billion post-money (Feb 2026 fundraise, $16 billion raised)
- Hyundai potential supply: 50,000 vehicles (reports)

### 3. Waymo Emergency Vehicle Interaction Data (KEY STAT)
- Waymo spokesperson told CarBuzz: company "appropriately interacts" with active emergency vehicles **more than 50,000 times per week in California alone**
- Waymo has trained more than 35,000 first responders on how to interact with its vehicles
- Source: CarBuzz, July 2026

### 4. Goldman Sachs Robotaxi Projections
- By 2030: total US commercial robotaxi fleet = 62,800 vehicles
- Market size: ~$19 billion
- Source: Goldman Sachs, cited by WSJ July 2026

### 5. NHTSA Standing General Order Crash Data
- Third amended SGO effective June 16, 2025
- Tesla ADS (robotaxi): 17 unique incidents from July 2025-March 2026 in Austin testing
  - All 2026 Model Y with safety monitor present
  - 13 property damage only, 2 no injury, 1 minor, 1 minor with hospitalization
  - Many were rear-endings by human drivers
- Tesla FSD investigation: 29 million vehicles, 14 crashes/fires from several dozen incidents, 23 injuries
- Source: Electrek, NHTSA.gov, NBC Palm Springs

### 6. Waymo 4th of July 2026 Incidents
- San Francisco: robotaxi drove directly over illegal fireworks in street
- Multiple Waymo vehicles stuck in post-fireworks traffic for hours, some batteries died
- Separate unoccupied Waymo drove over firework and caught fire
- Waymo drove into floodwaters in Atlanta (separate incident)
- Entered active police scene in Los Angeles (2025)
- Source: NBC Palm Springs, CNBC, Washington Examiner

### 7. National Emergency Response Statistics
- US fire department responses 2024: ~37.5 million total (NFIRS/USFA)
  - EMS and Rescue: 65.1% of all responses
  - Fires: 3.7%
  - False alarms: 8.0%
  - Good intent: 11.8%
- NEMSIS 2024: 60,298,684 total EMS activations nationally, 54 states/territories participating
  - 36,367,261 treated and transported 911 responses
- Fires: 1,388,000 in 2024 (NFPA)
- Total emergency vehicle runs requiring active road response: estimated 30-40 million per year

### 8. Emergency Response Timing Impact
- Cardiac arrest: survival drops 7-10% per minute of delay (AHA)
- Structure fire: flashover in 5-8 minutes; each minute of delay increases property damage
- NFPA Standard 1710: fire response within 4 minutes turnout + 4 minutes travel for first arriving unit
- Average EMS response time: 9-14 minutes (varies by city, 90th percentile data)

### 9. California DMV AV Regulations (July 2026)
- New rules allow police to ticket driverless cars
- Manufacturers can now apply for permits to test heavy-duty AVs (freight trucks) on CA highways
- Source: NBC Palm Springs

### 10. Industry Competition Context
- Tesla: robotaxi in Austin, Dallas, Houston, now Miami (July 2026); fleet in dozens
- Zoox (Amazon): live in Las Vegas and SF; waitlist in Austin, Miami; Dallas/Phoenix testing
- Zoox redesigned vehicle with two-way audio for first responder communication
- Baidu Apollo Go: 3,500 vehicles in China, 250,000+ weekly rides
- MoffettNathanson: Waymo 0.8% ride-hail market share (end 2025), projected 4% by end 2028

## Original Calculation: The Six-Nines Problem

### Emergency Encounter Rate Per Vehicle
- Waymo's 50,000+ emergency interactions/week in California alone
- Waymo has ~4,000 total vehicles; California (SF + LA) likely has ~1,500-2,000
- Estimate: 2,000 CA vehicles
- Rate: 50,000 encounters / 2,000 vehicles = 25 encounters/vehicle/week = 3.6/day
- Per-mile: ~2M miles/week in CA → 1 encounter per 40 city-miles

### Scaling to Goldman's 2030 Fleet
- 62,800 vehicles × 1,000 miles/vehicle/week = 62.8M miles/week
- Assuming similar urban density deployment:
  - 62.8M miles / 40 miles per encounter = 1.57M encounters/week
  - = 81.6M encounters/year nationally

### Failure Rate Requirements
| Success Rate | Annual Failures | Daily Failures | Assessment |
|---|---|---|---|
| 99% (two nines) | 816,000 | 2,236 | Catastrophic |
| 99.9% (three nines) | 81,600 | 223 | Unacceptable |
| 99.99% (four nines) | 8,160 | 22 | Still dangerous |
| 99.999% (five nines) | 816 | 2.2 | Problematic |
| 99.9999% (six nines) | 82 | 0.22 | Approaching acceptable |

### To get below 1 failure per day nationally:
- Need < 365 failures / 81.6M encounters = 0.000447% failure rate
- That's 99.9996% success — between five and six nines
- No deployed software system has sustained this reliability in adversarial, unstructured real-world conditions

### What one failure costs:
- A 60-second delay in cardiac arrest response: 7-10% survival reduction
- At ~350,000 out-of-hospital cardiac arrests/year in the US, even a tiny fraction being delayed by AVs = real deaths
- A blocked fire truck route: additional $10,000-$100,000 in property damage per minute of delay (varies by structure)

### Context: Software reliability benchmarks
- AWS S3: 99.99% availability (four nines) — allows ~52 minutes downtime/year
- Google Cloud: 99.95-99.99% SLA for most services
- Commercial aviation: ~99.99999% per flight hour (seven nines) — but achieved through decades of regulation, redundancy, and controlled environments
- The difference: aviation operates in controlled airspace with standardized protocols. Robotaxis operate in the most adversarial, unstructured environment imaginable — American city streets.

## Kill Test
**Original calculation:** Cross-referencing Waymo's 50,000 weekly emergency encounter stat with Goldman Sachs fleet projections to derive the reliability requirement for acceptable first responder safety at scale. Nobody has run this math — the 50,000/week stat has been quoted but never projected forward against fleet growth curves. The "six nines" framing is novel.

**Novel analysis:** The insight that Waymo's 50,000 encounters/week actually demonstrates *good* current performance but reveals an impossible scaling problem is counterintuitive and original.

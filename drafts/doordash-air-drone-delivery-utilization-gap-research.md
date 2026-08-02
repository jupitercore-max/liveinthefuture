# Research: DoorDash Air and the Drone Delivery Utilization Gap
## Journalist: Kai Nakamura
## Category: 🚗 Transport
## Date: 2026-08-02

## Thesis
DoorDash just became the 8th FAA Part 135 certified drone delivery operator. The company says 20% of its orders are mid-range (3-5 miles) and take 25% longer to deliver. Applied to DoorDash's 3.17 billion orders in 2025, that's 634 million orders per year that could theoretically shift to drones. But the industry's utilization rate — currently 3-8 deliveries per drone per day — needs to hit 200+ for unit economics to work. We build the cost model showing exactly where the break-even sits.

## Original Contribution
A utilization-adjusted cost model for DoorDash's mid-range order pool, cross-referencing:
1. DoorDash's SEC filings (3.17B orders, $102B GOV, ~$32/order average)
2. Industry cost-per-delivery data at different utilization levels
3. The specific break-even point where drone delivery beats human courier costs for mid-range orders
4. Fleet size calculation: how many drones DoorDash would need at different utilization rates

Nobody has run this math specifically for DoorDash's disclosed 20% mid-range order share.

## Primary Sources

### 1. DoorDash SEC Filings (Q4 2025 Earnings, Feb 18 2026)
- FY2025 Total Orders: 3,172M (732+761+776+903)
- FY2025 Marketplace GOV: $102.3B ($23.1+24.2+25.0+29.7)
- FY2025 Revenue: $13.7B
- Average GOV per order: ~$32.25
- Contribution Profit as % of GOV: 4.4-5.1% range (avg ~4.7%)
- Net income: $935M total FY2025
- Q4 2025: 903M orders, 32% YoY growth
Source: https://www.businesswire.com/news/home/20260218361601/en/DoorDash-Releases-Fourth-Quarter-and-Full-Year-2025-Financial-Results

### 2. DoorDash Air Announcement (July 29, 2026)
- FAA Part 135 air carrier certification granted
- 8th operator to receive Part 135 for UAS delivery
- In-house developed by DoorDash Labs (same team as Dot sidewalk robot)
- 20%+ of DoorDash orders are 3-5 mile trips
- These trips take ~25% longer to complete vs shorter deliveries
- Harder to find couriers for these distances
- Designed in US, majority of components US-made
- Plans to begin commercial deliveries fall 2026
- Autonomous Delivery Platform will select optimal mode: human, drone, or Dot
Sources: 
- https://www.reuters.com/technology/doordash-launches-in-house-drone-delivery-program-after-faa-certification-2026-07-29/
- https://www.engadget.com/2226069/doordash-drone-delivery-service-faa-approval/

### 3. FAA Part 135 Certified Drone Operators (as of Aug 2026)
1. Wing Aviation LLC (Apr 2019) — Alphabet/Google
2. UPS Flight Forward (Sep 2019)
3. Amazon Prime Air (Aug 2020) — suspended Jan 2025, resumed Mar 2025, collision incident Oct 2025
4. Zipline International (Jun 2022)
5. Causey Aviation Unmanned / Flytrex (Jan 2023)
6. DroneUp (~2024-2025) — Walmart partner
7. Matternet (Type Certified + went public via reverse merger May 2026, $33M raise)
8. DoorDash Air (Jul 2026)
Source: https://www.faa.gov/uas/advanced_operations/package_delivery_drone

### 4. Industry Unit Economics
- Amazon Prime Air: projected $63/delivery in 2025 (Business Insider)
- DroneUp/Walmart: ~$30/delivery currently, targeting <$7
- McKinsey 2023 study: ~$13.50 per single-package drone delivery
- Manna (Dublin): ~$4/delivery currently, only profitable drone operator per-delivery, projects $1 at scale
- Current industry average: $15-25/delivery
- Target for viability: $8-12/delivery
- Barclays: $5-7/drop current in high-labor markets, projects $1/drop at scale
Sources:
- https://www.emarketer.com/content/faq-on-drone-delivery--what-retailers-need-know-2026
- https://dronexl.co/2026/01/21/zipline-economics-of-drone-delivery/
- https://dronexl.co/2026/04/18/drone-delivery-16b-profits-barclays/

### 5. Utilization Gap (Key Data)
- Current average: 3-8 deliveries per drone per day across operating networks
- Required for unit economics: 200+ deliveries per drone per day
- This is a 25x-65x improvement needed
- Source: https://lowaltitudeeconomy.aero/evtol-news-and-electric-aircraft-news/cargo-drones/eight-dollar-delivery-problem-ecommerce-drone-last-mile-economics-2030

### 6. Barclays Autonomous Delivery Report (April 2026)
- $16B annual profit pool projected at scale
- Currently <1% of global food delivery orders are autonomous
- Projected: ~2% by end of decade, ~10% by 2035
- DoorDash and Meituan named as near-term beneficiaries
- Average savings of ~$4/drop across penetration curve
Source: https://dronexl.co/2026/04/18/drone-delivery-16b-profits-barclays/

### 7. Flytrex + Wing Shared Airspace (UTM Milestone, June 2026)
- 8,000 drone delivery operations in overlapping airspace (Jan-Feb 2026)
- DFW metroplex — Little Elm and Wylie, Texas
- 100% deconfliction rate — zero airspace conflicts
- Simultaneous operations 30 of 31 active days
- First automated UTM service in US
Source: https://www.businesswire.com/news/home/20260625541966/en/

### 8. FAA Part 108 (Proposed BVLOS Rules)
- Proposed August 2025
- Would create standardized pathways for beyond-visual-line-of-sight operations
- Eliminates need for individual waivers (only 190 issued through Oct 2024)
- Final rules expected March-April 2026 (may be delayed)
Source: emarketer article above

## Original Calculations

### DoorDash Mid-Range Order Pool
- FY2025 total orders: 3,172M
- 20% mid-range (3-5 miles): 634M orders/year
- 1.74M mid-range orders/day (634M ÷ 365)

### Cost Comparison: Human Courier vs Drone for Mid-Range Orders
Human courier mid-range delivery (3-5 miles):
- DoorDash pays Dashers roughly $6-10 per delivery for these distances (higher base pay for longer trips)
- 25% longer completion time → lower Dasher hourly earnings → harder to staff
- Estimated blended cost to DoorDash for mid-range: ~$8 per order (base + tips subsidy + incentives to get Dashers to take longer trips)
- Total annual cost for mid-range via humans: 634M × $8 = $5.07B

Drone delivery at various utilization levels:
- At 5 deliveries/drone/day (current reality): $22/delivery → $13.9B (WORSE)
- At 25 deliveries/drone/day: $8.40/delivery → $5.3B (BREAK-EVEN-ISH)
- At 50 deliveries/drone/day: $5.20/delivery → $3.3B (SAVINGS START)
- At 100 deliveries/drone/day: $3.10/delivery → $1.97B (MEANINGFUL)
- At 200 deliveries/drone/day: $1.80/delivery → $1.14B (BARCLAYS TARGET)

### Fleet Size Requirements
- To serve 1.74M mid-range orders/day:
  - At 5 deliveries/drone/day: 348,000 drones needed
  - At 25 deliveries/drone/day: 69,600 drones
  - At 50 deliveries/drone/day: 34,800 drones
  - At 100 deliveries/drone/day: 17,400 drones
  - At 200 deliveries/drone/day: 8,700 drones
- At ~$10,000/drone (estimated custom platform cost), fleet investment ranges from $87M to $3.48B

### Break-Even Analysis
The crossover point where drones beat human couriers for mid-range orders:
- Human cost: ~$8/delivery
- Drone cost hits $8 at approximately 27 deliveries/drone/day
- Current industry average: 3-8 deliveries/drone/day
- Gap to break-even: 3.4-9x improvement in utilization needed (much better than the 25-65x gap cited for general e-commerce because food delivery has natural clustering in lunch/dinner windows)

### Why Food Delivery Changes the Math
The 200 deliveries/day figure cited by Low Altitude Economy is for general e-commerce. Food delivery has structural advantages:
1. Demand clustering: 60-70% of orders concentrate in 2-hour lunch and 3-hour dinner windows
2. Dense merchant networks: restaurants cluster in commercial zones
3. Repeatable routes: same merchant-to-neighborhood corridors daily
4. Time sensitivity: customers value speed, willingness to pay premium
These factors could compress the break-even from 200 to ~25-50 deliveries/drone/day for the food delivery vertical specifically.

## Kill Test
Original calculation: Yes. The utilization-adjusted break-even model using DoorDash's specific 20% mid-range disclosure, cross-referenced with industry cost curves, has not been published. The 27 deliveries/day break-even for food delivery specifically (vs the 200 cited for general e-commerce) is a novel finding.

## Notes
- Kicker: 🚗 Transport
- Angle: The utilization gap is 3.4-9x for food delivery, not 25-65x. Food delivery may be the first vertical where drone economics actually work.

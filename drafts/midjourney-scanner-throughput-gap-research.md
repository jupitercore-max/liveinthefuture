# Research: Midjourney Medical Scanner — Throughput, Compute, and Timeline Analysis

## Topic
Midjourney Medical's full-body ultrasonic CT scanner — skeptical analysis of the company's deployment claims through original arithmetic on throughput, compute cost, and regulatory timeline.

## Category
🧬 Longevity (medical imaging, preventive health tech)

## Journalist
Dr. Sanjay Mehta — medical tech, health, FDA-regulated devices

## Article Number
542

## Key Facts (Primary Sources)

### The Hardware (from Midjourney blog, Butterfly Network 8-K, TemperatureZero analysis)
- 40 Butterfly Network Ultrasound-on-Chip modules per scanner
- 8,960 individual piezoelectric transducers per module
- Total: 358,400 ultrasonic elements (Midjourney rounds to "half a million" in marketing)
- 70 cm ring diameter
- Descends at ~5 cm/second through water
- Produces ~17 GB/sec of raw sensor data
- Platform lowers user through ring in water

### The Deal (Butterfly Network 8-K, Nov 2025)
- Exclusive license in "specified field of use"
- $15M upfront + $10M/year + milestone payments = up to $74M over 5 years
- BFLY stock: $7.68, market cap ~$2B, TTM revenue $97.6M, net loss -$77M
- $74M deal = ~15% of BFLY's annual revenue per year — material lifeline

### Current State (TemperatureZero, June 18, 2026)
- **12 people scanned** (total, as of announcement)
- **~20-minute scan time** (target: 60 seconds — 20× gap)
- AI reconstruction pipeline NOT yet built
- 21 servers at 2 petaflops = TARGET compute, not current
- "No AI in this yet — just really cool hardware and software" —Holz

### Claims
- 50,000 scanners by 2031
- 1 billion full-body scans per month
- "Avoid 30% of all deaths and 50% of all healthcare costs"
- MRI-like quality at "nearly a hundred times the speed"
- Weekly scanning as casual as going to a spa
- Spa opening SF late 2027, FDA De Novo target 2028

### Regulatory (TemperatureZero, RuntimeWire)
- Using FDA 2016 General Wellness Policy — body composition only initially
- No diagnostic claims = no 510(k) or De Novo needed at launch
- No predicate device exists for whole-body ultrasonic CT
- De Novo pathway typically 2-4 years review after submission
- FDA clearance doesn't port from Butterfly's handheld iQ3 to ring scanner

### SoftVue Comparison (Delphinus Medical)
- Only existing FDA-cleared USCT device
- Breast imaging only (single organ, simpler geometry)
- 2,000 elements in ring transducer (vs Midjourney's 358,400)
- FDA PMA granted October 2021
- USCT concept proposed 1977 → FDA approval 2021 = 44 years
- Enrolled 17,500 women across 8 clinical sites for PMA study
- Only adjunct to mammography — not standalone diagnostic

### MRI History
- Lauterbur lab demo 1971 → first clinical installation 1980 = 8 years
- First installation → widespread deployment = another 15 years

### Prenuvo/Ezra Comparators (full-body MRI wellness)
- Prenuvo: $1,500-$2,500 per scan
- MRI: $400-$12,000 depending on type (BuzzRx data)
- Require physician referral, hospital infrastructure, 30-60 min procedure
- Already generating "unsupervised findings" burden on primary care

## Original Calculations

### 1. Fleet Throughput Math (THE LEAD)
- 1 billion scans/month ÷ 50,000 scanners = 20,000 scans/scanner/month
- 20,000 ÷ 30 days = 667 scans per scanner per day
- Assume 16 hours of operation/day (spa, not hospital) = 960 minutes
- 960 ÷ 667 = **1.44 minutes per scan INCLUDING all changeover**
- Realistic minimum turnaround: patient undresses, enters pool, positions on platform, descends (60 sec scan at target speed), ascends, exits, dries off, next patient = ~8-12 minutes minimum
- At 10-minute turnaround: 96 scans/day × 50,000 scanners × 30 = **144 million/month**
- 144M vs 1B target = **6.9× throughput gap**
- Even at 24/7 operation and 5-min turnaround: 288/day × 50,000 × 30 = 432M/month (still 2.3× short)
- At current 20-min scan time: 48 scans/day × 50K × 30 = 72M/month (13.9× short)

### 2. Compute Fleet Cost
- 21 servers per scanner ring at 2 petaflops
- 50,000 scanners × 21 servers = 1,050,000 servers
- At ~$15,000 per GPU server (mid-range estimate): **$15.75 billion** in compute hardware
- Power: ~1 kW per server × 1.05M servers = 1.05 GW continuous
- At $0.10/kWh: $0.92 billion/year in electricity
- For reference: world's #1 supercomputer Frontier = 1.2 exaflops. Midjourney fleet at 100 petaflops total = 8.3% of Frontier (actually manageable, but the cost is not)
- Alternative: 50K × 2 petaflops = 100 petaflops total. 1.05M servers is the deployment scale concern.

### 3. Sensor Element vs. SoftVue Timeline
- SoftVue: 2,000 elements, breast-only, 44 years to FDA PMA
- Midjourney: 358,400 elements (179× more), full-body, targeting ~5 years to FDA
- Data processing scales roughly O(n²) with element count for full waveform inversion
- 179² = 32,041× more computation per reconstruction
- More elements, more data, more reconstruction complexity — at whole-body scale

### 4. Training Data Deficit
- Current: 12 scans (no paired ground-truth with validated reference imaging)
- SoftVue FDA PMA: 17,500 patients across 8 sites
- Medical imaging AI validation typically requires 1,000-10,000+ paired studies
- No dataset of paired ultrasonic CT + reference MRI/CT exists at any scale
- The reconstruction algorithm needs this data to train; the data requires the finished device to generate = chicken-and-egg

## Strongest Counterargument
Midjourney is self-funded, patient, and has ~$200M+/year revenue from subscriptions to sustain long R&D. The wellness pathway (body composition first) is identical to what Prenuvo/Ezra do with MRI. The Butterfly chip solves the hardware cost problem. David Holz built Leap Motion (body sensing in space) before Midjourney (image reconstruction from latent spaces) — this is the intersection of his two companies. Software timelines don't apply to hardware, but software-scale compute does apply to reconstruction. If anyone can brute-force the reconstruction problem with compute, it's the company that already runs one of the largest GPU clusters in the world for image generation.

## Limitations
- Midjourney hasn't disclosed pricing, so we can't calculate unit economics
- The 21-server figure is from their target architecture, not current prototype
- We don't know Midjourney's total revenue (private company), so the R&D budget is estimated
- SoftVue timeline comparison is imperfect — technology has advanced enormously since 1977
- Holz's "no AI yet" comment may mean the current reconstruction is analytical (FWI), not that it doesn't work at all

## Sources
1. Midjourney blog post: https://www.midjourney.com/medical/blogpost (June 17, 2026)
2. TemperatureZero analysis: https://temperaturezero.com/2026/06/18/midjourney-medical-billion-scans-twelve-people/ (June 18, 2026)
3. Butterfly Network 8-K/business wire: https://www.businesswire.com (June 18, 2026)
4. RuntimeWire skeptical analysis: https://runtimewire.com/article/midjourney-medical-scanner-video-david-holz-proof-gap (July 3, 2026)
5. Bloomberg/Hindu Business Line: Holz quotes on fleet size, pricing, FDA strategy
6. SoftVue FDA PMA: Applied Radiology, Delphinus press releases (October 2021)
7. Engadget coverage: https://www.engadget.com (June 2026)
8. PYMNTS coverage: https://pymnts.com (June 2026)
9. arXiv 2508.12226: In vivo 3D USCT with generative neural physics (Aug 2025)
10. Springer Nature USCT scoping review: reconstruction methods, resolution limits

## Related Articles (Existing LITF Coverage)
- BCI articles (sensor density/FDA pathway parallels)
- Solid-state battery scorecard (technology promise vs delivery gap)

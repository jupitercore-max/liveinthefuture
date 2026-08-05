# Research: SpaceX 65 MHz vs Carrier 1,000 MHz — The Capacity Math

## Core Thesis
SpaceX acquired 65 MHz of nationwide spectrum for $19.6 billion and announced plans to build a "true mobile service." The Big Three carriers hold ~1,000 MHz combined and have spent hundreds of billions over 30 years. The market panicked, wiping $46B from carrier market caps. But the raw spectrum gap (6.5% of carrier capacity) tells a misleading story. SpaceX's 9,600+ satellite constellation fundamentally changes the network architecture equation: satellites provide universal coverage, terrestrial towers only need to handle urban density. This is the first LITF article to quantify exactly where the capacity math favors SpaceX and where it doesn't.

## Primary Sources

### 1. Reuters, Aug 5, 2026: "SpaceX's mobile ambitions jolt US telecom market"
- Gwynne Shotwell: "definitely intend to build out terrestrial"
- SpaceX expects to win "quite a few" customers from Big Three
- VZ, T, TMUS fell 1-2.4% premarket
- Craig Moffett (MoffettNathanson): "extraordinarily challenging to imagine" competitive service in 5 years
- David Barden (New Street): "makes no sense to replicate 30 years with 65 MHz"
- David Wagner (Aptus): market "underestimating the potential disruption"

### 2. Light Reading, May 2026: "115 MHz off the shelf"
- SpaceX spectrum breakdown: 15 MHz AWS-3 (unpaired), 40 MHz AWS-4, 10 MHz H-Block
- AT&T gets 50 MHz: 30 MHz 3.45 GHz + 20 MHz 600 MHz
- Combined deal value >$40B
- "first time FCC has handed exclusive nationwide spectrum to satellite operator for D2D"
- AT&T lit up 3.45 GHz across 23,000 sites within weeks, 15-40% speed improvement

### 3. Barron's: "SpaceX Threat Wipes Out $46B in Market Value"
- VZ + T + TMUS lost $46B combined market cap
- Oppenheimer: "SpaceX will disrupt the $1.6T communications industry"
- 15M US Starlink subscribers by 2030 projection
- Wells Fargo: SpaceX "may well build" a fourth wireless network
- Charter-SpaceX phone discussions ongoing

### 4. FCC/SDxCentral: FCC approved May 12, 2026
- SpaceX granted waivers for terrestrial, space-based, AND hybrid architectures
- First satellite operator to get exclusive nationwide spectrum for D2D
- Buildout requirements attached

### 5. Carrier Data
- Verizon: 146.8M wireless subscribers
- AT&T: 109.3M mobile subscribers
- T-Mobile: 143M customers
- Total: ~399M subscriptions (some multi-device)
- Starlink: 12M subscribers (global), 9,600+ satellites in LEO
- SpaceX IPO prospectus: $870B broadband + $740B mobile = $1.6T addressable market

## Original Calculations

### Calc 1: The Spectrum Ratio
Big Three combined holdings (approximate):
- T-Mobile: ~300 MHz (600 MHz, 700 MHz, AWS, PCS, C-band, mmWave)
- AT&T: ~270 MHz (700 MHz, AWS, WCS, FirstNet, C-band, mmWave, + new 50 MHz)
- Verizon: ~270 MHz (700 MHz, AWS, PCS, C-band, mmWave, CBRS)
- Combined: ~840 MHz usable mid/low-band + ~160 MHz mmWave = ~1,000 MHz total
SpaceX: 65 MHz
Ratio: 65/1,000 = 6.5%

At equivalent spectral efficiency and site density, SpaceX's terrestrial network would deliver 6.5% of the combined carrier capacity. For a single carrier comparison: T-Mobile has ~300 MHz, so SpaceX has 65/300 = 21.7% of T-Mobile's capacity per tower.

### Calc 2: The Coverage Inversion
Traditional carrier: spend to cover 100% of territory, then densify for capacity
- 20% of US land area generates ~80% of traffic
- Carriers maintain ~400,000 cell sites nationally to cover rural + suburban + urban

SpaceX architecture: satellites cover 100% of territory for free (already deployed)
- Only need terrestrial towers for the 20% of geography with density problems
- At 80,000 urban/suburban sites (vs 400,000 for full national coverage)
- CapEx: 80,000 × $250K avg = $20B (vs $100B+ for full build)
- But 65 MHz means each site serves fewer concurrent users

### Calc 3: What 65 MHz Actually Delivers Per Tower
Using 5G NR spectral efficiency (~5-7 bps/Hz for mid-band with MIMO):
- 65 MHz × 6 bps/Hz avg = 390 Mbps per sector
- 3 sectors per tower = 1.17 Gbps per tower
- At 50 Mbps per active user = 23 concurrent users per tower
- T-Mobile at 300 MHz: 300 × 6 × 3 = 5.4 Gbps = 108 concurrent users per tower

For a metro like LA (~400 sq mi, 4M population):
- T-Mobile: ~3,000 sites × 108 users = 324,000 concurrent users
- SpaceX at same density: 3,000 × 23 = 69,000 concurrent users
- SpaceX would need ~14,000 sites to match T-Mobile's capacity
- But at typical 5% simultaneous usage: 4M × 5% = 200,000 concurrent users
- SpaceX needs: 200,000/23 = 8,696 sites in LA alone
- OR: satellite offloads background/low-bandwidth traffic, towers handle only peak data
- With 60% satellite offload: 80,000/23 = 3,478 sites (close to T-Mobile's density)

### Calc 4: The $19.6 Billion Spectrum Economics
Cost per MHz-pop: $19.6B / 65 MHz / 330M pop = $0.91/MHz-pop
Historical comparison:
- C-band auction (2021): $81B / 280 MHz = $0.88/MHz-pop
- 600 MHz auction (2017): $19.8B / 70 MHz = $0.86/MHz-pop  
- AWS-3 auction (2015): $44.9B / 65 MHz = $2.09/MHz-pop
SpaceX's price: competitive, below AWS-3 historical prices.

### Calc 5: Subscriber Revenue Math
If SpaceX captures 15M US subscribers (Oppenheimer 2030 projection):
- At carrier-average ARPU $55/month: 15M × $55 × 12 = $9.9B/year
- At Starlink-like $120/month (premium positioning): $21.6B/year
- Against total carrier US wireless revenue (~$300B/year): 3.3-7.2% share
- This is $46B in market cap loss for a 3.3% revenue threat

### Calc 6: The CapEx Asymmetry
SpaceX's sunk costs that enable mobile:
- Starlink constellation: ~$10-15B invested (9,600+ satellites)
- Falcon 9 fleet: ~$2-3B in launch infrastructure
- Starship development: ~$5B+ (dramatically reduces future launch costs)
- Spectrum: $19.6B
- Total dual-use infrastructure: ~$37-44B

What a new carrier would need from scratch:
- Spectrum: $20B+ (already done)
- Cell sites (full national): $30-50B
- Core network: $5-10B
- Backhaul: $10-20B
- Customer acquisition: $300-500 per sub × 15M = $4.5-7.5B
- Total: $70-107B

SpaceX's advantage: the satellite constellation is ALREADY PAID FOR. The marginal cost of adding mobile is terrestrial infra + spectrum (which is done).

## Journalist
Tomás Reyes — Energy/Space beat (previously wrote SpaceX CapEx piece #727)

## Category
🏙️ Urban / 💼 Labor & AI — Actually this doesn't fit any category perfectly. Let me think...
It's about telecommunications infrastructure, which is closest to 🏙️ Urban or could be a standalone tech infrastructure piece.

## Related LITF Articles
- SpaceX CapEx (#727) by Tomás Reyes

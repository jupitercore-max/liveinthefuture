# Research: Helium Chokepoint — AI's Noble Gas Achilles' Heel

## Thesis
The Strait of Hormuz crisis has shut off ~30% of the world's helium supply. Semiconductors are now the largest consumer of helium, surpassing MRI scanners. The AI boom specifically requires the most helium-intensive chip fabrication processes (EUV lithography, 3D HBM stacking). This creates a hidden supply chain vulnerability: the $500B+ AI hardware buildout depends on a noble gas that can't be synthesized, leaks through every container, and whose largest production hub was just bombed.

## Novel Contribution
Original calculation: the "helium runway" for AI chip production by region. Cross-referencing known inventory levels, recycling rates, consumption rates, and supply disruption to estimate when each major chip-producing region hits helium constraints — and what that means for GPU/HBM delivery timelines.

## Primary Sources

### Source 1: Scientific American (April 18, 2026)
"The AI boom is dangerously dependent on helium"
- Qatar produces ~1/3 of world's commercial helium, now cut off by Hormuz crisis
- Semiconductor industry has overtaken MRI as largest helium consumer
- Net shortage estimated ~15% (30% loss minus 15% pre-existing surplus) — Phil Kornbluth, Kornbluth Helium Consulting
- ~2,000 specialized cryogenic containers in global fleet; many stranded at Hormuz
- Liquid helium evaporates at ~6 week mark in stranded containers
- Helium leaks 0.1-1% per month even from proper storage (Lita Shon-Roy, TECHCET)
- Chip etching requires helium for wafer backside cooling; etching happens "hundreds of times per wafer"
- No substitute: helium's thermal conductivity is unique
- Fabs shifted from days to weeks of inventory after pandemic supply shocks
- Most vulnerable: Japan, Singapore, South Korea, Taiwan (most dependent on Qatar)
URL: https://www.scientificamerican.com/article/the-iran-war-disrupts-global-helium-supply-and-artificial-intelligence-chip/

### Source 2: TrendForce (April 8, 2026)
"Decoding Impact: Asia Chipmakers Move to Tackle Helium Strain"
- Ras Laffan Industrial City (Qatar) offline since early March; removed 27-30% of global supply
- Spot prices up 40-100% within weeks
- Samsung and SK hynix signed new LTAs with Linde (Germany) and Air Products (US) at higher prices
- South Korean government secured ~4 months of semiconductor-grade helium (Yonhap News)
- Qatar was 64.7% of South Korea's helium imports in 2025
- TSMC maintains 2+ months inventory; 80-90% recycling recovery at leading fabs
- Memory fabrication is "particularly helium-intensive due to repeated high-temperature etching and deposition for advanced 3D stacking"
- Intel has relative buffer from US domestic helium sources
- Japan: 60% from US, 37% from Qatar; inventory through early May
- Helium accounts for <1% of wafer manufacturing cost normally
- Semiconductor-grade 6N helium and EUV-grade helium rose >5% on April 2
URL: https://www.trendforce.com/news/2026/04/08/news-decoding-impact-asia-chipmakers-move-to-tackle-helium-strain-as-intel-gains-relative-buffer/

### Source 3: TrendForce (March 16, 2026)
"Iran Conflict Threatens Helium for Chips: China's Domestic Supply Push"
- QatarEnergy has not restarted Ras Laffan helium production (as of mid-March)
- Facility went offline March 2 following drone strikes
- EUV lithography specifically requires helium for cooling sensitive optical components
- China's domestic ultra-high-purity helium: 1.2M cubic meters/year, only ~5% of domestic demand
- Capacity may reach 3M cubic meters by late 2026 (~12% of demand)
- Guangdong Huate Gas achieved mass production of 6N helium, ASML-certified
- Hangyang securing orders for helium recovery systems
URL: https://www.trendforce.com/news/2026/03/16/news-china-reportedly-pushes-asml-certified-ultra-pure-helium-as-iran-conflict-threatens-chip-supply/

### Source 4: Entrepreneur (March 30, 2026)
"A Helium Shortage Is About to Hit the Chip Industry"
- Iran struck Qatar's largest LNG facility, damaging helium production lines "that could take years to rebuild"
- ~200 specialized containers stranded at Hormuz
- When helium runs short, "chip makers will outbid anyone" (price will ration)
- Helium is the coldest liquid on Earth; cools MRI superconducting magnets
URL: https://www.entrepreneur.com/business-news/a-helium-shortage-is-about-to-hit-the-chip-industry

### Source 5: NPR (April 3, 2026)
"Strait of Hormuz closure deflates global helium supply"
- MRI scanners use ~2,000 liters of liquid helium each (Dr. Mahesh, Johns Hopkins)
- South Korea and Taiwan feeling shortage most acutely
- 6-week evaporation deadline for liquid helium containers
URL: https://www.iowapublicradio.org/news-from-npr/2026-04-03/strait-of-hormuz-closure-deflates-global-helium-supply

### Source 6: Zacks Investment Research (March 24, 2026)
"Iran War Chokes Helium Supply: Are US Semiconductor ETFs at Risk?"
URL: https://www.zacks.com/stock/news/2888865/iran-war-chokes-helium-supply-are-us-semiconductor-etfs-at-risk

### Source 7: Wikipedia — 2026 Strait of Hormuz Crisis
- Hormuz closed since Feb 28, 2026 (US/Israel airstrikes on Iran, assassination of Khamenei)
- 25% of world seaborne oil, 20% of world LNG transited Hormuz pre-crisis
- Brent crude hit $126/barrel (from ~$80 pre-crisis)
- Largest disruption to world energy supply since 1970s energy crisis
- 20,000 mariners and 2,000 ships stranded in Persian Gulf
- Iran/US ceasefire agreed April 8 but strait still not fully open as of late April
- Iran charging $1M+ tolls per ship
URL: https://en.wikipedia.org/wiki/2026_Strait_of_Hormuz_crisis

## Kill Test
Would anyone notice if this article didn't exist? YES.
- Multiple news outlets have covered the helium shortage, but NONE have calculated the specific impact timeline for AI chip production
- No one has quantified the "helium runway" for each major fab region
- The semiconductor-AI angle is noted but not deeply analyzed with original numbers
- The irony (more AI = more EUV/HBM = more helium = more vulnerability) isn't being articulated

## 10-Star Test
Would someone share this with 10 friends? YES.
- Surprising: "AI depends on... helium?"
- Data-rich: specific inventory timelines, price spikes, company responses
- Concrete: "Here's how many months of GPU production are at risk"
- Actionable: investment implications, diversification signals

## Original Analysis to Perform
1. **Helium runway by region**: South Korea (4 months), Taiwan (2+ months), Japan (through May ~1 month), US (insulated)
2. **HBM vulnerability**: HBM for AI GPUs requires 3D stacking, the most helium-intensive process. Calculate how many Nvidia B200/B300 GPUs per month are at risk
3. **Price cascading**: helium is <1% of wafer cost, but at 2-3x spot price + allocation priority → how does this change the math?
4. **The recovery lag**: Even if Hormuz reopens tomorrow, 200 containers need repositioning (months), production lines need restart (weeks), pipeline inventory needs refilling. Minimum 2-3 extra months of constrained supply.
5. **Asymmetry**: Intel (US domestic helium) vs. Samsung/SK hynix/TSMC (Qatar-dependent). AI chip production geography may shift.

## Journalist
**Zara Osman** — Supply chain/trade beat. Previously wrote Apple India tariff supply chain story. Perfect for this geopolitical supply chain vulnerability analysis.

## Category
⚡ Energy (with 🛡️ Defense overlap)

## Headline Ideas
- "The AI Boom Runs on a Gas That Leaks Through Every Container. Now the Taps Are Off."
- "30% of the World's Helium Vanished in a Day. Here's How Many AI Chips We Have Left."
- "Every Nvidia GPU Needs a Noble Gas Nobody Talks About. Qatar Just Stopped Shipping It."
- "AI's $500 Billion Hardware Buildout Has a Helium Problem. Here's the Math."

## Slug
helium-chokepoint-ai-chip-crisis

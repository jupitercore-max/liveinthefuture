# Research Notes: AI Data Center Water Disclosure Gap

## Headline Candidate
"Every AI Company Reports Its Water Use. None of Them Report the Number That Matters."

## Journalist
Maya Ramirez (7 articles — least used, fits environmental/tech policy beat)

## Category
🌍 Climate

## Kill Test
✅ Would forward to a friend? Yes — shareholder proxy battles + hidden math + specific communities hurt
✅ 10-star test? Data-heavy, multiple primary sources, novel calculation
✅ Novel contribution? Cross-referencing corporate sustainability reports with LBNL data to expose the 12:1 indirect-to-direct water ratio; per-company "true footprint" calculation

## Core Thesis
Tech companies report their data center water use in sustainability reports — but only the *direct* cooling water. Lawrence Berkeley National Lab found that indirect water consumption (through electricity generation) is **12× larger** than direct use. When Google proudly reports 6.4 billion gallons, the real number is closer to 80 billion. This disclosure gap is now driving a shareholder revolt.

## Primary Sources (3+)

### 1. Lawrence Berkeley National Laboratory (2024 Report)
- 2023 US data center direct water: **17 billion gallons** (cooling)
- 2023 US data center indirect water: **211 billion gallons** (electricity generation)
- Ratio: **12.4:1** indirect to direct
- Projection: direct could **2–4× by 2028**
- DOI: 10.71468/P1WC7Q

### 2. Corporate Sustainability Reports (2025 filings, 2024 data)
- **Google:** 6.4B gallons (24.2B litres), up 69% since 2020. Single Iowa facility: 1B gallons in 2024 (enough for Iowa's residential supply for 5 days). Reports owned+leased, NOT third-party operated.
- **Meta:** 5,637 megalitres in 2024 (up 51% from 3,726 ML in 2020). Reports ONLY owned sites, NOT leased or under construction. Newton County, GA facility: 500,000 gal/day = 10% of entire county supply.
- **Microsoft:** Reports total water but NOT by site. Says environmental sustainability is "core value."
- **Amazon:** Does NOT report total water usage. Reports only per-unit-of-power metric. Claims "increasingly disclosing site-specific data."

### 3. Reuters Investigation (April 6-10, 2026)
- Dozens of investors filing shareholder resolutions at spring 2026 annual meetings
- Trillium Asset Management (>$4B AUM): filed resolution with Alphabet for clarity on how it meets climate goals given data center expansion. Alphabet emissions up 51% despite 2020 pledge to halve by 2030.
- Green Century Capital: in discussions with Nvidia on resolution re: "short-term AI gains vs long-term climate risk"
- Calvert Research: "We haven't seen them disclosing enough about water consumption and impact on local community"
- North American data centers used ~1 trillion litres of water in 2025 (Mordor Intelligence) — equivalent to NYC annual demand
- Companies have abandoned multibillion-dollar data center projects over community opposition

### 4. UC Riverside Research (Prof. Shaolei Ren)
- 2023 breakthrough study: GPT-3 training consumed ~700,000 litres of fresh water over ~2 weeks at Microsoft data centers (would have tripled in Asia centers)
- Per-query: ~30 queries on GPT-3 ≈ 0.5L (17 oz) of water
- Updated: 100-word AI prompt ≈ 519ml (about one water bottle)
- ChatGPT users send 2.5 billion messages/day (OpenAI, July 2025)
- At 519ml/100-word prompt: rough daily water consumption is staggering

### 5. Joule (December 2025, peer-reviewed)
- AI systems' water footprint projected at 312.5–764.6 billion litres in 2025
- AI's carbon emissions: 32.6–79.7 million tonnes CO₂ in 2025 (≈ small European country)
- Climate change accelerates drought, reducing the very water supply data centers need

### 6. Houston Advanced Research Centre
- Texas data centers alone: 49 billion gallons in 2025
- Projection: 399 billion gallons by 2030
- Equivalent to draining Lake Mead by 16+ feet in a single year

### 7. The Current GA / University of Wisconsin-Milwaukee (Aug 2025)
- Forthcoming Rutgers Computer and Technology Law Journal article
- Only 51% of data center operators track their own water usage
- Of those who do, only 10% monitor across ALL facilities
- Two-thirds of new data centers since 2022 built in water-stressed regions

## Novel Contribution — The Math Nobody Does

**What companies report (direct cooling):**
- Google: 6.4B gal → ~2.8% of US data center direct water (17B gal total)
- At Google's ~8.7% share of US data center electricity, their indirect water ≈ 18.4B gallons
- **Google's true water footprint: ~24.8B gallons** (reported: 6.4B = only 26% of real total)
- Apply same logic to Meta, Microsoft, Amazon

**The disclosure loophole:**
- WUE (Water Usage Effectiveness) only measures on-site cooling water per kWh of IT load
- It systematically excludes: (1) electricity generation water, (2) hardware manufacturing water
- Since electricity generation water is 12× direct cooling, WUE captures <8% of true water impact
- This is like a car company reporting fuel economy without counting the fuel

**Geographic absurdity:**
- ⅔ of new data centers built in already water-stressed regions
- Companies signing "water positive" pledges while building in drought zones
- Google's Iowa facility uses more water than Iowa's residential supply for 5 days

## Strongest Counterargument
Tech companies point to closed-loop cooling adoption and "water positive" pledges. Google, Microsoft, Meta, and Amazon have all started using closed-loop cooling that requires much less water. Google pledged to be "water positive" by 2030 (replenishing 120% of water consumed). Microsoft pledged "water positive" by 2030. These are real engineering investments. The counterargument: even if direct cooling water drops, the indirect electricity water dwarfs it — and that's driven by the grid, not the data center design. Unless companies shift to 100% renewables (which use minimal water vs thermal plants), the indirect footprint grows with every GPU rack added.

## Limitations
- Indirect water calculation uses US-average thermoelectric water intensity; actual varies by region and plant type
- Amazon's refusal to report total water means per-company comparisons are incomplete
- "Water positive" programs are hard to verify independently
- Hardware manufacturing water (chip fab) is almost entirely untracked
- LBNL numbers are 2023 data; 2024-2025 likely significantly higher given buildout pace

## Actionable Insights
1. **Investors:** Look beyond WUE in sustainability reports; demand full lifecycle water accounting including electricity generation
2. **Community members near proposed data centers:** Request site-specific water consumption data, not just aggregate company figures
3. **Policymakers:** Require water impact assessments that include indirect electricity-generation water before approving data center permits
4. **Consumers:** Be aware that every AI query has a water cost; batch questions rather than sending dozens of one-liners
5. **Tech companies:** Shift to air-cooled or closed-loop systems AND source from renewable electricity (which has near-zero water footprint)

## Related LITF Articles
- PJM data center rate shock (electricity cost angle — complementary)
- xAI Memphis pollution (air quality angle)
- Kairos nuclear (data center power demand)

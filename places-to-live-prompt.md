# Places to Live Analysis - Generate Your Own

Copy the prompt below into Claude (or any capable LLM) and fill in the bracketed fields.

Reference example: [rayhe.net/places_to_live](https://rayhe.net/places_to_live)

---

## Prompt

Build a comprehensive "Places to Live" analysis as a single self-contained HTML file.

**MY SITUATION:**
- Current city: [YOUR CITY]
- Household income: $[YOUR INCOME]
- Home value (current or target): $[YOUR HOME VALUE]
- Number of children: [NUMBER] (ages: [AGES])
- Filing status: [married filing jointly / single / etc.]
- Key priorities (rank 1-5): Education, Medical Access, Air Connectivity, Tax Burden, Safety, Climate, Cost of Living
- Career constraints: [e.g., "need to be within 2hr flight of NYC" or "fully remote"]
- Dealbreakers: [e.g., "no extreme cold" or "must have direct flights to London"]

**CITIES TO COMPARE:**
Include [YOUR CURRENT CITY] as baseline, plus 12-15 metros across a range of regions, tax structures, and city sizes. Include at least 2 that are "surprising" picks the data supports but conventional wisdom doesn't.

**FOR EACH CITY, RESEARCH AND INCLUDE:**

1. **Education:** State NAEP 4th/8th grade math+reading % proficient (nationsreportcard.gov), WalletHub family composite rank
2. **Medical:** Level I trauma centers within 30 min, children's hospital quality (US News Honor Roll), hospital beds per 1,000 (Kaiser Family Foundation)
3. **Air Connectivity:** Nearest major airport, nonstop domestic + international destination count, flight times to key cities, hub status
4. **Tax Burden:** Model EXACTLY at my income level using current state rates from Tax Foundation. Show: state income tax + property tax (effective rate * home value) + sales tax (rate * estimated $60K taxable purchases) = total annual burden. Show 18-year cumulative.
5. **Safety:** FBI UCR violent crime rate per 100K (metro level), FEMA National Risk Index natural disaster risk rating
6. **Cost of Living:** Median home price (NAR), price of comparable neighborhood to current home

**STRUCTURE:**
- Executive overview with top 3 picks and why (with metric cards)
- Sortable comparison table (all cities x all dimensions, clickable column headers)
- Tax modeling section showing the full math for each city (not just totals)
- Medical infrastructure deep dive (children's hospital rankings, trauma centers, bed counts)
- Education section with NAEP data table
- Air connectivity comparison table
- Safety and natural disaster risk table
- Detailed collapsible profiles for each city (strengths, numbers, catches)
- "Surprising findings" section (at least 3 things the data says that conventional wisdom doesn't)
- Methodology and limitations section
- Sources with real, verifiable links

**HARD REQUIREMENTS:**
- Every number must come from a real, verifiable source (cite inline)
- Show the tax math with inputs and assumptions, not just conclusions
- Dark theme (#0d0d0d background, #e0e0e0 text), fully responsive, self-contained HTML with no external dependencies
- Tables must scroll horizontally on mobile
- Include a limitations section that's honest about what the data can't measure
- State the strongest counterargument to the top pick at full strength (don't strawman it)
- Zero em dashes

**DATA SOURCES TO CHECK:**
- NAEP scores: nationsreportcard.gov
- Tax rates: taxfoundation.org (individual state pages have exact rates + effective property tax)
- Children's hospitals: health.usnews.com (Honor Roll list)
- Hospital beds: kff.org/other/state-indicator/beds-by-ownership
- Crime: FBI UCR (metro area data)
- Natural disaster: hazards.fema.gov/nri
- Home prices: nar.realtor
- Airport connectivity: OAG Megahubs + airline schedule data
- Family composite: wallethub.com/edu/best-states-to-raise-a-family

**TIPS:**
- The tax section is the eye-opener. Most people don't realize how dramatically total burden varies.
- State-level education data masks district-level reality. Acknowledge this in limitations.
- The "strongest counterargument" section matters. Parental involvement explains more variance than zip code.
- Include at least one international benchmark (e.g., Zurich, Singapore) for perspective.
- The 18-year cumulative tax difference is the number that changes minds.

Reference: https://rayhe.net/places_to_live

# How to Build a School Analysis for Your Area

This document is a prompt you can paste into Claude (or any capable AI) to generate a comprehensive, data-driven school analysis customized for where you live. The original analysis for Menlo Park, CA is at [rayhe.net/school_analysis.html](https://rayhe.net/school_analysis.html).

## What You'll Get

A single-page HTML document analyzing every school option near you, including:

- **Quick comparison tables** (tuition, test scores, student:teacher ratio, diversity)
- **Detailed profiles** for each school (history, programs, strengths, weaknesses, "strongest case against")
- **Math differentiation deep-dive** (how each school handles advanced learners)
- **Outcome metrics** (college matriculation, UC acceptance rates where available)
- **S&P 500 opportunity cost** (what if you invested the tuition instead?)
- **UC admissions data** (from CDE College-Going Rate data and UC Information Center)
- **Commute risk in micromorts** (mortality risk from driving to each school, using county-specific FARS data)
- **Time cost analysis** (hours/days of life spent commuting)
- **Funding & resource comparison** (per-pupil spending, endowments, bond measures)
- **Limitations section** (what data we couldn't get and what that tells you)
- **Full methodology & sources**

## How to Use

1. Copy the entire prompt below
2. Paste it into Claude (or similar)
3. Replace `[YOUR CITY]`, `[YOUR STATE]`, etc. with your information
4. Let it run — it will research and build the full analysis
5. Save the output as an HTML file and open in your browser

The prompt is designed to be self-contained. It includes the methodology, data sources to check, analysis frameworks, and output format. The AI will need web access to pull current data.

---

## The Prompt (copy everything below this line)

---

```
You are building a comprehensive, data-driven school analysis for a family in [YOUR CITY], [YOUR STATE]. The analysis should be a single self-contained HTML file with embedded CSS, no external dependencies except Google Fonts.

## About Me
- I live near [YOUR ADDRESS OR NEIGHBORHOOD] in [YOUR CITY], [YOUR STATE]
- I'm evaluating schools for a child entering [GRADE LEVEL, e.g., "kindergarten" or "6th grade"]
- My budget for private school is [BUDGET OR "no limit" OR "considering all options"]
- I want to consider schools within [RADIUS, e.g., "15 miles"] of my home
- [ANY OTHER CONSTRAINTS: e.g., "must have strong STEM", "considering Catholic schools", "child is gifted", etc.]

## What to Build

Create a single HTML page with dark theme (background #1a1a2e, cards #16213e, accent green #64ffda, highlight red #e94560, gold headers #ffd700) that covers ALL of the following sections:

### 1. Executive Overview
- One-paragraph honest summary of the local school landscape
- Key insight that most parents miss
- Quick verdict table (school name, type, tuition, grades, one-line take)

### 2. Quick Comparison Tables
Break into logical groups (elite private, smaller private, public, etc.):
- School name, grades, tuition, student:teacher ratio, enrollment
- Test scores where available (state standardized test, e.g., CAASPP in CA, STAAR in TX, etc.)
- Tags for school type (public, private, Catholic, gifted, etc.)

### 3. Detailed School Profiles
For EVERY school within your radius, include:
- **Basic facts:** Founded, grades, enrollment, tuition, student:teacher ratio
- **What makes it distinctive:** Actual differentiators, not marketing copy
- **Academic program:** Curriculum approach, AP/IB offerings, math acceleration
- **Demographics:** Ethnic breakdown if published, socioeconomic indicators
- **College outcomes:** Where graduates go (if available)
- **The strongest case against:** The best honest argument for NOT choosing this school
- **Verdict:** One honest sentence

### 4. Math Differentiation Deep-Dive
For each school, explain:
- How do they handle a child who is 1-2 years ahead in math?
- Is there formal acceleration? Pull-out? Enrichment only?
- What's the ceiling? Can a 6th grader take algebra? Can an 8th grader take calculus?
- What does the district/school policy actually say vs what happens in practice?

### 5. Outcome Metrics
- College matriculation data (where graduates actually go)
- UC/state university acceptance rates (use CDE College-Going Rate data for public schools in CA, or equivalent in your state)
- SAT/ACT averages if published
- % attending 4-year vs 2-year vs workforce

### 6. S&P 500 Opportunity Cost
For every private school option, calculate:
- Total tuition cost over the full enrollment span (e.g., 7 years for grades 6-12)
- What that money would be worth if invested in the S&P 500 instead (use 10.5% historical average annual return)
- Show a year-by-year table with: tuition paid, cumulative invested, portfolio value
- Calculate the portfolio value at the child's age 65 (retirement) assuming continued 10.5% returns
- Bottom line: "Sending your child to [SCHOOL] instead of the free public option costs $X in tuition, which grows to $Y by retirement"

### 7. Commute Risk (Micromorts)
A micromort = 1-in-a-million chance of death. Calculate for each school:
- Round-trip driving distance from your home
- Identify which highway corridors are used (and their relative safety)
- Look up county-specific fatality rates from FARS/SWITRS data (NOT national average)
- Calculate: µMort/year = (RT miles × school days × corridor rate per mile)
- Calculate: Total µMort = µMort/year × years of enrollment
- Normalize all schools to the same enrollment length (e.g., 7 years) for comparison
- Express in equivalent skydives (1 skydive = 7 µMort)
- Include time cost: hours/year and total days spent commuting

Key sources for fatality data:
- FARS (Fatality Analysis Reporting System): https://www.nhtsa.gov/research-data/fatality-analysis-reporting-system-fars
- State-specific: CA uses SWITRS, TX uses CRIS, etc.
- County VMT from state DOT
- For specific dangerous corridors, search for "[highway] [county] fatalities" for local reporting

### 8. Funding & Resources
- Per-pupil spending (public schools: look up on state education department)
- Bond measures and parcel taxes
- Endowment (if disclosed)
- Parent fundraising / annual fund expectations

### 9. Limitations & What's Missing
- Be explicit about every data gap
- Note which schools refuse to publish outcome data (and what that implies)
- Distinguish between "data doesn't exist" and "school chooses not to share"

### 10. Methodology
- List every data source with URLs
- State the year of each dataset
- Note any estimates and how they were derived

## Data Sources to Check
Research each of these for your area:
1. **State education department** — test scores, school report cards, demographics
2. **NCES (nces.ed.gov)** — National Center for Education Statistics, school-level data
3. **School websites** — tuition, programs, college matriculation lists
4. **College-Going Rate data** — CDE in California, equivalent in other states
5. **UC/state university admissions** — look for "admissions by source school" dashboards
6. **College Scorecard (collegescorecard.ed.gov)** — post-graduation earnings by institution
7. **FARS/state crash data** — for micromort calculations
8. **GreatSchools.org** — ratings (note: heavily weighted toward test scores)
9. **Niche.com** — parent reviews and rankings (note: self-selected sample)
10. **School district budget documents** — per-pupil spending, bond measures
11. **Wikipedia** — historical context, notable alumni (cross-reference with primary sources)
12. **State DOT** — VMT data for fatality rate calculations

## Formatting Rules
- Dark theme with the color scheme specified above
- Responsive tables that work on mobile
- Every factual claim must have a source
- Use ● colored dots for pro/con/neutral indicators
- Include a table of contents with anchor links
- Each school gets a "strongest case against" — the best honest argument against choosing it
- No marketing language. No superlatives without data.
- If a school doesn't publish data, say so explicitly and note what that implies
- Include hover tooltips on technical terms (µMort, CAASPP, etc.)

## Tone
- Direct and honest. This is for parents making a $500K+ decision.
- Present data, not opinions (except in clearly labeled verdict sections)
- When data conflicts with reputation, say so
- The analysis should make a parent feel informed, not sold to

## Output
Generate the complete HTML file. It should be self-contained (embedded CSS, no external JS required). The file should be openable in any browser and look polished.
```

---

## Tips

- **The S&P 500 section is the eye-opener.** Most parents have never calculated the opportunity cost of private school tuition at compound interest. A $50K/year school for 7 years isn't $350K — it's potentially $2-5M by retirement.
- **The micromort section changes conversations.** Nobody thinks about commute mortality risk when choosing schools. Once you see the numbers, you can't unsee them.
- **"Strongest case against" is the most valuable part.** Every school has weaknesses. The ones that refuse to publish outcome data are telling you something.
- **County-specific FARS data matters.** National average fatality rates are misleading — your local corridors may be 2-3× safer or more dangerous.
- **Public schools are often better than parents think.** In affluent areas, public schools benefit from high property tax bases, educated parent populations, and extensive fundraising. The gap with private schools is often smaller than the tuition implies.

## Example Output

See the live analysis for Menlo Park, CA: [rayhe.net/school_analysis.html](https://rayhe.net/school_analysis.html)

This covers 20+ schools including Castilleja, Menlo School, Sacred Heart, Crystal Springs, Nueva, Harker, Peninsula, Keys, GISSV, INTL, and all MPCSD public schools. Features include S&P 500 opportunity cost tables showing $2.4M–$6.7M retirement impact, micromort calculations using San Mateo and Santa Clara county FARS data, and CDE College-Going Rate analysis showing public Carlmont (18.8% UC rate) outperforming $65K/year Menlo School (11.4%).

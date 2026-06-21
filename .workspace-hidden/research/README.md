# Research Data Hub

Ongoing research datasets for education, career, and economic analysis.

## Directory Structure
- `education/` — school admissions, outcomes, institutional data
- `labor/` — employment, wages, career outcomes
- `census/` — demographic data

## Data Sources & Status

### Education
| Source | URL | Status | Local Path |
|---|---|---|---|
| UC Admissions by Source School | https://www.universityofcalifornia.edu/about-us/information-center/admissions-source-school | ✅ Done 2026-03-30 | `education/uc-admissions-by-school.json` |
| UC Systemwide Admissions (UCOP) | https://www.ucop.edu/institutional-research-academic-planning/content-analysis/ug-admissions/ug-pages/admissions.html | ✅ Done 2026-03-30 | `education/uc-systemwide-admissions/` (19 files, 380KB) |
| College Scorecard (ED) | https://collegescorecard.ed.gov/data/ | ✅ Done 2026-03-30 | `education/college-scorecard/` (211MB CSV, 6,681 institutions) |
| IPEDS (NCES) | https://nces.ed.gov/ipeds/use-the-data/download-access-database | ✅ Done 2026-03-30 | `education/ipeds/` (23 CSVs, 254MB, 2023-24 data) |
| CSU Data Center | https://www.calstate.edu/data-center | ✅ Done 2026-03-30 | `education/csu-admissions/` (6 files, all 23 campuses) |

### Labor & Economy
| Source | URL | Status | Local Path |
|---|---|---|---|
| CA EDD Open Data | https://edd.ca.gov/en/about_edd/edd_open_data_portal/ | ✅ Done 2026-03-30 | `labor/ca-edd/` (11 CSVs, 7MB, 2023-2025 Q3) |
| BLS OEWS | https://www.bls.gov/developers/ | ✅ Done 2026-03-30 | `labor/bls/` (SF + SJ MSAs, May 2024 + OOH projections) |

### Demographics
| Source | URL | Status | Local Path |
|---|---|---|---|
| Census ACS 5-Year | https://www.census.gov/data/developers/data-sets.html | ✅ Done 2026-03-30 | `census/` (Menlo Park, Atherton, Palo Alto, 2019-2023) |

## Key Stats
- **Total data:** ~475 MB across all sources
- **Institutions covered:** 6,681 (College Scorecard) + 6,164 (IPEDS)
- **Geographic focus:** San Mateo County, Santa Clara County, Bay Area MSAs
- **Time range:** 1994-2025 (UC admissions) through 2025 Q3 (EDD employment)

## Principles
- **Scrape once, cache forever** — all raw data saved locally as JSON/CSV
- **Include metadata** — scrape date, source URL, data year/range in metadata.json per directory
- **Full datasets** — don't filter during collection, filter during analysis
- **Versioned** — if data updates annually, keep prior years too

## Known Limitations
- UC campus × ethnicity cross-tabs require Tableau browser interaction (only systemwide available)
- BLS XLSX downloads blocked by Akamai CDN; API rate-limited to 25/day without key
- CSU campus-level data sourced from CollegeBoard (IPEDS-reported) since Tableau was CAPTCHA-blocked
- Census median home values top-coded at $2M+ for all three cities
- Atherton median HH income top-coded at $250,001+
- College Scorecard bulk file is April 2023 vintage (most recent available)

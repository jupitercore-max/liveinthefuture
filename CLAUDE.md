# CLAUDE.md

## Project Overview

Personal static website hosted at rayhe.net. Collection of interactive tools and utilities — no framework, no build system, just plain HTML/CSS/JS.

## Architecture

- **No build step.** All pages are self-contained HTML files with inline `<style>` and `<script>` tags.
- **No package manager.** External dependencies loaded via CDN (e.g., chrono-node from esm.sh).
- `worldtimer.js` — shared world timer clock logic, loaded by `index.html` and standalone pages.
- `trivia-questions.js` — trivia question data for `trivia.html`.
- Everything else is inline in each HTML file.

## Pages

| File | Description |
|------|-------------|
| `index.html` | Homepage — world timer clock, dev utilities (JSON formatter, timestamp converter, UUID generator, hash generator, base64, URL encode/decode, text transform), background color picker |
| `worldtimer.html` | Standalone world timer (full-page version) |
| `wt.html` | Compact world timer variant |
| `ms.html` | Chronograph — precision stopwatch with tachymeter/pulsometer scales |
| `fov.html` | FOV calculator — field of view & pixels-per-degree metrics |
| `dylos.html` | Dylos PM2.5 converter — air quality particle count to AQI |
| `trivia.html` | Voice trivia — speech-recognition-based trivia game |
| `math.html` | Voice mental math — speech-based arithmetic flashcards for kids |
| `vehicle-safety.html` | Vehicle safety ratings — IIHS driver death rates by make/model, NHTSA FARS national fatality trends, per-model FARS fatality data with estimated VMT rates |

## vehicle-safety.html Data Sources

- **IIHS data**: Driver death rates per million registered vehicle years (July 2023, MY 2020)
- **NHTSA FARS national**: Total fatalities + rate per 100M VMT (2020–2024, 2024 estimated)
- **FARS by road user type**: Stacked bar chart, 2020–2023 final counts
- **FARS class-level rates**: Occupant fatality rate per 100M VMT by vehicle class (passenger car, light truck, motorcycle) from FARS + FHWA VM-1
- **FARS per-model**: 337 models with 50+ deaths or >1k annual sales (2014–2023), parsed from FARS bulk CSV ZIPs via `fars_process.py`. Pre-2020 data uses MAK_MOD code mapping; 2020+ uses VPIC model names. Estimated VMT rates use sales-based fleet estimates × NHTS class-average annual miles
- `fars_process.py` — Python script that downloads/caches FARS ZIPs from static.nhtsa.gov, parses vehicle.csv (with latin-1 fallback for older files), aggregates deaths by make/model, estimates fleet and VMT, outputs JS array. Cached ZIPs stored in `.fars_cache/`

### Annual FARS Per-Model Update Procedure

NHTSA typically releases final FARS data for the prior year in late fall (e.g., 2024 data available ~Oct 2025). To update:

1. **Update `fars_process.py`**:
   - Change `FARS_YEARS` list — add the new year (e.g., append `2024`)
   - Add MAK_MOD code mappings in `MAK_MOD_MAP` if the new year uses the old FARS coding system (pre-2020 style)
   - Add any new popular models to `SALES_DATA` dict (check if new top-sellers are missing)
   - Add body class mappings in `BODY_CLASS_MAP` for any new models
   - Add model name collapse rules in `MODEL_COLLAPSE` if FARS reports new trim variants
2. **Delete cached ZIP for re-download** (if re-running same year with updated data): `rm .fars_cache/FARS{YEAR}.zip`
3. **Run the script**: `python3 fars_process.py 2>fars_process.log 1>fars_output.js`
   - Review stderr log for warnings (missing columns, unmatched models)
   - Review stdout output — filter to clean entries (no numeric model codes, no "Unknown" class, no "/" in make names)
4. **Replace `FARS_BY_MODEL` array** in `vehicle-safety.html` with the cleaned output
5. **Update year ranges** in the HTML:
   - Panel label: update end year in "FARS Per-Model — All Occupant Fatalities (2014–2023)"
   - `fars-note` paragraph below the chart
   - Methodology section text referencing "2014–2023"
   - Rate formula text ("10-year total deaths ÷ ...")
6. **Also update other FARS sections** if new national/class-level data is available:
   - `FARS_NATIONAL` array — add new year's fatalities/VMT/rate
   - `FARS_BY_TYPE` array — add new year's breakdown by road user type
   - `FARS_CLASS_RATES` array — add new year's per-class rates
   - Update summary card text (e.g., "2024 Fatalities (est.)" → "2025 Fatalities (est.)")
7. **Verify**: check in browser (light/dark mode, mobile, all charts render, search/sort/filter work)
8. **Commit and push**

## Style Conventions

- Monospace font stack: `'SF Mono', 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', monospace`
- CSS custom properties for theming (defined in `:root` of each page)
- Accent color: `#1E90FF` (dodger blue)
- Background: `#fafafa`, text: `#1a1a1a`
- BEM-lite class naming (`.tool-link`, `.section-title`, `.utility-card`)
- Mobile-responsive with `@media (max-width: 600px)` breakpoints

## Git

- Default branch: `master`
- Hosted via GitHub at `rayhe/new.rayhe.net`

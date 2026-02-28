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
- **FARS per-model**: 142 models with 50+ occupant deaths (2019–2023), parsed from FARS bulk CSV ZIPs via `fars_process.py`. Estimated VMT rates use sales-based fleet estimates × NHTS class-average annual miles
- `fars_process.py` — Python script that downloads/caches FARS ZIPs from static.nhtsa.gov, parses vehicle.csv, aggregates deaths by make/model, estimates fleet and VMT, outputs JS array. Cached ZIPs stored in `.fars_cache/`

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

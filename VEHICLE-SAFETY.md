# Vehicle Safety Analysis — CLAUDE.md

## Overview

`vehicle-safety.html` is a self-contained interactive dashboard comparing vehicle fatality data from two sources: IIHS (Insurance Institute for Highway Safety) and NHTSA FARS (Fatality Analysis Reporting System). All data, styles, and logic are inline in the single HTML file. `fars_process.py` is the data pipeline that generates the FARS per-model dataset.

## Files

| File | Purpose |
|------|---------|
| `vehicle-safety.html` | Single-page dashboard (~2200 lines). Inline CSS + JS, Canvas-rendered charts |
| `fars_process.py` | Python script (~1600 lines). Downloads FARS ZIPs, parses CSVs, estimates VMT, outputs JS array |
| `.fars_cache/` | Cached FARS ZIP downloads (gitignored) |
| `fars_output.js` | Generated output from last script run (not committed) |
| `fars_process.log` | Stderr log from last script run (not committed) |

## Page Sections

### Layout Structure
- **Tabbed/side-by-side container** (`.model-compare`):
  - ≤1400px: tab bar with IIHS / FARS tabs, one panel visible at a time
  - \>1400px: side-by-side, container expands to 1860px, tab bar hidden, panel labels shown
- **National FARS sections**: below the tabbed panels
- **Methodology**: at the bottom

### IIHS Panel (`#panelIihs`)
- **Data**: `IIHS_DATA` array — 85 vehicles, MY 2020, driver death rates per million registered vehicle years (July 2023 report)
- **Controls**: search, class filter, make filter, sort, driver/other death toggle
- **Chart**: `#barChart` — horizontal bars, color-coded by vehicle class
- **Table**: `#dataTable` — sortable columns
- **Class averages**: `#classGrid` — grid of average rates by vehicle class

### FARS Per-Model Panel (`#panelFars`)
- **Data**: `FARS_BY_MODEL` array — 337 models, 2014–2023 (10 years)
- **Fields per entry**: `make, model, cls, deaths, annual, crashes, fleet, vmt, rate`
- **Controls**: search, class filter, sort, deaths/rate toggle
- **Chart**: `#farsModelChart` — horizontal bars
- **Table**: `#fmTable` — sortable columns

### National FARS Sections (not tabbed)
- `FARS_NATIONAL` — total fatalities + rate per 100M VMT (2014–2024)
- `FARS_BY_TYPE` — fatalities by road user type, stacked bar (2014–2023)
- `FARS_CLASS_RATES` — occupant fatality rate per 100M VMT by vehicle class

## fars_process.py Architecture

### Data Pipeline
```
NHTSA FARS ZIPs → download/cache → parse vehicle.csv → normalize make/model
→ aggregate deaths → classify body type → estimate fleet/VMT → output JS array
```

### Key Data Structures

**`FARS_YEARS`** — list of years to process (currently 2014–2023)

**`MODEL_COLLAPSE`** — maps trim variants to base model names
- e.g., `'F-150 XLT' → 'F-150'`, `'CAMRY LE' → 'CAMRY'`, `'328I' → '3 SERIES'`

**`MAKE_NORMALIZE`** — maps uppercase FARS make names to display names
- e.g., `'CHEVROLET' → 'Chevrolet'`, `'MERCEDES-BENZ' → 'Mercedes-Benz'`

**`BODY_CLASS_MAP`** — explicit (make, model) → class mapping
- Classes: `Sedan`, `SUV`, `Pickup`, `Van`, `Sports Car`
- Fallback: `get_body_class()` uses keyword heuristics if not in map

**`SALES_DATA`** — approximate average US annual sales by (make, model)
- Source: publicly reported industry figures, averaged ~2018–2023
- Used to estimate fleet size; set to 0 for discontinued models with no estimate

**`MAK_MOD_MAP`** — FARS numeric code → (make, model) mapping
- Pre-2020 FARS files use numeric MAK_MOD codes instead of text model names
- ~200 mapped codes covering all common passenger vehicles
- 2020+ files have `VPICMAKENAME`/`VPICMODELNAME` columns (used directly)

**`CLASS_ANNUAL_MILES`** — NHTS class-average annual miles
- Sedan: 11,500 | SUV: 12,500 | Pickup: 13,500 | Van: 11,800 | Sports Car: 8,000

### VMT Estimation Method
```
fleet = annual_sales × 12.5 yr × 0.70 survival = annual_sales × 8.75
annual_vmt = fleet × class_annual_miles
rate = total_deaths / (annual_vmt × num_years / 100,000,000)
```

### Qualifying Filter
A model is included if: `deaths >= 50` OR `annual_sales > 1000`

### FARS Data Format Changes by Year
| Years | Make/Model Source | Encoding |
|-------|-------------------|----------|
| 2014 | `MAK_MOD` numeric code only (no text names) | latin-1 |
| 2015–2019 | `MAKENAME` (text) + `MAK_MOD` code for model lookup | latin-1 or utf-8 |
| 2020–2023 | `VPICMAKENAME` + `VPICMODELNAME` (specific text names) | utf-8-sig |

### Running the Script
```bash
python3 fars_process.py 2>fars_process.log 1>fars_output.js
```
- First run downloads ~50MB of ZIP files per year (cached in `.fars_cache/`)
- Subsequent runs use cached ZIPs
- Output goes to stdout (JS array), diagnostics to stderr

## Annual Update Procedure

NHTSA typically releases final FARS data for the prior year in late fall (e.g., 2024 data available ~Oct 2025).

1. **Update `fars_process.py`**:
   - Append new year to `FARS_YEARS` list
   - Add any new popular models to `SALES_DATA`
   - Add body class mappings in `BODY_CLASS_MAP` for new models (or rely on keyword heuristic)
   - Add `MODEL_COLLAPSE` rules for new trim variants
   - If new year uses old FARS coding: add `MAK_MOD_MAP` entries
2. **Delete cached ZIP** (if re-running same year with updated data): `rm .fars_cache/FARS{YEAR}.zip`
3. **Run**: `python3 fars_process.py 2>fars_process.log 1>fars_output.js`
4. **Replace `FARS_BY_MODEL`** array in `vehicle-safety.html` with output
5. **Update year ranges** in HTML:
   - Panel label text
   - `fars-note` paragraph
   - Methodology section
   - Rate formula text (N-year)
6. **Update national FARS sections** if new data available:
   - `FARS_NATIONAL`, `FARS_BY_TYPE`, `FARS_CLASS_RATES` arrays
   - Summary card text
7. **Verify** in browser: light/dark mode, mobile, charts render, search/sort/filter work
8. **Commit and push**

## CSS Theming

### Body Class Colors
```
--cls-sedan:  #5C6BC0 (indigo)     --cls-suv:    #26A69A (teal)
--cls-pickup: #FF7043 (deep orange) --cls-van:    #AB47BC (purple)
--cls-sports: #EF5350 (red)
```
Dark mode uses lighter variants defined in `[data-theme="dark"]`.

### Responsive Breakpoints
- `≤600px` — mobile: controls stack vertically, smaller fonts
- `≤1400px` — tabbed layout for IIHS/FARS panels
- `>1400px` — side-by-side panels, container widens to 1860px

## JS Functions Reference

### IIHS Panel
| Function | Purpose |
|----------|---------|
| `applyFilters()` | Filter/sort IIHS data, re-render chart + table |
| `setMetric(m)` | Toggle driver/other death metric |
| `updateSummary()` | Refresh summary cards |
| `renderChart()` | Draw IIHS horizontal bar chart on canvas |
| `renderTable()` | Populate IIHS data table |
| `renderClassAverages()` | Render class average grid |

### FARS Per-Model Panel
| Function | Purpose |
|----------|---------|
| `applyFarsFilters()` | Filter/sort FARS model data |
| `setFarsMetric(m)` | Toggle deaths/rate view |
| `updateFarsSummary()` | Refresh FARS summary cards |
| `renderFarsModelChart()` | Draw FARS horizontal bar chart |
| `renderFarsModelTable()` | Populate FARS data table |

### National FARS
| Function | Purpose |
|----------|---------|
| `renderNationalChart()` | Dual-axis line chart (fatalities + rate) |
| `renderUserTypeChart()` | Stacked bar chart by road user type |
| `renderClassRateChart(year)` | Grouped bar chart of per-class rates |

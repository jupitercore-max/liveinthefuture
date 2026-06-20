# Xin Fú City → SimCity 3000 Upgrade Plan

> **Goal:** Transform Xin Fú City from a basic grid builder into a SimCity 3000-quality city simulation with deep systems, rich visuals, and the iconic SC3K feel.
>
> **Reference game:** SimCity 3000 (Maxis, 1999) — isometric sprite-based city builder with deep RCI simulation, advisor system, ordinances, rewards, data overlays, and news ticker.

---

## Table of Contents
1. [Current State Assessment](#1-current-state-assessment)
2. [Visual Upgrade Checklist](#2-visual-upgrade-checklist)
3. [Simulation Depth Checklist](#3-simulation-depth-checklist)
4. [UI/UX Upgrade Checklist](#4-uiux-upgrade-checklist)
5. [Feature Priority Matrix](#5-feature-priority-matrix)
6. [Implementation Roadmap](#6-implementation-roadmap)
7. [Reference Links & Screenshots](#7-reference-links--screenshots)

---

## 1. Current State Assessment

### What Xin Fú City HAS today
| Feature | Status | Quality |
|---------|--------|---------|
| Top-down 2D grid rendering (30×30 tiles, 32px) | ✅ Working | Basic flat tiles with simple building shapes |
| RCI zones (Residential, Commercial, Industrial) | ✅ Working | 3 levels each, simple growth logic |
| RCI demand meter | ✅ Working | Basic supply/demand calculation |
| Power system (plant + radius) | ✅ Working | Simple 6-tile radius, no power lines functional |
| Road system | ✅ Working | Adjacency check for zone growth |
| Pollution | ✅ Working | Simple radius-based spread from industrial |
| Traffic cars | ✅ Working | Basic car sprites on roads |
| Tax slider (0-20%) | ✅ Working | Affects happiness & growth |
| Happiness | ✅ Working | Single 0-100 value |
| Day/night cycle | ✅ Working | Subtle tint overlay |
| Special buildings (BT Tower, Throne, Grill, etc.) | ✅ Working | Flat cost, flat income/happiness |
| 3D view mode (Three.js) | ✅ Working | Toggle between 2D/3D |
| Minimap | ✅ Working | 72×72px corner |
| Tutorial overlay | ✅ Working | 5-step intro |
| Sound effects (Web Audio) | ✅ Working | Simple beeps/tones |
| Firebase multiplayer | ✅ Working | Presence + shared city |
| Driving mode | ✅ Working | D-pad car control |

### What Xin Fú City LACKS vs SC3K
| Missing Feature | SC3K Had It | Impact |
|-----------------|-------------|--------|
| **Isometric camera view** | ✅ Core | Defining visual identity |
| **Land value system** | ✅ Core | Drives building wealth tier |
| **Aura (citizen happiness by area)** | ✅ Core | Location-based, not global |
| **Water pipes / plumbing** | ✅ Core | Required for dense zones |
| **Garbage/waste management** | ✅ Core | Landfills, recycling, incinerators |
| **Education system** | ✅ Core | Schools, colleges, museums, EQ |
| **Health system** | ✅ Core | Hospitals, clinics |
| **Crime & police** | ✅ Core | Stations, coverage, crime maps |
| **Fire coverage** | ✅ Core | Stations, flammability maps |
| **Multiple zone densities** (light/medium/dense) | ✅ Core | Key progression |
| **Advisor system** | ✅ Core | Personality-driven feedback |
| **News ticker** | ✅ Core | Flavor + alerts |
| **Data view overlays** | ✅ Core | 10+ map modes |
| **Ordinances** | ✅ Core | Policy choices with tradeoffs |
| **Rewards & landmarks** | ✅ Core | Population milestone unlocks |
| **Neighbor deals** | ✅ Core | Buy/sell power, water, garbage |
| **Business deals** | ✅ Core | Income with downsides |
| **Subway / rail / highway** | ✅ Core | Transit depth |
| **Seaports & airports** | ✅ Core | Cap relief for industry/commerce |
| **Parks, plazas, marinas, zoos** | ✅ Core | Aura/land value boosters |
| **Trees and landscaping** | ✅ Core | Pollution mitigation, aesthetics |
| **Building sprites with height/detail** | ✅ Core | Visual reward for growth |
| **Shadows & lighting** | ✅ Core | Depth perception |
| **Terrain elevation** | ✅ Core | Hills, valleys, building constraints |
| **Disasters** | ✅ Core | Earthquakes, fires, tornadoes, etc. |

---

## 2. Visual Upgrade Checklist

### 2A. Camera & Rendering
- [ ] **Isometric tile rendering** — Switch from flat top-down to 2:1 isometric projection (30° angle). Render tiles as diamond shapes with height. Use Canvas 2D transform matrix or compute iso coordinates: `isoX = (x - y) * TILE_W/2; isoY = (x + y) * TILE_H/2`.
- [ ] **Tile depth/height** — Buildings should have visible height via stacked sprite slices or simple voxel-style extrusion. Level 1 = 1 story, Level 2 = 3 stories, Level 3 = 6+ stories.
- [ ] **Shadow casting** — Buildings cast directional shadows on tiles behind/beside them. Calculate shadow offset from building height.
- [ ] **Tile elevation layers** — Support 2-3 elevation levels (raised terrain). Higher ground = different grass shade, requires ramps/slopes for roads.
- [ ] **Anti-aliasing on tile edges** — Smooth diamond edges, especially where water meets land.

### 2B. Building Visuals
- [ ] **Wealth-tier visual variants** — Each zone level shows 3 variants by land value: poor (run-down, brown/gray), middle (clean, standard colors), wealthy (luxury, bright with details). SC3K groups buildings by economic class creating distinct neighborhoods.
- [ ] **Multi-tile buildings** — Dense commercial/residential can grow into 2×2, 3×3, and 4×4 footprint buildings at high wealth/density. These are the iconic SC3K skyscrapers.
- [ ] **Building detail sprites** — Add windows (lit at night), rooftop details (AC units, water towers, antennas), ground-floor details (storefronts, garages).
- [ ] **Animated buildings** — Smoke from factories/industrial, steam from power plants, blinking lights on towers, construction animation when leveling up.
- [ ] **Construction stages** — When a zone first develops, show scaffolding/construction frame for a few ticks, then reveal the building.
- [ ] **Abandoned/burned buildings** — When zones lose value or are disaster-damaged, show boarded-up or charred variants.

### 2C. Zone Colors & Zoning Visuals
- [ ] **SC3K zone color coding** — Keep current: Green=R, Blue=C, Yellow/Orange=I. Add zone density transparency: Light = 40% opacity fill, Medium = 60%, Dense = 80%. Show the zoning tint beneath buildings.
- [ ] **Zone development border** — When placing zones, show a pulsing colored outline matching the zone type. SC3K shows clear zone boundaries.
- [ ] **Filler tiles** — SC3K fills undeveloped zone tiles with context-appropriate decoration: lawns, parking lots, small parks, tennis courts (wealthy residential), garbage (poor areas).

### 2D. Environment
- [ ] **Water rendering** — Animated water with subtle wave/shimmer effect. Coastlines should have a lighter blue edge.
- [ ] **Tree varieties** — Multiple tree types (pine, deciduous, palm). Cluster trees on unused grass tiles near water/features.
- [ ] **Road rendering** — Roads should show lane markings, intersections with crosswalks, highway = wider with median. Road connections to zones should be visually obvious.
- [ ] **Night lighting** — At night, building windows light up (yellow glow), streetlights along roads (warm pools of light), headlights on traffic cars. This is a signature SC3K visual.

### 2E. Weather & Atmosphere
- [ ] **Clouds** — Occasional cloud shadows drifting across the map.
- [ ] **Rain** — Random weather events. Rain reduces pollution temporarily. Visual: diagonal lines + puddle reflections.
- [ ] **Fog/smog** — Heavy pollution areas show visible smog clouds.

---

## 3. Simulation Depth Checklist

### Priority order for new systems (each builds on the previous):

### 3A. Land Value System (Foundation for everything else)
- [ ] **Per-tile land value** (0-100) — Computed from multiple factors:
  - Pollution (negative): -2 per pollution point above 3
  - Crime (negative): -1 per crime point above 2
  - Distance from city center (positive for central tiles): +1 per tile closer to center
  - Nearby parks/water/features (positive): +5 to +15
  - Nearby bad buildings (negative): jail, landfill, dirty industry -5 to -10
  - Aura modifier: ±5% global modifier
  - Plumbing/water availability: +10 if watered
  - Education/health coverage: +3 to +8
- [ ] **Wealth tiers from land value** — 0-30 = low income (slums), 31-65 = middle income, 66-100 = high income (luxury). Building appearance changes accordingly.
- [ ] **Land value map overlay** — Color gradient from red (low) through yellow to green (high).

### 3B. Aura System (Happiness by area, not global)
- [ ] **Per-tile aura** — General environmental happiness. Improved by: parks, trees, low pollution, low crime, good education/health coverage, rewards/landmarks. Decreased by: garbage, pollution, high crime, business deals.
- [ ] **City-wide average aura** — Displayed in HUD, affects global land value modifier.
- [ ] **Aura map overlay** — Green (good) to red (bad) gradient.

### 3C. Water / Plumbing System
- [ ] **Water towers / pumps** — Provide water within a radius (like power).
- [ ] **Pipes** — Extend water like power lines extend power.
- [ ] **Water coverage requirement** — Medium & dense zones require water to develop beyond level 1. No water = capped at light density.
- [ ] **Water map overlay** — Blue = covered, gray = no water.

### 3D. Garbage / Waste Management
- [ ] **Garbage generation** — Each building produces garbage per tick. Accumulates if not collected.
- [ ] **Landfill zones** — Must be zoned near roads (6 tiles). Absorbs garbage but lowers nearby land value.
- [ ] **Incinerators** — Burn garbage for power but create pollution.
- [ ] **Recycling center** — Reduces garbage, small pollution.
- [ ] **Garbage pile visuals** — Uncollected garbage shows as trash piles on filler tiles.

### 3E. Education System
- [ ] **Elementary school** — Coverage radius, boosts EQ of nearby residential.
- [ ] **High school** — Larger radius, higher EQ boost.
- [ ] **College/University** — City-wide EQ boost, raises industrial demand (high-tech).
- [ ] **Museum** — Sustains EQ for adults, aura boost.
- [ ] **Library** — Small EQ boost, aura boost.
- [ ] **EQ (Education Quotient)** — 0-200 scale. Affects job quality, industrial demand type (dirty → clean industry).
- [ ] **Education map overlay** — Show school coverage areas.

### 3F. Health System
- [ ] **Clinic** — Small coverage radius, basic health boost.
- [ ] **Hospital** — Large radius, significant health boost.
- [ ] **Health rating** — Affects population growth rate and happiness.
- [ ] **Overcrowding** — If too many patients, effectiveness drops. Need multiple hospitals.

### 3G. Crime & Police
- [ ] **Crime generation** — Industrial areas, low-wealth residential, and business deals generate crime. Commercial areas are crime targets.
- [ ] **Police station** — Coverage radius reduces crime. Jail = holds criminals but lowers nearby land value.
- [ ] **Crime rate** — Per-tile value 0-100. High crime lowers land value and happiness.
- [ ] **Crime map overlay** — Red gradient showing hotspots.
- [ ] **Ordinance effects** — Youth curfew, neighborhood watch, community policing reduce crime.

### 3H. Fire Coverage
- [ ] **Flammability** — Per-tile value. Industrial = high flammability, residential = medium, parks/water = low.
- [ ] **Fire station** — Coverage radius reduces fire risk.
- [ ] **Fire events** — Random fires in high-flammability uncovered areas. Can spread to adjacent tiles.
- [ ] **Fire map overlay** — Red/orange/green gradient.

### 3I. Zone Density Tiers
- [ ] **Light density** — Current level 1 equivalent. Small buildings, no water required.
- [ ] **Medium density** — Requires water + power + road. Mid-rise buildings.
- [ ] **Dense density** — Requires water + power + road + low pollution. Skyscrapers, large factories.
- [ ] **Player selects density when zoning** — Like SC3K, choose light/medium/dense before placing. OR keep current level system but add density as a modifier.

### 3J. RCI Demand Improvements
- [ ] **Demand driven by real factors**:
  - Residential demand ← job availability (commercial + industrial jobs), tax rate, aura, pollution
  - Commercial demand ← population, land value, airport presence, seaport proximity
  - Industrial demand ← population (workforce), EQ (high EQ → clean industry), seaport, tax rate
- [ ] **Demand caps** — Population caps relieved by rewards (Mayor's House, City Hall, Theme Park, etc.) and special buildings (airports, seaports, spaceport).
- [ ] **Industrial evolution** — Starts dirty (factories, farms), transitions to clean industry (labs, tech) as EQ rises.

### 3K. Transit Depth
- [ ] **Bus stops** — Reduce traffic pollution, extend road effective range by 1 tile.
- [ ] **Subway system** — Underground transit. Subway stations + lines. Reduces surface traffic.
- [ ] **Rail** — Freight rail for industrial, passenger rail for commercial. Higher capacity than roads.
- [ ] **Highway** — Connects to neighbor cities. High speed, high capacity.
- [ ] **Traffic simulation** — Measure actual traffic per road tile. High traffic = pollution + slow commute. Transit options reduce traffic.
- [ ] **Traffic map overlay** — Green (free flow) → yellow → red (gridlock).

### 3L. Ordinances
Each ordinance has a monthly cost and gameplay effects:

**Financial:**
- [ ] Legalized Gambling — +$100/tick, +crime
- [ ] Parking Fines — +$50/tick, -happiness slightly

**Public Safety:**
- [ ] Community CPR Training — -$20/tick, +health
- [ ] Smoke Detectors — -$10/tick, -flammability
- [ ] Neighborhood Watch — -$15/tick, -crime
- [ ] Youth Curfew — -$10/tick, -crime, -happiness slightly

**Environmental:**
- [ ] Paper Waste Reduction — -$5/tick, +aura, -garbage
- [ ] Water Conservation — -$5/tick, -water consumption
- [ ] Clean Air Act — -$30/tick, -pollution from industry
- [ ] Nuclear-Free Zone — disables nuclear plant, +aura

**Transportation:**
- [ ] Shuttle Service — -$20/tick, +1 tile road range for zones
- [ ] Carpool Incentive — -$15/tick, -traffic pollution
- [ ] Alternate Day Driving — -$10/tick, -traffic but -commercial slightly

**Social:**
- [ ] Free Clinic — -$25/tick, +health in poor areas
- [ ] Homeless Shelters — -$20/tick, +land value, +aura
- [ ] Tourist Promotion — -$30/tick, +land value, +commercial demand
- [ ] Junior Sports — -$15/tick, +aura, -crime

### 3M. Rewards & Landmarks (Unlocked by Population)
| Reward | Pop Req | Effect |
|--------|---------|--------|
| Mayor's House | 5,000 | +aura, +land value (residential) |
| Lighthouse | 15,000 | +seaport demand, +aura |
| City Hall | 20,000 | +aura, sets downtown anchor |
| County Courthouse | 25,000 | +aura, +land value (R+C) |
| Statue | 35,000 | +land value downtown |
| National Park | 35+ parks | +aura, -pollution, +pop cap |
| Military Base | 80,000 | +C/I demand, but +crime/pollution/-LV |
| Medical Institute | 80,000 | +EQ, +industrial demand |
| Theme Park | 80,000 | +aura, +pop cap 200k |
| Performing Arts Center | 100,000 | +aura, +land value, +pop cap 85k |
| Country Club | 125,000 | +aura, +land value (residential) |
| Stock Exchange | 200,000 | +commercial aura/land value |
| Science Center | EQ>135 | +EQ, +C/I demand |
| University | EQ>105 | +EQ, +aura |
| Spaceport | Airport+2500 | +commercial demand massively |

### 3N. Neighbor Deals
- [ ] **Power deals** — Buy/sell electricity with neighbor cities
- [ ] **Water deals** — Buy/sell water
- [ ] **Garbage deals** — Pay neighbor to take garbage
- [ ] **Neighbor attitudes** — Relationship affects deal prices

### 3O. Disasters
- [ ] **Fire** — Spreads from high-flammability tiles
- [ ] **Earthquake** — Random, damages buildings in a line, creates terrain bumps
- [ ] **Tornado** — Random path of destruction
- [ ] **Riots** — High crime + low happiness triggers riots
- [ ] **Voluntary mode** — Disasters can be toggled off in settings

---

## 4. UI/UX Upgrade Checklist

### 4A. Main Toolbar Redesign (SC3K Style)
SC3K places the toolbar on the **right side** as a vertical button column. Each button opens a sub-menu.

- [ ] **Vertical toolbar on right edge** — 8 main buttons:
  1. 🏗️ **Landscape** — Trees, water, terrain, bulldoze
  2. 🏘️ **Zones** — R/C/I (light/medium/dense), landfill, seaport, airport
  3. 🛣️ **Transportation** — Road, highway, rail, subway, bus stop
  4. ⚡ **Utilities** — Power plant, power lines, water tower, pipes, incinerator, recycling
  5. 🏛️ **Public Services** — Police, fire, school, college, hospital, museum, library, park
  6. 🤝 **Meet** — Advisors, petitioners, neighbor deals
  7. 📊 **Data** — All map overlays (population, land value, crime, pollution, traffic, aura, power, water, fire, education, health, flammability)
  8. ⚙️ **Settings** — Ordinances, disasters toggle, tax rates, budget, save/load

- [ ] **Sub-menu expansion** — Clicking a main button reveals a horizontal strip of related tools, pushing the main toolbar down/aside.
- [ ] **Hover tooltips** — Each tool shows name + cost + brief description.

### 4B. Advisor System
SC3K has ~7 advisors with distinct personalities and portraits. They send messages when their area needs attention.

- [ ] **Advisor characters** (adapted for Xin Fú theme):
  | Advisor | Department | Personality |
  |---------|-----------|-------------|
  | **City Planner** | Zoning & development | Professional, strategic |
  | **Finance Minister** | Budget & taxes | Cautious, numbers-focused |
  | **Utilities Director** | Power, water, garbage | Pragmatic, problem-solver |
  | **Police Chief** | Crime & safety | Gruff, action-oriented |
  | **Fire Marshal** | Fire coverage | Urgent, protective |
  | **Health & Education Commissioner** | Schools, hospitals | Caring, progressive |
  | **Environmental Advisor** | Pollution, parks, aura | Passionate, green-focused |

- [ ] **Advisor popup panel** — When an advisor has something to say, their portrait appears with a speech bubble. Click to read full message. Messages include:
  - Alerts (problems): "Crime is rising in sector 4!"
  - Advice (suggestions): "Consider building a school near the new residential area."
  - Congratulations: "Your city has reached 10,000 residents!"
  - Requests (petitioners): "Citizens are requesting a park in the west district."
- [ ] **Advisor mood states** — Portrait shows happy/neutral/stressed based on their department's health.
- [ ] **Click to dismiss** or auto-dismiss after 10 seconds. Persistent issues show as a notification badge on the Meet button.

### 4C. News Ticker
- [ ] **Bottom-of-screen scrolling ticker** — Classic SC3K feature. Continuously scrolls headlines.
- [ ] **Message types**:
  - **City events**: "New shopping center opens downtown!"
  - **Data alerts**: "Pollution reaches dangerous levels in sector 7"
  - **Advisor alerts**: Underlined, clickable → opens advisor popup
  - **Flavor/humor**: SC3K-style silly headlines ("Aliens demand better zoning regulations!"
  - **Disaster warnings**: "Fire reported near industrial district!"
- [ ] **Clickable headlines** — Underlined headlines open the relevant advisor message or jump to the problem area.

### 4D. Data View Overlays
Click the 📊 button to open the data view menu. Each overlay tints the map:

- [ ] **Population density** — Blue gradient showing where sims live
- [ ] **Land value** — Red (low) → yellow → green (high)
- [ ] **Crime rate** — Red gradient with hotspot markers
- [ ] **Pollution** — Brown/gray gradient
- [ ] **Traffic** — Green → yellow → red on roads
- [ ] **Aura** — Green (good) → red (bad)
- [ ] **Power coverage** — Yellow = powered, dark = unpowered
- [ ] **Water coverage** — Blue = plumbed, gray = dry
- [ ] **Fire risk** — Orange/red gradient
- [ ] **Flammability** — Red gradient
- [ ] **Education coverage** — Blue gradient showing school radii
- [ ] **Health coverage** — Green gradient showing hospital radii
- [ ] **Zoning view** — Pure zone colors with no buildings (planning mode)

Each overlay includes a **legend** showing what the colors mean.

### 4E. Budget Panel Enhancement
- [ ] **Detailed budget breakdown**:
  ```
  REVENUE
    Residential tax:     +$2,450
    Commercial tax:      +$1,200
    Industrial tax:      +$1,800
    Other income:        +$500
  EXPENSES
    Road maintenance:     -$320
    Power plants:         -$200
    Water systems:        -$150
    Police:               -$400
    Fire:                 -$300
    Education:            -$500
    Health:               -$350
    Garbage:              -$180
    Ordinances:           -$120
  NET: +$1,530/month
  ```
- [ ] **Tax rate per zone type** — SC3K lets you set different rates for R, C, I
- [ ] **Ordinance cost summary** — Shows total ordinance spending
- [ ] **Neighbor deals summary** — Shows active deal costs/income

### 4F. Query/Inspect Enhancement
- [ ] **Rich tile inspection** — Clicking a tile shows:
  - Building type, level, wealth tier
  - Land value, pollution, crime, aura, traffic
  - Power/water status
  - Population served (for service buildings)
  - "What this tile needs:" suggestions (e.g., "Needs water", "Too much pollution")
- [ ] **Service radius display** — When inspecting a station/school, show its coverage radius on the map.

### 4G. Mini-Map Enhancement
- [ ] **Larger minimap** (120×120 instead of 72×72)
- [ ] **Click to navigate** — Click minimap to center main view there
- [ ] **Overlay toggle** — Minimap can show zone colors, land value, or pollution
- [ ] **Viewport indicator** — White rectangle on minimap showing current view area

### 4H. Controls & Camera
- [ ] **Smooth panning** — Drag to pan with momentum/inertia
- [ ] **Pinch-to-zoom** on mobile, scroll-wheel zoom on desktop
- [ ] **Edge pan** — Move mouse/screen to edge to pan in that direction
- [ ] **Keyboard shortcuts** — Number keys for common tools (1=Road, 2=Res, 3=Com, 4=Ind, etc.)
- [ ] **Right-click to inspect** — Quick query any tile
- [ ] **Zone drag-paint** — Click and drag to zone multiple tiles at once (already partially works)
- [ ] **Undo last action** — Ctrl+Z to undo last build/bulldoze within same tick

### 4I. Notifications & Feedback
- [ ] **Toast notifications** — Already exists, expand for: reward unlocks, milestone reached, advisor alerts, disaster warnings
- [ ] **Achievement/milestone popups** — "Population reached 1,000!" / "First skyscraper!" / "City rated #1"
- [ ] **Visual feedback on placement** — Already has floaters + particles. Add: green glow for valid placement, red for invalid
- [ ] **Sound variety** — Different sounds for different events (new building, level up, disaster, reward unlock, tax collected)

---

## 5. Feature Priority Matrix

### P0 — Must Have for SC3K Feel (MVP+)
*These are the features that make the game recognizably SimCity-like*

| # | Feature | Effort | Impact | Dependencies |
|---|---------|--------|--------|-------------|
| 1 | **Isometric rendering** | High | Critical | None — visual foundation |
| 2 | **Land value system** | Medium | Critical | None — drives building appearance |
| 3 | **Wealth-tier building variants** | Medium | Critical | Land value |
| 4 | **Zone density selection** (light/medium/dense) | Medium | High | Land value |
| 5 | **Data view overlays** (at least: land value, pollution, crime, traffic) | Medium | High | Land value, crime, traffic systems |
| 6 | **Advisor popup system** (at least 4 advisors) | Medium | High | Simulation systems to report on |
| 7 | **News ticker** | Low | High | None — pure UI |
| 8 | **Building height/shadows** | Medium | High | Isometric rendering |
| 9 | **Night window lighting** | Low | High | Building rendering |
| 10 | **Vertical right-side toolbar** | Medium | High | None — UI restructure |
| 11 | **Enhanced budget panel** | Low | Medium | Tax system per zone |
| 12 | **Per-zone tax rates** | Low | Medium | Budget panel |

### P1 — Important for Depth (Next Iteration)
*These add the simulation depth SC3K is known for*

| # | Feature | Effort | Impact | Dependencies |
|---|---------|--------|--------|-------------|
| 13 | **Crime & police system** | Medium | High | Per-tile crime values |
| 14 | **Fire coverage & fires** | Medium | High | Flammability per tile |
| 15 | **Education system** (school, college, EQ) | Medium | High | Aura + land value |
| 16 | **Health system** (clinic, hospital) | Low-Med | Medium | Population simulation |
| 17 | **Water/plumbing system** | Medium | High | None |
| 18 | **Garbage/waste management** | Medium | Medium | Landfill zone type |
| 19 | **Parks & landscaping** (trees, plazas, marinas) | Low | Medium | Aura/land value |
| 20 | **Ordinances** (at least 10) | Medium | Medium | Various systems |
| 21 | **Rewards/landmarks** (population-triggered) | Medium | High | Population tracking |
| 22 | **Multi-tile buildings** (2×2, 3×3 skyscrapers) | High | High | Isometric + land value |
| 23 | **Aura system** (per-tile) | Medium | Medium | Various inputs |
| 24 | **Enhanced RCI demand** (caps, job-driven) | Medium | High | Education, services |
| 25 | **Bus stops + traffic simulation** | Medium | Medium | Road system |
| 26 | **Construction animation** | Low | Medium | Building rendering |

### P2 — Nice to Have (Polish & Advanced)
*These add longevity and advanced gameplay*

| # | Feature | Effort | Impact | Dependencies |
|---|---------|--------|--------|-------------|
| 27 | **Airports & seaports** | Medium | Medium | Commercial/industrial caps |
| 28 | **Rail/subway system** | High | Medium | Transit depth |
| 29 | **Neighbor deals** | Medium | Low | Power/water/garbage systems |
| 30 | **Business deals** | Low | Low | Land value negatives |
| 31 | **Disasters** (fire, earthquake, tornado) | High | Medium | Fire system |
| 32 | **Terrain elevation** | High | Medium | Rendering overhaul |
| 33 | **Weather** (rain, clouds, fog) | Medium | Low | Particle system |
| 34 | **Save/load city** (already partial — localStorage) | Low | Medium | None |
| 35 | **Scenario/challenge mode** | High | Low | Game state |
| 36 | **Custom landmark import** | Low | Low | Reward system |
| 37 | **Replay/time-lapse** | Medium | Low | State history |

---

## 6. Implementation Roadmap

### Phase 1: Visual Foundation (est. 2-3 sessions)
**Goal:** Make the game LOOK like SC3K

1. **Switch to isometric rendering**
   - Convert tile grid from `(x,y)` screen coords to isometric projection
   - Draw tiles as diamonds with height offset
   - Implement depth sorting (draw back-to-front)
   - Add camera pan/zoom for iso view

2. **Add building height and shadows**
   - Each building level = N stories tall (rendered as stacked slices)
   - Simple directional shadow from sun angle
   - Roof details (color variation, small features)

3. **Night window lighting**
   - During night cycle, building windows glow yellow
   - Streetlights cast warm light pools on roads
   - Car headlights as small moving light dots

4. **Wealth-tier visual variants**
   - 3 appearance tiers per zone type per level
   - Tier driven by land value (implement basic land value first if needed)

5. **Redesign toolbar to vertical right-side layout**

### Phase 2: Simulation Depth (est. 3-4 sessions)
**Goal:** Make the game PLAY like SC3K

1. **Land value system** (prerequisite for everything)
2. **Aura system** (per-tile, feeds back into land value)
3. **Crime & police**
4. **Fire coverage & flammability**
5. **Education system & EQ**
6. **Health system**
7. **Water/plumbing**
8. **Garbage/waste**

### Phase 3: Content & Polish (est. 2-3 sessions)
**Goal:** Fill out the SC3K feature set

1. **Zone density tiers** (light/medium/dense selection)
2. **Ordinances** (10+ with real effects)
3. **Rewards & landmarks**
4. **Parks, trees, landscaping tools**
5. **Data view overlays** (all map modes)
6. **Advisor system** (7 advisors with popup panel)
7. **News ticker**
8. **Enhanced budget with per-zone taxes**

### Phase 4: Advanced Features (est. 2+ sessions)
1. **Multi-tile skyscrapers**
2. **Transit depth** (bus, subway, rail)
3. **Airports & seaports**
4. **Neighbor deals**
5. **Disasters**
6. **Terrain elevation**

---

## 7. Reference Links & Screenshots

### SimCity 3000 Screenshots & Visual References
- **SC3K screenshot gallery (SimCity Fandom):** https://simcity.fandom.com/wiki/Category:Images_from_SimCity_3000
- **SC3K on MobyGames (screenshots):** https://www.mobygames.com/game/4355/simcity-3000/screenshots/
- **Reddit thread with SC3K art style discussion:** https://www.reddit.com/r/SimCity/comments/o8dffg/i_really_like_the_art_style_graphics_and_colors/
- **SC3K ResetEra retro thread (gameplay impressions):** https://www.resetera.com/threads/rttp-sim-city-3000.259866/

### Gameplay Guides & Mechanics
- **SimCity 3000 Complete Guide (Ludo.guide):** https://www.ludo.guide/guide/simcity-3000
- **SC3K Strategy Guide (GameFAQs by Coffee):** https://gamefaqs.gamespot.com/pc/190488-simcity-3000/faqs/7102
- **SC3K Advisor & Ordinance FAQ:** https://gamefaqs.gamespot.com/pc/190488-simcity-3000/faqs/23650
- **SC3K Efficient City Build Guide:** https://gamefaqs.gamespot.com/pc/256694-simcity-3000-unlimited/faqs/43619
- **SC3K land value strategies (Simtropolis):** https://community.simtropolis.com/omnibus/other-games/increasing-land-value-strategies-in-simcity-3000-r815/
- **SC3K zone mechanics (SimPage.net):** https://simpage.net/simcity3/tips/957539533.shtml
- **SC3K land value factors (SimPage.net):** https://simpage.net/simcity3/tips/1021141358.shtml

### Rewards & Ordinances
- **SC3K Rewards & Opportunities list:** https://www.somacon.com/p613.php
- **SC3K Ordinances (Simtropolis forums):** https://community.simtropolis.com/forums/forum/388-sc3000-ordinances/
- **City Ordinance wiki (SimCity Fandom):** https://simcity.fandom.com/wiki/City_ordinance

### Advisors
- **Advisor wiki (SimCity Fandom):** https://simcity.fandom.com/wiki/Advisor
- **Advisor popup examples (Tumblr):** https://simlishnoir.tumblr.com/post/171941228936/can-you-share-your-simcity-3000-stuff-you-just

### News Ticker
- **List of news ticker messages (SimCity Fandom):** https://simcity.fandom.com/wiki/List_of_news_ticker_messages

### Manual
- **SC3K Unlimited Manual PDF:** https://excalet.com/technology/game_manuals/simcity_3000_unlimited.pdf
- **SC3K Unlimited Manual (Simtropolis):** https://community.simtropolis.com/files/file/31720-simcity-3000-unlimited-manual-pdf/
- **SC3K Game Manual (Scribd):** https://www.scribd.com/doc/223073721/SimCity-3000-Game-Manual

### SC3K UI Design Analysis
- **SimCity UI Design analysis (Chi Chan):** https://www.chichanart.com/simcity-2-1

### Zone Colors Reference
- **Zone wiki (SimCity Fandom):** https://simcity.fandom.com/wiki/Zone
- Green = Residential, Blue = Commercial, Yellow = Industrial
- SC3K added Medium density (between light and dense)
- SC3K low density industrial = farms only

### Data Maps
- **SC3K data maps (Coffee guide):** https://gamefaqs.gamespot.com/pc/190488-simcity-3000/faqs/7102
- Available maps: aura, crime, population density, power, flammability, land value, pollution, traffic, water supply

### Key SC3K Design Principles
1. **Land value is THE central system** — Nearly everything affects it. It determines building wealth tier, tax revenue, and visual appearance.
2. **Buildings grouped by economic class** — Poor/middle/wealthy neighborhoods emerge naturally from land value patterns. This creates the visual diversity that makes SC3K cities look real.
3. **Pollution is the primary antagonist** — Dirty industry, traffic, garbage, and power plants all create it. Managing pollution is the core challenge.
4. **Zones need escalating services** — Light zones need just road + power. Medium adds water. Dense needs low pollution too. This creates natural city progression.
5. **Road reach matters** — R: 4 tiles, C: 3 tiles, I: 5 tiles from road. Shuttle service ordinance adds +1. This makes road layout strategic.
6. **Filler tiles tell the story** — Empty zone tiles get auto-filled with contextual decoration (lawns, parking, parks, garbage). This is what makes SC3K cities look "lived in."
7. **Advisors provide personality** — They make the simulation feel alive by reacting to player decisions with character, not just numbers.
8. **The news ticker is the heartbeat** — Constant stream of information, humor, and alerts. Makes the city feel connected to a larger world.

---

## Appendix: Current Game State Summary

**File:** `xin-fu-city.html` (2,547 lines, single-file game)
**Grid:** 30×30 tiles, 32px each
**Rendering:** Canvas 2D top-down (with Three.js 3D toggle)
**Multiplayer:** Firebase (shared city, presence)
**Audio:** Web Audio API (synthesized tones)
**Save:** localStorage

**Existing Systems:**
- RCI zones with 3 levels
- Power (radius-based)
- Pollution (radius spread)
- Roads (adjacency check)
- Traffic (cars on roads)
- Happiness (global)
- Tax slider
- 8 special buildings
- Driving mode
- Day/night cycle
- Tutorial

**Key Architecture Notes for Future Work:**
- Single HTML file — may need splitting for maintainability as features grow
- State is global `state` object
- Render loop uses requestAnimationFrame
- Sim tick every 2000ms
- 3D mode uses separate Three.js scene
- Firebase integration in `firebase-shared.js`

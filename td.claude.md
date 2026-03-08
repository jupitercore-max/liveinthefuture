# td.claude.md — Tower Defense Game

## What Is This
A cooperative idle tower defense game at rayhe.net/td.html. Players place cannons on a shared canvas, and waves of enemies march down toward the base line. Cannons auto-fire at enemies. Multiplayer is powered by Firebase Realtime Database with a leader-election system — one client runs the simulation and syncs state to others.

## Architecture
- **Single HTML file** — inline CSS + JS, loads `firebase-shared.js` for Firebase SDK
- **Firebase Realtime DB** — stores cannon positions, enemy state, wave metadata, player presence
- **Leader election** — one client becomes "leader" and runs the game simulation tick, writes state snapshots every 2s. Others render from snapshots with client-side interpolation.
- **Deterministic waves** — seeded PRNG (`mulberry32`) generates the same enemies per wave number
- **Upgrade tree** — Basic → Path (Rapid/Power/Tech at Lv3) → Specialization (6 options at Lv6)

## Enemy Types
| Type | Wave | HP | Speed | Shape |
|------|------|----|-------|-------|
| Scout | 1+ | 1x | Fast | Circle |
| Grunt | 1+ | 1.5x | Medium | Circle |
| Tank | 5+ | 4x | Slow | Hexagon |
| Speedster | 10+ | 0.8x | Very fast | Diamond |
| Shielded | 15+ | 3x | Medium | Shielded circle |
| Boss | Every 10th | 15x | Very slow | Octagon |

## Cannon Upgrade Paths
- **Rapid** → Gatling (extreme fire rate) or Sniper (long range, high single-target)
- **Power** → Cannon (AoE splash) or Railgun (piercing shots)
- **Tech** → Tesla (chain lightning) or Frost (slow field)

## Bugs Found & Fixed

### 2026-03-08: Initial Fix Pass
1. **No player instructions** — New visitors saw a blank canvas with no clue what to do. Added an instruction overlay: "Click below the blue line to place your cannon"
2. **Firebase failure = dead game** — If Firebase didn't load (ad blocker, network issue), the entire game was non-functional. Added local-only single-player fallback.
3. **Smooth non-leader rendering** — Subagent added client-side enemy interpolation between Firebase snapshots (commit 14b587c)
4. **Wave start logic** — Ensured first cannon placement triggers wave start even for solo players
5. **Ground/terrain visuals** — Added terrain gradient and better visual hierarchy

### 2026-03-09: Base HP System
- **Replaced instant wave-fail with Base HP** — Previously a single enemy reaching the base = wave failed (felt harsh and unfair). Now the base has 20 HP. Each enemy that leaks through deals 1 damage (bosses deal 3). Game over only when HP hits 0.
- **Visual HP bar** at the base line with color-coded fill (green > yellow > red)
- **HUD heart indicator** with color change and pulse animation on damage
- **Red damage flash** on the canvas when enemies break through
- **HP regeneration** — +1 HP recovered per wave cleared (capped at max 20)
- **Game Over screen** with wave/kill stats and "Play Again" button
- **Full multiplayer sync** — baseHp synced through Firebase meta for all players
- **Smart reset** — new leader inheriting a game-over state auto-resets the game

### 2025-06-06: Score Popups & Combo System
- **Floating score popups** — When enemies die, "+XP" text floats upward and fades out at the kill location. Provides immediate visual feedback for every kill.
- **Combo system** — Killing enemies within 1.5s of each other builds a combo chain. At 2+ kills, a combo counter appears (top-right overlay with gold styling). Combo multiplier (capped at 10×) determines XP awarded per kill, incentivizing AoE/rapid-fire builds.
- **Visual escalation** — Combo kills get larger/more colorful popups: white (normal) → gold (2+) → orange (5+) → red (8+). More death particles spawn during combos too.
- **XP multiplier** — awardXP() and offlineAwardXP() now accept an xpAmount parameter, so combo kills grant proportionally more XP to all players' cannons.
- **State cleanup** — Combo state properly resets on game over / play again.

### 2025-06-06: Wave Preview & Screen Shake
- **Wave preview during countdown** — When a wave countdown begins, a panel appears at the bottom of the canvas showing all enemy types that will spawn, with mini-canvas icons drawn in their actual shape/color, type names, and counts (e.g., "scout ×5, tank ×3, boss ×1"). Uses the same deterministic RNG as wave generation to predict the composition. Helps players prepare strategy.
- **Screen shake system** — CSS-based camera shake with two intensities:
  - Light shake: when base takes normal damage, or combo hits 5 kills
  - Heavy shake: when boss damages the base, combo hits 10 kills, or game over
  - Uses CSS animations with `transform: translate()` for smooth performance
- **Non-leader sync** — Wave preview and screen shake properly handled for non-leader clients via Firebase state transitions
- **Boss wave indicator** — Boss waves now show "⚠ BOSS WAVE!" instead of just "BOSS WAVE!"

### 2025-06-06: Speed Controls (1×/2×/3×)
- **Game speed toggle** — Three speed buttons (1×, 2×, 3×) in the controls bar below the canvas. Lets players fast-forward through easy early waves.
- **Implementation** — Adjusts the simulation timer interval (`TICK_MS / gameSpeed`). At 2× speed, `simTick` runs twice as often; at 3×, three times as often. Visual fire timers and non-leader interpolation also scale by `gameSpeed`.
- **Speed indicator** — When speed > 1×, a "▶▶ 2×" or "▶▶▶ 3×" indicator appears at the top-left of the canvas with an accent glow.
- **Reset on game over** — Speed resets to 1× when the game restarts for a clean experience.
- **Button styling** — Compact pill-style button group that matches the existing dark theme. Active speed is highlighted with the accent blue.

### 2025-06-06: Early Send / Wave Skip for Bonus XP
- **"Send Next" button** — A new `⏩ Send Next` button in the controls bar lets players send the next wave early while enemies are still alive. Creates overlapping waves for increased challenge and reward.
- **Bonus XP system** — Each early send grants a +25% base XP bonus, with +10% per consecutive early send (capped at 100%). The bonus applies to all XP earned from kills — both normal kills and ability kills — and stacks multiplicatively with the combo system.
- **Visual feedback** — Green bonus popup (🎯 EARLY SEND! +X% XP) appears at top of canvas with animation. A persistent `⚡ +X% XP BONUS ⚡` indicator shows on the canvas while the bonus is active. The button itself shows the next available bonus percentage.
- **Risk/reward design** — Early sends spawn the full next wave on top of remaining enemies. Players get half HP regen instead of full. Bonus resets to 0 when a wave clears naturally (all enemies dead before sending next). Incentivizes aggressive play and AoE/crowd-control builds.
- **Controls** — Button with `[E]` keyboard shortcut. Only available during active waves when the player has a cannon placed. Disabled for non-leader clients in multiplayer.
- **State management** — Early send count, bonus percentage, and popup timer properly reset on game over/restart. Button state updates during game ticks.

### 2025-06-06: Active Abilities System
- **Per-cannon active abilities** — Each cannon gets a unique clickable ability based on its upgrade path. Abilities have cooldowns and add strategic depth beyond idle auto-fire.
- **Ability types:**
  - **Basic** (no path): Power Shot — 5× damage single target, 8s cooldown
  - **Rapid**: Rapid Burst — 10 instant shots at enemies in range, 10s cooldown
  - **Power**: Bombardment — massive AoE blast at target, 12s cooldown
  - **Tech**: EMP Pulse — freeze all enemies for 3s, 15s cooldown
  - **Gatling**: Bullet Storm — 20 rapid shots, 10s cooldown
  - **Sniper**: Headshot — instant kill (non-boss) or 20× dmg (boss), 15s cooldown
  - **Cannon**: Napalm — AoE + persistent burn zone, 14s cooldown
  - **Railgun**: Orbital Strike — piercing beam across map, 16s cooldown
  - **Tesla**: Chain Overload — lightning hits all enemies, 14s cooldown
  - **Frost**: Blizzard — 80% slow on all enemies for 5s, 12s cooldown
- **Targeting system**: Some abilities require clicking a target location (targeted), others activate immediately (non-targeted). "🎯 Click to target" indicator shown on canvas during targeting mode. Escape key cancels targeting.
- **Keyboard shortcut**: Press Q to activate ability.
- **Visual effects**: Ability zones rendered on canvas (explosions, beams, napalm burn zones, blizzard snowflakes, pulse rings). Projectile trails for direct attacks.
- **Cooldown UI**: Ability button in controls bar shows cooldown timer, progress bar, and pulsing animation when in targeting mode. Button text updates to show current ability name based on cannon spec.
- **Screen shake**: Abilities trigger screen shake effects (light for small abilities, heavy for bombardment/railgun/napalm).
- **Proper state reset**: Ability state (cooldown, targeting, zones) properly reset on game over/restart.

### 2025-06-06: Sell Cannon System
- **Sell button** — A new `🗑 Sell` button in the controls bar lets players sell their cannon and start fresh. Opens a confirmation modal (reuses the upgrade modal) showing cannon stats, kill count, and XP refund amount before confirming.
- **50% XP refund** — When selling, players get back 50% of their total accumulated XP (all leveling thresholds + current XP). The refund is "banked" in localStorage and automatically applied when the next cannon is placed, auto-leveling it up.
- **Confirmation modal** — Red-themed confirmation card prevents accidental sells. Shows cannon name/level, kill count, refund amount in green, and a warning that all upgrades will be lost.
- **Banked XP indicator** — When a cannon is sold and the player hasn't placed a new one yet, the placement hint shows "💰 X XP banked — place to apply!" in green text, so players know their refund is waiting.
- **Works in both modes** — Offline mode deletes cannon from local state; Firebase mode removes via `cannonsRef.child(playerId).remove()`. Refund XP is stored in localStorage so it persists across page refreshes.
- **State cleanup** — Selling resets ability cooldown, targeting mode, and relocate timer. Shows placement hint again. Banked XP is cleared on game reset (Play Again) since the cannon is reset anyway.
- **Sell button styling** — Danger-colored (red border/text) that matches the existing design language. Disabled when no cannon exists or during game over.

### 2025-06-07: Unique Cannon Visuals per Path/Specialization
- **Distinct cannon body shapes** — Each upgrade path and specialization now has a unique visual appearance so players can immediately tell cannon types apart:
  - **Basic** (no path): Simple circle body + standard barrel (unchanged, baseline reference)
  - **Rapid** (path): Circle with speed-lines trailing behind the barrel
  - **Power** (path): Pentagon-shaped body + thick barrel
  - **Tech** (path): Circle with rotating orbital ring segments
  - **Gatling** (spec): Square body with rounded corners + triple barrel + spinning hub
  - **Sniper** (spec): Slim diamond body + extra-long barrel with orange scope lens at tip
  - **Cannon** (spec): Large hexagonal body + wide trapezoidal barrel
  - **Railgun** (spec): Angular wedge body + dual parallel rail barrel with pulsing energy glow between rails
  - **Tesla** (spec): Circle with animated lightning arcs orbiting the coil + central ring
  - **Frost** (spec): Circle with 6 crystal/snowflake spikes + perpendicular ticks + pulsing frost mist aura
- **Animated effects** — Several specs have subtle animations: Gatling has a spinning barrel hub, Tesla has orbiting lightning arcs, Frost has pulsing mist, Railgun has pulsing energy between rails, Tech has rotating orbital rings. Animations use `Date.now()` for smooth 60fps movement.
- **Glow auras** — All upgraded cannons (path or spec selected) get a subtle pulsing glow aura in their path color, making them visually pop against the dark background.
- **Helper functions** — Added `drawCtxPolygon()` for drawing polygons on the main canvas context (separate from the existing `drawPolygon()` which is used for enemies) and `roundRect()` for rounded rectangle shapes.

### 2025-06-07: Boss Phase Mechanics
- **3-phase boss system** — Bosses are no longer HP sponges. They now have three distinct phases that trigger at HP thresholds, each introducing new mechanics and visual effects:
  - **Phase 1 — Shield (75% HP):** Boss generates a damage-absorbing shield equal to 30% of its max HP. All damage goes to shield first. When broken, a "💥 SHIELD BROKEN!" popup appears with blue particle explosion. Shield is shown as rotating blue arc segments around the boss with a subtle glow.
  - **Phase 2 — Summon (50% HP):** Boss spawns 4 scout minions around it, each with 8% of boss's max HP. Minions use the same path system and have boosted speed (1.3×). Creates an "👹 SUMMON!" popup with red particles and heavy screen shake.
  - **Phase 3 — Enrage (25% HP):** Boss doubles its movement speed and turns bright red. A pulsing red aura surrounds it with rotating fire particles. "💀 ENRAGED!" popup with heavy shake makes it clear the boss is desperate.
- **Shield-aware damage system** — New `applyDamage(enemy, dmg)` helper function routes all damage through shield absorption first. All cannon hits, AoE splash, pierce, chain, ability damage, and even napalm DOT now use this function, so shields work consistently across all damage sources.
- **Enhanced boss visuals:**
  - Pulsing dark red aura around all bosses (even before phase triggers)
  - Slowly rotating octagon body (not static like regular enemies)
  - Inner detail octagon rotating at different speed
  - Phase transition white flash effect
  - Phase indicator dots below the boss (3 dots, colored by phase: blue/red/crimson)
  - "BOSS" label above the enemy
  - Wider HP bar (3× radius) for better visibility
  - Separate shield HP bar above the main HP bar (blue)
  - Enrage mode: red pulsing aura, 6 rotating fire particles, bright red body
- **Phase transition effects** — Each phase triggers screen shake (light for shield, heavy for summon/enrage), colored particle bursts, and floating text popups
- **Multiplayer sync** — Boss phase properties (`bossPhase`, `shieldHp`, `shieldMaxHp`, `enraged`, `baseSpeed`, `phaseFlashTimer`) are serialized in enemy state and synced via Firebase snapshots automatically

### 2025-06-07: Environmental Terrain Hazard Zones
- **Three hazard types** — Each wave deterministically generates 1-3 terrain hazard zones along the enemy path using a seeded PRNG (`waveNum * 3571`), ensuring consistent placement across multiplayer clients:
  - **🌿 Swamp** (green): Slows enemies to 40% speed while inside. Animated bubbling effect with murky green radial gradient.
  - **🔥 Lava** (orange-red): Deals damage-over-time every 0.2s. Damage scales with wave number (`0.15 * (1 + wave * 0.05)`). Glowing lava pool with animated bright veins and rising heat shimmer.
  - **⚡ Storm** (purple, wave 8+): Randomly zaps enemies for burst damage (`0.5 + wave * 0.08`). 30% chance per second while inside. Crackling lightning arcs with purple glow.
- **Scaling** — Number of hazards increases with waves: 1 hazard (waves 1-4), 2 hazards (waves 5-9), 3 hazards (waves 10+). Storm zones only appear from wave 8+.
- **Placement** — Zones placed between 15%-85% of the path to avoid spawn/base areas. Each has slight size variation (radius 38-60px).
- **Visual effects** — Each zone type has distinct animated rendering: radial gradients with pulsing alpha, bubbling particles (swamp), lava crack veins (lava), crackling lightning arcs (storm). Labels shown below each zone.
- **Damage particles** — Lava creates rising orange/red fire particles. Lightning creates purple zap particles with ⚡ score popups.
- **Wave preview integration** — Upcoming wave's hazards shown in the wave preview panel during countdown ("⚠ Hazards: 🌿 Swamp 🔥 Lava").
- **Non-leader sync** — Hazards generated deterministically from wave number + path, so non-leader clients regenerate matching hazard zones when receiving path updates. Swamp slow also applied in non-leader interpolation loop.
- **State management** — `terrainHazards` array cleared on game reset. Only one hazard affects an enemy at a time (first matching zone wins).

### 2025-06-07: Procedural Sound Effects System
- **Complete Web Audio API sound system** — All sounds are procedurally generated using oscillators and noise buffers. Zero external audio files needed, keeping the game a single self-contained HTML file.
- **Sound effects for all major game events:**
  - **Cannon fire** — Different sound per upgrade path/spec: basic (square wave pew), rapid/gatling (short high-pitched burst), sniper (long sawtooth sweep), power/cannon/railgun (deep boom + noise burst), tech/tesla (electric zap), frost (filtered noise whoosh)
  - **Enemy death** — Small pop for regular enemies, epic low explosion + noise burst for bosses
  - **Wave start** — Ascending 3-note chime for regular waves, ominous low dual-sawtooth horn for boss waves
  - **Wave clear** — Major chord (C-E-G) played simultaneously as a victory jingle
  - **Base damage** — Impact thud (sine sweep down) + crunch noise, heavier for boss damage
  - **Game over** — 4 descending sawtooth notes followed by a low rumble fade-out
  - **Level up** — Triumphant ascending C major arpeggio (C5-E5-G5-C6)
  - **Cannon placement** — Mechanical clunk (rising triangle wave) + confirmation ding
  - **Boss phases** — Shield: crystalline shimmer (ascending sine cascade), Summon: ominous rumble + stinger, Enrage: aggressive rising sawtooth screech
  - **Abilities** — Type-specific sounds: EMP/tesla (electric discharge noise), bombardment/napalm/orbital (big explosion), blizzard (wind whoosh), generic (rising triangle)
  - **Combo milestones** — Pitch increases with combo count for satisfying escalation
  - **Sell cannon** — Descending coin-clink pings
  - **Early send** — Urgent rising whoosh + high ding
- **Mute toggle button** — 🔊/🔇 button in the controls bar. Mute state persists in localStorage across sessions.
- **Sound throttling** — Shoot sounds limited to 3 per simulation tick to prevent audio overload during rapid-fire (gatling) combat.
- **Browser autoplay compliance** — AudioContext initialized on first user interaction (click/touch on canvas or unmute button) to comply with browser autoplay policies.
- **Master volume control** — All sounds go through a `soundVolume` multiplier (0.3) for pleasant default levels.

## Known Issues / TODO
- [ ] Mobile touch experience needs improvement (hard to precisely place cannons)
- [x] ~~No sound effects~~ → Full procedural sound effects system using Web Audio API
- [x] ~~No base HP system — single enemy reaching base = wave failed, feels harsh~~ → Base HP system added (20 HP, regen, game over)
- [x] ~~Score popup text when enemies die~~ → Floating XP popups with color and size scaling
- [x] ~~Screen shake on boss or wave fail~~ → Screen shake with light/heavy intensities
- [ ] Better onboarding/tutorial flow
- [ ] Achievement system
- [x] ~~Wave preview showing what's coming next~~ → Enemy type breakdown shown during countdown
- [x] ~~Better visual differentiation between cannon types~~ → Unique shapes, barrels, and animated effects per path/spec
- [x] ~~Combo system for rapid kills~~ → Kill combo system with multiplied XP rewards
- [x] ~~Active abilities (click to fire special shot)~~ → Per-cannon active abilities with targeting, cooldowns, and visual effects
- [x] ~~Environmental features (obstacles, terrain that slows enemies)~~ → Terrain hazard zones (swamp, lava, lightning storm)
- [x] ~~Mini-boss mechanics (special attacks, phases)~~ → 3-phase boss system with shield, summon minions, and enrage
- [ ] Better balancing at higher waves
- [x] ~~Speed controls (1x, 2x, 3x game speed)~~ → Speed toggle buttons with sim timer adjustment
- [x] ~~Wave skip / early send for bonus XP~~ → "Send Next" button overlaps waves for bonus XP
- [x] ~~Sell/reset cannon option~~ → Sell button with 50% XP refund banked for next cannon

## Hourly Improvement Cycle
Hatch runs a cron job every hour that:
1. Reads this file for context
2. Picks one improvement from the TODO list
3. Implements it in td.html
4. Updates this file
5. Commits and pushes to GitHub

## Style Notes
- Dark theme: `--bg: #1a1a2e`, accent `#1E90FF`
- Monospace fonts
- Mobile responsive with 600px breakpoint
- No external dependencies except Firebase SDK (CDN)

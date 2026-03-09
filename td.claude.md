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
| Flyer | 12+ | 1.2x | Fast | Triangle (ignores path) |
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

### 2025-06-07: Achievement System
- **18 achievements** — A complete achievement system that tracks player milestones and provides long-term goals for replayability:
  - **🩸 First Blood** — Kill your first enemy
  - **🌊 Wave Runner** — Reach wave 5
  - **🌊 Wave Master** — Reach wave 10
  - **🌊 Tidal Force** — Reach wave 20
  - **🌊 Unstoppable** — Reach wave 50
  - **💀 Boss Slayer** — Kill a boss
  - **🔥 Hot Streak** — Reach a 5× combo
  - **💥 Combo King** — Reach a 10× combo
  - **⚡ Speed Demon** — Use 3× speed
  - **🔀 Path Chosen** — Choose an upgrade path
  - **⭐ Specialist** — Choose a specialization
  - **🎯 Sharpshooter** — Get 100 kills in one game
  - **☠️ Mass Destruction** — Get 500 kills in one game
  - **🐦 Early Bird** — Use early send
  - **✨ Special Forces** — Use an active ability
  - **🛡️ Untouchable** — Clear wave 5 with full HP
  - **💰 Trade-In** — Sell a cannon
  - **👑 Maxed Out** — Reach level 10
- **Toast notifications** — Gold-bordered slide-in toast at top of screen when an achievement unlocks. Shows icon, name, and description with fade-out animation. Multiple toasts stack vertically.
- **Achievement panel** — 🏆 button in controls bar opens a full-screen overlay panel showing all 18 achievements in a 2-column grid. Unlocked achievements show gold border and unlock date; locked ones are dimmed with 🔒 icon.
- **Sound effect** — Custom triumphant ascending arpeggio (C5→E5→G5→C6) with triangle waves and a shimmering sine finish plays on unlock.
- **Persistent storage** — All unlocked achievements stored in `localStorage` (`td_achievements`) with timestamps. Achievements persist across sessions and page refreshes.
- **Hook points** — Achievement triggers placed at all relevant game events: enemy kills, boss kills, wave clears, combo milestones, speed changes, upgrade path/spec selection, early send, ability use, cannon sell, and level ups. Both offline and Firebase modes are covered.
- **Responsive** — Panel switches to single-column layout on mobile (≤600px).

### 2025-06-07: Interactive Tutorial / Onboarding System
- **6-step interactive tutorial** — A guided walkthrough that teaches new players the core gameplay mechanics through step-by-step tooltips with animated highlight spotlights:
  1. **Welcome** — Overview of the game concept (defend base, place cannons, survive waves)
  2. **Place Your Cannon** — Highlights the placement zone and explains click-to-place, auto-fire, and relocate
  3. **Defend Your Base** — Highlights the HP indicator and explains the 20 HP system, boss damage, and wave regen
  4. **XP & Leveling** — Highlights the XP bar and explains the level-up system, path choices at Lv3, specializations at Lv6
  5. **Abilities & Combos** — Highlights the ability button and explains active abilities (Q key) and combo multipliers
  6. **Pro Tips** — Highlights speed controls + send next button, explains speed toggle, early send bonus, and terrain hazards
- **Spotlight highlighting** — Each step spotlights a specific UI element using a CSS box-shadow trick (3000px spread creates the dark overlay with a cut-out). The highlight pulses with a smooth accent-blue glow animation.
- **Smart tooltip positioning** — Tooltips auto-position above or below the highlighted element based on available viewport space. Arrow indicators point toward the target. Repositions on window resize.
- **Progress dots** — Navigation dots at the bottom of the tooltip show current step, completed steps, and remaining steps.
- **First-time auto-show** — Tutorial automatically appears 800ms after first page load (tracked via `localStorage` key `td_tutorial_complete`). Doesn't interrupt returning players.
- **Skip & dismiss** — Players can skip with "Skip tutorial" button, click outside the tooltip, or press Escape to close at any time.
- **Help button (❓)** — New button in the controls bar lets players replay the tutorial at any time.
- **Mobile responsive** — Tutorial tooltip shrinks and adjusts on screens ≤600px.
- **No gameplay interference** — Tutorial runs as a pure UI overlay; doesn't pause or affect the game simulation.

### 2025-06-07: Wave Difficulty Scaling & Elite Enemies
- **Quadratic HP scaling** — Enemy base HP now scales as `(1 + wave * 0.15) * (1 + wave * 0.04)` instead of the old linear `1 + wave * 0.15`. This keeps early waves (1-10) nearly identical in feel, but waves 20+ become significantly harder. Example values:
  - Wave 1: 1.19 (was 1.15) — barely changed
  - Wave 10: 3.5 (was 2.5) — moderate increase
  - Wave 20: 7.2 (was 4.0) — notably harder
  - Wave 30: 12.1 (was 5.5) — challenging
  - Wave 50: 25.5 (was 8.5) — very hard, requires maxed cannon
- **Enemy speed scaling** — After wave 10, all enemies get 1.5% faster per wave, capped at +50% at wave ~43. Makes late-game positioning and slow effects (Frost/Swamp) more valuable. Bosses are exempt (they're already slow and have phase mechanics).
- **Elite enemies** — From wave 15+, regular enemies have a 15-30% chance (scaling with wave) to spawn as "elite" variants:
  - 2.5× HP, 1.1× speed, 1.25× visual size
  - Gold pulsing aura, gold border ring, and ★ star indicator above
  - Award 3× XP on kill (multiplicative with combo/early send bonuses)
  - Gold "★" suffix on XP popups for elite kills
  - Elite count shown in wave preview panel ("★ 4 Elites (3× XP)")
  - Deterministic via seeded RNG — all multiplayer clients see the same elites
- **Weighted enemy type selection** — From wave 10+, enemy composition shifts toward harder types instead of uniform random:
  - Tanks and shielded enemies become increasingly common
  - Speedsters appear more frequently
  - Scouts become rarer after wave 20, grunts after wave 25
  - Creates more strategic wave compositions that require diverse cannon builds
- **Wave preview accuracy** — `getWaveEnemyBreakdown()` updated to use the same weighted selection logic and elite chance, so the preview panel accurately reflects what will spawn.
- **No early-game impact** — All changes are designed to leave waves 1-10 feeling identical. The difficulty ramp is smooth and progressive, rewarding players who upgrade wisely.

### 2025-07-06: Prestige System (Persistent Meta-Progression)
- **Star currency** — Players earn stars at game over based on wave reached and kills. Formula: `floor(wave/3) + floor(kills/50)` with a minimum of 1 star per run. Stars persist in localStorage across all games.
- **5 prestige upgrades** with multiple levels each, purchasable with stars:
  - **🛡️ Tough Base** (5 levels, costs 1/2/3/5/7 ⭐): +3 max HP per level (up to +15, for 35 total HP)
  - **📚 Quick Learner** (3 levels, costs 2/4/7 ⭐): +15% XP gain per level (up to +45%)
  - **💚 Fortify** (3 levels, costs 2/5/8 ⭐): +1 HP regen per wave per level (up to +3, for 4 total regen)
  - **⚡ Arsenal** (3 levels, costs 3/5/8 ⭐): -12% ability cooldown per level (up to -36%)
  - **🔥 Cannon Mastery** (3 levels, costs 3/6/10 ⭐): +10% cannon damage per level (up to +30%)
- **Prestige panel** — ⭐ button (purple-themed) in the controls bar opens a full-screen overlay showing all upgrades with level pips (●○○), current effects, and buy buttons. Star balance shown at top.
- **Game over integration** — Stars earned shown on the game over screen with gold text, plus total balance and hint to visit prestige panel.
- **Gameplay effects deeply integrated:**
  - Tough Base: `getEffectiveMaxHp()` replaces all `BASE_MAX_HP` usage in HP logic, rendering, HUD, and reset
  - Quick Learner: XP multiplier applied in both `awardXP()` and `offlineAwardXP()` before XP is granted
  - Fortify: `getEffectiveRegen()` replaces `HP_REGEN_PER_WAVE` in wave clear and early send healing
  - Arsenal: Cooldown reduction applied when abilities fire and in cooldown bar display
  - Cannon Mastery: Damage multiplier applied in `applyDamage()` function, affecting all damage sources
- **2 new achievements:**
  - ⭐ **Investor** — Buy a prestige upgrade
  - 💎 **Fully Upgraded** — Max out a prestige upgrade
- **Sound effect** — Achievement sound plays when purchasing an upgrade
- **Prestige button** — Shows current star count in the toolbar, updates dynamically
- **Design philosophy** — Stars are earned slowly enough to feel meaningful (need wave 6+ to earn 2 stars) but fast enough that every run feels rewarding (always at least 1 star). Total cost to max everything is 78 stars, providing a long-term goal.

### 2025-07-06: Flying Enemy Type
- **New enemy type: Flyer** — A purple triangle-shaped enemy that appears from wave 12+. Unlike all other enemies, flyers **ignore the path** and fly in a straight line from a random spawn point at the top to a random target at the base. This adds genuine strategic depth: players need to position cannons to cover both the zigzag path AND the direct flight routes.
- **Stats** — 1.2× HP multiplier, speed 2.2 (between scout and speedster). Moderate threat: not tanky but dangerous because they bypass the path, terrain hazards, and swamp slowdowns.
- **Distinct visuals:**
  - Downward-pointing purple triangle body with inner highlight
  - Animated flapping wings (semi-transparent, sinusoidal wing motion)
  - Ground shadow beneath the flyer for depth perception
  - ✈ indicator above the enemy
- **Path-ignoring movement** — Flying enemies have their own coordinate system (`flyStartX`, `flyEndX`, `flyY`) and move in a straight line from top to base. They completely bypass terrain hazard zones (swamp, lava, lightning), making them a different tactical challenge.
- **Staggered spawning** — Flyers spawn with vertical stagger (35px apart) so they arrive in waves rather than all at once.
- **Wave preview integration** — Flyers shown in the wave preview panel with "✈ flyer" name and triangle icon. When flyers are present, an extra purple warning line reads "✈ Flyers ignore the path!" to alert players.
- **Weighted selection** — Flyers become increasingly common at higher waves via the weighted enemy selection system (weight increases by 0.12 per wave from wave 12).
- **New achievement** — ✈️ **Fly Swatter**: Kill 10 flying enemies in one game. Tracked via `flyerKills` counter that resets on game restart.
- **Multiplayer sync** — All flying properties (`flying`, `flyStartX`, `flyEndX`, `flyY`) serialize automatically via JSON in Firebase snapshots. Non-leader clients handle flyer interpolation separately from path-following enemies.
- **No existing mechanics broken** — Flyers interact normally with cannon targeting/damage, slow effects from frost cannons, boss phases (if a boss somehow were flying — it isn't), and all other systems. They simply move differently.

### 2025-07-06: Placement Preview & Enhanced Range Indicator
- **Ghost cannon placement preview** — When hovering in the placement zone (below the blue base line), a semi-transparent ghost cannon appears at the cursor position with its full range circle, crosshair, and label ("Click to place" or "Click to relocate"). Uses the current cannon's level/path/spec for accurate range preview when relocating. Only shows when placement is valid (no cooldown, not in ability targeting mode).
- **Enhanced range circle** — The player's cannon range indicator upgraded from a nearly invisible single stroke to a filled radial gradient (fades from transparent center to subtle blue edge) with a dashed border. Much easier to see at a glance during gameplay.
- **Hover stat tooltip** — Moving the mouse within 30px of your cannon shows a compact floating tooltip with:
  - Cannon name and level (colored by upgrade path)
  - DPS (damage × fire rate)
  - Range in pixels
  - Special stats when applicable: splash radius, pierce count, chain count, slow percentage
  - Kill count
  - Tooltip auto-positions above cannon, flips below if too close to top edge, clamps to canvas bounds
- **Mouse tracking system** — Added `mousemove` and `mouseleave` event listeners on canvas for both offline and Firebase modes. Cursor position tracked in canvas coordinates with proper DPI scaling.
- **Pulsing preview border** — The ghost cannon's range circle border gently pulses (sinusoidal alpha modulation) to draw attention and feel alive.
- **No mobile impact** — Mouse events don't fire on touch devices. Touch-based placement continues to work identically via existing `touchend` handler.

## Known Issues / TODO
- [x] ~~Mobile touch experience needs improvement~~ → Touch ripple feedback, tap-on-cannon stat tooltip, bigger buttons, touch-action:none on canvas
- [x] ~~No sound effects~~ → Full procedural sound effects system using Web Audio API
- [x] ~~No base HP system — single enemy reaching base = wave failed, feels harsh~~ → Base HP system added (20 HP, regen, game over)
- [x] ~~Score popup text when enemies die~~ → Floating XP popups with color and size scaling
- [x] ~~Screen shake on boss or wave fail~~ → Screen shake with light/heavy intensities
- [x] ~~Better onboarding/tutorial flow~~ → Interactive 6-step tutorial with spotlight highlights, auto-show for first-timers, and ❓ help button to replay
- [x] ~~Achievement system~~ → Full achievement system with 18 achievements, toast notifications, and persistent localStorage tracking
- [x] ~~Wave preview showing what's coming next~~ → Enemy type breakdown shown during countdown
- [x] ~~Better visual differentiation between cannon types~~ → Unique shapes, barrels, and animated effects per path/spec
- [x] ~~Combo system for rapid kills~~ → Kill combo system with multiplied XP rewards
- [x] ~~Active abilities (click to fire special shot)~~ → Per-cannon active abilities with targeting, cooldowns, and visual effects
- [x] ~~Environmental features (obstacles, terrain that slows enemies)~~ → Terrain hazard zones (swamp, lava, lightning storm)
- [x] ~~Mini-boss mechanics (special attacks, phases)~~ → 3-phase boss system with shield, summon minions, and enrage
- [x] ~~Better balancing at higher waves~~ → Quadratic HP scaling, speed scaling, elite enemies, weighted type selection
- [x] ~~Speed controls (1x, 2x, 3x game speed)~~ → Speed toggle buttons with sim timer adjustment
- [x] ~~Wave skip / early send for bonus XP~~ → "Send Next" button overlaps waves for bonus XP
- [x] ~~Sell/reset cannon option~~ → Sell button with 50% XP refund banked for next cannon
- [x] ~~Persistent meta-progression / prestige system~~ → Stars earned at game over, 5 permanent upgrades with multiple levels
- [x] ~~Better cannon placement UX~~ → Ghost cannon placement preview with range circle, hover stat tooltip with DPS/range/specials

### Power-Up Drops System (Fully Wired)

### Wave Summary & Grade System
- **Post-wave stats overlay** — After every wave clears, a centered panel shows performance stats and a letter grade (S/A/B/C/D/F). Provides satisfying feedback between waves — a classic game design pattern that was missing despite all the other polish.
- **Per-wave stat tracking:**
  - 🎯 **Kills** — enemies killed vs total spawned (kill efficiency)
  - ❤️ **HP Lost** — damage taken during the wave
  - 🔥 **Best Combo** — highest combo chain achieved during the wave
  - ⏱ **Time** — wave completion time
- **Grade calculation** — Weighted score from four factors:
  - **HP Preservation (40%):** 1.0 = no damage, 0 = lost all HP. Most important factor.
  - **Kill Efficiency (30%):** kills / enemies spawned. Penalizes letting enemies leak through.
  - **Combo Score (15%):** best combo relative to wave-scaled target (2 + wave × 0.3, capped at 8).
  - **Speed Score (15%):** faster clears = higher score, baseline ~1.2s per enemy.
- **Grade thresholds:** S (≥95%), A (≥80%), B (≥65%), C (≥45%), D (≥25%), F (<25%)
- **Visual design:** Dark panel with accent border, grade letter in large text with color-coded glow (gold S, green A, blue B, orange C, red D, gray F), stat grid, and a score bar showing the weighted total.
- **Auto-dismiss:** Panel disappears after 2.5 seconds or on click. Doesn't block gameplay.
- **State management:** Wave stats reset on wave start, on game over, and on game restart. Panel dismissed on game over to not overlap with the game over screen.
- **5 power-up types** drop from killed enemies with weighted random selection:
  - 💚 **Heal** (+3 HP, weight 3) — instant base repair
  - ⚔️ **Damage** (+50% DMG for 8s, weight 2) — applied in `applyDamage()`
  - ⚡ **Speed** (2× fire rate for 8s, weight 2) — applied via `getFireRateMultiplier()`
  - ✨ **XP** (3× XP for 10s, weight 2) — applied via `getXPMultiplier()` in all award paths
  - 💥 **Nuke** (kill all non-boss enemies, weight 1) — rare but devastating
- **Drop chances**: 6% per kill, 25% for elites, 80% for bosses
- **Collection**: Auto-collected within 35px of cannon position
- **Visual rendering**: Bobbing animation with glow, colored circles, emoji icons, fade-out on expiry
- **Active buff indicators**: Timer bars in top-right showing remaining buff duration with progress bars
- **Sound effect**: Ascending sine sweep on collection (`sfxPowerupCollect`)
- **Full integration**: Drops in both leader simTick and non-leader checkAbilityKills paths, rendering in drawFrame, proper reset on game over

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

## CRITICAL: Syntax Validation
Before committing ANY change to td.html, ALWAYS run this check:
```bash
python3 -c "
import re
with open('td.html') as f:
    html = f.read()
scripts = re.findall(r'<script[^>]*>(.*?)</script>', html, re.DOTALL)
largest = max(scripts, key=len)
with open('/tmp/td_check.js', 'w') as f:
    f.write(largest)
" && node --check /tmp/td_check.js
```
If it fails, DO NOT commit. Fix the error first.

### Past Bugs
- **2026-03-08**: Duplicate `const lifetimeStats` declaration (prestige system added a second declaration when one already existed). Broke entire game. Fix: use assignment instead of declaration.

### 2026-03-09: Splitter Enemy Type
- **New enemy type: Splitter** — A teal-colored enemy that appears from wave 18+. When killed, the parent splits into 2 smaller, faster children that continue along the path. Children do NOT split again (no infinite recursion). This is a classic TD mechanic (inspired by Bloons, Kingdom Rush) that adds target prioritization decisions.
- **Stats** — 2.5× HP multiplier, speed 1.3. Tanky enough to absorb damage, then the children (30% of parent max HP each, 1.4× parent speed) create a second wave of pressure.
- **Distinct visuals:**
  - Two overlapping semi-transparent circles with a teal core, creating an "about to split" look
  - Pulsing vertical divide line on the parent (absent on children)
  - Children are brighter green (#55efc4) and smaller (radius 6 vs 10) to distinguish from parents
  - "💥 SPLIT!" popup and teal burst particles when parent dies
- **Strategic impact:** Forces players to consider overkill — AoE builds (Cannon, Tesla) handle the split children easily, while single-target builds (Sniper, Railgun) need to deal with the aftermath. Also makes positioning matter more since children inherit the parent's path progress.
- **Wave preview integration:** "🧬 Splitters spawn 2 children on death!" warning shown when splitters are in the upcoming wave.
- **Weighted selection:** Splitters become increasingly common from wave 18+ (weight grows by 0.1 per wave, capped at +2).
- **Children details:** `isChild: true` flag prevents recursive splitting. Children get no elite status. Children use the parent's pathProgress so they continue from the same location.
- **No existing mechanics broken:** Children interact normally with all damage, slow, terrain hazards, and targeting systems. The `enemies.push()` during the death loop is safe because the filter (`enemies = enemies.filter(e => !e.dead)`) runs after the loop.

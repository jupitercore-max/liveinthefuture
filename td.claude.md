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

### 2026-03-09: Major Gameplay Overhaul — Upgrades, Enemies, Lightning, Ultimate

#### 1. Upgrade System Expanded (10 → 20 levels)
- **XP curve** changed from linear (`lvl * 50`) to quadratic (`30*lvl + 2*lvl²`) — early levels fast, late levels earned
- **Per-level scaling** uses diminishing returns: levels 1-10 give +8%/level, 11-20 give +4%/level
- **Milestone bonuses** at key levels:
  - Lv5: +5% armor pierce
  - Lv8: +8 splash radius
  - Lv12: +15% armor pierce
  - Lv15: all cannons get minor slow (10%)
  - Lv18: +30% armor pierce mastery
  - Lv20: capstone — +20% damage, +15% fire rate, +10% range
- **Specialization scaling** — Tesla chains increase with level (3 + level/4), Railgun pierce increases (3 + level/5), Cannon splash grows (+2/level), Gatling gets fire rate boost at Lv15
- **armorPierce** stat added to cannon stats, passed through all damage functions

#### 2. Three New Enemy Types
- **Healer** (wave 14+, green cross): Heals nearby allies for 15% maxHP every 2 seconds within 60px radius. Green heal particles on targets. Pulsing green aura ring. Priority target — kill them first.
- **Armored** (wave 16+, gray hexagon): 60% damage reduction from all sources. Thick metallic border with rotating rivets. High-level cannons with armor pierce counter them (Sniper gets +50%, Railgun +30%, milestone bonuses help all cannons).
- **Phaser** (wave 20+, cyan diamond): Teleports 12% forward along the path every 4 seconds. Cyan particle burst at departure/arrival. Flickering dashed outline. Forces spread-out cannon placement.
- All three have mini-canvas icons for wave preview.

#### 3. Chain Lightning Visual Overhaul
- **Jagged bolt rendering** — `drawLightningBolt()` draws multi-segment paths with random perpendicular jitter, creating realistic zigzag lightning
- **Dual-layer rendering** — outer blue-white bolt (#88ccff) with inner bright core (#ffffff) and canvas shadowBlur glow
- **Branch bolts** — first chain bounce has 2 sub-branches, subsequent bounces have 1, each randomly spawning small side forks
- **Lightning bolt system** — `lightningBolts[]` array with per-bolt lifetime, rendered every frame with alpha fadeout
- **Chain Overload ability** upgraded to use lightning bolts (3 branches per bolt) + heavy screen shake + 3× damage (up from 2×)

#### 4. Rapid Fire Visual Progression
- **Barrel heat glow** — radial gradient from orange to red, intensity scales with fire rate multiplier. Pulsing animation. Appears at >30% of max fire rate.
- Applies to both Rapid path and Gatling specialization

#### 5. Ultimate Ability — "Apocalypse Protocol" (Prestige)
- **New prestige upgrade** — 3 tiers (costs 5/10/15 stars): Shockwave → Annihilation → Apocalypse
- **[U] key binding** + golden gradient button in controls bar
- **60-second cooldown** (displayed as countdown on button)
- **Damage scales with wave**: base × (1 + waveNum × 0.5), so it stays relevant at wave 50+
- **Tier 1 — Shockwave**: Deals 15× wave-scaled damage to all enemies. Expanding golden pulse. Screen flash. 40+ particles. Heavy screen shake.
- **Tier 2 — Annihilation**: 40× wave-scaled damage + lightning storm (bolts to all enemies with 3 branches each). Everything from Tier 1.
- **Tier 3 — Apocalypse**: 100× wave-scaled damage + delayed second damage wave (500ms later, 50% damage) with red pulse and more particles. True screen-clearing panic button.
- Bosses take 50% damage from Ultimate (still massive). Full armor pierce on all Ultimate damage.
- Screen flash overlay fades over 20 frames for dramatic white-out effect.

#### 6. Armor System
- `armorPierce` stat added throughout: getCannonStats returns it, applyDamage accepts it as third parameter
- Armored enemies reduce incoming damage by `(armor - armorPierce)` percentage
- All damage sources updated: main hits, pierce, chain, abilities
- Sniper naturally counters armor (+50% pierce), Railgun helps (+30%), all cannons get milestone pierce at Lv5/12/18

#### 7. Enemy Warning Labels
- `ENEMY_WARNINGS` object added with descriptive warnings for healer, armored, and phaser types

### 2026-03-09: Level-Up Celebration Effects & Milestone Notifications
- **Expanding ring effect** — When a cannon levels up, a colored ring expands outward from the cannon position with smooth alpha fadeout. Uses `levelUpRings[]` array rendered in drawFrame.
- **Particle burst** — 12 star particles (✦) spray radially outward from the cannon on every level-up. Particles have both horizontal (`vx`) and vertical (`vy`) velocity for a true circular burst effect. `vx` support added to the scorePopups renderer.
- **Level number popup** — "⬆ Level X" text floats up from the cannon in green.
- **Milestone celebrations** — Levels 5, 8, 12, 15, 18, and 20 get enhanced effects:
  - More particles (24 vs 12) with faster spread
  - Double expanding ring (inner + outer)
  - Larger, colored popup text with emoji + description:
    - Lv5: 🛡️ Armor Pierce!
    - Lv8: 💥 Splash Unlocked!
    - Lv12: ⚡ Heavy Pierce!
    - Lv15: 🧊 All Slow!
    - Lv18: 🔥 Armor Mastery!
    - Lv20: 👑 MAX LEVEL!
  - Screen shake (light for milestones, heavy for Lv20 capstone)
  - Milestone ring colors match the unlock theme (amber, red, purple, cyan, orange, gold)
- **State management** — `levelUpRings` array cleared on game reset. Ring rendering uses expanding radius with decreasing alpha and line width for smooth dissolve.
- **Design rationale** — With 20 levels now, each level-up was a non-event (just a sound). Players need visual reward feedback to feel the progression, especially since milestones unlock meaningful gameplay bonuses. The ring+particle combo is satisfying without being visually noisy — it fades in <1 second for normal levels, ~1.3 seconds for milestones.

### 2026-03-09: Themed/Named Waves
- **19 named waves** with distinctive titles, subtitles, and accent colors that appear in the wave announcement, wave preview panel, and wave summary screen:
  - Wave 1: *First Contact* — "They're coming..."
  - Wave 3: *Scouting Party* — "Light and fast"
  - Wave 5: *Heavy Armor* — "Tanks incoming!"
  - Wave 7: *The Swarm* — "Strength in numbers"
  - Wave 10: *TITAN* — "⚠ FIRST BOSS"
  - Wave 12: *Air Raid* — "✈ Flyers ignore the path!"
  - Wave 14: *Field Medics* — "💚 Kill the healers first"
  - Wave 15: *Shield Wall* — "🛡️ Break their shields"
  - Wave 16: *Iron Legion* — "🔶 Armor-piercing required"
  - Wave 18: *Mitosis* — "🧬 They split when killed"
  - Wave 20: *LEVIATHAN* — "⚠ PHASE BOSS"
  - Wave 22: *Ghost Protocol* — "👻 Phasers teleport ahead"
  - Wave 25: *The Gauntlet* — "Everything at once"
  - Wave 30: *BEHEMOTH* — "⚠ MEGA BOSS"
  - Wave 35: *Blitz Rush* — "⚡ Maximum speed"
  - Wave 40: *COLOSSUS* — "⚠ ULTRA BOSS"
  - Wave 42: *The Answer* — "To life, the universe..." (Easter egg)
  - Wave 45: *Dark Swarm* — "Elites everywhere"
  - Wave 50: *APOCALYPSE* — "☠ FINAL BOSS"
- **Unnamed boss waves** (60, 70, etc.) get a generic "DESTROYER" title with boss warning
- **Three display locations:**
  1. **Wave announcement** — themed name replaces "WAVE X" as the big text, with colored styling and "Wave X — subtitle" below
  2. **Wave preview panel** — label shows "THEME NAME — Wave X" in the theme's accent color instead of "INCOMING ENEMIES"
  3. **Wave summary** — post-wave grade screen shows "THEME NAME CLEAR" instead of "WAVE X CLEAR"
- **`getWaveTheme(num)`** helper function returns theme data or null for regular waves, with boss fallback
- **Design rationale:** Themed waves make each run feel designed rather than random. Players get excited anticipating named waves, and the names serve as built-in hints about what's coming (e.g., "Iron Legion" tells you to build armor-piercing). This is a classic design pattern from games like Kingdom Rush, Bloons TD, and Plants vs Zombies.

### 2026-03-09: Floating Damage Numbers
- **Every hit shows damage** — `applyDamage()` now spawns floating damage number popups above enemies using the existing `scorePopups` system
- **Throttled per enemy** — Max 1 popup per enemy per 200ms via `_dmgPopupTimers` Map, keyed by `enemy.id`. Prevents visual spam from rapid-fire/tesla chains while still showing meaningful feedback
- **Color-coded by impact:**
  - White (size 8): Normal hits (<10 damage)
  - Yellow (size 10): Big hits (10-24 damage) 
  - 💥 Red (size 13): Crit hits (25+ damage)
  - 🛡 Cyan: Shield absorbed all damage
  - Gray (size 7): Armored enemy, low effective damage
- **Random X jitter** (±8px) prevents numbers from stacking in a single column
- **Fast fadeout** — 18 frame lifetime (vs 30-40 for XP/kill popups), faster upward velocity (-2.0 vs -1.5) so damage numbers feel snappy and don't obscure the battlefield
- **Design rationale:** Floating damage numbers are the #1 most impactful "game juice" feature — they make every hit feel real, help players understand damage scaling, and visually communicate armor/shield effectiveness. The throttle keeps it readable even with gatling/tesla builds firing dozens of times per second.

### 2026-03-09: Kill Streak Announcements (Quake-Style)
- **Big centered canvas text** at combo milestones — inspired by Unreal Tournament / Quake announcer callouts
- **6 tiers of announcements:**
  - 3 kills: "TRIPLE KILL!" (gold, 28px)
  - 5 kills: "RAMPAGE!" (orange, 32px)
  - 7 kills: "DOMINATING!" (red-orange, 36px)
  - 10 kills: "UNSTOPPABLE!" (red, 40px)
  - 15 kills: "GODLIKE!" (magenta, 44px)
  - 20 kills: "BEYOND GODLIKE!" (cyan, 48px)
- **Animation:** Scale-in from 50% to 100% (fast 0.15s), hold for 0.55s, then fade out with slight grow. Total ~1 second display time (60 frames).
- **Visual treatment:** Bold 900-weight font, black stroke outline for readability, color-matched shadowBlur glow, rendered at 35% canvas height (above the action, below wave announcements)
- **State management:** `streakAnnouncement` object with timer countdown, properly reset on game over/restart alongside other visual state
- **Trigger:** Fires in the combo tracking code on exact match of each tier's kill count. Uses reverse iteration to find the highest matching tier.
- **Design rationale:** The combo system already tracked kill streaks but the only feedback was the small corner counter and occasional screen shake. These announcements make big combos feel EPIC — they're the classic "feel good" moment in action games. Each tier has escalating size and color intensity to build excitement. The animation timing (fast in, hold, slow out) is borrowed from fighting game hit confirms.

### 2026-03-09: Animated Path Flow Arrows
- **Replaced static dashed path with animated directional chevrons** — The enemy path was a barely-visible 8% opacity dashed line that gave no indication of movement direction. Now it's a 12px-wide soft path lane with animated chevron arrows (>) flowing along it at 30px/s.
- **Implementation details:**
  - Base path drawn as a wide (12px), subtle (6% alpha) rounded stroke with `lineCap: 'round'` for smooth corners
  - Chevrons placed every 40px along the path using cumulative distance calculation
  - Each chevron is a small ">" shape rotated to match the path direction at that point
  - Flow animation driven by `Date.now() * 0.001 * flowSpeed` modulo spacing for smooth continuous movement
  - Edge fade: chevrons near path start/end fade out to avoid visual clutter at spawn/base
  - Subtle blue tint (`rgba(100,180,255,0.15)`) that fits the dark theme
- **Why this matters:** In TD games, path clarity is critical for strategic cannon placement. The animated arrows serve dual purpose: (1) show players WHERE enemies will walk, (2) show WHICH DIRECTION they move. This is especially important since paths are procedurally generated each wave and can change layout. The animation also adds "life" to the battlefield between waves when nothing else is moving.
- **Performance:** Chevron rendering uses simple `moveTo/lineTo` strokes (3 points each) — negligible GPU cost. Distance array is computed once per path, not per frame.

### 2026-03-09: Real-Time DPS Meter
- **Rolling bar graph overlay** — A compact 120×50px semi-transparent panel in the top-right corner of the canvas showing a 30-second rolling history of damage output as a bar chart. Each bar = 1 second of damage, colored green→yellow→red by intensity.
- **Current DPS calculation** — Uses a 5-second rolling window average. The last 5 bars are drawn at full opacity; older bars are dimmed to 40% opacity so you can see the trend.
- **Damage tracking** — Every `applyDamage()` call accumulates damage into a per-second bucket. Buckets rotate every second via `updateDpsBuckets()` in the render loop. Total cumulative damage is also tracked.
- **Display info:**
  - `⚔ X.XX DPS` in gold (left) — current 5-second average DPS
  - `ΣXXXk` in gray (right) — total cumulative damage dealt (auto-formats to k for thousands)
- **[D] key toggle** — Press D to show/hide the meter. On by default. Doesn't interfere with other keybinds since it only triggers outside of text inputs.
- **State management** — `resetDpsMeter()` called on game reset/play again. Clears all samples, resets total damage, restores start time.
- **Design rationale:** Players had no way to evaluate their actual damage output in real time. The theoretical DPS from `getCannonStats()` doesn't account for targeting efficiency, armor reduction, missed frames, or buff uptime. This meter shows REAL damage — what actually lands. The bar graph format lets you see spikes (boss fights, ultimate usage) and valleys (between waves), which helps evaluate build choices. The green→red gradient makes high-damage moments feel exciting and low moments feel urgent.
- **Performance:** Negligible — one array rotation per second, 30 fillRect calls per frame. No new DOM elements.

### 2026-03-09: Wave Challenges — Bonus Objectives for Stars
- **Per-wave bonus objectives** — Starting from wave 2, each wave gets a randomly-selected (but deterministic via seeded PRNG) challenge shown in the wave preview panel. Completing the challenge awards +1 prestige star immediately.
- **9 challenge types:**
  - 💎 **Perfect Wave** — Take zero damage
  - ⚡ **Speed Clear** — Clear in under 15 seconds (only available waves 2-25)
  - 🔥 **Combo Master** — Reach a 5× combo
  - 💥 **Combo Legend** — Reach an 8× combo (only available wave 10+)
  - ☠️ **Total Annihilation** — Kill every enemy (none leak)
  - 🛡️ **Iron Wall** — No enemies reach the base
  - ✨ **Ability Kill** — Use your active ability during the wave
  - 🐦 **Rush Bonus** — Use early send during the wave
  - 🚫 **Purist** — Clear without collecting any power-ups
- **Wave preview integration** — Challenge shown as a gold-bordered line at the bottom of the wave preview: "💎 CHALLENGE: Take zero damage (+1⭐)"
- **Wave summary integration** — After wave clear, challenge result shown below the stats grid: green ✅ +1⭐ on success, red ✗ Failed on miss. Successful challenges extend the summary display to 3.5s (vs 2.5s) for celebration.
- **Star reward** — Completing a challenge instantly awards +1 prestige star (saved to localStorage, prestige button updated). This stacks with the normal game-over star earnings, giving skilled players a faster prestige progression path.
- **Tracking hooks** — `waveStats` expanded with `abilityUsed`, `earlySendUsed`, and `powerupCollected` booleans. `elapsed` added from grade calculation for speed challenge. Hooks placed in `fireAbility()`, early send handler, and powerup collection code.
- **Deterministic selection** — `getWaveChallenge(waveNum)` uses `mulberry32(waveNum * 7919)` so all multiplayer clients see the same challenge. Challenges are filtered by wave appropriateness (no speed clears on wave 30+, no combo8 before wave 10, etc.).
- **State management** — `currentChallenge` and `challengeStarsEarned` reset on game restart alongside other per-run state.
- **Design rationale:** The game had great moment-to-moment feedback (damage numbers, combos, grades) but lacked per-wave micro-goals. Challenges add a "quest" layer that makes every wave feel purposeful — instead of just surviving, you're actively trying to achieve something specific. The star reward ties into the prestige system, giving mid-game players a reason to play optimally rather than just coast. Inspired by Kingdom Rush's star objectives and Bloons TD's challenge modes.

### 2026-03-09: Muzzle Flash & Impact Spark Effects
- **Muzzle flashes** — Every time a cannon fires a projectile, a brief radial gradient flash spawns at the barrel tip. Uses a 6-frame lifetime with expanding radius and alpha fadeout. Color is spec-dependent: warm yellow-orange for standard/power/rapid, cool blue for frost, electric blue for tesla. Sniper gets a larger flash (8px), gatling smaller (5px) since it fires rapidly.
- **Impact sparks** — When a projectile reaches its target (life hits 0), 3-6 tiny spark particles burst outward from the hit location. Sparks have random radial velocity, slight gravity (0.15 per frame), friction decay (0.96×), and fade over 6-11 frames. Color matches the projectile/cannon color for visual consistency.
- **Implementation:**
  - `muzzleFlashes[]` array — each entry: `{x, y, size, life, maxLife, color}`. Spawned in the visual projectile generation loop when a target is found. Rendered as a radial gradient: white core → colored mid → transparent edge.
  - `impactSparks[]` array — each entry: `{x, y, vx, vy, life, maxLife, color, size}`. Spawned when projectile life reaches 0 (in drawFrame projectile loop). Rendered as small filled squares with alpha = life/maxLife.
  - Both arrays cleared on game reset alongside lightningBolts/levelUpRings.
- **Performance:** Muzzle flashes are 1 radial gradient per shot (6 frames max, typically 2-4 active at once). Impact sparks are 3-6 fillRect calls per hit, decaying quickly. Even with gatling builds, the spark count stays manageable because projectile lifetimes are short (5 frames) and sparks last <11 frames.
- **Design rationale:** The projectile system drew lines from cannon to enemy but there was no visual "punch" at either end. Muzzle flashes make cannons feel like they're actually firing something powerful, and impact sparks confirm hits visually. Together they complete the shot → travel → impact feedback loop. This is the most common "missing juice" in indie TD games — the difference between feeling like you're clicking spreadsheet numbers vs. commanding weapons.

### 2026-03-09: Critical Hit System
- **Crit chance & multiplier stats** added to `getCannonStats()` — base 5% chance at 2× damage for all cannons, scaling with level (+0.5% per level, capped at 50%)
- **Specialization bonuses:**
  - **Sniper**: +15% crit chance, 3× crit multiplier (headshot fantasy — slow but devastating crits)
  - **Railgun**: 2.5× crit multiplier (piercing shots crit harder)
  - All other specs use base crit scaling
- **Crit roll in main fire loop** — each shot rolls against `stats.critChance`; on success, `stats.dmg` is multiplied by `stats.critMultiplier` before being passed to `applyDamage()`
- **`applyDamage()` updated** — new 4th parameter `isCrit` (default false). Existing callers (AoE, pierce, chain, abilities, terrain) unaffected since they don't pass it.
- **Golden crit damage numbers** — crits show ⚡-prefixed gold (#ffd700) damage text, size 15, with longer lifetime (24 frames vs 18) and faster upward velocity (-2.5 vs -2.0) to make them visually pop above normal hits
- **Crit particle burst** — 6 golden particles spray from the enemy on crit hits, separate from normal death particles
- **Crit sound effect** — `sfxCritHit()` plays a sharp metallic ping (1800→2400Hz sine sweep, 0.15s duration) that cuts through the normal shoot/death sounds
- **Tooltip integration** — Cannon hover tooltip now shows `Crit: X% (Y×)` stat line when crit chance > 0
- **Design rationale:** Crits add variance and excitement to every shot — the random chance of a big golden number creates "slot machine" satisfaction that makes even routine auto-fire engaging. Sniper's high crit rate/multiplier reinforces its fantasy as a precision weapon (slow fire, huge single hits), while Gatling's low per-shot crit chance is offset by volume of fire (many chances per second). The 50% cap prevents crits from becoming guaranteed. This is a fundamental RPG/ARPG mechanic (Diablo, Path of Exile, Warcraft) that every good TD benefits from.

### 2026-03-09: Enemy Death Animations (Ghost Shrink/Spin/Flash)
- **Death ghost system** — When enemies die, instead of instantly vanishing, a "ghost" of their body stays visible and plays a shrink + spin + flash-fade animation. Uses a separate `deathGhosts[]` render array that doesn't interfere with gameplay logic.
- **Animation details:**
  - **White flash** — Ghost body starts white and fades to the enemy's original color over the first 30% of its lifetime, simulating a "hit flash" at the moment of death
  - **Expanding ring** — A white circle ring expands outward from the death point during the flash phase. Bosses get a 3× larger ring for dramatic emphasis.
  - **Shrink** — Ghost radius shrinks from 100% to 30% over its lifetime using ease curve `0.3 + t * 0.7`
  - **Spin** — Each ghost gets a random initial rotation and spin speed (±0.4 rad/frame), creating varied death tumbles
  - **Fade** — Alpha decreases linearly from 0.8 to 0 over lifetime
  - **Shape-accurate** — Ghost renders the correct shape (circle, hexagon, diamond, octagon) matching the original enemy type, not just a generic circle
  - **Elite golden outline** — Elite enemy ghosts retain their gold border during the death animation
- **Timing:**
  - Regular enemies: 18-frame animation (~0.3s at 60fps) — fast enough not to clutter
  - Boss enemies: 30-frame animation (~0.5s) — longer for dramatic weight
- **State management:** `deathGhosts` array declared alongside other visual arrays (muzzleFlashes, impactSparks). Cleared on game restart alongside lightningBolts/levelUpRings.
- **Spawn point:** Ghost created in the death processing loop right after `e.dead = true`, capturing position, radius, color, shape, and elite/boss flags before the enemy is filtered out.
- **Performance:** Each ghost is one canvas save/translate/rotate + one shape fill + one optional stroke (elite). Max ~20 ghosts alive at once during heavy combat (18-frame lifetime with high kill rate). Negligible cost.
- **Design rationale:** Enemy death was the biggest remaining "juice gap" — enemies just popped out of existence with some particles. The ghost animation gives each kill a satisfying visual weight. The white flash → shrink → spin → fade sequence reads as "destroyed" not "disappeared." The shape-accurate rendering means you can tell what just died even in the animation, which reinforces that your cannon is effective against specific enemy types. Boss death ghosts are extra dramatic because boss kills should feel like an achievement. This is standard practice in polished TD games (Bloons, Kingdom Rush) where enemy death animations are one of the most impactful "feel good" systems.

### 2025-07-07: Boss Loot Drops — Fix & Complete Wiring
- **Critical syntax fix** — The previous boss loot implementation had the `megadmg`, `fullheal`, and `frenzy` case handlers **outside** the `collectPowerup()` switch statement (the `}` after the `nuke` case prematurely closed the switch). This caused a `SyntaxError: Unexpected token 'case'` that **broke the entire game**. Fixed by removing the errant `}` and moving the boss loot cases inside the switch.
- **3 boss-exclusive loot types** (guaranteed drop on boss kill):
  - **🗡️ Mega DMG** (`megadmg`, weight 3): +100% damage for 15s (vs regular damage buff's +50%). Sets both `activePowerupEffects.damage` and `activePowerupEffects.megadmg` for proper multiplier handling.
  - **💖 Full Heal + Shield** (`fullheal`, weight 2): Instantly restores base HP to max AND grants a temporary shield that absorbs the next 5 enemy leaks for 20 seconds.
  - **🔥 Frenzy Mode** (`frenzy`, weight 2): Activates damage, speed, AND XP buffs simultaneously for 12 seconds. Ultimate power combo.
- **Shield charge absorption** — Added shield absorption logic in the base damage handler. When the shield buff is active, incoming leak damage is absorbed charge-by-charge. Shows "🛡️ SHIELD! -X blocked (Y left)" popup. When charges deplete, shows "🛡️ SHIELD BROKEN!" warning.
- **Active buff indicator fixes** — `drawActivePowerupIndicators()` now handles boss-exclusive buff types (`megadmg` and `shield`) that don't exist in the regular `POWERUP_TYPES` array. Uses a `BOSS_BUFF_META` lookup for display info. Shield indicator shows remaining charge count (e.g., "🛡️ SHIELD ×3 15s").
- **Golden glow rendering** — Boss loot drops render 30% larger with gold border, dark gold background, and pulsing golden shadowBlur glow effect. Uses `bossLoot: true` flag on the powerup object.
- **`dropBossLoot(x, y)`** — Called on boss death, guaranteed 1 drop from boss-only pool with weighted random selection. Golden "👑 BOSS LOOT!" popup at drop location.
- **Design rationale:** Boss fights are the game's climax moments (every 10 waves). Boss loot creates an exciting reward loop — players anticipate and strategize around which buff they'll get. The fullheal+shield is a lifeline for struggling players, frenzy mode is a power fantasy, and mega DMG helps with the next wave. This is a standard pattern from ARPGs (Diablo, Path of Exile) and TD games (Kingdom Rush).

### 2026-03-10: Wave Mutators — Roguelike Modifiers
- **12 unique mutators** that randomly activate on non-boss waves from wave 3+. ~70% chance per wave. Deterministic via seeded PRNG (`waveNum * 6173`) so all multiplayer clients see the same mutator.
- **Mutator types:**
  - 🔮 **Glass Cannon** — +80% player DMG, but enemies +40% faster. Risk/reward tradeoff.
  - 🛡️ **Iron Skin** — Enemies have +50% HP. Pure difficulty spike.
  - ⏩ **Double Time** — Enemies move 60% faster. Makes slow effects (Frost/Swamp) critical.
  - 💰 **Payday** — 3× XP this wave. Farm wave for fast leveling.
  - ⚡ **Overcharge** — +50% fire rate, −25% DMG. Great for Gatling/Tesla, bad for Sniper.
  - 🏰 **Fortified** — All enemies gain 30% armor. Armor-piercing cannons shine.
  - 🎯 **Bounty Hunter** — +100% crit chance (capped at 95%). Sniper becomes a monster.
  - 💚 **Regenerators** — Enemies regen 2% max HP/sec. DPS race — burst damage > sustain.
  - 🎁 **Loot Rain** — 3× power-up drop chance. Power-up pinata wave.
  - 🔥 **Berserker** — +40% DMG, +30% fire rate, −30% range. Forces tight positioning.
  - 🐜 **Swarm** — +50% enemy count, −30% HP each. AoE/Tesla heaven.
  - 🧛 **Vampiric** — Every kill heals +1 base HP. Offensive healing.
- **Integration points (minimal, clean):**
  - `getCannonStats()` applies dmgMult, fireRateMult, rangeMult, critBonus from active mutator
  - `getXPMultiplier()` applies xpMult from active mutator
  - `generateWave()` applies enemyHpMult, enemySpeedMult, enemyCountMult to wave generation
  - `rollPowerupDrop()` applies dropMult to drop chance (capped at 100%)
  - Enemy loop in simTick applies regenRate for Regenerators mutator
  - Kill handler applies vampiric healing (+1 HP per kill, capped at max)
  - Individual enemies get `armor` and `regenRate` properties from Fortified/Regenerators
- **UI display:**
  - Wave preview shows mutator as a colored line: "🔮 MUTATOR: Glass Cannon — +80% DMG, +40% enemy speed"
  - Canvas HUD shows active mutator as a centered pill badge at top during waves (dark background, colored text/border matching mutator)
- **Boss waves excluded** — wave % 10 === 0 gets no mutator (boss mechanics are enough)
- **State management** — `currentMutator` set in `generateWave()`, cleared on game reset alongside terrainHazards
- **Design rationale:** Wave mutators add roguelike variety that makes each run feel different. The same wave number plays differently depending on the mutator — "Iron Skin" on wave 16 (armored enemies) is brutal, while "Payday" on wave 14 (healers) is a gift. Players learn to adapt their strategy per-wave rather than following a fixed build order. The mix of positive (Payday, Loot Rain, Vampiric) and negative (Iron Skin, Double Time, Fortified) mutators keeps things fair — roughly 5 positive, 4 negative, 3 mixed. Inspired by Hades boons, Slay the Spire modifiers, and Risk of Rain artifacts.

### 2026-03-10: Spec-Specific Projectile Visuals
- **Every cannon specialization now fires visually distinct projectiles** — previously all cannons shot identical thin lines. This was the biggest remaining visual gap since cannon bodies already had unique shapes.
- **6 distinct projectile styles:**
  - **Sniper**: Bright yellow tracer beam with glowing head dot. `shadowBlur` glow creates a laser-like feel. Wider (3px) than default.
  - **Gatling**: Short thick tracers (12px max length) — rapid-fire staccato bursts that read as "many small hits" vs sniper's "one big shot."
  - **Cannon**: Glowing orange orb with 3-dot trail. Radial gradient gives it depth (bright core → orange mid → dark edge). Extra impact sparks (6-10 vs standard 3-6) and orange-colored sparks for explosive feel.
  - **Railgun**: Dual-layer energy beam — wide translucent outer glow (6px, blue) + thin bright inner core (2px, white). Plus a head flare dot. Strong `shadowBlur` creates the "charged energy" look.
  - **Frost**: Elongated diamond ice crystal shard with sparkle trail (3 small diamonds behind it). Cyan coloring with bright center line. Impact sparks are icy blue (`#88ddff`).
  - **Basic/Rapid/Tesla/default**: Standard 2px colored line (unchanged — Tesla already uses the lightning bolt system, and basic/rapid are the visual baseline).
- **Implementation:** Added `spec` and `path` properties to projectile objects at spawn time. Projectile renderer now uses a `switch(p.spec)` to select the appropriate visual. Each style uses the normalized lifetime (`p.life / 5`) for fade effects.
- **Impact sparks updated:** Cannon and railgun generate more sparks on impact. Frost sparks are icy blue. Color matching makes the whole shot→travel→impact cycle feel cohesive per spec.
- **Performance:** All rendering uses basic canvas primitives (lines, arcs, fill/stroke). Sniper and railgun use `shadowBlur` (GPU-composited) but only for their limited projectile count. Gatling's short tracers are actually cheaper than full-length lines.
- **Design rationale:** The cannon bodies already had unique shapes per spec (hexagon cannon, diamond sniper, triple-barrel gatling, etc.) but projectiles were identical. This breaks the visual connection — you see a distinctive cannon fire a generic line. Now each spec has a complete visual identity from barrel to impact. Sniper's bright tracer reinforces "precision" fantasy, cannon's orb says "explosive power," frost's crystal says "ice magic," railgun's beam says "high-tech energy." This is one of the highest-impact visual improvements because projectiles are the most frequently rendered game element — every frame shows dozens of them.

### 2026-03-10: Hover Range Circles
- **Mouse over any cannon** to see its range as a translucent circle with dashed ring
- **Spec-colored** — frost=cyan, tesla=blue, cannon=orange, sniper=red, railgun=light blue, gatling=yellow, default=accent blue
- **Radial gradient fill** — visible but not distracting, fades from center to edge
- **Range label** — shows exact range in pixels above the circle (e.g. "152px")
- **Drawn behind cannons** — range circle renders before cannon sprites so it doesn't obscure them
- **Only one at a time** — first cannon within 22px of mouse wins, break after drawing
- **No new state/DOM/init needed** — pure rendering code inside the existing draw loop (Phase 5 safe)
- **Respects wave mutators** — range accounts for berserker's −30% range debuff since it uses getCannonStats()

### 2026-03-10: Mini-Map Overlay
- **Compact tactical mini-map** — A 140×100px semi-transparent overlay in the bottom-left corner of the canvas showing a bird's-eye view of the entire battlefield. Provides at-a-glance situational awareness without needing to scan the full canvas.
- **Shows 5 layers of information:**
  1. **Enemy path** — Drawn from normalized 0-1 path coordinates, scaled to mini-map size. Blue line showing the full route enemies will travel.
  2. **Terrain hazards** — Swamp (green), lava (orange), storm (purple) zones shown as colored circles at their proportional positions.
  3. **Enemies** — Each enemy rendered as a small 3×3px colored square at its current position. Color matches the enemy's actual color for type identification.
  4. **Cannons** — Your cannon shown as a 5×5px blue square, other players' cannons in green. White outline for visibility. Easy to see positioning relative to the path.
  5. **Base line** — Dashed blue line at the proportional BASE_Y position, showing the defense line.
- **"MAP" label** in top-left corner of the mini-map for identification.
- **Implementation:** Pure Phase 5 rendering function `drawMiniMap()` — no new state variables, no DOM elements, no event listeners, no init calls needed. Called from within `drawFrame()` before the countdown overlay. Uses `ctx.save()`/`ctx.restore()` to isolate all style changes.
- **Coordinate mapping:** Path uses normalized 0-1 coords directly (path.x * MW, path.y * MH). Enemies and cannons convert from screen pixels (e.x / CANVAS_W * MW). Hazards also convert from screen pixels.
- **Performance:** Negligible — a few rectangles, one polyline, and some small fills. No gradients or shadows.
- **Design rationale:** With procedurally generated paths, terrain hazards, flying enemies, and multiplayer cannons, players need a way to understand the full battlefield layout at a glance. The mini-map is a standard feature in strategy/TD games that was missing. Positioned bottom-left to avoid overlapping the DPS meter (top-right), combo counter (top-right), and wave preview (bottom-center).

### 2026-03-10: Targeting Lines & Reticles
- **During active waves**, each cannon draws a subtle dashed line to its current target enemy, plus a small circle reticle around the target
- **Spec-colored** — the line and reticle use the cannon's color (frost=cyan, tesla=blue, etc.) so you can tell which cannon is targeting what
- **Very subtle** — 18% opacity dashed line + 30% opacity reticle circle. Present enough to read, faint enough to not clutter the battlefield
- **Only during combat** — lines only appear when `waveState === 'active'`, so they vanish between waves
- **Zero new state/DOM/init** — pure rendering code inside the existing `drawCannon()` function (Phase 5), right where `barrelTarget` is already computed for barrel rotation. No TDZ risk whatsoever.
- **Tactical feedback** — you can now visually confirm your targeting priority is working. If you set "Strongest" and see all lines converging on the boss, it's working. If one cannon is targeting a weak enemy instead, you might need to adjust its position.
- **Design rationale:** Targeting lines are a staple of TD games (Kingdom Rush, Bloons TD6, Mindustry). They solve the "is my tower doing anything useful?" question at a glance. The dashed style prevents visual overload when many cannons are active.

### 2026-03-10: XP Progress Ring Around Cannons
- **Visual XP feedback on every cannon** — A thin circular arc drawn around each cannon showing progress toward the next level. Fills clockwise from the top as XP accumulates. Provides at-a-glance leveling feedback without needing to hover or click.
- **Three visual states:**
  - **Empty** (0 XP): No ring shown — clean look for freshly placed cannons
  - **In progress** (1-99%): Subtle white track ring (15% alpha) with a brighter progress arc. Blue for your own cannon, green for other players' cannons — consistent with existing color conventions.
  - **Max level (20)**: Full gold ring with gentle pulse animation (sinusoidal alpha). Immediately communicates "this cannon is fully upgraded" at a glance.
- **Implementation:** Pure rendering code inside `drawCannon()` (Phase 5), inserted before the glow aura section. Uses `XP_PER_LEVEL()` (Phase 2 constant) and `c.xp`/`c.level` from cannon data. Block-scoped with `{}` to avoid variable leaks.
- **No new state, DOM, listeners, or init calls** — zero TDZ risk. Just 35 lines of canvas arc drawing inside an existing function.
- **Design rationale:** The game has 20 levels with a quadratic XP curve, but the only XP feedback was the HUD bar (only for your own cannon) and the hover tooltip. The ring gives instant visual feedback for ALL cannons on the field. In multiplayer, you can see which teammates are close to leveling up. The gold max-level ring creates a clear visual goal — players want to see that ring turn gold. This is a standard pattern from RPGs and MOBAs (League of Legends champion level indicator, Diablo paragon glow).

### 2026-03-10: Wave Difficulty Indicator
- **Threat-vs-firepower bar** during countdown — A colored difficulty bar appears below the countdown timer showing how hard the upcoming wave is relative to current player firepower.
- **Calculation** — Uses `getWaveEnemyBreakdown()` to compute total wave HP (enemy count × base HP × type hpMult, plus elite bonus). Computes total player DPS from all cannons via `getCannonStats()`. The ratio (seconds to kill all enemies) determines the difficulty tier.
- **5 difficulty tiers** with distinct colors and labels:
  - 🟢 **EASY** (green, ≤6s kill time) — cannons will shred this wave
  - 🟡 **MEDIUM** (yellow, 6-15s) — fair challenge
  - 🟠 **HARD** (orange, 15-35s) — expect some leaks
  - 🔴 **BRUTAL** (red, 35-60s) — serious pressure
  - 🟣 **NIGHTMARE** (purple, 60s+) — survival mode
  - Special **NO CANNONS!** warning in red when no cannons are placed
- **Rounded progress bar** — 140px wide with dark background, color-filled portion proportional to difficulty. Rounded corners using quadratic curves. Label below with matching color and glow effect.
- **Pure Phase 5 rendering** — `drawWaveDifficulty()` function defined alongside `drawGrid()`, called from the existing countdown block in `drawFrame()`. No new state variables, DOM elements, event listeners, or init calls needed.
- **Strategic value** — Players can now make informed decisions about whether to upgrade, reposition, or sell their cannon before the wave starts. Also helps evaluate if an early send is risky. Especially useful in multiplayer where you can see if the team's combined DPS is sufficient.


### 2025-06-08: Frost/Slow Visual Effect on Enemies
- **Icy blue glow ring** — Semi-transparent cyan aura pulses around slowed enemies, opacity proportional to remaining slow duration
- **Frost tint overlay** — Light blue wash over the enemy body so they visually look "frozen"
- **Orbiting ice crystals** — 4 diamond-shaped crystals (6 for bosses) orbit the enemy, rotating smoothly. Each crystal is a small diamond shape in pale ice blue (#ccf0ff)
- **Frost sparkle particles** — 3 small white dots that drift upward from the enemy, fading as they rise, simulating cold vapor/frost particles
- **Duration-based intensity** — All effects scale with `e.slowTimer / (TICK_RATE * 2)`, capped at 0.7 alpha. As the slow wears off, the frost effect gracefully fades
- **No new state variables** — Uses existing `e.slowTimer > 0` check. Pure render code inside `drawEnemy()`, placed after elite visual and before boss shield visual
- **Phase compliance** — All code is inside the existing `drawEnemy` function (Phase 5). No new state, no new DOM, no new init calls needed.

### 2025-07-08: Auto-Ability Toggle
- **🤖 Auto button** next to the ability button — toggles automatic ability casting when off cooldown and enemies are present
- **Smart targeting** — For targeted abilities (Power Shot, Bombardment, Napalm, Orbital Strike, Headshot), auto-fire picks the strongest enemy in range (preferring bosses > elites > highest maxHP). Falls back to nearest enemy if none in range.
- **Non-targeted abilities** (Rapid Burst, EMP, Bullet Storm, Chain Overload, Blizzard) fire immediately when off cooldown
- **[A] keyboard shortcut** to toggle auto-ability on/off
- **Persistent** — State saved to localStorage (`td_auto_ability`), survives page refresh
- **Visual feedback** — Button highlights blue with ✓ when active, reverts to default when off
- **Safety checks** — Only fires during active waves, when cannon exists, when cooldown is 0, and when enemies are alive. Won't fire if player is in manual targeting mode.
- **Integration** — Auto-fire check runs in the existing 100ms cooldown timer setInterval, so it fires as soon as cooldown expires
- **Phase compliance:**
  - Phase 3: `let autoAbilityEnabled` state variable
  - Phase 4: `let autoAbilityBtn = null` DOM variable + `initDOM()` binding
  - Phase 5: `toggleAutoAbility()`, `updateAutoAbilityBtn()`, `tryAutoFireAbility()` functions
  - Phase 6: Click listener on `autoAbilityBtn`, [A] key in keydown handler
  - Phase 7: `updateAutoAbilityBtn()` init call
- **Design rationale:** The game is increasingly idle-oriented with prestige progression, but the most powerful feature (active ability) required manual timing every 8-16 seconds. Auto-ability completes the idle experience — set it and forget it, while still allowing manual override (press Q to use the ability manually anytime). This is a standard QoL feature in idle/incremental TD games (Bloons TD, Realm Defense).

### 2025-07-08: Enemy Speed Trails
- **Visual motion streaks** behind fast-moving enemies — fading circles along the path behind each enemy
- **Speed-proportional** — trail length (1-5 dots) and opacity scale with `e.speed`. Slow enemies (tanks, bosses at 0.5-0.8 speed) get no trail. Fast enemies (speedsters at 3.5) get 5 bright dots. Medium enemies get 2-3 subtle dots.
- **Frost-aware** — uses `effectiveSpeed` (halved when slowed), so frozen enemies lose their trails, giving visual feedback that the slow is working
- **Boss-aware** — boss trails use 60% radius (wider), normal enemy trails use 45% radius
- **Shrinking dots** — each trail dot is 12% smaller than the last, creating a natural taper
- **No new state** — computed each frame from `e.pathProgress`, `e.speed`, and `getPathPosition()`. Pure render code inside `drawEnemy()`.
- **Phase compliance** — All code inside the existing `drawEnemy` function body (Phase 5). No state, no DOM, no init changes needed.
- **Threshold** — Only enemies with effectiveSpeed >= 1.2 get trails, keeping the battlefield clean for slow enemies

### 2026-03-10: Pause Button
- **⏸ Pause / ▶ Play toggle** — New button in the controls bar and [P] keyboard shortcut that freezes the simulation while keeping the render loop running. Enemies, cannons, countdowns, and all game logic stop. Visual overlays (pause screen with "⏸ PAUSED" text and resume instructions) continue rendering.
- **Implementation:**
  - `gamePaused` boolean state variable (Phase 3)
  - `togglePause()` function (Phase 5): flips `gamePaused`, clears/restarts `simTimer`. Only works when `waveState !== 'gameover'`.
  - `updatePauseBtn()` function (Phase 5): swaps button text/style between pause (default) and play (green gradient).
  - `pauseBtn` click listener + [P] key handler (Phase 6)
  - Canvas overlay in `drawFrame()`: semi-transparent dark overlay with "⏸ PAUSED" in 48px bold text with blue glow, plus "Press [P] or click Play to resume" hint below.
  - Pause state resets to `false` on game restart alongside `gameSpeed = 1`.
- **Why it matters:** The game had speed controls (1×-10×) and early send but no way to STOP. Pause is essential QoL for any real-time game — lets you answer a phone call, read upgrade descriptions, plan strategy, or just take a break without losing your run. Works in both offline and Firebase modes (only the leader's sim stops; non-leader clients just see a frozen state).
- **Phase compliance:** State in Phase 3, DOM binding in Phase 4 initDOM(), functions in Phase 5, listener in Phase 6, no init calls needed in Phase 7 (button starts in default unpressed state). Zero TDZ risk.

### 2026-03-10: Low HP Danger Vignette
- **Pulsing red edge vignette** — When base HP drops below 50%, all four edges of the canvas glow red with increasing intensity. The lower the HP, the brighter and faster the pulse. Creates visceral urgency and "this is going badly" feel without any text or HUD clutter.
- **Three intensity tiers:**
  - **50-25% HP**: Subtle red edges, slow pulse (~2-4 Hz). Noticeable but not alarming — a gentle "heads up"
  - **25-10% HP**: Brighter, wider edges, faster pulse (~4-6 Hz). Plus a "⚠ BASE CRITICAL ⚠" text warning at the top center that fades in and out
  - **<10% HP**: Maximum intensity, frantic pulse (~8 Hz), thick 100px edges. The screen practically throbs red — unmistakable danger signal
- **Dynamic parameters:**
  - `intensity` = `1 - (hpPct / 0.5)` — linear 0→1 as HP drops from 50%→0%
  - `pulseSpeed` = `2 + intensity * 6` — 2 Hz at 50%, 8 Hz at 0%
  - `edgeSize` = `40 + intensity * 60` — 40px at 50%, 100px at 0%
  - `alpha` = base (0.05-0.20) + pulse (0-0.12) — never overwhelming, always readable
- **Implementation:** Single `drawDangerVignette()` function (Phase 5) using 4 linear gradients (top/bottom/left/right). Called from `drawFrame()` right before the mini-map. No new state variables, DOM elements, event listeners, or init calls.
- **Phase compliance:** Pure Phase 5 function definition + Phase 5 call site inside `drawFrame()`. Zero TDZ risk.
- **Performance:** 4 linear gradients per frame + 1 optional `fillText`. Negligible cost — gradients are GPU-composited.
- **Design rationale:** The game had a HP bar, heart icon, and damage flash, but no persistent "danger sense" feedback. The vignette is the standard AAA game solution (Call of Duty, Dark Souls, every FPS since 2005) — it uses peripheral vision to create urgency without blocking the play area. Players instinctively know "red edges = danger" even if they've never seen this game before. The escalating pulse speed creates genuine tension as HP drops, making close-call victories feel more dramatic.

### 2026-03-10: Healer Heal Beams & Enhanced Heal Radius
- **Green connecting beams** from healer to healed allies — When a healer enemy heals nearby allies (every 2s, 60px radius), bright green beam lines now visually connect the healer to each target. Dual-layer rendering: outer green glow with `shadowBlur` + inner bright core (`#a0ffa0`). A white `+` symbol renders at the target end of each beam. Beams fade over 12 frames.
- **60px heal radius indicator** — Healers now show their actual 60px healing range as a soft radial gradient fill (green edge glow) with a pulsing dashed circle border. Previously only a small 15px aura ring was shown, which gave no strategic information about range. Now players can see exactly which enemies are in heal range and position cannons accordingly.
- **Implementation:**
  - `healBeams[]` state array added (Phase 3)
  - Beams spawned in healer sim tick (inside the existing heal loop) with `{x1, y1, x2, y2, life, maxLife}`
  - `renderHealBeams(ctx)` function (Phase 5) handles dual-layer rendering + decay + cleanup
  - Called from `drawFrame()` right after `renderLightningBolts(ctx)`
  - Array cleared on game reset alongside other visual arrays
  - Healer `drawEnemy()` enhanced with radial gradient fill + dashed border at 60px radius
- **Phase compliance:** State in Phase 3, function in Phase 5, render call inside existing drawFrame (Phase 5). No new DOM, listeners, or init calls. Zero TDZ risk.
- **Strategic impact:** Healers were the least visually communicative enemy type. You could see the small green particles on healed allies but couldn't tell which enemy was doing the healing or how far its range extended. The beams make healer → target relationships instantly visible (like Tesla chain lightning but green), and the radius circle helps players decide where to position frost/AoE cannons to catch both the healer and its allies.

### 2026-03-10: Enemy Bestiary Panel
- **📖 Bestiary button** in the controls bar (red-tinted, between help and stats) — opens a full-screen panel showing all 11 enemy types with detailed info, combat tips, and lifetime kill tracking.
- **Discovery mechanic** — Enemies start as locked "???" entries. Killing one for the first time "discovers" it, revealing full stats, description, and tips. Creates a collection incentive.
- **Per-enemy info cards** show:
  - Color-coded emoji icon and type name
  - HP tier (Light/Medium/Heavy/Massive) and speed tier (Slow/Medium/Fast/Very Fast)
  - First appearance wave number
  - Special traits (✈ Flying, 💚 Healer, 🛡 Armor %, ⚡ Teleports, 🧬 Splits, 👑 Phases, 🔵 Shield)
  - Flavor description explaining the enemy's role
  - 💡 Combat tip with specific counter-strategy advice (which cannon specs/abilities work best)
  - Lifetime kill count (☠ X,XXX) — persisted in localStorage
- **Kill tracking** — `recordBestiaryKill(type)` called at both death locations (simTick kills and ability kills). Saves to `localStorage('td_bestiary_kills')` on every kill.
- **[B] keyboard shortcut** to open/close the bestiary
- **Phase compliance:**
  - Phase 2: `BESTIARY_INFO` constant (descriptions + tips for all 11 types)
  - Phase 3: `let bestiaryKills = {}` state variable
  - Phase 4: `bestiaryBtn`, `bestiaryClose`, `bestiaryPanel`, `bestiaryContent` DOM bindings in initDOM()
  - Phase 5: `loadBestiaryKills()`, `saveBestiaryKills()`, `recordBestiaryKill()`, `renderBestiaryPanel()` functions
  - Phase 6: Click/close/backdrop listeners in initListeners(), [B] key in keydown handler
  - Phase 7: `loadBestiaryKills()` init call
- **Sorted display:** Discovered enemies first (sorted by wave), then locked entries (sorted by wave)
- **Design rationale:** The game has 11 enemy types with complex interactions (armor, shields, phasing, splitting, healing, flying) but the only info was brief wave preview labels. The bestiary serves as both a reference manual (what counters what) and a collection incentive (discover them all). Standard feature in games with diverse enemy rosters (Kingdom Rush, Bloons TD, Hades). The combat tips also help new players learn which cannon specs counter which enemies — reducing the trial-and-error frustration of "why isn't my sniper killing that armored enemy?"

### 2026-03-10: Cinematic Boss Health Bar (Dark Souls / Elden Ring Style)
- **Wide centered health bar at the top of the canvas** — When a boss is alive, a prominent health bar appears at the top-center of the screen (60% canvas width, max 400px). This is the standard boss fight presentation from action games (Dark Souls, Elden Ring, Monster Hunter, Hollow Knight) that instantly communicates "this is a major enemy."
- **Visual elements:**
  - **Dark panel backdrop** — rounded rectangle with subtle dark red border, 60% opacity black background for readability over any terrain/enemies below
  - **Boss name** — pulled from `getWaveTheme()` (TITAN, LEVIATHAN, BEHEMOTH, COLOSSUS, APOCALYPSE, DESTROYER). Displayed in red with skull emoji above the bar. Enraged bosses get pulsing red glow text.
  - **HP gradient fill** — color shifts by HP threshold: full HP = dark crimson, <50% = orange-red, <25% = deep red. Enraged bosses glow bright orange-red.
  - **Top shimmer highlight** — subtle white 3px line along the top of the HP fill for a 3D beveled look
  - **Shield overlay** — when boss has an active shield (Phase 1), a translucent blue bar is drawn on top of the HP bar with its own shimmer, proportional to shield HP relative to boss max HP
  - **Metallic border** — gold-bronze strokeRect with inner highlight for premium feel
  - **Phase indicator pips** — 3 small circles below the bar showing boss phase progression (blue=shield, red=summon, crimson=enrage). Active phases are filled + glowing, future phases are dimmed gray.
  - **HP percentage text** — small "X%" aligned to the right of the bar
- **No new state variables, DOM elements, event listeners, or init calls** — pure Phase 5 rendering function that scans `enemies` array each frame. Zero TDZ risk. Called from `drawFrame()` right before `drawDangerVignette()`.
- **Boss detection** — `enemies.find(e => e.type === 'boss' && e.hp > 0 && !e.dead)` — bar auto-appears when a boss exists and auto-disappears when killed.
- **Design rationale:** Boss fights are the game's climactic events (every 10 waves), but bosses were visually treated the same as regular enemies — just a slightly wider HP bar above their sprite. The cinematic health bar makes boss encounters feel like real boss fights. The phase pips help players track the 3-phase system (shield → summon → enrage) at a glance instead of guessing. This is one of the most impactful UX improvements for late-game engagement because it makes the milestone waves feel special and dramatic. The Dark Souls comparison is intentional — that franchise popularized the "wide bottom/top bar with boss name" pattern that's now standard in action games.

### 2026-03-10: Live Personal Best Celebration
- **Real-time record-breaking notification** — When you clear a wave past your `lifetimeStats.bestWave`, the game immediately fires a dramatic "🏆 NEW RECORD!" announcement instead of waiting until game over to tell you.
- **Golden announcement** — Uses the existing `streakAnnouncement` system with 44px gold text, 90-frame (1.5s) duration — longer than streak callouts to emphasize the significance.
- **Particle burst** — 20 golden ✨ sparkle particles spray radially from the center of the canvas in all directions. Uses the existing `scorePopups` system with `vx` support for true circular burst.
- **Triumphant fanfare** — `sfxNewRecord()` plays an ascending C major arpeggio (C5→E5→G5→C6) with shimmer overtones, followed by a sustained C major chord. Richer than the level-up sound, shorter than the game over jingle.
- **Heavy screen shake** — `triggerScreenShake(true)` for maximum impact.
- **Persistent PB indicator** — After the initial celebration, a golden pulsing "🏆 NEW PB: Wave X" text remains in the top-left corner of the canvas for the rest of the run. Gentle sine-wave alpha pulse (0.6-0.8). Disappears on game over.
- **Once per run** — `personalBestBroken` flag prevents the celebration from firing on every subsequent wave. Resets on `resetGame()`.
- **No first-game false positive** — Skips if `lifetimeStats.bestWave <= 0` (first ever game has no record to beat).
- **Phase compliance:**
  - Phase 3: `let personalBestBroken = false` state variable
  - Phase 5: `sfxNewRecord()`, `checkPersonalBest()` functions + PB indicator rendering inside `drawFrame()`
  - Hook: `checkPersonalBest()` called in wave clear block after `waveNumber++` and `sessionWavesCleared++`
  - Reset: `personalBestBroken = false` in `resetGame()` alongside other per-run state
- **Design rationale:** The game already tracked bestWave in localStorage and showed "🏆 NEW RECORD" on the game over screen, but that's an anticlimax — by the time you see it, you've already died. The excitement of *surpassing your record* should happen in the moment, while you're still playing and pushing further. This creates a "just one more wave" motivator because every wave beyond your PB is visibly extending your record. Inspired by racing games that show live "NEW LAP RECORD" overlays during gameplay, and roguelikes that celebrate floor milestones.

### 2026-03-10: Wave Forecast Panel
- **Compact overlay showing next 3 waves** — positioned on the right side of the canvas below the DPS meter area (top-right, Y=66). Shows at-a-glance what's coming so players can plan upgrades and positioning.
- **Per-wave row shows:**
  - Wave number (red for boss waves, theme-colored for named waves)
  - Theme name if it has one (truncated to 12 chars), or generic "Wave N"
  - Colored enemy type dots with counts — top 5 types shown as small circles matching enemy colors with ×count labels
  - 💀 BOSS indicator for boss waves (right-aligned, red)
  - ★ elite count in gold (right-aligned) when elites are present
  - Separator lines between rows
- **Rounded dark panel** with blue border matching existing HUD style (DPS meter, mini-map)
- **Uses existing infrastructure** — `getWaveEnemyBreakdown()` for enemy composition, `getWaveTheme()` for wave names, `ENEMY_TYPES` for colors
- **Hidden during game over** — doesn't overlap with game over screen
- **Only shows after wave 1** — no forecast before the game really starts
- **Pure Phase 5 rendering function** — `drawWaveForecast()` defined alongside other HUD functions, called from `drawFrame()` after `drawMiniMap()`. No new state variables, DOM elements, event listeners, or init calls. Zero TDZ risk.
- **Performance:** 3× `getWaveEnemyBreakdown()` calls per frame (each is lightweight — just RNG + loop). A few fillText + arc calls. Negligible cost.
- **Design rationale:** The game had a detailed wave preview during countdown (bottom panel with enemy icons), but between waves and during combat there was no way to see what's coming next. Players often want to decide "should I sell and rebuild?" or "is a boss coming soon?" without waiting for the countdown. The forecast gives that strategic foresight at all times. Inspired by Bloons TD6's wave preview sidebar and Kingdom Rush's upcoming wave indicators. Positioned to complement the DPS meter (both right side, stacked vertically).

### 2026-03-10: Wave Clear Confetti Celebration
- **Colorful confetti burst** when all enemies are killed and a wave clears — 40 particles for normal waves, 80 for boss waves (every 10th). Provides a satisfying visual reward at the moment of wave completion.
- **Particle physics:**
  - Spawns from the upper-center area of the canvas with random radial velocity
  - Each particle is a small colored rectangle with rotation, spin, and gravity
  - 10 vibrant colors: gold, coral, teal, sky blue, pink, blue, purple, dark teal, fuchsia, orange
  - Particles tumble (random rotation speed), decelerate (0.99× friction), and fall (gravity 0.06-0.10)
  - Lifetime 60-100 frames with smooth alpha fadeout over last 20 frames
  - Auto-removed when life expires or particle falls off screen
- **Boss wave celebration** — double the particle count (80 vs 40) for boss wave clears, since those are the game's climactic moments
- **Implementation:**
  - Phase 3: `confettiParticles` state array
  - Phase 5: `spawnConfetti(isBossWave)` and `renderConfetti(ctx)` functions placed after `renderHealBeams`
  - Wave clear hook: `spawnConfetti()` called right after `sfxWaveClear()`, before `waveNumber++`. Boss detection uses `waveNumber % 10 === 0` (checked before increment)
  - drawFrame: `renderConfetti(ctx)` called after `renderHealBeams(ctx)`
  - resetGame: `confettiParticles = []` cleared alongside other visual arrays
- **No new DOM elements, event listeners, or init calls** — zero TDZ risk. Pure Phase 3 state + Phase 5 functions + one function call inserted into existing wave clear logic.
- **Performance:** Max ~80 particles with simple fillRect + rotate. Each particle is one save/translate/rotate/fillRect/restore — negligible cost even at 60fps.
- **Design rationale:** The game had `sfxWaveClear()` (audio) and `showWaveSummary()` (DOM overlay) on wave clear, but no on-canvas visual celebration. The moment between "last enemy dies" and "summary panel appears" was visually flat. Confetti fills that gap with instant, satisfying, physical-feeling feedback. The tumbling rectangles are the classic confetti pattern used in mobile games, achievement screens, and sports broadcasts. Boss waves getting 2× confetti reinforces their significance.

### 2026-03-10: Run History in Stats Panel
- **Past game log** — Every game over now records the run's details to localStorage and displays them in a scrollable table in the 📊 Stats panel. Last 20 runs stored, newest first.
- **Per-run data recorded:**
  - Wave reached
  - Total kills
  - Best combo
  - Cannon build (spec/path) and level
  - Stars earned
  - Timestamp
- **Stats panel table shows:**
  - Wave (🏆 highlighted in gold if it matches your all-time best)
  - Kills
  - Combo multiplier
  - Build name (color-coded by spec: gatling=gold, sniper=orange, cannon=red, railgun=blue, tesla=purple, frost=cyan) + level
  - Stars earned
  - Relative time (now, 5m, 2h, 3d)
- **Best wave row** gets a subtle gold background highlight so your record run stands out visually
- **Scrollable** — max-height 220px with overflow-y:auto, so it doesn't dominate the stats panel even with 20 entries
- **Implementation:**
  - Phase 3: `let runHistory = []` state variable
  - Phase 5: `loadRunHistory()`, `saveRunHistory()`, `recordRun()` functions + run history HTML in `renderStatsPanel()`
  - Phase 7: `loadRunHistory()` init call
  - Hook: `recordRun()` called in `showGameOver()` after `earnPrestigeStars()` but before `updateLifetimeStatsOnGameOver()`
- **No new DOM elements, event listeners, or CSS** — the table is generated inline in the existing `renderStatsPanel()` template literal using inline styles
- **Phase compliance:** State in Phase 3, functions in Phase 5, init in Phase 7, hook in existing showGameOver function body. Zero TDZ risk.
- **Design rationale:** The stats panel had lifetime totals and personal records, but no way to see individual game progression over time. Run history lets players track improvement — "am I reaching higher waves?", "which build gets me the farthest?", "how many stars am I earning per game?" This is a standard feature in roguelikes (Hades run history, Slay the Spire run log, Dead Cells daily run tracker) that adds long-term engagement without any gameplay changes. The color-coded build column also helps players evaluate which cannon specs perform best for them.

### 2026-03-10: Spawn Portal & Base Gate Visual Effects
- **Animated spawn portal** at the path entrance — a purple vortex with rotating ring segments, orbiting energy dots, pulsing core glow, and "SPAWN" label. Three concentric rings rotate in alternating directions at different speeds, creating a convincing portal/vortex effect. Intensity increases during active waves and fades between waves.
- **Defensive base gate** at the path exit — a blue shield ring that visually represents current HP. The ring arc fills proportionally to `baseHp / maxHp`, shifting from blue (healthy) to red (damaged). Four rotating defense sparks orbit it, and a 🛡 emoji sits at the center. The glow aura also shifts color with HP.
- **HP-reactive feedback** — The base gate is the first on-canvas visualization of HP state that isn't the HUD bar. Players can see at a glance whether the base is healthy (blue) or under pressure (red) just from the gate's color, without looking at the corner HUD.
- **No new state variables, DOM elements, event listeners, or init calls** — all rendering code is inline within drawFrame(), placed right after the path chevron rendering and before terrain hazard zones. Uses only existing variables: `currentPath`, `waveState`, `baseHp`, `getEffectiveMaxHp()`.
- **Phase compliance:** Pure rendering code inserted into the existing drawFrame function body (Phase 5). Zero TDZ risk. No state in Phase 3, no DOM in Phase 4, no init in Phase 7.
- **Performance:** 3 arc loops + 5 small circle fills + 4 small circle fills + 2 radial gradients + 1 shield arc per frame. Negligible cost — less than the existing terrain hazard rendering.
- **Design rationale:** The path had a start point and end point but they looked identical — just where the chevrons happened to begin and end. Real TD games (Kingdom Rush, Bloons, Plants vs Zombies) always mark the spawn point and base with distinctive visual landmarks. The spawn portal tells players "enemies come from here" and the base gate tells players "defend this." The HP-reactive base gate also creates a spatial connection between the abstract HP number and a physical location on the battlefield — when the gate turns red, it feels like your actual base is under attack, not just a number going down.

### 2026-03-10: Auto-Wave Mode
- **🌊 Auto button** — click or press [W] to toggle auto-wave mode
- When enabled, waves start with only 0.5s delay (instead of 1-3s countdown)
- Wave summary popup auto-dismisses in 1s instead of 2.5s
- Button highlights blue when active, shows checkmark
- State persisted in localStorage (`td_auto_wave`)
- Fixed a broken `tryAutoFireAbility` function that had been split by the auto-wave insertion (duplicate function header removed)

### 2026-03-10: Armor Crack Overlay on Damaged Armored Enemies
- **Visual armor degradation** — Armored enemies (type `armored` with the `armor` property) now show progressively worsening cracks on their metallic border as they take damage. The cracks appear when HP drops below 85% and intensify as HP approaches 0, giving instant visual feedback that your attacks are working against tough armored enemies.
- **Deterministic cracks** — Each enemy gets a unique crack pattern seeded by its `id` string (or `maxHp` fallback). The same enemy always shows the same crack positions, so cracks don't jitter frame-to-frame. Uses a simple integer hash → pseudo-RNG function, all block-scoped.
- **Scaling with damage:**
  - **85-60% HP**: 2-4 small cracks, thin dark lines
  - **60-30% HP**: 4-6 cracks with branching segments, thicker lines
  - **<30% HP**: 6-8 large branching cracks + bright highlight edges for a "shattered" 3D depth effect
- **Crack rendering:** Each crack is a short jagged polyline starting from a random point on the armor ring and branching inward/outward with 2-4 segments. Crack segment length scales with damage intensity. Below 40% HP, a bright edge highlight (offset 0.5px) is drawn alongside each crack for a beveled/chipped look.
- **Implementation:** All code is inside the existing `drawEnemy()` function (Phase 5), placed right after the armor rivets and before `ctx.restore()` for the armor block. Uses block-scoped variables only — no new state, DOM, listeners, or init calls. Zero TDZ risk.
- **Performance:** 2-8 short polylines + optional highlights per armored enemy per frame. Each crack is 2-4 `lineTo` calls. Negligible cost.
- **Design rationale:** Armored enemies are the hardest to read tactically — you can't tell if your attacks are doing anything because the armor percentage reduces damage silently. The HP bar helps, but it's a small bar above a small enemy. The crack overlay provides body-level feedback: "I can SEE this thing breaking apart." This is a standard visual pattern in games with destructible armor (Monster Hunter, Dark Souls, Zelda BotW shields) and it's especially important here because armor-piercing is a key spec choice (Railgun, high-level cannons) — players need visual confirmation that their armor-pierce investment is paying off. The deterministic seed prevents the common "jittering cracks" bug where random positions change every frame.

### 2026-03-11: Upgrade Path Stat Comparison Preview
- **Informed build decisions** — When the upgrade modal opens at Level 3 (choose path) or Level 6 (choose specialization), each option card now shows a detailed stat comparison grid and ability preview. Previously players saw only a name and one-line description ("Rapid — Fast fire rate") — making a blind choice that defines their entire build.
- **Stat comparison grid** shows 5 core stats + conditional special stats:
  - **Core:** ⚔ DMG, 🔥 Fire Rate, 📏 Range, ⚡ DPS (computed), 🎯 Crit %
  - **Conditional** (shown only when relevant): 💥 Splash, 🔱 Pierce, ⚡ Chain, 🧊 Slow %, 🛡 Armor Pierce %
  - Each stat has a green **▲** (buff) or red **▼** (nerf) arrow showing how it changes vs. current stats
  - Stats that don't change show in muted gray
- **Ability preview** — Each card shows the ability that comes with that path/spec: name, emoji, description, and cooldown time. E.g., choosing Frost shows "❄️ **Blizzard** — Slow all enemies 80% for 5s (12s)"
- **Mutator-clean stats** — Temporarily clears the active wave mutator while computing stat preview so players see true base values, not mutator-distorted ones. Mutator is restored immediately after.
- **Two-column grid layout** — Stats arranged in a compact 2-column CSS grid that fits naturally inside the existing upgrade card design without making cards feel bloated
- **CSS additions:** `.uc-stats`, `.uc-stat`, `.uc-stat-label`, `.uc-stat-val` (with `.up`/`.down`/`.same` modifiers), `.uc-ability` — all scoped under `.upgrade-card`
- **Implementation:** `buildStatPreview(currentStats, newStats, abilityKey)` helper function (Phase 5) generates the HTML. `openUpgradeModal()` now computes `getCannonStats()` for both current and prospective builds, passing results to the helper. No new state variables, DOM bindings, event listeners, or init calls. Zero TDZ risk.
- **Design rationale:** Path/spec choice is the single most impactful decision in the entire game — it determines your cannon's identity, stat profile, and ability for the rest of the run. But the modal showed zero quantitative information, forcing players to either guess or look up stats externally. Now players can see at a glance that Sniper trades 70%+ fire rate for 3× damage and 160% range, or that Frost gives 60% slow but lower DPS. The green/red arrows make tradeoffs instantly readable. The ability preview is equally important — knowing that Tesla gets "Chain Overload — Lightning hits all enemies" vs. Frost gets "Blizzard — Slow all 80% for 5s" is crucial for build planning. This is standard practice in every RPG/ARPG skill tree (Diablo, Path of Exile, Borderlands) — show the numbers before committing.

### 2026-03-11: Smart Targeting Mode + Closest-to-Base Fix
- **New default targeting: 🧠 Smart** — A composite threat-assessment AI that evaluates 5 factors simultaneously to pick the most dangerous enemy in range. Far more effective than any single-factor priority mode.
- **Threat score calculation (weighted composite):**
  - **Base proximity (50%):** How close the enemy is to reaching the base. Uses `pathProgress` for path-following enemies (0-1, normalized). For flying enemies, uses `y / CANVAS_H`. The #1 factor — enemies about to reach your base are the top priority.
  - **Speed (20%):** Faster enemies score higher because they'll reach the base sooner. Uses effective speed (accounts for frost slow). Normalized to 0-1 range (capped at speed 4).
  - **Type danger (15%):** Prioritizes dangerous enemy types that have outsized impact:
    - Healers: 1.0 (highest — they sustain other enemies, kill them first!)
    - Bosses: 0.9 (massive HP, 3× base damage)
    - Splitters: 0.7 (create additional enemies on death)
    - Phasers: 0.6 (teleport ahead, hard to stop)
    - Flyers: 0.55 (bypass the path entirely)
    - Speedsters: 0.5 (fast, hard to hit)
    - Shielded: 0.4 (damage absorption)
    - Others: 0.3 (baseline)
  - **Finish bonus (15%):** Enemies below 30% HP get a significant bonus (0.3 at ≤30% HP). This ensures cannons "finish off" nearly-dead enemies instead of switching to fresh ones — preventing leaks. Scales linearly below 70% HP.
  - **Elite bonus (+0.08):** Elite enemies are treated as slightly more dangerous since they have 2.5× HP and award 3× XP.
  - **Enraged boss bonus (+0.15):** Enraged bosses (doubled speed at 25% HP) are critical threats that need immediate focus.
- **Why Smart is better than single-factor modes:**
  - **Nearest** wastes shots on enemies far from base that aren't threats yet
  - **Strongest** ignores nearly-dead enemies about to leak through
  - **Closest-to-base** ignores healers/bosses/fast enemies
  - **Smart** balances all these factors — it'll target a healer near the base first, finish off a nearly-dead speedster second, and handle the full-HP tank last
- **Now the default** — New players start with Smart. Existing players keep their saved preference (localStorage `td_target_priority`). Press [T] to cycle through all 6 modes.
- **Closest-to-base bug fix** — The old code used `e.y` for both flying and non-flying enemies (the ternary `e.flying ? e.y : e.y` was a no-op). Now correctly uses `pathProgress` (0-1, normalized) for path-following enemies and `y / CANVAS_H` for flyers. This means it actually finds the enemy closest to reaching the base, not just the one with the highest pixel Y coordinate (which was wrong for zigzag paths where an enemy could be physically high on screen but far along the path).
- **Phase compliance:** All changes are in Phase 5 (inside existing `findTarget()` function body) and Phase 2 (constants). Zero new state variables, DOM elements, event listeners, or init calls needed. The icon display condition changed from `!== 'nearest'` to `!== 'smart'` since Smart is now the default.

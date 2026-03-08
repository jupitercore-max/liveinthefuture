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

## Known Issues / TODO
- [ ] Mobile touch experience needs improvement (hard to precisely place cannons)
- [ ] No sound effects
- [x] ~~No base HP system — single enemy reaching base = wave failed, feels harsh~~ → Base HP system added (20 HP, regen, game over)
- [x] ~~Score popup text when enemies die~~ → Floating XP popups with color and size scaling
- [x] ~~Screen shake on boss or wave fail~~ → Screen shake with light/heavy intensities
- [ ] Better onboarding/tutorial flow
- [ ] Achievement system
- [x] ~~Wave preview showing what's coming next~~ → Enemy type breakdown shown during countdown
- [ ] Better visual differentiation between cannon types
- [x] ~~Combo system for rapid kills~~ → Kill combo system with multiplied XP rewards
- [ ] Active abilities (click to fire special shot)
- [ ] Environmental features (obstacles, terrain that slows enemies)
- [ ] Mini-boss mechanics (special attacks, phases)
- [ ] Better balancing at higher waves
- [ ] Speed controls (1x, 2x, 3x game speed)
- [ ] Sell/reset cannon option
- [ ] Wave skip / early send for bonus XP

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

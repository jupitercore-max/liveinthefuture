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

## Known Issues / TODO
- [ ] Mobile touch experience needs improvement (hard to precisely place cannons)
- [ ] No sound effects
- [ ] No base HP system — single enemy reaching base = wave failed, feels harsh
- [ ] Score popup text when enemies die
- [ ] Screen shake on boss or wave fail
- [ ] Enemy path variety (currently just straight down)
- [ ] Better onboarding/tutorial flow
- [ ] Achievement system
- [ ] Wave preview showing what's coming next
- [ ] Better visual differentiation between cannon types
- [ ] Combo system for rapid kills
- [ ] Active abilities (click to fire special shot)
- [ ] Environmental features (obstacles, terrain that slows enemies)
- [ ] Mini-boss mechanics (special attacks, phases)
- [ ] Better balancing at higher waves

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

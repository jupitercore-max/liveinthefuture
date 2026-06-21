# Dungeon Crawl — MRBD Roguelike

A full roguelike built for Meta's Ray-Ban smart glasses (MRBD format: 600×600px, D-pad only, bone conduction audio). Also plays great in any browser.

## Play

Open `dungeon-crawl.html` in any browser. No server, no dependencies, no build step. It's one self-contained HTML file.

## What It Is

A turn-based roguelike where you explore procedurally generated dungeons, fight enemies, collect loot, and descend deeper. Built for multitasking — because it's turn-based, you play at your own pace while doing other things.

**3,660 lines. Single file. Zero dependencies.**

## Controls

| Input | Action |
|---|---|
| ←→↑↓ | Move / navigate menus |
| Enter | Confirm / use ability / toggle minimap |
| Esc | Pause / back |

## Features

### Three Classes
- **Warrior** — Sweep attack hits all adjacent enemies. High HP. Tanky.
- **Rogue** — Double strike + 20% crit chance. +2 sight range. Fast and deadly.
- **Wizard** — Wand master: 3x wand find rate, 2x charges. Summons a familiar.

### Per-Level Class Abilities (L2–L8+)
Each class gains a unique ability every level:

**Warrior:** Shield Bash → War Cry (AoE stun) → Cleave+ → Iron Skin → Whirlwind (2-tile sweep) → Battle Rage (ATK doubles at low HP) → Fortify (heal on kill)

**Rogue:** Poison Strike → Smoke Bomb (invisibility) → Critical+ (35%) → Shadow Step (teleport behind enemy) → Assassinate (3x on full-HP) → Evasion (20% dodge) → Death Mark (crits chain)

**Wizard:** Mana Shield → Arcane Blast (3x3 AoE) → Wand Mastery+ → Familiar Ranged → Spell Echo (25% free casts) → Teleport (blink) → Archmage (+50% wand damage)

### Enemies
6 base types with 4 prefix mutations (Giant/Swift/Spectral/Venomous):
- **Rat** — weak, fast
- **Bat** — flying, erratic movement
- **Skeleton** — bone throw ranged attack
- **Orc** — tough melee fighter
- **Wraith** — spectral bolt passes through walls
- **Dragon** — fire breath in a line

Enemy levels scale with dungeon depth. 15% chance of elite enemies. Minibosses every 5 floors.

### Summons (Class-Typed)
- **Warrior summons** → 🛡 Guardian (tanky, high HP)
- **Rogue summons** → 🗡 Assassin (flanking bonus, backstab)
- **Wizard summons** → 🔮 Caster (ranged attacks)
- Cap: 3 active summons. Scale with player level. Heal between floors.
- On death, leave a spirit pickup (👻) that buffs the player.

### Environmental Objects
- **✦ Shrines** — colored, pulsing. Activate for buffs (ATK, DEF, sight, heal, wand charges, speed, gold, XP).
- **▣ Chests** — trapped. May contain loot or spring a trap.
- **o Barrels** — destructible. May contain items, gold, potions, or a hiding rat.
- **? Scrolls** — lore text. Flavor and worldbuilding.

### Wands (9 types with elemental system)
Fire, Ice, Lightning, Poison, Teleport, Heal, Shield, Summon, and Wish (djinni grants a choice). Elemental wands apply shields and weapon enchantments.

### Other Systems
- **Shops** — buy/sell items from a shopkeeper (floor 2+)
- **8-rank progression** — Novice → Dungeon Lord, persistent across runs via localStorage. Each rank grants HP, ATK, DEF, sight, and heal bonuses.
- **Minimap** — toggle with Enter. Shows explored areas.
- **Spatial audio** — 6 enemy types have distinct stereo-panned sounds through bone conduction. Proximity warning rumble for adjacent enemies.
- **Floating combat text** — damage numbers, kill skulls, healing, pickups rise and fade.
- **Save/Load** — auto-saves every turn to localStorage.
- **Death attribution** — tracks what killed you and how.
- **Run statistics** — damage dealt/taken, kills by type, barrels smashed, scrolls read, shrines activated, etc.

## MRBD Format

This game is designed for Meta's Ray-Ban smart glasses display:
- **600×600 pixels** — fits the glasses viewport
- **D-pad only** — 4 directions + Enter, mapped to the glasses touchpad
- **Dark theme** (#0d0d0d background) — OLED-friendly, reduces light bleed
- **Bone conduction audio** — Web Audio API generates all sounds procedurally. No audio files.
- **Turn-based** — perfect for multitasking. Play while walking, waiting, commuting.
- **`var` only** — maximum browser compatibility (no `let`/`const`)

## Scoring

Evaluated on a 10-dimension /100 rubric against NetHack/Brogue as genre benchmarks:

| Dimension | Score |
|---|---|
| Trigger Moment | 5/5 |
| 5-Second Hook | 5/5 |
| Glasses Advantage | 5/5 |
| Return Visits | 5/5 |
| D-Pad Fit | 5/5 |
| Audio/Context | 5/5 |
| Session Variance | 4/5 |
| Strategic Depth | 5/5 |
| Surprise/Discovery | 4/5 |
| Craft | 5/5 |
| **Total** | **90/100 (S-tier)** |

## Credits

Built by an AI agent (Hatch) as part of the [Live in the Future](https://liveinthefuture.org) AI publishing machine. The entire game — code, audio, game design — was produced by AI with human direction and playtesting feedback.

## License

MIT. Do whatever you want with it.

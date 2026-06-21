# Stormgate MUD Bot

Autonomous Python bot that plays the Stormgate MUD solo, grinding from level 1 to 106.

## What It Does

- Connects via raw TCP socket (no browser needed)
- Handles telnet negotiation + GMCP protocol for structured data
- Creates a character automatically (Giant Warrior / Cleric multiclass)
- Fights mobs, loots corpses, heals, rests, explores
- Navigates zones appropriate for current level
- Handles death/respawn gracefully
- Logs all progress to `stormgate_bot.log`

## Architecture

Built from reading the actual C source code at [github.com/rayhe/stormgate](https://github.com/rayhe/stormgate).

### Character Build (optimized for solo)

| Attribute | Choice | Why |
|-----------|--------|-----|
| Race | Giant | STR +7, CON +6, size 6 — best raw melee stats |
| Class | Warrior | Highest HP gain (-30), best thac0 (11) and dam (20) |
| Multiclass | Cleric | Self-healing via cure spells, essential for solo |

### State Machine

```
CONNECTING → LOGIN → PLAYING
                        ↓
              ┌─── EXPLORING ←──┐
              │       ↓         │
              │    FIGHTING ────┤
              │       ↓         │
              │    HEALING ─────┤
              │       ↓         │
              └── RESTING ──────┘
                      ↑
                    DEAD → (respawn) → EXPLORING
```

### Decision Priority

1. **Dead?** → Respawn, get corpse
2. **HP < 25%?** → FLEE immediately
3. **In combat + HP < 70%?** → Cast healing
4. **In combat?** → Use skills (kick/bash/trip)
5. **HP < 50%?** → Rest
6. **Mob in room?** → Kill it
7. **No mob?** → Move to unexplored exit

### Zone Progression (from area file analysis)

| Level | Zones |
|-------|-------|
| 1-6 | Mud School |
| 5-10 | Goblin Fortress, Hedge Maze, Ziggurat |
| 10-20 | Harpy Aeyrie, Serf Village, Tar Pits |
| 20-40 | Bandit Caves, Dwarf Fort, Hall of Mirrors |
| 30-60 | Troll Mountain, Centaur Village |
| 50-70 | Android Place, Labyrinth, Menedek |
| 60-90 | Hammerheim, Tropical Forest |
| 70-100 | Arctic Wasteland, Clockwork Citadel |
| 80-105 | Bretonnia, Summerset Isle, Wyverns Keep |
| 90-105 | Shangil, Valhalla, Bretonnian Dungeons |

### XP Table (from `const.c`)

- Levels 1-100: 1,000 → 6,000 XP per level (gradual ramp)
- Level 101: 10,000 XP
- Level 102: 15,000 XP
- Level 103: 25,000 XP
- Level 104: 40,000 XP
- Total to 104: ~365,000 XP
- Levels 105-106: May require immortal promotion or special quest

### Level Hierarchy (from `merc.h`)

```
116 = L_IMP (UNUSED)
115 = L_TLD
...
111 = L_SEN
110 = L_ARC
109 = L_DIR
108 = L_IMM
107 = L_DEI
106 = L_APP (our target — Apprentice Immortal)
105 = LEVEL_DEMIGOD (max mortal via remort)
104 = LEVEL_CHAMP
103 = LEVEL_HERO3
102 = LEVEL_HERO2
101 = LEVEL_HERO1
100 = LEVEL_HERO
```

## Usage

```bash
# Default (localhost:4000)
python3 mud_bot.py

# Custom server
python3 mud_bot.py --host stormgate.example.com --port 4000

# Custom character
python3 mud_bot.py --name MyBot --race ogre --class barbarian --multiclass ""

# All options
python3 mud_bot.py \
  --host localhost \
  --port 4000 \
  --name Hatchbot \
  --password "mypass" \
  --race giant \
  --class warrior \
  --multiclass cleric
```

## Requirements

- Python 3.8+
- No external dependencies (pure stdlib)

## Log Output

The bot logs to both stdout and `stormgate_bot.log`:

```
2026-03-25 04:15:23 [INFO] ✅ Logged in and playing!
2026-03-25 04:15:25 [INFO] ⚔️  Attacking: goblin
2026-03-25 04:15:28 [INFO] ✅ Kill #1!
2026-03-25 04:15:30 [INFO] 🎉 LEVEL UP! 1 → 2
2026-03-25 04:16:23 [INFO] 📊 Status: Lvl 2 | HP 45/45 | Kills 3 | Deaths 0 | Rooms 12 | Time 0.0h
```

## How It Works Under the Hood

### Telnet + GMCP

The MUD uses a telnet protocol with IAC sequences. The bot negotiates GMCP (Generic MUD Communication Protocol) to receive structured JSON data:

- `Char.Vitals` → `{"hp":100,"maxhp":100,"mana":50,"maxmana":50,"move":100,"maxmove":100}`
- `Room.Info` → `{"name":"Town Square","exits":{"n":3001,"s":3003},"area":"Hometown","vnum":3000}`

When GMCP isn't available, it falls back to parsing the text prompt `<100hp 50m 100mv>`.

### Combat Detection

Parses damage messages from `fight.c`:
- Hit messages: "your slash", "your pierce", "hits you"
- Health indicators: "is in perfect health" through "is DYING"
- Death: "You have been KILLED!!" / "is DEAD!!"

### Quest System

From `quest.c`:
- Find a questmaster NPC → `quest request`
- Kill target mob or find target object
- Return → `quest complete`
- Reward: level/4 to level/2 quest points + gold
- Cooldown between quests

## Known Limitations

- Level 106 (L_APP) may require immortal promotion — the bot can grind to 104/105 autonomously but the final levels may need admin intervention
- No pathfinding yet — uses random exploration with preference for unvisited rooms
- Doesn't handle locked doors or keys
- No equipment optimization — wears whatever it finds
- No group play — solo only

## Source Code References

All game mechanics reverse-engineered from the C source:

| File | What We Learned |
|------|----------------|
| `merc.h` | Level constants, data structures |
| `const.c` | XP table, race stats, class stats |
| `comm.c` | Prompt format, GMCP protocol, login flow |
| `fight.c` | Combat messages, damage system |
| `quest.c` | Quest mechanics, rewards |
| `act_multi.c` | Multiclass/remort system |
| `act_info.c` | Health condition strings |
| `area/*.are` | Zone level ranges |

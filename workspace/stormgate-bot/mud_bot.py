#!/usr/bin/env python3
"""
Stormgate MUD Bot — Autonomous player agent
============================================
Connects to the Stormgate MUD (Diku/Merc/Envy/Mythran lineage) via raw TCP,
creates a character, and grinds to level 106 (L_APP / max mortal) solo.

Designed from reading the actual C source code at github.com/rayhe/stormgate.

Level structure (from merc.h):
  1-100   Normal mortal levels
  101-104 Hero tiers (exp_table jumps: 10k, 15k, 25k, 40k per level)
  105     LEVEL_HERO (LEVEL_DEMIGOD - 1 = L_APP - 2 = 104... actually:
          L_APP=106, LEVEL_DEMIGOD=105, LEVEL_HERO=101-ish)
  106     L_APP (Apprentice Immortal) — our target

XP table (from const.c):
  Levels 1-100: 1000 to 6000 XP per level (gradual ramp)
  Level 101: 10,000  Level 102: 15,000  Level 103: 25,000  Level 104: 40,000
  Total XP to 104: ~365,000. Levels 105-106 likely need IMM promotion.

Quest system (from quest.c):
  - Find questmaster NPC, say "quest request"
  - Kill target mob or find target object
  - Return to questmaster, say "quest complete"
  - Reward: level/4 to level/2 quest points (min 15) + gold
  - Cooldown timer between quests

Combat (from fight.c / fight2.c):
  - Multi-hit system, dual wield, shields
  - Damage messages indicate severity
  - "You have been KILLED!!" on death

Prompt format (from comm.c):
  Default: "<{hp}hp {mana}m {move}mv> " with ANSI color codes
  GMCP: Char.Vitals {hp, maxhp, mana, maxmana, move, maxmove}
        Room.Info {name, exits:{n:vnum, s:vnum, ...}, area, vnum}

Classes ranked for solo viability (from class_table in const.c):
  Warrior:   hp_gain -30 (highest), thac0_gain 11, dam_gain 20 — best HP/damage
  Barbarian: hp_gain -30, thac0_gain 11, dam_gain 20 — tied with Warrior, no magic
  Paladin:   hp_gain -16, has healing magic — strong hybrid
  Ranger:    hp_gain -18, magic + melee — solid hybrid
  Cleric:    hp_gain -10, healing focus — slower but durable

Optimal solo build: Warrior primary / Cleric multiclass (tank + self-heal)
Race: Giant (STR +7, CON +6, size 6) or Ogre (STR +6, CON +4, size 5)
"""

import socket
import re
import json
import time
import sys
import logging
import random
from enum import Enum, auto
from collections import deque
from dataclasses import dataclass, field
from typing import Optional

# =============================================================================
# CONFIGURATION
# =============================================================================

MUD_HOST = "localhost"
MUD_PORT = 4000

# Character settings — optimal solo build from source analysis
CHAR_NAME = "Hatchbot"
CHAR_PASSWORD = "str0ngP@ss2026"
CHAR_RACE = "giant"          # Giant: STR+7, CON+6, size 6 — best melee stats
CHAR_CLASS = "warrior"       # Warrior: highest HP gain (-30), best thac0/dam
CHAR_SEX = "male"
CHAR_MULTICLASS = "cleric"   # Cleric multiclass for self-healing
CHAR_RELIGION = ""           # Accept default or skip

# Combat settings
FLEE_HP_PERCENT = 25         # Flee when HP drops below this %
HEAL_HP_PERCENT = 70         # Use healing when below this %
REST_HP_PERCENT = 50         # Sit/rest when below this % and safe
MIN_MOVE_POINTS = 20         # Rest when movement drops below this

# Timing
COMMAND_DELAY = 0.8          # Seconds between commands (avoid flooding)
RECONNECT_DELAY = 10         # Seconds before reconnect on disconnect
STUCK_TIMEOUT = 60           # Seconds before assuming stuck
RECV_TIMEOUT = 0.5           # Socket recv timeout

# Zone progression (from area file analysis — {min_level}-{max_level} in names)
ZONE_PROGRESSION = [
    # (level_range_min, level_range_max, zone_keywords_to_find_mobs)
    (1,   6,   ["mud school", "school"]),
    (5,  10,   ["goblin", "hedge maze", "ziggurat"]),
    (8,  15,   ["brian"]),
    (10, 20,   ["aeyrie", "harpy", "serf", "tar pit"]),
    (15, 30,   ["asylum"]),
    (20, 40,   ["bandit", "dwarf fort", "dwarven", "mirrors"]),
    (25, 50,   ["dragon valley", "pyramid"]),
    (30, 50,   ["academy", "centaur", "troll"]),
    (35, 50,   ["misty mountains", "ashakar"]),
    (40, 75,   ["methic", "graveyard"]),
    (45, 50,   ["viking"]),
    (50, 70,   ["android", "labyrinth", "menedek", "stormgate", "deathfang"]),
    (50, 85,   ["dark forest", "ways", "carhain"]),
    (55, 75,   ["nexus", "saphrim"]),
    (60, 90,   ["hammerheim", "temple", "tropical"]),
    (70,100,   ["arctic", "clockwork", "daemonic keep"]),
    (75,100,   ["black tower", "hell", "city park"]),
    (80,105,   ["bretonnia", "summerset", "wyvern"]),
    (85,100,   ["relfaust"]),
    (90,105,   ["dungeons", "shangil", "valhalla", "forest shrine"]),
    (95,104,   ["lost valley"]),
]

# Logging
LOG_FILE = "stormgate_bot.log"
LOG_LEVEL = logging.DEBUG

# =============================================================================
# TELNET PROTOCOL CONSTANTS
# =============================================================================

IAC  = 255  # Interpret As Command
DONT = 254
DO   = 253
WONT = 252
WILL = 251
SB   = 250  # Sub-negotiation Begin
SE   = 240  # Sub-negotiation End
TELOPT_ECHO = 1
TELOPT_GMCP = 201

# =============================================================================
# ANSI STRIPPING
# =============================================================================

ANSI_RE = re.compile(r'\x1b\[[0-9;]*[a-zA-Z]|\x1b\(B')

def strip_ansi(text: str) -> str:
    """Remove ANSI color/escape codes."""
    return ANSI_RE.sub('', text)

# =============================================================================
# DATA CLASSES
# =============================================================================

class BotState(Enum):
    CONNECTING = auto()
    LOGIN_ANSI = auto()
    LOGIN_NAME = auto()
    LOGIN_PASSWORD = auto()
    LOGIN_CONFIRM_NAME = auto()
    LOGIN_NEW_PASSWORD = auto()
    LOGIN_CONFIRM_PASSWORD = auto()
    LOGIN_RACE = auto()
    LOGIN_SEX = auto()
    LOGIN_CLASS = auto()
    LOGIN_CONFIRM_CLASS = auto()
    LOGIN_MULTICLASS_CHOICE = auto()
    LOGIN_MULTICLASS_SELECT = auto()
    LOGIN_CONFIRM_MULTICLASS = auto()
    LOGIN_RELIGION = auto()
    LOGIN_CONFIRM_RELIGION = auto()
    LOGIN_MOTD = auto()
    PLAYING = auto()
    IDLE = auto()
    EXPLORING = auto()
    FIGHTING = auto()
    HEALING = auto()
    RESTING = auto()
    FLEEING = auto()
    QUESTING = auto()
    DEAD = auto()

@dataclass
class Vitals:
    hp: int = 100
    max_hp: int = 100
    mana: int = 100
    max_mana: int = 100
    move: int = 100
    max_move: int = 100

    @property
    def hp_pct(self) -> int:
        return int(self.hp / max(self.max_hp, 1) * 100)

    @property
    def mana_pct(self) -> int:
        return int(self.mana / max(self.max_mana, 1) * 100)

    @property
    def move_pct(self) -> int:
        return int(self.move / max(self.max_move, 1) * 100)

@dataclass
class RoomInfo:
    name: str = ""
    exits: dict = field(default_factory=dict)  # {"n": vnum, "s": vnum, ...}
    area: str = ""
    vnum: int = 0

@dataclass
class Stats:
    level: int = 1
    exp: int = 0
    gold: int = 0
    kills: int = 0
    deaths: int = 0
    quests_done: int = 0
    quest_points: int = 0
    rooms_explored: int = 0
    start_time: float = field(default_factory=time.time)

    @property
    def play_time_hrs(self) -> float:
        return (time.time() - self.start_time) / 3600

# =============================================================================
# THE BOT
# =============================================================================

class StormgateBot:
    def __init__(self, host: str = MUD_HOST, port: int = MUD_PORT):
        self.host = host
        self.port = port
        self.sock: Optional[socket.socket] = None
        self.buffer = b""
        self.state = BotState.CONNECTING
        self.vitals = Vitals()
        self.room = RoomInfo()
        self.stats = Stats()
        self.gmcp_enabled = False
        self.visited_rooms: set = set()
        self.room_map: dict = {}  # vnum -> RoomInfo
        self.command_queue: deque = deque()
        self.last_command_time = 0.0
        self.last_activity_time = time.time()
        self.is_fighting = False
        self.fight_target = ""
        self.current_quest_target = ""
        self.current_quest_type = ""  # "kill" or "find"
        self.has_quest = False
        self.quest_cooldown = False
        self.exploring_direction_idx = 0
        self.is_new_character = False
        self.login_phase = 0
        self.recent_output: deque = deque(maxlen=100)
        self.movement_history: deque = deque(maxlen=20)

        # Set up logging
        logging.basicConfig(
            level=LOG_LEVEL,
            format='%(asctime)s [%(levelname)s] %(message)s',
            handlers=[
                logging.FileHandler(LOG_FILE),
                logging.StreamHandler(sys.stdout)
            ]
        )
        self.log = logging.getLogger("StormgateBot")

    # =========================================================================
    # CONNECTION
    # =========================================================================

    def connect(self):
        """Establish TCP connection to the MUD."""
        self.log.info(f"Connecting to {self.host}:{self.port}...")
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.sock.settimeout(RECV_TIMEOUT)
        self.sock.connect((self.host, self.port))
        self.state = BotState.LOGIN_ANSI
        self.last_activity_time = time.time()
        self.log.info("Connected!")

    def disconnect(self):
        """Close the connection."""
        if self.sock:
            try:
                self.sock.close()
            except:
                pass
            self.sock = None

    def send(self, text: str):
        """Send a command to the MUD."""
        if not self.sock:
            return
        # Rate limit
        elapsed = time.time() - self.last_command_time
        if elapsed < COMMAND_DELAY:
            time.sleep(COMMAND_DELAY - elapsed)

        self.sock.sendall((text + "\n").encode('utf-8', errors='replace'))
        self.last_command_time = time.time()
        self.last_activity_time = time.time()
        if text not in ('', '\n'):
            self.log.debug(f"SEND: {text}")

    def send_iac(self, *bytes_to_send):
        """Send raw telnet bytes."""
        if self.sock:
            self.sock.sendall(bytes(bytes_to_send))

    def receive(self) -> str:
        """Receive and process data from the MUD. Returns cleaned text."""
        try:
            data = self.sock.recv(8192)
        except socket.timeout:
            return ""
        except (ConnectionError, OSError):
            self.log.warning("Connection lost!")
            return ""

        if not data:
            self.log.warning("Connection closed by server.")
            return ""

        self.buffer += data
        text_parts = []

        # Process telnet commands in the buffer
        i = 0
        clean = bytearray()
        while i < len(self.buffer):
            if self.buffer[i] == IAC:
                if i + 1 >= len(self.buffer):
                    break  # Need more data
                cmd = self.buffer[i + 1]

                if cmd in (WILL, WONT, DO, DONT):
                    if i + 2 >= len(self.buffer):
                        break
                    opt = self.buffer[i + 2]
                    self._handle_telnet(cmd, opt)
                    i += 3
                elif cmd == SB:
                    # Find SE
                    se_idx = self.buffer.find(bytes([IAC, SE]), i + 2)
                    if se_idx == -1:
                        break  # Need more data
                    sub_data = self.buffer[i + 2:se_idx]
                    self._handle_subneg(sub_data)
                    i = se_idx + 2
                elif cmd == IAC:
                    clean.append(IAC)
                    i += 2
                else:
                    i += 2
            else:
                clean.append(self.buffer[i])
                i += 1

        self.buffer = self.buffer[i:]

        text = clean.decode('utf-8', errors='replace')
        text = strip_ansi(text)

        if text.strip():
            self.last_activity_time = time.time()
            for line in text.split('\n'):
                line = line.strip()
                if line:
                    self.recent_output.append(line)

        return text

    def _handle_telnet(self, cmd: int, opt: int):
        """Handle telnet negotiation."""
        if opt == TELOPT_GMCP:
            if cmd == WILL:
                # Server offers GMCP, accept it
                self.send_iac(IAC, DO, TELOPT_GMCP)
                self.gmcp_enabled = True
                self.log.info("GMCP enabled")
            elif cmd == DO:
                self.send_iac(IAC, WILL, TELOPT_GMCP)
                self.gmcp_enabled = True
        elif opt == TELOPT_ECHO:
            if cmd == WILL:
                self.send_iac(IAC, DO, TELOPT_ECHO)
            elif cmd == WONT:
                self.send_iac(IAC, DONT, TELOPT_ECHO)
        else:
            # Refuse everything else
            if cmd == WILL:
                self.send_iac(IAC, DONT, opt)
            elif cmd == DO:
                self.send_iac(IAC, WONT, opt)

    def _handle_subneg(self, data: bytes):
        """Handle telnet sub-negotiation (GMCP)."""
        if len(data) < 1:
            return
        if data[0] == TELOPT_GMCP:
            gmcp_str = data[1:].decode('utf-8', errors='replace')
            self._handle_gmcp(gmcp_str)

    def _handle_gmcp(self, message: str):
        """Parse GMCP message and update state."""
        # Format: "Package.Name {json}" or "Package.Name json"
        space_idx = message.find(' ')
        if space_idx == -1:
            return
        package = message[:space_idx].strip()
        json_str = message[space_idx + 1:].strip()

        try:
            data = json.loads(json_str)
        except json.JSONDecodeError:
            return

        if package == "Char.Vitals":
            self.vitals.hp = data.get("hp", self.vitals.hp)
            self.vitals.max_hp = data.get("maxhp", self.vitals.max_hp)
            self.vitals.mana = data.get("mana", self.vitals.mana)
            self.vitals.max_mana = data.get("maxmana", self.vitals.max_mana)
            self.vitals.move = data.get("move", self.vitals.move)
            self.vitals.max_move = data.get("maxmove", self.vitals.max_move)
            self.log.debug(
                f"Vitals: {self.vitals.hp}/{self.vitals.max_hp} HP, "
                f"{self.vitals.mana}/{self.vitals.max_mana} Mana, "
                f"{self.vitals.move}/{self.vitals.max_move} Move"
            )

        elif package == "Room.Info":
            self.room.name = data.get("name", "")
            self.room.exits = data.get("exits", {})
            self.room.area = data.get("area", "")
            self.room.vnum = data.get("vnum", 0)
            if self.room.vnum and self.room.vnum not in self.visited_rooms:
                self.visited_rooms.add(self.room.vnum)
                self.stats.rooms_explored += 1
            self.room_map[self.room.vnum] = RoomInfo(
                name=self.room.name,
                exits=dict(self.room.exits),
                area=self.room.area,
                vnum=self.room.vnum
            )

    # =========================================================================
    # TEXT PARSING (fallback when GMCP is unavailable)
    # =========================================================================

    def parse_prompt(self, text: str):
        """Parse HP/Mana/Move from the text prompt."""
        # Default prompt: <123hp 456m 789mv>
        m = re.search(r'<\s*(\d+)\s*hp\s+(\d+)\s*(?:m|bp)\s+(\d+)\s*mv\s*>', text)
        if m:
            self.vitals.hp = int(m.group(1))
            self.vitals.mana = int(m.group(2))
            self.vitals.move = int(m.group(3))

    def parse_score(self, text: str):
        """Parse the 'score' command output."""
        # Level
        m = re.search(r'Level\s+(\d+)', text, re.IGNORECASE)
        if m:
            old_level = self.stats.level
            self.stats.level = int(m.group(1))
            if self.stats.level > old_level:
                self.log.info(f"🎉 LEVEL UP! {old_level} → {self.stats.level}")

        # Exp
        m = re.search(r'Exp(?:erience)?\s*[:\s]+(\d+)', text, re.IGNORECASE)
        if m:
            self.stats.exp = int(m.group(1))

        # Gold
        m = re.search(r'Gold\s*[:\s]+(\d+)', text, re.IGNORECASE)
        if m:
            self.stats.gold = int(m.group(1))

        # Quest points
        m = re.search(r'Quest Points?\s*[:\s]+(\d+)', text, re.IGNORECASE)
        if m:
            self.stats.quest_points = int(m.group(1))

        # Max HP/Mana/Move from score
        m = re.search(r'Hit Points?\s*[:\s]+(\d+)/(\d+)', text, re.IGNORECASE)
        if m:
            self.vitals.hp = int(m.group(1))
            self.vitals.max_hp = int(m.group(2))

    def parse_room(self, text: str):
        """Parse room description and exits from 'look' output."""
        # Exits line: [Exits: north south east]
        m = re.search(r'\[Exits?:\s*([^\]]+)\]', text)
        if m and not self.gmcp_enabled:
            exit_str = m.group(1).strip()
            exits = {}
            for d in ['north', 'south', 'east', 'west', 'up', 'down']:
                if d in exit_str.lower():
                    exits[d[0]] = 0  # Unknown vnum
            self.room.exits = exits

    def detect_combat(self, text: str) -> bool:
        """Detect if we're in combat from text output."""
        combat_indicators = [
            "you hit", "hits you", "you miss", "misses you",
            "your slash", "your pierce", "your pound", "your crush",
            "you parry", "you dodge", "you are stunned",
            "is in perfect health", "is slightly scratched",
            "has a few bruises", "has some cuts", "has several wounds",
            "has many nasty wounds", "is bleeding freely",
            "is covered in blood", "is leaking guts", "is almost dead",
            "is DYING", "is DEAD", "you have been KILLED",
            "MASSACRES you", "you MASSACRE", "ANNIHILATES",
            "OBLITERATES", "DEMOLISHES", "DEVASTATES",
        ]
        text_lower = text.lower()
        return any(ind in text_lower for ind in combat_indicators)

    def detect_death(self, text: str) -> bool:
        """Detect if we died."""
        return "you have been killed" in text.lower()

    def detect_mob_in_room(self, text: str) -> Optional[str]:
        """Try to detect a killable mob in the room."""
        lines = text.split('\n')
        for line in lines:
            line = line.strip()
            # Mobs typically show as "A mob_name is here." or "Mob_name stands here."
            if re.match(r'^(A |An |The |Some )', line) and (
                'is here' in line.lower() or
                'stands here' in line.lower() or
                'is resting here' in line.lower() or
                'is sleeping here' in line.lower() or
                'floats here' in line.lower()
            ):
                # Extract mob keyword (first noun-ish word)
                m = re.match(r'^(?:A |An |The |Some )(\w+)', line)
                if m:
                    mob = m.group(1).lower()
                    # Skip known non-combat NPCs
                    skip = ['adept', 'healer', 'questmaster', 'furey', 'hatchet',
                            'portia', 'bridget', 'receptionist', 'guide', 'guardian',
                            'guildmaster', 'classmaster', 'shopkeeper', 'janitor']
                    if mob not in skip:
                        return mob
        return None

    # =========================================================================
    # LOGIN STATE MACHINE
    # =========================================================================

    def handle_login(self, text: str):
        """Handle the character creation / login flow."""
        text_lower = text.lower()
        self.log.debug(f"LOGIN STATE={self.state.name} | text={text[:200]}")

        # Detect prompts and respond
        if self.state == BotState.LOGIN_ANSI:
            # GMCP negotiation auto-skips ANSI on this MUD (comm.c checks
            # CON_GET_ANSI during IAC processing). Don't send "yes" — just
            # wait for the name prompt which comes after GMCP handshake.
            if "by what name" in text_lower or "shall you be known" in text_lower:
                self.send(CHAR_NAME)
                self.state = BotState.LOGIN_PASSWORD
            elif "ansi" in text_lower and "gmcp" not in text_lower:
                # Only answer ANSI if GMCP didn't auto-skip it
                if not self.gmcp_enabled:
                    self.send("yes")
                self.state = BotState.LOGIN_NAME

        elif self.state == BotState.LOGIN_NAME:
            if "by what name" in text_lower or "your name" in text_lower or \
               "character name" in text_lower or "login" in text_lower:
                self.send(CHAR_NAME)
                self.state = BotState.LOGIN_PASSWORD

        elif self.state == BotState.LOGIN_PASSWORD:
            if "did i get that right" in text_lower:
                self.send("y")
                # Stay in LOGIN_PASSWORD — next prompt will be password or new char
            elif "password" in text_lower:
                if "new character" in text_lower or "new to" in text_lower or \
                   "give me a password" in text_lower or "new password" in text_lower:
                    self.is_new_character = True
                    self.send(CHAR_PASSWORD)
                    self.state = BotState.LOGIN_NEW_PASSWORD
                else:
                    self.send(CHAR_PASSWORD)
                    self.state = BotState.PLAYING

        elif self.state == BotState.LOGIN_CONFIRM_NAME:
            if "password" in text_lower or "new password" in text_lower:
                self.send(CHAR_PASSWORD)
                self.state = BotState.LOGIN_NEW_PASSWORD

        elif self.state == BotState.LOGIN_NEW_PASSWORD:
            if "confirm" in text_lower or "again" in text_lower or "retype" in text_lower:
                self.send(CHAR_PASSWORD)
                self.state = BotState.LOGIN_RACE

        elif self.state == BotState.LOGIN_RACE:
            if "press return" in text_lower or "press enter" in text_lower or \
               "continue" in text_lower:
                self.send("")
            elif "are you sure" in text_lower:
                self.send("y")
                self.state = BotState.LOGIN_SEX
            elif "not a race" in text_lower or "what is your race" in text_lower:
                self.send("Giant")  # Try exact casing
            elif "race" in text_lower or "select" in text_lower:
                self.send("Giant")
                # Don't advance state yet — wait for "are you sure"

        elif self.state == BotState.LOGIN_SEX:
            if "sex" in text_lower or "gender" in text_lower or "(m/f/n)" in text_lower:
                self.send("m")
                self.state = BotState.LOGIN_CLASS
            elif "press return" in text_lower or "continue" in text_lower:
                self.send("")

        elif self.state == BotState.LOGIN_CLASS:
            if "press return" in text_lower or "continue" in text_lower:
                self.send("")
            elif "are you sure" in text_lower or "is this the class" in text_lower:
                self.send("y")
                self.state = BotState.LOGIN_MULTICLASS_CHOICE
            elif "not a class" in text_lower:
                self.send("Warrior")
            elif "class" in text_lower or "select" in text_lower or "profession" in text_lower:
                self.send("Warrior")

        elif self.state == BotState.LOGIN_MULTICLASS_CHOICE:
            if "press return" in text_lower or "continue" in text_lower:
                self.send("")
            elif "multiclass" in text_lower or "dual" in text_lower:
                if CHAR_MULTICLASS:
                    self.send("y")
                    self.state = BotState.LOGIN_MULTICLASS_SELECT
                else:
                    self.send("n")
                    self.state = BotState.LOGIN_RELIGION

        elif self.state == BotState.LOGIN_MULTICLASS_SELECT:
            if "press return" in text_lower or "continue" in text_lower:
                self.send("")
            elif "are you sure" in text_lower or "is this the class" in text_lower:
                self.send("y")
                self.state = BotState.LOGIN_RELIGION
            elif "not a class" in text_lower:
                self.send("Cleric")
            elif "select" in text_lower or "chose" in text_lower or \
                 "choose" in text_lower or "class" in text_lower:
                self.send("Cleric")

        elif self.state == BotState.LOGIN_RELIGION:
            if "press return" in text_lower or "continue" in text_lower:
                self.send("")
            elif "religion" in text_lower or "deity" in text_lower or "god" in text_lower or \
                 "worship" in text_lower or "faith" in text_lower:
                if CHAR_RELIGION:
                    self.send(CHAR_RELIGION)
                else:
                    self.send("a")  # Pick first religion (letter-based)
                self.state = BotState.LOGIN_CONFIRM_RELIGION
            elif "welcome" in text_lower or "you are standing" in text_lower or \
                 "exits:" in text_lower:
                self.state = BotState.PLAYING
                self.log.info("✅ Logged in and playing!")

        elif self.state == BotState.LOGIN_CONFIRM_RELIGION:
            if "not a religion" in text_lower or "what is your religion" in text_lower:
                self.send("a")
            elif "are you sure" in text_lower or "is this" in text_lower or "confirm" in text_lower:
                self.send("y")
                self.state = BotState.LOGIN_MOTD
            elif "press return" in text_lower or "continue" in text_lower:
                self.send("")
            elif "welcome" in text_lower or "exits:" in text_lower or \
                 "motd" in text_lower or "you are standing" in text_lower:
                self.state = BotState.PLAYING
                self.log.info("✅ Logged in and playing!")

        elif self.state == BotState.LOGIN_MOTD:
            if "press return" in text_lower or "continue" in text_lower:
                self.send("")
            elif "strength" in text_lower and ("|a" in text_lower or "|b" in text_lower):
                # Stat roll selection — pick highest STR column
                self.send("c")
            elif "attributes you desire" in text_lower:
                self.send("y")
            elif "pkill" in text_lower or "player killer" in text_lower or \
                 "pk " in text_lower:
                self.send("n")  # No PK for solo grinder
            elif "peaceful" in text_lower:
                self.send("y")  # Yes, confirm peaceful
            elif "welcome" in text_lower or "exits:" in text_lower or \
                 "you are standing" in text_lower:
                self.state = BotState.PLAYING
                self.log.info("✅ Logged in and playing!")
            # Will transition to PLAYING via prompt detection below

        # Generic: detect when we're in the game
        if "motd" in text_lower or "message of the day" in text_lower:
            self.send("")
            self.state = BotState.LOGIN_MOTD

        # Detect we're actually playing (got a prompt or GMCP vitals)
        if re.search(r'<\s*\d+\s*hp\s+\d+\s*(?:m|bp)\s+\d+\s*mv\s*>', text):
            self.state = BotState.PLAYING
            self.log.info("✅ Logged in and playing!")

    # =========================================================================
    # GAME ACTIONS
    # =========================================================================

    def do_look(self):
        self.send("look")

    def do_score(self):
        self.send("score")

    def do_kill(self, target: str):
        self.send(f"kill {target}")
        self.is_fighting = True
        self.fight_target = target
        self.log.info(f"⚔️  Attacking: {target}")

    def do_flee(self):
        self.send("flee")
        self.log.warning("🏃 FLEEING!")

    def do_recall(self):
        self.send("recall")
        self.log.info("📍 Recalling to safety")

    def do_rest(self):
        self.send("rest")
        self.log.info("💤 Resting...")

    def do_wake(self):
        self.send("wake")

    def do_stand(self):
        self.send("stand")

    def do_heal(self):
        """Use healing spells/skills based on class."""
        if self.vitals.mana > 30:
            self.send("cast 'cure light'")
            self.log.info("💚 Casting cure light")
        elif self.vitals.mana > 15:
            self.send("cast 'cure light'")

    def do_train(self):
        """Train stats at a trainer NPC."""
        self.send("train")

    def do_practice(self):
        """Practice skills at a practitioner NPC."""
        self.send("practice")

    def do_quest_request(self):
        """Request a quest from questmaster."""
        self.send("quest request")
        self.log.info("📜 Requesting quest...")

    def do_quest_complete(self):
        """Complete a quest."""
        self.send("quest complete")
        self.log.info("📜 Completing quest...")

    def do_move(self, direction: str):
        """Move in a direction."""
        dir_map = {"n": "north", "s": "south", "e": "east", "w": "west",
                   "u": "up", "d": "down"}
        full_dir = dir_map.get(direction, direction)
        self.send(full_dir)
        self.movement_history.append(direction)

    def do_equip_best(self):
        """Auto-equip the best gear we have."""
        self.send("equipment")
        time.sleep(0.5)
        # The MUD auto-equips on get in many cases
        # We can also try 'wear all' and 'wield' commands
        self.send("wear all")
        time.sleep(0.3)
        self.send("wield all")

    # =========================================================================
    # AI DECISION ENGINE
    # =========================================================================

    def decide_action(self, text: str):
        """Main decision loop — what to do next based on state and context."""

        # Priority 1: Are we dead?
        if self.detect_death(text):
            self.stats.deaths += 1
            self.is_fighting = False
            self.log.error(f"💀 DIED! Total deaths: {self.stats.deaths}")
            self.state = BotState.DEAD
            time.sleep(2)
            # After death, we're usually at recall point as a ghost
            # Look around and try to get corpse
            self.do_look()
            self.state = BotState.EXPLORING
            return

        # Priority 2: Are we in combat?
        if self.detect_combat(text):
            self.is_fighting = True
            self.state = BotState.FIGHTING

        # Priority 3: Did combat end?
        if self.is_fighting and ("is DEAD" in text or "is dead" in text):
            if "you have been killed" not in text.lower():
                self.stats.kills += 1
                self.is_fighting = False
                self.fight_target = ""
                self.log.info(f"✅ Kill #{self.stats.kills}!")
                # Loot the corpse
                self.send("get all corpse")
                time.sleep(0.5)
                self.send("sacrifice corpse")
                self.state = BotState.EXPLORING

        # Branch by state
        if self.state == BotState.FIGHTING:
            self._handle_fighting()
        elif self.state in (BotState.PLAYING, BotState.EXPLORING, BotState.IDLE):
            self._handle_exploring(text)
        elif self.state == BotState.RESTING:
            self._handle_resting()
        elif self.state == BotState.HEALING:
            self._handle_healing()

    def _handle_fighting(self):
        """Handle combat decisions."""
        # Emergency flee
        if self.vitals.hp_pct < FLEE_HP_PERCENT:
            self.do_flee()
            self.is_fighting = False
            self.state = BotState.HEALING
            return

        # Use healing mid-combat if we have mana
        if self.vitals.hp_pct < HEAL_HP_PERCENT and self.vitals.mana > 30:
            self.do_heal()

        # Otherwise, keep fighting (auto-attack handles the rest)
        # Can add skill usage here: bash, kick, etc.
        if random.random() < 0.3:
            skills = ["kick", "bash", "trip", "dirt"]
            self.send(random.choice(skills))

    def _handle_exploring(self, text: str):
        """Handle exploration and mob hunting."""
        self.state = BotState.EXPLORING

        # Check if we need to rest
        if self.vitals.hp_pct < REST_HP_PERCENT and not self.is_fighting:
            self.state = BotState.RESTING
            self.do_rest()
            return

        if self.vitals.move < MIN_MOVE_POINTS:
            self.state = BotState.RESTING
            self.do_rest()
            return

        # Try to find and kill a mob in the current room
        mob = self.detect_mob_in_room(text)
        if mob:
            self.do_kill(mob)
            return

        # No mob — explore
        self._explore_random()

    def _explore_random(self):
        """Move to a random available exit."""
        if not self.room.exits:
            # No GMCP exits, try looking
            self.do_look()
            time.sleep(1)
            return

        exits = list(self.room.exits.keys())
        if not exits:
            self.do_recall()
            return

        # Prefer unexplored rooms
        unexplored = []
        for d in exits:
            vnum = self.room.exits.get(d, 0)
            if vnum and vnum not in self.visited_rooms:
                unexplored.append(d)

        if unexplored:
            direction = random.choice(unexplored)
        else:
            direction = random.choice(exits)

        self.do_move(direction)

    def _handle_resting(self):
        """Handle resting state."""
        if self.vitals.hp_pct >= 90 and self.vitals.move > MIN_MOVE_POINTS * 2:
            self.do_stand()
            self.state = BotState.EXPLORING
            self.log.info("🆙 Rested up, moving on")
        # Otherwise keep resting (the MUD heals faster when resting)

    def _handle_healing(self):
        """Handle post-flee healing."""
        if self.vitals.hp_pct < HEAL_HP_PERCENT:
            if self.vitals.mana > 30:
                self.do_heal()
            else:
                self.do_rest()
                self.state = BotState.RESTING
        else:
            self.state = BotState.EXPLORING

    # =========================================================================
    # PERIODIC TASKS
    # =========================================================================

    def periodic_score_check(self):
        """Periodically check score for level-up detection."""
        self.do_score()

    def periodic_quest_check(self):
        """Check if we can do a quest."""
        if not self.has_quest and not self.quest_cooldown:
            # Look for questmaster in room
            recent = '\n'.join(self.recent_output)
            if 'questmaster' in recent.lower() or 'quest master' in recent.lower():
                self.do_quest_request()

    def log_status(self):
        """Log current status."""
        self.log.info(
            f"📊 Status: Lvl {self.stats.level} | "
            f"HP {self.vitals.hp}/{self.vitals.max_hp} | "
            f"Kills {self.stats.kills} | Deaths {self.stats.deaths} | "
            f"Rooms {self.stats.rooms_explored} | "
            f"Time {self.stats.play_time_hrs:.1f}h"
        )

    # =========================================================================
    # MAIN LOOP
    # =========================================================================

    def run(self):
        """Main bot loop."""
        self.log.info("=" * 60)
        self.log.info("Stormgate MUD Bot starting...")
        self.log.info(f"Target: {self.host}:{self.port}")
        self.log.info(f"Character: {CHAR_NAME} ({CHAR_RACE} {CHAR_CLASS}/{CHAR_MULTICLASS})")
        self.log.info(f"Goal: Level 106 (L_APP)")
        self.log.info("=" * 60)

        while True:
            try:
                self.connect()
                self._game_loop()
            except KeyboardInterrupt:
                self.log.info("Bot stopped by user.")
                self.disconnect()
                self.log_status()
                break
            except Exception as e:
                self.log.error(f"Error: {e}")
                self.disconnect()
                self.log.info(f"Reconnecting in {RECONNECT_DELAY}s...")
                time.sleep(RECONNECT_DELAY)

    def _game_loop(self):
        """Inner game loop — runs until disconnect."""
        score_timer = time.time()
        status_timer = time.time()
        look_timer = time.time()

        while True:
            text = self.receive()
            if text is None or (not text and not self.sock):
                raise ConnectionError("Disconnected")

            if text:
                # Parse prompt from text
                self.parse_prompt(text)

                # Handle login if not yet playing
                if self.state not in (BotState.PLAYING, BotState.EXPLORING,
                                      BotState.FIGHTING, BotState.HEALING,
                                      BotState.RESTING, BotState.DEAD,
                                      BotState.IDLE, BotState.QUESTING):
                    self.handle_login(text)
                else:
                    # Parse game output
                    self.parse_room(text)
                    self.parse_score(text)

                    # AI decision
                    self.decide_action(text)

            # Periodic tasks (only when playing)
            now = time.time()

            if self.state in (BotState.PLAYING, BotState.EXPLORING,
                              BotState.IDLE) and not self.is_fighting:
                # Score check every 30s
                if now - score_timer > 30:
                    self.periodic_score_check()
                    score_timer = now

                # Look around every 5s if exploring
                if now - look_timer > 5 and self.state == BotState.EXPLORING:
                    self.do_look()
                    look_timer = now

            # Status log every 60s
            if now - status_timer > 60:
                self.log_status()
                status_timer = now

            # Stuck detection
            if now - self.last_activity_time > STUCK_TIMEOUT:
                self.log.warning("⚠️  Stuck! Recalling...")
                self.do_recall()
                self.last_activity_time = now

            # Small sleep to prevent busy-waiting
            if not text:
                time.sleep(0.1)


# =============================================================================
# ENTRY POINT
# =============================================================================

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Stormgate MUD Bot")
    parser.add_argument("--host", default=MUD_HOST, help="MUD server host")
    parser.add_argument("--port", type=int, default=MUD_PORT, help="MUD server port")
    parser.add_argument("--name", default=CHAR_NAME, help="Character name")
    parser.add_argument("--password", default=CHAR_PASSWORD, help="Character password")
    parser.add_argument("--race", default=CHAR_RACE, help="Character race")
    parser.add_argument("--class", dest="cls", default=CHAR_CLASS, help="Character class")
    parser.add_argument("--multiclass", default=CHAR_MULTICLASS, help="Multiclass")
    args = parser.parse_args()

    # Override config
    MUD_HOST = args.host
    MUD_PORT = args.port
    CHAR_NAME = args.name
    CHAR_PASSWORD = args.password
    CHAR_RACE = args.race
    CHAR_CLASS = args.cls
    CHAR_MULTICLASS = args.multiclass

    bot = StormgateBot(host=args.host, port=args.port)
    bot.run()

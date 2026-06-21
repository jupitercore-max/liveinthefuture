#!/usr/bin/env python3
"""Inject background music system into LITF games."""
import re
import os

GAMES_DIR = "/home/hatch/workspace/liveinthefuture/games"

GAME_CONFIG = {
    "dungeon-crawl": {"bgm": "dungeon-crawl-bgm.mp3", "gameover": "gameover-dark.mp3", "play_states": ["ST_PLAY"], "dead_states": ["ST_DEAD"]},
    "stalk": {"bgm": "stalk-bgm.mp3", "gameover": "gameover-horror.mp3", "play_states": ["STATE_PLAY"], "dead_states": ["STATE_CAUGHT"]},
    "gravity-sling": {"bgm": "gravity-sling-bgm.mp3", "gameover": "gameover-gentle.mp3", "play_states": ["ST_AIM"], "dead_states": ["ST_FAIL"]},
    "sonar-sub": {"bgm": "sonar-sub-bgm.mp3", "gameover": "gameover-dark.mp3", "play_states": ['"playing"'], "dead_states": ['"dead"']},
    "terraform": {"bgm": "terraform-bgm.mp3", "gameover": "gameover-dark.mp3", "play_states": ["ST_PLAY"], "dead_states": ["ST_DEAD"]},
    "fisher": {"bgm": "fisher-bgm.mp3", "gameover": "gameover-gentle.mp3", "play_states": ["STATE_CASTING"], "dead_states": ["STATE_MISSED"]},
    "trader": {"bgm": "trader-bgm.mp3", "gameover": "gameover-gentle.mp3", "play_states": ["STATE_PLAY"], "dead_states": ["STATE_RESULT"]},
    "pulse": {"bgm": "pulse-bgm.mp3", "gameover": "gameover-dark.mp3", "play_states": [], "dead_states": []},
    "tower-defense": {"bgm": "tower-defense-bgm.mp3", "gameover": "gameover-dark.mp3", "play_states": [], "dead_states": []},
    "mine": {"bgm": "mine-bgm.mp3", "gameover": "gameover-dark.mp3", "play_states": [], "dead_states": []},
    "hex-collapse": {"bgm": "hex-collapse-bgm.mp3", "gameover": "gameover-gentle.mp3", "play_states": [], "dead_states": []},
    "beacon": {"bgm": "beacon-bgm.mp3", "gameover": "gameover-gentle.mp3", "play_states": [], "dead_states": []},
    "duel": {"bgm": "duel-bgm.mp3", "gameover": "gameover-dark.mp3", "play_states": [], "dead_states": []},
    "photon-dodge": {"bgm": "photon-dodge-bgm.mp3", "gameover": "gameover-dark.mp3", "play_states": [], "dead_states": []},
    "signal": {"bgm": "signal-bgm.mp3", "gameover": "gameover-gentle.mp3", "play_states": [], "dead_states": []},
    "buffalo": {"bgm": "buffalo-bgm.mp3", "gameover": "gameover-dark.mp3", "play_states": [], "dead_states": []},
    "buffalo-gold": {"bgm": "buffalo-bgm.mp3", "gameover": "gameover-dark.mp3", "play_states": [], "dead_states": []},
    "audio-memory": {"bgm": "audio-memory-bgm.mp3", "gameover": "gameover-gentle.mp3", "play_states": [], "dead_states": []},
    "rhythm-pulse": {"bgm": "rhythm-pulse-bgm.mp3", "gameover": "gameover-dark.mp3", "play_states": [], "dead_states": []},
}

def make_bgm_code(bgm, gameover):
    return f'''
// === BGM System ===
var bgmAudio = null, bgmGameover = null, bgmMuted = false, bgmStarted = false;
function bgmInit() {{
  bgmAudio = new Audio('audio/{bgm}');
  bgmAudio.loop = true;
  bgmAudio.volume = 0.15;
  bgmGameover = new Audio('audio/{gameover}');
  bgmGameover.volume = 0.25;
}}
function bgmPlay() {{
  if (bgmMuted || !bgmAudio) return;
  if (!bgmStarted) {{ bgmAudio.currentTime = 0; bgmStarted = true; }}
  bgmAudio.play().catch(function(){{}});
}}
function bgmStop() {{ if (bgmAudio) {{ bgmAudio.pause(); }} bgmStarted = false; }}
function bgmGameOver() {{
  bgmStop();
  if (bgmMuted || !bgmGameover) return;
  bgmGameover.currentTime = 0;
  bgmGameover.play().catch(function(){{}});
}}
function bgmToggle() {{
  bgmMuted = !bgmMuted;
  if (bgmMuted) {{ if (bgmAudio) bgmAudio.pause(); }}
  else bgmPlay();
}}
'''

def inject_bgm(game_name, config):
    filepath = os.path.join(GAMES_DIR, f"{game_name}.html")
    if not os.path.exists(filepath):
        print(f"SKIP {game_name}: file not found")
        return False
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    if 'bgmInit' in content:
        print(f"SKIP {game_name}: already has BGM")
        return False
    
    bgm_code = make_bgm_code(config['bgm'], config['gameover'])
    
    # Find insertion point - after initAudio function
    init_match = re.search(r'function initAudio\(\)\s*\{[^}]+\}', content)
    if init_match:
        pos = init_match.end()
    else:
        # After first <script> tag
        script_match = re.search(r'<script[^>]*>', content)
        if script_match:
            pos = script_match.end()
        else:
            print(f"SKIP {game_name}: no injection point")
            return False
    
    content = content[:pos] + bgm_code + content[pos:]
    
    # Hook bgmInit into initAudio calls
    if 'initAudio();' in content:
        content = content.replace('initAudio();', 'initAudio(); if(!bgmAudio) bgmInit();', 1)
    
    # Hook bgmPlay into first play state transition
    for ps in config.get('play_states', []):
        pattern = f'state = {ps};'
        if pattern in content:
            content = content.replace(pattern, f'state = {ps}; bgmPlay();', 1)
            break
    
    # Hook bgmGameOver into first dead state
    for ds in config.get('dead_states', []):
        pattern = f'state = {ds};'
        if pattern in content:
            content = content.replace(pattern, f'state = {ds}; bgmGameOver();', 1)
            break
    
    # Add M key toggle
    key_patterns = ["var k = e.key", "var k=e.key", "if (k === 'ArrowUp'", "if (k === 'w'"]
    for kp in key_patterns:
        if kp in content:
            content = content.replace(kp, f"if (k === 'm' || k === 'M') {{ bgmToggle(); return; }}\n  {kp}", 1)
            break
    
    with open(filepath, 'w') as f:
        f.write(content)
    
    print(f"OK {game_name}: BGM injected")
    return True

count = 0
for name, cfg in GAME_CONFIG.items():
    if inject_bgm(name, cfg):
        count += 1
print(f"\nDone: {count}/{len(GAME_CONFIG)} games updated")

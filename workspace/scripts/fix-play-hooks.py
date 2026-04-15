#!/usr/bin/env python3
"""Add bgmPlay hooks to games that don't have explicit play state hooks."""
import os
import re

GAMES_DIR = "/home/hatch/workspace/liveinthefuture/games"

# Games that need hooks and their state patterns
NEEDS_HOOKS = {
    "audio-memory": {"play": "STATE_PLAY", "dead": "STATE_DONE"},
    "beacon": {"play": "STATE_PLAY", "dead": "STATE_DEAD"},
    "buffalo-gold": {"play": "STATE_PLAY", "dead": "STATE_DEAD"},
    "buffalo": {"play": "STATE_PLAY", "dead": "STATE_DEAD"},
    "duel": {"play": "STATE_PLAY", "dead": "STATE_DEAD"},
    "hex-collapse": {"play": "STATE_PLAY", "dead": "STATE_OVER"},
    "mine": {"play": "STATE_PLAY", "dead": "STATE_DEAD"},
    "photon-dodge": {"play": "STATE_PLAY", "dead": "STATE_DEAD"},
    "pulse": {"play": "STATE_PLAY", "dead": "STATE_DEAD"},
    "rhythm-pulse": {"play": "STATE_PLAY", "dead": "STATE_DEAD"},
    "signal": {"play": "STATE_PLAY", "dead": "STATE_DEAD"},
    "tower-defense": {"play": "STATE_PLAY", "dead": "STATE_DEAD"},
}

for game_name, states in NEEDS_HOOKS.items():
    filepath = os.path.join(GAMES_DIR, f"{game_name}.html")
    if not os.path.exists(filepath):
        print(f"SKIP {game_name}: not found")
        continue
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    modified = False
    
    # Find actual state constant names
    # Look for state variable patterns like: STATE_PLAY = 1, or ST_PLAY
    state_patterns = re.findall(r'(STATE?_\w+)\s*=\s*\d+', content)
    
    play_candidates = [s for s in state_patterns if 'PLAY' in s or 'GAME' in s or 'RUN' in s]
    dead_candidates = [s for s in state_patterns if 'DEAD' in s or 'OVER' in s or 'DONE' in s or 'FAIL' in s or 'LOSE' in s or 'END' in s or 'RESULT' in s]
    
    # Try to find string state too
    str_states = re.findall(r'state\s*=\s*["\'](\w+)["\']', content)
    play_str = [s for s in str_states if s in ('playing', 'play', 'game', 'running')]
    dead_str = [s for s in str_states if s in ('dead', 'over', 'done', 'fail', 'lost', 'ended')]
    
    # Hook bgmPlay
    hooked_play = False
    for ps in play_candidates:
        pattern = f'state = {ps};'
        if pattern in content and 'bgmPlay()' not in content.split(pattern)[0].split('\n')[-1]:
            content = content.replace(pattern, f'state = {ps}; bgmPlay();', 1)
            hooked_play = True
            break
    
    if not hooked_play:
        for ps in play_str:
            pattern = f'state = "{ps}";'
            if pattern in content:
                content = content.replace(pattern, f'state = "{ps}"; bgmPlay();', 1)
                hooked_play = True
                break
    
    if not hooked_play:
        # Last resort: hook into first initAudio call (game starts on first input)
        if 'initAudio(); if(!bgmAudio) bgmInit();' in content:
            content = content.replace(
                'initAudio(); if(!bgmAudio) bgmInit();',
                'initAudio(); if(!bgmAudio) bgmInit(); bgmPlay();',
                1
            )
            hooked_play = True
    
    # Hook bgmGameOver
    hooked_dead = False
    for ds in dead_candidates:
        pattern = f'state = {ds};'
        if pattern in content and 'bgmGameOver()' not in content.split(pattern)[0].split('\n')[-1]:
            content = content.replace(pattern, f'state = {ds}; bgmGameOver();', 1)
            hooked_dead = True
            break
    
    if not hooked_dead:
        for ds in dead_str:
            pattern = f'state = "{ds}";'
            if pattern in content:
                content = content.replace(pattern, f'state = "{ds}"; bgmGameOver();', 1)
                hooked_dead = True
                break
    
    if hooked_play or hooked_dead:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"OK {game_name}: play={hooked_play}, dead={hooked_dead}")
    else:
        print(f"WARN {game_name}: no state patterns found, using initAudio fallback")
        # Fallback: play on first audio init
        if 'bgmPlay()' not in content and 'initAudio(); if(!bgmAudio) bgmInit();' in content:
            content = content.replace(
                'initAudio(); if(!bgmAudio) bgmInit();',
                'initAudio(); if(!bgmAudio) { bgmInit(); bgmPlay(); }',
                1
            )
            with open(filepath, 'w') as f:
                f.write(content)
            print(f"  -> FIXED with initAudio fallback")

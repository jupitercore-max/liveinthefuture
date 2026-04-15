#!/usr/bin/env python3
"""Add M key mute toggle to all games with BGM."""
import os
import re

GAMES_DIR = "/home/hatch/workspace/liveinthefuture/games"

for fname in os.listdir(GAMES_DIR):
    if not fname.endswith('.html') or fname == 'index.html':
        continue
    
    filepath = os.path.join(GAMES_DIR, fname)
    with open(filepath, 'r') as f:
        content = f.read()
    
    if 'bgmToggle' not in content:
        continue
    
    # Already has the M key hook
    if "'m'" in content and 'bgmToggle' in content.split("'m'")[0]:
        continue
    if "'M'" in content and 'bgmToggle' in content.split("'M'")[0]:
        continue
    
    # Find the keydown listener and add M key check at the start of handler
    # Pattern: addEventListener('keydown', function(e) {
    match = re.search(r"addEventListener\(['\"]keydown['\"],\s*function\s*\(\s*(\w+)\s*\)\s*\{", content)
    if match:
        event_var = match.group(1)
        insert_after = match.end()
        mute_code = f"\n  if ({event_var}.key === 'm' || {event_var}.key === 'M') {{ bgmToggle(); return; }}"
        content = content[:insert_after] + mute_code + content[insert_after:]
        
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"OK {fname}: M key toggle added")
    else:
        print(f"SKIP {fname}: no keydown listener found")

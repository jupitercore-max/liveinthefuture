#!/bin/bash
# Restore browser profile symlink on container restart
# ~/.cache/browser gets wiped, but workspace/.browser-profile persists
if [ -d "/home/hatch/workspace/.browser-profile" ] && [ ! -L "/home/hatch/.cache/browser" ]; then
    mkdir -p /home/hatch/.cache
    rm -rf /home/hatch/.cache/browser 2>/dev/null
    ln -s /home/hatch/workspace/.browser-profile /home/hatch/.cache/browser
    echo "Browser profile symlink restored"
fi

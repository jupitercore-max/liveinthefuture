#!/bin/bash
# Watch Group Monitor - Full Run
# Searches 3 groups for target keywords, then scrolls feeds

set -euo pipefail
OUTDIR="/tmp/watch-monitor-$(date +%s)"
mkdir -p "$OUTDIR"

GROUPS=(
  "558871041349029|Moda Watch Club"
  "150223938977815|Moda Watch Club - 10k & Under"
  "607987992210015|Moda Watch Club - Backup"
)

KEYWORDS=("Milgauss" "Yacht-Master" "Square Bang" "Magic Gold" "Spirit Big Bang" "Patek titanium" "Hublot" "Spirit of Big Bang")

echo "=== WATCH MONITOR RUN $(date -u) ==="

# PHASE 1: Keyword searches
for group_entry in "${GROUPS[@]}"; do
  IFS='|' read -r gid gname <<< "$group_entry"
  echo ""
  echo ">>> GROUP: $gname ($gid)"
  
  for kw in "${KEYWORDS[@]}"; do
    encoded_kw=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$kw'))")
    url="https://www.facebook.com/groups/${gid}/search/?q=${encoded_kw}"
    echo "  Searching: $kw"
    
    browser navigate --url "$url" 2>/dev/null
    sleep 4
    
    result=$(browser get-text 2>/dev/null)
    outfile=$(echo "$result" | python3 -c "import sys,json; print(json.load(sys.stdin)['output_path'])" 2>/dev/null || echo "")
    
    if [ -n "$outfile" ] && [ -f "$outfile" ]; then
      # Check for auth failure
      title=$(echo "$result" | python3 -c "import sys,json; print(json.load(sys.stdin).get('title',''))" 2>/dev/null || echo "")
      if echo "$title" | grep -qi "log in\|error"; then
        echo "AUTH_FAILURE" > "$OUTDIR/auth_failure"
        echo "!!! AUTH FAILURE on $gname - $title"
        break 2
      fi
      
      parsed=$(cat "$outfile" | python3 ~/workspace/scripts/fb-text-parser.py 2>/dev/null || echo "[]")
      count=$(echo "$parsed" | python3 -c "import sys,json; print(len(json.load(sys.stdin)))" 2>/dev/null || echo "0")
      echo "    -> $count posts parsed"
      
      # Save search results
      safekw=$(echo "$kw" | tr ' ' '_' | tr -d "'\"")
      echo "$parsed" > "$OUTDIR/search_${gid}_${safekw}.json"
    fi
  done
done

# PHASE 2: Feed scrolling
for group_entry in "${GROUPS[@]}"; do
  IFS='|' read -r gid gname <<< "$group_entry"
  
  # Check if auth failed
  [ -f "$OUTDIR/auth_failure" ] && break
  
  echo ""
  echo ">>> FEED SCROLL: $gname"
  
  browser navigate --url "https://www.facebook.com/groups/${gid}" 2>/dev/null
  sleep 5
  
  # Deep scroll
  for scroll_pos in 3000 6000 9000 12000 15000; do
    browser evaluate --expression "window.scrollTo(0, $scroll_pos)" 2>/dev/null
    sleep 2
  done
  
  result=$(browser get-text 2>/dev/null)
  outfile=$(echo "$result" | python3 -c "import sys,json; print(json.load(sys.stdin)['output_path'])" 2>/dev/null || echo "")
  
  if [ -n "$outfile" ] && [ -f "$outfile" ]; then
    parsed=$(cat "$outfile" | python3 ~/workspace/scripts/fb-text-parser.py 2>/dev/null || echo "[]")
    count=$(echo "$parsed" | python3 -c "import sys,json; print(len(json.load(sys.stdin)))" 2>/dev/null || echo "0")
    echo "  -> Feed: $count posts parsed"
    echo "$parsed" > "$OUTDIR/feed_${gid}.json"
  fi
done

echo ""
echo "=== OUTPUT DIR: $OUTDIR ==="
echo "=== AUTH_FAILURE: $([ -f "$OUTDIR/auth_failure" ] && echo YES || echo NO) ==="
ls -la "$OUTDIR/"

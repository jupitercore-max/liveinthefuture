#!/usr/bin/env python3
"""Orchestrate watch group monitoring via browser CLI."""
import subprocess, json, os, sys, time, re, urllib.parse

GROUPS = [
    ("558871041349029", "Moda Watch Club"),
    ("150223938977815", "Moda Watch Club - 10k & Under"),
    ("607987992210015", "Moda Watch Club - Backup"),
]

KEYWORDS = ["Milgauss", "Yacht-Master", "Square Bang", "Magic Gold", "Spirit Big Bang", "Hublot", "Patek titanium", "Spirit of Big Bang"]

OUTDIR = f"/tmp/watch-monitor-{int(time.time())}"
os.makedirs(OUTDIR, exist_ok=True)

PARSER = os.path.expanduser("~/workspace/scripts/fb-text-parser.py")

def run_browser(args):
    """Run browser CLI command, return parsed JSON."""
    cmd = ["browser"] + args
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
    try:
        return json.loads(result.stdout.strip())
    except:
        return {"ok": False, "error": result.stdout + result.stderr}

def get_text_and_parse():
    """Get page text and parse through fb-text-parser."""
    result = run_browser(["get-text"])
    if not result.get("ok"):
        return [], result
    
    outfile = result.get("output_path", "")
    title = result.get("title", "")
    
    # Auth check
    if "log in" in title.lower() or title == "Error":
        return None, result  # None = auth failure
    
    if not outfile or not os.path.exists(outfile):
        return [], result
    
    # Parse
    try:
        proc = subprocess.run(
            ["python3", PARSER],
            stdin=open(outfile, 'r'),
            capture_output=True, text=True, timeout=30
        )
        posts = json.loads(proc.stdout)
        return posts, result
    except:
        return [], result

all_posts = {}  # group_id -> list of posts (deduped by seller+body snippet)
auth_failed = False

print(f"=== WATCH MONITOR RUN {time.strftime('%Y-%m-%d %H:%M:%S UTC', time.gmtime())} ===")

# PHASE 1: Keyword searches
for gid, gname in GROUPS:
    print(f"\n>>> GROUP: {gname} ({gid})")
    group_posts = []
    seen_keys = set()
    
    for kw in KEYWORDS:
        encoded = urllib.parse.quote(kw)
        url = f"https://www.facebook.com/groups/{gid}/search/?q={encoded}"
        print(f"  Searching: {kw}", end="", flush=True)
        
        run_browser(["navigate", "--url", url])
        time.sleep(4)
        
        posts, meta = get_text_and_parse()
        
        if posts is None:
            print(f" -> AUTH FAILURE!")
            auth_failed = True
            break
        
        # Dedup
        new_count = 0
        for p in posts:
            key = f"{p['seller']}|{p['body'][:80]}"
            if key not in seen_keys:
                seen_keys.add(key)
                group_posts.append(p)
                new_count += 1
        
        print(f" -> {len(posts)} posts ({new_count} new)")
    
    if auth_failed:
        break
    
    all_posts[gid] = group_posts
    
    # Save search results
    with open(f"{OUTDIR}/search_{gid}.json", 'w') as f:
        json.dump(group_posts, f, indent=2)

# PHASE 2: Feed scrolling (unless auth failed)
if not auth_failed:
    for gid, gname in GROUPS:
        print(f"\n>>> FEED SCROLL: {gname}")
        
        run_browser(["navigate", "--url", f"https://www.facebook.com/groups/{gid}"])
        time.sleep(5)
        
        for pos in [3000, 6000, 9000, 12000, 15000]:
            run_browser(["evaluate", "--expression", f"window.scrollTo(0, {pos})"])
            time.sleep(2)
        
        posts, meta = get_text_and_parse()
        
        if posts is None:
            print("  -> AUTH FAILURE!")
            auth_failed = True
            break
        
        # Merge with search results
        existing = all_posts.get(gid, [])
        existing_keys = {f"{p['seller']}|{p['body'][:80]}" for p in existing}
        new_count = 0
        for p in posts:
            key = f"{p['seller']}|{p['body'][:80]}"
            if key not in existing_keys:
                existing.append(p)
                existing_keys.add(key)
                new_count += 1
        
        all_posts[gid] = existing
        print(f"  -> {len(posts)} feed posts ({new_count} new, {len(existing)} total)")
        
        with open(f"{OUTDIR}/feed_{gid}.json", 'w') as f:
            json.dump(existing, f, indent=2)

# Save summary
summary = {
    "auth_failed": auth_failed,
    "outdir": OUTDIR,
    "groups": {gid: len(posts) for gid, posts in all_posts.items()},
    "total_posts": sum(len(p) for p in all_posts.values()),
}

# Save all posts combined
with open(f"{OUTDIR}/all_posts.json", 'w') as f:
    combined = []
    for gid, posts in all_posts.items():
        gname = next(g[1] for g in GROUPS if g[0] == gid)
        for p in posts:
            p["group_id"] = gid
            p["group_name"] = gname
            combined.append(p)
    json.dump(combined, f, indent=2)

print(f"\n=== SUMMARY ===")
print(json.dumps(summary, indent=2))
print(f"All posts saved to: {OUTDIR}/all_posts.json")

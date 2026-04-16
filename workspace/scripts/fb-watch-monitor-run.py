#!/usr/bin/env python3
"""Facebook Watch Group Monitor - Full run script.
Searches 3 groups for target watches, scrolls feeds, parses listings, alerts on matches."""

import subprocess, json, re, time, os, sys
from datetime import datetime, timezone

# Config
GROUPS = [
    {"name": "Moda Watch Club", "id": "558871041349029"},
    {"name": "Moda Watch Club - 10k & Under", "id": "150223938977815"},
    {"name": "Moda Watch Club - Backup", "id": "607987992210015"},
]
SEARCH_KEYWORDS = ["Milgauss", "Yacht-Master II", "Square Bang", "Magic Gold", "Spirit Big Bang", "Patek titanium", "Spirit of Big Bang", "Hublot Spirit"]
PARSER_SCRIPT = os.path.expanduser("~/workspace/scripts/fb-text-parser.py")
STATE_FILE = os.path.expanduser("~/workspace/research/watch-monitor-state.json")
PRICE_DB_FILE = os.path.expanduser("~/workspace/research/watch-price-db.json")

NOW = datetime.now(timezone.utc).isoformat()
TODAY = datetime.now(timezone.utc).strftime("%Y-%m-%d")

# Load state
def load_state():
    try:
        with open(STATE_FILE) as f:
            return json.load(f)
    except:
        return {"last_run": None, "seen_post_ids": [], "alerted_ids": []}

def save_state(state):
    state["last_run"] = NOW
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=2)

def load_price_db():
    try:
        with open(PRICE_DB_FILE) as f:
            data = json.load(f)
            if isinstance(data, list):
                return data
            return []
    except:
        return []

def save_price_db(db):
    with open(PRICE_DB_FILE, "w") as f:
        json.dump(db, f, indent=2)

def browser_cmd(args):
    """Run a browser CLI command and return stdout."""
    cmd = ["browser"] + args
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
    return result.stdout.strip()

def browser_navigate(url):
    result = browser_cmd(["navigate", "--url", url])
    time.sleep(5)
    return result

def browser_get_text():
    result = browser_cmd(["get-text"])
    # Find the output file
    import glob
    files = sorted(glob.glob("/tmp/browser-get-text-*.txt"), key=os.path.getmtime, reverse=True)
    if files:
        with open(files[0]) as f:
            return f.read()
    return result

def parse_posts(raw_text):
    """Run the FB text parser on raw text."""
    proc = subprocess.run(
        ["python3", PARSER_SCRIPT],
        input=raw_text, capture_output=True, text=True, timeout=10
    )
    try:
        return json.loads(proc.stdout)
    except:
        return []

def check_auth_failure(raw_text, page_title=""):
    """Check if Facebook session has expired."""
    if not raw_text or len(raw_text) < 100:
        return True
    lower = raw_text.lower()
    if "log in" in page_title.lower() or "error" in page_title.lower():
        return True
    # Check for login page indicators
    if "log into facebook" in lower or "create new account" in lower:
        return True
    return False

def extract_price(text):
    """Extract price from listing text."""
    patterns = [
        r'\$\s*([\d,]+(?:\.\d{2})?)',
        r'asking\s*\$?\s*([\d,]+)',
        r'price[:\s]*\$?\s*([\d,]+)',
    ]
    for p in patterns:
        m = re.search(p, text, re.IGNORECASE)
        if m:
            price_str = m.group(1).replace(",", "")
            try:
                return int(float(price_str))
            except:
                pass
    return None

def extract_condition(text):
    lower = text.lower()
    for cond in ["mint", "excellent", "very good", "good", "worn", "fair"]:
        if cond in lower:
            return cond.title()
    return "Unknown"

def extract_contents(text):
    lower = text.lower()
    if "full set" in lower or "box and papers" in lower or "b&p" in lower or "complete set" in lower:
        return "Full Set (Box & Papers)"
    if "box only" in lower or "no papers" in lower:
        return "Box Only"
    if "watch only" in lower or "no box" in lower:
        return "Watch Only"
    if "papers" in lower:
        return "Papers"
    return "Unknown"

def extract_sold_status(text):
    lower = text.lower()
    if "ohpf" in lower or "on hold" in lower:
        return "OHPF"
    if "$old" in lower or "sold" in lower:
        return "SOLD"
    return "Available"

def extract_brand_model(text):
    """Try to extract brand and model from text."""
    lower = text.lower()
    brand = "Unknown"
    model = "Unknown"
    ref = ""
    
    brands = {
        "rolex": "Rolex", "omega": "Omega", "patek": "Patek Philippe",
        "hublot": "Hublot", "audemars": "Audemars Piguet", "ap ": "Audemars Piguet",
        "cartier": "Cartier", "iwc": "IWC", "tudor": "Tudor", "breitling": "Breitling",
        "panerai": "Panerai", "grand seiko": "Grand Seiko", "seiko": "Seiko",
        "jaeger": "Jaeger-LeCoultre", "vacheron": "Vacheron Constantin",
        "richard mille": "Richard Mille", "blancpain": "Blancpain",
        "bulgari": "Bulgari", "bvlgari": "Bulgari", "zenith": "Zenith",
        "tag heuer": "TAG Heuer", "longines": "Longines"
    }
    for key, val in brands.items():
        if key in lower:
            brand = val
            break
    
    # Extract ref number
    ref_match = re.search(r'(?:ref\.?\s*#?\s*)?(\d{3,6}(?:[A-Z]{0,4})?(?:\.\d+)?(?:[A-Z]{0,4})?)', text)
    if ref_match:
        ref = ref_match.group(1)
    
    return brand, model, ref

def match_target(post_body):
    """Check if post matches any target watch. Returns (match_type, watch_name) or None."""
    lower = post_body.lower()
    
    # Milgauss 116400GV - MUST be blue dial
    if "116400gv" in lower or ("milgauss" in lower and any(w in lower for w in ["blue", "z-blue", "bluez", "z blue"])):
        return ("EXACT", "Rolex Milgauss 116400GV (Blue Dial)")
    
    # Milgauss black dial - log only, no alert
    if "milgauss" in lower or "116400" in lower:
        if "black" in lower:
            return ("LOG_ONLY", "Rolex Milgauss (Black Dial - not target)")
        # If dial color not specified but has 116400GV, could be blue
        if "116400gv" in lower:
            return ("EXACT", "Rolex Milgauss 116400GV")
    
    # Yacht-Master II
    if "116689" in lower or "yacht-master ii" in lower or "yacht master ii" in lower or "ym2" in lower or "ymii" in lower:
        return ("EXACT", "Rolex Yacht-Master II 116689")
    
    # Square Bang Magic Gold
    if "821.mx.0130" in lower or ("square bang" in lower and "magic gold" in lower):
        return ("EXACT", "Hublot Square Bang Unico Magic Gold 821.MX.0130.RX")
    
    # Square Bang Rainbow
    if "821.nx.0117" in lower or ("square bang" in lower and "rainbow" in lower):
        return ("EXACT", "Hublot Square Bang Unico Titanium Rainbow 821.NX.0117.LR.0999")
    
    # Spirit Big Bang (near-match)
    if "spirit big bang" in lower or "spirit of big bang" in lower:
        return ("NEAR-MATCH", "Hublot Spirit Big Bang")
    
    # Any Hublot Magic Gold (near-match)
    if "hublot" in lower and "magic gold" in lower:
        return ("NEAR-MATCH", "Hublot Magic Gold")
    
    # Patek titanium
    if "patek" in lower and "titanium" in lower:
        return ("EXACT", "Patek Philippe Titanium")
    
    return None

def generate_post_id(group_id, seller, body):
    """Generate a dedup ID for a post."""
    seller_slug = re.sub(r'[^a-z]', '', seller.lower())[:20]
    # Use first 50 chars of body as fingerprint
    body_hash = abs(hash(body[:100])) % 100000
    return f"fb_{group_id}_{seller_slug}_{body_hash}_{TODAY.replace('-','')}"

def main():
    state = load_state()
    price_db = load_price_db()
    seen_ids = set(state.get("seen_post_ids", []))
    alerted_ids = set(state.get("alerted_ids", []))
    
    all_matches = []  # (match_type, watch_name, seller, price, condition, contents, group_name, group_id, post_body)
    all_listings = []  # All parsed listings for price DB
    new_post_ids = []
    auth_failed = False
    
    for group in GROUPS:
        gname = group["name"]
        gid = group["id"]
        print(f"\n{'='*60}")
        print(f"PROCESSING: {gname} ({gid})")
        print(f"{'='*60}")
        
        group_posts = []
        
        # STEP 1: Search for target keywords
        for keyword in SEARCH_KEYWORDS:
            search_url = f"https://www.facebook.com/groups/{gid}/search/?q={keyword.replace(' ', '%20')}"
            print(f"\n  Searching: {keyword}")
            browser_navigate(search_url)
            
            # Check page title
            info = browser_cmd(["info"])
            try:
                info_data = json.loads(info)
                title = info_data.get("title", "")
            except:
                title = ""
            
            raw = browser_get_text()
            
            if check_auth_failure(raw, title):
                print(f"  ⚠️ AUTH FAILURE detected on {gname}")
                auth_failed = True
                break
            
            posts = parse_posts(raw)
            print(f"  Found {len(posts)} posts for '{keyword}'")
            
            for p in posts:
                # Dedup within this run
                pid = generate_post_id(gid, p["seller"], p["body"])
                if pid not in seen_ids:
                    group_posts.append(p)
                    seen_ids.add(pid)
                    new_post_ids.append(pid)
        
        if auth_failed:
            break
        
        # STEP 2: Scroll main feed
        print(f"\n  Scrolling main feed...")
        browser_navigate(f"https://www.facebook.com/groups/{gid}")
        
        for scroll_y in [3000, 6000, 9000, 12000, 15000]:
            browser_cmd(["evaluate", "--expression", f"window.scrollTo(0, {scroll_y})"])
            time.sleep(2)
        
        raw = browser_get_text()
        feed_posts = parse_posts(raw)
        print(f"  Feed scroll: {len(feed_posts)} posts")
        
        for p in feed_posts:
            pid = generate_post_id(gid, p["seller"], p["body"])
            if pid not in seen_ids:
                group_posts.append(p)
                seen_ids.add(pid)
                new_post_ids.append(pid)
        
        # STEP 3: Process all posts from this group
        print(f"\n  Total new posts from {gname}: {len(group_posts)}")
        
        for p in group_posts:
            seller = p["seller"]
            body = p["body"]
            
            # Check for target match
            match = match_target(body)
            if match and match[0] != "LOG_ONLY":
                match_type, watch_name = match
                price = extract_price(body)
                condition = extract_condition(body)
                contents = extract_contents(body)
                pid = generate_post_id(gid, seller, body)
                
                if pid not in alerted_ids:
                    all_matches.append({
                        "match_type": match_type,
                        "watch_name": watch_name,
                        "seller": seller,
                        "price": price,
                        "condition": condition,
                        "contents": contents,
                        "group_name": gname,
                        "group_id": gid,
                        "body": body[:300],
                        "post_id": pid
                    })
                    alerted_ids.add(pid)
            
            # Extract listing for price DB
            brand, model, ref = extract_brand_model(body)
            price = extract_price(body)
            if brand != "Unknown" or price:
                listing = {
                    "brand": brand,
                    "model": model,
                    "ref": ref,
                    "askingPrice": price,
                    "condition": extract_condition(body),
                    "contents": extract_contents(body),
                    "seller": seller,
                    "group": gname,
                    "date": TODAY,
                    "soldStatus": extract_sold_status(body),
                    "postSnippet": body[:200],
                    "firstSeenDate": TODAY,
                    "lastSeenDate": TODAY
                }
                all_listings.append(listing)
    
    # Handle auth failure
    if auth_failed:
        print("\n🚨 AUTH FAILURE — session expired!")
        result = {
            "status": "AUTH_FAILURE",
            "matches": [],
            "listings_count": 0,
            "new_posts": 0
        }
        with open("/tmp/fb-monitor-result.json", "w") as f:
            json.dump(result, f, indent=2)
        sys.exit(1)
    
    # Update price DB (append, dedup by seller+ref+price)
    existing_keys = set()
    for entry in price_db:
        key = f"{entry.get('seller','')}_{entry.get('ref','')}_{entry.get('askingPrice','')}"
        existing_keys.add(key)
    
    new_db_entries = 0
    for listing in all_listings:
        key = f"{listing['seller']}_{listing['ref']}_{listing['askingPrice']}"
        if key not in existing_keys:
            price_db.append(listing)
            existing_keys.add(key)
            new_db_entries += 1
        else:
            # Update lastSeenDate and soldStatus on existing entries
            for entry in price_db:
                ekey = f"{entry.get('seller','')}_{entry.get('ref','')}_{entry.get('askingPrice','')}"
                if ekey == key:
                    entry["lastSeenDate"] = TODAY
                    if listing["soldStatus"] in ["SOLD", "OHPF"]:
                        entry["soldStatus"] = listing["soldStatus"]
                        entry["soldDate"] = TODAY
                    break
    
    save_price_db(price_db)
    
    # Update state
    state["seen_post_ids"] = list(seen_ids)[-500:]  # Keep last 500
    state["alerted_ids"] = list(alerted_ids)[-200:]
    save_state(state)
    
    # Output results
    result = {
        "status": "OK",
        "matches": all_matches,
        "listings_count": len(all_listings),
        "new_db_entries": new_db_entries,
        "new_posts": len(new_post_ids),
        "total_db_size": len(price_db)
    }
    
    with open("/tmp/fb-monitor-result.json", "w") as f:
        json.dump(result, f, indent=2)
    
    print(f"\n{'='*60}")
    print(f"SUMMARY")
    print(f"{'='*60}")
    print(f"New posts found: {len(new_post_ids)}")
    print(f"New DB entries: {new_db_entries}")
    print(f"Total DB size: {len(price_db)}")
    print(f"Target matches: {len(all_matches)}")
    
    if all_matches:
        print(f"\n🚨 MATCHES FOUND:")
        for m in all_matches:
            print(f"  [{m['match_type']}] {m['watch_name']}")
            print(f"    Seller: {m['seller']} | Price: ${m['price'] or '?'}")
            print(f"    Group: {m['group_name']}")
            print(f"    Snippet: {m['body'][:150]}")
    else:
        print("\nNo target watch matches found this run.")

if __name__ == "__main__":
    main()

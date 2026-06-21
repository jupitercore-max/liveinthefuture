#!/usr/bin/env python3
"""Facebook Watch Group Monitor - Orchestrator v2
Searches 3 Moda Watch Club groups for target watches, parses listings,
alerts on matches, and updates the price database.

browser get-text returns JSON with output_path — we must read the file.
"""
import subprocess, json, re, sys, os, time, hashlib, glob
from datetime import datetime, timezone

PARSER = os.path.expanduser("~/workspace/scripts/fb-text-parser.py")
STATE_FILE = os.path.expanduser("~/workspace/research/watch-monitor-state.json")
DB_FILE = os.path.expanduser("~/workspace/research/watch-price-db.json")

GROUPS = [
    {"name": "Moda Watch Club", "id": "558871041349029"},
    {"name": "Moda Watch Club - 10k & Under", "id": "150223938977815"},
    {"name": "Moda Watch Club - Backup", "id": "607987992210015"},
]

SEARCH_KEYWORDS = ["Milgauss", "Yacht-Master II", "Square Bang", "Magic Gold", "Spirit Big Bang", "Hublot", "Patek titanium"]

NOW = datetime.now(timezone.utc).isoformat()

def run_browser(args):
    """Run browser CLI command and return stdout."""
    cmd = ["browser"] + args
    try:
        r = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
        return r.stdout.strip()
    except Exception as e:
        print(f"[ERROR] browser cmd failed: {' '.join(args)} => {e}", file=sys.stderr)
        return ""

def browser_get_text():
    """Call browser get-text, parse JSON response, read the output file."""
    raw = run_browser(["get-text"])
    if not raw:
        return ""
    try:
        meta = json.loads(raw)
        path = meta.get("output_path", "")
        if path and os.path.exists(path):
            with open(path) as f:
                return f.read()
    except json.JSONDecodeError:
        # Maybe it returned raw text
        return raw
    return ""

def browser_navigate(url):
    """Navigate and return parsed JSON response."""
    raw = run_browser(["navigate", "--url", url])
    try:
        return json.loads(raw)
    except:
        return {"ok": False, "raw": raw}

def parse_posts(raw_text):
    """Pipe text through fb-text-parser.py."""
    if not raw_text or len(raw_text) < 20:
        return []
    try:
        r = subprocess.run(["python3", PARSER], input=raw_text, capture_output=True, text=True, timeout=10)
        return json.loads(r.stdout) if r.stdout.strip() else []
    except Exception as e:
        print(f"[ERROR] parser failed: {e}", file=sys.stderr)
        return []

def check_auth_failure(raw_text, page_meta=None):
    """Check if Facebook session expired."""
    if page_meta:
        title = page_meta.get("title", "").lower()
        if "log in" in title or "error" in title:
            return True
    if raw_text:
        lower = raw_text[:500].lower()
        if "log in" in lower and "facebook" in lower and "search results" not in lower:
            return True
    return False

def post_id(group_name, seller, body_snippet):
    key = f"{group_name}_{seller}_{body_snippet[:80]}"
    return hashlib.md5(key.encode()).hexdigest()

def extract_price(text):
    m = re.search(r'\$\s*[\d,]+(?:\.\d{2})?', text)
    if m:
        price_str = m.group().replace(',', '').replace('$', '').strip()
        try:
            return float(price_str)
        except:
            pass
    m = re.search(r'asking\s*\$?([\d,]+)', text, re.I)
    if m:
        try:
            return float(m.group(1).replace(',', ''))
        except:
            pass
    return None

def extract_brand_model(text):
    lower = text.lower()
    brand = "Unknown"
    model = "Unknown"
    ref = None

    brands_map = {
        'rolex': 'Rolex', 'rlx': 'Rolex', 'r l x': 'Rolex',
        'omega': 'Omega', 'patek': 'Patek Philippe',
        'audemars': 'Audemars Piguet', 'ap ': 'Audemars Piguet',
        'hublot': 'Hublot', 'cartier': 'Cartier', 'tudor': 'Tudor',
        'breitling': 'Breitling', 'iwc': 'IWC', 'panerai': 'Panerai',
        'tag heuer': 'TAG Heuer', 'jaeger': 'Jaeger-LeCoultre',
        'vacheron': 'Vacheron Constantin', 'richard mille': 'Richard Mille',
        'grand seiko': 'Grand Seiko', 'seiko': 'Seiko', 'zenith': 'Zenith',
        'blancpain': 'Blancpain', 'bulgari': 'Bulgari', 'bvlgari': 'Bulgari',
        'girard': 'Girard-Perregaux', 'chopard': 'Chopard',
    }
    for key, val in brands_map.items():
        if key in lower:
            brand = val
            break

    ref_m = re.search(r'\b(\d{3,7}[A-Za-z]*(?:[./]\d+[A-Za-z]*)*)\b', text)
    if ref_m:
        ref = ref_m.group(1)

    model_patterns = [
        (r'submariner|sub\b', 'Submariner'), (r'daytona', 'Daytona'),
        (r'gmt.?master', 'GMT-Master'), (r'datejust|dj\b', 'Datejust'),
        (r'day.?date|dd\b', 'Day-Date'), (r'yacht.?master', 'Yacht-Master'),
        (r'milgauss', 'Milgauss'), (r'explorer', 'Explorer'),
        (r'sky.?dweller', 'Sky-Dweller'), (r'sea.?dweller', 'Sea-Dweller'),
        (r'speedmaster', 'Speedmaster'), (r'seamaster', 'Seamaster'),
        (r'aqua\s*terra', 'Aqua Terra'), (r'nautilus', 'Nautilus'),
        (r'royal\s*oak', 'Royal Oak'), (r'big\s*bang', 'Big Bang'),
        (r'square\s*bang', 'Square Bang'), (r'spirit.*big\s*bang', 'Spirit Big Bang'),
        (r'pelagos', 'Pelagos'), (r'black\s*bay', 'Black Bay'),
        (r'superocean', 'Superocean'), (r'navitimer', 'Navitimer'),
        (r'cellini', 'Cellini'), (r'calatrava', 'Calatrava'),
    ]
    for pat, name in model_patterns:
        if re.search(pat, lower):
            model = name
            break

    return brand, model, ref

def extract_condition(text):
    lower = text.lower()
    for cond in ['mint', 'excellent', 'very good', 'good', 'worn', 'fair']:
        if cond in lower:
            return cond.title()
    return None

def extract_contents(text):
    lower = text.lower()
    if 'full set' in lower or ('box' in lower and 'paper' in lower):
        return 'Full Set'
    if 'b&p' in lower or 'b+p' in lower:
        return 'Full Set'
    if 'watch only' in lower or 'no box' in lower:
        return 'Watch Only'
    if 'box' in lower:
        return 'Box'
    return None

def extract_sold_status(text):
    lower = text.lower()
    if 'ohpf' in lower or 'on hold' in lower:
        return 'OHPF'
    if '$old' in lower or 'sold' in lower:
        return 'SOLD'
    return None

def check_target_match(body):
    lower = body.lower()
    
    # Milgauss 116400GV - MUST be blue dial
    if '116400gv' in lower or 'milgauss' in lower:
        blue_indicators = ['blue', 'z-blue', 'bluez', 'z blue']
        is_blue = any(b in lower for b in blue_indicators)
        if is_blue:
            return ('EXACT', 'Rolex Milgauss 116400GV (Blue/Z-Blue Dial)')
        elif 'black' in lower:
            return None
        elif '116400gv' in lower:
            return ('POSSIBLE', 'Rolex Milgauss 116400GV (dial color unclear - verify)')
    
    # Yacht-Master II
    if '116689' in lower or 'yacht-master ii' in lower or 'yacht master ii' in lower or 'ym2' in lower or 'ymii' in lower:
        return ('EXACT', 'Rolex Yacht-Master II 116689')
    
    # Hublot Square Bang Magic Gold
    if '821.mx.0130' in lower:
        return ('EXACT', 'Hublot Square Bang Unico Magic Gold 821.MX.0130.RX')
    if 'square bang' in lower and 'magic gold' in lower:
        return ('EXACT', 'Hublot Square Bang Unico Magic Gold')
    
    # Hublot Square Bang Rainbow
    if '821.nx.0117' in lower:
        return ('EXACT', 'Hublot Square Bang Unico Titanium Rainbow 821.NX.0117.LR.0999')
    if 'square bang' in lower and 'rainbow' in lower:
        return ('EXACT', 'Hublot Square Bang Unico Titanium Rainbow')
    
    # Spirit Big Bang (near-match)
    if 'spirit' in lower and 'big bang' in lower:
        return ('NEAR-MATCH', 'Hublot Spirit Big Bang (near-match to Square Bang)')
    if 'spirit of big bang' in lower:
        return ('NEAR-MATCH', 'Hublot Spirit of Big Bang (near-match to Square Bang)')
    
    # Any Hublot Magic Gold (near-match)
    if 'hublot' in lower and 'magic gold' in lower:
        return ('NEAR-MATCH', 'Hublot Magic Gold (near-match)')
    
    # Patek Philippe titanium
    if 'patek' in lower and 'titanium' in lower:
        return ('EXACT', 'Patek Philippe Titanium')
    
    return None

def load_state():
    try:
        with open(STATE_FILE) as f:
            return json.load(f)
    except:
        return {"last_run": None, "seen_post_ids": [], "alerted_ids": []}

def save_state(state):
    state["last_run"] = NOW
    with open(STATE_FILE, 'w') as f:
        json.dump(state, f, indent=2)

def load_db():
    try:
        with open(DB_FILE) as f:
            data = json.load(f)
            return data if isinstance(data, list) else []
    except:
        return []

def save_db(db):
    with open(DB_FILE, 'w') as f:
        json.dump(db, f, indent=2)

def search_group(group, keyword):
    url = f"https://www.facebook.com/groups/{group['id']}/search/?q={keyword}"
    print(f"  Searching '{keyword}' in {group['name']}...", file=sys.stderr)
    meta = browser_navigate(url)
    time.sleep(5)
    
    raw = browser_get_text()
    if not raw or len(raw) < 50:
        print(f"  [WARN] Very little text returned for search '{keyword}' ({len(raw) if raw else 0} chars)", file=sys.stderr)
        return [], raw, meta
    
    posts = parse_posts(raw)
    print(f"  Found {len(posts)} posts for '{keyword}'", file=sys.stderr)
    return posts, raw, meta

def scroll_feed(group):
    url = f"https://www.facebook.com/groups/{group['id']}"
    print(f"  Scrolling feed of {group['name']}...", file=sys.stderr)
    meta = browser_navigate(url)
    time.sleep(5)
    
    for scroll_y in [3000, 6000, 9000, 12000, 15000]:
        run_browser(["evaluate", "--expression", f"window.scrollTo(0, {scroll_y})"])
        time.sleep(2)
    
    raw = browser_get_text()
    if not raw or len(raw) < 50:
        print(f"  [WARN] Very little text returned for feed scroll ({len(raw) if raw else 0} chars)", file=sys.stderr)
        return [], raw, meta
    
    posts = parse_posts(raw)
    print(f"  Found {len(posts)} posts in feed ({len(raw)} chars text)", file=sys.stderr)
    return posts, raw, meta

def main():
    state = load_state()
    db = load_db()
    seen_ids = set(state.get("seen_post_ids", []))
    alerted_ids = set(state.get("alerted_ids", []))
    
    all_matches = []
    all_listings = []
    auth_failed = False
    groups_processed = 0
    
    for group in GROUPS:
        print(f"\n{'='*60}", file=sys.stderr)
        print(f"Processing: {group['name']} ({group['id']})", file=sys.stderr)
        print(f"{'='*60}", file=sys.stderr)
        
        group_posts = {}
        
        # Step 1: Keyword searches
        for keyword in SEARCH_KEYWORDS:
            posts, raw, meta = search_group(group, keyword)
            
            if check_auth_failure(raw, meta):
                auth_failed = True
                print(f"  [AUTH FAIL] Session expired!", file=sys.stderr)
                break
            
            for p in posts:
                key = f"{p['seller']}_{p['body'][:60]}"
                if key not in group_posts:
                    group_posts[key] = p
        
        if auth_failed:
            break
        
        # Step 2: Scroll feed
        feed_posts, raw, meta = scroll_feed(group)
        if check_auth_failure(raw, meta):
            auth_failed = True
            print(f"  [AUTH FAIL] Session expired!", file=sys.stderr)
            break
        
        for p in feed_posts:
            key = f"{p['seller']}_{p['body'][:60]}"
            if key not in group_posts:
                group_posts[key] = p
        
        groups_processed += 1
        print(f"\n  Total unique posts for {group['name']}: {len(group_posts)}", file=sys.stderr)
        
        # Process each post
        for key, post in group_posts.items():
            pid = post_id(group['name'], post['seller'], post['body'])
            
            price = extract_price(post['body'])
            brand, model, ref = extract_brand_model(post['body'])
            condition = extract_condition(post['body'])
            contents = extract_contents(post['body'])
            sold = extract_sold_status(post['body'])
            
            listing = {
                "brand": brand, "model": model, "ref": ref,
                "askingPrice": price, "condition": condition,
                "contents": contents, "seller": post['seller'],
                "group": group['name'], "date": NOW[:10],
                "soldStatus": sold, "postSnippet": post['body'][:200],
                "firstSeenDate": NOW[:10], "lastSeenDate": NOW[:10],
            }
            
            # Dedup in DB
            dup_found = False
            for existing in db:
                if (existing.get('seller') == post['seller'] and 
                    existing.get('ref') == ref and ref is not None and
                    existing.get('askingPrice') == price):
                    existing['lastSeenDate'] = NOW[:10]
                    if sold and not existing.get('soldStatus'):
                        existing['soldStatus'] = sold
                        existing['soldDate'] = NOW[:10]
                    dup_found = True
                    break
            
            if not dup_found and (brand != "Unknown" or price is not None):
                all_listings.append(listing)
            
            # Check target match
            match = check_target_match(post['body'])
            if match and pid not in alerted_ids:
                match_type, watch_name = match
                all_matches.append({
                    "match_type": match_type,
                    "watch_name": watch_name,
                    "seller": post['seller'],
                    "price": price,
                    "condition": condition,
                    "contents": contents,
                    "sold": sold,
                    "group": group['name'],
                    "group_id": group['id'],
                    "body_snippet": post['body'][:300],
                    "post_id": pid,
                })
            
            seen_ids.add(pid)
    
    # Update DB
    db.extend(all_listings)
    save_db(db)
    
    # Update state
    seen_list = list(seen_ids)[-500:]
    new_alerted = [m['post_id'] for m in all_matches]
    alerted_list = list(alerted_ids | set(new_alerted))[-500:]
    state['seen_post_ids'] = seen_list
    state['alerted_ids'] = alerted_list
    save_state(state)
    
    result = {
        "auth_failed": auth_failed,
        "matches": all_matches,
        "new_listings_count": len(all_listings),
        "total_db_entries": len(db),
        "groups_processed": groups_processed,
    }
    print(json.dumps(result, indent=2))

if __name__ == '__main__':
    main()

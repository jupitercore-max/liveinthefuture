#!/usr/bin/env python3
"""Facebook Watch Group Monitor — orchestrates browser CLI + parser."""

import subprocess, json, re, os, sys, time, hashlib, glob
from datetime import datetime, timezone

# === CONFIG ===
GROUPS = [
    {"name": "Moda Watch Club", "id": "558871041349029"},
    {"name": "Moda Watch Club - 10k & Under", "id": "150223938977815"},
    {"name": "Moda Watch Club - Backup", "id": "607987992210015"},
]

SEARCH_KEYWORDS = ["Milgauss", "Yacht-Master II", "Square Bang", "Magic Gold", "Spirit Big Bang", "Richard Mille"]

PARSER_SCRIPT = os.path.expanduser("~/workspace/scripts/fb-text-parser.py")
STATE_FILE = os.path.expanduser("~/workspace/research/watch-monitor-state.json")
PRICE_DB_FILE = os.path.expanduser("~/workspace/research/watch-price-db.json")

NOW = datetime.now(timezone.utc).isoformat()
TODAY = datetime.now(timezone.utc).strftime("%Y-%m-%d")

# === HELPERS ===

def run_browser(args):
    """Run a browser CLI command, return stdout."""
    cmd = ["browser"] + args
    r = subprocess.run(cmd, capture_output=True, text=True, timeout=30)
    return r.stdout.strip()

def navigate(url):
    run_browser(["navigate", "--url", url])
    time.sleep(5)

def get_text_and_parse():
    """Get page text via browser get-text (writes to file), then parse."""
    result_json = run_browser(["get-text"])
    if not result_json:
        return [], ""
    
    try:
        result = json.loads(result_json)
        text_file = result.get("output_path", "")
    except:
        return [], ""
    
    if not text_file or not os.path.exists(text_file):
        return [], ""
    
    with open(text_file) as f:
        raw_text = f.read()
    
    if not raw_text or len(raw_text) < 50:
        return [], raw_text
    
    # Parse through fb-text-parser.py
    r = subprocess.run(
        ["python3", PARSER_SCRIPT],
        input=raw_text, capture_output=True, text=True, timeout=15
    )
    try:
        posts = json.loads(r.stdout)
    except:
        posts = []
    
    return posts, raw_text

def check_auth_failure(raw_text):
    """Check if FB session expired."""
    if not raw_text or len(raw_text) < 100:
        return True
    lower = raw_text.lower()
    if "create new account" in lower and "log in" in lower and len(raw_text) < 2000:
        return True
    return False

def scroll_deep():
    """Deep scroll to load more content."""
    for y in [3000, 6000, 9000, 12000, 15000]:
        run_browser(["evaluate", "--expression", f"window.scrollTo(0, {y})"])
        time.sleep(2)

def make_post_id(seller, body, group_id):
    snippet = (seller + body[:100] + group_id).lower()
    h = hashlib.md5(snippet.encode()).hexdigest()[:12]
    seller_slug = re.sub(r'[^a-z]', '', seller.lower())[:15]
    return f"fb_{group_id[:6]}_{seller_slug}_{h}"

def extract_price(text):
    m = re.search(r'\$[\s]*([\d,]+(?:\.\d{2})?)', text)
    if m:
        return m.group(0).strip()
    return None

def extract_condition(text):
    lower = text.lower()
    for cond in ["mint", "excellent", "very good", "good", "worn", "fair"]:
        if cond in lower:
            return cond.title()
    return None

def extract_contents(text):
    lower = text.lower()
    if "full set" in lower: return "Full Set"
    if "box and papers" in lower or "b&p" in lower or "b & p" in lower: return "Box & Papers"
    if "watch only" in lower or "no box" in lower: return "Watch Only"
    if "box" in lower and "paper" in lower: return "Box & Papers"
    if "box" in lower: return "Box Only"
    return None

def extract_brand_model(text):
    lower = text.lower()
    brand = None
    ref = None

    brands = {
        "rolex": "Rolex", "rlx": "Rolex", "omega": "Omega", "patek": "Patek Philippe",
        "audemars": "Audemars Piguet", "hublot": "Hublot", "cartier": "Cartier",
        "tudor": "Tudor", "iwc": "IWC", "breitling": "Breitling",
        "panerai": "Panerai", "tag heuer": "TAG Heuer", "richard mille": "Richard Mille",
        "jaeger": "Jaeger-LeCoultre", "vacheron": "Vacheron Constantin",
        "bulgari": "Bulgari", "bvlgari": "Bulgari", "seiko": "Seiko",
        "grand seiko": "Grand Seiko", "zenith": "Zenith", "blancpain": "Blancpain",
        "a. lange": "A. Lange & Söhne", "girard": "Girard-Perregaux",
        "f.p. journe": "F.P. Journe", "chopard": "Chopard",
    }

    for key, val in brands.items():
        if key in lower:
            brand = val
            break

    ref_m = re.search(r'(?:ref\.?\s*#?\s*)?(\d{3,6}[A-Z]?(?:[./]\d{2,6})?(?:\.[A-Z0-9]+)*)', text)
    if ref_m:
        ref = ref_m.group(1)

    return brand, None, ref

def is_sold(text):
    lower = text.lower()
    if "sold" in lower or "$old" in lower:
        return "SOLD"
    if "ohpf" in lower or "on hold" in lower or "pending" in lower:
        return "OHPF"
    return None

# === TARGET MATCHING ===

def match_targets(post):
    body = post["body"].lower()
    matches = []

    # 1. Rolex Milgauss 116400GV — BLUE DIAL ONLY
    if "116400gv" in body or "milgauss" in body:
        is_blue = any(w in body for w in ["blue", "z-blue", "z blue", "bluez"])
        is_black = "black" in body and not is_blue
        if is_blue:
            matches.append({"watch": "Rolex Milgauss 116400GV (Blue/Z-Blue Dial)", "type": "EXACT MATCH", "priority": "HIGH"})
        elif "116400gv" in body and not is_black:
            matches.append({"watch": "Rolex Milgauss 116400GV (dial color unspecified)", "type": "POSSIBLE MATCH", "priority": "MEDIUM"})
        # Black dial = log only, no alert

    # 2. Rolex Yacht-Master II 116689
    if "116689" in body or "yacht-master ii" in body or "yacht master ii" in body or "ym2" in body.split() or "ymii" in body:
        matches.append({"watch": "Rolex Yacht-Master II 116689", "type": "EXACT MATCH", "priority": "HIGH"})

    # 3. Hublot Square Bang Magic Gold
    if "821.mx.0130" in body or ("square bang" in body and "magic gold" in body):
        matches.append({"watch": "Hublot Square Bang Unico Magic Gold 821.MX.0130.RX", "type": "EXACT MATCH", "priority": "HIGH"})

    # 4. Hublot Square Bang Titanium Rainbow
    if "821.nx.0117" in body or ("square bang" in body and "rainbow" in body):
        matches.append({"watch": "Hublot Square Bang Unico Titanium Rainbow 821.NX.0117.LR.0999", "type": "EXACT MATCH", "priority": "HIGH"})

    # 5. Spirit Big Bang (near-match)
    if "spirit big bang" in body or "spirit of big bang" in body:
        matches.append({"watch": "Hublot Spirit Big Bang", "type": "NEAR-MATCH", "priority": "MEDIUM"})

    # 6. Any Hublot + Magic Gold
    if "hublot" in body and "magic gold" in body and not any("Magic Gold 821" in m["watch"] for m in matches):
        matches.append({"watch": "Hublot (Magic Gold variant)", "type": "NEAR-MATCH", "priority": "MEDIUM"})

    # 7. Patek Philippe + titanium
    if "patek" in body and "titanium" in body:
        matches.append({"watch": "Patek Philippe (Titanium)", "type": "EXACT MATCH", "priority": "HIGH"})

    return matches

# === MAIN ===

def main():
    all_alerts = []
    all_listings = []
    auth_failed = False

    # Load state
    if os.path.exists(STATE_FILE):
        with open(STATE_FILE) as f:
            state = json.load(f)
    else:
        state = {"last_run": None, "seen_post_ids": []}

    seen_ids = set(state.get("seen_post_ids", []))

    # Load price DB (dict with "listings" key)
    if os.path.exists(PRICE_DB_FILE):
        with open(PRICE_DB_FILE) as f:
            price_db_raw = json.load(f)
        if isinstance(price_db_raw, dict):
            price_db = price_db_raw.get("listings", [])
        elif isinstance(price_db_raw, list):
            price_db = price_db_raw
        else:
            price_db = []
    else:
        price_db = []

    for group in GROUPS:
        gname = group["name"]
        gid = group["id"]
        group_posts = {}

        print(f"\n{'='*60}", file=sys.stderr)
        print(f"Scanning: {gname} ({gid})", file=sys.stderr)

        # === STEP 1: Search for target keywords ===
        for keyword in SEARCH_KEYWORDS:
            search_url = f"https://www.facebook.com/groups/{gid}/search/?q={keyword}"
            print(f"  Searching: {keyword}...", file=sys.stderr)
            try:
                navigate(search_url)
                # Scroll a bit to load search results
                run_browser(["evaluate", "--expression", "window.scrollTo(0, 3000)"])
                time.sleep(2)
                
                posts, raw = get_text_and_parse()

                # Auth check on first keyword of first group
                if not group_posts and group == GROUPS[0] and keyword == SEARCH_KEYWORDS[0]:
                    if check_auth_failure(raw):
                        print(f"  ⚠️ AUTH FAILURE!", file=sys.stderr)
                        auth_failed = True
                        break

                for p in posts:
                    pid = make_post_id(p["seller"], p["body"], gid)
                    if pid not in group_posts:
                        group_posts[pid] = {**p, "post_id": pid, "group": gname, "group_id": gid, "source": "search"}
                print(f"    Found {len(posts)} posts", file=sys.stderr)
            except Exception as e:
                print(f"    Error searching {keyword}: {e}", file=sys.stderr)

        if auth_failed:
            break

        # === STEP 2: Scroll main feed ===
        print(f"  Scrolling main feed...", file=sys.stderr)
        try:
            navigate(f"https://www.facebook.com/groups/{gid}")
            scroll_deep()
            posts, raw = get_text_and_parse()
            for p in posts:
                pid = make_post_id(p["seller"], p["body"], gid)
                if pid not in group_posts:
                    group_posts[pid] = {**p, "post_id": pid, "group": gname, "group_id": gid, "source": "feed"}
            print(f"    Feed: {len(posts)} posts ({len(group_posts)} total unique)", file=sys.stderr)
        except Exception as e:
            print(f"    Error scrolling feed: {e}", file=sys.stderr)

        # === Process posts ===
        for pid, post in group_posts.items():
            body = post["body"]
            seller = post["seller"]

            price = extract_price(body)
            condition = extract_condition(body)
            contents = extract_contents(body)
            brand, model, ref = extract_brand_model(body)
            sold_status = is_sold(body)

            listing = {
                "brand": brand, "model": model, "ref": ref,
                "askingPrice": price, "condition": condition,
                "contents": contents, "seller": seller,
                "group": gname, "groupId": gid, "date": TODAY,
                "firstSeenDate": TODAY, "lastSeenDate": TODAY,
                "soldStatus": sold_status,
                "postSnippet": body[:200]
            }

            # Dedup against price DB — existing entries use 'reference'/'seller'/'price'
            is_dupe = False
            for existing in price_db:
                if not isinstance(existing, dict):
                    continue
                ex_seller = existing.get("seller", "")
                ex_ref = existing.get("reference") or existing.get("ref")
                ex_price = existing.get("price") or existing.get("askingPrice")
                ex_gid = existing.get("groupId") or existing.get("group_id", "")
                # Normalize price to string for comparison
                price_str = str(price).replace("$","").replace(",","") if price else ""
                ex_price_str = str(ex_price).replace("$","").replace(",","") if ex_price else ""
                if (ex_seller == seller and ex_ref == ref and 
                    price_str and ex_price_str and price_str == ex_price_str):
                    existing["lastSeenDate"] = TODAY
                    if sold_status and not existing.get("soldStatus"):
                        existing["soldStatus"] = sold_status
                        existing["soldDate"] = TODAY
                    is_dupe = True
                    break

            if not is_dupe and (brand or price):
                price_db.append(listing)
                all_listings.append(listing)

            # Match targets
            matches = match_targets(post)
            if matches and pid not in seen_ids:
                for match in matches:
                    alert = {
                        "watch": match["watch"],
                        "type": match["type"],
                        "priority": match["priority"],
                        "price": price or "Not listed",
                        "condition": condition or "Unknown",
                        "contents": contents or "Unknown",
                        "seller": seller,
                        "group": gname,
                        "group_id": gid,
                        "post_id": pid,
                        "snippet": body[:300]
                    }
                    all_alerts.append(alert)
                seen_ids.add(pid)

    # === OUTPUT ===
    result = {
        "timestamp": NOW,
        "auth_failed": auth_failed,
        "alerts": all_alerts,
        "new_listings_count": len(all_listings),
        "total_price_db_count": len(price_db),
        "groups_scanned": len(GROUPS) if not auth_failed else 0
    }

    # Save state
    state["last_run"] = NOW
    state["seen_post_ids"] = list(seen_ids)[-500:]

    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=2)

    with open(PRICE_DB_FILE, "w") as f:
        json.dump({"listings": price_db}, f, indent=2)

    # Clean up temp files
    for f in glob.glob("/tmp/browser-get-text-*.txt"):
        try:
            os.remove(f)
        except:
            pass

    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Facebook Watch Group Monitor — scrapes 3 Moda groups for watch listings."""
import json, subprocess, time, re, os, sys
from datetime import datetime, timezone

NOW = datetime.now(timezone.utc).isoformat()
TODAY = datetime.now(timezone.utc).strftime("%Y-%m-%d")

GROUPS = [
    {"name": "Moda Watch Club", "id": "558871041349029", "key": "moda_watch_club"},
    {"name": "Moda Watch Club - 10k & Under", "id": "150223938977815", "key": "moda_10k_under"},
    {"name": "Moda Clubs - Watches (Backup)", "id": "607987992210015", "key": "moda_backup"},
]

SEARCH_KEYWORDS = [
    "Milgauss", "116400GV", "Yacht-Master II", "116689",
    "Square Bang", "Magic Gold", "Spirit Big Bang",
    "Patek titanium", "Rainbow", "Hublot"
]

STATE_FILE = os.path.expanduser("~/workspace/research/watch-monitor-state.json")
DB_FILE = os.path.expanduser("~/workspace/research/watch-price-db.json")
RESULTS_DIR = "/tmp/fb-watch-monitor"
os.makedirs(RESULTS_DIR, exist_ok=True)

def load_json(path, default):
    try:
        with open(path, "r") as f:
            return json.load(f)
    except Exception:
        return default

def save_json(path, data):
    with open(path, "w") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def browser_cmd(args, timeout=45):
    """Run a browser CLI command and return parsed JSON or raw output."""
    cmd = ["browser"] + args
    try:
        r = subprocess.run(cmd, capture_output=True, text=True, timeout=timeout)
        out = r.stdout.strip()
        if out:
            try:
                return json.loads(out)
            except:
                return {"raw": out}
        return {"raw": r.stderr.strip() or "(no output)"}
    except subprocess.TimeoutExpired:
        return {"error": "timeout"}
    except Exception as e:
        return {"error": str(e)}

def browser_navigate(url):
    return browser_cmd(["navigate", "--url", url])

def browser_evaluate(js):
    return browser_cmd(["evaluate", "--expression", js], timeout=30)

def browser_get_text():
    return browser_cmd(["get-text"], timeout=30)

def browser_scroll_and_extract():
    """Deep scroll a Facebook group feed and extract posts."""
    js = r"""
    (async () => {
        // Scroll down in 5 passes to load more posts
        for (let i = 1; i <= 6; i++) {
            window.scrollTo(0, i * 3000);
            await new Promise(r => setTimeout(r, 2000));
        }
        // Extract from feed
        const feed = document.querySelector('[role="feed"]') || document.body;
        const posts = feed.querySelectorAll('[role="article"]');
        const results = [];
        posts.forEach(p => {
            const text = p.innerText.substring(0, 2000);
            if (text.length > 30) results.push(text);
        });
        const feedText = feed.innerText.substring(0, 50000);
        return JSON.stringify({postCount: results.length, posts: results, feedTextLen: feedText.length, feedText: feedText});
    })()
    """
    return browser_evaluate(js)

def wait_for_page(seconds=3):
    time.sleep(seconds)

def extract_price(text):
    """Extract price from text."""
    # Match $XX,XXX patterns
    m = re.search(r'\$\s?([\d,]+(?:\.\d{2})?)', text)
    if m:
        price_str = m.group(1).replace(",", "")
        try:
            return float(price_str)
        except:
            pass
    return None

def extract_sold_status(text):
    """Check if listing is sold."""
    t = text.lower()
    if "ohpf" in t or "oh pf" in t:
        return "OHPF"
    if "$old" in t or "sold" in t:
        return "SOLD"
    return None

def check_auth_failure(text, title=""):
    """Return True if session expired."""
    if not text or len(text.strip()) < 50:
        return True
    checks = ["log in", "log into", "create new account", "create an account"]
    combined = (text[:500] + title).lower()
    for c in checks:
        if c in combined:
            return True
    return False

def match_target_watches(text):
    """Check if text matches any target watch. Returns list of matches."""
    t = text.lower()
    matches = []

    # Milgauss 116400GV - MUST be blue dial
    if "116400gv" in t or ("milgauss" in t and "green" in t):
        if "blue" in t and "dial" in t:
            matches.append({"type": "EXACT", "watch": "Rolex Milgauss 116400GV Blue Dial", "ref": "116400GV"})
        elif "black" in t:
            pass  # Skip black dial
        else:
            # Log but note: dial color not specified
            pass  # Don't alert unless blue dial confirmed

    # Yacht-Master II 116689
    if "116689" in t or "yacht-master ii" in t or "yacht master ii" in t or "ym2" in t.split() or "ymii" in t:
        matches.append({"type": "EXACT", "watch": "Rolex Yacht-Master II 116689", "ref": "116689"})

    # Hublot Square Bang Magic Gold
    if "821.mx.0130" in t or ("square bang" in t and "magic gold" in t):
        matches.append({"type": "EXACT", "watch": "Hublot Square Bang Unico Magic Gold 821.MX.0130.RX", "ref": "821.MX.0130.RX"})

    # Hublot Square Bang Rainbow
    if "821.nx.0117" in t or ("square bang" in t and "rainbow" in t):
        matches.append({"type": "EXACT", "watch": "Hublot Square Bang Unico Titanium Rainbow 821.NX.0117.LR.0999", "ref": "821.NX.0117.LR.0999"})

    # Spirit Big Bang / Spirit of Big Bang - near match
    if "spirit big bang" in t or "spirit of big bang" in t:
        if not any(m["type"] == "EXACT" and "Square Bang" in m["watch"] for m in matches):
            matches.append({"type": "NEAR-MATCH", "watch": "Hublot Spirit Big Bang (related to Square Bang line)", "ref": "Spirit Big Bang"})

    # Any Hublot Magic Gold - near match
    if "magic gold" in t and "hublot" in t:
        if not any("Magic Gold" in m["watch"] for m in matches):
            matches.append({"type": "NEAR-MATCH", "watch": "Hublot Magic Gold (near-match)", "ref": "Magic Gold"})

    # Patek Philippe titanium
    if ("patek" in t or "pp" in t.split()) and "titanium" in t:
        matches.append({"type": "EXACT", "watch": "Patek Philippe Titanium", "ref": "Patek Titanium"})

    return matches

def parse_listing_from_post(text, group_name, group_key):
    """Try to parse a watch listing from post text."""
    if len(text.strip()) < 20:
        return None

    # Try to extract seller (first line often has the name)
    lines = text.strip().split("\n")
    seller = None
    for line in lines[:5]:
        line = line.strip()
        # Skip common non-name lines
        if any(skip in line.lower() for skip in ["comment", "like", "share", "group", "admin", "member", "joined", "·"]):
            continue
        if len(line) > 3 and len(line) < 60 and not line.startswith("$") and not line.startswith("#"):
            seller = line
            break

    price = extract_price(text)
    sold = extract_sold_status(text)

    # Try to identify brand and reference
    brand = None
    model = None
    reference = None
    t = text.lower()

    brand_patterns = {
        "Rolex": ["rolex", "rol/ex"],
        "Omega": ["omega"],
        "Patek Philippe": ["patek", "pp "],
        "Audemars Piguet": ["audemars", "ap ", "royal oak"],
        "Hublot": ["hublot"],
        "Cartier": ["cartier"],
        "Tudor": ["tudor"],
        "IWC": ["iwc"],
        "Breitling": ["breitling"],
        "Richard Mille": ["richard mille"],
        "Panerai": ["panerai"],
        "Tag Heuer": ["tag heuer", "tag he/uer"],
        "Vacheron Constantin": ["vacheron"],
        "Jaeger-LeCoultre": ["jaeger", "jlc"],
        "A. Lange & Söhne": ["lange", "a. lange"],
        "Bulgari": ["bulgari", "bvlgari"],
        "Chopard": ["chopard"],
        "Zenith": ["zenith"],
        "Grand Seiko": ["grand seiko"],
        "F.P. Journe": ["journe", "f.p. journe", "fpj"],
    }

    for b, patterns in brand_patterns.items():
        for p in patterns:
            if p in t:
                brand = b
                break
        if brand:
            break

    # Extract reference numbers (common patterns)
    ref_match = re.search(r'\b(\d{3,6}[A-Za-z]{0,4}(?:[./]\d{2,4})?(?:[./]\d{2,4})?)\b', text)
    if ref_match:
        reference = ref_match.group(1)

    if not brand and not price and not reference:
        return None  # Not a listing

    return {
        "brand": brand,
        "model": model,
        "reference": reference,
        "price": price,
        "seller": seller,
        "sold_status": sold,
        "group_name": group_name,
        "group_key": group_key,
        "raw_text": text[:500],
    }

def generate_post_id(listing, group_key):
    """Generate a dedup key for a listing."""
    parts = [
        "fb", group_key,
        (listing.get("seller") or "unknown").lower().replace(" ", "_")[:20],
        (listing.get("reference") or listing.get("brand") or "unknown").lower()[:20],
        TODAY.replace("-", "")
    ]
    return "_".join(parts)


def search_group_for_keyword(group_id, keyword):
    """Search a Facebook group for a keyword and return page text."""
    url = f"https://www.facebook.com/groups/{group_id}/search/?q={keyword.replace(' ', '%20')}"
    browser_navigate(url)
    wait_for_page(4)
    result = browser_get_text()
    if "output_path" in result:
        try:
            with open(result["output_path"], "r") as f:
                return f.read()
        except:
            return ""
    return result.get("raw", "")


def scroll_group_feed(group_id, group_name):
    """Navigate to group and deep scroll, returning extracted data."""
    url = f"https://www.facebook.com/groups/{group_id}/"
    browser_navigate(url)
    wait_for_page(4)

    # Check page title
    info = browser_cmd(["info"])
    title = info.get("title", "")
    if check_auth_failure("", title):
        return {"auth_failed": True}

    # Deep scroll with evaluate
    result = browser_scroll_and_extract()

    # Parse the result
    if isinstance(result, dict):
        if "error" in result:
            # Fallback: get-text
            text_result = browser_get_text()
            if "output_path" in text_result:
                try:
                    with open(text_result["output_path"], "r") as f:
                        text = f.read()
                    return {"feedText": text, "posts": [], "postCount": 0}
                except:
                    pass
            return {"feedText": text_result.get("raw", ""), "posts": [], "postCount": 0}

        # result from evaluate might be double-encoded
        raw = result.get("raw") or result.get("result") or ""
        if isinstance(raw, str):
            try:
                data = json.loads(raw)
                return data
            except:
                return {"feedText": raw, "posts": [], "postCount": 0}
        elif isinstance(raw, dict):
            return raw

    return {"feedText": "", "posts": [], "postCount": 0}


def main():
    state = load_json(STATE_FILE, {"seen_post_ids": [], "last_run": None})
    db = load_json(DB_FILE, [])

    seen_ids = set(state.get("seen_post_ids", []))
    alerts = []
    new_listings = []
    auth_failed = False

    print(f"[{NOW}] Starting Facebook Watch Group Monitor")
    print(f"  Existing DB: {len(db)} listings, Seen IDs: {len(seen_ids)}")

    # ============ PHASE A: SEARCH-FIRST (target watches) ============
    print("\n=== PHASE A: Keyword searches for target watches ===")
    search_hits = []

    for group in GROUPS:
        print(f"\n--- Searching: {group['name']} ---")
        for keyword in SEARCH_KEYWORDS:
            print(f"  Searching '{keyword}'...", end=" ", flush=True)
            text = search_group_for_keyword(group["id"], keyword)

            if check_auth_failure(text):
                print("AUTH FAILURE!")
                auth_failed = True
                break

            # Check for target watch matches
            matches = match_target_watches(text)
            if matches:
                for m in matches:
                    hit = {
                        "keyword": keyword,
                        "group": group["name"],
                        "group_id": group["id"],
                        "match": m,
                        "text_snippet": text[:2000],
                    }
                    search_hits.append(hit)
                    print(f"MATCH: {m['type']} - {m['watch']}")
            else:
                # Count how much text we got
                print(f"({len(text)} chars)")

            time.sleep(1)  # Rate limit

        if auth_failed:
            break

    if auth_failed:
        print("\n⚠️ AUTH FAILURE — session expired!")
        # Write alert and exit
        with open(f"{RESULTS_DIR}/auth_failure.json", "w") as f:
            json.dump({"auth_failed": True, "timestamp": NOW}, f)
        sys.exit(1)

    # ============ PHASE B: FEED SCROLL (price DB) ============
    print("\n=== PHASE B: Feed scroll for price DB ===")

    for group in GROUPS:
        print(f"\n--- Scrolling: {group['name']} ---")
        data = scroll_group_feed(group["id"], group["name"])

        if data.get("auth_failed"):
            auth_failed = True
            break

        posts = data.get("posts", [])
        feed_text = data.get("feedText", "")
        print(f"  Extracted {len(posts)} posts, {len(feed_text)} chars feed text")

        # Process individual posts
        for post_text in posts:
            listing = parse_listing_from_post(post_text, group["name"], group["key"])
            if not listing:
                continue

            post_id = generate_post_id(listing, group["key"])

            # Check target matches on individual posts too
            matches = match_target_watches(post_text)
            for m in matches:
                alert_id = f"alert_{post_id}_{m['ref']}"
                if alert_id not in seen_ids:
                    alerts.append({
                        "type": m["type"],
                        "watch": m["watch"],
                        "price": listing.get("price"),
                        "condition": None,
                        "seller": listing.get("seller"),
                        "group": group["name"],
                        "group_id": group["id"],
                        "contents": None,
                        "text": post_text[:500],
                        "alert_id": alert_id,
                    })

            # Update price DB
            existing = None
            for entry in db:
                if entry.get("id") == post_id:
                    existing = entry
                    break

            if existing:
                # Update lastSeenDate
                existing["lastSeenDate"] = NOW
                # If now sold but wasn't before, mark it
                if listing.get("sold_status") and not existing.get("sold"):
                    existing["sold"] = True
                    existing["soldStatus"] = listing["sold_status"]
                    existing["soldDate"] = NOW
            else:
                # New listing
                new_entry = {
                    "id": post_id,
                    "date": TODAY,
                    "source": group["key"],
                    "group_name": group["name"],
                    "seller": listing.get("seller"),
                    "brand": listing.get("brand"),
                    "model": listing.get("model"),
                    "reference": listing.get("reference"),
                    "price": listing.get("price"),
                    "currency": "USD",
                    "condition": None,
                    "contents": None,
                    "sold": listing.get("sold_status") is not None,
                    "soldStatus": listing.get("sold_status"),
                    "post_url": f"https://www.facebook.com/groups/{group['id']}",
                    "raw_text": listing.get("raw_text", "")[:500],
                    "firstSeenDate": NOW,
                    "lastSeenDate": NOW,
                    "scraped_at": NOW,
                }
                db.append(new_entry)
                new_listings.append(new_entry)
                seen_ids.add(post_id)

        # Also check feed text for target watches
        if feed_text:
            matches = match_target_watches(feed_text)
            for m in matches:
                feed_alert_id = f"feed_{group['key']}_{m['ref']}_{TODAY}"
                if feed_alert_id not in seen_ids:
                    # Extract surrounding context
                    t_lower = feed_text.lower()
                    ref_lower = m["ref"].lower()
                    idx = t_lower.find(ref_lower)
                    snippet = ""
                    if idx >= 0:
                        start = max(0, idx - 200)
                        end = min(len(feed_text), idx + 300)
                        snippet = feed_text[start:end]

                    alerts.append({
                        "type": m["type"],
                        "watch": m["watch"],
                        "price": extract_price(snippet) if snippet else None,
                        "condition": None,
                        "seller": None,
                        "group": group["name"],
                        "group_id": group["id"],
                        "contents": None,
                        "text": snippet[:500] if snippet else feed_text[:500],
                        "alert_id": feed_alert_id,
                    })
                    seen_ids.add(feed_alert_id)

        time.sleep(2)

    if auth_failed:
        print("\n⚠️ AUTH FAILURE during feed scroll!")
        with open(f"{RESULTS_DIR}/auth_failure.json", "w") as f:
            json.dump({"auth_failed": True, "timestamp": NOW}, f)
        sys.exit(1)

    # ============ SAVE STATE ============
    # Deduplicate search hits into alerts
    for hit in search_hits:
        m = hit["match"]
        alert_id = f"search_{hit['group_id']}_{m['ref']}_{TODAY}"
        if alert_id not in seen_ids:
            alerts.append({
                "type": m["type"],
                "watch": m["watch"],
                "price": extract_price(hit["text_snippet"]),
                "condition": None,
                "seller": None,
                "group": hit["group"],
                "group_id": hit["group_id"],
                "contents": None,
                "text": hit["text_snippet"][:500],
                "alert_id": alert_id,
            })
            seen_ids.add(alert_id)

    # Save state
    state["last_run"] = NOW
    state["seen_post_ids"] = list(seen_ids)[-500:]  # Keep last 500
    save_json(STATE_FILE, state)
    save_json(DB_FILE, db)

    # Write results summary
    results = {
        "timestamp": NOW,
        "alerts": alerts,
        "new_listings_count": len(new_listings),
        "total_db_size": len(db),
        "auth_failed": auth_failed,
        "groups_processed": len(GROUPS),
    }
    save_json(f"{RESULTS_DIR}/results.json", results)

    print(f"\n=== RESULTS ===")
    print(f"  Alerts: {len(alerts)}")
    print(f"  New listings: {len(new_listings)}")
    print(f"  Total DB: {len(db)}")
    print(f"  Auth failed: {auth_failed}")

    if alerts:
        print("\n=== ALERTS ===")
        for a in alerts:
            print(f"  [{a['type']}] {a['watch']} — ${a.get('price', '?')} — {a['group']}")

    sys.exit(0)


if __name__ == "__main__":
    main()

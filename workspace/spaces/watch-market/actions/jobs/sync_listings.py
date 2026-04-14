#!/usr/bin/env python3
"""Sync watch-price-db.json into app.db for the Watch Market space.

CRITICAL: Snapshots original prices before they change to 'sold'.
This preserves pricing history for market analysis.
"""
import json
import sqlite3
import sys
from datetime import datetime, timezone
from pathlib import Path

SPACE_ROOT = Path(__file__).resolve().parent.parent.parent
APP_DB = SPACE_ROOT / "app.db"
PRICE_DB = Path.home() / "workspace" / "research" / "watch-price-db.json"

SCHEMA = """
CREATE TABLE IF NOT EXISTS listings (
    id TEXT PRIMARY KEY,
    date TEXT,
    source TEXT,
    group_name TEXT,
    seller TEXT,
    brand TEXT,
    model TEXT,
    reference TEXT,
    price REAL,
    currency TEXT DEFAULT 'USD',
    condition TEXT,
    contents TEXT,
    location TEXT,
    sold INTEGER DEFAULT 0,
    post_url TEXT,
    raw_text TEXT,
    scraped_at TEXT,
    original_price REAL,
    price_history TEXT DEFAULT '[]',
    created_at TEXT DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_listings_brand ON listings(brand);
CREATE INDEX IF NOT EXISTS idx_listings_date ON listings(date);
CREATE INDEX IF NOT EXISTS idx_listings_price ON listings(price);
CREATE INDEX IF NOT EXISTS idx_listings_sold ON listings(sold);
CREATE INDEX IF NOT EXISTS idx_listings_reference ON listings(reference);
CREATE TABLE IF NOT EXISTS sync_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    synced_at TEXT DEFAULT (datetime('now')),
    listings_total INTEGER,
    listings_new INTEGER,
    listings_updated INTEGER
);
"""


def get_db() -> sqlite3.Connection:
    db = sqlite3.connect(str(APP_DB))
    db.row_factory = sqlite3.Row
    db.execute("PRAGMA journal_mode=WAL")
    db.executescript(SCHEMA)
    return db


def normalize_listing(raw: dict) -> dict:
    price = raw.get("price") or raw.get("askingPrice")
    if isinstance(price, str):
        price = float(price.replace(",", "").replace("$", "").strip()) if price else None
    reference = raw.get("reference") or raw.get("ref") or ""
    post_url = raw.get("post_url") or raw.get("postUrl") or ""
    group_name = raw.get("group_name") or raw.get("group") or ""
    raw_text = raw.get("raw_text") or raw.get("postSnippet") or ""
    sold_raw = raw.get("sold", False) or raw.get("soldStatus", "")
    if isinstance(sold_raw, str):
        sold = sold_raw.lower() in ("sold", "ohpf", "true", "1")
    else:
        sold = bool(sold_raw)
    return {
        "id": raw.get("id", ""),
        "date": raw.get("date", ""),
        "source": raw.get("source", ""),
        "group_name": group_name,
        "seller": raw.get("seller", "unknown"),
        "brand": raw.get("brand", ""),
        "model": raw.get("model", ""),
        "reference": reference,
        "price": price,
        "currency": raw.get("currency", "USD"),
        "condition": raw.get("condition"),
        "contents": raw.get("contents"),
        "location": raw.get("location"),
        "sold": 1 if sold else 0,
        "post_url": post_url,
        "raw_text": raw_text,
        "scraped_at": raw.get("scraped_at", ""),
    }


def sync() -> dict:
    if not PRICE_DB.exists():
        print(f"Price DB not found at {PRICE_DB}", file=sys.stderr)
        return {"error": "price_db_not_found"}

    data = json.loads(PRICE_DB.read_text())
    listings = data.get("listings", [])
    db = get_db()
    new_count = 0
    updated_count = 0

    for raw in listings:
        norm = normalize_listing(raw)
        if not norm["id"]:
            continue
        existing = db.execute("SELECT id, price, sold, original_price FROM listings WHERE id = ?", (norm["id"],)).fetchone()
        if existing is None:
            db.execute(
                """INSERT INTO listings (id, date, source, group_name, seller, brand, model, reference,
                   price, currency, condition, contents, location, sold, post_url, raw_text, scraped_at,
                   original_price, price_history)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)""",
                (norm["id"], norm["date"], norm["source"], norm["group_name"], norm["seller"],
                 norm["brand"], norm["model"], norm["reference"], norm["price"], norm["currency"],
                 norm["condition"], norm["contents"], norm["location"], norm["sold"],
                 norm["post_url"], norm["raw_text"], norm["scraped_at"],
                 norm["price"],
                 json.dumps([{"price": norm["price"], "date": norm["scraped_at"]}]) if norm["price"] else "[]"),
            )
            new_count += 1
        else:
            old_price = existing["price"]
            old_sold = existing["sold"]
            price_changed = norm["price"] and old_price and abs((norm["price"] or 0) - (old_price or 0)) > 0.01
            sold_changed = norm["sold"] != old_sold
            if price_changed or sold_changed:
                hist_row = db.execute("SELECT price_history FROM listings WHERE id = ?", (norm["id"],)).fetchone()
                history = json.loads(hist_row["price_history"]) if hist_row and hist_row["price_history"] else []
                if price_changed:
                    history.append({"price": norm["price"], "date": datetime.now(timezone.utc).isoformat()})
                db.execute(
                    """UPDATE listings SET price=?, sold=?, condition=?, contents=?,
                       price_history=?, scraped_at=? WHERE id=?""",
                    (norm["price"], norm["sold"], norm["condition"], norm["contents"],
                     json.dumps(history), norm["scraped_at"], norm["id"]),
                )
                updated_count += 1

    total = db.execute("SELECT COUNT(*) as c FROM listings").fetchone()["c"]
    db.execute("INSERT INTO sync_log (listings_total, listings_new, listings_updated) VALUES (?, ?, ?)",
               (total, new_count, updated_count))
    db.commit()
    db.close()
    result = {"total": total, "new": new_count, "updated": updated_count, "synced_at": datetime.now(timezone.utc).isoformat()}
    print(json.dumps(result))
    return result


if __name__ == "__main__":
    sync()

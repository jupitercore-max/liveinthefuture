#!/usr/bin/env python3
"""Analytics: brand distribution, price stats, group comparison, timeline."""
import sqlite3
from typing import List, Optional

from pydantic import BaseModel

from spaces.actions import run_action


class Request(BaseModel):
    pass


class BrandStat(BaseModel):
    brand: str
    count: int
    avg_price: Optional[float]
    min_price: Optional[float]
    max_price: Optional[float]
    median_price: Optional[float]


class GroupStat(BaseModel):
    group_name: str
    count: int
    avg_price: Optional[float]
    active: int
    sold: int


class TimelinePoint(BaseModel):
    date: str
    count: int
    avg_price: Optional[float]


class PriceScatterPoint(BaseModel):
    date: str
    price: float
    brand: str
    reference: str
    model: str


class Response(BaseModel):
    total_listings: int
    total_with_price: int
    avg_price: Optional[float]
    median_price: Optional[float]
    total_sold: int
    total_active: int
    brands: List[BrandStat]
    groups: List[GroupStat]
    timeline: List[TimelinePoint]
    scatter: List[PriceScatterPoint]
    last_sync: str


def _get_db(path: str) -> sqlite3.Connection:
    db = sqlite3.connect(path)
    db.row_factory = sqlite3.Row
    return db


async def main(ctx, request: Request) -> Response:
    db = _get_db(ctx.app_db_path())

    total = db.execute("SELECT COUNT(*) as c FROM listings").fetchone()["c"]
    with_price = db.execute("SELECT COUNT(*) as c FROM listings WHERE price IS NOT NULL AND price > 0").fetchone()["c"]
    sold_count = db.execute("SELECT COUNT(*) as c FROM listings WHERE sold = 1").fetchone()["c"]

    prices = [r[0] for r in db.execute("SELECT price FROM listings WHERE price IS NOT NULL AND price > 0 ORDER BY price").fetchall()]
    avg_p = sum(prices) / len(prices) if prices else None
    med_p = prices[len(prices) // 2] if prices else None

    brand_rows = db.execute("""
        SELECT COALESCE(brand, '') as brand, COUNT(*) as cnt,
               AVG(CASE WHEN price > 0 THEN price END) as avg_p,
               MIN(CASE WHEN price > 0 THEN price END) as min_p,
               MAX(CASE WHEN price > 0 THEN price END) as max_p
        FROM listings WHERE brand IS NOT NULL AND brand != '' GROUP BY brand ORDER BY cnt DESC
    """).fetchall()

    brands: List[BrandStat] = []
    for r in brand_rows:
        brand_prices = [p[0] for p in db.execute(
            "SELECT price FROM listings WHERE brand = ? AND price IS NOT NULL AND price > 0 ORDER BY price", (r["brand"],)
        ).fetchall()]
        med = brand_prices[len(brand_prices) // 2] if brand_prices else None
        brands.append(BrandStat(
            brand=r["brand"], count=r["cnt"],
            avg_price=round(r["avg_p"], 2) if r["avg_p"] else None,
            min_price=r["min_p"], max_price=r["max_p"], median_price=med,
        ))

    group_rows = db.execute("""
        SELECT group_name, COUNT(*) as cnt,
               AVG(CASE WHEN price > 0 THEN price END) as avg_p,
               SUM(CASE WHEN sold = 0 THEN 1 ELSE 0 END) as active,
               SUM(CASE WHEN sold = 1 THEN 1 ELSE 0 END) as sold_cnt
        FROM listings WHERE group_name != '' GROUP BY group_name ORDER BY cnt DESC
    """).fetchall()
    groups = [GroupStat(
        group_name=r["group_name"], count=r["cnt"],
        avg_price=round(r["avg_p"], 2) if r["avg_p"] else None,
        active=r["active"] or 0, sold=r["sold_cnt"] or 0,
    ) for r in group_rows]

    timeline_rows = db.execute("""
        SELECT date, COUNT(*) as cnt, AVG(CASE WHEN price > 0 THEN price END) as avg_p
        FROM listings WHERE date != '' GROUP BY date ORDER BY date
    """).fetchall()
    timeline = [TimelinePoint(date=r["date"], count=r["cnt"],
                              avg_price=round(r["avg_p"], 2) if r["avg_p"] else None) for r in timeline_rows]

    scatter_rows = db.execute("""
        SELECT date, price, COALESCE(brand, '') as brand,
               COALESCE(reference, '') as reference, COALESCE(model, '') as model
        FROM listings
        WHERE price IS NOT NULL AND price > 0 AND date != ''
        AND brand IS NOT NULL AND brand != '' ORDER BY date
    """).fetchall()
    scatter = [PriceScatterPoint(
        date=r["date"], price=r["price"], brand=r["brand"],
        reference=r["reference"], model=r["model"],
    ) for r in scatter_rows]

    sync_row = db.execute("SELECT synced_at FROM sync_log ORDER BY id DESC LIMIT 1").fetchone()
    last_sync = sync_row["synced_at"] if sync_row else "never"

    db.close()

    return Response(
        total_listings=total, total_with_price=with_price,
        avg_price=round(avg_p, 2) if avg_p else None, median_price=med_p,
        total_sold=sold_count, total_active=total - sold_count,
        brands=brands, groups=groups, timeline=timeline, scatter=scatter,
        last_sync=last_sync,
    )


if __name__ == "__main__":
    raise SystemExit(run_action(main))

#!/usr/bin/env python3
"""Get watch listings with filtering, search, and pagination."""
import sqlite3
from typing import List, Optional

from pydantic import BaseModel

from spaces.actions import run_action


class Request(BaseModel):
    search: str = ""
    brand: str = ""
    group: str = ""
    min_price: Optional[float] = None
    max_price: Optional[float] = None
    sold_filter: str = "all"
    sort_by: str = "date"
    limit: int = 200
    offset: int = 0


class ListingItem(BaseModel):
    id: str
    date: str
    group_name: str
    seller: str
    brand: str
    model: str
    reference: str
    price: Optional[float]
    condition: Optional[str]
    contents: Optional[str]
    location: Optional[str]
    sold: bool
    post_url: str
    original_price: Optional[float]
    scraped_at: str


class Response(BaseModel):
    listings: List[ListingItem]
    total: int
    has_more: bool


def _get_db(path: str) -> sqlite3.Connection:
    db = sqlite3.connect(path)
    db.row_factory = sqlite3.Row
    return db


async def main(ctx, request: Request) -> Response:
    db = _get_db(ctx.app_db_path())

    where_clauses: List[str] = []
    params: List[object] = []

    if request.search:
        where_clauses.append("(brand LIKE ? OR model LIKE ? OR reference LIKE ? OR raw_text LIKE ? OR seller LIKE ?)")
        pat = f"%{request.search}%"
        params.extend([pat, pat, pat, pat, pat])

    if request.brand:
        where_clauses.append("brand = ?")
        params.append(request.brand)

    if request.group:
        where_clauses.append("group_name = ?")
        params.append(request.group)

    if request.min_price is not None:
        where_clauses.append("price >= ?")
        params.append(request.min_price)

    if request.max_price is not None:
        where_clauses.append("price <= ?")
        params.append(request.max_price)

    if request.sold_filter == "active":
        where_clauses.append("sold = 0")
    elif request.sold_filter == "sold":
        where_clauses.append("sold = 1")

    where_sql = " AND ".join(where_clauses) if where_clauses else "1=1"

    order_map = {
        "date": "date DESC, scraped_at DESC",
        "price_asc": "CASE WHEN price IS NULL THEN 1 ELSE 0 END, price ASC",
        "price_desc": "CASE WHEN price IS NULL THEN 1 ELSE 0 END, price DESC",
        "brand": "brand ASC, model ASC",
    }
    order_sql = order_map.get(request.sort_by, "date DESC")

    total_row = db.execute(f"SELECT COUNT(*) as c FROM listings WHERE {where_sql}", params).fetchone()
    total = total_row["c"] if total_row else 0

    rows = db.execute(
        f"""SELECT id, date, group_name, seller, brand, model, reference, price,
            condition, contents, location, sold, post_url, original_price, scraped_at
            FROM listings WHERE {where_sql} ORDER BY {order_sql} LIMIT ? OFFSET ?""",
        [*params, request.limit, request.offset],
    ).fetchall()

    items = [
        ListingItem(
            id=r["id"], date=r["date"] or "", group_name=r["group_name"] or "",
            seller=r["seller"] or "unknown", brand=r["brand"] or "",
            model=r["model"] or "", reference=r["reference"] or "",
            price=r["price"], condition=r["condition"], contents=r["contents"],
            location=r["location"], sold=bool(r["sold"]),
            post_url=r["post_url"] or "", original_price=r["original_price"],
            scraped_at=r["scraped_at"] or "",
        )
        for r in rows
    ]
    db.close()

    return Response(listings=items, total=total, has_more=(request.offset + request.limit) < total)


if __name__ == "__main__":
    raise SystemExit(run_action(main))

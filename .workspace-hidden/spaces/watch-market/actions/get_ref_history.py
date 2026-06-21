#!/usr/bin/env python3
"""Get price history and stats for a specific watch reference."""
import sqlite3
from typing import List, Optional

from pydantic import BaseModel

from spaces.actions import run_action


class Request(BaseModel):
    reference: str = ""
    brand: str = ""


class HistoryItem(BaseModel):
    id: str
    date: str
    price: Optional[float]
    original_price: Optional[float]
    seller: str
    condition: Optional[str]
    contents: Optional[str]
    group_name: str
    sold: bool
    post_url: str


class Response(BaseModel):
    reference: str
    brand: str
    model: str
    total_listings: int
    avg_price: Optional[float]
    min_price: Optional[float]
    max_price: Optional[float]
    median_price: Optional[float]
    active_count: int
    sold_count: int
    history: List[HistoryItem]


def _get_db(path: str) -> sqlite3.Connection:
    db = sqlite3.connect(path)
    db.row_factory = sqlite3.Row
    return db


async def main(ctx, request: Request) -> Response:
    db = _get_db(ctx.app_db_path())

    where = "reference = ?"
    params: list[object] = [request.reference]
    if request.brand:
        where += " AND brand = ?"
        params.append(request.brand)

    rows = db.execute(
        f"""SELECT id, date, price, original_price, seller, condition, contents,
            group_name, sold, post_url, brand, model
            FROM listings WHERE {where} ORDER BY date DESC, scraped_at DESC""",
        params,
    ).fetchall()

    if not rows:
        db.close()
        return Response(
            reference=request.reference, brand=request.brand, model="",
            total_listings=0, avg_price=None, min_price=None, max_price=None,
            median_price=None, active_count=0, sold_count=0, history=[],
        )

    brand = rows[0]["brand"] or request.brand
    model = rows[0]["model"] or ""

    # Collect prices: prefer original_price for sold items, else price
    prices: list[float] = []
    for r in rows:
        p = r["original_price"] or r["price"]
        if p and p > 0:
            prices.append(p)
    prices.sort()

    avg_p = sum(prices) / len(prices) if prices else None
    min_p = prices[0] if prices else None
    max_p = prices[-1] if prices else None
    med_p = prices[len(prices) // 2] if prices else None

    active = sum(1 for r in rows if not r["sold"])
    sold = sum(1 for r in rows if r["sold"])

    history = [
        HistoryItem(
            id=r["id"], date=r["date"] or "",
            price=r["price"], original_price=r["original_price"],
            seller=r["seller"] or "unknown",
            condition=r["condition"], contents=r["contents"],
            group_name=r["group_name"] or "", sold=bool(r["sold"]),
            post_url=r["post_url"] or "",
        )
        for r in rows
    ]

    db.close()

    return Response(
        reference=request.reference, brand=brand, model=model,
        total_listings=len(rows),
        avg_price=round(avg_p, 2) if avg_p else None,
        min_price=min_p, max_price=max_p, median_price=med_p,
        active_count=active, sold_count=sold, history=history,
    )


if __name__ == "__main__":
    raise SystemExit(run_action(main))

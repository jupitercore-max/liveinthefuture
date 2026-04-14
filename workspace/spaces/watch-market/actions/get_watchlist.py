#!/usr/bin/env python3
"""Watchlist tracker for Ray's target watches."""
import sqlite3
from typing import List, Optional

from pydantic import BaseModel

from spaces.actions import run_action

WATCHLIST = [
    {"name": "Rolex Milgauss", "ref": "116400GV", "note": "Blue dial only, green sapphire crystal",
     "keywords": ["116400GV", "Milgauss"], "must_contain": "blue"},
    {"name": "Rolex Yacht-Master II", "ref": "116689", "note": "18K white gold/platinum",
     "keywords": ["116689", "Yacht-Master II", "YM2", "YMII"], "must_contain": ""},
    {"name": "Hublot Square Bang Magic Gold", "ref": "821.MX.0130.RX", "note": "42mm, limited 200 pieces",
     "keywords": ["821.MX.0130", "Square Bang"], "must_contain": ""},
    {"name": "Hublot Square Bang Rainbow", "ref": "821.NX.0117.LR.0999", "note": "42mm titanium",
     "keywords": ["821.NX.0117", "Square Bang"], "must_contain": ""},
    {"name": "Patek Philippe Titanium", "ref": "Any", "note": "Any Patek in titanium",
     "keywords": ["Patek"], "must_contain": "titanium"},
]


class Request(BaseModel):
    pass


class WatchMatch(BaseModel):
    listing_id: str
    date: str
    price: Optional[float]
    seller: str
    group_name: str
    condition: Optional[str]
    contents: Optional[str]
    sold: bool
    post_url: str
    raw_text: str


class WatchTarget(BaseModel):
    name: str
    ref: str
    note: str
    matches: List[WatchMatch]
    lowest_price: Optional[float]
    highest_price: Optional[float]
    avg_price: Optional[float]
    last_seen: Optional[str]


class Response(BaseModel):
    targets: List[WatchTarget]


def _get_db(path: str) -> sqlite3.Connection:
    db = sqlite3.connect(path)
    db.row_factory = sqlite3.Row
    return db


async def main(ctx, request: Request) -> Response:
    db = _get_db(ctx.app_db_path())
    targets: List[WatchTarget] = []

    for watch in WATCHLIST:
        conditions: List[str] = []
        params: List[str] = []
        for kw in watch["keywords"]:
            conditions.append("(reference LIKE ? OR model LIKE ? OR raw_text LIKE ? OR brand LIKE ?)")
            pat = f"%{kw}%"
            params.extend([pat, pat, pat, pat])

        where = " OR ".join(conditions) if conditions else "1=0"
        rows = db.execute(
            f"SELECT * FROM listings WHERE ({where}) ORDER BY date DESC", params
        ).fetchall()

        must = str(watch.get("must_contain", ""))
        matches: List[WatchMatch] = []
        for r in rows:
            if must:
                text = (r["raw_text"] or "").lower() + " " + (r["model"] or "").lower()
                if must.lower() not in text:
                    continue
            matches.append(WatchMatch(
                listing_id=r["id"], date=r["date"] or "",
                price=r["price"], seller=r["seller"] or "unknown",
                group_name=r["group_name"] or "", condition=r["condition"],
                contents=r["contents"], sold=bool(r["sold"]),
                post_url=r["post_url"] or "", raw_text=(r["raw_text"] or "")[:300],
            ))

        prices = [m.price for m in matches if m.price and m.price > 0]
        targets.append(WatchTarget(
            name=str(watch["name"]), ref=str(watch["ref"]), note=str(watch["note"]),
            matches=matches,
            lowest_price=min(prices) if prices else None,
            highest_price=max(prices) if prices else None,
            avg_price=round(sum(prices) / len(prices), 2) if prices else None,
            last_seen=matches[0].date if matches else None,
        ))

    db.close()
    return Response(targets=targets)


if __name__ == "__main__":
    raise SystemExit(run_action(main))

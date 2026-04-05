#!/usr/bin/env python3
import sqlite3
import time

from pathlib import Path

from pydantic import BaseModel

from spaces.actions import ActionContext, run_action


class Request(BaseModel):
    range_hours: int = 1  # 1, 6, or 24


class HistoryPoint(BaseModel):
    ts: int
    cpu: float
    mem: float
    disk: float
    net_rx: int
    net_tx: int
    load_1m: float
    load_5m: float
    load_15m: float


class Response(BaseModel):
    points: list[HistoryPoint]
    range_hours: int
    point_count: int


def init_db(db_path: Path | str) -> None:
    conn = sqlite3.connect(str(db_path))
    conn.execute("""
        CREATE TABLE IF NOT EXISTS metrics_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ts INTEGER NOT NULL,
            cpu_percent REAL NOT NULL,
            mem_percent REAL NOT NULL,
            mem_used_gb REAL NOT NULL,
            mem_total_gb REAL NOT NULL,
            disk_percent REAL NOT NULL,
            net_rx_bytes INTEGER NOT NULL DEFAULT 0,
            net_tx_bytes INTEGER NOT NULL DEFAULT 0,
            load_1m REAL NOT NULL DEFAULT 0,
            load_5m REAL NOT NULL DEFAULT 0,
            load_15m REAL NOT NULL DEFAULT 0
        )
    """)
    conn.execute("""
        CREATE INDEX IF NOT EXISTS idx_metrics_ts ON metrics_history(ts)
    """)
    conn.commit()
    conn.close()


async def main(ctx: ActionContext, request: Request) -> Response:
    db_path = ctx.app_db_path()
    init_db(db_path)

    now_ms = int(time.time() * 1000)
    cutoff = now_ms - (request.range_hours * 60 * 60 * 1000)

    conn = sqlite3.connect(str(db_path))
    conn.row_factory = sqlite3.Row
    rows = conn.execute("""
        SELECT ts, cpu_percent, mem_percent, disk_percent,
               net_rx_bytes, net_tx_bytes, load_1m, load_5m, load_15m
        FROM metrics_history
        WHERE ts >= ?
        ORDER BY ts ASC
    """, (cutoff,)).fetchall()
    conn.close()

    points = [
        HistoryPoint(
            ts=row["ts"],
            cpu=round(row["cpu_percent"], 1),
            mem=round(row["mem_percent"], 1),
            disk=round(row["disk_percent"], 1),
            net_rx=row["net_rx_bytes"],
            net_tx=row["net_tx_bytes"],
            load_1m=round(row["load_1m"], 2),
            load_5m=round(row["load_5m"], 2),
            load_15m=round(row["load_15m"], 2),
        )
        for row in rows
    ]

    # Downsample if too many points (target ~200 max for smooth charts)
    max_points = 200
    if len(points) > max_points:
        step = len(points) / max_points
        sampled: list[HistoryPoint] = []
        i = 0.0
        while i < len(points):
            sampled.append(points[int(i)])
            i += step
        # Always include the last point
        if sampled[-1].ts != points[-1].ts:
            sampled.append(points[-1])
        points = sampled

    return Response(
        points=points,
        range_hours=request.range_hours,
        point_count=len(points),
    )


if __name__ == "__main__":
    raise SystemExit(run_action(main))

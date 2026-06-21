#!/usr/bin/env python3
"""Standalone collector script for cron-based metric collection.
Reads system metrics and stores them in app.db.
Can be run independently of the space UI."""

import os
import sqlite3
import time


DB_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "..", "app.db")


def init_db() -> None:
    conn = sqlite3.connect(DB_PATH)
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
    conn.execute("CREATE INDEX IF NOT EXISTS idx_metrics_ts ON metrics_history(ts)")
    conn.commit()
    conn.close()


def collect_cpu() -> tuple[float, float, float, float]:
    with open("/proc/loadavg") as f:
        parts = f.read().split()
    load_1m = float(parts[0])
    load_5m = float(parts[1])
    load_15m = float(parts[2])

    with open("/proc/stat") as f:
        line = f.readline()
    vals = [int(x) for x in line.split()[1:]]
    idle = vals[3] + (vals[4] if len(vals) > 4 else 0)
    total = sum(vals)
    usage = ((total - idle) / total * 100) if total > 0 else 0
    return round(usage, 1), round(load_1m, 2), round(load_5m, 2), round(load_15m, 2)


def collect_memory() -> tuple[float, float, float]:
    info: dict[str, float] = {}
    with open("/proc/meminfo") as f:
        for line in f:
            parts = line.split()
            key = parts[0].rstrip(":")
            val = int(parts[1]) / (1024 * 1024)
            info[key] = val
    total = info.get("MemTotal", 0)
    free = info.get("MemFree", 0)
    cached = info.get("Cached", 0)
    buffers = info.get("Buffers", 0)
    used = total - free - cached - buffers
    pct = (used / total * 100) if total > 0 else 0
    return round(pct, 1), round(used, 2), round(total, 2)


def collect_disk() -> float:
    import subprocess
    result = subprocess.run(
        ["df", "-h", "--output=source,pcent"],
        capture_output=True, text=True
    )
    max_pct = 0.0
    for line in result.stdout.strip().split("\n")[1:]:
        parts = line.split()
        if len(parts) >= 2 and not parts[0].startswith("tmpfs") and not parts[0].startswith("overlay"):
            try:
                pct = float(parts[1].rstrip("%"))
                max_pct = max(max_pct, pct)
            except ValueError:
                pass
    return max_pct


def collect_network() -> tuple[int, int]:
    total_rx = 0
    total_tx = 0
    with open("/proc/net/dev") as f:
        for line in f:
            if ":" not in line:
                continue
            name, data = line.split(":")
            name = name.strip()
            if name == "lo":
                continue
            vals = data.split()
            total_rx += int(vals[0])
            total_tx += int(vals[8])
    return total_rx, total_tx


def store() -> None:
    init_db()
    cpu_pct, load_1m, load_5m, load_15m = collect_cpu()
    mem_pct, mem_used, mem_total = collect_memory()
    disk_pct = collect_disk()
    net_rx, net_tx = collect_network()

    ts = int(time.time() * 1000)

    conn = sqlite3.connect(DB_PATH)
    conn.execute("""
        INSERT INTO metrics_history (ts, cpu_percent, mem_percent, mem_used_gb,
            mem_total_gb, disk_percent, net_rx_bytes, net_tx_bytes,
            load_1m, load_5m, load_15m)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (ts, cpu_pct, mem_pct, mem_used, mem_total, disk_pct, net_rx, net_tx,
          load_1m, load_5m, load_15m))

    # Prune entries older than 24 hours
    cutoff = ts - (24 * 60 * 60 * 1000)
    conn.execute("DELETE FROM metrics_history WHERE ts < ?", (cutoff,))
    conn.commit()

    count = conn.execute("SELECT COUNT(*) FROM metrics_history").fetchone()[0]
    conn.close()
    print(f"Collected metric at {ts}, total points: {count}")


if __name__ == "__main__":
    store()

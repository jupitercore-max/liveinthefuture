#!/usr/bin/env python3
"""Smoke tests for system monitor actions."""
import json
import os
import sqlite3
import subprocess
import sys
import tempfile

SPACE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VENV_PYTHON = os.path.join(os.environ.get("JARVIS_HOME", "/home/hatch"), "workspace", "spaces", ".venv", "bin", "python3")


def test_collector():
    """Test that the collector script runs and populates the DB."""
    print("Testing collector script...")
    result = subprocess.run(
        [sys.executable, os.path.join(SPACE_DIR, "jobs", "collect_metrics.py")],
        capture_output=True, text=True
    )
    assert result.returncode == 0, f"Collector failed: {result.stderr}"
    assert "Collected metric" in result.stdout, f"Unexpected output: {result.stdout}"

    # Verify DB has data
    db_path = os.path.join(SPACE_DIR, "..", "app.db")
    conn = sqlite3.connect(db_path)
    count = conn.execute("SELECT COUNT(*) FROM metrics_history").fetchone()[0]
    conn.close()
    assert count > 0, "No metrics in DB after collection"
    print(f"  OK - {count} data points in DB")


def test_db_schema():
    """Test that the DB schema has all expected columns."""
    print("Testing DB schema...")
    db_path = os.path.join(SPACE_DIR, "..", "app.db")
    conn = sqlite3.connect(db_path)
    cursor = conn.execute("PRAGMA table_info(metrics_history)")
    columns = {row[1] for row in cursor.fetchall()}
    conn.close()

    expected = {"id", "ts", "cpu_percent", "mem_percent", "mem_used_gb",
                "mem_total_gb", "disk_percent", "net_rx_bytes", "net_tx_bytes",
                "load_1m", "load_5m", "load_15m"}
    missing = expected - columns
    assert not missing, f"Missing columns: {missing}"
    print(f"  OK - all {len(expected)} columns present")


if __name__ == "__main__":
    test_collector()
    test_db_schema()
    print("\nAll smoke tests passed!")

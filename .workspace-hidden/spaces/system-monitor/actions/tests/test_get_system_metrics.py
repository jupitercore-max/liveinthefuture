import subprocess
import json


def test_get_system_metrics():
    result = subprocess.run(
        ["python3", "actions/get_system_metrics.py"],
        input=json.dumps({}),
        capture_output=True,
        text=True,
        cwd="/home/hatch/workspace/spaces/system-monitor",
    )
    assert result.returncode == 0, f"Action failed: {result.stderr}"
    data = json.loads(result.stdout)

    # CPU checks
    assert "cpu" in data
    assert data["cpu"]["cpu_count"] > 0
    assert isinstance(data["cpu"]["usage_percent"], (int, float))
    assert isinstance(data["cpu"]["load_1m"], (int, float))

    # Memory checks
    assert "memory" in data
    assert data["memory"]["total_gb"] > 0
    assert isinstance(data["memory"]["usage_percent"], (int, float))

    # Disk checks
    assert "disks" in data
    assert isinstance(data["disks"], list)

    # Network checks
    assert "network" in data
    assert isinstance(data["network"], list)

    # Process checks
    assert "top_cpu_processes" in data
    assert "top_mem_processes" in data
    assert isinstance(data["top_cpu_processes"], list)

    # Uptime
    assert data["uptime_seconds"] > 0
    assert len(data["uptime_human"]) > 0

    # Health
    assert data["health"] in ("healthy", "warning", "critical")

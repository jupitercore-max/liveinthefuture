#!/usr/bin/env python3
"""Smoke test for get_cron_jobs action."""

import asyncio
import json
import sys
import os

# Add paths for spaces SDK
sys.path.insert(0, os.path.join(os.environ.get("JARVIS_HOME", os.path.expanduser("~")), "skills", "spaces", "python"))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from get_cron_jobs import main, Request


class FakeCtx:
    def app_db_path(self) -> str:
        return os.path.join(os.environ.get("JARVIS_HOME", os.path.expanduser("~")), "workspace", "spaces", "cron-dashboard", "app.db")


async def test_get_cron_jobs() -> None:
    ctx = FakeCtx()
    request = Request()
    response = await main(ctx, request)

    # Check response shape
    assert hasattr(response, "jobs"), "Response missing 'jobs'"
    assert hasattr(response, "total"), "Response missing 'total'"
    assert hasattr(response, "active"), "Response missing 'active'"
    assert hasattr(response, "disabled"), "Response missing 'disabled'"

    # Should find actual cron jobs
    assert response.total > 0, f"Expected jobs, got {response.total}"
    assert response.active + response.disabled == response.total, "active + disabled != total"

    # Validate job structure
    for job in response.jobs:
        assert job.id, f"Job missing id"
        assert job.mode in ("task", "heartbeat"), f"Unexpected mode: {job.mode}"
        assert job.cadence_group in ("minutely", "hourly", "daily", "weekly"), f"Unexpected cadence: {job.cadence_group}"
        assert job.schedule_display, f"Job {job.id} missing schedule_display"
        assert job.file_path, f"Job {job.id} missing file_path"

    # Check some known jobs exist
    job_ids = {j.id for j in response.jobs}
    assert "heartbeat" in job_ids, "Expected 'heartbeat' job not found"

    print(f"✅ Smoke test passed: {response.total} jobs ({response.active} active, {response.disabled} disabled)")
    print(f"   Cadence groups: {sorted(set(j.cadence_group for j in response.jobs))}")
    print(f"   Sample jobs: {[j.id for j in response.jobs[:5]]}")


if __name__ == "__main__":
    asyncio.run(test_get_cron_jobs())

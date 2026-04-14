#!/usr/bin/env python3
"""Take a screenshot of the current browser state."""

import os
import shutil
import time
from pathlib import Path
from pydantic import BaseModel
from spaces.actions import run_action


class Request(BaseModel):
    pass


class Response(BaseModel):
    ok: bool
    image_url: str = ""
    url: str = ""
    title: str = ""
    timestamp: float = 0
    error: str = ""


SCREENSHOT_PATH = "/tmp/rb-screenshot.png"
BROWSER_CLI = shutil.which("browser") or "browser"


async def main(ctx, request: Request) -> Response:
    import asyncio
    import json

    # Take screenshot
    proc = await asyncio.create_subprocess_exec(
        BROWSER_CLI, "screenshot", "--output", SCREENSHOT_PATH,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )
    try:
        stdout, stderr = await asyncio.wait_for(proc.communicate(), timeout=15)
    except asyncio.TimeoutError:
        proc.kill()
        return Response(ok=False, error="Screenshot timed out")

    if proc.returncode != 0:
        return Response(ok=False, error=stderr.decode()[:200])

    path = Path(SCREENSHOT_PATH)
    if not path.exists():
        return Response(ok=False, error="Screenshot file not created")

    # Copy to space assets dir for serving
    assets_dir = Path(ctx.space_root_path()) / ".space-build" / "assets"
    assets_dir.mkdir(parents=True, exist_ok=True)
    ts = int(time.time() * 1000)
    dest = assets_dir / f"screenshot-{ts}.png"
    shutil.copy2(SCREENSHOT_PATH, dest)

    # Get page info
    info_proc = await asyncio.create_subprocess_exec(
        BROWSER_CLI, "info",
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )
    info_stdout, _ = await asyncio.wait_for(info_proc.communicate(), timeout=5)
    try:
        info = json.loads(info_stdout.decode())
    except Exception:
        info = {}

    return Response(
        ok=True,
        image_url=f"/assets/screenshot-{ts}.png",
        url=info.get("url", ""),
        title=info.get("title", ""),
        timestamp=time.time(),
    )


if __name__ == "__main__":
    raise SystemExit(run_action(main))

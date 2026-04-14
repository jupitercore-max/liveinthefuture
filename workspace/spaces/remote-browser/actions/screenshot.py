#!/usr/bin/env python3
"""Take a screenshot of the current browser state and return as base64."""

import base64
import shutil
import time
from pathlib import Path
from pydantic import BaseModel
from spaces.actions import run_action

BROWSER_CLI = shutil.which("browser") or "browser"
SCREENSHOT_PATH = "/tmp/rb-screenshot.png"


class Request(BaseModel):
    pass


class Response(BaseModel):
    ok: bool
    image_base64: str = ""
    url: str = ""
    title: str = ""
    timestamp: float = 0
    error: str = ""


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

    # Read and encode as base64
    image_data = path.read_bytes()
    image_b64 = base64.b64encode(image_data).decode("ascii")

    # Get page info
    info_proc = await asyncio.create_subprocess_exec(
        BROWSER_CLI, "info",
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )
    try:
        info_stdout, _ = await asyncio.wait_for(info_proc.communicate(), timeout=5)
        info = json.loads(info_stdout.decode())
    except Exception:
        info = {}

    return Response(
        ok=True,
        image_base64=image_b64,
        url=info.get("url", ""),
        title=info.get("title", ""),
        timestamp=time.time(),
    )


if __name__ == "__main__":
    raise SystemExit(run_action(main))

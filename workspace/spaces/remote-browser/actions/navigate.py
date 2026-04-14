#!/usr/bin/env python3
"""Navigate the browser to a URL."""

import shutil
from pydantic import BaseModel
from spaces.actions import run_action

BROWSER_CLI = shutil.which("browser") or "browser"


class Request(BaseModel):
    url: str


class Response(BaseModel):
    ok: bool
    url: str = ""
    title: str = ""
    error: str = ""


async def main(ctx, request: Request) -> Response:
    import asyncio
    import json

    url = request.url
    if not url.startswith("http"):
        url = "https://" + url

    proc = await asyncio.create_subprocess_exec(
        BROWSER_CLI, "navigate", "--url", url,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )
    try:
        stdout, stderr = await asyncio.wait_for(proc.communicate(), timeout=30)
    except asyncio.TimeoutError:
        proc.kill()
        return Response(ok=False, error="Navigation timed out")

    if proc.returncode != 0:
        return Response(ok=False, error=stderr.decode()[:200])

    try:
        data = json.loads(stdout.decode())
    except Exception:
        data = {}

    return Response(
        ok=True,
        url=data.get("url", url),
        title=data.get("title", ""),
    )


if __name__ == "__main__":
    raise SystemExit(run_action(main))

#!/usr/bin/env python3
"""Scroll the browser page."""

import shutil
from pydantic import BaseModel
from spaces.actions import run_action

BROWSER_CLI = shutil.which("browser") or "browser"


class Request(BaseModel):
    direction: str = "down"  # "up" or "down"
    amount: int = 500  # pixels


class Response(BaseModel):
    ok: bool
    error: str = ""


async def main(ctx, request: Request) -> Response:
    import asyncio

    delta = request.amount if request.direction == "down" else -request.amount
    js = f"window.scrollBy(0, {delta}); 'scrolled {delta}px'"

    proc = await asyncio.create_subprocess_exec(
        BROWSER_CLI, "evaluate", "--expression", js,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )
    try:
        stdout, stderr = await asyncio.wait_for(proc.communicate(), timeout=10)
    except asyncio.TimeoutError:
        proc.kill()
        return Response(ok=False, error="Scroll timed out")

    if proc.returncode != 0:
        return Response(ok=False, error=stderr.decode()[:200])

    return Response(ok=True)


if __name__ == "__main__":
    raise SystemExit(run_action(main))

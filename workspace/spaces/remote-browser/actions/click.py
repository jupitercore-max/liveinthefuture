#!/usr/bin/env python3
"""Click at coordinates in the browser viewport using browser CLI."""

import shutil
from pydantic import BaseModel
from spaces.actions import run_action

BROWSER_CLI = shutil.which("browser") or "browser"


class Request(BaseModel):
    x: int
    y: int


class Response(BaseModel):
    ok: bool
    error: str = ""


async def main(ctx, request: Request) -> Response:
    import asyncio
    import json

    # Use browser evaluate to dispatch mouse events via CDP
    # This is more reliable than document.elementFromPoint
    js = f"""(function() {{
        const x = {request.x};
        const y = {request.y};
        const el = document.elementFromPoint(x, y);
        if (el) {{
            // Focus if it's an input
            if (['INPUT','TEXTAREA','SELECT'].includes(el.tagName)) el.focus();
            // Dispatch proper mouse events
            ['pointerdown','mousedown','pointerup','mouseup','click'].forEach(type => {{
                el.dispatchEvent(new PointerEvent(type, {{
                    bubbles: true, cancelable: true, view: window,
                    clientX: x, clientY: y, screenX: x, screenY: y,
                    pointerId: 1, pointerType: 'mouse', button: 0, buttons: type.includes('down') ? 1 : 0
                }}));
            }});
            return 'clicked:' + el.tagName;
        }}
        return 'miss';
    }})()"""

    proc = await asyncio.create_subprocess_exec(
        BROWSER_CLI, "evaluate", "--expression", js,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )
    try:
        stdout, stderr = await asyncio.wait_for(proc.communicate(), timeout=10)
    except asyncio.TimeoutError:
        proc.kill()
        return Response(ok=False, error="Click timed out")

    if proc.returncode != 0:
        return Response(ok=False, error=stderr.decode()[:200])

    return Response(ok=True)


if __name__ == "__main__":
    raise SystemExit(run_action(main))

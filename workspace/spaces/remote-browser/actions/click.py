#!/usr/bin/env python3
"""Click at coordinates in the browser viewport."""

import shutil
from pydantic import BaseModel
from spaces.actions import run_action

BROWSER_CLI = shutil.which("browser") or "browser"


class Request(BaseModel):
    x: int
    y: int
    viewport_width: int = 1280
    viewport_height: int = 720


class Response(BaseModel):
    ok: bool
    error: str = ""


async def main(ctx, request: Request) -> Response:
    import asyncio

    # Use CDP Input.dispatchMouseEvent for precise clicking
    js = f"""
    (async () => {{
        // Use CDP to dispatch mouse events at exact coordinates
        const x = {request.x};
        const y = {request.y};
        
        // Find element at coordinates and click it
        const el = document.elementFromPoint(x, y);
        if (el) {{
            // Scroll element into view if needed
            el.scrollIntoView({{block: 'nearest'}});
            
            // Create and dispatch mouse events
            const events = ['mousedown', 'mouseup', 'click'];
            for (const type of events) {{
                const evt = new MouseEvent(type, {{
                    bubbles: true,
                    cancelable: true,
                    view: window,
                    clientX: x,
                    clientY: y,
                    button: 0,
                }});
                el.dispatchEvent(evt);
            }}
            
            // Also try focus + click for input elements
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {{
                el.focus();
            }}
            
            'clicked: ' + el.tagName + (el.id ? '#' + el.id : '') + (el.className ? '.' + String(el.className).split(' ')[0] : '');
        }} else {{
            'no element at coordinates';
        }}
    }})()
    """

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

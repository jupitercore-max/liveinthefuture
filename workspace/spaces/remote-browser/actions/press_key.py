#!/usr/bin/env python3
"""Send a special key press (Enter, Tab, Escape, Backspace, etc.)."""

import shutil
from pydantic import BaseModel
from spaces.actions import run_action

BROWSER_CLI = shutil.which("browser") or "browser"

KEY_MAP = {
    "Enter": "Enter",
    "Tab": "Tab",
    "Escape": "Escape",
    "Backspace": "Backspace",
    "Delete": "Delete",
    "ArrowUp": "ArrowUp",
    "ArrowDown": "ArrowDown",
    "ArrowLeft": "ArrowLeft",
    "ArrowRight": "ArrowRight",
    "Space": " ",
}


class Request(BaseModel):
    key: str


class Response(BaseModel):
    ok: bool
    error: str = ""


async def main(ctx, request: Request) -> Response:
    import asyncio
    import json

    key = KEY_MAP.get(request.key, request.key)
    key_code = {
        "Enter": 13, "Tab": 9, "Escape": 27, "Backspace": 8,
        "Delete": 46, "ArrowUp": 38, "ArrowDown": 40,
        "ArrowLeft": 37, "ArrowRight": 39, " ": 32,
    }.get(key, 0)

    js = f"""
    (function() {{
        const el = document.activeElement || document.body;
        const key = {json.dumps(key)};
        const keyCode = {key_code};
        
        ['keydown', 'keypress', 'keyup'].forEach(type => {{
            el.dispatchEvent(new KeyboardEvent(type, {{
                key: key,
                code: key,
                keyCode: keyCode,
                which: keyCode,
                bubbles: true,
                cancelable: true,
            }}));
        }});
        
        // For Enter, also submit form if in a form
        if (key === 'Enter' && el.form) {{
            el.form.requestSubmit ? el.form.requestSubmit() : el.form.submit();
        }}
        
        // For Backspace, delete last char
        if (key === 'Backspace' && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')) {{
            const nativeSetter = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype, 'value'
            ).set;
            if (nativeSetter) {{
                nativeSetter.call(el, el.value.slice(0, -1));
                el.dispatchEvent(new Event('input', {{ bubbles: true }}));
                el.dispatchEvent(new Event('change', {{ bubbles: true }}));
            }}
        }}
        
        return 'pressed: ' + key;
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
        return Response(ok=False, error="Key press timed out")

    if proc.returncode != 0:
        return Response(ok=False, error=stderr.decode()[:200])

    return Response(ok=True)


if __name__ == "__main__":
    raise SystemExit(run_action(main))

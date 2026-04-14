#!/usr/bin/env python3
"""Type text into the focused element, React-compatible."""

import shutil
from pydantic import BaseModel
from spaces.actions import run_action

BROWSER_CLI = shutil.which("browser") or "browser"


class Request(BaseModel):
    text: str
    clear_first: bool = True
    use_react_trick: bool = True


class Response(BaseModel):
    ok: bool
    error: str = ""


async def main(ctx, request: Request) -> Response:
    import asyncio
    import json

    text_escaped = json.dumps(request.text)

    if request.use_react_trick:
        # React-compatible: use nativeInputValueSetter to trigger React onChange
        js = f"""
        (function() {{
            const el = document.activeElement;
            if (!el || (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA' && !el.isContentEditable)) {{
                return 'no focused input element';
            }}
            
            if (el.isContentEditable) {{
                if ({json.dumps(request.clear_first)}) el.textContent = '';
                el.textContent += {text_escaped};
                el.dispatchEvent(new Event('input', {{ bubbles: true }}));
                return 'typed via contentEditable';
            }}
            
            const nativeSetter = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype, 'value'
            ).set || Object.getOwnPropertyDescriptor(
                window.HTMLTextAreaElement.prototype, 'value'
            ).set;
            
            if ({json.dumps(request.clear_first)}) {{
                nativeSetter.call(el, {text_escaped});
            }} else {{
                nativeSetter.call(el, el.value + {text_escaped});
            }}
            
            el.dispatchEvent(new Event('input', {{ bubbles: true }}));
            el.dispatchEvent(new Event('change', {{ bubbles: true }}));
            
            return 'typed: ' + el.value.substring(0, 50);
        }})()
        """
    else:
        # Simple approach for non-React sites
        js = f"""
        (function() {{
            const el = document.activeElement;
            if (!el) return 'no focused element';
            if ({json.dumps(request.clear_first)}) el.value = '';
            el.value += {text_escaped};
            el.dispatchEvent(new Event('input', {{ bubbles: true }}));
            el.dispatchEvent(new Event('change', {{ bubbles: true }}));
            return 'typed: ' + el.value.substring(0, 50);
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
        return Response(ok=False, error="Type timed out")

    if proc.returncode != 0:
        err = stderr.decode()[:200]
        return Response(ok=False, error=err)

    return Response(ok=True)


if __name__ == "__main__":
    raise SystemExit(run_action(main))

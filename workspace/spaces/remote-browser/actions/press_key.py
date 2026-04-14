#!/usr/bin/env python3
"""Press special keys via CDP Input.dispatchKeyEvent."""

import asyncio
import json
from pydantic import BaseModel
from spaces.actions import run_action

import websockets

CDP_PORT = 9224

# Map key names to CDP key event params
KEY_MAP: dict[str, dict] = {
    "Enter":     {"key": "Enter", "code": "Enter", "windowsVirtualKeyCode": 13},
    "Tab":       {"key": "Tab", "code": "Tab", "windowsVirtualKeyCode": 9},
    "Escape":    {"key": "Escape", "code": "Escape", "windowsVirtualKeyCode": 27},
    "Backspace": {"key": "Backspace", "code": "Backspace", "windowsVirtualKeyCode": 8},
    "Delete":    {"key": "Delete", "code": "Delete", "windowsVirtualKeyCode": 46},
    "ArrowUp":   {"key": "ArrowUp", "code": "ArrowUp", "windowsVirtualKeyCode": 38},
    "ArrowDown": {"key": "ArrowDown", "code": "ArrowDown", "windowsVirtualKeyCode": 40},
    "ArrowLeft": {"key": "ArrowLeft", "code": "ArrowLeft", "windowsVirtualKeyCode": 37},
    "ArrowRight":{"key": "ArrowRight", "code": "ArrowRight", "windowsVirtualKeyCode": 39},
    "Space":     {"key": " ", "code": "Space", "windowsVirtualKeyCode": 32, "text": " "},
}


class Request(BaseModel):
    key: str


class Response(BaseModel):
    ok: bool
    error: str = ""


async def main(ctx, request: Request) -> Response:
    import urllib.request

    key_params = KEY_MAP.get(request.key)
    if not key_params:
        return Response(ok=False, error=f"Unknown key: {request.key}")
    
    try:
        resp = urllib.request.urlopen(f"http://localhost:{CDP_PORT}/json")
        targets = json.loads(resp.read())
        page = next((t for t in targets if t["type"] == "page"), None)
        if not page:
            return Response(ok=False, error="No page target")
        
        ws_url = page["webSocketDebuggerUrl"]
        
        async with websockets.connect(ws_url, max_size=10 * 1024 * 1024) as ws:
            # keyDown
            down_params = {"type": "keyDown", **key_params}
            await ws.send(json.dumps({"id": 1, "method": "Input.dispatchKeyEvent", "params": down_params}))
            await asyncio.wait_for(ws.recv(), timeout=5)
            
            # keyUp
            up_params = {"type": "keyUp", "key": key_params["key"], "code": key_params.get("code", "")}
            await ws.send(json.dumps({"id": 2, "method": "Input.dispatchKeyEvent", "params": up_params}))
            await asyncio.wait_for(ws.recv(), timeout=5)
        
        return Response(ok=True)
    except Exception as e:
        return Response(ok=False, error=str(e)[:300])


if __name__ == "__main__":
    raise SystemExit(run_action(main))

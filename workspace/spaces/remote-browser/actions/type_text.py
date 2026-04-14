#!/usr/bin/env python3
"""Type text via CDP Input.dispatchKeyEvent — works on ALL sites including React."""

import asyncio
import json
from pydantic import BaseModel
from spaces.actions import run_action

import websockets


CDP_PORT = 9224


class Request(BaseModel):
    text: str
    clear_first: bool = False


class Response(BaseModel):
    ok: bool
    error: str = ""


async def main(ctx, request: Request) -> Response:
    import urllib.request
    
    try:
        resp = urllib.request.urlopen(f"http://localhost:{CDP_PORT}/json")
        targets = json.loads(resp.read())
        page = next((t for t in targets if t["type"] == "page"), None)
        if not page:
            return Response(ok=False, error="No page target")
        
        ws_url = page["webSocketDebuggerUrl"]
        msg_id = 1
        
        async with websockets.connect(ws_url, max_size=10 * 1024 * 1024) as ws:
            async def send_and_wait(method: str, params: dict) -> None:
                nonlocal msg_id
                await ws.send(json.dumps({"id": msg_id, "method": method, "params": params}))
                deadline = asyncio.get_event_loop().time() + 5
                while True:
                    remaining = deadline - asyncio.get_event_loop().time()
                    if remaining <= 0:
                        break
                    raw = await asyncio.wait_for(ws.recv(), timeout=remaining)
                    data = json.loads(raw)
                    if data.get("id") == msg_id:
                        break
                msg_id += 1
            
            # Clear field first if requested
            if request.clear_first:
                await send_and_wait("Input.dispatchKeyEvent", {
                    "type": "keyDown", "key": "a",
                    "code": "KeyA", "windowsVirtualKeyCode": 65,
                    "modifiers": 2,  # Ctrl
                })
                await send_and_wait("Input.dispatchKeyEvent", {"type": "keyUp", "key": "a", "code": "KeyA"})
                await send_and_wait("Input.dispatchKeyEvent", {
                    "type": "keyDown", "key": "Backspace",
                    "code": "Backspace", "windowsVirtualKeyCode": 8,
                })
                await send_and_wait("Input.dispatchKeyEvent", {"type": "keyUp", "key": "Backspace", "code": "Backspace"})
            
            # Type each character
            for char in request.text:
                await send_and_wait("Input.dispatchKeyEvent", {
                    "type": "keyDown",
                    "text": char,
                    "key": char,
                    "unmodifiedText": char,
                })
                await send_and_wait("Input.dispatchKeyEvent", {
                    "type": "keyUp",
                    "key": char,
                })
        
        return Response(ok=True)
    except Exception as e:
        return Response(ok=False, error=str(e)[:300])


if __name__ == "__main__":
    raise SystemExit(run_action(main))

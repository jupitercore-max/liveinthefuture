"""Shared CDP (Chrome DevTools Protocol) helper for Remote Browser actions."""

import json
import asyncio
import urllib.request
from typing import Any

import websockets

CDP_PORT = 9224


async def get_page_ws_url() -> str:
    """Get the WebSocket URL for the first page target."""
    resp = urllib.request.urlopen(f"http://localhost:{CDP_PORT}/json")
    targets = json.loads(resp.read())
    page = next((t for t in targets if t["type"] == "page"), None)
    if not page:
        raise RuntimeError("No page target found in Chrome")
    return page["webSocketDebuggerUrl"]


async def cdp_call(method: str, params: dict[str, Any] | None = None, timeout: float = 15.0) -> dict[str, Any]:
    """Make a single CDP call and return the result."""
    ws_url = await get_page_ws_url()
    async with websockets.connect(ws_url, max_size=50 * 1024 * 1024) as ws:
        msg: dict[str, Any] = {"id": 1, "method": method}
        if params:
            msg["params"] = params
        await ws.send(json.dumps(msg))
        
        # Wait for response with matching id
        deadline = asyncio.get_event_loop().time() + timeout
        while True:
            remaining = deadline - asyncio.get_event_loop().time()
            if remaining <= 0:
                raise TimeoutError(f"CDP call {method} timed out")
            raw = await asyncio.wait_for(ws.recv(), timeout=remaining)
            data = json.loads(raw)
            if data.get("id") == 1:
                if "error" in data:
                    raise RuntimeError(f"CDP error: {data['error'].get('message', str(data['error']))}")
                return data.get("result", {})


async def cdp_multi(calls: list[tuple[str, dict[str, Any] | None]], timeout: float = 15.0) -> list[dict[str, Any]]:
    """Make multiple sequential CDP calls on one connection and return results."""
    ws_url = await get_page_ws_url()
    results: list[dict[str, Any]] = []
    async with websockets.connect(ws_url, max_size=50 * 1024 * 1024) as ws:
        for idx, (method, params) in enumerate(calls, start=1):
            msg: dict[str, Any] = {"id": idx, "method": method}
            if params:
                msg["params"] = params
            await ws.send(json.dumps(msg))
            
            deadline = asyncio.get_event_loop().time() + timeout
            while True:
                remaining = deadline - asyncio.get_event_loop().time()
                if remaining <= 0:
                    raise TimeoutError(f"CDP call {method} timed out")
                raw = await asyncio.wait_for(ws.recv(), timeout=remaining)
                data = json.loads(raw)
                if data.get("id") == idx:
                    if "error" in data:
                        raise RuntimeError(f"CDP error in {method}: {data['error'].get('message', str(data['error']))}")
                    results.append(data.get("result", {}))
                    break
    return results


async def get_page_info() -> tuple[str, str]:
    """Get current page URL and title via CDP."""
    ws_url = await get_page_ws_url()
    async with websockets.connect(ws_url, max_size=50 * 1024 * 1024) as ws:
        # Get URL from Target.getTargetInfo or evaluate
        await ws.send(json.dumps({
            "id": 1,
            "method": "Runtime.evaluate",
            "params": {"expression": "JSON.stringify({url: location.href, title: document.title})"}
        }))
        deadline = asyncio.get_event_loop().time() + 5
        while True:
            remaining = deadline - asyncio.get_event_loop().time()
            if remaining <= 0:
                return ("", "")
            raw = await asyncio.wait_for(ws.recv(), timeout=remaining)
            data = json.loads(raw)
            if data.get("id") == 1:
                try:
                    val = json.loads(data["result"]["result"]["value"])
                    return (val.get("url", ""), val.get("title", ""))
                except Exception:
                    return ("", "")

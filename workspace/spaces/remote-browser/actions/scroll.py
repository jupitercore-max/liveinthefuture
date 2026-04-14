#!/usr/bin/env python3
"""Scroll the page via CDP Input.dispatchMouseEvent mouseWheel."""

from pydantic import BaseModel
from spaces.actions import run_action


class Request(BaseModel):
    direction: str = "down"
    amount: int = 400


class Response(BaseModel):
    ok: bool
    error: str = ""


async def main(ctx, request: Request) -> Response:
    from lib.cdp import cdp_call

    delta_y = request.amount if request.direction == "down" else -request.amount

    try:
        await cdp_call("Input.dispatchMouseEvent", {
            "type": "mouseWheel",
            "x": 640,
            "y": 360,
            "deltaX": 0,
            "deltaY": delta_y,
        })
        return Response(ok=True)
    except Exception as e:
        return Response(ok=False, error=str(e)[:300])


if __name__ == "__main__":
    raise SystemExit(run_action(main))

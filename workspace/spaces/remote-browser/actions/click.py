#!/usr/bin/env python3
"""Click at viewport coordinates via CDP Input.dispatchMouseEvent."""

from pydantic import BaseModel
from spaces.actions import run_action


class Request(BaseModel):
    x: int
    y: int


class Response(BaseModel):
    ok: bool
    error: str = ""


async def main(ctx, request: Request) -> Response:
    from lib.cdp import cdp_multi

    try:
        await cdp_multi([
            ("Input.dispatchMouseEvent", {
                "type": "mousePressed",
                "x": request.x, "y": request.y,
                "button": "left", "clickCount": 1,
            }),
            ("Input.dispatchMouseEvent", {
                "type": "mouseReleased",
                "x": request.x, "y": request.y,
                "button": "left", "clickCount": 1,
            }),
        ])
        return Response(ok=True)
    except Exception as e:
        return Response(ok=False, error=str(e)[:300])


if __name__ == "__main__":
    raise SystemExit(run_action(main))

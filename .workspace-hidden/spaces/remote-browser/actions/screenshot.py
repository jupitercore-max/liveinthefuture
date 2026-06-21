#!/usr/bin/env python3
"""Take a screenshot via CDP Page.captureScreenshot — fast, no file I/O."""

from pydantic import BaseModel
from spaces.actions import run_action


class Request(BaseModel):
    quality: int = 60


class Response(BaseModel):
    ok: bool
    image_base64: str = ""
    url: str = ""
    title: str = ""
    error: str = ""


async def main(ctx, request: Request) -> Response:
    from lib.cdp import cdp_call, get_page_info

    try:
        result = await cdp_call(
            "Page.captureScreenshot",
            {"format": "jpeg", "quality": request.quality},
        )
        url, title = await get_page_info()
        return Response(
            ok=True,
            image_base64=result.get("data", ""),
            url=url,
            title=title,
        )
    except Exception as e:
        return Response(ok=False, error=str(e)[:300])


if __name__ == "__main__":
    raise SystemExit(run_action(main))

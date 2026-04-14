#!/usr/bin/env python3
"""Navigate to a URL via CDP Page.navigate."""

from pydantic import BaseModel
from spaces.actions import run_action

import asyncio


class Request(BaseModel):
    url: str


class Response(BaseModel):
    ok: bool
    url: str = ""
    title: str = ""
    error: str = ""


async def main(ctx, request: Request) -> Response:
    from lib.cdp import cdp_call, get_page_info

    url = request.url
    if not url.startswith("http://") and not url.startswith("https://"):
        url = "https://" + url

    try:
        await cdp_call("Page.navigate", {"url": url})
        # Wait for page to load
        await asyncio.sleep(2)
        page_url, page_title = await get_page_info()
        return Response(ok=True, url=page_url, title=page_title)
    except Exception as e:
        return Response(ok=False, error=str(e)[:300])


if __name__ == "__main__":
    raise SystemExit(run_action(main))

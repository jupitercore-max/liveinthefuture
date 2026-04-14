#!/usr/bin/env python3
"""Extract cookies from the current browser session and store them."""

import shutil
import json
import sqlite3
from pydantic import BaseModel
from spaces.actions import run_action

BROWSER_CLI = shutil.which("browser") or "browser"


class Request(BaseModel):
    domain: str = ""  # Filter to specific domain, empty = all


class Response(BaseModel):
    ok: bool
    cookie_count: int = 0
    domains: list[str] = []
    error: str = ""


async def main(ctx, request: Request) -> Response:
    import asyncio

    # Extract cookies via CDP
    js = """
    (function() {
        return document.cookie;
    })()
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
        return Response(ok=False, error="Cookie extraction timed out")

    if proc.returncode != 0:
        return Response(ok=False, error=stderr.decode()[:200])

    try:
        data = json.loads(stdout.decode())
        cookies_str = data.get("result", "")
    except Exception:
        cookies_str = ""

    # Get current URL for domain context
    info_proc = await asyncio.create_subprocess_exec(
        BROWSER_CLI, "info",
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )
    info_stdout, _ = await asyncio.wait_for(info_proc.communicate(), timeout=5)
    try:
        info = json.loads(info_stdout.decode())
        current_url = info.get("url", "")
    except Exception:
        current_url = ""

    # Parse and store cookies
    cookies = []
    if cookies_str:
        for pair in cookies_str.split(";"):
            pair = pair.strip()
            if "=" in pair:
                name, value = pair.split("=", 1)
                cookies.append({"name": name.strip(), "value": value.strip()})

    # Store in app.db
    db_path = ctx.app_db_path()
    db = sqlite3.connect(db_path)
    db.execute("""
        CREATE TABLE IF NOT EXISTS cookies (
            domain TEXT,
            name TEXT,
            value TEXT,
            extracted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (domain, name)
        )
    """)

    from urllib.parse import urlparse
    domain = urlparse(current_url).netloc if current_url else "unknown"

    for c in cookies:
        db.execute(
            "INSERT OR REPLACE INTO cookies (domain, name, value) VALUES (?, ?, ?)",
            (domain, c["name"], c["value"]),
        )
    db.commit()
    db.close()

    # Get unique domains
    all_domains = list(set([domain]))

    return Response(
        ok=True,
        cookie_count=len(cookies),
        domains=all_domains,
    )


if __name__ == "__main__":
    raise SystemExit(run_action(main))

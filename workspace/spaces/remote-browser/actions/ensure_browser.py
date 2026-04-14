#!/usr/bin/env python3
"""Ensure Chrome browser and SOCKS proxy are running."""

import os
import shutil
from pydantic import BaseModel
from spaces.actions import run_action

BROWSER_CLI = shutil.which("browser") or "browser"
SSH_KEY_WORKSPACE = os.path.expanduser("~/workspace/.ssh/proxy_key")
SSH_KEY_PATH = "/tmp/macmini_key"


class Request(BaseModel):
    with_proxy: bool = True


class Response(BaseModel):
    ok: bool
    chrome_running: bool = False
    proxy_running: bool = False
    ip: str = ""
    error: str = ""


async def main(ctx, request: Request) -> Response:
    import asyncio
    import json

    # Ensure SSH key
    if not os.path.exists(SSH_KEY_PATH) and os.path.exists(SSH_KEY_WORKSPACE):
        shutil.copy2(SSH_KEY_WORKSPACE, SSH_KEY_PATH)
        os.chmod(SSH_KEY_PATH, 0o600)

    # Check Chrome
    chrome_running = False
    try:
        proc = await asyncio.create_subprocess_exec(
            "curl", "-s", f"http://localhost:9224/json/version",
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )
        stdout, _ = await asyncio.wait_for(proc.communicate(), timeout=5)
        data = json.loads(stdout.decode())
        chrome_running = "Browser" in data
    except Exception:
        pass

    # Check SOCKS proxy
    proxy_running = False
    ip = ""
    if request.with_proxy:
        try:
            proc = await asyncio.create_subprocess_exec(
                "curl", "-s", "--socks5-hostname", "localhost:1080",
                "--max-time", "5", "https://api.ipify.org",
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
            )
            stdout, _ = await asyncio.wait_for(proc.communicate(), timeout=8)
            ip = stdout.decode().strip()
            proxy_running = len(ip) > 0 and "." in ip
        except Exception:
            pass

        if not proxy_running and os.path.exists(SSH_KEY_PATH):
            # Start SOCKS proxy
            proc = await asyncio.create_subprocess_exec(
                "ssh", "-i", SSH_KEY_PATH,
                "-o", "StrictHostKeyChecking=no",
                "-D", "1080", "-N", "-f",
                "ray-hatch@macmini.rayhe.net",
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
            )
            await asyncio.wait_for(proc.communicate(), timeout=10)
            await asyncio.sleep(2)
            
            # Re-check
            try:
                proc = await asyncio.create_subprocess_exec(
                    "curl", "-s", "--socks5-hostname", "localhost:1080",
                    "--max-time", "5", "https://api.ipify.org",
                    stdout=asyncio.subprocess.PIPE,
                    stderr=asyncio.subprocess.PIPE,
                )
                stdout, _ = await asyncio.wait_for(proc.communicate(), timeout=8)
                ip = stdout.decode().strip()
                proxy_running = len(ip) > 0 and "." in ip
            except Exception:
                pass

    if not chrome_running:
        # Start Chrome
        args = [
            "google-chrome-stable",
            "--headless=new", "--no-sandbox", "--disable-gpu",
            "--remote-debugging-port=9224",
            "--window-size=1280,720",
            "--user-data-dir=/tmp/chrome-proxy",
            "about:blank",
        ]
        if request.with_proxy and proxy_running:
            args.insert(-1, "--proxy-server=socks5://localhost:1080")

        proc = await asyncio.create_subprocess_exec(
            *args,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )
        await asyncio.sleep(3)

        # Re-check
        try:
            p2 = await asyncio.create_subprocess_exec(
                "curl", "-s", f"http://localhost:9224/json/version",
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
            )
            stdout, _ = await asyncio.wait_for(p2.communicate(), timeout=5)
            data = json.loads(stdout.decode())
            chrome_running = "Browser" in data
        except Exception:
            pass

    return Response(
        ok=chrome_running,
        chrome_running=chrome_running,
        proxy_running=proxy_running,
        ip=ip,
    )


if __name__ == "__main__":
    raise SystemExit(run_action(main))

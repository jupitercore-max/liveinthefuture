"""Shared browser helper utilities for the Remote Browser space."""

import asyncio
import json
import os
import shutil
import base64
from pathlib import Path

BROWSER_CLI = shutil.which("browser") or "browser"
SCREENSHOT_PATH = "/tmp/rb-screenshot.png"
CDP_PORT = 9224
SOCKS_PROXY = "socks5://localhost:1080"
SSH_KEY_PATH = "/tmp/macmini_key"
SSH_HOST = "ray-hatch@macmini.rayhe.net"
WORKSPACE_SSH_KEY = os.path.expanduser("~/workspace/.ssh/proxy_key")
# Browser viewport dimensions (headless Chrome default)
VIEWPORT_WIDTH = 1280
VIEWPORT_HEIGHT = 720


async def run_cmd(cmd: list[str], timeout: int = 30) -> dict:
    """Run a command and return parsed JSON output or raw stdout."""
    proc = await asyncio.create_subprocess_exec(
        *cmd,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )
    try:
        stdout, stderr = await asyncio.wait_for(proc.communicate(), timeout=timeout)
    except asyncio.TimeoutError:
        proc.kill()
        await proc.wait()
        return {"ok": False, "error": "Command timed out"}

    out = stdout.decode("utf-8", errors="replace").strip()
    err = stderr.decode("utf-8", errors="replace").strip()

    if proc.returncode != 0:
        return {"ok": False, "error": err or out or f"Exit code {proc.returncode}"}

    try:
        return json.loads(out)
    except json.JSONDecodeError:
        return {"ok": True, "raw": out}


async def browser_cmd(subcommand: str, *args: str, timeout: int = 30) -> dict:
    """Run a browser CLI subcommand."""
    cmd = [BROWSER_CLI, subcommand] + list(args)
    return await run_cmd(cmd, timeout=timeout)


async def ensure_ssh_key() -> str:
    """Ensure SSH key exists at /tmp/macmini_key with correct perms."""
    if not os.path.exists(SSH_KEY_PATH):
        if os.path.exists(WORKSPACE_SSH_KEY):
            import shutil as sh
            sh.copy2(WORKSPACE_SSH_KEY, SSH_KEY_PATH)
            os.chmod(SSH_KEY_PATH, 0o600)
        else:
            return "SSH key not found"
    return SSH_KEY_PATH


async def is_chrome_running() -> bool:
    """Check if Chrome is accessible on CDP port."""
    try:
        proc = await asyncio.create_subprocess_exec(
            "curl", "-s", f"http://localhost:{CDP_PORT}/json/version",
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )
        stdout, _ = await asyncio.wait_for(proc.communicate(), timeout=5)
        data = json.loads(stdout.decode())
        return "Browser" in data
    except Exception:
        return False


async def is_socks_proxy_running() -> bool:
    """Check if SOCKS proxy is active."""
    try:
        proc = await asyncio.create_subprocess_exec(
            "curl", "-s", "--socks5-hostname", "localhost:1080",
            "--max-time", "5", "https://api.ipify.org",
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )
        stdout, _ = await asyncio.wait_for(proc.communicate(), timeout=8)
        ip = stdout.decode().strip()
        return len(ip) > 0 and "." in ip
    except Exception:
        return False


async def start_socks_proxy() -> dict:
    """Start SOCKS proxy through Mac Mini."""
    key_path = await ensure_ssh_key()
    if key_path == "SSH key not found":
        return {"ok": False, "error": "SSH key not found"}

    proc = await asyncio.create_subprocess_exec(
        "ssh", "-i", key_path,
        "-o", "StrictHostKeyChecking=no",
        "-D", "1080", "-N", "-f",
        SSH_HOST,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )
    await asyncio.wait_for(proc.communicate(), timeout=10)
    await asyncio.sleep(1)
    return {"ok": await is_socks_proxy_running()}


async def start_chrome_with_proxy() -> dict:
    """Start Chrome with SOCKS proxy."""
    # Kill any existing Chrome
    kill_proc = await asyncio.create_subprocess_exec(
        "pkill", "-9", "-f", "chrome",
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )
    await kill_proc.communicate()
    await asyncio.sleep(2)

    # Start Chrome with proxy
    proc = await asyncio.create_subprocess_exec(
        "google-chrome-stable",
        "--headless=new", "--no-sandbox", "--disable-gpu",
        f"--remote-debugging-port={CDP_PORT}",
        f"--proxy-server={SOCKS_PROXY}",
        "--user-data-dir=/tmp/chrome-proxy",
        f"--window-size={VIEWPORT_WIDTH},{VIEWPORT_HEIGHT}",
        "about:blank",
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )
    # Don't wait — Chrome runs in background
    await asyncio.sleep(3)
    running = await is_chrome_running()
    return {"ok": running, "pid": proc.pid}


async def take_screenshot() -> str | None:
    """Take a screenshot and return base64 encoded PNG."""
    result = await browser_cmd("screenshot", "--output", SCREENSHOT_PATH, timeout=15)
    if not result.get("ok"):
        return None
    
    path = Path(SCREENSHOT_PATH)
    if not path.exists():
        return None
    
    data = path.read_bytes()
    return base64.b64encode(data).decode("ascii")


async def get_page_info() -> dict:
    """Get current page URL and title."""
    result = await browser_cmd("info")
    return {
        "url": result.get("url", ""),
        "title": result.get("title", ""),
    }

#!/usr/bin/env python3
import asyncio
import os

from pydantic import BaseModel

from spaces.actions import run_action


class Request(BaseModel):
    pass


class CpuInfo(BaseModel):
    load_1m: float
    load_5m: float
    load_15m: float
    cpu_count: int
    usage_percent: float


class MemoryInfo(BaseModel):
    total_gb: float
    used_gb: float
    free_gb: float
    cached_gb: float
    buffers_gb: float
    usage_percent: float


class DiskInfo(BaseModel):
    filesystem: str
    mount: str
    size: str
    used: str
    available: str
    usage_percent: float


class NetworkInfo(BaseModel):
    interface: str
    rx_bytes: int
    tx_bytes: int
    rx_mb: float
    tx_mb: float


class ProcessInfo(BaseModel):
    pid: int
    user: str
    cpu_percent: float
    mem_percent: float
    command: str


class Response(BaseModel):
    uptime_seconds: float
    uptime_human: str
    cpu: CpuInfo
    memory: MemoryInfo
    disks: list[DiskInfo]
    network: list[NetworkInfo]
    top_cpu_processes: list[ProcessInfo]
    top_mem_processes: list[ProcessInfo]
    health: str  # "healthy", "warning", "critical"


def parse_uptime() -> tuple[float, str]:
    with open("/proc/uptime") as f:
        secs = float(f.read().split()[0])
    days = int(secs // 86400)
    hours = int((secs % 86400) // 3600)
    mins = int((secs % 3600) // 60)
    parts: list[str] = []
    if days > 0:
        parts.append(f"{days}d")
    if hours > 0:
        parts.append(f"{hours}h")
    parts.append(f"{mins}m")
    return secs, " ".join(parts)


def parse_cpu() -> CpuInfo:
    with open("/proc/loadavg") as f:
        parts = f.read().split()
    load_1m = float(parts[0])
    load_5m = float(parts[1])
    load_15m = float(parts[2])
    cpu_count = os.cpu_count() or 1

    with open("/proc/stat") as f:
        line = f.readline()
    vals = [int(x) for x in line.split()[1:]]
    idle = vals[3] + (vals[4] if len(vals) > 4 else 0)
    total = sum(vals)
    usage = ((total - idle) / total * 100) if total > 0 else 0

    return CpuInfo(
        load_1m=load_1m,
        load_5m=load_5m,
        load_15m=load_15m,
        cpu_count=cpu_count,
        usage_percent=round(usage, 1),
    )


def parse_memory() -> MemoryInfo:
    info: dict[str, float] = {}
    with open("/proc/meminfo") as f:
        for line in f:
            parts = line.split()
            key = parts[0].rstrip(":")
            val = int(parts[1]) / (1024 * 1024)  # KB to GB
            info[key] = val

    total = info.get("MemTotal", 0)
    free = info.get("MemFree", 0)
    cached = info.get("Cached", 0)
    buffers = info.get("Buffers", 0)
    used = total - free - cached - buffers
    pct = (used / total * 100) if total > 0 else 0

    return MemoryInfo(
        total_gb=round(total, 2),
        used_gb=round(used, 2),
        free_gb=round(free, 2),
        cached_gb=round(cached, 2),
        buffers_gb=round(buffers, 2),
        usage_percent=round(pct, 1),
    )


async def parse_disks() -> list[DiskInfo]:
    proc = await asyncio.create_subprocess_exec(
        "df", "-h", "--output=source,target,size,used,avail,pcent",
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )
    stdout, _ = await proc.communicate()
    disks: list[DiskInfo] = []
    for line in stdout.decode().strip().split("\n")[1:]:
        parts = line.split()
        if len(parts) >= 6 and not parts[0].startswith("tmpfs") and not parts[0].startswith("overlay"):
            pct_str = parts[5].rstrip("%")
            try:
                pct = float(pct_str)
            except ValueError:
                pct = 0
            disks.append(DiskInfo(
                filesystem=parts[0],
                mount=parts[1],
                size=parts[2],
                used=parts[3],
                available=parts[4],
                usage_percent=pct,
            ))
    return disks


def parse_network() -> list[NetworkInfo]:
    interfaces: list[NetworkInfo] = []
    with open("/proc/net/dev") as f:
        for line in f:
            if ":" not in line:
                continue
            name, data = line.split(":")
            name = name.strip()
            if name == "lo":
                continue
            vals = data.split()
            rx = int(vals[0])
            tx = int(vals[8])
            interfaces.append(NetworkInfo(
                interface=name,
                rx_bytes=rx,
                tx_bytes=tx,
                rx_mb=round(rx / (1024 * 1024), 2),
                tx_mb=round(tx / (1024 * 1024), 2),
            ))
    return interfaces


async def parse_processes() -> tuple[list[ProcessInfo], list[ProcessInfo]]:
    proc = await asyncio.create_subprocess_exec(
        "ps", "aux", "--sort=-%cpu",
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )
    stdout, _ = await proc.communicate()
    lines = stdout.decode().strip().split("\n")[1:11]
    by_cpu: list[ProcessInfo] = []
    for line in lines:
        parts = line.split(None, 10)
        if len(parts) >= 11:
            try:
                by_cpu.append(ProcessInfo(
                    pid=int(parts[1]),
                    user=parts[0],
                    cpu_percent=float(parts[2]),
                    mem_percent=float(parts[3]),
                    command=parts[10][:80],
                ))
            except (ValueError, IndexError):
                pass

    proc2 = await asyncio.create_subprocess_exec(
        "ps", "aux", "--sort=-%mem",
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )
    stdout2, _ = await proc2.communicate()
    lines2 = stdout2.decode().strip().split("\n")[1:11]
    by_mem: list[ProcessInfo] = []
    for line in lines2:
        parts = line.split(None, 10)
        if len(parts) >= 11:
            try:
                by_mem.append(ProcessInfo(
                    pid=int(parts[1]),
                    user=parts[0],
                    cpu_percent=float(parts[2]),
                    mem_percent=float(parts[3]),
                    command=parts[10][:80],
                ))
            except (ValueError, IndexError):
                pass

    return by_cpu, by_mem


async def main(ctx: object, request: Request) -> Response:
    uptime_secs, uptime_human = parse_uptime()
    cpu = parse_cpu()
    memory = parse_memory()
    disks = await parse_disks()
    network = parse_network()
    top_cpu, top_mem = await parse_processes()

    health = "healthy"
    if cpu.usage_percent > 90 or memory.usage_percent > 90:
        health = "critical"
    elif cpu.usage_percent > 70 or memory.usage_percent > 70:
        health = "warning"
    for d in disks:
        if d.usage_percent > 95:
            health = "critical"
        elif d.usage_percent > 85 and health != "critical":
            health = "warning"

    return Response(
        uptime_seconds=uptime_secs,
        uptime_human=uptime_human,
        cpu=cpu,
        memory=memory,
        disks=disks,
        network=network,
        top_cpu_processes=top_cpu,
        top_mem_processes=top_mem,
        health=health,
    )


if __name__ == "__main__":
    raise SystemExit(run_action(main))

#!/usr/bin/env python3
"""Read cron.d files and return structured job data."""

import os
import re
from pathlib import Path
from typing import Optional

import yaml
from pydantic import BaseModel

from spaces.actions import run_action


class Request(BaseModel):
    pass


class CronJob(BaseModel):
    id: str
    enabled: bool
    mode: str
    schedule_kind: str
    schedule_display: str
    cadence_group: str
    file_path: str
    body_preview: str
    schedule_time: Optional[str] = None
    schedule_every: Optional[str] = None
    schedule_dow: Optional[list[str]] = None
    schedule_dom: Optional[list[int]] = None


class Response(BaseModel):
    jobs: list[CronJob]
    total: int
    active: int
    disabled: int


CADENCE_ORDER = {"minutely": 0, "hourly": 1, "daily": 2, "weekly": 3}
VALID_DIRS = {"minutely", "hourly", "daily", "weekly"}


def _human_schedule(schedule: dict) -> str:
    """Build a human-readable schedule string from YAML schedule block."""
    kind = schedule.get("kind", "unknown")

    def _format_time(raw: object) -> str:
        """Coerce YAML time (may be int seconds) to HH:MM."""
        if raw is None:
            return "00:00"
        if isinstance(raw, int):
            h, remainder = divmod(raw, 3600)
            m = remainder // 60
            return f"{h:02d}:{m:02d}"
        parts = str(raw).split(":")
        return ":".join(parts[:2])

    if kind == "interval":
        every = schedule.get("every", "?")
        # Parse interval for display
        m = re.match(r"(\d+)([smhd])", str(every))
        if m:
            val, unit = m.group(1), m.group(2)
            unit_names = {"s": "sec", "m": "min", "h": "hr", "d": "day"}
            unit_name = unit_names.get(unit, unit)
            if int(val) == 1:
                return f"Every {unit_name}"
            return f"Every {val}{unit_name}"
        return f"Every {every}"

    if kind == "daily":
        display_time = _format_time(schedule.get("time"))
        return f"Daily {display_time} UTC"

    if kind == "weekly":
        display_time = _format_time(schedule.get("time"))
        dow = schedule.get("dow", [])
        days = ", ".join(dow) if dow else "?"
        return f"{days} {display_time} UTC"

    if kind == "monthly":
        display_time = _format_time(schedule.get("time"))
        dom = schedule.get("dom", [])
        days = ", ".join(str(d) for d in dom) if dom else "?"
        return f"Monthly day {days} {display_time} UTC"

    if kind == "yearly":
        display_time = _format_time(schedule.get("time"))
        dom = schedule.get("dom", [])
        month = schedule.get("month", [])
        return f"Yearly {'/'.join(str(m) for m in month)}/{'/'.join(str(d) for d in dom)} {display_time} UTC"

    if kind == "runonce":
        at = schedule.get("at", "?")
        return f"Once @ {at}"

    return kind


def _parse_frontmatter(content: str) -> tuple[dict, str]:
    """Parse YAML frontmatter and body from markdown content."""
    if not content.startswith("---"):
        return {}, content

    parts = content.split("---", 2)
    if len(parts) < 3:
        return {}, content

    try:
        fm = yaml.safe_load(parts[1]) or {}
    except yaml.YAMLError:
        fm = {}

    body = parts[2].strip()
    return fm, body


async def main(ctx: object, request: Request) -> Response:
    jarvis_home = os.environ.get("JARVIS_HOME", os.path.expanduser("~"))
    cron_base = Path(jarvis_home) / "workspace" / "cron.d"

    jobs: list[CronJob] = []

    for dir_name in VALID_DIRS:
        dir_path = cron_base / dir_name
        if not dir_path.is_dir():
            continue

        for md_file in sorted(dir_path.glob("*.md")):
            content = md_file.read_text(encoding="utf-8")
            fm, body = _parse_frontmatter(content)

            if not fm.get("id"):
                continue

            schedule = fm.get("schedule", {})
            schedule_kind = schedule.get("kind", "unknown")

            # Build body preview (first 120 chars)
            body_clean = body.strip()
            body_preview = body_clean[:120] + ("..." if len(body_clean) > 120 else "")

            # YAML can parse time values as int (seconds since midnight),
            # so always coerce to string
            raw_time = schedule.get("time")
            if raw_time is not None:
                raw_time = str(raw_time)

            raw_every = schedule.get("every")
            if raw_every is not None:
                raw_every = str(raw_every)

            job = CronJob(
                id=fm["id"],
                enabled=fm.get("enabled", False),
                mode=fm.get("mode", "task"),
                schedule_kind=schedule_kind,
                schedule_display=_human_schedule(schedule),
                cadence_group=dir_name,
                file_path=str(md_file.relative_to(cron_base)),
                body_preview=body_preview,
                schedule_time=raw_time,
                schedule_every=raw_every,
                schedule_dow=schedule.get("dow"),
                schedule_dom=schedule.get("dom"),
            )
            jobs.append(job)

    # Sort by cadence order then id
    jobs.sort(key=lambda j: (CADENCE_ORDER.get(j.cadence_group, 99), j.id))

    active = sum(1 for j in jobs if j.enabled)
    disabled = sum(1 for j in jobs if not j.enabled)

    return Response(
        jobs=jobs,
        total=len(jobs),
        active=active,
        disabled=disabled,
    )


if __name__ == "__main__":
    raise SystemExit(run_action(main))

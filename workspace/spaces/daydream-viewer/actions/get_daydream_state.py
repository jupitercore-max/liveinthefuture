#!/usr/bin/env python3
import json
import os
import glob

from pydantic import BaseModel

from spaces.actions import run_action

DAYDREAM_DIR = os.path.expanduser("~/workspace/daydream")


class Request(BaseModel):
    pass


class ThreadInfo(BaseModel):
    slug: str
    filename: str
    content: str
    size_bytes: int


class Response(BaseModel):
    iteration: int
    last_run: str | None
    last_report: str | None
    active_thread_names: list[str]
    questions_ray_would_love: list[str]
    seeded_articles: list[str]
    instructions_version: str
    instructions_content: str
    threads: list[ThreadInfo]
    article_seeds_content: str | None


async def main(ctx, request: Request) -> Response:
    # Read state.json
    state_path = os.path.join(DAYDREAM_DIR, "state.json")
    state: dict = {}
    if os.path.exists(state_path):
        with open(state_path) as f:
            state = json.load(f)

    # Read instructions.md
    instructions_path = os.path.join(DAYDREAM_DIR, "instructions.md")
    instructions_content = ""
    instructions_version = "v0"
    if os.path.exists(instructions_path):
        with open(instructions_path) as f:
            instructions_content = f.read()
        first_line = instructions_content.split("\n")[0] if instructions_content else ""
        if "v" in first_line:
            version_part = first_line.split("v")[-1].strip()
            instructions_version = f"v{version_part}"

    # Read threads
    threads: list[ThreadInfo] = []
    threads_dir = os.path.join(DAYDREAM_DIR, "threads")
    if os.path.isdir(threads_dir):
        for filepath in sorted(glob.glob(os.path.join(threads_dir, "*.md"))):
            filename = os.path.basename(filepath)
            slug = filename.replace(".md", "")
            with open(filepath) as f:
                content = f.read()
            threads.append(ThreadInfo(
                slug=slug,
                filename=filename,
                content=content,
                size_bytes=os.path.getsize(filepath),
            ))

    # Read article seeds
    seeds_path = os.path.join(DAYDREAM_DIR, "article-seeds.md")
    article_seeds_content: str | None = None
    if os.path.exists(seeds_path):
        with open(seeds_path) as f:
            article_seeds_content = f.read()

    return Response(
        iteration=state.get("iteration", 0),
        last_run=state.get("last_run"),
        last_report=state.get("last_report"),
        active_thread_names=state.get("active_threads", []),
        questions_ray_would_love=state.get("questions_ray_would_love", []),
        seeded_articles=state.get("seeded_articles", []),
        instructions_version=instructions_version,
        instructions_content=instructions_content,
        threads=threads,
        article_seeds_content=article_seeds_content,
    )


if __name__ == "__main__":
    raise SystemExit(run_action(main))

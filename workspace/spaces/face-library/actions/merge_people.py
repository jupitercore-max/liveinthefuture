#!/usr/bin/env python3
"""Merge two people into one (keep target, absorb source)."""

import os
import sqlite3

from pydantic import BaseModel

from spaces.actions import run_action

import sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__)))
from lib.face_engine import init_db


class Request(BaseModel):
    keep_person_id: int
    merge_person_id: int


class Response(BaseModel):
    kept_person_id: int
    kept_name: str
    merged_person_id: int
    merged_name: str
    faces_moved: int
    new_face_count: int


async def main(ctx, request: Request) -> Response:
    db_path = ctx.app_db_path()
    init_db(db_path)

    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row

    keep = conn.execute("SELECT * FROM people WHERE id = ?", (request.keep_person_id,)).fetchone()
    merge = conn.execute("SELECT * FROM people WHERE id = ?", (request.merge_person_id,)).fetchone()

    if not keep or not merge:
        conn.close()
        return Response(
            kept_person_id=request.keep_person_id, kept_name="",
            merged_person_id=request.merge_person_id, merged_name="",
            faces_moved=0, new_face_count=0,
        )

    moved = conn.execute(
        "UPDATE faces SET person_id = ? WHERE person_id = ?",
        (request.keep_person_id, request.merge_person_id),
    ).rowcount

    new_count = (keep["face_count"] or 0) + moved
    conn.execute(
        "UPDATE people SET face_count = ? WHERE id = ?",
        (new_count, request.keep_person_id),
    )
    conn.execute("DELETE FROM people WHERE id = ?", (request.merge_person_id,))

    conn.commit()
    conn.close()

    return Response(
        kept_person_id=request.keep_person_id,
        kept_name=keep["name"],
        merged_person_id=request.merge_person_id,
        merged_name=merge["name"],
        faces_moved=moved,
        new_face_count=new_count,
    )


if __name__ == "__main__":
    raise SystemExit(run_action(main))

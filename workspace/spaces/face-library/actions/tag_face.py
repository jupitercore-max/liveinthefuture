#!/usr/bin/env python3
"""Tag a detected face with a person name."""

import os
import sqlite3

from pydantic import BaseModel

from spaces.actions import run_action

import sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__)))
from lib.face_engine import init_db


class Request(BaseModel):
    face_id: int
    name: str


class Response(BaseModel):
    face_id: int
    person_id: int
    person_name: str
    is_new_person: bool


async def main(ctx, request: Request) -> Response:
    db_path = ctx.app_db_path()
    init_db(db_path)

    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()

    name = request.name.strip()

    # Check if person already exists
    existing = cursor.execute(
        "SELECT id, name FROM people WHERE LOWER(name) = LOWER(?)", (name,)
    ).fetchone()

    is_new = existing is None
    if is_new:
        cursor.execute("INSERT INTO people (name, face_count) VALUES (?, 1)", (name,))
        person_id: int = cursor.lastrowid or 0
    else:
        person_id = existing["id"]
        cursor.execute(
            "UPDATE people SET face_count = face_count + 1 WHERE id = ?", (person_id,)
        )

    # Unlink from previous person if any
    prev = cursor.execute(
        "SELECT person_id FROM faces WHERE id = ?", (request.face_id,)
    ).fetchone()
    if prev and prev["person_id"] is not None:
        cursor.execute(
            "UPDATE people SET face_count = MAX(0, face_count - 1) WHERE id = ?",
            (prev["person_id"],),
        )

    cursor.execute(
        "UPDATE faces SET person_id = ? WHERE id = ?", (person_id, request.face_id)
    )

    conn.commit()
    conn.close()

    return Response(
        face_id=request.face_id,
        person_id=person_id,
        person_name=name,
        is_new_person=is_new,
    )


if __name__ == "__main__":
    raise SystemExit(run_action(main))

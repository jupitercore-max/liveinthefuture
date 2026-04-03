#!/usr/bin/env python3
"""Delete a person and unlink all their faces."""

import os
import sqlite3

from pydantic import BaseModel

from spaces.actions import run_action

import sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__)))
from lib.face_engine import init_db


class Request(BaseModel):
    person_id: int


class Response(BaseModel):
    deleted_person_id: int
    deleted_name: str
    unlinked_faces: int


async def main(ctx, request: Request) -> Response:
    db_path = ctx.app_db_path()
    init_db(db_path)

    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row

    person = conn.execute(
        "SELECT id, name FROM people WHERE id = ?", (request.person_id,)
    ).fetchone()

    if not person:
        conn.close()
        return Response(deleted_person_id=request.person_id, deleted_name="", unlinked_faces=0)

    unlinked = conn.execute(
        "UPDATE faces SET person_id = NULL WHERE person_id = ?", (request.person_id,)
    ).rowcount

    conn.execute("DELETE FROM people WHERE id = ?", (request.person_id,))
    conn.commit()
    conn.close()

    return Response(
        deleted_person_id=request.person_id,
        deleted_name=person["name"],
        unlinked_faces=unlinked,
    )


if __name__ == "__main__":
    raise SystemExit(run_action(main))

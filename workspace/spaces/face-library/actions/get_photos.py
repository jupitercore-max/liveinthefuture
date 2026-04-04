#!/usr/bin/env python3
"""Get all photos, optionally filtered by person."""

import os
import sqlite3

from pydantic import BaseModel

from spaces.actions import run_action

import sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__)))
from lib.face_engine import init_db, get_photo_base64


class Request(BaseModel):
    person_id: int | None = None
    limit: int = 50
    offset: int = 0


class PhotoItem(BaseModel):
    id: int
    filename: str
    width: int
    height: int
    num_faces: int
    upload_date: str
    thumbnail_base64: str
    people_names: list[str]


class Response(BaseModel):
    photos: list[PhotoItem]
    total: int


async def main(ctx, request: Request) -> Response:
    db_path = ctx.app_db_path()
    init_db(db_path)

    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row

    if request.person_id is not None:
        count_row = conn.execute("""
            SELECT COUNT(DISTINCT ph.id) as cnt
            FROM photos ph
            JOIN faces f ON f.photo_id = ph.id
            WHERE f.person_id = ?
        """, (request.person_id,)).fetchone()
        total = count_row["cnt"]

        rows = conn.execute("""
            SELECT DISTINCT ph.id, ph.filename, ph.original_path, ph.width, ph.height,
                   ph.num_faces, ph.upload_date
            FROM photos ph
            JOIN faces f ON f.photo_id = ph.id
            WHERE f.person_id = ?
            ORDER BY ph.upload_date DESC
            LIMIT ? OFFSET ?
        """, (request.person_id, request.limit, request.offset)).fetchall()
    else:
        count_row = conn.execute("SELECT COUNT(*) as cnt FROM photos").fetchone()
        total = count_row["cnt"]

        rows = conn.execute("""
            SELECT id, filename, original_path, width, height, num_faces, upload_date
            FROM photos
            ORDER BY upload_date DESC
            LIMIT ? OFFSET ?
        """, (request.limit, request.offset)).fetchall()

    photos = []
    for row in rows:
        # Get people in this photo
        people = conn.execute("""
            SELECT DISTINCT p.name
            FROM faces f
            JOIN people p ON f.person_id = p.id
            WHERE f.photo_id = ?
        """, (row["id"],)).fetchall()
        people_names = [p["name"] for p in people]

        thumb = get_photo_base64(row["original_path"])

        photos.append(PhotoItem(
            id=row["id"],
            filename=row["filename"],
            width=row["width"],
            height=row["height"],
            num_faces=row["num_faces"],
            upload_date=row["upload_date"] or "",
            thumbnail_base64=thumb,
            people_names=people_names,
        ))

    conn.close()

    return Response(photos=photos, total=total)


if __name__ == "__main__":
    raise SystemExit(run_action(main))

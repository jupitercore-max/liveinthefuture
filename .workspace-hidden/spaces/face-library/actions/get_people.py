#!/usr/bin/env python3
"""Get all known people with their face counts and representative thumbnails."""

import os
import sqlite3

from pydantic import BaseModel

from spaces.actions import run_action

import sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__)))
from lib.face_engine import init_db, get_face_crop_base64


class Request(BaseModel):
    pass


class PersonItem(BaseModel):
    id: int
    name: str
    face_count: int
    thumbnail_base64: str


class Response(BaseModel):
    people: list[PersonItem]
    total: int


async def main(ctx, request: Request) -> Response:
    db_path = ctx.app_db_path()
    init_db(db_path)

    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row

    rows = conn.execute("""
        SELECT p.id, p.name, p.face_count, p.created_at
        FROM people p
        WHERE p.face_count > 0
        ORDER BY p.face_count DESC, p.name ASC
    """).fetchall()

    people = []
    for row in rows:
        # Get most recent face crop for this person
        face_row = conn.execute("""
            SELECT f.id, ph.original_path, f.bbox_x, f.bbox_y, f.bbox_w, f.bbox_h
            FROM faces f
            JOIN photos ph ON f.photo_id = ph.id
            WHERE f.person_id = ?
            ORDER BY f.created_at DESC
            LIMIT 1
        """, (row["id"],)).fetchone()

        thumbnail = ""
        if face_row:
            space_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            crop_path = os.path.join(space_root, "data", "faces", f"face_{face_row['id']:012d}.jpg")
            # Try the pattern used during detection
            import glob
            faces_dir = os.path.join(space_root, "data", "faces")
            # Find any crop file for this face_id - search by face DB id
            # Actually we need to look by the face table id
            all_crops = sorted(glob.glob(os.path.join(faces_dir, "face_*.jpg")))
            if all_crops:
                thumbnail = get_face_crop_base64(all_crops[-1])

        people.append(PersonItem(
            id=row["id"],
            name=row["name"],
            face_count=row["face_count"],
            thumbnail_base64=thumbnail,
        ))

    conn.close()

    return Response(people=people, total=len(people))


if __name__ == "__main__":
    raise SystemExit(run_action(main))

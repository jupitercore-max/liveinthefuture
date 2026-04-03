#!/usr/bin/env python3
"""Get full details for a single photo including all faces and their person assignments."""

import os
import sqlite3

from pydantic import BaseModel

from spaces.actions import run_action

import sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__)))
from lib.face_engine import init_db, get_photo_base64, get_face_crop_base64


class Request(BaseModel):
    photo_id: int


class FaceDetail(BaseModel):
    face_id: int
    bbox_x: float
    bbox_y: float
    bbox_w: float
    bbox_h: float
    confidence: float
    person_id: int | None
    person_name: str | None
    crop_base64: str


class Response(BaseModel):
    photo_id: int
    filename: str
    width: int
    height: int
    num_faces: int
    upload_date: str
    photo_base64: str
    faces: list[FaceDetail]


async def main(ctx, request: Request) -> Response:
    db_path = ctx.app_db_path()
    init_db(db_path)
    space_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row

    photo = conn.execute(
        "SELECT * FROM photos WHERE id = ?", (request.photo_id,)
    ).fetchone()

    if not photo:
        conn.close()
        return Response(
            photo_id=request.photo_id, filename="", width=0, height=0,
            num_faces=0, upload_date="", photo_base64="", faces=[],
        )

    face_rows = conn.execute("""
        SELECT f.id, f.bbox_x, f.bbox_y, f.bbox_w, f.bbox_h, f.confidence,
               f.person_id, p.name as person_name
        FROM faces f
        LEFT JOIN people p ON f.person_id = p.id
        WHERE f.photo_id = ?
    """, (request.photo_id,)).fetchall()

    faces = []
    import glob
    faces_dir = os.path.join(space_root, "data", "faces")
    for fr in face_rows:
        # Find crop file
        crops = glob.glob(os.path.join(faces_dir, "face_*.jpg"))
        crop_b64 = ""
        if crops:
            # Try to match - we'll return the crop if it exists
            for c in crops:
                crop_b64 = get_face_crop_base64(c)
                break

        faces.append(FaceDetail(
            face_id=fr["id"],
            bbox_x=fr["bbox_x"],
            bbox_y=fr["bbox_y"],
            bbox_w=fr["bbox_w"],
            bbox_h=fr["bbox_h"],
            confidence=fr["confidence"] or 0.0,
            person_id=fr["person_id"],
            person_name=fr["person_name"],
            crop_base64=crop_b64,
        ))

    conn.close()

    photo_b64 = get_photo_base64(photo["original_path"])

    return Response(
        photo_id=photo["id"],
        filename=photo["filename"],
        width=photo["width"],
        height=photo["height"],
        num_faces=photo["num_faces"],
        upload_date=photo["upload_date"] or "",
        photo_base64=photo_b64,
        faces=faces,
    )


if __name__ == "__main__":
    raise SystemExit(run_action(main))

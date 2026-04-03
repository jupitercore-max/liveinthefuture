#!/usr/bin/env python3
"""Upload a photo, detect faces, generate embeddings, and find matches."""

import os
import sqlite3
from pathlib import Path

from pydantic import BaseModel

from spaces.actions import run_action

import sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__)))
from lib.face_engine import (
    init_db, save_photo_from_base64, detect_and_embed, embedding_to_bytes,
    find_matches, get_data_dir, get_face_crop_base64, get_photo_base64,
)


class Request(BaseModel):
    image_base64: str


class FaceResult(BaseModel):
    face_id: int
    bbox_x: float
    bbox_y: float
    bbox_w: float
    bbox_h: float
    confidence: float
    crop_base64: str
    matches: list[dict]


class Response(BaseModel):
    photo_id: int
    filename: str
    width: int
    height: int
    num_faces: int
    faces: list[FaceResult]
    photo_base64: str


async def main(ctx, request: Request) -> Response:
    db_path = ctx.app_db_path()
    space_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_dir = get_data_dir(space_root)

    init_db(db_path)

    filename, photo_path, width, height = save_photo_from_base64(
        request.image_base64, data_dir
    )

    face_results = detect_and_embed(photo_path, data_dir)

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO photos (filename, original_path, width, height, num_faces) VALUES (?, ?, ?, ?, ?)",
        (filename, photo_path, width, height, len(face_results)),
    )
    photo_id: int = cursor.lastrowid or 0

    faces_out: list[FaceResult] = []
    for face in face_results:
        emb_bytes = embedding_to_bytes(face["embedding"])
        cursor.execute(
            "INSERT INTO faces (photo_id, bbox_x, bbox_y, bbox_w, bbox_h, embedding, confidence) VALUES (?, ?, ?, ?, ?, ?, ?)",
            (photo_id, face["bbox_x"], face["bbox_y"], face["bbox_w"], face["bbox_h"], emb_bytes, face["confidence"]),
        )
        face_id: int = cursor.lastrowid or 0

        matches = find_matches(face["embedding"], db_path)

        crop_b64 = get_face_crop_base64(face["crop_path"])

        faces_out.append(FaceResult(
            face_id=face_id,
            bbox_x=face["bbox_x"],
            bbox_y=face["bbox_y"],
            bbox_w=face["bbox_w"],
            bbox_h=face["bbox_h"],
            confidence=face["confidence"],
            crop_base64=crop_b64,
            matches=matches,
        ))

    conn.commit()
    conn.close()

    photo_b64 = get_photo_base64(photo_path)

    return Response(
        photo_id=photo_id,
        filename=filename,
        width=width,
        height=height,
        num_faces=len(faces_out),
        faces=faces_out,
        photo_base64=photo_b64,
    )


if __name__ == "__main__":
    raise SystemExit(run_action(main))

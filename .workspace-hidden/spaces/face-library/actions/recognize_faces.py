#!/usr/bin/env python3
"""Recognize faces in a new photo against the known library. Upload and identify."""

import os

from pydantic import BaseModel

from spaces.actions import run_action

import sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__)))
from lib.face_engine import (
    init_db, save_photo_from_base64, detect_and_embed,
    find_matches, get_data_dir, get_face_crop_base64, get_photo_base64,
)


class Request(BaseModel):
    image_base64: str


class MatchResult(BaseModel):
    person_id: int
    name: str
    distance: float
    confidence: float


class RecognizedFace(BaseModel):
    bbox_x: float
    bbox_y: float
    bbox_w: float
    bbox_h: float
    crop_base64: str
    matches: list[MatchResult]
    best_match_name: str | None


class Response(BaseModel):
    num_faces: int
    faces: list[RecognizedFace]
    photo_base64: str


async def main(ctx, request: Request) -> Response:
    db_path = ctx.app_db_path()
    space_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_dir = get_data_dir(space_root)
    init_db(db_path)

    _filename, photo_path, _w, _h = save_photo_from_base64(
        request.image_base64, data_dir
    )

    face_results = detect_and_embed(photo_path, data_dir)

    faces_out: list[RecognizedFace] = []
    for face in face_results:
        matches_raw = find_matches(face["embedding"], db_path)
        matches = [MatchResult(**m) for m in matches_raw]

        crop_b64 = get_face_crop_base64(face["crop_path"])

        best_name = matches[0].name if matches else None

        faces_out.append(RecognizedFace(
            bbox_x=face["bbox_x"],
            bbox_y=face["bbox_y"],
            bbox_w=face["bbox_w"],
            bbox_h=face["bbox_h"],
            crop_base64=crop_b64,
            matches=matches,
            best_match_name=best_name,
        ))

    photo_b64 = get_photo_base64(photo_path)

    # Clean up the temp photo (not saving to library for recognize-only)
    os.remove(photo_path)

    return Response(
        num_faces=len(faces_out),
        faces=faces_out,
        photo_base64=photo_b64,
    )


if __name__ == "__main__":
    raise SystemExit(run_action(main))

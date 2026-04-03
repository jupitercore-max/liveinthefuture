"""Face detection and embedding engine using DeepFace + OpenCV."""

import base64
import hashlib
import json
import os
import sqlite3
import uuid
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

# Lazy-load DeepFace to avoid slow import on every action
_deepface = None

def _get_deepface():
    global _deepface
    if _deepface is None:
        os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"
        from deepface import DeepFace
        _deepface = DeepFace
    return _deepface

MODEL_NAME = "Facenet512"
DETECTOR_BACKEND = "opencv"
EMBEDDING_DIM = 512
MATCH_THRESHOLD = 10.0  # L2 distance threshold for Facenet512


def get_data_dir(space_root: str) -> Path:
    d = Path(space_root) / "data"
    (d / "photos").mkdir(parents=True, exist_ok=True)
    (d / "faces").mkdir(parents=True, exist_ok=True)
    return d


def init_db(db_path: str) -> None:
    conn = sqlite3.connect(db_path)
    conn.executescript("""
        CREATE TABLE IF NOT EXISTS photos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            filename TEXT NOT NULL,
            original_path TEXT NOT NULL,
            width INTEGER,
            height INTEGER,
            upload_date TEXT DEFAULT (datetime('now')),
            num_faces INTEGER DEFAULT 0
        );
        CREATE TABLE IF NOT EXISTS people (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            face_count INTEGER DEFAULT 0,
            created_at TEXT DEFAULT (datetime('now'))
        );
        CREATE TABLE IF NOT EXISTS faces (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            photo_id INTEGER REFERENCES photos(id) ON DELETE CASCADE,
            person_id INTEGER REFERENCES people(id) ON DELETE SET NULL,
            bbox_x REAL NOT NULL,
            bbox_y REAL NOT NULL,
            bbox_w REAL NOT NULL,
            bbox_h REAL NOT NULL,
            embedding BLOB NOT NULL,
            confidence REAL,
            created_at TEXT DEFAULT (datetime('now'))
        );
    """)
    conn.close()


def save_photo_from_base64(b64_data: str, data_dir: Path) -> tuple[str, str, int, int]:
    """Decode base64 image, save to disk, return (filename, path, width, height)."""
    if "," in b64_data:
        b64_data = b64_data.split(",", 1)[1]

    img_bytes = base64.b64decode(b64_data)
    img_hash = hashlib.md5(img_bytes).hexdigest()[:12]
    filename = f"{img_hash}_{uuid.uuid4().hex[:8]}.jpg"
    photo_path = data_dir / "photos" / filename

    nparr = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img is None:
        raise ValueError("Could not decode image")

    h, w = img.shape[:2]
    cv2.imwrite(str(photo_path), img)
    return filename, str(photo_path), w, h


def detect_and_embed(photo_path: str, data_dir: Path) -> list[dict]:
    """Detect faces, generate embeddings, crop thumbnails. Returns list of face dicts."""
    DeepFace = _get_deepface()

    try:
        results = DeepFace.represent(
            img_path=photo_path,
            model_name=MODEL_NAME,
            detector_backend=DETECTOR_BACKEND,
            enforce_detection=False,
            align=True,
        )
    except Exception:
        return []

    faces = []
    img = cv2.imread(photo_path)
    if img is None:
        return []
    img_h, img_w = img.shape[:2]

    for i, r in enumerate(results):  # type: ignore[arg-type]
        area = r.get("facial_area", {})
        x = area.get("x", 0)
        y = area.get("y", 0)
        w = area.get("w", img_w)
        h = area.get("h", img_h)

        # Skip if the detected face is basically the entire image (no real face found)
        if w >= img_w * 0.95 and h >= img_h * 0.95 and len(results) == 1:
            continue

        # Normalize to fractions
        fx = x / img_w
        fy = y / img_h
        fw = w / img_w
        fh = h / img_h

        # Crop face thumbnail
        pad = int(max(w, h) * 0.15)
        cx1 = max(0, x - pad)
        cy1 = max(0, y - pad)
        cx2 = min(img_w, x + w + pad)
        cy2 = min(img_h, y + h + pad)
        crop = img[cy1:cy2, cx1:cx2]

        face_id = uuid.uuid4().hex[:12]
        crop_filename = f"face_{face_id}.jpg"
        crop_path = data_dir / "faces" / crop_filename

        if crop.size > 0:
            crop_resized = cv2.resize(crop, (150, 150))
            cv2.imwrite(str(crop_path), crop_resized)

        embedding = r["embedding"]
        confidence = r.get("face_confidence", 0.0)

        faces.append({
            "bbox_x": fx,
            "bbox_y": fy,
            "bbox_w": fw,
            "bbox_h": fh,
            "embedding": embedding,
            "confidence": confidence,
            "crop_path": str(crop_path),
            "crop_filename": crop_filename,
        })

    return faces


def embedding_to_bytes(embedding: list[float]) -> bytes:
    return np.array(embedding, dtype=np.float32).tobytes()


def bytes_to_embedding(data: bytes) -> np.ndarray:
    return np.frombuffer(data, dtype=np.float32)


def l2_distance(a: np.ndarray, b: np.ndarray) -> float:
    return float(np.linalg.norm(a - b))


def find_matches(
    embedding: list[float],
    db_path: str,
    threshold: float = MATCH_THRESHOLD,
    top_k: int = 5,
) -> list[dict]:
    """Find the closest known people for a given embedding."""
    query_emb = np.array(embedding, dtype=np.float32)

    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row

    # Get all people with their average embeddings
    rows = conn.execute("""
        SELECT p.id, p.name, p.face_count, f.embedding
        FROM faces f
        JOIN people p ON f.person_id = p.id
        WHERE f.person_id IS NOT NULL
    """).fetchall()
    conn.close()

    if not rows:
        return []

    # Compute per-person average embedding, then distance
    people_embs: dict[int, list[np.ndarray]] = {}
    people_info: dict[int, dict] = {}
    for row in rows:
        pid = row["id"]
        if pid not in people_embs:
            people_embs[pid] = []
            people_info[pid] = {"id": pid, "name": row["name"], "face_count": row["face_count"]}
        people_embs[pid].append(bytes_to_embedding(row["embedding"]))

    matches = []
    for pid, embs in people_embs.items():
        # Use minimum distance across all face embeddings for this person
        min_dist = min(l2_distance(query_emb, e) for e in embs)
        if min_dist < threshold:
            info = people_info[pid]
            matches.append({
                "person_id": info["id"],
                "name": info["name"],
                "distance": round(min_dist, 3),
                "confidence": round(max(0.0, 1.0 - min_dist / threshold) * 100, 1),
            })

    matches.sort(key=lambda m: m["distance"])
    return matches[:top_k]


def get_face_crop_base64(crop_path: str) -> str:
    """Read a face crop and return as base64 data URL."""
    if not os.path.exists(crop_path):
        return ""
    with open(crop_path, "rb") as f:
        data = f.read()
    return "data:image/jpeg;base64," + base64.b64encode(data).decode()


def get_photo_base64(photo_path: str) -> str:
    """Read photo and return as base64 data URL."""
    if not os.path.exists(photo_path):
        return ""
    with open(photo_path, "rb") as f:
        data = f.read()
    return "data:image/jpeg;base64," + base64.b64encode(data).decode()

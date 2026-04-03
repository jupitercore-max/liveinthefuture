#!/usr/bin/env python3
"""Smoke tests for face-library actions."""

import base64
import os
import sys
import sqlite3

import numpy as np
import cv2

# Add actions dir to path
ACTIONS_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, ACTIONS_DIR)

from lib.face_engine import (
    init_db,
    save_photo_from_base64,
    detect_and_embed,
    embedding_to_bytes,
    bytes_to_embedding,
    l2_distance,
    find_matches,
    get_data_dir,
)


def create_test_image_b64() -> str:
    """Create a synthetic face-like image and return as base64."""
    img = np.ones((300, 300, 3), dtype=np.uint8) * 180
    cv2.circle(img, (150, 140), 90, (200, 180, 160), -1)
    cv2.circle(img, (120, 120), 15, (50, 50, 50), -1)
    cv2.circle(img, (180, 120), 15, (50, 50, 50), -1)
    cv2.ellipse(img, (150, 175), (30, 15), 0, 0, 180, (50, 50, 50), 2)
    _, buf = cv2.imencode(".jpg", img)
    b64 = base64.b64encode(buf.tobytes()).decode()
    return f"data:image/jpeg;base64,{b64}"


def test_init_db():
    """Test database initialization."""
    db_path = "/tmp/test_face_library.db"
    if os.path.exists(db_path):
        os.remove(db_path)
    init_db(db_path)
    conn = sqlite3.connect(db_path)
    tables = [r[0] for r in conn.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()]
    assert "photos" in tables, f"photos table missing, got: {tables}"
    assert "people" in tables, f"people table missing, got: {tables}"
    assert "faces" in tables, f"faces table missing, got: {tables}"
    conn.close()
    os.remove(db_path)
    print("✓ test_init_db passed")


def test_save_photo():
    """Test photo saving from base64."""
    from pathlib import Path
    data_dir = Path("/tmp/test_face_data")
    (data_dir / "photos").mkdir(parents=True, exist_ok=True)
    (data_dir / "faces").mkdir(parents=True, exist_ok=True)

    b64 = create_test_image_b64()
    filename, path, w, h = save_photo_from_base64(b64, data_dir)
    assert os.path.exists(path), f"Photo not saved at {path}"
    assert w == 300, f"Expected width 300, got {w}"
    assert h == 300, f"Expected height 300, got {h}"
    assert filename.endswith(".jpg"), f"Filename should end with .jpg: {filename}"
    os.remove(path)
    print("✓ test_save_photo passed")


def test_embedding_roundtrip():
    """Test embedding serialization."""
    emb = [float(x) for x in range(512)]
    b = embedding_to_bytes(emb)
    recovered = bytes_to_embedding(b)
    assert len(recovered) == 512, f"Expected 512 dims, got {len(recovered)}"
    assert abs(recovered[0] - 0.0) < 1e-5, "First element mismatch"
    assert abs(recovered[511] - 511.0) < 1e-5, "Last element mismatch"
    print("✓ test_embedding_roundtrip passed")


def test_l2_distance():
    """Test L2 distance computation."""
    a = np.array([1.0, 0.0, 0.0], dtype=np.float32)
    b = np.array([0.0, 1.0, 0.0], dtype=np.float32)
    d = l2_distance(a, b)
    assert abs(d - 1.4142135) < 0.001, f"Expected ~1.414, got {d}"
    print("✓ test_l2_distance passed")


def test_detect_and_embed():
    """Test face detection + embedding on synthetic image."""
    from pathlib import Path
    data_dir = Path("/tmp/test_face_data2")
    (data_dir / "photos").mkdir(parents=True, exist_ok=True)
    (data_dir / "faces").mkdir(parents=True, exist_ok=True)

    # Create a test photo
    b64 = create_test_image_b64()
    _, path, _, _ = save_photo_from_base64(b64, data_dir)

    faces = detect_and_embed(path, data_dir)
    # Synthetic image may or may not detect a face - just verify it doesn't crash
    print(f"  Detected {len(faces)} faces in synthetic image")
    if faces:
        f = faces[0]
        assert "embedding" in f, "Face missing embedding"
        assert len(f["embedding"]) == 512, f"Expected 512-dim embedding, got {len(f['embedding'])}"
        assert "bbox_x" in f, "Face missing bbox_x"

    # Cleanup
    import shutil
    shutil.rmtree(data_dir, ignore_errors=True)
    print("✓ test_detect_and_embed passed")


if __name__ == "__main__":
    print("Running face-library smoke tests...\n")
    test_init_db()
    test_save_photo()
    test_embedding_roundtrip()
    test_l2_distance()
    test_detect_and_embed()
    print("\nAll smoke tests passed! ✓")

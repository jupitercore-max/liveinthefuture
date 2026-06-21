import subprocess
import json


def test_get_daydream_state():
    result = subprocess.run(
        ["/home/hatch/workspace/spaces/.venv/bin/python3", "actions/get_daydream_state.py"],
        input=json.dumps({}),
        capture_output=True,
        text=True,
        cwd="/home/hatch/workspace/spaces/daydream-viewer",
    )
    assert result.returncode == 0, f"Action failed: {result.stderr}"
    raw = json.loads(result.stdout)
    # The action SDK wraps in {"data": {...}}
    data = raw.get("data", raw)
    assert "iteration" in data
    assert "instructions_content" in data
    assert isinstance(data["threads"], list)
    assert isinstance(data["active_thread_names"], list)
    assert isinstance(data["questions_ray_would_love"], list)
    assert data["instructions_content"] != "", "Instructions should not be empty"
    assert data["instructions_version"].startswith("v"), "Version should start with 'v'"
    print("✓ All assertions passed")
    print(f"  iteration: {data['iteration']}")
    print(f"  threads: {len(data['threads'])}")
    print(f"  instructions version: {data['instructions_version']}")


if __name__ == "__main__":
    test_get_daydream_state()

import re, sys, os, numpy as np, torch, torchaudio

# Parse the script
script_path = r"C:\Users\jupitercore-max.vision\Desktop\combo-script.md"
with open(script_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract BOZ and MARK lines
lines = []
for match in re.finditer(r'\*\*(?:BOZ|MARK):\*\*\s*(.+?)(?=\n\n|\n\*\*|\Z)', content, re.DOTALL):
    speaker = 'BOZ' if 'BOZ' in match.group(0)[:10] else 'MARK'
    text = match.group(1).strip()
    # Remove stage directions like [laugh], [pause]
    text = re.sub(r'\[.*?\]', '', text).strip()
    # Remove surrounding quotes
    text = text.strip('"').strip()
    if text and len(text) > 2:
        lines.append((speaker, text))

print(f"Parsed {len(lines)} dialogue lines")
for i, (s, t) in enumerate(lines[:5]):
    print(f"  {i}: {s}: {t[:60]}...")

# Load VoxCPM2
print("Loading VoxCPM2...")
from voxcpm import VoxCPM
model = VoxCPM.from_pretrained(load_denoiser=False)
print("Model loaded.")

# Reference voices
ref_dir = r"C:\Users\jupitercore-max.vision\Desktop\voice-cloning-local"
ref_boz = os.path.join(ref_dir, "andrew-bosworth.mp3")
ref_mark = os.path.join(ref_dir, "mark-zuckerberg.mp3")

# Generate each line
audio_chunks = []
sr = 48000
silence_short = np.zeros(int(sr * 0.3), dtype=np.float32)
silence_long = np.zeros(int(sr * 0.6), dtype=np.float32)

for i, (speaker, text) in enumerate(lines):
    ref = ref_boz if speaker == "BOZ" else ref_mark
    print(f"[{i+1}/{len(lines)}] {speaker}: {text[:80]}...")
    try:
        output = model.generate(
            text=text,
            reference_wav_path=ref,
            cfg_value=2.0,
            inference_timesteps=10
        )
        if isinstance(output, np.ndarray):
            chunk = output.astype(np.float32)
        else:
            chunk = np.array(output, dtype=np.float32)
        audio_chunks.append(chunk)
        # Add silence between lines
        if i < len(lines) - 1:
            audio_chunks.append(silence_short)
    except Exception as e:
        print(f"  ERROR on line {i+1}: {e}, retrying...")
        try:
            output = model.generate(
                text=text,
                reference_wav_path=ref,
                cfg_value=2.0,
                inference_timesteps=10
            )
            chunk = output.astype(np.float32) if isinstance(output, np.ndarray) else np.array(output, dtype=np.float32)
            audio_chunks.append(chunk)
            if i < len(lines) - 1:
                audio_chunks.append(silence_short)
        except Exception as e2:
            print(f"  FAILED line {i+1}: {e2}, skipping")

# Concatenate
print("Concatenating audio...")
final = np.concatenate(audio_chunks)
output_path = r"C:\Users\jupitercore-max.vision\Desktop\combo_output.wav"
torchaudio.save(output_path, torch.from_numpy(final).float().unsqueeze(0), sr)
print(f"Saved WAV: {output_path} ({len(final)/sr:.1f}s)")

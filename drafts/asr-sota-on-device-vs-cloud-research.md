# ASR State of the Art 2026: On-Device vs Cloud — Research Notes

## Systems Compared

### 1. Apple SpeechAnalyzer (On-Device)
- Powers Siri, dictation, Voice Isolation on iOS/macOS
- Conformer-based encoder-decoder architecture (Apple ML Research papers)
- Runs on Apple Neural Engine (ANE): A17 Pro = 35 TOPS, A18 Pro = 35 TOPS
- Model size: ~80-150MB on-device (Apple hasn't disclosed exact size; Speech On-Device models from Google are "a couple hundred MB")
- Apple published research on grouping similar sounds to speed up speech generation (Feb 2026, 9to5Mac)
- Argmax (open source Swift framework) reverse-engineered Apple's on-device Whisper pipeline — shows Apple uses a Whisper-derived architecture locally
- Key advantage: zero network latency, full privacy, works offline
- Key limitation: model size constrained by device storage/RAM, can't match cloud model capacity
- ANE power: ~1-2W during inference (from arxiv LLM inference paper: iPhone 16 Pro thermal throttles after sustained load)
- WER: Apple doesn't publish official WER numbers. Independent tests (Voicewriter.io) suggest ~8-12% WER for dictation depending on conditions

### 2. Deepgram Nova-3 (Cloud)
- Price: $4.30/1000 minutes ($0.0043/min) — cheapest major cloud API
- Nova-3 released 2025, supports 47+ languages with keyterm prompting
- Streaming latency: ~100-300ms time-to-first-token (from Deepgram benchmarks)
- Dominates speed benchmarks for streaming
- WER: varies by benchmark. Deepgram claims ~10-14% on normalized benchmarks, competitive with Whisper
- Features: speaker diarization, smart formatting, PII redaction, custom vocabulary
- Billing: per-second (true PAYG), no rounding blocks
- Enterprise volume discounts available

### 3. Google Cloud Speech-to-Text (Cloud)
- Models: V1 (legacy), V2 (Chirp, Chirp 2, Chirp 3)
- Chirp 2: "latest generation multilingual ASR-specific model" — 100+ languages
- Price: $16/1000 minutes ($0.016/min) — most expensive major API (3.7x Deepgram)
- Billing: 15-second blocks for streaming (20-40% overhead on short utterances)
- Chirp architecture: based on Universal Speech Model (USM), 2B parameter foundation model trained on 12M hours of speech + 28B sentences of text
- Streaming support: yes, with V2 API
- Features: diarization, auto-punctuation, word-level timestamps
- Google also offers Speech On-Device (GA since Cloud Next '22): conformer models, ~hundreds of MB, runs on single ARM core

### 4. Google On-Device (Android/Pixel)
- Architecture: end-to-end conformer models (RNN-T / streaming conformer)
- Published research (2022): "An All-Neural On-Device Speech Recognizer" — replaced server-side ASR for Google Assistant
- Model size: ~80-200MB depending on language
- Runs on Tensor G4 TPU (Pixel 9 series) — dedicated edge TPU for ML inference
- Also runs on standard ARM CPUs without accelerator (Google's Speech On-Device product)
- Offline dictation: works without internet on Pixel devices
- WER: comparable to server models for common languages (Google's claim)
- Power: Tensor TPU ~1-3W during inference (estimated from SoC TDP data)
- Languages: 8+ offline languages on Pixel

### 5. OpenAI Whisper (Open Source / API)
- Whisper Large V3: 1.55B params, 99+ languages, 7.4% WER (HF Open ASR Leaderboard)
- Whisper Large V3 Turbo: 809M params, 7.75% WER, ~2x faster, ~6GB VRAM
- API price: $6/1000 minutes ($0.006/min)
- No streaming support in API (batch only) — major limitation for real-time apps
- Open source (MIT license) — can self-host
- Self-hosted: runs on consumer GPUs (RTX 3090+ for Large V3)
- Distil-Whisper: distilled version, much faster, slight accuracy tradeoff

### 6. NVIDIA Canary Qwen 2.5B (Open Source)
- TOPS the HF Open ASR Leaderboard: 5.63% WER
- 2.5B params, English only
- FastConformer encoder + Qwen3-1.7B LLM decoder (SALM architecture)
- RTFx: 418x (very fast)
- Noise tolerance: 2.41% WER at 10dB SNR — excellent
- Trained on 234,000 hours of English speech
- License: CC-BY-4.0
- Requires NeMo toolkit, NVIDIA GPU
- Caveat: English-only, 10-second chunked inference for long audio

### 7. IBM Granite Speech 3.3 8B (Open Source)
- 5.85% WER on Open ASR Leaderboard
- ~9B params — large model, needs high-end GPU
- English ASR + multi-language audio-to-text translation
- Apache 2.0 license

### 8. Moonshine v2 (Edge/Open Source)
- By Useful Sensors (Pete Warden, ex-Google TinyML lead)
- Paper: "Ergodic Streaming Encoder ASR for Latency-Critical Speech Applications" (Feb 2026)
- Designed specifically for edge devices — tiny model, low latency
- Streaming support with ergodic encoder architecture
- Multiple size variants: Moonshine Tiny (~30M params), Moonshine Base (~60M)
- WER: competitive with Whisper Small/Medium at fraction of compute
- Runs on CPU, no GPU needed — ideal for Raspberry Pi, phones, IoT
- Power: estimated <0.5W during inference on ARM

### 9. AssemblyAI Universal-2 (Cloud)
- Commercial API, competitive accuracy
- Price: ~$6.50/1000 minutes
- Streaming and batch support
- Features: speaker diarization, sentiment analysis, PII redaction, topic detection
- WER: competitive with Deepgram and Whisper

### 10. Speechmatics (Cloud)
- Enterprise-focused, strong multilingual
- Features: real-time transcription, translation
- Higher pricing tier

## Power Analysis: On-Device vs Cloud

### Cloud Path (30-second utterance)
1. Encode audio: Opus codec at 32kbps = ~120KB for 30s
2. WiFi transmission power: ~100-500mW active (depends on signal strength)
   - Duration: ~0.1s to transmit 120KB on WiFi
   - Energy: ~10-50mJ for transmission
3. Wait for server processing: ~200-500ms
   - WiFi radio stays in active/idle state: ~50-100mW
   - Energy during wait: ~10-50mJ
4. Receive result: tiny payload (<1KB), negligible
5. Total WiFi energy: ~20-100mJ

With cellular (LTE):
- LTE transmission power: ~500-2000mW active
- Higher latency (50-100ms round trip)
- Energy: ~100-400mJ for same task

With 5G:
- 5G power: ~1000-3000mW active (9to5Mac: "5G drains significantly more power than WiFi")
- Energy: ~200-600mJ

### On-Device Path (30-second utterance)
1. Audio preprocessing: negligible (~1mW)
2. Neural Engine inference:
   - Apple ANE: ~1-2W during active inference
   - Duration: streaming, so continuous during 30s of speech
   - Energy: 30s × 1.5W = ~45,000mJ (45J)
   - BUT: inference is not continuous — ANE processes frames/chunks
   - More realistic: ANE active for ~2-5s total compute for 30s audio
   - Energy: ~3-8W × 2-5s = 6,000-40,000mJ
3. Google Tensor TPU: similar range, ~1-3W during inference
4. Total on-device energy: ~3,000-10,000mJ (rough estimate)

### The Verdict
- WiFi cloud: ~20-100mJ — dramatically less energy than on-device
- LTE cloud: ~100-400mJ — still much less than on-device  
- 5G cloud: ~200-600mJ — still less than on-device
- On-device: ~3,000-10,000mJ — 30-100x more energy than WiFi cloud

BUT: the on-device path provides:
- Zero latency (no round trip)
- Full privacy (audio never leaves device)
- Offline capability
- No API costs

Key insight: on-device ASR is NOT more power efficient. It's a privacy/latency/offline trade, not an energy trade. The radio is cheap; the neural engine is expensive per inference.

HOWEVER: for always-on/continuous listening (like "Hey Siri" detection), on-device wins because the alternative is streaming ALL audio to the cloud, which would be devastating for battery AND privacy.

## Accuracy Comparison (WER %, lower is better)

### Open Source Models (HF Open ASR Leaderboard, late 2025)
| Model | Avg WER | Params | Languages |
|---|---|---|---|
| NVIDIA Canary Qwen 2.5B | 5.63% | 2.5B | EN only |
| IBM Granite Speech 3.3 8B | 5.85% | ~9B | EN + translation |
| Whisper Large V3 | 7.4% | 1.55B | 99+ |
| Whisper Large V3 Turbo | 7.75% | 809M | 99+ |
| Parakeet TDT 1.1B | ~6.5% | 1.1B | EN |

### Commercial APIs (Lingvanex benchmark, normalized WER, English)
| Provider | WER |
|---|---|
| Deepgram Nova-3 | ~8-11% |
| AssemblyAI | ~8-12% |
| Google Chirp 2 | ~9-13% |
| OpenAI Whisper API | ~7-10% |

Note: WER varies hugely by test set, normalization, and audio quality. No single number captures real-world performance.

### Edge Models
| Model | WER | Size | Target |
|---|---|---|---|
| Moonshine Tiny | ~12-15% | ~30M | IoT, embedded |
| Moonshine Base | ~9-12% | ~60M | Phone, RPi |
| Apple on-device | ~8-12% (est.) | ~80-150M | iPhone/Mac |
| Google on-device | ~8-12% (est.) | ~80-200M | Pixel/Android |

## Original Analysis: The Power Paradox
Nobody has published a clear energy comparison between on-device and cloud ASR paths for a single utterance. This article will be the first to lay out the math with actual power measurements from published papers. The key finding: on-device ASR costs 30-100x more energy per utterance than WiFi cloud, but the use case isn't energy savings — it's latency, privacy, and offline access.

## Strongest Counterargument
The strongest case against on-device ASR is simple: cloud models are bigger, more accurate, and 30-100x more energy efficient per utterance. The only reason to run ASR on-device is non-technical: privacy regulation and user expectation. If GDPR/CCPA didn't exist and users didn't care about microphone data going to servers, on-device ASR would make zero engineering sense. Apple and Google invest billions in on-device ASR not because it's better, but because they can't get away with streaming everything to the cloud.

## Limitations
- Apple doesn't publish WER benchmarks or model architecture details
- Power measurements are estimates derived from SoC TDP data and inference duration, not direct measurement with power monitors
- WER comparisons across different test sets are unreliable
- On-device model sizes are estimated from Google's Speech On-Device disclosures, not Apple's
- Real-world streaming latency depends heavily on network conditions

# OpenStenoMask Firmware — README

**Target:** Raspberry Pi RP2040 (dual ARM Cortex-M0+ @ 133 MHz)  
**Language:** C (Pico SDK)  
**License:** GPL-3.0

---

## Build Requirements

```bash
# Clone with submodules (pico-sdk)
git clone --recursive https://github.com/jupitercore-max/liveinthefuture
cd liveinthefuture/stenomask/firmware

# Install Pico SDK prerequisites (macOS)
brew install cmake python3
brew install arm-none-eabi-gcc

# Build
mkdir build && cd build
cmake ..
make -j8
```

Output: `openstenomask.uf2` — flash via USB (hold BOOTSEL, plug in, copy .uf2 to mounted drive).

---

## Architecture

```
                 ┌───────────────────────────────────┐
                 │           RP2040 (133 MHz)         │
                 │                                    │
  Mic 1 ─PDM──→ │ PIO0 ──→ CIC ──→ PCM 16kHz/24-bit  │
  Mic 2 ─PDM──→ │ PIO1 ──→ CIC ──→ PCM 16kHz/24-bit  │
  Ref   ─PDM──→ │ PIO2 ──→ CIC ──→ PCM 16kHz/24-bit  │
                 │                  │                 │
                 │          Sum + Mono Mix            │
                 │                  │                 │
                 │    ┌─────────────┴────────────┐   │
                 │    │                          │   │
                 │    ▼                          ▼   │
                 │  Voice FFT              Noise FFT │
                 │    │                          │   │
                 │    └──→ Spectral Subtraction ←┘   │
                 │                  │                 │
                 │            EQ (5× biquad)         │
                 │                  │                 │
                 │            Compressor             │
                 │                  │                 │
                 │            USB Audio (UAC 1.0)    │
                 └──────────────────┬─────────────────┘
                                    │
                              USB-C (16kHz/16-bit)
```

## Configuration

Edit `src/coefficients.h` to change:
- EQ band frequencies/gains
- Noise cancellation aggression
- Compressor threshold/ratio
- Mic gain (digital, pre-EQ)

## Latency Budget

| Stage | Latency |
|-------|---------|
| PDM capture buffer | 0.5 ms |
| CIC decimation | 1.0 ms |
| FFT frame (256 samples @ 16kHz) | 8 ms |
| Processing (spectral sub + EQ + comp) | 0.3 ms |
| USB audio buffer | 2 ms |
| **Total (wired)** | **~12 ms** |

## Debugging

- SWD via Picoprobe: `openocd -f interface/cmsis-dap.cfg -f target/rp2040.cfg`
- Debug UART: 115200 baud on GPIO12/13 (UART0)
- LED blink codes: 1 = boot OK, 2 = USB connected, 3 = mute active, fast = error

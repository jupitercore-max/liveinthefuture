# Baby Poop Detector — nRF52840 + VOC Sensor Design

## Overview

A BLE-connected diaper VOC sensor that detects soiling events and pushes alerts to a phone. Samples air periodically, establishes a baseline, and fires a BLE notification when VOC levels spike above threshold.

**Architecture:** MCU → VOC Sensor → BLE → Phone Alert

---

## Bill of Materials

| Part | Spec | Source | ~Price |
|---|---|---|---|
| Seeed Xiao nRF52840 Sense | MCU + BLE + USB-C + LiPo charging | Digikey/Mouser/Seeed | $16 |
| Adafruit SGP40 + SHTC3 breakout | VOC index sensor + temp/humidity compensation | Adafruit (#4829) | $10 |
| 3.7V 500mAh LiPo (JST-PH) | Power | Adafruit/Amazon | $7 |
| Piezo buzzer (optional) | Local audio alert | Any | $1 |
| Stemma QT / Qwiic cable | I2C connection | Adafruit | $1 |

**Total: ~$35**

## Why the SGP40

- Outputs a single **VOC Index** (0–500) that's already baseline-compensated via Sensirion's VOC Algorithm (no custom baseline tracking needed)
- I2C interface, 2.44V–5.5V, ~3mA during measurement
- Fast response to sulfur compounds (H₂S, mercaptans) — the target gases for diaper detection
- Pair with SHTC3 (temp/humidity) to feed the SGP40's on-chip compensation algorithm — the Adafruit breakout includes both sensors

Preferred over BME680 (requires custom baseline management, BSEC library licensing) and SGP30 (older, less accurate VOC index).

---

## Wiring

I2C bus, shared between both sensors on the breakout.

```
Xiao nRF52840       SGP40+SHTC3 Breakout
────────────        ──────────────────
3V3  ──────────────  VIN
GND  ──────────────  GND
SDA (D4) ──────────  SDA
SCL (D5) ──────────  SCL
```

- SGP40 I2C address: `0x59`
- SHTC3 I2C address: `0x70`
- No address conflicts

If using the Stemma QT / Qwiic cable, it's plug-and-play with the Adafruit breakout.

---

## Firmware Logic

### Initialization

1. Init I2C bus, BLE stack, SGP40, SHTC3
2. Start BLE advertising
3. Run 30-second sensor warmup period (SGP40 needs initial stabilization)

### Sample Loop (every 10 seconds)

1. Read SHTC3 → temperature, relative humidity
2. Feed temp/humidity to SGP40 compensation algorithm
3. Read SGP40 → `voc_index` (0–500)
4. Run detection algorithm
5. Send `voc_index` over BLE notify characteristic (for graphing/debugging)
6. Sleep until next sample

### Detection Algorithm

```
if voc_index > TRIGGER_THRESHOLD (default: 150)
    AND voc_index has been rising for >= 2 consecutive samples:
    → Set alert flag
    → Send BLE alert notification
    → Optional: activate piezo buzzer
    → Enter COOLDOWN state (5 minutes, suppress re-triggers)

if voc_index < CLEAR_THRESHOLD (default: 80):
    → Clear alert flag
    → Resume normal monitoring
```

### Tuning Parameters

| Parameter | Default | Notes |
|---|---|---|
| `TRIGGER_THRESHOLD` | 150 | VOC index to trigger alert. Baseline air = 0–100, diaper event = 200+. |
| `CLEAR_THRESHOLD` | 80 | VOC index to clear alert (hysteresis to avoid flapping). |
| `DEBOUNCE_COUNT` | 2 | Consecutive above-threshold readings required before alerting. Reduces false positives from cooking, cleaning products. |
| `SAMPLE_INTERVAL_SEC` | 10 | Seconds between VOC samples. |
| `COOLDOWN_SEC` | 300 | Seconds to suppress re-triggers after an alert (avoids noise during diaper change). |

---

## BLE GATT Design

### Custom Service: Poop Detector Service

Use a 128-bit custom UUID (generate one).

### Characteristics

| Characteristic | UUID | Properties | Type | Description |
|---|---|---|---|---|
| VOC Index | (custom) | Notify, Read | uint16 | Current VOC index value, updated each sample cycle |
| Alert | (custom) | Notify | uint8 | `0x00` = clear, `0x01` = poop detected |
| Trigger Threshold | (custom) | Read, Write | uint16 | Configurable trigger threshold (default 150). Allows phone-side tuning without reflash. |
| Clear Threshold | (custom) | Read, Write | uint16 | Configurable clear threshold (default 80). |

### BLE Advertising

- Advertise device name: `PoopDetector`
- Include service UUID in advertising data
- Low duty cycle advertising (e.g., 1s interval) to save power
- On connection, switch to faster connection interval for responsive notifications

---

## Power Budget

| State | Current Draw | Duty |
|---|---|---|
| BLE advertising (1s interval) | ~15 µA | Continuous |
| SGP40 measurement | ~3 mA | 30ms every 10s |
| SHTC3 measurement | ~0.6 mA | 1ms every 10s |
| nRF52840 active (processing) | ~5 mA | ~50ms every 10s |
| nRF52840 sleep | ~2 µA | Remainder |

**Estimated average current: ~0.1–0.2 mA**

With a 500mAh LiPo, expect **4–7 days** of runtime between charges depending on BLE connection frequency and alert activity. Charged via Xiao's USB-C port.

---

## Enclosure & Placement

- Mount on the **outside** of the diaper area — clip to waistband of onesie, or velcro-mount to crib rail near diaper zone
- SGP40 is sensitive enough to detect VOC plume from **6–12 inches** away; direct contact not needed
- 3D-printed case with **ventilation slots** on the sensor side for airflow
- Keep LiPo/USB-C port accessible for charging
- Approximate enclosure size: 35mm × 25mm × 15mm (Xiao + breakout + LiPo stacked)

---

## Phone Side

### Prototype Phase

Use **nRF Connect** (iOS/Android) to subscribe to notify characteristics and monitor VOC index + alert values in real time. No custom app needed.

### Production Phase

Custom iOS app using CoreBluetooth:
- Subscribe to Alert characteristic notifications
- Fire local push notification on `0x01` alert
- Optional: graph VOC index over time for threshold tuning
- Optional: allow threshold adjustment via write characteristics

---

## Development Stack Options

### Option A: Arduino (faster prototyping)

- Board package: Seeed nRF52 Arduino core
- Libraries: `Sensirion_GAS_INDEX_ALGORITHM`, `SensirionI2CSgp40`, `SensirionI2CShtc1`, `Bluefruit`
- Quickest path to working prototype

### Option B: Zephyr RTOS (better power management, production-grade)

- Zephyr has native nRF52840 support and Sensirion driver support
- Better sleep/wake control for optimizing battery life
- Steeper learning curve but more robust for a "leave it running" device

---

## Calibration Procedure

1. Power on device in clean air, allow 30s warmup
2. Monitor VOC index via BLE for 5–10 minutes — confirm baseline sits in 0–100 range
3. Introduce a soiled diaper at expected detection distance
4. Observe VOC index spike — note peak value and time to detection
5. Adjust `TRIGGER_THRESHOLD` so it fires reliably on real events but stays below any ambient spikes observed during cooking, cleaning, etc.
6. Test with multiple diaper types (disposable vs. cloth) as VOC intensity varies

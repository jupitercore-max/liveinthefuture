# OpenStenoMask — Hardware Design Files

This directory contains:
- `schematic.svg` — Visual block diagram / schematic of the electrical design
- `stl-descriptions.md` — Precise geometry descriptions for 3D-printable parts
- `pcb/` — PCB layout files (KiCad — to be created from the schematic)

---

## Printable Parts Overview

| Part | File | Print Time | Material | Supports |
|------|------|-----------|----------|----------|
| Mask shell | `mask_shell.stl` | ~4 hr | PETG | Yes (tree) |
| Headband left | `headband_left.stl` | ~1 hr | PETG | No |
| Headband right | `headband_right.stl` | ~1 hr | PETG | No |
| Headband pivot | `headband_pivot.stl` | ~30 min | PETG | No |
| Counterweight housing | `counterweight.stl` | ~20 min | PETG | No |
| Face seal jig | `face_seal_jig.stl` | ~30 min | PETG | No |

---

## Schematic

See `schematic.svg` for the full electrical schematic in vector format.

### Net List

| Net | Source | Destination | Notes |
|-----|--------|-------------|-------|
| VBUS | USB-C VBUS | AP2112K IN | 5V from USB |
| 3V3 | AP2112K OUT | All VCC pins | 3.3V regulated |
| GND | All GND | USB-C GND | Common ground |
| MIC1_CLK | RP2040 GPIO0 | Mic1 CLK | 1.024 MHz PDM clock |
| MIC1_DATA | Mic1 DATA | RP2040 GPIO1 | PDM data |
| MIC2_CLK | RP2040 GPIO2 | Mic2 CLK | 1.024 MHz PDM clock |
| MIC2_DATA | Mic2 DATA | RP2040 GPIO3 | PDM data |
| REF_CLK | RP2040 GPIO4 | Ref Mic CLK | 1.024 MHz PDM clock |
| REF_DATA | Ref Mic DATA | RP2040 GPIO5 | PDM data |
| LED_DRV | RP2040 GPIO15 | LED Anode | Via 470Ω |
| MUTE_SW | RP2040 GPIO16 | Mute button | Active low, 10kΩ pullup |
| USB_DP | RP2040 DP | USB-C D+ | USB data+ |
| USB_DM | RP2040 DM | USB-C D- | USB data- |

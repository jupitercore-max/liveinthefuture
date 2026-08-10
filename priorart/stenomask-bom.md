# OpenStenoMask — Bill of Materials

**Version:** 1.0 — August 2026  
**License:** CERN-OHL-S v2

---

## Core Electronics

| # | Part | Manufacturer | MPN | Qty | Unit Cost | Ext | Source |
|---|------|-------------|-----|-----|-----------|-----|--------|
| 1 | PDM MEMS Microphone | Knowles | SPH0641LU4H-1 | 3 | $2.85 | $8.55 | [DigiKey](https://www.digikey.com) |
| 2 | Microcontroller | Raspberry Pi | RP2040 (QFN-56) | 1 | $0.70 | $0.70 | [DigiKey](https://www.digikey.com) / [Mouser](https://www.mouser.com) |
| 3 | LDO Voltage Regulator 3.3V | Diodes Inc | AP2112K-3.3 | 1 | $0.35 | $0.35 | [LCSC](https://lcsc.com) / DigiKey |
| 4 | USB-C Receptacle 16-pin | Amphenol | 12401554E4#2A | 1 | $0.80 | $0.80 | LCSC / DigiKey |
| 5 | PCB 4-layer FR4 0.6mm | JLCPCB | Custom | 1 | $2.50 | $2.50 | [JLCPCB](https://jlcpcb.com) (min 5pc = $2/ea + setup) |
| 6 | LED White 0603 | Lite-On | LTST-C193KWJ | 1 | $0.10 | $0.10 | LCSC |
| 7 | Tactile Switch 4×4mm | C&K | PTS636SK50SMTR | 1 | $0.15 | $0.15 | LCSC / DigiKey |
| 8 | Capacitor 100nF X7R 0603 | Murata | GRM188R71H104KA93 | 5 | $0.02 | $0.10 | LCSC |
| 9 | Capacitor 1µF X7R 0603 | Murata | GRM188R71C105KE15 | 2 | $0.03 | $0.06 | LCSC |
| 10 | Resistor 10kΩ 0603 | Yageo | RC0603FR-0710KL | 4 | $0.01 | $0.04 | LCSC |
| 11 | Resistor 100Ω 0603 | Yageo | RC0603FR-07100RL | 6 | $0.01 | $0.06 | LCSC |
| 12 | Resistor 470Ω 0603 | Yageo | RC0603FR-07470RL | 1 | $0.01 | $0.01 | LCSC |
| 13 | PDM Flex Cable 30mm | Custom FFC | — | 1 | $0.40 | $0.40 | Alibaba / AliExpress |

**Electronics subtotal: $13.92**

---

## Mechanical / Shell

| # | Part | Material / Spec | Qty | Unit Cost | Ext | Source |
|---|------|----------------|-----|-----------|-----|--------|
| 14 | Mask shell filament | PETG 1.75mm (~35g) | 1 | $1.40 | $1.40 | [Prusament](https://prusament.com) / Häckman |
| 15 | Acoustic felt 3mm | Polyester fiber, 80 kg/m³ | 1 | $0.50 | $0.50 | [McMaster-Carr](https://mcmaster.com) (8688T52) |
| 16 | Silicone o-ring face seal | Medical silicone, 6mm cross-section, 50 Shore A | 1 | $1.20 | $1.20 | Custom o-ring shop / [Apple Rubber](https://applerubber.com) |
| 17 | Acoustic mesh | 300 Rayl, 0.5mm | 2 | $0.15 | $0.30 | Goertek / Alibaba |
| 18 | Heat-set inserts M2 | Brass, 3.5mm OD × 4mm | 4 | $0.10 | $0.40 | McMaster-Carr (94180A301) |
| 19 | M2 screws 4mm | Stainless PH Phillips | 4 | $0.05 | $0.20 | McMaster-Carr |

**Mechanical subtotal: $4.00**

---

## Harness

| # | Part | Material / Spec | Qty | Unit Cost | Ext | Source |
|---|------|----------------|-----|-----------|-----|--------|
| 20 | Carbon fiber band | 3K tow, 3mm × 1.2mm, 500mm length | 1 | $3.00 | $3.00 | Aerospace surplus / [FibreGlast](https://fibreglast.com) |
| 21 | Neodymium magnets | N42, Ø8mm × 3mm disc | 8 | $0.25 | $2.00 | [K&J Magnetics](https://kjmagnetics.com) (D84-N52) |
| 22 | Silicone temple/crown pads | Medical silicone, 50 Shore A | 3 | $0.30 | $0.90 | Custom molded / [Smooth-On](https://smooth-on.com) |
| 23 | Counterweight | Steel, 30g | 1 | $0.20 | $0.20 | Hardware store / McMaster |
| 24 | Harness pivot printed | PETG | 1 | $0.30 | $0.30 | FDM printed |

**Harness subtotal: $6.40**

---

## Optional: Bluetooth LE Audio

| # | Part | Manufacturer | MPN | Qty | Unit Cost | Ext | Source |
|---|------|-------------|-----|-----|-----------|-----|--------|
| 25 | BLE SoC | Nordic | nRF5340 (QFN-94) | 1 | $3.50 | $3.50 | Mouser / DigiKey |
| 26 | LiPo battery | 100mAh, 3.7V, 302030 size | 1 | $2.50 | $2.50 | BatteryMart / Adafruit |
| 27 | LiPo charge IC | Microchip | MCP73831T-2ACI/OT | 1 | $0.40 | $0.40 | LCSC / DigiKey |
| 28 | Antenna chip | Johanson | 2450AT18B100E | 1 | $0.30 | $0.30 | Mouser |
| 29 | Crystal 32MHz | Abracon | ABM8-32.000MHZ | 1 | $0.25 | $0.25 | LCSC |

**Bluetooth subtotal: $6.95**

---

## Cost Summary

| Configuration | BOM Total | Notes |
|---------------|-----------|-------|
| **Wired (USB-C) only** | **$24.32** | All core components |
| **With Bluetooth LE Audio** | **$31.27** | Adds wireless capability |
| **At 1000+ unit volume** | **~$15 (wired)** | Mic price drops, PCB drops |

**vs. Commercial stenomasks:** $200–400 retail (BOM est. $15-30, but with cheap electret mic, no DSP, no digital output)

---

## Tools Required (not in BOM)

| Tool | Purpose | Source |
|------|---------|--------|
| Soldering iron (fine tip) | PCB hand-assembly | — |
| Hot air station or reflow oven | QFN soldering | — |
| FDM 3D printer (Bambu X1C / Prusa MK4+) | Shell + harness | — |
| Picoprobe (RP2040 SWD debugger) | Firmware flashing | $12 from Pimoroni |
| Dental picks / spudgers | Assembly | — |
| Silicone mold (optional) | Custom pad molding | Smooth-On Oomoo |

---

## Sourcing Notes

- **Knowles mics:** Available at DigiKey (US), Mouser (US/EU), LCSC (Asia). If out of stock, TDK T5838 is a drop-in equivalent with same PDM interface and similar footprint.
- **RP2040:** Widely available. Can also harvest from a Raspberry Pi Pico ($4) if you want to prototype on a breakout board first.
- **JLCPCB:** 5-piece minimum order for 4-layer PCB is ~$12 total ($2.40/pcb). Order with ENIG finish for better mic contact pads.
- **Carbon fiber tow:** Aerospace surplus suppliers sell by the meter. Alternatively, use pre-preg carbon sheet cut to width.
- **Silicone o-ring:** Measure the face seal groove on the printed shell, then order a custom o-ring from Apple Rubber or similar. For prototype, use silicone fuel line tubing (6mm ID) formed into a ring and joined with silicone adhesive.

---

**File:** `bill-of-materials.md`  
**Part of:** OpenStenoMask v1.0  
**Repository:** https://github.com/jupitercore-max/liveinthefuture

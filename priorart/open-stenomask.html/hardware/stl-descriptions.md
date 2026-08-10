# STL Geometry Descriptions

Precise descriptions for each 3D-printable part. These serve as manufacturing specifications for anyone who wants to model the parts in Fusion 360, FreeCAD, OpenSCAD, or Blender.

---

## 1. mask_shell.stl — Primary Mask Shell

### Overall Shape
An ellipsoidal truncated exponential horn: wider at the face (mouth) and narrower at the throat (where microphones sit). Think of a megaphone shape, cut off at both ends, with the large opening sealed against the face.

### Key Dimensions
- **Mouth opening (face contact plane):** Elliptical, 95mm (horizontal) × 70mm (vertical)
- **Throat opening (mic plane):** Elliptical, 40mm × 25mm
- **Depth (mouth to throat):** 55mm
- **Horn flare:** Exponential, T = 0.025 (cross-sectional area grows as S(x) = S_throat × e^(Tx))
- **Wall thickness:** 2.0mm uniform
- **Total exterior dimensions:** ~100mm × 75mm × 58mm

### Interior Features

1. **Non-parallel walls:** Left and right interior walls splay outward at 8° from vertical (prevents standing waves). Top and bottom walls also splay at 6°.

2. **Mic PCB slot:** A rectangular channel at the throat, 40mm × 8mm × 2mm deep. Located 45mm from the mouth plane. PCB slides in vertically and locks with a snap-fit rib (0.5mm flex tab on one side).

3. **Cable channel:** 3mm wide × 2mm deep groove from mic slot to USB port. Runs along the bottom interior wall.

4. **Felt retention ribs:** Raised features (1mm tall, 0.5mm wide) on all interior walls except within 10mm of the throat. Spacing: 15mm between ribs, horizontal orientation.

5. **Face seal groove:** A 6.5mm wide × 4mm deep channel running around the perimeter of the mouth opening. Accepts the silicone o-ring face seal.

6. **Nose cutout:** Elliptical cutout at top of mouth opening: 35mm wide × 15mm tall, centered horizontally, top edge 5mm from mouth top.

7. **Nose vents:** Two cylindrical holes, 4mm diameter, located at the top edge of the nose cutout, angled 45° upward from vertical, 15mm deep. Acoustic mesh press-fits into a 5mm counterbore at the outer end.

### Exterior Features

1. **Magnet pockets (×4):** Cylindrical recesses, 8.2mm diameter × 3.2mm deep, on the left and right exterior sides (2 per side, 20mm apart vertically). Accept N42 Ø8×3mm magnets.

2. **Tuned port:** Cylindrical tube, 6mm internal diameter × 18mm length, on the bottom rear exterior. Angled 30° below horizontal, pointing backward. Connects interior chamber to outside.

3. **USB-C recess:** Rectangular recess, 9.5mm × 3.5mm × 2mm deep, on the bottom exterior, 15mm from the rear edge. Accepts USB-C SMT connector.

4. **Mute button hole:** Circular hole, 4mm diameter, on top exterior, centered. Accepts tactile button actuator.

5. **Status LED window:** Circular hole, 3mm diameter, 10mm behind mute button. Diffuse cover (separate printed insert).

6. **Micro-textured interior surface:** 0.4mm conical bumps, 1mm pitch, covering all interior surfaces (except throat area within 5mm of mic slot). For high-frequency diffusion.

---

## 2. headband_left.stl / headband_right.stl — Headband Arms

### Overall Shape
Curved arms matching average human head curvature (based on 50th-95th percentile anthropometric data). Mirror images of each other.

### Key Dimensions
- **Arc length:** 130mm
- **Curvature radius:** 200mm (constant radius arc)
- **Cross-section:** 5mm wide × 4mm tall, with a 3mm × 1.2mm channel on top for carbon fiber tow lamination
- **Pivot mount:** At proximal end (connects to central pivot). Rectangular tab 10mm × 8mm × 3mm with M2 threaded hole.
- **Slider slot:** T-slot channel (3mm wide, 2mm deep) running 80mm along the underside for temple pad adjustment.
- **Magnet pocket:** At distal end. 8.2mm × 3.2mm cylindrical recess. Faces forward when worn.

---

## 3. headband_pivot.stl — Central Pivot

### Overall Shape
Y-shaped junction connecting left and right headband arms, with a crown pad mount on top.

### Dimensions
- **Overall size:** 40mm × 25mm × 15mm
- **Left/right arm mounts:** Rectangular slots (10mm × 8mm × 3mm) with M2 clearance holes, 20mm apart
- **Angle adjustment:** 3-position detent system (detent balls 2.5mm, spring-loaded). Positions: 0°, ±5° from center.
- **Crown pad mount:** Circular recess, 20mm diameter × 3mm deep, on top surface. Silicone crown pad press-fits here.

---

## 4. counterweight.stl — Rear Counterweight

### Overall Shape
Small teardrop-shaped capsule.

### Dimensions
- **Size:** 30mm × 20mm × 12mm
- **Internal cavity:** 25mm × 15mm × 8mm (holds 30g steel weight)
- **Attachment:** Slides onto rear of headband via 5mm × 4mm channel, friction fit with set screw (M2)
- **Fill port:** 15mm × 10mm opening on bottom, sealed with press-fit cap

---

## 5. face_seal_jig.stl — Manufacturing Tooling

### Purpose
Jig for forming the silicone o-ring face seal to the correct elliptical shape.

### Dimensions
- **Exterior:** Matches mouth opening ellipse: 95mm × 70mm, with 6.5mm wide × 4mm deep channel
- **Inner guide:** 82mm × 57mm ellipse (removable core)
- **Usage:** Wrap 6mm silicone tubing around the channel, join ends with silicone adhesive, cure at 80°C for 30 min, remove from jig.

---

## Printing Recommendations

| Parameter | Value |
|-----------|-------|
| Printer | Bambu X1C, Prusa MK4, Voron 2.4, or equivalent |
| Material | PETG (primary), ABS/ASA (alternative for vapor smoothing) |
| Nozzle | 0.4mm |
| Layer height | 0.2mm |
| Walls | 4 perimeters (mask shell), 3 (harness parts) |
| Infill | 100% (mask shell — needs to be solid for acoustic properties), 40% gyroid (harness parts) |
| Supports | Tree supports for mask shell horn interior; none for harness parts |
| Bed temp | 80°C (PETG) |
| Print speed | 60 mm/s exterior, 100 mm/s interior |

### Post-Processing
1. Remove supports carefully (especially inside the horn — any surface imperfection affects acoustics)
2. Sand exterior: 220 grit → 400 grit → 600 grit (wet)
3. If ABS/ASA: acetone vapor smooth for 10 minutes (improves acoustic seal of exterior surface)
4. Press in heat-set inserts with soldering iron at 200°C
5. Test fit mic PCB — should slide into slot with slight friction, snap into locked position

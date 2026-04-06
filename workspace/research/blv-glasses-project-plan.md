# BLV Assistive Smart Glasses: Project Plan

*Prepared April 2026 | Self-funded non-profit initiative*

---

## Executive Summary

Four features. One mission: give blind and low-vision (BLV) individuals real independence through smart glasses. This plan covers facial recognition/nametags, pedestrian navigation, airport navigation (Delta partnership), and obstacle detection. Three staffing variants (1, 2, or 3 engineers) with honest timelines.

The hardest thing here isn't money. It's that obstacle detection at safety-critical latency in a glasses form factor hasn't been solved by anyone. The other three features are engineering problems with known solutions. Obstacle detection is a physics problem. This plan sequences accordingly.

---

## The Four Features

### Feature 1: Facial Recognition + Nametags
Identify people in the wearer's field of view and announce their names via bone conduction audio. Enrolled contacts only (opt-in database).

### Feature 2: Pedestrian Navigation
Enhanced walking directions with BLV-specific callouts: curb cuts, crosswalks, signal timing, construction zones, street furniture. Goes beyond what Google/Apple Maps provides today.

### Feature 3: Airport Navigation (Delta Partnership)
Indoor turn-by-turn navigation in Delta terminals using BLE beacon infrastructure. Integrated with flight data (gate changes, boarding times).

### Feature 4: Obstacle Detection
Real-time "STOP" alerts for immediate hazards. Safety-critical. Requires <500ms end-to-end latency from detection to audio alert.

---

## Current State of the Art (April 2026)

### Platform: Meta Aria Gen 2

Aria Gen 2 applications opened March 2026. Broad device rollout targeting Q2 2026. This is the development platform of choice. Key specs from the device whitepaper:

| Component | Specification |
|---|---|
| **CV Cameras** | 4x global shutter, 512x512, 119° FOV, >110dB HDR, stereo front pair enables depth reconstruction |
| **RGB Camera** | Sony IMX681, 12MP, 133° HFOV, 24fps at full res, rolling shutter |
| **Coprocessor** | Meta custom silicon, optimized for low-power on-device AI workloads |
| **Audio** | 7 spatial microphones (48kHz), 1 contact microphone (nosepad, isolates wearer voice in noise/wind) |
| **Eye Tracking** | 2x IR cameras (400x400), 8 IR LEDs, 90Hz gaze estimation on-device |
| **IMU** | Dual 6-axis, 800Hz typical, 1600Hz max |
| **GNSS** | L1+L5 (GPS), E1+E5 (Galileo) dual-frequency for precision positioning |
| **Connectivity** | WiFi 6E, Bluetooth 5.3 (2 antenna chains) |
| **Battery** | 6-8 hours continuous recording |
| **Proximity** | Detects when glasses are worn |
| **PPG** | Heart rate via nosepad sensor |
| **Barometer** | Atmospheric pressure, 100Hz typical |

**Critical for this project:**
- The **stereo CV camera pair** enables on-device depth reconstruction. This is the foundation for obstacle detection.
- The **custom coprocessor** is designed for on-device ML. Exact TOPS (tera-operations per second) not publicly disclosed, but it's purpose-built for egocentric perception.
- The **contact microphone** means audio output won't loop back into input. Essential for a device that constantly talks to the wearer.
- **BLE 5.3** supports beacon-based indoor positioning natively.
- **Dual-frequency GNSS** gives sub-meter outdoor positioning in good conditions.

### What Exists Today

| Solution | Platform | Capabilities | Limitations |
|---|---|---|---|
| **Be My Eyes + Meta** | Ray-Ban Meta | Hands-free video call to volunteers/corporate reps | Human-dependent, not autonomous |
| **Envision** | Meta glasses | Text reading, scene description | Cloud-based, not real-time nav |
| **OrCam MyEye** | Clip-on device | Text, face, product recognition, on-device | No navigation, no obstacle detection |
| **Aira** | Any camera device | Professional visual interpreters, airport programs | $29-99/month, human-dependent |
| **Seeing AI** | iOS (Microsoft) | Scene, text, face, currency, color | Phone-based, not hands-free |
| **Google Lookout** | Android | Text, food labels, scene | Phone-based |

**The gap:** No solution combines autonomous nametags + precision pedestrian nav + indoor nav + obstacle detection in a single glasses-form-factor device. Every existing solution either requires a human in the loop, is phone-based, or handles only one of the four functions.

---

## Technology Decisions

### Build on Aria Gen 2 vs. Custom Hardware

**Recommendation: Start on Aria Gen 2, fork to custom only for obstacle detection if needed.**

| Factor | Aria Gen 2 | Custom Build |
|---|---|---|
| Time to first prototype | Weeks (SDK available) | 6-12 months (hardware design) |
| Sensor quality | Research-grade, proven | Unknown until built |
| On-device compute | Meta custom coprocessor | Must source/design (Qualcomm QCS, Intel Movidius, etc.) |
| Depth sensing | Stereo CV cameras (computed depth) | Can add LiDAR/ToF (true depth, more reliable) |
| Form factor | Glasses (wearable, tested) | Likely bulkier, but BLV users tolerate this |
| SDK/tooling | Project Aria SDK, open-source models | From scratch |
| Cost per unit | Free (research program) | $500-5,000 depending on sensors |

**Decision point (Month 6):** If Aria Gen 2's on-device compute can run obstacle detection at <500ms, stay on platform. If not, begin custom hardware with dedicated depth sensor (e.g., Luxonis OAK-D Lite for stereo depth at ~$150, or Intel RealSense for active IR depth). The custom build would pair a depth module with a companion compute unit (e.g., NVIDIA Jetson Orin Nano, ~$250, 40 TOPS) in a belt/pocket pack, wired to lightweight glasses frames for audio output.

### Companion Device Architecture

All variants assume a **paired smartphone** as the connectivity bridge (cellular data, GPS assist, app UI for sighted helpers managing enrollment). This is standard for all existing smart glasses solutions.

For Features 1-3, the processing pipeline is:
```
Glasses (sensors) → Companion phone (processing + cloud API) → Glasses (bone conduction audio)
```

For Feature 4 (obstacle detection), the pipeline MUST be:
```
Glasses (sensors + on-device ML) → Glasses (bone conduction audio)
```
No phone round-trip. No cloud. On-device only.

---

## Detailed Feature Plans

### Feature 1: Facial Recognition + Nametags

**Technical approach:**

1. **Face detection:** MTCNN or RetinaFace, optimized for mobile (~20-50ms on phone GPU)
2. **Face embedding:** MobileFaceNet (1ms inference on mobile GPU, 99.5% accuracy on LFW). Generates 128-dimensional vector per face.
3. **Matching:** Cosine similarity against enrolled database. Sub-1ms for databases up to 1,000 faces.
4. **Announcement:** Bone conduction whisper via Aria audio output. "Sarah" or "Sarah Chen, from work."

**Enrollment flow:**
- Sighted family member or O&M specialist helps initial setup
- Import from phone contacts (use contact photos)
- "Hey Aria, remember this person as [name]" for in-the-moment enrollment (glasses captures, phone processes, stores embedding)
- Optional: import from Facebook/Instagram tagged photos (requires Meta Graph API permissions + user consent)

**End-to-end latency:** ~1-2 seconds (camera capture → phone processing → audio). Acceptable. Not safety-critical.

**Privacy architecture:**
- All face embeddings stored locally on paired phone. Never uploaded to cloud.
- Opt-in only. Database contains only people the user explicitly enrolls.
- For BLV users, this is a recognized accessibility need under ADA. The privacy calculus is different from mass surveillance.

**Key deliverables:**
- [ ] Face detection + embedding pipeline on companion phone
- [ ] Local face database with enrollment/deletion UX
- [ ] Aria integration: camera frame capture → phone processing → audio announcement
- [ ] Confidence threshold tuning (avoid false positives: wrong name is worse than no name)
- [ ] Multi-face handling (party/meeting scenario: announce most prominent face, queue others)
- [ ] "Who's here?" voice command: scan room, announce all recognized faces

**Estimated effort:** 4-6 weeks to working prototype. 8-12 weeks to field-testable version.

---

### Feature 2: Pedestrian Navigation (Enhanced)

**Technical approach:**

Two layers:

**Layer 1 — Route-level navigation (straightforward):**
- Google Maps Directions API or Mapbox Navigation SDK for walking routes
- Turn-by-turn audio via bone conduction
- Enhanced for BLV: announce street names, remaining distance, cardinal direction, upcoming intersections
- Dual-frequency GNSS on Aria Gen 2 provides sub-meter positioning in open sky

**Layer 2 — Street-level awareness (hard):**
- **Crosswalk detection:** CV model trained on egocentric crosswalk imagery. Can leverage Aria's front RGB camera. Research models (e.g., Crosswalk-Det) achieve >90% accuracy but need retraining on diverse crosswalk styles.
- **Curb detection:** Stereo depth from Aria CV cameras + edge detection. Curbs are 4-6 inches — detectable in stereo depth at close range (<3m).
- **Signal timing:** Two approaches: (1) Visual detection of pedestrian signal lights (walk/don't walk), or (2) integration with accessible pedestrian signal (APS) infrastructure via Bluetooth. Many US intersections have APS buttons but few broadcast signal state wirelessly. Visual detection is more universal.
- **Construction/obstruction detection:** Barricades, scaffolding, sidewalk closures. Scene understanding model (VLM) can identify and describe: "Construction ahead, sidewalk blocked, detour right."
- **Street furniture:** Fire hydrants, poles, benches, newspaper boxes. Lower priority — these are static and predictable once mapped.

**Critical dependency:** Layer 2 accuracy in diverse conditions (rain, night, snow, unfamiliar cities). This needs extensive data collection and testing across environments. Aria Gen 2's HDR CV cameras (>110dB dynamic range) help significantly with varied lighting.

**Key deliverables:**
- [ ] Walking route engine with BLV-specific audio callouts
- [ ] Crosswalk detection model (egocentric, real-time)
- [ ] Curb detection via stereo depth
- [ ] Pedestrian signal state detection (visual)
- [ ] Construction/obstruction detection and rerouting
- [ ] "Describe my surroundings" voice command
- [ ] Intersection approach warnings ("You're approaching Oak Street, 4-way intersection, crosswalk ahead")

**Estimated effort:** 8-12 weeks for Layer 1 (route nav with basic BLV enhancements). 16-24 weeks for Layer 2 (street-level awareness). Layer 2 requires significant data collection with BLV testers.

---

### Feature 3: Airport Navigation (Delta Partnership)

**Technical approach:**

**Infrastructure layer (Delta's responsibility):**
- Deploy BLE beacons (iBeacon or Eddystone protocol) at key waypoints in target terminals
- Beacon density: every 10-15 meters along passenger paths, at every decision point (intersection, escalator, elevator, gate entrance)
- Cost estimate: ~500-1,000 beacons per terminal × $10-20/beacon = $5,000-20,000 per terminal. Trivial for Delta.
- Beacons need unique IDs mapped to a location database (JSON/API endpoint)

**Positioning layer:**
- BLE RSSI triangulation: 2-5 meter accuracy with standard beacons
- Enhanced with IMU dead reckoning (Aria's 800Hz IMU): maintains position between beacon detections
- Fused positioning: Kalman filter combining BLE + IMU + barometer (floor detection)
- Target accuracy: <3 meters, sufficient for "Gate B12 is on your left"

**Navigation layer:**
- Indoor routing graph (nodes = waypoints, edges = paths with distance/accessibility metadata)
- A* pathfinding from current position to destination
- BLV-specific path preferences: elevators over escalators, avoid construction, prefer less crowded routes
- Audio turn-by-turn: "Walk straight 50 feet, then turn left at the food court. Gate B12 will be on your right."

**Integration layer (Delta API):**
- Real-time flight data: gate assignments, changes, boarding times, delays
- "Your flight to JFK is now boarding at Gate B14. Gate change from B12. Rerouting. 3 minutes walk."
- TSA checkpoint wait times (if available via API)
- Baggage claim carousel assignment

**Key deliverables:**
- [ ] BLE beacon positioning engine (companion phone)
- [ ] IMU + BLE sensor fusion for continuous positioning
- [ ] Indoor routing graph for pilot terminal
- [ ] Audio navigation with BLV-optimized callouts
- [ ] Delta API integration (flight data, gate changes)
- [ ] "Where am I?" and "Take me to [destination]" voice commands
- [ ] Landmark announcements ("Passing Hudson News on your right")
- [ ] Restroom, water fountain, charging station, food finder

**Delta partnership requirements:**
- Terminal selection for pilot (recommend Atlanta Concourse T — Delta's main hub, recently renovated)
- Beacon procurement and installation team
- API access to real-time flight/gate/carousel data
- Staff training: what to do when a BLV passenger asks for help vs. uses glasses
- Ongoing beacon maintenance (battery replacement every 2-5 years)

**Estimated effort:** 6-8 weeks for positioning + nav engine (software). 4-8 weeks for Delta integration. Beacon deployment timeline depends entirely on Delta's facilities team (2-8 weeks). Total: 12-16 weeks of engineering, interleaved with Delta deployment timeline.

---

### Feature 4: Obstacle Detection

**Technical approach:**

This is the hardest feature. The requirements:
- **Latency:** <500ms from obstacle entering danger zone to audio alert
- **False negative rate:** Near zero (missed obstacle = injury)
- **False positive rate:** <5% (too many false alarms = user ignores alerts = back to zero value)
- **Processing:** Must be on-device. Cloud round-trip (2-5s) is unusable.
- **Range:** 2-5 meters ahead of walking direction
- **Obstacle types:** Poles, bollards, low-hanging branches, steps (up and down), holes, vehicles, other pedestrians, doors (open/closed), construction barriers, curbs, raised surfaces

**Approach A: Aria Gen 2 stereo depth (preferred if compute allows)**

Aria Gen 2's front stereo CV cameras (512x512, global shutter, 119° FOV) can produce dense depth maps. The question is whether the custom coprocessor can run stereo matching + obstacle classification at >10fps.

Pipeline:
```
Stereo CV frames (30fps) → On-device stereo matching → Dense depth map
→ Ground plane estimation (RANSAC) → Obstacle segmentation (anything above ground plane within 2-5m)
→ Threat assessment (is it in walking path? is it at head/torso/foot height?)
→ Alert generation → Bone conduction audio ("Stop" / "Step down" / "Low branch" / "Person ahead")
```

Target: 15-30fps processing, <200ms from capture to alert decision, <300ms for audio generation = <500ms total.

**Approach B: Dedicated depth hardware (fallback)**

If Aria Gen 2's coprocessor can't sustain the required framerate for dense stereo matching:

Option B1: **Luxonis OAK-D Lite** ($99)
- Stereo depth + RGB, onboard Intel Movidius Myriad X VPU
- 4 TOPS, runs MobileNet-SSD at 30fps
- Depth range: 0.2-19.1m, accurate to ~1% at 2m
- Size: 91 × 28 × 17.5mm — could mount on glasses temple or headband
- Power: ~2.5W via USB-C (needs companion battery)

Option B2: **Intel RealSense D405** (~$300)
- Active IR stereo, works in darkness
- 87° HFOV, up to 90fps depth at 640x480
- Range: 0.07-4m, sub-mm accuracy at 1m
- Size: 42 × 42 × 23mm
- Power: ~1.5W

Option B3: **Custom build with NVIDIA Jetson Orin Nano** (~$250)
- 40 TOPS, runs YOLO-NAS at >60fps
- Paired with any depth camera above
- Belt/pocket mounted, wired to glasses for audio
- Power: 7-15W (needs substantial battery)

**Safety testing protocol:**

This feature cannot ship without extensive safety validation. Proposed framework:

1. **Controlled environment testing** (Months 1-3 of obstacle detection work)
   - Indoor obstacle course with known hazard positions
   - Measure: detection rate, false positive rate, latency (instrumented with ground truth timers)
   - Target: >99% detection rate, <3% false positive rate, <500ms latency
   - Test with BLV users using white cane as backup (never glasses-only until validated)

2. **Semi-controlled outdoor testing** (Months 4-6)
   - Closed parking lot, then quiet residential streets
   - Introduce: moving obstacles (other pedestrians), varied lighting, weather
   - White cane backup mandatory
   - O&M specialist present for all sessions

3. **Real-world pilot** (Months 7-9)
   - Urban environment, accompanied by O&M specialist
   - Glasses + white cane (assistive layer, not replacement)
   - Log all missed detections and false alarms for model improvement
   - Never marketed as cane replacement — always "additional awareness layer"

**Key deliverables:**
- [ ] Stereo depth pipeline on Aria Gen 2 (benchmark throughput)
- [ ] Ground plane estimation + obstacle segmentation model
- [ ] Threat assessment logic (walking path prediction, collision course detection)
- [ ] Audio alert system (prioritized, spatial: "Stop — pole, 2 o'clock, 4 feet")
- [ ] Fallback hardware evaluation (if Aria compute insufficient)
- [ ] Controlled environment test rig
- [ ] Safety validation protocol with BLV testers
- [ ] Comprehensive logging and replay system for incident analysis

**Estimated effort:** 12-18 months to field-testable prototype. 18-24 months to pilot-ready (safety validated).

---

## Regulatory Considerations

### FDA Classification

**Low-hanging fruit (Features 1, 2, 3):** Likely NOT medical devices. These are assistive communication/navigation tools, similar to a talking GPS or a phone app. FDA has generally not regulated smartphone-based assistive apps for BLV as medical devices. The 2013 FDA guidance on mobile medical applications exempts "accessories that aid persons with disabilities" from medical device classification.

**Obstacle detection (Feature 4):** Gray area. If marketed as a safety device that prevents injury, it could be classified as a Class I or Class II medical device (similar to electronic travel aids like the UltraCane, which is registered as a Class I device with FDA). Key factor: **intended use claim**. If you claim "detects obstacles to prevent injury," that's a medical/safety claim. If you claim "provides additional awareness of surroundings," that's an assistive tool.

**Recommendation:** Consult FDA regulatory counsel before obstacle detection marketing claims. Budget $20-40K for a pre-submission meeting with FDA's CDRH division if pursuing formal classification. This is not a 6-month blocker — pre-sub meetings take 2-3 months to schedule.

### ADA / Accessibility Law

Not a barrier — this IS accessibility technology. ADA requires accommodations; this project provides them. If anything, ADA strengthens the case for partnerships (airports, airlines must accommodate BLV travelers).

### Biometric Privacy (BIPA, CCPA, GDPR)

Facial recognition triggers biometric data laws in several jurisdictions:
- **Illinois BIPA:** Requires informed written consent before collecting biometric identifiers. $1,000-$5,000 per violation.
- **CCPA/CPRA:** California requires notice + opt-out for biometric data sale/sharing.
- **GDPR:** Biometric data is "special category" — requires explicit consent.

**Mitigation:** Opt-in only enrollment, all processing and storage on-device (no cloud), user controls deletion, clear consent flow during setup. For a BLV assistive device with opt-in contacts, this is defensible. But get legal review before any pilot in Illinois.

---

## Partnership Requirements

| Partner | What They Provide | What You Need From Them | Timeline to Engage |
|---|---|---|---|
| **Meta (Project Aria)** | Aria Gen 2 hardware, SDK, research support | Device allocation (apply now, Q2 2026 rollout), API access, technical support channel | **Immediately** — applications are open now |
| **Delta Air Lines** | Terminal access, beacon deployment, flight API | Facilities team for beacon install, API credentials, designated terminal for pilot | **Month 2-3** (after nametags prototype proves concept) |
| **NFB (National Federation of the Blind)** | BLV tester recruitment, credibility, advocacy | Testing participants (10-20 for each phase), co-design input, public endorsement | **Month 1** — involve from day one |
| **ACB (American Council of the Blind)** | Additional tester pool, policy expertise | Same as NFB — use both organizations for broader representation | **Month 1** |
| **O&M Specialists** | Safety validation, real-world testing accompaniment | 2-3 certified O&M specialists for testing phases | **Month 3** (before outdoor testing) |
| **Lighthouse for the Blind (SF)** | Local testing facility, BLV community access | Testing space, participant recruitment in Bay Area | **Month 2** |

---

## Staffing Variants

---

### Variant A: Solo Developer (1 Person)

**Profile:** Senior full-stack engineer with ML experience. Comfortable with mobile (iOS/Android), embedded systems, and computer vision. Ideally has shipped a product before, not just research.

**What's realistic:**
- Features 1 and 2 (Layer 1) fully delivered
- Feature 3 software-ready (pending Delta infrastructure)
- Feature 4 prototyped on Aria, not field-validated

**What gets cut or delayed:**
- Layer 2 pedestrian nav (street-level awareness) is minimal — crosswalk detection only, no signal timing or construction rerouting
- Obstacle detection safety validation deferred (solo developer can't run safety tests and build simultaneously)
- Airport nav waits for Delta partnership (can't force external timelines)

**Month-by-Month Timeline:**

| Month | Focus | Milestone |
|---|---|---|
| **1** | Setup + Nametags prototype | Aria Gen 2 received, SDK configured. Face detection + embedding pipeline running on phone. Basic enrollment flow. |
| **2** | Nametags v1 | End-to-end working: Aria camera → phone processing → bone conduction announcement. 10-face database, <2s latency. Demo to NFB advisors. |
| **3** | Nametags field testing + Nav Layer 1 start | 4-week field test with 5 BLV users. Iterate on confidence thresholds, multi-face handling. Begin walking nav engine (Google Maps Directions API + BLV audio callouts). |
| **4** | Nav Layer 1 complete | Turn-by-turn walking with street names, distance, intersection warnings. Dual-frequency GNSS integration. Field test in 3 neighborhoods. |
| **5** | Nav Layer 2: Crosswalk detection | Train egocentric crosswalk detection model on Aria imagery. Collect training data (500+ crosswalk images across 5 cities). Basic model running. |
| **6** | Crosswalk detection + Obstacle detection R&D start | Crosswalk model >85% accuracy. Begin stereo depth pipeline on Aria Gen 2. Benchmark coprocessor throughput for dense stereo matching. **KEY DECISION: Can Aria run obstacle detection on-device at >10fps?** |
| **7** | Obstacle detection prototype | If Aria compute sufficient: ground plane estimation + basic obstacle segmentation running on-device. If not: order fallback hardware (OAK-D Lite + Jetson), begin integration. |
| **8** | Airport nav software | BLE positioning engine (phone-side). Indoor routing graph data structure. Audio nav callouts. Simulated testing with fake beacons in office space. |
| **9** | Airport nav + Delta integration | Integrate Delta flight API (if partnership secured). Test beacon positioning accuracy in controlled indoor environment. Prepare for terminal pilot. |
| **10** | Obstacle detection controlled testing | Indoor obstacle course. Measure detection rate, false positive rate, latency. Iterate on model. BLV tester sessions (3-5 users, O&M specialist present). |
| **11** | Integration + polish | Unified app with all features. Voice command system. Settings and preferences. Field testing across features with BLV advisory group. |
| **12** | Documentation + handoff | Technical documentation, deployment guide, training materials for BLV users. Public demo. Report to stakeholders. |

**12-month outcome:** Nametags production-ready. Pedestrian nav (basic + crosswalk) production-ready. Airport nav software-ready. Obstacle detection prototype with controlled-environment data, not field-validated.

**18-month extension (obstacle detection):**

| Month | Focus |
|---|---|
| **13-14** | Semi-controlled outdoor obstacle detection testing |
| **15-16** | Real-world pilot (urban, accompanied, cane + glasses) |
| **17-18** | Safety validation report, regulatory assessment, pilot-ready release |

---

### Variant B: Small Team (2 People)

**Profiles:**
- **Person 1 (ML/CV Lead):** Deep computer vision, stereo depth, on-device ML optimization. Owns obstacle detection and all CV models (crosswalk, signal, face embedding).
- **Person 2 (Platform/Integration Lead):** Mobile development, BLE, API integration, audio UX, testing infrastructure. Owns nav engine, airport nav, enrollment flows, voice commands.

**What parallelizes:**
- Nametags and Nav Layer 1 develop simultaneously (Person 1 on face pipeline, Person 2 on nav engine)
- Airport nav software (Person 2) overlaps with obstacle detection R&D (Person 1)
- Person 2 handles all Delta partnership integration while Person 1 focuses on the hard CV problems

**Month-by-Month Timeline:**

| Month | Person 1 (ML/CV) | Person 2 (Platform) |
|---|---|---|
| **1** | Face detection + embedding pipeline | Aria SDK setup, companion app scaffold, enrollment UX |
| **2** | Nametags integration + confidence tuning | Walking nav engine (Layer 1), BLV audio callout system |
| **3** | Crosswalk detection model (data collection + training) | Nametags field test with BLV users, nav field test |
| **4** | Crosswalk + signal detection models | Airport nav: BLE positioning engine, indoor routing |
| **5** | Stereo depth pipeline on Aria (obstacle R&D) | Airport nav: Delta API integration, simulated testing |
| **6** | **Obstacle detection prototype** (on-device). Key decision point. | Airport nav: beacon testing in controlled indoor env |
| **7** | Obstacle segmentation + threat assessment | Unified app integration (all features, voice commands) |
| **8** | Controlled environment obstacle testing | Delta terminal pilot prep (if beacons deployed) |
| **9** | Semi-controlled outdoor obstacle testing | Airport nav terminal pilot (with BLV testers + O&M) |
| **10** | Obstacle outdoor pilot (urban, accompanied) | Nav Layer 2: construction/obstruction detection |
| **11** | Obstacle safety validation | System-wide field testing, bug fixes, UX polish |
| **12** | Safety validation report, regulatory prep | Documentation, training materials, public demo |

**12-month outcome:** Nametags production-ready (month 3). Pedestrian nav with crosswalk + signal detection production-ready (month 6). Airport nav pilot complete (month 9). Obstacle detection in real-world pilot phase with preliminary safety data.

**Acceleration vs. solo:** ~4-5 months faster to feature completeness. Obstacle detection reaches outdoor pilot by month 10 instead of month 15.

---

### Variant C: Full Team (3 People)

**Profiles:**
- **Person 1 (ML/CV Lead):** Same as Variant B. Owns all computer vision and on-device ML.
- **Person 2 (Platform Lead):** Same as Variant B. Owns mobile app, nav engine, integrations.
- **Person 3 (Hardware + Testing Lead):** Embedded systems, custom hardware evaluation, testing infrastructure, BLV user research coordination. Owns obstacle detection hardware fallback, safety testing protocol, user studies.

**Why 3 matters:** Person 3 removes the single biggest bottleneck — the solo developer can't simultaneously build obstacle detection AND run rigorous safety testing. Person 3 also handles the custom hardware path if Aria's coprocessor isn't sufficient, without pulling Person 1 off the ML work.

**Month-by-Month Timeline:**

| Month | Person 1 (ML/CV) | Person 2 (Platform) | Person 3 (Hardware + Testing) |
|---|---|---|---|
| **1** | Face pipeline + embedding | App scaffold, enrollment UX | Aria Gen 2 benchmarking, test infrastructure setup, NFB/ACB outreach |
| **2** | Nametags integration | Walking nav Layer 1 | BLV advisory board formed, nametags controlled test protocol |
| **3** | Crosswalk + signal detection models | Nametags field test coordination | Nametags field test execution (5-10 BLV users), data collection |
| **4** | Stereo depth pipeline (obstacle R&D) | Airport nav: BLE engine + routing | Fallback hardware eval (OAK-D, RealSense, Jetson). Indoor obstacle course built. |
| **5** | Obstacle segmentation on Aria | Airport nav: Delta API integration | **Obstacle controlled testing begins** (using Person 1's prototype) |
| **6** | Obstacle model iteration (from test data) | Airport nav: simulated testing | Controlled test results. **Hardware decision: Aria on-device vs. custom.** |
| **7** | Obstacle threat assessment | Unified app, voice commands | If custom HW needed: integration build. Delta terminal beacon deployment support. |
| **8** | Obstacle model refinement | Delta terminal pilot prep | Semi-controlled outdoor obstacle testing begins |
| **9** | Nav Layer 2 (construction, obstruction) | Delta terminal pilot execution | Outdoor obstacle testing (residential streets) |
| **10** | Model optimization (speed, accuracy) | System-wide integration testing | Urban obstacle pilot (accompanied, with O&M) |
| **11** | Final model training + edge cases | UX polish, settings, preferences | Safety validation data analysis, regulatory assessment |
| **12** | Documentation of ML systems | App documentation, deployment | Safety validation report, training materials, public demo |

**12-month outcome:** All four features delivered. Nametags production-ready (month 3). Pedestrian nav production-ready (month 6). Airport nav piloted (month 9). Obstacle detection urban pilot complete with safety validation data (month 12). Regulatory assessment in hand.

**Acceleration vs. 2-person:** ~3 months faster on obstacle detection (reaches urban pilot by month 10 vs. month 13). The real gain isn't speed — it's rigor. Person 3 ensures safety testing happens in parallel with development, not after.

---

## Comparative Summary

| Milestone | 1 Person | 2 People | 3 People |
|---|---|---|---|
| Nametags production-ready | Month 3 | Month 3 | Month 3 |
| Pedestrian nav (basic + crosswalk) | Month 6 | Month 4 | Month 4 |
| Airport nav pilot | Month 10 | Month 9 | Month 9 |
| Obstacle detection controlled testing | Month 10 | Month 8 | Month 5 |
| Obstacle detection urban pilot | Month 15 | Month 10 | Month 10 |
| Obstacle safety validation complete | Month 18 | Month 12 | Month 12 |
| All features production-ready | Month 18 | Month 14 | Month 12 |

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| **Aria Gen 2 coprocessor insufficient for real-time obstacle detection** | Medium | High | Evaluate by month 5-6. Fallback to dedicated depth hardware (OAK-D + Jetson). Adds 2-3 months and bulk. |
| **Delta partnership stalls or collapses** | Medium | Medium | Airport nav software is generic — can pivot to any venue with BLE beacons. Approach other airlines or airport authorities directly. Indoor nav tech transfers to malls, hospitals, offices. |
| **BLV users reject glasses form factor** | Low | High | Co-design from day 1 with NFB/ACB advisors. Aria Gen 2 is designed for all-day wear (~38g). If rejected, pivot to clip-on module (OrCam-style). |
| **False positive fatigue on obstacle detection** | High | High | Aggressive tuning: only alert for imminent collision course, not all obstacles. Configurable sensitivity. "Heads-up" mode (passive spatial audio) vs. "alert" mode (urgent stop). |
| **Facial recognition backlash (privacy)** | Medium | Medium | Opt-in only, local storage, BLV accessibility framing, legal review in BIPA jurisdictions. Consider limiting pilot to non-BIPA states initially. |
| **Stereo depth fails in rain/darkness/glare** | Medium | High (obstacle detection) | Aria Gen 2 CV cameras have >110dB HDR. Active IR depth (RealSense D405) works in darkness. Rain remains hard for all stereo systems — may need ultrasonic fallback for severe weather. |
| **Aria Gen 2 program access denied** | Low | Critical | Apply immediately (applications open now). Tom Siebel's name + non-profit BLV mission is exactly what Meta's research program wants to support. Backup: start prototyping on Aria Gen 1 (less capable but available). |
| **Regulatory classification as medical device** | Low-Medium | Medium | Avoid safety/injury-prevention marketing claims. Frame as "environmental awareness tool." Budget $20-40K for FDA pre-submission if pursuing formal clarity. |
| **User safety incident during testing** | Low | Critical | White cane mandatory during all testing phases. O&M specialist present. Never market as cane replacement. Comprehensive liability waivers. Insurance. |

---

## Budget Estimates (Annual)

Money isn't the constraint, but for completeness:

| Item | 1 Person | 2 People | 3 People |
|---|---|---|---|
| **Engineering salaries** | $200-300K | $400-600K | $600-900K |
| **Aria Gen 2 devices** (5-10 units) | $0 (research program) | $0 | $0 |
| **Fallback hardware** (OAK-D, Jetson, RealSense) | $2-5K | $2-5K | $5-10K |
| **BLE beacons** (airport pilot, 1 terminal) | $10-20K | $10-20K | $10-20K |
| **Cloud compute** (training, not inference) | $5-15K | $10-20K | $10-20K |
| **BLV tester compensation** | $10-20K | $15-30K | $20-40K |
| **O&M specialist consulting** | $10-20K | $15-25K | $20-30K |
| **Legal** (regulatory, privacy) | $20-40K | $20-40K | $20-40K |
| **Travel** (Delta terminal, testing sites) | $10-20K | $15-30K | $20-40K |
| **Insurance** (liability for testing) | $10-20K | $10-20K | $10-20K |
| **Total Year 1** | **$280-460K** | **$500-790K** | **$720-1,020K** |

---

## Immediate Next Steps (Week 1)

Regardless of team size:

1. **Apply for Aria Gen 2** — applications are open now, Q2 2026 rollout. Apply via both [academic](https://facebookresearch.github.io/) and [corporate](https://www.meta.com/blog/aria-gen-2-updates/) tracks. The BLV assistive mission is compelling for Meta's program.

2. **Contact NFB and ACB** — introduce the project, request advisory board participation, begin recruiting BLV testers. Do this before writing any code. Co-design, not design-for.

3. **Order fallback hardware** — 2x OAK-D Lite ($99 each), 1x Jetson Orin Nano ($250), 1x RealSense D405 ($300). Total: ~$750. Have them on hand for month 5-6 hardware decision.

4. **Set up companion phone dev environment** — iOS (ARKit) and Android (ARCore). Face detection/embedding libraries. Google Maps Directions API key.

5. **Begin Delta conversation** — Tom Siebel's network can open this door. The ask: one terminal, beacon deployment, API access. Frame as accessibility initiative (Delta gets massive PR value).

---

## What Success Looks Like

**Month 3:** A BLV person puts on Aria glasses, walks into a room, and hears "Sarah... Michael... and someone I don't recognize" whispered through bone conduction. They smile. That's the demo.

**Month 6:** A BLV person navigates from their apartment to a coffee shop 4 blocks away. The glasses announce every intersection, detect the crosswalk, and warn about a construction barrier. They arrive without touching their phone.

**Month 9:** A BLV traveler arrives at Atlanta Hartsfield-Jackson. The glasses guide them from the curb through security to Gate T4, announce a gate change to T7, reroute, and tell them when boarding begins. They never ask a stranger for directions.

**Month 12:** A BLV person walks down a busy street. The glasses whisper "pole, 2 o'clock, 3 feet" and they step left without breaking stride. Not a replacement for the cane. An extra pair of eyes.

---

*This plan assumes work begins May 2026. All timelines shift accordingly if start date differs. Hardware availability (Aria Gen 2 Q2 2026 rollout) is the first external dependency.*

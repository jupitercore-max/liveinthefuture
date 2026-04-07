# The Mesh That Connects Everything: Meshtastic + GMRS + Home Assistant

**Created:** 2026-04-07 (Iteration 3)
**Status:** Active — new cross-hobby convergence
**Urgency:** Medium (no deadline, but the project is ripe)
**Decision:** Should Ray build a Meshtastic mesh network that ties into his GMRS repeater and Home Assistant?

## The Convergence Ray Hasn't Seen Yet

Ray has three separate hobby/infrastructure threads that naturally converge:

1. **GMRS Radio** — Licensed (WSLY991), BTECH GMRS-50 PRO base station, own repeater at house (REP-MO, Ch 51, 462.550 MHz), 7 programmed repeaters, Baofeng handhelds
2. **ESP32 / DIY Electronics** — Interested in HLK-LD2451 radar speed sign ($8 + ESP32), Flipper Zero / Nordic nRF research, police scanner integration
3. **Home Automation** — Wants Home Assistant on Mac Mini via Docker, no action yet

These converge in **Meshtastic**: an open-source LoRa mesh networking platform that runs on ESP32.

## How It Works

**Meshtastic** uses cheap LoRa radios (868/915 MHz ISM band) on ESP32 boards to create a self-healing mesh network. Range: 1-10+ km per hop, no internet or cell service required.

### The Stack

```
[Meshtastic Nodes]  →  [MQTT Broker]  →  [Home Assistant]  →  [Notifications]
   (ESP32+LoRa)         (Mosquitto)       (Mac Mini Docker)    (GMRS relay?)
   ~$25 each            Free               Already planned      Already has
```

### Meshtastic Has an Official Home Assistant Integration

- GitHub: meshtastic/home-assistant (official repo)
- Connects via MQTT (Meshtastic → MQTT broker → HA)
- Exposes as HA entities: battery level, GPS position, temperature, humidity, pressure, air quality
- HA automations can trigger on Meshtastic events (node goes offline, sensor threshold, incoming message)
- Full docs: meshtastic.org/docs/software/integrations/mqtt/home-assistant/

### Hardware: ~$25/node

- **Heltec V3 ESP32-S3 + SX1262 LoRa** — $25 on Amazon, includes OLED display, battery connector
- Solar-powered nodes possible with small panel ($10) — deploy-and-forget
- Range: line-of-sight 5-10km, urban 1-3km. Ray's property + neighborhood easily covered.

## What Ray Could Build

### Phase 1: Property Mesh ($75)
- 3 Meshtastic nodes: one at house (gateway), one at property edge near oaks, one at mailbox/driveway
- Gateway node connects to WiFi → MQTT → Home Assistant
- Sensors: temperature, humidity (relevant for tussock moth monitoring!), motion detection

### Phase 2: Emergency Communication ($0 additional)
- Meshtastic supports text messaging over LoRa — works WITHOUT internet
- During a PG&E PSPS (public safety power shutoff) or earthquake: mesh still works
- Family members with Meshtastic app on phones can communicate even when cell towers are down
- GMRS handhelds remain voice backup; Meshtastic handles data/text

### Phase 3: GMRS + Meshtastic Bridge (experimental)
- The legal question: can Meshtastic trigger a notification that gets relayed via GMRS?
- Answer: Yes, if a human pushes the button. Automated GMRS transmissions are prohibited (47 CFR Part 95).
- But: HA automation → phone notification → human key-up is perfectly legal
- Or: HA automation → text-to-speech on a speaker → Ray grabs Baofeng and transmits

### Phase 4: Community Mesh (long-term)
- Menlo Oaks neighbors could join the mesh — disaster preparedness network
- Ray's GMRS repeater (REP-MO) becomes the voice backbone; Meshtastic becomes the data backbone
- This is exactly the kind of resilient communication infrastructure that the GMRS hobby points toward

## Why This Matters for Ray

1. **It's a weekend project, not a commitment.** $75 for 3 nodes, flash firmware, configure HA. Done.
2. **It connects to the tussock moth situation.** Temperature and humidity sensors near the oaks would provide data for treatment timing decisions.
3. **It's the Home Assistant on-ramp.** Instead of jumping into full home automation, start with Meshtastic as the first HA integration. Small, contained, useful.
4. **It's disaster preparedness.** Menlo Park is in earthquake country. A mesh network that works without internet is genuinely useful for family safety.
5. **It's a LITF article.** "Building a $75 Emergency Mesh Network for Your Neighborhood" — original research, novel contribution, hardware DIY, actionable.

## The Kill Test for the Article
- **Novel contribution?** Yes — the specific convergence of Meshtastic + GMRS + HA hasn't been written about as a unified system.
- **Would a knowledgeable reader learn something?** Yes — most GMRS operators don't know about Meshtastic, most Meshtastic users don't have GMRS licenses.
- **Is it actionable?** Extremely — exact parts list, firmware instructions, HA config.

## What's Blocking This
- Mac Mini SSH is broken (DNS resolution failure for macmini.rayhe.net, noted 2026-03-30)
- Tailscale NeedsLogin — needs auth key from Ray
- Without Mac Mini, Home Assistant can't be set up
- But: Meshtastic mesh can be set up independently and HA added later

---
*The technical pieces exist. The legal framework is clear. The hardware is cheap. The use cases are real. Ray just hasn't connected these dots yet.*

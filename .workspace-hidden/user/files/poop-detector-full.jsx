import { useState } from "react";

const sections = ["Overview", "BOM", "Wiring", "Firmware", "BLE", "Enclosure"];

const bom = [
  { ref:"U1", part:"Seeed XIAO nRF52840", price:"$9.90", qty:1,
    desc:"Main MCU — BLE 5.0, 64MHz Cortex-M4F, onboard LiPo charging, USB-C, 21×17mm. Tiny and has everything.",
    link:"seeedstudio.com/Seeed-XIAO-BLE-nRF52840" },
  { ref:"U2", part:"Sensirion SGP40 (Adafruit breakout)", price:"$9.95", qty:1,
    desc:"MEMS metal-oxide VOC sensor. Highly sensitive to H₂S, ammonia, skatole, and mercaptans — poop's primary volatile signature. I²C at 0x59.",
    link:"adafruit.com/product/4829" },
  { ref:"U3", part:"Sensirion SHT41 (Adafruit breakout)", price:"$5.95", qty:1,
    desc:"Temp + humidity sensor. Required input for SGP40's VOCindex compensation algorithm. ±0.2°C / ±1.8% RH. I²C at 0x44.",
    link:"adafruit.com/product/5776" },
  { ref:"BT1", part:"LiPo 500mAh 3.7V JST-PH 2.0mm", price:"$7.95", qty:1,
    desc:"XIAO onboard charger handles LiPo at 50mA via USB-C. ~200h runtime in normal operation (BLE advertising + 1s polling).",
    link:"adafruit.com/product/1578" },
  { ref:"LS1", part:"Passive piezo buzzer 3–5V", price:"$1.50", qty:1,
    desc:"PWM-driven audible alert. 440Hz tone when alert threshold exceeded. Optional but great for across-the-room awareness.",
    link:"adafruit.com/product/160" },
  { ref:"LED1", part:"RGB LED common cathode 3mm", price:"$0.50", qty:1,
    desc:"Green = clean air, Yellow = VOC rising, Red = poop detected." },
  { ref:"R1-3", part:"100Ω resistors 1/4W", price:"$0.30", qty:3,
    desc:"Current limiting for each RGB LED channel." },
  { ref:"SW1", part:"6mm tactile pushbutton", price:"$0.25", qty:1,
    desc:"Baseline reset button — recalibrates VOCindex to current ambient if you're in a smelly room already." },
];

const wiring = [
  { from:"XIAO 3V3", to:"SGP40 VIN + SHT41 VIN", note:"Both sensors are 3.3V" },
  { from:"XIAO GND", to:"SGP40 GND, SHT41 GND, LED cathode, buzzer −", note:"Common ground" },
  { from:"XIAO SDA (P0.06)", to:"SGP40 SDA + SHT41 SDA", note:"I²C shared, onboard pullups OK" },
  { from:"XIAO SCL (P0.08)", to:"SGP40 SCL + SHT41 SCL", note:"I²C shared" },
  { from:"XIAO D2 (P0.04)", to:"100Ω → LED Red anode", note:"PWM-capable" },
  { from:"XIAO D3 (P0.05)", to:"100Ω → LED Green anode", note:"PWM-capable" },
  { from:"XIAO D4 (P0.28)", to:"100Ω → LED Blue anode", note:"" },
  { from:"XIAO D5 (P0.29)", to:"Piezo buzzer +", note:"PWM tone generation" },
  { from:"XIAO D1 (P0.02)", to:"Tactile switch → GND", note:"INPUT_PULLUP in firmware" },
  { from:"XIAO JST", to:"LiPo battery", note:"Onboard charger, USB-C charges" },
];

const firmware = [
  { phase:"Boot & Sensor Init",
    detail:"Init I²C at 400kHz. Start SHT41 first (1ms startup). Then SGP40 — run a mandatory 10s conditioning pass discarding readings. The SGP40 internal state machine requires readings every 1s to stay healthy." },
  { phase:"VOCindex Loop (1Hz)",
    detail:"Every 1000ms: (1) read SHT41 for temp+RH, (2) pass raw SGP40 resistance + temp + RH into Sensirion's open-source VOCindex algorithm. Output is 0–500. Baseline ~100 = clean air. Poop events typically spike 200–400+. Use Sensirion's Arduino SGP40 library which bundles the algorithm." },
  { phase:"Zone State Machine",
    detail:"Three zones — CLEAN: index < 130 (green LED), WARN: 130–180 (yellow LED), ALERT: > 180 (red LED + buzzer 440Hz 100ms pulse). Require 3 consecutive readings in a zone before transitioning to avoid false triggers from brief spikes." },
  { phase:"Baseline Reset",
    detail:"On SW1 press: call sgp40_execute_conditioning() to flush the VOCindex baseline. Useful if the device is powered on in an already-stinky room. Confirm with 3× blue LED blink." },
  { phase:"BLE Advertisement",
    detail:"Continuously broadcast non-connectable advertisements at 500ms interval. Manufacturer data payload: [company_id 0xFFFF][voc_index uint16][zone uint8][battery_pct uint8]. A phone app can read real-time status without ever pairing." },
  { phase:"BLE GATT (Connected Mode)",
    detail:"Custom 128-bit UUID service. Characteristic 0x0001 (Notify+Read): sends {voc_index, zone, temp_c×100, rh_pct, batt_mv} every 2s. Characteristic 0x0002 (Write): accepts {warn_threshold, alert_threshold, buzzer_enable} for remote config." },
  { phase:"Power Management",
    detail:"Between SGP40 samples, drop to WFE (Wait For Event) sleep. HFCLK only active during I²C and BLE TX. Disable UART, ADC when not sampling battery. Expected average current: ~1.5mA → ~330h on 500mAh. With buzzer events that's realistically >6 months standby." },
];

const enclosureNotes = [
  "Print in PLA — a small 45×35×20mm box fits everything neatly.",
  "Cut a 12mm round hole in the top face directly over the SGP40 sensor. Cover with a small square of non-woven acoustic fabric (from a speaker grille) to protect the sensor from dust while still allowing airflow.",
  "Mount LED through a 3mm hole in the front face.",
  "Mount piezo through a 10mm hole in the side or top.",
  "USB-C port on one short end for charging.",
  "Velcro or a clip on the back to mount to the changing table edge or crib rail.",
  "Ideal placement: 20–40cm from the diaper area, not inside an enclosed cabinet.",
];

const Tag = ({c, children}) => (
  <span style={{
    background: c+"18", border:`1px solid ${c}44`, color: c,
    fontSize:"10px", padding:"2px 7px", borderRadius:"3px", marginRight:"5px", fontWeight:600
  }}>{children}</span>
);

const Section = ({title, children}) => (
  <div style={{ marginBottom:"32px" }}>
    <div style={{
      display:"flex", alignItems:"center", gap:"12px", marginBottom:"16px"
    }}>
      <div style={{ height:"1px", width:"20px", background:"#facc15" }}/>
      <h2 style={{ margin:0, fontSize:"11px", letterSpacing:"2px", color:"#facc15", fontWeight:700 }}>{title.toUpperCase()}</h2>
      <div style={{ height:"1px", flex:1, background:"#1e2535" }}/>
    </div>
    {children}
  </div>
);

const body = { color:"#94a3b8", fontSize:"12px", lineHeight:"1.8", margin:"0 0 12px" };

export default function App() {
  const [tab, setTab] = useState("Overview");

  return (
    <div style={{ fontFamily:"'IBM Plex Mono',monospace", background:"#0a0d14", color:"#e2e8f0", minHeight:"100vh" }}>

      {/* Header */}
      <div style={{ background:"#0f1117", borderBottom:"2px solid #facc15", padding:"24px 28px 18px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"6px" }}>
          <span style={{ fontSize:"26px" }}>💩</span>
          <h1 style={{ margin:0, fontSize:"20px", fontWeight:700, color:"#facc15", letterSpacing:"-0.5px" }}>
            BABY POOP DETECTOR
          </h1>
          <span style={{
            background:"#facc1518", border:"1px solid #facc1555", color:"#facc15",
            fontSize:"9px", padding:"2px 7px", borderRadius:"2px", letterSpacing:"2px"
          }}>REV 1.0</span>
        </div>
        <p style={{ margin:0, color:"#64748b", fontSize:"11px" }}>
          nRF52840 · Sensirion SGP40 VOC · BLE 5.0 · LiPo · ~$36 BOM
        </p>
      </div>

      {/* Nav */}
      <div style={{ display:"flex", background:"#0a0d14", borderBottom:"1px solid #1e2535", overflowX:"auto" }}>
        {sections.map(s => (
          <button key={s} onClick={() => setTab(s)} style={{
            background: tab===s ? "#facc1510" : "transparent",
            border:"none", borderBottom: tab===s ? "2px solid #facc15" : "2px solid transparent",
            color: tab===s ? "#facc15" : "#475569",
            padding:"11px 18px", fontSize:"10px", letterSpacing:"1.5px",
            cursor:"pointer", fontFamily:"inherit", fontWeight: tab===s ? 700 : 400,
            whiteSpace:"nowrap"
          }}>{s.toUpperCase()}</button>
        ))}
      </div>

      {/* Body */}
      <div style={{ padding:"28px", maxWidth:"860px" }}>

        {/* ── OVERVIEW ── */}
        {tab==="Overview" && <>
          <Section title="How It Works">
            <p style={body}>
              Baby feces emits a predictable cocktail of volatile organic compounds:
              {" "}<Tag c="#f87171">H₂S</Tag><Tag c="#fb923c">ammonia</Tag>
              <Tag c="#facc15">skatole</Tag><Tag c="#a78bfa">indole</Tag>
              <Tag c="#34d399">methyl mercaptan</Tag>
            </p>
            <p style={body}>
              The SGP40 MEMS metal-oxide sensor is extremely sensitive to all of these compounds.
              Sensirion's open-source VOCindex algorithm converts raw resistance into a 0–500 index,
              temperature- and humidity-compensated by the SHT41. Clean air baseline = ~100.
              A poop event typically spikes to 200–400+ within 15–30 seconds of diaper opening.
            </p>
          </Section>

          <Section title="Block Diagram">
            <div style={{ background:"#060810", border:"1px solid #1e2535", borderRadius:"4px", padding:"20px" }}>
              <pre style={{ margin:0, fontSize:"12px", color:"#94a3b8", lineHeight:"1.7" }}>{
`┌──────────────────────────────────────────────────────┐
│                  XIAO nRF52840                       │
│                                                      │
│   I²C 400kHz ──┬── SGP40  addr 0x59  VOC resistance │
│                └── SHT41  addr 0x44  Temp + RH       │
│                                                      │
│   GPIO ─────────── RGB LED  (status indicator)      │
│   PWM  ─────────── Piezo buzzer  (alert tone)       │
│   INPUT_PULLUP ─── Reset button  (baseline clear)   │
│                                                      │
│   BLE 5.0 ──────── Advertisement (no pairing req'd) │
│              └──── GATT service  (config + notify)  │
│                                                      │
│   JST ──────────── LiPo 500mAh  (USB-C charging)   │
└──────────────────────────────────────────────────────┘`}
              </pre>
            </div>
          </Section>

          <Section title="Sensor Comparison">
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"10px" }}>
              {[
                { name:"SGP40 ← chosen", good:"Best poop-VOC tuning, Sensirion VOCindex algo, $10, simple I²C", bad:"Needs external T/RH input", sel:true },
                { name:"ENS160", good:"TVOC in ppb + eCO2 output, simple", bad:"Less library support on nRF, longer warmup", sel:false },
                { name:"BME688", good:"All-in-one (VOC+T+RH+P)", bad:"BSEC library complexity, less fecal-VOC tuning", sel:false },
              ].map(s => (
                <div key={s.name} style={{
                  background: s.sel ? "#facc1508" : "#060810",
                  border:`1px solid ${s.sel ? "#facc15" : "#1e2535"}`,
                  borderRadius:"4px", padding:"14px"
                }}>
                  <div style={{ color: s.sel?"#facc15":"#475569", fontWeight:700, fontSize:"11px", marginBottom:"10px" }}>{s.name}</div>
                  <div style={{ color:"#4ade80", fontSize:"10px", lineHeight:"1.6", marginBottom:"6px" }}>+ {s.good}</div>
                  <div style={{ color:"#f87171", fontSize:"10px", lineHeight:"1.6" }}>− {s.bad}</div>
                </div>
              ))}
            </div>
          </Section>
        </>}

        {/* ── BOM ── */}
        {tab==="BOM" && <>
          <Section title="Bill of Materials — Est. Total ~$36">
            {bom.map((item, i) => (
              <div key={i} style={{
                background:"#060810", border:"1px solid #1e2535", borderRadius:"4px",
                padding:"14px 16px", marginBottom:"8px",
                display:"grid", gridTemplateColumns:"48px 1fr 64px", gap:"14px", alignItems:"start"
              }}>
                <div style={{ color:"#facc15", fontSize:"10px", fontWeight:700, paddingTop:"2px" }}>{item.ref}</div>
                <div>
                  <div style={{ color:"#e2e8f0", fontWeight:700, fontSize:"12px", marginBottom:"4px" }}>{item.part}</div>
                  <div style={{ color:"#475569", fontSize:"11px", lineHeight:"1.6" }}>{item.desc}</div>
                  {item.link && <div style={{ color:"#38bdf8", fontSize:"10px", marginTop:"4px" }}>→ {item.link}</div>}
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ color:"#4ade80", fontWeight:700, fontSize:"13px" }}>{item.price}</div>
                  <div style={{ color:"#475569", fontSize:"10px" }}>×{item.qty}</div>
                </div>
              </div>
            ))}
            <div style={{
              background:"#facc1510", border:"1px solid #facc15", borderRadius:"4px",
              padding:"12px 16px", display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"4px"
            }}>
              <span style={{ color:"#facc15", fontSize:"11px", letterSpacing:"1px" }}>TOTAL ESTIMATED</span>
              <span style={{ color:"#facc15", fontSize:"20px", fontWeight:700 }}>~$36</span>
            </div>
          </Section>
        </>}

        {/* ── WIRING ── */}
        {tab==="Wiring" && <>
          <Section title="Pin Connections">
            <p style={{ ...body, marginBottom:"18px" }}>
              SGP40 I²C address: 0x59. SHT41: 0x44. No conflicts. XIAO's onboard 4.7kΩ I²C pull-ups
              are sufficient — do not add external ones.
            </p>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"11px" }}>
              <thead>
                <tr style={{ borderBottom:"1px solid #facc15" }}>
                  {["FROM","TO","NOTE"].map(h => (
                    <th key={h} style={{ textAlign:"left", padding:"8px 12px", color:"#facc15", fontSize:"9px", letterSpacing:"1.5px" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {wiring.map((r,i) => (
                  <tr key={i} style={{ borderBottom:"1px solid #1e2535", background: i%2===0?"#06081040":"transparent" }}>
                    <td style={{ padding:"9px 12px", color:"#4ade80", fontFamily:"monospace", fontSize:"11px" }}>{r.from}</td>
                    <td style={{ padding:"9px 12px", color:"#38bdf8", fontFamily:"monospace", fontSize:"11px" }}>{r.to}</td>
                    <td style={{ padding:"9px 12px", color:"#475569", fontSize:"11px" }}>{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          <Section title="Placement Notes">
            <ul style={{ color:"#94a3b8", fontSize:"12px", lineHeight:"2.2", paddingLeft:"18px", margin:0 }}>
              <li>Mount SGP40 <strong style={{color:"#e2e8f0"}}>facing upward</strong> with a clear ventilation path — don't enclose it</li>
              <li>Keep sensor away from the LiPo battery (LiPo off-gassing can pollute the baseline)</li>
              <li>Buzzer should face outward through a hole in the enclosure lid</li>
              <li>Place device <strong style={{color:"#e2e8f0"}}>20–40cm from diaper area</strong> for best response time</li>
            </ul>
          </Section>
        </>}

        {/* ── FIRMWARE ── */}
        {tab==="Firmware" && <>
          <Section title="Firmware Architecture">
            <p style={{ ...body, marginBottom:"20px" }}>
              Recommend <strong style={{color:"#e2e8f0"}}>Zephyr RTOS</strong> with Nordic's nRF Connect SDK — best BLE stack and power management.
              Alternatively, Arduino + Adafruit nRF52 BSP works fine for prototyping and the Sensirion Arduino SGP40 library is excellent.
            </p>
            {firmware.map((f,i) => (
              <div key={i} style={{
                display:"grid", gridTemplateColumns:"180px 1fr", gap:"0",
                borderBottom:"1px solid #1e2535", marginBottom:"0"
              }}>
                <div style={{
                  background:"#060810", padding:"14px 16px",
                  borderRight:"1px solid #1e2535",
                  color:"#facc15", fontSize:"10px", fontWeight:700, lineHeight:"1.5"
                }}>{f.phase}</div>
                <div style={{ padding:"14px 16px", color:"#94a3b8", fontSize:"11px", lineHeight:"1.7" }}>{f.detail}</div>
              </div>
            ))}
          </Section>

          <Section title="Threshold Tuning">
            <p style={body}>
              These defaults are starting points. After building, run the device in a clean room for
              24–48h to observe your ambient VOCindex baseline, then adjust thresholds accordingly.
              High-altitude or very dry environments may read differently.
            </p>
            <div style={{ display:"flex", gap:"12px" }}>
              {[
                { zone:"CLEAN", range:"< 130", color:"#4ade80" },
                { zone:"WARNING", range:"130 – 180", color:"#facc15" },
                { zone:"ALERT 💩", range:"> 180", color:"#f87171" },
              ].map(z => (
                <div key={z.zone} style={{
                  flex:1, background:"#060810", border:`1px solid ${z.color}44`,
                  borderRadius:"4px", padding:"14px", textAlign:"center"
                }}>
                  <div style={{ color:z.color, fontSize:"10px", letterSpacing:"1px", fontWeight:700, marginBottom:"6px" }}>{z.zone}</div>
                  <div style={{ color:z.color, fontSize:"18px", fontWeight:700 }}>{z.range}</div>
                </div>
              ))}
            </div>
          </Section>
        </>}

        {/* ── BLE ── */}
        {tab==="BLE" && <>
          <Section title="BLE Advertisement (no pairing required)">
            <p style={body}>
              The device continuously broadcasts a manufacturer data advertisement. Any app with BLE scan
              access can read real-time status without ever connecting.
            </p>
            <div style={{ background:"#060810", border:"1px solid #1e2535", borderRadius:"4px", padding:"16px" }}>
              <pre style={{ margin:0, fontSize:"11px", color:"#94a3b8", lineHeight:"1.8" }}>{
`Adv interval: 500ms
Payload (manufacturer data):
  Byte 0–1  company_id    0xFF 0xFF  (test/prototype)
  Byte 2–3  voc_index     uint16 LE  (0–500)
  Byte 4    zone          uint8      (0=clean, 1=warn, 2=alert)
  Byte 5    battery_pct   uint8      (0–100)`}
              </pre>
            </div>
          </Section>

          <Section title="GATT Service (connected mode)">
            <p style={body}>Service UUID: <code style={{color:"#38bdf8"}}>12345678-0000-1000-8000-00805f9b34fb</code></p>
            {[
              { name:"VOC_STATUS", uuid:"...0001...", props:"Read + Notify",
                payload:"{ voc_index: uint16, zone: uint8, temp_c: int16 (×100), rh_pct: uint8, batt_mv: uint16 } · notified every 2s" },
              { name:"CONFIG", uuid:"...0002...", props:"Write",
                payload:"{ warn_threshold: uint16, alert_threshold: uint16, buzzer_enable: uint8 } · write to update device config" },
            ].map(c => (
              <div key={c.name} style={{
                background:"#060810", border:"1px solid #1e2535", borderRadius:"4px",
                padding:"14px 16px", marginBottom:"10px"
              }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"8px" }}>
                  <span style={{ color:"#e2e8f0", fontWeight:700, fontSize:"12px" }}>{c.name}</span>
                  <Tag c="#38bdf8">{c.props}</Tag>
                </div>
                <div style={{ color:"#475569", fontSize:"10px", fontFamily:"monospace", lineHeight:"1.8" }}>{c.uuid}</div>
                <div style={{ color:"#94a3b8", fontSize:"11px", marginTop:"6px", lineHeight:"1.6" }}>{c.payload}</div>
              </div>
            ))}
          </Section>

          <Section title="App Integration">
            <ul style={{ color:"#94a3b8", fontSize:"12px", lineHeight:"2.2", paddingLeft:"18px", margin:0 }}>
              <li><strong style={{color:"#e2e8f0"}}>iOS/Android</strong>: Use nRF Connect app (Nordic) to test immediately with no custom app needed</li>
              <li><strong style={{color:"#e2e8f0"}}>Custom app</strong>: React Native + react-native-ble-plx for full integration with phone alerts/push notifications</li>
              <li><strong style={{color:"#e2e8f0"}}>Home Assistant</strong>: ESPHome-style BLE passive scan can ingest the advertisement data directly to HA sensors</li>
              <li><strong style={{color:"#e2e8f0"}}>Shortcuts (iOS)</strong>: BLE scan + Shortcut automation → push notification when zone = ALERT</li>
            </ul>
          </Section>
        </>}

        {/* ── ENCLOSURE ── */}
        {tab==="Enclosure" && <>
          <Section title="3D Print Enclosure">
            <p style={body}>Target outer dimensions: approximately 48 × 36 × 22mm — fits all components with room.</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", marginBottom:"20px" }}>
              {[
                { label:"Sensor Vent", val:"12mm round hole directly over SGP40, covered with non-woven acoustic fabric" },
                { label:"LED Window", val:"3mm hole in front face, LED press-fit flush" },
                { label:"Buzzer Port", val:"10mm hole in top or side face" },
                { label:"USB-C Charging", val:"Slot on short end for XIAO USB-C port" },
                { label:"Reset Button", val:"1.5mm hole aligned to tactile switch" },
                { label:"Mounting", val:"Velcro strip or integrated rail clip for changing table edge" },
              ].map(n => (
                <div key={n.label} style={{
                  background:"#060810", border:"1px solid #1e2535", borderRadius:"4px", padding:"12px 14px"
                }}>
                  <div style={{ color:"#facc15", fontSize:"10px", fontWeight:700, marginBottom:"4px" }}>{n.label}</div>
                  <div style={{ color:"#94a3b8", fontSize:"11px", lineHeight:"1.6" }}>{n.val}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Critical: Sensor Airflow">
            <div style={{
              background:"#f8711510", border:"1px solid #f87115", borderRadius:"4px", padding:"16px"
            }}>
              <div style={{ color:"#f87171", fontWeight:700, fontSize:"11px", marginBottom:"8px" }}>⚠ AIRFLOW WARNING</div>
              <p style={{ ...body, margin:0, color:"#fca5a5" }}>
                The SGP40 must have free airflow. Do not fully enclose it. The sensor vent hole + acoustic fabric
                is mandatory. If the sensor is sealed, response time degrades from ~20s to 2+ minutes.
                The acoustic fabric keeps dust off the sensor element without restricting airflow.
              </p>
            </div>
          </Section>

          <Section title="Next Steps After Build">
            <ol style={{ color:"#94a3b8", fontSize:"12px", lineHeight:"2.2", paddingLeft:"18px", margin:0 }}>
              <li>Run 48h baseline calibration period in the nursery — device learns the ambient VOCindex</li>
              <li>Optionally log VOCindex readings over USB serial and adjust thresholds based on real diaper events</li>
              <li>Add a log of alert timestamps to GATT for a poop history visible in the app</li>
              <li>Solder everything to a custom PCB once prototype is validated (KiCad, JLCPCB)</li>
            </ol>
          </Section>
        </>}

      </div>
    </div>
  );
}

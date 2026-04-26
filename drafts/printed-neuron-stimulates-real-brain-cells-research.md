# Research Notes: Printed Artificial Neurons Stimulate Real Brain Cells

## Topic
Northwestern University researchers have printed artificial neurons from MoS2 nanosheets on flexible plastic film using aerosol jet printing. These printed circuits generate spike waveforms matching 6 types of biological spiking complexity and successfully stimulated real Purkinje neurons in mouse cerebellar brain slices. First-ever demonstration of a fully printed, solution-processed electronic neuron driving real brain tissue. Published April 15, 2026 in Nature Nanotechnology.

## Primary Sources

### 1. Nature Nanotechnology Paper (Primary)
- **Title:** "Printed MoS2 memristive nanosheet networks for spiking neurons with multi-order complexity"
- **Authors:** Shreyash S. Hadke, Carol N. Klingler, Spencer T. Brown, Meghana Holla, Xudong Zhuang, M. Iqbal Bakti Utama, Santiago Diaz-Arauzo, Anurag Chapagain, Siyang Li, Jung Hun Lee, Indira M. Raman, Vinod K. Sangwan, Mark C. Hersam
- **Journal:** Nature Nanotechnology, 2026
- **DOI:** https://www.nature.com/articles/s41565-026-02149-6
- **Published:** April 15, 2026
- **Key findings:**
  - Aerosol-jet-printed graphene/MoS2/graphene memristive devices on flexible substrates
  - Thermally activated filamentary switching with snap-back negative differential resistance
  - Volatile threshold switching enables oscillatory and spiking neuron circuits
  - Tunable frequencies up to **20 kHz**
  - Stable operation over **>10^6 cycles** (1 million+)
  - Neuristor circuits realize 1st, 2nd, and 3rd-order spiking complexity:
    - Integrate-and-fire behavior
    - Spike latency
    - Tonic firing
    - Class 1 excitability
    - Tonic bursting
    - Phasic dynamics
  - **Generated spike waveforms match physiological timescales**
  - **Stimulated real Purkinje neurons in mouse cerebellar slices** (first printed device to do this)

### 2. Live Science Coverage (April 24, 2026)
- URL: https://www.livescience.com/health/neuroscience/scientists-invent-artificial-neurons-that-talk-to-real-brain-cells-paving-way-to-better-brain-implants
- Mark Hersam quote: "We are trying to mimic the brain as faithfully as possible. What motivates us is to come up with an alternative to conventional digital computing to handle large amounts of data in a more energy-efficient way."
- Bidirectional potential: the neurons can both "listen" and "talk" to brain cells
- Purkinje neurons are among the largest, most complex neurons in the brain

### 3. Northwestern University McCormick School of Engineering
- Mark Hersam lab: materials science and engineering department chair
- Previous work: 2023 brain-like transistor mimicking human intelligence
- URL: https://www.mccormick.northwestern.edu/

## Novel Analysis: The Energy Gap

**GPU spike vs. biological spike vs. printed neuron spike:**
- Biological neuron fires at ~20 femtojoules per spike (10^-15 joules)
- A single NVIDIA H100 GPU inference (single token): ~0.002 joules = 2 × 10^-3 joules
- That's ~10^11 (100 billion) times more energy per computational unit
- These printed MoS2 neurons operate in the picojoule-to-nanojoule range per spike
- They're ~10^3-10^6 times more energy-efficient than GPUs per spike
- They're still ~10^3-10^6 times LESS efficient than biology
- But they can be printed on plastic film with an ink-jet-like printer, mass-produced
- AND they can directly interface with biological tissue

**The real metric nobody is tracking:** energy per biologically-compatible spike. Current BCIs (Neuralink, BrainGate) read signals from the brain. This device WRITES to the brain with electronics that spike like neurons. The gap between reading and writing is the difference between a microphone and a speaker. We just got the speaker.

## Novel Analysis: The Purkinje Connection

Why Purkinje neurons matter:
- Purkinje cells are the sole output neurons of the cerebellar cortex
- They integrate ~200,000 synaptic inputs each (most of any neuron type)
- They fire at 50-150 Hz baseline, with complex spikes and simple spikes
- If a printed electronic neuron can drive a Purkinje cell, it can in principle drive simpler neurons too
- The cerebellum coordinates movement, balance, motor learning
- Implication: printed neural interfaces for motor rehabilitation, prosthetic control

## Kill Test
- ✅ First printed electronic neuron to stimulate real brain tissue
- ✅ Specific data: 20 kHz, 10^6 cycles, 6 spiking modes, Purkinje neurons
- ✅ Named lab (Hersam @ Northwestern), Nature Nanotechnology
- ✅ Not covered in LITF (biocomputing article is about biological neurons for computing; this is electronic neurons for brain interfacing)
- ✅ "So what": the BCI field has been about reading brain signals; this is writing with printed electronics

## 10-Star Test
Reader reaction: "Wait, they can literally print a circuit on plastic that fires like a real neuron and makes a mouse brain cell respond? Like, on a printer?"

## Strongest Counterargument
Mouse cerebellar slices in a dish are not living brains in skulls. The gap between stimulating neurons in vitro (in a petri dish) and safely interfacing with a living brain is enormous: immune response, long-term stability, biocompatibility, signal-to-noise in vivo, FDA approval timelines. Neuralink's Utah-array-derived approach works in living humans RIGHT NOW. Printed MoS2 neurons have zero human data, zero in-vivo demonstration, and are years from clinical relevance. The "writing to the brain" framing, while technically correct, overstates the near-term practical impact.

## Limitations
- All demonstrations are in vitro (brain slices, not living animals)
- MoS2 memristors require specific voltage ranges that may not be biocompatible in vivo
- No data on immune response, encapsulation, or long-term biocompatibility
- The 20 kHz maximum frequency exceeds physiological ranges (most neurons fire <200 Hz); practical benefit of high-frequency capability unclear
- Flexible substrate is printed on polymer, not implanted. Gap between "flexible" and "implantable" is non-trivial
- Paper doesn't address signal multiplexing or multi-channel integration needed for real BCIs

## Journalist
**Maya Ramirez** — due for rotation, can handle the materials science + neuro crossover angle

## Category
🧠 Neuro

## Slug
printed-neuron-stimulates-real-brain-cells

## Related LITF Stories
- biocomputing-neurons-for-sale.html ("You Can Now Buy a Computer Made of Human Brain Cells")
- neuromorphic-chip-energy-gap.html
- bci-bandwidth-race.html
- bci-typing-speed-commercial-era.html

# Meta TRIBE: The Brain-Decoding Model Ray's Colleagues Built

**Created:** 2026-04-06 (Iteration 2)
**Status:** Active — connects to Neural Band roadmap
**Urgency:** Medium (not immediately actionable, but conceptually important)

## What Happened

Meta's FAIR team released **TRIBE** (TRansformer for In-silico Brain Experiments) — a foundation model that decodes human brain activity from fMRI data with a 70x resolution improvement over prior systems. It creates "digital twins" of neural activity.

Key capabilities:
- Predicts how the brain processes visual and auditory stimuli
- Zero-shot: works on new individuals and unseen languages without retraining
- Enables "in-silico neuroscience" — virtual experiments at a fraction of fMRI cost
- Described by a BrainMind conference attendee as "invasive as hell"

## Why This Connects to Ray's World

1. **The Boz Persona covers this exact arc:** Section 31 of the Boz persona documents "The Input Problem" — the six-year CTRL-Labs-to-Neural-Band journey. TRIBE is the research counterpart to what Neural Band is trying to do commercially: decode neural signals for input.
   
2. **TRIBE uses fMRI (invasive, clinical). Neural Band uses EMG (non-invasive, wearable).** They're working on the same fundamental problem from different ends. TRIBE's 70x resolution improvement in fMRI brain decoding could train better models that are then distilled/transferred to less invasive signals like EMG.

3. **The "invasive as hell" framing** is exactly the privacy vulnerability documented in the smart glasses thread. If Meta is publishing brain-decoding models while simultaneously facing a class action over video privacy, the optics (pun intended) are terrible.

4. **Competitive intelligence:** This research was open-sourced. That means Apple, Google, Samsung all have access to Meta's brain-decoding breakthrough. The moat isn't the science — it's the hardware pipeline (Neural Band + glasses form factor).

## The Question

Is TRIBE a proof-of-concept that eventually makes Neural Band dramatically better (positive for Ray's team), or is it a PR liability that feeds the "Meta is reading your brain" narrative (negative)?

Boz's playbook says "fix forward" — ship the product, iterate through criticism. But this feels different from News Feed in 2006. Brain decoding touches something primal.

## Not an Article Seed Yet

This needs more development. The LITF angle would be "Meta Published a Model That Reads Your Brain. Then They Sold You Glasses" — but that's too sensational without deeper sourcing on how TRIBE connects to the commercial wearables pipeline.

---
*Created: 2026-04-06, Iteration 2*

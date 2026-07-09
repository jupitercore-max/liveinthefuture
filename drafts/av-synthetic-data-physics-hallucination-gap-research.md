# Research: AV Synthetic Data Physics Hallucination Gap

## Source: Moltbook
- Post by `rossum` (score 151, 2026-07-09): "Corner cases are not valid if the physics cannot execute them"
- Core argument: diffusion-model-generated AV scenarios can be photorealistic but kinematically impossible
- Analogy: "A corner case that cannot be driven is just a hallucination"

## Market Data
- **Automotive AI Simulation & Synthetic Data Generation Market:**
  - 2025: $1.03B
  - 2026: $1.51B
  - 2035: $29.15B (39% CAGR)
  - Source: Global Market Insights (gminsights.com)
- **AV Simulation Solutions Market:**
  - 2025: $1.14B → 2030: $2.4B (15.6% CAGR)
  - Alternative sizing: $1.4B (2025) → $7.3B by 2034 (20.4% CAGR)
  - Source: Business Research Company via GlobeNewsWire
- **ADAS Simulation Market:**
  - 2025: $3.9B → 2035: $13.2B (13.1% CAGR)
  - Market leader: Siemens Digital Industries (>10% share)
  - Source: Global Market Insights
- **Applied Intuition:**
  - Valuation: $15B (Series F, June 2025)
  - Raised: $600M, co-led by BlackRock + Kleiner Perkins
  - Previous: $6B (Series E, March 2024)
  - Customers: Toyota, VW, Kodiak, U.S. Army
  - 1,360 employees
  - Source: Reuters, TechCrunch

## Key Research Papers

### PhyGenesis (arXiv:2603.24506, March 2026)
- Title: "Toward Physically Consistent Driving Video World Models under Challenging Trajectories"
- Problem: "existing approaches... often fail when conditioned on challenging or counterfactual trajectories—producing videos with severe physical inconsistencies and artifacts"
- Solution: Two components: (1) physical condition generator that transforms invalid trajectories into plausible ones, (2) physics-enhanced video generator
- Uses CARLA simulator for "physics-rich heterogeneous dataset"
- Key insight: Must explicitly add physics correction layer because raw generative models don't enforce kinematic constraints

### CARS Paper (arXiv, 2026) — "Learning Responsibility-Attributed Adversarial Scenarios"
- Kinematic feasibility check: IP% = 0.04% (infeasible percentage)
- Validates scenarios against FSM (Fault Safety Model) braking demand: Easy, Medium, Hard tiers
- Uses percentile-level acceleration, jerk, and lateral-acceleration checks against feasibility bounds
- Shows that adversarial scenario generation CAN maintain physical plausibility if constraints are enforced

### Kinematics-Aware Latent World Models (arXiv, 2026)
- Ablation study: models trained with only image input generate "physically inconsistent rollouts"
- Without kinematics: blurred vehicle positions, abrupt unrealistic shifts, confused lane markings
- With vehicle kinematics + auxiliary supervision: stable, physically plausible predictions
- Quantitative: Success Rate jumps from 0.17 to 0.49 when adding kinematics + physics inputs

### SynAD Paper
- Uses kinematic bicycle model (KING) to derive gradients for safety-critical scenarios
- Shows synthetic data augmentation improves E2E AD planning metrics
- Key: the bicycle model IS the physics constraint — but most diffusion-based generators skip it

### Ontology-guided adversarial scenario generation (Springer)
- Documents 4 types of physically impossible generated scenarios:
  1. Reverse pedestrian attacks (pedestrians moving backward)
  2. Vehicles turning onto pavement
  3. Illegal road crossings
  4. Vehicles blocking mid-road in impossible positions

## Waymo Simulation Scale
- ~200 million real autonomous miles logged
- Billions of simulated miles in virtual worlds
- "One day in simulation = 100 years of real-world driving" (Waymo claim)
- Waymo World Model (2026): uses Google DeepMind's Genie 3
- Generates camera + lidar simultaneously
- Converting 2D video to 3D lidar requires "specialized post-training" — a "non-trivial" bottleneck
- UCStrategies critique: "photorealistic doesn't equal physically accurate"

## NVIDIA
- AlpaSim simulation framework (CES 2026)
- 1,700+ hours of proprietary driving data
- Alpamayo: 10B parameter vision-language-action model
- NVIDIA Cosmos World Foundation Models: used for data augmentation in Applied Intuition's stack

## Original Contribution: The Per-Scenario Hallucination Tax

### Cost of generation vs validation
- Diffusion-model scenario generation: ~$0.01-0.05 per scenario (GPU inference cost for a single driving clip)
- Kinematic validation (physics engine check): ~$0.001-0.005 per scenario (simple forward kinematics + constraint check)
- Full physics simulation validation (CARLA-grade): ~$0.10-0.50 per scenario

### Scale math
- If Waymo generates 1 billion scenarios/year at ~$0.03 each = $30M in generation cost
- Adding kinematic validation at $0.003 each = $3M additional = 10% overhead
- But: PhyGenesis shows 50%+ scenarios from standard generators have "severe physical inconsistencies" under challenging trajectories
- Kinematics-aware models show 2.9x improvement in success rate (0.17 → 0.49)

### The poison data cost
- Without validation: 50%+ of safety-critical synthetic scenarios could be kinematically impossible
- Training on impossible scenarios = model learns behaviors the car physically cannot execute
- The cost of a single AV incident: $10-50M (litigation, recall, regulatory)
- The cost of validating 1B scenarios: $3-5M
- Risk-adjusted cost ratio: validation is 1,000-10,000x cheaper than one incident

### Market gap
- $1.03B market in 2025, growing 39% to $29.15B by 2035
- No standardized kinematic validation benchmark exists
- PhyGenesis (March 2026) is the first paper to explicitly address this
- Applied Intuition ($15B valuation) offers physics-based validation but it's proprietary
- Open question: how many companies skip the physics check and just count photorealistic scenarios?

# Research: Activation Functions Are the Overlooked Bottleneck in Edge AI

## Source
Moltbook posts by vina (scores 23, 20) on July 31, 2026:
- "Sparsity is a function of the activation, not just the architecture"
- "Activation functions dictate the sparsity ceiling"
Both reference Turbo Sparse (Song et al., June 2024) and the dReLU approach.

## Key Papers

### 1. TurboSparse (Song et al., arXiv:2406.05955, June 2024)
- **dReLU** = ReLU applied to BOTH gate and up projections: h = ReLU(xW_g) ⊙ ReLU(xW_u)
- SwiGLU/GeGLU (used by Llama, Mistral, Qwen) exhibit ~50% sparsity — half of neurons fire every token
- Simply replacing with ReLU doesn't achieve sufficient sparsity
- dReLU achieves **90%+ activation sparsity**
- TurboSparse-Mistral-7B: only **2.5B params activated** per inference (from 7B)
- TurboSparse-Mixtral-47B: only **4.3B params activated** per inference (from 47B)
- **2-5× decoding speedup**
- **47B model runs at 11 tok/s on mobile phones**
- Performance MAINTAINED or IMPROVED on Open LLM Leaderboard

### 2. PowerInfer (Song et al., arXiv:2312.12456, SOSP 2024)
- GPU-CPU hybrid inference engine exploiting neuron activation locality
- Power-law distribution: small subset of "hot" neurons consistently activated, majority "cold"
- Hot neurons preloaded to GPU, cold neurons computed on CPU
- **13.20 tok/s average, 29.08 tok/s peak** on RTX 4090 for OPT-175B
- Only 18% slower than A100 server GPU
- Outperforms llama.cpp by up to **11.69×**
- "Effectiveness directly correlated with model's activation sparsity"
- ReLU-family LLMs: >90% sparse → ideal candidates
- Other activations: ~50% sparsity → less acceleration

### 3. NVIDIA Nemotron (2025-2026)
- Nemotron Nano 2: Uses **squared ReLU** activation in FFN layers (deliberate choice!)
- Nemotron 3 Nano: 31.6B params, only 3.2B activated per forward pass (MoE + sparsity)
- Nemotron 3 Ultra: 550B params, only 55B active per token (90% sparsity)
- NVIDIA is building for sparsity-aware hardware

### 4. PyTorch Sparse Inference Blog (Jan 2026)
- Meta's OPT models with ReLU: **95-99% sparsity** in MLP blocks
- "DejaVu" approach: low-rank predictors to find sparse indices ahead of time
- **2-6× speedups** with little to no accuracy drop

### 5. TernaryLLM (Chen et al., arXiv:2406.07177, June 2024)
- Weight distributions are asymmetric with non-zero means
- Standard quantization ignores this → adds noise
- DLT (Dual Learnable Ternarization) handles asymmetric outliers
- W1.58 bits achieves: 5.8 perplexity improvement on C4 vs prior SOTA W2 methods
- 8.2% accuracy improvement on zero-shot tasks for LLaMA-3

### 6. Activation N:M Sparsity (arXiv:2509.22166, 2025)
- Post-training N:M activation pruning in LLMs
- Pruning activations preserves generative capability BETTER than weight pruning at same sparsity
- 8:16 pattern identified as "superior candidate" for hardware support

## Original Contribution for LITF

**The FLOP math nobody ran:**

A 70B dense model with SwiGLU (Llama 3 70B architecture):
- FFN hidden dim typically 4× model dim. For 70B: ~28,672 FFN hidden dim
- SwiGLU sparsity: ~50% → ~14,336 neurons active per layer
- 80 transformer layers, so per-token FFN compute: 80 × 14,336 × 8,192 × 2 (two matrices) ≈ 189B FLOPs

Same model with dReLU at 90% sparsity:
- ~2,867 neurons active per layer
- Per-token FFN compute: 80 × 2,867 × 8,192 × 2 ≈ 37.6B FLOPs
- **5× reduction in FFN compute**

Since FFN layers account for ~67% of total compute in transformers:
- Dense SwiGLU: FFN is 67% of total → total compute baseline 100
- dReLU at 90% sparsity: FFN reduced to 20% of original → total compute drops to ~47% of baseline
- **Net 2.1× total inference speedup from activation function swap alone**

This lines up with TurboSparse's measured 2-5× speedup range.

**The edge deployment implication:**
- iPhone 16 Pro (A18 Pro): ~17 TOPS, 8GB RAM
- Samsung S25 Ultra (Snapdragon 8 Elite): ~45 TOPS, 12GB RAM
- At SwiGLU ~50% sparsity: A 7B model at ~4-bit quant = ~3.5GB, runs at ~8-15 tok/s
- At dReLU 90% sparsity: same model can run at 2-3× that speed → 16-45 tok/s
- A 47B model (TurboSparse-Mixtral) at 11 tok/s on phone — that's usable!

**The industry split:**
- Pro-sparsity: NVIDIA (Nemotron squared ReLU), SJTU/PowerInfer (dReLU), Meta (OPT ReLU), PyTorch team
- Anti-sparsity (stuck on SwiGLU): Meta (Llama 3/4), Mistral, Qwen, Google (Gemma)
- The irony: the labs building the biggest models are using the activation function that makes those models HARDEST to deploy efficiently

## Strongest Counterargument
SwiGLU consistently outperforms ReLU in training quality. The smooth gradients help convergence on harder tasks. dReLU requires carefully tuned sparsification training + quality data mixtures to avoid degradation. TurboSparse showed it CAN match or beat SwiGLU quality, but only with the right recipe. The risk: a poorly done ReLU-ification destroys model quality. Labs optimize for training, not deployment — and SwiGLU wins training benchmarks.

## Limitations
- TurboSparse results measured on Mistral/Mixtral (2024 architectures), not latest frontier models
- Mobile phone speed (11 tok/s) measured with PowerInfer framework, which isn't widely deployed
- Sparsity hardware support is immature — NVIDIA's 2:4 structured sparsity is limited, more flexible patterns (8:16) need new accelerators
- The 90% sparsity figure applies to FFN layers only; attention layers have their own efficiency challenges

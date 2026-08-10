/*
 * Computed Coefficients Header
 *
 * Pre-computed values for CIC compensation FIR and biquad EQ.
 * Generated at build time from design-spec parameters.
 *
 * License: GPL-3.0
 */

#ifndef COEFFICIENTS_H
#define COEFFICIENTS_H

/* CIC Compensation FIR (21 taps)
 * Designed to flatten CIC droop in passband (0-6 kHz at 16 kHz Fs)
 * Generated with: python3 generate_coeffs.py > coefficients.h
 */
#define COMP_FIR_NTAPS 21
static const int32_t comp_fir[COMP_FIR_NTAPS] = {
    -4, -3, 0, 4, 8, 6, -2, -12, -18, -10,
    10, 28, 28, 6, -24, -40, -32, 2, 40, 60, 0
};

/* EQ Profile: ASR-optimized
 * 1. HPF  90 Hz   Q=0.707  0 dB
 * 2. Peak 250 Hz  Q=1.0   -4 dB
 * 3. Peak 3.5k    Q=1.2   +4 dB
 * 4. Peak 6.5k    Q=1.5   +3 dB
 * 5. HSF  10k     Q=0.707 -3 dB
 * Fs = 16000 Hz
 * Computed with RBJ Audio EQ Cookbook formulas.
 */
#define NUM_EQ_BANDS 5

typedef struct {
    float b0, b1, b2, a1, a2;
} eq_band_coeffs_t;

static const eq_band_coeffs_t eq_coeffs[NUM_EQ_BANDS] = {
    /* Band 1: HPF 90 Hz Q=0.707 */
    { 0.97306f, -1.94611f, 0.97306f, -1.94591f, 0.94631f },
    /* Band 2: Peak 250 Hz Q=1.0 -4 dB */
    { 0.87303f, -1.73011f, 0.87303f, -1.73011f, 0.74606f },
    /* Band 3: Peak 3.5 kHz Q=1.2 +4 dB */
    { 1.36791f, -1.86637f, 1.36791f, -1.86637f, 0.73582f },
    /* Band 4: Peak 6.5 kHz Q=1.5 +3 dB */
    { 1.21869f, -0.99683f, 1.21869f, -0.99683f, 0.43738f },
    /* Band 5: High Shelf 10 kHz Q=0.707 -3 dB */
    { 0.93870f, -1.58263f, 0.93870f, -1.58263f, 0.87740f },
};

/* Noise cancellation parameters */
#define SS_OVERSUBTRACTION  3.0f
#define SS_FLOOR            0.1f
#define SS_NOISE_LAMBDA     0.95f
#define SS_VAD_THRESHOLD_DB -50.0f
#define SS_SILENCE_FRAMES   10

/* Compressor parameters */
#define COMP_RATIO      2.0f
#define COMP_THRESH_DB  -12.0f
#define COMP_ATTACK_MS  5.0f
#define COMP_RELEASE_MS 50.0f
#define COMP_MAKEUP_DB  3.0f

#endif

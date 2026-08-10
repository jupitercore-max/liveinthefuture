/*
 * Spectral Subtraction Noise Cancellation
 *
 * Modified spectral subtraction using a reference microphone.
 * FFT-based: 256-point real FFT, 16 perceptual bands.
 *
 * Reference: Boll 1979, Berouti 1979
 *
 * License: GPL-3.0
 */

#ifndef SPECTRAL_SUBTRACTION_H
#define SPECTRAL_SUBTRACTION_H

#include <stdint.h>
#include <stddef.h>

typedef struct {
    /* Noise spectral estimate (one per band) */
    float noise_est[16];
    float noise_est_prev[16];
    /* Voice activity detection */
    float energy_history[8];
    int   silence_counter;
    bool  in_silence;
    /* Parameters */
    float oversubtraction;   /* α: 2.0–4.0 */
    float floor;             /* minimum gain: 0.1 */
    float noise_lambda;      /* update rate: 0.95 */
    float vad_threshold;     /* dBFS: -50.0 */
} spectral_sub_state_t;

void spectral_sub_init(spectral_sub_state_t *s);
void spectral_sub_process(spectral_sub_state_t *s,
                          const int32_t *voice, const int32_t *ref,
                          int32_t *out, size_t n);

#endif

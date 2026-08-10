/*
 * Feed-Forward Compressor Implementation
 *
 * Parameters:
 *   Ratio:     2:1
 *   Threshold: -12 dBFS
 *   Attack:    5 ms (80 samples @ 16kHz)
 *   Release:   50 ms (800 samples @ 16kHz)
 *   Makeup:    +3 dB
 *
 * License: GPL-3.0
 */

#include "compressor.h"
#include <math.h>

void compressor_init(compressor_state_t *s) {
    s->threshold   = powf(10.0f, -12.0f / 20.0f); /* -12 dBFS → linear */
    s->ratio       = 2.0f;
    s->makeup_gain = powf(10.0f, 3.0f / 20.0f);   /* +3 dB */

    /* Attack/release coefficients (one-pole smoother) */
    float attack_ms  = 5.0f;
    float release_ms = 50.0f;
    float fs = 16000.0f;
    s->attack_coef  = expf(-1.0f / (fs * attack_ms / 1000.0f));
    s->release_coef = expf(-1.0f / (fs * release_ms / 1000.0f));

    s->envelope = 0.0f;
}

void compressor_process(compressor_state_t *s, int32_t *buf, size_t n) {
    for (size_t i = 0; i < n; i++) {
        float x = (float)buf[i] / 2147483648.0f;
        float abs_x = fabsf(x);

        /* Envelope follower */
        float coef = (abs_x > s->envelope) ? s->attack_coef : s->release_coef;
        s->envelope = coef * s->envelope + (1.0f - coef) * abs_x;

        /* Gain computation */
        float gain;
        if (s->envelope > s->threshold) {
            /* Above threshold: compress */
            float compressed = s->threshold * powf(s->envelope / s->threshold,
                                                   1.0f / s->ratio);
            gain = (compressed / (s->envelope + 1e-10f)) * s->makeup_gain;
        } else {
            /* Below threshold: just makeup gain */
            gain = s->makeup_gain;
        }

        /* Apply gain */
        float out = x * gain;
        if (out > 1.0f) out = 1.0f;
        if (out < -1.0f) out = -1.0f;
        buf[i] = (int32_t)(out * 2147483647.0f);
    }
}

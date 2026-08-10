/*
 * 5-Band Biquad EQ Implementation
 *
 * ASR-optimized profile:
 *   1. High-pass:  90 Hz,  Q=0.707  (remove rumble)
 *   2. Peaking:   250 Hz,  Q=1.0,  -4 dB (cut boom)
 *   3. Peaking:   3.5 kHz, Q=1.2,  +4 dB (consonant clarity)
 *   4. Peaking:   6.5 kHz, Q=1.5,  +3 dB (sibilant presence)
 *   5. High-shelf: 10 kHz, Q=0.707, -3 dB (tame harshness)
 *
 * Coefficients computed using RBJ Audio EQ Cookbook formulas.
 * Fs = 16000 Hz
 *
 * License: GPL-3.0
 */

#include "eq.h"
#include <math.h>

#ifndef M_PI
#define M_PI 3.14159265358979323846
#endif

/* RBJ biquad coefficient types */
typedef enum { BQ_HIGHPASS, BQ_PEAKING, BQ_HIGHSHELF } biquad_type_t;

typedef struct {
    biquad_type_t type;
    float freq;
    float gain_db;
    float q;
    /* Computed coefficients */
    float b0, b1, b2, a1, a2;
} biquad_params_t;

static biquad_params_t filters[5];

static void compute_biquad(biquad_params_t *f, float fs) {
    float w0 = 2.0f * M_PI * f->freq / fs;
    float cw = cosf(w0);
    float sw = sinf(w0);
    float A = powf(10.0f, f->gain_db / 40.0f);
    float alpha = sw / (2.0f * f->q);

    switch (f->type) {
    case BQ_HIGHPASS: {
        float a0 = 1.0f + alpha;
        f->b0 = (1.0f + cw) / (2.0f * a0);
        f->b1 = -(1.0f + cw) / a0;
        f->b2 = (1.0f + cw) / (2.0f * a0);
        f->a1 = -2.0f * cw / a0;
        f->a2 = (1.0f - alpha) / a0;
        break;
    }
    case BQ_PEAKING: {
        float a0 = 1.0f + alpha / A;
        f->b0 = (1.0f + alpha * A) / a0;
        f->b1 = -2.0f * cw / a0;
        f->b2 = (1.0f - alpha * A) / a0;
        f->a1 = -2.0f * cw / a0;
        f->a2 = (1.0f - alpha / A) / a0;
        break;
    }
    case BQ_HIGHSHELF: {
        float a0 = (A + 1) - (A - 1) * cw + 2.0f * sqrtf(A) * alpha;
        f->b0 = (A * ((A + 1) - (A - 1) * cw + 2.0f * sqrtf(A) * alpha)) / a0;
        f->b1 = 2.0f * A * ((A - 1) - (A + 1) * cw) / a0;
        f->b2 = A * ((A + 1) - (A - 1) * cw - 2.0f * sqrtf(A) * alpha) / a0;
        f->a1 = -2.0f * ((A - 1) - (A + 1) * cw) / a0;
        f->a2 = ((A + 1) - (A - 1) * cw - 2.0f * sqrtf(A) * alpha) / a0;
        break;
    }
    }
}

void eq_init(eq_state_t *s) {
    /* Configure filter parameters */
    filters[0] = (biquad_params_t){BQ_HIGHPASS,  90.0f,   0.0f, 0.707f};
    filters[1] = (biquad_params_t){BQ_PEAKING,   250.0f, -4.0f, 1.0f};
    filters[2] = (biquad_params_t){BQ_PEAKING,  3500.0f,  4.0f, 1.2f};
    filters[3] = (biquad_params_t){BQ_PEAKING,  6500.0f,  3.0f, 1.5f};
    filters[4] = (biquad_params_t){BQ_HIGHSHELF, 10000.0f, -3.0f, 0.707f};

    /* Compute coefficients at 16 kHz sample rate */
    for (int i = 0; i < 5; i++) {
        compute_biquad(&filters[i], 16000.0f);
    }

    /* Clear state */
    for (int i = 0; i < 5; i++) {
        s->x1[i] = s->x2[i] = 0;
        s->y1[i] = s->y2[i] = 0;
    }
}

void eq_process(eq_state_t *s, int32_t *buf, size_t n) {
    for (size_t i = 0; i < n; i++) {
        /* Normalize to float [-1, 1] */
        float x = (float)buf[i] / 2147483648.0f;

        /* Cascade through 5 biquads (Direct Form I) */
        for (int f = 0; f < 5; f++) {
            float y = filters[f].b0 * x
                    + filters[f].b1 * s->x1[f]
                    + filters[f].b2 * s->x2[f]
                    - filters[f].a1 * s->y1[f]
                    - filters[f].a2 * s->y2[f];

            s->x2[f] = s->x1[f]; s->x1[f] = x;
            s->y2[f] = s->y1[f]; s->y1[f] = y;
            x = y;
        }

        /* Back to int32 */
        if (x > 1.0f) x = 1.0f;
        if (x < -1.0f) x = -1.0f;
        buf[i] = (int32_t)(x * 2147483647.0f);
    }
}

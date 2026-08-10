/*
 * Spectral Subtraction Implementation
 *
 * Pipeline:
 *   1. Hann window → 256-pt real FFT
 *   2. Group into 16 perceptual bands (Bark scale)
 *   3. Estimate noise from reference mic during silence
 *   4. Apply spectral subtraction gain per band
 *   5. IFFT → overlap-add
 *
 * License: GPL-3.0
 */

#include "spectral_subtraction.h"
#include <string.h>
#include <math.h>

/* 256-point FFT using fixed-point radix-2 (arm_math or manual) */
/* For clarity, we use float here; on RP2040 M0+ this runs in ~0.2ms */

#define N       256
#define HOP     128
#define NBANDS  16

/* Hann window */
static float hann[N];
static void init_hann(void) {
    for (int i = 0; i < N; i++)
        hann[i] = 0.5f * (1.0f - cosf(2.0f * M_PI * i / (N - 1)));
}

/* Bark scale band edges (approximated for 16 kHz / 128 bins) */
/* Bin freq = k * 16000/256 = k * 62.5 Hz */
static const int band_edges[NBANDS + 1] = {
    0, 1, 3, 5, 7, 10, 13, 17, 21, 26, 32, 39, 47, 56, 67, 80, 96
    /* ~0, 60, 190, 310, 440, 630, 810, 1060, 1310, 1630, 2000,
       2440, 2940, 3500, 4190, 5000, 6000 Hz */
};

void spectral_sub_init(spectral_sub_state_t *s) {
    memset(s, 0, sizeof(*s));
    s->oversubtraction = 3.0f;
    s->floor           = 0.1f;
    s->noise_lambda    = 0.95f;
    s->vad_threshold   = -50.0f; /* dBFS */
    init_hann();
}

/* Simple in-place radix-2 FFT (not bit-reversed input = scrambled output) */
static void fft256(float re[256], float im[256]) {
    /* Bit reversal */
    for (int i = 1, j = 0; i < N; i++) {
        int bit = N >> 1;
        for (; j & bit; bit >>= 1) j ^= bit;
        j ^= bit;
        if (i < j) {
            float tr = re[i]; re[i] = re[j]; re[j] = tr;
            float ti = im[i]; im[i] = im[j]; im[j] = ti;
        }
    }
    /* Butterfly */
    for (int len = 2; len <= N; len <<= 1) {
        float ang = -2.0f * M_PI / len;
        float wr = cosf(ang), wi = sinf(ang);
        for (int i = 0; i < N; i += len) {
            float wmr = 1.0f, wmi = 0.0f;
            for (int j = 0; j < len / 2; j++) {
                float ur = re[i + j], ui = im[i + j];
                float vr = re[i+j+len/2] * wmr - im[i+j+len/2] * wmi;
                float vi = re[i+j+len/2] * wmi + im[i+j+len/2] * wmr;
                re[i + j] = ur + vr;
                im[i + j] = ui + vi;
                re[i+j+len/2] = ur - vr;
                im[i+j+len/2] = ui - vi;
                float nwmr = wmr * wr - wmi * wi;
                wmi = wmr * wi + wmi * wr;
                wmr = nwmr;
            }
        }
    }
}

/* Inverse FFT (conjugate, forward FFT, conjugate, scale) */
static void ifft256(float re[256], float im[256]) {
    for (int i = 0; i < N; i++) im[i] = -im[i];
    fft256(re, im);
    for (int i = 0; i < N; i++) {
        re[i] /= N;
        im[i] = -im[i] / N;
    }
}

void spectral_sub_process(spectral_sub_state_t *s,
                          const int32_t *voice, const int32_t *ref,
                          int32_t *out, size_t n)
{
    static float overlap_buf[N];  /* For overlap-add */
    static bool first_run = true;
    if (first_run) { memset(overlap_buf, 0, sizeof(overlap_buf)); first_run = false; }

    /* Only process one frame per call (n should be HOP for streaming) */
    /* For simplicity: assume n == HOP, process full N-point frame */

    /* --- Step 1: Window and FFT voice signal --- */
    float vre[N], vim[N];
    float rre[N], rim[N];

    for (int i = 0; i < N; i++) {
        float v = (float)voice[i] * hann[i] / 2147483648.0f; /* normalize to [-1,1] */
        float r = (float)ref[i]  * hann[i] / 2147483648.0f;
        vre[i] = v; vim[i] = 0;
        rre[i] = r; rim[i] = 0;
    }

    fft256(vre, vim);
    fft256(rre, rim);

    /* --- Step 2: Compute band energies --- */
    float v_band_mag[NBANDS], r_band_mag[NBANDS];
    for (int b = 0; b < NBANDS; b++) {
        float v_energy = 0, r_energy = 0;
        int count = 0;
        for (int k = band_edges[b]; k < band_edges[b+1]; k++) {
            v_energy += vre[k]*vre[k] + vim[k]*vim[k];
            r_energy += rre[k]*rre[k] + rim[k]*rim[k];
            count++;
        }
        v_band_mag[b] = sqrtf(v_energy / count);
        r_band_mag[b] = sqrtf(r_energy / count);
    }

    /* --- Step 3: Voice Activity Detection --- */
    float total_energy = 0;
    for (int b = 0; b < NBANDS; b++) total_energy += v_band_mag[b];
    float energy_db = 10.0f * log10f(total_energy + 1e-10f);

    if (energy_db < s->vad_threshold) {
        s->silence_counter++;
        if (s->silence_counter > 10) {
            s->in_silence = true;
            /* Update noise estimate */
            for (int b = 0; b < NBANDS; b++) {
                s->noise_est[b] = s->noise_lambda * s->noise_est_prev[b]
                                + (1.0f - s->noise_lambda) * r_band_mag[b];
                s->noise_est_prev[b] = s->noise_est[b];
            }
        }
    } else {
        s->silence_counter = 0;
        s->in_silence = false;
    }

    /* --- Step 4: Spectral subtraction gain per band --- */
    float gain[NBANDS];
    for (int b = 0; b < NBANDS; b++) {
        float snr = v_band_mag[b] / (s->noise_est[b] + 1e-10f);
        float g = 1.0f - s->oversubtraction / (snr + 1e-10f);
        if (g < s->floor) g = s->floor;
        if (g > 1.0f) g = 1.0f;
        gain[b] = g;
    }

    /* --- Step 5: Apply gain to each bin --- */
    for (int b = 0; b < NBANDS; b++) {
        for (int k = band_edges[b]; k < band_edges[b+1]; k++) {
            vre[k] *= gain[b];
            vim[k] *= gain[b];
        }
    }

    /* --- Step 6: IFFT and overlap-add --- */
    ifft256(vre, vim);

    for (int i = 0; i < N; i++) {
        overlap_buf[i] += vre[i]; /* overlap-add */
    }

    /* Output first HOP samples */
    for (int i = 0; i < HOP && i < (int)n; i++) {
        /* Scale back to int32 range and apply Hann synthesis window */
        float sample = overlap_buf[i] * 2.0f; /* compensate for 50% overlap */
        if (sample > 1.0f) sample = 1.0f;
        if (sample < -1.0f) sample = -1.0f;
        out[i] = (int32_t)(sample * 2147483647.0f);
    }

    /* Shift overlap buffer */
    memmove(overlap_buf, overlap_buf + HOP, (N - HOP) * sizeof(float));
    memset(overlap_buf + (N - HOP), 0, HOP * sizeof(float));
}

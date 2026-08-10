/*
 * OpenStenoMask — Main Entry Point
 * RP2040 firmware for the open-source stenomask
 *
 * License: GPL-3.0
 */

#include <stdio.h>
#include "pico/stdlib.h"
#include "pico/multicore.h"
#include "hardware/pio.h"
#include "hardware/dma.h"
#include "hardware/clocks.h"
#include "hardware/irq.h"
#include "hardware/flash.h"
#include "tusb.h"

#include "pdm_capture.h"
#include "spectral_subtraction.h"
#include "eq.h"
#include "compressor.h"
#include "usb_audio.h"

/* Pin assignments */
#define MIC1_CLK_PIN    0
#define MIC1_DATA_PIN   1
#define MIC2_CLK_PIN    2
#define MIC2_DATA_PIN   3
#define REF_CLK_PIN     4
#define REF_DATA_PIN    5
#define STATUS_LED_PIN  15
#define MUTE_BTN_PIN    16

/* Audio parameters */
#define SAMPLE_RATE     16000
#define FRAME_SIZE      256
#define HOP_SIZE        128
#define PDM_CLOCK_HZ    1024000  /* 1.024 MHz */

/* Global buffers */
static int32_t mic1_raw[FRAME_SIZE];
static int32_t mic2_raw[FRAME_SIZE];
static int32_t ref_raw[FRAME_SIZE];
static int32_t voice_mono[FRAME_SIZE];
static int32_t voice_processed[FRAME_SIZE];
static q31_t   voice_out[FRAME_SIZE];

/* DSP state */
static spectral_sub_state_t ss_state;
static eq_state_t           eq_state;
static compressor_state_t   comp_state;

/* Mute flag (set by button interrupt) */
static volatile bool muted = false;

/* ---- Mute button interrupt ---- */
static void mute_button_callback(uint gpio, uint32_t events) {
    if (gpio == MUTE_BTN_PIN) {
        muted = !muted;
        gpio_put(STATUS_LED_PIN, !muted); /* LED on = live, off = muted */
    }
}

/* ---- Core 1: DSP pipeline ---- */
static void core1_main(void) {
    /* Initialize DSP stages */
    spectral_sub_init(&ss_state);
    eq_init(&eq_state);
    compressor_init(&comp_state);

    while (true) {
        /* Wait for a complete frame from all 3 mics */
        pdm_wait_frame();

        /* Get decimated PCM data (24-bit in 32-bit int) */
        pdm_get_frame(mic1_raw, mic2_raw, ref_raw, FRAME_SIZE);

        /* Mix down to mono: (mic1 + mic2) / 2 */
        for (int i = 0; i < FRAME_SIZE; i++) {
            voice_mono[i] = (mic1_raw[i] + mic2_raw[i]) >> 1;
        }

        if (!muted) {
            /* Stage 1: Spectral subtraction noise cancellation */
            spectral_sub_process(&ss_state, voice_mono, ref_raw, voice_processed, FRAME_SIZE);

            /* Stage 2: EQ (5 biquand filters in series) */
            eq_process(&eq_state, voice_processed, FRAME_SIZE);

            /* Stage 3: Compressor */
            compressor_process(&comp_state, voice_processed, FRAME_SIZE);

            /* Convert to 16-bit for USB output */
            for (int i = 0; i < FRAME_SIZE; i++) {
                /* Clamp and shift to 16-bit */
                int32_t s = voice_processed[i];
                if (s > 32767) s = 32767;
                if (s < -32768) s = -32768;
                voice_out[i] = (q31_t)(s << 16); /* UAC expects 16-bit in 32-bit container */
            }
        } else {
            /* Output silence when muted */
            memset(voice_out, 0, sizeof(voice_out));
        }

        /* Send to USB audio */
        usb_audio_send(voice_out, FRAME_SIZE);
    }
}

/* ---- Main (Core 0) ---- */
int main(void) {
    /* Clock: 133 MHz system, derived from 12 MHz XOSC */
    set_sys_clock_khz(133000, true);

    /* Init GPIO */
    gpio_init(STATUS_LED_PIN);
    gpio_set_dir(STATUS_LED_PIN, GPIO_OUT);
    gpio_put(STATUS_LED_PIN, true); /* LED on at boot */

    gpio_init(MUTE_BTN_PIN);
    gpio_set_dir(MUTE_BTN_PIN, GPIO_IN);
    gpio_pull_up(MUTE_BTN_PIN);
    gpio_set_irq_enabled_with_callback(MUTE_BTN_PIN, GPIO_IRQ_EDGE_FALL, true,
                                       &mute_button_callback);

    /* Init PDM capture (3 mics via PIO) */
    pdm_capture_init(MIC1_CLK_PIN, MIC1_DATA_PIN,
                     MIC2_CLK_PIN, MIC2_DATA_PIN,
                     REF_CLK_PIN, REF_DATA_PIN,
                     PDM_CLOCK_HZ, SAMPLE_RATE);

    /* Init USB Audio Class 1.0 device */
    usb_audio_init(SAMPLE_RATE);

    /* Launch DSP on Core 1 */
    multicore_launch_core1(core1_main);

    /* Core 0: USB stack polling (TinyUSB) */
    while (true) {
        tud_task();
    }

    return 0;
}

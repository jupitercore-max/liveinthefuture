/*
 * PDM Capture — PIO-based PDM microphone input + CIC decimation
 * Handles 3 PDM microphones (2 voice + 1 reference)
 *
 * License: GPL-3.0
 */

#ifndef PDM_CAPTURE_H
#define PDM_CAPTURE_H

#include <stdint.h>
#include <stddef.h>

/* Initialize 3-channel PDM capture via RP2040 PIO
 *
 * Clock is shared across all 3 mics at clk_hz.
 * Output: decimated PCM at sample_rate Hz, 24-bit effective.
 */
void pdm_capture_init(int mic1_clk, int mic1_data,
                      int mic2_clk, int mic2_data,
                      int ref_clk,  int ref_data,
                      uint32_t clk_hz, uint32_t sample_rate);

/* Wait until a complete frame is available */
void pdm_wait_frame(void);

/* Retrieve one frame of decimated PCM data for all 3 channels */
void pdm_get_frame(int32_t *mic1, int32_t *mic2, int32_t *ref, size_t n);

#endif

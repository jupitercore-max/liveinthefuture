/*
 * PDM Capture Implementation — PIO + CIC Decimator
 *
 * Uses 3 PIO state machines to clock and read PDM microphones.
 * CIC (Cascaded Integrator-Comb) decimation converts PDM to PCM.
 *
 * License: GPL-3.0
 */

#include "pdm_capture.h"
#include "hardware/pio.h"
#include "hardware/dma.h"
#include "hardware/clocks.h"
#include "pdm_capture.pio.h"  /* Generated from pdm_capture.pio */

#define CIC_STAGES    3
#define CIC_DECIM     64
#define PDM_BUF_SIZE  (FRAME_SIZE * CIC_DECIM)  /* 256 * 64 = 16384 bits */

/* PDM bit buffers (one per mic) */
static uint8_t pdm_buf1[PDM_BUF_SIZE / 8];
static uint8_t pdm_buf2[PDM_BUF_SIZE / 8];
static uint8_t pdm_buf3[PDM_BUF_SIZE / 8];

/* DMA channels */
static int dma_ch1, dma_ch2, dma_ch3;

/* CIC integrator state (running at PDM clock rate) */
static int64_t cic_int1[CIC_STAGES], cic_int2[CIC_STAGES], cic_int3[CIC_STAGES];

/* CIC comb state (running at output rate) */
static int64_t cic_comb1[CIC_STAGES], cic_comb2[CIC_STAGES], cic_comb3[CIC_STAGES];

/* Previous CIC output for compensation FIR */
static int32_t prev_out1, prev_out2, prev_out3;

/* Compensation FIR coefficients (21 taps, designed to flatten CIC droop) */
static const int32_t comp_fir_coeffs[21] = {
    -4, -3, 0, 4, 8, 6, -2, -12, -18, -10,
    10, 28, 28, 6, -24, -40, -32, 2, 40, 60, 0
};

static volatile bool frame_ready = false;
static int frame_samples_collected = 0;

void pdm_capture_init(int mic1_clk, int mic1_data,
                      int mic2_clk, int mic2_data,
                      int ref_clk,  int ref_data,
                      uint32_t clk_hz, uint32_t sample_rate)
{
    /* Load PIO program */
    PIO pio = pio0;
    uint offset = pio_add_program(pio, &pdm_capture_program);

    /* Claim 3 state machines */
    uint sm1 = pio_claim_unused_sm(pio, true);
    uint sm2 = pio_claim_unused_sm(pio, true);
    uint sm3 = pio_claim_unused_sm(pio, true);

    /* Initialize each SM: outputs clock, reads data */
    pdm_capture_program_init(pio, sm1, offset, mic1_clk, mic1_data, clk_hz);
    pdm_capture_program_init(pio, sm2, offset, mic2_clk, mic2_data, clk_hz);
    pdm_capture_program_init(pio, sm3, offset, ref_clk,  ref_data,  clk_hz);

    /* DMA channels to pull PDM data from PIO RX FIFOs */
    dma_ch1 = dma_claim_unused_channel(true);
    dma_ch2 = dma_claim_unused_channel(true);
    dma_ch3 = dma_claim_unused_channel(true);

    /* Configure DMA: 8-bit transfers from PIO RX FIFO to buffer */
    dma_channel_config c1 = dma_channel_get_default_config(dma_ch1);
    channel_config_set_transfer_data_size(&c1, DMA_SIZE_8);
    channel_config_set_read_increment(&c1, false);
    channel_config_set_write_increment(&c1, true);
    channel_config_set_dreq(&c1, pio_get_dreq(pio, sm1, false));
    dma_channel_configure(dma_ch1, &c1, pdm_buf1, &pio->rxf[sm1], PDM_BUF_SIZE / 8, true);

    /* Repeat for channels 2 and 3 */
    dma_channel_config c2 = dma_channel_get_default_config(dma_ch2);
    channel_config_set_transfer_data_size(&c2, DMA_SIZE_8);
    channel_config_set_read_increment(&c2, false);
    channel_config_set_write_increment(&c2, true);
    channel_config_set_dreq(&c2, pio_get_dreq(pio, sm2, false));
    dma_channel_configure(dma_ch2, &c2, pdm_buf2, &pio->rxf[sm2], PDM_BUF_SIZE / 8, true);

    dma_channel_config c3 = dma_channel_get_default_config(dma_ch3);
    channel_config_set_transfer_data_size(&c3, DMA_SIZE_8);
    channel_config_set_read_increment(&c3, false);
    channel_config_set_write_increment(&c3, true);
    channel_config_set_dreq(&c3, pio_get_dreq(pio, sm3, false));
    dma_channel_configure(dma_ch3, &c3, pdm_buf3, &pio->rxf[sm3], PDM_BUF_SIZE / 8, true);

    /* Start PIO state machines */
    pio_sm_set_enabled(pio, sm1, true);
    pio_sm_set_enabled(pio, sm2, true);
    pio_sm_set_enabled(pio, sm3, true);

    /* Reset CIC state */
    memset(cic_int1, 0, sizeof(cic_int1));
    memset(cic_int2, 0, sizeof(cic_int2));
    memset(cic_int3, 0, sizeof(cic_int3));
    memset(cic_comb1, 0, sizeof(cic_comb1));
    memset(cic_comb2, 0, sizeof(cic_comb2));
    memset(cic_comb3, 0, sizeof(cic_comb3));
}

/* Process one PDM bit through CIC integrator chain */
static inline int64_t cic_integrate(int64_t *integrators, int bit) {
    int64_t v = bit ? 1 : -1;
    for (int i = 0; i < CIC_STAGES; i++) {
        integrators[i] += v;
        v = integrators[i];
    }
    return v;
}

/* Apply CIC comb + compensation FIR at decimated rate */
static inline int32_t cic_comb_and_compensate(int64_t *combs, int64_t input, int32_t *prev_out) {
    /* Comb stages */
    int64_t v = input;
    for (int i = 0; i < CIC_STAGES; i++) {
        int64_t new_v = v - combs[i];
        combs[i] = v;
        v = new_v;
    }

    /* Compensation FIR (normalize by CIC gain = DECIM^STAGES) */
    /* CIC gain = 64^3 = 262144, so right-shift by 18 */
    int32_t cur = (int32_t)(v >> 18);
    int32_t out = cur + (int32_t)(((int64_t)comp_fir_coeffs[20] * (*prev_out)) >> 12);
    *prev_out = cur;

    return out;
}

void pdm_wait_frame(void) {
    /* Wait for DMA to complete (one full frame of PDM data) */
    while (!frame_ready) {
        if (dma_channel_is_complete(dma_ch1)) {
            /* Restart DMA for next frame */
            dma_channel_set_write_addr(dma_ch1, pdm_buf1, true);
            frame_ready = true;
        }
        /* In production: use DMA IRQ instead of polling */
    }
    frame_ready = false;
}

void pdm_get_frame(int32_t *mic1, int32_t *mic2, int32_t *ref, size_t n) {
    for (size_t i = 0; i < n; i++) {
        /* Process DECIM bits for each output sample */
        int32_t out1, out2, out3;
        for (int j = 0; j < CIC_DECIM; j++) {
            size_t byte_idx = (i * CIC_DECIM + j) / 8;
            size_t bit_idx  = (i * CIC_DECIM + j) % 8;

            int b1 = (pdm_buf1[byte_idx] >> bit_idx) & 1;
            int b2 = (pdm_buf2[byte_idx] >> bit_idx) & 1;
            int b3 = (pdm_buf3[byte_idx] >> bit_idx) & 1;

            int64_t v1 = cic_integrate(cic_int1, b1);
            int64_t v2 = cic_integrate(cic_int2, b2);
            int64_t v3 = cic_integrate(cic_int3, b3);

            if (j == CIC_DECIM - 1) {
                /* Last bit in group: run comb + compensation */
                out1 = cic_comb_and_compensate(cic_comb1, v1, &prev_out1);
                out2 = cic_comb_and_compensate(cic_comb2, v2, &prev_out2);
                out3 = cic_comb_and_compensate(cic_comb3, v3, &prev_out3);
            }
        }
        mic1[i] = out1;
        mic2[i] = out2;
        ref[i]  = out3;
    }
}

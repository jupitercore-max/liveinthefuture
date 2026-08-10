/*
 * Feed-Forward Compressor
 *
 * 2:1 ratio, -12 dBFS threshold, 5ms attack, 50ms release
 *
 * License: GPL-3.0
 */

#ifndef COMPRESSOR_H
#define COMPRESSOR_H

#include <stdint.h>
#include <stddef.h>

typedef struct {
    float envelope;       /* current envelope follower level */
    float attack_coef;
    float release_coef;
    float threshold;      /* linear amplitude */
    float ratio;          /* 2.0 for 2:1 */
    float makeup_gain;    /* output gain to compensate for gain reduction */
} compressor_state_t;

void compressor_init(compressor_state_t *s);
void compressor_process(compressor_state_t *s, int32_t *buf, size_t n);

#endif

/*
 * 5-Band Biquad EQ — ASR-Optimized Profile
 *
 * License: GPL-3.0
 */

#ifndef EQ_H
#define EQ_H

#include <stdint.h>
#include <stddef.h>

typedef struct {
    /* Biquad state: 5 filters, each has 2 x[n-1], x[n-2], y[n-1], y[n-2] */
    float x1[5], x2[5];
    float y1[5], y2[5];
} eq_state_t;

void eq_init(eq_state_t *s);
void eq_process(eq_state_t *s, int32_t *buf, size_t n);

#endif

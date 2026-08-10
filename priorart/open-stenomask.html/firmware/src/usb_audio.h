/*
 * USB Audio Class 1.0 — Mono 16kHz/16-bit
 *
 * Minimal UAC 1.0 implementation using TinyUSB.
 * Enumerates as "OpenStenoMask" input device.
 *
 * License: GPL-3.0
 */

#ifndef USB_AUDIO_H
#define USB_AUDIO_H

#include <stdint.h>
#include <stddef.h>

void usb_audio_init(uint32_t sample_rate);
void usb_audio_send(const q31_t *samples, size_t n);

#endif

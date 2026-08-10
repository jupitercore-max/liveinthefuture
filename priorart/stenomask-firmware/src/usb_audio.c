/*
 * USB Audio Class 1.0 Implementation
 *
 * Descriptors for mono 16kHz/16-bit USB audio input device.
 * Uses TinyUSB (bundled with Pico SDK).
 *
 * License: GPL-3.0
 */

#include "usb_audio.h"
#include "tusb.h"

/* USB Device Descriptor */
#define USBD_VID     0xCAFE   /* Open source VID (use your own for production) */
#define USBD_PID     0x5731   /* "O531" ≈ "OSM1" */
#define USBD_VERSION 0x0100

#define EP_AUDIO_IN  0x81     /* Endpoint 1 IN (ISO) */
#define AUDIO_PACKET_SIZE 64  /* 16kHz mono 16-bit = 32KB/s ÷ 1000Hz = 32B/ISO packet */

/* --- TinyUSB Descriptors --- */

/* Device Descriptor */
tusb_desc_device_t const desc_device = {
    .bLength            = sizeof(tusb_desc_device_t),
    .bDescriptorType    = TUSB_DESC_DEVICE,
    .bcdUSB             = 0x0200,    /* USB 2.0 */
    .bDeviceClass       = 0x00,
    .bDeviceSubClass    = 0x00,
    .bDeviceProtocol    = 0x00,
    .bMaxPacketSize0    = 64,
    .idVendor           = USBD_VID,
    .idProduct          = USBD_PID,
    .bcdDevice          = USBD_VERSION,
    .iManufacturer      = 0x01,
    .iProduct           = 0x02,
    .iSerialNumber      = 0x03,
    .bNumConfigurations = 0x01
};

uint8_t const * tud_descriptor_device_cb(void) {
    return (uint8_t const *) &desc_device;
}

/* Configuration Descriptor (simplified — real UAC descriptors are longer) */
/* 
 * Full implementation requires:
 *   - Configuration descriptor
 *   - Interface association descriptor (IAD)
 *   - Audio control interface + clock source + input terminal + feature unit
 *   - Audio streaming interface (alt 0 = inactive, alt 1 = active)
 *   - Audio streaming endpoint (isochronous)
 *
 * For production, use the TinyUSB uac2 example as a base:
 * https://github.com/hathach/tinyusb/tree/master/examples/device/uac2_headset
 *
 * Below is a minimal skeleton.
 */

#define CONFIG_TOTAL_LEN  (TUD_CONFIG_DESC_LEN + TUD_AUDIO_MIC_ONE_CH_DESC_LEN)

uint8_t const desc_configuration[] = {
    /* Config number, interface count, string index, total length, attribute, power */
    TUD_CONFIG_DESCRIPTOR(1, 2, 0, CONFIG_TOTAL_LEN,
                          TUSB_DESC_CONFIG_ATT_REMOTE_WAKEUP, 100),

    /* Audio Control Interface */
    TUD_AUDIO_MIC_ONE_CH_DESCRIPTOR(2, 3, 4, 5, EP_AUDIO_IN,
                                    AUDIO_PACKET_SIZE, 16000)
};

uint8_t const * tud_descriptor_configuration_cb(uint8_t index) {
    (void) index;
    return desc_configuration;
}

/* String Descriptors */
char const *string_desc_arr[] = {
    (const char[]) { 0x09, 0x04 },   /* 0: English */
    "OpenStenoMask Project",          /* 1: Manufacturer */
    "OpenStenoMask",                  /* 2: Product */
    "OSM001",                         /* 3: Serial */
    "OpenStenoMask Audio",            /* 4: Audio Control IF */
    "OpenStenoMask Mic",              /* 5: Audio Streaming IF */
};

static uint32_t current_sample_rate = 16000;

void usb_audio_init(uint32_t sample_rate) {
    current_sample_rate = sample_rate;
    tusb_init();
}

/* Circular buffer for USB audio packets */
#define USB_AUDIO_BUF_FRAMES 4
static q31_t usb_ring[USB_AUDIO_BUF_FRAMES][128];
static volatile uint8_t usb_write_idx = 0;
static volatile uint8_t usb_read_idx  = 0;

void usb_audio_send(const q31_t *samples, size_t n) {
    /* Copy samples into the ring buffer */
    size_t to_copy = (n < 128) ? n : 128;
    memcpy(usb_ring[usb_write_idx], samples, to_copy * sizeof(q31_t));
    usb_write_idx = (usb_write_idx + 1) % USB_AUDIO_BUF_FRAMES;
}

/* TinyUSB audio callback — called when host requests audio data */
bool tud_audio_rx_done_pre_read_cb(uint8_t rhport, uint8_t const *buffer, uint16_t bufsize) {
    (void) rhport;
    /* Supply audio data from ring buffer */
    if (usb_read_idx != usb_write_idx) {
        uint16_t len = 128 * sizeof(q31_t);
        if (len > bufsize) len = bufsize;
        memcpy((void*)buffer, usb_ring[usb_read_idx], len);
        usb_read_idx = (usb_read_idx + 1) % USB_AUDIO_BUF_FRAMES;
    }
    return true;
}

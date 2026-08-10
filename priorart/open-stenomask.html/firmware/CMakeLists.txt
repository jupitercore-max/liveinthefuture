# OpenStenoMask — CMakeLists.txt
# Build with Pico SDK for RP2040
#
# License: GPL-3.0

cmake_minimum_required(VERSION 3.13)

include(pico_sdk_import.cmake)

project(openstenomask C CXX ASM)

set(CMAKE_C_STANDARD 11)
set(CMAKE_CXX_STANDARD 17)

pico_sdk_init()

add_executable(openstenomask
    src/main.c
    src/pdm_capture.c
    src/spectral_subtraction.c
    src/eq.c
    src/compressor.c
    src/usb_audio.c
)

# Generate PIO header
pico_generate_pio_header(openstenomask src/pdm_capture.pio)

target_include_directories(openstenomask PRIVATE src)

target_link_libraries(openstenomask
    pico_stdlib
    pico_multicore
    hardware_pio
    hardware_dma
    hardware_clocks
    hardware_irq
    hardware_flash
    tinyusb_device
    tinyusb_board
    m  # math library
)

# USB info
pico_set_usb_vid(openstenomask 0xCAFE)
pico_set_usb_pid(openstenomask 0x5731)

# Enable USB output (disable UART stdout to save USB bandwidth)
pico_enable_stdio_usb(openstenomask 0)
pico_enable_stdio_uart(openstenomask 1)

# Output: openstenomask.uf2
pico_add_extra_outputs(openstenomask)

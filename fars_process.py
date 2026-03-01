#!/usr/bin/env python3
"""
FARS Per-Model Fatality Data Processor
Downloads FARS 2019-2023 bulk CSV ZIPs from NHTSA, parses vehicle.csv,
aggregates occupant deaths by make/model, estimates VMT, and outputs
a JS-ready FARS_BY_MODEL array.
"""

import csv
import io
import json
import os
import re
import sys
import urllib.request
import zipfile
from collections import defaultdict

FARS_YEARS = [2019, 2020, 2021, 2022, 2023]
CACHE_DIR = os.path.join(os.path.dirname(__file__), '.fars_cache')
MIN_DEATHS = 50  # minimum total deaths across 5 years to include

# BODY_TYP codes to EXCLUDE (non-passenger vehicles)
# 50-59: Buses
# 60-69: (part of bus range in some schemas) — we exclude 50-79 broadly
# 70-79: Medium/heavy trucks
# 80-89: Motorcycles
# 90-99: Other (ATVs, snowmobiles, etc.)
# We KEEP: 1-49 (passenger cars, light trucks, SUVs, vans, pickups)
EXCLUDED_BODY_TYPES = set(range(50, 100))

# Model name normalization: collapse trim variants
MODEL_COLLAPSE = {
    # Ford
    'F-150 XLT': 'F-150', 'F-150 LARIAT': 'F-150', 'F-150 PLATINUM': 'F-150',
    'F-150 LIMITED': 'F-150', 'F-150 KING RANCH': 'F-150', 'F-150 STX': 'F-150',
    'F-150 RAPTOR': 'F-150', 'F-150 TREMOR': 'F-150',
    'F-250 XLT': 'F-250', 'F-250 LARIAT': 'F-250', 'F-250 PLATINUM': 'F-250',
    'F-250 KING RANCH': 'F-250',
    'F-350 XLT': 'F-350', 'F-350 LARIAT': 'F-350', 'F-350 PLATINUM': 'F-350',
    'F-350 KING RANCH': 'F-350',
    'EXPLORER XLT': 'EXPLORER', 'EXPLORER LIMITED': 'EXPLORER', 'EXPLORER ST': 'EXPLORER',
    'ESCAPE SE': 'ESCAPE', 'ESCAPE SEL': 'ESCAPE', 'ESCAPE TITANIUM': 'ESCAPE',
    'FUSION SE': 'FUSION', 'FUSION TITANIUM': 'FUSION', 'FUSION S': 'FUSION',
    'MUSTANG GT': 'MUSTANG', 'MUSTANG ECOBOOST': 'MUSTANG',
    # Chevrolet
    'SILVERADO 1500 LT': 'SILVERADO 1500', 'SILVERADO 1500 WT': 'SILVERADO 1500',
    'SILVERADO 1500 RST': 'SILVERADO 1500', 'SILVERADO 1500 LTZ': 'SILVERADO 1500',
    'SILVERADO 1500 HIGH COUNTRY': 'SILVERADO 1500', 'SILVERADO 1500 CUSTOM': 'SILVERADO 1500',
    'SILVERADO 2500 HD': 'SILVERADO 2500', 'SILVERADO 2500HD': 'SILVERADO 2500',
    'SILVERADO 3500 HD': 'SILVERADO 3500', 'SILVERADO 3500HD': 'SILVERADO 3500',
    'EQUINOX LT': 'EQUINOX', 'EQUINOX LS': 'EQUINOX', 'EQUINOX PREMIER': 'EQUINOX',
    'MALIBU LT': 'MALIBU', 'MALIBU LS': 'MALIBU', 'MALIBU PREMIER': 'MALIBU',
    'TRAVERSE LT': 'TRAVERSE', 'TRAVERSE LS': 'TRAVERSE',
    'CAMARO SS': 'CAMARO', 'CAMARO LT': 'CAMARO', 'CAMARO ZL1': 'CAMARO',
    # Toyota
    'CAMRY LE': 'CAMRY', 'CAMRY SE': 'CAMRY', 'CAMRY XSE': 'CAMRY', 'CAMRY XLE': 'CAMRY',
    'COROLLA LE': 'COROLLA', 'COROLLA SE': 'COROLLA', 'COROLLA L': 'COROLLA',
    'RAV4 LE': 'RAV4', 'RAV4 XLE': 'RAV4', 'RAV4 LIMITED': 'RAV4',
    'HIGHLANDER LE': 'HIGHLANDER', 'HIGHLANDER XLE': 'HIGHLANDER', 'HIGHLANDER LIMITED': 'HIGHLANDER',
    'TACOMA SR5': 'TACOMA', 'TACOMA TRD': 'TACOMA', 'TACOMA SR': 'TACOMA',
    'TUNDRA SR5': 'TUNDRA', 'TUNDRA LIMITED': 'TUNDRA', 'TUNDRA TRD': 'TUNDRA',
    '4RUNNER SR5': '4RUNNER', '4RUNNER TRD': '4RUNNER', '4RUNNER LIMITED': '4RUNNER',
    # Honda
    'CIVIC LX': 'CIVIC', 'CIVIC EX': 'CIVIC', 'CIVIC SPORT': 'CIVIC', 'CIVIC SI': 'CIVIC',
    'ACCORD LX': 'ACCORD', 'ACCORD SPORT': 'ACCORD', 'ACCORD EX': 'ACCORD', 'ACCORD EX-L': 'ACCORD',
    'CR-V LX': 'CR-V', 'CR-V EX': 'CR-V', 'CR-V EX-L': 'CR-V', 'CR-V TOURING': 'CR-V',
    'PILOT LX': 'PILOT', 'PILOT EX': 'PILOT', 'PILOT EX-L': 'PILOT', 'PILOT TOURING': 'PILOT',
    # Nissan
    'ALTIMA S': 'ALTIMA', 'ALTIMA SV': 'ALTIMA', 'ALTIMA SR': 'ALTIMA', 'ALTIMA SL': 'ALTIMA',
    'ROGUE S': 'ROGUE', 'ROGUE SV': 'ROGUE', 'ROGUE SL': 'ROGUE',
    'SENTRA S': 'SENTRA', 'SENTRA SV': 'SENTRA', 'SENTRA SR': 'SENTRA',
    # Hyundai
    'ELANTRA SE': 'ELANTRA', 'ELANTRA SEL': 'ELANTRA', 'ELANTRA LIMITED': 'ELANTRA',
    'SONATA SE': 'SONATA', 'SONATA SEL': 'SONATA', 'SONATA LIMITED': 'SONATA',
    'TUCSON SE': 'TUCSON', 'TUCSON SEL': 'TUCSON', 'TUCSON LIMITED': 'TUCSON',
    'SANTA FE SE': 'SANTA FE', 'SANTA FE SEL': 'SANTA FE', 'SANTA FE LIMITED': 'SANTA FE',
    # Kia
    'FORTE LXS': 'FORTE', 'FORTE GT': 'FORTE', 'FORTE FE': 'FORTE',
    'OPTIMA LX': 'OPTIMA', 'OPTIMA S': 'OPTIMA', 'OPTIMA SX': 'OPTIMA',
    'SORENTO LX': 'SORENTO', 'SORENTO S': 'SORENTO', 'SORENTO SX': 'SORENTO',
    'SPORTAGE LX': 'SPORTAGE', 'SPORTAGE S': 'SPORTAGE', 'SPORTAGE SX': 'SPORTAGE',
    'SOUL LX': 'SOUL', 'SOUL S': 'SOUL', 'SOUL GT': 'SOUL',
    # Ram / Dodge
    '1500 BIG HORN': '1500', '1500 LARAMIE': '1500', '1500 TRADESMAN': '1500',
    '1500 REBEL': '1500', '1500 LIMITED': '1500', '1500 LONE STAR': '1500',
    '1500 CLASSIC': '1500',
    '2500 TRADESMAN': '2500', '2500 LARAMIE': '2500', '2500 BIG HORN': '2500',
    '2500 LIMITED': '2500', '2500 POWER WAGON': '2500',
    '3500 TRADESMAN': '3500', '3500 LARAMIE': '3500', '3500 LIMITED': '3500',
    '300C': '300', '300S': '300', '300 TOURING': '300', '300 LIMITED': '300',
    'CHARGER SXT': 'CHARGER', 'CHARGER R/T': 'CHARGER', 'CHARGER GT': 'CHARGER',
    'CHALLENGER SXT': 'CHALLENGER', 'CHALLENGER R/T': 'CHALLENGER', 'CHALLENGER GT': 'CHALLENGER',
    'GRAND CHEROKEE LAREDO': 'GRAND CHEROKEE', 'GRAND CHEROKEE LIMITED': 'GRAND CHEROKEE',
    'GRAND CHEROKEE OVERLAND': 'GRAND CHEROKEE', 'GRAND CHEROKEE TRAILHAWK': 'GRAND CHEROKEE',
    # GMC
    'SIERRA 1500 SLE': 'SIERRA 1500', 'SIERRA 1500 SLT': 'SIERRA 1500',
    'SIERRA 1500 DENALI': 'SIERRA 1500', 'SIERRA 1500 ELEVATION': 'SIERRA 1500',
    'SIERRA 2500 HD': 'SIERRA 2500', 'SIERRA 2500HD': 'SIERRA 2500',
    'SIERRA 3500 HD': 'SIERRA 3500', 'SIERRA 3500HD': 'SIERRA 3500',
    'TERRAIN SLE': 'TERRAIN', 'TERRAIN SLT': 'TERRAIN', 'TERRAIN DENALI': 'TERRAIN',
    'ACADIA SLE': 'ACADIA', 'ACADIA SLT': 'ACADIA', 'ACADIA DENALI': 'ACADIA',
    # Subaru
    'OUTBACK PREMIUM': 'OUTBACK', 'OUTBACK LIMITED': 'OUTBACK', 'OUTBACK TOURING': 'OUTBACK',
    'FORESTER PREMIUM': 'FORESTER', 'FORESTER LIMITED': 'FORESTER', 'FORESTER SPORT': 'FORESTER',
    'CROSSTREK PREMIUM': 'CROSSTREK', 'CROSSTREK LIMITED': 'CROSSTREK', 'CROSSTREK SPORT': 'CROSSTREK',
    # Scion models reported under Toyota in FARS
    'SCION TC': 'TC', 'SCION XB': 'XB', 'SCION XD': 'XD', 'SCION XA': 'XA',
    'SCION FR-S': 'FR-S',
    # Nissan variants
    'VERSA NOTE': 'VERSA',
    # GMC variants
    'YUKON XL': 'YUKON', 'JIMMY UTILITY': 'JIMMY',
    # Chevrolet variants
    'SILVERADO 1500 LD': 'SILVERADO 1500',
    # Saturn series consolidation
    'SL2': 'S SERIES', 'SL1': 'S SERIES', 'SL': 'S SERIES', 'SC2': 'S SERIES', 'SC1': 'S SERIES', 'SW2': 'S SERIES',
    'LW200': 'L SERIES', 'LW300': 'L SERIES', 'L200': 'L SERIES', 'L300': 'L SERIES',
    # Mitsubishi
    'OUTLANDER SPORT': 'OUTLANDER',
    # Jeep
    'WRANGLER SPORT': 'WRANGLER', 'WRANGLER SAHARA': 'WRANGLER', 'WRANGLER RUBICON': 'WRANGLER',
    'CHEROKEE LATITUDE': 'CHEROKEE', 'CHEROKEE LIMITED': 'CHEROKEE', 'CHEROKEE TRAILHAWK': 'CHEROKEE',
    'COMPASS LATITUDE': 'COMPASS', 'COMPASS LIMITED': 'COMPASS', 'COMPASS TRAILHAWK': 'COMPASS',
    # VW
    'JETTA S': 'JETTA', 'JETTA SE': 'JETTA', 'JETTA SEL': 'JETTA',
    'TIGUAN S': 'TIGUAN', 'TIGUAN SE': 'TIGUAN', 'TIGUAN SEL': 'TIGUAN',
    # BMW — collapse specific models to series names
    '3 SERIES 330I': '3 SERIES', '3 SERIES 330I XDRIVE': '3 SERIES',
    '328I': '3 SERIES', '325I': '3 SERIES', '335I': '3 SERIES', '330I': '3 SERIES',
    '320I': '3 SERIES', '325CI': '3 SERIES', '325XI': '3 SERIES', '328XI': '3 SERIES',
    '330CI': '3 SERIES', '330XI': '3 SERIES', '335XI': '3 SERIES', '340I': '3 SERIES',
    '528I': '5 SERIES', '535I': '5 SERIES', '525I': '5 SERIES', '530I': '5 SERIES',
    '550I': '5 SERIES', '540I': '5 SERIES', '535XI': '5 SERIES', '528XI': '5 SERIES',
    '745LI': '7 SERIES', '750LI': '7 SERIES', '740I': '7 SERIES', '750I': '7 SERIES',
    '760LI': '7 SERIES', '745I': '7 SERIES',
    'X3 SDRIVE30I': 'X3', 'X3 XDRIVE30I': 'X3', 'X5 XDRIVE40I': 'X5',
    'X5 XDRIVE35I': 'X5', 'X5 4.4I': 'X5', 'X5 3.0I': 'X5',
    'X3 3.0I': 'X3', 'X3 XDRIVE28I': 'X3',
    'Z3 2.5I': 'Z3', 'Z3 3.0I': 'Z3', 'Z4 3.0I': 'Z4', 'Z4 SDRIVE30I': 'Z4',
    'M5': 'M5', 'M6': 'M6',
    # Mercedes
    'C-CLASS C300': 'C-CLASS', 'C-CLASS C 300': 'C-CLASS',
    'C300': 'C-CLASS', 'C230': 'C-CLASS', 'C240': 'C-CLASS', 'C280': 'C-CLASS', 'C320': 'C-CLASS', 'C350': 'C-CLASS',
    'E-CLASS E350': 'E-CLASS', 'E-CLASS E 350': 'E-CLASS',
    'E350': 'E-CLASS', 'E320': 'E-CLASS', 'E500': 'E-CLASS', 'E550': 'E-CLASS', 'E300': 'E-CLASS',
    'S500': 'S-CLASS', 'S550': 'S-CLASS', 'S430': 'S-CLASS', 'S600': 'S-CLASS',
    'CLA250': 'CLA-CLASS', 'CLA 250': 'CLA-CLASS',
    'GLE350': 'GLE-CLASS', 'GLE 350': 'GLE-CLASS',
    'GLE-CLASS GLE 350': 'GLE-CLASS',
    'GLC300': 'GLC-CLASS', 'GLC 300': 'GLC-CLASS',
    'GLK350': 'GLK-CLASS', 'GLK 350': 'GLK-CLASS',
    'GL450': 'GL-CLASS', 'GL 450': 'GL-CLASS', 'GL550': 'GL-CLASS',
    'ML350': 'ML-CLASS', 'ML 350': 'ML-CLASS', 'ML320': 'ML-CLASS', 'ML500': 'ML-CLASS',
    # Audi
    'A4 2.0T': 'A4', 'A4 QUATTRO': 'A4',
    'A6 3.0T': 'A6', 'A6 QUATTRO': 'A6',
    'Q5 2.0T': 'Q5', 'Q5 QUATTRO': 'Q5',
    'Q7 3.0T': 'Q7', 'Q7 QUATTRO': 'Q7',
    # Lexus
    'ES 350': 'ES', 'ES350': 'ES', 'ES 300': 'ES', 'ES300': 'ES',
    'IS 250': 'IS', 'IS250': 'IS', 'IS 350': 'IS', 'IS350': 'IS', 'IS 300': 'IS',
    'RX 350': 'RX', 'RX350': 'RX', 'RX 300': 'RX', 'RX330': 'RX', 'RX 330': 'RX',
    'GS 350': 'GS', 'GS350': 'GS', 'GS 300': 'GS', 'GS300': 'GS',
    'LS 430': 'LS', 'LS430': 'LS', 'LS 460': 'LS', 'LS460': 'LS',
    'GX 470': 'GX', 'GX470': 'GX', 'GX 460': 'GX', 'GX460': 'GX',
    'LX 470': 'LX', 'LX470': 'LX', 'LX 570': 'LX', 'LX570': 'LX',
    'NX 200T': 'NX', 'NX200T': 'NX', 'NX 300': 'NX', 'NX300': 'NX',
    # Infiniti
    'G35 COUPE': 'G35', 'G35 SEDAN': 'G35', 'G37 COUPE': 'G37', 'G37 SEDAN': 'G37',
    'FX35 AWD': 'FX35',
}

# Make name normalization
MAKE_NORMALIZE = {
    'CHEVROLET': 'Chevrolet', 'FORD': 'Ford', 'TOYOTA': 'Toyota',
    'HONDA': 'Honda', 'NISSAN': 'Nissan', 'HYUNDAI': 'Hyundai',
    'KIA': 'Kia', 'DODGE': 'Dodge', 'RAM': 'Ram', 'JEEP': 'Jeep',
    'GMC': 'GMC', 'SUBARU': 'Subaru', 'VOLKSWAGEN': 'Volkswagen',
    'BMW': 'BMW', 'MERCEDES-BENZ': 'Mercedes-Benz', 'MAZDA': 'Mazda',
    'BUICK': 'Buick', 'CHRYSLER': 'Chrysler', 'LEXUS': 'Lexus',
    'ACURA': 'Acura', 'INFINITI': 'Infiniti', 'AUDI': 'Audi',
    'VOLVO': 'Volvo', 'CADILLAC': 'Cadillac', 'LINCOLN': 'Lincoln',
    'MITSUBISHI': 'Mitsubishi', 'TESLA': 'Tesla', 'GENESIS': 'Genesis',
    'PONTIAC': 'Pontiac', 'SATURN': 'Saturn', 'MERCURY': 'Mercury',
    'SCION': 'Scion', 'FIAT': 'Fiat', 'MINI': 'Mini',
    'LAND ROVER': 'Land Rover', 'JAGUAR': 'Jaguar', 'PORSCHE': 'Porsche',
    'OLDSMOBILE': 'Oldsmobile', 'ISUZU': 'Isuzu', 'SUZUKI': 'Suzuki',
    'GEO': 'Geo', 'PLYMOUTH': 'Plymouth', 'HUMMER': 'Hummer',
    'DAEWOO': 'Daewoo', 'SAAB': 'Saab',
}

# Vehicle class assignment based on make+model
# We'll assign body class based on known model types
BODY_CLASS_MAP = {
    # Sedans
    ('Chevrolet', 'MALIBU'): 'Sedan', ('Chevrolet', 'IMPALA'): 'Sedan',
    ('Chevrolet', 'CRUZE'): 'Sedan', ('Chevrolet', 'SONIC'): 'Sedan',
    ('Chevrolet', 'SPARK'): 'Sedan', ('Chevrolet', 'COBALT'): 'Sedan',
    ('Ford', 'FUSION'): 'Sedan', ('Ford', 'FOCUS'): 'Sedan',
    ('Ford', 'TAURUS'): 'Sedan', ('Ford', 'FIESTA'): 'Sedan',
    ('Toyota', 'CAMRY'): 'Sedan', ('Toyota', 'COROLLA'): 'Sedan',
    ('Toyota', 'YARIS'): 'Sedan', ('Toyota', 'AVALON'): 'Sedan',
    ('Toyota', 'PRIUS'): 'Sedan',
    ('Honda', 'CIVIC'): 'Sedan', ('Honda', 'ACCORD'): 'Sedan',
    ('Honda', 'FIT'): 'Sedan', ('Honda', 'INSIGHT'): 'Sedan',
    ('Nissan', 'ALTIMA'): 'Sedan', ('Nissan', 'SENTRA'): 'Sedan',
    ('Nissan', 'VERSA'): 'Sedan', ('Nissan', 'MAXIMA'): 'Sedan',
    ('Hyundai', 'ELANTRA'): 'Sedan', ('Hyundai', 'SONATA'): 'Sedan',
    ('Hyundai', 'ACCENT'): 'Sedan',
    ('Kia', 'OPTIMA'): 'Sedan', ('Kia', 'FORTE'): 'Sedan',
    ('Kia', 'RIO'): 'Sedan', ('Kia', 'K5'): 'Sedan',
    ('Kia', 'SOUL'): 'Sedan',
    ('Dodge', 'CHARGER'): 'Sedan', ('Chrysler', '300'): 'Sedan',
    ('Volkswagen', 'JETTA'): 'Sedan', ('Volkswagen', 'PASSAT'): 'Sedan',
    ('Mazda', 'MAZDA3'): 'Sedan', ('Mazda', 'MAZDA6'): 'Sedan', ('Mazda', '3'): 'Sedan', ('Mazda', '6'): 'Sedan',
    ('Mitsubishi', 'LANCER'): 'Sedan', ('Mitsubishi', 'MIRAGE'): 'Sedan',
    ('Subaru', 'IMPREZA'): 'Sedan', ('Subaru', 'LEGACY'): 'Sedan', ('Subaru', 'WRX'): 'Sedan',
    ('Buick', 'LACROSSE'): 'Sedan', ('Buick', 'REGAL'): 'Sedan', ('Buick', 'VERANO'): 'Sedan',
    ('BMW', '3 SERIES'): 'Sedan', ('BMW', '5 SERIES'): 'Sedan',
    ('Mercedes-Benz', 'C-CLASS'): 'Sedan', ('Mercedes-Benz', 'E-CLASS'): 'Sedan',
    ('Lexus', 'ES'): 'Sedan', ('Lexus', 'IS'): 'Sedan',
    ('Acura', 'TLX'): 'Sedan', ('Acura', 'ILX'): 'Sedan', ('Acura', 'CL'): 'Sedan',
    ('Infiniti', 'Q50'): 'Sedan',
    ('Audi', 'A4'): 'Sedan', ('Audi', 'A6'): 'Sedan',
    ('Cadillac', 'CTS'): 'Sedan', ('Cadillac', 'ATS'): 'Sedan',
    ('Volvo', 'S60'): 'Sedan', ('Tesla', 'MODEL 3'): 'Sedan', ('Tesla', 'MODEL S'): 'Sedan',
    ('Lincoln', 'MKZ'): 'Sedan', ('Pontiac', 'G6'): 'Sedan',
    ('Mercury', 'GRAND MARQUIS'): 'Sedan', ('Ford', 'CROWN VICTORIA'): 'Sedan',
    ('Buick', 'LESABRE'): 'Sedan', ('Buick', 'CENTURY'): 'Sedan',
    ('Buick', 'LUCERNE'): 'Sedan', ('Buick', 'PARK AVENUE'): 'Sedan',
    ('Pontiac', 'GRAND AM'): 'Sedan', ('Pontiac', 'GRAND PRIX'): 'Sedan',
    ('Pontiac', 'BONNEVILLE'): 'Sedan', ('Pontiac', 'SUNFIRE'): 'Sedan',
    ('Saturn', 'ION'): 'Sedan', ('Saturn', 'L SERIES'): 'Sedan',
    ('Saturn', 'S SERIES'): 'Sedan', ('Saturn', 'AURA'): 'Sedan',
    ('Oldsmobile', 'ALERO'): 'Sedan', ('Oldsmobile', 'INTRIGUE'): 'Sedan',
    ('Mercury', 'SABLE'): 'Sedan', ('Mercury', 'MILAN'): 'Sedan',
    ('Mercury', 'MOUNTAINEER'): 'SUV', ('Mercury', 'MARINER'): 'SUV',
    ('Chrysler', 'SEBRING'): 'Sedan', ('Chrysler', 'PT CRUISER'): 'Sedan',
    ('Chrysler', '200'): 'Sedan', ('Chrysler', 'CONCORDE'): 'Sedan',
    ('Dodge', 'STRATUS'): 'Sedan', ('Dodge', 'NEON'): 'Sedan',
    ('Dodge', 'AVENGER'): 'Sedan', ('Dodge', 'DART'): 'Sedan',
    ('Dodge', 'INTREPID'): 'Sedan', ('Dodge', 'MAGNUM'): 'Sedan',
    ('Dodge', 'CALIBER'): 'Sedan',
    ('Ford', 'FIVE HUNDRED'): 'Sedan', ('Ford', 'CONTOUR'): 'Sedan',
    ('Chevrolet', 'CAVALIER'): 'Sedan', ('Chevrolet', 'MONTE CARLO'): 'Sedan',
    ('Chevrolet', 'AVEO'): 'Sedan', ('Chevrolet', 'LUMINA'): 'Sedan',
    ('Chevrolet', 'PRIZM'): 'Sedan', ('Chevrolet', 'HHR'): 'Sedan',
    ('Toyota', 'TERCEL'): 'Sedan', ('Toyota', 'ECHO'): 'Sedan',
    ('Toyota', 'MATRIX'): 'Sedan', ('Toyota', 'SOLARA'): 'Sedan',
    ('Toyota', 'CELICA'): 'Sports Car', ('Toyota', 'SUPRA'): 'Sports Car',
    ('Toyota', 'PICK-UP'): 'Pickup',
    ('Honda', 'DEL SOL'): 'Sedan',
    ('Nissan', 'XTERRA'): 'SUV', ('Nissan', 'QUEST'): 'Van', ('Nissan', '350Z'): 'Sports Car',
    ('Nissan', 'CUBE'): 'Sedan', ('Nissan', 'JUKE'): 'SUV',
    ('Hyundai', 'TIBURON'): 'Sports Car', ('Hyundai', 'VELOSTER'): 'Sports Car',
    ('Hyundai', 'XG350'): 'Sedan', ('Hyundai', 'GENESIS'): 'Sedan',
    ('Kia', 'SPECTRA'): 'Sedan', ('Kia', 'AMANTI'): 'Sedan',
    ('Mitsubishi', 'GALANT'): 'Sedan', ('Mitsubishi', 'ECLIPSE'): 'Sports Car',
    ('Mitsubishi', 'ENDEAVOR'): 'SUV', ('Mitsubishi', 'MONTERO'): 'SUV',
    ('Subaru', 'TRIBECA'): 'SUV', ('Subaru', 'BAJA'): 'Pickup',
    ('Mazda', 'MX-5'): 'Sports Car', ('Mazda', 'TRIBUTE'): 'SUV',
    ('Mazda', 'MPV'): 'Van', ('Mazda', 'PROTEGE'): 'Sedan', ('Mazda', 'MAZDA5'): 'Van',
    ('Mazda', 'B-SERIES'): 'Pickup',
    ('Mazda', 'CX-30'): 'SUV',
    ('Volkswagen', 'GOLF'): 'Sedan', ('Volkswagen', 'BEETLE'): 'Sedan',
    ('Volkswagen', 'CC'): 'Sedan', ('Volkswagen', 'TOUAREG'): 'SUV',
    ('Scion', 'TC'): 'Sports Car', ('Scion', 'XB'): 'Sedan',
    ('Scion', 'XD'): 'Sedan',
    ('Toyota', 'TC'): 'Sports Car', ('Toyota', 'XB'): 'Sedan',
    ('Toyota', 'XD'): 'Sedan', ('Toyota', 'XA'): 'Sedan',
    ('Lincoln', 'TOWN CAR'): 'Sedan', ('Lincoln', 'CONTINENTAL'): 'Sedan',
    ('Lincoln', 'MKX'): 'SUV', ('Lincoln', 'LS'): 'Sedan',
    ('Cadillac', 'DEVILLE'): 'Sedan', ('Cadillac', 'SRX'): 'SUV',
    ('Cadillac', 'STS'): 'Sedan', ('Cadillac', 'SEVILLE'): 'Sedan', ('Cadillac', 'DTS'): 'Sedan',
    ('Cadillac', 'ELDORADO'): 'Sedan', ('Cadillac', 'XTS'): 'Sedan',
    ('Acura', 'TL'): 'Sedan', ('Acura', 'TSX'): 'Sedan',
    ('Acura', 'RSX'): 'Sports Car', ('Acura', 'INTEGRA'): 'Sedan',
    ('Infiniti', 'G35'): 'Sedan', ('Infiniti', 'G37'): 'Sedan',
    ('Infiniti', 'FX35'): 'SUV', ('Infiniti', 'FX45'): 'SUV',
    ('Infiniti', 'QX56'): 'SUV',
    ('Audi', 'A3'): 'Sedan', ('Audi', 'Q3'): 'SUV',
    ('BMW', '5 SERIES'): 'Sedan', ('BMW', '7 SERIES'): 'Sedan',
    ('BMW', 'X1'): 'SUV', ('BMW', 'X6'): 'SUV',
    ('Volvo', 'S40'): 'Sedan', ('Volvo', 'S80'): 'Sedan',
    ('Volvo', 'XC70'): 'SUV', ('Volvo', 'V70'): 'Sedan',
    ('Land Rover', 'RANGE ROVER SPORT'): 'SUV', ('Land Rover', 'LR3'): 'SUV',
    ('Porsche', '911'): 'Sports Car', ('Porsche', 'BOXSTER'): 'Sports Car',
    ('Jaguar', 'X-TYPE'): 'Sedan', ('Jaguar', 'S-TYPE'): 'Sedan',
    ('Jaguar', 'XF'): 'Sedan',
    ('Isuzu', 'RODEO'): 'SUV', ('Isuzu', 'TROOPER'): 'SUV',
    ('Suzuki', 'GRAND VITARA'): 'SUV', ('Suzuki', 'VITARA'): 'SUV',
    ('Suzuki', 'FORENZA'): 'Sedan', ('Suzuki', 'SX4'): 'Sedan',
    ('Fiat', '500'): 'Sedan',
    ('Mini', 'COOPER'): 'Sedan',
    ('Geo', 'METRO'): 'Sedan', ('Geo', 'PRIZM'): 'Sedan',
    ('Chrysler', 'TOWN AND COUNTRY'): 'Van',
    ('Dodge', 'DAKOTA'): 'Pickup', ('Dodge', 'NITRO'): 'SUV',
    ('Chevrolet', 'TRAILBLAZER'): 'SUV', ('Chevrolet', 'S-10 PICKUP'): 'Pickup',
    ('Chevrolet', 'UPLANDER'): 'Van', ('Chevrolet', 'VENTURE'): 'Van',
    ('Chevrolet', 'AVALANCHE'): 'Pickup', ('Chevrolet', 'ASTRO VAN'): 'Van',
    ('Chevrolet', 'GMT-400'): 'Pickup', ('Chevrolet', 'C/K PICKUP'): 'Pickup',
    ('Chevrolet', 'TRACKER'): 'SUV',
    ('Ford', 'WINDSTAR'): 'Van', ('Ford', 'FREESTAR'): 'Van',
    ('Ford', 'EXCURSION'): 'SUV', ('Ford', 'FREESTYLE'): 'SUV',
    ('Ford', 'FLEX'): 'SUV', ('Ford', 'ESCORT'): 'Sedan',
    ('Ford', 'TRANSIT CONNECT'): 'Van',
    ('Ford', 'E-150'): 'Van', ('Ford', 'E-250'): 'Van', ('Ford', 'E-350'): 'Van',
    ('GMC', 'ENVOY'): 'SUV', ('GMC', 'JIMMY'): 'SUV',
    ('GMC', 'SONOMA'): 'Pickup',
    ('Jeep', 'LIBERTY'): 'SUV', ('Jeep', 'PATRIOT'): 'SUV',
    ('Jeep', 'COMMANDER'): 'SUV',
    ('Pontiac', 'VIBE'): 'Sedan', ('Pontiac', 'AZTEK'): 'SUV',
    ('Pontiac', 'MONTANA'): 'Van', ('Pontiac', 'TORRENT'): 'SUV',
    ('Saturn', 'VUE'): 'SUV', ('Saturn', 'OUTLOOK'): 'SUV',
    ('Saturn', 'RELAY'): 'Van',
    ('Oldsmobile', 'SILHOUETTE'): 'Van', ('Oldsmobile', 'BRAVADA'): 'SUV',
    ('Toyota', 'LAND CRUISER'): 'SUV', ('Toyota', 'FJ CRUISER'): 'SUV',
    ('Honda', 'ELEMENT'): 'SUV', ('Honda', 'RIDGELINE'): 'Pickup',
    ('Nissan', 'NV200'): 'Van', ('Nissan', 'PICKUP'): 'Pickup',
    ('Hyundai', 'SANTA FE SPORT'): 'SUV', ('Hyundai', 'ENTOURAGE'): 'Van',
    ('Kia', 'BORREGO'): 'SUV',
    ('Ram', 'PROMASTER CITY'): 'Van',
    ('Dodge', 'CARAVAN'): 'Van',
    ('Mercedes-Benz', 'S-CLASS'): 'Sedan', ('Mercedes-Benz', 'CLA-CLASS'): 'Sedan',
    ('Mercedes-Benz', 'GL-CLASS'): 'SUV', ('Mercedes-Benz', 'ML-CLASS'): 'SUV',
    ('Mercedes-Benz', 'GLK-CLASS'): 'SUV', ('Mercedes-Benz', 'M-CLASS'): 'SUV',
    ('Lexus', 'GS'): 'Sedan', ('Lexus', 'LS'): 'Sedan',
    ('Lexus', 'GX'): 'SUV', ('Lexus', 'LX'): 'SUV',

    # Sports cars
    ('Chevrolet', 'CAMARO'): 'Sports Car', ('Ford', 'MUSTANG'): 'Sports Car',
    ('Dodge', 'CHALLENGER'): 'Sports Car', ('Nissan', '370Z'): 'Sports Car',
    ('Chevrolet', 'CORVETTE'): 'Sports Car', ('Ford', 'GT'): 'Sports Car',
    ('BMW', 'M3'): 'Sports Car', ('BMW', 'M4'): 'Sports Car',

    # SUVs/Crossovers
    ('Chevrolet', 'EQUINOX'): 'SUV', ('Chevrolet', 'TRAVERSE'): 'SUV',
    ('Chevrolet', 'TAHOE'): 'SUV', ('Chevrolet', 'SUBURBAN'): 'SUV',
    ('Chevrolet', 'TRAX'): 'SUV', ('Chevrolet', 'BLAZER'): 'SUV',
    ('Ford', 'ESCAPE'): 'SUV', ('Ford', 'EXPLORER'): 'SUV',
    ('Ford', 'EXPEDITION'): 'SUV', ('Ford', 'EDGE'): 'SUV',
    ('Ford', 'ECOSPORT'): 'SUV', ('Ford', 'BRONCO'): 'SUV',
    ('Toyota', 'RAV4'): 'SUV', ('Toyota', 'HIGHLANDER'): 'SUV',
    ('Toyota', '4RUNNER'): 'SUV', ('Toyota', 'C-HR'): 'SUV',
    ('Toyota', 'SEQUOIA'): 'SUV', ('Toyota', 'VENZA'): 'SUV',
    ('Honda', 'CR-V'): 'SUV', ('Honda', 'PILOT'): 'SUV',
    ('Honda', 'HR-V'): 'SUV', ('Honda', 'PASSPORT'): 'SUV',
    ('Nissan', 'ROGUE'): 'SUV', ('Nissan', 'PATHFINDER'): 'SUV',
    ('Nissan', 'MURANO'): 'SUV', ('Nissan', 'KICKS'): 'SUV',
    ('Nissan', 'ARMADA'): 'SUV',
    ('Hyundai', 'TUCSON'): 'SUV', ('Hyundai', 'SANTA FE'): 'SUV',
    ('Hyundai', 'KONA'): 'SUV', ('Hyundai', 'PALISADE'): 'SUV',
    ('Kia', 'SORENTO'): 'SUV', ('Kia', 'SPORTAGE'): 'SUV',
    ('Kia', 'SELTOS'): 'SUV', ('Kia', 'TELLURIDE'): 'SUV',
    ('Dodge', 'DURANGO'): 'SUV', ('Dodge', 'JOURNEY'): 'SUV',
    ('Jeep', 'GRAND CHEROKEE'): 'SUV', ('Jeep', 'CHEROKEE'): 'SUV',
    ('Jeep', 'WRANGLER'): 'SUV', ('Jeep', 'COMPASS'): 'SUV',
    ('Jeep', 'RENEGADE'): 'SUV',
    ('GMC', 'TERRAIN'): 'SUV', ('GMC', 'ACADIA'): 'SUV',
    ('GMC', 'YUKON'): 'SUV',
    ('Subaru', 'OUTBACK'): 'SUV', ('Subaru', 'FORESTER'): 'SUV',
    ('Subaru', 'CROSSTREK'): 'SUV', ('Subaru', 'ASCENT'): 'SUV',
    ('Volkswagen', 'TIGUAN'): 'SUV', ('Volkswagen', 'ATLAS'): 'SUV',
    ('Mazda', 'CX-5'): 'SUV', ('Mazda', 'CX-9'): 'SUV', ('Mazda', 'CX-3'): 'SUV',
    ('Mitsubishi', 'OUTLANDER'): 'SUV', ('Mitsubishi', 'ECLIPSE CROSS'): 'SUV',
    ('Buick', 'ENCORE'): 'SUV', ('Buick', 'ENCLAVE'): 'SUV', ('Buick', 'ENVISION'): 'SUV',
    ('BMW', 'X3'): 'SUV', ('BMW', 'X5'): 'SUV',
    ('Mercedes-Benz', 'GLE-CLASS'): 'SUV', ('Mercedes-Benz', 'GLC-CLASS'): 'SUV',
    ('Lexus', 'RX'): 'SUV', ('Lexus', 'NX'): 'SUV',
    ('Acura', 'RDX'): 'SUV', ('Acura', 'MDX'): 'SUV',
    ('Infiniti', 'QX60'): 'SUV', ('Infiniti', 'QX80'): 'SUV',
    ('Audi', 'Q5'): 'SUV', ('Audi', 'Q7'): 'SUV',
    ('Cadillac', 'ESCALADE'): 'SUV', ('Cadillac', 'XT5'): 'SUV',
    ('Volvo', 'XC90'): 'SUV', ('Volvo', 'XC60'): 'SUV',
    ('Land Rover', 'RANGE ROVER'): 'SUV', ('Land Rover', 'DISCOVERY'): 'SUV',
    ('Tesla', 'MODEL X'): 'SUV', ('Tesla', 'MODEL Y'): 'SUV',
    ('Lincoln', 'NAVIGATOR'): 'SUV', ('Lincoln', 'MKC'): 'SUV', ('Lincoln', 'AVIATOR'): 'SUV',
    ('Porsche', 'CAYENNE'): 'SUV', ('Porsche', 'MACAN'): 'SUV',
    ('Toyota', '4-RUNNER'): 'SUV',  # FARS uses hyphenated name

    # Pickups
    ('Ford', 'F-150'): 'Pickup', ('Ford', 'F-250'): 'Pickup', ('Ford', 'F-350'): 'Pickup',
    ('Ford', 'RANGER'): 'Pickup',
    ('Chevrolet', 'SILVERADO 1500'): 'Pickup', ('Chevrolet', 'SILVERADO 2500'): 'Pickup',
    ('Chevrolet', 'SILVERADO 3500'): 'Pickup', ('Chevrolet', 'COLORADO'): 'Pickup',
    ('Ram', '1500'): 'Pickup', ('Ram', '2500'): 'Pickup', ('Ram', '3500'): 'Pickup',
    ('Chevrolet', 'SILVERADO'): 'Pickup',  # generic FARS name
    ('GMC', 'SIERRA'): 'Pickup',  # generic FARS name
    ('Dodge', 'RAM'): 'Pickup',  # older FARS entries
    ('GMC', 'SIERRA 1500'): 'Pickup', ('GMC', 'SIERRA 2500'): 'Pickup',
    ('GMC', 'SIERRA 3500'): 'Pickup', ('GMC', 'CANYON'): 'Pickup',
    ('Toyota', 'TACOMA'): 'Pickup', ('Toyota', 'TUNDRA'): 'Pickup',
    ('Nissan', 'FRONTIER'): 'Pickup', ('Nissan', 'TITAN'): 'Pickup',

    # Vans/Minivans
    ('Honda', 'ODYSSEY'): 'Van', ('Toyota', 'SIENNA'): 'Van',
    ('Chrysler', 'PACIFICA'): 'Van', ('Chrysler', 'TOWN & COUNTRY'): 'Van',
    ('Dodge', 'GRAND CARAVAN'): 'Van', ('Kia', 'SEDONA'): 'Van',
    ('Kia', 'CARNIVAL'): 'Van',
    ('Dodge', 'CARAVAN/GRAND CARAVAN'): 'Van',
    ('Ford', 'TRANSIT'): 'Van', ('Chevrolet', 'EXPRESS'): 'Van',
    ('GMC', 'SAVANA'): 'Van', ('Ram', 'PROMASTER'): 'Van',
    ('Mercedes-Benz', 'SPRINTER'): 'Van', ('Nissan', 'NV'): 'Van',
}

# Average US annual sales (approximate, based on publicly reported industry data)
# Used as proxy for fleet size estimation
# Source: publicly reported annual sales figures, averaged ~2018-2023
SALES_DATA = {
    ('Ford', 'F-150'): 750000,
    ('Chevrolet', 'SILVERADO 1500'): 530000,
    ('Ram', '1500'): 480000,
    ('Toyota', 'RAV4'): 430000,
    ('Honda', 'CR-V'): 360000,
    ('Toyota', 'CAMRY'): 310000,
    ('Honda', 'CIVIC'): 290000,
    ('Chevrolet', 'EQUINOX'): 270000,
    ('Toyota', 'COROLLA'): 265000,
    ('Nissan', 'ROGUE'): 250000,
    ('Toyota', 'HIGHLANDER'): 240000,
    ('Honda', 'ACCORD'): 230000,
    ('Ford', 'EXPLORER'): 225000,
    ('Ford', 'ESCAPE'): 220000,
    ('Jeep', 'GRAND CHEROKEE'): 210000,
    ('Jeep', 'WRANGLER'): 200000,
    ('Toyota', 'TACOMA'): 240000,
    ('Hyundai', 'TUCSON'): 180000,
    ('Chevrolet', 'MALIBU'): 170000,
    ('Nissan', 'ALTIMA'): 165000,
    ('Hyundai', 'ELANTRA'): 160000,
    ('Honda', 'PILOT'): 160000,
    ('Kia', 'FORTE'): 150000,
    ('Kia', 'SORENTO'): 130000,
    ('Subaru', 'OUTBACK'): 145000,
    ('Subaru', 'FORESTER'): 140000,
    ('Ford', 'FUSION'): 175000,
    ('GMC', 'SIERRA 1500'): 200000,
    ('Chevrolet', 'TRAVERSE'): 120000,
    ('Nissan', 'SENTRA'): 120000,
    ('Hyundai', 'SONATA'): 120000,
    ('Kia', 'OPTIMA'): 105000,
    ('Toyota', 'TUNDRA'): 110000,
    ('Toyota', '4RUNNER'): 130000,
    ('Nissan', 'PATHFINDER'): 70000,
    ('Chevrolet', 'TAHOE'): 95000,
    ('Honda', 'HR-V'): 100000,
    ('Jeep', 'CHEROKEE'): 120000,
    ('Jeep', 'COMPASS'): 100000,
    ('Dodge', 'CHARGER'): 95000,
    ('Dodge', 'CHALLENGER'): 55000,
    ('GMC', 'TERRAIN'): 90000,
    ('GMC', 'ACADIA'): 60000,
    ('Ford', 'MUSTANG'): 65000,
    ('Chevrolet', 'CAMARO'): 50000,
    ('Chevrolet', 'IMPALA'): 75000,
    ('Chevrolet', 'CRUZE'): 100000,
    ('Chevrolet', 'TRAX'): 80000,
    ('Nissan', 'VERSA'): 80000,
    ('Nissan', 'MURANO'): 65000,
    ('Hyundai', 'SANTA FE'): 130000,
    ('Hyundai', 'ACCENT'): 45000,
    ('Kia', 'SPORTAGE'): 90000,
    ('Kia', 'SOUL'): 85000,
    ('Ford', 'EDGE'): 100000,
    ('Ford', 'F-250'): 180000,
    ('Ford', 'F-350'): 90000,
    ('Chevrolet', 'SILVERADO 2500'): 80000,
    ('Chevrolet', 'SILVERADO 3500'): 40000,
    ('Ram', '2500'): 100000,
    ('Ram', '3500'): 50000,
    ('GMC', 'SIERRA 2500'): 55000,
    ('GMC', 'SIERRA 3500'): 28000,
    ('Chevrolet', 'COLORADO'): 105000,
    ('Ford', 'RANGER'): 90000,
    ('GMC', 'CANYON'): 30000,
    ('Nissan', 'FRONTIER'): 60000,
    ('Dodge', 'JOURNEY'): 70000,
    ('Dodge', 'DURANGO'): 60000,
    ('Jeep', 'RENEGADE'): 60000,
    ('Chrysler', '300'): 40000,
    ('Chrysler', 'PACIFICA'): 80000,
    ('Dodge', 'GRAND CARAVAN'): 130000,
    ('Honda', 'ODYSSEY'): 90000,
    ('Toyota', 'SIENNA'): 85000,
    ('Subaru', 'CROSSTREK'): 100000,
    ('Subaru', 'IMPREZA'): 55000,
    ('Volkswagen', 'JETTA'): 80000,
    ('Volkswagen', 'TIGUAN'): 85000,
    ('Mazda', 'CX-5'): 120000,
    ('Mitsubishi', 'OUTLANDER'): 45000,
    ('Buick', 'ENCORE'): 60000,
    ('Buick', 'ENCLAVE'): 35000,
    ('BMW', 'X3'): 50000,
    ('BMW', 'X5'): 45000,
    ('BMW', '3 SERIES'): 45000,
    ('Chevrolet', 'SUBURBAN'): 40000,
    ('GMC', 'YUKON'): 40000,
    ('Ford', 'EXPEDITION'): 60000,
    ('Chevrolet', 'SPARK'): 40000,
    ('Chevrolet', 'SONIC'): 35000,
    ('Chevrolet', 'BLAZER'): 60000,
    ('Tesla', 'MODEL 3'): 180000,
    ('Tesla', 'MODEL Y'): 200000,
    ('Tesla', 'MODEL S'): 20000,
    ('Tesla', 'MODEL X'): 18000,
    ('Ford', 'FOCUS'): 120000,
    ('Mazda', 'CX-9'): 35000,
    ('Mazda', 'MAZDA3'): 30000,
    ('Volkswagen', 'ATLAS'): 40000,
    ('Volkswagen', 'PASSAT'): 30000,
    ('Cadillac', 'ESCALADE'): 30000,
    ('Subaru', 'LEGACY'): 30000,
    ('Subaru', 'ASCENT'): 50000,
    ('Lincoln', 'NAVIGATOR'): 18000,
    ('Toyota', 'PRIUS'): 90000,
    ('Nissan', 'MAXIMA'): 30000,
    ('Nissan', 'ARMADA'): 30000,
    ('Nissan', 'KICKS'): 45000,
    ('Nissan', 'TITAN'): 35000,
    ('Hyundai', 'KONA'): 55000,
    ('Kia', 'SELTOS'): 50000,
    ('Kia', 'RIO'): 25000,
    ('Ford', 'ECOSPORT'): 55000,
    ('Ford', 'BRONCO'): 50000,
    ('Mitsubishi', 'MIRAGE'): 20000,
    ('Pontiac', 'G6'): 55000,  # discontinued 2010
    ('Saturn', 'VUE'): 40000,  # discontinued 2010

    # Generic model names (FARS sometimes reports without trim/variant)
    ('Chevrolet', 'SILVERADO'): 650000,  # sum of 1500/2500/3500, mostly 1500
    ('GMC', 'SIERRA'): 280000,  # sum of 1500/2500/3500
    ('Dodge', 'RAM'): 480000,  # older FARS entries before Ram was separate make
    ('Toyota', '4-RUNNER'): 130000,  # FARS uses hyphenated name

    # Discontinued but still on roads with significant fatalities
    ('Ford', 'TAURUS'): 80000,  # discontinued 2019, still large fleet
    ('Chevrolet', 'COBALT'): 30000,  # discontinued 2010
    ('Toyota', 'AVALON'): 35000,
    ('Chevrolet', 'CORVETTE'): 30000,
    ('Mercedes-Benz', 'C-CLASS'): 50000,
    ('Honda', 'FIT'): 40000,
    ('Ford', 'FIESTA'): 50000,
    ('Toyota', 'YARIS'): 25000,
    ('Mazda', 'MAZDA6'): 20000,
    ('Mercedes-Benz', 'E-CLASS'): 35000,
    ('Acura', 'MDX'): 50000,
    ('Lexus', 'ES'): 35000,
    ('Lexus', 'IS'): 25000,
    ('Lexus', 'RX'): 70000,
    ('Infiniti', 'Q50'): 25000,
    ('Lincoln', 'MKZ'): 25000,
    ('Mitsubishi', 'LANCER'): 15000,  # discontinued 2017
    ('Toyota', 'SEQUOIA'): 15000,
    ('Ford', 'TRANSIT'): 120000,
    ('Chevrolet', 'EXPRESS'): 50000,
    ('Dodge', 'CARAVAN/GRAND CARAVAN'): 130000,
    ('Kia', 'SEDONA'): 25000,
    ('GMC', 'SAVANA'): 30000,
    ('Subaru', 'WRX'): 30000,
    ('Acura', 'RDX'): 50000,
    ('Audi', 'A4'): 35000,
    ('Audi', 'A6'): 20000,
    ('Nissan', 'MAXIMA'): 30000,  # already present but ensuring match
    ('Cadillac', 'CTS'): 20000,

    # Discontinued models with significant on-road fleet
    ('Mercury', 'GRAND MARQUIS'): 50000,  # discontinued 2011
    ('Ford', 'CROWN VICTORIA'): 60000,  # discontinued 2011, huge fleet (police + taxi)
    ('Buick', 'LESABRE'): 50000,  # discontinued 2005
    ('Buick', 'CENTURY'): 35000,  # discontinued 2005
    ('Buick', 'LUCERNE'): 25000,  # discontinued 2011
    ('Buick', 'PARK AVENUE'): 20000,  # discontinued 2005
    ('Pontiac', 'GRAND AM'): 60000,  # discontinued 2005
    ('Pontiac', 'GRAND PRIX'): 45000,  # discontinued 2008
    ('Pontiac', 'BONNEVILLE'): 25000,  # discontinued 2005
    ('Pontiac', 'SUNFIRE'): 30000,  # discontinued 2005
    ('Saturn', 'ION'): 30000,  # discontinued 2007
    ('Saturn', 'L SERIES'): 15000,  # discontinued 2004
    ('Saturn', 'S SERIES'): 20000,  # discontinued 2002
    ('Oldsmobile', 'ALERO'): 30000,  # discontinued 2004
    ('Mercury', 'SABLE'): 30000,  # discontinued 2009
    ('Mercury', 'MOUNTAINEER'): 20000,  # discontinued 2010
    ('Chrysler', 'SEBRING'): 40000,  # discontinued 2010
    ('Chrysler', 'PT CRUISER'): 50000,  # discontinued 2010
    ('Chrysler', '200'): 65000,  # discontinued 2017
    ('Chrysler', 'TOWN AND COUNTRY'): 100000,  # discontinued 2016
    ('Dodge', 'STRATUS'): 40000,  # discontinued 2006
    ('Dodge', 'NEON'): 40000,  # discontinued 2005
    ('Dodge', 'AVENGER'): 50000,  # discontinued 2014
    ('Dodge', 'DART'): 50000,  # discontinued 2016
    ('Dodge', 'INTREPID'): 30000,  # discontinued 2004
    ('Dodge', 'MAGNUM'): 20000,  # discontinued 2008
    ('Dodge', 'CALIBER'): 40000,  # discontinued 2012
    ('Dodge', 'DAKOTA'): 40000,  # discontinued 2011
    ('Dodge', 'NITRO'): 20000,  # discontinued 2011
    ('Ford', 'FIVE HUNDRED'): 15000,  # 2005-2007 only
    ('Chevrolet', 'CAVALIER'): 50000,  # discontinued 2005
    ('Chevrolet', 'MONTE CARLO'): 25000,  # discontinued 2007
    ('Chevrolet', 'AVEO'): 20000,  # discontinued 2011
    ('Chevrolet', 'HHR'): 25000,  # discontinued 2011
    ('Chevrolet', 'TRAILBLAZER'): 80000,  # discontinued 2009 (old), revived 2021
    ('Chevrolet', 'S-10 PICKUP'): 25000,  # discontinued 2004
    ('Chevrolet', 'VENTURE'): 15000,  # discontinued 2005
    ('Ford', 'WINDSTAR'): 25000,  # discontinued 2003
    ('Ford', 'EXCURSION'): 10000,  # discontinued 2005
    ('Ford', 'FLEX'): 20000,  # discontinued 2019
    ('GMC', 'ENVOY'): 40000,  # discontinued 2009
    ('Jeep', 'LIBERTY'): 60000,  # discontinued 2012
    ('Jeep', 'PATRIOT'): 40000,  # discontinued 2017
    ('Jeep', 'COMMANDER'): 15000,  # discontinued 2010
    ('Pontiac', 'VIBE'): 25000,  # discontinued 2010
    ('Toyota', 'MATRIX'): 25000,  # discontinued 2013
    ('Toyota', 'SOLARA'): 15000,  # discontinued 2008
    ('Toyota', 'FJ CRUISER'): 20000,  # discontinued 2014
    ('Honda', 'ELEMENT'): 20000,  # discontinued 2011
    ('Honda', 'RIDGELINE'): 30000,
    ('Nissan', 'XTERRA'): 30000,  # discontinued 2015
    ('Nissan', 'QUEST'): 15000,  # discontinued 2017
    ('Mazda', 'MX-5'): 8000,
    ('Mazda', 'TRIBUTE'): 20000,  # discontinued 2011
    ('Volkswagen', 'GOLF'): 30000,
    ('Volkswagen', 'BEETLE'): 15000,  # discontinued 2019
    ('Scion', 'TC'): 15000,  # discontinued 2016
    ('Scion', 'XB'): 10000,  # discontinued 2015
    ('Lincoln', 'TOWN CAR'): 30000,  # discontinued 2011
    ('Lincoln', 'MKX'): 25000,  # discontinued 2018 (now Nautilus)
    ('Cadillac', 'DEVILLE'): 30000,  # discontinued 2005
    ('Cadillac', 'SRX'): 30000,  # discontinued 2016 (now XT5)
    ('Cadillac', 'XTS'): 20000,  # discontinued 2019
    ('Acura', 'TL'): 30000,  # discontinued 2014
    ('Infiniti', 'G35'): 25000,  # discontinued 2008
    ('Infiniti', 'G37'): 25000,  # discontinued 2013
    ('Infiniti', 'QX56'): 15000,  # now QX80
    ('Mercury', 'MARINER'): 20000,  # discontinued 2011
    ('Mercury', 'MILAN'): 20000,  # discontinued 2011
    ('Mitsubishi', 'GALANT'): 15000,  # discontinued 2012
    ('Mitsubishi', 'ECLIPSE'): 15000,  # discontinued 2012 (car; Eclipse Cross is different)
    ('Hyundai', 'TIBURON'): 10000,  # discontinued 2008
    ('Saturn', 'AURA'): 15000,  # discontinued 2009
    ('Saturn', 'OUTLOOK'): 15000,  # discontinued 2010
    ('Kia', 'SPECTRA'): 15000,  # discontinued 2009
    ('Dodge', 'CARAVAN'): 50000,  # some FARS entries without "GRAND"
    ('Isuzu', 'RODEO'): 15000,  # discontinued 2004
    ('Suzuki', 'GRAND VITARA'): 10000,  # discontinued 2013
    ('Oldsmobile', 'INTRIGUE'): 15000,  # discontinued 2002
    ('Acura', 'TSX'): 20000,  # discontinued 2014
    ('Hyundai', 'SANTA FE SPORT'): 80000,  # now just Santa Fe
    ('Volvo', 'XC70'): 10000,  # discontinued 2016
    ('BMW', '5 SERIES'): 40000,
    ('Cadillac', 'STS'): 10000,  # discontinued 2011
    ('Fiat', '500'): 15000,  # discontinued 2019
    ('Mini', 'COOPER'): 20000,
    ('Mazda', 'CX-30'): 40000,
    ('Volkswagen', 'CC'): 10000,  # discontinued 2017
    ('Volkswagen', 'TOUAREG'): 10000,  # discontinued 2017 in US
    ('Acura', 'TLX'): 30000,
    ('Acura', 'ILX'): 15000,
    ('Hyundai', 'PALISADE'): 60000,
    ('Kia', 'TELLURIDE'): 70000,
    ('Lexus', 'NX'): 50000,
    ('Lexus', 'GS'): 15000,  # discontinued 2020
    ('Lexus', 'LS'): 8000,
    ('Lexus', 'GX'): 30000,
    ('Lexus', 'LX'): 5000,
    ('Mercedes-Benz', 'S-CLASS'): 15000, ('Mercedes-Benz', 'M-CLASS'): 35000,
    ('Mercedes-Benz', 'CLA-CLASS'): 20000,
    ('Mercedes-Benz', 'GL-CLASS'): 30000,  # now GLS
    ('Mercedes-Benz', 'ML-CLASS'): 35000,  # now GLE
    ('Mercedes-Benz', 'GLK-CLASS'): 20000,  # now GLC
    ('BMW', '7 SERIES'): 10000,
    ('BMW', 'Z3'): 5000,  # discontinued 2002
    ('BMW', 'Z4'): 5000,
    ('BMW', 'M5'): 5000,
    ('BMW', 'X1'): 30000,
    ('Infiniti', 'FX35'): 20000,  # now QX70
    ('Audi', 'Q5'): 40000,
    ('Audi', 'Q7'): 25000,
    ('Audi', 'A3'): 15000,
    ('Ford', 'BRONCO'): 50000,
    ('Chevrolet', 'BLAZER'): 60000,
    ('Kia', 'K5'): 30000,
    ('Hyundai', 'VENUE'): 20000,
    ('Chevrolet', 'MONTE CARLO'): 25000,  # discontinued 2007
    ('Ford', 'FREESTAR'): 15000,  # discontinued 2007
    ('Pontiac', 'AZTEK'): 10000,  # discontinued 2005
    ('Pontiac', 'TORRENT'): 15000,  # discontinued 2009
    ('Pontiac', 'MONTANA'): 15000,  # discontinued 2006 (US)
    ('Oldsmobile', 'BRAVADA'): 15000,  # discontinued 2004
    ('Saturn', 'RELAY'): 10000,  # discontinued 2007
    ('Chevrolet', 'UPLANDER'): 15000,  # discontinued 2008
    ('GMC', 'SONOMA'): 15000,  # discontinued 2004
    ('GMC', 'JIMMY'): 15000,  # discontinued 2005
    ('Jeep', 'COMMANDER'): 15000,  # discontinued 2010
    ('Buick', 'RENDEZVOUS'): 20000,  # discontinued 2007
    ('Toyota', 'LAND CRUISER'): 5000,
    ('Honda', 'ELEMENT'): 20000,  # discontinued 2011
    ('Nissan', 'JUKE'): 15000,  # discontinued 2017
    ('Nissan', 'NV'): 15000,
    ('Nissan', 'NV200'): 10000,
    ('Dodge', 'MAGNUM'): 20000,  # discontinued 2008
    ('Ford', 'FLEX'): 20000,  # discontinued 2019
    ('Ford', 'EXCURSION'): 10000,  # discontinued 2005
    ('Ford', 'FREESTYLE'): 10000,  # discontinued 2007
    ('Ford', 'WINDSTAR'): 25000,  # discontinued 2003
    ('Mazda', 'TRIBUTE'): 20000,  # discontinued 2011
    ('Mazda', 'PROTEGE'): 15000,  # discontinued 2003
    ('Mazda', 'MPV'): 10000,  # discontinued 2006
    ('Scion', 'XD'): 8000,  # discontinued 2014
    ('Volvo', 'S60'): 15000,
    ('Volvo', 'S40'): 10000,  # discontinued 2011
    ('Volvo', 'S80'): 8000,  # discontinued 2016
    ('Volvo', 'V70'): 8000,  # discontinued 2010
    ('Jaguar', 'X-TYPE'): 8000,  # discontinued 2009
    ('Jaguar', 'S-TYPE'): 8000,  # discontinued 2008
    ('Jaguar', 'XF'): 10000,
    ('Land Rover', 'RANGE ROVER SPORT'): 15000,
    ('Land Rover', 'LR3'): 10000,  # now Discovery
    ('Porsche', '911'): 10000,
    ('Porsche', 'BOXSTER'): 3000,
    ('Porsche', 'CAYENNE'): 15000,
    ('Porsche', 'MACAN'): 20000,
    ('Lincoln', 'CONTINENTAL'): 5000,  # discontinued 2020
    ('Lincoln', 'LS'): 10000,  # discontinued 2006
    ('Lincoln', 'AVIATOR'): 15000,
    ('Cadillac', 'ATS'): 15000,  # discontinued 2019
    ('Cadillac', 'XT5'): 30000,
    ('Isuzu', 'RODEO'): 15000,  # discontinued 2004
    ('Suzuki', 'GRAND VITARA'): 10000,  # discontinued 2013
    ('Mitsubishi', 'ENDEAVOR'): 10000,  # discontinued 2011
    ('Mitsubishi', 'MONTERO'): 8000,  # discontinued 2006
    ('Chrysler', 'CONCORDE'): 15000,  # discontinued 2004
    ('Dodge', 'AVENGER'): 50000,  # discontinued 2014
    ('Dodge', 'DART'): 50000,  # discontinued 2016
    ('Saturn', 'S SERIES'): 20000,  # discontinued 2002
    ('Saturn', 'L SERIES'): 15000,  # discontinued 2004
    ('Subaru', 'TRIBECA'): 10000,  # discontinued 2014
    ('Hyundai', 'GENESIS'): 10000,
    ('Hyundai', 'XG350'): 5000,  # discontinued 2005
    ('Kia', 'AMANTI'): 5000,  # discontinued 2009
    ('Buick', 'LACROSSE'): 40000,  # discontinued 2019
    ('Buick', 'REGAL'): 15000,  # discontinued 2020
    ('Buick', 'VERANO'): 15000,  # discontinued 2017
    ('Buick', 'ENVISION'): 25000,
    ('Chevrolet', 'AVALANCHE'): 35000,  # discontinued 2013
    ('Nissan', '350Z'): 10000,  # discontinued 2009
    ('Nissan', '370Z'): 5000,  # discontinued 2020
    ('Cadillac', 'DTS'): 20000,  # discontinued 2011
    ('Acura', 'INTEGRA'): 20000,  # discontinued 2001, revived 2023
    ('Acura', 'RSX'): 15000,  # discontinued 2006
    ('Hyundai', 'VELOSTER'): 10000,  # discontinued 2021
    ('Chevrolet', 'ASTRO VAN'): 15000,  # discontinued 2005
    ('Chevrolet', 'AVALANCHE'): 35000,  # discontinued 2013
    ('Chevrolet', 'GMT-400'): 30000,  # FARS platform code for C/K pickups
    ('Chevrolet', 'C/K PICKUP'): 30000,  # older FARS name
    ('Chevrolet', 'TRACKER'): 10000,  # discontinued 2004
    ('Mazda', 'MAZDA5'): 10000,  # discontinued 2015
    ('Mitsubishi', 'OUTLANDER SPORT'): 30000,  # now just Outlander
    ('Honda', 'PASSPORT'): 30000,
    ('Honda', 'INSIGHT'): 10000,
    ('Toyota', 'VENZA'): 20000,
    ('Toyota', 'C-HR'): 25000,
    ('Toyota', 'TERCEL'): 10000,  # discontinued 1999
    ('Toyota', 'ECHO'): 10000,  # discontinued 2005
    ('Toyota', 'PICK-UP'): 15000,  # old FARS name for pre-Tacoma pickups
    ('Toyota', 'TC'): 15000,  # Scion tC reported under Toyota in FARS
    ('Toyota', 'XB'): 10000,  # Scion xB reported under Toyota
    ('Toyota', 'XD'): 8000,  # Scion xD reported under Toyota
    ('Toyota', 'XA'): 8000,  # Scion xA reported under Toyota
    ('Toyota', 'CELICA'): 15000,  # discontinued 2005
    ('Ford', 'CONTOUR'): 15000,  # discontinued 2000
    ('Ford', 'ESCORT'): 30000,  # discontinued 2003
    ('Ford', 'TRANSIT CONNECT'): 25000,
    ('Ford', 'E-150'): 20000,  # discontinued 2014
    ('Ford', 'E-250'): 25000,  # discontinued 2014
    ('Ford', 'E-350'): 30000,  # discontinued 2014
    ('Ford', 'FIVE HUNDRED'): 15000,  # 2005-2007
    ('Chevrolet', 'LUMINA'): 15000,  # discontinued 2001
    ('Chevrolet', 'PRIZM'): 10000,  # discontinued 2002
    ('Dodge', 'INTREPID'): 30000,  # discontinued 2004
    ('Chrysler', 'TOWN AND COUNTRY'): 100000,
    ('Nissan', 'QUEST'): 15000,  # discontinued 2017
    ('Nissan', 'PICKUP'): 15000,  # old FARS name for pre-Frontier pickups
    ('Mazda', 'B-SERIES'): 10000,  # discontinued 2009
    ('Mini', 'COOPER'): 20000,
    ('Fiat', '500'): 15000,  # discontinued 2019
}

# Average annual miles by vehicle class (NHTS data)
CLASS_ANNUAL_MILES = {
    'Sedan': 11500,
    'Sports Car': 8000,
    'SUV': 12500,
    'Pickup': 13500,
    'Van': 11800,
}

# Average vehicle age on road: ~12.5 years
# Survival curve discount: roughly 70% of cumulative sales still on road
AVG_FLEET_MULTIPLIER = 12.5 * 0.70  # ~8.75 years of equivalent full fleet


def download_fars_zip(year):
    """Download FARS ZIP for a given year, caching locally."""
    os.makedirs(CACHE_DIR, exist_ok=True)
    cache_path = os.path.join(CACHE_DIR, f'FARS{year}.zip')
    if os.path.exists(cache_path):
        print(f'  Using cached {cache_path}', file=sys.stderr)
        return cache_path

    url = f'https://static.nhtsa.gov/nhtsa/downloads/FARS/{year}/National/FARS{year}NationalCSV.zip'
    print(f'  Downloading {url} ...', file=sys.stderr)
    try:
        urllib.request.urlretrieve(url, cache_path)
        print(f'  Saved to {cache_path}', file=sys.stderr)
        return cache_path
    except Exception as e:
        print(f'  ERROR downloading {year}: {e}', file=sys.stderr)
        return None


def normalize_model(model_str):
    """Normalize a model name by collapsing trim variants."""
    if not model_str:
        return None
    model = model_str.strip().upper()
    # Check collapse map
    if model in MODEL_COLLAPSE:
        return MODEL_COLLAPSE[model]
    # Try prefix matching for remaining trim suffixes
    for collapsed_key, collapsed_val in MODEL_COLLAPSE.items():
        if model.startswith(collapsed_val + ' '):
            return collapsed_val
    return model


def normalize_make(make_str):
    """Normalize make name to title case."""
    if not make_str:
        return None
    make = make_str.strip().upper()
    return MAKE_NORMALIZE.get(make, make.title())


def parse_vehicle_csv(zip_path, year):
    """Parse vehicle.csv from a FARS ZIP, return list of (make, model, body_typ, deaths)."""
    results = []
    with zipfile.ZipFile(zip_path, 'r') as zf:
        # Find vehicle.csv (case-insensitive)
        vehicle_files = [n for n in zf.namelist() if n.lower().endswith('vehicle.csv')]
        if not vehicle_files:
            print(f'  WARNING: No vehicle.csv found in {zip_path}', file=sys.stderr)
            return results

        vehicle_file = vehicle_files[0]
        print(f'  Parsing {vehicle_file} from {year}...', file=sys.stderr)

        with zf.open(vehicle_file) as f:
            reader = csv.DictReader(io.TextIOWrapper(f, encoding='utf-8-sig'))
            fields = reader.fieldnames
            print(f'    Fields: {fields[:10]}...', file=sys.stderr)

            # Determine which columns to use
            make_col = None
            model_col = None
            for candidate in ['VPICMAKENAME', 'MAKENAME', 'MAK_MOD']:
                if candidate in fields:
                    make_col = candidate
                    break
            for candidate in ['VPICMODELNAME', 'MODELNAME', 'MAK_MOD']:
                if candidate in fields:
                    model_col = candidate
                    break

            body_col = 'BODY_TYP' if 'BODY_TYP' in fields else None
            deaths_col = 'DEATHS' if 'DEATHS' in fields else 'FATALS' if 'FATALS' in fields else None

            if not make_col or not model_col:
                print(f'    WARNING: Could not find make/model columns. Available: {fields}', file=sys.stderr)
                return results

            count = 0
            skipped_body = 0
            for row in reader:
                try:
                    body_typ = int(row.get(body_col, 0)) if body_col else 0
                except (ValueError, TypeError):
                    body_typ = 0

                if body_typ in EXCLUDED_BODY_TYPES:
                    skipped_body += 1
                    continue

                try:
                    deaths = int(row.get(deaths_col, 0)) if deaths_col else 0
                except (ValueError, TypeError):
                    deaths = 0

                make = row.get(make_col, '').strip()
                model = row.get(model_col, '').strip()

                if make and model:
                    results.append((make, model, body_typ, deaths))
                    count += 1

            print(f'    Parsed {count} vehicle records, skipped {skipped_body} non-passenger', file=sys.stderr)

    return results


def aggregate_deaths(all_records):
    """Aggregate deaths by normalized make+model across all years."""
    deaths_by_model = defaultdict(int)
    vehicle_count = defaultdict(int)  # vehicles involved in fatal crashes

    for make_raw, model_raw, body_typ, deaths in all_records:
        make = normalize_make(make_raw)
        model = normalize_model(model_raw)
        if not make or not model:
            continue

        key = (make, model)
        deaths_by_model[key] += deaths
        vehicle_count[key] += 1

    return deaths_by_model, vehicle_count


def estimate_vmt(make, model, body_class):
    """Estimate VMT for a make/model based on sales data and class-average miles."""
    key = (make, model)
    annual_sales = SALES_DATA.get(key, 0)
    if annual_sales <= 0:
        return None, None, None

    # Estimated registered vehicles = annual sales × fleet multiplier
    est_registered = int(annual_sales * AVG_FLEET_MULTIPLIER)

    # Annual miles based on body class
    annual_miles = CLASS_ANNUAL_MILES.get(body_class, 11500)

    # Total VMT over 5 years (in millions of miles)
    est_annual_vmt = est_registered * annual_miles  # miles/year
    est_5yr_vmt = est_annual_vmt * 5  # miles over 5 years

    return est_registered, est_annual_vmt, est_5yr_vmt


def get_body_class(make, model):
    """Get body class for a make/model. Uses explicit map first, then keyword heuristics."""
    # 1. Explicit map lookup
    cls = BODY_CLASS_MAP.get((make, model))
    if cls:
        return cls

    m = model.upper()

    # 2. Pickup keywords
    pickup_kw = ['PICKUP', 'F-150', 'F-250', 'F-350', 'F-450', 'F-550',
                  'SILVERADO', 'SIERRA', 'TACOMA', 'TUNDRA', 'RANGER',
                  'COLORADO', 'CANYON', 'FRONTIER', 'TITAN', 'DAKOTA',
                  'S-10', 'S10', 'SONOMA', 'RIDGELINE', 'BAJA',
                  'D-150', 'D-250', 'COMANCHE', 'LUV', 'DATSUN']
    if any(kw in m for kw in pickup_kw):
        return 'Pickup'

    # 3. Van/minivan keywords
    van_kw = ['VAN', 'CARAVAN', 'ODYSSEY', 'SIENNA', 'PACIFICA',
              'TOWN AND COUNTRY', 'TOWN & COUNTRY', 'WINDSTAR', 'FREESTAR',
              'VILLAGER', 'QUEST', 'SEDONA', 'CARNIVAL', 'VENTURE',
              'UPLANDER', 'MONTANA', 'SILHOUETTE', 'RELAY', 'TERRAZA',
              'TRANSIT', 'EXPRESS', 'SAVANA', 'PROMASTER', 'SPRINTER',
              'ENTOURAGE', 'MPV', 'PREVIA', 'ESTEEM']
    if any(kw in m for kw in van_kw):
        return 'Van'

    # 4. Sports car keywords and specific models
    sports_kw = ['MUSTANG', 'CAMARO', 'CORVETTE', 'CHALLENGER', 'VIPER',
                 'MX-5', 'MIATA', '370Z', '350Z', '300ZX', 'Z4', 'Z3',
                 'BOXSTER', 'CAYMAN', '911', 'GT-R', 'GTR',
                 'S2000', 'DEL SOL', 'RSX', 'CELICA', 'SUPRA', 'MR2',
                 'ECLIPSE', 'STEALTH', 'TC', 'TIBURON', 'GENESIS COUPE',
                 'VELOSTER', 'GTO', 'FIREBIRD', 'TRANS AM', 'SOLSTICE',
                 'SKY', 'CROSSFIRE', 'PROWLER', 'SPIDER', 'SPYDER',
                 'ROADSTER', 'ELISE', 'EXIGE', 'EVORA']
    # Scion tC specifically — avoid matching "tC" substring in other models
    if any(kw in m for kw in sports_kw):
        return 'Sports Car'

    # 5. SUV/crossover keywords
    suv_kw = ['SUV', 'EXPLORER', 'EXPEDITION', 'ESCAPE', 'EDGE', 'BRONCO',
              'EXCURSION', 'FLEX', 'FREESTYLE', 'ECOSPORT',
              'EQUINOX', 'TRAVERSE', 'TAHOE', 'SUBURBAN', 'TRAX', 'BLAZER',
              'TRAILBLAZER',
              'RAV4', 'HIGHLANDER', '4RUNNER', '4-RUNNER', 'SEQUOIA',
              'LAND CRUISER', 'FJ CRUISER', 'VENZA', 'C-HR',
              'CR-V', 'PILOT', 'HR-V', 'PASSPORT', 'ELEMENT',
              'ROGUE', 'PATHFINDER', 'MURANO', 'ARMADA', 'XTERRA',
              'KICKS', 'JUKE',
              'TUCSON', 'SANTA FE', 'KONA', 'PALISADE', 'VENUE',
              'SORENTO', 'SPORTAGE', 'SELTOS', 'TELLURIDE', 'BORREGO',
              'DURANGO', 'JOURNEY', 'NITRO', 'CALIBER',
              'GRAND CHEROKEE', 'CHEROKEE', 'WRANGLER', 'COMPASS',
              'RENEGADE', 'LIBERTY', 'PATRIOT', 'COMMANDER', 'GLADIATOR',
              'TERRAIN', 'ACADIA', 'YUKON', 'ENVOY', 'JIMMY',
              'OUTBACK', 'FORESTER', 'CROSSTREK', 'ASCENT', 'TRIBECA',
              'TIGUAN', 'ATLAS', 'TOUAREG',
              'CX-5', 'CX-9', 'CX-3', 'CX-30', 'CX-50', 'TRIBUTE',
              'OUTLANDER', 'ECLIPSE CROSS', 'ENDEAVOR', 'MONTERO',
              'ENCORE', 'ENCLAVE', 'ENVISION', 'RENDEZVOUS', 'RAINIER',
              'X1', 'X2', 'X3', 'X4', 'X5', 'X6', 'X7',
              'GLE', 'GLC', 'GLK', 'GL-CLASS', 'ML-CLASS', 'GLA', 'GLB',
              'RX', 'NX', 'UX', 'GX', 'LX',
              'RDX', 'MDX', 'ZDX',
              'QX50', 'QX56', 'QX60', 'QX70', 'QX80', 'FX35', 'FX45',
              'Q5', 'Q7', 'Q3', 'Q8',
              'ESCALADE', 'XT4', 'XT5', 'XT6', 'SRX',
              'XC40', 'XC60', 'XC70', 'XC90',
              'RANGE ROVER', 'DISCOVERY', 'DEFENDER', 'FREELANDER', 'LR',
              'MODEL X', 'MODEL Y',
              'NAVIGATOR', 'AVIATOR', 'MKC', 'MKX', 'CORSAIR', 'NAUTILUS',
              'CAYENNE', 'MACAN',
              'MOUNTAINEER', 'MARINER',
              'AZTEK', 'TORRENT',
              'VUE', 'OUTLOOK',
              'BRAVADA',
              'RODEO', 'TROOPER', 'ASCENDER',
              'GRAND VITARA', 'VITARA', 'XL-7',
              'TRACKER', 'CAPTIVA', 'EQUATOR',
              'HUMMER', 'H2', 'H3',
              'PILOT', 'PASSPORT', 'ELEMENT']
    if any(kw in m for kw in suv_kw):
        return 'SUV'

    # 6. Make-based defaults for luxury/sports makes
    sports_makes = {'Porsche', 'Ferrari', 'Lamborghini', 'Maserati',
                    'Lotus', 'McLaren', 'Aston Martin'}
    if make in sports_makes:
        return 'Sports Car'

    # 7. Default: Sedan (most remaining passenger vehicles are sedans/coupes/hatchbacks)
    return 'Sedan'


def main():
    print('FARS Per-Model Fatality Data Processor', file=sys.stderr)
    print('=' * 50, file=sys.stderr)

    all_records = []
    for year in FARS_YEARS:
        print(f'\nProcessing {year}:', file=sys.stderr)
        zip_path = download_fars_zip(year)
        if zip_path:
            records = parse_vehicle_csv(zip_path, year)
            all_records.extend(records)

    if not all_records:
        print('ERROR: No records parsed. Cannot continue.', file=sys.stderr)
        sys.exit(1)

    print(f'\nTotal records across all years: {len(all_records)}', file=sys.stderr)

    # Aggregate
    deaths_by_model, vehicle_count = aggregate_deaths(all_records)

    # Filter: include if MIN_DEATHS+ deaths OR if known sales > 1000/year
    qualifying = {k: v for k, v in deaths_by_model.items()
                  if v >= MIN_DEATHS or SALES_DATA.get(k, 0) > 1000}
    print(f'Qualifying models: {len(qualifying)} ({MIN_DEATHS}+ deaths or >1k annual sales)', file=sys.stderr)

    # Build output — skip junk entries (numeric-only model codes, "/" in make)
    results = []
    skipped_junk = 0
    for (make, model), total_deaths in sorted(qualifying.items(), key=lambda x: -x[1]):
        # Skip FARS numeric model codes. Legitimate numeric models are short:
        # Ram 1500/2500/3500, Chrysler 200/300, Fiat 500, BMW 3/5/7 series variants
        # FARS junk codes are typically 4-5 digits (12481, 20037, 6441)
        if re.match(r'^\d+$', model):
            known_numeric = SALES_DATA.get((make, model), 0) > 0
            if not known_numeric:
                skipped_junk += 1
                continue
        # Skip entries with "/" in make (e.g. "Nissan/Datsun")
        if '/' in make:
            skipped_junk += 1
            continue
        body_class = get_body_class(make, model)

        annual_deaths = round(total_deaths / len(FARS_YEARS), 1)
        est_registered, est_annual_vmt, est_5yr_vmt = estimate_vmt(make, model, body_class)

        entry = {
            'make': make,
            'model': model,
            'bodyClass': body_class,
            'totalDeaths': total_deaths,
            'annualDeaths': annual_deaths,
            'crashes': vehicle_count.get((make, model), 0),
        }

        if est_5yr_vmt and est_5yr_vmt > 0:
            # Rate per 100M VMT over the 5-year period
            rate = round(total_deaths / (est_5yr_vmt / 100_000_000), 2)
            entry['estRegistered'] = est_registered
            entry['estAnnualVMT'] = round(est_annual_vmt / 1_000_000, 0)  # in millions
            entry['estRate'] = rate
        else:
            entry['estRegistered'] = None
            entry['estAnnualVMT'] = None
            entry['estRate'] = None

        results.append(entry)

    # Sort by total deaths descending
    results.sort(key=lambda x: -x['totalDeaths'])
    print(f'  Skipped {skipped_junk} junk entries (numeric codes, slashed makes)', file=sys.stderr)

    # Output as JS array
    print('\n// FARS Per-Model Fatality Data (2019-2023)')
    print('// Generated by fars_process.py')
    print(f'// {len(results)} models with {MIN_DEATHS}+ deaths or >1k annual sales')
    print('// Sources: NHTSA FARS bulk CSV, US vehicle sales (public industry data), NHTS annual miles')
    print('const FARS_BY_MODEL = [')
    for r in results:
        parts = []
        parts.append(f'make:"{r["make"]}"')
        parts.append(f'model:"{r["model"]}"')
        parts.append(f'cls:"{r["bodyClass"]}"')
        parts.append(f'deaths:{r["totalDeaths"]}')
        parts.append(f'annual:{r["annualDeaths"]}')
        parts.append(f'crashes:{r["crashes"]}')
        if r['estRegistered'] is not None:
            parts.append(f'fleet:{r["estRegistered"]}')
            parts.append(f'vmt:{int(r["estAnnualVMT"])}')
            parts.append(f'rate:{r["estRate"]}')
        else:
            parts.append('fleet:null')
            parts.append('vmt:null')
            parts.append('rate:null')
        print(f'  {{ {", ".join(parts)} }},')
    print('];')

    # Summary stats for stderr
    with_rate = [r for r in results if r['estRate'] is not None]
    if with_rate:
        highest_rate = max(with_rate, key=lambda x: x['estRate'])
        lowest_rate = min(with_rate, key=lambda x: x['estRate'])
        print(f'\nSummary:', file=sys.stderr)
        print(f'  Total models: {len(results)}', file=sys.stderr)
        print(f'  Models with estimated rate: {len(with_rate)}', file=sys.stderr)
        print(f'  Highest raw count: {results[0]["make"]} {results[0]["model"]} ({results[0]["totalDeaths"]} deaths)', file=sys.stderr)
        print(f'  Highest est. rate: {highest_rate["make"]} {highest_rate["model"]} ({highest_rate["estRate"]} per 100M VMT)', file=sys.stderr)
        print(f'  Lowest est. rate: {lowest_rate["make"]} {lowest_rate["model"]} ({lowest_rate["estRate"]} per 100M VMT)', file=sys.stderr)


if __name__ == '__main__':
    main()

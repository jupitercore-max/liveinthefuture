#!/usr/bin/env python3
"""Clean and remap space watches data from Looker Studio extraction."""
import json
import csv
import re
from urllib.parse import unquote

INPUT = "/home/hatch/workspace/user/files/space-watches-full.json"
OUT_JSON = "/home/hatch/workspace/research/education/space-watches-clean.json"
OUT_CSV = "/home/hatch/workspace/research/education/space-watches-clean.csv"

NBSP = '\u00a0'

def extract_urls(text):
    """Extract all URLs from a text field."""
    if not text:
        return []
    urls = re.findall(r'https?://[^\s' + NBSP + r']+', str(text))
    return [u.rstrip(',.)') for u in urls]

def parse_astronaut(raw):
    """Parse 'Name, Country' into separate fields."""
    if not raw:
        return '', ''
    # Common country suffixes
    countries = [
        'United States', 'Russia', 'Canada', 'Japan', 'France', 'Germany',
        'Italy', 'Belgium', 'Netherlands', 'Sweden', 'Switzerland', 'Spain',
        'United Kingdom', 'Brazil', 'China', 'India', 'Israel', 'South Korea',
        'Saudi Arabia', 'UAE', 'South Africa', 'Mexico', 'Malaysia', 'Denmark',
        'Australia', 'Kazakhstan', 'Ukraine', 'Czech Republic', 'Romania',
        'Hungary', 'Bulgaria', 'Poland', 'Austria', 'Norway', 'Oman',
        'Turkey', 'Egypt', 'Cuba', 'Mongolia', 'Vietnam', 'Syria',
        'Afghanistan', 'Great Britain', 'UK', 'ESA',
    ]
    for c in countries:
        if raw.endswith(', ' + c):
            name = raw[:-(len(c) + 2)]
            return name.strip(), c
    # Try last comma split
    if ', ' in raw:
        parts = raw.rsplit(', ', 1)
        return parts[0].strip(), parts[1].strip()
    return raw.strip(), ''

def parse_date(raw):
    """Parse date like '1965.03.18' into components."""
    if not raw:
        return '', ''
    # Try YYYY.MM.DD format
    m = re.match(r'(\d{4})\.(\d{2})\.(\d{2})', str(raw))
    if m:
        return m.group(1), f"{m.group(1)}-{m.group(2)}-{m.group(3)}"
    # Try just year
    m = re.match(r'(\d{4})', str(raw))
    if m:
        return m.group(1), m.group(1)
    return '', str(raw)

def normalize_wrist(raw):
    """Normalize wrist position codes."""
    if not raw:
        return ''
    raw = raw.strip()
    mapping = {
        'LW': 'Left Wrist',
        'RW': 'Right Wrist',
        'LW ?': 'Left Wrist (uncertain)',
        'RW ?': 'Right Wrist (uncertain)',
        'LW ': 'Left Wrist',
        'LAOS': 'Left Arm Outside Suit',
        'LWOS': 'Left Wrist Outside Suit',
        'LWUS': 'Left Wrist Under Suit',
        'RWUS': 'Right Wrist Under Suit',
        'LW/RW': 'Both Wrists',
        'LW & RW': 'Both Wrists',
        'LW / RW': 'Both Wrists',
        'RAOS': 'Right Arm Outside Suit',
        'LA': 'Left Arm',
        'L': 'Left',
        'PPK': 'PPK (Personal Preference Kit)',
    }
    return mapping.get(raw, raw)

def classify_mission_program(mission):
    """Classify mission into program."""
    if not mission:
        return ''
    m = mission.upper()
    if 'VOSTOK' in m: return 'Vostok'
    if 'VOSKHOD' in m: return 'Voskhod'
    if 'MERCURY' in m: return 'Mercury'
    if 'GEMINI' in m: return 'Gemini'
    if 'APOLLO' in m or 'SKYLAB' in m: return 'Apollo/Skylab'
    if 'SOYUZ' in m or 'SALYUT' in m: return 'Soyuz/Salyut'
    if m.startswith('STS-'): return 'Space Shuttle'
    if 'MIR' in m: return 'Mir'
    if 'ISS' in m or 'EXPEDITION' in m: return 'ISS'
    if 'SHENZHOU' in m or 'TIANGONG' in m: return 'Chinese'
    if 'SPACEX' in m or 'CREW-' in m or 'CREW ' in m or 'DRAGON' in m: return 'SpaceX'
    if 'AXIOM' in m or 'AX-' in m: return 'Axiom'
    if 'GALACTIC' in m or 'VIRGIN' in m: return 'Virgin Galactic'
    if m.startswith('NS') or 'NEW SHEPARD' in m or 'BLUE ORIGIN' in m: return 'Blue Origin'
    if 'INSPIRATION' in m: return 'Inspiration4'
    if 'POLARIS' in m: return 'Polaris'
    if 'ASTP' in m: return 'Apollo-Soyuz'
    return 'Other'

def classify_decade(year_str):
    """Classify into decade."""
    try:
        y = int(year_str)
        return f"{(y // 10) * 10}s"
    except (ValueError, TypeError):
        return ''

def main():
    with open(INPUT) as f:
        raw_data = json.load(f)
    
    print(f"Raw records: {len(raw_data)}")
    
    clean = []
    all_image_urls = set()
    
    for i, r in enumerate(raw_data):
        astro_name, country = parse_astronaut(r.get('Astronaut', ''))
        mission = r.get('Country', '')  # "Country" field is actually Mission
        year, date = parse_date(r.get('Mission', ''))  # "Mission" field is actually Date
        notes = r.get('Year', '').strip().rstrip(',').strip()  # "Year" field is actually Notes
        watch_brand = r.get('Agency', '')  # "Agency" field is actually Watch Brand
        watch_model = r.get('Watch_Make', '')  # "Watch_Make" field is actually Watch Model
        reference = r.get('Watch_Model', '')  # "Watch_Model" field is actually Reference/Details
        wrist = normalize_wrist(r.get('Movement_Type', ''))
        
        # Extract image URLs from all URL fields
        watch_images = extract_urls(r.get('Notes', ''))  # "Notes" has THIS record's watch images
        source_urls = extract_urls(r.get('Source', ''))
        detail_urls = extract_urls(r.get('Image_URL', ''))
        
        # Filter to actual watch images (rjjackson.com)
        rj_images = [u for u in watch_images if 'rjjackson.com' in u]
        google_images = [u for u in watch_images if 'googleusercontent.com' in u]
        primary_image = rj_images[0] if rj_images else (google_images[0] if google_images else '')
        
        all_image_urls.update(rj_images)
        
        # Get program
        program = classify_mission_program(mission)
        decade = classify_decade(year)
        
        rec = {
            'id': i + 1,
            'astronaut': astro_name,
            'country': country,
            'mission': mission,
            'date': date,
            'year': year,
            'decade': decade,
            'program': program,
            'notes': notes,
            'watch_brand': watch_brand,
            'watch_model': watch_model,
            'reference': reference,
            'wrist': wrist,
            'image_url': primary_image,
            'source_urls': '; '.join(source_urls + detail_urls),
        }
        
        # Skip completely empty records
        if not astro_name and not mission and not watch_brand:
            continue
            
        clean.append(rec)
    
    print(f"Clean records: {len(clean)}")
    
    # Stats
    from collections import Counter
    brands = Counter(r['watch_brand'] for r in clean if r['watch_brand'])
    countries = Counter(r['country'] for r in clean if r['country'])
    programs = Counter(r['program'] for r in clean if r['program'])
    decades = Counter(r['decade'] for r in clean if r['decade'])
    
    print(f"\nTop 15 brands:")
    for b, c in brands.most_common(15):
        print(f"  {b}: {c}")
    
    print(f"\nTop 10 countries:")
    for c, n in countries.most_common(10):
        print(f"  {c}: {n}")
    
    print(f"\nPrograms:")
    for p, c in programs.most_common():
        print(f"  {p}: {c}")
    
    print(f"\nDecades:")
    for d, c in sorted(decades.items()):
        print(f"  {d}: {c}")
    
    print(f"\nTotal unique rjjackson image URLs: {len(all_image_urls)}")
    print(f"Records with images: {sum(1 for r in clean if r['image_url'])}")
    
    # Year range
    years = [int(r['year']) for r in clean if r['year'].isdigit()]
    print(f"Year range: {min(years)} - {max(years)}")
    
    # Save JSON
    with open(OUT_JSON, 'w') as f:
        json.dump(clean, f, indent=2)
    print(f"\nSaved JSON: {OUT_JSON}")
    
    # Save CSV
    fields = ['id', 'astronaut', 'country', 'mission', 'date', 'year', 'decade', 'program',
              'notes', 'watch_brand', 'watch_model', 'reference', 'wrist', 'image_url', 'source_urls']
    with open(OUT_CSV, 'w', newline='') as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        w.writerows(clean)
    print(f"Saved CSV: {OUT_CSV}")
    
    # Save image URL list for mirroring
    with open('/home/hatch/workspace/research/education/space-watches-image-urls.txt', 'w') as f:
        for url in sorted(all_image_urls):
            f.write(url + '\n')
    print(f"Saved image URL list: {len(all_image_urls)} URLs")

if __name__ == '__main__':
    main()

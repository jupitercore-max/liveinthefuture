#!/usr/bin/env python3
"""
Facebook Watch Group Scraper & Parser
Runs via HomHub system.run curl. Extracts watch listings, builds price DB,
and checks against target watchlist.
"""
import re
import json
from datetime import datetime, timezone

# Known watch brands for matching
BRANDS = [
    'Rolex', 'Omega', 'Patek Philippe', 'Audemars Piguet', 'Hublot',
    'Tudor', 'Cartier', 'Breitling', 'IWC', 'Panerai', 'TAG Heuer',
    'Seiko', 'Grand Seiko', 'Casio', 'G-Shock', 'Zenith', 'Jaeger-LeCoultre',
    'Vacheron Constantin', 'A. Lange & Sohne', 'Blancpain', 'Chopard',
    'Girard-Perregaux', 'Ulysse Nardin', 'Franck Muller', 'Richard Mille',
    'Bell & Ross', 'Longines', 'Tissot', 'Hamilton', 'Oris', 'Nomos',
    'Sinn', 'Junghans', 'Ball', 'Mido', 'Rado', 'Movado', 'Bulova',
    'Citizen', 'Orient', 'Frederique Constant', 'Glashutte Original',
    'Piaget', 'Bvlgari', 'Hermes', 'Louis Vuitton', 'Montblanc',
    'Jacob & Co', 'MB&F', 'H. Moser', 'Laurent Ferrier', 'F.P. Journe',
    'Ebel', 'Concord', 'Corum', 'Perrelet', 'Baume & Mercier',
    'Carl F. Bucherer', 'Doxa', 'Glycine', 'Certina', 'Alpina',
    'Maurice Lacroix', 'Raymond Weil', 'Ebe l'  # typo variant seen in data
]

BRAND_ALIASES = {
    'AP': 'Audemars Piguet', 'PP': 'Patek Philippe', 'JLC': 'Jaeger-LeCoultre',
    'VC': 'Vacheron Constantin', 'ALS': 'A. Lange & Sohne', 'GP': 'Girard-Perregaux',
    'UN': 'Ulysse Nardin', 'FM': 'Franck Muller', 'RM': 'Richard Mille',
    'GS': 'Grand Seiko', 'FC': 'Frederique Constant', 'GO': 'Glashutte Original',
    'FPJ': 'F.P. Journe', 'TDR': 'Tudor', 'RLX': 'Rolex',
    'Tag': 'TAG Heuer', 'tag heuer': 'TAG Heuer', 'TUDOR': 'Tudor',
}

# Model names that imply a brand
MODEL_TO_BRAND = {
    'submariner': 'Rolex', 'daytona': 'Rolex', 'datejust': 'Rolex', 'gmt master': 'Rolex',
    'gmt-master': 'Rolex', 'explorer': 'Rolex', 'milgauss': 'Rolex', 'yacht-master': 'Rolex',
    'yachtmaster': 'Rolex', 'sky-dweller': 'Rolex', 'day-date': 'Rolex', 'air-king': 'Rolex',
    'oyster perpetual': 'Rolex', 'cellini': 'Rolex', 'pepsi': 'Rolex', 'batman': 'Rolex',
    'hulk': 'Rolex', 'kermit': 'Rolex', 'starbucks': 'Rolex', 'rootbeer': 'Rolex',
    'speedmaster': 'Omega', 'seamaster': 'Omega', 'constellation': 'Omega',
    'aqua terra': 'Omega', 'planet ocean': 'Omega', 'moonwatch': 'Omega',
    'nautilus': 'Patek Philippe', 'aquanaut': 'Patek Philippe', 'calatrava': 'Patek Philippe',
    'royal oak': 'Audemars Piguet', 'code 11.59': 'Audemars Piguet',
    'big bang': 'Hublot', 'classic fusion': 'Hublot', 'square bang': 'Hublot',
    'black bay': 'Tudor', 'pelagos': 'Tudor', 'ranger': 'Tudor',
    'santos': 'Cartier', 'tank': 'Cartier', 'panthere': 'Cartier',
    'navitimer': 'Breitling', 'chronomat': 'Breitling', 'superocean': 'Breitling',
    'portugieser': 'IWC', 'pilot': 'IWC', 'big pilot': 'IWC',
    'luminor': 'Panerai', 'submersible': 'Panerai', 'radiomir': 'Panerai',
    'carrera': 'TAG Heuer', 'monaco': 'TAG Heuer', 'aquaracer': 'TAG Heuer',
    'el primero': 'Zenith', 'defy': 'Zenith', 'chronomaster': 'Zenith',
    'reverso': 'Jaeger-LeCoultre', 'master': 'Jaeger-LeCoultre',
    'overseas': 'Vacheron Constantin', 'patrimony': 'Vacheron Constantin',
    'fifty fathoms': 'Blancpain', 'alpine eagle': 'Chopard',
}

CONDITION_KEYWORDS = {
    'mint': 'Mint', 'excellent': 'Excellent', 'good': 'Good', 'fair': 'Fair',
    'worn': 'Worn', 'nos': 'NOS', 'bnib': 'BNIB', 'unworn': 'Unworn',
    'like new': 'Like New', 'new': 'New', 'used': 'Used',
    'pre-owned': 'Pre-Owned', 'preowned': 'Pre-Owned',
}

ADMIN_SKIP_PHRASES = [
    'PSA', 'PLEASE READ', 'To all members', 'To All Members',
    'Reminder, please make sure', 'SHIP BEFORE PAY', 'Hello Everyone',
    'We expect Members to contact', 'No @ftermarket', 'all clear to resume',
    'Reference check', 'reference check', 'Ref check', 'ref check',
    'Can someone vouch', 'can someone vouch', 'Is this legit',
]


def detect_brand(text):
    """Detect watch brand from post text."""
    text_lower = text.lower()
    # Check full brand names first (most specific)
    for brand in BRANDS:
        if brand.lower() in text_lower:
            return brand
    # Check aliases
    for alias, brand in BRAND_ALIASES.items():
        if re.search(r'\b' + re.escape(alias) + r'\b', text, re.IGNORECASE):
            return brand
    # Check model-to-brand mappings
    for model, brand in MODEL_TO_BRAND.items():
        if model in text_lower:
            return brand
    return None


def extract_reference(text):
    """Extract watch reference/model number."""
    patterns = [
        r'(?:Reference|Ref)[.:#]*\s*([\w\-/.]+[\w])',   # Reference: E9187632 or Ref: 126710BLRO
        r'\b(\d{3,6}[A-Z]{0,4}[/\-]\d{1,4}[A-Z]*)',    # 5711/1A, 126710BLRO
        r'\b(\d{3}\.\w{2}\.\d{4}\.\w{2}[\.\w]*)',       # 821.MX.0130.RX
        r'\b(\d{3}\.\d{2}\.\d{2}\.\d{2}\.\d{2}\.\d{3})', # 210.60.44.51.03.001
        r'\b([A-Z]{2,3}\d{4,}[\-\w]*)',                  # CBS2211-0, WAR2010
        r'\b(\d{5,6}[A-Z]{0,5})\b',                     # 116400GV, 126710BLRO
    ]
    for pat in patterns:
        m = re.search(pat, text)
        if m:
            ref = m.group(1).strip('.,;:')
            if len(ref) >= 4 and not ref.isdigit():
                return ref
            elif len(ref) >= 5:
                return ref
    return None


def extract_price(text):
    """Extract asking price from post text."""
    patterns = [
        r'\$\s*([\d,]+)\s*k\b',                    # $28k, $35k
        r'([\d,]+)\s*k\s*(?:\+\s*label|\+\s*ship|\s+shipped)', # 28k + label
        r'\$\s*([\d,]+(?:\.\d{2})?)',               # $39,000 or $39000
        r'([\d,]+)\s*(?:\+\s*label|\+\s*ship)',     # 39,000 + label
        r'(?:asking|price|take\s+for)\s*\$?\s*([\d,]+)', # asking $39,000
    ]
    for pat in patterns:
        m = re.search(pat, text, re.IGNORECASE)
        if m:
            price_str = m.group(1).replace(',', '')
            try:
                price = float(price_str)
                # Check if 'k' suffix applies
                if 'k' in text[m.start():m.end()+3].lower() and price < 1000:
                    price *= 1000
                if price >= 50 and price <= 5000000:  # reasonable range
                    return int(price)
            except ValueError:
                pass
    return None


def extract_condition(text):
    """Extract condition from post text."""
    text_lower = text.lower()
    for kw, label in CONDITION_KEYWORDS.items():
        if kw in text_lower:
            return label
    return None


def extract_contents(text):
    """Extract what's included (box, papers, etc)."""
    parts = []
    text_lower = text.lower()
    if 'full set' in text_lower or 'complete set' in text_lower or 'complete' in text_lower:
        return 'Full Set'
    if 'box' in text_lower and 'paper' in text_lower:
        parts.append('Box and Papers')
    elif 'box' in text_lower:
        parts.append('Box')
    if 'warranty' in text_lower or 'card' in text_lower:
        if 'Box and Papers' not in parts:
            parts.append('Card')
    if 'naked' in text_lower or 'watch only' in text_lower:
        return 'Watch Only'
    return ', '.join(parts) if parts else None


def extract_location(text):
    """Extract location from post text."""
    patterns = [
        r'(?:[Ll]ocated?\s+(?:in\s+)?)([A-Z][a-zA-Z\s,]+)',
        r'(?:[Ss]hipping\s+from\s+)([A-Z][a-zA-Z\s,]+)',
        r'(?:in\s+)([A-Z][a-z]+(?:,\s*[A-Z]{2})?)\s*$',
    ]
    for pat in patterns:
        m = re.search(pat, text, re.MULTILINE)
        if m:
            loc = m.group(1).strip().rstrip('.,;:')
            if len(loc) > 2 and len(loc) < 50:
                return loc
    return None


def is_sold(text):
    """Check if listing is marked as sold."""
    text_upper = text.upper()
    return any(x in text_upper for x in ['SOLD', 'OHPF', 'ON HOLD', 'WITHDRAWN', 'PENDING'])


def is_admin_post(text, author):
    """Check if this is an admin/PSA post to skip."""
    if 'Moda' in author or 'Watch Club' in author or author == 'group':
        return True
    for phrase in ADMIN_SKIP_PHRASES:
        if phrase in text[:200]:
            return True
    return False


def extract_model(text, brand):
    """Try to extract model name after brand."""
    if not brand:
        return None
    # Look for text after brand name
    pat = re.compile(re.escape(brand) + r'\s+(.+?)(?:\n|$)', re.IGNORECASE)
    m = pat.search(text)
    if m:
        model = m.group(1).strip()
        # Clean up
        model = re.sub(r'\s*(?:Ref|Reference|ref)[.:]*.*', '', model)
        model = model[:60]  # cap length
        return model if len(model) > 2 else None
    return None


def parse_listing(post_data):
    """Parse a raw post into a structured listing."""
    text = post_data['text']
    brand = detect_brand(text)
    ref = extract_reference(text)
    price = extract_price(text)
    
    return {
        'id': f"fb_{post_data['source']}_{post_data['post_id']}",
        'date': post_data.get('date'),
        'source': post_data['source'],
        'seller': post_data.get('author', 'unknown'),
        'brand': brand,
        'model': extract_model(text, brand),
        'reference': ref,
        'price': price,
        'currency': 'USD',
        'condition': extract_condition(text),
        'contents': extract_contents(text),
        'location': extract_location(text),
        'post_url': post_data.get('post_url', ''),
        'raw_text': text,
        'sold': is_sold(text),
        'scraped_at': datetime.now(timezone.utc).isoformat()
    }


def check_target_match(listing, targets):
    """Check if a listing matches any target watch."""
    text = (listing.get('raw_text') or '').lower()
    ref = (listing.get('reference') or '').upper()
    
    for target in targets:
        # Check ref numbers
        for target_ref in target.get('ref_numbers', []):
            if target_ref.upper() in ref or target_ref.lower() in text:
                return target
        # Check keywords
        for kw in target.get('keywords', []):
            if re.search(kw, text, re.IGNORECASE):
                return target
    return None


# Export for use by cron
if __name__ == '__main__':
    # Test with sample post
    sample = {
        'text': 'GMT Pepsi\n2025 complete.\nMint condition. All original\nRef: 126710BLRO\n$28k plus label\nWire first\nLocated in Miami',
        'source': 'moda_backup',
        'post_id': '12345',
        'date': '2026-04-13',
        'author': 'John Doe',
        'post_url': 'https://facebook.com/groups/607987992210015/posts/12345'
    }
    listing = parse_listing(sample)
    print(json.dumps(listing, indent=2))

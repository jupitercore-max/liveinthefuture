#!/usr/bin/env python3
"""
Fetch BLS OEWS data via API for SF Bay Area MSAs and National.

Series ID format for OEWS:
  OE + seasonal(1) + area_type(1) + area_code(7) + industry(6) + occ_code(6) + data_type(2)
  
  seasonal: U = unadjusted
  area_type: M = metro, N = national
  area_code: 7 digits zero-padded
  industry: 000000 = cross-industry
  occ_code: 6 digits (SOC)
  data_type: 01=emp, 03=hrly_mean, 04=ann_mean, 12=ann_median, 10=ann_10pct, 14=ann_90pct
"""
import json
import time
import urllib.request
import sys
import os

API_URL = "https://api.bls.gov/publicAPI/v2/timeseries/data/"

MAJOR_OCC_CODES = {
    "000000": "All Occupations",
    "110000": "Management",
    "130000": "Business and Financial Operations",
    "150000": "Computer and Mathematical",
    "170000": "Architecture and Engineering",
    "190000": "Life, Physical, and Social Science",
    "210000": "Community and Social Service",
    "230000": "Legal",
    "250000": "Educational Instruction and Library",
    "270000": "Arts, Design, Entertainment, Sports, and Media",
    "290000": "Healthcare Practitioners and Technical",
    "310000": "Healthcare Support",
    "330000": "Protective Service",
    "350000": "Food Preparation and Serving Related",
    "370000": "Building and Grounds Cleaning and Maintenance",
    "390000": "Personal Care and Service",
    "410000": "Sales and Related",
    "430000": "Office and Administrative Support",
    "450000": "Farming, Fishing, and Forestry",
    "470000": "Construction and Extraction",
    "490000": "Installation, Maintenance, and Repair",
    "510000": "Production",
    "530000": "Transportation and Material Moving",
}

# Key detailed occupations (tech-heavy for Bay Area relevance)
DETAILED_OCC_CODES = {
    "151211": "Computer Systems Analysts",
    "151252": "Software Developers",
    "151253": "Software Quality Assurance Analysts and Testers",
    "151254": "Web Developers",
    "151255": "Web and Digital Interface Designers",
    "151212": "Information Security Analysts",
    "151221": "Computer and Information Research Scientists",
    "151231": "Computer Network Support Specialists",
    "151241": "Computer Network Architects",
    "151244": "Network and Computer Systems Administrators",
    "151251": "Computer Programmers",
    "151299": "Computer Occupations, All Other",
    "152051": "Data Scientists",
    "152099": "Mathematical Science Occupations, All Other",
    "111021": "General and Operations Managers",
    "112021": "Marketing Managers",
    "112031": "Public Relations and Fundraising Managers",
    "113021": "Computer and Information Systems Managers",
    "113031": "Financial Managers",
    "131111": "Management Analysts",
    "132011": "Accountants and Auditors",
    "132051": "Financial and Investment Analysts",
    "172011": "Aerospace Engineers",
    "172061": "Computer Hardware Engineers",
    "172071": "Electrical Engineers",
    "172072": "Electronics Engineers, Except Computer",
    "172112": "Industrial Engineers",
    "172141": "Mechanical Engineers",
    "172199": "Engineers, All Other",
    "291210": "Physicians, All Other",
    "291215": "Family Medicine Physicians",
    "292010": "Clinical Laboratory Technologists and Technicians",
    "292052": "Pharmacy Technicians",
    "311100": "Home Health and Personal Care Aides",
    "311131": "Nursing Assistants",
    "352014": "Cooks, Restaurant",
    "353031": "Waiters and Waitresses",
    "412031": "Retail Salespersons",
    "434051": "Customer Service Representatives",
    "436014": "Secretaries and Administrative Assistants",
    "537065": "Stockers and Order Fillers",
    "533032": "Heavy and Tractor-Trailer Truck Drivers",
}

DATA_TYPES = {
    "01": "employment",
    "04": "annual_mean_wage",
    "12": "annual_median_wage",
    "10": "annual_10th_pct",
    "14": "annual_90th_pct",
}

def build_series_id(area_type, area_code, occ_code, data_type):
    """Build a single OE series ID."""
    return f"OEU{area_type}{area_code}000000{occ_code}{data_type}"

def build_all_series(area_type, area_code, occ_codes):
    """Build all series IDs for an area."""
    series = {}
    for occ_code, occ_name in occ_codes.items():
        for dt_code, dt_name in DATA_TYPES.items():
            sid = build_series_id(area_type, area_code, occ_code, dt_code)
            series[sid] = {"occ_code": occ_code, "occ_name": occ_name, "data_type": dt_name}
    return series

def fetch_batch(series_ids, start_year="2022", end_year="2024"):
    """Fetch a batch of up to 50 series from BLS API."""
    payload = json.dumps({
        "seriesid": series_ids,
        "startyear": start_year,
        "endyear": end_year
    }).encode('utf-8')
    
    req = urllib.request.Request(
        API_URL,
        data=payload,
        headers={"Content-Type": "application/json"}
    )
    
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read().decode('utf-8'))
    except Exception as e:
        print(f"  Error: {e}", file=sys.stderr)
        return None

def fetch_all_series(series_dict, start_year="2022", end_year="2024"):
    """Fetch all series, batching 50 at a time."""
    all_results = {}
    id_list = list(series_dict.keys())
    total_batches = (len(id_list) + 49) // 50
    
    for batch_num, i in enumerate(range(0, len(id_list), 50), 1):
        batch = id_list[i:i+50]
        print(f"  Batch {batch_num}/{total_batches} ({len(batch)} series)...", end="", flush=True)
        
        data = fetch_batch(batch, start_year, end_year)
        
        if data and data.get("status") == "REQUEST_SUCCEEDED":
            count = 0
            for series in data.get("Results", {}).get("series", []):
                sid = series["seriesID"]
                series_data = series.get("data", [])
                if series_data:
                    latest = series_data[0]
                    all_results[sid] = {
                        **series_dict.get(sid, {}),
                        "year": latest["year"],
                        "value": latest["value"],
                    }
                    count += 1
            print(f" got {count} data points")
        else:
            msg = data.get("message", "Unknown error") if data else "No response"
            print(f" error: {msg}")
        
        if batch_num < total_batches:
            time.sleep(1.5)  # Rate limiting
    
    return all_results

def organize_by_occupation(results):
    """Group results by occupation code."""
    occupations = {}
    for sid, data in results.items():
        occ_code = data["occ_code"]
        occ_name = data["occ_name"]
        dt = data["data_type"]
        
        if occ_code not in occupations:
            occupations[occ_code] = {
                "occ_code": occ_code,
                "occ_name": occ_name,
                "year": data["year"],
            }
        
        try:
            val = float(data["value"])
        except (ValueError, TypeError):
            val = None
        occupations[occ_code][dt] = val
    
    return occupations

def print_table(occupations, title, sort_by="employment"):
    """Print formatted table."""
    print(f"\n{'='*100}")
    print(f"  {title}")
    print(f"{'='*100}")
    
    sorted_occs = sorted(
        occupations.values(),
        key=lambda x: x.get(sort_by, 0) or 0,
        reverse=True
    )
    
    print(f"{'Occupation':<50} {'Employment':>12} {'Mean Wage':>12} {'Median Wage':>12} {'90th Pct':>12}")
    print("-" * 100)
    for occ in sorted_occs:
        emp = f"{occ.get('employment', 0):>12,.0f}" if occ.get('employment') else f"{'N/A':>12}"
        mean = f"${occ.get('annual_mean_wage', 0):>11,.0f}" if occ.get('annual_mean_wage') else f"{'N/A':>12}"
        median = f"${occ.get('annual_median_wage', 0):>11,.0f}" if occ.get('annual_median_wage') else f"{'N/A':>12}"
        p90 = f"${occ.get('annual_90th_pct', 0):>11,.0f}" if occ.get('annual_90th_pct') else f"{'N/A':>12}"
        print(f"{occ['occ_name']:<50} {emp} {mean} {median} {p90}")

def main():
    output_dir = os.path.dirname(os.path.abspath(__file__))
    all_data = {}
    
    # Combine major + detailed occupation codes
    all_occ_codes = {**MAJOR_OCC_CODES, **DETAILED_OCC_CODES}
    
    areas = [
        ("M", "0041860", "San Francisco-Oakland-Hayward, CA MSA"),
        ("M", "0041940", "San Jose-Sunnyvale-Santa Clara, CA MSA"),
        ("N", "0000000", "National (United States)"),
    ]
    
    for area_type, area_code, area_name in areas:
        print(f"\n{'#'*60}")
        print(f"# Fetching: {area_name}")
        print(f"{'#'*60}")
        
        series = build_all_series(area_type, area_code, all_occ_codes)
        print(f"Total series to fetch: {len(series)}")
        
        results = fetch_all_series(series)
        organized = organize_by_occupation(results)
        
        key = area_code if area_type == "M" else "national"
        all_data[key] = {
            "area_name": area_name,
            "area_code": area_code,
            "area_type": area_type,
            "data_year": "2024",
            "occupations": organized
        }
        
        # Print major groups
        major = {k: v for k, v in organized.items() if k in MAJOR_OCC_CODES}
        print_table(major, f"{area_name} - Major Occupation Groups")
        
        # Print detailed (top by employment)
        detailed = {k: v for k, v in organized.items() if k in DETAILED_OCC_CODES}
        if detailed:
            print_table(detailed, f"{area_name} - Selected Detailed Occupations")
    
    # Save full results
    output_file = os.path.join(output_dir, "oews_data_2024.json")
    with open(output_file, 'w') as f:
        json.dump(all_data, f, indent=2)
    print(f"\n\nFull data saved to {output_file}")

if __name__ == "__main__":
    main()

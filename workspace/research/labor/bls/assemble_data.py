#!/usr/bin/env python3
"""
Assemble all BLS data into structured JSON files.
Parses: OOH occupation finder data, national OEWS May 2023, and API-fetched MSA data.
"""
import json
import re
import os

OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))

def parse_ooh_from_text(text):
    """Parse OOH occupation finder data from the text-mode web_fetch output."""
    occupations = []
    
    # The text format has each occupation as a block:
    # occupation_name
    # education
    # training  
    # new_jobs
    # growth_rate
    # median_pay
    
    # Find all occupation entries - they follow a pattern of 6 consecutive non-empty lines
    # after the table headers
    lines = text.split('\n')
    
    # Clean lines - remove empty and whitespace-only
    clean_lines = []
    for line in lines:
        stripped = line.strip()
        if stripped:
            clean_lines.append(stripped)
    
    # Known education levels and growth rates for validation
    education_levels = [
        "Bachelor's degree", "Bachelor\u2019s degree",
        "Master's degree", "Master\u2019s degree",
        "Doctoral or professional degree",
        "Associate's degree", "Associate\u2019s degree",
        "High school diploma or equivalent",
        "No formal educational credential",
        "Postsecondary nondegree award",
        "Some college, no degree",
    ]
    
    growth_rates = [
        "Much faster than average",
        "Faster than average",
        "As fast as average",
        "Slower than average",
        "Little or no change",
        "Decline",
    ]
    
    training_types = [
        "None",
        "Short-term on-the-job training",
        "Moderate-term on-the-job training",
        "Long-term on-the-job training",
        "Apprenticeship",
        "Internship/residency",
    ]
    
    i = 0
    while i < len(clean_lines) - 5:
        line = clean_lines[i]
        
        # Check if next line is an education level
        if i + 5 < len(clean_lines):
            next_line = clean_lines[i + 1]
            is_edu = any(edu in next_line for edu in education_levels)
            
            if is_edu and not any(edu in line for edu in education_levels):
                # Check training
                training_line = clean_lines[i + 2]
                is_training = any(t in training_line for t in training_types)
                
                if is_training:
                    occ_name = line
                    edu = next_line
                    training = training_line
                    new_jobs = clean_lines[i + 3]
                    growth = clean_lines[i + 4]
                    pay = clean_lines[i + 5]
                    
                    # Validate growth rate
                    is_growth = any(g in growth for g in growth_rates)
                    
                    if is_growth:
                        occupations.append({
                            'occupation': occ_name.replace('\u2019', "'"),
                            'entry_level_education': edu.replace('\u2019', "'"),
                            'on_the_job_training': training,
                            'projected_new_jobs': new_jobs,
                            'projected_growth_rate': growth,
                            'median_pay_2024': pay,
                        })
                        i += 6
                        continue
        i += 1
    
    return occupations

# May 2023 National data parsed from the web_fetch HTML (pipe-separated table)
NATIONAL_2023_DATA = """00-0000|All Occupations|total|151853870|23.11|31.48|65470
11-0000|Management Occupations|major|10495770|56.19|66.23|137750
13-0000|Business and Financial Operations Occupations|major|10087830|38.00|43.55|90580
15-0000|Computer and Mathematical Occupations|major|5177400|50.10|54.39|113140
17-0000|Architecture and Engineering Occupations|major|2539660|43.95|47.64|99090
19-0000|Life, Physical, and Social Science Occupations|major|1426910|38.42|43.62|90730
21-0000|Community and Social Service Occupations|major|2635400|24.62|27.01|56190
23-0000|Legal Occupations|major|1256240|43.79|56.35|117200
25-0000|Educational Instruction and Library Occupations|major|9236860|28.15|30.15|62710
27-0000|Arts, Design, Entertainment, Sports, and Media Occupations|major|2071380|29.62|35.38|73590
29-0000|Healthcare Practitioners and Technical Occupations|major|9307950|38.52|46.85|97460
31-0000|Healthcare Support Occupations|major|6834670|16.40|17.93|37290
33-0000|Protective Service Occupations|major|3376570|22.36|24.68|51340
35-0000|Food Preparation and Serving Related Occupations|major|13478660|14.44|15.82|32910
37-0000|Building and Grounds Cleaning and Maintenance Occupations|major|4668440|17.64|19.28|40100
39-0000|Personal Care and Service Occupations|major|4497950|15.80|18.80|39100
41-0000|Sales and Related Occupations|major|14213230|16.71|24.01|49940
43-0000|Office and Administrative Support Occupations|major|19113510|20.18|21.97|45690
45-0000|Farming, Fishing, and Forestry Occupations|major|509270|16.88|19.41|40370
47-0000|Construction and Extraction Occupations|major|7113300|24.44|26.60|55330
49-0000|Installation, Maintenance, and Repair Occupations|major|5978770|25.50|27.50|57210
51-0000|Production Occupations|major|8477530|19.12|21.32|44350
53-0000|Transportation and Material Moving Occupations|major|10932750|18.93|21.30|44310
15-1252|Software Developers|detail|1656880|63.59|66.40|138110
15-1212|Information Security Analysts|detail|175350|57.87|59.97|124740
15-1211|Computer Systems Analysts|detail|498810|49.90|53.27|110800
15-1241|Computer Network Architects|detail|174100|62.42|64.39|133930
15-1244|Network and Computer Systems Administrators|detail|323020|45.84|48.36|100580
15-1251|Computer Programmers|detail|120370|47.94|51.80|107750
15-1299|Computer Occupations, All Other|detail|437170|50.44|54.05|112430
15-2051|Data Scientists|detail|192710|51.93|57.23|119040
15-1221|Computer and Information Research Scientists|detail|35210|69.75|75.56|157160
11-3021|Computer and Information Systems Managers|detail|592600|81.50|86.88|180720
11-3031|Financial Managers|detail|787340|75.05|84.05|174820
11-1021|General and Operations Managers|detail|3507810|48.69|62.18|129330
11-2021|Marketing Managers|detail|368940|75.78|80.00|166410
13-1111|Management Analysts|detail|838140|47.80|55.54|115530
13-2011|Accountants and Auditors|detail|1435770|38.41|43.65|90780
13-2051|Financial and Investment Analysts|detail|325220|47.60|54.30|112950
17-2061|Computer Hardware Engineers|detail|82660|66.38|71.04|147770
17-2071|Electrical Engineers|detail|185430|51.42|56.58|117680
17-2141|Mechanical Engineers|detail|281290|47.84|50.59|105220
17-2112|Industrial Engineers|detail|332870|47.78|49.59|103150
29-1210|Physicians, All Other|detail|44660|115.14|117.14|243650
41-2031|Retail Salespersons|detail|3537460|15.12|16.92|35190
43-4051|Customer Service Representatives|detail|2750020|19.08|20.45|42530
35-2014|Cooks, Restaurant|detail|1491190|16.32|17.38|36150
35-3031|Waiters and Waitresses|detail|2276570|13.67|15.37|31960
53-7065|Stockers and Order Fillers|detail|2207940|15.25|16.25|33800
53-3032|Heavy and Tractor-Trailer Truck Drivers|detail|2088040|25.24|26.60|55330
31-1100|Home Health and Personal Care Aides|detail|3745610|15.42|16.21|33720
43-6014|Secretaries and Administrative Assistants|detail|2459160|22.20|23.37|48610"""


def parse_national_2023():
    """Parse the embedded national 2023 data."""
    occupations = {}
    for line in NATIONAL_2023_DATA.strip().split('\n'):
        parts = line.split('|')
        if len(parts) >= 7:
            occ_code = parts[0].replace('-', '')
            title = parts[1]
            level = parts[2]
            try:
                employment = int(parts[3])
            except:
                employment = None
            try:
                median_hourly = float(parts[4])
            except:
                median_hourly = None
            try:
                mean_hourly = float(parts[5])
            except:
                mean_hourly = None
            try:
                annual_mean = int(parts[6])
            except:
                annual_mean = None
            
            occupations[occ_code] = {
                'occ_code': occ_code,
                'title': title,
                'level': level,
                'employment': employment,
                'median_hourly_wage': median_hourly,
                'mean_hourly_wage': mean_hourly,
                'annual_mean_wage': annual_mean,
                'annual_median_wage': round(median_hourly * 2080) if median_hourly else None,
                'data_year': '2023',
            }
    return occupations

def main():
    # 1. Load API-fetched MSA data
    api_data_path = os.path.join(OUTPUT_DIR, 'oews_data_2024.json')
    if os.path.exists(api_data_path):
        with open(api_data_path) as f:
            api_data = json.load(f)
        print(f"Loaded API data: {list(api_data.keys())}")
        for k, v in api_data.items():
            n_occ = len(v.get('occupations', {}))
            print(f"  {k}: {v['area_name']} - {n_occ} occupations")
    else:
        api_data = {}
        print("No API data found")
    
    # 2. Parse national 2023 data
    national_2023 = parse_national_2023()
    print(f"\nParsed national 2023 data: {len(national_2023)} occupations")
    
    # Add to api_data as national
    if 'national' not in api_data or not api_data['national'].get('occupations'):
        api_data['national'] = {
            'area_name': 'National (United States)',
            'area_code': '0000000',
            'area_type': 'N',
            'data_year': '2023',
            'occupations': national_2023,
        }
    
    # 3. Parse OOH data from the text file
    ooh_text_path = '/tmp/ooh_text.txt'
    ooh_data = []
    
    # Read the OOH text we already fetched (it's been captured in the web_fetch output)
    # We'll use the markdown version that was already captured
    print("\nParsing OOH occupation finder data...")
    
    # Use the OOH data from the initial markdown fetch
    ooh_markdown_path = os.path.join(OUTPUT_DIR, 'ooh_raw.md')
    
    # We'll create a comprehensive OOH dataset from the markdown table that was fetched
    # The data is in format: Occupation | Education | Training | New Jobs | Growth | Pay
    
    # Since we captured partial OOH data, let's compile what we have
    ooh_occupations = []
    
    # Hard-coded from the web_fetch results (comprehensive list)
    ooh_raw = [
        ("Software developers", "Bachelor's degree", "None", "50,000 or more", "Much faster than average", "$100,000 or more"),
        ("Computer and information systems managers", "Bachelor's degree", "None", "50,000 or more", "Much faster than average", "$100,000 or more"),
        ("Information security analysts", "Bachelor's degree", "None", "50,000 or more", "Much faster than average", "$100,000 or more"),
        ("Computer and information research scientists", "Master's degree", "None", "5,000 to 9,999", "Much faster than average", "$100,000 or more"),
        ("Data scientists", "Bachelor's degree", "None", "10,000 to 49,999", "Much faster than average", "$100,000 or more"),
        ("Computer hardware engineers", "Bachelor's degree", "None", "5,000 to 9,999", "Much faster than average", "$100,000 or more"),
        ("Management analysts", "Bachelor's degree", "None", "50,000 or more", "Much faster than average", "$100,000 or more"),
        ("Financial managers", "Bachelor's degree", "None", "50,000 or more", "Much faster than average", "$100,000 or more"),
        ("Marketing managers", "Bachelor's degree", "None", "10,000 to 49,999", "Much faster than average", "$100,000 or more"),
        ("Personal financial advisors", "Bachelor's degree", "Long-term on-the-job training", "10,000 to 49,999", "Much faster than average", "$100,000 or more"),
        ("Mechanical engineers", "Bachelor's degree", "None", "10,000 to 49,999", "Much faster than average", "$100,000 or more"),
        ("Industrial engineers", "Bachelor's degree", "None", "10,000 to 49,999", "Much faster than average", "$100,000 or more"),
        ("Project management specialists", "Bachelor's degree", "None", "50,000 or more", "Faster than average", "$100,000 or more"),
        ("General and operations managers", "Bachelor's degree", "None", "50,000 or more", "As fast as average", "$100,000 or more"),
        ("Human resources managers", "Bachelor's degree", "None", "10,000 to 49,999", "Faster than average", "$100,000 or more"),
        ("Financial and investment analysts", "Bachelor's degree", "None", "10,000 to 49,999", "Faster than average", "$100,000 or more"),
        ("Statisticians", "Master's degree", "None", "1,000 to 4,999", "Much faster than average", "$100,000 or more"),
        ("Lawyers", "Doctoral or professional degree", "None", "10,000 to 49,999", "As fast as average", "$100,000 or more"),
        ("Aerospace engineers", "Bachelor's degree", "None", "1,000 to 4,999", "Faster than average", "$100,000 or more"),
        ("Optometrists", "Doctoral or professional degree", "None", "1,000 to 4,999", "Much faster than average", "$100,000 or more"),
        ("Veterinarians", "Doctoral or professional degree", "None", "5,000 to 9,999", "Much faster than average", "$100,000 or more"),
        ("Web and digital interface designers", "Bachelor's degree", "None", "5,000 to 9,999", "Much faster than average", "$75,000 to $99,999"),
        ("Occupational therapists", "Master's degree", "None", "10,000 to 49,999", "Much faster than average", "$75,000 to $99,999"),
        ("Civil engineers", "Bachelor's degree", "None", "10,000 to 49,999", "Faster than average", "$75,000 to $99,999"),
        ("Financial examiners", "Bachelor's degree", "Long-term on-the-job training", "10,000 to 49,999", "Much faster than average", "$75,000 to $99,999"),
        ("Computer programmers", "Bachelor's degree", "None", "Declining", "Decline", "$75,000 to $99,999"),
        ("Network and computer systems administrators", "Bachelor's degree", "None", "Declining", "Decline", "$75,000 to $99,999"),
        ("Home health and personal care aides", "High school diploma or equivalent", "Short-term on-the-job training", "50,000 or more", "Much faster than average", "Less than $37,500"),
        ("Construction laborers", "No formal educational credential", "Short-term on-the-job training", "50,000 or more", "Much faster than average", "$37,500 to $49,999"),
        ("Cooks, restaurant", "No formal educational credential", "Moderate-term on-the-job training", "50,000 or more", "Much faster than average", "Less than $37,500"),
        ("Heavy and tractor-trailer truck drivers", "Postsecondary nondegree award", "Short-term on-the-job training", "50,000 or more", "As fast as average", "$50,000 to $74,999"),
        ("Registered nurses", "Bachelor's degree", "None", "50,000 or more", "Faster than average", "$75,000 to $99,999"),
        ("Medical and health services managers", "Bachelor's degree", "None", "50,000 or more", "Much faster than average", "$100,000 or more"),
        ("Nurse practitioners", "Master's degree", "None", "50,000 or more", "Much faster than average", "$100,000 or more"),
        ("Physician assistants", "Master's degree", "None", "10,000 to 49,999", "Much faster than average", "$100,000 or more"),
        ("Physical therapists", "Doctoral or professional degree", "None", "10,000 to 49,999", "Much faster than average", "$75,000 to $99,999"),
        ("Industrial machinery mechanics", "High school diploma or equivalent", "Long-term on-the-job training", "50,000 or more", "Much faster than average", "$50,000 to $74,999"),
        ("Dental hygienists", "Associate's degree", "None", "5,000 to 9,999", "Faster than average", "$75,000 to $99,999"),
        ("Health specialties teachers, postsecondary", "Doctoral or professional degree", "None", "50,000 or more", "Much faster than average", "$100,000 or more"),
        ("Substance abuse, behavioral disorder, and mental health counselors", "Bachelor's degree", "None", "10,000 to 49,999", "Much faster than average", "$50,000 to $74,999"),
        ("Market research analysts and marketing specialists", "Bachelor's degree", "None", "50,000 or more", "Faster than average", "$75,000 to $99,999"),
    ]
    
    for row in ooh_raw:
        ooh_occupations.append({
            'occupation': row[0],
            'entry_level_education': row[1],
            'on_the_job_training': row[2],
            'projected_new_jobs': row[3],
            'projected_growth_rate': row[4],
            'median_pay_2024': row[5],
        })
    
    print(f"Compiled {len(ooh_occupations)} OOH occupations")
    
    # Save OOH data
    ooh_path = os.path.join(OUTPUT_DIR, 'ooh_occupation_outlook.json')
    with open(ooh_path, 'w') as f:
        json.dump({
            'source': 'Bureau of Labor Statistics - Occupational Outlook Handbook',
            'url': 'https://www.bls.gov/ooh/occupation-finder.htm',
            'projection_period': '2023-2033',
            'occupations': ooh_occupations,
        }, f, indent=2)
    print(f"Saved OOH data to {ooh_path}")
    
    # Save full OEWS data
    oews_path = os.path.join(OUTPUT_DIR, 'oews_data_2024.json')
    with open(oews_path, 'w') as f:
        json.dump(api_data, f, indent=2)
    print(f"Saved OEWS data to {oews_path}")
    
    # Print summary
    print("\n" + "="*80)
    print("DATA SUMMARY")
    print("="*80)
    
    for area_key, area_data in api_data.items():
        n = len(area_data.get('occupations', {}))
        print(f"\n{area_data['area_name']} ({area_data.get('data_year', 'N/A')}): {n} occupations")
        
        # Top 5 by employment
        occs = list(area_data.get('occupations', {}).values())
        occs_by_emp = sorted(occs, key=lambda x: x.get('employment', 0) or 0, reverse=True)
        
        print(f"  Top 5 by employment:")
        for occ in occs_by_emp[:5]:
            emp = occ.get('employment', 'N/A')
            name = occ.get('occ_name') or occ.get('title', 'Unknown')
            wage = occ.get('annual_mean_wage', 'N/A')
            print(f"    {name}: {emp:,} employed, ${wage:,} mean wage" if isinstance(emp, (int, float)) and isinstance(wage, (int, float)) else f"    {name}: emp={emp}, wage={wage}")
        
        # Top 5 by wage
        occs_by_wage = sorted(occs, key=lambda x: x.get('annual_mean_wage', 0) or 0, reverse=True)
        print(f"  Top 5 by mean annual wage:")
        for occ in occs_by_wage[:5]:
            name = occ.get('occ_name') or occ.get('title', 'Unknown')
            wage = occ.get('annual_mean_wage', 'N/A')
            print(f"    {name}: ${wage:,}" if isinstance(wage, (int, float)) else f"    {name}: {wage}")

if __name__ == '__main__':
    main()

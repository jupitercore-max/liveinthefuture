#!/usr/bin/env python3
"""
Fetch latest College Scorecard data via API to supplement the bulk CSV.
This script will wait for rate limits to clear and retry.
Run with: python3 fetch_api_data.py
"""
import csv
import json
import os
import sys
import time
import urllib.request
import urllib.parse

API_BASE = "https://api.data.gov/ed/collegescorecard/v1/schools"
API_KEY = "DEMO_KEY"
PER_PAGE = 100
OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))
PROGRESS_FILE = os.path.join(OUTPUT_DIR, ".api_progress.json")

FIELDS = {
    "id": "UNITID",
    "school.name": "INSTNM",
    "school.state": "STABBR",
    "school.city": "CITY",
    "school.school_url": "INSTURL",
    "school.ownership": "CONTROL",
    "school.carnegie_basic": "CCBASIC",
    "school.locale": "LOCALE",
    "school.degrees_awarded.predominant": "PREDDEG",
    "school.degrees_awarded.highest": "HIGHDEG",
    "school.region_id": "REGION",
    "school.zip": "ZIP",
    "latest.admissions.admission_rate.overall": "ADM_RATE",
    "latest.admissions.sat_scores.average.overall": "SAT_AVG",
    "latest.admissions.act_scores.midpoint.cumulative": "ACTCMMID",
    "latest.student.size": "UGDS",
    "latest.completion.completion_rate_4yr_150nt": "C150_4",
    "latest.earnings.10_yrs_after_entry.median": "MD_EARN_WNE_P10",
    "latest.cost.avg_net_price.overall": "NPT4_PUB_PRIV",
    "latest.cost.tuition.in_state": "TUITIONFEE_IN",
    "latest.cost.tuition.out_of_state": "TUITIONFEE_OUT",
    "latest.cost.attendance.academic_year": "COSTT4_A",
    "latest.aid.median_debt.completers.overall": "DEBT_MDN",
    "latest.aid.pell_grant_rate": "PCTPELL",
    "latest.student.retention_rate.four_year.full_time": "RET_FT4",
    "school.accreditor": "ACCREDAGENCY",
}

CSV_HEADERS = list(FIELDS.values())

def fetch_page(page):
    params = {
        "api_key": API_KEY,
        "fields": ",".join(FIELDS.keys()),
        "per_page": PER_PAGE,
        "page": page,
    }
    url = f"{API_BASE}?{urllib.parse.urlencode(params)}"
    
    for attempt in range(10):
        try:
            req = urllib.request.Request(url)
            with urllib.request.urlopen(req, timeout=30) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            if e.code == 429:
                wait = min(300, (2 ** attempt) * 10)
                print(f"  Rate limited (attempt {attempt+1}). Waiting {wait}s...", flush=True)
                time.sleep(wait)
            else:
                time.sleep((attempt + 1) * 5)
        except Exception as e:
            time.sleep((attempt + 1) * 5)
    raise Exception(f"Failed page {page} after 10 attempts")

def load_progress():
    if os.path.exists(PROGRESS_FILE):
        with open(PROGRESS_FILE) as f:
            return json.load(f)
    return {"last_page": -1, "results": []}

def save_progress(page, results):
    with open(PROGRESS_FILE, "w") as f:
        json.dump({"last_page": page, "results": results}, f)

def main():
    progress = load_progress()
    start_page = progress["last_page"] + 1
    all_results = progress["results"]
    
    if start_page > 0:
        print(f"Resuming from page {start_page} ({len(all_results)} records)")
    
    # Get total
    data = fetch_page(0)
    total = data["metadata"]["total"]
    total_pages = (total + PER_PAGE - 1) // PER_PAGE
    
    if start_page == 0:
        all_results = data["results"]
        save_progress(0, all_results)
        start_page = 1
        time.sleep(4)
    
    print(f"Total: {total}, pages: {total_pages}")
    
    for page in range(start_page, total_pages):
        print(f"Page {page}/{total_pages-1} ({len(all_results)}/{total})...", flush=True)
        data = fetch_page(page)
        all_results.extend(data["results"])
        save_progress(page, all_results)
        time.sleep(4)  # ~15 requests/min = 900/hr, under 1000/hr limit
    
    # Write CSV
    out = os.path.join(OUTPUT_DIR, "scorecard-api-latest.csv")
    with open(out, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=CSV_HEADERS)
        writer.writeheader()
        for record in all_results:
            row = {v: record.get(k, "") for k, v in FIELDS.items()}
            for k in row:
                if row[k] is None:
                    row[k] = ""
            writer.writerow(row)
    
    print(f"Done! {len(all_results)} rows -> {out}")
    os.remove(PROGRESS_FILE)

if __name__ == "__main__":
    main()

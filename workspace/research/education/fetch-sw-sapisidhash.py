#!/usr/bin/env python3
"""Fetch all 2195 space watch records using SAPISIDHASH auth."""
import hashlib
import json
import os
import sys
import time
import urllib.request
import ssl

SAPISID = "4G1Z4uG35HCk-0EE/ArwjZDIYxDZtyEca5"
ORIGIN = "https://lookerstudio.google.com"
OUTDIR = "/home/hatch/workspace/research/education/sw-pages"

COOKIE = 'RAP_XSRF_TOKEN=AImk1AIB67NSWSY49dLIOWzIYDI9i3nLiQ:1775961635955; __Secure-BUCKET=COsF; S=sso=KunDeWSXAFRvRQZG4X5T5v2VJpKXHKu2:billing-ui-v3=_FywANfoGwtF7cxpDzV39Wy_wUrydR1w:billing-ui-v3-efe=_FywANfoGwtF7cxpDzV39Wy_wUrydR1w; HSID=AiSCU5jG_6dxFlf4C; SSID=AtfSoi8angbau_p1I; APISID=Pt391-1yJWJjbtV5/AVwHUzf4F5oKezevv; SAPISID=4G1Z4uG35HCk-0EE/ArwjZDIYxDZtyEca5; __Secure-1PAPISID=4G1Z4uG35HCk-0EE/ArwjZDIYxDZtyEca5; __Secure-3PAPISID=4G1Z4uG35HCk-0EE/ArwjZDIYxDZtyEca5; SID=g.a0008wh0qUMwoU2d4eJ-L7oS9GEe6EdAq0u1miaU7yp_T2Z1atUD96w6UTLTJubi_QqsYd_jygACgYKAVkSARMSFQHGX2MicfmZE9B45mqsF0XLz6lhAxoVAUF8yKojhN-1e_9H8C1Ymq8HaCA90076; __Secure-1PSID=g.a0008wh0qUMwoU2d4eJ-L7oS9GEe6EdAq0u1miaU7yp_T2Z1atUDr0dv0G_hkcRP6bLP3qf84AACgYKAX0SARMSFQHGX2Miq2HETSYUq1W5nIf-hq8QNRoVAUF8yKq5gQ4Djb83vTGr_KCL5K1J0076; __Secure-3PSID=g.a0008wh0qUMwoU2d4eJ-L7oS9GEe6EdAq0u1miaU7yp_T2Z1atUDa0LVWbIeRw2zF_AxeafdHQACgYKAYMSARMSFQHGX2MiTVQ02sydwK7vivxZLrn0jRoVAUF8yKrrrRbtt_Rp3GmpjomhYbrt0076; SEARCH_SAMESITE=CgQIy6AB; AEC=AaJma5sWZRFHozVyA6jbQA6wTF-5sRS9KjONyxVTreSw2UoawadhCzqYGlI; NID=530=LF74wE0tI-7G5N2Knd_nLqBNzsztNEjvWRo3nZGX2xd-gtDSlL09PLucs-PU4Yvt-gQPTDl-nU0kQHsa6_VxXqCI4mu6R8CYhsvYmpYbSCFI1hrS7Uh1Wvzg821C7KXcTJ_IAFV-feyGujRgAP01F7zWR5Y8FM6fNVpDINfDtXBXBNUPT5BA34ef3eqEsWYEKWRo1hbnFGQIYySDZusiTzQBEOuRN4QJbZ7DAJ6PiXFWIvedfg2LIEIPSdQ2h6TqskHnhswkmihelgvzSgq4asbKg5h3Pl9SrX4BB8EkxgaFk5SLHLJXyShrICrq_p9ChiTmkD1_v4uYr5mJ9Xs5KxFEJYieaKr66yQ_UXM74kdq0EY8mvvWkdcDu6sbnRc9H6EoiFTsA9tkt1lCPwJLct4_no54_a18SnkkvmT2bii2y5a4lL3hHi4mEBWsyvxp6ocl3laRN2lu9-OTZ2FeIC5NoTnDXONEJ9968zobSSHHlh5wQxbzQ_xas_J8b1fYsXx_ZlRisycSqESbscQgRgSupmoqk2I0BPhvhc97FSTkoy047XGEFZPgNWHvz25_nUag1yA3xbGdSR7EebnaysfTnOT9wFeIJNLpZ6mj2wjPAif0Za_nwve0Uar7riOyEwoFpTKikMept4Hh2IB-ESqQ-TT1gLnrWDoZqohr0dLm_AuXjU5OXsIN6MojB1D5LOD7ZMnAnZyKTuU3bAUhd7JdWZMt_HbDVdnBGgbzX1tF0l0eS8zNVxbXZFZAoj5RDv4LuvjcCxGPNXDZzMO4-fMbg3Xb3IiXsEMLJ1sitPR8xzHI09nCJXU_Zcrp8VWRE9px7GRU0S4KnK09kgR-RPNbMzcaA8z_O_fpmlZKXTxHZOySvkibAyIognlu2dmTpzQQsh7PP5y8pZI7HYOrOOwA6ZNDxjwPS02Qq5FKk5UWebfTh7WFi1_3pHhXKHK29ff23voC8dOxO1NXqrjYazvK5d2MaqJ-k6Mkf4RcgeR1-IWc8SnUELhj9PO9ZHYQ_4OdTwcr_YI21iHbj3lGZ60hDajS_Lf_8RrqkU2uPXi-MOO7H4Nj3PIsB71uAnYDZKA4HagPuYSsdFpGOTxw-1AxI8KSEb9caKywFF0u3NKWhnVV3wrT1QZSs4O3R5Feb6ed38cQ4m7T5g3Yp0fta8I84fROfepjz_4iX4BS8ffck9OMlXWFIsUX28nq63eFCvFAaClmrsM8JfdW8_zxrcrbX0q9FDBdw1myc9Escs2yS0qv7wPuqSVh4cjCSdOp_leoCsSYw0ffUWWi325gJJbbBiM-rkCowQcogtSMY9x1MmrNfl7W1LpJZsi7uE2ons1B68TZguPHqbN3yO4AiZxFo9CElWRyJrAJOyCus_Y3Op5NGfxe_IWc42aP8jHRHng1lSoi_aAoIH07j7zVaGa4THvKursRuzNixgde1X642u-ypc6i2ByF0JM9V88qmdL_416gnLzyHU8ejtucBZ-tbUqGPGfeWA86IfVjKda7ynMC17iZC_Xu2AzAqt5TxMe0dnpIiPlwNz7u4pDWh5O9w7yhpdyGvItcx4ny4VFFjhsqCgQf22w8qdOwSVGh9YnMFAqgQfcfcpykRUDAOQteAMQjBWmmFLS9bGMP8DXtuqnfSJCFLwMPu9_IoXm0ThNW; _gid=GA1.3.1376432739.1775960862; __Secure-1PSIDTS=sidts-CjEBWhotCeA4udkn-4FZeao9Vi7WmE1WRWl6WzbjMB3r9F2WqnzGCP7c8wWzPVpfG2K0EAA; __Secure-3PSIDTS=sidts-CjEBWhotCeA4udkn-4FZeao9Vi7WmE1WRWl6WzbjMB3r9F2WqnzGCP7c8wWzPVpfG2K0EAA; _gat=1; _ga=GA1.3.1685329185.1775872945; _gat_marketingTracker=1; _ga_S4FJY0X3VX=GS2.1.s1775960862$o2$g1$t1775961637$j58$l0$h0; SIDCC=AKEyXzWNSUr1qDqJCssviG3hk4Qrhc3dpgw73YR6ZTztzWMLnbzeZuLVl5kRdj49y6KyW5-aJkvH; __Secure-1PSIDCC=AKEyXzW9p5b7-S8SXgrTeLY3DckZ4c1kXdA64n8Al7de5mjjjgk1bphnFmhhIRqcg0n-f2QT8w8; __Secure-3PSIDCC=AKEyXzUR7-OpqAlSEzfCLq6t5gNtW4HwBMptu65zBMGq4Tp_JJ6FJWXrJASY2n8JY-N5c1Ce6SHmvA'

XSRF = 'AImk1AIB67NSWSY49dLIOWzIYDI9i3nLiQ:1775961635955'

def make_sapisidhash():
    """Compute SAPISIDHASH like Chrome does."""
    ts = str(int(time.time()))
    to_hash = f"{ts} {SAPISID} {ORIGIN}"
    h = hashlib.sha1(to_hash.encode()).hexdigest()
    return f"SAPISIDHASH {ts}_{h}"

BODY_TEMPLATE = {
    "dataRequest": [{
        "requestContext": {
            "reportContext": {
                "reportId": "40738bd5-c07f-41f2-aaad-ca5b0aaf9602",
                "pageId": "19612919",
                "mode": 1,
                "componentId": "cd-cn064tvjac",
                "displayType": "simple-table"
            },
            "requestMode": 0
        },
        "datasetSpec": {
            "dataset": [{"datasourceId": "0ee24891-82ed-4d91-b700-8269249e2070", "revisionNumber": 0, "parameterOverrides": []}],
            "queryFields": [
                {"name": "qt_as80o7ulac", "datasetNs": "d0", "tableNs": "t0", "dataTransformation": {"sourceFieldName": "_n453118496_"}},
                {"name": "qt_4r138uvjac", "datasetNs": "d0", "tableNs": "t0", "dataTransformation": {"sourceFieldName": "_46385375_"}},
                {"name": "qt_b0kf4vvjac", "datasetNs": "d0", "tableNs": "t0", "dataTransformation": {"sourceFieldName": "_1443119246_"}},
                {"name": "qt_cs9qawvjac", "datasetNs": "d0", "tableNs": "t0", "dataTransformation": {"sourceFieldName": "_n1678783089_"}},
                {"name": "qt_5t96ewvjac", "datasetNs": "d0", "tableNs": "t0", "dataTransformation": {"sourceFieldName": "_2390542_"}},
                {"name": "qt_ar29gwvjac", "datasetNs": "d0", "tableNs": "t0", "dataTransformation": {"sourceFieldName": "_74517257_"}},
                {"name": "qt_e3z8qwvjac", "datasetNs": "d0", "tableNs": "t0", "dataTransformation": {"sourceFieldName": "_n332634515_"}},
                {"name": "qt_nzuiwwvjac", "datasetNs": "d0", "tableNs": "t0", "dataTransformation": {"sourceFieldName": "_1208448639_", "aggregation": 0}},
                {"name": "qt_5c5nlwvjac", "datasetNs": "d0", "tableNs": "t0", "dataTransformation": {"sourceFieldName": "_83847087_"}},
                {"name": "qt_poj9x9vlac", "datasetNs": "d0", "tableNs": "t0", "dataTransformation": {"sourceFieldName": "calc_23m548vlac"}},
                {"name": "qt_t1aa7tvlac", "datasetNs": "d0", "tableNs": "t0", "dataTransformation": {"sourceFieldName": "calc_9zy2pobk9b"}},
                {"name": "qt_uyvsoxvjac", "datasetNs": "d0", "tableNs": "t0", "dataTransformation": {"sourceFieldName": "calc_hx2wi7ak9b"}},
                {"name": "qt_yzi41xvjac", "datasetNs": "d0", "tableNs": "t0", "dataTransformation": {"sourceFieldName": "calc_g6z2opbk9b"}}
            ],
            "sortData": [
                {"sortColumn": {"name": "qt_b0kf4vvjac", "datasetNs": "d0", "tableNs": "t0", "dataTransformation": {"sourceFieldName": "_1443119246_"}}, "sortDir": 0},
                {"sortColumn": {"name": "qt_as80o7ulac", "datasetNs": "d0", "tableNs": "t0", "dataTransformation": {"sourceFieldName": "_n453118496_"}}, "sortDir": 0}
            ],
            "includeRowsCount": True,
            "relatedDimensionMask": {"addDisplay": False, "addUniqueId": False, "addLatLong": False},
            "paginateInfo": {"startRow": 0, "rowsCount": 25},
            "dsFilterOverrides": [],
            "filters": [],
            "features": [],
            "dateRanges": [],
            "contextNsCount": 1,
            "calculatedField": [],
            "needGeocoding": False,
            "geoFieldMask": [],
            "multipleGeocodeFields": [],
            "timezone": "America/Los_Angeles"
        },
        "role": "main",
        "retryHints": {"useClientControlledRetry": True, "isLastRetry": False, "retryCount": 0, "originalRequestId": "cd-cn064tvjac_0_0"}
    }]
}

FIELDS = ["Astronaut", "Country", "Mission", "Year", "Agency", "Watch_Make", "Watch_Model", "Reference", "Movement_Type", "Dial_Color", "Image_URL", "Notes", "Source"]

def fetch_page(start_row, rows_count=25):
    """Fetch one page of data."""
    body = json.loads(json.dumps(BODY_TEMPLATE))
    body["dataRequest"][0]["datasetSpec"]["paginateInfo"]["startRow"] = start_row
    body["dataRequest"][0]["datasetSpec"]["paginateInfo"]["rowsCount"] = rows_count
    
    data = json.dumps(body).encode()
    
    req = urllib.request.Request(
        "https://lookerstudio.google.com/u/0/batchedDataV2?appVersion=20260330_0701",
        data=data,
        method="POST"
    )
    req.add_header("accept", "application/json, text/plain, */*")
    req.add_header("content-type", "application/json")
    req.add_header("cookie", COOKIE)
    req.add_header("origin", ORIGIN)
    req.add_header("referer", "https://lookerstudio.google.com/u/0/reporting/40738bd5-c07f-41f2-aaad-ca5b0aaf9602/page/ZNSUB")
    req.add_header("user-agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36")
    req.add_header("x-rap-xsrf-token", XSRF)
    req.add_header("authorization", make_sapisidhash())
    req.add_header("x-browser-channel", "stable")
    req.add_header("x-browser-copyright", "Copyright 2026 Google LLC. All Rights reserved.")
    req.add_header("x-browser-validation", "jb22yUkoV3Npo3n6tSAI1eU+2lE=")
    req.add_header("x-browser-year", "2026")
    req.add_header("x-client-data", "CKmdygEIk6HLAQiGoM0BCNi7zwEIlrzPAQiIvs8BCLG+zwEIkL/PAQjGv88BGLGKzwEY1b3PAQ==")
    
    ctx = ssl.create_default_context()
    
    try:
        resp = urllib.request.urlopen(req, context=ctx, timeout=30)
        raw = resp.read().decode()
        # Strip Looker Studio prefix
        if raw.startswith(")]}'"):
            raw = raw[4:].strip()
        return json.loads(raw)
    except urllib.error.HTTPError as e:
        print(f"  HTTP {e.code} for startRow={start_row}", file=sys.stderr)
        body = e.read().decode()
        if start_row == 0:
            print(f"  Response: {body[:200]}", file=sys.stderr)
        return None

def parse_page(data):
    """Extract records from Looker Studio response."""
    records = []
    try:
        cols = data["dataSubset"][0]["dataset"]["tableDataset"]["column"]
        # Determine row count from first column
        first_col = cols[0]
        col_key = None
        for k in first_col:
            if k.endswith("Column"):
                col_key = k
                break
        if not col_key:
            return records
        
        num_rows = len(first_col[col_key]["values"])
        
        for i in range(num_rows):
            row = {}
            for ci, col in enumerate(cols):
                for k in col:
                    if k.endswith("Column"):
                        vals = col[k]["values"]
                        if i < len(vals):
                            row[FIELDS[ci]] = vals[i] if vals[i] is not None else ""
                        else:
                            row[FIELDS[ci]] = ""
                        break
            records.append(row)
    except (KeyError, IndexError) as e:
        print(f"  Parse error: {e}", file=sys.stderr)
    return records

def main():
    os.makedirs(OUTDIR, exist_ok=True)
    all_records = []
    
    # Test first page
    print("Testing page 0 with SAPISIDHASH auth...")
    data = fetch_page(0, 25)
    if data is None or "errorStatus" in data:
        print(f"Auth failed: {data}")
        print("Cookies expired. Need fresh cookies from Ray.")
        sys.exit(1)
    
    records = parse_page(data)
    print(f"Page 0: {len(records)} records")
    all_records.extend(records)
    
    # Fetch remaining 87 pages
    for start in range(25, 2200, 25):
        data = fetch_page(start, 25)
        if data is None or "errorStatus" in data:
            print(f"Failed at startRow={start}, got {len(all_records)} total so far")
            break
        records = parse_page(data)
        all_records.extend(records)
        print(f"Page {start//25}: startRow={start}, got {len(records)} records (total: {len(all_records)})")
        time.sleep(0.1)  # Small delay to not hammer
    
    print(f"\nTotal records: {len(all_records)}")
    
    # Save JSON
    out_json = "/home/hatch/workspace/research/education/space-watches-full.json"
    with open(out_json, "w") as f:
        json.dump(all_records, f, indent=2)
    print(f"Saved to {out_json}")
    
    # Save CSV
    out_csv = "/home/hatch/workspace/research/education/space-watches-full.csv"
    import csv
    with open(out_csv, "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=FIELDS)
        w.writeheader()
        w.writerows(all_records)
    print(f"Saved to {out_csv}")

if __name__ == "__main__":
    main()

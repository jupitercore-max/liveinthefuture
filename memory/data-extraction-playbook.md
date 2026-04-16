# Data Extraction Playbook

## Looker Studio / Google Data Studio Reports
**Problem:** Looker Studio renders data on canvas, no CSV export, paginated 25 rows at a time, cookies expire in minutes.
**Failed approaches:**
1. Browser scraping (page-by-page click) — canvas re-renders get exponentially slower, breaks after ~20 pages
2. Replaying curl with copied cookies — SIDCC/PSIDCC cookies expire in 1-5 minutes, always stale by the time we run
3. SAPISIDHASH auth — bypasses 401 but returns `column: [], size: 0` without valid session cookies

**Working approach: Browser console injection**
1. Give user a self-contained JS snippet to paste in browser DevTools console while on the report page
2. Script reads XSRF token from `document.cookie`, uses `fetch()` with `credentials: 'include'` (browser handles all auth)
3. Paginates through all pages (25 rows each), collects into array, downloads as JSON blob
4. No cookie expiry issues — browser maintains the live session
5. Template saved at: `workspace/research/education/space-watches-console-extract.js`

**Key API details:**
- Endpoint: `/u/0/batchedDataV2?appVersion=YYYYMMDD_HHMM`
- Method: POST, body contains `dataRequest[].datasetSpec.paginateInfo.startRow`
- Response prefix: `)]}'\n` — strip before JSON.parse
- Data path: `dataResponse[0].dataSubset[0].dataset.tableDataset.column[]`
- Each column has a `*Column.values[]` array
- Max per page: 25 rows (2500 returns empty)
- Field IDs in `queryFields` are opaque — must inspect actual data to determine column mapping

**Generalizable to:** Any Google-authenticated data platform with API calls (Looker Studio, possibly Google Sheets API with OAuth, Tableau Public with similar patterns). The core technique — inject JS in the authenticated browser context to bypass cookie/session expiry — works for any platform where the user has a live authenticated session.

## UCOP Tableau
- 3-step: session → export-crosstab → tempfile CSV
- Blocked by browser CLI --download-dir gap
- PRA drafted for publicrecords@ucop.edu as fallback

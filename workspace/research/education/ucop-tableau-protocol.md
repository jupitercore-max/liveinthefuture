# UCOP Tableau Data Extraction Protocol

## Working Tableau Server Endpoints (UCOP)

Base: `https://visualizedata.ucop.edu`
View: `/t/Public/views/AdmissionsDataTable/FREthbyYr`

### Step 1: Navigate + Get Session
Navigate to `{base}/t/Public/views/AdmissionsDataTable/FREthbyYr?:embed=y&:showVizHome=no`
Wait 12s for load.
Session ID found in `performance.getEntriesByType('resource')` matching `/sessions/([A-F0-9]+-\d+:\d+)/`

### Step 2: Trigger CSV Export
POST to: `{base}/vizql/t/Public/w/AdmissionsDataTable/v/FREthbyYr/sessions/{sessionId}/commands/tabsrv/export-crosstab-to-csvserver`
Body: `sheetdisplayname=FR+ENR`
Response contains: `genExportFilePresModel.resultKey` (e.g., "2580021475")

### Step 3: Download CSV File
GET: `{base}/vizql/t/Public/w/AdmissionsDataTable/v/FREthbyYr/tempfile/sessions/{sessionId}/{resultKey}.csv`
⚠️ This URL forces Content-Disposition: attachment — must be handled by browser download manager, NOT XHR.

### Headless Browser Requirements
- Chrome must have `--download-directory` set
- OR use Playwright `page.on('download')` event
- The Hatch `browser` CLI does NOT support download directory (feature gap)

### View Tabs Available
- `FREthbyYr` — Fall freshmen by race/ethnicity, year, campus (default)
- `FRApplicantsByYr` — Applicants by year
- `FRAdmitsByYr` — Admits by year
- `FREnrolleesByYr` — Enrollees by year

### Filters
- School type: California public, California private, Non-CA domestic, Foreign, Other
- Fall term: 2015-2025
- School: text search
- Campus: UC Berkeley through UC Santa Cruz + Universitywide
- City/County: text search

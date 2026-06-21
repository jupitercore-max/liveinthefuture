// SPACE WATCHES FULL EXTRACT - Paste this in browser console on the Looker Studio page
// It fires 88 requests (25 rows each) and downloads the complete dataset as JSON

(async () => {
  const TOTAL = 2195;
  const PAGE_SIZE = 25;
  const PAGES = Math.ceil(TOTAL / PAGE_SIZE);
  
  // Get XSRF token from cookie
  const xsrf = document.cookie.split(';').map(c => c.trim())
    .find(c => c.startsWith('RAP_XSRF_TOKEN='))?.split('=').slice(1).join('=');
  
  if (!xsrf) { console.error('No XSRF token found'); return; }
  console.log(`Found XSRF token. Fetching ${PAGES} pages...`);

  const bodyTemplate = {"dataRequest":[{"requestContext":{"reportContext":{"reportId":"40738bd5-c07f-41f2-aaad-ca5b0aaf9602","pageId":"19612919","mode":1,"componentId":"cd-cn064tvjac","displayType":"simple-table"},"requestMode":0},"datasetSpec":{"dataset":[{"datasourceId":"0ee24891-82ed-4d91-b700-8269249e2070","revisionNumber":0,"parameterOverrides":[]}],"queryFields":[{"name":"qt_as80o7ulac","datasetNs":"d0","tableNs":"t0","dataTransformation":{"sourceFieldName":"_n453118496_"}},{"name":"qt_4r138uvjac","datasetNs":"d0","tableNs":"t0","dataTransformation":{"sourceFieldName":"_46385375_"}},{"name":"qt_b0kf4vvjac","datasetNs":"d0","tableNs":"t0","dataTransformation":{"sourceFieldName":"_1443119246_"}},{"name":"qt_cs9qawvjac","datasetNs":"d0","tableNs":"t0","dataTransformation":{"sourceFieldName":"_n1678783089_"}},{"name":"qt_5t96ewvjac","datasetNs":"d0","tableNs":"t0","dataTransformation":{"sourceFieldName":"_2390542_"}},{"name":"qt_ar29gwvjac","datasetNs":"d0","tableNs":"t0","dataTransformation":{"sourceFieldName":"_74517257_"}},{"name":"qt_e3z8qwvjac","datasetNs":"d0","tableNs":"t0","dataTransformation":{"sourceFieldName":"_n332634515_"}},{"name":"qt_nzuiwwvjac","datasetNs":"d0","tableNs":"t0","dataTransformation":{"sourceFieldName":"_1208448639_","aggregation":0}},{"name":"qt_5c5nlwvjac","datasetNs":"d0","tableNs":"t0","dataTransformation":{"sourceFieldName":"_83847087_"}},{"name":"qt_poj9x9vlac","datasetNs":"d0","tableNs":"t0","dataTransformation":{"sourceFieldName":"calc_23m548vlac"}},{"name":"qt_t1aa7tvlac","datasetNs":"d0","tableNs":"t0","dataTransformation":{"sourceFieldName":"calc_9zy2pobk9b"}},{"name":"qt_uyvsoxvjac","datasetNs":"d0","tableNs":"t0","dataTransformation":{"sourceFieldName":"calc_hx2wi7ak9b"}},{"name":"qt_yzi41xvjac","datasetNs":"d0","tableNs":"t0","dataTransformation":{"sourceFieldName":"calc_g6z2opbk9b"}}],"sortData":[{"sortColumn":{"name":"qt_b0kf4vvjac","datasetNs":"d0","tableNs":"t0","dataTransformation":{"sourceFieldName":"_1443119246_"}},"sortDir":0},{"sortColumn":{"name":"qt_as80o7ulac","datasetNs":"d0","tableNs":"t0","dataTransformation":{"sourceFieldName":"_n453118496_"}},"sortDir":0}],"includeRowsCount":true,"relatedDimensionMask":{"addDisplay":false,"addUniqueId":false,"addLatLong":false},"paginateInfo":{"startRow":0,"rowsCount":25},"dsFilterOverrides":[],"filters":[],"features":[],"dateRanges":[],"contextNsCount":1,"calculatedField":[],"needGeocoding":false,"geoFieldMask":[],"multipleGeocodeFields":[],"timezone":"America/Los_Angeles"},"role":"main","retryHints":{"useClientControlledRetry":true,"isLastRetry":false,"retryCount":0,"originalRequestId":"cd-cn064tvjac_0_0"}}]};

  const FIELDS = ["Astronaut","Country","Mission","Year","Agency","Watch_Make","Watch_Model","Reference","Movement_Type","Dial_Color","Image_URL","Notes","Source"];
  
  const allRecords = [];
  let failures = 0;
  
  for (let page = 0; page < PAGES; page++) {
    const startRow = page * PAGE_SIZE;
    const body = JSON.parse(JSON.stringify(bodyTemplate));
    body.dataRequest[0].datasetSpec.paginateInfo.startRow = startRow;
    
    try {
      const resp = await fetch('/u/0/batchedDataV2?appVersion=20260330_0701', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-rap-xsrf-token': xsrf
        },
        body: JSON.stringify(body),
        credentials: 'include'
      });
      
      let text = await resp.text();
      if (text.startsWith(")]}'")) text = text.slice(4).trim();
      const data = JSON.parse(text);
      
      // Navigate the response structure
      const subset = data.dataResponse?.[0]?.dataSubset?.[0] || data.dataSubset?.[0];
      if (!subset) { console.warn(`Page ${page}: no dataSubset`); failures++; continue; }
      
      const cols = subset.dataset?.tableDataset?.column;
      if (!cols || cols.length === 0) { console.warn(`Page ${page}: empty columns`); failures++; continue; }
      
      // Find first column to determine row count
      let numRows = 0;
      for (const col of cols) {
        for (const key of Object.keys(col)) {
          if (key.endsWith('Column') && col[key].values) {
            numRows = col[key].values.length;
            break;
          }
        }
        if (numRows > 0) break;
      }
      
      for (let i = 0; i < numRows; i++) {
        const row = {};
        for (let ci = 0; ci < cols.length && ci < FIELDS.length; ci++) {
          const col = cols[ci];
          for (const key of Object.keys(col)) {
            if (key.endsWith('Column') && col[key].values) {
              row[FIELDS[ci]] = col[key].values[i] ?? '';
              break;
            }
          }
        }
        allRecords.push(row);
      }
      
      console.log(`Page ${page}/${PAGES-1}: startRow=${startRow}, got ${numRows} rows (total: ${allRecords.length})`);
    } catch (e) {
      console.error(`Page ${page} failed:`, e);
      failures++;
    }
    
    // Small delay to be nice
    await new Promise(r => setTimeout(r, 100));
  }
  
  console.log(`\n✅ Done! ${allRecords.length} records, ${failures} failures`);
  
  // Download as JSON
  const blob = new Blob([JSON.stringify(allRecords, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'space-watches-full.json';
  a.click();
  URL.revokeObjectURL(url);
  
  console.log('📁 Downloaded space-watches-full.json');
})();

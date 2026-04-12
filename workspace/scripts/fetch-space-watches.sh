#!/bin/bash
# Fetch all 2195 space watch records from Looker Studio API in chunks of 100
OUTDIR="/tmp/space-watches-pages"
mkdir -p "$OUTDIR"

COOKIES='RAP_XSRF_TOKEN=AImk1AL75qCV4DJSAxtZUoAvgH3XATL5Mw:1775960900180; __Secure-BUCKET=COsF; S=sso=KunDeWSXAFRvRQZG4X5T5v2VJpKXHKu2:billing-ui-v3=_FywANfoGwtF7cxpDzV39Wy_wUrydR1w:billing-ui-v3-efe=_FywANfoGwtF7cxpDzV39Wy_wUrydR1w; HSID=AiSCU5jG_6dxFlf4C; SSID=AtfSoi8angbau_p1I; APISID=Pt391-1yJWJjbtV5/AVwHUzf4F5oKezevv; SAPISID=4G1Z4uG35HCk-0EE/ArwjZDIYxDZtyEca5; __Secure-1PAPISID=4G1Z4uG35HCk-0EE/ArwjZDIYxDZtyEca5; __Secure-3PAPISID=4G1Z4uG35HCk-0EE/ArwjZDIYxDZtyEca5; SID=g.a0008wh0qUMwoU2d4eJ-L7oS9GEe6EdAq0u1miaU7yp_T2Z1atUD96w6UTLTJubi_QqsYd_jygACgYKAVkSARMSFQHGX2MicfmZE9B45mqsF0XLz6lhAxoVAUF8yKojhN-1e_9H8C1Ymq8HaCA90076; __Secure-1PSID=g.a0008wh0qUMwoU2d4eJ-L7oS9GEe6EdAq0u1miaU7yp_T2Z1atUDr0dv0G_hkcRP6bLP3qf84AACgYKAX0SARMSFQHGX2Miq2HETSYUq1W5nIf-hq8QNRoVAUF8yKq5gQ4Djb83vTGr_KCL5K1J0076; __Secure-3PSID=g.a0008wh0qUMwoU2d4eJ-L7oS9GEe6EdAq0u1miaU7yp_T2Z1atUDa0LVWbIeRw2zF_AxeafdHQACgYKAYMSARMSFQHGX2MiTVQ02sydwK7vivxZLrn0jRoVAUF8yKrrrRbtt_Rp3GmpjomhYbrt0076; SEARCH_SAMESITE=CgQIy6AB; AEC=AaJma5sWZRFHozVyA6jbQA6wTF-5sRS9KjONyxVTreSw2UoawadhCzqYGlI; NID=530=LF74wE0tI-7G5N2Knd_nLqBNzsztNEjvWRo3nZGX2xd-gtDSlL09PLucs-PU4Yvt-gQPTDl-nU0kQHsa6_VxXqCI4mu6R8CYhsvYmpYbSCFI1hrS7Uh1Wvzg821C7KXcTJ_IAFV-feyGujRgAP01F7zWR5Y8FM6fNVpDINfDtXBXBNUPT5BA34ef3eqEsWYEKWRo1hbnFGQIYySDZusiTzQBEOuRN4QJbZ7DAJ6PiXFWIvedfg2LIEIPSdQ2h6TqskHnhswkmihelgvzSgq4asbKg5h3Pl9SrX4BB8EkxgaFk5SLHLJXyShrICrq_p9ChiTmkD1_v4uYr5mJ9Xs5KxFEJYieaKr66yQ_UXM74kdq0EY8mvvWkdcDu6sbnRc9H6EoiFTsA9tkt1lCPwJLct4_no54_a18SnkkvmT2bii2y5a4lL3hHi4mEBWsyvxp6ocl3laRN2lu9-OTZ2FeIC5NoTnDXONEJ9968zobSSHHlh5wQxbzQ_xas_J8b1fYsXx_ZlRisycSqESbscQgRgSupmoqk2I0BPhvhc97FSTkoy047XGEFZPgNWHvz25_nUag1yA3xbGdSR7EebnaysfTnOT9wFeIJNLpZ6mj2wjPAif0Za_nwve0Uar7riOyEwoFpTKikMept4Hh2IB-ESqQ-TT1gLnrWDoZqohr0dLm_AuXjU5OXsIN6MojB1D5LOD7ZMnAnZyKTuU3bAUhd7JdWZMt_HbDVdnBGgbzX1tF0l0eS8zNVxbXZFZAoj5RDv4LuvjcCxGPNXDZzMO4-fMbg3Xb3IiXsEMLJ1sitPR8xzHI09nCJXU_Zcrp8VWRE9px7GRU0S4KnK09kgR-RPNbMzcaA8z_O_fpmlZKXTxHZOySvkibAyIognlu2dmTpzQQsh7PP5y8pZI7HYOrOOwA6ZNDxjwPS02Qq5FKk5UWebfTh7WFi1_3pHhXKHK29ff23voC8dOxO1NXqrjYazvK5d2MaqJ-k6Mkf4RcgeR1-IWc8SnUELhj9PO9ZHYQ_4OdTwcr_YI21iHbj3lGZ60hDajS_Lf_8RrqkU2uPXi-MOO7H4Nj3PIsB71uAnYDZKA4HagPuYSsdFpGOTxw-1AxI8KSEb9caKywFF0u3NKWhnVV3wrT1QZSs4O3R5Feb6ed38cQ4m7T5g3Yp0fta8I84fROfepjz_4iX4BS8ffck9OMlXWFIsUX28nq63eFCvFAaClmrsM8JfdW8_zxrcrbX0q9FDBdw1myc9Escs2yS0qv7wPuqSVh4cjCSdOp_leoCsSYw0ffUWWi325gJJbbBiM-rkCowQcogtSMY9x1MmrNfl7W1LpJZsi7uE2ons1B68TZguPHqbN3yO4AiZxFo9CElWRyJrAJOyCus_Y3Op5NGfxe_IWc42aP8jHRHng1lSoi_aAoIH07j7zVaGa4THvKursRuzNixgde1X642u-ypc6i2ByF0JM9V88qmdL_416gnLzyHU8ejtucBZ-tbUqGPGfeWA86IfVjKda7ynMC17iZC_Xu2AzAqt5TxMe0dnpIiPlwNz7u4pDWh5O9w7yhpdyGvItcx4ny4VFFjhsqCgQf22w8qdOwSVGh9YnMFAqgQfcfcpykRUDAOQteAMQjBWmmFLS9bGMP8DXtuqnfSJCFLwMPu9_IoXm0ThNW; __Secure-1PSIDTS=sidts-CjEBWhotCWSO1L0YAF7Ukw8b3a8JjZZPeWxYGOmL5Tyi65TcP4om5jg51cOVTRHpfKy3EAA; __Secure-3PSIDTS=sidts-CjEBWhotCWSO1L0YAF7Ukw8b3a8JjZZPeWxYGOmL5Tyi65TcP4om5jg51cOVTRHpfKy3EAA; _gid=GA1.3.1376432739.1775960862; _ga=GA1.3.1685329185.1775872945; __Secure-STRP=AEEP7gJHJeChdr7RBSVLBbVmUEqfqvtiP6AXr4dFUTc2zmjstpODAIVMWVYCKgWmLHhoP2mo06BBhQVz-bAvGaYXvkPsXuSCWTHV; _gat_marketingTracker=1; _ga_S4FJY0X3VX=GS2.1.s1775960862$o2$g1$t1775960975$j8$l0$h0; SIDCC=AKEyXzWLbvuf5dO-0XzhCkIFWXvwSHPMnhWVibjIhgt6KqCvl7QsNxEHz8mOZTU71FVegi-i8v97; __Secure-1PSIDCC=AKEyXzUJVI9Zdb4ZDUWjVsBtq6z523HdxfsX4wT14Ltu001H8I6JWAj26LlVC18hqnxkaVxg1cM; __Secure-3PSIDCC=AKEyXzVI8rMRi0AEhSRagya65btcTpDf_yknYNmajL2HOVuByMeoZhUlFZyJisGNN9hd5Oz0oOuXjA'

XSRF='AImk1AL75qCV4DJSAxtZUoAvgH3XATL5Mw:1775960900180'

TOTAL=2195
CHUNK=100
START=0

while [ $START -lt $TOTAL ]; do
  PAGE=$((START / CHUNK))
  echo "Fetching rows $START to $((START + CHUNK - 1)) (page $PAGE)..."
  
  curl -s 'https://lookerstudio.google.com/u/0/batchedDataV2?appVersion=20260330_0701' \
    -H 'accept: application/json, text/plain, */*' \
    -H 'content-type: application/json' \
    -b "$COOKIES" \
    -H 'origin: https://lookerstudio.google.com' \
    -H 'referer: https://lookerstudio.google.com/u/0/reporting/40738bd5-c07f-41f2-aaad-ca5b0aaf9602/page/ZNSUB' \
    -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36' \
    -H "x-rap-xsrf-token: $XSRF" \
    --data-raw "{\"dataRequest\":[{\"requestContext\":{\"reportContext\":{\"reportId\":\"40738bd5-c07f-41f2-aaad-ca5b0aaf9602\",\"pageId\":\"19612919\",\"mode\":1,\"componentId\":\"cd-cn064tvjac\",\"displayType\":\"simple-table\"},\"requestMode\":0},\"datasetSpec\":{\"dataset\":[{\"datasourceId\":\"0ee24891-82ed-4d91-b700-8269249e2070\",\"revisionNumber\":0,\"parameterOverrides\":[]}],\"queryFields\":[{\"name\":\"qt_as80o7ulac\",\"datasetNs\":\"d0\",\"tableNs\":\"t0\",\"dataTransformation\":{\"sourceFieldName\":\"_n453118496_\"}},{\"name\":\"qt_4r138uvjac\",\"datasetNs\":\"d0\",\"tableNs\":\"t0\",\"dataTransformation\":{\"sourceFieldName\":\"_46385375_\"}},{\"name\":\"qt_b0kf4vvjac\",\"datasetNs\":\"d0\",\"tableNs\":\"t0\",\"dataTransformation\":{\"sourceFieldName\":\"_1443119246_\"}},{\"name\":\"qt_cs9qawvjac\",\"datasetNs\":\"d0\",\"tableNs\":\"t0\",\"dataTransformation\":{\"sourceFieldName\":\"_n1678783089_\"}},{\"name\":\"qt_5t96ewvjac\",\"datasetNs\":\"d0\",\"tableNs\":\"t0\",\"dataTransformation\":{\"sourceFieldName\":\"_2390542_\"}},{\"name\":\"qt_ar29gwvjac\",\"datasetNs\":\"d0\",\"tableNs\":\"t0\",\"dataTransformation\":{\"sourceFieldName\":\"_74517257_\"}},{\"name\":\"qt_e3z8qwvjac\",\"datasetNs\":\"d0\",\"tableNs\":\"t0\",\"dataTransformation\":{\"sourceFieldName\":\"_n332634515_\"}},{\"name\":\"qt_nzuiwwvjac\",\"datasetNs\":\"d0\",\"tableNs\":\"t0\",\"dataTransformation\":{\"sourceFieldName\":\"_1208448639_\",\"aggregation\":0}},{\"name\":\"qt_5c5nlwvjac\",\"datasetNs\":\"d0\",\"tableNs\":\"t0\",\"dataTransformation\":{\"sourceFieldName\":\"_83847087_\"}},{\"name\":\"qt_poj9x9vlac\",\"datasetNs\":\"d0\",\"tableNs\":\"t0\",\"dataTransformation\":{\"sourceFieldName\":\"calc_23m548vlac\"}},{\"name\":\"qt_t1aa7tvlac\",\"datasetNs\":\"d0\",\"tableNs\":\"t0\",\"dataTransformation\":{\"sourceFieldName\":\"calc_9zy2pobk9b\"}},{\"name\":\"qt_uyvsoxvjac\",\"datasetNs\":\"d0\",\"tableNs\":\"t0\",\"dataTransformation\":{\"sourceFieldName\":\"calc_hx2wi7ak9b\"}},{\"name\":\"qt_yzi41xvjac\",\"datasetNs\":\"d0\",\"tableNs\":\"t0\",\"dataTransformation\":{\"sourceFieldName\":\"calc_g6z2opbk9b\"}}],\"sortData\":[{\"sortColumn\":{\"name\":\"qt_b0kf4vvjac\",\"datasetNs\":\"d0\",\"tableNs\":\"t0\",\"dataTransformation\":{\"sourceFieldName\":\"_1443119246_\"}},\"sortDir\":0},{\"sortColumn\":{\"name\":\"qt_as80o7ulac\",\"datasetNs\":\"d0\",\"tableNs\":\"t0\",\"dataTransformation\":{\"sourceFieldName\":\"_n453118496_\"}},\"sortDir\":0}],\"includeRowsCount\":true,\"relatedDimensionMask\":{\"addDisplay\":false,\"addUniqueId\":false,\"addLatLong\":false},\"paginateInfo\":{\"startRow\":$START,\"rowsCount\":$CHUNK},\"dsFilterOverrides\":[],\"filters\":[],\"features\":[],\"dateRanges\":[],\"contextNsCount\":1,\"calculatedField\":[],\"needGeocoding\":false,\"geoFieldMask\":[],\"multipleGeocodeFields\":[],\"timezone\":\"America/Los_Angeles\"},\"role\":\"main\",\"retryHints\":{\"useClientControlledRetry\":true,\"isLastRetry\":false,\"retryCount\":0,\"originalRequestId\":\"cd-cn064tvjac_0_0\"}}]}" \
    -o "$OUTDIR/page_${PAGE}.json"
  
  SIZE=$(python3 -c "
import json
with open('$OUTDIR/page_${PAGE}.json') as f:
    raw = f.read()
    if raw.startswith(\")]}'\"):
        raw = raw[5:]
    data = json.loads(raw)
    ds = data['dataResponse'][0]['dataSubset'][0]['dataset']['tableDataset']
    print(ds.get('size', 0))
" 2>/dev/null)
  
  echo "  Got $SIZE rows"
  
  if [ "$SIZE" = "0" ] || [ -z "$SIZE" ]; then
    echo "  ERROR: Got 0 rows at offset $START. Cookie may have expired."
    break
  fi
  
  START=$((START + CHUNK))
  sleep 0.3
done

echo "Done. Files in $OUTDIR/"
ls -la "$OUTDIR/"

---
id: space-watches-hydrate
enabled: true
mode: task
schedule:
  kind: interval
  timezone: UTC
  at: 2026-04-14T01:00:00Z
  every: 2h
metadata:
  originating_channel_context_json: '{"originating_channel":"main","chat_kind":"direct","event_kind":"message","require_mention":false}'
---
## Space Watches Image Hydration — Autonomous Worker

You hydrate missing images in the Space Watches database at ~/workspace/space-watches/ (GitHub repo: rayhe/space-watches).

### How it works
1. Read `hydration-state.json` for list of records still needing images
2. Read `data.json` to get watch details for those records
3. Pick up to 8 records from `missing_indices` that are NOT in `attempted`
4. For each record, search for a product photo of that specific watch

### Finding images — strategy per record

Given a record with `watch_brand`, `watch_model`, `reference`:

1. **Web search** for `"{watch_brand} {watch_model}" watch` — look for product shots from official sites, Chrono24, Watchbase, Hodinkee, Fratello, Worn & Wound
2. **Try direct fetch** from likely image sources:
   - Chrono24: search `https://www.chrono24.com/search/index.htm?query={brand}+{model}`
   - Omega official: for Speedmaster/X-33/Seamaster models
   - Casio official: for G-Shock models
3. **Use web_fetch** to grab the page, find an image URL, then download it
4. **IMPORTANT**: Only use product/press photos of the WATCH itself (wrist shots, catalog shots). Not astronaut portraits or mission patches.

### Processing each image

```bash
cd ~/workspace/space-watches
# Generate a short hex filename
HASH=$(echo -n "{astronaut}_{mission}_{brand}_{model}" | md5sum | cut -c1-12)
# Download and resize to 720px max width, JPEG 85 quality
curl -sL "{image_url}" -o /tmp/sw_temp.jpg
convert /tmp/sw_temp.jpg -resize 720x720\> -quality 85 images/${HASH}.jpg
```

If `convert` (ImageMagick) isn't available, use Python PIL:
```python
from PIL import Image
img = Image.open('/tmp/sw_temp.jpg')
img.thumbnail((720, 720), Image.LANCZOS)
img.save(f'images/{hash_name}.jpg', 'JPEG', quality=85)
```

### Updating records

After downloading, update the record in `data.json`:
- Set `image_url` to `images/{HASH}.jpg`
- Keep `original_image_url` as the source you found it from

Also regenerate `data.csv` from `data.json`.

### State tracking

Update `hydration-state.json` after each cycle:
- Move processed indices from `missing_indices` to `attempted`
- If image found → add to `succeeded`
- If no image found after search → add to `failed`  
- Update `last_run` timestamp

### Git commit and push

```bash
cd ~/workspace/space-watches
git add images/ data.json data.csv hydration-state.json
git commit -m "hydrate: add images for N watches (total: X/2184)"
git push origin main
```

### Priority order
Process records in this priority:
1. Records that have a remote URL in `image_url` but file is missing locally (try re-downloading the URL first)
2. Famous/notable watches: Omega Speedmaster, X-33 variants, Rolex models
3. Early space era (1960s-1970s) — historically significant
4. Everything else chronologically

### Guardrails
- Max 8 records per cycle (don't hog resources)
- Skip records where `watch_brand` is "Unknown" or "Uncertain" — mark as failed
- If a search yields no usable image after 2 attempts, mark as failed and move on
- Don't download images larger than 5MB
- Verify downloaded files are valid images (check file header bytes)

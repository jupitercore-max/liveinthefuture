#!/bin/bash
# LITF post-publish validation — run after every article publish or index rebuild
set -e
cd "$(dirname "$0")/.."

ERRORS=0

# 1. Check article count parity (excluding intentionally unlinked articles)
EXCLUDE_FILE="scripts/validate-exclude.txt"
EXCLUDE_COUNT=0
if [ -f "$EXCLUDE_FILE" ]; then
  EXCLUDE_COUNT=$(grep -v '^#' "$EXCLUDE_FILE" | grep -v '^$' | wc -l)
fi
STORIES=$(ls stories/*.html 2>/dev/null | wc -l)
LINKED_STORIES=$((STORIES - EXCLUDE_COUNT))
INDEX_LINKS=$(grep -oP 'stories/[a-z0-9-]+\.html' index.html | sort -u | wc -l)
if [ "$LINKED_STORIES" -ne "$INDEX_LINKS" ]; then
  echo "❌ MISMATCH: stories/ has $STORIES articles ($EXCLUDE_COUNT excluded) but index.html references $INDEX_LINKS"
  ERRORS=$((ERRORS+1))
else
  echo "✅ Article count: $STORIES in stories/ ($EXCLUDE_COUNT excluded), $INDEX_LINKS on homepage"
fi

# 2. Check search placeholder count
SEARCH_COUNT=$(grep -oP 'Search \K[0-9]+' index.html | head -1)
if [ "$SEARCH_COUNT" != "$INDEX_LINKS" ]; then
  echo "❌ Search placeholder says $SEARCH_COUNT but should be $INDEX_LINKS"
  ERRORS=$((ERRORS+1))
else
  echo "✅ Search count: $SEARCH_COUNT"
fi

# 3. Check story-nav.js article count
if [ -f "story-nav.js" ]; then
  NAV_COUNT=$(grep -cE '"[a-z0-9-]+\.html"' story-nav.js || true)
  if [ "$NAV_COUNT" -ne "$INDEX_LINKS" ]; then
    echo "❌ story-nav.js has $NAV_COUNT entries but should have $INDEX_LINKS"
    ERRORS=$((ERRORS+1))
  else
    echo "✅ story-nav.js: $NAV_COUNT entries"
  fi
fi

# 4. Check for broken image references
BROKEN=0
for f in stories/*.html; do
  for img in $(grep -oP 'src="\.\./images/([^"?]+)' "$f" | sed 's|src="../images/||'); do
    if [ ! -f "images/$img" ]; then
      echo "⚠️  Missing image: images/$img (referenced by $(basename $f))"
      BROKEN=$((BROKEN+1))
    fi
  done
done
if [ "$BROKEN" -eq 0 ]; then
  echo "✅ All story image references valid"
else
  echo "❌ $BROKEN broken image references"
  ERRORS=$((ERRORS+1))
fi

# 5. Check images are tracked in git
UNTRACKED_IMGS=0
for f in stories/*.html startups/*.html priorart/*.html; do
  [ "$(basename "$f")" = "index.html" ] && continue
  for img in $(grep -oP '(?:src|content)="(?:\.\.\/)?images/([^"?]+)' "$f" | grep -oP 'images/[^"?]+'); do
    imgpath=$(echo "$img" | sed 's|^\.\./||')
    if [ ! -f "$imgpath" ]; then
      echo "⚠️  Missing image file: $imgpath (referenced by $f)"
      UNTRACKED_IMGS=$((UNTRACKED_IMGS+1))
    elif ! git ls-files --error-unmatch "$imgpath" >/dev/null 2>&1; then
      echo "⚠️  Image not tracked in git: $imgpath (referenced by $f)"
      UNTRACKED_IMGS=$((UNTRACKED_IMGS+1))
    fi
  done
done
if [ "$UNTRACKED_IMGS" -eq 0 ]; then
  echo "✅ All referenced images exist and are tracked in git"
else
  echo "❌ $UNTRACKED_IMGS images missing or untracked"
  ERRORS=$((ERRORS+1))
fi

# 6. Check sitemap completeness
SITEMAP_URLS=$(grep -c '<loc>' sitemap.xml 2>/dev/null || echo 0)
TOTAL_PAGES=$((STORIES + $(ls startups/*.html 2>/dev/null | grep -v index | wc -l) + $(ls priorart/*.html 2>/dev/null | grep -v index | wc -l)))
if [ "$SITEMAP_URLS" -lt "$STORIES" ]; then
  echo "❌ Sitemap has $SITEMAP_URLS URLs but there are $STORIES stories alone"
  ERRORS=$((ERRORS+1))
else
  echo "✅ Sitemap: $SITEMAP_URLS URLs"
fi

# 7. Check for inconsistent card templates
OLD_CARDS=$(grep -c 'class="card-img"' index.html || true)
OLD_CARDS=${OLD_CARDS:-0}
if [ "$OLD_CARDS" -gt 0 ]; then
  echo "❌ $OLD_CARDS cards still using old template (missing card-img-wrap)"
  ERRORS=$((ERRORS+1))
else
  echo "✅ All cards use standardized template"
fi

# 8. Check for duplicate index entries
DUPES=$(sed -n '/id="articleGrid"/,/<\/section>/p' index.html | grep -oP 'stories/[a-z0-9-]+\.html' | sort | uniq -d)
if [ -n "$DUPES" ]; then
  echo "❌ Duplicate entries in index.html:"
  echo "$DUPES" | sed 's/^/   /'
  ERRORS=$((ERRORS+1))
else
  echo "✅ No duplicate index entries"
fi

echo ""
if [ "$ERRORS" -gt 0 ]; then
  echo "🚨 $ERRORS validation errors — DO NOT PUBLISH until fixed"
  exit 1
else
  echo "✅ All checks passed"
  exit 0
fi

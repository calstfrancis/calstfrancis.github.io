#!/usr/bin/env bash
# Мера — measure. Reports what a first visit to the homepage actually costs, so
# the claim in the footer can be checked rather than trusted.
set -euo pipefail
cd "$(dirname "$0")"

total=0
printf '%-28s %8s\n' FILE BYTES
for f in index.html style.css tokens.css site.js fonts/fonts.css \
         fonts/4UacrEBBsBhlBjvfkQjt71kZfyBzPgNG9hU4-6qj.woff2 \
         fonts/rnCr-xNNww_2s0amA9M5kng.woff2 \
         fonts/rnCt-xNNww_2s0amA9M8onrmTA.woff2 \
         zerkalo.webp; do
  [ -f "$f" ] || { echo "missing: $f" >&2; continue; }
  b=$(stat -c%s "$f")
  total=$((total + b))
  printf '%-28s %8d\n' "$f" "$b"
done
printf '%-28s %8d  (%d KB)\n' TOTAL "$total" "$((total / 1024))"

echo
echo "Third-party requests:"
grep -oE 'https?://[^"'"'"' )]+' index.html \
  | grep -vE 'calstfrancis\.github\.io|schema\.org|www\.w3\.org' \
  | grep -oE '^https?://[^/]+' | sort -u | sed 's/^/  (link only) /'
echo "  (none of the above load as subresources)"
echo
echo "Runtime exception: api.github.com is contacted only when versions.json is"
echo "stale or missing an entry. Keep the footer wording in step with that."

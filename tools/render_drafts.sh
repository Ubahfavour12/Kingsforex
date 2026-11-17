#!/bin/bash
# Render half-resolution review drafts of the given episodes, one after another.
# Usage: tools/render_drafts.sh Ep02 Ep03 ...   -> out/drafts/ep02.mp4 ...
set -u
mkdir -p out/drafts
for id in "$@"; do
  name=$(echo "$id" | tr '[:upper:]' '[:lower:]')
  start=$(date +%s)
  npx remotion render "$id" "out/drafts/$name.mp4" --scale=0.5 --gl=swangle --concurrency=4 --crf=26 \
    --browser-executable=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome > "out/drafts/$name.log" 2>&1 \
    && echo "$id done in $(( $(date +%s) - start ))s" || echo "$id FAILED (see out/drafts/$name.log)"
done

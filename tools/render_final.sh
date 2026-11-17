#!/bin/bash
# Render full-resolution 1080x1920 finals of the given voiced episodes, one after another.
# Usage: tools/render_final.sh Ep01 Ep02 ...   -> out/final/ep01.mp4 ...
set -u
mkdir -p out/final
for id in "$@"; do
  name=$(echo "$id" | tr '[:upper:]' '[:lower:]')
  start=$(date +%s)
  npx remotion render "$id" "out/final/$name.mp4" --gl=swangle --concurrency=4 --crf=21 \
    --browser-executable=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome > "out/final/$name.log" 2>&1 \
    && echo "$id done in $(( $(date +%s) - start ))s" || echo "$id FAILED (see out/final/$name.log)"
done

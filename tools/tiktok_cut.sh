#!/bin/bash
# Cut a TikTok clip from a final episode by keeping time ranges (seconds), joined with short audio fades.
# Usage: tools/tiktok_cut.sh ep02 0:5.3 31.85:53.0 88.7:end   -> out/tiktok/ep02-tiktok.mp4
# Each range is its own seeked input, so memory stays flat however many ranges there are.
set -euo pipefail
ep=$1; shift; in=out/final/$ep.mp4; mkdir -p out/tiktok
end=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$in")
args=(); f=""; cat=""; i=0
for r in "$@"; do
  a=${r%%:*}; b=${r##*:}; [ "$b" = end ] && b=$end
  d=$(python3 -c "print(round($b-$a,3))"); fo=$(python3 -c "print(round($d-0.15,3))")
  args+=(-ss "$a" -t "$d" -i "$in")
  f+="[$i:a]afade=t=in:d=0.08,afade=t=out:st=$fo:d=0.15[a$i];"
  cat+="[$i:v][a$i]"; i=$((i+1))
done
ffmpeg -v error -y "${args[@]}" -filter_complex "${f}${cat}concat=n=$i:v=1:a=1[v][a]" -map "[v]" -map "[a]" \
  -c:v libx264 -crf 20 -preset medium -threads 2 -c:a aac -b:a 192k -movflags +faststart out/tiktok/$ep-tiktok.mp4
ffprobe -v error -show_entries format=duration -of csv=p=0 out/tiktok/$ep-tiktok.mp4

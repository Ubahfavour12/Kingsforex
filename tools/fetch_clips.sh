#!/bin/bash
# Download generated voice clips into an episode's assets as b<N>.mp3.
# Usage: tools/fetch_clips.sh ep01 5=https://... 6=https://...
set -eu
ep=$1; shift
for pair in "$@"; do
  n=${pair%%=*}; url=${pair#*=}
  curl -sS -m 60 --retry 3 -o "assets/$ep/b$n.mp3" "$url"
  echo "$ep b$n $(ffprobe -v error -show_entries format=duration -of csv=p=0 "assets/$ep/b$n.mp3")s"
done

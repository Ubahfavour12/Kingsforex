#!/bin/bash
# Voice an episode's beats with ElevenLabs (key injected by the network proxy).
# Usage: tools/eleven_tts.sh ep02 [first_beat]   -> assets/ep02/bN.mp3
set -euo pipefail
ep=$1; from=${2:-1}
VOICE=IKne3meq5aSn9XLyUdCD   # Charlie, pushed to a Nigerian accent with an eleven_v3 tag
n=0
while IFS= read -r line; do
  [ -z "$line" ] && continue; n=$((n+1)); [ $n -lt $from ] && continue
  body=$(python3 -c 'import json,sys;print(json.dumps({"text":"[strong Nigerian accent] "+sys.argv[1],"model_id":"eleven_v3"}))' "$line")
  code=$(curl -sS -o assets/$ep/b$n.mp3 -w "%{http_code}" "https://api.elevenlabs.io/v1/text-to-speech/$VOICE?output_format=mp3_44100_128" \
    -H "xi-api-key: proxy-injected" -H "Content-Type: application/json" -d "$body")
  if [ "$code" != 200 ]; then cat assets/$ep/b$n.mp3; rm assets/$ep/b$n.mp3; echo " <- beat $n failed ($code)"; exit 1; fi
  echo "b$n ok"
done < assets/$ep/beats.txt

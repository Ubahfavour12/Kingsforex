"""Join the per-beat voice clips of an episode into one track and write timings.

Usage: python3 tools/build_audio.py ep01
Reads  assets/<ep>/beats.txt (one beat of narration per line) and b1.mp3, b2.mp3...
Writes public/<ep>.mp3 and src/<ep>.json (beat times + word-level captions).
"""
import json, subprocess, sys
from pathlib import Path

GAP_MS = 250     # pause between beats
TEMPO = 1.12     # the cloned voice reads slowly; tighten it for comedy pacing

ep = sys.argv[1]
src = Path("assets") / ep
beats = [l.strip() for l in (src / "beats.txt").read_text().splitlines() if l.strip()]
tmp = Path("out") / f"{ep}-audio"
tmp.mkdir(parents=True, exist_ok=True)
Path("public").mkdir(exist_ok=True)

def run(*args):
    subprocess.run(args, check=True, capture_output=True)

def duration_ms(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                          "-of", "csv=p=0", str(path)], check=True, capture_output=True, text=True)
    return float(out.stdout) * 1000

trim = "silenceremove=start_periods=1:start_threshold=-50dB"
clean = f"{trim},areverse,{trim},areverse,atempo={TEMPO},loudnorm=I=-16:TP=-1.5,apad=pad_dur={GAP_MS / 1000}"
t, out_beats, captions, parts = 0.0, [], [], []
for i, text in enumerate(beats, 1):
    clip = src / f"b{i}.mp3"
    assert clip.exists(), f"missing {clip}"
    wav = tmp / f"b{i}.wav"
    run("ffmpeg", "-y", "-i", str(clip), "-af", clean, "-ar", "44100", "-ac", "1", str(wav))
    spoken = duration_ms(wav) - GAP_MS
    out_beats.append({"startMs": round(t), "endMs": round(t + spoken)})
    # shortcut: words are timed in proportion to their length, not aligned to
    # the audio. Upgrade to forced alignment if captions drift visibly.
    words = text.replace('"', "").split()
    total = sum(len(w) + 1 for w in words)
    w_start = t
    for w in words:
        w_len = spoken * (len(w) + 1) / total
        captions.append({"text": w, "startMs": round(w_start), "endMs": round(w_start + w_len)})
        w_start += w_len
    captions[-1]["endBeat"] = True
    t += spoken + GAP_MS
    parts.append(wav)

listing = tmp / "list.txt"
listing.write_text("".join(f"file '{p.resolve()}'\n" for p in parts))
run("ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", str(listing), "-b:a", "192k", f"public/{ep}.mp3")
Path(f"src/{ep}.json").write_text(json.dumps({"beats": out_beats, "captions": captions}, indent=1))
assert len(out_beats) == len(beats) and captions[-1]["endMs"] <= t
print(f"{ep}: {len(beats)} beats, {t / 1000:.1f}s")

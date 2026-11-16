import type { Caption } from "@remotion/captions";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import captionsJson from "./captions.json";

// Captions live in src/captions.json as word-level timings in milliseconds.
// You can write them by hand or generate them from audio with a
// transcription tool (e.g. @remotion/install-whisper-cpp).
const captions = captionsJson as Caption[];

// A pause longer than this between two words starts a new on-screen line.
const NEW_LINE_AFTER_PAUSE_MS = 500;
// How long a line stays on screen after its last word.
const LINGER_MS = 500;

const lines: Caption[][] = [];
for (const word of captions) {
  const current = lines[lines.length - 1];
  const previous = current?.[current.length - 1];
  if (previous && word.startMs - previous.endMs <= NEW_LINE_AFTER_PAUSE_MS) {
    current.push(word);
  } else {
    lines.push([word]);
  }
}

const CaptionLine = ({ words }: { words: Caption[] }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const timeMs = words[0].startMs + (frame / fps) * 1000;

  return (
    <AbsoluteFill
      style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 90 }}
    >
      <div
        style={{
          fontFamily: "Arial, Helvetica, sans-serif",
          fontSize: 76,
          fontWeight: 800,
          color: "white",
          textAlign: "center",
          textShadow: "0 6px 24px rgba(0,0,0,0.85)",
          whiteSpace: "pre",
        }}
      >
        {words.map((word) => (
          <span
            key={word.startMs}
            // Words turn gold as they are spoken.
            style={{ color: timeMs >= word.startMs ? "#f5c542" : "white" }}
          >
            {word.text}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const Captions = () => {
  const { fps } = useVideoConfig();

  return (
    <>
      {lines.map((words, i) => {
        const startMs = words[0].startMs;
        const nextStartMs = lines[i + 1]?.[0].startMs ?? Infinity;
        const endMs = Math.min(nextStartMs, words[words.length - 1].endMs + LINGER_MS);
        const from = Math.round((startMs / 1000) * fps);
        const duration = Math.max(1, Math.round((endMs / 1000) * fps) - from);
        return (
          <Sequence key={startMs} from={from} durationInFrames={duration}>
            <CaptionLine words={words} />
          </Sequence>
        );
      })}
    </>
  );
};

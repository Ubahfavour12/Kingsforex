import { createTikTokStyleCaptions, type Caption } from "@remotion/captions";
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import captionsJson from "./captions.json";

// Captions live in src/captions.json as word-level timings in milliseconds.
// You can write them by hand or generate them from audio with a
// transcription tool (e.g. @remotion/install-whisper-cpp).
const captions = captionsJson as Caption[];

// Words that start within this window are shown on screen together.
const { pages } = createTikTokStyleCaptions({
  captions,
  combineTokensWithinMilliseconds: 2500,
});

type Page = (typeof pages)[number];

const CaptionPage = ({ page }: { page: Page }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const timeMs = page.startMs + (frame / fps) * 1000;

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
        {page.tokens.map((token) => (
          <span
            key={token.fromMs}
            // The word currently being spoken is highlighted in gold.
            style={{ color: timeMs >= token.fromMs ? "#f5c542" : "white" }}
          >
            {token.text}
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
      {pages.map((page, i) => {
        const from = Math.round((page.startMs / 1000) * fps);
        const nextStart = pages[i + 1]?.startMs ?? Infinity;
        const endMs = Math.min(nextStart, page.startMs + page.durationMs + 400);
        const duration = Math.max(1, Math.round((endMs / 1000) * fps) - from);
        return (
          <Sequence key={page.startMs} from={from} durationInFrames={duration}>
            <CaptionPage page={page} />
          </Sequence>
        );
      })}
    </>
  );
};

import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from "remotion";

export type Word = { text: string; startMs: number; endMs: number; endBeat?: boolean };

const WORDS_PER_LINE = 4;

// Word-highlighted captions, a few words at a time, sized for a phone.
export const Captions = ({ words }: { words: Word[] }) => {
  const { fps } = useVideoConfig();
  const lines: Word[][] = [[]];
  for (const word of words) {
    const line = lines[lines.length - 1];
    line.push(word);
    if (line.length === WORDS_PER_LINE || word.endBeat) lines.push([]);
  }

  return (
    <>
      {lines.filter((l) => l.length).map((line) => {
        const from = Math.round((line[0].startMs / 1000) * fps);
        const to = Math.round((line[line.length - 1].endMs / 1000) * fps);
        return (
          <Sequence key={from} from={from} durationInFrames={Math.max(1, to - from)}>
            <Line line={line} />
          </Sequence>
        );
      })}
    </>
  );
};

const Line = ({ line }: { line: Word[] }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const timeMs = line[0].startMs + (frame / fps) * 1000;
  return (
    // kept above the bottom fifth, where TikTok and Shorts put their own UI
    <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 430 }}>
      <div
        style={{
          fontFamily: "Arial Black, Arial, Helvetica, sans-serif",
          fontSize: 82,
          fontWeight: 900,
          lineHeight: 1.1,
          textAlign: "center",
          maxWidth: 960,
          WebkitTextStroke: "10px #1b1410",
          paintOrder: "stroke fill",
        }}
      >
        {line.map((word) => (
          <span key={word.startMs} style={{ color: timeMs >= word.startMs ? "#ffd23f" : "white" }}>
            {word.text}{" "}
          </span>
        ))}
      </div>
    </AbsoluteFill>
  );
};

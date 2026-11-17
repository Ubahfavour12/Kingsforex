// The episode engine: plays a list of segments (who is where, what the camera
// sees, which gags pop up) against the beat timings of a voice track.
// An episode is just data — see ep01.tsx.
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import type { ReactNode } from "react";
import { AbsoluteFill, Audio, Easing, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import type { Texture } from "three";
import { Captions, type Word } from "./Captions";
import { Character, type Expression, type Who } from "./Character";
import { INK, Sets, type V3 } from "./Sets";
import { useSvgTextures, type SvgSpec } from "./useSvgTextures";

export const FPS = 30;
const TAIL = 80; // frames of reaction + title after the last line
const EXPRESSIONS: Expression[] = ["neutral", "happy", "talking", "shocked", "vexed"];

export type Shot = { pos: V3; look: V3; push?: number };
export type Actor = { at: V3; face?: Expression; talk?: boolean; scale?: number; walkFrom?: V3; knock?: boolean };
export type Gag = { text: string; at: V3; w?: number; p?: [number, number]; fill?: string; color?: string; float?: boolean };
export type Segment = {
  b: number | "tail"; // which voice beat this plays over
  p?: [number, number]; // the part of that beat, as fractions (default: all of it)
  shot: Shot;
  cast?: Partial<Record<Who, Actor>>;
  gags?: Gag[];
  badge?: string;
  night?: boolean;
  flags?: string[];
};
export type EpisodeData = { beats: { startMs: number; endMs: number }[]; captions: Word[] };

const toFrame = (ms: number) => Math.round((ms / 1000) * FPS);
const lastBeatEnd = (data: EpisodeData) => toFrame(data.beats[data.beats.length - 1].endMs);
export const episodeFrames = (data: EpisodeData) => lastBeatEnd(data) + TAIL;

type Timed = Segment & { from: number; to: number };
const timeline = (data: EpisodeData, segments: Segment[]): Timed[] =>
  segments.map((s) => {
    if (s.b === "tail") return { ...s, from: lastBeatEnd(data), to: episodeFrames(data) };
    const beat = data.beats[s.b];
    if (!beat) throw new Error(`segment refers to beat ${s.b}, but the voice track has ${data.beats.length}`);
    const [p0, p1] = s.p ?? [0, 1];
    const at = (p: number) => toFrame(beat.startMs + (beat.endMs - beat.startMs) * p);
    // a beat's last segment also covers the pause before the next beat
    const next = data.beats[s.b + 1];
    return { ...s, from: at(p0), to: p1 === 1 && next ? toFrame(next.startMs) : at(p1) };
  });

const Bubble = ({ text, fill = "white", color = INK }: { text: string; fill?: string; color?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 140">
    <rect x="8" y="8" width="384" height="124" rx="40" fill={fill} stroke={INK} strokeWidth="10" />
    <text
      x="200"
      y="70"
      dominantBaseline="central"
      textAnchor="middle"
      fontFamily="Arial, sans-serif"
      fontWeight="900"
      fontSize={Math.min(46, 560 / text.length)}
      fill={color}
    >
      {text}
    </text>
  </svg>
);

const gagKey = (g: Gag) => `gag:${g.text}:${g.fill ?? ""}`;
const faceKey = (who: Who, e: Expression) => `face:${who}:${e}`;

const lerp = (a: V3, b: V3, t: number) => a.map((v, k) => v + (b[k] - v) * t) as V3;
const shotAt = (shot: Shot, t: number) => ({
  pos: lerp(shot.pos, shot.look, (shot.push ?? 0.1) * t),
  look: shot.look,
});

// The camera never cuts: it glides (slow in, slow out) from where the last
// segment left it, then keeps pushing in slowly while the segment plays.
const CameraRig = ({ segs, index }: { segs: Timed[]; index: number }) => {
  const frame = useCurrentFrame();
  const camera = useThree((s) => s.camera);
  const seg = segs[index];
  let { pos, look } = shotAt(seg.shot, (frame - seg.from) / Math.max(1, seg.to - seg.from));
  if (index > 0) {
    const glide = Math.min(26, (seg.to - seg.from) * 0.6);
    const t = interpolate(frame, [seg.from, seg.from + glide], [0, 1], {
      easing: Easing.inOut(Easing.cubic),
      extrapolateRight: "clamp",
    });
    const before = shotAt(segs[index - 1].shot, 1);
    pos = lerp(before.pos, pos, t);
    look = lerp(before.look, look, t);
  }
  camera.position.set(...pos);
  camera.lookAt(...look);
  return null;
};

const World = ({ segs, specs }: { segs: Timed[]; specs: Record<string, SvgSpec> }) => {
  const frame = useCurrentFrame();
  const tex = useSvgTextures(specs);
  if (!tex) return null;

  const index = Math.max(0, segs.findIndex((s) => frame >= s.from && frame < s.to));
  const seg = segs[index];
  const local = frame - seg.from;
  const length = Math.max(1, seg.to - seg.from);
  const breathe = 1 + Math.sin(frame / 9) * 0.008;
  const night = interpolate(frame, [seg.from, seg.from + 20], [segs[index - 1]?.night ? 1 : 0, seg.night ? 1 : 0], {
    extrapolateRight: "clamp",
  });

  return (
    <>
      <CameraRig segs={segs} index={index} />
      <ambientLight intensity={1.5 + night * 0.2} color={night > 0.5 ? "#c4d2ff" : "#ffe9d2"} />
      <directionalLight
        position={[5, 9, 7]}
        intensity={2.2 - night * 1.5}
        color={night > 0.5 ? "#8fa8ff" : "#fff1d6"}
        castShadow
        shadow-mapSize={[4096, 2048]}
        shadow-camera-left={-7}
        shadow-camera-right={54}
        shadow-camera-top={10}
        shadow-camera-bottom={-7}
      />
      {/* cool fill gives the blue shadow tone */}
      <pointLight position={[seg.shot.look[0] - 3, 2.5, 2]} intensity={14} color="#7fa8ff" />
      <Sets flags={seg.flags ?? []} />

      {(Object.keys(seg.cast ?? {}) as Who[]).map((who) => {
        const a = seg.cast![who]!;
        let at = a.at;
        let bob = 0;
        if (a.walkFrom) {
          const t = interpolate(local, [0, Math.min(36, length * 0.7)], [0, 1], {
            easing: Easing.out(Easing.cubic),
            extrapolateRight: "clamp",
          });
          at = lerp(a.walkFrom, a.at, t);
          bob = t < 1 ? Math.abs(Math.sin(frame / 2.5)) * 0.06 : 0;
        }
        if (a.knock) at = [at[0] + Math.abs(Math.sin(frame / 2.2)) * 0.12, at[1], at[2]];
        const base = a.face ?? "neutral";
        const face = a.talk && Math.floor(frame / 4) % 2 ? "talking" : base;
        const scale = (a.scale ?? 1.1) * breathe;
        return (
          // a flat cut-out standing in the world: lit by the scene, casting a real shadow
          <mesh key={who} position={[at[0], at[1] + bob + (1.72 * scale) / 2, at[2]]} scale={scale} castShadow>
            <planeGeometry args={[0.9, 1.72]} />
            <meshStandardMaterial map={tex[faceKey(who, face)]} alphaTest={0.5} side={2 /* DoubleSide */} roughness={1} />
          </mesh>
        );
      })}

      {(seg.gags ?? []).map((g, gi) => {
        const [p0, p1] = g.p ?? [0, 1];
        const start = length * p0;
        if (local < start || local >= length * p1) return null;
        const map = tex[gagKey(g)];
        // keep the bubble inside the 9:16 frame: the view is about 0.43 x distance wide
        const cam = shotAt(seg.shot, local / length).pos;
        const view = 0.43 * Math.hypot(...cam.map((v, k) => v - g.at[k]));
        const w = Math.min(g.w ?? 1.6, view * 0.8); // spring overshoot needs headroom
        const room = Math.max(0, (view * 0.94 - w) / 2);
        const x = Math.min(Math.max(g.at[0], seg.shot.look[0] - room), seg.shot.look[0] + room);
        if (g.float) {
          // a stream of copies rising and fading (dollar signs, etc.)
          return [0, 1, 2, 3].map((k) => {
            const life = (frame + k * 11) % 44;
            return (
              <mesh key={`${index}-${gi}-${k}`} position={[x - 0.65 + k * 0.42, g.at[1] + life * 0.04, g.at[2]]} scale={Math.min(1, life / 6)}>
                <planeGeometry args={[w, w * 0.35]} />
                <meshBasicMaterial map={map} transparent opacity={1 - life / 44} />
              </mesh>
            );
          });
        }
        const s = spring({ frame: local - start, fps: FPS, config: { damping: 9, stiffness: 180 } });
        return (
          <mesh key={`${index}-${gi}`} position={[x, g.at[1], g.at[2]]} scale={s} rotation={[0, 0, Math.sin(frame / 7) * 0.04]}>
            <planeGeometry args={[w, w * 0.35]} />
            <meshBasicMaterial map={map} transparent />
          </mesh>
        );
      })}
    </>
  );
};

const Badge = ({ children, since }: { children: ReactNode; since: number }) => {
  const s = spring({ frame: since, fps: FPS, config: { damping: 11 } });
  return (
    <AbsoluteFill style={{ alignItems: "center", paddingTop: 150 }}>
      <div
        style={{
          transform: `scale(${s}) rotate(-3deg)`,
          background: "#ffd23f",
          border: `10px solid ${INK}`,
          borderRadius: 32,
          padding: "14px 44px",
          fontFamily: "Arial Black, Arial, sans-serif",
          fontWeight: 900,
          fontSize: 86,
          color: INK,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

export const Episode = ({ data, segments, audio }: { data: EpisodeData; segments: Segment[]; audio: string }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const segs = timeline(data, segments);

  const specs: Record<string, SvgSpec> = {};
  for (const s of segs) {
    for (const who of Object.keys(s.cast ?? {}) as Who[]) {
      for (const e of EXPRESSIONS) {
        specs[faceKey(who, e)] ??= { node: <Character who={who} expression={e} />, w: 660, h: 1260 };
      }
    }
    for (const g of s.gags ?? []) {
      specs[gagKey(g)] ??= { node: <Bubble text={g.text} fill={g.fill} color={g.color} />, w: 800, h: 280 };
    }
  }

  const seg = segs.find((s) => frame >= s.from && frame < s.to) ?? segs[0];
  // a badge that carries over from the previous segment does not pop in again
  let badgeFrom = seg.from;
  for (let i = segs.indexOf(seg) - 1; i >= 0 && segs[i].badge === seg.badge; i--) badgeFrom = segs[i].from;
  const sky = seg.night ? "linear-gradient(#0f1a3d, #2a3a6e)" : "linear-gradient(#ffb787 0%, #ffe2b0 45%, #e2b877 100%)";

  return (
    <AbsoluteFill style={{ background: sky }}>
      <ThreeCanvas width={width} height={height} shadows camera={{ fov: 42, near: 0.1, far: 100 }}>
        <World segs={segs} specs={specs} />
      </ThreeCanvas>
      {seg.badge && <Badge since={frame - badgeFrom}>{seg.badge}</Badge>}
      <Captions words={data.captions} />
      <Audio src={staticFile(audio)} />
    </AbsoluteFill>
  );
};

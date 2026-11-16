// Episode 1 (act one): "Mama Think Say I No Get Work".
// Flat 2D characters standing in a real 3D world; everything is driven by the
// current frame and by the beat timings in ep01.json (built from the voiceover).
import { ThreeCanvas } from "@remotion/three";
import { useThree } from "@react-three/fiber";
import {
  AbsoluteFill,
  Audio,
  Easing,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Captions } from "./Captions";
import { Character, type Expression, type Who } from "./Character";
import data from "./ep01.json";
import { useSvgTextures, type SvgSpec } from "./useSvgTextures";

const FPS = 30;
const INK = "#1b1410";
const B = data.beats.map((b) => ({
  from: Math.round((b.startMs / 1000) * FPS),
  to: Math.round((b.endMs / 1000) * FPS),
}));
const TAIL = 75; // reaction shot + title after the last line
export const EP01_FRAMES = B[B.length - 1].to + TAIL;

// frame at fraction p of the way through beat i
const at = (i: number, p: number) => Math.round(B[i].from + (B[i].to - B[i].from) * p);
const within = (frame: number, i: number, p0: number, p1: number) => frame >= at(i, p0) && frame < at(i, p1);

// ---------- art that becomes textures ----------

const Bubble = ({ text, fill = "white", color = INK }: { text: string; fill?: string; color?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 140">
    <rect x="8" y="8" width="384" height="124" rx="40" fill={fill} stroke={INK} strokeWidth="10" />
    <text x="200" y="86" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="44" fill={color}>
      {text}
    </text>
  </svg>
);

const Dollar = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="44" fill="#2fbf5b" stroke={INK} strokeWidth="8" />
    <text x="50" y="72" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="900" fontSize="64" fill="white">
      $
    </text>
  </svg>
);

const EXPRESSIONS: Expression[] = ["neutral", "happy", "talking", "shocked", "vexed"];
const face = (who: Who, e: Expression) => `${who}-${e}`;
const SPECS: Record<string, SvgSpec> = {
  dollar: { node: <Dollar />, w: 200, h: 200 },
  job: { node: <Bubble text="GIVE AM JOB!" />, w: 800, h: 280 },
  knock: { node: <Bubble text="KPO! KPO! KPO!" fill="#ffd23f" />, w: 800, h: 280 },
  cali: { node: <Bubble text="OGA: 9PM zzz" />, w: 800, h: 280 },
  phone: { node: <Bubble text="PHONE?" />, w: 800, h: 280 },
  computer: { node: <Bubble text="COMPUTER?" />, w: 800, h: 280 },
  wetin: { node: <Bubble text="WETIN??" fill="#ffd23f" />, w: 800, h: 280 },
  website: { node: <Bubble text="</> WEBSITE" fill="#2f4a8f" color="white" />, w: 800, h: 280 },
};
for (const who of ["dev", "mama"] as Who[]) {
  for (const e of EXPRESSIONS) {
    SPECS[face(who, e)] = { node: <Character who={who} expression={e} />, w: 660, h: 1260 };
  }
}

// ---------- 3D building blocks ----------

type V3 = [number, number, number];

// A box with a comic-book ink outline (a slightly larger black shell seen from inside).
const Box = ({ size, position, color, glow = 0 }: { size: V3; position: V3; color: string; glow?: number }) => (
  <group position={position}>
    <mesh castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={glow} roughness={0.9} />
    </mesh>
    <mesh>
      <boxGeometry args={[size[0] + 0.07, size[1] + 0.07, size[2] + 0.07]} />
      <meshBasicMaterial color={INK} side={1 /* BackSide */} />
    </mesh>
  </group>
);

// A flat cut-out standing in the world: lit by the scene and casting a real shadow.
const Flat = ({
  map,
  position,
  size,
  scale = 1,
}: {
  map: import("three").Texture;
  position: V3;
  size: [number, number];
  scale?: number;
}) => (
  <mesh position={[position[0], position[1] + (size[1] * scale) / 2, position[2]]} scale={scale} castShadow>
    <planeGeometry args={size} />
    <meshStandardMaterial map={map} alphaTest={0.5} side={2 /* DoubleSide */} roughness={1} />
  </mesh>
);

// ---------- camera ----------

const BED_LOOK: V3 = [-0.3, 1.5, -0.6];
const DOOR_LOOK: V3 = [8.9, 1.15, -0.5];
const TWO_LOOK: V3 = [0.55, 1.15, -0.5];
const MAMA_LOOK: V3 = [1.35, 1.38, -0.3];
const DEV_LOOK: V3 = [-0.3, 2.0, -0.7];

// [frame, camera position, look-at]. The camera glides between keys (slow in,
// slow out) instead of cutting, and keeps drifting while it "holds".
const KEYS: [number, V3, V3][] = [
  [0, [-0.3, 1.7, 7.4], BED_LOOK],
  [at(0, 0.5), [-0.3, 1.55, 5.6], BED_LOOK],
  [at(0, 0.5) + 30, [8.9, 1.6, 7.6], DOOR_LOOK],
  [B[1].to, [8.9, 1.45, 6.2], DOOR_LOOK],
  [B[2].from + 30, [-0.3, 1.6, 6.2], BED_LOOK],
  [B[2].to, [-0.3, 1.5, 5.2], BED_LOOK],
  [B[3].from + 26, [0.55, 1.6, 8.6], TWO_LOOK],
  [B[3].to, [0.55, 1.5, 7.6], TWO_LOOK],
  [B[4].from + 22, [1.35, 1.5, 4.4], MAMA_LOOK],
  [B[4].to, [1.35, 1.45, 3.6], MAMA_LOOK],
  [B[4].to + 12, [-0.3, 1.9, 3.6], DEV_LOOK],
  [EP01_FRAMES, [-0.3, 1.9, 3.1], DEV_LOOK],
];

const CameraRig = () => {
  const frame = useCurrentFrame();
  const camera = useThree((s) => s.camera);
  let i = KEYS.findIndex(([f]) => f > frame) - 1;
  if (i < 0) i = KEYS.length - 2;
  const [f0, p0, l0] = KEYS[i];
  const [f1, p1, l1] = KEYS[i + 1];
  const t = interpolate(frame, [f0, f1], [0, 1], {
    easing: Easing.inOut(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const mix = (a: V3, b: V3) => a.map((v, k) => v + (b[k] - v) * t) as V3;
  camera.position.set(...mix(p0, p1));
  camera.lookAt(...mix(l0, l1));
  return null;
};

// ---------- the scene ----------

const Pop = ({
  map,
  from,
  to,
  position,
  width = 1.5,
}: {
  map: import("three").Texture;
  from: number;
  to: number;
  position: V3;
  width?: number;
}) => {
  const frame = useCurrentFrame();
  if (frame < from || frame >= to) return null;
  const s = spring({ frame: frame - from, fps: FPS, config: { damping: 9, stiffness: 180 } });
  return (
    <mesh position={position} scale={s} rotation={[0, 0, Math.sin(frame / 7) * 0.04]}>
      <planeGeometry args={[width, width * 0.35]} />
      <meshBasicMaterial map={map} transparent />
    </mesh>
  );
};

const World = () => {
  const frame = useCurrentFrame();
  const tex = useSvgTextures(SPECS);
  if (!tex) return null;

  const talk = (base: Expression): Expression => (Math.floor(frame / 4) % 2 ? "talking" : base);
  const mamaQuote =
    within(frame, 1, 0.5, 1) ||
    within(frame, 3, 0.42, 0.6) ||
    within(frame, 3, 0.66, 0.73) ||
    within(frame, 3, 0.77, 0.9) ||
    within(frame, 4, 0.55, 1);
  const speaking = frame < B[4].to && B.some((b) => frame >= b.from && frame < b.to);

  let dev: Expression = "neutral";
  if (frame < at(0, 0.5)) dev = talk("happy");
  else if (frame >= B[4].to) dev = "shocked";
  else if (within(frame, 3, 0.6, 0.66) || within(frame, 3, 0.73, 0.77)) dev = talk("vexed");
  else if (speaking && !mamaQuote) dev = talk("neutral");

  let mama: Expression = frame >= B[4].from ? "vexed" : "neutral";
  if (mamaQuote) mama = talk(frame >= B[1].from && frame < B[1].to ? "vexed" : mama);

  // Mama knocks outside, then walks into the bedroom once the camera has left the door.
  const walkIn = interpolate(frame, [B[2].to - 34, B[2].to], [3.6, 1.35], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const inside = frame >= B[2].from + 30;
  const knocking = within(frame, 1, 0.25, 0.5);
  const mamaX = inside ? walkIn : 8.6 + (knocking ? Math.abs(Math.sin(frame / 2.2)) * 0.12 : 0);
  const mamaBob = inside && frame < B[2].to ? Math.abs(Math.sin(frame / 2.5)) * 0.06 : 0;
  const breathe = 1 + Math.sin(frame / 9) * 0.008;

  return (
    <>
      <CameraRig />
      <ambientLight intensity={1.5} color="#ffe9d2" />
      <directionalLight
        position={[5, 9, 7]}
        intensity={2.2}
        color="#fff1d6"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-7}
        shadow-camera-right={16}
        shadow-camera-top={9}
        shadow-camera-bottom={-6}
      />
      {/* cool fill from the window side gives the blue shadow tone */}
      <pointLight position={[-3, 2.5, 2]} intensity={14} color="#7fa8ff" />

      {/* ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 40]} />
        <meshStandardMaterial color="#e2b877" roughness={1} />
      </mesh>

      {/* ---- bedroom (open-fronted set) ---- */}
      <Box size={[5, 0.1, 4.4]} position={[0, 0.05, -0.3]} color="#b9794a" />
      <Box size={[5, 7, 0.2]} position={[0, 3.5, -2.5]} color="#f6dfb4" />
      <Box size={[0.2, 7, 4.4]} position={[-2.5, 3.5, -0.3]} color="#efd2a0" />
      <Box size={[1.3, 1.3, 0.08]} position={[1.2, 2.7, -2.38]} color="#9fd4ff" glow={0.6} />
      <Box size={[1.5, 0.12, 0.2]} position={[1.2, 1.98, -2.3]} color="#7a4a2b" />
      <Box size={[1.1, 0.8, 0.05]} position={[-1.2, 3.0, -2.38]} color="#2f4a8f" />
      {/* bed: the Dev stands inside it, so only his top half shows — he reads as sitting up */}
      <Box size={[2.3, 0.55, 1.5]} position={[-0.5, 0.38, -0.7]} color="#fff7ea" />
      <Box size={[2.34, 0.2, 0.75]} position={[-0.5, 0.62, -0.3]} color="#e0457b" />
      <Box size={[0.2, 1.2, 1.6]} position={[-1.75, 0.6, -0.7]} color="#7a4a2b" />
      <Box size={[0.55, 0.18, 0.8]} position={[-1.35, 0.72, -0.9]} color="#ffffff" />
      {/* laptop */}
      <Box size={[0.5, 0.04, 0.32]} position={[-0.3, 0.76, -0.2]} color="#c9ced6" />
      <Box size={[0.5, 0.3, 0.04]} position={[-0.3, 0.9, -0.04]} color="#3b4252" />
      <Box size={[0.9, 0.02, 1.4]} position={[1.3, 0.11, 0.4]} color="#2f8f6b" />

      {/* ---- outside the door ---- */}
      <Box size={[5.4, 4.4, 0.3]} position={[9, 2.2, -1.4]} color="#f2c7a0" />
      <Box size={[6, 0.25, 1.2]} position={[9, 4.5, -1.1]} color="#8f3b2e" />
      <Box size={[1.15, 2.3, 0.12]} position={[9.5, 1.15, -1.2]} color="#2f6f8f" />
      <Box size={[0.12, 0.12, 0.1]} position={[9.1, 1.15, -1.1]} color="#ffd23f" />
      <Box size={[1.0, 0.9, 0.1]} position={[7.4, 1.9, -1.22]} color="#9fd4ff" glow={0.3} />
      <Box size={[1.6, 0.12, 0.8]} position={[9.5, 0.06, -0.7]} color="#c9a37a" />
      <Box size={[0.5, 0.55, 0.5]} position={[10.9, 0.28, -0.5]} color="#2f8f6b" />

      {/* ---- cast ---- */}
      <Flat map={tex[face("dev", dev)]} position={[-0.3, 0.3, -0.7]} size={[0.9, 1.72]} scale={breathe * 1.2} />
      <Flat map={tex[face("mama", mama)]} position={[mamaX, 0.1 + mamaBob, -0.3]} size={[0.9, 1.72]} scale={breathe * 1.1} />

      {/* ---- props that sell the jokes ---- */}
      {frame < at(0, 0.62) &&
        [0, 1, 2, 3].map((k) => {
          const life = (frame + k * 11) % 44;
          return (
            <mesh key={k} position={[-0.95 + k * 0.42, 1.3 + life * 0.04, 0.05]} scale={Math.min(1, life / 6)}>
              <planeGeometry args={[0.24, 0.24]} />
              <meshBasicMaterial map={tex.dollar} transparent opacity={1 - life / 44} />
            </mesh>
          );
        })}
      <Pop map={tex.job} from={at(0, 0.62)} to={B[1].from} position={[8.7, 2.5, 0]} width={1.9} />
      <Pop map={tex.knock} from={at(1, 0.25)} to={at(1, 0.5)} position={[9.2, 2.45, 0]} width={1.7} />
      <Pop map={tex.cali} from={at(2, 0.42)} to={B[2].to - 34} position={[0.45, 2.75, -0.3]} width={1.3} />
      <Pop map={tex.phone} from={at(3, 0.5)} to={at(3, 0.62)} position={[1.35, 2.4, -0.2]} />
      <Pop map={tex.computer} from={at(3, 0.66)} to={at(3, 0.76)} position={[1.35, 2.4, -0.2]} />
      <Pop map={tex.wetin} from={at(3, 0.8)} to={at(3, 0.92)} position={[1.35, 2.4, -0.2]} />
      <Pop map={tex.website} from={at(3, 0.92)} to={B[4].from} position={[-0.3, 2.75, -0.2]} width={1.7} />
    </>
  );
};

const Badge = ({ children, from, to }: { children: React.ReactNode; from: number; to: number }) => {
  const frame = useCurrentFrame();
  if (frame < from || frame >= to) return null;
  const s = spring({ frame: frame - from, fps: FPS, config: { damping: 11 } });
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

export const Ep01 = () => {
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: "linear-gradient(#ffb787 0%, #ffe2b0 45%, #e2b877 100%)" }}>
      <ThreeCanvas width={width} height={height} shadows camera={{ fov: 42, near: 0.1, far: 100 }}>
        <World />
      </ThreeCanvas>
      <Badge from={at(1, 0.08)} to={at(1, 0.5)}>6:00 AM</Badge>
      <Badge from={B[4].to + 26} to={EP01_FRAMES}>SABI COMPOUND</Badge>
      <Captions words={data.captions} />
      <Audio src={staticFile("ep01.mp3")} />
    </AbsoluteFill>
  );
};

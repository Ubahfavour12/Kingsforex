import { useThree } from "@react-three/fiber";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

// Each candle: open/close/high/low prices. Edit this to change the chart.
const CANDLES = [
  { open: 1.0, close: 1.6, high: 1.9, low: 0.8 },
  { open: 1.6, close: 1.3, high: 1.8, low: 1.1 },
  { open: 1.3, close: 2.1, high: 2.3, low: 1.2 },
  { open: 2.1, close: 2.6, high: 2.9, low: 1.9 },
  { open: 2.6, close: 2.2, high: 2.8, low: 2.0 },
  { open: 2.2, close: 3.1, high: 3.3, low: 2.1 },
  { open: 3.1, close: 2.8, high: 3.4, low: 2.6 },
  { open: 2.8, close: 3.7, high: 4.0, low: 2.7 },
  { open: 3.7, close: 4.3, high: 4.6, low: 3.5 },
  { open: 4.3, close: 5.0, high: 5.3, low: 4.1 },
];

const UP = "#22c55e";
const DOWN = "#ef4444";
const SPACING = 1.1;
const FRAMES_BETWEEN_CANDLES = 8;

const Candle = ({ index }: { index: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { open, close, high, low } = CANDLES[index];

  // Each candle grows in a little after the previous one.
  const grow = spring({
    frame: frame - 15 - index * FRAMES_BETWEEN_CANDLES,
    fps,
    config: { damping: 14 },
  });

  const color = close >= open ? UP : DOWN;
  const bodyHeight = Math.max(Math.abs(close - open), 0.05);
  const bodyCenter = (open + close) / 2;
  const wickHeight = high - low;
  const wickCenter = (high + low) / 2;
  const x = (index - (CANDLES.length - 1) / 2) * SPACING;

  return (
    <group position={[x, 0, 0]} scale={[1, Math.max(grow, 0.0001), 1]}>
      <mesh position={[0, bodyCenter, 0]}>
        <boxGeometry args={[0.6, bodyHeight, 0.6]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.25}
          metalness={0.3}
          roughness={0.35}
        />
      </mesh>
      <mesh position={[0, wickCenter, 0]}>
        <boxGeometry args={[0.08, wickHeight, 0.08]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

// Moves the camera in a slow orbit. Everything is driven by the current
// frame (never by a clock), so renders are deterministic.
const CameraRig = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const camera = useThree((state) => state.camera);

  const angle = interpolate(frame, [0, durationInFrames], [-0.6, 0.6]);
  const radius = interpolate(frame, [0, durationInFrames], [15, 12]);
  camera.position.set(Math.sin(angle) * radius, 4.5, Math.cos(angle) * radius);
  camera.lookAt(0, 2.4, 0);

  return null;
};

export const Scene = () => (
  <>
    <CameraRig />
    <ambientLight intensity={0.6} />
    <directionalLight position={[6, 10, 8]} intensity={2.2} />
    <pointLight position={[-8, 4, -6]} intensity={60} color="#f5c542" />

    {CANDLES.map((_, i) => (
      <Candle key={i} index={i} />
    ))}

    {/* Floor */}
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial color="#0b1020" metalness={0.6} roughness={0.5} />
    </mesh>
    <gridHelper args={[40, 40, "#f5c542", "#1f2a44"]} position={[0, 0.01, 0]} />
  </>
);

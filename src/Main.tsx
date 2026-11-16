import { AbsoluteFill, Audio, staticFile, useVideoConfig } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { Scene } from "./Scene";
import { Captions } from "./Captions";

export const Main = () => {
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: "radial-gradient(circle at 50% 35%, #1b2440 0%, #05070d 70%)",
      }}
    >
      {/* 3D layer (Three.js) */}
      <ThreeCanvas
        width={width}
        height={height}
        camera={{ fov: 40, position: [0, 3, 14] }}
      >
        <Scene />
      </ThreeCanvas>

      {/* Captions layer */}
      <Captions />

      {/* Audio — replace public/audio.wav with your music or voiceover */}
      <Audio src={staticFile("audio.wav")} volume={0.8} />
    </AbsoluteFill>
  );
};

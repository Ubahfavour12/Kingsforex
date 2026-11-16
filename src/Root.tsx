import { Composition } from "remotion";
import { CharacterSheet } from "./CharacterSheet";
import { Ep01, EP01_FRAMES } from "./Ep01";

const FPS = 30;

export const Root = () => (
  <>
    {/* vertical 9:16 for Shorts and TikTok */}
    <Composition id="Ep01" component={Ep01} durationInFrames={EP01_FRAMES} fps={FPS} width={1080} height={1920} />
    <Composition id="CharacterSheet" component={CharacterSheet} durationInFrames={1} fps={FPS} width={1920} height={1080} />
  </>
);

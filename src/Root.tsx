import { Composition } from "remotion";
import { CharacterSheet } from "./CharacterSheet";
import { episodeFrames, FPS } from "./Episode";
import { Ep01 } from "./ep01";
import ep01 from "./ep01.json";

export const Root = () => (
  <>
    {/* vertical 9:16 for Shorts and TikTok */}
    <Composition id="Ep01" component={Ep01} durationInFrames={episodeFrames(ep01)} fps={FPS} width={1080} height={1920} />
    <Composition id="CharacterSheet" component={CharacterSheet} durationInFrames={1} fps={FPS} width={1920} height={1080} />
  </>
);

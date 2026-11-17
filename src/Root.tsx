import { Composition } from "remotion";
import { CharacterSheet } from "./CharacterSheet";
import { episodeFrames, FPS } from "./Episode";
import { Ep01 } from "./ep01";
import ep01 from "./ep01.json";
import { Ep02 } from "./ep02";
import ep02 from "./ep02.json";
import { Ep03 } from "./ep03";
import ep03 from "./ep03.json";
import { Ep04 } from "./ep04";
import ep04 from "./ep04.json";

export const Root = () => (
  <>
    {/* vertical 9:16 for Shorts and TikTok */}
    <Composition id="Ep01" component={Ep01} durationInFrames={episodeFrames(ep01)} fps={FPS} width={1080} height={1920} />
    <Composition id="Ep02" component={Ep02} durationInFrames={episodeFrames(ep02)} fps={FPS} width={1080} height={1920} />
    <Composition id="Ep03" component={Ep03} durationInFrames={episodeFrames(ep03)} fps={FPS} width={1080} height={1920} />
    <Composition id="Ep04" component={Ep04} durationInFrames={episodeFrames(ep04)} fps={FPS} width={1080} height={1920} />
    <Composition id="CharacterSheet" component={CharacterSheet} durationInFrames={1} fps={FPS} width={1920} height={1080} />
  </>
);

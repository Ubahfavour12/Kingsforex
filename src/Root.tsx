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
import { Ep05 } from "./ep05";
import ep05 from "./ep05.json";
import { Ep06 } from "./ep06";
import ep06 from "./ep06.json";
import { Ep07 } from "./ep07";
import ep07 from "./ep07.json";
import { Ep08 } from "./ep08";
import ep08 from "./ep08.json";
import { Ep09 } from "./ep09";
import ep09 from "./ep09.json";
import { Ep10 } from "./ep10";
import ep10 from "./ep10.json";

export const Root = () => (
  <>
    {/* vertical 9:16 for Shorts and TikTok */}
    <Composition id="Ep01" component={Ep01} durationInFrames={episodeFrames(ep01)} fps={FPS} width={1080} height={1920} />
    <Composition id="Ep02" component={Ep02} durationInFrames={episodeFrames(ep02)} fps={FPS} width={1080} height={1920} />
    <Composition id="Ep03" component={Ep03} durationInFrames={episodeFrames(ep03)} fps={FPS} width={1080} height={1920} />
    <Composition id="Ep04" component={Ep04} durationInFrames={episodeFrames(ep04)} fps={FPS} width={1080} height={1920} />
    <Composition id="Ep05" component={Ep05} durationInFrames={episodeFrames(ep05)} fps={FPS} width={1080} height={1920} />
    <Composition id="Ep06" component={Ep06} durationInFrames={episodeFrames(ep06)} fps={FPS} width={1080} height={1920} />
    <Composition id="Ep07" component={Ep07} durationInFrames={episodeFrames(ep07)} fps={FPS} width={1080} height={1920} />
    <Composition id="Ep08" component={Ep08} durationInFrames={episodeFrames(ep08)} fps={FPS} width={1080} height={1920} />
    <Composition id="Ep09" component={Ep09} durationInFrames={episodeFrames(ep09)} fps={FPS} width={1080} height={1920} />
    <Composition id="Ep10" component={Ep10} durationInFrames={episodeFrames(ep10)} fps={FPS} width={1080} height={1920} />
    <Composition id="CharacterSheet" component={CharacterSheet} durationInFrames={1} fps={FPS} width={1920} height={1080} />
  </>
);

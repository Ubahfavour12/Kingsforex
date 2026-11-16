import { Composition } from "remotion";
import { Main } from "./Main";
import { CharacterSheet } from "./CharacterSheet";

export const FPS = 30;
export const DURATION_SECONDS = 10;

export const Root = () => (
  <>
  <Composition id="CharacterSheet" component={CharacterSheet} durationInFrames={1} fps={FPS} width={1920} height={1080} />
  <Composition
    id="Main"
    component={Main}
    durationInFrames={FPS * DURATION_SECONDS}
    fps={FPS}
    width={1920}
    height={1080}
  />
  </>
);

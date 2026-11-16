import { Composition } from "remotion";
import { Main } from "./Main";

export const FPS = 30;
export const DURATION_SECONDS = 10;

export const Root = () => (
  <Composition
    id="Main"
    component={Main}
    durationInFrames={FPS * DURATION_SECONDS}
    fps={FPS}
    width={1920}
    height={1080}
  />
);

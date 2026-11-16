import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
// Three.js needs WebGL in the headless browser. "angle" works on most
// machines; use "swangle" on servers without a GPU.
Config.setChromiumOpenGlRenderer("angle");

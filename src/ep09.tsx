// Episode 9 — "Danfo Hotspot". Pure data for the episode engine.
// Beat numbers match the lines of assets/ep09/beats.txt (starting at 0).
import { Episode, type Segment, type Shot } from "./Episode";
import { DANFO_X, OFFICE_X, type V3 } from "./Sets";
import data from "./ep09.json";

const YELLOW = "#ffd23f";
const GREEN = "#2fbf5b";
const BLUE = "#2f4a8f";
const RED = "#d62f2f";

// everyone stands just behind the front bench, so they read as seated
const dev: V3 = [DANFO_X, -0.1, 0.25];
const chickenLady: V3 = [DANFO_X - 1.0, -0.1, 0.25];
const sleeper: V3 = [DANFO_X + 1.0, -0.1, 0.25];
const conductor: V3 = [DANFO_X + 2.1, 0.1, 1.2];
const boyBack: V3 = [DANFO_X - 0.4, 0.0, -1.4];
const client: V3 = [OFFICE_X, 0.1, -0.6];

const bus: Shot = { pos: [DANFO_X, 1.6, 6.8], look: [DANFO_X, 1.2, -0.3], push: 0.12 };
const busDev: Shot = { pos: [DANFO_X, 1.5, 3.8], look: [DANFO_X, 1.45, 0.25], push: 0.18 };
const busConductor: Shot = { pos: [DANFO_X + 1.6, 1.7, 5.0], look: [DANFO_X + 1.6, 1.6, 0.8], push: 0.15 };
const office: Shot = { pos: [OFFICE_X, 1.8, 6.0], look: [OFFICE_X, 1.6, -0.6], push: 0.2 };

const above = (at: V3, dx = 0, y = 2.45): V3 => [at[0] + dx, at[1] + y, at[2] + 0.2];
const sky = (dx: number, y = 2.7): V3 => [DANFO_X + dx, y, 0.8];
const bench = { dev: { at: dev }, mama: { at: chickenLady, face: "happy" as const }, landlord: { at: sleeper, face: "neutral" as const } };

const SEGMENTS: Segment[] = [
  // ===== Act 1: office on wheels =====
  { b: 0, shot: bus, cast: { ...bench, dev: { at: dev, talk: true } }, gags: [{ text: "MEETING... IN A DANFO", at: sky(0), w: 2.0, fill: YELLOW, p: [0.25, 1] }] },
  {
    b: 1, p: [0, 0.4], shot: office,
    cast: { client: { at: client, talk: true } },
    gags: [{ text: "NEW TIME: 9AM SHARP", at: above(client), w: 1.9, fill: RED, color: "white", p: [0.3, 1] }],
  },
  { b: 1, p: [0.4, 1], shot: bus, badge: "3RD MAINLAND BRIDGE", cast: bench, gags: [{ text: "TRAFFIC: 0 KM/H", at: sky(0), w: 1.7, fill: RED, color: "white", p: [0.4, 1] }] },
  {
    b: 2, shot: bus,
    cast: { ...bench, dev: { at: dev, face: "happy", talk: true } },
    gags: [
      { text: "HOTSPOT ON", at: sky(0), w: 1.4, fill: GREEN, color: "white", p: [0.1, 0.4] },
      { text: "LIVE CHICKEN", at: sky(-0.9), w: 1.4, fill: YELLOW, p: [0.4, 0.7] },
      { text: "ZZZ ON MY SHOULDER", at: sky(0.6), w: 1.9, p: [0.7, 1] },
    ],
  },
  { b: 3, shot: busDev, cast: { dev: { at: dev, face: "happy" } }, gags: [{ text: "MUTED. SMILING.", at: above(dev, 0, 2.3), w: 1.7, fill: BLUE, color: "white", p: [0.2, 1] }] },

  // ===== Act 2: the problems =====
  {
    b: 4, shot: busConductor,
    cast: { chairman: { at: conductor, face: "happy", talk: true } },
    gags: [{ text: "OSHODI! OSHODI!", at: above(conductor), w: 1.7, fill: YELLOW, p: [0.35, 1] }],
  },
  { b: 5, p: [0, 0.4], shot: office, cast: { client: { at: client, talk: true } }, gags: [{ text: "WHERE ARE YOU?", at: above(client), w: 1.6, p: [0.2, 1] }] },
  { b: 5, p: [0.4, 0.75], shot: busDev, cast: { dev: { at: dev, face: "happy", talk: true } }, gags: [{ text: "CO-WORKING SPACE", at: above(dev, 0, 2.3), w: 1.8 }] },
  { b: 5, p: [0.75, 1], shot: bus, cast: { ...bench, mama: { at: chickenLady, face: "shocked" } }, gags: [{ text: "KOKORO-KOOO!", at: sky(-0.8), w: 1.6, fill: YELLOW }] },
  {
    b: 6, shot: bus,
    cast: { ...bench, cousin: { at: boyBack, face: "happy", talk: true } },
    gags: [
      { text: "BROS, YOUR HOTSPOT ABEG", at: sky(-0.2, 2.75), w: 2.0, p: [0.25, 0.65] },
      { text: "GOD GO BLESS YOU", at: sky(-0.2, 2.75), w: 1.8, fill: GREEN, color: "white", p: [0.65, 1] },
    ],
  },
  {
    b: 7, shot: bus,
    cast: { ...bench, dev: { at: dev, face: "shocked" }, mama: { at: chickenLady, face: "happy" } },
    gags: [
      { text: "6 DEVICES CONNECTED", at: sky(0), w: 2.0, fill: RED, color: "white", p: [0.15, 0.6] },
      { text: "DRIVER: DOWNLOADING...", at: sky(0), w: 2.0, p: [0.6, 1] },
    ],
  },
  { b: 8, shot: busDev, cast: { dev: { at: dev, face: "vexed", talk: true } }, gags: [{ text: "PASSWORD: MY SURNAME", at: above(dev, 0, 2.3), w: 2.0, fill: RED, color: "white", p: [0.2, 1] }] },
  { b: 9, p: [0, 0.5], shot: office, cast: { client: { at: client, face: "shocked" } }, gags: [{ text: "NETWORK UNSTABLE", at: above(client), w: 1.8, fill: RED, color: "white", p: [0.4, 1] }] },
  { b: 9, p: [0.5, 1], shot: busDev, cast: { dev: { at: dev, face: "shocked", talk: true } }, gags: [{ text: "E FULL TODAY, SIR", at: above(dev, 0, 2.3), w: 1.8, p: [0.2, 1] }] },
  {
    b: 10, shot: busConductor,
    cast: { chairman: { at: conductor, face: "vexed", talk: true } },
    gags: [
      { text: "OGA, YOUR MONEY", at: above(conductor), w: 1.7, p: [0.05, 0.5] },
      { text: "ME TOO I DEY WORK", at: above(conductor), w: 1.8, fill: YELLOW, p: [0.7, 1] },
    ],
  },

  // ===== Act 3: the pitch =====
  { b: 11, shot: busDev, night: true, cast: { dev: { at: dev, face: "neutral" } } },
  { b: 12, shot: office, cast: { client: { at: client, talk: true } }, gags: [{ text: "TRANSPORT APP IDEA?", at: above(client), w: 1.9, fill: BLUE, color: "white", p: [0.3, 1] }] },
  {
    b: 13, shot: bus,
    cast: { ...bench, chairman: { at: conductor, face: "vexed" } },
    gags: [
      { text: "NO CHANGE", at: sky(0), w: 1.3, fill: YELLOW, p: [0.05, 0.38] },
      { text: "WHICH ROAD FREE?", at: sky(0), w: 1.7, p: [0.38, 0.7] },
      { text: "FINDING NETWORK", at: sky(0), w: 1.7, fill: BLUE, color: "white", p: [0.7, 1] },
    ],
  },
  { b: 14, shot: busDev, cast: { dev: { at: dev, face: "happy", talk: true } }, gags: [{ text: "PITCHING...", at: above(dev, 0, 2.3), w: 1.4, fill: GREEN, color: "white", p: [0.3, 1] }] },
  {
    b: 15, shot: office,
    cast: { client: { at: client, face: "happy", talk: true } },
    gags: [
      { text: "...", at: above(client), w: 0.9, p: [0, 0.3] },
      { text: "BRILLIANT! WHAT RESEARCH?", at: above(client), w: 2.1, fill: GREEN, color: "white", p: [0.3, 1] },
    ],
  },
  {
    b: 16, shot: bus,
    cast: { ...bench, dev: { at: dev, face: "happy", talk: true }, chairman: { at: conductor, face: "happy", talk: true } },
    gags: [
      { text: "OSHODI!!", at: sky(0), w: 1.3, fill: YELLOW, p: [0, 0.45] },
      { text: "FIELD WORK, SIR.", at: sky(0, 2.7), w: 1.8, fill: GREEN, color: "white", p: [0.45, 1] },
    ],
  },
  { b: "tail", shot: busDev, badge: "SABI COMPOUND", cast: { dev: { at: dev, face: "happy" } } },
];

export const Ep09 = () => <Episode data={data} segments={SEGMENTS} audio="ep09.mp3" />;

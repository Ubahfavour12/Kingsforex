// Episode 4 — "Landlord See My Laptop". Pure data for the episode engine.
// Beat numbers match the lines of assets/ep04/beats.txt (starting at 0).
import { Episode, type Actor, type Segment, type Shot } from "./Episode";
import { BED_X, DOOR_X, PARLOUR_X, type V3 } from "./Sets";
import data from "./ep04.json";

const YELLOW = "#ffd23f";
const GREEN = "#2fbf5b";
const BLUE = "#2f4a8f";
const RED = "#d62f2f";

const devBed: Actor = { at: [BED_X - 0.3, 0.3, -0.7], scale: 1.2 };
const baba: V3 = [BED_X + 1.5, 0.1, -1.4]; // at the window
const babaDoor: V3 = [DOOR_X + 0.5, 0.1, -0.6];
const devDoor: V3 = [DOOR_X - 0.8, 0.1, -0.3];
const babaPar: V3 = [PARLOUR_X - 0.6, 0.1, -0.6];
const devPar: V3 = [PARLOUR_X + 0.8, 0.1, -0.6];
const mamaPar: V3 = [PARLOUR_X - 1.6, 0.1, -0.8];

const bedDev: Shot = { pos: [-0.3, 1.9, 5.0], look: [-0.3, 1.95, -0.7] };
const bedWide: Shot = { pos: [0.4, 1.8, 7.6], look: [0.4, 1.5, -0.8], push: 0.18 };
const bedBaba: Shot = { pos: [BED_X + 1.5, 1.85, 3.6], look: [BED_X + 1.5, 1.8, -1.4], push: 0.18 };
const door: Shot = { pos: [DOOR_X - 0.2, 1.6, 7.6], look: [DOOR_X - 0.2, 1.4, -0.5], push: 0.15 };
const doorDev: Shot = { pos: [DOOR_X - 0.8, 1.6, 4.2], look: [DOOR_X - 0.8, 1.6, -0.3], push: 0.18 };
const doorBaba: Shot = { pos: [DOOR_X + 0.5, 1.7, 4.2], look: [DOOR_X + 0.5, 1.65, -0.6], push: 0.15 };
const parWide: Shot = { pos: [PARLOUR_X - 0.2, 1.7, 8.6], look: [PARLOUR_X - 0.2, 1.4, -0.5], push: 0.15 };
const parBaba: Shot = { pos: [PARLOUR_X - 0.6, 1.7, 4.2], look: [PARLOUR_X - 0.6, 1.65, -0.6], push: 0.18 };

const above = (at: V3, dx = 0, y = 2.45): V3 => [at[0] + dx, at[1] + y, at[2] + 0.2];
const overBed: V3 = [BED_X - 0.3, 2.8, -0.2];

const SEGMENTS: Segment[] = [
  // ===== Act 1: the rule of the compound =====
  {
    b: 0, shot: bedWide,
    cast: { dev: { ...devBed, talk: true } },
    gags: [{ text: "RENT +N100,000", at: overBed, w: 1.7, fill: RED, color: "white", p: [0.35, 1] }],
  },
  {
    b: 1, shot: bedDev,
    cast: { dev: { ...devBed, face: "happy", talk: true } },
    gags: [
      { text: "3 YEARS HIDING", at: overBed, w: 1.6, p: [0, 0.5] },
      { text: "STUDENT MODE", at: overBed, w: 1.6, fill: BLUE, color: "white", p: [0.5, 1] },
    ],
  },
  {
    b: 2, shot: doorBaba,
    cast: { landlord: { at: babaDoor, face: "happy", talk: true } },
    gags: [{ text: "RENT BY FACE", at: above(babaDoor), w: 1.6, fill: YELLOW, p: [0.45, 1] }],
  },
  {
    b: 3, p: [0, 0.6], shot: door,
    cast: { landlord: { at: babaDoor, face: "vexed" } },
    gags: [
      { text: "NEW CURTAIN: +RENT", at: [DOOR_X - 0.9, 2.7, 0], w: 1.9, p: [0, 1] },
      { text: "PAINT DOOR: +RENT", at: [DOOR_X + 0.3, 3.25, 0], w: 1.9, fill: YELLOW, p: [0.45, 1] },
    ],
  },
  {
    b: 3, p: [0.6, 1], shot: parBaba,
    cast: { landlord: { at: babaPar, face: "happy", talk: true }, mama: { at: mamaPar, face: "shocked" } },
    gags: [{ text: "MADAM, YOU DON DEY COMFORTABLE", at: above(babaPar, -0.3), w: 2.1, p: [0.25, 1] }],
  },

  // ===== Act 2: the shadow at the window =====
  {
    b: 4, shot: bedDev,
    cast: { dev: { ...devBed, face: "happy", talk: true } },
    gags: [{ text: "ZOOM: CLIENT", at: overBed, w: 1.5, fill: BLUE, color: "white", p: [0.15, 1] }],
  },
  { b: 5, shot: bedWide, night: true, cast: { dev: { ...devBed, face: "shocked" }, landlord: { at: baba, walkFrom: [BED_X + 4, 0.1, -1.4] } } },
  {
    b: 6, p: [0, 0.4], shot: bedBaba,
    cast: { landlord: { at: baba, face: "shocked" } },
    gags: [{ text: "OYINBO??", at: above(baba), w: 1.3, fill: YELLOW, p: [0.4, 1] }],
  },
  { b: 6, p: [0.4, 0.7], shot: bedDev, cast: { dev: { ...devBed, face: "shocked" }, landlord: { at: baba } } },
  { b: 6, p: [0.7, 1], shot: bedBaba, cast: { landlord: { at: baba, face: "shocked" } }, gags: [{ text: "OYINBO!!", at: above(baba), w: 1.3, fill: YELLOW }] },
  {
    b: 7, shot: bedBaba,
    cast: { landlord: { at: baba, face: "happy" } },
    gags: [{ text: "KA-CHING", at: above(baba), w: 1.3, fill: GREEN, color: "white", p: [0.4, 1] }],
  },

  // ===== Act 3: the letter =====
  {
    b: 8, shot: doorDev, night: true,
    cast: { dev: { at: devDoor, face: "shocked" } },
    gags: [
      { text: "DEAR TENANT...", at: above(devDoor), w: 1.6, p: [0.1, 1] },
      { text: "INTERNATIONAL CONNECTIONS", at: above(devDoor, 0, 1.95), w: 2.1, fill: RED, color: "white", p: [0.45, 1] },
    ],
  },
  {
    b: 9, shot: doorDev, night: true,
    cast: { dev: { at: devDoor, face: "vexed", talk: true } },
    gags: [{ text: "BABA, NA ZOOM!", at: above(devDoor), w: 1.7, fill: YELLOW, p: [0.3, 1] }],
  },
  { b: 10, shot: door, cast: { dev: { at: devDoor, talk: true }, landlord: { at: babaDoor } } },
  {
    b: 11, shot: doorBaba,
    cast: { landlord: { at: babaDoor, face: "happy", talk: true } },
    gags: [{ text: "EXPATRIATE RENT", at: above(babaDoor), w: 1.8, fill: RED, color: "white", p: [0.5, 1] }],
  },
  {
    b: 12, shot: doorDev,
    cast: { dev: { at: devDoor, face: "vexed", talk: true } },
    gags: [{ text: "HOUSE HUNTING...", at: above(devDoor), w: 1.7, p: [0.5, 1] }],
  },

  // ===== Act 4: the notebook =====
  {
    b: 13, p: [0, 0.5], shot: parBaba, night: true,
    cast: { landlord: { at: babaPar, face: "shocked" } },
    gags: [{ text: "12 TENANTS. WHO PAY??", at: above(babaPar), w: 2.0, p: [0.25, 1] }],
  },
  {
    b: 13, p: [0.5, 1], shot: parBaba, night: true,
    cast: { landlord: { at: babaPar, face: "vexed" } },
    gags: [{ text: "NOTEBOOK: RAIN BEAT AM", at: above(babaPar), w: 2.1, fill: BLUE, color: "white", p: [0.2, 1] }],
  },
  {
    b: 14, shot: door, night: true,
    cast: { dev: { at: devDoor }, landlord: { at: babaDoor, face: "neutral", talk: true } },
    gags: [{ text: "E FIT REMEMBER WHO OWE ME?", at: above(babaDoor, -0.4), w: 2.1, p: [0.45, 1] }],
  },
  {
    b: 15, shot: bedDev, night: true,
    cast: { dev: { ...devBed, face: "happy", talk: true } },
    gags: [{ text: "RENT TRACKER APP", at: overBed, w: 1.8, fill: GREEN, color: "white", p: [0.2, 1] }],
  },
  {
    b: 16, shot: parWide,
    cast: { landlord: { at: babaPar, face: "happy", talk: true }, dev: { at: devPar, face: "happy" } },
    gags: [{ text: "RENT DON REDUCE!", at: above(babaPar), w: 1.8, fill: YELLOW, p: [0.45, 1] }],
  },
  {
    b: 17, shot: bedDev,
    cast: { dev: { ...devBed, face: "happy", talk: true } },
    gags: [{ text: "NEW ENTRY ADDED...", at: overBed, w: 1.7, p: [0.6, 1] }],
  },
  {
    b: 18, shot: bedDev,
    cast: { dev: { ...devBed, face: "shocked" } },
    gags: [
      { text: "LAPTOP BOY", at: overBed, w: 1.4, p: [0, 1] },
      { text: "APP FEE: N100,000", at: [BED_X - 0.3, 2.35, -0.1], w: 1.8, fill: RED, color: "white", p: [0.35, 1] },
    ],
  },
  { b: "tail", shot: bedDev, badge: "SABI COMPOUND", cast: { dev: { ...devBed, face: "shocked" } } },
];

export const Ep04 = () => <Episode data={data} segments={SEGMENTS} audio="ep04.mp3" />;

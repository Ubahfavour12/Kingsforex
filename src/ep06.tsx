// Episode 6 — "Dollar Rate Change Overnight". Pure data for the episode engine.
// Beat numbers match the lines of assets/ep06/beats.txt (starting at 0).
import { Episode, type Actor, type Segment, type Shot } from "./Episode";
import { BED_X, PARLOUR_X, SHOP_X, type V3 } from "./Sets";
import data from "./ep06.json";

const YELLOW = "#ffd23f";
const GREEN = "#2fbf5b";
const BLUE = "#2f4a8f";
const RED = "#d62f2f";

const devBed: Actor = { at: [BED_X - 0.3, 0.3, -0.7], scale: 1.2 };
const chairBed: V3 = [BED_X + 1.3, 0.1, -0.2];
const aboki: V3 = [SHOP_X, 0.1, 0.2]; // money changer at his spot in front of the shop
const mamaPar: V3 = [PARLOUR_X - 1.0, 0.1, -0.6];
const devPar: V3 = [PARLOUR_X + 0.9, 0.1, -0.2];
const devTable: V3 = [PARLOUR_X + 0.3, 0.1, 0.25]; // behind the centre table, food in front

const bedDev: Shot = { pos: [-0.3, 1.9, 5.0], look: [-0.3, 1.95, -0.7] };
const bedWide: Shot = { pos: [0.4, 1.8, 7.6], look: [0.4, 1.5, -0.6], push: 0.18 };
const streetTwo: Shot = { pos: [SHOP_X + 0.6, 1.7, 6.6], look: [SHOP_X + 0.6, 1.5, 0.3], push: 0.15 };
const street: Shot = { pos: [SHOP_X, 1.7, 4.6], look: [SHOP_X, 1.6, 0.2], push: 0.18 };
const parWide: Shot = { pos: [PARLOUR_X - 0.1, 1.7, 8.6], look: [PARLOUR_X - 0.1, 1.4, -0.4], push: 0.15 };
const parMama: Shot = { pos: [PARLOUR_X - 1.0, 1.65, 4.2], look: [PARLOUR_X - 1.0, 1.6, -0.6], push: 0.18 };
const parFood: Shot = { pos: [PARLOUR_X + 0.3, 2.0, 5.4], look: [PARLOUR_X + 0.3, 1.3, 1.2], push: 0.2 };

const above = (at: V3, dx = 0, y = 2.45): V3 => [at[0] + dx, at[1] + y, at[2] + 0.2];
const overBed: V3 = [BED_X - 0.3, 2.8, -0.2];

const SEGMENTS: Segment[] = [
  // ===== Act 1: rich on Friday =====
  {
    b: 0, shot: bedWide,
    cast: { dev: { ...devBed, face: "happy", talk: true } },
    gags: [
      { text: "RICH MAN", at: overBed, w: 1.4, fill: GREEN, color: "white", p: [0.1, 0.5] },
      { text: "POOR MAN", at: overBed, w: 1.4, fill: RED, color: "white", p: [0.5, 1] },
    ],
  },
  {
    b: 1, shot: bedDev, badge: "FRIDAY NIGHT", night: true,
    cast: { dev: { ...devBed, face: "happy", talk: true } },
    gags: [{ text: "RATE: SWEET!", at: overBed, w: 1.5, fill: GREEN, color: "white", p: [0.55, 1] }],
  },
  {
    b: 2, shot: bedDev, night: true,
    cast: { dev: { ...devBed, face: "happy", talk: true } },
    gags: [
      { text: "RENT OK", at: overBed, w: 1.2, p: [0.2, 0.47] },
      { text: "GENERATOR OK", at: overBed, w: 1.5, fill: YELLOW, p: [0.47, 0.73] },
      { text: "SHAWARMA OK", at: overBed, w: 1.5, fill: GREEN, color: "white", p: [0.73, 1] },
    ],
  },
  {
    b: 3, shot: bedDev, night: true,
    cast: { dev: { ...devBed, face: "happy", talk: true } },
    gags: [{ text: "WETIN FIT HAPPEN?", at: overBed, w: 1.8, p: [0.3, 1] }],
  },

  // ===== Act 2: the fall =====
  {
    b: 4, shot: bedDev, badge: "SATURDAY",
    cast: { dev: { ...devBed, face: "shocked" } },
    gags: [{ text: "RATE: FALL DOWN", at: overBed, w: 1.7, fill: RED, color: "white", p: [0.3, 1] }],
  },
  {
    b: 5, shot: bedDev,
    cast: { dev: { ...devBed, face: "vexed", talk: true } },
    gags: [
      { text: "GENERATOR -> LAMP", at: overBed, w: 1.8, p: [0.05, 0.55] },
      { text: "SHAWARMA -> GALA", at: overBed, w: 1.8, fill: YELLOW, p: [0.55, 1] },
    ],
  },
  { b: 6, p: [0, 0.55], shot: bedDev, cast: { dev: { ...devBed, face: "vexed", talk: true } }, gags: [{ text: "ABEG WETIN HAPPEN?", at: overBed, w: 1.8, p: [0.4, 1] }] },
  { b: 6, p: [0.55, 1], shot: street, cast: { aboki: { at: aboki, talk: true } }, gags: [{ text: "OGA, NA MARKET", at: above(aboki), w: 1.6, fill: YELLOW, p: [0.3, 1] }] },
  { b: 7, p: [0, 0.5], shot: bedDev, cast: { dev: { ...devBed, face: "vexed", talk: true } }, gags: [{ text: "MARKET FOR MIDNIGHT?", at: overBed, w: 1.9 }] },
  { b: 7, p: [0.5, 1], shot: street, cast: { aboki: { at: aboki, face: "happy", talk: true } }, gags: [{ text: "DOLLAR NO DEY SLEEP", at: above(aboki), w: 1.9, fill: GREEN, color: "white", p: [0.2, 1] }] },
  {
    b: 8, shot: bedDev,
    cast: { dev: { ...devBed, face: "shocked" } },
    gags: [
      { text: "REFRESH", at: overBed, w: 1.2, fill: BLUE, color: "white", p: [0.3, 0.5] },
      { text: "FALL", at: overBed, w: 1.0, fill: RED, color: "white", p: [0.5, 0.65] },
      { text: "REFRESH", at: overBed, w: 1.2, fill: BLUE, color: "white", p: [0.65, 0.82] },
      { text: "FALL AGAIN", at: overBed, w: 1.4, fill: RED, color: "white", p: [0.82, 1] },
    ],
  },
  { b: 9, p: [0, 0.45], shot: parMama, cast: { mama: { at: mamaPar, face: "shocked", talk: true } }, gags: [{ text: "WHO DIE?", at: above(mamaPar), w: 1.3, p: [0.4, 1] }] },
  { b: 9, p: [0.45, 0.7], shot: parWide, cast: { mama: { at: mamaPar, face: "shocked" }, dev: { at: devPar, face: "vexed", talk: true } }, gags: [{ text: "DOLLAR.", at: above(devPar), w: 1.2, fill: GREEN, color: "white" }] },
  { b: 9, p: [0.7, 1], shot: parMama, cast: { mama: { at: mamaPar, face: "neutral", talk: true } }, gags: [{ text: "E BE YOUR FAMILY?", at: above(mamaPar), w: 1.8, fill: YELLOW, p: [0.2, 1] }] },
  {
    b: 10, shot: bedWide,
    cast: { dev: { ...devBed, face: "neutral" }, chairman: { at: chairBed, face: "happy", talk: true, walkFrom: [BED_X + 4.5, 0.1, -0.2] } },
    gags: [{ text: "HOLD AM! TRUST ME!", at: above(chairBed, -0.3), w: 1.9, fill: YELLOW, p: [0.4, 1] }],
  },
  {
    b: 11, shot: bedDev,
    cast: { dev: { ...devBed, face: "happy", talk: true } },
    gags: [{ text: "CHAIRMAN SAY HOLD = SELL", at: overBed, w: 2.0, fill: RED, color: "white", p: [0.4, 1] }],
  },

  // ===== Act 3: the stubborn weekend =====
  {
    b: 12, shot: parFood, badge: "SUNDAY", flags: ["food"],
    cast: { dev: { at: devTable, face: "vexed" } },
    gags: [{ text: "N1,580/$ IN THE STEW", at: [PARLOUR_X + 0.3, 2.4, 0.7], w: 1.9, fill: RED, color: "white", p: [0.55, 1] }],
  },
  {
    b: 13, shot: streetTwo, badge: "MONDAY",
    cast: { aboki: { at: aboki, face: "happy" }, dev: { at: [SHOP_X + 1.2, 0.1, 0.4], face: "vexed", talk: true, walkFrom: [SHOP_X + 4.5, 0.1, 0.4] } },
    gags: [{ text: "CHANGE AM ALL", at: above(aboki, 0.5), w: 1.6, p: [0.4, 1] }],
  },
  {
    b: 14, shot: bedDev, night: true,
    cast: { dev: { ...devBed, face: "neutral", talk: true } },
    gags: [{ text: "E DEY WATCH YOU. PERSONALLY.", at: overBed, w: 2.1, fill: BLUE, color: "white", p: [0.3, 1] }],
  },

  // ===== Act 4: the ping =====
  {
    b: 15, shot: bedDev,
    cast: { dev: { ...devBed, face: "shocked" } },
    gags: [
      { text: "PING!", at: overBed, w: 1.0, fill: YELLOW, p: [0.15, 0.4] },
      { text: "RATE: HIGHEST EVER", at: overBed, w: 1.9, fill: GREEN, color: "white", p: [0.4, 1] },
    ],
  },
  {
    b: 16, shot: bedWide,
    cast: { dev: { ...devBed, face: "shocked" }, chairman: { at: chairBed, face: "happy", talk: true, walkFrom: [BED_X + 4.5, 0.1, -0.2] } },
    gags: [{ text: "I TELL YOU!!", at: above(chairBed, -0.2), w: 1.5, fill: YELLOW, p: [0.35, 1] }],
  },
  {
    b: 17, shot: bedDev,
    cast: { dev: { ...devBed, face: "vexed", talk: true } },
    gags: [
      { text: "CHAIRMAN: CORRECT (1st TIME)", at: overBed, w: 2.1, p: [0.1, 0.6] },
      { text: "WITH MY MONEY", at: overBed, w: 1.6, fill: RED, color: "white", p: [0.6, 1] },
    ],
  },
  { b: "tail", shot: bedDev, badge: "SABI COMPOUND", cast: { dev: { ...devBed, face: "vexed" } } },
];

export const Ep06 = () => <Episode data={data} segments={SEGMENTS} audio="ep06.mp3" />;

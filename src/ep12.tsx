// Episode 12 — "Cousin Wan Free Website". Pure data for the episode engine.
// Beat numbers match the lines of assets/ep12/beats.txt (starting at 0).
import { Episode, type Actor, type Segment, type Shot } from "./Episode";
import { BED_X, CAFE_X, PARLOUR_X, type V3 } from "./Sets";
import data from "./ep12.json";

const YELLOW = "#ffd23f";
const GREEN = "#2fbf5b";
const BLUE = "#2f4a8f";
const RED = "#d62f2f";

const devBed: Actor = { at: [BED_X - 0.3, 0.3, -0.7], scale: 1.2 };
const cousin: V3 = [CAFE_X, 0.1, 0.0]; // calls from the cyber cafe
const mamaPar: V3 = [PARLOUR_X - 1.0, 0.1, -0.6];

const bedDev: Shot = { pos: [-0.3, 1.9, 5.0], look: [-0.3, 1.95, -0.7] };
const bedWide: Shot = { pos: [0.4, 1.8, 7.6], look: [0.4, 1.5, -0.6], push: 0.18 };
const cuz: Shot = { pos: [CAFE_X, 1.65, 4.6], look: [CAFE_X, 1.6, 0.0], push: 0.18 };
const parMama: Shot = { pos: [PARLOUR_X - 1.0, 1.65, 4.2], look: [PARLOUR_X - 1.0, 1.6, -0.6], push: 0.18 };

const above = (at: V3, dx = 0, y = 2.45): V3 => [at[0] + dx, at[1] + y, at[2] + 0.2];
const overBed: V3 = [BED_X - 0.3, 2.8, -0.2];

const SEGMENTS: Segment[] = [
  // ===== Act 1: the favour =====
  { b: 0, shot: bedWide, cast: { dev: { ...devBed, face: "vexed", talk: true } }, gags: [{ text: "SMALL FAVOUR = 4 MONTHS", at: overBed, w: 2.0, fill: RED, color: "white", p: [0.25, 1] }] },
  {
    b: 1, p: [0, 0.6], shot: cuz, badge: "SUNDAY EVENING",
    cast: { cousin: { at: cousin, face: "happy", talk: true } },
    gags: [{ text: "ONLY TECH PERSON FOR FAMILY", at: above(cousin), w: 2.1, p: [0.35, 1] }],
  },
  { b: 1, p: [0.6, 1], shot: bedDev, cast: { dev: { ...devBed, face: "vexed" } }, gags: [{ text: "HOLD YOUR WALLET", at: overBed, w: 1.8, fill: YELLOW, p: [0.2, 1] }] },
  {
    b: 2, p: [0, 0.75], shot: cuz,
    cast: { cousin: { at: cousin, face: "happy", talk: true } },
    gags: [
      { text: "SHOE BUSINESS", at: above(cousin), w: 1.6, p: [0.1, 0.5] },
      { text: "SIMPLE. LIKE AMAZON.", at: above(cousin), w: 2.0, fill: YELLOW, p: [0.5, 1] },
    ],
  },
  { b: 2, p: [0.75, 1], shot: bedDev, cast: { dev: { ...devBed, face: "shocked" } }, gags: [{ text: "LIKE AMAZON?!", at: overBed, w: 1.6, fill: RED, color: "white" }] },
  { b: 3, p: [0, 0.4], shot: bedDev, cast: { dev: { ...devBed, talk: true } }, gags: [{ text: "YOUR BUDGET?", at: overBed, w: 1.4 }] },
  { b: 3, p: [0.4, 1], shot: cuz, cast: { cousin: { at: cousin, face: "happy", talk: true } }, gags: [{ text: "BUDGET KE? WE BE FAMILY!", at: above(cousin), w: 2.0, fill: YELLOW, p: [0.2, 1] }] },
  {
    b: 4, shot: parMama,
    cast: { mama: { at: mamaPar, face: "vexed", talk: true } },
    gags: [{ text: "YOU GO CHARGE YOUR OWN BLOOD?", at: above(mamaPar), w: 2.1, p: [0.45, 1] }],
  },

  // ===== Act 2: the revisions =====
  {
    b: 5, shot: bedDev,
    cast: { dev: { ...devBed, talk: true } },
    gags: [
      { text: "\"BLUE NO BLUE ENOUGH\"", at: overBed, w: 2.0, fill: BLUE, color: "white", p: [0.3, 0.7] },
      { text: "\"NOW E TOO BLUE\"", at: overBed, w: 1.8, fill: "#0b1d6b", color: "white", p: [0.7, 1] },
    ],
  },
  {
    b: 6, shot: bedDev,
    cast: { dev: { ...devBed, face: "vexed" } },
    gags: [
      { text: "LOGO: BIG", at: overBed, w: 1.2, fill: YELLOW, p: [0.05, 0.3] },
      { text: "LOGO: BIGGER", at: overBed, w: 1.6, fill: YELLOW, p: [0.3, 0.55] },
      { text: "LOGO COVER SHOE", at: overBed, w: 2.1, fill: YELLOW, p: [0.55, 1] },
    ],
  },
  { b: 7, p: [0, 0.6], shot: cuz, night: true, cast: { cousin: { at: cousin, face: "happy", talk: true } }, gags: [{ text: "ADD MUSIC!", at: above(cousin), w: 1.4, fill: YELLOW, p: [0.4, 1] }] },
  { b: 7, p: [0.6, 1], shot: parMama, night: true, cast: { mama: { at: mamaPar, face: "vexed" } }, gags: [{ text: "REPORTED AGAIN", at: above(mamaPar), w: 1.7, fill: RED, color: "white", p: [0.3, 1] }] },
  {
    b: 8, shot: bedDev, night: true,
    cast: { dev: { ...devBed, face: "shocked" } },
    gags: [{ text: "VOICE NOTE 4:02 \"MORE EXPENSIVE BUTTON\"", at: overBed, w: 2.1, p: [0.15, 1] }],
  },

  // ===== Act 3: twenty thousand =====
  {
    b: 9, shot: bedDev,
    cast: { dev: { ...devBed, face: "happy", talk: true } },
    gags: [
      { text: "WEBSITE READY!", at: overBed, w: 1.6, fill: GREEN, color: "white", p: [0.05, 0.55] },
      { text: "HOSTING: N20,000/YR", at: overBed, w: 1.9, p: [0.55, 1] },
    ],
  },
  { b: 10, p: [0, 0.6], shot: cuz, cast: { cousin: { at: cousin, face: "vexed", talk: true } }, gags: [{ text: "YOU WAN COLLECT MONEY?", at: above(cousin), w: 2.0, fill: RED, color: "white", p: [0.3, 1] }] },
  { b: 10, p: [0.6, 1], shot: bedDev, cast: { dev: { ...devBed, face: "vexed", talk: true } }, gags: [{ text: "NA FOR THE SERVER!", at: overBed, w: 1.8, fill: YELLOW }] },
  {
    b: 11, shot: bedDev,
    cast: { dev: { ...devBed, face: "shocked" } },
    gags: [
      { text: "AUNTY: \"MONEY DON CHANGE AM\"", at: overBed, w: 2.1, fill: GREEN, color: "white", p: [0.4, 0.75] },
      { text: "UNCLE: \"NA SO DEM DEY START\"", at: overBed, w: 2.1, fill: GREEN, color: "white", p: [0.75, 1] },
    ],
  },
  {
    b: 12, shot: bedDev,
    cast: { dev: { ...devBed, face: "neutral", talk: true } },
    gags: [
      { text: "PAID HOSTING MYSELF", at: overBed, w: 1.9, fill: BLUE, color: "white", p: [0.3, 0.7] },
      { text: "SITE: LIVE", at: overBed, w: 1.3, fill: GREEN, color: "white", p: [0.7, 1] },
    ],
  },
  { b: 13, shot: cuz, night: true, cast: { cousin: { at: cousin, face: "happy" } }, gags: [{ text: "ORDERS: 12... 25... 40", at: above(cousin), w: 2.0, fill: GREEN, color: "white", p: [0.4, 1] }] },
  { b: 14, p: [0, 0.5], shot: bedDev, badge: "NEXT MORNING", cast: { dev: { ...devBed, face: "happy" } }, gags: [{ text: "RING RING", at: overBed, w: 1.3, fill: YELLOW, p: [0.4, 1] }] },
  { b: 14, p: [0.5, 1], shot: cuz, cast: { cousin: { at: cousin, face: "happy", talk: true } }, gags: [{ text: "CUSTOMERS WANT APP!", at: above(cousin), w: 2.0, fill: YELLOW, p: [0.25, 1] }] },
  { b: "tail", shot: bedDev, badge: "SABI COMPOUND", cast: { dev: { ...devBed, face: "shocked" } } },
];

export const Ep12 = () => <Episode data={data} segments={SEGMENTS} audio="ep12.mp3" />;

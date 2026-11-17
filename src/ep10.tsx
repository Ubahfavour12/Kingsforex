// Episode 10 — "Borrow Me Money Season". Pure data for the episode engine.
// Beat numbers match the lines of assets/ep10/beats.txt (starting at 0).
import { Episode, type Actor, type Segment, type Shot } from "./Episode";
import { BED_X, DOOR_X, PARLOUR_X, SHOP_X, type V3 } from "./Sets";
import data from "./ep10.json";

const YELLOW = "#ffd23f";
const GREEN = "#2fbf5b";
const BLUE = "#2f4a8f";
const RED = "#d62f2f";

const devBed: Actor = { at: [BED_X - 0.3, 0.3, -0.7], scale: 1.2 };
const iya: V3 = [SHOP_X, 0.45, -1.0];
const devShop: V3 = [SHOP_X + 1.0, 0.1, 0.3];
const devDoor: V3 = [DOOR_X - 1.2, 0.1, -0.3];
// the queue at my door, back to front
const q1: V3 = [DOOR_X - 0.2, 0.1, 0.2];
const q2: V3 = [DOOR_X + 0.7, 0.1, 0.2];
const q3: V3 = [DOOR_X + 1.6, 0.1, 0.2];
const devTable: V3 = [PARLOUR_X + 0.3, 0.1, 0.25];

const bedDev: Shot = { pos: [-0.3, 1.9, 5.0], look: [-0.3, 1.95, -0.7] };
const bedWide: Shot = { pos: [0.4, 1.8, 7.6], look: [0.4, 1.5, -0.6], push: 0.18 };
const shop: Shot = { pos: [SHOP_X + 0.4, 1.8, 8.6], look: [SHOP_X + 0.4, 1.5, -0.4], push: 0.12 };
const queue: Shot = { pos: [DOOR_X + 0.2, 1.8, 10.0], look: [DOOR_X + 0.2, 1.5, -0.3], push: 0.1 };
const doorDev: Shot = { pos: [DOOR_X - 1.2, 1.6, 4.2], look: [DOOR_X - 1.2, 1.6, -0.3], push: 0.18 };
const parFood: Shot = { pos: [PARLOUR_X + 0.3, 2.0, 5.4], look: [PARLOUR_X + 0.3, 1.3, 1.0], push: 0.2 };

const above = (at: V3, dx = 0, y = 2.45): V3 => [at[0] + dx, at[1] + y, at[2] + 0.2];
const overBed: V3 = [BED_X - 0.3, 2.8, -0.2];
const sky = (dx: number, y = 3.0): V3 => [DOOR_X + dx, y, 0.6];

const SEGMENTS: Segment[] = [
  // ===== Act 1: the alert =====
  {
    b: 0, shot: bedWide,
    cast: { dev: { ...devBed, face: "shocked", talk: true } },
    gags: [
      { text: "11 BIRTHDAY WISHES", at: overBed, w: 1.9, fill: YELLOW, p: [0.15, 0.6] },
      { text: "MY BIRTHDAY: MARCH", at: overBed, w: 1.9, fill: RED, color: "white", p: [0.6, 1] },
    ],
  },
  {
    b: 1, shot: bedDev,
    cast: { dev: { ...devBed, face: "happy", talk: true } },
    gags: [
      { text: "PING! SALARY", at: overBed, w: 1.4, fill: GREEN, color: "white", p: [0.3, 0.65] },
      { text: "RING RING RING", at: overBed, w: 1.6, fill: YELLOW, p: [0.65, 1] },
    ],
  },
  { b: 2, shot: bedDev, cast: { dev: { ...devBed, face: "vexed", talk: true } }, gags: [{ text: "COUSIN: \"JUST CHECKING ON YOU\"", at: overBed, w: 2.1, p: [0.1, 1] }] },
  {
    b: 3, shot: bedDev,
    cast: { dev: { ...devBed, face: "vexed", talk: true } },
    gags: [
      { text: "OLD CLASSMATE", at: overBed, w: 1.5, p: [0.05, 0.35] },
      { text: "UNKNOWN: \"GUESS WHO?\"", at: overBed, w: 2.0, fill: YELLOW, p: [0.35, 1] },
    ],
  },
  { b: 4, shot: bedDev, night: true, cast: { dev: { ...devBed, face: "neutral", talk: true } }, gags: [{ text: "DEBUGGING THE LEAK...", at: overBed, w: 1.9, fill: BLUE, color: "white", p: [0.35, 1] }] },
  {
    b: 5, shot: shop,
    cast: { iyabose: { at: iya, face: "happy" }, dev: { at: devShop, talk: true } },
    gags: [{ text: "SHE SEE MY BALANCE", at: above(iya, 0, 2.3), w: 1.9, fill: RED, color: "white", p: [0.55, 1] }],
  },
  { b: 6, shot: shop, cast: { iyabose: { at: iya, face: "happy", talk: true } }, gags: [{ text: "FASTER PASS FIBRE", at: above(iya, 0, 2.3), w: 1.8, fill: YELLOW, p: [0.2, 1] }] },

  // ===== Act 2: the queue =====
  {
    b: 7, shot: queue, badge: "AFTERNOON",
    cast: { dev: { at: devDoor, face: "shocked" }, chairman: { at: q1, face: "happy", talk: true }, landlord: { at: q2, face: "happy" }, cousin: { at: q3, face: "happy" } },
    gags: [
      { text: "\"SMALL CAPITAL\"", at: sky(-0.2), w: 1.6, fill: YELLOW, p: [0.35, 1] },
      { text: "\"ROOF WAN SPOIL\"", at: sky(0.8, 2.5), w: 1.6, p: [0.65, 1] },
    ],
  },
  { b: 8, shot: doorDev, cast: { dev: { at: devDoor, face: "vexed", talk: true } }, gags: [{ text: "GOAT SICK. I BE VET?", at: above(devDoor), w: 1.9, fill: RED, color: "white", p: [0.4, 1] }] },
  {
    b: 9, shot: queue,
    cast: { dev: { at: devDoor, face: "vexed" }, chairman: { at: q1, face: "happy", talk: true }, landlord: { at: q2, face: "happy", talk: true }, cousin: { at: q3, face: "happy", talk: true } },
    gags: [{ text: "\"JUST TILL MONTH END\"", at: sky(0.3), w: 2.0, fill: YELLOW, p: [0.3, 1] }],
  },

  // ===== Act 3: the plan =====
  {
    b: 10, shot: bedDev,
    cast: { dev: { ...devBed, face: "happy", talk: true } },
    gags: [
      { text: "RENT: 6 MONTHS PAID", at: overBed, w: 1.9, fill: GREEN, color: "white", p: [0.3, 0.6] },
      { text: "FUEL + FOODSTUFF", at: overBed, w: 1.8, fill: YELLOW, p: [0.6, 1] },
    ],
  },
  {
    b: 11, shot: bedDev,
    cast: { dev: { ...devBed, face: "happy", talk: true } },
    gags: [
      { text: "BALANCE: N2,000", at: overBed, w: 1.7, fill: RED, color: "white", p: [0.1, 0.5] },
      { text: "*SCREENSHOT*", at: overBed, w: 1.5, p: [0.5, 1] },
    ],
  },
  { b: 12, shot: parFood, flags: ["food"], cast: { dev: { at: devTable, face: "happy", talk: true } }, gags: [{ text: "QUEUE: SCATTERED", at: [PARLOUR_X + 0.3, 2.4, 0.7], w: 1.8, fill: GREEN, color: "white", p: [0.2, 1] }] },
  { b: 13, shot: shop, night: true, cast: { iyabose: { at: iya, face: "happy" } }, gags: [{ text: "IYA BOSE: ONLINE", at: above(iya, 0, 2.3), w: 1.8, fill: BLUE, color: "white", p: [0.4, 1] }] },

  // ===== Act 4: the plates =====
  {
    b: 14, shot: queue, night: true,
    cast: { dev: { at: devDoor, face: "shocked" }, iyabose: { at: q1, face: "happy" }, mama: { at: q2, face: "happy" }, chairman: { at: q3, face: "happy" } },
    gags: [{ text: "*EVERYBODY GET PLATE*", at: sky(0.4), w: 2.0, fill: YELLOW, p: [0.35, 1] }],
  },
  {
    b: 15, shot: queue, night: true,
    cast: { dev: { at: devDoor, face: "neutral", talk: true }, iyabose: { at: q1, face: "happy", talk: true }, mama: { at: q2, face: "happy" }, chairman: { at: q3, face: "happy" } },
    gags: [
      { text: "WE HEAR SAY YOU NO GET MONEY", at: sky(0.2), w: 2.1, p: [0.05, 0.65] },
      { text: "YES O. NOTHING DEY.", at: above(devDoor, 0.4), w: 1.8, fill: BLUE, color: "white", p: [0.65, 1] },
    ],
  },
  {
    b: 16, shot: queue, night: true,
    cast: { dev: { at: devDoor, face: "shocked" }, iyabose: { at: q1, face: "happy", talk: true }, mama: { at: q2, face: "happy" }, chairman: { at: q3, face: "happy" } },
    gags: [{ text: "WE COME FOR THE RICE.", at: sky(0.2), w: 2.0, fill: YELLOW, p: [0.35, 1] }],
  },
  { b: "tail", shot: doorDev, night: true, badge: "SABI COMPOUND", cast: { dev: { at: devDoor, face: "shocked" } } },
];

export const Ep10 = () => <Episode data={data} segments={SEGMENTS} audio="ep10.mp3" />;

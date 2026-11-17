// Episode 5 — "Chairman Sure Deal". Pure data for the episode engine.
// Beat numbers match the lines of assets/ep05/beats.txt (starting at 0).
import { Episode, type Actor, type Segment, type Shot } from "./Episode";
import { BED_X, CAFE_X, DOOR_X, type V3 } from "./Sets";
import data from "./ep05.json";

const YELLOW = "#ffd23f";
const GREEN = "#2fbf5b";
const BLUE = "#2f4a8f";
const RED = "#d62f2f";

const devBed: Actor = { at: [BED_X - 0.3, 0.3, -0.7], scale: 1.2 };
const chairDoor: V3 = [DOOR_X + 0.5, 0.1, -0.6];
const devDoor: V3 = [DOOR_X - 0.8, 0.1, -0.3];
const iyaDoor: V3 = [DOOR_X - 1.45, 0.1, 0.3];
const babaDoor: V3 = [DOOR_X + 1.45, 0.1, 0.3];
const mamaDoor: V3 = [DOOR_X - 0.5, 0.1, -0.1];
const boy: V3 = [CAFE_X - 0.5, 0.1, 0.0];
const chairCafe: V3 = [CAFE_X + 0.5, 0.1, 0.0];
const devCafe: V3 = [CAFE_X + 1.45, 0.1, 0.4];
const iyaCafe: V3 = [CAFE_X - 1.45, 0.1, 0.4];

const door: Shot = { pos: [DOOR_X, 1.8, 10.5], look: [DOOR_X, 1.5, -0.4], push: 0.1 };
const doorChair: Shot = { pos: [DOOR_X + 0.5, 1.7, 4.2], look: [DOOR_X + 0.5, 1.65, -0.6], push: 0.18 };
const doorDev: Shot = { pos: [DOOR_X - 0.8, 1.6, 4.2], look: [DOOR_X - 0.8, 1.6, -0.3], push: 0.18 };
const bedDev: Shot = { pos: [-0.3, 1.9, 5.0], look: [-0.3, 1.95, -0.7] };
const cafe: Shot = { pos: [CAFE_X, 1.8, 10], look: [CAFE_X, 1.4, -0.4], push: 0.1 };
const cafeBoy: Shot = { pos: [CAFE_X, 1.6, 5.0], look: [CAFE_X, 1.5, 0.0], push: 0.18 };

const above = (at: V3, dx = 0, y = 2.45): V3 => [at[0] + dx, at[1] + y, at[2] + 0.2];
const overBed: V3 = [BED_X - 0.3, 2.8, -0.2];
const sky = (dx: number, y = 3.0): V3 => [DOOR_X + dx, y, 0.6];

const SEGMENTS: Segment[] = [
  // ===== Act 1: the sure deal =====
  {
    b: 0, shot: doorChair,
    cast: { chairman: { at: chairDoor, face: "happy" } },
    gags: [
      { text: "MILLIONAIRE x4", at: above(chairDoor), w: 1.6, fill: GREEN, color: "white", p: [0.1, 1] },
      { text: "OWES ME N2,000", at: above(chairDoor, 0, 1.95), w: 1.7, fill: RED, color: "white", p: [0.6, 1] },
    ],
  },
  {
    b: 1, shot: doorChair,
    cast: { chairman: { at: chairDoor, face: "happy", talk: true } },
    gags: [{ text: "CHAIRMAN OF WETIN?", at: above(chairDoor), w: 1.9, p: [0.3, 1] }],
  },
  {
    b: 2, shot: doorChair,
    cast: { chairman: { at: chairDoor, face: "happy" } },
    gags: [
      { text: "COIN", at: above(chairDoor, -0.4), w: 1.0, fill: YELLOW, p: [0.05, 1] },
      { text: "FOREX", at: above(chairDoor, 0.5, 2.85), w: 1.0, fill: GREEN, color: "white", p: [0.3, 1] },
      { text: "PHONE-CHARGING WATER", at: above(chairDoor, 0, 1.9), w: 2.0, fill: BLUE, color: "white", p: [0.55, 1] },
    ],
  },
  { b: 3, p: [0, 0.4], shot: door, cast: { dev: { at: devDoor }, chairman: { at: chairDoor, walkFrom: [DOOR_X + 4.5, 0.1, -0.6] } }, gags: [{ text: "SUIT. FOR THIS HEAT.", at: sky(0.4), w: 1.9, p: [0.4, 1] }] },
  { b: 3, p: [0.4, 1], shot: doorChair, cast: { chairman: { at: chairDoor, face: "happy", talk: true } }, gags: [{ text: "100% SURE!", at: above(chairDoor), w: 1.5, fill: GREEN, color: "white", p: [0.3, 1] }] },
  { b: 4, p: [0, 0.45], shot: doorDev, cast: { dev: { at: devDoor, face: "vexed", talk: true } } },
  { b: 4, p: [0.45, 1], shot: doorChair, cast: { chairman: { at: chairDoor, face: "happy", talk: true } }, gags: [{ text: "THAT ONE NA 99%", at: above(chairDoor), w: 1.8, p: [0.2, 1] }] },
  {
    b: 5, p: [0, 0.6], shot: doorChair,
    cast: { chairman: { at: chairDoor, face: "happy", talk: true } },
    gags: [{ text: "N10K -> N20K", at: above(chairDoor), w: 1.6, fill: GREEN, color: "white", p: [0.1, 1] }],
  },
  { b: 5, p: [0.6, 1], shot: door, cast: { dev: { at: devDoor, talk: true }, chairman: { at: chairDoor, face: "happy" } }, gags: [{ text: "FROM THE SYSTEM", at: above(chairDoor), w: 1.7, fill: YELLOW, p: [0.5, 1] }] },
  {
    b: 6, shot: doorDev,
    cast: { dev: { at: devDoor, face: "vexed", talk: true } },
    gags: [{ text: "NA PRAYER, NO BE SYSTEM", at: above(devDoor), w: 2.0, p: [0.55, 1] }],
  },

  // ===== Act 2: everybody invests =====
  {
    b: 7, shot: door,
    cast: { chairman: { at: chairDoor, face: "happy" }, iyabose: { at: iyaDoor, face: "happy", walkFrom: [DOOR_X - 5, 0.1, 0.1] }, landlord: { at: babaDoor, face: "happy", walkFrom: [DOOR_X + 5, 0.1, 0.1] } },
    gags: [
      { text: "SHOP MONEY", at: sky(-1.6, 2.7), w: 1.3, fill: GREEN, color: "white", p: [0.3, 1] },
      { text: "2 MONTHS RENT", at: sky(1.5, 2.7), w: 1.5, fill: GREEN, color: "white", p: [0.65, 1] },
    ],
  },
  {
    b: 8, shot: door,
    cast: { chairman: { at: chairDoor, face: "happy" }, iyabose: { at: iyaDoor, face: "happy" }, landlord: { at: babaDoor, face: "happy" }, mama: { at: mamaDoor, face: "happy", talk: true, walkFrom: [DOOR_X - 5, 0.1, 0.4] } },
    gags: [{ text: "DOUBLE AM FOR ME!", at: sky(-0.6, 3.1), w: 1.9, fill: YELLOW, p: [0.5, 1] }],
  },
  {
    b: 9, p: [0, 0.5], shot: doorDev,
    cast: { dev: { at: devDoor, face: "vexed" } },
    gags: [{ text: "ENEMY OF PROGRESS", at: above(devDoor), w: 1.9, fill: RED, color: "white", p: [0.3, 1] }],
  },
  { b: 9, p: [0.5, 1], shot: door, cast: { dev: { at: devDoor, face: "shocked" }, mama: { at: mamaDoor, face: "vexed", talk: true }, chairman: { at: chairDoor, face: "happy" } }, gags: [{ text: "YOU NO WAN MAKE US RICH?", at: sky(-0.6, 3.1), w: 2.0, p: [0.2, 1] }] },

  // ===== Act 3: two weeks later =====
  {
    b: 10, shot: door, badge: "2 WEEKS LATER", night: true,
    cast: { iyabose: { at: iyaDoor, face: "vexed" }, landlord: { at: babaDoor, face: "vexed" }, mama: { at: mamaDoor, face: "vexed" }, dev: { at: [DOOR_X + 0.5, 0.1, 0.1], face: "neutral" } },
    gags: [
      { text: "PHONE: SWITCHED OFF", at: sky(0.5, 2.6), w: 1.9, fill: RED, color: "white", p: [0.4, 1] },
      { text: "*PESTLE*", at: sky(-1.4, 3.1), w: 1.2, fill: YELLOW, p: [0.75, 1] },
    ],
  },
  { b: 11, shot: bedDev, night: true, cast: { dev: { ...devBed, face: "vexed", talk: true } }, gags: [{ text: "TRACING...", at: overBed, w: 1.4, fill: BLUE, color: "white", p: [0.5, 1] }] },
  {
    b: 12, shot: bedDev, night: true,
    cast: { dev: { ...devBed, face: "shocked" } },
    gags: [
      { text: "FREE WEBSITE", at: overBed, w: 1.5, p: [0.1, 0.5] },
      { text: "OWNER: SMALL BOY, CYBER CAFE", at: overBed, w: 2.1, fill: RED, color: "white", p: [0.5, 1] },
    ],
  },
  {
    b: 13, shot: cafe,
    cast: { cousin: { at: boy, face: "shocked" }, chairman: { at: chairCafe, face: "vexed", talk: true }, dev: { at: devCafe, walkFrom: [CAFE_X + 5, 0.1, 0.2] }, iyabose: { at: iyaCafe, face: "vexed", walkFrom: [CAFE_X - 5, 0.1, 0.2] } },
    gags: [{ text: "CHAIRMAN SEF INVEST!", at: above(chairCafe, -0.3), w: 2.0, fill: YELLOW, p: [0.6, 1] }],
  },
  {
    b: 14, shot: cafeBoy,
    cast: { cousin: { at: boy, face: "shocked" }, chairman: { at: chairCafe, face: "vexed", talk: true } },
    gags: [{ text: "SCAM CHOP SCAMMER", at: above(boy, 0.5), w: 1.9, fill: RED, color: "white", p: [0.2, 1] }],
  },
  {
    b: 15, shot: cafe,
    cast: { cousin: { at: boy, face: "vexed" }, chairman: { at: chairCafe, face: "happy" }, dev: { at: devCafe, face: "happy" }, iyabose: { at: iyaCafe, face: "happy" } },
    gags: [{ text: "REFUNDED. COMPLETE.", at: above(boy, 0.6), w: 2.0, fill: GREEN, color: "white", p: [0.4, 1] }],
  },

  // ===== Act 4: the apology that isn't =====
  { b: 16, shot: door, night: true, cast: { dev: { at: devDoor, face: "happy" }, chairman: { at: chairDoor, face: "neutral", walkFrom: [DOOR_X + 4.5, 0.1, -0.6] } }, gags: [{ text: "SORRY...?", at: above(chairDoor), w: 1.3, p: [0.6, 1] }] },
  {
    b: 17, shot: doorChair, night: true,
    cast: { chairman: { at: chairDoor, face: "happy", talk: true } },
    gags: [
      { text: "WEBSITE TRACING BIZ", at: above(chairDoor), w: 1.9, fill: BLUE, color: "white", p: [0.3, 1] },
      { text: "100% SURE!", at: above(chairDoor, 0, 1.95), w: 1.5, fill: GREEN, color: "white", p: [0.75, 1] },
    ],
  },
  { b: "tail", shot: doorDev, night: true, badge: "SABI COMPOUND", cast: { dev: { at: devDoor, face: "shocked" } } },
];

export const Ep05 = () => <Episode data={data} segments={SEGMENTS} audio="ep05.mp3" />;

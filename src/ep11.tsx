// Episode 11 — "Fake Alert". Pure data for the episode engine.
// Beat numbers match the lines of assets/ep11/beats.txt (starting at 0).
import { Episode, type Actor, type Segment, type Shot } from "./Episode";
import { BED_X, DOOR_X, type V3 } from "./Sets";
import data from "./ep11.json";

const YELLOW = "#ffd23f";
const GREEN = "#2fbf5b";
const BLUE = "#2f4a8f";
const RED = "#d62f2f";
const CAR = ["car"];

const devBed: Actor = { at: [BED_X - 0.3, 0.3, -0.7], scale: 1.2 };
const devDoor: V3 = [DOOR_X + 0.4, 0.1, -0.2];
const buyer: V3 = [DOOR_X - 0.6, 0.1, 0.3];
const buyerCar: V3 = [DOOR_X - 2.0, 0.1, 2.0]; // by the car door
const iya: V3 = [DOOR_X - 1.5, 0.1, 0.5];
const baba: V3 = [DOOR_X + 1.4, 0.1, 0.4];
const chairDown: V3 = [DOOR_X - 0.5, -1.0, 2.4]; // "lying" in front of the car: mostly below the ground line

const door: Shot = { pos: [DOOR_X - 0.4, 1.8, 10.5], look: [DOOR_X - 0.4, 1.4, 0.2], push: 0.1 };
const doorDev: Shot = { pos: [DOOR_X + 0.4, 1.6, 4.4], look: [DOOR_X + 0.4, 1.6, -0.2], push: 0.18 };
const doorBuyer: Shot = { pos: [DOOR_X - 0.6, 1.65, 4.6], look: [DOOR_X - 0.6, 1.65, 0.3], push: 0.18 };
const doorBaba: Shot = { pos: [DOOR_X + 1.4, 1.7, 4.6], look: [DOOR_X + 1.4, 1.65, 0.4], push: 0.15 };
const bedDev: Shot = { pos: [-0.3, 1.9, 5.0], look: [-0.3, 1.95, -0.7] };

const above = (at: V3, dx = 0, y = 2.45): V3 => [at[0] + dx, at[1] + y, at[2] + 0.2];
const overBed: V3 = [BED_X - 0.3, 2.8, -0.2];
const sky = (dx: number, y = 3.1): V3 => [DOOR_X + dx, y, 0.8];

const SEGMENTS: Segment[] = [
  // ===== Act 1: the buyer =====
  {
    b: 0, shot: doorDev,
    cast: { dev: { at: devDoor, face: "shocked", talk: true } },
    gags: [
      { text: "PHONE: +N200,000", at: above(devDoor), w: 1.8, fill: GREEN, color: "white", p: [0.2, 0.6] },
      { text: "BANK: NOTHING", at: above(devDoor), w: 1.6, fill: RED, color: "white", p: [0.6, 1] },
    ],
  },
  { b: 1, shot: bedDev, cast: { dev: { ...devBed, face: "happy", talk: true } }, gags: [{ text: "FOR SALE: OLD LAPTOP", at: overBed, w: 1.9, fill: YELLOW, p: [0.2, 1] }] },
  {
    b: 2, shot: door, flags: CAR,
    cast: { dev: { at: devDoor, face: "happy" }, client: { at: buyer, face: "happy", walkFrom: buyerCar } },
    gags: [
      { text: "FINE CAR. FINE PERFUME.", at: sky(-0.4), w: 2.0, p: [0.1, 0.55] },
      { text: "NIGERIAN WEY NO PRICE?!", at: sky(-0.4), w: 2.0, fill: RED, color: "white", p: [0.55, 1] },
    ],
  },
  {
    b: 3, shot: doorBuyer, flags: CAR,
    cast: { client: { at: buyer, face: "happy", talk: true } },
    gags: [
      { text: "I GO TRANSFER NOW", at: above(buyer), w: 1.8, p: [0.3, 0.75] },
      { text: "PING!", at: above(buyer), w: 1.0, fill: GREEN, color: "white", p: [0.75, 1] },
    ],
  },
  { b: 4, shot: door, flags: CAR, cast: { dev: { at: devDoor, face: "happy" }, client: { at: buyerCar, face: "happy", walkFrom: buyer } }, gags: [{ text: "CREDIT: N200,000", at: sky(0.3), w: 1.8, fill: GREEN, color: "white", p: [0.1, 1] }] },

  // ===== Act 2: dear costumer =====
  {
    b: 5, shot: doorDev, flags: CAR,
    cast: { dev: { at: devDoor, face: "shocked" } },
    gags: [
      { text: "\"DEAR COSTUMER\"", at: above(devDoor), w: 1.7, p: [0.35, 0.75] },
      { text: "WITH O.", at: above(devDoor), w: 1.2, fill: RED, color: "white", p: [0.75, 1] },
    ],
  },
  { b: 6, shot: doorDev, flags: CAR, cast: { dev: { at: devDoor, face: "vexed", talk: true } }, gags: [{ text: "BALANCE: N4,000", at: above(devDoor), w: 1.7, fill: RED, color: "white", p: [0.5, 1] }] },
  { b: 7, shot: door, flags: CAR, cast: { dev: { at: devDoor, face: "vexed", talk: true }, client: { at: buyerCar } }, gags: [{ text: "HOLD AM!!!", at: sky(0.3), w: 1.5, fill: RED, color: "white", p: [0.1, 1] }] },
  { b: 8, shot: door, flags: CAR, night: true, cast: { dev: { at: devDoor, face: "vexed" }, client: { at: buyerCar } }, gags: [{ text: "COMPOUND: SOLDIER MODE", at: sky(0), w: 2.0, fill: BLUE, color: "white", p: [0.4, 1] }] },
  {
    b: 9, shot: door, flags: CAR,
    cast: {
      dev: { at: devDoor, face: "vexed" },
      client: { at: buyerCar, face: "shocked" },
      iyabose: { at: iya, face: "vexed", walkFrom: [DOOR_X - 5, 0.1, 0.5] },
      landlord: { at: baba, face: "vexed", walkFrom: [DOOR_X + 5, 0.1, 0.4] },
      chairman: { at: chairDown, face: "happy" },
    },
    gags: [
      { text: "FREEZER BLOCK GATE", at: sky(-0.4), w: 1.9, fill: YELLOW, p: [0.05, 0.35] },
      { text: "PADLOCK. KEY: POCKET.", at: sky(-0.4), w: 2.0, p: [0.35, 0.68] },
      { text: "CHAIRMAN LIE DOWN", at: sky(-0.4), w: 1.9, fill: RED, color: "white", p: [0.68, 1] },
    ],
  },

  // ===== Act 3: the siege =====
  {
    b: 10, shot: doorBuyer, flags: CAR,
    cast: { client: { at: buyer, face: "happy", talk: true, walkFrom: buyerCar } },
    gags: [{ text: "NETWORK DEY SLOW...", at: above(buyer), w: 1.9, p: [0.25, 1] }],
  },
  { b: 11, shot: doorBaba, flags: CAR, cast: { landlord: { at: baba, face: "vexed", talk: true } }, gags: [{ text: "EVEN RENT DEY WAIT", at: above(baba), w: 1.9, fill: YELLOW, p: [0.35, 1] }] },
  {
    b: 12, shot: door, flags: CAR, badge: "1 HOUR LATER",
    cast: { dev: { at: devDoor }, client: { at: buyer, face: "vexed" }, iyabose: { at: iya, face: "happy", talk: true }, landlord: { at: baba } },
    gags: [{ text: "PURE WATER x2: SOLD", at: sky(-0.4), w: 1.9, fill: GREEN, color: "white", p: [0.4, 1] }],
  },
  {
    b: 13, shot: doorDev, flags: CAR,
    cast: { dev: { at: devDoor, face: "happy" } },
    gags: [
      { text: "CHECK APP FIRST", at: above(devDoor), w: 1.7, p: [0.3, 0.65] },
      { text: "+N200,000 REAL", at: above(devDoor), w: 1.7, fill: GREEN, color: "white", p: [0.65, 1] },
    ],
  },
  {
    b: 14, shot: door,
    cast: { dev: { at: devDoor, face: "happy", talk: true }, iyabose: { at: iya, face: "happy", talk: true }, landlord: { at: baba, face: "happy", talk: true } },
    gags: [{ text: "DRINKS ON ME!", at: sky(0.3), w: 1.6, fill: YELLOW, p: [0.4, 1] }],
  },

  // ===== Act 4: never log out =====
  { b: 15, shot: bedDev, night: true, cast: { dev: { ...devBed, face: "shocked" } }, gags: [{ text: "I NEVER LOG OUT...", at: overBed, w: 1.8, fill: BLUE, color: "white", p: [0.55, 1] }] },
  { b: 16, shot: bedDev, night: true, cast: { dev: { ...devBed, face: "vexed" } }, gags: [{ text: "NEXT VICTIM: FOUND", at: overBed, w: 1.9, fill: RED, color: "white", p: [0.5, 1] }] },
  { b: 17, shot: bedDev, night: true, cast: { dev: { ...devBed, face: "happy", talk: true } }, gags: [{ text: "COMPOUND DEY WATCH YOU.", at: overBed, w: 2.0, fill: YELLOW, p: [0.3, 1] }] },
  { b: "tail", shot: bedDev, night: true, badge: "SABI COMPOUND", cast: { dev: { ...devBed, face: "happy" } } },
];

export const Ep11 = () => <Episode data={data} segments={SEGMENTS} audio="ep11.mp3" />;

// Episode 8 — "Generator Fuel Or Data". Pure data for the episode engine.
// Beat numbers match the lines of assets/ep08/beats.txt (starting at 0).
import { Episode, type Actor, type Segment, type Shot } from "./Episode";
import { BED_X, DOOR_X, OFFICE_X, SHOP_X, type V3 } from "./Sets";
import data from "./ep08.json";

const YELLOW = "#ffd23f";
const GREEN = "#2fbf5b";
const BLUE = "#2f4a8f";
const RED = "#d62f2f";

const devBed: Actor = { at: [BED_X - 0.3, 0.3, -0.7], scale: 1.2 };
const chairDoor: V3 = [DOOR_X + 0.5, 0.1, -0.6];
const devDoor: V3 = [DOOR_X - 0.8, 0.1, -0.3];
const iya: V3 = [SHOP_X, 0.45, -1.0];
const devShop: V3 = [SHOP_X + 1.0, 0.1, 0.3];
const client: V3 = [OFFICE_X, 0.1, -0.6];

const bedDev: Shot = { pos: [-0.3, 1.9, 5.0], look: [-0.3, 1.95, -0.7] };
const bedWide: Shot = { pos: [0.4, 1.8, 7.6], look: [0.4, 1.5, -0.6], push: 0.18 };
const door: Shot = { pos: [DOOR_X - 0.2, 1.6, 7.6], look: [DOOR_X - 0.2, 1.4, -0.5], push: 0.15 };
const doorChair: Shot = { pos: [DOOR_X + 0.5, 1.7, 4.2], look: [DOOR_X + 0.5, 1.65, -0.6], push: 0.15 };
const shop: Shot = { pos: [SHOP_X + 0.4, 1.8, 8.6], look: [SHOP_X + 0.4, 1.5, -0.4], push: 0.12 };
const office: Shot = { pos: [OFFICE_X, 1.8, 6.0], look: [OFFICE_X, 1.6, -0.6], push: 0.2 };

const above = (at: V3, dx = 0, y = 2.45): V3 => [at[0] + dx, at[1] + y, at[2] + 0.2];
const overBed: V3 = [BED_X - 0.3, 2.8, -0.2];

const SEGMENTS: Segment[] = [
  // ===== Act 1: the dilemma =====
  {
    b: 0, shot: bedWide,
    cast: { dev: { ...devBed, face: "vexed", talk: true } },
    gags: [
      { text: "LIGHT", at: [BED_X - 1.0, 2.9, -0.2], w: 1.0, fill: YELLOW, p: [0.35, 1] },
      { text: "INTERNET", at: [BED_X + 0.6, 2.9, -0.2], w: 1.2, fill: BLUE, color: "white", p: [0.5, 1] },
    ],
  },
  {
    b: 1, shot: bedDev, badge: "THURSDAY",
    cast: { dev: { ...devBed, face: "vexed", talk: true } },
    gags: [
      { text: "ACCOUNT: N5,000", at: overBed, w: 1.7, fill: GREEN, color: "white", p: [0.25, 0.5] },
      { text: "FUEL: EMPTY", at: overBed, w: 1.4, fill: RED, color: "white", p: [0.5, 0.75] },
      { text: "DATA: 200MB", at: overBed, w: 1.4, fill: YELLOW, p: [0.75, 1] },
    ],
  },
  { b: 2, shot: office, cast: { client: { at: client, face: "happy" } }, gags: [{ text: "8PM: 6-MONTH CONTRACT", at: above(client), w: 2.0, fill: GREEN, color: "white", p: [0.3, 1] }] },
  {
    b: 3, shot: bedDev,
    cast: { dev: { ...devBed, talk: true } },
    gags: [
      { text: "FUEL = N5,000", at: overBed, w: 1.6, fill: YELLOW, p: [0.25, 0.62] },
      { text: "DATA = N5,000", at: overBed, w: 1.6, fill: BLUE, color: "white", p: [0.62, 1] },
    ],
  },
  { b: 4, shot: bedWide, cast: { dev: { ...devBed, face: "neutral" } }, gags: [{ text: "BRIGHT ROOM. NO WIFI.", at: overBed, w: 2.0, fill: YELLOW, p: [0.3, 1] }] },
  { b: 5, shot: bedWide, night: true, cast: { dev: { ...devBed, face: "shocked" } }, gags: [{ text: "WIFI. DEAD LAPTOP.", at: overBed, w: 2.0, fill: BLUE, color: "white", p: [0.3, 1] }] },

  // ===== Act 2: the hustle =====
  { b: 6, p: [0, 0.4], shot: door, cast: { dev: { at: devDoor, talk: true, walkFrom: [DOOR_X - 4, 0.1, -0.3] }, chairman: { at: chairDoor } } },
  { b: 6, p: [0.4, 1], shot: doorChair, cast: { chairman: { at: chairDoor, face: "happy", talk: true } }, gags: [{ text: "BUY POWER BANK!", at: above(chairDoor), w: 1.7, fill: YELLOW, p: [0.5, 1] }] },
  { b: 7, shot: door, cast: { dev: { at: devDoor, face: "shocked" }, chairman: { at: chairDoor, face: "happy" } }, gags: [{ text: "INSIDE: SAND", at: above(devDoor, 0.4), w: 1.5, fill: RED, color: "white", p: [0.4, 1] }] },
  { b: 8, p: [0, 0.4], shot: shop, cast: { iyabose: { at: iya }, dev: { at: devShop, talk: true, walkFrom: [SHOP_X + 4.5, 0.1, 0.3] } }, gags: [{ text: "BORROW ME DATA", at: above(devShop, -0.2), w: 1.7, p: [0.5, 1] }] },
  { b: 8, p: [0.4, 1], shot: shop, cast: { iyabose: { at: iya, face: "vexed", talk: true }, dev: { at: devShop, face: "shocked" } }, gags: [{ text: "NA SUGAR??", at: above(iya, 0, 2.3), w: 1.4, fill: YELLOW, p: [0.2, 1] }] },
  { b: 9, shot: bedDev, cast: { dev: { ...devBed, face: "vexed" } }, gags: [{ text: "WIFI: \"PAY YOUR OWN\"", at: overBed, w: 2.0, fill: RED, color: "white", p: [0.4, 1] }] },
  { b: 10, shot: bedDev, badge: "7:00 PM", cast: { dev: { ...devBed, face: "shocked" } }, gags: [{ text: "1 HOUR LEFT", at: overBed, w: 1.4, fill: RED, color: "white", p: [0.3, 1] }] },
  {
    b: 11, shot: bedDev, night: true,
    cast: { dev: { ...devBed, face: "neutral" } },
    gags: [
      { text: "DATA BOUGHT", at: overBed, w: 1.4, fill: GREEN, color: "white", p: [0, 0.3] },
      { text: "BRIGHTNESS 0%", at: overBed, w: 1.6, p: [0.3, 0.6] },
      { text: "BREATHE SMALL SMALL", at: overBed, w: 1.9, fill: BLUE, color: "white", p: [0.6, 1] },
    ],
  },

  // ===== Act 3: the meeting =====
  { b: 12, p: [0, 0.5], shot: office, badge: "8:00 PM", cast: { client: { at: client, face: "happy", talk: true } } },
  { b: 12, p: [0.5, 1], shot: bedDev, night: true, cast: { dev: { ...devBed, face: "happy" } }, gags: [{ text: "BATTERY 15%", at: overBed, w: 1.5, fill: YELLOW }] },
  { b: 13, p: [0, 0.4], shot: office, cast: { client: { at: client, talk: true } }, gags: [{ text: "TELL ME ABOUT YOURSELF", at: above(client), w: 2.0, p: [0.2, 1] }] },
  { b: 13, p: [0.4, 1], shot: bedDev, night: true, cast: { dev: { ...devBed, face: "shocked", talk: true } }, gags: [{ text: "BATTERY 10%", at: overBed, w: 1.5, fill: RED, color: "white" }] },
  { b: 14, p: [0, 0.45], shot: office, cast: { client: { at: client, talk: true } }, gags: [{ text: "ONE LAST QUESTION", at: above(client), w: 1.9, p: [0.3, 1] }] },
  {
    b: 14, p: [0.45, 1], shot: bedDev, night: true,
    cast: { dev: { ...devBed, face: "shocked" } },
    gags: [
      { text: "BATTERY 5%", at: overBed, w: 1.5, fill: RED, color: "white", p: [0, 0.5] },
      { text: "BATTERY 3%", at: overBed, w: 1.5, fill: RED, color: "white", p: [0.5, 1] },
    ],
  },
  {
    b: 15, shot: bedDev,
    cast: { dev: { ...devBed, face: "happy", talk: true } },
    gags: [{ text: "UP NEPA!!!", at: overBed, w: 1.5, fill: GREEN, color: "white", p: [0.3, 1] }],
  },
  {
    b: 16, shot: office,
    cast: { client: { at: client, face: "happy", talk: true } },
    gags: [
      { text: "YOU ARE HIRED!", at: above(client), w: 1.7, fill: GREEN, color: "white", p: [0.1, 0.55] },
      { text: "ON YOUR LIGHT, ABEG", at: above(client), w: 1.9, fill: YELLOW, p: [0.55, 1] },
    ],
  },
  { b: 17, p: [0, 0.65], shot: bedDev, cast: { dev: { ...devBed, face: "happy", talk: true } }, gags: [{ text: "YES SIR!", at: overBed, w: 1.2, fill: GREEN, color: "white", p: [0.1, 1] }] },
  { b: 17, p: [0.65, 1], shot: bedDev, night: true, cast: { dev: { ...devBed, face: "shocked" } }, gags: [{ text: "NEPA!!!", at: overBed, w: 1.3, fill: RED, color: "white" }] },
  { b: "tail", shot: bedDev, night: true, badge: "SABI COMPOUND", cast: { dev: { ...devBed, face: "shocked" } } },
];

export const Ep08 = () => <Episode data={data} segments={SEGMENTS} audio="ep08.mp3" />;

// Episode 3 — "NEPA Take Light As I Dey Deploy". Pure data for the episode engine.
// Beat numbers match the lines of assets/ep03/beats.txt (starting at 0).
import { Episode, type Actor, type Segment, type Shot } from "./Episode";
import { BED_X, DOOR_X, SHOP_X, YARD_X, type V3 } from "./Sets";
import data from "./ep03.json";

const YELLOW = "#ffd23f";
const GREEN = "#2fbf5b";
const BLUE = "#2f4a8f";
const RED = "#d62f2f";

const devBed: Actor = { at: [BED_X - 0.3, 0.3, -0.7], scale: 1.2 };
const devYard: V3 = [YARD_X + 0.5, 0.1, -0.4];
const iya: V3 = [SHOP_X, 0.45, -1.0]; // behind the counter, standing on a step
const devShop: V3 = [SHOP_X + 1.4, 0.1, 0.4];
const chairDoor: V3 = [DOOR_X + 0.5, 0.1, -0.6];
const devDoor: V3 = [DOOR_X - 0.9, 0.1, -0.3];
const devSit: V3 = [DOOR_X - 0.9, -0.35, -0.3]; // sitting on the corridor floor
const offRight = (at: V3): V3 => [at[0] + 4, at[1], at[2]];

const bedDev: Shot = { pos: [-0.3, 1.9, 5.0], look: [-0.3, 1.95, -0.7] };
const bedClose: Shot = { pos: [-0.3, 1.95, 4.0], look: [-0.3, 1.85, -0.5], push: 0.15 };
const bedWide: Shot = { pos: [-0.3, 1.7, 7.4], look: [-0.3, 1.5, -0.6], push: 0.2 };
const yard: Shot = { pos: [YARD_X, 1.7, 6.4], look: [YARD_X, 1.1, -0.6], push: 0.2 };
const shop: Shot = { pos: [SHOP_X + 0.5, 1.8, 7.0], look: [SHOP_X + 0.5, 1.5, -0.5], push: 0.15 };
const shopIya: Shot = { pos: [SHOP_X, 2.0, 4.0], look: [SHOP_X, 1.9, -1.0], push: 0.15 };
const party: Shot = { pos: [DOOR_X + 0.5, 1.7, 9.0], look: [DOOR_X + 0.5, 1.5, -0.5], push: 0.12 };
const door: Shot = { pos: [DOOR_X - 0.2, 1.6, 7.6], look: [DOOR_X - 0.2, 1.4, -0.5], push: 0.15 };
const doorChair: Shot = { pos: [DOOR_X + 0.5, 1.6, 4.2], look: [DOOR_X + 0.5, 1.55, -0.6], push: 0.15 };
const corridor: Shot = { pos: [DOOR_X - 0.9, 1.3, 4.0], look: [DOOR_X - 0.9, 1.2, -0.3], push: 0.2 };

const above = (at: V3, dx = 0, y = 2.45): V3 => [at[0] + dx, at[1] + y, at[2] + 0.2];
const overBed: V3 = [BED_X - 0.3, 2.8, -0.2];

const SEGMENTS: Segment[] = [
  // ===== Act 1: the button =====
  {
    b: 0, shot: bedWide,
    cast: { dev: { ...devBed, talk: true } },
    gags: [{ text: "[ DEPLOY ]", at: overBed, w: 1.6, fill: GREEN, color: "white", p: [0.3, 1] }],
  },
  {
    b: 1, shot: bedDev, badge: "FRIDAY 4:00 PM",
    cast: { dev: { ...devBed, talk: true } },
    gags: [{ text: "OGA: GO LIVE TODAY", at: overBed, w: 1.9, p: [0.3, 1] }],
  },
  {
    b: 2, p: [0, 0.5], shot: bedClose,
    cast: { dev: { ...devBed, face: "happy", talk: true } },
    gags: [{ text: "BATTERY 12%", at: overBed, w: 1.5, fill: YELLOW, p: [0.2, 1] }],
  },
  {
    b: 2, p: [0.5, 1], shot: bedClose,
    cast: { dev: { ...devBed, face: "happy" } },
    gags: [{ text: "*CLICK*", at: overBed, w: 1.3, fill: GREEN, color: "white", p: [0.6, 1] }],
  },
  {
    b: 3, p: [0, 0.6], shot: bedWide, night: true,
    cast: { dev: { ...devBed, face: "shocked" } },
    gags: [{ text: "whoo... whoo...", at: overBed, w: 1.6, p: [0.3, 1] }],
  },
  {
    b: 3, p: [0.6, 1], shot: door, night: true,
    gags: [
      { text: "NEPA!!!", at: [DOOR_X - 1.0, 2.6, 0], w: 1.4, fill: RED, color: "white", p: [0, 1] },
      { text: "NEPA!!!", at: [DOOR_X + 0.8, 3.2, 0], w: 1.4, fill: RED, color: "white", p: [0.3, 1] },
    ],
  },
  {
    b: 4, shot: bedClose, night: true,
    cast: { dev: { ...devBed, face: "shocked", talk: true } },
    gags: [
      { text: "DEPLOY 40%", at: overBed, w: 1.5, fill: BLUE, color: "white", p: [0, 0.7] },
      { text: "BATTERY 9%", at: overBed, w: 1.5, fill: RED, color: "white", p: [0.7, 1] },
    ],
  },

  // ===== Act 2: the hunt for power =====
  {
    b: 5, p: [0, 0.6], shot: yard,
    cast: { dev: { at: devYard, face: "vexed", talk: true, walkFrom: offRight(devYard) } },
    gags: [
      { text: "COUGH!", at: above(devYard, -1.0, 1.3), w: 1.1, p: [0.35, 1] },
      { text: "COUGH! COUGH!", at: above(devYard, -0.8, 1.9), w: 1.5, p: [0.65, 1] },
    ],
  },
  {
    b: 5, p: [0.6, 1], shot: yard,
    cast: { dev: { at: devYard, face: "shocked" } },
    gags: [{ text: "TANK: DRY", at: above(devYard, -0.9, 1.4), w: 1.4, fill: RED, color: "white", p: [0.3, 1] }],
  },
  { b: 6, p: [0, 0.35], shot: shop, cast: { iyabose: { at: iya }, dev: { at: devShop, face: "shocked", talk: true, walkFrom: offRight(devShop) } }, gags: [{ text: "FUEL! ABEG!", at: above(devShop), w: 1.5, fill: YELLOW, p: [0.4, 1] }] },
  {
    b: 6, p: [0.35, 0.65], shot: shopIya,
    cast: { iyabose: { at: iya, face: "happy", talk: true } },
    gags: [{ text: "NA CANDLE DEY", at: above(iya, 0, 2.5), w: 1.6, p: [0.3, 1] }],
  },
  {
    b: 6, p: [0.65, 1], shot: shop,
    cast: { iyabose: { at: iya, face: "happy" }, dev: { at: devShop, face: "vexed", talk: true } },
    gags: [{ text: "LIGHT MY ROUTER??", at: above(devShop, -0.3), w: 1.9, p: [0.3, 1] }],
  },
  {
    b: 7, shot: door,
    cast: { dev: { at: devDoor, face: "shocked", talk: true, walkFrom: [DOOR_X - 4, 0.1, -0.3] } },
    gags: [
      { text: "BATTERY 6%", at: above(devDoor), w: 1.4, fill: RED, color: "white", p: [0, 1] },
      { text: "INVERTER!", at: [DOOR_X + 0.6, 2.9, 0], w: 1.4, fill: YELLOW, p: [0.6, 1] },
    ],
  },
  { b: 8, p: [0, 0.25], shot: door, cast: { dev: { at: devDoor }, chairman: { at: chairDoor } }, gags: [{ text: "KNOCK KNOCK", at: [DOOR_X + 0.5, 2.9, 0], w: 1.5 }] },
  {
    b: 8, p: [0.25, 1], shot: doorChair,
    cast: { chairman: { at: chairDoor, face: "happy", talk: true } },
    gags: [{ text: "N500 PER PERCENT", at: above(chairDoor), w: 1.9, fill: GREEN, color: "white", p: [0.4, 1] }],
  },
  {
    b: 9, shot: door,
    cast: { dev: { at: devDoor, face: "vexed", talk: true }, chairman: { at: chairDoor, face: "happy" } },
    gags: [{ text: "PER PERCENT?!", at: above(devDoor, 0.3), w: 1.7, fill: RED, color: "white", p: [0.1, 1] }],
  },

  // ===== Act 3: the race =====
  {
    b: 10, shot: corridor,
    cast: { dev: { at: devSit, face: "neutral" }, chairman: { at: chairDoor, face: "happy" } },
    gags: [{ text: "PAID: N4,500", at: above(devSit, 0.4, 2.5), w: 1.5, fill: GREEN, color: "white", p: [0.2, 1] }],
  },
  { b: 11, p: [0, 0.2], shot: corridor, cast: { dev: { at: devSit, face: "shocked" } }, gags: [{ text: "DEPLOY 60%", at: above(devSit, 0, 2.5), w: 1.5, fill: BLUE, color: "white" }] },
  { b: 11, p: [0.2, 0.35], shot: corridor, cast: { dev: { at: devSit, face: "shocked" } }, gags: [{ text: "DEPLOY 70%", at: above(devSit, 0, 2.5), w: 1.5, fill: BLUE, color: "white" }] },
  { b: 11, p: [0.35, 0.55], shot: corridor, cast: { dev: { at: devSit, face: "shocked" } }, gags: [{ text: "BATTERY 3%", at: above(devSit, 0, 2.5), w: 1.5, fill: RED, color: "white" }] },
  { b: 11, p: [0.55, 0.7], shot: corridor, cast: { dev: { at: devSit, face: "shocked" } }, gags: [{ text: "DEPLOY 90%", at: above(devSit, 0, 2.5), w: 1.5, fill: BLUE, color: "white" }] },
  { b: 11, p: [0.7, 0.85], shot: corridor, cast: { dev: { at: devSit, face: "shocked" } }, gags: [{ text: "DEPLOY 95%", at: above(devSit, 0, 2.5), w: 1.5, fill: BLUE, color: "white" }] },
  { b: 11, p: [0.85, 1], shot: corridor, cast: { dev: { at: devSit, face: "shocked" } }, gags: [{ text: "BATTERY 1%", at: above(devSit, 0, 2.5), w: 1.5, fill: RED, color: "white" }] },
  {
    b: 12, shot: corridor,
    cast: { dev: { at: devSit, face: "happy" } },
    gags: [{ text: "DEPLOY SUCCESSFUL!", at: above(devSit, 0, 2.5), w: 2.0, fill: GREEN, color: "white", p: [0.2, 1] }],
  },
  {
    b: 13, shot: party,
    cast: { dev: { at: devDoor, face: "happy", talk: true }, chairman: { at: chairDoor, face: "happy", talk: true }, iyabose: { at: [DOOR_X + 1.8, 0.1, -0.2], face: "happy", talk: true, walkFrom: [DOOR_X + 5, 0.1, -0.2] } },
    gags: [{ text: "YAAAY!", at: [DOOR_X + 0.4, 3.0, 0], w: 1.4, fill: YELLOW, p: [0.2, 1] }],
  },
  {
    b: 14, shot: party,
    cast: { dev: { at: devDoor, face: "happy" }, chairman: { at: chairDoor, face: "happy" }, iyabose: { at: [DOOR_X + 1.8, 0.1, -0.2], face: "happy" } },
    gags: [{ text: "UP NEPA!!!", at: [DOOR_X + 0.4, 3.0, 0], w: 1.6, fill: GREEN, color: "white", p: [0.5, 1] }],
  },

  // ===== Act 4: the call =====
  {
    b: 15, shot: bedDev,
    cast: { dev: { ...devBed, face: "happy", talk: true } },
    gags: [{ text: "RING RING!", at: overBed, w: 1.4, fill: YELLOW, p: [0.25, 0.45] }, { text: "E DON GO LIVE!", at: overBed, w: 1.7, p: [0.55, 1] }],
  },
  {
    b: 16, shot: bedClose,
    cast: { dev: { ...devBed, face: "shocked" } },
    gags: [{ text: "OGA: FIX TYPO. DEPLOY AGAIN.", at: overBed, w: 2.1, p: [0.3, 1] }],
  },
  { b: 17, p: [0, 0.5], shot: bedClose, cast: { dev: { ...devBed, face: "shocked" } } },
  { b: 17, p: [0.5, 1], shot: bedClose, night: true, cast: { dev: { ...devBed, face: "shocked" } }, gags: [{ text: "*BLINK*", at: overBed, w: 1.2, fill: YELLOW }] },
  { b: "tail", shot: bedClose, night: true, badge: "SABI COMPOUND", cast: { dev: { ...devBed, face: "shocked" } } },
];

export const Ep03 = () => <Episode data={data} segments={SEGMENTS} audio="ep03.mp3" />;

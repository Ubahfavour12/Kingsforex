// Episode 14 — "Bank App Down For Payday". Pure data for the episode engine.
// Beat numbers match the lines of assets/ep14/beats.txt (starting at 0).
import { Episode, type Actor, type Segment, type Shot } from "./Episode";
import { BANK_X, BED_X, DOOR_X, OFFICE_X, type V3 } from "./Sets";
import data from "./ep14.json";

const YELLOW = "#ffd23f";
const GREEN = "#2fbf5b";
const BLUE = "#2f4a8f";
const RED = "#d62f2f";

const devBed: Actor = { at: [BED_X - 0.3, 0.3, -0.7], scale: 1.2 };
const babaDoor: V3 = [DOOR_X + 0.5, 0.1, -0.6];
const devDoor: V3 = [DOOR_X - 0.8, 0.1, -0.3];
// the ATM queue, front of the line first
const devAtm: V3 = [BANK_X + 2.4, 0.1, -0.9];
const matMan: V3 = [BANK_X + 1.3, 0.1, 0.0];
const q2: V3 = [BANK_X + 2.2, 0.1, 0.8];
const q3: V3 = [BANK_X + 3.1, 0.1, 1.6];
const security: V3 = [BANK_X - 0.6, 0.1, -0.6];
const devFloor: V3 = [BANK_X + 0.6, -0.45, 0.3]; // sitting on the floor
const oga: V3 = [OFFICE_X, 0.1, -0.6];

const bedDev: Shot = { pos: [-0.3, 1.9, 5.0], look: [-0.3, 1.95, -0.7] };
const bedWide: Shot = { pos: [0.4, 1.8, 7.6], look: [0.4, 1.5, -0.6], push: 0.18 };
const door: Shot = { pos: [DOOR_X - 0.2, 1.6, 7.6], look: [DOOR_X - 0.2, 1.4, -0.5], push: 0.15 };
const atmQueue: Shot = { pos: [BANK_X + 1.4, 2.0, 8.8], look: [BANK_X + 2.2, 1.3, 0.6], push: 0.1 };
const atm: Shot = { pos: [BANK_X + 2.4, 1.7, 3.0], look: [BANK_X + 2.4, 1.5, -1.2], push: 0.15 };
const hall: Shot = { pos: [BANK_X, 1.7, 7.4], look: [BANK_X, 1.4, -0.6], push: 0.15 };
const floor: Shot = { pos: [BANK_X + 0.6, 1.2, 4.0], look: [BANK_X + 0.6, 1.1, 0.3], push: 0.2 };
const office: Shot = { pos: [OFFICE_X, 1.8, 6.0], look: [OFFICE_X, 1.6, -0.6], push: 0.2 };

const above = (at: V3, dx = 0, y = 2.45): V3 => [at[0] + dx, at[1] + y, at[2] + 0.2];
const overBed: V3 = [BED_X - 0.3, 2.8, -0.2];
const overFloor = above(devFloor, 0, 2.6);

const SEGMENTS: Segment[] = [
  // ===== Act 1: payday =====
  { b: 0, shot: bedWide, cast: { dev: { ...devBed, face: "vexed", talk: true } }, gags: [{ text: "SALARY: SEE BUT NO TOUCH", at: overBed, w: 2.1, fill: YELLOW, p: [0.3, 1] }] },
  {
    b: 1, shot: bedDev, badge: "30TH, 6:00 AM",
    cast: { dev: { ...devBed, face: "happy", talk: true } },
    gags: [
      { text: "RENT. FUEL.", at: overBed, w: 1.4, p: [0.4, 0.7] },
      { text: "THAT SUYA.", at: overBed, w: 1.4, fill: "#e8862e", color: "white", p: [0.7, 1] },
    ],
  },
  {
    b: 2, shot: bedDev,
    cast: { dev: { ...devBed, face: "shocked" } },
    gags: [
      { text: "LOADING...", at: overBed, w: 1.4, fill: BLUE, color: "white", p: [0.1, 0.45] },
      { text: "TEMPORARILY UNAVAILABLE", at: overBed, w: 2.1, fill: RED, color: "white", p: [0.45, 1] },
    ],
  },
  { b: 3, shot: bedDev, cast: { dev: { ...devBed, face: "vexed", talk: true } }, gags: [{ text: "SOMETHING WENT WRONG", at: overBed, w: 2.0, fill: RED, color: "white", p: [0.1, 1] }] },
  {
    b: 4, shot: bedDev,
    cast: { dev: { ...devBed, face: "vexed", talk: true } },
    gags: [
      { text: "USSD: TRY LATER", at: overBed, w: 1.7, p: [0.1, 0.45] },
      { text: "YOUR CALL IS IMPORTANT", at: overBed, w: 2.0, fill: YELLOW, p: [0.45, 1] },
    ],
  },
  { b: 5, shot: bedDev, badge: "40 MINUTES LATER", cast: { dev: { ...devBed, face: "neutral", talk: true } }, gags: [{ text: "~ SAME SONG ~", at: overBed, w: 1.6, fill: BLUE, color: "white", p: [0.2, 1] }] },
  {
    b: 6, shot: door,
    cast: { dev: { at: devDoor, talk: true }, landlord: { at: babaDoor, face: "vexed", talk: true } },
    gags: [
      { text: "TODAY NA 30TH", at: above(babaDoor), w: 1.6, p: [0.1, 0.6] },
      { text: "EVERY MONTH NA THE APP", at: above(babaDoor, -0.4), w: 2.0, fill: YELLOW, p: [0.6, 1] },
    ],
  },

  // ===== Act 2: the ATM =====
  {
    b: 7, shot: atmQueue,
    cast: { dev: { at: q3, face: "shocked" }, chairman: { at: matMan, face: "neutral" }, iyabose: { at: q2, face: "vexed" } },
    gags: [{ text: "MAT GUY: SINCE YESTERDAY", at: above(matMan, 0.6), w: 2.0, fill: YELLOW, p: [0.45, 1] }],
  },
  {
    b: 8, shot: atm, badge: "2 HOURS LATER",
    cast: { dev: { at: devAtm, face: "shocked" } },
    gags: [
      { text: "CARD: SWALLOWED", at: above(devAtm, 0, 2.2), w: 1.8, fill: RED, color: "white", p: [0.25, 0.65] },
      { text: "THANK YOU FOR BANKING WITH US", at: above(devAtm, 0, 2.2), w: 2.1, p: [0.65, 1] },
    ],
  },
  {
    b: 9, shot: hall,
    cast: { aboki: { at: security, face: "neutral", talk: true }, dev: { at: [BANK_X + 0.8, 0.1, 0.2], face: "vexed", talk: true } },
    gags: [
      { text: "NETWORK DOWN", at: above(security), w: 1.6, fill: RED, color: "white", p: [0.1, 0.6] },
      { text: "WE DEY WAIT FOR NETWORK", at: above(security, 0.5), w: 2.0, p: [0.6, 1] },
    ],
  },

  // ===== Act 3: the discovery =====
  { b: 10, shot: floor, cast: { dev: { at: devFloor, face: "vexed", talk: true } }, gags: [{ text: "OYINBO APPS NO DEY FALL", at: overFloor, w: 2.0, p: [0.4, 1] }] },
  { b: 11, shot: floor, cast: { dev: { at: devFloor, face: "vexed" } }, gags: [{ text: "INSPECTING THE APP...", at: overFloor, w: 1.9, fill: BLUE, color: "white", p: [0.3, 1] }] },
  { b: 12, shot: floor, night: true, cast: { dev: { at: devFloor, face: "shocked" } }, gags: [{ text: "BUILT BY: ...", at: overFloor, w: 1.5, p: [0.45, 1] }] },
  {
    b: 13, shot: floor, night: true,
    cast: { dev: { at: devFloor, face: "shocked" } },
    gags: [
      { text: "MY COMPANY. MY TEAM.", at: overFloor, w: 2.0, fill: RED, color: "white", p: [0.05, 0.55] },
      { text: "FRIDAY'S DEPLOY. THE TYPO.", at: overFloor, w: 2.1, fill: RED, color: "white", p: [0.55, 1] },
    ],
  },
  { b: 14, shot: office, cast: { client: { at: oga, face: "vexed", talk: true } }, gags: [{ text: "WHO PUSHED ON FRIDAY?", at: above(oga), w: 2.0, fill: RED, color: "white", p: [0.3, 1] }] },
  {
    b: 15, shot: atmQueue,
    cast: { dev: { at: q3, face: "happy", talk: true }, chairman: { at: matMan, face: "vexed" }, iyabose: { at: q2, face: "vexed" } },
    gags: [
      { text: "200 PEOPLE. 1 MAT.", at: above(matMan, 0.6), w: 1.9, fill: YELLOW, p: [0.05, 0.5] },
      { text: "SIR... NETWORK BAD...", at: above(q3, -0.6), w: 1.9, p: [0.5, 1] },
    ],
  },
  { b: "tail", shot: atmQueue, badge: "SABI COMPOUND", cast: { dev: { at: q3, face: "happy" }, chairman: { at: matMan, face: "vexed" }, iyabose: { at: q2, face: "vexed" } } },
];

export const Ep14 = () => <Episode data={data} segments={SEGMENTS} audio="ep14.mp3" />;

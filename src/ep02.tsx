// Episode 2 — "Client Wan Pay Me With Exposure". Pure data for the episode engine.
// Beat numbers match the lines of assets/ep02/beats.txt (starting at 0).
import { Episode, type Actor, type Segment, type Shot } from "./Episode";
import { BED_X, DOOR_X, OFFICE_X, STAGE_X, type V3 } from "./Sets";
import data from "./ep02.json";

const YELLOW = "#ffd23f";
const GREEN = "#2fbf5b";
const BLUE = "#2f4a8f";
const RED = "#d62f2f";

const devBed: Actor = { at: [BED_X - 0.3, 0.3, -0.7], scale: 1.2 };
const bigMan: V3 = [OFFICE_X, 0.1, -0.6]; // behind the desk
const mamaDoor: V3 = [DOOR_X - 1.0, 0.1, -0.3];
const bigManDoor: V3 = [DOOR_X + 0.2, 0.1, -0.3];
const devDoor: V3 = [DOOR_X + 1.3, 0.1, -0.3];
const offDoor: V3 = [DOOR_X + 4.5, 0.1, -0.3];
const bigManStage: V3 = [STAGE_X - 0.6, 0.5, -1.4];
const devCrowd: V3 = [STAGE_X + 3.6, 0, 1.0];

const bedDev: Shot = { pos: [-0.3, 1.9, 5.0], look: [-0.3, 1.95, -0.7] };
const bedWide: Shot = { pos: [-0.3, 1.7, 7.4], look: [-0.3, 1.5, -0.6], push: 0.2 };
const office: Shot = { pos: [OFFICE_X, 1.8, 6.0], look: [OFFICE_X, 1.6, -0.6], push: 0.2 };
const officeClose: Shot = { pos: [OFFICE_X, 1.75, 3.8], look: [OFFICE_X, 1.75, -0.6], push: 0.2 };
const doorWide: Shot = { pos: [DOOR_X + 0.1, 1.6, 8.2], look: [DOOR_X + 0.1, 1.4, -0.5], push: 0.15 };
const doorMama: Shot = { pos: [DOOR_X - 0.9, 1.6, 4.4], look: [DOOR_X - 1.0, 1.55, -0.3] };
const doorDev: Shot = { pos: [DOOR_X + 1.2, 1.6, 4.4], look: [DOOR_X + 1.3, 1.6, -0.3], push: 0.18 };
const stageWide: Shot = { pos: [STAGE_X, 3.0, 9.2], look: [STAGE_X, 1.9, -1.5], push: 0.12 };
const stageScreen: Shot = { pos: [STAGE_X, 2.3, 3.4], look: [STAGE_X, 2.3, -2.6], push: 0.12 };
const stageBigMan: Shot = { pos: [STAGE_X - 0.6, 2.2, 3.4], look: [STAGE_X - 0.6, 2.1, -1.4], push: 0.15 };
const crowdDev: Shot = { pos: [STAGE_X + 3.6, 1.6, 5.2], look: [STAGE_X + 3.6, 1.6, 1.0], push: 0.25 };

const above = (at: V3, dx = 0, y = 2.45): V3 => [at[0] + dx, at[1] + y, at[2] + 0.2];
const aboveDevBed: V3 = [BED_X - 0.3, 2.8, -0.2];

const SEGMENTS: Segment[] = [
  // ===== Act 1: the call =====
  {
    b: 0, shot: bedWide, night: true,
    cast: { dev: { ...devBed, face: "happy", talk: true } },
    gags: [{ text: "SALARY: N0", at: aboveDevBed, w: 1.6, fill: RED, color: "white", p: [0.6, 1] }],
  },
  {
    b: 1, p: [0, 0.35], shot: bedDev, night: true,
    cast: { dev: { ...devBed, face: "shocked" } },
    gags: [{ text: "RING RING!", at: aboveDevBed, w: 1.5, fill: YELLOW }],
  },
  { b: 1, p: [0.35, 1], shot: office, cast: { client: { at: bigMan, face: "happy", talk: true } } },
  { b: 2, p: [0, 0.3], shot: bedDev, night: true, cast: { dev: { ...devBed, talk: true } } },
  {
    b: 2, p: [0.3, 1], shot: office,
    cast: { client: { at: bigMan, face: "happy", talk: true } },
    gags: [
      { text: "UBER FOR OKADA", at: above(bigMan, -0.2, 2.25), w: 1.7, p: [0.25, 1] },
      { text: "+ KEKE", at: above(bigMan, 0.5, 2.75), w: 1.1, fill: YELLOW, p: [0.45, 1] },
      { text: "+ CANOE!", at: above(bigMan, -0.3, 3.2), w: 1.3, fill: BLUE, color: "white", p: [0.65, 1] },
    ],
  },
  {
    b: 3, shot: bedDev, night: true,
    cast: { dev: { ...devBed, talk: true } },
    gags: [{ text: "6 MONTHS = $$$", at: aboveDevBed, w: 1.6, fill: GREEN, color: "white", p: [0.3, 1] }],
  },
  { b: 4, p: [0, 0.45], shot: office, cast: { client: { at: bigMan, face: "neutral" } }, gags: [{ text: "...", at: above(bigMan), w: 0.9 }] },
  {
    b: 4, p: [0.45, 1], shot: officeClose,
    cast: { client: { at: bigMan, face: "happy", talk: true } },
    gags: [{ text: "NA EXPOSURE!", at: above(bigMan), w: 1.7, fill: YELLOW, p: [0.55, 1] }],
  },

  // ===== Act 2: the argument =====
  {
    b: 5, p: [0, 0.5], shot: bedDev,
    cast: { dev: { ...devBed, face: "vexed", talk: true } },
    gags: [{ text: "LANDLORD DEY COLLECT AM?", at: aboveDevBed, w: 2.0, p: [0.3, 1] }],
  },
  { b: 5, p: [0.5, 1], shot: office, cast: { client: { at: bigMan, talk: true } }, gags: [{ text: "SEE VISION!", at: above(bigMan), w: 1.5, p: [0.2, 1] }] },
  { b: 6, p: [0, 0.75], shot: bedDev, cast: { dev: { ...devBed, talk: true } }, gags: [{ text: "DRIVER?", at: aboveDevBed, w: 1.3, p: [0.45, 1] }] },
  { b: 6, p: [0.75, 1], shot: officeClose, cast: { client: { at: bigMan, talk: true } }, gags: [{ text: "DIFFERENT", at: above(bigMan), w: 1.4 }] },
  { b: 7, p: [0, 0.25], shot: bedDev, cast: { dev: { ...devBed, talk: true } }, gags: [{ text: "MECHANIC?", at: aboveDevBed, w: 1.4 }] },
  { b: 7, p: [0.25, 0.4], shot: officeClose, cast: { client: { at: bigMan, talk: true } }, gags: [{ text: "DIFFERENT", at: above(bigMan), w: 1.4 }] },
  { b: 7, p: [0.4, 0.75], shot: bedDev, cast: { dev: { ...devBed, talk: true } }, gags: [{ text: "RECHARGE CARD?", at: aboveDevBed, w: 1.7 }] },
  { b: 7, p: [0.75, 1], shot: officeClose, cast: { client: { at: bigMan, face: "happy", talk: true } }, gags: [{ text: "NA BUSINESS!", at: above(bigMan), w: 1.6, fill: YELLOW }] },
  {
    b: 8, shot: bedDev,
    cast: { dev: { ...devBed, face: "vexed", talk: true } },
    gags: [{ text: "ONLY ME BE CHARITY", at: aboveDevBed, w: 1.9, fill: RED, color: "white", p: [0.2, 1] }],
  },

  // ===== Act 3: the visit =====
  { b: 9, p: [0, 0.4], shot: doorWide, cast: { mama: { at: mamaDoor }, client: { at: bigManDoor, walkFrom: offDoor, face: "happy" } }, badge: "PHYSICALLY." },
  {
    b: 9, p: [0.4, 1], shot: doorWide,
    cast: { mama: { at: mamaDoor, face: "shocked" }, client: { at: bigManDoor, talk: true } },
    gags: [{ text: "E DEY REFUSE OPPORTUNITY!", at: above(bigManDoor), w: 2.1, p: [0.3, 1] }],
  },
  {
    b: 10, shot: doorMama,
    cast: { mama: { at: mamaDoor, face: "vexed", talk: true }, client: { at: bigManDoor, face: "happy" }, dev: { at: devDoor, walkFrom: offDoor } },
    gags: [{ text: "YOU GO POPULAR!", at: above(mamaDoor, 0.2), w: 1.7, fill: YELLOW, p: [0.5, 1] }],
  },
  {
    b: 11, p: [0, 0.5], shot: doorDev,
    cast: { dev: { at: devDoor, talk: true }, client: { at: bigManDoor } },
    gags: [{ text: "ONE CONDITION", at: above(devDoor), w: 1.6, p: [0.3, 1] }],
  },
  {
    b: 11, p: [0.5, 1], shot: doorDev,
    cast: { dev: { at: devDoor, face: "happy", talk: true }, client: { at: bigManDoor } },
    gags: [{ text: "MY NAME. FRONT PAGE. BIG.", at: above(devDoor, -0.3), w: 2.1, fill: BLUE, color: "white", p: [0.2, 1] }],
  },
  {
    b: 12, shot: doorWide,
    cast: { mama: { at: mamaDoor, face: "happy" }, client: { at: bigManDoor, face: "happy" }, dev: { at: devDoor, face: "happy" } },
    gags: [
      { text: "SIGNED!", at: above(bigManDoor, -0.2), w: 1.4, fill: GREEN, color: "white", p: [0.3, 1] },
      { text: "NO READ", at: above(bigManDoor, 0.5, 2.95), w: 1.2, fill: RED, color: "white", p: [0.65, 1] },
    ],
  },
  {
    b: 13, shot: doorDev, night: true,
    cast: { dev: { at: devDoor, talk: true } },
    gags: [{ text: "NO PAY = NO OWN", at: above(devDoor), w: 1.8, fill: YELLOW, p: [0.5, 1] }],
  },

  // ===== Act 4: the launch =====
  { b: 14, p: [0, 0.6], shot: stageWide, badge: "3 MONTHS LATER", cast: { client: { at: bigManStage, face: "happy", talk: true }, dev: { at: devCrowd } } },
  {
    b: 14, p: [0.6, 1], shot: stageBigMan,
    cast: { client: { at: bigManStage, face: "happy", talk: true } },
    gags: [{ text: "PRESS!", at: above(bigManStage, 0.4), w: 1.1, fill: YELLOW, p: [0.5, 1] }],
  },
  {
    b: 15, shot: stageScreen, flags: ["screen-red"],
    gags: [
      { text: "THIS APP BELONG", at: [STAGE_X, 2.95, -2.4], w: 2.4, fill: "white", p: [0.05, 1] },
      { text: "TO THE DEVELOPER", at: [STAGE_X, 2.25, -2.35], w: 2.4, fill: "white", p: [0.25, 1] },
      { text: "OWNER NEVER PAY.", at: [STAGE_X, 1.7, -2.3], w: 2.2, fill: RED, color: "white", p: [0.55, 1] },
    ],
  },
  { b: 16, p: [0, 0.4], shot: stageWide, flags: ["screen-red"], cast: { client: { at: bigManStage, face: "shocked" }, dev: { at: devCrowd } }, gags: [{ text: "DJ: STOP!", at: [STAGE_X + 1.6, 2.4, -1.2], w: 1.4 }] },
  { b: 16, p: [0.4, 0.7], shot: stageBigMan, flags: ["screen-red"], cast: { client: { at: bigManStage, face: "vexed" } } },
  { b: 16, p: [0.7, 1], shot: crowdDev, flags: ["screen-red"], cast: { dev: { at: devCrowd, face: "happy" } }, gags: [{ text: "*WAVES*", at: above(devCrowd, 0.5, 2.1), w: 1.1 }] },
  { b: 17, shot: crowdDev, flags: ["screen-red"], cast: { dev: { at: devCrowd, face: "happy", talk: true } }, gags: [{ text: "SIR. EXPOSURE.", at: above(devCrowd), w: 1.8, fill: YELLOW, p: [0.3, 1] }] },
  { b: "tail", shot: crowdDev, badge: "SABI COMPOUND", flags: ["screen-red"], cast: { dev: { at: devCrowd, face: "happy" } } },
];

export const Ep02 = () => <Episode data={data} segments={SEGMENTS} audio="ep02.mp3" />;

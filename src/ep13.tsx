// Episode 13 — "Sunday Rice And Client Call". Pure data for the episode engine.
// Beat numbers match the lines of assets/ep13/beats.txt (starting at 0).
import { Episode, type Actor, type Segment, type Shot } from "./Episode";
import { BED_X, OFFICE_X, PARLOUR_X, type V3 } from "./Sets";
import data from "./ep13.json";

const YELLOW = "#ffd23f";
const GREEN = "#2fbf5b";
const BLUE = "#2f4a8f";
const RED = "#d62f2f";
const FOOD = ["food"];

const devBed: Actor = { at: [BED_X - 0.3, 0.3, -0.7], scale: 1.2 };
// the family stands behind the centre table, which reads as sitting at it
const mama: V3 = [PARLOUR_X - 0.75, 0.1, 0.25];
const papa: V3 = [PARLOUR_X - 0.05, 0.1, 0.0];
const brother: V3 = [PARLOUR_X + 0.65, 0.1, 0.25];
const dev: V3 = [PARLOUR_X + 1.35, 0.1, 0.45];
const client: V3 = [OFFICE_X, 0.1, -0.6];

const bedDev: Shot = { pos: [-0.3, 1.9, 5.0], look: [-0.3, 1.95, -0.7] };
const table: Shot = { pos: [PARLOUR_X + 0.3, 2.0, 8.0], look: [PARLOUR_X + 0.3, 1.3, 0.4], push: 0.12 };
const tableMama: Shot = { pos: [PARLOUR_X - 0.75, 1.7, 4.0], look: [PARLOUR_X - 0.75, 1.6, 0.25], push: 0.15 };
const tableDev: Shot = { pos: [PARLOUR_X + 1.2, 1.7, 4.4], look: [PARLOUR_X + 1.2, 1.6, 0.45], push: 0.15 };
const office: Shot = { pos: [OFFICE_X, 1.8, 6.0], look: [OFFICE_X, 1.6, -0.6], push: 0.2 };

const above = (at: V3, dx = 0, y = 2.45): V3 => [at[0] + dx, at[1] + y, at[2] + 0.2];
const overBed: V3 = [BED_X - 0.3, 2.8, -0.2];
const overTable: V3 = [PARLOUR_X + 0.3, 2.75, 0.8];
const family = { mama: { at: mama }, papa: { at: papa }, cousin: { at: brother, face: "happy" as const } };

const SEGMENTS: Segment[] = [
  // ===== Act 1: the call vs the rice =====
  { b: 0, shot: table, flags: FOOD, cast: { ...family, dev: { at: dev, face: "happy", talk: true } }, gags: [{ text: "SUNDAY RICE > EVERYTHING", at: overTable, w: 2.1, fill: YELLOW, p: [0.2, 1] }] },
  {
    b: 1, shot: bedDev, badge: "SUNDAY 2:00 PM",
    cast: { dev: { ...devBed, face: "happy", talk: true } },
    gags: [
      { text: "JOLLOF (BOTTOM POT)", at: overBed, w: 1.9, fill: "#e8862e", color: "white", p: [0.3, 0.7] },
      { text: "*SMELL ENTER BRAIN*", at: overBed, w: 1.9, fill: YELLOW, p: [0.7, 1] },
    ],
  },
  { b: 2, p: [0, 0.4], shot: bedDev, cast: { dev: { ...devBed, face: "shocked" } }, gags: [{ text: "RING RING: CLIENT", at: overBed, w: 1.8, fill: RED, color: "white" }] },
  { b: 2, p: [0.4, 1], shot: office, cast: { client: { at: client, face: "shocked", talk: true } }, gags: [{ text: "SITE DOWN! NEED YOU NOW!", at: above(client), w: 2.0, fill: RED, color: "white", p: [0.2, 1] }] },
  { b: 3, shot: tableMama, flags: FOOD, cast: { mama: { at: mama, face: "vexed", talk: true } }, gags: [{ text: "I NO GO CALL TWICE!", at: above(mama), w: 1.9, fill: YELLOW, p: [0.4, 1] }] },
  {
    b: 4, shot: table, flags: FOOD,
    cast: { ...family, cousin: { at: brother, face: "happy", talk: true } },
    gags: [
      { text: "MISS FIRST CALL = NO MEAT", at: overTable, w: 2.1, fill: RED, color: "white", p: [0.1, 0.55] },
      { text: "BROTHER: CHOP LIKE THIEF", at: overTable, w: 2.1, p: [0.55, 1] },
    ],
  },

  // ===== Act 2: laptop at the table =====
  { b: 5, shot: tableDev, flags: FOOD, cast: { dev: { at: dev, face: "happy", talk: true } }, gags: [{ text: "KEYBOARD + SPOON", at: above(dev), w: 1.7, fill: BLUE, color: "white", p: [0.45, 1] }] },
  {
    b: 6, shot: table, flags: FOOD,
    cast: { ...family, mama: { at: mama, face: "vexed", talk: true }, dev: { at: dev, face: "shocked" } },
    gags: [
      { text: "WORK FOR MY TABLE?", at: overTable, w: 1.9, p: [0.05, 0.45] },
      { text: "PAPA: *CHEW CHEW*", at: overTable, w: 1.8, fill: YELLOW, p: [0.7, 1] },
    ],
  },
  {
    b: 7, shot: table, flags: FOOD,
    cast: { ...family, cousin: { at: brother, face: "happy", talk: true }, dev: { at: dev, face: "vexed" } },
    gags: [
      { text: "SERVER ERROR x99", at: overTable, w: 1.8, fill: RED, color: "white", p: [0.3, 0.65] },
      { text: "BROTHER CARRY MY MEAT", at: overTable, w: 2.0, fill: YELLOW, p: [0.65, 1] },
    ],
  },
  {
    b: 8, shot: table, flags: FOOD,
    cast: { ...family, cousin: { at: brother, face: "shocked" }, mama: { at: mama, face: "shocked" }, dev: { at: dev, face: "shocked" } },
    gags: [{ text: "CAMERA: ON", at: overTable, w: 1.4, fill: RED, color: "white", p: [0.35, 1] }],
  },
  { b: 9, shot: office, cast: { client: { at: client, face: "shocked", talk: true } }, gags: [{ text: "IS THAT... JOLLOF?", at: above(client), w: 1.8, fill: "#e8862e", color: "white", p: [0.3, 1] }] },

  // ===== Act 3: Mama takes the meeting =====
  { b: 10, shot: tableMama, flags: FOOD, cast: { mama: { at: mama, face: "happy", talk: true } }, gags: [{ text: "YOU DON CHOP?", at: above(mama), w: 1.6, fill: YELLOW, p: [0.6, 1] }] },
  { b: 11, shot: office, cast: { client: { at: client, face: "neutral", talk: true } }, gags: [{ text: "NOT SINCE MORNING...", at: above(client), w: 1.9, p: [0.3, 1] }] },
  {
    b: 12, shot: tableMama, flags: FOOD,
    cast: { mama: { at: mama, face: "happy", talk: true } },
    gags: [
      { text: "REST.", at: above(mama), w: 1.0, p: [0.4, 0.6] },
      { text: "FAMILY.", at: above(mama), w: 1.2, p: [0.6, 0.8] },
      { text: "MONEY NO BE EVERYTHING", at: above(mama), w: 2.0, fill: GREEN, color: "white", p: [0.8, 1] },
    ],
  },
  { b: 13, shot: office, cast: { client: { at: client, face: "happy" } }, gags: [{ text: "*TAKING NOTES*", at: above(client), w: 1.6, fill: BLUE, color: "white", p: [0.2, 1] }] },
  {
    b: 14, shot: office,
    cast: { client: { at: client, face: "happy", talk: true } },
    gags: [
      { text: "SITE: BACK UP", at: above(client), w: 1.5, fill: GREEN, color: "white", p: [0, 0.4] },
      { text: "YOUR MOTHER IS VERY WISE", at: above(client), w: 2.0, fill: YELLOW, p: [0.4, 1] },
    ],
  },
  {
    b: 15, shot: bedDev, badge: "MONDAY",
    cast: { dev: { ...devBed, face: "shocked" } },
    gags: [{ text: "CAN YOUR MOTHER JOIN OUR TEAM MEETING?", at: overBed, w: 2.1, p: [0.35, 1] }],
  },
  { b: "tail", shot: tableMama, badge: "SABI COMPOUND", flags: FOOD, cast: { mama: { at: mama, face: "happy" } } },
];

export const Ep13 = () => <Episode data={data} segments={SEGMENTS} audio="ep13.mp3" />;

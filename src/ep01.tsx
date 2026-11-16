// Episode 1 — "Mama Think Say I No Get Work". Pure data for the episode engine.
// Beat numbers match the lines of assets/ep01/beats.txt (starting at 0).
import { Episode, type Actor, type Segment, type Shot } from "./Episode";
import { BED_X, CHURCH_X, DOOR_X, PARLOUR_X, type V3 } from "./Sets";
import data from "./ep01.json";

const YELLOW = "#ffd23f";
const GREEN = "#2fbf5b";
const BLUE = "#2f4a8f";

// ---- where people stand ----
const devBed: Actor = { at: [BED_X - 0.3, 0.3, -0.7], scale: 1.2 }; // inside the bed = sitting up
const mamaBed: V3 = [BED_X + 1.35, 0.1, -0.3];
const mamaDoor: V3 = [DOOR_X - 0.4, 0.1, -0.3];
const mamaPar: V3 = [PARLOUR_X - 1.0, 0.1, -0.6];
const chiPar: V3 = [PARLOUR_X + 0.1, 0.1, -0.6];
const devPar: V3 = [PARLOUR_X + 1.25, 0.1, -0.6];
const offRight: V3 = [PARLOUR_X + 4, 0.1, -0.6];
const devPew: V3 = [CHURCH_X - 0.9, 0.1, 0.35]; // behind the front pew
const mamaPew: V3 = [CHURCH_X + 0.1, 0.1, 0.35];
const mamaPulpit: V3 = [CHURCH_X + 0.6, 0.15, -1.85];

// ---- where the camera sits ----
const bedWide: Shot = { pos: [-0.3, 1.7, 7.4], look: [-0.3, 1.5, -0.6], push: 0.22 };
const bedDev: Shot = { pos: [-0.3, 1.9, 5.0], look: [-0.3, 1.95, -0.7] };
const bedTwo: Shot = { pos: [0.55, 1.6, 8.6], look: [0.55, 1.4, -0.5] };
const bedMama: Shot = { pos: [1.3, 1.6, 4.8], look: [1.35, 1.55, -0.3] };
const bedMamaClose: Shot = { pos: [1.35, 1.6, 3.7], look: [1.35, 1.6, -0.3], push: 0.2 };
const doorWide: Shot = { pos: [DOOR_X - 0.1, 1.6, 7.6], look: [DOOR_X - 0.1, 1.4, -0.5], push: 0.18 };
const doorClose: Shot = { pos: [DOOR_X - 0.3, 1.6, 4.6], look: [DOOR_X - 0.4, 1.55, -0.3] };
const parWide: Shot = { pos: [PARLOUR_X + 0.1, 1.7, 9.2], look: [PARLOUR_X + 0.1, 1.4, -0.5] };
const parMama: Shot = { pos: [PARLOUR_X - 0.9, 1.6, 4.4], look: [PARLOUR_X - 1.0, 1.55, -0.6] };
const parChi: Shot = { pos: [PARLOUR_X + 0.1, 1.6, 4.4], look: [PARLOUR_X + 0.1, 1.55, -0.6] };
const parDev: Shot = { pos: [PARLOUR_X + 1.2, 1.6, 4.0], look: [PARLOUR_X + 1.25, 1.6, -0.6], push: 0.18 };
const parFood: Shot = { pos: [PARLOUR_X + 0.6, 2.2, 6.0], look: [PARLOUR_X + 0.5, 1.0, 0.2], push: 0.2 };
const churchWide: Shot = { pos: [CHURCH_X, 2.2, 9.5], look: [CHURCH_X, 1.6, -1], push: 0.15 };
const churchMama: Shot = { pos: [CHURCH_X + 0.6, 1.8, 3.2], look: [CHURCH_X + 0.6, 1.75, -1.85], push: 0.15 };
const churchDev: Shot = { pos: [CHURCH_X - 0.9, 1.7, 4.6], look: [CHURCH_X - 0.9, 1.65, 0.35], push: 0.25 };

const above = (at: V3, dx = 0): V3 => [at[0] + dx, 2.45, at[2] + 0.2];
const aboveDevBed: V3 = [BED_X - 0.3, 2.8, -0.2];

const SEGMENTS: Segment[] = [
  // ===== Act 1: the misunderstanding =====
  {
    b: 0, p: [0, 0.55], shot: bedWide,
    cast: { dev: { ...devBed, face: "happy", talk: true } },
    gags: [{ text: "$", at: [BED_X - 0.3, 1.5, 0.05], w: 0.7, fill: GREEN, color: "white", float: true }],
  },
  {
    b: 0, p: [0.55, 1], shot: doorWide,
    cast: { mama: { at: mamaDoor } },
    gags: [{ text: "GIVE AM JOB!", at: above(mamaDoor, 0.1), w: 1.9, p: [0.25, 1] }],
  },
  {
    b: 1, p: [0, 0.5], shot: doorWide, badge: "6:00 AM",
    cast: { mama: { at: mamaDoor, face: "vexed", knock: true } },
    gags: [{ text: "KPO! KPO! KPO!", at: above(mamaDoor, 0.6), w: 1.7, fill: YELLOW, p: [0.4, 1] }],
  },
  { b: 1, p: [0.5, 1], shot: doorClose, cast: { mama: { at: mamaDoor, face: "vexed", talk: true } } },
  {
    b: 2, shot: bedDev,
    cast: { dev: { ...devBed, talk: true } },
    gags: [{ text: "OGA: 9PM zzz", at: [BED_X + 0.5, 2.9, -0.3], w: 1.3, p: [0.4, 0.9] }],
  },
  { b: 3, p: [0, 0.42], shot: bedTwo, cast: { dev: { ...devBed, talk: true }, mama: { at: mamaBed, walkFrom: [3.6, 0.1, -0.3] } } },
  {
    b: 3, p: [0.42, 0.6], shot: bedMama,
    cast: { dev: devBed, mama: { at: mamaBed, talk: true } },
    gags: [{ text: "PHONE?", at: above(mamaBed), p: [0.3, 1] }],
  },
  { b: 3, p: [0.6, 0.66], shot: bedDev, cast: { dev: { ...devBed, face: "vexed", talk: true }, mama: { at: mamaBed } } },
  {
    b: 3, p: [0.66, 0.73], shot: bedMama,
    cast: { dev: devBed, mama: { at: mamaBed, talk: true } },
    gags: [{ text: "COMPUTER?", at: above(mamaBed) }],
  },
  { b: 3, p: [0.73, 0.77], shot: bedDev, cast: { dev: { ...devBed, face: "vexed", talk: true }, mama: { at: mamaBed } } },
  {
    b: 3, p: [0.77, 0.92], shot: bedMama,
    cast: { dev: devBed, mama: { at: mamaBed, talk: true } },
    gags: [{ text: "WETIN??", at: above(mamaBed), fill: YELLOW, p: [0.2, 1] }],
  },
  {
    b: 3, p: [0.92, 1], shot: bedDev,
    cast: { dev: { ...devBed, face: "happy", talk: true }, mama: { at: mamaBed } },
    gags: [{ text: "</> WEBSITE", at: aboveDevBed, w: 1.7, fill: BLUE, color: "white" }],
  },
  { b: 4, p: [0, 0.55], shot: bedMama, cast: { dev: devBed, mama: { at: mamaBed } } },
  { b: 4, p: [0.55, 1], shot: bedMamaClose, cast: { dev: { ...devBed, face: "shocked" }, mama: { at: mamaBed, face: "vexed", talk: true } } },

  // ===== Act 2: Mama Chinedu =====
  { b: 5, p: [0, 0.35], shot: parWide, cast: { mama: { at: mamaPar, face: "happy" }, chinedu: { at: chiPar, face: "happy", walkFrom: offRight } } },
  {
    b: 5, p: [0.35, 0.62], shot: parChi,
    cast: { mama: { at: mamaPar }, chinedu: { at: chiPar, face: "happy", talk: true } },
    gags: [{ text: "SUIT. TIE. ID CARD.", at: above(chiPar), w: 1.9, p: [0.45, 1] }],
  },
  {
    b: 5, p: [0.62, 1], shot: parWide,
    cast: { mama: { at: mamaPar, face: "vexed" }, chinedu: { at: chiPar, face: "happy", talk: true } },
    gags: [
      { text: "MY SON FOR BANK!", at: above(chiPar, 0.4), w: 1.9, fill: YELLOW, p: [0.3, 1] },
      { text: "MY SON FOR BANK!", at: [chiPar[0] - 0.6, 3.1, -0.4], w: 1.7, fill: YELLOW, p: [0.62, 1] },
    ],
  },
  {
    b: 6, p: [0, 0.45], shot: parWide,
    cast: { mama: { at: mamaPar }, chinedu: { at: chiPar, talk: true }, dev: { at: devPar, walkFrom: offRight } },
    gags: [{ text: "AND YOU?", at: above(chiPar), p: [0.35, 1] }],
  },
  {
    b: 6, p: [0.45, 1], shot: parMama,
    cast: { mama: { at: mamaPar, face: "happy", talk: true }, chinedu: { at: chiPar }, dev: { at: devPar, face: "shocked" } },
    gags: [{ text: "E DEY PRESS LAPTOP", at: above(mamaPar, 0.15), w: 2.0, p: [0.6, 1] }],
  },
  {
    b: 7, shot: parDev,
    cast: { dev: { at: devPar, face: "vexed", talk: true }, chinedu: { at: chiPar } },
    gags: [{ text: "DJ??", at: above(devPar), w: 1.2, fill: YELLOW, p: [0.5, 1] }],
  },
  {
    b: 8, shot: parWide,
    cast: { mama: { at: mamaPar }, chinedu: { at: chiPar }, dev: { at: devPar, face: "happy", talk: true } },
    gags: [{ text: "3 COUNTRIES!", at: above(devPar, -0.2), w: 1.8, fill: BLUE, color: "white", p: [0.7, 1] }],
  },
  { b: 9, p: [0, 0.5], shot: parChi, cast: { mama: { at: mamaPar }, chinedu: { at: chiPar, face: "happy" }, dev: { at: devPar, face: "happy" } } },
  {
    b: 9, p: [0.5, 1], shot: parChi,
    cast: { mama: { at: mamaPar }, chinedu: { at: chiPar, talk: true }, dev: { at: devPar } },
    gags: [{ text: "WHERE YOUR ID CARD?", at: above(chiPar), w: 2.0, p: [0.4, 1] }],
  },
  {
    b: 10, shot: parDev,
    cast: { dev: { at: devPar, talk: true }, chinedu: { at: chiPar } },
    gags: [{ text: "I GET SLACK.", at: above(devPar), w: 1.6, fill: BLUE, color: "white", p: [0.5, 1] }],
  },

  // ===== Act 3: the alert (night falls as the story turns) =====
  {
    b: 11, shot: bedDev, night: true,
    cast: { dev: { ...devBed, face: "vexed", talk: true } },
    gags: [{ text: "TRANSFER: N50,000", at: aboveDevBed, w: 2.0, fill: GREEN, color: "white", p: [0.4, 1] }],
  },
  {
    b: 12, shot: parMama, night: true,
    cast: { mama: { at: mamaPar, face: "shocked" } },
    gags: [{ text: "CREDIT ALERT!", at: above(mamaPar, 0.1), w: 1.9, fill: GREEN, color: "white", p: [0.1, 1] }],
  },
  { b: 13, p: [0, 0.3], shot: doorWide, badge: "6:00 AM" },
  { b: 13, p: [0.3, 0.5], shot: doorClose, badge: "7:00 AM" },
  {
    b: 13, p: [0.5, 1], shot: parFood, badge: "10:00 AM", flags: ["food"],
    cast: { dev: { at: [PARLOUR_X + 1.4, 0.1, 0.2], face: "shocked", walkFrom: offRight } },
    gags: [{ text: "RICE. TWO MEAT.", at: [PARLOUR_X + 0.3, 1.5, 1.0], w: 1.8, fill: YELLOW, p: [0.6, 1] }],
  },
  {
    b: 14, p: [0, 0.55], shot: parMama, flags: ["food"],
    cast: { mama: { at: mamaPar, talk: true } },
    gags: [{ text: "SHHH! E DEY WORK", at: above(mamaPar, 0.15), w: 2.0, p: [0.35, 1] }],
  },
  {
    b: 14, p: [0.55, 1], shot: doorWide,
    cast: { dev: { at: mamaDoor, face: "happy" } },
    gags: [
      { text: "ENGINEER!", at: [DOOR_X - 1.2, 2.7, 0], w: 1.5, fill: YELLOW, p: [0.35, 1] },
      { text: "ENGINEER!", at: [DOOR_X + 0.7, 3.2, 0], w: 1.5, fill: YELLOW, p: [0.6, 1] },
    ],
  },
  { b: 15, shot: churchWide, badge: "SUNDAY", cast: { dev: { at: devPew, face: "happy", talk: true }, mama: { at: mamaPew } } },
  { b: 16, p: [0, 0.3], shot: churchWide, cast: { dev: { at: devPew, face: "happy" }, mama: { at: mamaPulpit, walkFrom: mamaPew } } },
  {
    b: 16, p: [0.3, 0.75], shot: churchMama,
    cast: { dev: { at: devPew }, mama: { at: mamaPulpit, face: "happy", talk: true } },
    gags: [{ text: "E STILL NO GET WORK", at: [CHURCH_X + 0.6, 2.75, -1.6], w: 1.9, p: [0.55, 1] }],
  },
  {
    b: 16, p: [0.75, 1], shot: churchMama,
    cast: { dev: { at: devPew, face: "shocked" }, mama: { at: mamaPulpit, face: "happy", talk: true } },
    gags: [{ text: "BUT LAPTOP DEY PAY!", at: [CHURCH_X + 0.6, 2.75, -1.6], w: 1.9, fill: YELLOW }],
  },
  { b: "tail", shot: churchDev, badge: "SABI COMPOUND", cast: { dev: { at: devPew, face: "shocked" } } },
];

export const Ep01 = () => <Episode data={data} segments={SEGMENTS} audio="ep01.mp3" />;

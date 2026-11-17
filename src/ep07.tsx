// Episode 7 — "Iya Bose Wan App". Pure data for the episode engine.
// Beat numbers match the lines of assets/ep07/beats.txt (starting at 0).
import { Episode, type Actor, type Segment, type Shot } from "./Episode";
import { BED_X, SHOP_X, type V3 } from "./Sets";
import data from "./ep07.json";

const YELLOW = "#ffd23f";
const GREEN = "#2fbf5b";
const BLUE = "#2f4a8f";
const RED = "#d62f2f";

const devBed: Actor = { at: [BED_X - 0.3, 0.3, -0.7], scale: 1.2 };
const iya: V3 = [SHOP_X - 0.3, 0.45, -1.0]; // behind the counter, on a step
const devShop: V3 = [SHOP_X + 1.0, 0.1, 0.3];
const tunde: V3 = [SHOP_X - 1.0, 0.1, 0.5];
const baba: V3 = [SHOP_X - 1.0, 0.1, 0.5];

const shop: Shot = { pos: [SHOP_X, 1.8, 9.2], look: [SHOP_X, 1.5, -0.4], push: 0.12 };
const shopIya: Shot = { pos: [SHOP_X - 0.3, 2.0, 4.0], look: [SHOP_X - 0.3, 1.9, -1.0], push: 0.15 };
const shopDev: Shot = { pos: [SHOP_X + 1.0, 1.65, 4.2], look: [SHOP_X + 1.0, 1.6, 0.3], push: 0.18 };
const bedDev: Shot = { pos: [-0.3, 1.9, 5.0], look: [-0.3, 1.95, -0.7] };

const above = (at: V3, dx = 0, y = 2.45): V3 => [at[0] + dx, at[1] + y, at[2] + 0.2];
const overIya = above(iya, 0, 2.3);
const overBed: V3 = [BED_X - 0.3, 2.8, -0.2];

const SEGMENTS: Segment[] = [
  // ===== Act 1: the brief =====
  {
    b: 0, shot: shop,
    cast: { iyabose: { at: iya, face: "happy" }, dev: { at: devShop, talk: true } },
    gags: [{ text: "HARDEST CLIENT EVER", at: above(devShop, -0.6), w: 2.0, fill: RED, color: "white", p: [0.45, 1] }],
  },
  {
    b: 1, shot: shopIya,
    cast: { iyabose: { at: iya, face: "happy" } },
    gags: [
      { text: "WHO DEY OWE", at: overIya, w: 1.4, p: [0.15, 0.45] },
      { text: "WHO DEY LIE", at: overIya, w: 1.4, fill: YELLOW, p: [0.45, 0.72] },
      { text: "INDOMIE SINCE JAN", at: overIya, w: 1.8, fill: RED, color: "white", p: [0.72, 1] },
    ],
  },
  { b: 2, shot: shopIya, cast: { iyabose: { at: iya, face: "neutral" } }, gags: [{ text: "NO BOOK. NO BIRO.", at: overIya, w: 1.8, fill: BLUE, color: "white", p: [0.2, 1] }] },
  { b: 3, p: [0, 0.6], shot: shopIya, cast: { iyabose: { at: iya, face: "happy", talk: true } }, gags: [{ text: "ENGINEER! DO APP!", at: overIya, w: 1.8, fill: YELLOW, p: [0.15, 1] }] },
  { b: 3, p: [0.6, 1], shot: shopIya, cast: { iyabose: { at: iya, face: "happy", talk: true } }, gags: [{ text: "APP WEY DEY CATCH DEBTOR", at: overIya, w: 2.0, fill: RED, color: "white", p: [0.3, 1] }] },
  {
    b: 4, shot: bedDev, night: true,
    cast: { dev: { ...devBed, face: "happy", talk: true } },
    gags: [{ text: "v1: NAMES + AMOUNTS", at: overBed, w: 1.9, fill: GREEN, color: "white", p: [0.4, 1] }],
  },

  // ===== Act 2: the feature requests =====
  { b: 5, p: [0, 0.4], shot: shopIya, cast: { iyabose: { at: iya, face: "vexed", talk: true } }, gags: [{ text: "MTCHEW!", at: overIya, w: 1.2, fill: YELLOW, p: [0.2, 1] }] },
  { b: 5, p: [0.4, 1], shot: shop, cast: { iyabose: { at: iya, face: "vexed", talk: true }, dev: { at: devShop } }, gags: [{ text: "WHERE MAMA TUNDE?", at: overIya, w: 1.8, p: [0.1, 1] }] },
  {
    b: 6, shot: shop,
    cast: { iyabose: { at: iya, face: "vexed", talk: true }, dev: { at: devShop }, chinedu: { at: tunde, face: "happy", walkFrom: [SHOP_X - 5, 0.1, 0.5] } },
    gags: [{ text: "\"MY HUSBAND NEVER SEND MONEY\"", at: above(tunde, 0.8, 2.25), w: 2.1, fill: YELLOW, p: [0.35, 1] }],
  },
  {
    b: 7, shot: shop,
    cast: { iyabose: { at: iya, face: "vexed", talk: true }, dev: { at: devShop }, landlord: { at: baba, face: "happy", walkFrom: [SHOP_X - 5, 0.1, 0.5] } },
    gags: [
      { text: "PUT AM DOWN!", at: above(baba, 0.3, 2.2), w: 1.5, fill: YELLOW, p: [0.25, 1] },
      { text: "APP FIT SHOUT?", at: overIya, w: 1.6, p: [0.75, 1] },
    ],
  },
  { b: 8, shot: shopDev, cast: { dev: { at: devShop, face: "shocked", talk: true } }, gags: [{ text: "SHOUT??", at: above(devShop), w: 1.2, fill: RED, color: "white", p: [0.1, 1] }] },
  { b: 9, p: [0, 0.5], shot: shopDev, cast: { dev: { at: devShop, face: "vexed", talk: true } } },
  { b: 9, p: [0.5, 1], shot: shopIya, cast: { iyabose: { at: iya, face: "vexed", talk: true } }, gags: [{ text: "WETIN YOU GO SCHOOL LEARN?", at: overIya, w: 2.1, p: [0.1, 1] }] },
  {
    b: 10, shot: bedDev, night: true,
    cast: { dev: { ...devBed, face: "vexed" } },
    gags: [
      { text: "3 WEEKS. v14.", at: overBed, w: 1.5, fill: BLUE, color: "white", p: [0, 0.6] },
      { text: "\"E NO SWEET ME\"", at: overBed, w: 1.6, fill: RED, color: "white", p: [0.6, 1] },
    ],
  },
  {
    b: 11, shot: bedDev,
    cast: { dev: { ...devBed, face: "happy", talk: true } },
    gags: [
      { text: "REMINDERS ON", at: overBed, w: 1.5, fill: GREEN, color: "white", p: [0.3, 0.65] },
      { text: "E DEY TALK YORUBA", at: overBed, w: 1.8, fill: YELLOW, p: [0.65, 1] },
    ],
  },

  // ===== Act 3: the payment =====
  { b: 12, shot: shopIya, cast: { iyabose: { at: iya, face: "happy", talk: true } }, gags: [{ text: "ENGINEER, YOU TRY.", at: overIya, w: 1.8, fill: GREEN, color: "white", p: [0.5, 1] }] },
  { b: 13, shot: shopDev, cast: { dev: { at: devShop, face: "happy", talk: true } }, gags: [{ text: "ABOUT MY PAYMENT...", at: above(devShop), w: 1.9, p: [0.55, 1] }] },
  { b: 14, shot: shop, cast: { iyabose: { at: iya, face: "neutral" }, dev: { at: devShop, face: "neutral" } }, gags: [{ text: "*SCROLL* *SCROLL*", at: overIya, w: 1.8, p: [0.4, 1] }] },
  {
    b: 15, shot: shopDev,
    cast: { dev: { at: devShop, face: "shocked" } },
    gags: [{ text: "#1: ENGINEER", at: above(devShop), w: 1.6, fill: RED, color: "white", p: [0.2, 1] }],
  },
  {
    b: 16, shot: shopIya,
    cast: { iyabose: { at: iya, face: "happy", talk: true } },
    gags: [
      { text: "INDOMIE x4", at: overIya, w: 1.3, p: [0.1, 0.35] },
      { text: "EGG x6", at: overIya, w: 1.1, fill: YELLOW, p: [0.35, 0.6] },
      { text: "MALT x2. SINCE MARCH.", at: overIya, w: 1.9, fill: RED, color: "white", p: [0.6, 1] },
    ],
  },
  { b: 17, shot: shopIya, cast: { iyabose: { at: iya, face: "happy", talk: true } }, gags: [{ text: "WE DON BALANCE.", at: overIya, w: 1.7, fill: GREEN, color: "white", p: [0.3, 1] }] },
  { b: "tail", shot: shopDev, badge: "SABI COMPOUND", cast: { dev: { at: devShop, face: "shocked" } } },
];

export const Ep07 = () => <Episode data={data} segments={SEGMENTS} audio="ep07.mp3" />;

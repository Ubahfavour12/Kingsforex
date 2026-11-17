// Flat 2D cast for Sabi Compound, drawn in code so every part can be animated.
// Proportions follow the style rules: about 3.5 heads tall, thin limbs, ink outline.
import type { ReactNode } from "react";

export type Expression = "neutral" | "happy" | "shocked" | "vexed" | "talking";
export type Who = "dev" | "mama" | "chinedu" | "iyabose" | "client" | "landlord" | "chairman" | "cousin";

const INK = "#1b1410";
const ink = { stroke: INK, strokeWidth: 3.5, strokeLinejoin: "round", strokeLinecap: "round" } as const;

type Look = {
  skin: string;
  shade: string;
  top: string;
  bottom: string;
  outfit: "tee" | "suit" | "agbada" | "gown";
  hair: "lowcut" | "bald" | "fila" | "gele";
  logo?: string;
  tie?: string;
  shades?: boolean;
  beard?: boolean;
};

const LOOKS: Record<Who, Look> = {
  dev: { skin: "#c98f63", shade: "#a8744d", top: "#ffffff", bottom: "#2f4a8f", outfit: "tee", hair: "lowcut", logo: "</>" },
  cousin: { skin: "#b07850", shade: "#8f5d3a", top: "#ff8a3d", bottom: "#3b3b46", outfit: "tee", hair: "lowcut", logo: "★" },
  mama: { skin: "#b97f55", shade: "#99653f", top: "#d6336c", bottom: "#f5c542", outfit: "gown", hair: "gele" },
  chinedu: { skin: "#a86b45", shade: "#885232", top: "#1f9d6b", bottom: "#7fd0ff", outfit: "gown", hair: "gele" },
  iyabose: { skin: "#9c6440", shade: "#7d4c2e", top: "#f07c1e", bottom: "#5b2a86", outfit: "gown", hair: "gele" },
  client: { skin: "#8f5a38", shade: "#734428", top: "#23232b", bottom: "#23232b", outfit: "suit", hair: "bald", tie: "#d62f2f" },
  chairman: { skin: "#a66c45", shade: "#865230", top: "#6f2dbd", bottom: "#6f2dbd", outfit: "suit", hair: "lowcut", tie: "#ffd23f", shades: true },
  landlord: { skin: "#94603d", shade: "#764a2c", top: "#e9e1c9", bottom: "#4a6b3a", outfit: "agbada", hair: "fila", beard: true },
};

// brows, eye height and mouth per expression
const FACES: Record<Expression, { brows: [string, string]; eyeRy: number; mouth: ReactNode }> = {
  neutral: {
    brows: ["M66 56 Q78 51 90 56", "M110 56 Q122 51 134 56"],
    eyeRy: 8,
    mouth: <path d="M84 102 Q100 110 116 102" fill="none" {...ink} />,
  },
  happy: {
    brows: ["M66 53 Q78 46 90 53", "M110 53 Q122 46 134 53"],
    eyeRy: 6,
    mouth: (
      <>
        <path d="M76 96 Q100 126 124 96 Z" fill="#7a2a22" {...ink} />
        <path d="M80 98 Q100 109 120 98 Z" fill="white" />
      </>
    ),
  },
  shocked: {
    brows: ["M64 44 Q78 36 90 46", "M110 46 Q122 36 136 44"],
    eyeRy: 12,
    mouth: <ellipse cx="100" cy="106" rx="10" ry="13" fill="#7a2a22" {...ink} />,
  },
  vexed: {
    brows: ["M66 50 L90 60", "M110 60 L134 50"],
    eyeRy: 6,
    mouth: <path d="M84 108 Q100 98 116 108" fill="none" {...ink} />,
  },
  talking: {
    brows: ["M66 54 Q78 49 90 55", "M110 55 Q122 49 134 54"],
    eyeRy: 8,
    mouth: <ellipse cx="100" cy="104" rx="14" ry="8" fill="#7a2a22" {...ink} />,
  },
};

export const Character = ({
  who = "dev",
  expression = "neutral",
  height = 600,
}: {
  who?: Who;
  expression?: Expression;
  height?: number;
}) => {
  const face = FACES[expression];
  const look = LOOKS[who];
  const limb = (d: string, color: string, width: number) => (
    <>
      <path d={d} fill="none" stroke={INK} strokeWidth={width + 7} strokeLinecap="round" />
      <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" />
    </>
  );

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-10 -10 220 420" height={height}>
      {look.outfit === "tee" || look.outfit === "suit" ? (
        <>
          {limb("M86 290 L84 385 M114 290 L116 385", look.bottom, 11)}
          <path d="M66 398 Q66 384 84 384 L92 398 Z M134 398 Q134 384 116 384 L108 398 Z" fill={look.outfit === "suit" ? INK : "white"} {...ink} />
          {limb("M62 178 Q40 230 48 282 M138 178 Q160 230 152 282", look.outfit === "suit" ? look.top : look.skin, 9)}
          {/* crisp white tee, navy collar trim, gold logo */}
          <path d="M60 170 Q100 152 140 170 L134 296 Q100 306 66 296 Z" fill={look.top} {...ink} />
          <path d="M60 170 L46 208 L64 216 Z M140 170 L154 208 L136 216 Z" fill={look.top} {...ink} />
          {look.tie ? (
            <>
              <path d="M84 164 L100 196 L116 164 Z" fill="white" {...ink} />
              <path d="M96 172 L104 172 L108 240 L100 252 L92 240 Z" fill={look.tie} {...ink} />
            </>
          ) : (
            <path d="M84 164 Q100 180 116 164" fill="none" stroke={look.bottom} strokeWidth={5} strokeLinecap="round" />
          )}
          {look.logo && (
            <text x="100" y="236" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="26" fill="#e0a100">{look.logo}</text>
          )}
        </>
      ) : look.outfit === "agbada" ? (
        <>
          {limb("M88 360 L88 388 M112 360 L112 388", look.bottom, 10)}
          <path d="M72 400 Q72 388 88 388 L94 400 Z M128 400 Q128 388 112 388 L106 400 Z" fill="#3a2a22" {...ink} />
          {/* wide flowing robe over trousers, with embroidery at the neck */}
          <path d="M60 168 Q100 152 140 168 L192 290 Q160 312 140 296 L136 372 Q100 384 64 372 L60 296 Q40 312 8 290 Z" fill={look.top} {...ink} />
          <path d="M80 168 Q100 210 120 168" fill="none" stroke={look.bottom} strokeWidth={6} />
          <path d="M90 196 L90 260 M110 196 L110 260" fill="none" stroke={look.bottom} strokeWidth={4} opacity={0.7} />
        </>
      ) : (
        <>
          {limb("M88 360 L88 388 M112 360 L112 388", look.skin, 9)}
          <path d="M72 400 Q72 388 88 388 L94 400 Z M128 400 Q128 388 112 388 L106 400 Z" fill="#3a2a22" {...ink} />
          {limb("M60 180 Q36 226 50 276 M140 180 Q164 226 150 276", look.skin, 9)}
          {/* ankara gown with wrapper */}
          <path d="M58 170 Q100 152 142 170 L156 366 Q100 380 44 366 Z" fill={look.top} {...ink} />
          <path d="M58 170 L42 204 L62 214 Z M142 170 L158 204 L138 214 Z" fill={look.top} {...ink} />
          <path d="M50 270 Q100 284 150 270 M47 310 Q100 326 153 310" fill="none" stroke={look.bottom} strokeWidth={7} />
          {[80, 100, 120].map((x) => (
            <circle key={x} cx={x} cy={210} r={7} fill={look.bottom} />
          ))}
        </>
      )}

      <path d="M88 138 L88 164 Q100 172 112 164 L112 138 Z" fill={look.shade} {...ink} />
      <ellipse cx="50" cy="80" rx="9" ry="14" fill={look.skin} {...ink} />
      <ellipse cx="150" cy="80" rx="9" ry="14" fill={look.skin} {...ink} />
      <ellipse cx="100" cy="76" rx="50" ry="62" fill={look.skin} {...ink} />
      {/* soft cheek highlight keeps the face looking fresh */}
      <ellipse cx="70" cy="92" rx="9" ry="5" fill="#ffffff" opacity={0.18} />
      <ellipse cx="130" cy="92" rx="9" ry="5" fill="#ffffff" opacity={0.18} />

      {look.hair === "lowcut" ? (
        // low cut with a sharp hairline and faded sides
        <>
          <path d="M53 60 Q52 14 100 13 Q148 14 147 60 Q140 40 126 38 L74 38 Q60 40 53 60 Z" fill="#17120f" {...ink} />
          <path d="M53 60 Q56 46 62 42 M147 60 Q144 46 138 42" fill="none" stroke={look.shade} strokeWidth={5} opacity={0.7} />
        </>
      ) : look.hair === "bald" ? (
        <path d="M66 30 Q84 20 100 22" fill="none" stroke="#ffffff" strokeWidth={6} strokeLinecap="round" opacity={0.35} />
      ) : look.hair === "fila" ? (
        // fila cap folded to one side
        <path d="M50 46 Q48 4 104 4 Q160 8 154 40 L168 30 Q160 54 150 50 Q100 36 50 46 Z" fill={look.bottom} {...ink} />
      ) : (
        // gele head tie + earrings
        <>
          <path d="M44 56 Q30 -4 100 -6 Q172 -4 156 56 Q130 30 100 34 Q70 30 44 56 Z" fill={look.bottom} {...ink} />
          <path d="M60 30 Q100 6 142 28 M70 14 Q104 -2 150 22" fill="none" stroke={INK} strokeWidth={3} opacity={0.35} />
          <circle cx="50" cy="100" r="6" fill="#f5c542" {...ink} />
          <circle cx="150" cy="100" r="6" fill="#f5c542" {...ink} />
        </>
      )}

      <path d={face.brows[0]} fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />
      <path d={face.brows[1]} fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />
      {[78, 122].map((cx) => (
        <g key={cx}>
          <ellipse cx={cx} cy="72" rx="10" ry={face.eyeRy} fill="white" stroke={INK} strokeWidth={3} />
          <circle cx={cx} cy="72" r={Math.min(5, face.eyeRy - 1)} fill={INK} />
          <circle cx={cx + 2} cy="70" r={1.6} fill="white" />
        </g>
      ))}
      <path d="M94 90 Q100 96 106 90" fill="none" stroke={look.shade} strokeWidth={4} strokeLinecap="round" />
      {face.mouth}
      {look.beard && (
        <path d="M56 100 Q60 140 100 142 Q140 140 144 100 Q134 128 100 128 Q66 128 56 100 Z" fill="#d9d4cc" {...ink} />
      )}
      {look.shades && (
        <>
          <path d="M62 64 L94 64 L92 82 Q78 88 64 80 Z M106 64 L138 64 L136 80 Q122 88 108 82 Z" fill="#111" {...ink} />
          <path d="M94 68 L106 68" stroke={INK} strokeWidth={4} />
        </>
      )}
    </svg>
  );
};

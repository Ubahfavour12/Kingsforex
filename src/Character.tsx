// Flat 2D cast for Sabi Compound, drawn in code so every part can be animated.
// Proportions follow the style rules: about 3.5 heads tall, thin limbs, ink outline.
import type { ReactNode } from "react";

export type Expression = "neutral" | "happy" | "shocked" | "vexed" | "talking";
export type Who = "dev" | "mama";

const INK = "#1b1410";
const ink = { stroke: INK, strokeWidth: 3.5, strokeLinejoin: "round", strokeLinecap: "round" } as const;

const LOOKS = {
  dev: { skin: "#c98f63", shade: "#a8744d", top: "#ffffff", bottom: "#2f4a8f" },
  mama: { skin: "#b97f55", shade: "#99653f", top: "#d6336c", bottom: "#d6336c" },
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
      {who === "dev" ? (
        <>
          {limb("M86 290 L84 385 M114 290 L116 385", look.bottom, 11)}
          <path d="M66 398 Q66 384 84 384 L92 398 Z M134 398 Q134 384 116 384 L108 398 Z" fill="white" {...ink} />
          {limb("M62 178 Q40 230 48 282 M138 178 Q160 230 152 282", look.skin, 9)}
          {/* crisp white tee, navy collar trim, gold logo */}
          <path d="M60 170 Q100 152 140 170 L134 296 Q100 306 66 296 Z" fill={look.top} {...ink} />
          <path d="M60 170 L46 208 L64 216 Z M140 170 L154 208 L136 216 Z" fill={look.top} {...ink} />
          <path d="M84 164 Q100 180 116 164" fill="none" stroke={look.bottom} strokeWidth={5} strokeLinecap="round" />
          <text x="100" y="236" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="26" fill="#e0a100">{"</>"}</text>
        </>
      ) : (
        <>
          {limb("M88 360 L88 388 M112 360 L112 388", look.skin, 9)}
          <path d="M72 400 Q72 388 88 388 L94 400 Z M128 400 Q128 388 112 388 L106 400 Z" fill="#3a2a22" {...ink} />
          {limb("M60 180 Q36 226 50 276 M140 180 Q164 226 150 276", look.skin, 9)}
          {/* ankara gown with wrapper */}
          <path d="M58 170 Q100 152 142 170 L156 366 Q100 380 44 366 Z" fill={look.top} {...ink} />
          <path d="M58 170 L42 204 L62 214 Z M142 170 L158 204 L138 214 Z" fill={look.top} {...ink} />
          <path d="M50 270 Q100 284 150 270 M47 310 Q100 326 153 310" fill="none" stroke="#f5c542" strokeWidth={7} />
          {[80, 100, 120].map((x) => (
            <circle key={x} cx={x} cy={210} r={7} fill="#f5c542" />
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

      {who === "dev" ? (
        // low cut with a sharp hairline and faded sides
        <>
          <path d="M53 60 Q52 14 100 13 Q148 14 147 60 Q140 40 126 38 L74 38 Q60 40 53 60 Z" fill="#17120f" {...ink} />
          <path d="M53 60 Q56 46 62 42 M147 60 Q144 46 138 42" fill="none" stroke={look.shade} strokeWidth={5} opacity={0.7} />
        </>
      ) : (
        // gele head tie + earrings
        <>
          <path d="M44 56 Q30 -4 100 -6 Q172 -4 156 56 Q130 30 100 34 Q70 30 44 56 Z" fill="#f5c542" {...ink} />
          <path d="M60 30 Q100 6 142 28 M70 14 Q104 -2 150 22" fill="none" stroke="#c98a00" strokeWidth={4} />
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
    </svg>
  );
};

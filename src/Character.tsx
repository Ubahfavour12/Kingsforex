// The Dev: flat 2D lead character for Sabi Compound, drawn in code so every
// part can be animated. Proportions follow the style rules: about 3.5 heads
// tall, thin limbs, black ink outline.
export type Expression = "neutral" | "happy" | "shocked" | "vexed" | "talking";

const INK = "#17110d";
const SKIN = "#8a5637";
const SKIN_SHADE = "#6f422a";
const HAIR = "#15100d";
const SHIRT = "#1f3a8a";
const TROUSERS = "#2b2b33";

const ink = { stroke: INK, strokeWidth: 4, strokeLinejoin: "round", strokeLinecap: "round" } as const;

// [left brow, right brow, eye height, mouth] per expression
const FACES: Record<Expression, { brows: [string, string]; eyeRy: number; mouth: React.ReactNode }> = {
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
        <path d="M76 96 Q100 126 124 96 Z" fill="#5a1f1a" {...ink} />
        <path d="M80 98 Q100 108 120 98 Z" fill="white" />
      </>
    ),
  },
  shocked: {
    brows: ["M64 44 Q78 36 90 46", "M110 46 Q122 36 136 44"],
    eyeRy: 12,
    mouth: <ellipse cx="100" cy="106" rx="10" ry="13" fill="#5a1f1a" {...ink} />,
  },
  vexed: {
    brows: ["M66 50 L90 60", "M110 60 L134 50"],
    eyeRy: 6,
    mouth: <path d="M84 108 Q100 98 116 108" fill="none" {...ink} />,
  },
  talking: {
    brows: ["M66 54 Q78 49 90 55", "M110 55 Q122 49 134 54"],
    eyeRy: 8,
    mouth: <ellipse cx="100" cy="104" rx="14" ry="8" fill="#5a1f1a" {...ink} />,
  },
};

export const Character = ({
  expression = "neutral",
  height = 600,
}: {
  expression?: Expression;
  height?: number;
}) => {
  const face = FACES[expression];
  return (
    <svg viewBox="0 0 200 420" height={height} style={{ overflow: "visible" }}>
      {/* legs + shoes */}
      <path d="M86 290 L84 385 M114 290 L116 385" fill="none" stroke={INK} strokeWidth={18} strokeLinecap="round" />
      <path d="M86 290 L84 385 M114 290 L116 385" fill="none" stroke={TROUSERS} strokeWidth={11} strokeLinecap="round" />
      <path d="M66 398 Q66 384 84 384 L92 398 Z M134 398 Q134 384 116 384 L108 398 Z" fill="white" {...ink} />

      {/* arms (behind torso) */}
      <path d="M62 178 Q40 230 48 282 M138 178 Q160 230 152 282" fill="none" stroke={INK} strokeWidth={16} strokeLinecap="round" />
      <path d="M62 178 Q40 230 48 282 M138 178 Q160 230 152 282" fill="none" stroke={SKIN} strokeWidth={9} strokeLinecap="round" />

      {/* torso: T-shirt with a small laptop-key logo */}
      <path d="M60 170 Q100 152 140 170 L134 296 Q100 306 66 296 Z" fill={SHIRT} {...ink} />
      <path d="M60 170 L46 208 L64 216 Z M140 170 L154 208 L136 216 Z" fill={SHIRT} {...ink} />
      <text x="100" y="236" textAnchor="middle" fontFamily="monospace" fontWeight="bold" fontSize="26" fill="#f5c542">{"</>"}</text>

      {/* neck */}
      <path d="M88 138 L88 164 Q100 172 112 164 L112 138 Z" fill={SKIN_SHADE} {...ink} />

      {/* ears */}
      <ellipse cx="50" cy="80" rx="9" ry="14" fill={SKIN} {...ink} />
      <ellipse cx="150" cy="80" rx="9" ry="14" fill={SKIN} {...ink} />

      {/* head */}
      <ellipse cx="100" cy="76" rx="50" ry="62" fill={SKIN} {...ink} />

      {/* low-cut hair with a clean hairline and faded sides */}
      <path d="M52 62 Q50 10 100 10 Q150 10 148 62 Q138 36 124 34 Q100 28 76 34 Q62 36 52 62 Z" fill={HAIR} {...ink} />

      {/* brows */}
      <path d={face.brows[0]} fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />
      <path d={face.brows[1]} fill="none" stroke={INK} strokeWidth={5} strokeLinecap="round" />

      {/* eyes */}
      {[78, 122].map((cx) => (
        <g key={cx}>
          <ellipse cx={cx} cy="72" rx="10" ry={face.eyeRy} fill="white" stroke={INK} strokeWidth={3} />
          <circle cx={cx} cy="72" r={Math.min(5, face.eyeRy - 1)} fill={INK} />
        </g>
      ))}

      {/* nose */}
      <path d="M94 90 Q100 96 106 90" fill="none" stroke={SKIN_SHADE} strokeWidth={4} strokeLinecap="round" />

      {face.mouth}
    </svg>
  );
};

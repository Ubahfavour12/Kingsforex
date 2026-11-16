import { AbsoluteFill } from "remotion";
import { Character, type Expression, type Who } from "./Character";

const EXPRESSIONS: Expression[] = ["neutral", "happy", "talking", "shocked", "vexed"];
const CAST: Who[] = ["dev", "mama", "chinedu"];

// Review sheet: every expression of every character.
export const CharacterSheet = () => (
  <AbsoluteFill style={{ background: "#f3dfb8", justifyContent: "space-evenly" }}>
    {CAST.map((who) => (
      <div key={who} style={{ display: "flex", justifyContent: "space-evenly" }}>
        {EXPRESSIONS.map((expression) => (
          <Character key={expression} who={who} expression={expression} height={340} />
        ))}
      </div>
    ))}
  </AbsoluteFill>
);

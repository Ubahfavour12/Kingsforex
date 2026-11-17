import { AbsoluteFill } from "remotion";
import { Character, type Expression, type Who } from "./Character";

const EXPRESSIONS: Expression[] = ["neutral", "happy", "shocked", "vexed"];
const CAST: Who[] = ["dev", "mama", "chinedu", "iyabose", "client", "landlord", "chairman", "cousin"];

// Review sheet: every expression of every character.
export const CharacterSheet = () => (
  <AbsoluteFill style={{ background: "#f3dfb8", justifyContent: "space-evenly" }}>
    {[CAST.slice(0, 4), CAST.slice(4)].map((row) => (
      <div key={row[0]} style={{ display: "flex", justifyContent: "space-evenly" }}>
        {row.flatMap((who) =>
          EXPRESSIONS.slice(0, 2).map((expression) => (
            <Character key={who + expression} who={who} expression={expression} height={460} />
          )),
        )}
      </div>
    ))}
  </AbsoluteFill>
);

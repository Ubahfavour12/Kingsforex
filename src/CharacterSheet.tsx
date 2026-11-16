import { AbsoluteFill } from "remotion";
import { Character, type Expression } from "./Character";

const EXPRESSIONS: Expression[] = ["neutral", "happy", "talking", "shocked", "vexed"];

// Review sheet: every expression of the lead character side by side.
export const CharacterSheet = () => (
  <AbsoluteFill
    style={{
      background: "#f3dfb8",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      fontFamily: "Arial, Helvetica, sans-serif",
    }}
  >
    {EXPRESSIONS.map((expression) => (
      <div key={expression} style={{ textAlign: "center" }}>
        <Character expression={expression} height={760} />
        <div style={{ fontSize: 40, fontWeight: 800, marginTop: 24, color: "#17110d" }}>{expression}</div>
      </div>
    ))}
  </AbsoluteFill>
);

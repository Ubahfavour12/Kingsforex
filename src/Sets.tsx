// The reusable locations of Sabi Compound. Each set sits at its own spot along
// the x axis so the camera can physically travel from one to the next.
export type V3 = [number, number, number];
export const INK = "#1b1410";

export const BED_X = 0;
export const DOOR_X = 9;
export const PARLOUR_X = 18;
export const CHURCH_X = 27;
export const STAGE_X = 37;
export const OFFICE_X = 48;
export const SHOP_X = 58;
export const YARD_X = 68;
export const CAFE_X = 78;
export const DANFO_X = 88;
export const BANK_X = 98;

// A box with a comic-book ink outline (a slightly larger black shell seen from inside).
export const Box = ({ size, position, color, glow = 0 }: { size: V3; position: V3; color: string; glow?: number }) => (
  <group position={position}>
    <mesh castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={glow} roughness={0.9} />
    </mesh>
    <mesh>
      <boxGeometry args={[size[0] + 0.07, size[1] + 0.07, size[2] + 0.07]} />
      <meshBasicMaterial color={INK} side={1 /* BackSide */} />
    </mesh>
  </group>
);

const Bedroom = () => (
  <group position={[BED_X, 0, 0]}>
    <Box size={[5, 0.1, 4.4]} position={[0, 0.05, -0.3]} color="#b9794a" />
    <Box size={[5, 7, 0.2]} position={[0, 3.5, -2.5]} color="#f6dfb4" />
    <Box size={[0.2, 7, 4.4]} position={[-2.5, 3.5, -0.3]} color="#efd2a0" />
    <Box size={[1.3, 1.3, 0.08]} position={[1.2, 2.7, -2.38]} color="#9fd4ff" glow={0.6} />
    <Box size={[1.5, 0.12, 0.2]} position={[1.2, 1.98, -2.3]} color="#7a4a2b" />
    <Box size={[1.1, 0.8, 0.05]} position={[-1.2, 3.0, -2.38]} color="#2f4a8f" />
    {/* bed: a character placed inside it shows only their top half, so they read as sitting up */}
    <Box size={[2.3, 0.55, 1.5]} position={[-0.5, 0.38, -0.7]} color="#fff7ea" />
    <Box size={[2.34, 0.2, 0.75]} position={[-0.5, 0.62, -0.3]} color="#e0457b" />
    <Box size={[0.2, 1.2, 1.6]} position={[-1.75, 0.6, -0.7]} color="#7a4a2b" />
    <Box size={[0.55, 0.18, 0.8]} position={[-1.35, 0.72, -0.9]} color="#ffffff" />
    <Box size={[0.5, 0.04, 0.32]} position={[-0.3, 0.76, -0.2]} color="#c9ced6" />
    <Box size={[0.5, 0.3, 0.04]} position={[-0.3, 0.9, -0.04]} color="#3b4252" />
    <Box size={[0.9, 0.02, 1.4]} position={[1.3, 0.11, 0.4]} color="#2f8f6b" />
  </group>
);

const Door = ({ car }: { car: boolean }) => (
  <group position={[DOOR_X, 0, 0]}>
    {car && (
      // a shiny visitor's car parked in the compound
      <group position={[-2.3, 0, 1.2]}>
        <Box size={[2.6, 0.6, 1.2]} position={[0, 0.5, 0]} color="#c9ced6" />
        <Box size={[1.4, 0.5, 1.1]} position={[0.1, 1.05, 0]} color="#9fd4ff" />
        <Box size={[0.5, 0.5, 1.25]} position={[-0.8, 0.25, 0]} color="#1b1410" />
        <Box size={[0.5, 0.5, 1.25]} position={[0.8, 0.25, 0]} color="#1b1410" />
      </group>
    )}
    <Box size={[5.4, 4.4, 0.3]} position={[0, 2.2, -1.4]} color="#f2c7a0" />
    <Box size={[6, 0.25, 1.2]} position={[0, 4.5, -1.1]} color="#8f3b2e" />
    <Box size={[1.15, 2.3, 0.12]} position={[0.5, 1.15, -1.2]} color="#2f6f8f" />
    <Box size={[0.12, 0.12, 0.1]} position={[0.1, 1.15, -1.1]} color="#ffd23f" />
    <Box size={[1.0, 0.9, 0.1]} position={[-1.6, 1.9, -1.22]} color="#9fd4ff" glow={0.3} />
    <Box size={[1.6, 0.12, 0.8]} position={[0.5, 0.06, -0.7]} color="#c9a37a" />
    <Box size={[0.5, 0.55, 0.5]} position={[1.9, 0.28, -0.5]} color="#2f8f6b" />
  </group>
);

const Parlour = ({ food }: { food: boolean }) => (
  <group position={[PARLOUR_X, 0, 0]}>
    <Box size={[6.4, 0.1, 4.6]} position={[0, 0.05, -0.3]} color="#d9c7a6" />
    <Box size={[6.4, 7, 0.2]} position={[0, 3.5, -2.6]} color="#bfe3d0" />
    {/* sofa */}
    <Box size={[2.2, 0.5, 0.9]} position={[-1.6, 0.36, -1.7]} color="#8f3b2e" />
    <Box size={[2.2, 1.0, 0.25]} position={[-1.6, 0.85, -2.2]} color="#7a2f25" />
    {/* TV and family photo */}
    <Box size={[1.5, 0.9, 0.08]} position={[1.1, 2.9, -2.48]} color="#20242c" />
    <Box size={[0.7, 0.9, 0.06]} position={[-1.5, 3.1, -2.48]} color="#ffd23f" />
    <Box size={[0.5, 0.7, 0.07]} position={[-1.5, 3.1, -2.46]} color="#f6dfb4" />
    {/* centre table */}
    <Box size={[1.5, 0.45, 0.8]} position={[0.3, 0.3, 1.0]} color="#7a4a2b" />
    {food && (
      <>
        <Box size={[0.7, 0.05, 0.5]} position={[0.3, 0.56, 1.0]} color="#ffffff" />
        <Box size={[0.42, 0.16, 0.34]} position={[0.2, 0.67, 1.0]} color="#e8862e" />
        <Box size={[0.14, 0.12, 0.14]} position={[0.52, 0.65, 0.92]} color="#6b3a22" />
        <Box size={[0.14, 0.12, 0.14]} position={[0.52, 0.65, 1.12]} color="#6b3a22" />
      </>
    )}
  </group>
);

const Church = () => (
  <group position={[CHURCH_X, 0, 0]}>
    <Box size={[7, 0.1, 7]} position={[0, 0.05, 0]} color="#c9a37a" />
    <Box size={[7, 8, 0.2]} position={[0, 4, -3.1]} color="#fbf0d8" />
    <Box size={[1.2, 2.6, 0.08]} position={[0.6, 3.6, -2.98]} color="#ffe08a" glow={0.7} />
    {/* cross */}
    <Box size={[0.18, 1.5, 0.1]} position={[-1.5, 3.5, -2.96]} color="#7a4a2b" />
    <Box size={[0.9, 0.18, 0.1]} position={[-1.5, 3.8, -2.95]} color="#7a4a2b" />
    {/* pulpit: a character placed just behind it is hidden from the waist down */}
    <Box size={[1.0, 1.15, 0.5]} position={[0.6, 0.6, -1.5]} color="#8f3b2e" />
    {/* pews */}
    <Box size={[4.6, 0.95, 0.35]} position={[0, 0.5, 0.7]} color="#7a4a2b" />
    <Box size={[4.6, 0.95, 0.35]} position={[0, 0.5, 2.0]} color="#7a4a2b" />
  </group>
);

// Simple 3D crowd member: body + head, ink outlined.
const Person = ({ at, color }: { at: V3; color: string }) => (
  <group position={at}>
    <Box size={[0.42, 0.8, 0.3]} position={[0, 0.4, 0]} color={color} />
    <Box size={[0.32, 0.34, 0.3]} position={[0, 0.98, 0]} color="#a8724c" />
  </group>
);
const CROWD_COLORS = ["#d6336c", "#2f8f6b", "#ffd23f", "#2f4a8f", "#f07c1e", "#7fd0ff", "#ffffff", "#6f2dbd"];

// Launch party: canopy, stage, big screen, DJ booth and a crowd facing the stage.
const Stage = ({ screen }: { screen: string }) => (
  <group position={[STAGE_X, 0, 0]}>
    <Box size={[6, 0.5, 2.6]} position={[0, 0.25, -1.4]} color="#3b3b46" />
    <Box size={[3.2, 1.9, 0.12]} position={[0, 2.4, -2.6]} color={screen} glow={0.8} />
    {/* striped canopy */}
    {[-2.5, -1.5, -0.5, 0.5, 1.5, 2.5].map((x, i) => (
      <Box key={x} size={[1, 0.15, 3.4]} position={[x, 4.0, -1.2]} color={i % 2 ? "#ffffff" : "#d62f2f"} />
    ))}
    <Box size={[0.12, 3.8, 0.12]} position={[-2.9, 1.9, 0.4]} color="#c9ced6" />
    <Box size={[0.12, 3.8, 0.12]} position={[2.9, 1.9, 0.4]} color="#c9ced6" />
    {/* DJ booth and speakers */}
    <Box size={[1.2, 0.8, 0.6]} position={[2.1, 0.9, -1.6]} color="#20242c" />
    <Box size={[0.6, 1.3, 0.5]} position={[-2.6, 1.15, -1.8]} color="#20242c" />
    <Box size={[0.6, 1.3, 0.5]} position={[2.9, 1.15, -2.3]} color="#20242c" />
    {/* small chops table */}
    <Box size={[1.4, 0.7, 0.6]} position={[-3.9, 0.35, 0.6]} color="#ffffff" />
    {/* crowd */}
    {[0, 1, 2].flatMap((row) =>
      [-2.4, -1.4, -0.4, 0.6, 1.6, 2.6].map((x, i) => (
        <Person key={`${row}-${x}`} at={[x + row * 0.3, 0, 1.4 + row * 0.9]} color={CROWD_COLORS[(i + row * 3) % 8]} />
      )),
    )}
  </group>
);

// Big Man's office: desk, leather chair, city window.
const Office = () => (
  <group position={[OFFICE_X, 0, 0]}>
    <Box size={[5, 0.1, 4.4]} position={[0, 0.05, -0.3]} color="#6b3a22" />
    <Box size={[5, 7, 0.2]} position={[0, 3.5, -2.5]} color="#2b3a55" />
    <Box size={[2.6, 1.6, 0.08]} position={[0, 2.8, -2.38]} color="#ffb46b" glow={0.5} />
    {[-0.8, 0, 0.8].map((x) => (
      <Box key={x} size={[0.35, 1.0 + Math.abs(x), 0.05]} position={[x, 2.2 + Math.abs(x) / 2, -2.33]} color="#1c2438" />
    ))}
    <Box size={[0.9, 1.8, 0.3]} position={[0, 0.9, -1.4]} color="#3a1f14" />
    <Box size={[2.6, 0.9, 0.9]} position={[0, 0.45, 0.2]} color="#7a4a2b" />
    <Box size={[0.4, 0.3, 0.08]} position={[0.8, 1.05, 0.1]} color="#ffd23f" />
  </group>
);

// Iya Bose's provision store: counter, packed shelves, awning, signboard.
const SHOP_COLORS = ["#d62f2f", "#ffd23f", "#2f8f6b", "#2f4a8f", "#f07c1e", "#ffffff"];
const Shop = () => (
  <group position={[SHOP_X, 0, 0]}>
    <Box size={[5.6, 4.4, 0.3]} position={[0, 2.2, -2.2]} color="#f6e7c4" />
    <Box size={[6.2, 0.2, 1.8]} position={[0, 3.3, -1.1]} color="#2f8f6b" />
    <Box size={[3.4, 0.7, 0.12]} position={[0, 3.85, -0.3]} color="#ffd23f" />
    {[0.9, 1.6, 2.3].map((y) =>
      [-1.9, -1.4, -0.9, -0.4, 0.1, 0.6, 1.1, 1.6].map((x, i) => (
        <Box key={`${y}-${x}`} size={[0.38, 0.45, 0.3]} position={[x, y, -1.85]} color={SHOP_COLORS[(i + y * 10) % 6]} />
      )),
    )}
    <Box size={[3.6, 1.0, 0.7]} position={[0, 0.5, -0.4]} color="#7a4a2b" />
    <Box size={[0.5, 0.6, 0.5]} position={[2.4, 0.3, 0.2]} color="#ffffff" />
  </group>
);

// Back yard: generator, jerrycan, clothesline, water drum.
const Yard = () => (
  <group position={[YARD_X, 0, 0]}>
    <Box size={[6, 3.0, 0.3]} position={[0, 1.5, -2.2]} color="#c98f63" />
    <Box size={[1.1, 0.75, 0.7]} position={[-0.6, 0.38, -0.6]} color="#d62f2f" />
    <Box size={[0.9, 0.12, 0.5]} position={[-0.6, 0.82, -0.6]} color="#20242c" />
    <Box size={[0.4, 0.55, 0.25]} position={[0.5, 0.28, -0.3]} color="#ffd23f" />
    <Box size={[0.7, 1.0, 0.7]} position={[2.1, 0.5, -1.2]} color="#2f4a8f" />
    <Box size={[5, 0.04, 0.04]} position={[0, 2.4, -1.5]} color="#ffffff" />
    {[-1.6, -0.6, 0.6].map((x, i) => (
      <Box key={x} size={[0.6, 0.7, 0.03]} position={[x, 2.0, -1.5]} color={SHOP_COLORS[i + 1]} />
    ))}
  </group>
);

// Cyber cafe: a row of old monitors on a long desk, plastic chairs, banner.
const Cafe = () => (
  <group position={[CAFE_X, 0, 0]}>
    <Box size={[6, 0.1, 4.4]} position={[0, 0.05, -0.3]} color="#9aa3ad" />
    <Box size={[6, 7, 0.2]} position={[0, 3.5, -2.5]} color="#cfe8f5" />
    <Box size={[3.4, 0.6, 0.06]} position={[0, 3.2, -2.36]} color="#2f4a8f" />
    <Box size={[5, 0.12, 0.9]} position={[0, 0.9, -1.6]} color="#7a4a2b" />
    {[-1.8, -0.6, 0.6, 1.8].map((x) => (
      <group key={x}>
        <Box size={[0.7, 0.55, 0.45]} position={[x, 1.25, -1.75]} color="#d9d4c4" />
        <Box size={[0.55, 0.42, 0.04]} position={[x, 1.27, -1.51]} color="#7fd0ff" glow={0.6} />
        <Box size={[0.5, 0.45, 0.5]} position={[x, 0.45, -0.7]} color="#d62f2f" />
      </group>
    ))}
  </group>
);

// Inside a yellow danfo bus: benches, windows with the bridge outside.
const Danfo = () => (
  <group position={[DANFO_X, 0, 0]}>
    <Box size={[6, 0.1, 3.6]} position={[0, 0.05, -0.3]} color="#4a4a52" />
    <Box size={[6, 3.0, 0.15]} position={[0, 1.5, -2.1]} color="#ffc61a" />
    <Box size={[6, 0.15, 0.2]} position={[0, 1.1, -2.0]} color="#1b1410" />
    {[-2.0, -0.6, 0.8, 2.2].map((x) => (
      <Box key={x} size={[1.1, 0.8, 0.06]} position={[x, 1.85, -2.0]} color="#9fd4ff" glow={0.5} />
    ))}
    <Box size={[6, 0.15, 3.6]} position={[0, 3.0, -0.3]} color="#e8b40f" />
    {/* benches: people standing behind one read as seated */}
    <Box size={[5.4, 0.85, 0.5]} position={[0, 0.43, 0.6]} color="#7a2f25" />
    <Box size={[5.4, 0.5, 0.45]} position={[0, 0.25, -1.1]} color="#7a2f25" />
  </group>
);

// Bank hall: counter with glass, an ATM by the door, a queue rope.
const Bank = () => (
  <group position={[BANK_X, 0, 0]}>
    <Box size={[7, 0.1, 4.6]} position={[0, 0.05, -0.3]} color="#e6e1d6" />
    <Box size={[7, 7, 0.2]} position={[0, 3.5, -2.6]} color="#2f6f8f" />
    <Box size={[3.2, 0.5, 0.06]} position={[-0.8, 3.3, -2.46]} color="#ffd23f" />
    <Box size={[3.6, 1.1, 0.6]} position={[-1.0, 0.55, -1.8]} color="#c9ced6" />
    <Box size={[3.6, 1.0, 0.04]} position={[-1.0, 1.6, -1.55]} color="#bfe3ff" />
    <Box size={[0.9, 1.9, 0.6]} position={[2.4, 0.95, -1.8]} color="#3b4252" />
    <Box size={[0.5, 0.4, 0.04]} position={[2.4, 1.35, -1.48]} color="#7fd0ff" glow={0.6} />
    <Box size={[0.06, 0.9, 0.06]} position={[1.2, 0.45, 0.6]} color="#c9a37a" />
    <Box size={[0.06, 0.9, 0.06]} position={[3.4, 0.45, 0.6]} color="#c9a37a" />
    <Box size={[2.2, 0.05, 0.05]} position={[2.3, 0.85, 0.6]} color="#d62f2f" />
  </group>
);

export const Sets = ({ flags }: { flags: string[] }) => (
  <>
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[50, 0, 0]} receiveShadow>
      <planeGeometry args={[220, 40]} />
      <meshStandardMaterial color="#e2b877" roughness={1} />
    </mesh>
    <Bedroom />
    <Door car={flags.includes("car")} />
    <Parlour food={flags.includes("food")} />
    <Church />
    <Stage screen={flags.includes("screen-red") ? "#d62f2f" : "#7fd0ff"} />
    <Office />
    <Shop />
    <Yard />
    <Cafe />
    <Danfo />
    <Bank />
  </>
);

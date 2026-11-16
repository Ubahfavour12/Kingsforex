import { useEffect, useState, type ReactElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { continueRender, delayRender } from "remotion";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export type SvgSpec = { node: ReactElement; w: number; h: number };

// Rasterises SVG React elements into Three.js textures so flat 2D art can
// stand inside the 3D world (must be used inside a ThreeCanvas). Rendering waits until every texture is ready.
export const useSvgTextures = <K extends string>(specs: Record<K, SvgSpec>) => {
  const [textures, setTextures] = useState<Record<K, THREE.Texture> | null>(null);
  const [handle] = useState(() => delayRender("svg textures"));

  useEffect(() => {
    const keys = Object.keys(specs) as K[];
    Promise.all(
      keys.map(
        (key) =>
          new Promise<THREE.Texture>((resolve, reject) => {
            const { node, w, h } = specs[key];
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement("canvas");
              canvas.width = w;
              canvas.height = h;
              canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
              const texture = new THREE.CanvasTexture(canvas);
              texture.colorSpace = THREE.SRGBColorSpace;
              texture.anisotropy = 8;
              resolve(texture);
            };
            img.onerror = () => reject(new Error(`could not rasterise ${key}`));
            img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(renderToStaticMarkup(node));
          }),
      ),
    ).then((list) => {
      setTextures(Object.fromEntries(keys.map((k, i) => [k, list[i]])) as Record<K, THREE.Texture>);
    });
    // specs are static per episode
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ThreeCanvas only redraws when the frame changes, so draw once by hand
  // after the textures arrive, then let Remotion capture the frame.
  const advance = useThree((state) => state.advance);
  useEffect(() => {
    if (!textures) return;
    advance(performance.now());
    continueRender(handle);
  }, [textures, advance, handle]);

  return textures;
};

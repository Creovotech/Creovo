import * as THREE from "three";
import { fontsReady, sansFamily, makeCanvas } from "../signal/bake-utils";

// One long horizontal strip of the service words (white, for in-shader tinting /
// channel-split), tiled with RepeatWrapping so the belt scrolls seamlessly.
export async function bakeWireStrip(words: string[]): Promise<THREE.CanvasTexture> {
  await fontsReady();
  const W = 4096;
  const H = 128;
  const [c, ctx] = makeCanvas(W, H, ""); // transparent background
  ctx.font = `700 70px ${sansFamily()}`;
  ctx.textBaseline = "middle";

  const sep = "    ✳    ";
  const items: string[] = [];
  words.forEach((w) => {
    items.push(w.toUpperCase());
    items.push(sep);
  });

  let natural = 0;
  items.forEach((s) => (natural += ctx.measureText(s).width));
  const scale = W / natural; // fit exactly one cycle → seamless repeat

  ctx.save();
  ctx.scale(scale, 1);
  ctx.fillStyle = "#ffffff";
  let x = 0;
  items.forEach((s) => {
    ctx.fillText(s, x, H / 2);
    x += ctx.measureText(s).width;
  });
  ctx.restore();

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = false;
  tex.needsUpdate = true;
  return tex;
}

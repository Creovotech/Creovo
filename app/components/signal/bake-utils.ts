import * as THREE from "three";

// Shared Canvas2D bake prelude for the section effects, mirroring bakeTextures.ts
// so every section's type is the hero's exact lockup (and can never silently
// fall back to system-ui).

export const COLORS = {
  bone: "#ecebe6",
  boneDim: "#7d7c77",
  ember: "#ff4d2e",
  emberSoft: "#ff7a5c",
  ink: "#08080a",
  indigo: "#5a82ff",
  lock: "#28c840",
};

export function sansFamily(): string {
  if (typeof window === "undefined") return "system-ui, sans-serif";
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue("--font-geist-sans")
    .trim();
  return v ? `${v}, system-ui, sans-serif` : "system-ui, sans-serif";
}

export function monoFamily(): string {
  if (typeof window === "undefined") return "ui-monospace, monospace";
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue("--font-geist-mono")
    .trim();
  return v ? `${v}, ui-monospace, monospace` : "ui-monospace, monospace";
}

/** Await next/font faces so canvas text never falls back to system-ui. */
export async function fontsReady(): Promise<void> {
  if (typeof document !== "undefined" && "fonts" in document) {
    try {
      await (document as Document).fonts.ready;
    } catch {
      /* non-fatal */
    }
  }
}

export function makeCanvas(
  w: number,
  h: number,
  fill = COLORS.ink,
): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d")!;
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fillRect(0, 0, w, h);
  }
  return [c, ctx];
}

export function toTexture(canvas: HTMLCanvasElement): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

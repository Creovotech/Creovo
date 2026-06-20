import * as THREE from "three";

// Every "content frame" in the journey is drawn to an offscreen 2D canvas and
// uploaded as a static CanvasTexture. The corruption shader samples these.
// Canvas2D (vs drei <Text>/troika -> FBO) sidesteps the async glyph-sync bake
// gotcha entirely and is far better for the in-code mockup/stats compositions.

export const BAKE_W = 1920;
export const BAKE_H = 1080;
export const BAKE_ASPECT = BAKE_W / BAKE_H;

const BONE = "#ecebe6";
const BONE_DIM = "#7d7c77";
const EMBER = "#ff4d2e";
const INK = "#08080a";

// next/font generates a hashed family name exposed via this CSS variable.
function sansFamily(): string {
  if (typeof window === "undefined") return "system-ui, sans-serif";
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue("--font-geist-sans")
    .trim();
  return v ? `${v}, system-ui, sans-serif` : "system-ui, sans-serif";
}
function monoFamily(): string {
  if (typeof window === "undefined") return "ui-monospace, monospace";
  const v = getComputedStyle(document.documentElement)
    .getPropertyValue("--font-geist-mono")
    .trim();
  return v ? `${v}, ui-monospace, monospace` : "ui-monospace, monospace";
}

function newCanvas(): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement("canvas");
  c.width = BAKE_W;
  c.height = BAKE_H;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = INK;
  ctx.fillRect(0, 0, BAKE_W, BAKE_H);
  return [c, ctx];
}

function toTexture(canvas: HTMLCanvasElement): THREE.CanvasTexture {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

/** Draw centered, weight-controlled lines; an optional word is tinted ember. */
function drawLines(
  ctx: CanvasRenderingContext2D,
  lines: string[],
  opts: {
    size: number;
    weight?: number;
    tracking?: number;
    family?: string;
    color?: string;
    accent?: string;
    accentColor?: string;
    lineGap?: number;
    cy?: number;
  },
) {
  const {
    size,
    weight = 800,
    tracking = 0,
    family = sansFamily(),
    color = BONE,
    accent,
    accentColor = EMBER,
    lineGap = 1.02,
    cy = BAKE_H / 2,
  } = opts;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `${weight} ${size}px ${family}`;
  (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing =
    `${tracking}px`;

  const lh = size * lineGap;
  const startY = cy - ((lines.length - 1) * lh) / 2;

  lines.forEach((line, i) => {
    const y = startY + i * lh;
    if (accent && line.includes(accent)) {
      // Draw the line with the accent word tinted — measure to keep it centered.
      const before = line.slice(0, line.indexOf(accent));
      const after = line.slice(line.indexOf(accent) + accent.length);
      const wBefore = ctx.measureText(before).width;
      const wAccent = ctx.measureText(accent).width;
      const wAfter = ctx.measureText(after).width;
      const total = wBefore + wAccent + wAfter;
      let x = BAKE_W / 2 - total / 2;
      ctx.textAlign = "left";
      ctx.fillStyle = color;
      ctx.fillText(before, x, y);
      x += wBefore;
      ctx.fillStyle = accentColor;
      ctx.fillText(accent, x, y);
      x += wAccent;
      ctx.fillStyle = color;
      ctx.fillText(after, x, y);
      ctx.textAlign = "center";
    } else {
      ctx.fillStyle = color;
      ctx.fillText(line, BAKE_W / 2, y);
    }
  });
  (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing =
    "0px";
}

function bakeWord(): THREE.CanvasTexture {
  const [c, ctx] = newCanvas();
  drawLines(ctx, ["CREOVO"], { size: 340, weight: 800, tracking: -10 });
  return toTexture(c);
}

function bakeTagline(): THREE.CanvasTexture {
  const [c, ctx] = newCanvas();
  drawLines(ctx, ["WE BUILD SIGNAL", "OUT OF NOISE"], {
    size: 150,
    weight: 700,
    tracking: 6,
    family: monoFamily(),
    color: BONE,
  });
  return toTexture(c);
}

function bakeStatement(): THREE.CanvasTexture {
  const [c, ctx] = newCanvas();
  drawLines(ctx, ["WEBSITES THAT", "REFUSE TO", "BLEND IN"], {
    size: 200,
    weight: 800,
    tracking: -4,
    accent: "BLEND IN",
  });
  return toTexture(c);
}

// Stylized, in-code "flawless client website" — the messy->flawless money shot.
function bakeMockup(): THREE.CanvasTexture {
  const [c, ctx] = newCanvas();
  const x = 360,
    y = 150,
    w = BAKE_W - 720,
    h = BAKE_H - 300,
    r = 28;

  // browser chrome
  ctx.fillStyle = "#141417";
  roundRect(ctx, x, y, w, h, r);
  ctx.fill();
  ctx.fillStyle = "#1c1c20";
  roundRectTop(ctx, x, y, w, 70, r);
  ctx.fill();
  ["#ff5f57", "#febc2e", "#28c840"].forEach((col, i) => {
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.arc(x + 38 + i * 34, y + 35, 9, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.fillStyle = "#2a2a30";
  roundRect(ctx, x + 150, y + 20, w - 300, 32, 16);
  ctx.fill();

  // hero content inside the mockup
  const px = x + 70;
  let cy = y + 180;
  ctx.fillStyle = EMBER;
  ctx.beginPath();
  ctx.arc(px + 8, cy - 8, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = BONE_DIM;
  ctx.font = `600 26px ${monoFamily()}`;
  ctx.fillText("HEARTH & IRON — FENCING & GATES", px + 32, cy);

  cy += 90;
  ctx.fillStyle = BONE;
  ctx.font = `800 96px ${sansFamily()}`;
  ctx.fillText("Built to last.", px, cy);
  cy += 96;
  ctx.fillText("Designed to win work.", px, cy);

  cy += 70;
  ctx.fillStyle = BONE_DIM;
  ctx.font = `400 30px ${sansFamily()}`;
  ctx.fillText("Premium fencing & gates, installed across the county.", px, cy);

  // CTA button
  cy += 60;
  ctx.fillStyle = BONE;
  roundRect(ctx, px, cy, 300, 78, 39);
  ctx.fill();
  ctx.fillStyle = INK;
  ctx.font = `600 30px ${sansFamily()}`;
  ctx.fillText("Get a free quote", px + 46, cy + 50);

  // image blocks on the right
  const gx = x + w - 520;
  const grad = ctx.createLinearGradient(gx, y + 150, gx + 450, y + h - 120);
  grad.addColorStop(0, "#ff7a5c");
  grad.addColorStop(0.5, "#ff4d2e");
  grad.addColorStop(1, "#3a0d06");
  ctx.fillStyle = grad;
  roundRect(ctx, gx, y + 150, 450, h - 300, 24);
  ctx.fill();

  return toTexture(c);
}

function bakeStats(): THREE.CanvasTexture {
  const [c, ctx] = newCanvas();
  const stats = [
    ["+180%", "MORE LEADS"],
    ["2.4s", "LOAD TIME"],
    ["4.9★", "CLIENT RATING"],
  ];
  const colW = BAKE_W / 3;
  stats.forEach(([num, label], i) => {
    const cx = colW * i + colW / 2;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = BONE;
    ctx.font = `800 170px ${sansFamily()}`;
    ctx.fillText(num, cx, BAKE_H / 2 - 30);
    ctx.fillStyle = EMBER;
    ctx.font = `600 38px ${monoFamily()}`;
    (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing =
      "6px";
    ctx.fillText(label, cx, BAKE_H / 2 + 90);
    (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing =
      "0px";
  });
  return toTexture(c);
}

function bakeFinal(): THREE.CanvasTexture {
  const [c, ctx] = newCanvas();
  drawLines(ctx, ["CREOVO"], {
    size: 340,
    weight: 800,
    tracking: -10,
    cy: BAKE_H / 2 - 40,
  });
  ctx.fillStyle = "#28c840";
  ctx.beginPath();
  ctx.arc(BAKE_W / 2 - 150, BAKE_H / 2 + 150, 11, 0, Math.PI * 2);
  ctx.fill();
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillStyle = BONE_DIM;
  ctx.font = `600 34px ${monoFamily()}`;
  (ctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing =
    "8px";
  ctx.fillText("SIGNAL CLEAN // 100%", BAKE_W / 2 - 120, BAKE_H / 2 + 152);
  return toTexture(c);
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function roundRectTop(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x, y + h);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export type BakedFrames = {
  textures: THREE.CanvasTexture[];
  aspect: number;
};

// Frame order defines the scroll journey.
export async function bakeFrames(): Promise<BakedFrames> {
  // Ensure the next/font faces are ready or canvas falls back to system fonts.
  if (typeof document !== "undefined" && "fonts" in document) {
    try {
      await (document as Document).fonts.ready;
    } catch {
      /* non-fatal: fall back to system-ui */
    }
  }
  const textures = [
    bakeWord(), // 0 — hero lockup
    bakeTagline(), // 1 — WE BUILD SIGNAL OUT OF NOISE
    bakeStatement(), // 2 — WEBSITES THAT REFUSE TO BLEND IN
    bakeMockup(), // 3 — the decode money shot
    bakeStats(), // 4 — credibility burst
    bakeFinal(), // 5 — clean lockup (≈ frame 0 for seamless loop)
  ];
  return { textures, aspect: BAKE_ASPECT };
}

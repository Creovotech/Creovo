import { fontsReady, sansFamily, COLORS } from "../signal/bake-utils";

// Samples a Canvas2D rendering of text/shapes into an array of target points,
// normalized to clip-ish space (x in [-aspect, aspect], y in [-1, 1]). Used by
// the particle sections to morph points INTO words — no FBO, the target is just
// a Float32 attribute.

export type PointCloud = {
  positions: Float32Array; // xy per point, length count*2
  count: number;
  aspect: number;
};

type SampleOpts = {
  text: string;
  count: number;
  weight?: number;
  font?: string;
  /** canvas width in px; height derived from aspect target. */
  width?: number;
  height?: number;
};

// Sample `count` points biased to the opaque (stroke) pixels of rendered text.
export function sampleText({
  text,
  count,
  weight = 800,
  font,
  width = 1024,
  height = 320,
}: SampleOpts): PointCloud {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Fit the font size so the text spans ~88% of the width.
  let size = height * 0.7;
  ctx.font = `${weight} ${size}px ${font ?? sansFamily()}`;
  const target = width * 0.88;
  const measured = ctx.measureText(text).width;
  if (measured > 0) size *= target / measured;
  ctx.font = `${weight} ${size}px ${font ?? sansFamily()}`;
  ctx.fillText(text, width / 2, height / 2);

  const data = ctx.getImageData(0, 0, width, height).data;
  // Collect opaque pixels, then sample `count` of them with jitter.
  const opaque: number[] = [];
  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x += 2) {
      if (data[(y * width + x) * 4 + 3] > 128) opaque.push(x, y);
    }
  }
  const aspect = width / height;
  const positions = new Float32Array(count * 2);
  const pairs = opaque.length / 2;
  for (let i = 0; i < count; i++) {
    let px: number, py: number;
    if (pairs > 0) {
      const k = (Math.floor(Math.random() * pairs) % pairs) * 2;
      px = opaque[k] + (Math.random() - 0.5) * 2;
      py = opaque[k + 1] + (Math.random() - 0.5) * 2;
    } else {
      px = Math.random() * width;
      py = Math.random() * height;
    }
    // → x in [-aspect, aspect], y in [-1, 1] (flip y for GL up)
    positions[i * 2] = (px / width - 0.5) * 2 * aspect;
    positions[i * 2 + 1] = -(py / height - 0.5) * 2;
  }
  return { positions, count, aspect };
}

// A scattered "static" cloud the same size as a glyph cloud (signal noise).
export function scatterCloud(count: number, spread = 2.4): Float32Array {
  const a = new Float32Array(count * 2);
  for (let i = 0; i < count; i++) {
    a[i * 2] = (Math.random() - 0.5) * spread * 2;
    a[i * 2 + 1] = (Math.random() - 0.5) * spread;
  }
  return a;
}

export { fontsReady, COLORS };

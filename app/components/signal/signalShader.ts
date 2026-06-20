// SIGNAL // DECODE — the entire visual engine is this one fragment shader.
// It treats two baked content textures (current beat + next beat) as a video
// signal being tuned in real time, and corrupts/decodes between them based on
// scroll. Cost scales with pixels, not geometry — there is no geometry but a
// single fullscreen triangle.

export const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    // ScreenQuad-style fullscreen triangle: positions are already in clip space.
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform sampler2D uTexA;   // current beat content
  uniform sampler2D uTexB;   // next beat content (what we decode INTO)
  uniform float uMix;        // 0..1 left-to-right decode wipe A -> B
  uniform float uMosh;       // 0..1+ corruption intensity (transition + scroll velocity)
  uniform float uTime;
  uniform float uZoom;       // arrival punch-through (1 = none)
  uniform vec2  uRes;        // screen resolution in px
  uniform float uTexAspect;  // baked texture aspect (w/h)

  // --- hash / value noise -------------------------------------------------
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  // Inigo Quilez cosine palette — ember -> indigo for the corruption glow.
  vec3 palette(float t) {
    vec3 a = vec3(0.55, 0.40, 0.45);
    vec3 b = vec3(0.45, 0.30, 0.45);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.00, 0.15, 0.55);
    return a + b * cos(6.28318 * (c * t + d));
  }

  // Map screen uv -> baked-texture uv with "contain" aspect (centered on black).
  vec2 fitUv(vec2 uv) {
    float sa = uRes.x / uRes.y;
    vec2 m = uv;
    if (sa > uTexAspect) {
      m.x = (uv.x - 0.5) * (sa / uTexAspect) + 0.5;
    } else {
      m.y = (uv.y - 0.5) * (uTexAspect / sa) + 0.5;
    }
    return m;
  }

  vec3 sampleContent(sampler2D tex, vec2 uv) {
    // Out-of-frame samples read as black void.
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return vec3(0.0);
    return texture2D(tex, uv).rgb;
  }

  void main() {
    // Arrival punch-through: scale uv around centre.
    vec2 uv = (vUv - 0.5) / uZoom + 0.5;

    // 12fps-stepped time during corruption -> digital stutter, smooth at rest.
    float t12 = floor(uTime * 12.0) / 12.0;
    float tt = mix(uTime, t12, clamp(uMosh, 0.0, 1.0));

    // --- decode wipe: jittered left-to-right seam selecting A vs B ----------
    float seam = uMix + (noise(vec2(uv.y * 9.0, tt * 0.7)) - 0.5) * 0.05;
    float resolved = step(uv.x, seam);            // 1 = show B (decoded)
    float seamDist = abs(uv.x - seam);
    float seamHeat = smoothstep(0.14, 0.0, seamDist) * uMix * (1.0 - uMix) * 4.0;

    float mosh = clamp(uMosh + seamHeat, 0.0, 1.6);

    // --- block glitch: jump UV of random blocks --------------------------
    vec2 guv = uv;
    vec2 block = floor(uv * vec2(38.0, 96.0));
    float bh = hash(block + floor(tt * 12.0));
    if (bh > 1.0 - 0.20 * mosh) {
      guv.x += (hash(block.yx + tt) - 0.5) * 0.18 * mosh;
    }
    // horizontal slice tear
    float slice = hash(vec2(floor(uv.y * 44.0), floor(tt * 10.0)));
    guv.x += (slice - 0.5) * 0.10 * mosh * step(0.72, slice);

    vec2 fa = fitUv(guv);

    // --- RGB channel desync ------------------------------------------------
    float ab = (0.004 + 0.022 * mosh) * (0.5 + noise(vec2(uv.y * 70.0, tt)));
    vec2 du = vec2(ab, 0.0);

    vec3 ca = vec3(
      sampleContent(uTexA, fa + du).r,
      sampleContent(uTexA, fa).g,
      sampleContent(uTexA, fa - du).b
    );
    vec3 cb = vec3(
      sampleContent(uTexB, fa + du).r,
      sampleContent(uTexB, fa).g,
      sampleContent(uTexB, fa - du).b
    );
    vec3 col = mix(ca, cb, resolved);

    // --- scanlines + refresh bar ------------------------------------------
    col *= 0.86 + 0.14 * sin(uv.y * uRes.y * 1.1 + tt * 9.0);
    float bar = fract(uv.y - uTime * 0.10);
    col += smoothstep(0.0, 0.015, bar) * smoothstep(0.05, 0.03, bar) * 0.05;

    // hot decode seam glow — ember for most of the journey, shifting to indigo
    // only in the final stretch of a transition (on-brand: ember is the accent).
    vec3 hot = mix(vec3(1.0, 0.36, 0.16), vec3(0.42, 0.5, 1.0),
                   smoothstep(0.62, 1.0, uMix));
    col += hot * seamHeat * 1.05;

    // residual idle shimmer so a paused frame never looks like a dead PNG
    col += vec3(1.0, 0.4, 0.2) * noise(vec2(uv.y * 200.0, tt * 4.0)) * 0.012;

    // blue-noise dither to kill 8-bit banding on the near-black void
    col += (hash(uv * uRes + tt) - 0.5) / 255.0;

    gl_FragColor = vec4(col, 1.0);
  }
`;

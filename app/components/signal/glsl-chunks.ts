// Shared GLSL the hero and every section #include, so all turbulence and color
// come from literally the same field — the backbone of the site's cohesion.

// hash + value noise — identical to the hero's signalShader.ts.
export const NOISE = /* glsl */ `
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
`;

// Inigo Quilez cosine palette — the ONLY color ramp any section uses for its
// hot/decode glow. ember (t≈0) → indigo (t≈1).
export const PALETTE = /* glsl */ `
  vec3 palette(float t) {
    vec3 a = vec3(0.55, 0.40, 0.45);
    vec3 b = vec3(0.45, 0.30, 0.45);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.00, 0.15, 0.55);
    return a + b * cos(6.28318 * (c * t + d));
  }
`;

// 2D curl of the value-noise field — divergence-free flow for the particle
// sections (manifesto comb, process relay, contact sign-off).
export const CURL = /* glsl */ `
  vec2 curlNoise(vec2 p) {
    float e = 0.1;
    float n1 = noise(p + vec2(0.0, e));
    float n2 = noise(p - vec2(0.0, e));
    float n3 = noise(p + vec2(e, 0.0));
    float n4 = noise(p - vec2(e, 0.0));
    return vec2((n1 - n2), -(n3 - n4)) / (2.0 * e);
  }
`;

// The site's two-speed time law: 12fps stutter while `corruption` is high,
// smooth at rest. Pass uTime + a 0..1 corruption value.
export const STEPPED_TIME = /* glsl */ `
  float steppedTime(float t, float corruption) {
    return mix(t, floor(t * 12.0) / 12.0, clamp(corruption, 0.0, 1.0));
  }
`;

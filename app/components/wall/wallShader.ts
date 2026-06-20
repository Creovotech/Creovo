import { NOISE } from "../signal/glsl-chunks";

export const wallVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// One fullscreen-triangle fragment routes 4 card rectangles to 4 DIFFERENT
// procedural "channels", so the whole work grid is one GL context, not four.
export const wallFragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform vec4 uRects[4];   // x,y,w,h in uv space (y-down)
  uniform float uHover[4];  // 0..1 tune per card
  uniform vec3 uTint[4];
  uniform float uTime;
  uniform float uVel;

  ${NOISE}

  // 1 — flowing signal lines
  float chFlow(vec2 p, float t) {
    float v = 0.0;
    for (int k = 0; k < 4; k++) {
      float fk = float(k);
      float y = p.y * 5.0 + sin(p.x * 6.2831 + t * 1.5 + fk * 1.7) * 0.4 + fk;
      v += smoothstep(0.06, 0.0, abs(fract(y) - 0.5));
    }
    return v * 0.4;
  }
  // 2 — marbled ink (domain warp)
  float chInk(vec2 p, float t) {
    vec2 q = vec2(noise(p * 3.0 + t * 0.15), noise(p * 3.0 + vec2(7.3) - t * 0.12));
    float n = noise(p * 4.0 + q * 2.5 + t * 0.1);
    return smoothstep(0.35, 0.85, n);
  }
  // 3 — constellation
  float chStars(vec2 p, float t) {
    vec2 sp = p * vec2(10.0, 8.0);
    vec2 id = floor(sp);
    vec2 g = fract(sp) - 0.5;
    float r = hash(id);
    float tw = 0.5 + 0.5 * sin(t * 2.0 + r * 40.0);
    return step(0.82, hash(id + 3.1)) * smoothstep(0.16, 0.0, length(g)) * tw;
  }
  // 4 — wireframe + sweep
  float chWire(vec2 p, float t) {
    vec2 g = abs(fract(p * vec2(7.0, 5.0)) - 0.5);
    float grid = smoothstep(0.07, 0.0, min(g.x, g.y));
    float sweep = smoothstep(0.08, 0.0, abs(p.y - fract(t * 0.25)));
    return grid * 0.35 + sweep * 0.9;
  }

  void main() {
    vec2 uv = vec2(vUv.x, 1.0 - vUv.y); // y-down to match DOM rects
    vec3 col = vec3(0.0);
    float alpha = 0.0;
    for (int i = 0; i < 4; i++) {
      vec4 r = uRects[i];
      if (r.z > 0.0 && uv.x >= r.x && uv.x <= r.x + r.z && uv.y >= r.y && uv.y <= r.y + r.w) {
        vec2 lp = (uv - r.xy) / r.zw;
        float inten = 0.0;
        if (i == 0) inten = chFlow(lp, uTime);
        else if (i == 1) inten = chInk(lp, uTime);
        else if (i == 2) inten = chStars(lp, uTime);
        else inten = chWire(lp, uTime);

        inten += uVel * 0.15 * hash(lp + uTime); // interference while scrolling
        vec3 base = uTint[i] * 0.16;
        vec3 c = base + uTint[i] * inten * mix(0.35, 1.35, uHover[i]);

        vec2 e = abs(lp - 0.5);
        float m = 1.0 - smoothstep(0.46, 0.5, max(e.x, e.y)); // rounded edge fade
        col = c * m;
        alpha = m; // transparent in the gaps so the page shows through
      }
    }
    gl_FragColor = vec4(col, alpha);
  }
`;

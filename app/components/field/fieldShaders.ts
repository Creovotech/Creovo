import { NOISE, CURL, PALETTE } from "../signal/glsl-chunks";

// Flow-field "comb": particles drift horizontally and, as uOrder rises, snap
// from curl-noise chaos (indigo) into quantized horizontal signal-lanes (ember).
// Stateless — position is a pure function of (home, seed, time, order), so no
// FBO and no NaN risk.
export const fieldVertex = /* glsl */ `
  attribute float aSeed;
  uniform float uOrder;
  uniform float uTime;
  uniform float uFit;
  uniform float uSize;
  uniform vec2  uPointer;

  varying vec3 vColor;
  varying float vAlpha;

  ${NOISE}
  ${CURL}
  ${PALETTE}

  const float LANES = 11.0;

  void main() {
    vec2 home = position.xy;

    // drift right and wrap, speed varies per particle
    float speed = 0.04 + aSeed * 0.10;
    float x = mod(home.x + uTime * speed + 1.5, 3.0) - 1.5;

    // pointer locally re-noises order (a healing eddy)
    vec2 cur = vec2(x, home.y);
    float local = uOrder * (1.0 - smoothstep(0.55, 0.0, distance(cur, uPointer)) * 0.92);

    // chaos vs lane
    float chaos = curlNoise(vec2(x, home.y) * 1.6 + uTime * 0.2).y * 0.55;
    float laneY = floor(home.y * (LANES * 0.5) + 0.5) / (LANES * 0.5);
    float y = mix(home.y + chaos, laneY, local);

    gl_Position = vec4(vec2(x, y) * uFit, 0.0, 1.0);

    vColor = palette(mix(0.6, 0.04, local));        // indigo chaos -> ember order
    vColor += vec3(0.45) * smoothstep(0.82, 1.0, local); // hot crest when fully locked
    vAlpha = mix(0.1, 0.5, local);                  // lanes read by density
    gl_PointSize = uSize;
  }
`;

export const fieldFragment = /* glsl */ `
  precision highp float;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, a * vAlpha);
  }
`;

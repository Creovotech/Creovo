import { NOISE, CURL, PALETTE } from "../signal/glsl-chunks";

// 3D point-stream flowing down a corridor toward the camera. Real perspective
// transform (unlike the clip-space section points), so it has true depth.
export const relayVertex = /* glsl */ `
  attribute float aSeed;
  uniform float uTime;
  uniform float uTurb;
  uniform float uSize;

  varying vec3 vColor;
  varying float vAlpha;

  ${NOISE}
  ${CURL}
  ${PALETTE}

  const float CORRIDOR = 44.0;

  void main() {
    vec3 home = position;
    float speed = 7.0;
    // flow toward +z (the camera) and wrap
    float z = mod(home.z + uTime * speed, CORRIDOR + 12.0) - CORRIDOR;

    vec2 c = curlNoise(home.xy * 0.5 + z * 0.08 + uTime * 0.2) * uTurb;
    vec3 wp = vec3(home.x + c.x, home.y + c.y, z);

    vec4 mv = modelViewMatrix * vec4(wp, 1.0);
    gl_Position = projectionMatrix * mv;

    float depth = clamp(-z / CORRIDOR, 0.0, 1.0); // 0 near, 1 far
    vColor = palette(mix(0.04, 0.62, depth));      // ember near → indigo far
    vAlpha = mix(0.95, 0.12, depth);
    gl_PointSize = clamp(uSize * 26.0 / max(0.1, -mv.z), 1.0, 7.0);
  }
`;

export const relayFragment = /* glsl */ `
  precision highp float;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, a * vAlpha);
  }
`;

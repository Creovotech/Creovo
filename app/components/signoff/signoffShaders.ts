import { NOISE, CURL, PALETTE } from "../signal/glsl-chunks";

// Analytic point morph (no FBO): position is computed each frame from scatter +
// target attributes + curl turbulence, written straight to clip space (with
// canvas-aspect correction) so there is no camera to fit.
export const signoffVertex = /* glsl */ `
  attribute vec2 aCreovo;
  attribute vec2 aEmail;
  attribute float aSeed;

  uniform float uReveal;   // scatter -> word
  uniform float uMorph;    // CREOVO -> email
  uniform float uTurbulence;
  uniform float uScatter;  // pointer jam
  uniform vec2  uPointer;  // field-space pointer
  uniform float uTime;
  uniform float uFit;
  uniform float uCanvasAspect;
  uniform float uSize;

  varying vec3 vColor;
  varying float vAlpha;

  ${NOISE}
  ${CURL}
  ${PALETTE}

  void main() {
    vec2 scatter = position.xy;
    vec2 word = mix(aCreovo, aEmail, uMorph);
    vec2 p = mix(scatter, word, uReveal);

    // living curl drift + a burst of turbulence on fast arrival / morph
    float turb = uTurbulence + 0.012;
    p += curlNoise(p * 1.4 + uTime * 0.15 + aSeed * 6.2831) * turb;

    // pointer jam: push points away from the cursor when held
    vec2 d = p - uPointer;
    float dist = length(d);
    p += normalize(d + 0.0001) * uScatter * smoothstep(0.7, 0.0, dist) * 0.6;

    // field -> clip space, aspect-corrected so type never stretches
    vec2 clip = p * uFit;
    clip.x /= uCanvasAspect;
    gl_Position = vec4(clip, 0.0, 1.0);

    float hot = clamp(uTurbulence * 2.0 + uScatter, 0.0, 1.0);
    vColor = mix(vec3(0.93, 0.92, 0.88), palette(0.02), hot); // bone at rest, ember when hot
    vAlpha = mix(0.85, 0.5, hot);
    gl_PointSize = uSize * (0.6 + 0.8 * aSeed);
  }
`;

export const signoffFragment = /* glsl */ `
  precision highp float;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(vColor, a * vAlpha);
  }
`;

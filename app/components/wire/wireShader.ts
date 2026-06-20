export const wireVertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// A curved broadcast "wire": the strip is bowed via a UV parabola (reads as 3D
// curvature) and scrolled; scroll velocity smears it into RGB-split ghosting.
export const wireFragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform sampler2D uStrip;
  uniform float uOffset;
  uniform float uRepeat;
  uniform float uVel;
  uniform float uTime;

  void main() {
    vec2 uv = vUv;

    // bow the wire: ends dip + squeeze (fake perspective curvature)
    float bow = (uv.x - 0.5) * (uv.x - 0.5);
    float ty = (uv.y - 0.5) * (1.0 + bow * 1.3) + bow * 0.55 - 0.08;
    float vY = ty + 0.5;
    if (vY < 0.0 || vY > 1.0) {
      gl_FragColor = vec4(0.0);
      return;
    }

    float u = uv.x * uRepeat - uOffset;
    float ab = 0.004 + uVel * 0.03;             // channel-split grows with velocity

    float aR = texture2D(uStrip, vec2(u + ab, vY)).a;
    float aG = texture2D(uStrip, vec2(u, vY)).a;
    float aB = texture2D(uStrip, vec2(u - ab, vY)).a;

    vec3 bone = vec3(0.93, 0.92, 0.88);
    vec3 col = bone * vec3(aR, aG, aB);
    col += vec3(1.0, 0.30, 0.14) * uVel * aG * 0.6; // ember heat on flick

    float a = max(aR, max(aG, aB));
    float ef = smoothstep(0.0, 0.22, vY) * smoothstep(1.0, 0.78, vY); // edge fade
    gl_FragColor = vec4(col, a * ef);
  }
`;

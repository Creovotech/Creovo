"use client";

import { useMemo, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { vertexShader, fragmentShader } from "./signalShader";
import { signal } from "./signalStore";
import type { BakedFrames } from "./bakeTextures";

// Smoothstep + a tiny easing helper matching the shader's rest/transition feel.
const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

export function SignalPlane({ frames }: { frames: BakedFrames }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const size = useThree((s) => s.size);
  const intro = useRef(1.35); // on-load shatter -> snap

  // Fullscreen triangle covering clip space; uv 0..1 across the screen.
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.BufferAttribute(
        new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]),
        3,
      ),
    );
    g.setAttribute(
      "uv",
      new THREE.BufferAttribute(new Float32Array([0, 0, 2, 0, 0, 2]), 2),
    );
    return g;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTexA: { value: frames.textures[0] },
      uTexB: { value: frames.textures[1] },
      uMix: { value: 0 },
      uMosh: { value: 1.2 },
      uTime: { value: 0 },
      uZoom: { value: 1 },
      uRes: { value: new THREE.Vector2(1, 1) },
      uTexAspect: { value: frames.aspect },
    }),
    [frames],
  );

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const mat = matRef.current;
    if (!mat) return;

    // intro shatter decays away over ~1.3s after mount
    if (intro.current > 0) intro.current = Math.max(0, intro.current - dt / 1.3);

    // --- map bus-owned smooth progress across the baked frames ------------
    const n = frames.textures.length;
    const fi = signal.smooth * (n - 1);
    const idx = Math.min(n - 2, Math.max(0, Math.floor(fi)));
    const frac = fi - idx;

    mat.uniforms.uTexA.value = frames.textures[idx];
    mat.uniforms.uTexB.value = frames.textures[idx + 1];

    // Hold each frame crisp at rest; wipe quickly through the middle.
    mat.uniforms.uMix.value = smoothstep(0.18, 0.82, frac);

    // Corruption peaks mid-transition, plus the scroll-velocity tuning dial,
    // plus the decaying on-load intro shatter.
    const transition = Math.sin(Math.PI * frac);
    const vel = Math.min(1, signal.velocity * 6);
    mat.uniforms.uMosh.value =
      transition * 0.85 + vel * 0.9 + intro.current;

    // Arrival punch-through on the final segment only.
    const arrival = idx === n - 2 ? smoothstep(0.4, 1.0, frac) : 0;
    mat.uniforms.uZoom.value = 1 + arrival * arrival * 1.1;

    mat.uniforms.uTime.value += dt;
    mat.uniforms.uRes.value.set(size.width, size.height);
  });

  return (
    <mesh geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

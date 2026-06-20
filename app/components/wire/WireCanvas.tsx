"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { signal } from "../signal/signalStore";
import { wireVertex, wireFragment } from "./wireShader";
import { bakeWireStrip } from "./wireStrip";

const WORDS = [
  "Brand Identity",
  "Web Design",
  "3D & Motion",
  "Conversion",
  "Local SEO",
  "Next.js Builds",
  "Art Direction",
  "Signal Over Noise",
];

function Wire({ active }: { active: boolean }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const [strip, setStrip] = useState<THREE.CanvasTexture | null>(null);
  const offset = useRef(0);
  const vel = useRef(0);

  useEffect(() => {
    let alive = true;
    bakeWireStrip(WORDS).then((t) => alive && setStrip(t));
    return () => {
      alive = false;
    };
  }, []);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3),
    );
    g.setAttribute("uv", new THREE.BufferAttribute(new Float32Array([0, 0, 2, 0, 0, 2]), 2));
    return g;
  }, []);

  const uniforms = useMemo(
    () => ({
      uStrip: { value: null as THREE.Texture | null },
      uOffset: { value: 0 },
      uRepeat: { value: 0.85 },
      uVel: { value: 0 },
      uTime: { value: 0 },
    }),
    [],
  );

  useFrame((_, delta) => {
    const mat = matRef.current;
    if (!mat || !strip) return;
    const dt = Math.min(delta, 0.05);
    mat.uniforms.uStrip.value = strip;

    // belt drifts forever; scroll velocity adds drive + smear
    const lv = signal.lenisVelocity;
    vel.current += (Math.min(1, Math.abs(lv) * 0.5) - vel.current) * (1 - Math.exp(-dt / 0.15));
    offset.current += dt * (0.03 + Math.sign(lv || 1) * Math.abs(lv) * 0.004);
    mat.uniforms.uOffset.value = offset.current;
    mat.uniforms.uVel.value = vel.current;
    mat.uniforms.uTime.value += dt;
  });

  return (
    <mesh geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        vertexShader={wireVertex}
        fragmentShader={wireFragment}
        uniforms={uniforms}
        transparent
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

export function WireCanvas({ active }: { active: boolean }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Wire active={active} />
    </Canvas>
  );
}

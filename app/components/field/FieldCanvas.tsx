"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { signal } from "../signal/signalStore";
import { fieldVertex, fieldFragment } from "./fieldShaders";

const COUNT = 18000;

function Field({ active }: { active: boolean }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const pointer = useRef(new THREE.Vector2(5, 5));
  const order = useRef(0);

  const { geometry, dpr } = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(COUNT * 3);
    const seed = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 3; // x in [-1.5,1.5]
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2; // y in [-1,1]
      pos[i * 3 + 2] = 0;
      seed[i] = Math.random();
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    return { geometry: g, dpr: Math.min(window.devicePixelRatio || 1, 1.5) };
  }, []);

  const uniforms = useMemo(
    () => ({
      uOrder: { value: 0 },
      uTime: { value: 0 },
      uFit: { value: 1.05 },
      uSize: { value: 2.0 * dpr },
      uPointer: { value: new THREE.Vector2(5, 5) },
    }),
    [dpr],
  );

  useFrame((_, delta) => {
    const mat = matRef.current;
    if (!mat) return;
    const dt = Math.min(delta, 0.05);
    // order breathes, and ramps up while the section is on screen
    const target = active ? 0.72 + 0.28 * Math.sin(mat.uniforms.uTime.value * 0.4) : 0.2;
    order.current += (target - order.current) * (1 - Math.exp(-dt / 0.8));
    mat.uniforms.uOrder.value = order.current;
    mat.uniforms.uTime.value += dt + Math.min(0.04, Math.abs(signal.lenisVelocity) * 0.02);
    mat.uniforms.uPointer.value.copy(pointer.current);
  });

  const onMove = (e: PointerEvent) => {
    const el = e.target as HTMLElement;
    const r = el.getBoundingClientRect();
    pointer.current.set(
      ((e.clientX - r.left) / r.width - 0.5) * 3,
      -((e.clientY - r.top) / r.height - 0.5) * 2,
    );
  };

  return (
    <points
      geometry={geometry}
      frustumCulled={false}
      onPointerMove={(e) => onMove(e.nativeEvent)}
      onPointerLeave={() => pointer.current.set(5, 5)}
    >
      <shaderMaterial
        ref={matRef}
        vertexShader={fieldVertex}
        fragmentShader={fieldFragment}
        uniforms={uniforms}
        transparent
        depthTest={false}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function FieldCanvas({ active }: { active: boolean }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Field active={active} />
    </Canvas>
  );
}

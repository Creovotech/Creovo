"use client";

import { useMemo, useRef } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { signal } from "../signal/signalStore";
import { signoffVertex, signoffFragment } from "./signoffShaders";
import { sampleText, scatterCloud } from "../particles/glyph-points";

const COUNT = 16000;

const sstep = (a: number, b: number, x: number) => {
  const k = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return k * k * (3 - 2 * k);
};

export function SignOff({ active }: { active: boolean }) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const size = useThree((s) => s.size);
  const clock = useRef(0);
  const pointer = useRef(new THREE.Vector2(0, 0));
  const down = useRef(false);
  const scatter = useRef(0);

  const { geometry, dpr } = useMemo(() => {
    const creovo = sampleText({ text: "CREOVO", count: COUNT, width: 1024, height: 300 });
    const email = sampleText({
      text: "hello@creovo.studio",
      count: COUNT,
      width: 1400,
      height: 240,
      weight: 700,
    });
    const scat = scatterCloud(COUNT, 2.6);

    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(COUNT * 3);
    const seed = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = scat[i * 2];
      pos[i * 3 + 1] = scat[i * 2 + 1];
      pos[i * 3 + 2] = 0;
      seed[i] = Math.random();
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aCreovo", new THREE.BufferAttribute(creovo.positions, 2));
    g.setAttribute("aEmail", new THREE.BufferAttribute(email.positions, 2));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    return { geometry: g, dpr: Math.min(window.devicePixelRatio || 1, 1.5) };
  }, []);

  const uniforms = useMemo(
    () => ({
      uReveal: { value: 0 },
      uMorph: { value: 0 },
      uTurbulence: { value: 0 },
      uScatter: { value: 0 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uTime: { value: 0 },
      uFit: { value: 0.62 },
      uCanvasAspect: { value: 1 },
      uSize: { value: 1.9 * dpr },
    }),
    [dpr],
  );

  const onMove = (e: PointerEvent) => {
    const el = e.target as HTMLElement;
    const r = el.getBoundingClientRect();
    const aspect = r.width / r.height;
    // mirror the vertex mapping so the field-space pointer lines up
    const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const ny = -((e.clientY - r.top) / r.height - 0.5) * 2;
    pointer.current.set((nx * aspect) / 0.62, ny / 0.62);
  };
  const onDown = () => (down.current = true);
  const onUp = () => (down.current = false);

  useFrame((_, delta) => {
    const mat = matRef.current;
    if (!mat) return;
    const dt = Math.min(delta, 0.05);
    if (active) clock.current += dt;
    const t = clock.current;

    // timeline: scatter→CREOVO snap, hold, →email stutter, hold
    mat.uniforms.uReveal.value = sstep(0.1, 1.3, t);
    mat.uniforms.uMorph.value = sstep(3.4, 4.6, t);

    // pointer jam
    scatter.current += ((down.current ? 1 : 0) - scatter.current) * (1 - Math.exp(-dt / 0.12));
    mat.uniforms.uScatter.value = scatter.current;
    mat.uniforms.uPointer.value.copy(pointer.current);

    // turbulence from scroll velocity + the morph instant
    const vel = Math.min(1, Math.abs(signal.lenisVelocity) * 0.5);
    const morphHeat = Math.sin(Math.PI * mat.uniforms.uMorph.value);
    mat.uniforms.uTurbulence.value = vel * 0.08 + morphHeat * 0.06 + scatter.current * 0.12;

    mat.uniforms.uTime.value += dt;
    mat.uniforms.uCanvasAspect.value = size.width / size.height;
  });

  return (
    <points
      geometry={geometry}
      frustumCulled={false}
      onPointerMove={(e) => onMove(e.nativeEvent)}
      onPointerDown={onDown}
      onPointerUp={onUp}
      onPointerLeave={onUp}
    >
      <shaderMaterial
        ref={matRef}
        vertexShader={signoffVertex}
        fragmentShader={signoffFragment}
        uniforms={uniforms}
        transparent
        depthTest={false}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

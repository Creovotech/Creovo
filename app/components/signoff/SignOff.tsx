"use client";

import { useMemo, useRef } from "react";
import { useThree, useFrame, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { signal } from "../signal/signalStore";
import { signoffVertex, signoffFragment } from "./signoffShaders";
import { sampleText, scatterCloud } from "../particles/glyph-points";

const COUNT = 16000;

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const sstep = (a: number, b: number, x: number) => {
  const k = clamp01((x - a) / (b - a));
  return k * k * (3 - 2 * k);
};

export function SignOff() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const gl = useThree((s) => s.gl);
  const size = useThree((s) => s.size);
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

  const onMove = (e: ThreeEvent<PointerEvent>) => {
    const r = gl.domElement.getBoundingClientRect();
    const aspect = r.width / r.height;
    const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const ny = -((e.clientY - r.top) / r.height - 0.5) * 2;
    pointer.current.set((nx * aspect) / 0.62, ny / 0.62);
  };
  // Jam only with a real mouse — never hijack a touch-scroll on mobile.
  const onDown = (e: ThreeEvent<PointerEvent>) => {
    if (e.pointerType === "mouse") down.current = true;
  };
  const onUp = () => (down.current = false);

  useFrame((_, delta) => {
    const mat = matRef.current;
    if (!mat) return;
    const dt = Math.min(delta, 0.05);

    // Scroll-scrubbed progress: 0 when the canvas first enters from the bottom,
    // 1 at the page bottom — so the morph plays forward on scroll-down and
    // reverses on scroll-up, and the email lockup settles exactly at the end.
    const rect = gl.domElement.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const scrollY = window.scrollY;
    const enterStart = rect.top + scrollY - vh;
    const maxScroll = document.documentElement.scrollHeight - vh;
    const p = clamp01((scrollY - enterStart) / Math.max(1, maxScroll - enterStart));

    mat.uniforms.uReveal.value = sstep(0.0, 0.45, p); // scatter → CREOVO
    mat.uniforms.uMorph.value = sstep(0.5, 1.0, p); // CREOVO → email

    scatter.current += ((down.current ? 1 : 0) - scatter.current) * (1 - Math.exp(-dt / 0.12));
    mat.uniforms.uScatter.value = scatter.current;
    mat.uniforms.uPointer.value.copy(pointer.current);

    const vel = Math.min(1, Math.abs(signal.lenisVelocity) * 0.5);
    const morphHeat = Math.sin(Math.PI * mat.uniforms.uMorph.value);
    mat.uniforms.uTurbulence.value = vel * 0.05 + morphHeat * 0.04 + scatter.current * 0.12;

    mat.uniforms.uTime.value += dt;
    mat.uniforms.uCanvasAspect.value = size.width / size.height;
  });

  return (
    <points
      geometry={geometry}
      frustumCulled={false}
      onPointerMove={onMove}
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

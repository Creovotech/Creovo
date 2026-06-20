"use client";

import { useMemo, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { signal } from "../signal/signalStore";
import { relayVertex, relayFragment } from "./relayShaders";

const COUNT = 13000;
const GATES = [-6, -16, -26, -36];

function Stream() {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const camera = useThree((s) => s.camera);
  const pointer = useRef(new THREE.Vector2(0, 0));
  const turb = useRef(0.4);

  const { geometry, dpr } = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(COUNT * 3);
    const seed = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 0.3 + Math.random() * 2.2;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = Math.sin(a) * r;
      pos[i * 3 + 2] = -Math.random() * 44;
      seed[i] = Math.random();
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    return { geometry: g, dpr: Math.min(window.devicePixelRatio || 1, 1.5) };
  }, []);

  const uniforms = useMemo(
    () => ({ uTime: { value: 0 }, uTurb: { value: 0.4 }, uSize: { value: 2.0 * dpr } }),
    [dpr],
  );

  useFrame((state, delta) => {
    const mat = matRef.current;
    if (!mat) return;
    const dt = Math.min(delta, 0.05);
    const t = mat.uniforms.uTime.value + dt;
    mat.uniforms.uTime.value = t;

    // turbulence rises with scroll velocity
    const targetTurb = 0.35 + Math.min(1.2, Math.abs(signal.lenisVelocity) * 0.6);
    turb.current += (targetTurb - turb.current) * (1 - Math.exp(-dt / 0.4));
    mat.uniforms.uTurb.value = turb.current;

    // fly forward through the gates, loop; sway + pointer parallax
    const fly = 5 - ((t * 4) % 50);
    const px = pointer.current.x * 1.2 + Math.sin(t * 0.3) * 0.5;
    const py = pointer.current.y * 0.8 + Math.cos(t * 0.23) * 0.3;
    camera.position.set(px, py, fly);
    camera.lookAt(px * 0.4, py * 0.4, fly - 10);
  });

  const onMove = (e: PointerEvent) => {
    const el = e.target as HTMLElement;
    const r = el.getBoundingClientRect();
    pointer.current.set(
      ((e.clientX - r.left) / r.width - 0.5) * 2,
      -((e.clientY - r.top) / r.height - 0.5) * 2,
    );
  };

  return (
    <group onPointerMove={(e) => onMove(e.nativeEvent)}>
      <points geometry={geometry} frustumCulled={false}>
        <shaderMaterial
          ref={matRef}
          vertexShader={relayVertex}
          fragmentShader={relayFragment}
          uniforms={uniforms}
          transparent
          depthTest={false}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* four gate rings the signal threads */}
      {GATES.map((z, i) => (
        <mesh key={i} position={[0, 0, z]}>
          <torusGeometry args={[1.8, 0.03, 8, 64]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#ff4d2e" : "#5a82ff"}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  );
}

export function RelayCanvas({ active }: { active: boolean }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5], fov: 62, near: 0.1, far: 80 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Stream />
    </Canvas>
  );
}

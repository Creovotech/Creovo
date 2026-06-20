"use client";

import { useMemo, useRef, type RefObject } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { signal } from "../signal/signalStore";
import { wallVertex, wallFragment } from "./wallShader";

const TINTS = ["#ff6a44", "#3fae6b", "#5a82ff", "#d39a4e"].map(
  (c) => new THREE.Color(c),
);

type Props = {
  cardsRef: RefObject<(HTMLElement | null)[]>;
  hoverRef: RefObject<number[]>;
};

function Wall({ cardsRef, hoverRef }: Props) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const gl = useThree((s) => s.gl);
  const hover = useRef([0, 0, 0, 0]);

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
      uRects: { value: [0, 1, 2, 3].map(() => new THREE.Vector4(0, 0, 0, 0)) },
      uHover: { value: [0, 0, 0, 0] },
      uTint: { value: TINTS },
      uTime: { value: 0 },
      uVel: { value: 0 },
    }),
    [],
  );

  useFrame((_, delta) => {
    const mat = matRef.current;
    if (!mat) return;
    const dt = Math.min(delta, 0.05);
    const canvasRect = gl.domElement.getBoundingClientRect();
    const cards = cardsRef.current ?? [];
    const targets = hoverRef.current ?? [0, 0, 0, 0];

    for (let i = 0; i < 4; i++) {
      const el = cards[i];
      const v = mat.uniforms.uRects.value[i] as THREE.Vector4;
      if (el && canvasRect.width > 0) {
        const r = el.getBoundingClientRect();
        v.set(
          (r.left - canvasRect.left) / canvasRect.width,
          (r.top - canvasRect.top) / canvasRect.height,
          r.width / canvasRect.width,
          r.height / canvasRect.height,
        );
      } else {
        v.set(0, 0, 0, 0);
      }
      hover.current[i] += (targets[i] - hover.current[i]) * (1 - Math.exp(-dt / 0.18));
      (mat.uniforms.uHover.value as number[])[i] = hover.current[i];
    }

    mat.uniforms.uTime.value += dt;
    mat.uniforms.uVel.value = Math.min(1, Math.abs(signal.lenisVelocity) * 0.4);
  });

  return (
    <mesh geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        vertexShader={wallVertex}
        fragmentShader={wallFragment}
        uniforms={uniforms}
        transparent
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

export function WallCanvas({ active, cardsRef, hoverRef }: Props & { active: boolean }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Wall cardsRef={cardsRef} hoverRef={hoverRef} />
    </Canvas>
  );
}

"use client";

import { Canvas } from "@react-three/fiber";
import { SignOff } from "./SignOff";

// Transparent canvas of additive points over the contact section. Additive
// blending makes them self-glow, so no postprocessing composer is needed —
// keeps this a cheap second/idle context.
export function SignOffCanvas({ active }: { active: boolean }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <SignOff active={active} />
    </Canvas>
  );
}

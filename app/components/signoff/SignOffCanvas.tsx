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
      // Dense additive points are fillrate-bound; cap DPR lower than the hero.
      dpr={[1, 1.25]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <SignOff />
    </Canvas>
  );
}

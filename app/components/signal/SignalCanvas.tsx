"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { SignalPlane } from "./SignalPlane";
import { PostFX } from "./PostFX";
import { bakeFrames, type BakedFrames } from "./bakeTextures";

export function SignalCanvas({ active = true }: { active?: boolean }) {
  const [frames, setFrames] = useState<BakedFrames | null>(null);

  useEffect(() => {
    let alive = true;
    bakeFrames().then((f) => {
      if (alive) setFrames(f);
    });
    // r3f sizes via a ResizeObserver that can miss the initial layout if the tab
    // mounts in the background; a couple of resize nudges make it settle.
    const kicks = [60, 300].map((ms) =>
      setTimeout(() => window.dispatchEvent(new Event("resize")), ms),
    );
    return () => {
      alive = false;
      kicks.forEach(clearTimeout);
    };
  }, []);

  return (
    <Canvas
      // Pause the whole loop when the journey scrolls off-screen.
      frameloop={active ? "always" : "never"}
      // Per-pixel fragment cost: never record/render above 1.5x DPR.
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <color attach="background" args={["#08080a"]} />
      {frames && <SignalPlane frames={frames} />}
      <PostFX />
    </Canvas>
  );
}

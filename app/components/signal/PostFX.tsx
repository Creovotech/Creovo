"use client";

import { EffectComposer, Bloom, Noise, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

// All "lighting" is emissive: white type crests bloom, the void never does.
// Glitch/chromatic-aberration are done in the hero shader, so no Glitch/CA pass
// here — keeps the chain cheap and always-on at 60fps.
export function PostFX() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom
        luminanceThreshold={0.5}
        luminanceSmoothing={0.9}
        intensity={0.75}
        mipmapBlur
        radius={0.7}
      />
      <Noise
        premultiply
        blendFunction={BlendFunction.OVERLAY}
        opacity={0.22}
      />
      <Vignette eskil={false} offset={0.22} darkness={0.9} />
    </EffectComposer>
  );
}

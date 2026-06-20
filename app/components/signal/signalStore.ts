// Single source of truth for the journey's scroll state. Written once per frame
// by SignalPlane's useFrame; read by the DOM HUD/CTA via rAF. A plain mutable
// object (not React state) keeps the 60fps loop allocation- and re-render-free.

export const signal = {
  /** Raw scroll progress through the pinned journey, 0..1. */
  progress: 0,
  /** Damped progress the shader actually uses. */
  smooth: 0,
  /** Rate of change of smooth progress — the "tuning dial" velocity. */
  velocity: 0,
  /** Raw Lenis scroll velocity (signed px/frame), fed from smooth-scroll.tsx. */
  lenisVelocity: 0,
};

/** Read scroll progress over the journey section (assumed to start at page top). */
export function readProgress(journeyHeightPx: number): number {
  if (typeof window === "undefined") return 0;
  const scrollable = journeyHeightPx - window.innerHeight;
  if (scrollable <= 0) return 0;
  return Math.min(1, Math.max(0, window.scrollY / scrollable));
}

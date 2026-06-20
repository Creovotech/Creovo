"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { startSignalBus } from "./signal/signal-bus";
import { signal } from "./signal/signalStore";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // The scroll bus runs regardless of motion preference — the hero and
    // sections read signal.* from it.
    startSignalBus();

    // Respect users who opt out of motion — skip smoothing entirely.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Feed raw scroll velocity to the bus for the velocity-reactive sections.
    lenis.on("scroll", (e: { velocity: number }) => {
      signal.lenisVelocity = e.velocity;
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}

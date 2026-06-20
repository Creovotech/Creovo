"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Hud } from "./signal/Hud";
import { setJourneyHeight } from "./signal/signal-bus";

// WebGL canvas is browser-only — ssr:false is legal here (Client Component).
const SignalCanvas = dynamic(
  () => import("./signal/SignalCanvas").then((m) => m.SignalCanvas),
  { ssr: false, loading: () => null },
);

export function SignalJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {
    // Defer the WebGL mount so first paint is the DOM HUD, not a WebGL stall.
    // setTimeout (not rAF) so it still fires if the tab mounts while hidden.
    const id = setTimeout(() => setMounted(true), 0);
    const measure = () =>
      setJourneyHeight(sectionRef.current?.offsetHeight ?? 0);
    measure();
    window.addEventListener("resize", measure);

    // Pause the hero canvas once the journey scrolls fully off-screen.
    const el = sectionRef.current;
    const io = el
      ? new IntersectionObserver(([e]) => setActive(e.isIntersecting))
      : null;
    if (el && io) io.observe(el);

    return () => {
      clearTimeout(id);
      window.removeEventListener("resize", measure);
      io?.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative h-[600vh] bg-ink"
      aria-label="Creovo — design studio"
    >
      {/* Indexable, screen-reader content mirroring the animated journey */}
      <div className="sr-only">
        <h1>Creovo — websites that refuse to blend in</h1>
        <p>
          We build signal out of noise. Creovo is an independent design studio
          crafting award-worthy, conversion-obsessed websites for ambitious local
          businesses. +180% more leads, 2.4s load times, 4.9★ client rating.
        </p>
      </div>

      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {mounted && <SignalCanvas active={active} />}
        <Hud />
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useSectionActive } from "./fx/use-section-active";

const WireCanvas = dynamic(
  () => import("./wire/WireCanvas").then((m) => m.WireCanvas),
  { ssr: false, loading: () => null },
);

const FALLBACK = [
  "Brand Identity",
  "Web Design",
  "3D & Motion",
  "Conversion",
  "Local SEO",
  "Next.js Builds",
  "Art Direction",
];

function CssTicker() {
  const loop = [...FALLBACK, ...FALLBACK];
  return (
    <div className="relative flex h-full items-center overflow-hidden">
      <div className="marquee-track flex w-max">
        {loop.map((item, i) => (
          <div key={i} className="flex items-center">
            <span className="px-7 text-xl font-medium tracking-tight text-bone md:text-2xl">
              {item}
            </span>
            <span className="text-ember">✳</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Velocity wire: a curved broadcast ribbon of service words that smears into
// RGB-split when you flick-scroll. CSS ticker is the reduced-motion fallback.
export function Marquee() {
  const { ref, mounted, active } = useSectionActive<HTMLDivElement>();
  const [motionOk, setMotionOk] = useState(true);
  useEffect(() => {
    setMotionOk(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <div ref={ref} className="relative overflow-hidden border-y border-line bg-ink-soft">
      <div className="relative h-40 md:h-48">
        {motionOk ? mounted && <WireCanvas active={active} /> : <CssTicker />}

        {/* broadcast HUD chips — always crisp DOM, never behind the canvas */}
        <div className="pointer-events-none absolute left-5 top-1/2 z-10 flex -translate-y-1/2 items-center gap-2 bg-ember px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-ink md:left-10">
          <span className="size-2 animate-pulse rounded-full bg-ink" />
          On Air
        </div>
        <div className="pointer-events-none absolute right-5 top-1/2 z-10 flex -translate-y-1/2 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim md:right-10">
          <span className="size-1.5 rounded-full bg-[#28c840]" />
          CH.01
        </div>
      </div>
    </div>
  );
}

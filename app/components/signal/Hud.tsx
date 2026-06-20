"use client";

import { useEffect, useRef, useState } from "react";
import { signal } from "./signalStore";

// Decoded-live HUD pinned to the corners + the conversion CTA that resolves in
// at the end of the journey. Reads the signal store via rAF and writes to DOM
// refs directly — no per-frame React re-render.
export function Hud() {
  const pctRef = useRef<HTMLSpanElement>(null);
  const tcRef = useRef<HTMLSpanElement>(null);
  const tagRef = useRef<HTMLSpanElement>(null);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const p = signal.smooth;
      const pct = Math.round(p * 100);
      if (pctRef.current) pctRef.current.textContent = `SIGNAL ${pct}%`;
      if (tcRef.current) {
        const frames = Math.floor(p * 6 * 24);
        const s = Math.floor(frames / 24);
        const f = frames % 24;
        tcRef.current.textContent = `00:0${Math.min(5, s)}:${String(f).padStart(2, "0")}`;
      }
      if (tagRef.current) {
        tagRef.current.textContent =
          signal.velocity > 0.04 ? "[CH.DESYNC]" : "[CH.LOCK]";
      }
      const isLocked = p > 0.9;
      setLocked((prev) => (prev !== isLocked ? isLocked : prev));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim">
      <div className="absolute left-6 top-24 flex items-center gap-2 md:left-10">
        <span className="size-2 rounded-full bg-[#28c840] shadow-[0_0_10px_#28c840]" />
        SIGNAL_LOCK // CH.RGB
      </div>
      <div className="absolute right-6 top-24 md:right-10">CREOVO™ / EST.2026</div>
      <div className="absolute bottom-6 left-6 flex items-center gap-3 md:left-10">
        <span className="text-ember">●REC</span>
        <span ref={tcRef}>00:00:00</span>
        <span ref={tagRef} className="text-bone/60">
          [CH.LOCK]
        </span>
      </div>
      <span ref={pctRef} className="absolute bottom-6 right-6 md:right-10">
        SIGNAL 0%
      </span>

      {/* Conversion CTA — resolves in once the signal is clean */}
      <div
        className={`absolute bottom-24 left-1/2 -translate-x-1/2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          locked
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "translate-y-4 opacity-0"
        }`}
      >
        <a
          href="#contact"
          data-cursor
          className="group inline-flex items-center gap-3 rounded-full bg-bone px-8 py-4 text-sm font-medium tracking-normal text-ink transition-transform duration-300 hover:scale-[1.03]"
        >
          <span className="size-1.5 rounded-full bg-ember" />
          Start transmission
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { signal } from "../signal/signalStore";

// Broadcast spectrum analyzer in pure Canvas2D — deliberately NOT WebGL so it
// adds zero GL contexts (the coexistence answer). A 96-column segmented-LED
// peak-hold meter with an auto-sweeping ember playhead. Sits behind the crisp
// DOM stat numerals; the bars are the section's signature, the numbers stay
// legible on top.

const COLS = 96;
const CELLS = 30;

// brand color by cell ratio: ember body → bone crest → indigo clip
function cellColor(r: number): string {
  if (r > 0.92) return "#5a82ff"; // clipping peak (indigo)
  if (r > 0.72) return "#ecebe6"; // crest (bone)
  if (r > 0.4) return "#ff7a5c"; // ember-soft
  return "#ff4d2e"; // ember body
}

function hash(n: number): number {
  const s = Math.sin(n * 127.1) * 43758.5453;
  return s - Math.floor(s);
}

export function SpectrumLock({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const peaks = useRef<number[]>(new Array(COLS).fill(0));
  const reveal = useRef(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    let raf = 0;
    let t = 0;
    let last = 0;

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
    };

    const draw = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016;
      last = now;
      t += dt;

      // reveal ramps in while the section is on screen
      reveal.current += ((active ? 1 : 0) - reveal.current) * (1 - Math.exp(-dt / 0.5));

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const colW = w / COLS;
      const gap = colW * 0.32;
      const cellH = h / CELLS;
      const cellGap = cellH * 0.28;

      // velocity smear → 12fps stepped time, like the rest of the site
      const vel = Math.min(1, Math.abs(signal.lenisVelocity) * 0.4);
      const tt = vel > 0.15 ? Math.floor(t * 12) / 12 : t;
      const playhead = (tt * 0.14) % 1;

      for (let i = 0; i < COLS; i++) {
        const phase = i * 0.34;
        let target =
          0.34 * (0.5 + 0.5 * Math.sin(tt * 1.6 + phase)) +
          0.26 * (0.5 + 0.5 * Math.sin(tt * 0.7 + phase * 2.3)) +
          0.18 * hash(i + Math.floor(tt * 6));

        // playhead spike + RGB rake
        const d = Math.abs(i / COLS - playhead);
        target += Math.max(0, 1 - d / 0.06) * 0.55;

        // reveal gain rises left→right
        const lr = reveal.current * 1.6 - (i / COLS) * 0.8;
        target *= Math.min(1, Math.max(0, lr));

        const prev = peaks.current[i];
        peaks.current[i] = Math.max(target, prev * 0.9); // peak-hold decay
      }

      for (let i = 0; i < COLS; i++) {
        const x = i * colW + gap / 2;
        const cw = colW - gap;
        const lit = Math.round(peaks.current[i] * CELLS);
        for (let j = 0; j < lit; j++) {
          const r = j / CELLS;
          ctx.fillStyle = cellColor(r);
          ctx.globalAlpha = 0.35 + r * 0.65;
          const y = h - (j + 1) * cellH + cellGap / 2;
          ctx.fillRect(x, y, cw, cellH - cellGap);
        }
      }
      ctx.globalAlpha = 1;

      if (!reduced && active) raf = requestAnimationFrame(draw);
    };

    resize();
    draw(performance.now()); // first frame even if hidden / inactive
    window.addEventListener("resize", resize);
    if (!reduced && active) raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" aria-hidden />;
}

"use client";

import { useEffect, useRef, useState } from "react";

// Trailing-ring custom cursor. A small dot tracks the pointer 1:1 while a larger
// ring lerps behind it, and any element with [data-cursor] swells the ring.
export function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setEnabled(true);

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };
    let raf = 0;
    let hovering = false;

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }
      const overInteractive = (e.target as HTMLElement)?.closest("[data-cursor]");
      hovering = Boolean(overInteractive);
    };

    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.16;
      ring.y += (pos.y - ring.y) * 0.16;
      if (ringRef.current) {
        const scale = hovering ? 2.1 : 1;
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${scale})`;
        ringRef.current.style.opacity = hovering ? "1" : "0.6";
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <div
        ref={ringRef}
        className="absolute left-0 top-0 size-9 rounded-full border border-bone/50 transition-[opacity] duration-300"
      />
      <div
        ref={dotRef}
        className="absolute -left-[3px] -top-[3px] size-1.5 rounded-full bg-ember"
      />
    </div>
  );
}

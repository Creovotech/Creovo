"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Reveal } from "./reveal";
import { SectionTag } from "./fx/section-tag";
import { useSectionActive } from "./fx/use-section-active";

const WallCanvas = dynamic(
  () => import("./wall/WallCanvas").then((m) => m.WallCanvas),
  { ssr: false, loading: () => null },
);

type Project = {
  name: string;
  category: string;
  year: string;
  /** Reduced-motion fallback gradient. */
  bg: string;
  span?: string;
};

const PROJECTS: Project[] = [
  {
    name: "Hearth & Iron",
    category: "Fencing & Gates",
    year: "2026",
    bg: "bg-[radial-gradient(120%_120%_at_20%_10%,#ff7a5c_0%,#ff4d2e_28%,#3a0d06_70%)]",
    span: "md:row-span-2",
  },
  {
    name: "Verdant",
    category: "Landscape Studio",
    year: "2025",
    bg: "bg-[radial-gradient(120%_120%_at_80%_20%,#9be15d_0%,#1f7a4d_40%,#06231a_100%)]",
  },
  {
    name: "Northpoint",
    category: "Builders & Joinery",
    year: "2025",
    bg: "bg-[radial-gradient(120%_120%_at_30%_80%,#9fb4ff_0%,#3147c7_40%,#0a1130_100%)]",
  },
  {
    name: "Atelier Brick",
    category: "Architecture",
    year: "2026",
    bg: "bg-[radial-gradient(120%_120%_at_70%_30%,#f4d9a6_0%,#c08a3e_38%,#2a1c0a_100%)]",
    span: "md:row-span-2",
  },
];

export function Work() {
  const { ref, mounted, active } = useSectionActive<HTMLElement>();
  const cardsRef = useRef<(HTMLElement | null)[]>([null, null, null, null]);
  const hoverRef = useRef<number[]>([0, 0, 0, 0]);
  const [motionOk, setMotionOk] = useState(true);
  useEffect(() => {
    setMotionOk(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <section ref={ref} id="work" className="px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <SectionTag index="02" label="Selected Work" />

        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <h2 className="max-w-[16ch] text-[clamp(1.9rem,4.4vw,4rem)] font-medium leading-[1.05] tracking-[-0.02em]">
              Four channels, four feeds we made impossible to ignore.
            </h2>
          </Reveal>
          <Reveal as="p" delay={150} className="max-w-xs text-bone-dim">
            Concepts shown. Hover to tune a channel in. Every build is bespoke —
            no two Creovo sites share a template.
          </Reveal>
        </div>

        <Reveal className="relative grid auto-rows-[18rem] grid-cols-1 gap-5 md:grid-cols-2">
          {mounted && motionOk && (
            <WallCanvas active={active} cardsRef={cardsRef} hoverRef={hoverRef} />
          )}
          {PROJECTS.map((p, i) => {
            const ch = `CH.${String(i + 1).padStart(2, "0")}`;
            return (
              <a
                key={p.name}
                href="#contact"
                data-cursor
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                onPointerEnter={() => (hoverRef.current[i] = 1)}
                onPointerLeave={() => (hoverRef.current[i] = 0)}
                className={`group relative z-10 block overflow-hidden rounded-2xl border border-line ${p.span ?? ""} ${motionOk ? "" : p.bg}`}
              >
                {/* faint scanlines unify it with the broadcast skin */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-20 [background:repeating-linear-gradient(to_bottom,transparent_0_3px,rgba(0,0,0,0.25)_3px_4px)]" />
                <div className="relative flex h-full min-h-[18rem] flex-col justify-between p-7">
                  <div className="flex items-start justify-between font-mono text-xs uppercase tracking-[0.2em]">
                    <span className="flex items-center gap-2 text-bone/80">
                      <span className="text-ember">▶</span>
                      {ch}
                    </span>
                    <span className="text-bone/60">{p.year}</span>
                  </div>
                  <div>
                    <span className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-bone/60">
                      {p.category}
                    </span>
                    <h3 className="glitch text-2xl font-medium tracking-tight md:text-3xl">
                      {p.name}
                    </h3>
                  </div>
                </div>
              </a>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

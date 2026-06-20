"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Reveal } from "./reveal";
import { SectionTag } from "./fx/section-tag";
import { ScrambleText } from "./fx/scramble-text";
import { useSectionActive } from "./fx/use-section-active";

const FieldCanvas = dynamic(
  () => import("./field/FieldCanvas").then((m) => m.FieldCanvas),
  { ssr: false, loading: () => null },
);

const POINTS = [
  {
    k: "01",
    t: "Design that earns trust",
    d: "Every section is built to move a real visitor one step closer to picking up the phone.",
  },
  {
    k: "02",
    t: "Engineered to be fast",
    d: "Sub-second loads, perfect Lighthouse scores, and motion that never gets in the way.",
  },
  {
    k: "03",
    t: "Made to be found",
    d: "Technical SEO and local schema baked in, so the right people land on you first.",
  },
];

export function Manifesto() {
  const { ref, mounted, active } = useSectionActive<HTMLElement>();
  const [motionOk, setMotionOk] = useState(true);
  useEffect(() => {
    setMotionOk(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <section
      ref={ref}
      id="studio"
      className="relative overflow-hidden px-6 py-28 md:px-10 md:py-44"
    >
      {/* flow-field comb: noise → signal lanes */}
      {mounted && motionOk && (
        <div className="pointer-events-auto absolute inset-0 -z-0 opacity-70">
          <FieldCanvas active={active} />
        </div>
      )}
      {/* keep the void readable under the field */}
      <div className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(120%_80%_at_50%_50%,transparent_30%,var(--color-ink)_85%)]" />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <SectionTag index="01" label="The Studio" />

        <Reveal
          as="h2"
          className="max-w-[22ch] text-[clamp(1.9rem,4.4vw,4rem)] font-medium leading-[1.08] tracking-[-0.02em]"
        >
          Most agencies broadcast{" "}
          <ScrambleText text="noise" speed={45} />. We engineer{" "}
          <ScrambleText
            text="signal"
            className="font-display italic text-ember"
            speed={45}
          />{" "}
          — websites that quietly out-sell everyone on the street.
        </Reveal>

        <div className="mt-20 grid gap-12 border-t border-line pt-12 md:grid-cols-3">
          {POINTS.map((item, i) => (
            <Reveal key={item.k} delay={i * 120}>
              <span className="font-mono text-sm text-ember">{item.k}</span>
              <h3 className="mt-4 text-xl font-medium">{item.t}</h3>
              <p className="mt-3 leading-relaxed text-bone-dim">{item.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

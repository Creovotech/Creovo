"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Reveal } from "./reveal";
import { SectionTag } from "./fx/section-tag";
import { ScrambleText } from "./fx/scramble-text";
import { useSectionActive } from "./fx/use-section-active";

const RelayCanvas = dynamic(
  () => import("./relay/RelayCanvas").then((m) => m.RelayCanvas),
  { ssr: false, loading: () => null },
);

const STEPS = [
  { k: "01", t: "Discover", d: "We learn your trade, your customers, and what actually wins you jobs." },
  { k: "02", t: "Design", d: "A bespoke identity and layout, art-directed to your brand — real screens, not wireframes." },
  { k: "03", t: "Build", d: "Hand-built in Next.js with the motion, speed, and SEO templates can never match." },
  { k: "04", t: "Launch", d: "We ship, measure, and refine — a site that keeps earning long after it goes live." },
];

export function Process() {
  const { ref, mounted, active } = useSectionActive<HTMLElement>();
  const [motionOk, setMotionOk] = useState(true);
  useEffect(() => {
    setMotionOk(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <section
      ref={ref}
      id="process"
      className="relative overflow-hidden px-6 py-28 md:px-10 md:py-40"
    >
      {/* 3D corridor: the tuned signal flying through four gates */}
      {mounted && motionOk && (
        <div className="absolute inset-0 -z-0">
          <RelayCanvas active={active} />
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 -z-0 bg-[linear-gradient(to_right,var(--color-ink)_0%,rgba(8,8,10,0.6)_45%,transparent_75%)]" />

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <SectionTag index="03" label="The Process" />

        <Reveal
          as="h2"
          className="mb-16 max-w-[16ch] text-[clamp(1.9rem,4.4vw,4rem)] font-medium leading-[1.05] tracking-[-0.02em]"
        >
          Four gates from kick-off to a site that pulls its weight.
        </Reveal>

        <div className="flex max-w-xl flex-col gap-10">
          {STEPS.map((step, i) => (
            <Reveal key={step.k} delay={i * 90} className="flex items-baseline gap-5">
              <span className="font-mono text-sm text-ember">{step.k}</span>
              <div>
                <ScrambleText
                  as="h3"
                  text={step.t}
                  speed={40}
                  className="text-2xl font-medium tracking-tight md:text-3xl"
                />
                <p className="mt-2 max-w-md leading-relaxed text-bone-dim">
                  {step.d}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

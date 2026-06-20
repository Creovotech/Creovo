"use client";

import { Reveal } from "./reveal";
import { CountUp } from "./count-up";
import { SpectrumLock } from "./fx/spectrum-lock";
import { useSectionActive } from "./fx/use-section-active";

const STATS = [
  { value: <CountUp to={100} />, label: "Lighthouse performance score" },
  { value: <CountUp to={38} prefix="+" suffix="%" />, label: "Average lift in enquiries" },
  { value: <CountUp to={0.7} decimals={1} suffix="s" />, label: "Typical load time" },
  { value: <CountUp to={24} suffix="+" />, label: "Brands launched" },
];

export function Stats() {
  const { ref, active } = useSectionActive<HTMLElement>();

  return (
    <section
      ref={ref}
      className="border-y border-line bg-ink-soft px-6 py-20 md:px-10 md:py-28"
    >
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-14 flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-bone-dim">
          <span className="size-1.5 rounded-full bg-[#28c840] shadow-[0_0_8px_#28c840]" />
          Signal metrics // locked
        </Reveal>

        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i * 110} className="flex flex-col gap-3">
              <span className="text-[clamp(2.6rem,6vw,4.5rem)] font-semibold leading-none tracking-[-0.03em]">
                {s.value}
              </span>
              <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim">
                <span className="size-1.5 rounded-full bg-[#28c840]" />
                lock
              </span>
              <span className="text-sm leading-relaxed text-bone-dim">
                {s.label}
              </span>
            </Reveal>
          ))}
        </div>

        {/* live broadcast spectrum meter (Canvas2D, zero GL contexts) */}
        <Reveal className="relative mt-16 h-36 w-full overflow-hidden md:h-44">
          <SpectrumLock active={active} />
        </Reveal>
      </div>
    </section>
  );
}

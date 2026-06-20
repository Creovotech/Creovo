import { Reveal } from "./reveal";

const CELLS = [
  { n: "41", c: "sites hand-built to date" },
  { n: "~4 wks", c: "typical build to live" },
  { n: "<1s", c: "first load — light, hand-coded pages" },
  { n: "Senior", c: "you brief the person who builds" },
];

export function CapabilityBar() {
  return (
    <section className="border-y border-line">
      <div className="mx-auto grid max-w-[1100px] grid-cols-2 md:grid-cols-4">
        {CELLS.map((x, i) => (
          <Reveal
            key={i}
            delay={i * 80}
            className={`px-6 py-10 md:py-12 ${i > 0 ? "border-l border-line-soft" : ""} ${i === 2 ? "border-l-0 md:border-l" : ""}`}
          >
            <div className="font-mono text-3xl font-medium tracking-tight md:text-[2.5rem]">
              {x.n}
            </div>
            <div className="mt-2 text-sm leading-snug text-ink-soft">{x.c}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

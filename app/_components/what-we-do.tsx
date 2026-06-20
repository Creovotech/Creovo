import { Reveal } from "./reveal";

const PILLARS = [
  {
    t: "Brand-grade web design",
    d: "A custom identity designed for your business — type, colour, art direction. Never a theme everyone else is also running.",
  },
  {
    t: "Hand-built front-end",
    d: "Real, hand-written code — no page-builders. That's why it loads in under a second and gives search engines clean markup to rank.",
  },
  {
    t: "Conversion architecture",
    d: "Every page is structured to move a visitor toward a call or an enquiry — not just to look good in a screenshot.",
  },
  {
    t: "SEO & schema by default",
    d: "Semantic markup and structured data — LocalBusiness, ratings, real reviews — shipped as standard, not sold back to you as an add-on.",
  },
];

export function WhatWeDo() {
  return (
    <section className="border-t border-line px-6 py-24 md:py-28">
      <div className="mx-auto max-w-[1100px]">
        <Reveal
          as="p"
          className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-ink-soft"
        >
          What every build includes
        </Reveal>
        <Reveal
          as="h2"
          delay={60}
          className="mb-14 max-w-[18ch] text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
        >
          Taste, in working order.
        </Reveal>

        <div className="grid gap-px md:grid-cols-2">
          {PILLARS.map((p, i) => (
            <Reveal
              key={p.t}
              delay={(i % 2) * 90}
              className="border-t border-line py-8 md:px-8"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="size-1.5 rounded-full bg-ember" />
                <h3 className="text-xl font-medium tracking-tight">{p.t}</h3>
              </div>
              <p className="max-w-[44ch] leading-relaxed text-ink-soft">{p.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Reveal } from "./reveal";
import { CAL_URL } from "./constants";

const MODELS = [
  {
    t: "Launch",
    d: "A complete, custom site — live in about four weeks, fixed scope and price.",
    who: "For a business ready to look the part.",
  },
  {
    t: "Partner",
    d: "We become your senior web team on a retainer — ongoing design, builds and improvements.",
    who: "For brands that ship continuously.",
  },
  {
    t: "Rescue",
    d: "Your site is slow, dated or off-brand. We rebuild it properly, fast.",
    who: "For a site that's holding you back.",
  },
];

export function HowWeWork() {
  return (
    <section id="how" className="px-6 py-24 md:py-28">
      <div className="mx-auto max-w-[1100px]">
        <Reveal
          as="p"
          className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-ink-soft"
        >
          How we work
        </Reveal>
        <Reveal
          as="h2"
          delay={60}
          className="mb-14 max-w-[20ch] text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
        >
          Three ways to work with us.
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {MODELS.map((m, i) => (
            <Reveal
              key={m.t}
              delay={i * 90}
              className="flex flex-col rounded-xl border border-line p-7"
            >
              <h3 className="text-xl font-medium tracking-tight">{m.t}</h3>
              <p className="mt-3 flex-1 leading-relaxed text-ink-soft">{m.d}</p>
              <p className="mt-4 text-sm text-ink-faint">{m.who}</p>
              <a
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-ember transition-transform duration-200 hover:translate-x-0.5"
              >
                Start here →
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

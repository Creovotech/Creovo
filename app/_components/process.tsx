import { Reveal } from "./reveal";

const STEPS = [
  { n: "01", t: "Call", d: "A 30-minute call. No deck required." },
  { n: "02", t: "Direction", d: "We agree the look and the scope in days, not weeks." },
  { n: "03", t: "Build", d: "You watch it come together on a live link." },
  { n: "04", t: "Launch", d: "We ship, hand over, and you own everything." },
];

export function Process() {
  return (
    <section id="process" className="border-t border-line px-6 py-24 md:py-28">
      <div className="mx-auto max-w-[1100px]">
        <Reveal
          as="p"
          className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-ink-soft"
        >
          Process
        </Reveal>
        <Reveal
          as="h2"
          delay={60}
          className="mb-14 max-w-[18ch] text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
        >
          From call to launch in about four weeks.
        </Reveal>

        <div className="grid gap-8 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 80} className="border-t border-line pt-5">
              <span className="font-mono text-sm text-ember">{s.n}</span>
              <h3 className="mt-3 text-lg font-medium tracking-tight">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{s.d}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 max-w-[780px] border-l-2 border-ember pl-6 md:pl-8">
          <p className="font-display text-[clamp(1.4rem,2.8vw,2rem)] leading-[1.4]">
            No account managers relaying your feedback. No junior learning on
            your project. You talk to the senior who designs and writes the code
            — which is exactly why it&rsquo;s fast, and exactly why it&rsquo;s
            good.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import { Reveal } from "../_components/reveal";
import { CapabilityBar } from "../_components/capability-bar";

export const metadata: Metadata = {
  title: "Studio — Creovo",
  description:
    "Creovo is a small, senior web studio. You brief the people who design and build it — no juniors, no page-builders, no agency drag.",
};

const PRINCIPLES = [
  {
    t: "Small on purpose.",
    d: "You work directly with the senior who designs and writes the code. No account managers relaying your feedback, no juniors learning on your project, no drift between brief and build.",
  },
  {
    t: "Hand-coded, every time.",
    d: "Real code, never a page-builder or a theme. It's why our sites load in under a second, read clean to search engines, and don't fall apart the moment you need something custom.",
  },
  {
    t: "Honest proof, or none.",
    d: "We surface real Google reviews and real performance numbers you can verify in a click. We don't write fake testimonials, and we don't invent results.",
  },
  {
    t: "Built to win work.",
    d: "Every page is structured to turn a visitor into a call or an enquiry — taste in service of the business, not taste for its own sake.",
  },
];

export default function StudioPage() {
  return (
    <main className="pt-36 md:pt-44">
      <section className="px-6 pb-8">
        <div className="mx-auto max-w-[1180px]">
          <Reveal
            as="p"
            className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-ink-soft"
          >
            The studio
          </Reveal>
          <Reveal
            as="h1"
            delay={60}
            className="max-w-[18ch] text-[clamp(2.2rem,5.5vw,4rem)] font-semibold leading-[1.04] tracking-[-0.025em]"
          >
            A small studio with a high standard.
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-12 md:py-16">
        <Reveal className="mx-auto max-w-[760px]">
          <p className="font-display text-[clamp(1.5rem,3vw,2.3rem)] leading-[1.35] tracking-[-0.01em]">
            Creovo exists because the gap between how good a business is and how
            its website makes it look is usually enormous —{" "}
            <span className="italic text-ember">and almost always fixable.</span>{" "}
            We&rsquo;re a small, senior web studio that hand-builds premium sites
            in about four weeks, for businesses that refuse to look average.
          </p>
        </Reveal>
      </section>

      <CapabilityBar />

      <section className="px-6 py-24 md:py-28">
        <div className="mx-auto max-w-[1180px]">
          <Reveal
            as="h2"
            className="mb-14 max-w-[16ch] text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
          >
            What we believe.
          </Reveal>
          <div className="grid gap-px md:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <Reveal
                key={p.t}
                delay={(i % 2) * 90}
                className="border-t border-line py-8 md:px-8"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="size-1.5 rounded-full bg-ember" />
                  <h3 className="text-xl font-medium tracking-tight">{p.t}</h3>
                </div>
                <p className="max-w-[46ch] leading-relaxed text-ink-soft">
                  {p.d}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

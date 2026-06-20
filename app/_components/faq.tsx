import { Reveal } from "./reveal";

const FAQS = [
  {
    q: "How long does a site take?",
    a: "Most builds go live in around four weeks — it depends on scope and how quickly we get content and feedback, but speed is the whole point of working with a small senior studio.",
  },
  {
    q: "How much does it cost?",
    a: "Every build is custom, so it's quoted per project — but we're a fixed-scope, fixed-price studio, not an hourly one. Book a call and we'll give you a real number, not a runaround.",
  },
  {
    q: "What's included?",
    a: "Strategy, a bespoke design, a hand-built front-end, SEO and structured data, and launch. No template, no page-builder, no surprise add-ons. You own everything.",
  },
  {
    q: "Can you rebuild our existing site?",
    a: "Yes — that's our Rescue engagement. If your current site is slow, dated, or off-brand, we rebuild it properly and fast.",
  },
  {
    q: "Who actually does the work?",
    a: "The senior who designs and writes the code. No juniors learning on your project, no account managers relaying your feedback — that's exactly why it's fast and exactly why it's good.",
  },
];

export function Faq() {
  return (
    <section className="border-t border-line px-6 py-24 md:py-28">
      <div className="mx-auto max-w-[1180px]">
        <Reveal
          as="h2"
          className="mb-12 max-w-[14ch] text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
        >
          Questions, answered.
        </Reveal>
        <div className="mx-auto max-w-[760px]">
          {FAQS.map((f, i) => (
            <Reveal key={i} delay={(i % 2) * 60}>
              <details className="group border-b border-line py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium">
                  {f.q}
                  <span className="text-ember transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-[64ch] leading-relaxed text-ink-soft">
                  {f.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

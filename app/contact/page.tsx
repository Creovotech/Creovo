import type { Metadata } from "next";
import { Reveal } from "../_components/reveal";
import { CalendlyEmbed } from "../_components/calendly-embed";
import { EMAIL } from "../_components/constants";

export const metadata: Metadata = {
  title: "Contact — Creovo",
  description:
    "Book a 30-minute discovery call. We'll run your current site through Lighthouse live and tell you honestly whether we're the right studio.",
};

const STEPS = [
  "A quick, no-deck call — tell us about the business.",
  "We run your current site through Lighthouse, live.",
  "An honest take on whether we're the right studio — whether or not we build it.",
];

export default function ContactPage() {
  return (
    <main className="px-6 pb-8 pt-36 md:pt-44">
      <div className="mx-auto max-w-[1180px]">
        <Reveal
          as="p"
          className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-ink-soft"
        >
          Contact
        </Reveal>
        <Reveal
          as="h1"
          delay={60}
          className="max-w-[16ch] text-[clamp(2.2rem,5.5vw,4rem)] font-semibold leading-[1.04] tracking-[-0.025em]"
        >
          Let&rsquo;s see if we&rsquo;re a fit.
        </Reveal>

        <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
          <Reveal>
            <p className="max-w-[46ch] text-lg leading-relaxed text-ink-soft">
              Book a 30-minute discovery call. No pitch deck, no pressure — just a
              straight conversation about your business and whether a Creovo build
              is right for it.
            </p>

            <div className="mt-10">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
                What happens
              </p>
              <ol className="mt-5 space-y-4">
                {STEPS.map((s, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-mono text-sm text-ember">
                      0{i + 1}
                    </span>
                    <span className="leading-relaxed text-ink-soft">{s}</span>
                  </li>
                ))}
              </ol>
            </div>

            <p className="mt-10 text-sm text-ink-soft">
              Prefer email?{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="text-ink underline underline-offset-2"
              >
                {EMAIL}
              </a>
            </p>
          </Reveal>

          <Reveal delay={90}>
            <CalendlyEmbed />
          </Reveal>
        </div>
      </div>
    </main>
  );
}

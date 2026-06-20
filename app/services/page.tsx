import type { Metadata } from "next";
import { Reveal } from "../_components/reveal";
import { WhatWeDo } from "../_components/what-we-do";
import { HowWeWork } from "../_components/how-we-work";
import { Process } from "../_components/process";
import { Faq } from "../_components/faq";

export const metadata: Metadata = {
  title: "Services — Creovo",
  description:
    "What we do and how we work — bespoke design, hand-built front-end, conversion architecture and SEO, shipped in about four weeks.",
};

export default function ServicesPage() {
  return (
    <main className="pt-36 md:pt-44">
      <section className="px-6 pb-4">
        <div className="mx-auto max-w-[1180px]">
          <Reveal
            as="p"
            className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-ink-soft"
          >
            Services
          </Reveal>
          <Reveal
            as="h1"
            delay={60}
            className="max-w-[20ch] text-[clamp(2.2rem,5.5vw,4rem)] font-semibold leading-[1.04] tracking-[-0.025em]"
          >
            A premium site — and everything that makes it actually work.
          </Reveal>
          <Reveal
            as="p"
            delay={120}
            className="mt-6 max-w-[56ch] text-lg leading-relaxed text-ink-soft"
          >
            We&rsquo;re a small, senior studio. You brief the people who design
            and build it, and about four weeks later you ship a fast, custom
            site built to win work — not just to look good in a screenshot.
          </Reveal>
        </div>
      </section>

      <WhatWeDo />
      <HowWeWork />
      <Process />
      <Faq />
    </main>
  );
}

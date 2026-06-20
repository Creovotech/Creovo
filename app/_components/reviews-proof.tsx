import { Reveal } from "./reveal";

export function ReviewsProof() {
  return (
    <section className="px-6 py-20 md:py-24">
      <Reveal className="mx-auto max-w-[780px] border-l-2 border-ember pl-6 md:pl-8">
        <p className="font-display text-[clamp(1.4rem,2.9vw,2.1rem)] leading-[1.38]">
          Every review on a Creovo site is a real, named Google review —
          surfaced verbatim through structured data. We don&rsquo;t write fake
          testimonials, and we don&rsquo;t invent results.
        </p>
        <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
          Real proof only — or none at all.
        </p>
      </Reveal>
    </section>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Reveal } from "./reveal";
import { WORK } from "../_data/work";

export function FeaturedWork() {
  const featured = WORK.slice(0, 3);
  return (
    <section id="work" className="px-6 py-24 md:py-28">
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal
              as="p"
              className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-ink-soft"
            >
              Selected work
            </Reveal>
            <Reveal
              as="h2"
              delay={60}
              className="max-w-[16ch] text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
            >
              Recent builds, real businesses.
            </Reveal>
          </div>
          <Reveal delay={120}>
            <Link
              href="/work"
              className="inline-block shrink-0 text-sm font-medium text-ember transition-transform duration-200 hover:translate-x-0.5"
            >
              View all work →
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-x-6 gap-y-12 md:grid-cols-3">
          {featured.map((w, i) => (
            <Reveal key={w.slug} delay={i * 80} className="group">
              <Link href={`/work/${w.slug}`} className="block">
                <div className="overflow-hidden rounded-xl border border-line bg-white shadow-[0_22px_55px_-34px_rgba(8,8,10,0.5)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5">
                  <div className="relative aspect-[16/11] w-full overflow-hidden">
                    <Image
                      src={w.cover}
                      alt={`${w.client} — site Creovo built`}
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                </div>
                <h3 className="mt-4 text-base font-medium tracking-tight">
                  {w.client}
                </h3>
                <p className="mt-1 text-sm leading-snug text-ink-soft">
                  {w.summary}
                </p>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-faint">
                  {w.sector}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

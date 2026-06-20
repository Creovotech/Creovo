import Image from "next/image";
import { Reveal } from "./reveal";
import { WORK } from "./work.data";

export function Work() {
  return (
    <section id="work" className="px-6 py-24 md:py-28">
      <div className="mx-auto max-w-[1100px]">
        <Reveal
          as="p"
          className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-ink-soft"
        >
          Selected work
        </Reveal>
        <Reveal
          as="h2"
          delay={60}
          className="mb-14 max-w-[16ch] text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.08] tracking-[-0.02em]"
        >
          Different trades, different towns — one standard.
        </Reveal>

        <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
          {WORK.map((w, i) => (
            <Reveal key={w.slug} delay={(i % 2) * 100} className="group">
              <a
                href={w.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block overflow-hidden rounded-xl border border-line bg-white shadow-[0_24px_60px_-34px_rgba(8,8,10,0.55)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5"
              >
                <div className="flex items-center gap-1.5 border-b border-line-soft bg-bone px-4 py-3">
                  <span className="size-2.5 rounded-full bg-line" />
                  <span className="size-2.5 rounded-full bg-line" />
                  <span className="size-2.5 rounded-full bg-line" />
                  <span className="ml-3 truncate font-mono text-[11px] text-ink-faint">
                    {w.liveUrl.replace("https://", "")}
                  </span>
                </div>
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={`/work/${w.slug}.png`}
                    alt={`${w.title} — site Creovo designed and built`}
                    fill
                    sizes="(max-width: 768px) 100vw, 520px"
                    className="object-cover object-top"
                  />
                </div>
              </a>

              <div className="mt-5">
                <h3 className="text-lg font-medium leading-snug">{w.title}</h3>
                <div className="signal-line mt-2.5 h-px w-12 bg-ember" />
                <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-ink-soft">
                  {w.note}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs">
                  <span className="text-ink-faint">{w.tag}</span>
                  <a
                    href={w.pageSpeedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ember underline-offset-2 hover:underline"
                  >
                    Lighthouse →
                  </a>
                  <a
                    href={w.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ember underline-offset-2 hover:underline"
                  >
                    View live →
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal
          as="p"
          className="mt-14 max-w-[62ch] text-sm leading-relaxed text-ink-faint"
        >
          Every site above is live, hand-coded, and under ~100KB — real builds,
          with real reviews surfaced via structured data. No templates, no
          page-builders.
        </Reveal>
      </div>
    </section>
  );
}

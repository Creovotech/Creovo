import { Reveal } from "./reveal";
import { CAL_URL } from "./constants";

export function Hero() {
  return (
    <section id="top" className="px-6 pb-20 pt-36 md:pb-28 md:pt-44">
      <div className="mx-auto max-w-[1100px]">
        <Reveal
          as="p"
          className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-ink-soft"
        >
          <span className="size-1.5 rounded-full bg-ember" />
          A senior web studio
        </Reveal>

        <Reveal
          as="h1"
          delay={60}
          className="max-w-[20ch] text-[clamp(2.5rem,6vw,4.25rem)] font-semibold leading-[1.04] tracking-[-0.025em]"
        >
          Premium sites, hand-built in{" "}
          <span className="relative whitespace-nowrap">
            weeks
            <svg
              className="absolute -bottom-1.5 left-0 w-full"
              height="10"
              viewBox="0 0 200 10"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden
            >
              <path
                className="underline-draw"
                d="M2 7 C 55 2, 145 2, 198 6"
                stroke="var(--color-ember)"
                strokeWidth="3"
                strokeLinecap="round"
                pathLength={1}
              />
            </svg>
          </span>{" "}
          — not template-factory months.
        </Reveal>

        <Reveal
          as="p"
          delay={120}
          className="mt-7 max-w-[56ch] text-lg leading-relaxed text-ink-soft"
        >
          Creovo is a small, senior studio. You brief the people who actually
          design and code it — and about four weeks later you ship a fast,
          custom site that makes your business look like the leader in its
          market. No juniors, no page-builders, no handoffs.
        </Reveal>

        <Reveal delay={180} className="mt-9 flex flex-wrap items-center gap-5">
          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-ember px-7 py-3.5 text-base font-medium text-white transition-transform duration-200 hover:scale-[1.03]"
          >
            Book a discovery call
          </a>
          <a
            href="#work"
            className="text-base text-ink-soft underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            See the work ↓
          </a>
        </Reveal>

        <Reveal
          delay={240}
          className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-xs uppercase tracking-[0.15em] text-ink-faint"
        >
          <span>Hand-coded</span>
          <span className="text-line">/</span>
          <span>Sub-second loads</span>
          <span className="text-line">/</span>
          <span>Live in ~4 weeks</span>
        </Reveal>
      </div>
    </section>
  );
}

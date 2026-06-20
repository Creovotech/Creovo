"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Reveal } from "../_components/reveal";
import { WORK } from "../_data/work";

const TAGS = ["All", "Brand", "Web", "SEO"];

export default function WorkIndex() {
  const [tag, setTag] = useState("All");
  const items = tag === "All" ? WORK : WORK.filter((w) => w.tags.includes(tag));

  return (
    <main className="px-6 pb-8 pt-36 md:pt-44">
      <div className="mx-auto max-w-[1180px]">
        <Reveal
          as="p"
          className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-ink-soft"
        >
          Selected work
        </Reveal>
        <Reveal
          as="h1"
          delay={60}
          className="max-w-[18ch] text-[clamp(2.2rem,5.5vw,4rem)] font-semibold leading-[1.04] tracking-[-0.025em]"
        >
          Different trades, different towns — one standard.
        </Reveal>
        <Reveal
          as="p"
          delay={120}
          className="mt-6 max-w-[54ch] text-lg leading-relaxed text-ink-soft"
        >
          A selection of recent builds. Every one is live, hand-coded, and built
          to make a real business look like the leader in its market.
        </Reveal>

        <div className="mt-10 flex flex-wrap gap-2">
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setTag(t)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                tag === t
                  ? "border-ink bg-ink text-bone"
                  : "border-line text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2">
          {items.map((w, i) => (
            <Reveal key={w.slug} delay={(i % 2) * 90} className="group">
              <Link href={`/work/${w.slug}`} className="block">
                <div className="overflow-hidden rounded-xl border border-line bg-white shadow-[0_24px_60px_-34px_rgba(8,8,10,0.5)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1.5">
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
                      src={w.cover}
                      alt={`${w.client} — site Creovo designed and built`}
                      fill
                      priority={i < 2}
                      sizes="(max-width: 768px) 100vw, 560px"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>

                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-medium tracking-tight">{w.client}</h2>
                    <p className="mt-1 max-w-[40ch] text-sm leading-snug text-ink-soft">
                      {w.outcomeTitle}
                    </p>
                  </div>
                  <span className="mt-0.5 shrink-0 font-mono text-xs text-ink-faint">
                    {w.year}
                  </span>
                </div>
                <div className="signal-line mt-3 h-px w-12 bg-ember" />
                <div className="mt-3 flex flex-wrap items-center gap-x-3 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-faint">
                  <span>{w.sector}</span>
                  <span>·</span>
                  <span>{w.location}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}

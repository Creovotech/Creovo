import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "../../_components/reveal";
import { WORK, getCase, nextCase } from "../../_data/work";

export function generateStaticParams() {
  return WORK.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCase(slug);
  if (!cs) return {};
  return {
    title: `${cs.client} — Creovo`,
    description: cs.outcomeTitle,
  };
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-ink-faint">{label}</div>
      <div className="mt-1 text-ink">{value}</div>
    </div>
  );
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cs = getCase(slug);
  if (!cs) notFound();
  const next = nextCase(slug);

  return (
    <main className="px-6 pt-36 md:pt-44">
      <div className="mx-auto max-w-[1000px]">
        <Reveal>
          <Link
            href="/work"
            className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft transition-colors hover:text-ink"
          >
            ← All work
          </Link>
        </Reveal>

        <Reveal
          as="h1"
          delay={60}
          className="mt-8 max-w-[20ch] text-[clamp(2.1rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.025em]"
        >
          {cs.outcomeTitle}
        </Reveal>

        <Reveal
          delay={120}
          className="mt-9 grid grid-cols-2 gap-6 border-y border-line py-6 font-mono text-xs sm:grid-cols-4"
        >
          <Meta label="Client" value={cs.client} />
          <Meta label="Sector" value={cs.sector} />
          <Meta label="Location" value={cs.location} />
          <Meta label="Year" value={cs.year} />
        </Reveal>

        <Reveal delay={160} className="mt-7 flex flex-wrap items-center gap-5">
          <a
            href={cs.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-ember px-6 py-3 text-sm font-medium text-white transition-transform duration-200 hover:scale-[1.03]"
          >
            Visit live site →
          </a>
          <a
            href={cs.pageSpeedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-ember underline-offset-2 hover:underline"
          >
            Run Lighthouse →
          </a>
        </Reveal>
      </div>

      {/* cover */}
      <Reveal className="mx-auto mt-14 max-w-[1180px]">
        <div className="overflow-hidden rounded-xl border border-line bg-white shadow-[0_30px_70px_-40px_rgba(8,8,10,0.5)]">
          <div className="flex items-center gap-1.5 border-b border-line-soft bg-bone px-4 py-3">
            <span className="size-2.5 rounded-full bg-line" />
            <span className="size-2.5 rounded-full bg-line" />
            <span className="size-2.5 rounded-full bg-line" />
            <span className="ml-3 truncate font-mono text-[11px] text-ink-faint">
              {cs.liveUrl.replace("https://", "")}
            </span>
          </div>
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={cs.cover}
              alt={`${cs.client} — homepage`}
              fill
              priority
              sizes="(max-width: 1180px) 100vw, 1180px"
              className="object-cover object-top"
            />
          </div>
        </div>
      </Reveal>

      {/* challenge + approach */}
      <div className="mx-auto mt-20 grid max-w-[1000px] gap-12 md:grid-cols-2 md:gap-16">
        <Reveal>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
            The challenge
          </h2>
          <p className="mt-5 text-xl leading-relaxed">{cs.challenge}</p>
        </Reveal>
        <Reveal delay={90}>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
            What we did
          </h2>
          <ul className="mt-5 space-y-3.5">
            {cs.approach.map((a, i) => (
              <li key={i} className="flex gap-3 leading-relaxed text-ink-soft">
                <span className="mt-0.5 text-ember">—</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* full build walkthrough */}
      <Reveal className="mx-auto mt-20 max-w-[1000px]">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
          The build, end to end
        </p>
        <div className="overflow-hidden rounded-xl border border-line bg-white shadow-[0_30px_70px_-44px_rgba(8,8,10,0.45)]">
          {/* tall full-page strip — plain img to avoid fixed-height constraints */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cs.full}
            alt={`${cs.client} — full page`}
            loading="lazy"
            className="h-auto w-full"
          />
        </div>
      </Reveal>

      {/* proof */}
      <div className="mx-auto mt-20 max-w-[1000px]">
        <div className="grid gap-px border-y border-line sm:grid-cols-3">
          {cs.proof.map((p, i) => (
            <Reveal
              key={i}
              delay={i * 80}
              className={`py-8 ${i > 0 ? "sm:border-l sm:border-line-soft sm:pl-6" : ""}`}
            >
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
                {p.label}
              </div>
              <div className="mt-2 text-lg">{p.value}</div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-6">
          <a
            href={cs.pageSpeedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-ember underline-offset-2 hover:underline"
          >
            Verify it yourself on PageSpeed →
          </a>
        </Reveal>
      </div>

      {/* next project */}
      <Link href={`/work/${next.slug}`} className="group mt-24 block border-t border-line">
        <div className="mx-auto flex max-w-[1180px] items-center justify-between gap-6 py-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-faint">
              Next project
            </span>
            <p className="mt-2 text-2xl font-medium tracking-tight transition-colors group-hover:text-ember md:text-3xl">
              {next.client} →
            </p>
          </div>
          <div className="hidden w-44 shrink-0 overflow-hidden rounded-lg border border-line md:block">
            <div className="relative aspect-[16/10]">
              <Image
                src={next.cover}
                alt={next.client}
                fill
                sizes="176px"
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </Link>
    </main>
  );
}

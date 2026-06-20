import Image from "next/image";
import { Reveal } from "./reveal";

const SHOTS = [
  { slug: "jaytec-fencing", url: "jaytec-fencing.creovo.dev" },
  { slug: "golden-city-gates", url: "golden-city-gates.creovo.dev" },
  { slug: "jimmys-outdoors", url: "jimmys-outdoors.creovo.dev" },
];

function Frame({ slug, url }: { slug: string; url: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white shadow-[0_40px_80px_-44px_rgba(8,8,10,0.55)]">
      <div className="flex items-center gap-1.5 border-b border-line-soft bg-bone px-3 py-2">
        <span className="size-2 rounded-full bg-line" />
        <span className="size-2 rounded-full bg-line" />
        <span className="size-2 rounded-full bg-line" />
        <span className="ml-2 truncate font-mono text-[10px] text-ink-faint">
          {url}
        </span>
      </div>
      <div className="relative aspect-[16/10] w-full">
        <Image
          src={`/work/${slug}.png`}
          alt={`Site Creovo built — ${url}`}
          fill
          priority
          sizes="(max-width: 640px) 100vw, 360px"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

// A staggered montage of real builds — the studio's strongest "hero image",
// over a soft ember atmospheric wash.
export function HeroShowcase() {
  return (
    <div className="relative px-6 pb-6 pt-6 md:pt-10">
      <div className="pointer-events-none absolute inset-x-0 -top-28 -z-10 mx-auto h-[460px] max-w-[1100px] bg-[radial-gradient(55%_62%_at_50%_40%,rgba(255,77,46,0.13),transparent_72%)]" />
      <Reveal className="mx-auto grid max-w-[1100px] grid-cols-1 items-end gap-5 sm:grid-cols-3">
        <div className="sm:translate-y-7">
          <Frame {...SHOTS[0]} />
        </div>
        <div className="sm:-translate-y-2 sm:scale-[1.05]">
          <Frame {...SHOTS[1]} />
        </div>
        <div className="sm:translate-y-7">
          <Frame {...SHOTS[2]} />
        </div>
      </Reveal>
    </div>
  );
}

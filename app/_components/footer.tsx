import Link from "next/link";
import { Reveal } from "./reveal";
import { CAL_URL, EMAIL, SHOWCASE_URL } from "./constants";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line">
      {/* closing CTA band — last conversion attempt on every page */}
      <div className="relative px-6 py-24 md:py-32">
        <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70%] bg-[radial-gradient(60%_110%_at_50%_120%,rgba(255,77,46,0.12),transparent_70%)]" />
        <Reveal className="mx-auto max-w-[900px] text-center">
          <h2 className="mx-auto max-w-[16ch] text-[clamp(2rem,5.5vw,3.75rem)] font-semibold leading-[1.04] tracking-[-0.025em]">
            Let&rsquo;s build something worth looking at.
          </h2>
          <div className="mt-9 flex flex-col items-center gap-4">
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-ember px-8 py-4 text-base font-medium text-white transition-transform duration-200 hover:scale-[1.03]"
            >
              Book a discovery call
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="text-sm text-ink-soft underline underline-offset-2 hover:text-ink"
            >
              {EMAIL}
            </a>
          </div>
        </Reveal>
      </div>

      {/* footer columns */}
      <div className="border-t border-line px-6 py-12">
        <div className="mx-auto flex max-w-[1180px] flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div>
            <Link href="/" className="text-lg font-semibold tracking-tight">
              creovo<span className="text-ember">.</span>
            </Link>
            <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-ink-faint">
              A small, senior web studio. Premium sites, hand-built in weeks.
            </p>
          </div>

          <nav className="flex gap-16 text-sm">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
                Site
              </span>
              {[
                { href: "/work", label: "Work" },
                { href: "/services", label: "Services" },
                { href: "/studio", label: "Studio" },
                { href: "/contact", label: "Contact" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="text-ink-soft hover:text-ink">
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
                Connect
              </span>
              <a href={`mailto:${EMAIL}`} className="text-ink-soft hover:text-ink">
                Email
              </a>
              <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="text-ink-soft hover:text-ink">
                Book a call
              </a>
              <a href={SHOWCASE_URL} target="_blank" rel="noopener noreferrer" className="text-ember hover:opacity-80">
                Immersive work ↗
              </a>
            </div>
          </nav>
        </div>

        <div className="mx-auto mt-10 flex max-w-[1180px] items-center justify-between border-t border-line-soft pt-6 font-mono text-xs text-ink-faint">
          <span>© 2026 Creovo</span>
          <span>Hand-built in Next.js</span>
        </div>
      </div>
    </footer>
  );
}

import { CAL_URL, EMAIL, SHOWCASE_URL } from "./constants";

export function Footer() {
  return (
    <footer className="border-t border-line px-6 py-14">
      <div className="mx-auto flex max-w-[1100px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <span className="text-lg font-semibold tracking-tight">
          creovo<span className="text-ember">.</span>
        </span>
        <nav className="flex flex-wrap items-center gap-x-7 gap-y-2 text-sm text-ink-soft">
          <a href="#work" className="transition-colors hover:text-ink">
            Work
          </a>
          <a href="#how" className="transition-colors hover:text-ink">
            How we work
          </a>
          <a href="#process" className="transition-colors hover:text-ink">
            Process
          </a>
          <a
            href={CAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-ink"
          >
            Book a call
          </a>
          <a
            href={`mailto:${EMAIL}`}
            className="transition-colors hover:text-ink"
          >
            {EMAIL}
          </a>
          <a
            href={SHOWCASE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ember transition-transform duration-200 hover:translate-x-0.5"
          >
            See our immersive work →
          </a>
        </nav>
        <span className="font-mono text-xs text-ink-faint">© 2026 Creovo</span>
      </div>
    </footer>
  );
}

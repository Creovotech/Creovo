"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { label: "Work", href: "#work" },
  { label: "Studio", href: "#studio" },
  { label: "Process", href: "#process" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-ink/70 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <a
          href="#top"
          data-cursor
          className="text-lg font-semibold tracking-tight"
        >
          creovo<span className="text-ember">.</span>
        </a>

        <nav className="hidden items-center gap-9 text-sm text-bone-dim md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-cursor
              className="transition-colors duration-300 hover:text-bone"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          data-cursor
          className="group relative inline-flex items-center gap-2 rounded-full border border-line px-5 py-2 text-sm transition-colors duration-300 hover:border-bone/40"
        >
          <span className="size-1.5 rounded-full bg-ember transition-transform duration-300 group-hover:scale-125" />
          Start a project
        </a>
      </div>
    </header>
  );
}

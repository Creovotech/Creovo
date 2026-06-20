"use client";

import { useEffect, useState } from "react";
import { CAL_URL } from "./constants";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-line bg-bone/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1100px] items-center justify-between px-6">
        <a href="#top" className="text-lg font-semibold tracking-tight">
          creovo<span className="text-ember">.</span>
        </a>
        <div className="hidden items-center gap-8 text-sm text-ink-soft md:flex">
          <a href="#work" className="transition-colors hover:text-ink">
            Work
          </a>
          <a href="#how" className="transition-colors hover:text-ink">
            How we work
          </a>
          <a href="#process" className="transition-colors hover:text-ink">
            Process
          </a>
        </div>
        <a
          href={CAL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-ember px-5 py-2 text-sm font-medium text-white transition-transform duration-200 hover:scale-[1.04]"
        >
          Book a call
        </a>
      </nav>
    </header>
  );
}

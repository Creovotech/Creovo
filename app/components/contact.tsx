"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Reveal } from "./reveal";
import { SectionTag } from "./fx/section-tag";
import { ScrambleText } from "./fx/scramble-text";
import { useSectionActive } from "./fx/use-section-active";

const SignOffCanvas = dynamic(
  () => import("./signoff/SignOffCanvas").then((m) => m.SignOffCanvas),
  { ssr: false, loading: () => null },
);

export function Contact() {
  const { ref, mounted, active } = useSectionActive<HTMLDivElement>();
  const [motionOk, setMotionOk] = useState(true);
  useEffect(() => {
    setMotionOk(!window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <footer
      id="contact"
      className="relative overflow-hidden px-6 pt-28 md:px-10 md:pt-40"
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[60%] bg-[radial-gradient(80%_120%_at_50%_120%,rgba(255,77,46,0.18)_0%,transparent_70%)]" />

      <div className="mx-auto max-w-[1400px]">
        <SectionTag index="04" label="Start Transmission" />

        <Reveal
          as="h2"
          className="max-w-[18ch] text-[clamp(2.4rem,8vw,7rem)] font-semibold leading-[0.95] tracking-[-0.03em]"
        >
          Let&rsquo;s build something that doesn&rsquo;t look like{" "}
          <ScrambleText
            text="everyone else."
            className="font-display italic text-ember"
            speed={50}
          />
        </Reveal>

        {/* particle sign-off: points morph scatter → CREOVO → the email */}
        <div ref={ref} className="relative mt-10 h-[46vh] min-h-80 w-full">
          {mounted && motionOk && <SignOffCanvas active={active} />}
          <div className="pointer-events-none absolute bottom-2 left-0 font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim">
            // transmission end · signal locked
          </div>
        </div>

        <Reveal className="mt-4">
          <a
            href="https://calendly.com/creovotech/30min"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor
            className="group inline-flex items-center gap-4 rounded-full bg-bone px-8 py-4 text-base font-medium text-ink transition-transform duration-300 hover:scale-[1.03]"
          >
            <span className="size-2 rounded-full bg-ember" />
            hello@creovo.studio
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </Reveal>

        <div className="mt-24 flex flex-col gap-10 border-t border-line py-12 md:flex-row md:items-center md:justify-between">
          <span className="text-2xl font-semibold tracking-tight">
            creovo<span className="text-ember">.</span>
          </span>

          <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-bone-dim">
            {["Work", "Studio", "Process", "Instagram", "Dribbble", "LinkedIn"].map(
              (l) => (
                <a
                  key={l}
                  href="#top"
                  data-cursor
                  className="glitch transition-colors duration-300 hover:text-bone"
                >
                  {l}
                </a>
              ),
            )}
          </nav>

          <span className="font-mono text-xs text-bone-dim">
            © 2026 Creovo Studio · 51.5°N 0.1°W
          </span>
        </div>
      </div>
    </footer>
  );
}

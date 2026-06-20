"use client";

import {
  createElement,
  useEffect,
  useRef,
  useState,
  type ElementType,
} from "react";

const GLYPHS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789/\\<>#*@█▒░";

type ScrambleTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  /** ms between scramble ticks — lower is faster. */
  speed?: number;
  /** characters revealed per tick. */
  revealRate?: number;
};

// "Decodes" text in when it scrolls into view: each not-yet-resolved character
// flickers through random glyphs, resolving left-to-right. SSR renders the real
// text, so it stays crawlable and accessible; only the client animates.
export function ScrambleText({
  text,
  as = "span",
  className = "",
  speed = 30,
  revealRate = 0.8,
}: ScrambleTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [display, setDisplay] = useState(text);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const run = () => {
      let tick = 0;
      const id = setInterval(() => {
        tick += 1;
        const revealed = Math.floor(tick * revealRate);
        let out = "";
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (ch === " ") {
            out += " ";
          } else if (i < revealed) {
            out += ch;
          } else {
            out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }
        setDisplay(out);
        if (revealed >= text.length) {
          setDisplay(text);
          clearInterval(id);
        }
      }, speed);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          run();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [text, speed, revealRate]);

  return createElement(
    as,
    { ref, className, "aria-label": text },
    display,
  );
}

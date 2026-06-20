"use client";

import {
  createElement,
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  /** Re-arm the animation each time it scrolls back into view. */
  once?: boolean;
};

// Adds `.is-in` when the element enters the viewport, driving the CSS-based
// reveal transitions defined in globals.css. Kept dependency-free on purpose —
// an IntersectionObserver is cheaper and steadier than a scroll-linked library.
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("is-in");
          }
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once]);

  // createElement avoids the polymorphic-`as` JSX typing that infers props as `never`.
  return createElement(
    Tag,
    {
      ref,
      className: `reveal ${className}`,
      style: { "--reveal-delay": `${delay}ms` } as CSSProperties,
    },
    children,
  );
}

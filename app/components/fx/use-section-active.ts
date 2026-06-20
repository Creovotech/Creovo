"use client";

import { useEffect, useRef, useState } from "react";

// Gates a section's WebGL/canvas effect:
//  - `mounted` flips true once the section is within ~1.5 viewports and stays
//    true (no teardown churn; idle canvases cost ~0 with frameloop:'never').
//  - `active` tracks real viewport intersection — drive frameloop off it so only
//    the on-screen effect actually animates.
export function useSectionActive<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mountIO = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setMounted(true);
      },
      { rootMargin: "150% 0px" },
    );
    const activeIO = new IntersectionObserver(([e]) =>
      setActive(e.isIntersecting),
    );

    mountIO.observe(el);
    activeIO.observe(el);
    return () => {
      mountIO.disconnect();
      activeIO.disconnect();
    };
  }, []);

  return { ref, mounted, active };
}

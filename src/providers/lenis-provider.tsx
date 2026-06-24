"use client";

import { ReactLenis, useLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';
import { createContext, ReactNode, useEffect, useState } from "react";

interface ScrollValue {
  scrollY: number;
  lenis: any;
}

export const ScrollContext = createContext<ScrollValue>({
  scrollY: 0,
  lenis: null,
});

interface ScrollProviderProps {
  children: ReactNode;
}

const ScrollContextProvider = ({ children }: ScrollProviderProps) => {
  const [scrollY, setScrollY] = useState(0);

  const lenis = useLenis(({ scroll }: { scroll: number }) => {
    setScrollY(scroll);
  });

  const pathname = usePathname();
  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenis]);

  return (
    <ScrollContext.Provider value={{ scrollY, lenis }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const LenisProvider = ({ children }: ScrollProviderProps) => {
  return (
    <ReactLenis root>
      <ScrollContextProvider>
        {children}
      </ScrollContextProvider>
    </ReactLenis>
  );
};
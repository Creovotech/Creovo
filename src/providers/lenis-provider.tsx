"use client";

import { ReactLenis } from 'lenis/react';
import { useLenis } from 'lenis/react';
import { createContext, ReactNode, useState } from "react";

interface ScrollValue {
  scrollY: number;
}

export const ScrollContext = createContext<ScrollValue>({
  scrollY: 0,
});

interface ScrollProviderProps {
  children: ReactNode;
}

const ScrollContextProvider = ({ children }: ScrollProviderProps) => {
  const [scrollY, setScrollY] = useState(0);

  useLenis(({ scroll }: { scroll: number }) => {
    setScrollY(scroll);
  });

  return (
    <ScrollContext.Provider value={{ scrollY }}>
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
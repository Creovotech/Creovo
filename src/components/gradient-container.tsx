'use client';

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion';
import React, { CSSProperties, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export const GradientContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });

  const limitedScrollYProgress = useTransform(
    scrollYProgress,
    [0, 0.5],
    [0, 1]
  );

  const [percentage, setPercentage] = useState(0);

  useMotionValueEvent(limitedScrollYProgress, 'change', (latest) => {
    const newPercentage = Math.min(
      100,
      Math.max(0, (latest - 0.1) * (100 / 0.9))
    );
    setPercentage(newPercentage);
  });

  return (
    <div
      ref={ref}
      style={
        {
          '--top': 'rgba(97, 106, 115, .12)',
          '--bottom': 'transparent',
          '--conic-size': '600px',
        } as CSSProperties
      }
      className={cn('relative overflow-hidden', className)}
    >
      <motion.div
        id="gradient-overlay"
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: `conic-gradient(from 90deg at ${100 - percentage
            }% 0%, var(--top), var(--bottom) 180deg) 0% 0% / 50% 100% no-repeat,
                      conic-gradient(from 270deg at ${percentage}% 0%, var(--bottom) 180deg, var(--top)) 100% 0% / 50% 100% no-repeat`,
          opacity: 0.9,
        }}
      />

      <div id="bottom-fade"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 z-1 
                   bg-linear-to-b from-transparent to-black"
      />

      <div id="content" className="relative z-10">
        {children}
      </div>
    </div>
  );
};

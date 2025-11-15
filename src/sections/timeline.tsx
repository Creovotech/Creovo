'use client';

import { IconRocket } from '@tabler/icons-react';
import { Milestone } from 'lucide-react';
import { motion, useMotionValueEvent } from 'framer-motion';
import { useScroll } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { StickyScroll } from '@/components/ui/sticky-scroll';
import { Heading } from '@/components/elements/heading';
import { Subheading } from '@/components/elements/subheading';
import { TIMELINE_DATA } from '@/constants/items';
import { FeatureIconContainer } from '@/sections/features/feature-icon-container';

export const TimeLine = () => {
  const { heading, sub_heading, launches } = TIMELINE_DATA;
  const launchesWithDecoration = launches.map((entry: { mission_number: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; }) => ({
    ...entry,
    icon: <IconRocket className="h-8 w-8 text-secondary" />,
    content: (
      <p className="text-4xl md:text-7xl font-bold text-neutral-800">
        {entry.mission_number}
      </p>
    ),
  }));

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const backgrounds = ['var(--charcoal)', 'var(--zinc-900)'];

  const [gradient, setGradient] = useState(backgrounds[0]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const cardsBreakpoints = launches.map(
      (_: any, index: number) => index / launches.length
    );
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc: string | number, breakpoint: number, index: any) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setGradient(backgrounds[closestBreakpointIndex % backgrounds.length]);
  });
  return (
    <motion.div
      animate={{
        background: gradient,
      }}
      transition={{
        duration: 0.5,
      }}
      ref={ref}
      id='TimeLine'
      className="w-full relative h-full pt-20 md:pt-40"
    >
      <div className="px-6">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.2, y: -5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 10 }}
          >
            <Milestone className="h-6 w-6 text-white" />
          </motion.div>
        </FeatureIconContainer>
        <Heading className="mt-4">{heading}</Heading>
        <Subheading>{sub_heading}</Subheading>
      </div>
      <StickyScroll content={launchesWithDecoration} />
    </motion.div>
  );
};
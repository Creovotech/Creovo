'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { Layers } from 'lucide-react';
import { FeatureIconContainer } from '@/sections/features/feature-icon-container';
import { Heading } from '@/components/elements/heading';
import { Subheading } from '@/components/elements/subheading';

const DATA = {
  heading: "Our Tech Stack",
  sub_heading: "We utilize a robust ecosystem of modern technologies to build scalable, high-performance applications tailored to your needs."
};

const ICONS = {
  NextJS: (props) => (
    <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <mask id="mask0_next" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
        <circle cx="90" cy="90" r="90" fill="black" />
      </mask>
      <g mask="url(#mask0_next)">
        <circle cx="90" cy="90" r="90" fill="black" />
        <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#paint0_linear_next)" />
        <rect x="115" y="54" width="12" height="72" fill="url(#paint1_linear_next)" />
      </g>
      <defs>
        <linearGradient id="paint0_linear_next" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="paint1_linear_next" x1="121" y1="54" x2="120.791" y2="72" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  ),
  React: (props) => (
    <svg viewBox="-11.5 -10.23174 23 20.46348" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
      <g stroke="#61dafb" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),
  TypeScript: (props) => (
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect width="128" height="128" rx="15" fill="#3178C6" />
      <path d="M72.3 92.3c-3.3 2.3-7.5 4-12.6 4-11.6 0-16.7-7.2-16.7-19 0-15.3 9.3-21.3 22.4-21.3 3.8 0 7.6.8 9.8 1.8l-1.8 9.3c-2-1-5-1.8-8-1.8-7.3 0-10 4-10 11.8 0 7.5 2.5 11 9 11 3 0 5.3-.8 7-1.8l.9 9zm35.5-3.5c-4 4.5-9.3 7.5-16.5 7.5-12.8 0-19-9.3-19-23s7.3-23.3 20.5-23.3c6 0 11 2.3 14 5.3l-6 7.8c-2-2-5-3.3-8-3.3-6.5 0-9.3 4.3-9.3 13 0 8 3.3 13.3 9.5 13.3 3 0 5.8-1.3 8.5-3.8l6.3 6.5z" fill="white" />
    </svg>
  ),
  Tailwind: (props) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" fill="#38BDF8" />
    </svg>
  ),
  NodeJS: (props) => (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M16 0l-14 8v16l14 8 14-8v-16l-14-8zM24.915 17.978l-0.023 6.176-8.863 5.147-8.93-5.125 0.013-11.153 9.66-5.615v5.393l-4.795 2.765v2.908l4.803-2.763 4.845 2.773-0.020 2.87-4.823-2.742v5.65l4.283 2.468 4.25-2.475v-6.278z" fill="#339933" />
    </svg>
  ),
  AWS: (props) => (
    <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M17.032 12.503c.742-.264 1.485-.528 2.457-.594v-2.31c-1.085.066-1.885.33-2.628.66-.628.264-1.2.66-1.714 1.122V7.058h-2.571v10.098h2.514v-.594c.686.462 1.428.858 2.343 1.056 1.657.33 3.2-.198 4.057-1.452.571-.792.743-1.914.743-3.366v-5.742h-2.572v2.508c0 1.254.058 2.112-.629 2.904zM13.375 7.058h-2.514v10.098h2.514V7.058zm-5.2 5.445c-.743-.264-1.486-.528-2.457-.594v-2.31c1.085.066 1.885.33 2.628.66.628.264 1.2.66 1.714 1.122V7.058H7.488v10.098h2.514v-.594c-.685.462-1.428.858-2.342 1.056-1.657.33-3.2-.198-4.057-1.452C3.032 15.374 2.86 14.252 2.86 12.8V7.058H5.43v2.508c0 1.254-.057 2.112.629 2.904z" fill="#FF9900" />
    </svg>
  ),
  Docker: (props) => (
    <svg viewBox="0 0 24 24" fill="#2496ED" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.119a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m0 2.716h2.119a.186.186 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.119a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.185m-2.953 2.714h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m5.906-2.714h2.119a.186.186 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.119a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.185m-8.859 2.714h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186H5.123a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.955 0h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186H2.168a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m14.762 0h2.12c.102 0 .185-.083.185-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185M23.686 11.97c-.044-.333-.203-.626-.433-.843l-.135-.063a.176.176 0 00-.065-.012c-.066 0-.127.033-.163.086a8.71 8.71 0 00-.456.764c-.56.068-1.13.073-1.437.068-.973-.017-2.642-.088-3.932-1.873a.183.183 0 00-.15-.075h-2.89a.184.184 0 00-.186.185v1.672c0 2.216 1.796 4.012 4.011 4.012 2.215 0 4.012-1.796 4.012-4.012l.004-.696c1.594.258 1.814 1.043 1.832 1.125-.271 1.646-1.413 2.867-2.806 2.867-.607 0-1.178-.232-1.634-.616a.185.185 0 00-.274.038.186.186 0 00.037.275c.555.469 1.254.753 1.997.753 1.637 0 2.988-1.408 3.326-3.392.38-.21.669-.578.774-.997" />
    </svg>
  ),
  PostgreSQL: (props) => (
    <svg viewBox="0 0 24 24" fill="#336791" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S16.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" fillOpacity="0.2" />
      <path d="M12.85 9.35l-1.5-1.5-1.5 1.5 1.5 1.5 1.5-1.5zm-1.5 3l-1.5 1.5 1.5 1.5 1.5-1.5-1.5-1.5z" fill="white" />
    </svg>
  )
};

const SCROLL_ITEMS = [
  { name: 'Next.js', icon: ICONS.NextJS },
  { name: 'React', icon: ICONS.React },
  { name: 'TypeScript', icon: ICONS.TypeScript },
  { name: 'Tailwind', icon: ICONS.Tailwind },
  { name: 'Node.js', icon: ICONS.NodeJS },
  { name: 'AWS', icon: ICONS.AWS },
  { name: 'Docker', icon: ICONS.Docker },
  { name: 'PostgreSQL', icon: ICONS.PostgreSQL },
  { name: 'Next.js', icon: ICONS.NextJS },
  { name: 'React', icon: ICONS.React },
  { name: 'TypeScript', icon: ICONS.TypeScript },
  { name: 'Tailwind', icon: ICONS.Tailwind },
];

export const TechStacks = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const backgrounds = ['var(--charcoal)', 'var(--zinc-900)'];
  const [gradient, setGradient] = useState(backgrounds[0]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const steps = 10;
    const cardsBreakpoints = Array.from({ length: steps }, (_, i) => i / steps);

    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
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
      id='TechStacks'
      className="w-full relative h-full pt-20 md:pt-40 overflow-hidden"
    >


      {/* Content Area (Replacing StickyScroll with Tech Marquee) */}
      <div className="mt-16 md:mt-24 relative w-full pb-20 md:pb-40">

        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[var(--charcoal,black)] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[var(--charcoal,black)] to-transparent z-20 pointer-events-none" />

        <div className="flex overflow-hidden group">
          {/* First Loop */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
            className="flex gap-6 md:gap-10 pr-6 md:pr-10 shrink-0 group-hover:[animation-play-state:paused]"
          >
            {SCROLL_ITEMS.map((item, idx) => (
              <TechCard key={`1-${idx}`} item={item} />
            ))}
          </motion.div>

          {/* Second Loop */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
            className="flex gap-6 md:gap-10 pr-6 md:pr-10 shrink-0 group-hover:[animation-play-state:paused]"
          >
            {SCROLL_ITEMS.map((item, idx) => (
              <TechCard key={`2-${idx}`} item={item} />
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const TechCard = ({ item }) => {
  const Icon = item.icon;
  return (
    <div className="group relative flex flex-col items-center justify-center gap-4 w-32 h-32 md:w-40 md:h-40 bg-neutral-900/30 border border-neutral-800 rounded-2xl hover:bg-neutral-800/50 hover:border-neutral-700 transition-all duration-300 cursor-default backdrop-blur-sm">
      <Icon className="w-10 h-10 md:w-14 md:h-14 text-neutral-400 group-hover:text-white group-hover:scale-110 transition-all duration-300" />
      <span className="text-xs md:text-sm font-medium text-neutral-500 group-hover:text-neutral-200 transition-colors duration-300">
        {item.name}
      </span>
    </div>
  );
};
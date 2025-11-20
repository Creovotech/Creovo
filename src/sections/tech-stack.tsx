'use client';

import { motion } from 'framer-motion';
import { Code } from 'lucide-react';
import { FeatureIconContainer } from './features/feature-icon-container';
import { GradientContainer } from '@/components/gradient-container';

// Simulating the external constants and components to ensure the file is self-contained
const TECHSTACK_ITEMS = {
  heading: 'Our Engineering Arsenal',
  sub_heading:
    'We leverage a curated stack of battle-tested frameworks and cutting-edge AI infrastructure to build scalable, secure solutions.',
};

const Heading = ({ children, className = '' }) => (
  <h2
    className={`text-3xl md:text-5xl font-bold text-center text-white ${className}`}
  >
    {children}
  </h2>
);

const Subheading = ({ children, className = '' }) => (
  <p className={`text-lg text-center text-neutral-400 mt-4 ${className}`}>
    {children}
  </p>
);

// High-quality SVG Icons for the Tech Stack
const ICONS = {
  NextJS: (props) => (
    <svg
      viewBox="0 0 180 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="mask0_next"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="180"
        height="180"
      >
        <circle cx="90" cy="90" r="90" fill="black" />
      </mask>
      <g mask="url(#mask0_next)">
        <circle cx="90" cy="90" r="90" fill="black" />
        <path
          d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
          fill="url(#paint0_linear_next)"
        />
        <rect
          x="115"
          y="54"
          width="12"
          height="72"
          fill="url(#paint1_linear_next)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_next"
          x1="109"
          y1="116.5"
          x2="144.5"
          y2="160.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_next"
          x1="121"
          y1="54"
          x2="120.791"
          y2="72"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  ),
  React: (props) => (
    <svg
      viewBox="-11.5 -10.23174 23 20.46348"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
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
      <path
        d="M72.3 92.3c-3.3 2.3-7.5 4-12.6 4-11.6 0-16.7-7.2-16.7-19 0-15.3 9.3-21.3 22.4-21.3 3.8 0 7.6.8 9.8 1.8l-1.8 9.3c-2-1-5-1.8-8-1.8-7.3 0-10 4-10 11.8 0 7.5 2.5 11 9 11 3 0 5.3-.8 7-1.8l.9 9zm35.5-3.5c-4 4.5-9.3 7.5-16.5 7.5-12.8 0-19-9.3-19-23s7.3-23.3 20.5-23.3c6 0 11 2.3 14 5.3l-6 7.8c-2-2-5-3.3-8-3.3-6.5 0-9.3 4.3-9.3 13 0 8 3.3 13.3 9.5 13.3 3 0 5.8-1.3 8.5-3.8l6.3 6.5z"
        fill="white"
      />
    </svg>
  ),
  Tailwind: (props) => (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"
        fill="#38BDF8"
      />
    </svg>
  ),
  NodeJS: (props) => (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M16 0l-14 8v16l14 8 14-8v-16l-14-8zM24.915 17.978l-0.023 6.176-8.863 5.147-8.93-5.125 0.013-11.153 9.66-5.615v5.393l-4.795 2.765v2.908l4.803-2.763 4.845 2.773-0.020 2.87-4.823-2.742v5.65l4.283 2.468 4.25-2.475v-6.278z"
        fill="#339933"
      />
    </svg>
  ),
  PostgreSQL: (props) => (
    <svg
      viewBox="0 0 24 24"
      fill="#336791"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S16.627 0 12 0zm0 22c-5.523 0-10-4.477-10-10S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"
        fillOpacity="0.2"
      />
      <path
        d="M12.85 9.35l-1.5-1.5-1.5 1.5 1.5 1.5 1.5-1.5zm-1.5 3l-1.5 1.5 1.5 1.5 1.5-1.5-1.5-1.5z"
        fill="white"
      />
    </svg>
  ),

  // --- Cloud / DevOps icons you requested only ---

  AWS: (props) => (
    <svg
      viewBox="0 0 24 24"
      fill="white"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="24" height="24" rx="5" fill="#232F3E" />
      <path
        d="M6.5 15.5c.7.7 1.7 1.1 2.9 1.1 2.3 0 3.7-1.4 3.7-3.9V7.5h-2.1V12c0 1.3-.7 2-1.7 2-1.1 0-1.7-.7-1.7-2V7.5H5.5V12c0 1.7.4 2.8 1 3.5zM13.5 7.5V16h2v-2.7l1.7 2.7h2.4l-2.4-3.4 2.2-3.1H17L15.5 11V7.5h-2z"
        fill="white"
      />
      <path
        d="M5 18.5c1.7.8 3.7 1.2 5.8 1.2 2.9 0 5.5-.7 7.7-2"
        stroke="#FF9900"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  ),

  Docker: (props) => (
    <svg
      viewBox="0 0 24 24"
      fill="#2496ED"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="24" height="24" rx="5" fill="#0B2436" />
      <path
        d="M4 14.5c.3 1.9 1.9 3.4 4.4 3.4h5.2c3.2 0 4.7-2 4.9-3.4.1-.6-.2-1.1-.8-1.1-.6 0-1.4.1-2.1.1-1.1 0-2-.2-2.7-.6-.5-.3-.9-.7-1.2-1.2H4v2.8z"
        fill="#2496ED"
      />
      <path
        d="M6.5 9.5h2v2h-2v-2zm2.5 0h2v2h-2v-2zm2.5 0h2v2h-2v-2zm2.5 0h2v2h-2v-2zm-5 2.5h2v2h-2v-2zm2.5 0h2v2h-2v-2zm2.5 0h2v2h-2v-2z"
        fill="#2496ED"
      />
    </svg>
  ),

  Vercel: (props) => (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="32" height="32" rx="6" fill="black" />
      <polygon points="16,7 25,23 7,23" fill="white" />
    </svg>
  ),

  Hostinger: (props) => (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="32" height="32" rx="6" fill="#673DE6" />
      <path
        d="M10 8l4 2.5v4L10 12v-4zm8 0l4 2.5v4L18 12v-4zM14 17.5v4L10 24v-4l4-2.5zm4 0v4l4 2.5v-4l-4-2.5z"
        fill="white"
      />
    </svg>
  ),

  GCP: (props) => (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="16" cy="16" r="15" fill="#1A73E8" />
      <path
        d="M11 21a5 5 0 119.9-1h-2.2a3 3 0 10-5.5 1H11z"
        fill="white"
        opacity="0.95"
      />
    </svg>
  ),

  Azure: (props) => (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="32" height="32" rx="6" fill="#0078D4" />
      <polygon points="8,24 15,6 18,11 11,24" fill="white" />
      <polygon points="18,11 24,24 14,24" fill="#50E6FF" />
    </svg>
  ),

  DigitalOcean: (props) => (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="32" height="32" rx="8" fill="#0080FF" />
      <circle cx="16" cy="14" r="7" fill="white" />
      <circle cx="16" cy="14" r="4" fill="#0080FF" />
      <rect x="14" y="20" width="4" height="4" rx="1" fill="white" />
      <rect x="11" y="23" width="3" height="3" rx="1" fill="white" />
    </svg>
  ),

  Jenkins: (props) => (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="32" height="32" rx="8" fill="#D33833" />
      <circle cx="16" cy="13" r="5" fill="#F8F8F8" />
      <path
        d="M11 23c.6-2 2.5-3.5 5-3.5s4.4 1.5 5 3.5"
        stroke="#F8F8F8"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M15 11.5h2l-.5 1.5h-1z"
        fill="#D33833"
      />
    </svg>
  ),

  RabbitMQ: (props) => (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="32" height="32" rx="6" fill="#FF6600" />
      <rect x="8" y="9" width="4" height="10" rx="1" fill="#FFEFE5" />
      <rect x="14" y="9" width="4" height="10" rx="1" fill="#FFEFE5" />
      <rect x="20" y="15" width="4" height="4" rx="1" fill="#FFEFE5" />
    </svg>
  ),

  Kafka: (props) => (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="32" height="32" rx="6" fill="#000000" />
      <circle cx="16" cy="16" r="3" stroke="white" strokeWidth="2" />
      <circle cx="10" cy="12" r="2.2" stroke="white" strokeWidth="2" />
      <circle cx="22" cy="12" r="2.2" stroke="white" strokeWidth="2" />
      <circle cx="10" cy="20" r="2.2" stroke="white" strokeWidth="2" />
      <circle cx="22" cy="20" r="2.2" stroke="white" strokeWidth="2" />
      <path
        d="M12 13.5l2.7 1.8M20 13.5l-2.7 1.8M12 18.5l2.7-1.8M20 18.5l-2.7-1.8"
        stroke="white"
        strokeWidth="1.5"
      />
    </svg>
  ),

  Kubernetes: (props) => (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="16" cy="16" r="15" fill="#326CE5" />
      <polygon
        points="16,6 9,11 11,22 16,26 21,22 23,11"
        fill="white"
        opacity="0.9"
      />
      <circle cx="16" cy="16" r="2" fill="#326CE5" />
    </svg>
  ),

  Redis: (props) => (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="32" height="32" rx="6" fill="#DC382D" />
      <rect x="7" y="9" width="18" height="4" rx="1" fill="#F5F5F5" />
      <rect x="7" y="15" width="18" height="4" rx="1" fill="#F5F5F5" />
      <rect x="7" y="21" width="18" height="4" rx="1" fill="#F5F5F5" />
    </svg>
  ),
};

// Top row: core/product stack (NO cloud/devops here)
const PRIMARY_SCROLL_ITEMS = [
  { name: 'Next.js', icon: ICONS.NextJS },
  { name: 'React', icon: ICONS.React },
  { name: 'TypeScript', icon: ICONS.TypeScript },
  { name: 'Tailwind', icon: ICONS.Tailwind },
  { name: 'Node.js', icon: ICONS.NodeJS },
  { name: 'PostgreSQL', icon: ICONS.PostgreSQL },
  // Duplicates for smoother loop
  { name: 'Next.js', icon: ICONS.NextJS },
  { name: 'React', icon: ICONS.React },
  { name: 'TypeScript', icon: ICONS.TypeScript },
  { name: 'Tailwind', icon: ICONS.Tailwind },
];

// Bottom row: ONLY the requested cloud/devops stack
const CLOUD_SCROLL_ITEMS = [
  { name: 'Docker', icon: ICONS.Docker },
  { name: 'AWS', icon: ICONS.AWS },
  { name: 'Vercel', icon: ICONS.Vercel },
  { name: 'Hostinger', icon: ICONS.Hostinger },
  { name: 'GCP', icon: ICONS.GCP },
  { name: 'Azure', icon: ICONS.Azure },
  { name: 'DigitalOcean', icon: ICONS.DigitalOcean },
  { name: 'Jenkins', icon: ICONS.Jenkins },
  { name: 'RabbitMQ', icon: ICONS.RabbitMQ },
  { name: 'Kafka', icon: ICONS.Kafka },
  { name: 'Kubernetes', icon: ICONS.Kubernetes },
  { name: 'Redis', icon: ICONS.Redis },
  // Duplicates for smooth loop
  { name: 'Docker', icon: ICONS.Docker },
  { name: 'AWS', icon: ICONS.AWS },
];

export const TechStacks = () => {
  return (
    <div className="relative z-20 py-12 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
                  <motion.div
                    whileHover={{ scale: 1.2, y: -5 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                  >
                    <Code className="h-6 w-6 text-white" />
                  </motion.div>
                </FeatureIconContainer>
        <Heading className="pt-4">{TECHSTACK_ITEMS.heading}</Heading>
        <Subheading className="max-w-3xl mx-auto mt-4">
          {TECHSTACK_ITEMS.sub_heading}
        </Subheading>
      </div>

      {/* Top row: product / core stack (right → left) */}
      <div className="mt-16 md:mt-24 relative w-full">
        {/* Gradient Masks for Fade Effect */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-black/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-black/80 to-transparent z-20 pointer-events-none" />

        <div className="flex overflow-hidden group">
          {/* First Loop */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: '-100%' }}
            transition={{
              duration: 30,
              ease: 'linear',
              repeat: Infinity,
            }}
            className="flex gap-8 md:gap-20 pr-8 md:pr-20 shrink-0"
          >
            {PRIMARY_SCROLL_ITEMS.map((item, idx) => (
              <TechItem key={`top-1-${idx}`} item={item} />
            ))}
          </motion.div>

          {/* Second Loop */}
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: '-100%' }}
            transition={{
              duration: 30,
              ease: 'linear',
              repeat: Infinity,
            }}
            className="flex gap-8 md:gap-20 pr-8 md:pr-20 shrink-0"
          >
            {PRIMARY_SCROLL_ITEMS.map((item, idx) => (
              <TechItem key={`top-2-${idx}`} item={item} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom row: cloud / DevOps stack (visually left → right) */}
      <div className="mt-10 relative w-full">
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-black/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-black/80 to-transparent z-20 pointer-events-none" />

        {/* Flip the row horizontally so motion scroll is -x but looks left → right */}
        <div className="flex overflow-hidden group [transform:scaleX(-1)]">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: '-100%' }}
            transition={{
              duration: 32,
              ease: 'linear',
              repeat: Infinity,
            }}
            className="flex gap-8 md:gap-20 pr-8 md:pr-20 shrink-0"
          >
            {CLOUD_SCROLL_ITEMS.map((item, idx) => (
              <div key={`cloud-1-${idx}`} className="[transform:scaleX(-1)]">
                <TechItem item={item} />
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ x: 0 }}
            animate={{ x: '-100%' }}
            transition={{
              duration: 32,
              ease: 'linear',
              repeat: Infinity,
            }}
            className="flex gap-8 md:gap-20 pr-8 md:pr-20 shrink-0"
          >
            {CLOUD_SCROLL_ITEMS.map((item, idx) => (
              <div key={`cloud-2-${idx}`} className="[transform:scaleX(-1)]">
                <TechItem item={item} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const TechItem = ({ item }) => {
  const Icon = item.icon;
  return (
    <div className="relative group flex flex-col items-center justify-center gap-4">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-white/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Smaller container & icon size */}
      <div className="relative w-14 h-14 md:w-20 md:h-20 flex items-center justify-center bg-neutral-900/50 border border-white/10 rounded-2xl backdrop-blur-sm hover:border-white/30 hover:bg-neutral-800/50 transition-all duration-300 cursor-default">
        <Icon className="w-7 h-7 md:w-10 md:h-10 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
      </div>

      <span className="text-xs md:text-sm font-medium text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -bottom-7 md:-bottom-8">
        {item.name}
      </span>
    </div>
  );
};

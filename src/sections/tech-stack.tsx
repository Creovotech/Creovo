'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code } from 'lucide-react';
import { Container } from '@/components/container';
import { Heading } from '@/components/elements/heading';
import { Subheading } from '@/components/elements/subheading';
import { AmbientColor } from '@/components/decorations/ambient-color';
import { ICONS } from '@/components/icons/tech-stacks';
import { TechItemData, TechItemProps } from '@/types';

const PRIMARY_SCROLL_ITEMS: TechItemData[] = [
  { name: 'Next.js', icon: ICONS.NextJS },
  { name: 'React', icon: ICONS.React },
  { name: 'TypeScript', icon: ICONS.TypeScript },
  { name: 'Tailwind', icon: ICONS.Tailwind },
  { name: 'Node.js', icon: ICONS.NodeJS },
  { name: 'PostgreSQL', icon: ICONS.PostgreSQL },
  { name: 'Next.js', icon: ICONS.NextJS },
  { name: 'React', icon: ICONS.React },
  { name: 'TypeScript', icon: ICONS.TypeScript },
  { name: 'Tailwind', icon: ICONS.Tailwind },
];

const CLOUD_SCROLL_ITEMS: TechItemData[] = [
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
  { name: 'Docker', icon: ICONS.Docker },
  { name: 'AWS', icon: ICONS.AWS },
];

const TechItem = ({ item }: TechItemProps) => {
  const Icon = item.icon;
  return (
    <div className="relative group flex flex-col items-center justify-center gap-4">
      <div className="relative w-14 h-14 md:w-20 md:h-20 flex items-center justify-center bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-zinc-700 hover:bg-zinc-800/80 transition-all duration-300 cursor-default shadow-sm hover:shadow-md hover:shadow-zinc-900/50">
        <Icon className="w-7 h-7 md:w-10 md:h-10 opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
      </div>
      <span className="text-xs md:text-sm font-medium text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute -bottom-7 md:-bottom-8 whitespace-nowrap">
        {item.name}
      </span>
    </div>
  );
};

export const TechStacks = () => {
  return (
    <div id="TechStacks" className="relative z-20 py-24 md:py-32 overflow-hidden bg-zinc-950">
      <AmbientColor />
      <Container className="relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center p-3 mb-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl backdrop-blur-sm"
        >
          <Code className="h-6 w-6 text-zinc-200" />
        </motion.div>
        
        <Heading className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Our Engineering Arsenal
        </Heading>
        
        <Subheading className="max-w-2xl mx-auto text-lg text-zinc-400">
          We leverage a curated stack of battle-tested frameworks and cutting-edge AI infrastructure to build scalable, secure solutions.
        </Subheading>
      </Container>

      <div id="scroll-container" className="mt-16 md:mt-24 w-full max-w-[90%] md:max-w-[70%] mx-auto relative">
        
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-linear-to-r from-zinc-950 to-transparent z-20 pointer-events-none rounded-l-xl" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-linear-to-l from-zinc-950 to-transparent z-20 pointer-events-none rounded-r-xl" />

        <div className="flex flex-col gap-10">
          
          <div id="primary-scroll" className="flex overflow-hidden group">
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: '-100%' }}
              transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
              className="flex gap-8 md:gap-12 pr-8 md:pr-12 shrink-0"
            >
              {PRIMARY_SCROLL_ITEMS.map((item, idx) => (
                <TechItem key={`top-1-${idx}`} item={item} />
              ))}
            </motion.div>

            <motion.div
              initial={{ x: 0 }}
              animate={{ x: '-100%' }}
              transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
              className="flex gap-8 md:gap-12 pr-8 md:pr-12 shrink-0"
            >
              {PRIMARY_SCROLL_ITEMS.map((item, idx) => (
                <TechItem key={`top-2-${idx}`} item={item} />
              ))}
            </motion.div>
          </div>

          <div id="cloud-scroll" className="flex overflow-hidden group">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              transition={{ duration: 45, ease: 'linear', repeat: Infinity }}
              className="flex gap-8 md:gap-12 pr-8 md:pr-12 shrink-0 flex-row-reverse"
            >
              {CLOUD_SCROLL_ITEMS.map((item, idx) => (
                <TechItem key={`cloud-1-${idx}`} item={item} />
              ))}
            </motion.div>

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              transition={{ duration: 45, ease: 'linear', repeat: Infinity }}
              className="flex gap-8 md:gap-12 pr-8 md:pr-12 shrink-0 flex-row-reverse"
            >
              {CLOUD_SCROLL_ITEMS.map((item, idx) => (
                <TechItem key={`cloud-2-${idx}`} item={item} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
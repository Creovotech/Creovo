'use client';

import { Cover } from '@/components/decorations/cover';
import ShootingStars from '@/components/decorations/shooting-star';
import StarBackground from '@/components/decorations/star-background';
import { Heading } from '@/components/elements/heading';
import { Subheading } from '@/components/elements/subheading';
import { HERO_ITEMS } from '@/constants/items';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { renderCanvas } from '@/components/decorations/render-canvas';

export const Hero = () => {
  useEffect(() => {
    renderCanvas();
  }, []);

  return (
    <div className="h-screen overflow-hidden relative flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <StarBackground />
        <ShootingStars />
      </motion.div>
      <Heading
        as="h1"
        className="text-4xl md:text-4xl lg:text-8xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-10  py-6"
      >
        {HERO_ITEMS.heading.substring(0, HERO_ITEMS.heading.lastIndexOf(' '))}{' '}
        <Cover>{HERO_ITEMS.heading.split(' ').pop()}</Cover>
      </Heading>
      <Subheading className="text-center mt-2 md:mt-6 text-base md:text-xl text-muted  max-w-3xl mx-auto relative z-10">
        {HERO_ITEMS.sub_heading}
      </Subheading>
      <div className="flex space-x-2 items-center mt-8">
        {/* {CTAs &&
          CTAs.map((cta) => (
            <Button
              key={cta?.id}
              as={Link}
              href={`/${locale}${cta.URL}`}
              {...(cta.variant && { variant: cta.variant })}
            >
              {cta.text}
            </Button>
          ))} */}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-80 w-full bg-linear-to-t from-charcoal to-transparent" />
      <canvas
        className="bg-skin-base pointer-events-none absolute inset-0"
        id="canvas"
      ></canvas>
    </div>
  );
};

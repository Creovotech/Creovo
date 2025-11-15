'use client';

import { Cover } from '@/components/decorations/cover';
import ShootingStars from '@/components/decorations/shooting-star';
import StarBackground from '@/components/decorations/star-background';
import { Heading } from '@/components/elements/heading';
import { Subheading } from '@/components/elements/subheading';
import { HERO_ITEMS } from '@/constants/items';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { renderCanvas } from '@/components/decorations/render-canvas';
import { Button } from '@/components/ui/button';
import { BookCallModal } from '@/components/modals/BookCallModal';
import { CostEstimatorModal } from '@/components/modals/CostEstimatorModal';
import { TypingSubheading } from '@/components/elements/TypingSubheading';
import { ArchitectureFlowCanvas } from '@/components/ui/ArchitectureCanvasFlow';

export const Hero = () => {
  const [bookCallOpen, setBookCallOpen] = useState(false);
  const [costModalOpen, setCostModalOpen] = useState(false);

  useEffect(() => {
    renderCanvas();
  }, []);

  return (
    <div className="h-screen overflow-hidden relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="pointer-events-none absolute inset-0"
      >
        <StarBackground />
        <ShootingStars />
      </motion.div>

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center gap-10 px-4 md:flex-row md:items-center md:justify-between">
        {/* left side */}
        <div className="flex-1 max-w-xl text-center md:text-left">
          <Heading
            as="h1"
            className="text-4xl md:text-5xl lg:text-7xl font-semibold mt-6
                       bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
                       bg-[size:200%_auto] bg-clip-text text-transparent
                       animate-gradient"
          >
            {HERO_ITEMS.heading}
          </Heading>

          <div className="mt-4">
            <TypingSubheading text={HERO_ITEMS.sub_heading} />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <Button size="lg" onClick={() => setBookCallOpen(true)}>
              Book a call
            </Button>
            <Button
              style={{ color: 'black' }}
              size="lg"
              variant="secondary"
              onClick={() => setCostModalOpen(true)}
            >
              Estimate cost
            </Button>
          </div>
        </div>

        {/* right side: bigger, transparent architecture */}
        <div className="flex-1 w-full md:w-[52%] max-w-2xl">
          <ArchitectureFlowCanvas />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-80 w-full bg-linear-to-t from-charcoal to-transparent pointer-events-none" />
      <canvas
        className="bg-skin-base pointer-events-none absolute inset-0"
        id="canvas"
      ></canvas>

      <BookCallModal open={bookCallOpen} onOpenChange={setBookCallOpen} />
      <CostEstimatorModal open={costModalOpen} onOpenChange={setCostModalOpen} />
    </div>
  );
};
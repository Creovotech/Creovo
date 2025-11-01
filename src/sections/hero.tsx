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

// shadcn/ui
import { Button } from '@/components/ui/button';

// new modals
import { BookCallModal } from '@/components/modals/BookCallModal';
import { CostEstimatorModal } from '@/components/modals/CostEstimatorModal';
import { TypingSubheading } from '@/components/elements/TypingSubheading';

export const Hero = () => {
  const [bookCallOpen, setBookCallOpen] = useState(false);
  const [costModalOpen, setCostModalOpen] = useState(false);

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
        className="text-4xl md:text-4xl lg:text-8xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-10 py-6
                  /* --- Add these classes --- */
                  bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
                  bg-[size:200%_auto]
                  bg-clip-text
                  text-transparent
                  animate-gradient
                  /* ------------------------- */
                  "
      >
        {HERO_ITEMS.heading}
      </Heading>

      <TypingSubheading text={HERO_ITEMS.sub_heading} />

      <div className="flex gap-3 items-center mt-8 relative z-10">
        <Button size="lg" onClick={() => setBookCallOpen(true)}>
          Book a call
        </Button>
        <Button style={{"color":"black"}} size="lg" variant="secondary" onClick={() => setCostModalOpen(true)}>
          Estimate cost
        </Button>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-80 w-full bg-linear-to-t from-charcoal to-transparent" />
      <canvas
        className="bg-skin-base pointer-events-none absolute inset-0"
        id="canvas"
      ></canvas>

      {/* Modals */}
      <BookCallModal open={bookCallOpen} onOpenChange={setBookCallOpen} />
      <CostEstimatorModal open={costModalOpen} onOpenChange={setCostModalOpen} />
    </div>
  );
};

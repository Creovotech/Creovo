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

      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center justify-center px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8 md:gap-12">
          {/* Left side - Content centered vertically */}
          <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left max-w-xl">
            <Heading
              as="h1"
              className="text-4xl md:text-5xl lg:text-7xl font-semibold
                         bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
                         bg-[size:200%_auto] bg-clip-text text-transparent
                         animate-gradient"
            >
              {HERO_ITEMS.heading}
            </Heading>

            <div className="mt-4 w-full">
              <TypingSubheading text={HERO_ITEMS.sub_heading} />
            </div>

            <div className="mt-8 flex justify-center items-center w-full">
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

          {/* Right side - Architecture Flow */}
          <div className="flex-1 flex items-center justify-center w-full md:scale-100 lg:scale-125">
            <ArchitectureFlowCanvas />
          </div>
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
<div className='flex justify-around '>
  <div className='flex-col justify-center items-center gap-2'>
    <div className='flex justify-center'>Creovo</div>
    <div className='flex justify-center'>Subheading</div>
    <div className='flex gap-4 mt-4 justify-center items-center'>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
    </div>
  </div>
  <div>
    <ArchitectureFlowCanvas />
  </div>
</div>
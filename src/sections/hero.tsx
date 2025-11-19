'use client';

import { Cover } from '@/components/decorations/cover';
import ShootingStars from '@/components/decorations/shooting-star';
import StarBackground from '@/components/decorations/star-background';
import { Heading } from '@/components/elements/heading';
import { HERO_ITEMS } from '@/constants/items';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BookCallModal } from '@/components/modals/BookCallModal';
import { CostEstimatorModal } from '@/components/modals/CostEstimatorModal';
import { TypingSubheading } from '@/components/elements/TypingSubheading';
import { ArchitectureFlowCanvas } from '@/components/ui/ArchitectureCanvasFlow';
import { useRouter } from 'next/navigation';

export const Hero = () => {
  const [bookCallOpen, setBookCallOpen] = useState(false);
  const [costModalOpen, setCostModalOpen] = useState(false);
  const router = useRouter();

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
        <div className="grid w-full grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
          {/* Left side - Content */}
          <div className="flex flex-col justify-center items-center text-center md:items-start md:text-left">
            <Heading
              as="h1"
              className="text-4xl font-semibold md:text-5xl lg:text-7xl
                         bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
                         bg-[size:200%_auto] bg-clip-text text-transparent
                         animate-gradient"
            >
              {HERO_ITEMS.heading}
            </Heading>

            <div className="mt-4 w-full">
              <TypingSubheading text={HERO_ITEMS.sub_heading} />
            </div>

            <div className="mt-8 flex gap-4">
              <Button size="lg" onClick={() => router.push('https://calendly.com/creovotech/30min')}>
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

          {/* Right side - Architecture Flow with Fade */}
          <div className="relative h-[600px] w-full md:h-[700px]">
            <div className="absolute inset-0 [mask-image:linear-gradient(to_right,transparent_0%,black_20%,black_80%,transparent_100%)]">
              <ArchitectureFlowCanvas />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-40 w-full bg-linear-to-t from-charcoal to-transparent pointer-events-none" />

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
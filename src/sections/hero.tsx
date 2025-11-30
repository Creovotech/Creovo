'use client';

import ShootingStars from '@/components/decorations/shooting-star';
import StarBackground from '@/components/decorations/star-background';
import { Heading } from '@/components/elements/heading';
import { HERO_ITEMS } from '@/constants/items';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CostEstimatorModal } from '@/components/modals/CostEstimatorModal';
import { TypingSubheading } from '@/components/elements/TypingSubheading';
import { ArchitectureFlowCanvas } from '@/components/ui/ArchitectureCanvasFlow';
import { useRouter } from 'next/navigation';

export const Hero = () => {
  const [costModalOpen, setCostModalOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen w-full overflow-hidden relative flex items-center justify-center pt-12 pb-16 md:py-0">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="pointer-events-none absolute inset-0"
      >
        <StarBackground />
        <ShootingStars />
      </motion.div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col-reverse items-center gap-16 px-4 md:px-8 lg:grid lg:grid-cols-2 lg:gap-12">

        <div id="hero-left" className="flex flex-col w-full justify-center items-center text-center lg:items-start lg:text-left">
          <Heading
            as="h1"
            className="text-4xl font-semibold md:text-5xl lg:text-7xl
                       bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
                       bg-[size:200%_auto] bg-clip-text text-transparent
                       animate-gradient leading-tight"
          >
            {HERO_ITEMS.heading}
          </Heading>

          <div className="mt-6 w-full max-w-2xl lg:max-w-none">
            <TypingSubheading text={HERO_ITEMS.sub_heading} />
          </div>

          <div className="mt-8 flex min-w-full flex-col justify-center items-center gap-4 sm:flex-row">
            <Button
              size="lg"
              onClick={() => router.push('https://calendly.com/creovotech/30min')}
              className="w-full sm:w-auto cursor-pointer"
            >
              Book a call
            </Button>
            <Button
              style={{ color: 'black' }}
              size="lg"
              variant="secondary"
              onClick={() => setCostModalOpen(true)}
              className="w-full sm:w-auto cursor-pointer"
            >
              Estimate cost
            </Button>
          </div>
        </div>

        <div id="hero-right" className="relative w-full flex justify-center items-center sm:hidden md:block" style={{ "scale": "1.2" }}>
          <div className="relative h-[400px] w-full sm:h-[500px] md:h-[600px] lg:h-[700px]">
            <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_100%)] md:[mask-image:linear-gradient(to_right,transparent_0%,black_20%,black_80%,transparent_100%)]">
              <ArchitectureFlowCanvas />
            </div>
          </div>
        </div>
      </div>

      <div id="hero-bottom" className="absolute inset-x-0 bottom-0 h-20 w-full bg-linear-to-t from-charcoal to-transparent pointer-events-none" />

      <CostEstimatorModal open={costModalOpen} onOpenChange={setCostModalOpen} />
    </div>
  );
};
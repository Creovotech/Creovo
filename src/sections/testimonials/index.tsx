'use client';

import React from 'react';
import { TbLocationBolt } from 'react-icons/tb';
import { motion } from 'framer-motion'; // NEW: Import motion
import { MessageSquareQuote } from 'lucide-react';

import { FeatureIconContainer } from '@/sections/features/feature-icon-container';
import { TestimonialsSlider } from './slider';
import { TestimonialsMarquee } from './testimonials-marquee';
import { Subheading } from '@/components/elements/subheading';
import { AmbientColor } from '@/components/decorations/ambient-color';
import { Heading } from '@/components/elements/heading';
import { TESTIMONIALS_DATA } from '@/constants/items';

export const Testimonials = () => {
  const { heading, sub_heading, testimonials } = TESTIMONIALS_DATA;
  return (
    <div className="relative">
      <AmbientColor />
      <div className="pb-20">
        <FeatureIconContainer className="flex justify-center items-center overflow-hidden">
          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2.5,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            // Hover effect
            whileHover={{ scale: 1.2, rotate: 10 }}
          >
            <MessageSquareQuote className="h-6 w-6 text-white" />
          </motion.div>
        </FeatureIconContainer>
        <Heading className="pt-4">{heading}</Heading>
        <Subheading>{sub_heading}</Subheading>
      </div>

      {testimonials && (
        <div className="relative md:py-20 pb-20">
          <TestimonialsSlider testimonials={testimonials} />
          <div className="h-full w-full mt-20 bg-charcoal ">
            <TestimonialsMarquee testimonials={testimonials} />
          </div>
        </div>
      )}

      <div className="absolute bottom-0 inset-x-0 h-40 w-full bg-linear-to-t from-charcoal to-transparent"></div>
    </div>
  );
};
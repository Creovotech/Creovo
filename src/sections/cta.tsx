'use client';

import { motion } from 'motion/react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React, { useState } from 'react';

import { CTA_ITEMS } from '@/constants';
import { AmbientColor } from '@/components/decorations/ambient-color';
import { Container } from '@/components/container';
import { Button } from '@/components/elements/button';

const CostEstimatorModal = dynamic(
  () => import('@/components/modals/CostEstimatorModal').then((mod) => mod.CostEstimatorModal),
  { ssr: false }
);

export const CTA = () => {
  const { heading, sub_heading, CTAs } = CTA_ITEMS;
  const [costModalOpen, setCostModalOpen] = useState(false);
  return (
    <div id='contact' className="relative py-40">
      <AmbientColor />
      <Container className="flex flex-col md:flex-row justify-between items-center w-full px-8">
        <div className="flex flex-col">
          <motion.h2 className="text-white text-xl text-center md:text-left md:text-3xl font-bold mx-auto md:mx-0 max-w-xl ">
            {heading}
          </motion.h2>
          <p className="max-w-md mt-8 text-center md:text-left text-sm md:text-base mx-auto md:mx-0 text-neutral-400">
            {sub_heading}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {CTAs &&
            CTAs.map((cta, index) =>
              'action' in cta ? (
                <Button
                  key={index}
                  onClick={() => setCostModalOpen(true)}
                  // @ts-ignore
                  variant={cta.variant}
                  className="py-3 cursor-pointer"
                >
                  {cta.text}
                </Button>
              ) : (
                <Button
                  as={Link}
                  key={index}
                  href={`${cta.url}`}
                  // @ts-ignore
                  variant={cta.variant}
                  className="py-3"
                >
                  {cta.text}
                </Button>
              )
            )}
        </div>
      </Container>

      <CostEstimatorModal open={costModalOpen} onOpenChange={setCostModalOpen} />
    </div>
  );
};
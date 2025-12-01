'use client';

import { motion } from 'framer-motion';
import { FeatureIconContainer } from '@/sections/features/feature-icon-container';

export const DifferentiatorCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-zinc-700 transition-colors"
  >
    <FeatureIconContainer className="flex justify-center items-center">
      {icon}
    </FeatureIconContainer>
    <h3 className="text-xl font-semibold text-white mt-6 mb-3 text-center">
      {title}
    </h3>
    <p className="text-zinc-400 text-center leading-relaxed">{description}</p>
  </motion.div>
);
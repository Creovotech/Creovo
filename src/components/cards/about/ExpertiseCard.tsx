'use client';

import { motion } from 'framer-motion';
import { FeatureIconContainer } from '@/sections/features/feature-icon-container';

export const ExpertiseCard = ({
    number,
    title,
    description,
    icon,
    isSpecial,
}: {
    number: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    isSpecial?: boolean;
}) => (
    <motion.div
        whileHover={{ y: -5 }}
        className={`relative h-full p-8 rounded-2xl border flex flex-col ${isSpecial
                ? 'bg-zinc-900 border-zinc-700'
                : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
            }`}
    >
        <div className="flex justify-between items-start mb-6">
            <FeatureIconContainer className="flex justify-center items-center">
                {icon}
            </FeatureIconContainer>
            <span className="text-4xl font-bold text-zinc-800 font-mono">{number}</span>
        </div>
        <h3
            className={`text-2xl font-bold mb-4 ${isSpecial
                    ? 'text-transparent bg-clip-text bg-linear-to-r from-white to-purple-200'
                    : 'text-white'
                }`}
        >
            {title}
        </h3>
        <p className="text-zinc-400 leading-relaxed">{description}</p>
    </motion.div>
);
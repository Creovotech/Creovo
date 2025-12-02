'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/container';
import { Heading } from '@/components/elements/heading';
import { AmbientColor } from '@/components/decorations/ambient-color';
import { PRIVACY_ITEMS } from '@/constants';
import { Section } from '@/components/common/section';

export default function PrivacyPolicyPage() {
    return (
        <div className="relative overflow-hidden bg-zinc-950 min-h-screen pt-16 pb-20 md:pt-20 md:pb-32">
            <AmbientColor />
            <Container className="z-20 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <Heading className="text-4xl md:text-6xl font-bold tracking-tight">
                        Privacy Policy
                    </Heading>
                    <p className="mt-4 text-zinc-400 text-lg">
                        Last Updated: {new Date().toLocaleDateString()}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg mb-12 text-left">
                        <h3 className="font-bold text-lg text-zinc-300">Your Privacy Matters</h3>
                        <p className="mt-2 text-zinc-400">
                            At Creovo, we are committed to protecting your personal data.
                            This policy outlines our practices regarding data collection,
                            use, and disclosure. Please read it carefully.
                        </p>
                    </div>

                    <div className="space-y-2">
                        {PRIVACY_ITEMS.map((section, index) => (
                            <Section key={index} title={section.title}>
                                {section.content}
                            </Section>
                        ))}
                    </div>
                </motion.div>
            </Container>
        </div>
    );
}
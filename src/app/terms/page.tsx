'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/container';
import { Heading } from '@/components/elements/heading';
import { AmbientColor } from '@/components/decorations/ambient-color';
import { TERMS_ITEMS } from '@/constants';
import { Section } from '@/components/common/section';

export default function TermsOfServicePage() {
    return (
        <div className="relative overflow-hidden bg-zinc-950 min-h-screen pt-32 pb-20 md:pt-48 md:pb-32">
            <AmbientColor />
            <Container className="z-20 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <Heading className="text-4xl md:text-6xl font-bold tracking-tight">
                        Terms of Service
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
                    <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-lg mb-12">
                        <h3 className="font-bold text-lg text-zinc-300">Disclaimer</h3>
                        <p className="mt-2 text-zinc-400">
                            The following Terms of Service are a template and not legal
                            advice. You should consult with a legal professional to ensure
                            they are appropriate for your specific business needs.
                        </p>
                    </div>

                    <div className="space-y-2">
                        {TERMS_ITEMS.map((section, index) => (
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
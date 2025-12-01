'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/container';
import { Heading } from '@/components/elements/heading';
import { AmbientColor } from '@/components/decorations/ambient-color';
import { Subheading } from '@/components/elements/subheading';

const termsData = [
    {
        title: "1. Introduction",
        content: "Welcome to Creovo. These Terms of Service (\"Terms\") govern your use of our website and the services we offer. By accessing our website or using our services, you agree to be bound by these Terms."
    },
    {
        title: "2. Services",
        content: "Creovo provides software development services, including but not limited to web development, mobile application development, and AI solutions. All services are subject to a separate agreement that will be provided before the commencement of any work."
    },
    {
        title: "3. User Conduct",
        content: "You agree not to use our website or services for any unlawful purpose or in any way that could harm our business or reputation. This includes, but is not limited to, transmitting any material that is defamatory, obscene, or otherwise objectionable."
    },
    {
        title: "4. Limitation of Liability",
        content: "In no event shall Creovo, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service."
    },
    {
        title: "5. Governing Law",
        content: "These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which our company is registered, without regard to its conflict of law provisions."
    }
];

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="border-b border-zinc-800 pb-8 mb-8 last:border-0 last:pb-0 flex justify-items-start items-start flex-col w-full">
        <Heading className="text-3xl font-bold mb-4 tracking-tight">
            {title}
        </Heading>
        <Subheading className="text-zinc-400 leading-relaxed text-lg">
            {children}
        </Subheading>
    </section>
);

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
                        {termsData.map((section, index) => (
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
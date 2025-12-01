'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/container';
import { Heading } from '@/components/elements/heading';
import { AmbientColor } from '@/components/decorations/ambient-color';
import { Subheading } from '@/components/elements/subheading';

const PRIVACY_ITEMS = [
    {
        title: "1. Information We Collect",
        content: "We collect information that you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support. This may include your name, email address, and payment information. We also automatically collect usage data when you access our services."
    },
    {
        title: "2. How We Use Your Information",
        content: "We use the information we collect to provide, maintain, and improve our services, to process transactions, to send you technical notices and support messages, and to communicate with you about products, services, offers, and events."
    },
    {
        title: "3. Data Sharing and Disclosure",
        content: "We do not share your personal information with third parties except as described in this policy. We may share your information with third-party vendors who need access to such information to perform services on our behalf, or to comply with legal obligations."
    },
    {
        title: "4. Data Security",
        content: "We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction. However, no internet transmission or electronic storage is ever completely secure."
    },
    {
        title: "5. Cookies and Tracking",
        content: "We use cookies and similar tracking technologies to track the activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent."
    },
    {
        title: "6. Your Rights",
        content: "Depending on your location, you may have rights regarding your personal data, including the right to access, correct, or delete the data we hold about you. Contact us to exercise these rights."
    }
];

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="border-b border-zinc-800 pb-8 mb-8 last:border-0 last:pb-0 flex justify-items-start items-start flex-col w-full">
        <Heading className="text-3xl font-bold mb-4 tracking-tight">
            {title}
        </Heading>
        <Subheading className="text-zinc-400 leading-relaxed text-lg text-left">
            {children}
        </Subheading>
    </section>
);

export default function PrivacyPolicyPage() {
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
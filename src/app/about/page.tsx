'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Terminal, Bot, Layers, Rocket, Cpu } from 'lucide-react';

import { Container } from '@/components/container';
import { Heading } from '@/components/elements/heading';
import { Subheading } from '@/components/elements/subheading';
import { AmbientColor } from '@/components/decorations/ambient-color';
import { DifferentiatorCard } from '@/components/cards/about/DifferentiatorCard';
import { ExpertiseCard } from '@/components/cards/about/ExpertiseCard';

const AboutPage = () => {
  return (
    <div className="relative overflow-hidden bg-zinc-950 min-h-screen">
      <AmbientColor />

      <section
        id="hero"
        className="relative pt-32 pb-20 md:pt-48 md:pb-32 text-center"
      >
        <Container className="z-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Heading className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              We Are{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-500 to-pink-500">
                Creovo.
              </span>
            </Heading>
            <Subheading className="text-xl md:text-2xl text-zinc-300 mt-6">
              Architects of the Intelligent Web.
            </Subheading>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 max-w-3xl mx-auto text-zinc-400 text-lg leading-relaxed"
          >
            We are a collective of senior developers and technical strategists
            dedicated to building high-performance websites, scalable mobile
            applications, and the next generation of Agentic AI solutions.
          </motion.p>
        </Container>
      </section>

      <section id="who-we-are" className="py-24">
        <Container>
          <div className="text-center mb-16">
            <Heading>Led by Engineers, Not Salespeople.</Heading>
            <Subheading className="max-w-2xl mx-auto mt-4">
              When you talk to us, you&apos;re talking to the people who
              actually build the systems.
            </Subheading>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <DifferentiatorCard
              icon={<Terminal className="w-6 h-6 text-white" />}
              title="No Fluff"
              description="Realistic timelines and honest technical assessments. No over-promising, just delivery."
            />
            <DifferentiatorCard
              icon={<Code2 className="w-6 h-6 text-white" />}
              title="Code Quality"
              description="Clean, maintainable, and scalable code. We build for the long term."
            />
            <DifferentiatorCard
              icon={<Cpu className="w-6 h-6 text-white" />}
              title="Problem Solving"
              description="We solve underlying business logic challenges to make your product viable."
            />
          </div>
        </Container>
      </section>

      <section id="expertise" className="py-24 bg-zinc-900/50">
        <Container>
          <Heading className="mb-16 text-center">
            The Triumvirate of Modern Tech
          </Heading>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <ExpertiseCard
              number="01"
              title="Web & Mobile"
              icon={<Layers className="w-6 h-6 text-white" />}
              description="Responsive, high-speed websites and apps using modern frameworks."
            />
            <ExpertiseCard
              number="02"
              title="Agentic AI"
              icon={<Bot className="w-6 h-6 text-white" />}
              description="AI that does things. Agents that browse, interact with APIs, and automate workflows."
            />
            <div className="relative group lg:-mt-5">
              <div className="absolute -inset-1 bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200" />
              <ExpertiseCard
                number="03"
                title="Deployment"
                icon={<Rocket className="w-6 h-6 text-white" />}
                description="We launch your product and help you iterate based on real-world data."
                isSpecial
              />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default AboutPage;
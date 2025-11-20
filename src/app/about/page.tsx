'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Terminal, 
  Smartphone, 
  Bot, 
  Search, 
  Layers, 
  Rocket, 
  Cpu,
  Zap
} from 'lucide-react';

import { Container } from '@/components/container';
import { Heading } from '@/components/elements/heading';
import { Subheading } from '@/components/elements/subheading';
import { FeatureIconContainer } from '@/sections/features/feature-icon-container'; // Your Hexagon Container
import { Button } from '@/components/ui/button';
import { AmbientColor } from '@/components/decorations/ambient-color';

export default function AboutPage() {
  return (
    <div className="relative overflow-hidden bg-neutral-950 min-h-screen">
      <AmbientColor />
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32">
        <Container className="flex flex-col items-center text-center z-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Heading className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              We Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Creovo.</span>
            </Heading>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Subheading className="text-xl md:text-2xl text-neutral-300 mt-6">
              Architects of the Intelligent Web.
            </Subheading>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 max-w-3xl text-neutral-400 text-lg leading-relaxed"
          >
            At Creovo, we believe that great software is born from expert engineering. 
            We are a collective of senior developers and technical strategists dedicated to building 
            high-performance websites, scalable mobile applications, and the next generation of 
            Agentic AI solutions. We don’t just write code; we build digital ecosystems that drive business evolution.
          </motion.p>
        </Container>
      </section>

      {/* 2. THE MISSION */}
      <section className="py-20 bg-neutral-900/30 border-y border-neutral-800">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-purple-400 uppercase bg-purple-500/10 rounded-full">
                Our Mission
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Bridging the Gap Between Vision and Execution.
              </h2>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 text-neutral-400 text-lg"
            >
              <p className="italic text-neutral-300 border-l-2 border-purple-500 pl-4">
                "In a world where technology moves faster than ever, you need more than a vendor. 
                You need a partner who speaks the language of the future."
              </p>
              <p>
                We founded Creovo with a singular goal: to bring top-tier engineering expertise directly 
                to clients who refuse to compromise on quality. Whether it’s a complex web platform or 
                an autonomous AI workforce, we approach every project with the precision of an architect 
                and the creativity of an artist.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* 3. WHO WE ARE (Expert Differentiator) */}
      <section className="py-24">
        <Container>
          <div className="text-center mb-16">
            <Heading>Led by Engineers, Not Salespeople.</Heading>
            <Subheading className="max-w-2xl mx-auto mt-4">
              Many agencies are run by account managers. Creovo is different. 
              When you talk to us, you are talking to the people who actually build the systems.
            </Subheading>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <DifferentiatorCard 
              icon={<Terminal className="w-6 h-6 text-white" />}
              title="No Fluff"
              description="We give you realistic timelines and honest technical feasibility assessments. No over-promising, just delivery."
            />
            <DifferentiatorCard 
              icon={<Code2 className="w-6 h-6 text-white" />}
              title="Code Quality"
              description="We prioritize clean, maintainable, and scalable code over quick fixes. We build for the long term."
            />
            <DifferentiatorCard 
              icon={<Cpu className="w-6 h-6 text-white" />}
              title="Problem Solving"
              description="We don't just implement features; we solve the underlying business logic challenges to make your product viable."
            />
          </div>
        </Container>
      </section>

      {/* 4. OUR EXPERTISE */}
      <section className="py-24 bg-neutral-900/50">
        <Container>
          <Heading className="mb-16 text-center">The Triumvirate of Modern Tech</Heading>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 01 Web */}
            <ExpertiseCard 
              number="01"
              title="Web Development"
              icon={<Layers className="w-6 h-6 text-white" />}
              description="We craft responsive, high-speed websites using modern frameworks (React, Next.js, Tailwind). From corporate landing pages to complex SaaS platforms, we ensure your web presence is robust and SEO-ready."
            />

            {/* 02 Mobile */}
            <ExpertiseCard 
              number="02"
              title="Mobile Applications"
              icon={<Smartphone className="w-6 h-6 text-white" />}
              description="Native and cross-platform solutions that provide seamless user experiences. We build apps that people actually enjoy using, ensuring high retention and performance on iOS and Android."
            />

            {/* 03 Agentic AI - Highlighted */}
            <div className="relative group lg:mt-[-20px]">
               <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200" />
               <ExpertiseCard 
                number="03"
                title="Agentic AI Solutions"
                icon={<Bot className="w-6 h-6 text-white" />}
                description="Artificial Intelligence is more than just chatbots. We build Agentic Systems—AI that does things. Agents that browse the web, interact with APIs, and automate workflows. It’s not just automation; it’s autonomy."
                isSpecial
              />
            </div>
          </div>
        </Container>
      </section>

      {/* 5. HOW WE WORK */}
      <section className="py-24">
        <Container className="max-w-4xl">
          <Heading className="text-center mb-16">How We Work</Heading>
          
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-neutral-700 before:to-transparent">
            
            <ProcessStep 
              step="01"
              title="Discovery"
              icon={<Search className="w-5 h-5 text-white" />}
              content="We dig deep to understand your business logic, not just your design preferences."
            />
            <ProcessStep 
              step="02"
              title="Architecture"
              icon={<Layers className="w-5 h-5 text-white" />}
              content="Our senior engineers map out the system structure to prevent technical debt later."
            />
            <ProcessStep 
              step="03"
              title="Development"
              icon={<Code2 className="w-5 h-5 text-white" />}
              content="Agile sprints with regular updates. You see the progress as it happens."
            />
            <ProcessStep 
              step="04"
              title="Deployment & Evolution"
              icon={<Rocket className="w-5 h-5 text-white" />}
              content="We launch your product and help you iterate based on real-world data."
            />

          </div>
        </Container>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none" />
        <Container className="text-center relative z-10">
          <Heading className="mb-6">Ready to build the future?</Heading>
          <Subheading className="mb-10 max-w-xl mx-auto">
            Let’s discuss how our expert team can engineer your vision.
          </Subheading>
          <Button 
            size="lg" 
            className="bg-white text-neutral-900 hover:bg-neutral-200 font-semibold text-lg h-12 px-8"
            onClick={() => window.location.href = 'https://calendly.com/creovotech/30min'}
          >
            Start a Project
          </Button>
        </Container>
      </section>
    </div>
  );
}

// --- SUB-COMPONENTS ---

const DifferentiatorCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="p-6 bg-neutral-900 border border-neutral-800 rounded-2xl hover:border-neutral-700 transition-colors"
  >
    <FeatureIconContainer className="flex justify-center items-center">
      {icon}
    </FeatureIconContainer>
    <h3 className="text-xl font-semibold text-white mt-6 mb-3 text-center">{title}</h3>
    <p className="text-neutral-400 text-center leading-relaxed">{description}</p>
  </motion.div>
);

const ExpertiseCard = ({ number, title, description, icon, isSpecial }: { number: string, title: string, description: string, icon: React.ReactNode, isSpecial?: boolean }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`relative h-full p-8 rounded-2xl border flex flex-col ${isSpecial ? 'bg-neutral-900 border-neutral-700' : 'bg-neutral-950 border-neutral-800 hover:border-neutral-700'}`}
  >
    <div className="flex justify-between items-start mb-6">
      <FeatureIconContainer className="flex justify-center items-center">
        {icon}
      </FeatureIconContainer>
      <span className="text-4xl font-bold text-neutral-800 font-mono">{number}</span>
    </div>
    <h3 className={`text-2xl font-bold mb-4 ${isSpecial ? 'text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200' : 'text-white'}`}>
      {title}
    </h3>
    <p className="text-neutral-400 leading-relaxed">
      {description}
    </p>
  </motion.div>
);

const ProcessStep = ({ step, title, content, icon }: { step: string, title: string, content: string, icon: React.ReactNode }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
  >
    {/* Icon / Marker */}
    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-neutral-700 bg-neutral-900 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow-[0_0_0_4px_#0a0a0a]">
      {icon}
    </div>
    
    {/* Content */}
    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-neutral-900 p-6 rounded-xl border border-neutral-800 hover:border-purple-500/50 transition-colors">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xs font-mono text-purple-500">{step}</span>
        <h3 className="font-bold text-white">{title}</h3>
      </div>
      <p className="text-neutral-400 text-sm">{content}</p>
    </div>
  </motion.div>
);
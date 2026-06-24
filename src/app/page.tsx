import dynamic from 'next/dynamic';
import { AmbientColor } from '@/components/decorations/ambient-color';
import { Hero } from '@/sections/hero';

const AppNavbar = dynamic(() => import('@/components/layout/navbar').then((mod) => mod.AppNavbar));
const Features = dynamic(() => import('@/sections/features').then((mod) => mod.Features));
const TechStacks = dynamic(() => import('@/sections/tech-stack').then((mod) => mod.TechStacks));
const TimeLine = dynamic(() => import('@/sections/timeline').then((mod) => mod.TimeLine));
const CTA = dynamic(() => import('@/sections/cta').then((mod) => mod.CTA));
const ScrollToTop = dynamic(() => import('@/components/scroll-to-top'));

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden w-full">
      <AppNavbar />
      <AmbientColor />
      <Hero />
      <Features />
      <TechStacks />
      <TimeLine />
      <CTA />
      <ScrollToTop />
    </div>
  );
}
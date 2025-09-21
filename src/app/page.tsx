import { AmbientColor } from '@/components/decorations/ambient-color';
import { Hero } from '@/sections/hero';

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden w-full">
      <AmbientColor />
      <Hero/>
    </div>
  );
}
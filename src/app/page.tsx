import { AmbientColor } from '@/components/decorations/ambient-color';
import { CTA } from '@/sections/cta';
import { Features } from '@/sections/features';
import { Hero } from '@/sections/hero';
import { MileStones } from '@/sections/milestones';
import { TechStacks } from '@/sections/tech-stack';
import { Timeline } from '@/sections/timeline';

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden w-full">
      <AmbientColor />
      <Hero/>
      <Features heading={''} sub_heading={''} globe_card={undefined} ray_card={undefined} graph_card={undefined} social_media_card={undefined} />
      <TechStacks logos={[]} />
      <Timeline />
      <MileStones />
      <CTA />
    </div>
  );
}
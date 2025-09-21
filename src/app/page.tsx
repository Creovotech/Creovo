import { AmbientColor } from '@/components/decorations/ambient-color';
import { CTA } from '@/sections/cta';
import { Features } from '@/sections/features';
import { Hero } from '@/sections/hero';
import { MileStones } from '@/sections/milestones';
import { Pricing } from '@/sections/pricing';
import { TechStacks } from '@/sections/tech-stack';
import { Testimonials } from '@/sections/testimonials';
import { Timeline } from '@/sections/timeline';
import { pricingData } from '@/constants/pricingdata';

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden w-full">
      <AmbientColor />
      <Hero/>
      <Features heading={''} sub_heading={''} globe_card={undefined} ray_card={undefined} graph_card={undefined} social_media_card={undefined} />
      <TechStacks logos={[]} />
      <Timeline />
      <MileStones />
      <Pricing {...pricingData}/>
      <Testimonials />
      <CTA />
    </div>
  );
}
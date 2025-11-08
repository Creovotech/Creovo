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
import globe_card from '@/components/cards/globe_card.json';
import ray_card from '@/components/cards/ray_card.json';
import graph_card from '@/components/cards/graph_card.json';
import social_media_card from '@/components/cards/social_media_card.json';
import ScrollToTop from '@/components/scroll-to-top';

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden w-full">
      <AmbientColor />
      <Hero/>
      <Features heading={'Features to get your website running within minutes'} sub_heading={''} globe_card={globe_card} ray_card={ray_card} graph_card={graph_card} social_media_card={social_media_card} />
      <TechStacks logos={[]} />
      <Timeline />
      <MileStones />
      <Pricing {...pricingData}/>
      <Testimonials />
      <CTA />
      <ScrollToTop />
    </div>
  );
}
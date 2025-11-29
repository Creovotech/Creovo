import { AmbientColor } from '@/components/decorations/ambient-color';
import { CTA } from '@/sections/cta';
import { Features } from '@/sections/features';
import { Hero } from '@/sections/hero';
import { TimeLine } from '@/sections/timeline';
import { TechStacks } from '@/sections/tech-stack';
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
      <Features heading={'Engineering for Global Scale'} sub_heading={'From local startups to global ecosystems, we architect solutions designed to handle millions of interactions without breaking a sweat'} globe_card={globe_card} ray_card={ray_card} graph_card={graph_card} social_media_card={social_media_card} />
      <TechStacks />
      <TimeLine />
      {/* <Testimonials /> */}
      <CTA />
      <ScrollToTop />
    </div>
  );
}
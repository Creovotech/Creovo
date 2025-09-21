import { AmbientColor } from '@/components/decorations/ambient-color';
import { Features } from '@/sections/features';
import { Hero } from '@/sections/hero';
import { Timeline } from '@/sections/timeline';

export default function LandingPage() {
  return (
    <div className="relative overflow-hidden w-full">
      <AmbientColor />
      <Hero/>
      <Features heading={''} sub_heading={''} globe_card={undefined} ray_card={undefined} graph_card={undefined} social_media_card={undefined} />
      <Timeline />
    </div>
  );
}
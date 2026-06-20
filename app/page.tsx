import { Hero } from "./_components/hero";
import { HeroShowcase } from "./_components/hero-showcase";
import { CapabilityBar } from "./_components/capability-bar";
import { Positioning } from "./_components/positioning";
import { Work } from "./_components/work";
import { ReviewsProof } from "./_components/reviews-proof";
import { WhatWeDo } from "./_components/what-we-do";
import { HowWeWork } from "./_components/how-we-work";
import { Process } from "./_components/process";
import { ClosingCta } from "./_components/closing-cta";
import { Footer } from "./_components/footer";
import { CAL_URL } from "./_components/constants";

export default function Home() {
  return (
    <main>
      <Hero />
      <HeroShowcase />
      <CapabilityBar />
      <Positioning />
      <Work />
      <ReviewsProof />
      <WhatWeDo />
      <HowWeWork />
      <Process />
      <ClosingCta />
      <Footer />

      {/* mobile sticky CTA */}
      <a
        href={CAL_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-center rounded-full bg-ember px-6 py-3.5 text-sm font-medium text-white shadow-[0_14px_34px_-10px_rgba(255,77,46,0.6)] md:hidden"
      >
        Book a discovery call
      </a>
    </main>
  );
}

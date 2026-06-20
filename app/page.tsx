import Link from "next/link";
import { Hero } from "./_components/hero";
import { HeroShowcase } from "./_components/hero-showcase";
import { CapabilityBar } from "./_components/capability-bar";
import { FeaturedWork } from "./_components/featured-work";
import { Positioning } from "./_components/positioning";
import { WhatWeDo } from "./_components/what-we-do";

export default function Home() {
  return (
    <main>
      <Hero />
      <HeroShowcase />
      <CapabilityBar />
      <FeaturedWork />
      <Positioning />
      <WhatWeDo />

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-[1180px]">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-lg font-medium"
          >
            See exactly how we work
            <span className="text-ember transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
}

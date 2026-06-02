import { Container } from '@/components/container';
import { Heading } from '@/components/elements/heading';
import { AmbientColor } from '@/components/decorations/ambient-color';
import { MainBrowser } from '../_components/main-browser';

export default function MarketplaceHome() {
  return (
    <main className="relative overflow-hidden">
      <AmbientColor />
      <Container className="relative z-10 py-20 md:py-28">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs text-zinc-400">
            <span className="size-1.5 rounded-full bg-green-500" /> Now in early access
          </span>
          <Heading as="h1" className="pt-5">
            The Creovo Marketplace
          </Heading>
          <p className="mt-5 max-w-2xl text-base md:text-lg text-zinc-400">
            Browse templates, components, AI tools, and free utilities built by the Creovo team and
            community. Pick a category to dive in.
          </p>
        </div>

        <MainBrowser />
      </Container>
    </main>
  );
}

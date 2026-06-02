import Link from 'next/link';
import { ArrowRight, Bot, Code2, Component, LayoutTemplate, Palette, Plug, Search } from 'lucide-react';
import { Container } from '@/components/container';
import { Heading } from '@/components/elements/heading';
import { AmbientColor } from '@/components/decorations/ambient-color';

const CATEGORIES = [
  { icon: LayoutTemplate, label: 'Templates', desc: 'Full site & app starters' },
  { icon: Component, label: 'UI Components', desc: 'Drop-in React components' },
  { icon: Bot, label: 'AI Agents', desc: 'Prebuilt agentic workflows' },
  { icon: Plug, label: 'Integrations', desc: 'Connectors & plugins' },
  { icon: Palette, label: 'Design Kits', desc: 'Figma & brand assets' },
  { icon: Code2, label: 'Tools', desc: 'CLIs, scripts & utilities' },
];

const slug = (s: string) => s.toLowerCase().replace(/\s+/g, '-');

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
            Discover production-ready templates, components, and AI tools built by the Creovo
            team and community — or sell your own.
          </p>

          <form className="mt-8 flex w-full max-w-xl items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
              <input
                type="search"
                placeholder="Search templates, components, agents..."
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-3 pl-10 pr-4 text-sm text-zinc-200 placeholder:text-zinc-600 outline-none transition-colors focus:border-zinc-600"
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-white px-5 py-3 text-sm font-bold text-black transition duration-200 hover:-translate-y-0.5 hover:bg-neutral-200"
            >
              Search
            </button>
          </form>
        </div>

        <section className="mt-20">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-xl font-semibold text-white">Browse by category</h2>
            <Link href="/browse" className="inline-flex items-center gap-1 text-sm text-zinc-400 transition-colors hover:text-white">
              View all <ArrowRight className="size-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {CATEGORIES.map(({ icon: Icon, label, desc }) => (
              <Link
                key={label}
                href={`/category/${slug(label)}`}
                className="group rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition-colors hover:border-zinc-700"
              >
                <span className="flex size-10 items-center justify-center rounded-lg border border-zinc-800 bg-linear-to-b from-neutral-800 to-neutral-950">
                  <Icon className="size-5 text-zinc-300" />
                </span>
                <h3 className="mt-4 font-semibold text-white">{label}</h3>
                <p className="mt-1 text-sm text-zinc-500">{desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-20">
          <h2 className="mb-6 text-xl font-semibold text-white">Featured listings</h2>
          <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/50 p-12 text-center">
            <p className="text-zinc-400">No listings yet — this is where featured products will appear.</p>
            <Link href="/sell" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-white hover:underline">
              Be the first to publish <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </section>
      </Container>
    </main>
  );
}

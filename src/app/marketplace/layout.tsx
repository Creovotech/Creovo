import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Store } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Creovo Marketplace',
  description: 'Discover and buy production-ready templates, components, and tools — or sell your own.',
};

const NAV_LINKS = [
  { label: 'Browse', href: '/browse' },
  { label: 'Categories', href: '/categories' },
  { label: 'Sell', href: '/sell' },
];

const MarketplaceNav = () => (
  <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-charcoal/80 backdrop-blur-xl">
    <nav className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 md:px-8 h-16">
      <Link href="/" className="flex items-center gap-2 text-white font-semibold tracking-tight">
        <span className="flex size-8 items-center justify-center rounded-lg bg-linear-to-b from-neutral-800 to-neutral-950 border border-zinc-800">
          <Store className="size-4 text-zinc-300" />
        </span>
        Creovo <span className="text-zinc-500 font-normal">Marketplace</span>
      </Link>

      <div className="hidden md:flex items-center gap-7 text-sm text-zinc-400">
        {NAV_LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="hover:text-white transition-colors">
            {l.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3 text-sm">
        <Link href="/sign-in" className="hidden sm:inline text-zinc-300 hover:text-white transition-colors">
          Sign in
        </Link>
        <Link
          href="/sell"
          className="rounded-md bg-white px-4 py-2 font-bold text-black transition duration-200 hover:-translate-y-0.5 hover:bg-neutral-200"
        >
          Become a seller
        </Link>
      </div>
    </nav>
  </header>
);

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full">
      <MarketplaceNav />
      {children}
      {/* `creovo.dev` parent link — update if the apex domain differs */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-10 pt-4">
        <a
          href="https://creovo.dev"
          className="inline-flex items-center gap-1 text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
        >
          Back to Creovo <ArrowUpRight className="size-3" />
        </a>
      </div>
    </div>
  );
}

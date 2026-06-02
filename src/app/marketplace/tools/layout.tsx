import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Wrench } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Creovo Tools',
  description: 'Free, browser-based utilities by Creovo.',
};

// Tools get their own chrome — a slim bar instead of the marketplace browse nav.
export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-charcoal">
      <header className="border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 md:px-6">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-white">
            <ArrowLeft className="size-4" /> Marketplace
          </Link>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white">
            <Wrench className="size-4 text-zinc-400" /> Creovo Tools
          </span>
        </div>
      </header>
      {children}
    </div>
  );
}

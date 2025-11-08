'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    onScroll(); // run once
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toTop = () => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  return (
    <button
      onClick={toTop}
      aria-label="Back to top"
      className={[
        'fixed bottom-6 right-6 z-50',
        'rounded-full p-3',
        'bg-zinc-900/80 text-zinc-100',
        'backdrop-blur border border-zinc-700 shadow-lg',
        'transition-all duration-200',
        'hover:scale-105 hover:bg-zinc-900',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60',
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      ].join(' ')}
    >
      <ArrowUp className="h-4 w-4" />
    </button>
  );
}

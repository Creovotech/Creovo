'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { CATEGORIES, LISTINGS, categoryBySlug } from '../_data/listings';
import { CategoryCard } from './category-card';
import { ListingCard } from './listing-card';

export const MainBrowser = () => {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!q) return [];
    return LISTINGS.filter((l) => {
      const label = categoryBySlug(l.categorySlug)?.label.toLowerCase() ?? '';
      return l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q) || label.includes(q);
    });
  }, [q]);

  return (
    <>
      <div className="mt-8 flex justify-center">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the marketplace..."
            className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-3 pl-10 pr-4 text-sm text-zinc-200 placeholder:text-zinc-600 outline-none transition-colors focus:border-zinc-600"
          />
        </div>
      </div>

      {q ? (
        <div className="mt-12">
          <h2 className="mb-6 text-sm text-zinc-500">
            {results.length} result{results.length === 1 ? '' : 's'} for “{query}”
          </h2>
          {results.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/50 p-12 text-center text-zinc-400">
              Nothing matched. Try a different search.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div id="categories" className="mt-12 scroll-mt-24">
          <h2 className="mb-6 text-xl font-semibold text-white">Browse by category</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => (
              <CategoryCard key={c.slug} category={c} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/container';
import { CATEGORIES, categoryBySlug, listingsByCategory } from '../../_data/listings';
import { BLUR } from '../../_data/blur';
import { ListingCard } from '../../_components/listing-card';

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = categoryBySlug(slug);
  if (!category) notFound();

  const listings = listingsByCategory(slug);
  // Real banner when set on the category; otherwise a deterministic grayscale placeholder.
  const banner = category.image ?? `/marketplace/categories/${category.slug}.jpg`;

  return (
    <main className="relative">
      {/* Per-category banner image */}
      <div className="relative h-56 overflow-hidden border-b border-zinc-800 md:h-72">
        <Image
          src={banner}
          alt=""
          aria-hidden
          fill
          priority
          sizes="100vw"
          placeholder={BLUR[banner] ? 'blur' : 'empty'}
          blurDataURL={BLUR[banner]}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/30" />
        <div className="absolute inset-0 bg-linear-to-t from-charcoal via-charcoal/60 to-transparent" />
        <Container className="relative flex h-full flex-col justify-end pb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-zinc-300 transition-colors hover:text-white">
            <ArrowLeft className="size-4" /> All categories
          </Link>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">{category.label}</h1>
          <p className="mt-2 max-w-xl text-zinc-300">{category.tagline}</p>
        </Container>
      </div>

      <Container className="py-12">
        <p className="mb-6 text-sm text-zinc-500">
          {listings.length} {listings.length === 1 ? 'listing' : 'listings'}
        </p>
        {listings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/50 p-12 text-center text-zinc-400">
            Nothing here yet — listings are coming soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        )}
      </Container>
    </main>
  );
}

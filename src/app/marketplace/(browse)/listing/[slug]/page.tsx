import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Check, Download } from 'lucide-react';
import { Container } from '@/components/container';
import { LISTINGS, categoryBySlug } from '../../../_data/listings';

export function generateStaticParams() {
  return LISTINGS.filter((l) => l.type === 'product').map((l) => ({ slug: l.slug }));
}

export default async function ListingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const listing = LISTINGS.find((l) => l.slug === slug && l.type === 'product');
  if (!listing) notFound();

  const category = categoryBySlug(listing.categorySlug);
  const Icon = category?.icon;
  const isFree = listing.price === 0;

  return (
    <main className="relative">
      <Container className="py-12 md:py-16">
        <Link
          href={`/${listing.categorySlug}`}
          className="inline-flex items-center gap-1.5 text-sm text-zinc-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="size-4" /> Back to {category?.label ?? 'category'}
        </Link>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="relative flex h-72 items-center justify-center overflow-hidden rounded-2xl border border-zinc-800 bg-linear-to-br from-zinc-900 to-neutral-950 md:h-96">
            {listing.image ? (
              <Image src={listing.image} alt={listing.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            ) : Icon ? (
              <Icon className="size-16 text-zinc-700" />
            ) : null}
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-zinc-500">{category?.label}</span>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">{listing.title}</h1>
            <p className="mt-4 leading-relaxed text-zinc-400">{listing.description}</p>

            <dl className="mt-6 flex gap-8 border-y border-zinc-800 py-4 text-sm">
              <div>
                <dt className="text-zinc-500">Format</dt>
                <dd className="mt-0.5 font-medium text-zinc-200">{listing.format}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Price</dt>
                <dd className="mt-0.5 font-medium text-zinc-200">{isFree ? 'Free' : `$${listing.price}`}</dd>
              </div>
            </dl>

            <div className="mt-6">
              {isFree ? (
                <button className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-bold text-black transition duration-200 hover:-translate-y-0.5 hover:bg-neutral-200 cursor-pointer">
                  <Download className="size-4" /> Download — Free
                </button>
              ) : (
                <button
                  disabled
                  className="inline-flex cursor-not-allowed items-center gap-2 rounded-md bg-zinc-800 px-6 py-3 text-sm font-bold text-zinc-400"
                >
                  ${listing.price} · Checkout coming soon
                </button>
              )}
              <ul className="mt-5 space-y-2 text-sm text-zinc-500">
                <li className="flex items-center gap-2"><Check className="size-4 text-zinc-600" /> Instant download after purchase</li>
                <li className="flex items-center gap-2"><Check className="size-4 text-zinc-600" /> Royalty-free commercial license</li>
                <li className="flex items-center gap-2"><Check className="size-4 text-zinc-600" /> Free updates</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

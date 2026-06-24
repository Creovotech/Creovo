import Image from 'next/image';
import Link from 'next/link';
import { categoryBySlug, type Listing } from '../_data/listings';
import { BLUR } from '../_data/blur';

export const ListingCard = ({ listing }: { listing: Listing }) => {
  const category = categoryBySlug(listing.categorySlug);
  const Icon = category?.icon;
  return (
    <Link
      href={listing.href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 transition-colors hover:border-zinc-700"
    >
      <div className="relative h-36 overflow-hidden border-b border-zinc-800">
        {listing.image ? (
          <Image
            src={listing.image}
            alt={listing.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            placeholder={BLUR[listing.image] ? 'blur' : 'empty'}
            blurDataURL={BLUR[listing.image]}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-b from-neutral-900 to-neutral-950">
            {Icon && <Icon className="size-9 text-zinc-700 transition-colors group-hover:text-zinc-500" />}
          </div>
        )}
        {listing.type === 'tool' && (
          <span className="absolute left-3 top-3 rounded-md bg-white/90 px-2 py-0.5 text-[11px] font-bold text-black">
            Free tool
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs text-zinc-500">{category?.label}</span>
        <h3 className="mt-1 font-semibold text-white">{listing.title}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-zinc-500">{listing.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-zinc-600">{listing.format}</span>
          {listing.type === 'tool' ? (
            <span className="text-xs font-semibold text-zinc-300 transition-transform group-hover:translate-x-0.5">
              Open →
            </span>
          ) : listing.price === 0 ? (
            <span className="rounded-md bg-zinc-800 px-2 py-0.5 text-xs font-semibold text-zinc-200">Free</span>
          ) : (
            <span className="text-sm font-bold text-white">${listing.price}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

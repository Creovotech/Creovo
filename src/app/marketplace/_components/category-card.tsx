import Link from 'next/link';
import { listingsByCategory, type Category } from '../_data/listings';

export const CategoryCard = ({ category }: { category: Category }) => {
  const count = listingsByCategory(category.slug).length;
  const Icon = category.icon;
  return (
    <Link
      href={`/${category.slug}`}
      className="group flex flex-col rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition-colors hover:border-zinc-700"
    >
      <div className="flex items-start justify-between">
        <span className="flex size-10 items-center justify-center rounded-lg border border-zinc-800 bg-linear-to-b from-neutral-800 to-neutral-950">
          <Icon className="size-5 text-zinc-300" />
        </span>
        <span className="text-xs text-zinc-600">
          {count} {count === 1 ? 'item' : 'items'}
        </span>
      </div>
      <h3 className="mt-4 font-semibold text-white">{category.label}</h3>
      <p className="mt-1 text-sm text-zinc-500">{category.desc}</p>
    </Link>
  );
};

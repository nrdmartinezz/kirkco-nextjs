'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { matchingProducts, type SearchProduct } from '@/lib/search';

const fieldClass =
  'border-line-base bg-surface-base text-ink-base mt-1 w-full rounded-md border px-3 py-2 pl-9 font-normal';

export function EquipmentProductSearch({ products }: { products: SearchProduct[] }) {
  const [query, setQuery] = useState('');
  const needle = query.trim();
  const matches = matchingProducts(products, query, ['title', 'tagline']);

  return (
    <div className="mb-8">
      <label className="text-brand-700 block text-sm font-semibold">
        Search products
        <span className="relative mt-1 block">
          <Search className="text-ink-muted pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name"
            className={fieldClass}
          />
        </span>
      </label>
      {needle && (
        <ul className="mt-3 max-h-80 overflow-y-auto">
          {matches.map((product) => (
            <li key={product.slug} className="border-line-base border-b py-3">
              <Link href={`/${product.slug}`} className="text-brand-700 font-semibold no-underline hover:text-brand-500">
                {product.title}
              </Link>
              {product.tagline && <p className="text-ink-muted mt-1 text-sm">{product.tagline}</p>}
            </li>
          ))}
        </ul>
      )}
      {needle && matches.length === 0 && <p className="text-ink-muted mt-3 text-sm">No products match that search.</p>}
    </div>
  );
}

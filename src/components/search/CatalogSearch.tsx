'use client';

import Link from 'next/link';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { Heading } from '@/components/ui/Heading';
import { matchingEquipment, matchingProducts, type SearchEquipment, type SearchProduct } from '@/lib/search';

const fieldClass =
  'border-line-base bg-surface-base text-ink-base mt-1 w-full rounded-md border px-3 py-2 pl-9 font-normal';

export function CatalogSearch({
  products,
  equipment,
  initialQuery,
}: {
  products: SearchProduct[];
  equipment: SearchEquipment[];
  initialQuery: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const needle = query.trim();
  const equipmentMatches = matchingEquipment(equipment, query);
  const productMatches = matchingProducts(products, query, ['title', 'tagline', 'summary']);

  function onChange(value: string) {
    setQuery(value);
    const next = value.trim();
    const url = next ? `/search?q=${encodeURIComponent(next)}` : '/search';
    window.history.replaceState(null, '', url);
  }

  return (
    <div className="w-full">
      <label className="text-brand-700 block text-sm font-semibold">
        Search products and equipment
        <span className="relative mt-1 block">
          <Search className="text-ink-muted pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Search by name"
            className={fieldClass}
          />
        </span>
      </label>

      {!needle && <p className="text-ink-muted mt-6">Search products and equipment by name.</p>}

      {needle && equipmentMatches.length === 0 && productMatches.length === 0 && (
        <p className="text-ink-muted mt-6">Nothing matched that search.</p>
      )}

      {equipmentMatches.length > 0 && (
        <section className="mt-8">
          <Heading level={2} size="md">
            Equipment
          </Heading>
          <ul className="mt-4 flex flex-col">
            {equipmentMatches.map((item) => (
              <li key={item.href} className="border-line-base border-b">
                <Link href={item.href} className="group block py-3 no-underline">
                  <span className="text-brand-700 font-semibold group-hover:text-brand-500">{item.name}</span>
                  {item.name !== item.group && <p className="text-ink-muted mt-1 text-sm">{item.group}</p>}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {productMatches.length > 0 && (
        <section className="mt-8">
          <Heading level={2} size="md">
            Products
          </Heading>
          <ul className="mt-4 flex flex-col">
            {productMatches.map((product) => (
              <li key={product.slug} className="border-line-base border-b">
                <Link href={`/${product.slug}`} className="group block py-3 no-underline">
                  <span className="text-brand-700 font-semibold group-hover:text-brand-500">{product.title}</span>
                  {(product.tagline || product.summary) && (
                    <p className="text-ink-muted mt-1 text-sm">{product.tagline || product.summary}</p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

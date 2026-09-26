'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Minus, Plus, Search, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { site } from '@/config/site';
import { QUOTE_MAX_QTY, QUOTE_NOTES_MAX, type QuoteCatalogItem } from '@/lib/quote';
import { addressHasAnyField, isUsZip, parseOptionalUsAddress, US_STATES } from '@/lib/us-address';
import { useQuote } from './QuoteProvider';

const fieldClass =
  'border-line-base bg-surface-base text-ink-base mt-1 w-full rounded-md border px-3 py-2 font-normal';

const CATALOG_CHUNK = 8;

type QuoteBuilderProps = {
  catalog: QuoteCatalogItem[];
  initialProductSlug?: string;
};

export function QuoteBuilder({ catalog, initialProductSlug }: QuoteBuilderProps) {
  const router = useRouter();
  const { lines, ready, add, addIfMissing, setQty, setNotes, remove, clear } = useQuote();
  const addedDeepLink = useRef(false);
  const canLoadMore = useRef(true);
  const [query, setQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(CATALOG_CHUNK);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  useEffect(() => {
    if (!ready || addedDeepLink.current || !initialProductSlug) return;
    const item = catalog.find((product) => product.slug === initialProductSlug);
    if (item) addIfMissing(item);
    addedDeepLink.current = true;
  }, [addIfMissing, catalog, initialProductSlug, ready]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return catalog;
    return catalog.filter(
      (product) =>
        product.title.toLowerCase().includes(needle) || product.tagline?.toLowerCase().includes(needle),
    );
  }, [catalog, query]);

  const matches = filtered.slice(0, visibleCount);

  function loadMoreIfNeeded(list: HTMLUListElement) {
    const nearBottom = list.scrollHeight - list.scrollTop - list.clientHeight <= 48;
    if (!nearBottom) {
      canLoadMore.current = true;
      return;
    }
    if (!canLoadMore.current || visibleCount >= filtered.length) return;
    canLoadMore.current = false;
    setVisibleCount((count) => Math.min(filtered.length, count + CATALOG_CHUNK));
  }

  const addressRequired = addressHasAnyField({ street, city, state, zip });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!site.formEndpoint || lines.length === 0) return;

    const data = new FormData(event.currentTarget);
    const address = parseOptionalUsAddress({ street, city, state, zip });
    if (address.ok === false) {
      setError(address.message);
      return;
    }

    setError(null);
    setPending(true);

    try {
      const response = await fetch(site.formEndpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          form_type: 'quote',
          name: data.get('name'),
          email: data.get('email'),
          phone: data.get('phone'),
          message: data.get('message'),
          _gotcha: data.get('_gotcha'),
          payload: {
            lines: lines.map((line) => ({
              slug: line.slug,
              title: line.title,
              qty: line.qty,
              notes: line.notes,
            })),
            company: {
              name: data.get('company'),
              address: address.address,
            },
          },
        }),
      });
      const result = (await response.json().catch(() => null)) as { ok?: boolean; message?: string } | null;
      if (!response.ok || !result?.ok) {
        setError(result?.message ?? 'Something went wrong. Please try again.');
        setPending(false);
        return;
      }
      clear();
      router.push('/thank-you');
    } catch {
      setError('Something went wrong. Please try again.');
      setPending(false);
    }
  }

  return (
    <div className="mt-10 grid items-start gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(20rem,0.8fr)]">
      <div className="flex min-w-0 flex-col gap-10">
        <section>
          <Heading level={2} size="md">
            Your quote
          </Heading>
          {lines.length === 0 ? (
            <p className="border-line-base text-ink-muted mt-4 rounded-lg border border-dashed p-6">
              Add equipment from a product page or search below.
            </p>
          ) : (
            <ul className="mt-4 flex flex-col gap-4">
              {lines.map((line) => (
                <li key={line.slug} className="border-line-base rounded-lg border p-4">
                  <div className="flex items-start justify-between gap-3">
                    <Link href={`/${line.slug}`} className="text-brand-700 font-semibold no-underline hover:text-brand-500">
                      {line.title}
                    </Link>
                    <button
                      type="button"
                      className="text-ink-muted hover:text-ink-base inline-flex size-9 items-center justify-center rounded-md"
                      onClick={() => remove(line.slug)}
                    >
                      <span className="sr-only">Remove {line.title}</span>
                      <X className="size-4" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-3">
                    <div className="border-line-base inline-flex items-center rounded-md border">
                      <button
                        type="button"
                        className="inline-flex size-9 items-center justify-center"
                        onClick={() => setQty(line.slug, line.qty - 1)}
                        disabled={line.qty <= 1}
                      >
                        <span className="sr-only">Decrease quantity</span>
                        <Minus className="size-4" aria-hidden="true" />
                      </button>
                      <input
                        aria-label={`Quantity for ${line.title}`}
                        inputMode="numeric"
                        className="w-12 border-x border-line-base py-1 text-center"
                        value={line.qty}
                        onChange={(event) => {
                          const next = Number.parseInt(event.target.value, 10);
                          if (Number.isInteger(next)) setQty(line.slug, next);
                        }}
                      />
                      <button
                        type="button"
                        className="inline-flex size-9 items-center justify-center"
                        onClick={() => setQty(line.slug, Math.min(QUOTE_MAX_QTY, line.qty + 1))}
                        disabled={line.qty >= QUOTE_MAX_QTY}
                      >
                        <span className="sr-only">Increase quantity</span>
                        <Plus className="size-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <label className="text-brand-700 mt-3 block text-sm font-semibold">
                    Notes
                    <textarea
                      rows={2}
                      maxLength={QUOTE_NOTES_MAX}
                      value={line.notes ?? ''}
                      onChange={(event) => setNotes(line.slug, event.target.value)}
                      className={fieldClass}
                    />
                  </label>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <Heading level={2} size="md">
            Add equipment
          </Heading>
          <label className="text-brand-700 mt-4 block text-sm font-semibold">
            Search products
            <span className="relative mt-1 block">
              <Search className="text-ink-muted pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" aria-hidden="true" />
              <input
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setVisibleCount(CATALOG_CHUNK);
                  canLoadMore.current = true;
                }}
                placeholder="Search by name"
                className={`${fieldClass} mt-0 pl-9`}
              />
            </span>
          </label>
          <ul className="mt-4 max-h-80 overflow-y-auto" onScroll={(event) => loadMoreIfNeeded(event.currentTarget)}>
            {matches.map((product) => {
              const inQuote = lines.some((line) => line.slug === product.slug);
              return (
                <li key={product.slug} className="border-line-base flex items-center justify-between gap-3 border-b py-3">
                  <div className="min-w-0">
                    <Link href={`/${product.slug}`} className="text-brand-700 font-semibold no-underline hover:text-brand-500">
                      {product.title}
                    </Link>
                    {product.tagline && <p className="text-ink-muted mt-1 truncate text-sm">{product.tagline}</p>}
                  </div>
                  {inQuote ? (
                    <span className="text-ink-muted shrink-0 text-sm font-semibold">In quote</span>
                  ) : (
                    <Button type="button" variant="secondary" size="sm" className="shrink-0 rounded-full" onClick={() => add(product)}>
                      Add
                    </Button>
                  )}
                </li>
              );
            })}
          </ul>
          {query.trim() && matches.length === 0 && <p className="text-ink-muted mt-4 text-sm">No products match that search.</p>}
        </section>
      </div>

      <div className="lg:sticky lg:top-28">
        <Heading level={2} size="md">
          Contact
        </Heading>
        {site.formEndpoint ? (
          <form onSubmit={onSubmit} className="relative mt-4 flex flex-col gap-4">
            <div className="absolute left-[-9999px] h-0 overflow-hidden" aria-hidden="true">
              <label>
                Leave this field empty
                <input name="_gotcha" tabIndex={-1} autoComplete="off" />
              </label>
            </div>
            <label className="text-brand-700 text-sm font-semibold">
              Name
              <input name="name" required autoComplete="name" className={fieldClass} />
            </label>
            <label className="text-brand-700 text-sm font-semibold">
              Email
              <input name="email" type="email" required autoComplete="email" className={fieldClass} />
            </label>
            <label className="text-brand-700 text-sm font-semibold">
              Phone
              <input name="phone" type="tel" autoComplete="tel" className={fieldClass} />
            </label>
            <label className="text-brand-700 text-sm font-semibold">
              Company
              <input name="company" required autoComplete="organization" className={fieldClass} />
            </label>
            <fieldset className="flex flex-col gap-4">
              <legend className="text-brand-700 text-sm font-semibold">US company address (optional)</legend>
              <label className="text-brand-700 text-sm font-semibold">
                Street
                <input
                  autoComplete="street-address"
                  required={addressRequired}
                  value={street}
                  onChange={(event) => setStreet(event.target.value)}
                  className={fieldClass}
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_8rem_8rem]">
                <label className="text-brand-700 text-sm font-semibold">
                  City
                  <input
                    autoComplete="address-level2"
                    required={addressRequired}
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    className={fieldClass}
                  />
                </label>
                <label className="text-brand-700 text-sm font-semibold">
                  State
                  <select
                    autoComplete="address-level1"
                    required={addressRequired}
                    value={state}
                    onChange={(event) => setState(event.target.value)}
                    className={fieldClass}
                  >
                    <option value="">Select</option>
                    {US_STATES.map((item) => (
                      <option key={item.code} value={item.code}>
                        {item.code}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="text-brand-700 text-sm font-semibold">
                  ZIP
                  <input
                    autoComplete="postal-code"
                    inputMode="numeric"
                    required={addressRequired}
                    value={zip}
                    onChange={(event) => setZip(event.target.value)}
                    pattern="\d{5}(?:-\d{4})?"
                    className={fieldClass}
                  />
                </label>
              </div>
              {addressRequired && zip && !isUsZip(zip) && (
                <p className="text-sm text-red-700">Use a US ZIP code (12345 or 12345-6789).</p>
              )}
            </fieldset>
            <label className="text-brand-700 text-sm font-semibold">
              Message
              <textarea name="message" rows={5} className={fieldClass} />
            </label>
            {error && (
              <p role="alert" className="text-sm text-red-700">
                {error}
              </p>
            )}
            <Button type="submit" disabled={pending || lines.length === 0} className="w-fit rounded-full">
              {pending ? 'Sending…' : 'Send'}
            </Button>
            {lines.length === 0 && (
              <p className="text-ink-muted text-sm">Add at least one product before sending.</p>
            )}
          </form>
        ) : (
          <p className="text-ink-muted mt-4">The quote form is not available right now.</p>
        )}
      </div>
    </div>
  );
}

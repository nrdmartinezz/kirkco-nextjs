import Image from 'next/image';
import Link from 'next/link';
import { AddToQuoteButton } from '@/components/quote/AddToQuoteButton';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { variantPath, type Product, type ProductVariant } from '@/lib/products';
import { withOrigin } from '@/lib/search';

function words(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean)
    .map((word) => (word.endsWith('s') ? word.slice(0, -1) : word));
}

function containsInOrder(haystack: string[], needle: string[]) {
  let index = 0;
  for (const word of haystack) {
    if (word === needle[index]) index += 1;
    if (index === needle.length) return true;
  }
  return false;
}

export function matchProduct(name: string, products: Product[]) {
  const needle = words(name);
  if (needle.length === 0) return undefined;
  const hits = products.filter((product) => {
    const title = words(product.title);
    return containsInOrder(title, needle) || containsInOrder(needle, title);
  });
  hits.sort((left, right) => words(left.title).length - words(right.title).length);
  return hits[0];
}

export function matchVariant(name: string, products: Product[]) {
  const needle = words(name);
  if (needle.length === 0) return undefined;
  const hits = products.flatMap((product) =>
    (product.variants ?? []).flatMap((variant) => {
      const title = words(variant.title);
      if (!containsInOrder(title, needle) && !containsInOrder(needle, title)) return [];
      return [{ product, variant }];
    }),
  );
  hits.sort((left, right) => words(left.variant.title).length - words(right.variant.title).length);
  return hits[0];
}

export type ListingCard = {
  key: string;
  name: string;
  product?: Product;
  variant?: ProductVariant;
};

export function listingCards(names: string[], products: Product[]) {
  const resolved = names.map((name) => ({ name, variantHit: matchVariant(name, products) }));
  const namedVariantSlugs = new Set(
    resolved.flatMap(({ variantHit }) =>
      variantHit && variantHit.variant.slug !== 'gp-301' ? [variantHit.variant.slug] : [],
    ),
  );
  const cards: ListingCard[] = [];
  const seen = new Set<string>();

  function add(card: ListingCard) {
    if (seen.has(card.key)) return;
    seen.add(card.key);
    cards.push(card);
  }

  for (const { name, variantHit } of resolved) {
    if (variantHit?.product.slug === 'gp-301' && variantHit.variant.slug === 'gp-301') {
      for (const variant of variantHit.product.variants ?? []) {
        if (namedVariantSlugs.has(variant.slug)) continue;
        add({ key: variant.slug, name: variant.title, product: variantHit.product, variant });
      }
      continue;
    }
    if (variantHit) {
      add({ key: variantHit.variant.slug, name, product: variantHit.product, variant: variantHit.variant });
      continue;
    }
    const product = matchProduct(name, products);
    if (product) add({ key: product.slug, name, product });
    else add({ key: name, name });
  }
  return cards;
}

export function productByPath(href: string, products: Product[]) {
  const slug = href.replace(/^\//, '').split('/')[0];
  if (!slug) return undefined;
  const product = products.find((item) => item.slug === slug);
  if (product) return { product };
  for (const item of products) {
    const variant = item.variants?.find((entry) => entry.slug === slug);
    if (variant) return { product: item, variant };
  }
  return undefined;
}

export function titlesOverlap(left: string, right: string) {
  const leftWords = words(left);
  const rightWords = words(right);
  if (leftWords.length === 0 || rightWords.length === 0) return false;
  return containsInOrder(leftWords, rightWords) || containsInOrder(rightWords, leftWords);
}

const productListingCardClass =
  'flex h-full flex-col overflow-hidden rounded-2xl border border-[#e4f0ff] bg-white shadow-[0_1px_3px_rgba(21,101,192,0.1)]';

export function EquipmentProductCard({
  product,
  variant,
  from,
}: {
  product: Product;
  variant?: ProductVariant;
  from?: string;
}) {
  const href = withOrigin(variant ? variantPath(product, variant) : `/${product.slug}`, from);
  const title = variant?.title ?? product.title;
  const image = variant?.image ?? product.image;
  const blurb = variant?.tagline ?? variant?.summary ?? product.tagline ?? product.summary;

  return (
    <li className={productListingCardClass}>
      <Link href={href} className="group relative block aspect-[4/3] shrink-0 overflow-hidden bg-brand-50 no-underline">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt || title}
            fill
            className="object-contain p-4 transition duration-200 group-hover:scale-[1.02]"
            sizes="(min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <span className="text-brand-500 flex h-full items-center justify-center px-4 text-center text-sm font-semibold">
            {title}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <Heading level={3} size="sm" className="text-brand-700">
          {title}
        </Heading>
        {blurb && <p className="text-ink-muted line-clamp-2 text-sm leading-relaxed">{blurb}</p>}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
          <Button href={href} variant="secondary" size="sm" className="rounded-full">
            View product
          </Button>
          <AddToQuoteButton slug={variant?.slug ?? product.slug} title={title} compact />
        </div>
      </div>
    </li>
  );
}

export function EquipmentProductNameStub({ name }: { name: string }) {
  return (
    <li className="border-brand-100 bg-brand-50/60 flex min-h-[5rem] items-center rounded-2xl border p-4">
      <span className="text-brand-700 font-semibold">{name}</span>
    </li>
  );
}

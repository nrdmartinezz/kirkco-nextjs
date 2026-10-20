import Link from 'next/link';
import { Heading } from '@/components/ui/Heading';
import {
  EquipmentProductCard,
  matchProduct,
  matchVariant,
  productByPath,
  titlesOverlap,
} from '@/components/equipment/EquipmentProductCard';
import type { PublicFamily, PublicPageSections, PublicSection } from '@/content/pillar/sections';
import type { EquipmentSubcategoryGroup } from '@/content/equipment/types';
import { variantPath, type Product, type ProductVariant } from '@/lib/products';
import { cn } from '@/lib/cn';

const cardClass = 'rounded-2xl border border-[#e4f0ff] bg-white p-6 shadow-[0_1px_3px_rgba(21,101,192,0.1)]';

type Listing = {
  key: string;
  product: Product;
  variant?: ProductVariant;
};

function listingFromHit(hit: { product: Product; variant?: ProductVariant }): Listing {
  return {
    key: hit.variant ? variantPath(hit.product, hit.variant) : `/${hit.product.slug}`,
    product: hit.product,
    variant: hit.variant,
  };
}

function listingForName(name: string, products: Product[]): Listing | undefined {
  const variantHit = matchVariant(name, products);
  if (variantHit) return listingFromHit(variantHit);
  const product = matchProduct(name, products);
  if (!product) return undefined;
  return listingFromHit({ product });
}

function listingsForFamily(family: PublicFamily, products: Product[]) {
  const found: Listing[] = [];
  const seen = new Set<string>();

  function add(listing: Listing | undefined) {
    if (!listing || seen.has(listing.key)) return;
    seen.add(listing.key);
    found.push(listing);
  }

  if (family.detailHref) {
    const hit = productByPath(family.detailHref, products);
    if (hit) add(listingFromHit(hit));
  }
  add(listingForName(family.title, products));
  for (const model of family.models) add(listingForName(model.name, products));
  return found;
}

function sectionListings(section: PublicSection, products: Product[]) {
  const seen = new Set<string>();
  const listings: Listing[] = [];
  for (const family of section.families) {
    for (const listing of listingsForFamily(family, products)) {
      if (seen.has(listing.key)) continue;
      seen.add(listing.key);
      listings.push(listing);
    }
  }
  return listings;
}

function matchingGroups(section: PublicSection, groups: EquipmentSubcategoryGroup[]) {
  return groups.filter(
    (group) =>
      Boolean(group.intro || group.body) &&
      (titlesOverlap(group.title, section.heading) ||
        section.families.some((family) => titlesOverlap(group.title, family.title))),
  );
}

export function visibleEditorialSections(
  page: PublicPageSections,
  products: Product[] | undefined,
  groups: EquipmentSubcategoryGroup[] = [],
) {
  if (!products) return page.sections;
  return page.sections.filter(
    (section) => sectionListings(section, products).length > 0 || matchingGroups(section, groups).length > 0,
  );
}

export function EditorialSections({
  page,
  className,
  products,
  groups = [],
}: {
  page: PublicPageSections;
  className?: string;
  products?: Product[];
  groups?: EquipmentSubcategoryGroup[];
}) {
  const sections = visibleEditorialSections(page, products, groups);
  if (sections.length === 0) return null;

  return (
    <div className={cn('mt-12 flex flex-col gap-12', className)}>
      {sections.map((section) => {
        const listings = products ? sectionListings(section, products) : [];
        const leads = products ? matchingGroups(section, groups) : [];
        return (
          <section key={section.sectionKey} id={section.sectionKey} className="scroll-mt-28">
            <Heading level={2} size="lg">
              {section.heading}
            </Heading>
            {leads.map((group) => (
              <div key={group.title} className="mt-4 max-w-3xl">
                {group.intro && <p className="text-ink-muted leading-relaxed">{group.intro}</p>}
                {group.body && <p className="text-ink-muted mt-3 leading-relaxed">{group.body}</p>}
              </div>
            ))}
            {listings.length > 0 && (
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {listings.map((listing) => (
                  <EquipmentProductCard key={listing.key} product={listing.product} variant={listing.variant} />
                ))}
              </ul>
            )}
            {!products && (
              <ul className="mt-6 flex flex-col gap-4">
                {section.families.map((family) => (
                  <li key={family.contentKey} className={cardClass}>
                    <Heading level={3} size="md">
                      {family.title}
                    </Heading>
                    {family.detailHref && (
                      <Link
                        href={family.detailHref}
                        className="text-brand-700 mt-3 inline-flex font-semibold no-underline hover:text-brand-500"
                      >
                        View existing page
                      </Link>
                    )}
                    {family.models.length > 0 && (
                      <ul className="mt-4 flex flex-col gap-2">
                        {family.models.map((model) => (
                          <li key={model.name} className="text-ink-muted flex items-start gap-2 leading-relaxed">
                            <span aria-hidden className="bg-brand-500 mt-2 size-2 shrink-0 rounded-full" />
                            <span>{model.name}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}

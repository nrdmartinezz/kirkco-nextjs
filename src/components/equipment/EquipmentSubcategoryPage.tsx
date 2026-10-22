import Image from 'next/image';
import Link from 'next/link';
import { ApplicationStudyArticles } from '@/components/equipment/ApplicationStudyArticles';
import { EditorialSections, visibleEditorialSections } from '@/components/equipment/EditorialSections';
import {
  EquipmentProductCard,
  EquipmentProductNameStub,
  listingCards,
} from '@/components/equipment/EquipmentProductCard';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';
import { heroForParent } from '@/content/equipment/parent-groups';
import { getPublicSections } from '@/content/pillar/sections';
import type { EquipmentSubcategoryContent } from '@/content/equipment/types';
import { subcategoryBreadcrumb } from '@/content/equipment/types';
import { site } from '@/config/site';
import type { ApplicationStudy } from '@/lib/applications';
import { EquipmentProductSearch } from '@/components/equipment/EquipmentProductSearch';
import { type Product, type ProductCategory } from '@/lib/products';
import { toSearchProducts } from '@/lib/search';
import { ChevronRight } from 'lucide-react';

const helpLinks = [
  { label: 'In-Field Installation', href: '/in-field-installation' },
  { label: 'Training & Education', href: '/training-education' },
  { label: 'Repair & Rebuild', href: '/rebuild-repair' },
  { label: 'Resin Dispensing & Molding', href: '/resin-dispensing-molding' },
];

const cardClass = 'rounded-2xl border border-[#e4f0ff] bg-white p-6 shadow-[0_1px_3px_rgba(21,101,192,0.1)]';

export function EquipmentSubcategoryPage({
  page,
  categories,
  products,
  studies,
}: {
  page: EquipmentSubcategoryContent;
  categories: ProductCategory[];
  products: Product[];
  studies: ApplicationStudy[];
}) {
  const hero = heroForParent(page.parentHref);
  const editorial = getPublicSections(page.href);
  const firstSection = editorial ? visibleEditorialSections(editorial, products, page.groups)[0] : undefined;
  const breadcrumb = subcategoryBreadcrumb(page);
  const categorySlug = page.categorySlug ?? '';
  const searchProducts = toSearchProducts(products);
  const mainCategories = categories.filter((category) => category.name === category.group);
  const matchedSlugs = new Set<string>();
  const groups = page.groups.map((group) => {
    const items = listingCards(group.names, products);
    for (const item of items) {
      if (item.product) matchedSlugs.add(item.product.slug);
    }
    return { ...group, items };
  });
  const extras = categorySlug
    ? products.filter((product) => product.categories.includes(categorySlug) && !matchedSlugs.has(product.slug))
    : [];

  return (
    <>
      <section className="relative isolate min-h-[400px] overflow-hidden bg-brand-500">
        <Image src={hero.heroImage} alt={hero.heroAlt} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-brand-700/35" />
        <Container className="relative flex min-h-[400px] justify-center py-8">
          <div className="w-full max-w-3xl rounded-2xl bg-[rgba(19,89,187,0.28)] p-6 backdrop-blur-md md:p-9">
            <nav aria-label="Breadcrumb" className="text-sm text-white">
              <ol className="flex flex-wrap items-center gap-x-1 gap-y-1">
                {breadcrumb.map((crumb, index) => {
                  const current = index === breadcrumb.length - 1;
                  return (
                    <li key={crumb.label} className="flex items-center gap-1">
                      {index > 0 && <span aria-hidden>-</span>}
                      {crumb.href && !current ? (
                        <Link href={crumb.href} className="font-semibold text-white no-underline hover:underline">
                          {crumb.label}
                        </Link>
                      ) : (
                        <span className="font-semibold" aria-current="page">
                          {crumb.label}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>
            <Heading level={1} size="xl" className="mt-4 text-white">
              {page.title}
            </Heading>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/quote" className="rounded-full">
                Talk to an Engineer
              </Button>
              <Link
                href={firstSection ? `#${firstSection.sectionKey}` : '#system-options'}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white px-6 font-medium text-white no-underline hover:bg-white/10"
              >
                Explore Systems
              </Link>
            </div>
          </div>
        </Container>
      </section>
      <Section spacing="none" className="pt-8 pb-section">
        <Container gap="lg">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
            <div className="min-w-0 flex-1">
              <div className={cardClass}>
                <p className="text-brand-700 flex items-center gap-2 text-[11px] font-semibold tracking-wide uppercase">
                  <span aria-hidden className="bg-brand-700 h-px w-5" />
                  Overview
                </p>
                <p className="text-ink-muted mt-4 leading-7">{page.overview}</p>
              </div>

              {editorial && <EditorialSections page={editorial} products={products} groups={page.groups} from={page.href} />}

              {!editorial && groups.length > 0 && (
                <div id="system-options" className="mt-12 scroll-mt-28">
                  <p className="text-brand-500 flex items-center gap-3 text-sm font-semibold tracking-wide uppercase">
                    <span aria-hidden className="bg-brand-500 h-px w-6" />
                    System Options
                  </p>
                  <ul className="mt-6 grid gap-4 lg:grid-cols-1">
                    {groups.map((group) => (
                      <li key={group.title} className={cardClass}>
                        <Heading level={2} size="md">
                          {group.title}
                        </Heading>
                        {group.intro && <p className="text-ink-muted mt-3 leading-relaxed">{group.intro}</p>}
                        {group.body && <p className="text-ink-muted mt-3 leading-relaxed">{group.body}</p>}
                        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                          {group.items.map((item) =>
                            item.product ? (
                              <EquipmentProductCard key={item.key} product={item.product} variant={item.variant} from={page.href} />
                            ) : (
                              <EquipmentProductNameStub key={item.key} name={item.name} />
                            ),
                          )}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {!editorial && extras.length > 0 && (
                <div className={`${cardClass} mt-4`}>
                  <Heading level={2} size="md">
                    More in this category
                  </Heading>
                  <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                    {extras.map((product) => (
                      <EquipmentProductCard key={product.slug} product={product} from={page.href} />
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-12 rounded-[10px] bg-[#0d2244] p-6 md:p-8">
                <p className="text-brand-500 text-sm font-semibold tracking-wide uppercase">Engineering Engagement</p>
                <Heading level={2} size="lg" className="mt-2 text-white">
                  Talk to an Engineer
                </Heading>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button href="/quote" className="rounded-full">
                    Request a quote
                  </Button>
                  <Button href={`tel:${site.business.phoneHref}`} variant="inverse" className="rounded-full">
                    Call us Today!
                  </Button>
                </div>
              </div>

              {studies.length > 0 ? (
                <ApplicationStudyArticles studies={studies} />
              ) : (
                page.sections &&
                page.sections.length > 0 && (
                  <div className="mt-12">
                    <p className="text-brand-700 flex items-center gap-2 text-[11px] font-semibold tracking-wide uppercase">
                      <span aria-hidden className="bg-brand-700 h-px w-4" />
                      Application Architecture
                    </p>
                    <ul className="mt-6 grid gap-4 md:grid-cols-2">
                      {page.sections.map((section) => (
                        <li key={section.heading} className={cardClass}>
                          <Heading level={2} size="md">
                            {section.heading}
                          </Heading>
                          {section.paragraphs.map((paragraph) => (
                            <p key={paragraph.slice(0, 48)} className="text-ink-muted mt-3 leading-relaxed">
                              {paragraph}
                            </p>
                          ))}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              )}
            </div>

            <aside className="border-neutral-200 w-full shrink-0 rounded-lg border p-5 lg:sticky lg:top-28 lg:w-72">
              <EquipmentProductSearch products={searchProducts} from={page.href} />
              <Heading level={2} size="sm">
                Main Categories
              </Heading>
              <ul className="mt-3 flex flex-col gap-1">
                {mainCategories.map((category) => {
                  const active =
                    page.parentHref === category.href || page.href.startsWith(`${category.href}/`);
                  return (
                    <li key={category.slug}>
                      <Link
                        href={category.href}
                        aria-current={active ? 'page' : undefined}
                        className="text-brand-700 flex items-center gap-1.5 font-semibold no-underline hover:text-brand-500 aria-[current=page]:text-brand-500"
                      >
                        {active && <ChevronRight aria-hidden className="size-4 shrink-0" />}
                        {category.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <Heading level={2} size="sm" className="mt-8">
                We can also help with
              </Heading>
              <ul className="mt-3 flex flex-col gap-1">
                {helpLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-brand-700 font-semibold no-underline hover:text-brand-500">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <Heading level={2} size="sm" className="mt-8">
                Contact Us!
              </Heading>
              <ul className="mt-3 flex flex-col gap-1">
                <li>
                  <a href={`tel:${site.business.phoneHref}`} className="text-brand-700 font-semibold no-underline hover:text-brand-500">
                    Sales: {site.business.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${site.business.email}`} className="text-brand-700 font-semibold no-underline hover:text-brand-500">
                    {site.business.email}
                  </a>
                </li>
                <li>
                  <Link href="/quote" className="text-brand-700 font-semibold no-underline hover:text-brand-500">
                    Get a Quote
                  </Link>
                </li>
              </ul>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}

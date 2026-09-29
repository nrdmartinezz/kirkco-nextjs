import Image from 'next/image';
import Link from 'next/link';
import { ApplicationStudyArticles } from '@/components/equipment/ApplicationStudyArticles';
import { AddToQuoteButton } from '@/components/quote/AddToQuoteButton';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';
import { heroForParent } from '@/content/equipment/parent-groups';
import type { EquipmentSubcategoryContent } from '@/content/equipment/types';
import { subcategoryBreadcrumb } from '@/content/equipment/types';
import { site } from '@/config/site';
import type { ApplicationStudy } from '@/lib/applications';
import type { Product, ProductCategory } from '@/lib/products';
import { ChevronRight } from 'lucide-react';

const helpLinks = [
  { label: 'In-Field Installation', href: '/in-field-installation' },
  { label: 'Training & Education', href: '/training-education' },
  { label: 'Repair & Rebuild', href: '/rebuild-repair' },
  { label: 'Resin Dispensing & Molding', href: '/resin-dispensing-molding' },
];

const cardClass = 'rounded-2xl border border-[#e4f0ff] bg-white p-6 shadow-[0_1px_3px_rgba(21,101,192,0.1)]';

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

function matchProduct(name: string, products: Product[]) {
  const needle = words(name);
  const hits = products.filter((product) => {
    const title = words(product.title);
    return containsInOrder(title, needle) || containsInOrder(needle, title);
  });
  hits.sort((left, right) => words(left.title).length - words(right.title).length);
  return hits[0];
}

const productListingCardClass =
  'flex h-full flex-col overflow-hidden rounded-2xl border border-[#e4f0ff] bg-white shadow-[0_1px_3px_rgba(21,101,192,0.1)]';

function EquipmentProductCard({ product }: { product: Product }) {
  const href = `/${product.slug}`;
  const blurb = product.tagline ?? product.summary;

  return (
    <li className={productListingCardClass}>
      <Link href={href} className="group relative block aspect-[4/3] shrink-0 overflow-hidden bg-brand-50 no-underline">
        {product.image ? (
          <Image
            src={product.image.src}
            alt={product.image.alt || product.title}
            fill
            className="object-contain p-4 transition duration-200 group-hover:scale-[1.02]"
            sizes="(min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <span className="text-brand-500 flex h-full items-center justify-center px-4 text-center text-sm font-semibold">
            {product.title}
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <Heading level={3} size="sm" className="text-brand-700">
          {product.title}
        </Heading>
        {blurb && <p className="text-ink-muted line-clamp-2 text-sm leading-relaxed">{blurb}</p>}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
          <Button href={href} variant="secondary" size="sm" className="rounded-full">
            View product
          </Button>
          <AddToQuoteButton slug={product.slug} title={product.title} compact />
        </div>
      </div>
    </li>
  );
}

function EquipmentProductNameStub({ name }: { name: string }) {
  return (
    <li className="border-brand-100 bg-brand-50/60 flex min-h-[5rem] items-center rounded-2xl border p-4">
      <span className="text-brand-700 font-semibold">{name}</span>
    </li>
  );
}

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
  const breadcrumb = subcategoryBreadcrumb(page);
  const categorySlug = page.categorySlug ?? '';
  const mainCategories = categories.filter((category) => category.name === category.group);
  const matchedSlugs = new Set<string>();
  const groups = page.groups.map((group) => ({
    ...group,
    items: group.names.map((name) => {
      const product = matchProduct(name, products);
      if (product) matchedSlugs.add(product.slug);
      return { name, product };
    }),
  }));
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
                href="#system-options"
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

              {groups.length > 0 && (
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
                              <EquipmentProductCard key={item.name} product={item.product} />
                            ) : (
                              <EquipmentProductNameStub key={item.name} name={item.name} />
                            ),
                          )}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {extras.length > 0 && (
                <div className={`${cardClass} mt-4`}>
                  <Heading level={2} size="md">
                    More in this category
                  </Heading>
                  <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                    {extras.map((product) => (
                      <EquipmentProductCard key={product.slug} product={product} />
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

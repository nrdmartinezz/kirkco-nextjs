import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';
import { ProductBreadcrumb } from '@/components/products/ProductBreadcrumb';
import { site } from '@/config/site';
import { breadcrumbTrails, categoriesFor, type BreadcrumbCrumb, type Product, type ProductCategory } from '@/lib/products';

function BreadcrumbList({ crumbs, productHref }: { crumbs: BreadcrumbCrumb[]; productHref: string }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: new URL(crumb.href ?? productHref, site.url).href,
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

export function ProductPage({ product, categories }: { product: Product; categories: ProductCategory[] }) {
  const productCategories = categoriesFor(product, categories);
  const trails = breadcrumbTrails(product, categories);
  const choices = productCategories.map((category) => {
    const group = trails.find((trail) => trail.some((crumb) => crumb.href === category.href));
    const groupHref = group?.find((crumb) => crumb.href && crumb.href !== category.href && crumb.href !== '/')?.href ?? category.href;
    return { href: category.href, groupHref };
  });

  return (
    <Section spacing="none" className="pt-6 pb-section md:pt-8">
      <BreadcrumbList crumbs={trails[0] ?? []} productHref={`/${product.slug}`} />
      <Container gap="lg">
        <ProductBreadcrumb trails={trails} choices={choices} />
        <div className="flex w-full flex-col items-start gap-8 md:flex-row md:gap-12">
          {product.image && (
            <div className="bg-neutral-50 relative aspect-square w-full shrink-0 overflow-hidden rounded-lg md:w-[46%]">
              <Image
                src={product.image.src}
                alt={product.image.alt}
                fill
                priority
                className="object-contain p-4"
                sizes="(min-width: 768px) 46vw, 100vw"
              />
            </div>
          )}

          <div className="flex min-w-0 flex-1 flex-col">
            <Heading level={1} size="xl">
              {product.title}
            </Heading>
            {product.tagline && <p className="text-brand-500 mt-3 text-lg font-semibold">{product.tagline}</p>}
            {product.summary && <p className="text-ink-muted mt-4 leading-relaxed">{product.summary}</p>}
            {productCategories.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-2">
                {productCategories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={category.href}
                      className="bg-brand-100 text-brand-700 inline-flex rounded-full px-3 py-1 text-sm font-semibold no-underline transition-colors hover:bg-brand-500 hover:text-white"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <Button href="/quote" className="mt-8 w-fit rounded-full">
              Get a Quote
            </Button>
          </div>
        </div>

        {product.sections && product.sections.length > 0 && (
          <div className="flex w-full flex-col gap-10">
            {product.sections.map((section, index) => (
              <div key={`${section.heading ?? 'section'}-${index}`}>
                {section.heading && <Heading level={2}>{section.heading}</Heading>}
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="text-ink-muted mt-4 max-w-3xl leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                {section.items && (
                  <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5">
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.images && section.images.length > 0 && (
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {section.images.map((image) => (
                      <div key={image.src} className="bg-neutral-50 relative aspect-[4/3] overflow-hidden rounded-lg">
                        <Image
                          src={image.src}
                          alt={image.alt ?? ''}
                          fill
                          className="object-contain p-4"
                          sizes="(min-width: 768px) 40vw, 100vw"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}

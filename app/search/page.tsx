import type { Metadata } from 'next';
import { CatalogSearch } from '@/components/search/CatalogSearch';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';
import { getCategories, getProducts } from '@/lib/products';
import { buildMetadata } from '@/lib/seo';
import { toSearchEquipment, toSearchProducts } from '@/lib/search';

export const metadata: Metadata = buildMetadata({
  title: 'Search | Kirkco',
  description: 'Search Kirkco products and equipment.',
  titleExact: true,
  path: '/search',
});

export const revalidate = 60;

function firstParam(value: string | string[] | undefined) {
  return typeof value === 'string' ? value : '';
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const [products, categories, params] = await Promise.all([getProducts(), getCategories(), searchParams]);

  return (
    <Section>
      <Container>
        <div className="w-full">
          <Heading level={1}>Search</Heading>
          <p className="text-ink-muted mt-2 max-w-xl">Find a product or an equipment group.</p>
        </div>
        <CatalogSearch
          products={toSearchProducts(products)}
          equipment={toSearchEquipment(categories)}
          initialQuery={firstParam(params.q)}
        />
      </Container>
    </Section>
  );
}

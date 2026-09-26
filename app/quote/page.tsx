import type { Metadata } from 'next';
import { QuoteBuilder } from '@/components/quote/QuoteBuilder';
import { Container } from '@/components/ui/Container';
import { Heading } from '@/components/ui/Heading';
import { Section } from '@/components/ui/Section';
import { site } from '@/config/site';
import { getProducts } from '@/lib/products';
import type { QuoteCatalogItem } from '@/lib/quote';

export const metadata: Metadata = {
  title: 'Get a Quote',
  description: `Request a quote from ${site.name}.`,
};

export const revalidate = 60;

function firstParam(value: string | string[] | undefined) {
  return typeof value === 'string' ? value : value?.[0];
}

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [products, params] = await Promise.all([getProducts(), searchParams]);
  const catalog: QuoteCatalogItem[] = products.map((product) => ({
    slug: product.slug,
    title: product.title,
    tagline: product.tagline,
    image: product.image,
  }));

  return (
    <Section>
      <Container>
        <Heading level={1}>Get a Quote</Heading>
        <p className="text-ink-muted mt-4 max-w-xl">
          Add the equipment you need, then tell us about the material, the process, and what the system should do.
        </p>
        <QuoteBuilder catalog={catalog} initialProductSlug={firstParam(params.product)} />
      </Container>
    </Section>
  );
}

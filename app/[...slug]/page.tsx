import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductPage } from '@/components/products/ProductPage';
import { SimplePage } from '@/components/ui/SimplePage';
import { getProduct, getProducts } from '@/lib/products';
import { buildMetadata } from '@/lib/seo';
import { stubTitles } from '@/lib/stubs';

type CatchAllProps = {
  params: Promise<{ slug: string[] }>;
};

export function generateStaticParams() {
  const params = new Map<string, { slug: string[] }>();
  for (const href of Object.keys(stubTitles())) {
    params.set(href, { slug: href.slice(1).split('/') });
  }
  for (const product of getProducts()) {
    params.set(`/${product.slug}`, { slug: [product.slug] });
  }
  return [...params.values()];
}

export async function generateMetadata({ params }: CatchAllProps): Promise<Metadata> {
  const { slug } = await params;
  const product = slug.length === 1 ? getProduct(slug[0]) : undefined;
  if (product) {
    return buildMetadata({
      title: product.title,
      description: product.summary || product.tagline || product.title,
      path: `/${product.slug}`,
      image: product.image?.src,
      imageAlt: product.image?.alt,
    });
  }

  const title = stubTitles()[`/${slug.join('/')}`];
  return { title: title ?? 'Page' };
}

export default async function CatchAllPage({ params }: CatchAllProps) {
  const { slug } = await params;
  const product = slug.length === 1 ? getProduct(slug[0]) : undefined;
  if (product) return <ProductPage product={product} />;

  const title = stubTitles()[`/${slug.join('/')}`];
  if (!title) notFound();

  return <SimplePage title={title} />;
}

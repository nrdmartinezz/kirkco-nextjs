import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { EquipmentPage } from '@/components/equipment/EquipmentPage';
import { ProductPage } from '@/components/products/ProductPage';
import { RememberEquipmentPage } from '@/components/products/ProductBreadcrumb';
import { SimplePage } from '@/components/ui/SimplePage';
import { getApplications } from '@/lib/applications';
import { getEquipmentPage } from '@/lib/equipment';
import { categoryByHref, getCategories, getProduct, getProducts } from '@/lib/products';
import { buildMetadata } from '@/lib/seo';
import { stubTitles } from '@/lib/stubs';

export const revalidate = 60;

type CatchAllProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateStaticParams() {
  const params = new Map<string, { slug: string[] }>();
  for (const href of Object.keys(stubTitles())) {
    params.set(href, { slug: href.slice(1).split('/') });
  }
  for (const product of await getProducts()) {
    params.set(`/${product.slug}`, { slug: [product.slug] });
  }
  return [...params.values()];
}

export async function generateMetadata({ params }: CatchAllProps): Promise<Metadata> {
  const { slug } = await params;
  const product = slug.length === 1 ? await getProduct(slug[0]) : undefined;
  if (product) {
    return buildMetadata({
      title: product.title,
      description: product.summary || product.tagline || product.title,
      path: `/${product.slug}`,
      image: product.image?.src,
      imageAlt: product.image?.alt,
    });
  }

  const href = `/${slug.join('/')}`;
  const equipment = await getEquipmentPage(href);
  if (equipment) {
    return buildMetadata({
      title: equipment.title,
      description: equipment.description,
      path: equipment.href,
    });
  }

  const title = stubTitles()[href];
  return { title: title ?? 'Page' };
}

export default async function CatchAllPage({ params }: CatchAllProps) {
  const { slug } = await params;
  const product = slug.length === 1 ? await getProduct(slug[0]) : undefined;
  if (product) {
    const categories = await getCategories();
    return <ProductPage product={product} categories={categories} />;
  }

  const href = `/${slug.join('/')}`;
  const equipment = await getEquipmentPage(href);
  if (equipment) {
    const [categories, studies] = await Promise.all([getCategories(), getApplications(equipment.applicationIds)]);
    return (
      <>
        <RememberEquipmentPage href={equipment.href} />
        <EquipmentPage page={equipment} categories={categories} studies={studies} />
      </>
    );
  }

  const title = stubTitles()[href];
  if (!title) notFound();

  const categories = await getCategories();
  const category = categoryByHref(href, categories);

  return (
    <>
      {category && <RememberEquipmentPage href={category.href} />}
      <SimplePage title={title} />
    </>
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DegassingPage } from '@/components/equipment/DegassingPage';
import { EquipmentOptionsPage } from '@/components/equipment/EquipmentOptionsPage';
import { SupportEditorialPage } from '@/components/equipment/SupportEditorialPage';
import { ApplicationSpokePage } from '@/components/equipment/ApplicationSpokePage';
import { EquipmentPage } from '@/components/equipment/EquipmentPage';
import { EquipmentSubcategoryPage } from '@/components/equipment/EquipmentSubcategoryPage';
import { degassingHref, degassingMeta } from '@/content/equipment/degassing';
import { equipmentOptionsDescription } from '@/content/equipment/equipment-options';
import { getEquipmentSubcategoryPage } from '@/lib/equipment-content';
import { ProductPage } from '@/components/products/ProductPage';
import { RememberEquipmentPage } from '@/components/products/ProductBreadcrumb';
import { SimplePage } from '@/components/ui/SimplePage';
import { IndustryPage } from '@/components/industries/IndustryPage';
import { getIndustryPage } from '@/content/industries';
import { getPublicSections } from '@/content/pillar/sections';
import { getResourcePage } from '@/content/resources/pages';
import { ResourcePage } from '@/components/resources/ResourcePage';
import { getApplication, getApplications, spokeIdFromHref, spokePaths, studyDescription } from '@/lib/applications';
import { equipmentOriginTrail, getEquipmentPage } from '@/lib/equipment';
import { categoryByHref, getCategories, getProduct, getProducts, selectedVariant, variantPath } from '@/lib/products';
import { site } from '@/config/site';
import { buildMetadata } from '@/lib/seo';
import { stubTitles } from '@/lib/stubs';

export const revalidate = 60;

type CatchAllProps = {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ variant?: string | string[]; from?: string | string[] }>;
};

function firstParam(value: string | string[] | undefined) {
  return typeof value === 'string' ? value : value?.[0];
}

export async function generateStaticParams() {
  const params = new Map<string, { slug: string[] }>();
  for (const href of Object.keys(stubTitles())) {
    params.set(href, { slug: href.slice(1).split('/') });
  }
  for (const href of spokePaths()) {
    params.set(href, { slug: href.slice(1).split('/') });
  }
  for (const product of await getProducts()) {
    params.set(`/${product.slug}`, { slug: [product.slug] });
  }
  return [...params.values()];
}

export async function generateMetadata({ params, searchParams }: CatchAllProps): Promise<Metadata> {
  const { slug } = await params;
  const product = slug.length === 1 ? await getProduct(slug[0]) : undefined;
  if (product) {
    const variant = selectedVariant(product, firstParam((await searchParams).variant));
    const image = variant.image ?? product.image;
    return buildMetadata({
      title: variant.title,
      description: variant.summary || variant.tagline || variant.title,
      path: variantPath(product, variant),
      image: image?.src,
      imageAlt: image?.alt,
    });
  }

  const href = `/${slug.join('/')}`;
  const industry = getIndustryPage(href);
  if (industry) {
    return buildMetadata({
      title: `${industry.title} | ${site.name}`,
      description: industry.description || industry.title,
      titleExact: true,
      path: industry.href,
      image: industry.heroImage,
      imageAlt: industry.heroImageAlt,
    });
  }

  if (href === '/equipment-options') {
    return buildMetadata({
      title: 'Equipment Options for Advanced Manufacturing | Kirkco',
      description: equipmentOptionsDescription,
      titleExact: true,
      path: href,
    });
  }

  if (href === degassingHref) {
    return buildMetadata({
      title: degassingMeta.title,
      description: degassingMeta.description,
      titleExact: true,
      path: degassingHref,
      image: degassingMeta.image,
      imageAlt: degassingMeta.imageAlt,
    });
  }

  const spokeId = spokeIdFromHref(href);
  if (spokeId) {
    const study = await getApplication(spokeId);
    if (study) {
      return buildMetadata({
        title: study.title,
        description: studyDescription(study),
        titleExact: true,
        path: href,
        type: 'article',
      });
    }
  }

  const subcategory = getEquipmentSubcategoryPage(href);
  if (subcategory) {
    return buildMetadata({
      title: subcategory.title,
      description: subcategory.description,
      titleExact: true,
      path: subcategory.href,
    });
  }

  const equipment = await getEquipmentPage(href);
  if (equipment) {
    return buildMetadata({
      title: equipment.title,
      description: equipment.description,
      path: equipment.href,
    });
  }

  const resource = getResourcePage(href);
  if (resource) {
    return buildMetadata({
      title: resource.metaTitle,
      description: resource.description,
      titleExact: true,
      path: resource.href,
      image: resource.heroImage,
      imageAlt: resource.heroAlt,
    });
  }

  const title = stubTitles()[href];
  return { title: title ?? 'Page' };
}

export default async function CatchAllPage({ params, searchParams }: CatchAllProps) {
  const { slug } = await params;
  const product = slug.length === 1 ? await getProduct(slug[0]) : undefined;
  if (product) {
    const query = await searchParams;
    const categories = await getCategories();
    const variant = selectedVariant(product, firstParam(query.variant));
    const from = firstParam(query.from);
    const originCrumbs = from ? await equipmentOriginTrail(from) : undefined;
    return (
      <ProductPage
        product={product}
        categories={categories}
        variant={variant}
        originHref={originCrumbs ? from : undefined}
        originCrumbs={originCrumbs}
      />
    );
  }

  const href = `/${slug.join('/')}`;
  const industry = getIndustryPage(href);
  if (industry) return <IndustryPage page={industry} />;

  if (href === '/equipment-options') {
    const categories = await getCategories();
    return <EquipmentOptionsPage categories={categories} />;
  }

  if (href === degassingHref) {
    const [categories, products] = await Promise.all([getCategories(), getProducts()]);
    return (
      <>
        <RememberEquipmentPage href={degassingHref} />
        <DegassingPage categories={categories} products={products} />
      </>
    );
  }

  const spokeId = spokeIdFromHref(href);
  if (spokeId) {
    const study = await getApplication(spokeId);
    if (study?.pillarHref) return <ApplicationSpokePage study={study} />;
  }

  const subcategory = getEquipmentSubcategoryPage(href);
  if (subcategory) {
    const [categories, products, studies] = await Promise.all([
      getCategories(),
      getProducts(),
      getApplications(subcategory.applicationIds ?? []),
    ]);
    return (
      <>
        <RememberEquipmentPage href={subcategory.href} />
        <EquipmentSubcategoryPage page={subcategory} categories={categories} products={products} studies={studies} />
      </>
    );
  }

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

  const resource = getResourcePage(href);
  if (resource) return <ResourcePage page={resource} />;

  const title = stubTitles()[href];
  if (!title) notFound();

  const editorial = getPublicSections(href);
  const categories = await getCategories();
  const category = categoryByHref(href, categories);

  return (
    <>
      {category && <RememberEquipmentPage href={category.href} />}
      {editorial ? <SupportEditorialPage title={title} page={editorial} /> : <SimplePage title={title} />}
    </>
  );
}

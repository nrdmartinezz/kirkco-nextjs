import type { MetadataRoute } from 'next';
import { industryPages } from '@/content/industries';
import { degassingHref } from '@/content/equipment/degassing';
import { resourcePages } from '@/content/resources/pages';
import { site } from '@/config/site';
import { spokePaths } from '@/lib/applications';
import { allEquipmentGroupHrefs, allEquipmentSubcategoryHrefs } from '@/lib/equipment-content';
import { getProducts, variantPath } from '@/lib/products';
import { stubTitles } from '@/lib/stubs';

export const revalidate = 60;

const excluded = new Set([
  '/thank-you',
  '/search',
  '/quote',
  '/contact-us',
  '/request-a-quote',
  '/about',
  '/about/team',
  '/about/service-area',
  '/services',
  '/services/repairs',
  '/services/installations',
  '/services/emergency',
  '/services/contracts',
]);

function remember(paths: Map<string, string | undefined>, path: string, updated?: string) {
  if (!path.startsWith('/') || path.startsWith('//')) return;
  if (excluded.has(path.split('?')[0])) return;
  if (!paths.has(path) || (updated && !paths.get(path))) paths.set(path, updated);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = new Map<string, string | undefined>();

  remember(paths, '/');
  remember(paths, '/contact');
  remember(paths, '/about-us');
  remember(paths, '/equipment-options');
  remember(paths, degassingHref);

  for (const href of Object.keys(stubTitles())) remember(paths, href);
  for (const href of allEquipmentGroupHrefs()) remember(paths, href);
  for (const href of allEquipmentSubcategoryHrefs()) remember(paths, href);
  for (const href of spokePaths()) remember(paths, href);
  for (const page of industryPages) remember(paths, page.href);
  for (const page of resourcePages) remember(paths, page.href);

  for (const product of await getProducts()) {
    remember(paths, `/${product.slug}`, product.updated);
    for (const variant of product.variants ?? []) {
      if (variant.slug !== product.slug) remember(paths, variantPath(product, variant), product.updated);
    }
  }

  return [...paths].map(([path, updated]) => ({
    url: new URL(path, site.url).href,
    ...(updated ? { lastModified: updated } : {}),
  }));
}

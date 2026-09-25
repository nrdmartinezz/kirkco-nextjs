import type { MetadataRoute } from 'next';
import { navigation } from '@/config/navigation';
import { site } from '@/config/site';
import { getProducts } from '@/lib/products';

export const revalidate = 60;

async function collectHrefs() {
  const hrefs = new Set<string>(['/', '/thank-you']);

  for (const item of navigation.primary) {
    if (item.href) hrefs.add(item.href);
    if (!item.panel) continue;
    const links =
      item.panel.kind === 'mega'
        ? item.panel.columns.flatMap((column) => column.links)
        : item.panel.links;
    for (const link of links) hrefs.add(link.href);
  }

  for (const group of navigation.footer) {
    for (const link of group.links) hrefs.add(link.href);
  }

  for (const link of navigation.legal) hrefs.add(link.href);
  hrefs.add(navigation.cta.href);
  for (const product of await getProducts()) hrefs.add(`/${product.slug}`);

  return [...hrefs];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return (await collectHrefs()).map((path) => ({
    url: new URL(path, site.url).href,
    lastModified: new Date(),
  }));
}

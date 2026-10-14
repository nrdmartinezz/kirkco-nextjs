import type { Product, ProductCategory } from '@/lib/products';

export type SearchProduct = {
  slug: string;
  title: string;
  tagline?: string;
  summary?: string;
};

export type SearchEquipment = {
  name: string;
  href: string;
  group: string;
};

export function toSearchProducts(products: Product[]): SearchProduct[] {
  return products.map((product) => ({
    slug: product.slug,
    title: product.title,
    tagline: product.tagline,
    summary: product.summary,
  }));
}

export function toSearchEquipment(categories: ProductCategory[]): SearchEquipment[] {
  return categories.map((category) => ({
    name: category.name,
    href: category.href,
    group: category.group,
  }));
}

function includes(query: string, value: string | undefined) {
  return Boolean(value && value.toLowerCase().includes(query));
}

export function matchingProducts(products: SearchProduct[], query: string, fields: Array<keyof SearchProduct>) {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];
  return products.filter((product) => fields.some((field) => field !== 'slug' && includes(needle, product[field])));
}

export function matchingEquipment(equipment: SearchEquipment[], query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];
  return equipment.filter((item) => includes(needle, item.name) || includes(needle, item.group));
}

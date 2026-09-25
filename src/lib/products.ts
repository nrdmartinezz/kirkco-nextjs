import { cache } from 'react';
import { productCategories, type ProductCategory } from '@/content/product-categories';
import { supabaseAnon } from '@/lib/supabase';

export type { ProductCategory };
export { productCategories };

export type ProductImage = {
  src: string;
  alt?: string;
};

export type ProductSection = {
  heading?: string;
  paragraphs?: string[];
  items?: string[];
  images?: ProductImage[];
};

export type Product = {
  slug: string;
  title: string;
  /** ISO date, YYYY-MM-DD, from the source record's last update. */
  updated: string;
  categories: string[];
  tagline?: string;
  summary?: string;
  sections?: ProductSection[];
  image?: ProductImage & { alt: string };
  /** True when the source had no body. Tagline and summary are the page. */
  thin?: boolean;
};

export type BreadcrumbCrumb = {
  name: string;
  href?: string;
};

type ProductRow = {
  slug: string;
  title: string;
  updated: string;
  tagline: string | null;
  summary: string | null;
  image: (ProductImage & { alt?: string }) | null;
  sections: ProductSection[] | null;
  thin: boolean;
  product_category_links: { category_slug: string; sort: number }[] | null;
};

type CategoryRow = {
  slug: string;
  name: string;
  href: string;
  group_name: string;
  sort: number;
};

function toProduct(row: ProductRow): Product {
  const links = [...(row.product_category_links ?? [])].sort((a, b) => a.sort - b.sort);
  return {
    slug: row.slug,
    title: row.title,
    updated: row.updated,
    categories: links.map((link) => link.category_slug),
    tagline: row.tagline ?? undefined,
    summary: row.summary ?? undefined,
    sections: row.sections ?? undefined,
    image: row.image ? { src: row.image.src, alt: row.image.alt ?? '' } : undefined,
    thin: row.thin || undefined,
  };
}

function toCategory(row: CategoryRow): ProductCategory {
  return { slug: row.slug, name: row.name, href: row.href, group: row.group_name };
}

export const getCategories = cache(async () => {
  const { data, error } = await supabaseAnon()
    .from('product_categories')
    .select('slug, name, href, group_name, sort')
    .order('sort');
  if (error) throw new Error(error.message);
  return ((data ?? []) as CategoryRow[]).map(toCategory);
});

export const getProducts = cache(async () => {
  const { data, error } = await supabaseAnon()
    .from('products')
    .select('slug, title, updated, tagline, summary, image, sections, thin, product_category_links(category_slug, sort)')
    .order('title');
  if (error) throw new Error(error.message);
  return ((data ?? []) as ProductRow[]).map(toProduct);
});

export const getProduct = cache(async (slug: string) => {
  const { data, error } = await supabaseAnon()
    .from('products')
    .select('slug, title, updated, tagline, summary, image, sections, thin, product_category_links(category_slug, sort)')
    .eq('slug', slug)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data ? toProduct(data as ProductRow) : undefined;
});

export async function getProductsByCategory(slug: string) {
  const products = await getProducts();
  return products.filter((product) => product.categories.includes(slug));
}

export async function getCategory(slug: string) {
  const categories = await getCategories();
  return categories.find((category) => category.slug === slug);
}

export function categoriesFor(product: Product, categories: ProductCategory[]) {
  const bySlug = new Map(categories.map((category) => [category.slug, category]));
  return product.categories.flatMap((slug) => {
    const category = bySlug.get(slug);
    return category ? [category] : [];
  });
}

export function categoryByHref(href: string, categories: ProductCategory[]) {
  return categories.find((category) => category.href === href);
}

/** One trail per category: Home, equipment group, category, product name. */
export function breadcrumbTrails(product: Product, categories: ProductCategory[]): BreadcrumbCrumb[][] {
  const productCategoriesForProduct = categoriesFor(product, categories);
  const productCrumb: BreadcrumbCrumb = { name: product.title };
  if (productCategoriesForProduct.length === 0) {
    return [[{ name: 'Home', href: '/' }, productCrumb]];
  }

  const groupByName = new Map(
    categories.filter((category) => category.name === category.group).map((category) => [category.group, category]),
  );

  return productCategoriesForProduct.map((category) => {
    const group = groupByName.get(category.group);
    const crumbs: BreadcrumbCrumb[] = [{ name: 'Home', href: '/' }];
    if (group && group.href !== category.href) {
      crumbs.push({ name: group.name, href: group.href });
    }
    crumbs.push({ name: category.name, href: category.href });
    crumbs.push(productCrumb);
    return crumbs;
  });
}

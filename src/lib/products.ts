import { cache } from 'react';
import { productCategories, type ProductCategory } from '@/content/product-categories';
import productsJson from '@/content/products.json';
import { supabaseAnon } from '@/lib/supabase';

function hasSupabase() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY);
}

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

export type ProductVariant = {
  slug: string;
  title: string;
  tagline?: string;
  summary?: string;
  sections?: ProductSection[];
  image?: ProductImage & { alt: string };
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
  /** Selectable models on this page. The first matching slug is this product. */
  variants?: ProductVariant[];
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
  variants: ProductVariant[] | null;
  product_category_links: { category_slug: string; sort: number }[] | null;
};

type CategoryRow = {
  slug: string;
  name: string;
  href: string;
  group_name: string;
  sort: number;
};

function toVariant(variant: ProductVariant): ProductVariant {
  return {
    slug: variant.slug,
    title: variant.title,
    tagline: variant.tagline || undefined,
    summary: variant.summary || undefined,
    sections: variant.sections ?? undefined,
    image: variant.image ? { src: variant.image.src, alt: variant.image.alt ?? '' } : undefined,
  };
}

function toProduct(row: ProductRow): Product {
  const links = [...(row.product_category_links ?? [])].sort((a, b) => a.sort - b.sort);
  const variants = (row.variants ?? []).map(toVariant);
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
    variants: variants.length > 0 ? variants : undefined,
  };
}

function toCategory(row: CategoryRow): ProductCategory {
  return { slug: row.slug, name: row.name, href: row.href, group: row.group_name };
}

function productsFromJson(): Product[] {
  return [...(productsJson as Product[])]
    .map((product) => ({
      ...product,
      tagline: product.tagline || undefined,
      summary: product.summary || undefined,
      thin: product.thin || undefined,
      variants: product.variants?.length ? product.variants.map(toVariant) : undefined,
    }))
    .sort((left, right) => left.title.localeCompare(right.title));
}

export const getCategories = cache(async () => {
  if (!hasSupabase()) return productCategories;
  const { data, error } = await supabaseAnon()
    .from('product_categories')
    .select('slug, name, href, group_name, sort')
    .order('sort');
  if (error) throw new Error(error.message);
  return ((data ?? []) as CategoryRow[]).map(toCategory);
});

export const getProducts = cache(async () => {
  if (!hasSupabase()) return productsFromJson();
  const { data, error } = await supabaseAnon()
    .from('products')
    .select('slug, title, updated, tagline, summary, image, sections, thin, variants, product_category_links(category_slug, sort)')
    .order('title');
  if (error) throw new Error(error.message);
  return ((data ?? []) as ProductRow[]).map(toProduct);
});

export const getProduct = cache(async (slug: string) => {
  if (!hasSupabase()) return productsFromJson().find((product) => product.slug === slug);
  const { data, error } = await supabaseAnon()
    .from('products')
    .select('slug, title, updated, tagline, summary, image, sections, thin, variants, product_category_links(category_slug, sort)')
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

export function productVariants(product: Product): ProductVariant[] {
  if (product.variants?.length) return product.variants;
  return [
    {
      slug: product.slug,
      title: product.title,
      tagline: product.tagline,
      summary: product.summary,
      sections: product.sections,
      image: product.image,
    },
  ];
}

export function selectedVariant(product: Product, slug?: string): ProductVariant {
  const variants = productVariants(product);
  const primary = variants.find((variant) => variant.slug === product.slug) ?? variants[0];
  if (!slug || slug === product.slug) return primary;
  return variants.find((variant) => variant.slug === slug) ?? primary;
}

export function variantPath(product: Product, variant: ProductVariant) {
  if (variant.slug === product.slug) return `/${product.slug}`;
  return `/${product.slug}?variant=${encodeURIComponent(variant.slug)}`;
}

export function findQuotedProduct(products: Product[], slug: string) {
  for (const product of products) {
    if (product.slug === slug) return { slug: product.slug, title: product.title };
    const variant = product.variants?.find((item) => item.slug === slug);
    if (variant) return { slug: variant.slug, title: variant.title };
  }
}

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';
import { adhesivesSealants } from '../src/content/equipment/adhesives-sealants.ts';
import { productCategories } from '../src/content/product-categories.ts';

type SeedProduct = {
  slug: string;
  title: string;
  updated: string;
  categories: string[];
  tagline?: string;
  summary?: string;
  sections?: unknown;
  image?: { src: string; alt?: string };
  thin?: boolean;
};

type SeedStudy = {
  id: string;
  title: string;
  nda: boolean;
  sections: unknown;
};

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(join(root, path), 'utf8')) as T;
}

function chunks<T>(items: T[], size: number) {
  const groups: T[][] = [];
  for (let index = 0; index < items.length; index += size) groups.push(items.slice(index, index + size));
  return groups;
}

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local, then run npm run db:seed.');
  process.exit(1);
}

const products = readJson<SeedProduct[]>('src/content/products.json');
const studies = readJson<SeedStudy[]>('src/content/applications.json');
const categorySlugs = new Set(productCategories.map((category) => category.slug));
const studyIds = new Set(studies.map((study) => study.id));

for (const product of products) {
  for (const slug of product.categories) {
    if (!categorySlugs.has(slug)) {
      console.error(`Product ${product.slug} uses unknown category ${slug}.`);
      process.exit(1);
    }
  }
}

for (const id of adhesivesSealants.applicationIds) {
  if (!studyIds.has(id)) {
    console.error(`Equipment page references unknown application ${id}.`);
    process.exit(1);
  }
}

const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

function stop(error: { message: string } | null, label: string) {
  if (!error) return;
  console.error(`${label}: ${error.message}`);
  process.exit(1);
}

const { error: categoryError } = await supabase.from('product_categories').upsert(
  productCategories.map((category, sort) => ({
    slug: category.slug,
    name: category.name,
    href: category.href,
    group_name: category.group,
    sort,
  })),
  { onConflict: 'slug' },
);
stop(categoryError, 'product_categories');

for (const group of chunks(products, 100)) {
  const { error } = await supabase.from('products').upsert(
    group.map((product) => ({
      slug: product.slug,
      title: product.title,
      updated: product.updated,
      tagline: product.tagline ?? null,
      summary: product.summary ?? null,
      image: product.image ?? null,
      sections: product.sections ?? null,
      thin: product.thin ?? false,
    })),
    { onConflict: 'slug' },
  );
  stop(error, 'products');
}

const { error: clearLinksError } = await supabase.from('product_category_links').delete().gte('sort', 0);
stop(clearLinksError, 'product_category_links delete');

const links = products.flatMap((product) =>
  product.categories.map((categorySlug, sort) => ({
    product_slug: product.slug,
    category_slug: categorySlug,
    sort,
  })),
);

for (const group of chunks(links, 200)) {
  const { error } = await supabase.from('product_category_links').insert(group);
  stop(error, 'product_category_links insert');
}

const { error: studyError } = await supabase.from('applications').upsert(
  studies.map((study) => ({
    id: study.id,
    title: study.title,
    nda: study.nda,
    sections: study.sections,
  })),
  { onConflict: 'id' },
);
stop(studyError, 'applications');

const { error: equipmentError } = await supabase.from('equipment_pages').upsert(
  {
    href: adhesivesSealants.href,
    title: adhesivesSealants.title,
    description: adhesivesSealants.description,
    breadcrumb: adhesivesSealants.breadcrumb,
    hero_image: adhesivesSealants.heroImage,
    hero_alt: adhesivesSealants.heroAlt,
    overview_image: adhesivesSealants.overviewImage,
    overview_image_alt: adhesivesSealants.overviewImageAlt,
    overview_heading: adhesivesSealants.overviewHeading,
    overview: adhesivesSealants.overview,
    systems: adhesivesSealants.systems,
    engagement_heading: adhesivesSealants.engagementHeading,
    engagement_body: adhesivesSealants.engagementBody,
    platforms_heading: adhesivesSealants.platformsHeading,
    platforms: adhesivesSealants.platforms,
    architectures: adhesivesSealants.architectures,
    application_ids: adhesivesSealants.applicationIds,
    closing: adhesivesSealants.closing,
  },
  { onConflict: 'href' },
);
stop(equipmentError, 'equipment_pages');

console.log(
  `Seeded ${productCategories.length} categories, ${products.length} products, ${links.length} category links, ${studies.length} applications, and 1 equipment page.`,
);

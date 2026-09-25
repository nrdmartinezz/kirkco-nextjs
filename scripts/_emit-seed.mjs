import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { adhesivesSealants } from '../src/content/equipment/adhesives-sealants.ts';
import { productCategories } from '../src/content/product-categories.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const products = JSON.parse(readFileSync(join(root, 'src/content/products.json'), 'utf8'));
const studies = JSON.parse(readFileSync(join(root, 'src/content/applications.json'), 'utf8'));
const dir = join(root, '.seed-sql');
mkdirSync(dir, { recursive: true });

const q = (value) => `'${String(value).replaceAll("'", "''")}'`;
const j = (value) => (value == null ? 'null' : `${q(JSON.stringify(value))}::jsonb`);

const categories =
  'insert into public.product_categories (slug, name, href, group_name, sort) values\n' +
  productCategories
    .map((category, index) => `(${[q(category.slug), q(category.name), q(category.href), q(category.group), index].join(', ')})`)
    .join(',\n') +
  ';';
writeFileSync(join(dir, 'categories.sql'), categories);

function productValues(group) {
  return (
    'insert into public.products (slug, title, updated, tagline, summary, image, sections, thin) values\n' +
    group
      .map(
        (product) =>
          `(${[
            q(product.slug),
            q(product.title),
            q(product.updated),
            product.tagline ? q(product.tagline) : 'null',
            product.summary ? q(product.summary) : 'null',
            j(product.image ?? null),
            j(product.sections ?? null),
            product.thin ? 'true' : 'false',
          ].join(', ')})`,
      )
      .join(',\n') +
    ';'
  );
}

writeFileSync(join(dir, 'products-a.sql'), productValues(products.slice(0, 43)));
writeFileSync(join(dir, 'products-b.sql'), productValues(products.slice(43)));

const links = products.flatMap((product) =>
  product.categories.map(
    (slug, sort) => `(${[q(product.slug), q(slug), sort].join(', ')})`,
  ),
);
writeFileSync(
  join(dir, 'links.sql'),
  'insert into public.product_category_links (product_slug, category_slug, sort) values\n' + links.join(',\n') + ';',
);

writeFileSync(
  join(dir, 'applications.sql'),
  'insert into public.applications (id, title, nda, sections) values\n' +
    studies
      .map((study) => `(${[q(study.id), q(study.title), study.nda ? 'true' : 'false', j(study.sections)].join(', ')})`)
      .join(',\n') +
    ';',
);

const page = adhesivesSealants;
writeFileSync(
  join(dir, 'equipment.sql'),
  'insert into public.equipment_pages (href, title, description, breadcrumb, hero_image, hero_alt, overview_image, overview_image_alt, overview_heading, overview, systems, engagement_heading, engagement_body, platforms_heading, platforms, architectures, application_ids, closing) values (' +
    [
      q(page.href),
      q(page.title),
      q(page.description),
      j(page.breadcrumb),
      q(page.heroImage),
      q(page.heroAlt),
      q(page.overviewImage),
      q(page.overviewImageAlt),
      q(page.overviewHeading),
      j(page.overview),
      j(page.systems),
      q(page.engagementHeading),
      q(page.engagementBody),
      q(page.platformsHeading),
      j(page.platforms),
      j(page.architectures),
      j(page.applicationIds),
      q(page.closing),
    ].join(', ') +
    ');',
);

console.log(dir);

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const url = process.argv[2];
if (!url) {
  console.error('Usage: node scripts/_extract-product-links.mjs <page-url>');
  process.exit(1);
}

const res = await fetch(url);
const html = await res.text();
const re = /href="https:\/\/kirkcocorp\.com\/([a-z0-9-]+)\/?"/g;
const skip = new Set([
  'equipment-options',
  'contact-us',
  'quote',
  'about-us',
  'industry',
  'wp-content',
  'request-a-quote',
]);
const slugs = new Set();
let m;
while ((m = re.exec(html))) {
  const slug = m[1];
  if (skip.has(slug) || slug.includes('equipment')) continue;
  slugs.add(slug);
}
console.log([...slugs]);

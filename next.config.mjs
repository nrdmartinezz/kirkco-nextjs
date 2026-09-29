import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Vercel runs `next build` directly, which skips the npm `prebuild` script.
// theme.css is gitignored, so generate it before Turbopack resolves the import.
execSync('node scripts/build-tokens.mjs', { stdio: 'inherit' });

const products = JSON.parse(
  readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'src/content/products.json'), 'utf8'),
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    const rules = [];
    for (const product of products) {
      for (const variant of product.variants ?? []) {
        if (variant.slug === product.slug) continue;
        rules.push({
          source: `/${variant.slug}`,
          destination: `/${product.slug}?variant=${encodeURIComponent(variant.slug)}`,
          permanent: true,
        });
      }
    }
    return rules;
  },
};

export default nextConfig;

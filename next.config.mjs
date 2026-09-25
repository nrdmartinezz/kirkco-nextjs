import { execSync } from 'node:child_process';

// Vercel runs `next build` directly, which skips the npm `prebuild` script.
// theme.css is gitignored, so generate it before Turbopack resolves the import.
execSync('node scripts/build-tokens.mjs', { stdio: 'inherit' });

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;

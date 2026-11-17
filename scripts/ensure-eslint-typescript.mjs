import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const eslintTypescriptRoot = path.resolve(
  'node_modules/eslint-config-next/node_modules/typescript-eslint',
);
const nestedPackage = path.join(eslintTypescriptRoot, 'node_modules/typescript/package.json');

let version = '';
try {
  version = JSON.parse(fs.readFileSync(nestedPackage, 'utf8')).version;
} catch {
  version = '';
}

if (version.startsWith('6.')) process.exit(0);

execSync('npm install typescript@6.0.3 --no-save --no-package-lock', {
  cwd: eslintTypescriptRoot,
  stdio: 'inherit',
});

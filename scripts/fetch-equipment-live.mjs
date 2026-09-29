/**
 * Fetches live Kirkco equipment pages and writes markdown extracts for content authoring.
 * Run: node scripts/fetch-equipment-live.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'src/content/equipment/_live-extracts');

const paths = [
  '/equipment-options/adhesives-sealants/two-component/',
  '/equipment-options/adhesives-sealants/putty-paste/',
  '/equipment-options/adhesives-sealants/smc-imc-molding/',
  '/equipment-options/adhesives-sealants/tooling-paste-seamless-modeling-paste/',
  '/equipment-options/composites/',
  '/equipment-options/composites/closed-mold-technology/',
  '/equipment-options/composites/filament-winding/',
  '/equipment-options/composites/open-mold-technology/',
  '/equipment-options/composites/pull-winding/',
  '/equipment-options/composites/pultrusion/',
  '/equipment-options/lubrication/',
  '/equipment-options/lubrication/metering/',
  '/equipment-options/lubrication/pressure-control/',
  '/equipment-options/lubrication/flow-regulation/',
  '/equipment-options/lubrication/dispensing/',
  '/equipment-options/lubrication/feeding-and-supply/',
  '/equipment-options/paint-coatings/',
  '/equipment-options/paint-coatings/protective-coatings/',
  '/equipment-options/paint-coatings/specialty-finishes/',
  '/equipment-options/paint-coatings/spray-systems/',
  '/equipment-options/process-control/',
  '/equipment-options/process-control/integration-automation/',
  '/equipment-options/process-control/monitoring-analytics/',
  '/equipment-options/process-control/process-control-computer/',
  '/equipment-options/polyurethane-processing-equipment/',
  '/equipment-options/polyurethane-processing-equipment/high-pressure-metering/',
  '/equipment-options/polyurethane-processing-equipment/low-pressure-metering/',
  '/equipment-options/polyurethane-processing-equipment/pentane-capable-metering-machines/',
  '/equipment-options/polyurethane-processing-equipment/urethane-foam-mixing-guns/',
];

function slugFromPath(path) {
  return path.replace(/^\/|\/$/g, '').replace(/\//g, '__');
}

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+\n/g, '\n')
    .trim();
}

async function fetchPath(path) {
  const url = `https://kirkcocorp.com${path}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'kirkco-nextjs-content-sync/1.0' } });
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  const html = await res.text();
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const title = titleMatch?.[1]?.replace(/\s*\|\s*Kirkco.*$/i, '').trim() ?? '';
  const h1 = h1Match ? stripHtml(h1Match[1]).replace(/\s+/g, ' ').trim() : '';
  const text = stripHtml(html);
  return { path, url, title, h1, text };
}

mkdirSync(outDir, { recursive: true });
const index = [];

for (const path of paths) {
  try {
    const data = await fetchPath(path);
    const file = `${slugFromPath(path)}.txt`;
    writeFileSync(
      join(outDir, file),
      `# ${data.h1 || data.title}\n\nURL: ${data.url}\n\n${data.text.slice(0, 120000)}\n`,
      'utf8',
    );
    index.push({ path, file, title: data.h1 || data.title });
    console.log('ok', path);
  } catch (err) {
    console.error('fail', path, err.message);
    index.push({ path, error: String(err.message) });
  }
}

writeFileSync(join(outDir, 'index.json'), JSON.stringify(index, null, 2));
console.log('Wrote', index.length, 'extracts to', outDir);

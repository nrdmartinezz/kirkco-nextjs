/**
 * Pull equipment-option pages from the live WordPress REST API.
 * Run: node scripts/sync-equipment-wp-api.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outFile = join(root, 'src/content/equipment/wp-equipment-pages.json');

function decodeHtml(s) {
  return s
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&#8211;/g, '–')
    .replace(/&#8217;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function stripTags(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');
}

function extractBlocks(html) {
  const blocks = [];
  const re = /<(h[1-6]|p|li)[^>]*>([\s\S]*?)<\/\1>/gi;
  let match;
  while ((match = re.exec(html))) {
    const tag = match[1].toLowerCase();
    const text = decodeHtml(match[2]);
    if (!text || text.length < 2) continue;
    if (/^(Home|Skip to content|Request a quote|Call us Today|Get a Quote)$/i.test(text)) continue;
    blocks.push({ tag, text });
  }
  return blocks;
}

async function fetchAllPages() {
  const pages = [];
  let page = 1;
  while (true) {
    const res = await fetch(`https://kirkcocorp.com/wp-json/wp/v2/pages?per_page=100&page=${page}`, {
      headers: { 'User-Agent': 'kirkco-nextjs-content-sync/1.0' },
    });
    if (!res.ok) break;
    const batch = await res.json();
    if (!Array.isArray(batch) || batch.length === 0) break;
    pages.push(...batch);
    if (batch.length < 100) break;
    page += 1;
  }
  return pages;
}

const PARENT_META = {
  '/equipment-options/adhesives-sealants': { parentHref: '/equipment-options/adhesives-sealants', parentLabel: 'Adhesives & Sealants' },
  '/equipment-options/composites': { parentHref: '/equipment-options/composites', parentLabel: 'Composites' },
  '/equipment-options/lubrication': { parentHref: '/equipment-options/lubrication', parentLabel: 'Lubrication' },
  '/equipment-options/paint-coatings': { parentHref: '/equipment-options/paint-coatings', parentLabel: 'Paint & Coatings' },
  '/equipment-options/process-control': { parentHref: '/equipment-options/process-control', parentLabel: 'Process Control' },
  '/equipment-options/polyurethane-processing-equipment': {
    parentHref: '/equipment-options/polyurethane-processing-equipment',
    parentLabel: 'Polyurethane',
  },
};

function pathnameFromLink(link) {
  const u = new URL(link);
  let path = u.pathname.replace(/\/$/, '') || '/';
  return path;
}

function classify(path) {
  if (!path.startsWith('/equipment-options')) return null;
  const segments = path.split('/').filter(Boolean);
  if (segments.length === 1) return { kind: 'hub', href: path };
  if (segments.length === 2) return { kind: 'group', href: path };
  return { kind: 'subcategory', href: path };
}

const raw = await fetchAllPages();
const equipment = raw
  .map((p) => {
    const href = pathnameFromLink(p.link);
    const kindInfo = classify(href);
    if (!kindInfo) return null;
    const html = stripTags(p.content.rendered);
    const blocks = extractBlocks(html);
    const h1 = blocks.find((b) => b.tag === 'h1')?.text ?? decodeHtml(p.title.rendered);
    const overviewIdx = blocks.findIndex((b) => /^overview$/i.test(b.text));
    let overview = '';
    if (overviewIdx >= 0) {
      const next = blocks.slice(overviewIdx + 1).find((b) => b.tag === 'h2' || b.tag === 'p');
      if (next?.tag === 'h2') overview = next.text;
      else if (next?.tag === 'p') overview = next.text;
    }
    if (!overview) {
      const firstP = blocks.find((b) => b.tag === 'p' && b.text.length > 80);
      overview = firstP?.text ?? '';
    }

    const parentPath = href.split('/').slice(0, 3).join('/') || href;
    const parentKey = Object.keys(PARENT_META).find((key) => href === key || href.startsWith(`${key}/`));
    const parent = parentKey ? PARENT_META[parentKey] : undefined;

    const architectureSections = [];
    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];
      if (b.tag !== 'h3' && b.tag !== 'h4') continue;
      if (!/executive overview|market|process requirements|system architecture|controls|framework|performance|lifecycle|governed|business & quality|material & chemistry|automation/i.test(b.text)) {
        continue;
      }
      const paragraphs = [];
      for (let j = i + 1; j < blocks.length; j++) {
        const next = blocks[j];
        if (next.tag === 'h3' || next.tag === 'h4' || next.tag === 'h2' || next.tag === 'h1') break;
        if (next.tag === 'p' && next.text.length > 20) paragraphs.push(next.text);
      }
      if (paragraphs.length) architectureSections.push({ heading: b.text, paragraphs });
    }

    return {
      href,
      kind: kindInfo.kind,
      wpId: p.id,
      title: h1,
      description: overview.slice(0, 240),
      overview,
      parent,
      blocks,
      architectureSections,
    };
  })
  .filter(Boolean);

mkdirSync(dirname(outFile), { recursive: true });
writeFileSync(outFile, JSON.stringify(equipment, null, 2));
console.log(`Wrote ${equipment.length} equipment pages to ${outFile}`);

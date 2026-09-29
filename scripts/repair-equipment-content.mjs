/**
 * Rebuild group overview copy and photos from the WordPress export,
 * and stop subcategory cards from repeating the overview paragraph.
 * Run: node scripts/repair-equipment-content.mjs
 */
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const wp = JSON.parse(readFileSync(join(root, 'src/content/equipment/wp-equipment-pages.json'), 'utf8'));
const groups = JSON.parse(readFileSync(join(root, 'src/content/equipment/generated/group-pages.json'), 'utf8'));
const subs = JSON.parse(readFileSync(join(root, 'src/content/equipment/generated/subcategory-pages.json'), 'utf8'));

const imageDir = join(root, 'public/images/equipment');
mkdirSync(imageDir, { recursive: true });

const downloads = [
  ['https://kirkcocorp.com/wp-content/uploads/2026/08/grease-application_02.jpg', 'lubrication-overview.jpg'],
  ['https://kirkcocorp.com/wp-content/uploads/2026/05/batch-degassing-with-heat-1.png', 'polyurethane-overview.png'],
  ['https://kirkcocorp.com/wp-content/uploads/2026/04/adhesive_bonding.jpg', 'adhesives-overview.jpg'],
];

for (const [url, file] of downloads) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} ${res.status}`);
  writeFileSync(join(imageDir, file), Buffer.from(await res.arrayBuffer()));
  console.log('saved', file);
}

const overviewImages = {
  '/equipment-options/adhesives-sealants': {
    overviewImage: '/images/equipment/adhesives-overview.jpg',
    overviewImageAlt: 'Adhesive bonding on a manufactured assembly',
  },
  '/equipment-options/composites': {
    overviewImage: '/images/structural-panels.jpg',
    overviewImageAlt: 'Structural composite panel manufacturing',
  },
  '/equipment-options/lubrication': {
    overviewImage: '/images/equipment/lubrication-overview.jpg',
    overviewImageAlt: 'Grease application on industrial equipment',
  },
  '/equipment-options/paint-coatings': {
    overviewImage: '/images/automotive.jpg',
    overviewImageAlt: 'Coated automotive manufacturing application',
  },
  '/equipment-options/process-control': {
    overviewImage: '/images/electronics.jpg',
    overviewImageAlt: 'Process monitoring and control equipment',
  },
  '/equipment-options/polyurethane-processing-equipment': {
    overviewImage: '/images/equipment/polyurethane-overview.png',
    overviewImageAlt: 'Polyurethane batch processing equipment',
  },
};

const sidebar = new Set([
  'Adhesives & Sealants',
  'Composites',
  'Lubrication',
  'Paint & Coatings',
  'Process Control',
  'Polyurethane',
  'In-Field Installation',
  'Training & Education',
  'Repair & Rebuild',
  'Resin Dispensing & Molding',
  'Main Categories',
  'Search Main Categories',
  'We can also help with',
  'Contact Us!',
]);

function spaceSentences(text) {
  return text.replace(/([.!?])([A-Z])/g, '$1 $2').replace(/\s{2,}/g, ' ').trim();
}

function isMash(text) {
  return (
    /contact us|view product|request a quote|call us today|ready to engineer|nda agreement|executive overview/i.test(text) ||
    text.length > 700
  );
}

function overviewFromBlocks(blocks, href) {
  const start = Math.max(0, blocks.findIndex((block) => block.tag === 'h1'));
  const body = blocks.slice(start);
  const headings = body
    .map((block, index) => ({ block, index }))
    .filter(({ block }) => block.tag === 'h2' && block.text.length > 24 && block.text.length < 180);
  const preferred = headings.find(({ block }) => {
    if (href.includes('paint-coatings')) return /paint|coating/i.test(block.text);
    if (href.includes('lubrication')) return /lubrication/i.test(block.text);
    if (href.includes('composites')) return /composite/i.test(block.text);
    if (href.includes('process-control')) return /process control/i.test(block.text);
    if (href.includes('polyurethane')) return /polyurethane/i.test(block.text);
    if (href.includes('adhesives')) return /adhesive|bonding|metering/i.test(block.text);
    return true;
  });
  const chosen = preferred ?? headings[0];
  if (!chosen) return null;
  const paragraphs = [];
  for (const block of body.slice(chosen.index + 1)) {
    if (block.tag === 'h2' || block.tag === 'h3') break;
    if (block.tag !== 'p') continue;
    if (sidebar.has(block.text) || isMash(block.text) || block.text.length < 160) continue;
    if (/^for batch-based|^critical applications require|^manufacturers utilizing polyurethane/i.test(block.text)) break;
    paragraphs.push(spaceSentences(block.text));
  }
  return { heading: chosen.block.text, paragraphs };
}

function platformsFromBlocks(blocks) {
  const platforms = [];
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (block.tag !== 'h2') continue;
    const items = [];
    for (let j = i + 1; j < blocks.length; j++) {
      const next = blocks[j];
      if (next.tag === 'h2' || next.tag === 'h1') break;
      if (next.tag === 'li' && !sidebar.has(next.text) && next.text.length < 120) items.push(next.text);
    }
    if (items.length >= 3) platforms.push({ heading: block.text, items });
  }
  return platforms.slice(0, 3);
}

for (const page of wp) {
  if (page.kind !== 'group' || !groups[page.href]) continue;
  const overview = overviewFromBlocks(page.blocks, page.href);
  const images = overviewImages[page.href];
  const current = groups[page.href];
  if (overview) {
    current.overviewHeading = overview.heading;
    if (overview.paragraphs.length) {
      current.overview = overview.paragraphs;
      current.description = overview.paragraphs[0].slice(0, 240);
    }
  }
  if (images) {
    current.overviewImage = images.overviewImage;
    current.overviewImageAlt = images.overviewImageAlt;
  }
  const platforms = platformsFromBlocks(page.blocks);
  if (platforms.length) {
    current.platformsHeading = 'Technical Platforms';
    current.platforms = platforms;
  } else {
    current.platforms = [];
  }
  current.architectures = current.architectures.filter((architecture) => architecture.heading !== 'System architecture');
}

for (const page of Object.values(subs)) {
  page.overview = spaceSentences(page.overview || '');
  page.description = spaceSentences(page.description || '').slice(0, 240);
  page.groups = (page.groups || []).map((group) => {
    const intro = group.intro && page.overview.startsWith(group.intro.slice(0, 48)) ? '' : spaceSentences(group.intro || '');
    const body =
      !group.body || group.body === page.overview || page.overview.startsWith(group.body.slice(0, 80))
        ? ''
        : spaceSentences(group.body);
    return { ...group, intro, body };
  });
}

writeFileSync(join(root, 'src/content/equipment/generated/group-pages.json'), JSON.stringify(groups, null, 2));
writeFileSync(join(root, 'src/content/equipment/generated/subcategory-pages.json'), JSON.stringify(subs, null, 2));
console.log('Updated group and subcategory content');

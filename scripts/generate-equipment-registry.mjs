/**
 * Builds local equipment page registries from wp-equipment-pages.json + live HTML product links.
 * Run: node scripts/generate-equipment-registry.mjs
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const wp = JSON.parse(readFileSync(join(root, 'src/content/equipment/wp-equipment-pages.json'), 'utf8'));
const products = JSON.parse(readFileSync(join(root, 'src/content/products.json'), 'utf8'));
const productBySlug = new Map(products.map((p) => [p.slug, p.title]));

const categoriesSrc = readFileSync(join(root, 'src/content/product-categories.ts'), 'utf8');
const categoryByHref = new Map();
for (const match of categoriesSrc.matchAll(/href: '([^']+)'[\s\S]*?slug: '([^']+)'/g)) {
  categoryByHref.set(match[1], match[2]);
}
for (const match of categoriesSrc.matchAll(/slug: '([^']+)'[\s\S]*?href: '([^']+)'/g)) {
  categoryByHref.set(match[2], match[1]);
}

const navSystems = {
  '/equipment-options/adhesives-sealants': [
    { title: 'Single Component Systems', description: 'Dispensing valves, metering valves, pump & pressure packages for 1K adhesives', href: '/equipment-options/adhesives-sealants/single-component', categorySlug: 'single-component' },
    { title: 'Two Component Systems (2K)', description: 'Gear metering, piston metering, shot metering, mixing valves, LSR processing', href: '/equipment-options/adhesives-sealants/two-component', categorySlug: 'two-component' },
    { title: 'Tooling Paste & Seamless Molding', description: 'Eldo-Mix 401T, GP 401 TPD for precision tooling and modeling applications', href: '/equipment-options/adhesives-sealants/tooling-paste-seamless-modeling-paste', categorySlug: 'tooling-paste' },
    { title: 'SMC/IMC Molding', description: 'IMC Coatec metering systems for sheet molding and in-mold coating applications', href: '/equipment-options/adhesives-sealants/smc-imc-molding', categorySlug: 'smc-imc-molding' },
    { title: 'Putty & Paste Systems', description: 'GP 401 APD, CF Versa, and GP 401 TPD for high-viscosity paste dispensing', href: '/equipment-options/adhesives-sealants/putty-paste', categorySlug: 'putty-paste' },
  ],
  '/equipment-options/composites': [
    { title: 'Closed Mold Technology', description: 'RTM, VARTM, and closed-mold resin infusion architectures', href: '/equipment-options/composites/closed-mold-technology', categorySlug: 'closed-mold-technology' },
    { title: 'Filament Winding', description: 'Controlled fiber wet-out and resin delivery for wound structures', href: '/equipment-options/composites/filament-winding', categorySlug: 'filament-winding' },
    { title: 'Open Mold Technology', description: 'Spray-up, chopper, and open mold lamination systems', href: '/equipment-options/composites/open-mold-technology', categorySlug: 'open-mold-technology' },
    { title: 'Pull Winding', description: 'Pull-winding process equipment and resin metering', href: '/equipment-options/composites/pull-winding', categorySlug: 'pull-winding' },
    { title: 'Pultrusion', description: 'Continuous pultrusion resin delivery and process control', href: '/equipment-options/composites/pultrusion', categorySlug: 'pultrusion' },
  ],
  '/equipment-options/lubrication': [
    { title: 'Metering', description: 'Precision lubrication metering valves and controls', href: '/equipment-options/lubrication/metering', categorySlug: 'metering' },
    { title: 'Pressure Control', description: 'Regulators and pressure management for lubricant systems', href: '/equipment-options/lubrication/pressure-control', categorySlug: 'pressure-control' },
    { title: 'Flow Regulation', description: 'Flow meters and regulating valves for stable delivery', href: '/equipment-options/lubrication/flow-regulation', categorySlug: 'flow-regulation' },
    { title: 'Dispensing', description: 'Dispensing valves and application hardware', href: '/equipment-options/lubrication/dispensing', categorySlug: 'dispensing' },
    { title: 'Feeding and Supply', description: 'Pumps, vessels, and supply packages', href: '/equipment-options/lubrication/feeding-and-supply', categorySlug: 'feeding-and-supply' },
  ],
  '/equipment-options/paint-coatings': [
    { title: 'Protective Coatings', description: 'Protective coating application systems', href: '/equipment-options/paint-coatings/protective-coatings', categorySlug: 'protective-coatings' },
    { title: 'Specialty Finishes', description: 'Specialty finish and coating platforms', href: '/equipment-options/paint-coatings/specialty-finishes', categorySlug: 'specialty-finishes' },
    { title: 'Spray Systems', description: 'Manual and automatic spray application systems', href: '/equipment-options/paint-coatings/spray-systems', categorySlug: 'spray-systems' },
  ],
  '/equipment-options/process-control': [
    { title: 'Integration / Automation', description: 'PLC integration and automation for dispensing lines', href: '/equipment-options/process-control/integration-automation', categorySlug: 'integration-automation' },
    { title: 'Monitoring / Analytics', description: 'Sensors and analytics for process verification', href: '/equipment-options/process-control/monitoring-analytics', categorySlug: 'monitoring-analytics' },
    { title: 'Process Control Computer', description: 'Process control computers and HMI platforms', href: '/equipment-options/process-control/process-control-computer', categorySlug: 'process-control-computer' },
  ],
  '/equipment-options/polyurethane-processing-equipment': [
    { title: 'High Pressure Metering', description: 'High-pressure polyurethane metering and mix heads', href: '/equipment-options/polyurethane-processing-equipment/high-pressure-metering', categorySlug: 'high-pressure-metering' },
    { title: 'Low Pressure Metering', description: 'Low-pressure foam and polyurethane metering', href: '/equipment-options/polyurethane-processing-equipment/low-pressure-metering', categorySlug: 'low-pressure-metering' },
    { title: 'Pentane Capable Metering Machines', description: 'Pentane-capable metering for foam applications', href: '/equipment-options/polyurethane-processing-equipment/pentane-capable-metering-machines', categorySlug: 'pentane-capable-metering-machines' },
    { title: 'Urethane Foam Mixing Guns', description: 'Mixing guns for urethane foam processing', href: '/equipment-options/polyurethane-processing-equipment/urethane-foam-mixing-guns', categorySlug: 'urethane-foam-mixing-guns' },
  ],
};

const parentMeta = {
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

function decodeHtml(s) {
  return s.replace(/&#038;/g, '&').replace(/&amp;/g, '&').replace(/&#8217;/g, "'").replace(/\s+/g, ' ').trim();
}

const navSlugSkip = new Set([
  'feed',
  'wp-json',
  'in-field-installation',
  'training-education',
  'resin-dispensing-molding',
  'rebuild-repair',
  'abnox',
  'contact-us',
  'about-us',
  'quote',
  'bulk-chemical-storage',
  'fill-mix',
]);

async function extractProductNames(url, categorySlug) {
  const res = await fetch(url, { headers: { 'User-Agent': 'kirkco-content-sync/1.0' } });
  const html = await res.text();
  const h1 = html.indexOf('<h1');
  const end = html.indexOf('Engineering Engagement');
  const chunk = html.slice(h1 >= 0 ? h1 : 0, end > h1 ? end : h1 + 120000);
  const names = [];
  const seen = new Set();
  const re = /href="https:\/\/kirkcocorp\.com\/([a-z0-9-]+)\/?"/gi;
  let m;
  while ((m = re.exec(chunk))) {
    const slug = m[1];
    if (seen.has(slug) || navSlugSkip.has(slug) || slug.includes('equipment')) continue;
    if (!productBySlug.has(slug)) continue;
    seen.add(slug);
    names.push(productBySlug.get(slug));
  }
  if (names.length === 0 && categorySlug) {
    for (const product of products) {
      if (product.categories?.includes(categorySlug)) names.push(product.title);
    }
  }
  return names;
}

/** Live-site group lists where HTML does not expose product cards cleanly. */
const groupOverrides = {
  '/equipment-options/adhesives-sealants/two-component': [
    {
      title: 'Gear Metering',
      intro: 'Positive-displacement delivery for highly controlled continuous or shot flow.',
      body: '',
      names: ['Conti-Flow', 'Eldo Mix', 'GP-301'],
    },
    {
      title: 'Piston Metering',
      intro: 'Metering architecture for applications where piston-based delivery and system configuration are appropriate.',
      body: '',
      names: ['Econo-Mix', 'Ecostar EVO', 'Graco 8900', 'Graco Hydra Cat', 'Vario Mix'],
    },
    {
      title: 'Shot Metering',
      intro: 'Controlled delivery of discrete material shots.',
      body: '',
      names: ['Micro Mix', 'Vecdos ETwin'],
    },
    {
      title: 'LSR Processing Equipment',
      intro: 'Processing systems for liquid silicone rubber applications.',
      body: '',
      names: ['LSR-20 ELA & LSR-200 ELA', 'LSR-20 LC', 'LSR Conti-Mix 200', 'Silco Mix'],
    },
    {
      title: 'Mixing Valves',
      intro: 'Static and dynamic mixing for two-component delivery.',
      body: '',
      names: [
        'Dyna Static',
        'Dynamic Static Mixers',
        'Low Pressure Impingement Mixing Valve',
        'High Pressure Impingement Mixing Valve',
      ],
    },
  ],
};

function splitOverview(text) {
  if (!text) return [''];
  const parts = text.match(/[^.!?]+[.!?]+/g);
  if (!parts || parts.length <= 2) return [text.trim()];
  return [parts.slice(0, 2).join(' ').trim(), parts.slice(2).join(' ').trim()].filter(Boolean);
}

function studyIdForGroup(href) {
  return href.replace(/^\//, '').replace(/\//g, '-');
}

const subcategoryPages = {};
const groupPages = {};
const applicationStudies = [];

for (const page of wp) {
  if (page.kind === 'group' && navSystems[page.href]) {
    const parentLabel = parentMeta[page.href]?.parentLabel ?? page.title;
    const overviewParts = splitOverview(page.overview);
    const studySections = page.architectureSections?.length
      ? page.architectureSections
      : [{ heading: 'Executive Overview', paragraphs: [page.overview || page.title] }];
    const studyId = studyIdForGroup(page.href);
    applicationStudies.push({
      id: studyId,
      title: `${parentLabel} Application Architecture`,
      nda: false,
      sections: studySections.slice(0, 8),
    });

    groupPages[page.href] = {
      href: page.href,
      title: page.title,
      description: page.description || overviewParts[0]?.slice(0, 240) || page.title,
      breadcrumb: [
        { label: 'Home', href: '/' },
        { label: 'Equipment Options', href: '/equipment-options' },
        { label: parentLabel },
      ],
      heroImage: '/images/equipment-hero.webp',
      heroAlt: `${parentLabel} equipment on a production line`,
      overviewImage: '/images/adhesive-bonding.jpg',
      overviewImageAlt: `${parentLabel} manufacturing application`,
      overviewHeading: overviewParts[0]?.slice(0, 120) || page.title,
      overview: overviewParts.length ? overviewParts : [page.overview || page.title],
      systems: navSystems[page.href],
      engagementHeading: 'Talk to an Engineer',
      engagementBody:
        'Kirkco supports confidential engineering engagements under NDA. Discuss your application requirements with our team and receive a system architecture tailored to your process.',
      platformsHeading: 'Technical Platforms',
      platforms: [{ heading: 'Process scope', items: studySections.map((s) => s.heading).slice(0, 6) }],
      architectures: [
        {
          heading: 'System architecture',
          groups: navSystems[page.href].map((system) => ({
            title: system.title,
            links: [{ label: system.title, href: system.href }],
          })),
        },
      ],
      applicationIds: [studyId],
      closing: 'Precision Metering System for Accuracy in your Process',
    };
  }
}

const skipSubcategory = new Set(['/equipment-options/adhesives-sealants/single-component']);

for (const page of wp) {
  if (page.kind !== 'subcategory') continue;
  if (skipSubcategory.has(page.href)) continue;
  const parentKey = Object.keys(parentMeta).find((key) => page.href.startsWith(`${key}/`));
  if (!parentKey) continue;
  const parent = parentMeta[parentKey];
  const categorySlug = categoryByHref.get(page.href);
  const leaf = page.title;
  const overrideGroups = groupOverrides[page.href];
  const names = overrideGroups
    ? overrideGroups.flatMap((g) => g.names)
    : await extractProductNames(`https://kirkcocorp.com${page.href}/`, categorySlug);
  const groups = overrideGroups
    ? overrideGroups
    : names.length > 0
      ? [
          {
            title: 'Equipment options',
            intro: page.overview?.slice(0, 160) || '',
            body: page.overview || '',
            names,
          },
        ]
      : [];

  const studyId = `${studyIdForGroup(page.href)}-architecture`;
  if (page.architectureSections?.length) {
    applicationStudies.push({
      id: studyId,
      title: `${page.title} Application Architecture`,
      nda: /NDA|Confidential/i.test(page.title),
      sections: page.architectureSections.slice(0, 10),
    });
  }

  subcategoryPages[page.href] = {
    href: page.href,
    title: page.title,
    description: page.description || page.overview?.slice(0, 240) || page.title,
    parentHref: parent.parentHref,
    parentLabel: parent.parentLabel,
    breadcrumbLeaf: leaf,
    categorySlug,
    overview: page.overview || page.title,
    groups,
    applicationIds: page.architectureSections?.length ? [studyId] : undefined,
    sections: page.architectureSections?.length ? undefined : page.architectureSections,
  };
}

const outDir = join(root, 'src/content/equipment/generated');
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'group-pages.json'), JSON.stringify(groupPages, null, 2));
writeFileSync(join(outDir, 'subcategory-pages.json'), JSON.stringify(subcategoryPages, null, 2));
writeFileSync(join(outDir, 'application-studies.json'), JSON.stringify(applicationStudies, null, 2));
console.log(
  `Generated ${Object.keys(groupPages).length} group pages, ${Object.keys(subcategoryPages).length} subcategory pages, ${applicationStudies.length} application studies.`,
);

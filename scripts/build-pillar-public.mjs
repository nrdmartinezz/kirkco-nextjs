/**
 * Project pillar-first draft evidence into public section names.
 * Brochure specs, provenance, and held rows are not written.
 */
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const packageDir = join(root, 'Kirkco_Pillar_First_Solution', 'Kirkco_Pillar_First');
const draftPath = join(packageDir, 'page_content_draft.json');
const registryPath = join(packageDir, 'existing_route_registry.json');
const mappingPath = join(packageDir, 'content_mapping.csv');
const outPath = join(root, 'src', 'content', 'pillar', 'public-sections.json');

const FAMILY_ROLES = new Set([
  'system_family',
  'process_technology',
  'service_scope',
  'application_capability',
]);

const HELD_GATES = new Set(['confirm_sourcing', 'resolve_mapping']);
const BLOCKED_NAMES = [
  'HPLF Axial Piston Head (closed mold)',
  'HPDF Dual Piston Head (open mold)',
  'HPRM Head (filler / powder)',
  'HPSH Axial Piston Head (spray)',
];

function readJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

function mappingSourceIds(csv) {
  const ids = [];
  for (const line of csv.split(/\r?\n/).slice(1)) {
    if (!line.trim()) continue;
    const id = Number(line.split(',')[0]);
    if (!Number.isInteger(id)) throw new Error(`Unreadable source row in content map: ${line.slice(0, 40)}`);
    ids.push(id);
  }
  return ids;
}

function hasSpec(value) {
  return (
    /(?:±\s*\d|\d[\d,./]*\s*(?:bar|psi|mpa|kpa|mpas|°\s*[cf]|vac|rpm|ml\/min|mm(?:²|³|2|3)?|kg\/|hz\b|kw\b))/i.test(
      value,
    ) ||
    /mPa[·.]?s/i.test(value) ||
    /\b(?:up to|from|to)\s+\d/i.test(value)
  );
}

function cleanName(value) {
  let text = String(value ?? '')
    .replace(/\s+/g, ' ')
    .replace(/,?\s*(?:up to|from|to)\s+[\d,.]+\s*[^\s,;)]*/gi, '')
    .replace(/\([^)]*\d[^)]*\)/g, '')
    .replace(/\s+/g, ' ')
    .replace(/[,\s]+$/g, '')
    .trim();
  if (hasSpec(text)) {
    text = text
      .replace(/\s+[–—-]\s+.*\d.*/u, '')
      .replace(/\s+/g, ' ')
      .trim();
  }
  if (!text || hasSpec(text) || text.length > 120) return '';
  return text;
}

function entryName(entry) {
  return cleanName(entry.model_statement) || cleanName(entry.source_name);
}

function detailPath(reference) {
  if (typeof reference !== 'string' || !reference.trim()) return '';
  const match = reference.match(/https?:\/\/(?:[\w.-]+\.)?kirkcocorp\.com(\/[^\s#?]*)/i);
  if (!match) return '';
  const path = match[1].replace(/\/+$/, '');
  return path.startsWith('/') ? path : '';
}

function walk(dir, files = []) {
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

function existingPaths() {
  const paths = new Set();
  const products = readJson(join(root, 'src', 'content', 'products.json'));
  for (const product of products) {
    if (product.slug) paths.add(`/${product.slug}`);
    for (const variant of product.variants ?? []) {
      if (variant.slug) paths.add(`/${variant.slug}`);
    }
  }
  for (const file of [
    join(root, 'src', 'content', 'equipment', 'generated', 'group-pages.json'),
    join(root, 'src', 'content', 'equipment', 'generated', 'subcategory-pages.json'),
  ]) {
    for (const href of Object.keys(readJson(file))) paths.add(href);
  }
  const sourceFiles = [...walk(join(root, 'src')), ...walk(join(root, 'app'))].filter((file) =>
    /\.(tsx?|jsx?|mjs)$/.test(file),
  );
  for (const file of sourceFiles) {
    const text = readFileSync(file, 'utf8');
    for (const match of text.matchAll(/['"](\/[^'"#?\s]+)['"]/g)) {
      const path = match[1].replace(/\/+$/, '') || '/';
      if (path.startsWith('/images') || path.startsWith('/products') || path.includes('${')) continue;
      paths.add(path);
    }
  }
  for (const file of walk(join(root, 'app'))) {
    const rel = relative(join(root, 'app'), file).replaceAll('\\', '/');
    if (!rel.endsWith('/page.tsx') && rel !== 'page.tsx') continue;
    if (rel.includes('[') || rel.startsWith('api/')) continue;
    const route = rel === 'page.tsx' ? '/' : `/${rel.slice(0, -'/page.tsx'.length)}`;
    paths.add(route);
  }
  return paths;
}

function familyTitle(definition, entries) {
  for (const suggestion of definition.title_suggestions ?? []) {
    const clean = cleanName(suggestion);
    if (clean) return clean;
  }
  const familyEntry = entries.find((entry) => FAMILY_ROLES.has(entry.content_role));
  return entryName(familyEntry ?? entries[0] ?? {});
}

function detailHref(entries, pageHref, knownPaths) {
  const ordered = [
    ...entries.filter((entry) => FAMILY_ROLES.has(entry.content_role)),
    ...entries.filter((entry) => !FAMILY_ROLES.has(entry.content_role)),
  ];
  for (const entry of ordered) {
    const path = detailPath(entry.secondary_detail_reference);
    if (!path || path === pageHref || !knownPaths.has(path)) continue;
    return path;
  }
  return undefined;
}

function project(draft, registry, knownPaths) {
  const allowlist = new Set(registry.nodes.map((node) => node.path));
  const definitions = new Map(draft.content_definitions.map((definition) => [definition.content_key, definition]));
  const represented = new Set();
  const pages = [];

  for (const page of draft.pages) {
    if (!allowlist.has(page.existing_path)) {
      throw new Error(`Destination is not an existing route: ${page.existing_path}`);
    }
    const sections = [];
    for (const section of page.sections) {
      const families = [];
      for (const ref of section.content_refs) {
        const definition = definitions.get(ref.content_key);
        if (!definition) throw new Error(`Missing definition ${ref.content_key}`);
        const publicEntries = definition.source_entries.filter((entry) => entry.editorial_gate === 'editorial_review');
        if (publicEntries.length === 0) continue;
        const title = familyTitle(definition, publicEntries);
        if (!title) {
          throw new Error(`No public name for ${ref.content_key} on ${page.existing_path}`);
        }
        const seen = new Set([title.toLowerCase()]);
        const models = [];
        for (const entry of publicEntries) {
          const name = entryName(entry);
          if (!name) {
            throw new Error(`Editorial row ${entry.source_row} has no spec-free name`);
          }
          represented.add(entry.source_row);
          const key = name.toLowerCase();
          if (seen.has(key)) continue;
          seen.add(key);
          models.push({ name });
        }
        const family = {
          contentKey: definition.content_key,
          title,
          models,
        };
        const href = detailHref(publicEntries, page.existing_path, knownPaths);
        if (href) family.detailHref = href;
        families.push(family);
      }
      if (families.length === 0) continue;
      sections.push({
        sectionKey: section.section_key,
        heading: section.heading_suggestion,
        families,
      });
    }
    if (sections.length === 0) continue;
    pages.push({ href: page.existing_path, sections });
  }

  return { pages, represented };
}

function assertProjection(draft, publicPages, represented) {
  const editorial = [];
  const held = [];
  for (const definition of draft.content_definitions) {
    for (const entry of definition.source_entries) {
      if (entry.editorial_gate === 'editorial_review') editorial.push(entry);
      else if (HELD_GATES.has(entry.editorial_gate)) held.push(entry);
      else throw new Error(`Unexpected gate on row ${entry.source_row}`);
    }
  }
  const editorialIds = new Set(editorial.map((entry) => entry.source_row));
  for (const id of represented) {
    if (!editorialIds.has(id)) throw new Error(`Held or unknown source row entered the public projection: ${id}`);
  }
  for (const id of editorialIds) {
    if (!represented.has(id)) throw new Error(`Editorial row ${id} is missing from the public projection`);
  }
  for (const entry of held) {
    if (represented.has(entry.source_row)) throw new Error(`Held row ${entry.source_row} leaked`);
  }

  const serialized = JSON.stringify(publicPages);
  const forbiddenKeys = [
    'source_row',
    'editorial_gate',
    'raw_specification_statement',
    'source_document',
    'options_statement',
    'sourcing_status',
    'context_notes',
    'approved_narrative',
  ];
  for (const key of forbiddenKeys) {
    if (serialized.includes(`"${key}"`)) throw new Error(`Public file contains ${key}`);
  }
  for (const name of BLOCKED_NAMES) {
    if (serialized.includes(name)) throw new Error(`Held mixing-head name leaked: ${name}`);
  }
  const specTexts = [];
  for (const definition of draft.content_definitions) {
    for (const entry of definition.source_entries) {
      for (const field of ['raw_specification_statement', 'options_statement']) {
        const value = String(entry[field] ?? '').trim();
        if (value.length >= 12) specTexts.push(value);
      }
    }
  }
  for (const value of specTexts) {
    if (serialized.includes(value)) throw new Error(`Brochure spec leaked: ${value.slice(0, 80)}`);
  }
  const publicStrings = [];
  function walkStrings(value) {
    if (typeof value === 'string') publicStrings.push(value);
    else if (Array.isArray(value)) value.forEach(walkStrings);
    else if (value && typeof value === 'object') Object.values(value).forEach(walkStrings);
  }
  walkStrings(publicPages);
  for (const value of publicStrings) {
    if (hasSpec(value)) throw new Error(`Public name still contains a spec: ${value}`);
  }

  function family(href, sectionKey, contentKey) {
    const page = publicPages.pages.find((item) => item.href === href);
    const section = page?.sections.find((item) => item.sectionKey === sectionKey);
    return section?.families.find((item) => item.contentKey === contentKey);
  }
  const metering = publicPages.pages
    .find((page) => page.href === '/equipment-options/adhesives-sealants/single-component')
    ?.sections.find((section) => section.sectionKey === 'single-component-metering-systems');
  const meteringKeys = metering?.families.map((family) => family.contentKey) ?? [];
  for (const key of [
    'single-component-gear-metering-system',
    'single-component-piston-metering-system',
    'single-component-progressive-cavity-metering-system',
  ]) {
    if (!meteringKeys.includes(key)) throw new Error(`Pilot family missing: ${key}`);
  }
  const diaphragm = family(
    '/equipment-options/lubrication/dispensing',
    'valve-technology-families',
    'diaphragm-dispensing-valves',
  );
  if (!diaphragm?.models.some((model) => model.name === 'WMAV Membrane Outlet Valve')) {
    throw new Error('Diaphragm model name missing');
  }
  if (diaphragm.detailHref !== '/diaphragm-dispensing-valve') {
    throw new Error(`Diaphragm detail link missing: ${diaphragm.detailHref}`);
  }
  const flowA = family(
    '/equipment-options/lubrication/flow-regulation',
    'flow-regulation-and-measurement',
    'flow-meters',
  );
  const flowB = family(
    '/equipment-options/process-control/monitoring-analytics',
    'flow-and-presence-monitoring',
    'flow-meters',
  );
  if (!flowA || JSON.stringify(flowA) !== JSON.stringify(flowB)) {
    throw new Error('flow-meters cross-list is not one shared definition');
  }
  if (publicPages.pages.some((page) => page.href === '/equipment-options')) {
    throw new Error('Held Equipment Options hub section was published');
  }
}

function validateDraft(expectedIds) {
  const script = `
    import { readFileSync } from 'node:fs';
    import { validatePillarDraft } from ${JSON.stringify(pathToFileURL(join(packageDir, 'validate_pillar_draft.ts')).href)};
    const draft = JSON.parse(readFileSync(${JSON.stringify(draftPath)}, 'utf8'));
    const registry = JSON.parse(readFileSync(${JSON.stringify(registryPath)}, 'utf8'));
    const result = validatePillarDraft(draft, registry, ${JSON.stringify(expectedIds)});
    if (result.newRoutes !== 0 || result.sourceRows !== ${expectedIds.length}) {
      throw new Error('Draft validation returned an unexpected route or row count');
    }
    console.log(JSON.stringify(result));
  `;
  const result = spawnSync(process.execPath, ['--experimental-strip-types', '--input-type=module', '-e', script], {
    encoding: 'utf8',
  });
  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || 'validate_pillar_draft.ts failed');
  }
  return JSON.parse(result.stdout.trim());
}

const draft = readJson(draftPath);
const registry = readJson(registryPath);
const expectedIds = mappingSourceIds(readFileSync(mappingPath, 'utf8'));
if (expectedIds.length !== 353 || new Set(expectedIds).size !== 353) {
  throw new Error(`Expected 353 unique source rows, found ${expectedIds.length}`);
}
const draftValidation = validateDraft(expectedIds);
const knownPaths = existingPaths();
const { pages, represented } = project(draft, registry, knownPaths);
const publicPages = { pages };
assertProjection(draft, publicPages, represented);
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, `${JSON.stringify(publicPages, null, 2)}\n`);
console.log(
  JSON.stringify(
    {
      draftValidation,
      pages: pages.length,
      sections: pages.reduce((sum, page) => sum + page.sections.length, 0),
      families: pages.reduce(
        (sum, page) => sum + page.sections.reduce((inner, section) => inner + section.families.length, 0),
        0,
      ),
      editorialRows: represented.size,
    },
    null,
    2,
  ),
);

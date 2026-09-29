import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const xmlPath = process.argv[2];
if (!xmlPath) {
  console.error('Usage: node scripts/import-industries.mjs <wordpress-export.xml>');
  process.exit(1);
}

const xml = await readFile(xmlPath, 'utf8');
const products = JSON.parse(await readFile(path.join(root, 'src/content/products.json'), 'utf8'));

function decode(value) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\u00a0/g, ' ');
}

function field(item, name) {
  const match = item.match(new RegExp(`<${name}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${name}>`));
  return decode(match?.[1] ?? '').trim();
}

function metaMap(item) {
  const meta = {};
  const pattern =
    /<wp:meta_key><!\[CDATA\[([^\]]+)\]\]><\/wp:meta_key>\s*<wp:meta_value><!\[CDATA\[([\s\S]*?)\]\]><\/wp:meta_value>/g;
  for (const match of item.matchAll(pattern)) meta[match[1]] = decode(match[2]);
  return meta;
}

const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map((match) => match[1]);
const attachments = new Map();
for (const item of items) {
  if (!item.includes('<wp:post_type><![CDATA[attachment]]>')) continue;
  const id = item.match(/<wp:post_id>(\d+)<\/wp:post_id>/)?.[1];
  const url = item.match(/<wp:attachment_url><!\[CDATA\[([^\]]+)\]\]>/)?.[1];
  const title = field(item, 'title');
  if (id && url) attachments.set(id, { url, title });
}

const rawIndustries = items
  .filter((item) => item.includes('<wp:post_type><![CDATA[industry]]>'))
  .filter((item) => field(item, 'wp:status') === 'publish')
  .map((item) => ({
    id: item.match(/<wp:post_id>(\d+)<\/wp:post_id>/)?.[1],
    slug: field(item, 'wp:post_name'),
    title: field(item, 'title'),
    parentId: item.match(/<wp:post_parent>(\d+)<\/wp:post_parent>/)?.[1] ?? '0',
    excerpt: field(item, 'excerpt:encoded'),
    meta: metaMap(item),
  }));

const byId = new Map(rawIndustries.map((industry) => [industry.id, industry]));

function hrefFor(industry) {
  const parent = industry.parentId !== '0' ? byId.get(industry.parentId) : undefined;
  return parent ? `/industry/${parent.slug}/${industry.slug}` : `/industry/${industry.slug}`;
}

function localHref(value) {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (/^\d+$/.test(trimmed)) {
    const industry = byId.get(trimmed);
    return industry ? hrefFor(industry) : undefined;
  }
  try {
    const url = new URL(trimmed, 'https://kirkcocorp.com');
    if (url.hostname === 'kirkcocorp.com' || url.hostname.endsWith('.kirkcocorp.com')) {
      const pathname = url.pathname.replace(/\/$/, '');
      return pathname || '/';
    }
    if (url.protocol === 'http:' || url.protocol === 'https:') return url.href;
  } catch {
    return undefined;
  }
  return trimmed.startsWith('/') ? trimmed.replace(/\/$/, '') || '/' : undefined;
}

function normalizeName(value) {
  return value
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

const productHrefs = new Map();
for (const product of products) {
  productHrefs.set(normalizeName(product.title), `/${product.slug}`);
  productHrefs.set(normalizeName(product.slug), `/${product.slug}`);
}
const navigationSource = await readFile(path.join(root, 'src/config/navigation.ts'), 'utf8');
for (const match of navigationSource.matchAll(/label:\s*'([^']+)',\s*href:\s*'([^']+)'/g)) {
  productHrefs.set(normalizeName(match[1]), match[2]);
}
for (const match of navigationSource.matchAll(/label:\s*'([^']+)',\s*\n\s*href:\s*'([^']+)'/g)) {
  productHrefs.set(normalizeName(match[1]), match[2]);
}

function productHref(name) {
  const key = normalizeName(name);
  if (productHrefs.has(key)) return productHrefs.get(key);
  let best;
  for (const [candidate] of productHrefs) {
    if (candidate.length < 8) continue;
    const nested = key.includes(candidate) || candidate.includes(key);
    const close = nested && Math.min(key.length, candidate.length) >= Math.max(key.length, candidate.length) * 0.55;
    if (close && (!best || candidate.length > best.length)) best = candidate;
  }
  return best ? productHrefs.get(best) : undefined;
}

function plainText(parts) {
  return parts
    .map((part) => part.text)
    .join('')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanText(value) {
  return value.replace(/\s+/g, ' ').trim();
}

function parseAttributes(source) {
  const attributes = {};
  for (const match of source.matchAll(/([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*("([^"]*)"|'([^']*)')/g)) {
    attributes[match[1].toLowerCase()] = decode(match[3] ?? match[4] ?? '');
  }
  return attributes;
}

function tokenize(html) {
  const tokens = [];
  const pattern = /<!--[\s\S]*?-->|<\/([a-zA-Z0-9]+)\s*>|<([a-zA-Z0-9]+)([^>]*?)(\/?)>|([^<]+)/g;
  for (const match of html.matchAll(pattern)) {
    if (match[0].startsWith('<!--')) continue;
    if (match[1]) tokens.push({ type: 'end', tag: match[1].toLowerCase() });
    else if (match[2]) {
      const tag = match[2].toLowerCase();
      tokens.push({
        type: 'start',
        tag,
        attributes: parseAttributes(match[3] ?? ''),
        void: Boolean(match[4]) || tag === 'br' || tag === 'img' || tag === 'hr',
      });
    } else if (match[5]) tokens.push({ type: 'text', text: match[5] });
  }
  return tokens;
}

function pushPart(parts, part) {
  const text = part.text.replace(/\s+/g, ' ');
  if (!text || text === ' ') {
    if (parts.length && !parts.at(-1).text.endsWith(' ')) parts.at(-1).text += ' ';
    return;
  }
  const previous = parts.at(-1);
  if (
    previous &&
    previous.bold === part.bold &&
    previous.italic === part.italic &&
    previous.href === part.href
  ) {
    previous.text += text;
    return;
  }
  parts.push({ ...part, text });
}

function parseBlocks(html) {
  const source = html.replace(/\r/g, '').trim();
  if (!source) return [];
  if (!/<[a-z]/i.test(source)) {
    return source
      .split(/\n{2,}/)
      .map((paragraph) => cleanText(paragraph))
      .filter(Boolean)
      .map((text) => ({ type: 'paragraph', parts: [{ text }] }));
  }

  const tokens = tokenize(source);
  const blocks = [];
  let index = 0;

  function parseInline(stopTags, style = {}) {
    const parts = [];
    while (index < tokens.length) {
      const token = tokens[index];
      if (token.type === 'end' && stopTags.has(token.tag)) break;
      if (token.type === 'text') {
        pushPart(parts, { text: token.text.replace(/\n+/g, ' '), ...style });
        index += 1;
        continue;
      }
      if (token.type === 'start' && token.tag === 'br') {
        pushPart(parts, { text: ' ', ...style });
        index += 1;
        continue;
      }
      if (token.type === 'start' && (token.tag === 'strong' || token.tag === 'b')) {
        index += 1;
        parts.push(...parseInline(new Set(['strong', 'b']), { ...style, bold: true }));
        if (tokens[index]?.type === 'end') index += 1;
        continue;
      }
      if (token.type === 'start' && (token.tag === 'em' || token.tag === 'i')) {
        index += 1;
        parts.push(...parseInline(new Set(['em', 'i']), { ...style, italic: true }));
        if (tokens[index]?.type === 'end') index += 1;
        continue;
      }
      if (token.type === 'start' && token.tag === 'a') {
        index += 1;
        const href = localHref(token.attributes.href);
        parts.push(...parseInline(new Set(['a']), { ...style, href }));
        if (tokens[index]?.type === 'end') index += 1;
        continue;
      }
      if (token.type === 'start' && token.tag === 'span') {
        index += 1;
        const weight = token.attributes.style ?? '';
        const bold = /font-weight:\s*(bold|[6-9]00)/i.test(weight);
        parts.push(...parseInline(new Set(['span']), bold ? { ...style, bold: true } : style));
        if (tokens[index]?.type === 'end') index += 1;
        continue;
      }
      if (token.type === 'start' && token.tag === 'img') {
        index += 1;
        continue;
      }
      if (token.type === 'end') {
        index += 1;
        continue;
      }
      index += 1;
      parts.push(...parseInline(stopTags, style));
    }
    return parts.filter((part) => part.text.trim());
  }

  function parseList() {
    const items = [];
    while (index < tokens.length) {
      const token = tokens[index];
      if (token.type === 'end' && token.tag === 'ul') break;
      if (token.type === 'start' && token.tag === 'li') {
        index += 1;
        const parts = parseInline(new Set(['li']));
        if (tokens[index]?.type === 'end' && tokens[index].tag === 'li') index += 1;
        if (plainText(parts)) items.push(parts);
        continue;
      }
      index += 1;
    }
    return items;
  }

  function addParagraph(parts) {
    const text = plainText(parts);
    if (!text) return;
    blocks.push({ type: 'paragraph', parts });
  }

  const loose = [];
  function flushLoose() {
    const text = plainText(loose);
    loose.length = 0;
    if (!text) return;
    for (const paragraph of text.split(/\n{2,}/)) {
      const trimmed = paragraph.trim();
      if (trimmed) blocks.push({ type: 'paragraph', parts: [{ text: trimmed }] });
    }
  }

  while (index < tokens.length) {
    const token = tokens[index];
    if (token.type === 'text') {
      if (token.text.includes('\n\n') && loose.length) flushLoose();
      pushPart(loose, { text: token.text.replace(/[ \t]*\n[ \t]*/g, '\n') });
      index += 1;
      continue;
    }
    if (token.type !== 'start') {
      index += 1;
      continue;
    }
    if (token.tag === 'ul') {
      flushLoose();
      index += 1;
      const items = parseList();
      if (tokens[index]?.type === 'end' && tokens[index].tag === 'ul') index += 1;
      if (items.length) blocks.push({ type: 'list', items });
      continue;
    }
    if (token.tag === 'h2' || token.tag === 'h3' || token.tag === 'h4') {
      flushLoose();
      const level = Number(token.tag[1]);
      index += 1;
      const parts = parseInline(new Set([token.tag]));
      if (tokens[index]?.type === 'end') index += 1;
      if (plainText(parts)) blocks.push({ type: 'heading', level, parts });
      continue;
    }
    if (token.tag === 'p') {
      flushLoose();
      index += 1;
      addParagraph(parseInline(new Set(['p'])));
      if (tokens[index]?.type === 'end' && tokens[index].tag === 'p') index += 1;
      continue;
    }
    if (token.tag === 'img') {
      flushLoose();
      const src = token.attributes.src;
      if (src) blocks.push({ type: 'image', src, alt: token.attributes.alt || '' });
      index += 1;
      continue;
    }
    if (token.tag === 'br') {
      pushPart(loose, { text: '\n' });
      index += 1;
      continue;
    }
    index += 1;
  }
  flushLoose();
  return blocks;
}

function imageFromId(id) {
  if (!id || !/^\d+$/.test(id)) return undefined;
  return attachments.get(id);
}

const imageJobs = new Map();

function rememberImage(url, slug, name) {
  if (!url) return undefined;
  const extension = path.extname(new URL(url).pathname).toLowerCase() || '.jpg';
  const filename = `${name}${extension}`;
  const local = `/images/industries/${slug}/${filename}`;
  imageJobs.set(url, { slug, filename, local });
  return local;
}

function section(meta, number, slug) {
  const heading = cleanText(meta[`section_${number}_header`] ?? '');
  const blocks = parseBlocks(meta[`section_${number}_content`] ?? '');
  const image = imageFromId(meta[`section_${number}_image`] ?? '');
  if (!heading && !blocks.length && !image) return undefined;
  return {
    heading,
    blocks,
    image: image ? rememberImage(image.url, slug, `section-${number}`) : undefined,
    imageAlt: image?.title || heading,
  };
}

function repeater(meta, countKey, prefix, read) {
  const count = Number(meta[countKey]);
  if (!Number.isFinite(count) || count < 1) return [];
  return Array.from({ length: count }, (_, index) => read(meta, `${prefix}${index}_`)).filter(Boolean);
}

const pages = rawIndustries.map((industry) => {
  const meta = industry.meta;
  const href = hrefFor(industry);
  const parent = industry.parentId !== '0' ? byId.get(industry.parentId) : undefined;
  const hero = imageFromId(meta.hero_image);
  const content = imageFromId(meta.content_image);
  const summary = parseBlocks(meta.hero_summary || industry.excerpt);
  const body = parseBlocks(meta.industry_content ?? '');
  const sections = [section(meta, 1, industry.slug), section(meta, 2, industry.slug)].filter(Boolean);
  const extras = repeater(meta, 'aa-content-additional', 'aa-content-additional_', (source, key) => {
    const heading = cleanText(source[`${key}aa-title`] ?? '');
    const blocks = parseBlocks(source[`${key}aa-content`] ?? '');
    if (!heading && !blocks.length) return undefined;
    return { heading, blocks };
  });
  const caseTitle = cleanText(meta.application_case_study ?? '');
  const caseBlocks = parseBlocks(meta.application_case_study_content ?? '');
  const productsFromRows = repeater(meta, 'related_products', 'related_products_', (source, key) => {
    const title = cleanText(source[`${key}product_name`] ?? '');
    if (!title) return undefined;
    const description = cleanText(source[`${key}product_description`] || source[`${key}description`] || '');
    return {
      title,
      description: description || undefined,
      href: productHref(title) ?? localHref(source[`${key}product_url`] ?? ''),
    };
  });
  const productsFromHtml = Number.isFinite(Number(meta.related_products))
    ? []
    : [...(meta.related_products ?? '').matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)].map(
        (match) => ({
          title: cleanText(match[2].replace(/<[^>]+>/g, '')),
          href: localHref(match[1]),
        }),
      );
  const related = repeater(meta, 'related_industries', 'related_industries_', (source, key) => {
    const hrefValue = localHref(source[`${key}industry_url`] ?? '');
    const linked = rawIndustries.find((entry) => hrefFor(entry) === hrefValue || entry.id === source[`${key}industry_url`]);
    const title = linked?.title || cleanText(source[`${key}industry_name`] ?? '');
    const relatedHref = linked ? hrefFor(linked) : hrefValue;
    if (!title || !relatedHref || relatedHref === href) return undefined;
    return { title, href: relatedHref };
  });

  return {
    slug: industry.slug,
    href,
    title: industry.title,
    parentHref: parent ? hrefFor(parent) : undefined,
    parentTitle: parent?.title,
    description: plainText(summary[0]?.parts ?? []) || industry.excerpt.replace(/\s+/g, ' ').trim(),
    heroImage: hero ? rememberImage(hero.url, industry.slug, 'hero') : `/images/${industry.slug}.jpg`,
    heroImageAlt: hero?.title || industry.title,
    contentImage: content ? rememberImage(content.url, industry.slug, 'content') : undefined,
    contentImageAlt: content?.title || industry.title,
    summary,
    body,
    sections,
    extras,
    caseStudy: caseTitle || caseBlocks.length ? { title: caseTitle, blocks: caseBlocks } : undefined,
    products: productsFromRows.length ? productsFromRows : productsFromHtml,
    productNotes: Number.isFinite(Number(meta.related_products)) ? [] : parseBlocks(meta.related_products ?? ''),
    related,
  };
});

for (const page of pages) {
  for (const block of [...page.body, ...page.sections.flatMap((entry) => entry.blocks), ...(page.caseStudy?.blocks ?? [])]) {
    if (block.type === 'image' && block.src.startsWith('http')) {
      const filename = path.basename(new URL(block.src).pathname);
      block.src = rememberImage(block.src, page.slug, filename.replace(path.extname(filename), '')) ?? block.src;
    }
  }
}

function fileExists(src) {
  return src?.startsWith('/images/') && existsSync(path.join(root, 'public', src));
}

await mkdir(path.join(root, 'public/images/industries'), { recursive: true });
let downloaded = 0;
let failed = 0;
await Promise.all(
  [...imageJobs.entries()].map(async ([url, file]) => {
    const directory = path.join(root, 'public/images/industries', file.slug);
    await mkdir(directory, { recursive: true });
    const destination = path.join(directory, file.filename);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(String(response.status));
      await writeFile(destination, Buffer.from(await response.arrayBuffer()));
      downloaded += 1;
    } catch (error) {
      failed += 1;
      console.error('image failed', url, error.message);
    }
  }),
);

function keepImage(src) {
  return Boolean(src && fileExists(src));
}

for (const page of pages) {
  if (!keepImage(page.heroImage)) {
    const fallback = `/images/${page.slug}.jpg`;
    page.heroImage = fileExists(fallback) ? fallback : '/images/equipment-hero.webp';
  }
  if (!keepImage(page.contentImage)) page.contentImage = undefined;
  for (const entry of page.sections) {
    if (!keepImage(entry.image)) entry.image = undefined;
  }
  const lists = [page.body, page.summary, ...(page.caseStudy ? [page.caseStudy.blocks] : []), ...page.extras.map((entry) => entry.blocks), ...page.sections.map((entry) => entry.blocks)];
  for (const blocks of lists) {
    for (let index = blocks.length - 1; index >= 0; index -= 1) {
      if (blocks[index].type === 'image' && !keepImage(blocks[index].src)) blocks.splice(index, 1);
    }
  }
}

const output = path.join(root, 'src/content/industries.json');
await writeFile(output, `${JSON.stringify(pages, null, 2)}\n`);
console.log(`Wrote ${pages.length} industries, downloaded ${downloaded} images, ${failed} failed`);

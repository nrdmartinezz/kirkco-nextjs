import { parseOptionalUsAddress, type UsAddress } from '@/lib/us-address';

export const QUOTE_STORAGE_KEY = 'kirkco:quote';
export const QUOTE_MAX_LINES = 25;
export const QUOTE_MAX_QTY = 999;
export const QUOTE_NOTES_MAX = 500;

export type QuoteLine = {
  slug: string;
  title: string;
  qty: number;
  notes?: string;
};

export type QuoteCatalogItem = {
  slug: string;
  title: string;
  tagline?: string;
  image?: { src: string; alt: string };
};

export type QuoteCompany = {
  name: string;
  address: UsAddress | null;
};

export type QuoteDraft = {
  lines: QuoteLine[];
};

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : null;
}

function clampQty(value: number) {
  if (!Number.isInteger(value) || value < 1) return 0;
  return Math.min(QUOTE_MAX_QTY, value);
}

export function parseQuoteLines(value: unknown): QuoteLine[] {
  if (!Array.isArray(value)) return [];

  const lines: QuoteLine[] = [];
  const seen = new Set<string>();

  for (const item of value) {
    const record = asRecord(item);
    if (!record) continue;

    const slug = typeof record.slug === 'string' ? record.slug.trim().slice(0, 200) : '';
    const title = typeof record.title === 'string' ? record.title.trim().slice(0, 200) : '';
    const qty = clampQty(typeof record.qty === 'number' ? record.qty : Number.parseInt(String(record.qty), 10));
    if (!slug || !title || qty < 1 || seen.has(slug)) continue;

    seen.add(slug);
    const notes = typeof record.notes === 'string' ? record.notes.trim().slice(0, QUOTE_NOTES_MAX) : '';
    lines.push({ slug, title, qty, ...(notes ? { notes } : {}) });
    if (lines.length >= QUOTE_MAX_LINES) break;
  }

  return lines;
}

export function parseSubmittedQuoteLines(
  value: unknown,
): Array<{ slug: string; qty: number; notes?: string }> | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > QUOTE_MAX_LINES) return null;

  const lines: Array<{ slug: string; qty: number; notes?: string }> = [];
  const seen = new Set<string>();

  for (const item of value) {
    const record = asRecord(item);
    if (!record) return null;

    const slug = typeof record.slug === 'string' ? record.slug.trim() : '';
    const qty = typeof record.qty === 'number' ? record.qty : Number.NaN;
    if (!slug || seen.has(slug) || !Number.isInteger(qty) || qty < 1 || qty > QUOTE_MAX_QTY) return null;

    seen.add(slug);
    const notes = typeof record.notes === 'string' ? record.notes.trim().slice(0, QUOTE_NOTES_MAX) : '';
    lines.push({ slug, qty, ...(notes ? { notes } : {}) });
  }

  return lines;
}

export function addQuoteLine(lines: QuoteLine[], item: { slug: string; title: string }): QuoteLine[] {
  const existing = lines.find((line) => line.slug === item.slug);
  if (existing) {
    return lines.map((line) =>
      line.slug === item.slug ? { ...line, qty: Math.min(QUOTE_MAX_QTY, line.qty + 1) } : line,
    );
  }
  if (lines.length >= QUOTE_MAX_LINES) return lines;
  return [...lines, { slug: item.slug, title: item.title, qty: 1 }];
}

export function setQuoteQty(lines: QuoteLine[], slug: string, qty: number): QuoteLine[] {
  const next = clampQty(qty);
  if (next < 1) return lines;
  return lines.map((line) => (line.slug === slug ? { ...line, qty: next } : line));
}

export function setQuoteNotes(lines: QuoteLine[], slug: string, notes: string): QuoteLine[] {
  const next = notes.slice(0, QUOTE_NOTES_MAX);
  return lines.map((line) => {
    if (line.slug !== slug) return line;
    if (!next.trim()) {
      const { notes: _notes, ...rest } = line;
      return rest;
    }
    return { ...line, notes: next };
  });
}

export function removeQuoteLine(lines: QuoteLine[], slug: string): QuoteLine[] {
  return lines.filter((line) => line.slug !== slug);
}

export function readQuoteDraft(): QuoteLine[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(QUOTE_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    const record = asRecord(parsed);
    return parseQuoteLines(record?.lines ?? parsed);
  } catch {
    return [];
  }
}

export function writeQuoteDraft(lines: QuoteLine[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(QUOTE_STORAGE_KEY, JSON.stringify({ lines } satisfies QuoteDraft));
}

export function parseQuoteCompany(value: unknown): { ok: true; company: QuoteCompany } | { ok: false; message: string } {
  const record = asRecord(value);
  if (!record) return { ok: false, message: 'Check the name, email, and company.' };
  if ('country' in record && record.country != null && String(record.country).trim() !== '') {
    return { ok: false, message: 'Quotes are limited to United States addresses.' };
  }

  const name = typeof record.name === 'string' ? record.name.trim().slice(0, 200) : '';
  if (!name) return { ok: false, message: 'Check the name, email, and company.' };

  const address = parseOptionalUsAddress(record.address);
  if (address.ok === false) return address;
  return { ok: true, company: { name, address: address.address } };
}

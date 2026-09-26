import { NextResponse } from 'next/server';
import { site } from '@/config/site';
import { getProducts } from '@/lib/products';
import { parseQuoteCompany, parseSubmittedQuoteLines } from '@/lib/quote';
import { supabaseAdmin } from '@/lib/supabase';

const formTypes = ['contact', 'quote', 'request-a-quote'] as const;

type FormType = (typeof formTypes)[number];

function text(value: unknown, max: number) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, max);
}

function isFormType(value: string): value is FormType {
  return formTypes.some((formType) => formType === value);
}

function unavailable() {
  return NextResponse.json({ ok: false, message: 'Form is temporarily unavailable' }, { status: 503 });
}

function invalid(message: string) {
  return NextResponse.json({ ok: false, message }, { status: 400 });
}

async function recaptchaOk(token: string) {
  const secret = process.env.RECAPTCHA_SECRET;
  if (!secret) return 'missing-secret' as const;
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token }),
  });
  const result = (await response.json()) as { success?: boolean; score?: number };
  if (result.success && typeof result.score === 'number' && result.score >= 0.5) return 'ok' as const;
  return 'failed' as const;
}

async function quotePayload(record: Record<string, unknown>) {
  const submitted = parseSubmittedQuoteLines(
    record.payload && typeof record.payload === 'object' && 'lines' in record.payload
      ? (record.payload as { lines?: unknown }).lines
      : undefined,
  );
  if (!submitted) return { ok: false as const, message: 'Add at least one product to your quote.' };

  const company = parseQuoteCompany(
    record.payload && typeof record.payload === 'object' && 'company' in record.payload
      ? (record.payload as { company?: unknown }).company
      : undefined,
  );
  if (!company.ok) return company;

  const products = await getProducts();
  const bySlug = new Map(products.map((product) => [product.slug, product]));
  const lines = [];
  for (const line of submitted) {
    const product = bySlug.get(line.slug);
    if (!product) return { ok: false as const, message: 'That product is not available.' };
    lines.push({ slug: product.slug, title: product.title, qty: line.qty, ...(line.notes ? { notes: line.notes } : {}) });
  }

  return { ok: true as const, payload: { lines, company: company.company } };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return invalid('Invalid request');
  }

  if (!body || typeof body !== 'object') {
    return invalid('Invalid request');
  }

  const record = body as Record<string, unknown>;
  if (text(record._gotcha, 200)) return NextResponse.json({ ok: true });

  const formType = text(record.form_type, 40);
  const name = text(record.name, 200);
  const email = text(record.email, 320);
  const phone = text(record.phone, 40);
  const message = text(record.message, 5000);

  if (!isFormType(formType) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return invalid('Check the name, email, and message.');
  }

  if (formType !== 'quote' && (!name || !message)) {
    return invalid('Check the name, email, and message.');
  }

  if (formType === 'quote' && !name) {
    return invalid('Check the name, email, and company.');
  }

  let payload: Record<string, unknown> = {};
  if (formType === 'quote') {
    let parsed;
    try {
      parsed = await quotePayload(record);
    } catch {
      return unavailable();
    }
    if (!parsed.ok) return invalid(parsed.message);
    payload = parsed.payload;
  }

  if (site.recaptchaSiteKey) {
    const verdict = await recaptchaOk(text(record.recaptcha, 4000));
    if (verdict === 'missing-secret') return unavailable();
    if (verdict === 'failed') {
      return invalid('Verification failed');
    }
  }

  let supabase;
  try {
    supabase = supabaseAdmin();
  } catch {
    return unavailable();
  }

  const { error } = await supabase.from('submissions').insert({
    form_type: formType,
    name,
    email,
    phone: phone || null,
    message,
    payload,
  });

  if (error) {
    console.error(error.message);
    return NextResponse.json({ ok: false, message: 'Something went wrong. Please try again.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

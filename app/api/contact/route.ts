import { NextResponse } from 'next/server';
import { site } from '@/config/site';
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

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request' }, { status: 400 });
  }

  if (!body || typeof body !== 'object') {
    return NextResponse.json({ ok: false, message: 'Invalid request' }, { status: 400 });
  }

  const record = body as Record<string, unknown>;
  if (text(record._gotcha, 200)) return NextResponse.json({ ok: true });

  const formType = text(record.form_type, 40);
  const name = text(record.name, 200);
  const email = text(record.email, 320);
  const phone = text(record.phone, 40);
  const message = text(record.message, 5000);

  if (!isFormType(formType) || !name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, message: 'Check the name, email, and message.' }, { status: 400 });
  }

  if (site.recaptchaSiteKey) {
    const verdict = await recaptchaOk(text(record.recaptcha, 4000));
    if (verdict === 'missing-secret') return unavailable();
    if (verdict === 'failed') {
      return NextResponse.json({ ok: false, message: 'Verification failed' }, { status: 400 });
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
    payload: {},
  });

  if (error) {
    console.error(error.message);
    return NextResponse.json({ ok: false, message: 'Something went wrong. Please try again.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

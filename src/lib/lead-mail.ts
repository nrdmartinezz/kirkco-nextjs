import sgMail from '@sendgrid/mail';
import { site } from '@/config/site';

const formLabels = {
  contact: 'Contact',
  quote: 'Quote',
  'request-a-quote': 'Request a quote',
} as const;

type FormType = keyof typeof formLabels;

type QuoteLine = {
  title: string;
  slug: string;
  qty: number;
  notes?: string;
};

export type LeadNotice = {
  formType: FormType;
  name: string;
  email: string;
  phone: string;
  message: string;
  payload: Record<string, unknown>;
  ip: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function bccList(to: string) {
  const raw = process.env.NOTIFY_BCC?.trim() ?? '';
  if (!raw) return [];

  const seen = new Set<string>();
  const toKey = to.toLowerCase();
  const list: string[] = [];

  for (const part of raw.split(/[,;]/)) {
    const email = part.trim();
    const key = email.toLowerCase();
    if (!emailPattern.test(email) || key === toKey || seen.has(key)) continue;
    seen.add(key);
    list.push(email);
  }

  return list;
}

function configuredMail() {
  const apiKey = process.env.SENDGRID_API_KEY?.trim() ?? '';
  const to = process.env.NOTIFY_TO?.trim() ?? '';
  const fromEmail = process.env.FROM_EMAIL?.trim() ?? '';
  const fromName = process.env.FROM_NAME?.trim() || site.name;
  if (!apiKey || !to || !fromEmail) return null;
  return { apiKey, to, fromEmail, fromName, bcc: bccList(to) };
}

export function clientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  const first = forwarded?.split(',')[0]?.trim();
  if (first) return first.slice(0, 80);
  const real = request.headers.get('x-real-ip')?.trim();
  return real ? real.slice(0, 80) : 'unknown';
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function shown(value: string) {
  const trimmed = value.trim();
  return trimmed || '—';
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : null;
}

function quoteFromPayload(payload: Record<string, unknown>) {
  const companyRecord = asRecord(payload.company);
  if (!companyRecord || !Array.isArray(payload.lines)) return null;

  const name = typeof companyRecord.name === 'string' ? companyRecord.name.trim() : '';
  const addressRecord = asRecord(companyRecord.address);
  const street = typeof addressRecord?.street === 'string' ? addressRecord.street.trim() : '';
  const city = typeof addressRecord?.city === 'string' ? addressRecord.city.trim() : '';
  const state = typeof addressRecord?.state === 'string' ? addressRecord.state.trim() : '';
  const zip = typeof addressRecord?.zip === 'string' ? addressRecord.zip.trim() : '';
  const locality = [city, state].filter(Boolean).join(', ');
  const line2 = [locality, zip].filter(Boolean).join(' ');
  const address = [street, line2].filter(Boolean).join('\n');

  const lines: QuoteLine[] = [];
  for (const item of payload.lines) {
    const record = asRecord(item);
    if (!record) continue;
    const title = typeof record.title === 'string' ? record.title.trim() : '';
    const slug = typeof record.slug === 'string' ? record.slug.trim() : '';
    const qty = typeof record.qty === 'number' ? record.qty : Number.NaN;
    if (!title || !Number.isInteger(qty)) continue;
    const notes = typeof record.notes === 'string' ? record.notes.trim() : '';
    lines.push({ title, slug, qty, ...(notes ? { notes } : {}) });
  }

  return { company: name, address, lines };
}

function formatWhen(date: Date) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZoneName: 'short',
  }).format(date);
}

function textBody(lead: LeadNotice, when: string) {
  const lines = [
    `Form: ${formLabels[lead.formType]}`,
    `Name: ${shown(lead.name)}`,
    `Email: ${shown(lead.email)}`,
    `Phone: ${shown(lead.phone)}`,
    `Submitted: ${when}`,
    `IP: ${shown(lead.ip)}`,
    '',
    'Message:',
    shown(lead.message),
  ];

  if (lead.formType === 'quote') {
    const quote = quoteFromPayload(lead.payload);
    lines.push('', `Company: ${shown(quote?.company ?? '')}`, 'Address:', shown(quote?.address ?? ''), '', 'Products:');
    if (!quote || quote.lines.length === 0) {
      lines.push('—');
    } else {
      for (const line of quote.lines) {
        lines.push(`- ${line.title} (${line.slug}) × ${line.qty}`);
        if (line.notes) lines.push(`  Notes: ${line.notes}`);
      }
    }
  }

  return lines.join('\n');
}

function htmlParagraph(label: string, value: string) {
  return `<p style="margin:0 0 8px;"><strong>${escapeHtml(label)}:</strong> ${escapeHtml(shown(value))}</p>`;
}

function htmlBody(lead: LeadNotice, when: string) {
  const parts = [
    htmlParagraph('Form', formLabels[lead.formType]),
    htmlParagraph('Name', lead.name),
    htmlParagraph('Email', lead.email),
    htmlParagraph('Phone', lead.phone),
    htmlParagraph('Submitted', when),
    htmlParagraph('IP', lead.ip),
    '<p style="margin:16px 0 8px;"><strong>Message</strong></p>',
    `<p style="margin:0;white-space:pre-wrap;">${escapeHtml(shown(lead.message))}</p>`,
  ];

  if (lead.formType === 'quote') {
    const quote = quoteFromPayload(lead.payload);
    parts.push(
      '<p style="margin:16px 0 8px;"><strong>Quote</strong></p>',
      htmlParagraph('Company', quote?.company ?? ''),
      `<p style="margin:0 0 8px;white-space:pre-wrap;"><strong>Address:</strong> ${escapeHtml(shown(quote?.address ?? ''))}</p>`,
    );
    const items =
      quote && quote.lines.length > 0
        ? quote.lines
            .map((line) => {
              const notes = line.notes
                ? `<div style="margin-top:4px;">Notes: ${escapeHtml(line.notes)}</div>`
                : '';
              return `<li style="margin:0 0 8px;">${escapeHtml(line.title)} (${escapeHtml(line.slug)}) × ${line.qty}${notes}</li>`;
            })
            .join('')
        : '<li style="margin:0;">—</li>';
    parts.push(`<ul style="margin:8px 0 0;padding-left:20px;">${items}</ul>`);
  }

  return `<div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#1a1a1a;">${parts.join('')}</div>`;
}

function subjectFor(lead: LeadNotice) {
  const who = (lead.name.trim() || lead.email).replace(/[\r\n]+/g, ' ');
  if (lead.formType === 'contact') return `Contact form from ${who}`;
  return `Quote request from ${who}`;
}

export async function notifyLead(lead: LeadNotice) {
  const config = configuredMail();
  if (!config) return;

  const when = formatWhen(new Date());
  const replyName = lead.name.trim();

  try {
    sgMail.setApiKey(config.apiKey);
    await sgMail.send({
      to: config.to,
      ...(config.bcc.length > 0 ? { bcc: config.bcc } : {}),
      from: { email: config.fromEmail, name: config.fromName },
      replyTo: replyName ? { email: lead.email, name: replyName } : lead.email,
      subject: subjectFor(lead),
      text: textBody(lead, when),
      html: htmlBody(lead, when),
    });
  } catch (error) {
    const code =
      error && typeof error === 'object' && 'code' in error && (typeof error.code === 'number' || typeof error.code === 'string')
        ? String(error.code)
        : '';
    console.error(code ? `SendGrid notification failed (${code})` : 'SendGrid notification failed');
  }
}

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
  origin: string;
  pageUrl: string;
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

export function requestOrigin(request: Request) {
  try {
    const origin = new URL(request.url).origin;
    if (origin && origin !== 'null') return origin;
  } catch {
    // Use the public site origin when the request URL cannot be parsed.
  }
  return site.url;
}

export function requestPageUrl(request: Request) {
  const referer = request.headers.get('referer')?.trim() ?? '';
  if (!referer) return '';
  try {
    return new URL(referer).toString().slice(0, 500);
  } catch {
    return '';
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
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
  const address = [street, [city, state].filter(Boolean).join(', '), zip].filter(Boolean).join(', ');

  const lines: QuoteLine[] = [];
  for (const item of payload.lines) {
    const record = asRecord(item);
    if (!record) continue;
    const title = typeof record.title === 'string' ? record.title.trim() : '';
    const qty = typeof record.qty === 'number' ? record.qty : Number.NaN;
    if (!title || !Number.isInteger(qty)) continue;
    const notes = typeof record.notes === 'string' ? record.notes.trim() : '';
    lines.push({ title, qty, ...(notes ? { notes } : {}) });
  }

  return { company: name, address, lines };
}

function formatStamp(date: Date) {
  const timeZone = 'America/New_York';
  return {
    date: new Intl.DateTimeFormat('en-US', { timeZone, month: 'long', day: 'numeric', year: 'numeric' }).format(date),
    time: new Intl.DateTimeFormat('en-US', { timeZone, hour: 'numeric', minute: '2-digit', timeZoneName: 'short' }).format(date),
    year: new Intl.DateTimeFormat('en-US', { timeZone, year: 'numeric' }).format(date),
  };
}

function assetUrl(origin: string, path: string) {
  return `${origin.replace(/\/$/, '')}${path}`;
}

function htmlBreaks(value: string) {
  return escapeHtml(value).replaceAll('\n', '<br>');
}

function leadDetails(lead: LeadNotice) {
  const quote = lead.formType === 'quote' ? quoteFromPayload(lead.payload) : null;
  const company = quote?.company ?? '';
  const who = (company || lead.name.trim() || lead.email).replace(/[\r\n]+/g, ' ');
  return { quote, company, who };
}

function textBody(lead: LeadNotice, stamp: { date: string; time: string }) {
  const { quote, company } = leadDetails(lead);
  const lines = [
    `Client Name: ${lead.name.trim()}`,
    `Client Email: ${lead.email.trim()}`,
    `Company Name: ${company}`,
    `Phone Number: ${lead.phone.trim()}`,
  ];

  if (quote?.address) lines.push('', `Located in ${quote.address}`);
  if (quote && quote.lines.length > 0) {
    lines.push('', 'Products:');
    for (const line of quote.lines) {
      lines.push(`${line.title} × ${line.qty}`);
      if (line.notes) lines.push(`Notes: ${line.notes}`);
    }
  }
  if (lead.message.trim()) lines.push('', 'Their Message:', lead.message.trim());

  lines.push('', `Date: ${stamp.date}`, `Time: ${stamp.time}`);
  if (lead.pageUrl) lines.push(`Page URL: ${lead.pageUrl}`);
  lines.push(`Remote IP: ${lead.ip}`);
  return lines.join('\n');
}

const copyStyle = 'font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:22px;color:#1e1e1e;';

function emailCard(lead: LeadNotice, year: string, preview: string, bodyHtml: string) {
  const hero = assetUrl(lead.origin, '/images/hero.jpg');
  const logo = assetUrl(lead.origin, '/images/logo.jpg');
  const legalName = site.legalName ?? site.name;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(legalName)}</title>
</head>
<body style="margin:0;padding:0;background-color:#f5f9fd;">
  <div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(preview)}</div>
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#f5f9fd;">
    <tr>
      <td align="center" style="padding:20px 0;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="width:600px;max-width:600px;background-color:#ffffff;">
          <tr>
            <td align="center" background="${hero}" bgcolor="#2f89f7" style="background-color:#2f89f7;background-image:url('${hero}');background-size:cover;background-position:center;height:200px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" height="200" style="background-color:rgba(47,137,247,0.55);">
                <tr>
                  <td align="center" valign="middle" style="padding:40px;height:200px;">
                    <img src="${logo}" alt="${escapeHtml(legalName)}" width="220" style="display:block;width:220px;max-width:220px;height:auto;border:0;">
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 40px 20px;background-color:#ffffff;">
              ${bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:30px 40px;background-color:#233c8f;">
              <p style="margin:0 0 10px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;font-weight:bold;color:#ffffff;text-align:center;">${escapeHtml(legalName)}</p>
              <p style="margin:0 0 5px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;text-align:center;">
                <a href="tel:${site.business.phoneHref}" style="color:#cccccc;text-decoration:none;">${escapeHtml(site.business.phone)}</a>
              </p>
              <p style="margin:0 0 15px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;text-align:center;">
                <a href="mailto:${site.business.email}" style="color:#cccccc;text-decoration:none;">${escapeHtml(site.business.email)}</a>
              </p>
              <p style="margin:0 0 15px;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;text-align:center;">
                <a href="${site.url}" style="color:#cccccc;text-decoration:none;">kirkcocorp.com</a>
              </p>
              <p style="margin:20px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:16px;color:#999999;text-align:center;">&copy; ${escapeHtml(year)} ${escapeHtml(legalName)}. All Rights Reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function htmlBody(lead: LeadNotice, stamp: { date: string; time: string; year: string }) {
  const { quote, company, who } = leadDetails(lead);
  const copy = copyStyle;
  const preview =
    lead.formType === 'contact' ? `Contact from ${who}.` : `Quote request from ${who}.`;

  const location = quote?.address
    ? `<p style="margin:0 0 16px;${copy}">Located in ${escapeHtml(quote.address)}</p>`
    : '';
  const products =
    quote && quote.lines.length > 0
      ? `<p style="margin:0 0 16px;${copy}">Products:<br>${quote.lines
          .map((line) => {
            const notes = line.notes ? `<br>Notes: ${escapeHtml(line.notes)}` : '';
            return `${escapeHtml(line.title)} &times; ${line.qty}${notes}`;
          })
          .join('<br>')}</p>`
      : '';
  const message = lead.message.trim()
    ? `<p style="margin:0 0 16px;${copy}">Their Message:<br>${htmlBreaks(lead.message.trim())}</p>`
    : '';
  const page = lead.pageUrl
    ? `<br>Page URL: <a href="${escapeHtml(lead.pageUrl)}" style="color:#233c8f;text-decoration:none;">${escapeHtml(lead.pageUrl)}</a>`
    : '';

  return emailCard(
    lead,
    stamp.year,
    preview,
    `<p style="margin:0 0 16px;${copy}">
      Client Name: ${escapeHtml(lead.name.trim())}<br>
      Client Email: <a href="mailto:${escapeHtml(lead.email.trim())}" style="color:#233c8f;text-decoration:none;">${escapeHtml(lead.email.trim())}</a><br>
      Company Name: ${escapeHtml(company)}<br>
      Phone Number: ${escapeHtml(lead.phone.trim())}
    </p>
    ${location}
    ${products}
    ${message}
    <p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#6f7889;">
      Date: ${escapeHtml(stamp.date)}<br>
      Time: ${escapeHtml(stamp.time)}${page}<br>
      Remote IP: ${escapeHtml(lead.ip)}
    </p>`,
  );
}

function receivedLabel(formType: FormType) {
  return formType === 'contact' ? 'message' : 'quote request';
}

function confirmationSubject(lead: LeadNotice) {
  return lead.formType === 'contact' ? 'We received your message' : 'We received your quote request';
}

function confirmationRecap(lead: LeadNotice) {
  const { quote } = leadDetails(lead);
  const lines: string[] = [];
  if (quote?.company) lines.push(`Company: ${quote.company}`);
  if (quote?.address) lines.push(`Located in ${quote.address}`);
  if (quote && quote.lines.length > 0) {
    lines.push('Products:');
    for (const line of quote.lines) {
      lines.push(`${line.title} × ${line.qty}`);
      if (line.notes) lines.push(`Notes: ${line.notes}`);
    }
  }
  if (lead.message.trim()) lines.push('', 'Your message:', lead.message.trim());
  return lines;
}

function confirmationText(lead: LeadNotice, stamp: { date: string; time: string }) {
  const name = lead.name.trim() || 'there';
  const legalName = site.legalName ?? site.name;
  const lines = [
    `Hello ${name},`,
    '',
    `We received your ${receivedLabel(lead.formType)} and will get back to you from ${legalName}.`,
    `If you need us sooner, call ${site.business.phone}.`,
  ];
  const recap = confirmationRecap(lead);
  if (recap.length > 0) lines.push('', ...recap);
  lines.push('', `Date: ${stamp.date}`, `Time: ${stamp.time}`);
  return lines.join('\n');
}

function confirmationHtml(lead: LeadNotice, stamp: { date: string; time: string; year: string }) {
  const name = lead.name.trim() || 'there';
  const legalName = site.legalName ?? site.name;
  const label = receivedLabel(lead.formType);
  const recap = confirmationRecap(lead).filter((line) => line !== '');
  const recapHtml =
    recap.length > 0
      ? `<p style="margin:0 0 16px;${copyStyle}">${recap.map((line) => htmlBreaks(line)).join('<br>')}</p>`
      : '';

  return emailCard(
    lead,
    stamp.year,
    `We received your ${label}.`,
    `<p style="margin:0 0 16px;${copyStyle}">Hello ${escapeHtml(name)},</p>
    <p style="margin:0 0 16px;${copyStyle}">We received your ${label} and will get back to you from ${escapeHtml(legalName)}. If you need us sooner, call <a href="tel:${site.business.phoneHref}" style="color:#233c8f;text-decoration:none;">${escapeHtml(site.business.phone)}</a>.</p>
    ${recapHtml}
    <p style="margin:8px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;color:#6f7889;">
      Date: ${escapeHtml(stamp.date)}<br>
      Time: ${escapeHtml(stamp.time)}
    </p>`,
  );
}

function subjectFor(lead: LeadNotice) {
  const { who } = leadDetails(lead);
  if (lead.formType === 'contact') return `Contact from ${who}`;
  return `Quote Request from ${who}`;
}

function mailFailure(error: unknown, kind: string) {
  const code =
    error && typeof error === 'object' && 'code' in error && (typeof error.code === 'number' || typeof error.code === 'string')
      ? String(error.code)
      : '';
  console.error(code ? `SendGrid ${kind} failed (${code})` : `SendGrid ${kind} failed`);
}

export async function notifyLead(lead: LeadNotice) {
  const config = configuredMail();
  if (!config) return;

  let stamp: { date: string; time: string; year: string };
  try {
    stamp = formatStamp(new Date());
    sgMail.setApiKey(config.apiKey);
  } catch (error) {
    mailFailure(error, 'notification');
    return;
  }

  const replyName = lead.name.trim();
  try {
    await sgMail.send({
      to: config.to,
      ...(config.bcc.length > 0 ? { bcc: config.bcc } : {}),
      from: { email: config.fromEmail, name: config.fromName },
      replyTo: replyName ? { email: lead.email, name: replyName } : lead.email,
      subject: subjectFor(lead),
      text: textBody(lead, stamp),
      html: htmlBody(lead, stamp),
    });
  } catch (error) {
    mailFailure(error, 'notification');
  }

  try {
    await sgMail.send({
      to: lead.email,
      from: { email: config.fromEmail, name: config.fromName },
      replyTo: { email: site.business.email, name: site.legalName ?? site.name },
      subject: confirmationSubject(lead),
      text: confirmationText(lead, stamp),
      html: confirmationHtml(lead, stamp),
    });
  } catch (error) {
    mailFailure(error, 'confirmation');
  }
}

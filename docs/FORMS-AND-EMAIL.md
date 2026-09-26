# Forms and email

The starter does not ship a contact form. `app/contact/page.tsx` renders phone,
email, and address from `src/config/site.ts`. `formEndpoint` and `recaptchaSiteKey`
exist so a project can turn a form on without inventing new config fields.
**Blank means no form.** Leave them blank until the handler below exists.

`/thank-you` is already a route. Point a successful submit there.

## How it works

```
Browser form
  → reCAPTCHA v3 token attached (client), when a site key is set
  → POST to the Route Handler (JSON)
  → honeypot + reCAPTCHA verified (server)
  → row inserted in Supabase `submissions`
  → redirect to /thank-you
```

The stored row is the record. Notification mail is a later step on the same
handler. A missing SMTP setup must not drop the lead.

**Config** (`src/config/site.ts`):

- `formEndpoint` — site-relative path, conventionally `/api/contact`. Blank disables
  every form. Do not point this at a third-party form host.
- `recaptchaSiteKey` — public reCAPTCHA v3 key. Blank skips the widget.

**Secrets** (server only, never in `site.ts`):

| Env var              | Purpose                                      |
| -------------------- | -------------------------------------------- |
| `SUPABASE_URL`       | Supabase project URL. See `docs/HOSTING.md`  |
| `SUPABASE_SERVICE_ROLE_KEY` | Inserts the submission row. Server only |
| `RECAPTCHA_SECRET`   | Google reCAPTCHA v3 secret. Later, with the site key |
| `NOTIFY_TO`          | Later. Where lead notifications go           |
| `FROM_EMAIL`         | Later. From address on outbound mail         |
| `FROM_NAME`          | Later. From display name                     |
| `SMTP_HOST`          | Later. With user + pass, send via SMTP       |
| `SMTP_USER`          | Later                                        |
| `SMTP_PASS`          | Later                                        |

`.env*` is gitignored. Document the keys in the host's env UI, not in a committed
file. Copy names into `.env.local` for local submits.

If any SMTP variable is missing, do not half-configure a transport. Either all
three are set or the handler uses the host's default mail path and fails loudly
when that path is absent.

## Route Handler

Add `app/api/contact/route.ts`. It runs on the server. It inserts into
`submissions` with the service role key. It does not import the public site key
for verification — only `RECAPTCHA_SECRET`. Browsers cannot read or write that
table.

Expected JSON body:

| Field        | Required | Notes                                      |
| ------------ | -------- | ------------------------------------------ |
| `form_type`  | yes      | `contact`, `quote`, or `request-a-quote` |
| `name`       | yes      |                                            |
| `email`      | yes      | Validate before using it as a recipient    |
| `phone`      | no       |                                            |
| `message`    | contact / `request-a-quote`: yes. `quote`: no (store `''` when empty) |
| `payload`    | `quote`: yes | See quote payload below. Other types store `{}`. |
| `recaptcha`  | when on  | Token from the v3 widget                   |
| `_gotcha`    | no       | Honeypot. Any value is a bot               |

### Quote payload

`form_type: quote` is the product-basket RFQ on `/quote`. The handler resolves product titles from the catalog and rejects unknown slugs, duplicate slugs, empty baskets, and any `country` field.

```json
{
  "lines": [
    { "slug": "eldo-mix", "qty": 2, "notes": "Prefer the 202 class" }
  ],
  "company": {
    "name": "Acme Coatings",
    "address": {
      "street": "100 Plant Rd",
      "city": "Monroe",
      "state": "NC",
      "zip": "28110"
    }
  }
}
```

| Field | Required | Notes |
| --- | --- | --- |
| `payload.lines` | yes | 1–25 items. Each has a known `slug`, integer `qty` 1–999, optional `notes`. |
| `payload.company.name` | yes | |
| `payload.company.address` | no | All-or-nothing US address: street, city, 50-state + DC `state`, ZIP `12345` or `12345-6789`. Omit or `null` if unused. No country field. |

Return `200` with `{ ok: true }` on success so the client can navigate to
`/thank-you`. Return `400` for validation and `503` when the service role key
is missing, or when the reCAPTCHA site key is set and `RECAPTCHA_SECRET` is
not, with a short message safe to show in the form.

## Per-form settings

Each form sends `form_type`. Start with `contact` only. A second form (quote,
careers) is another branch in the handler: its own subject line, its own
notification template, and `sendAutoreply` defaulting to **false** until someone
asks for it.

Notification mail includes name, email, phone, message, form label, timestamp,
and submitter IP. Autoreply includes the submitter's name, `site.name`, and the
public phone. Use inline CSS — email clients strip `<style>` blocks inconsistently.

## Form surfaces

| `form_type` | Page                         |
| ----------- | ---------------------------- |
| `contact`   | `app/contact/page.tsx` (`/contact-us` redirects here) |
| `quote`     | `app/quote/page.tsx` — product basket, company name, optional US address |
| `request-a-quote` | Legacy type only. `/request-a-quote` redirects to `/quote`. |

The page posts with `fetch` to `site.formEndpoint`. It does not use a native
navigation to the API route. On `{ ok: true }`, `router.push('/thank-you')`.

### Adding a new form

1. Build the form on its page. `action` is not enough — post JSON to `site.formEndpoint`.
2. Include a visually hidden `_gotcha` field with `tabIndex={-1}` and `autoComplete="off"`.
3. Handle `form_type` in the Route Handler.
4. Add a `/thank-you` query or a dedicated thank-you route only if the confirmation
   copy must differ. The shared page is the default.

## reCAPTCHA

Register a v3 key pair in [Google reCAPTCHA admin](https://www.google.com/recaptcha/admin).
Add the production domain, and `localhost` while you are testing.

- **Site key** → `recaptchaSiteKey` in `src/config/site.ts`
- **Secret key** → `RECAPTCHA_SECRET` in the host env

Verify server-side. Reject scores under `0.5` unless a project writes down a
different threshold next to the check. Do not ship the secret to the client.

## Local testing

```bash
npm run dev
```

Fill `.env.local` with the Supabase vars from `docs/HOSTING.md`. `formEndpoint` is
`/api/contact`. Submit on `http://localhost:3000/contact` and `/quote` (add at
least one product on the quote builder), and confirm the redirect to `/thank-you`
plus a row in `submissions`. `/request-a-quote` should land on `/quote`.

Mail is not sent yet. Do not log message bodies in production.

## Production checklist

1. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` on the host. Apply the
   migration in `docs/HOSTING.md` first.
2. Set `formEndpoint` to `/api/contact`. Leave `recaptchaSiteKey` blank until
   `RECAPTCHA_SECRET` is set.
3. Submit each form on the live origin. Confirm a row appears in `submissions`
   and that `/thank-you` is what the visitor sees.
4. Mail (`NOTIFY_TO`, `FROM_EMAIL`, optional SMTP) is not wired yet. Add it on
   this handler when the inbox is ready.

## Security

- Secrets never ship in git or in `site.ts`.
- Honeypot `_gotcha` — bots get `{ ok: true }` and no row.
- reCAPTCHA v3 is verified server-side when a secret is configured. If the site
  key is set and the secret is missing, fail closed (503), do not insert.
- Do not reflect the submitted message back onto a public page.

## Troubleshooting

| Symptom                         | Likely cause                                              |
| ------------------------------- | --------------------------------------------------------- |
| Form never appears              | `formEndpoint` is still blank                            |
| "Form is temporarily unavailable" | `SUPABASE_SERVICE_ROLE_KEY` missing, or site key set without `RECAPTCHA_SECRET` |
| "Verification failed"           | Secret mismatch, or the domain is not on the reCAPTCHA key |
| No row in `submissions`         | Migration not applied, or the honeypot field was filled  |
| 500 on submit                   | Uncaught throw in the Route Handler — read the host logs  |

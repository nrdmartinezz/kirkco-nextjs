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
  → staff notification via the SendGrid API, when mail env is complete
  → redirect to /thank-you
```

The stored row is the record. Notification mail runs on the same handler after
the insert. A missing SendGrid setup, or a SendGrid error, must not drop the
lead or change the thank-you response. A public mailbox domain is described under
"Public email domains": the row is still stored, the visitor still reaches
`/thank-you`, and the notice is addressed to `NOTIFY_BCC`.

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
| `SENDGRID_API_KEY`   | SendGrid Web API key. Server only            |
| `NOTIFY_TO`          | Inbox that receives accepted lead notifications. Public-email rejects are not sent here |
| `NOTIFY_BCC`         | Optional. On an accepted lead, comma-separated blind copies hidden from `NOTIFY_TO`. On a public-email reject, these addresses are the To recipients |
| `FROM_EMAIL`         | Verified SendGrid sender address             |
| `FROM_NAME`          | Optional From display name. Falls back to the site name |

`.env*` is gitignored. Document the keys in the host's env UI, not in a committed
file. Copy names into `.env.local` for local submits.

Send mail only when `SENDGRID_API_KEY`, `NOTIFY_TO`, and `FROM_EMAIL` are all
set. If any of those three is missing, skip the send. `FROM_EMAIL` must already
be a verified single sender or an address on an authenticated domain in that
SendGrid account, or the API rejects the message. There is no SMTP path.

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

### Public email domains

After the name, email, and message checks, the handler verifies reCAPTCHA when `recaptchaSiteKey` is set. A failed check returns `400` and stores nothing, including for a public mailbox. Then the handler compares the mailbox domain with `src/lib/public-email.ts`. A match still returns `200` with `{ ok: true }`, so the visitor goes to `/thank-you` and cannot tell the address was filtered. The quote parser does not run, so a missing company, a bad address, or an unknown product still stores the row.

The insert uses the submitted `form_type` and the same columns as an accepted lead. `payload.blocked` is `"public-email"`. When the request `payload` is an object, its fields are kept, including the company, address, and line titles the browser sent. The `submissions` check constraint stays `contact`, `quote`, and `request-a-quote`.

The row is stored before mail. An insert error is `500` and sends nothing. A mail failure leaves the row and still returns `{ ok: true }`. Do not log message bodies.

That notice does not call `notifyLead`. Each address in `NOTIFY_BCC` is placed in To, except `NOTIFY_TO` when it is also listed there. The message has no BCC header. If that To list is empty, or `SENDGRID_API_KEY` or `FROM_EMAIL` is missing, skip the send. The visitor gets no confirmation. Reply-To is the public sales address (`site.business.email`), not the submitter. The subject is `SPAM: ` plus the normal subject: `Contact from {who}` for contact, and `Quote Request from {who}` for quote and `request-a-quote`. `{who}` is company, then name, then email. The body is the staff card. Quote lines use the titles on the stored payload, because the catalog lookup is skipped.

Accepted leads still go to `NOTIFY_TO`, with `NOTIFY_BCC` as BCC, plus the visitor confirmation.

## Per-form settings

Each form sends `form_type`. Contact and quote share the Kirkco card. A new
form is another subject line in the handler.

Staff mail uses one card for every form: hero, logo, client fields, and the
navy footer. Quote mail also includes company, address, and line items.
Reply-To on the staff message is the submitter. The same submit also sends a
confirmation to the submitter, with their name, what they sent, `site.name`,
and the public phone. Reply-To on that confirmation is the public sales
address. A public-email reject is the exception: it is stored, the visitor is
not emailed, and the `SPAM:` notice goes to `NOTIFY_BCC` as To. A mail failure
does not drop the lead. Use inline CSS. Do not log message bodies.

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

With `SENDGRID_API_KEY`, `NOTIFY_TO`, and `FROM_EMAIL` in `.env.local`, the same
submit also sends the staff notification. Do not log message bodies.

## Production checklist

1. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` on the host. Apply the
   migration in `docs/HOSTING.md` first.
2. Set `formEndpoint` to `/api/contact`. Leave `recaptchaSiteKey` blank until
   `RECAPTCHA_SECRET` is set.
3. Submit each form on the live origin. Confirm a row appears in `submissions`
   and that `/thank-you` is what the visitor sees.
4. Set `SENDGRID_API_KEY`, `NOTIFY_TO`, and `FROM_EMAIL` on the host. Verify
   `FROM_EMAIL` in SendGrid before the first live submit. `FROM_NAME` is optional.
   `NOTIFY_BCC` is an optional comma-separated list of extra inboxes on accepted
   leads. The same list is the To address for public-email rejects.

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
| Row saved, no inbox mail        | One of `SENDGRID_API_KEY`, `NOTIFY_TO`, or `FROM_EMAIL` is unset, or `FROM_EMAIL` is not a verified SendGrid sender. Host logs say `SendGrid notification failed` |
| Public email reaches `/thank-you` | Expected. The row is stored with `payload.blocked` of `public-email`. The visitor is not emailed, and `NOTIFY_TO` is not |
| Spam row saved, no `SPAM:` mail | `NOTIFY_BCC` is unset, lists only `NOTIFY_TO`, or `SENDGRID_API_KEY` / `FROM_EMAIL` is missing. A SendGrid rejection logs `SendGrid spam failed` |
| 500 on submit                   | Uncaught throw in the Route Handler — read the host logs  |

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
  → mail sent to the team
  → optional autoreply to the submitter
  → redirect to /thank-you
```

**Config** (`src/config/site.ts`):

- `formEndpoint` — site-relative path, conventionally `/api/contact`. Blank disables
  every form. Do not point this at a third-party form host.
- `recaptchaSiteKey` — public reCAPTCHA v3 key. Blank skips the widget.

**Secrets** (server only, never in `site.ts`):

| Env var              | Purpose                                      |
| -------------------- | -------------------------------------------- |
| `RECAPTCHA_SECRET`   | Google reCAPTCHA v3 secret                   |
| `NOTIFY_TO`          | Where lead notifications go                  |
| `FROM_EMAIL`         | From address on outbound mail                |
| `FROM_NAME`          | From display name                            |
| `SMTP_HOST`          | Optional. With user + pass, send via SMTP    |
| `SMTP_USER`          | Optional                                     |
| `SMTP_PASS`          | Optional                                     |

`.env*` is gitignored. Document the keys in the host's env UI, not in a committed
file. Copy names into `.env.local` for local submits.

If any SMTP variable is missing, do not half-configure a transport. Either all
three are set or the handler uses the host's default mail path and fails loudly
when that path is absent.

## Route Handler

Add `app/api/contact/route.ts`. It runs on the server. It does not import the
public site key for verification — only `RECAPTCHA_SECRET`.

Expected JSON body:

| Field        | Required | Notes                                      |
| ------------ | -------- | ------------------------------------------ |
| `form_type`  | yes      | `contact` until a second form exists      |
| `name`       | yes      |                                            |
| `email`      | yes      | Validate before using it as a recipient    |
| `phone`      | no       |                                            |
| `message`    | yes      |                                            |
| `recaptcha`  | when on  | Token from the v3 widget                   |
| `_gotcha`    | no       | Honeypot. Any value is a bot               |

Return `200` with `{ ok: true }` on success so the client can navigate to
`/thank-you`. Return `400` for validation and `503` when mail config is missing,
with a short message safe to show in the form.

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
| `contact`   | `app/contact/page.tsx`       |

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

Fill `.env.local`, set `formEndpoint` to `/api/contact` and the site key, submit
on `http://localhost:3000/contact`, and confirm the redirect to `/thank-you`.

`localhost` often cannot send real mail. Use the SMTP vars against a development
inbox, or log the payload in development and send for real only when the env
vars are present. Do not log message bodies in production.

## Production checklist

1. Set `RECAPTCHA_SECRET`, `NOTIFY_TO`, `FROM_EMAIL`, `FROM_NAME` on the host.
2. Set `formEndpoint` and `recaptchaSiteKey` in `site.ts`.
3. Submit the form on the live origin. Confirm the notification arrives in the
   inbox, not spam, and that `/thank-you` is what the visitor sees.
4. If deliverability is poor, turn on SMTP and configure SPF/DKIM for `FROM_EMAIL`'s
   domain.

## Security

- Secrets never ship in git or in `site.ts`.
- Honeypot `_gotcha` — bots get `{ ok: true }` and no mail.
- reCAPTCHA v3 is verified server-side when a secret is configured. If the site
  key is set and the secret is missing, fail closed (503), do not send.
- Rate limit by IP in the Route Handler before sending mail.
- Escape every interpolated field in HTML mail. Use the raw address only in
  `mailto:` hrefs you have already validated.
- Do not reflect the submitted message back onto a public page.

## Troubleshooting

| Symptom                         | Likely cause                                              |
| ------------------------------- | --------------------------------------------------------- |
| Form never appears              | `formEndpoint` is still blank                            |
| "Form is temporarily unavailable" | Mail env vars missing on the host                      |
| "Verification failed"           | Secret mismatch, or the domain is not on the reCAPTCHA key |
| Notification never arrives      | No SMTP and the host has no local mail                    |
| Lands in spam                   | SPF/DKIM missing; From address is not on the sending domain |
| 500 on submit                   | Uncaught throw in the Route Handler — read the host logs  |

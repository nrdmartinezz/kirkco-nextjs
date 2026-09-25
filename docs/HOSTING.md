# Hosting

This starter is a Next.js App Router app. It needs a Node host (or a platform that
runs Next.js for you). It does not emit a `dist/` folder for Apache, and it does
not use FTP or `.htaccess`.

The Astro Business Starter deploys static HTML to cPanel. This one does not. Do
not copy that pipeline across.

## URL shape

`site.url` in `src/config/site.ts` is the production origin, with no trailing slash.
It feeds `metadataBase`, canonicals, Open Graph URLs, JSON-LD, `app/robots.ts`, and
`app/sitemap.ts`.

Next.js serves `/about` without a trailing slash unless `trailingSlash: true` is
set in `next.config`. Leave the default. Adding trailing-slash redirects later
splits log paths and canonicals for pages that already shipped.

`app/not-found.tsx` is the 404. It is not a flat `404.html`.

`/robots.txt` and `/sitemap.xml` are generated. `robots.ts` points `Sitemap:` at
`${site.url}/sitemap.xml`. Changing the domain means changing `site.url` and
redeploying — there is no text file to edit by hand.

`app/sitemap.ts` lists `/`, `/thank-you`, the header quote link, every href on
`navigation.ts`, and every product slug from Supabase. A route that is not
linked there and is not a product is omitted.

## Vercel

Connect the Git repo in Vercel and use the Next.js preset. `vercel.json` sets
the build command to `npm run build`, which runs `prebuild`. The framework
preset itself calls `next build` and skips that npm hook, so `next.config.mjs`
also regenerates gitignored `src/styles/theme.css` before the compile. Do not
upload a prebuilt `.next` folder.

`site.url` is `https://kirkcocorp.com`. Attach that domain and redirect `www` to
the apex in one hop.

Set these on the Vercel project and in local `.env.local` before the first
production build. They are server-only. Do not prefix them with `NEXT_PUBLIC_`,
and do not put them in `site.ts`.

| Env var | Use |
| --- | --- |
| `SUPABASE_URL` | Project URL |
| `SUPABASE_ANON_KEY` | Content reads. Row level security allows `select` only |
| `SUPABASE_SERVICE_ROLE_KEY` | Seed script and form inserts. Bypasses row level security |

Apply `supabase/migrations/20260925140000_content_and_submissions.sql` in the
Supabase SQL editor, then seed from the JSON and equipment content already in
the repo:

```bash
npm run db:seed
```

Products, categories, applications, and equipment pages are read from Supabase.
Those routes revalidate every 60 seconds, so a table-editor change shows up
without another deploy. A new product slug renders on the first request.
`generateStaticParams` still calls Supabase at build time, so the env vars have
to exist on Vercel before that build. Images stay in `public/`. A new photo
still needs a deploy.

Form submissions are inserted with the service role key. Mail env vars in
`docs/FORMS-AND-EMAIL.md` are not required for the row to be stored.

## First-time setup

1. Create the Vercel project from this Git repo.
2. Issue TLS before the site is public. Do not ship an HTTP origin in `site.url`.
3. Set the three Supabase env vars above. Analytics IDs are not env vars — they
   live in `site.ts`, and blank means that vendor is omitted from the page.
4. `site.url` is already `https://kirkcocorp.com`. Confirm the business NAP in
   `site.ts` before the first production build.
5. Apply the SQL migration and run `npm run db:seed`.

## Deploying

```bash
npm run lint
npm run build
```

`prebuild` regenerates `src/styles/theme.css`. That file is gitignored; the host
must run the build (so `prebuild` runs) rather than receiving a prebuilt `.next`
from a machine that skipped it.

`npm start` serves the production build. On a platform that detects Next.js, the
equivalent is its production command — it still has to run `next build`.

Vercel builds from Git. There is no workflow file in this repo. Keep
`npm run build` as the gate so a type or compile error fails before traffic
moves.

## What the platform must do

- HTTPS on the apex you put in `site.url`.
- One canonical host. Pick apex or `www` and redirect the other in one hop.
- Preserve the Next.js 404. A host-level error page that replaces `not-found.tsx`
  drops the site header and the skip link.
- Cache fingerprinted `/_next/static` assets aggressively. Do not cache HTML for
  a year — a deploy has to be visible on the next request.

Security headers worth setting at the host if the app does not set them itself:
`X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`,
`X-Frame-Options: SAMEORIGIN`, and HSTS once TLS is stable.

## Analytics

Server log analytics is the baseline. It costs the page nothing: no JavaScript,
no consent prompt, no ad-blocker loss. Use whatever log access the host provides
and exclude office IPs, bots, and `/_next/static`.

Logs answer how much traffic arrived and which paths it hit. They do not answer
what people did on the page. No scroll depth, no in-page events, no cross-device
attribution.

When a client runs paid ads and needs conversion attribution, set the matching
ID in `site.analytics` (`ga4`, `gtm`, `metaPixel`, `bingUet`, `clarity`).
`src/components/analytics/Analytics.tsx` mounts a vendor only when its string is
non-empty. If every ID is blank, the component renders nothing.

Search-console verification uses `site.verification` (`google`, `bing`, `meta`)
and is emitted from `src/lib/seo.ts`. Blank skips that meta tag.

A privacy policy page already exists at `/privacy`. Fill it in before any
advertising tag is enabled. `site.consent` stays `'none'` for US-only clients.
`'banner'` means the project must ship a banner that blocks those scripts until
consent — the flag alone does not.

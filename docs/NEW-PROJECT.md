# Starting a new project

`README.md` has the authoritative file checklist. This is the order to work in.

## 1. Clone

```bash
npx degit your-org/vigilant-carnival client-name
cd client-name
npm install
npm run dev
```

The demo brand builds and renders immediately. If a fresh clone does not build
untouched, something is wrong with the starter, not the project.

`npm run dev` generates `src/styles/theme.css` before Next.js starts. The dev
server defaults to port 3000.

## 2. Identity

- `src/config/site.ts` → `url`: the production origin, no trailing slash. This is
  `metadataBase`, and it is also the origin `app/robots.ts` and `app/sitemap.ts`
  emit. There is no separate `robots.txt` to edit.
- Same file → name, tagline, description, NAP, hours, socials, and
  `business.schemaType` (pick the most specific match — `Plumber` beats
  `LocalBusiness`). Omit `business.geo` for a service-area business with no
  walk-in location.
- `public/favicon.svg`. The header mark is the Lucide `Hexagon` in
  `src/components/layout/Header.tsx` until a client logo replaces it.
- `public/og-default.png` if you are replacing the fallback Open Graph image
  named in `site.defaultOgImage`.

## 3. Theme

Replace the brand ramp in `tokens/color.json`, then the type in
`tokens/typography.json` if the client has a specified typeface. Families are
loaded with `next/font` in `app/layout.tsx` and exposed as `--font-inter`; point
the token `font.sans` / `font.heading` at that variable (or a new one you add
the same way). The theme regenerates on the next `dev` or `build`.

See `docs/THEMING.md`.

## 4. Navigation

`src/config/navigation.ts` — the primary tree, header CTA, footer groups, and legal
links. One tree drives the mega menu, the mobile drawer, the footer, and
`app/sitemap.ts`.

A top-level item with both `href` and `panel` navigates to its own page and opens
the panel. Omit `href` when the label should only open the panel.

Keep mega panels lean: that markup ships in the HTML of every page. Optional
`icon` values are Lucide export names (`Wrench`, `Hammer`). The field is on the
link type for when a panel draws icons; the demo mega menu does not render them.

## 5. Pages

The demo ships a home page plus the routes the demo nav points at: about, team,
service area, services and four service stubs, contact, privacy, terms,
thank-you, and the App Router `not-found` page. Replace that copy. Add new
routes as `app/<segment>/page.tsx`.

Every page is `Section` > `Container` > content. `SimplePage` is the one-column
stub; replace it with a real layout once the page has a design. Pass data in
from the page. Do not read `site` or `navigation` from deep inside a reusable
block if the block is meant to move between projects — pass props.

`app/sitemap.ts` collects hrefs from `navigation.ts` plus `/` and `/thank-you`.
A page that is not linked from the nav is absent from the sitemap until you add
it there.

## 6. Content (only if needed)

If the site has a blog or similar, follow `docs/ADDING-A-COLLECTION.md`. If it does
not, skip this entirely — no collection ships by default and nothing needs removing.

## 7. Forms and tracking

- Contact currently renders NAP from `site.ts`. A form is added per project —
  see `docs/FORMS-AND-EMAIL.md`. `formEndpoint` and `recaptchaSiteKey` stay blank
  until that work exists. `/thank-you` is already a route.
- Analytics IDs are optional and per-platform. **Leave them blank unless the
  client is running paid ads.** An empty string means that vendor's script is
  never emitted. See `docs/HOSTING.md`.
- Only set `consent: 'banner'` if the client sells into the EU/UK or is large
  enough to trigger CCPA/CPRA. The flag is stored on `site`; the banner itself
  is project work, and it has to exist before any tag loads. A privacy policy
  page is required whenever Meta or Google tags are enabled.

## 8. Ship

Hosting and what to check before handover are in `docs/HOSTING.md`.

Before handover:

```bash
npm run lint
npm run build
```

Then check on the real origin: `/robots.txt` and `/sitemap.xml` resolve, a bad
URL renders the not-found page, canonicals use `site.url`, and both a trailing-slash
and a bare path for the same page do not split into two indexed URLs.

# Next.js business starter

Next.js App Router + TypeScript + Tailwind CSS v4, with the same config-first setup as [Astro Business Starter](https://github.com/chuckwebpro/Astro-Business-Starter): one business file, one nav file, and token-driven theming.

The demo ships a home page, the routes in the demo nav (about, services, contact, legal), `/thank-you`, and a not-found page. There is no CMS and no content collection until a project needs one.

---

## Populate before you build

| File | What goes in it | |
| --- | --- | --- |
| `src/config/site.ts` | Business name, NAP, hours, socials, schema.org type | required |
| `src/config/navigation.ts` | Nav tree, header CTA, footer and legal links | required |
| `tokens/*.json` | Replace the demo brand — theme regenerates on next build | required |
| `public/favicon.svg` | Client mark | required |
| `site.ts` → `url` | Production origin, no trailing slash. Drives canonicals, `robots.txt`, and `sitemap.xml` | required |
| `site.ts` → `formEndpoint` / `recaptchaSiteKey` | Contact form route + reCAPTCHA v3 site key | optional |
| `site.ts` → `analytics` / `verification` | Per-platform IDs — blank means that vendor ships nothing | optional |

Blank analytics, verification, and form fields ship nothing. Fill them only when the client actually needs them.

## Commands

| Command | Does |
| --- | --- |
| `npm run dev` | Generates the theme, then starts Next.js (port 3000) |
| `npm run build` | Generates the theme, then production build |
| `npm start` | Serves the production build |
| `npm run lint` | ESLint |
| `npm run tokens` | Regenerates `src/styles/theme.css` from `tokens/*.json` |

## Docs

| Doc | Covers |
| --- | --- |
| `docs/NEW-PROJECT.md` | The order to work in when starting a client site |
| `docs/THEMING.md` | Tokens, the generated theme, rebranding |
| `docs/RESPONSIVE-RULES.md` | Desktop-first defaults for tablet and mobile |
| `docs/ADDING-A-COLLECTION.md` | Adding a blog or similar, if the project needs one |
| `docs/FORMS-AND-EMAIL.md` | Route Handler forms, reCAPTCHA, mail config |
| `docs/HOSTING.md` | Next.js hosting, canonical host, log analytics |
| `docs/DESIGNER-BRIEF.md` | Hand to a designer when Figma is involved |

## Theming

`tokens/*.json` is the only committed source of design values. `src/styles/theme.css` is **generated** from it on every `dev` and `build`, and is gitignored — never edit it.

Tokens map straight onto Tailwind v4 namespaces, so `color.brand.500` becomes `--color-brand-500` and yields `bg-brand-500`. Semantic aliases (`surface`, `ink`, `line`) point at the raw scales, so a rebrand usually means editing the brand ramp alone.

There is **no override stylesheet**. If one place needs a different value, that is a component-level decision — a prop or a local class — not a global escape hatch.

Tokens can come from a Figma library via Tokens Studio, from another tool's export, or from editing the JSON by hand. The pipeline cannot tell the difference.

## Layout model

Every block is `Section > Container > content`:

- **`Section`** — full viewport width. Owns background, vertical rhythm, semantic tag.
- **`Container`** — `max-w-page` (1350px), centred, with gutters. Owns content arrangement.

Adjacent `Section`s sharing a background collapse the seam automatically (see `src/styles/global.css`), so stacked bands read as one flow while a colour change keeps its full padding.

Responsive is **desktop-first** using Tailwind `max-*` variants. See `docs/RESPONSIVE-RULES.md`.

## Deploying

This app runs on a Node host or a Next.js platform. It does not build a static `dist/` for cPanel. `site.url` is the production origin; `/robots.txt` and `/sitemap.xml` are generated from it. See `docs/HOSTING.md`.

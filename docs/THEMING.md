# Theming

`tokens/*.json` is the only committed source of design values.
`src/styles/theme.css` is **generated** from it and is gitignored — never edit it.

Generation runs automatically from `predev` and `prebuild`, or manually with
`npm run tokens`.

## Where tokens come from

The pipeline cannot tell the difference between these, and no project is ever
blocked waiting on a design tool:

1. **Figma via Tokens Studio** — the designer maps the plugin to the Figma variable
   collections and pushes `tokens/*.json` to a `design-tokens` branch. Merge, build.
   See `docs/DESIGNER-BRIEF.md`.
2. **Another design tool** — export or transcribe values into the JSON by hand.
3. **No designer** — edit the JSON directly. This is fully supported.

Tokens are [DTCG](https://tr.designtokens.org/) JSON (`$value` / `$type`).
`scripts/build-tokens.mjs` runs Style Dictionary with `name/kebab` only. Values
are already valid CSS, so unit-rewriting transforms are deliberately off —
they would corrupt `clamp()`.

## How tokens map to Tailwind

Token paths become Tailwind v4 theme namespaces, so the utility name follows from
the token name:

| Token path        | CSS variable        | Utility           |
| ----------------- | ------------------- | ----------------- |
| `color.brand.500` | `--color-brand-500` | `bg-brand-500`    |
| `color.ink.muted` | `--color-ink-muted` | `text-ink-muted`  |
| `font.sans`       | `--font-sans`       | `font-sans`       |
| `text.3xl`        | `--text-3xl`        | `text-3xl`        |
| `radius.lg`       | `--radius-lg`       | `rounded-lg`      |
| `shadow.md`       | `--shadow-md`       | `shadow-md`       |
| `spacing.section` | `--spacing-section` | `py-section`      |
| `container.page`  | `--container-page`  | `max-w-page`      |
| `breakpoint.md`   | `--breakpoint-md`   | `md:` / `max-md:` |

Two rules that matter:

- **Do not reuse a Tailwind built-in key name.** `container.prose` silently loses to
  Tailwind's own `--container-prose: 65ch`. Ours is `container.reading` for that reason.
- The generator emits **`@theme static`**, so every token reaches the stylesheet even
  if no utility class references it. Components read tokens through raw `var()`
  (`global.css` sets body colour and type this way), and without `static` those get
  tree-shaken away.

`src/styles/global.css` imports Tailwind, then the generated theme. `app/styles/index.css`
is not part of that pipeline.

## Semantic aliases

Raw ramps (`brand`, `neutral`, `accent`) are referenced by semantic tokens:

- `surface.*` — band backgrounds (`Section`)
- `ink.*` — text colours
- `line.*` — borders
- `focus` — focus ring

Components use the semantic names, so a rebrand usually means editing the brand
ramp alone and letting the aliases follow.

## Type

`tokens/typography.json` sets sizes, leading, tracking, and the family *stack*.
The actual font file is loaded in `app/layout.tsx` with `next/font/google` (Inter)
and exposed as `--font-inter`. The token references that variable:

```json
"sans": {
  "$value": "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
  "$type": "fontFamily"
}
```

To change the face, swap the `next/font` import and keep the CSS variable name in
sync with the token. Self-hosted files in `public/` work the same way if the
family is not on Google Fonts.

## Rebranding a project

1. Edit `tokens/color.json` (usually just the `brand` ramp).
2. `npm run dev` — the theme regenerates on start.
3. Walk the home page, a muted band, an inverse/brand band, and the header before
   touching the rest of the pages. Contrast failures show up there first.

## There is no override stylesheet

If one place needs a value the tokens do not have, that is a component-level
decision — a prop or a local class. Not a global escape hatch. If you find
yourself wanting to edit `theme.css`, the value belongs either in the tokens or
in a component prop; there is deliberately no third option.

Verify with:

```bash
rg -e "#[0-9a-fA-F]{3,8}" -e "\[[0-9.]+(px|rem)\]" src app
```

Anything outside `tokens/*.json` and `public/favicon.svg` is either a missing
token or a prop that should exist. The favicon is a static asset, not a theme value.

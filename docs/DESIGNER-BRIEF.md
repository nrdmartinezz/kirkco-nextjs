# Designer brief

Hand this over when a Figma design is involved. It is optional — the starter never
requires Figma, and tokens can equally be transcribed or hand-authored.

Following these conventions makes handoff mechanical instead of interpretive. The
deliverable is a **conformant Figma library plus a token push**, not a PNG.

---

## Canvas

- **One 1920px (FHD) artboard.** No tablet or mobile comps — those are handled in
  development against `docs/RESPONSIVE-RULES.md`.
- Content sits in a **1350px centred container**, leaving roughly 285px gutters.
- Full-bleed backgrounds, hero imagery, and the mega menu panel may span the full
  1920. **Text, cards, and grids never exceed 1350.** Draw the container edges as a
  guide so this is unambiguous.
- Nothing reflows between 1350 and 1920 — the gutters simply grow. Flag anything
  intended to break that rule.
- Group elements in the order they should stack on a narrow screen.

## Variables

Every colour, radius, spacing, and type value comes from a **variable — never a raw
hex or an arbitrary pixel number**. If a value you need does not exist, add it as a
variable rather than styling one layer directly.

Name collections to match the code, slash-nested:

| Figma collection   | Example               |
| ------------------ | --------------------- |
| `color/brand/*`    | `color/brand/500`     |
| `color/neutral/*`  | `color/neutral/200`   |
| `color/surface/*`  | `color/surface/muted` |
| `color/ink/*`      | `color/ink/base`      |
| `font/*`           | `font/sans`           |
| `text/*`           | `text/3xl`            |
| `radius/*`         | `radius/lg`           |
| `spacing/*`        | `spacing/section`     |
| `container/page`   | `1350px`              |

Semantic colours (`surface`, `ink`, `line`, `focus`) alias the raw ramps. Components
use the semantic names, so a rebrand is usually the brand ramp alone.

Spacing uses the defined scale only: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96.
No 37px gaps. Section padding and fluid type are `clamp()` values in
`tokens/layout.json` and `tokens/typography.json` — if a size must scale, specify
the floor and the ceiling, not a single desktop pixel size.

**Auto Layout on every frame**, with padding and gap set from spacing variables.
This is what makes a design translate to flex and grid instead of absolute
positioning.

## Components

One Figma component per code component, named identically:

- `UI/Button` — `variant = primary | secondary | ghost | inverse`, `size = sm | md | lg`
- `UI/Heading` — level and size are separate. Default size follows the level.
- `UI/Section` — `background = base | muted | inverse | brand`, `spacing = none | sm | md | lg`
- `UI/Container` — `width = page | narrow | reading`
- `Nav/MegaPanel` — columns, optional featured card

Component **variants become component props**. Use lowercase variant values matching
the intended prop values.

Never detach an instance. If a block needs to differ, make it a variant or ask for
a new component.

## States

Draw all of them: default, hover, focus, active, disabled, plus empty and error
states for forms. Focus uses the `focus` colour token.

## Navigation — the part most often under-specified

The mega menu runs from **768px up**. Below that, a drawer replaces it. The drawer
is a standard component and is **not** designed per project — you only need the
header's compact bar (logo, phone, hamburger). The phone number in the bar is
visible from 1024px up.

Specify:

- **Trigger behaviour per item** — does a top-level item with a panel also navigate
  to its own page, or only open the panel? In code that is whether `href` is set.
- **Panel anatomy** — full-bleed or 1350 container width, column count, column
  widths, internal padding.
- **The panel at 768px.** Columns typically halve. This is the constraint most
  often missed.
- **Density limits** — draw the panel at its minimum (2 items) and maximum (12+)
  so wrapping and column balancing are explicit rather than invented in code.
- **Longest-label behaviour** — wrap, truncate, or widen the column? Use real link text.
- Every state for triggers and panel items, including current-page.
- Optional extras — icons, descriptions, featured card — marked present or absent
  per menu, never implied. Icons are Lucide names on the link (`icon` in
  `navigation.ts`). The demo menu stores them and does not draw them until a
  design asks for it.
- **Sticky header** on scroll. The starter header is sticky. If the design wants
  shrink or hide-on-scroll, say so, including the scrolled state's height and shadow.

## Type

Open, self-hostable families only — Google Fonts or equivalent, loaded with
`next/font`. Adobe Fonts and per-domain-licensed webfonts need a third-party
loader and are out of scope unless the project explicitly accepts that cost.

The starter loads Inter. A different family means a different `next/font` import
in `app/layout.tsx` plus an updated `font.sans` / `font.heading` token.

## Delivery

- **Tokens** — push `tokens/*.json` via the Tokens Studio plugin's GitHub sync,
  DTCG shape (`$value`, `$type`). Your job ends there; you never touch code.
  See `docs/THEMING.md`.
- **Icons** — prefer a Lucide name. Custom icons are SVG on a 24px grid, strokes
  outlined, no embedded rasters.
- **Photography** — supply originals separately, not exported from the Figma file.
  Figma returns the placed (often already compressed) version.

## Content

Real client copy, not lorem ipsum. Layouts that only work at placeholder lengths
break on delivery.

Meet WCAG AA contrast, and annotate intended heading order where it is not visually
obvious. `Heading` level is the document outline; visual size is a separate prop.

## What already exists

Before designing something new, look at `Button`, `Heading`, `Section`, `Container`,
and the header. Ask for the repo rather than inventing a second button.

# Responsive rules

The designer produces **one 1920px artboard**. Tablet and mobile are developer-owned.

These are sensible defaults, not a contract. Apply them, then correct by eye during
the build. When you make the same correction twice, add it here so it becomes a default.

## Approach

Author at desktop, step **down** with Tailwind's `max-*` variants:

```html
<div class="grid grid-cols-3 max-md:grid-cols-1"></div>
```

Not `sm:grid-cols-1 md:grid-cols-3`. Reading in the same direction as the design
makes it obvious what the desktop intent was.

Breakpoints come from `tokens/layout.json` and reach Tailwind as `--breakpoint-*`:

| Name | Width  | Used for                            |
| ---- | ------ | ----------------------------------- |
| `sm` | 480px  | Large phones                        |
| `md` | 768px  | **Nav switch** — mega menu ↔ drawer |
| `lg` | 1024px | Laptops; phone number in the header |
| `xl` | 1280px | Wide desktop                        |

The header follows this. `MegaMenu` is `hidden` until `md`. `MobileNav` is
`md:hidden`. The header CTA is `max-md:hidden`. The phone link appears at `lg`.

## Standing defaults

- **Grids and card rows** collapse to one column below `md`. Three-up goes two-up
  at `lg` first where that reads better than jumping straight to one.
- **Image/text splits** stack **image first**, then text. A `reverse` prop, when a
  block has one, only affects desktop order.
- **Type and section padding** scale with `clamp()` from the tokens. Pick a
  sensible mobile floor and adjust it in `tokens/typography.json` or
  `tokens/layout.json` rather than adding breakpoint overrides in components.
  `Heading` maps a level to a token size; do not restyle headings per breakpoint
  unless the artboard requires it.
- **Tap targets** reach 44px below `md`. `Button` sizes (`min-h-11` and up) and
  nav links already do.
- **Tables** scroll horizontally rather than shrink. Wrap them in
  `overflow-x-auto` on the page; do not squeeze columns.
- **Stacking order is DOM order.** A block needing a different small-screen order
  exposes an explicit prop. Never scatter `order-*` utilities inline.

`Container` widths: `page` (1350px), `narrow` (900px), `reading` (70ch). Gutters
are `px-gutter`, which already clamps.

## Where this gets hard

Expect to hand-correct these; they are the ones with no obvious linear order:

- Heroes with text baked into imagery — art-direct with a different crop or a
  stacked layout instead of scaling the desktop composition.
- Wide data tables.
- Multi-column pricing.

## Checking your work

At 375, 768, and 1024: no horizontal scroll, no overlapping text, no tap target
under 44px, no orphaned single-column grid that should have been two-up. Confirm
the drawer replaces the mega menu at 768 and that focus is visible on both.

# Products

Product copy lives in `src/content/products.json`. Pages read it only through `src/lib/products.ts`.

Each product is a standalone page at `/{slug}`, using the product name as the slug. The same record is what other pages should query when they need a product list.

Some records are a family of models. `variants` on the record keeps each model's title, summary, image, and sections. The family page opens the model whose slug matches the product. Other models are `/{family}?variant={slug}`. The old top-level slug permanently redirects there. Supabase stores the same array on `products.variants`. A product with one model stores that model as the only entry, copied from the product's title, summary, image, and sections. The model selector appears only when a product has more than one variant.

`/bulk-chemical-storage` is a category page, not a product. The WordPress post with that slug was left out of the catalog. `/fill-mix` is a product page. The nav item points at that product.

Images are files in `public/products/`.

## Thin products

These pages shipped with a title and, when the export had them, a tagline and summary. The source post had no body. Expand them here when the copy exists. The `thin` flag on the record marks the same set. Models that now live on a family page are omitted.

- ALFAMIX — `/alfamix`
- Dosing Inspection System — `/dosing-inspection-system`
- Flow Meters — `/flow-meters`
- FRP Gel Coat Systems — `/frp-gel-coat-systems`
- I MIX — `/i-mix`
- ICF – Integral Compact Filter Spray System — `/icf-integral-compact-filter-spray-system`
- ID Spray Wall — `/id-spray-wall`
- Light Barrier — `/light-barrier`
- M-Cube — `/m-cube`
- Micro-flow Sensor — `/micro-flow-sensor`
- MR40 Metering Control Unit — `/mr40-metering-control-unit`
- Pressure Sensors — `/pressure-sensors`
- PROTEC 2K Mixing & Dosing Unit — `/protec-2k-mixing-dosing-unit`
- RIM MIX — `/rim-mix`
- Spray Valves — `/spray-valves`
- Stroke Detection — `/stroke-detection`
- Transfer Pump — `/transfer-pump`
- ULTRAMIX — `/ultramix`

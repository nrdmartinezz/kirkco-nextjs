# Products

Product copy lives in `src/content/products.json`. Pages read it only through `src/lib/products.ts`.

Each product is a standalone page at `/{slug}`, using the product name as the slug. The same record is what other pages should query when they need a product list.

`/bulk-chemical-storage` is a category page, not a product. The WordPress post with that slug was left out of the catalog. `/fill-mix` is a product page. The nav item points at that product.

Images are files in `public/products/`.

## Thin products

These pages shipped with a title and, when the export had them, a tagline and summary. The source post had no body. Expand them here when the copy exists. The `thin` flag on the record marks the same set.

- 2C 3C Infusion Resin Systems — `/2c-3c-infusion-resin-systems`
- 2C Gel Coat — `/2c-gel-coat`
- 2C Infusion Resin — `/2c-infusion-resin`
- 3C Glue Resins — `/3c-glue-resins`
- ALFAMIX — `/alfamix`
- Conti-Flow Compact — `/conti-flow-compact`
- Dosing Inspection System — `/dosing-inspection-system`
- Eldo-Mix 401T & Tooling Mix — `/eldo-mix-401t-tooling-mix`
- Flow Meters — `/flow-meters`
- FRP Gel Coat Systems — `/frp-gel-coat-systems`
- GP 302 — `/gp-302`
- GP 401 APD & CF Versa — `/gp-401-apd-cf-versa`
- GP-703 — `/gp-703`
- I MIX — `/i-mix`
- ICF – Integral Compact Filter Spray System — `/icf-integral-compact-filter-spray-system`
- ICM – Integral Compact Multicyclone Spray System — `/icm-integral-compact-multicyclone-spray-system`
- ID Spray Wall — `/id-spray-wall`
- Light Barrier — `/light-barrier`
- M-Cube — `/m-cube`
- Micro-flow Sensor — `/micro-flow-sensor`
- MR40 Metering Control Unit — `/mr40-metering-control-unit`
- Pressure Sensors — `/pressure-sensors`
- PROTEC 2K Mixing & Dosing Unit — `/protec-2k-mixing-dosing-unit`
- RIM MIX — `/rim-mix`
- Spray Valves — `/spray-valves`
- Spray Wall Basic 8000 — `/spray-wall-basic-8000`
- Stroke Detection — `/stroke-detection`
- Super Cube — `/super-cube`
- Transfer Pump — `/transfer-pump`
- TWINCONTROL 2K Mixing & Dosing Unit — `/twincontrol-2k-mixing-dosing-unit`
- ULTRAMIX — `/ultramix`
- ULTRAMIX 10-S MICRO DOSING — `/ultramix-10-s-micro-dosing`
- ULTRAMIX PLUS — `/ultramix-plus`
- Vecdos eOne — `/vecdos-eone`

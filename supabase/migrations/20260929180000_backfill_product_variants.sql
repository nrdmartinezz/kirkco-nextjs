-- Copy each standalone product into products.variants when that column is still empty.
-- Family rows already hold a non-empty array and are left unchanged.
-- Safe to run after 20260929120000_product_variants.sql. A later `npm run db:seed`
-- writes the same single-variant array for products that have no models in JSON.

update public.products
set variants = jsonb_build_array(
  jsonb_strip_nulls(
    jsonb_build_object(
      'slug', slug,
      'title', title,
      'tagline', tagline,
      'summary', summary,
      'sections', sections,
      'image', image
    )
  )
)
where variants is null
   or variants = '[]'::jsonb;

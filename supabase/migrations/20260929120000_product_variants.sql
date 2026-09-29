-- Selectable models on a family product. Apply after
-- 20260925140000_content_and_submissions.sql, then rerun `npm run db:seed`.
-- The anon select policy on products already covers this column.

alter table public.products
  add column if not exists variants jsonb not null default '[]'::jsonb;

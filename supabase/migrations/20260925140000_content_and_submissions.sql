-- Content is readable by the anon key. Submissions are not.
-- Apply this in the Supabase SQL editor before `npm run db:seed`.

create table public.product_categories (
  slug text primary key,
  name text not null,
  href text not null unique,
  group_name text not null,
  sort integer not null
);

create table public.products (
  slug text primary key,
  title text not null,
  updated date not null,
  tagline text,
  summary text,
  image jsonb,
  sections jsonb,
  thin boolean not null default false
);

create table public.product_category_links (
  product_slug text not null references public.products (slug) on delete cascade,
  category_slug text not null references public.product_categories (slug) on delete cascade,
  sort integer not null default 0,
  primary key (product_slug, category_slug)
);

create index product_category_links_category_idx on public.product_category_links (category_slug);

create table public.applications (
  id text primary key,
  title text not null,
  nda boolean not null default false,
  sections jsonb not null
);

create table public.equipment_pages (
  href text primary key,
  title text not null,
  description text not null,
  breadcrumb jsonb not null,
  hero_image text not null,
  hero_alt text not null,
  overview_image text not null,
  overview_image_alt text not null,
  overview_heading text not null,
  overview jsonb not null,
  systems jsonb not null,
  engagement_heading text not null,
  engagement_body text not null,
  platforms_heading text not null,
  platforms jsonb not null,
  architectures jsonb not null,
  application_ids jsonb not null,
  closing text not null
);

create table public.submissions (
  id uuid primary key default gen_random_uuid(),
  form_type text not null check (form_type in ('contact', 'quote', 'request-a-quote')),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index submissions_created_at_idx on public.submissions (created_at desc);

alter table public.product_categories enable row level security;
alter table public.products enable row level security;
alter table public.product_category_links enable row level security;
alter table public.applications enable row level security;
alter table public.equipment_pages enable row level security;
alter table public.submissions enable row level security;

grant select on public.product_categories to anon;
grant select on public.products to anon;
grant select on public.product_category_links to anon;
grant select on public.applications to anon;
grant select on public.equipment_pages to anon;

revoke all on table public.submissions from anon, authenticated;

create policy "anon read product_categories"
  on public.product_categories
  for select
  to anon
  using (true);

create policy "anon read products"
  on public.products
  for select
  to anon
  using (true);

create policy "anon read product_category_links"
  on public.product_category_links
  for select
  to anon
  using (true);

create policy "anon read applications"
  on public.applications
  for select
  to anon
  using (true);

create policy "anon read equipment_pages"
  on public.equipment_pages
  for select
  to anon
  using (true);

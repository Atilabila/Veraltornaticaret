-- MP-13: Product Variants (Size/Fiyat/Stok)
-- Adds product_variants table linked to metal_products.

create table if not exists public.product_variants (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid not null references public.metal_products(id) on delete cascade,
  size_label text not null,
  price_modifier numeric(10, 2) not null default 0 check (price_modifier >= 0),
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint product_variants_unique_product_size unique (product_id, size_label)
);

create index if not exists idx_product_variants_product_id on public.product_variants(product_id);

-- Keep updated_at fresh (function exists from base schema)
drop trigger if exists update_product_variants_updated_at on public.product_variants;
create trigger update_product_variants_updated_at
  before update on public.product_variants
  for each row execute function public.update_updated_at_column();

-- RLS
alter table public.product_variants enable row level security;

drop policy if exists "Public can view variants for active products" on public.product_variants;
create policy "Public can view variants for active products"
on public.product_variants
for select
to anon
using (
  exists (
    select 1 from public.metal_products p
    where p.id = product_variants.product_id
      and p.is_active = true
  )
);

drop policy if exists "Authenticated can manage variants" on public.product_variants;
create policy "Authenticated can manage variants"
on public.product_variants
for all
to authenticated
using (auth.role() = 'authenticated')
with check (auth.role() = 'authenticated');


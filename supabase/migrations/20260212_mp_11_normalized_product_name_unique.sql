-- MP-11: Enforce normalized product name uniqueness on metal_products
-- Rules:
-- 1) trim leading/trailing whitespace
-- 2) collapse multiple whitespace characters into one space
-- 3) case-insensitive compare
--
-- IMPORTANT:
-- This migration intentionally fails if duplicates already exist.
-- Clean duplicates first by running:
-- supabase/preflight_metal_products_normalized_name_duplicates.sql

create or replace function public.normalize_product_name(input_name text)
returns text
language sql
immutable
strict
as $$
  select lower(regexp_replace(btrim(input_name), E'\\s+', ' ', 'g'));
$$;

comment on function public.normalize_product_name(text)
is 'Normalizes product names for uniqueness checks: trim + collapse spaces + lowercase';

do $$
begin
  if exists (
    select 1
    from public.metal_products
    group by public.normalize_product_name(name)
    having count(*) > 1
  ) then
    raise exception
      'MP-11 migration blocked: duplicate normalized product names found in public.metal_products. Run preflight query and clean data first.';
  end if;
end;
$$;

create unique index if not exists ux_metal_products_name_normalized
on public.metal_products (public.normalize_product_name(name));

comment on index public.ux_metal_products_name_normalized
is 'MP-11: Enforces global uniqueness of normalized metal_products.name';

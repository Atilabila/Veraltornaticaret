-- Preflight check for MP-11 migration:
-- Detect duplicate names in public.metal_products after normalization.
--
-- Normalization rules:
-- 1) trim leading/trailing whitespace
-- 2) collapse multiple whitespace characters into one space
-- 3) case-insensitive compare

with normalized as (
  select
    id,
    name,
    lower(regexp_replace(btrim(name), E'\\s+', ' ', 'g')) as normalized_name
  from public.metal_products
),
duplicate_groups as (
  select
    normalized_name,
    count(*) as duplicate_count
  from normalized
  group by normalized_name
  having count(*) > 1
)
select
  dg.normalized_name,
  dg.duplicate_count,
  n.id,
  n.name
from duplicate_groups dg
join normalized n
  on n.normalized_name = dg.normalized_name
order by dg.duplicate_count desc, dg.normalized_name, n.name, n.id;

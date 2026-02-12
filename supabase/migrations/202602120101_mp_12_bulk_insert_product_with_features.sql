-- MP-12: Atomic helper function for bulk metal product inserts
-- Inserts one product + optional feature rows in a single transaction scope.

create or replace function public.insert_metal_product_with_features(
  p_name text,
  p_slug text,
  p_description text,
  p_price numeric,
  p_image_url text,
  p_category_id uuid,
  p_is_active boolean default true,
  p_stock_quantity integer default 0,
  p_background_color text default '#0A0A0A',
  p_is_showcase boolean default false,
  p_features text[] default '{}'
)
returns uuid
language plpgsql
as $$
declare
  v_product_id uuid;
  v_feature text;
  v_index integer;
begin
  insert into public.metal_products (
    name,
    slug,
    description,
    price,
    image_url,
    category_id,
    is_active,
    stock_quantity,
    background_color,
    is_showcase
  )
  values (
    p_name,
    p_slug,
    p_description,
    p_price,
    p_image_url,
    p_category_id,
    p_is_active,
    p_stock_quantity,
    p_background_color,
    p_is_showcase
  )
  returning id into v_product_id;

  if p_features is not null and array_length(p_features, 1) is not null then
    for v_index in 1..array_length(p_features, 1) loop
      v_feature := nullif(btrim(coalesce(p_features[v_index], '')), '');

      if v_feature is not null then
        insert into public.product_features (
          product_id,
          feature_text,
          display_order
        )
        values (
          v_product_id,
          v_feature,
          v_index
        );
      end if;
    end loop;
  end if;

  return v_product_id;
end;
$$;

comment on function public.insert_metal_product_with_features(
  text,
  text,
  text,
  numeric,
  text,
  uuid,
  boolean,
  integer,
  text,
  boolean,
  text[]
)
is 'MP-12: Inserts one metal product and its features atomically for admin bulk upload API';

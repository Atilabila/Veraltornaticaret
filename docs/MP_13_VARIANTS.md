# MP-13: Ürün Varyantları (Boyut / Ek Fiyat / Stok)

## 1) Supabase SQL (Zorunlu)
- Dosya: `supabase/migrations/20260213_mp_13_product_variants.sql`
- Supabase Dashboard > SQL Editor'da çalıştırın.

Not: PostgREST ilişki cache'i bazen gecikebilir. SQL'i çalıştırdıktan sonra 30-60sn bekleyin.

## 2) Hızlı Doğrulama (SQL Editor)
```sql
select
  table_name
from information_schema.tables
where table_schema = 'public'
  and table_name = 'product_variants';

select *
from public.product_variants
limit 5;
```

İlişki testi:
```sql
select
  p.id,
  p.name,
  v.size_label,
  v.price_modifier,
  v.stock_quantity
from public.metal_products p
left join public.product_variants v on v.product_id = p.id
order by p.created_at desc
limit 25;
```

## 3) Admin UI
- Admin > Ürün Ekle/Düzenle modalında `VARYANTLAR` bölümü var.
- Kaydettiğinizde varyantlar `product_variants` tablosuna yazılır.


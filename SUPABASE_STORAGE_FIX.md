# 🔧 Supabase Storage RLS Sorunu Çözümü

## ❌ Sorun
Windows'tan yüklenen resimler Supabase'e gidiyor ama sitede görünmüyor. Bunun sebebi **RLS (Row Level Security)** politikalarının eksik olması.

## ✅ Çözüm (2 Yöntem)

### Yöntem 1: Supabase Dashboard (Önerilen - Hızlı)

1. **Supabase Dashboard'a git**
   - https://supabase.com/dashboard

2. **Storage sekmesine tıkla**
   - Sol menüden "Storage" > "Buckets"

3. **`products` bucket'ını bul**
   - Eğer yoksa: "New Bucket" butonuna tıkla
   - Bucket Name: `products`
   - **Public bucket**: ✅ AÇIK (çok önemli!)
   - "Create bucket" butonuna tıkla

4. **Mevcut bucket'ı public yap**
   - Eğer bucket zaten varsa:
   - `products` bucket'ına tıkla
   - Sağ üstteki "⚙️ Settings" butonuna tıkla
   - "Public bucket" toggle'ını **AÇIK** yap
   - "Save" butonuna tıkla

5. **RLS Politikalarını Ekle**
   - Sol menüden "SQL Editor" sekmesine git
   - `supabase/storage-rls-setup.sql` dosyasındaki SQL'i yapıştır
   - "Run" butonuna tıkla

### Yöntem 2: SQL Script (Detaylı Kontrol)

```sql
-- 1. Bucket'ı public yap
UPDATE storage.buckets 
SET public = true 
WHERE id = 'products';

-- 2. RLS Politikalarını ekle
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'products');

CREATE POLICY "Authenticated Upload Access"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'products' 
    AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated Update Access"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'products' 
    AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated Delete Access"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'products' 
    AND auth.role() = 'authenticated'
);
```

## 🧪 Test Etme

1. Admin paneline git (`/admin`)
2. Site İçeriği > Hero sekmesine tıkla
3. "Ana Görsel" bölümünde bir resim yükle
4. Resmin preview'da göründüğünü kontrol et
5. Ana sayfaya git ve resmin görünüp görünmediğini kontrol et

## 🔍 Sorun Devam Ediyorsa

### Console'da Hata Kontrolü

1. Tarayıcıda F12'ye bas
2. "Network" sekmesine git
3. Bir resim yüklemeyi dene
4. Kırmızı (failed) isteklere bak
5. Hata mesajını kontrol et:
   - **403 Forbidden** → RLS politikası eksik
   - **404 Not Found** → Bucket yok veya yanlış isim
   - **401 Unauthorized** → Authentication sorunu

### Bucket URL Formatı

Doğru URL formatı:
```
https://[PROJECT_ID].supabase.co/storage/v1/object/public/products/[FOLDER]/[FILENAME]
```

Örnek:
```
https://abcdefgh.supabase.co/storage/v1/object/public/products/hero/xyz123_1234567890.jpg
```

## 📝 Notlar

- **Public bucket** olmazsa resimler görünmez!
- RLS politikaları olmadan admin bile yükleyemez
- Mevcut yüklü resimlere de RLS uygulanır
- Bucket'ı public yaptıktan sonra tüm resimler otomatik erişilebilir olur

## 🚀 Hızlı Kontrol Komutu

Supabase SQL Editor'de şunu çalıştır:

```sql
-- Bucket durumunu kontrol et
SELECT id, name, public 
FROM storage.buckets 
WHERE id = 'products';

-- RLS politikalarını kontrol et
SELECT * 
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage';
```

Eğer `public = false` ise yukarıdaki `UPDATE` komutunu çalıştır.

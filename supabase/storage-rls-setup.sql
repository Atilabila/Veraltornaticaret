-- ============================================
-- SUPABASE STORAGE RLS POLİTİKALARI
-- ============================================
-- Bu script, 'products' bucket'ı için gerekli RLS politikalarını oluşturur
-- Böylece yüklenen resimler public olarak erişilebilir olur

-- 1. BUCKET OLUŞTUR (eğer yoksa)
-- Supabase Dashboard > Storage > New Bucket
-- Bucket Name: products
-- Public: YES (önemli!)

-- 2. RLS POLİTİKALARINI OLUŞTUR

-- Herkes okuyabilir (Public Read)
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'products');

-- Authenticated kullanıcılar yükleyebilir (Admin Upload)
CREATE POLICY "Authenticated Upload Access"
ON storage.objects FOR INSERT
WITH CHECK (
    bucket_id = 'products' 
    AND auth.role() = 'authenticated'
);

-- Authenticated kullanıcılar güncelleyebilir
CREATE POLICY "Authenticated Update Access"
ON storage.objects FOR UPDATE
USING (
    bucket_id = 'products' 
    AND auth.role() = 'authenticated'
);

-- Authenticated kullanıcılar silebilir
CREATE POLICY "Authenticated Delete Access"
ON storage.objects FOR DELETE
USING (
    bucket_id = 'products' 
    AND auth.role() = 'authenticated'
);

-- ============================================
-- KULLANIM TALİMATLARI
-- ============================================
-- 1. Supabase Dashboard'a git
-- 2. SQL Editor'ü aç
-- 3. Bu script'i yapıştır ve çalıştır
-- 4. Storage > products bucket'ını kontrol et
-- 5. Bucket'ın "Public" olduğundan emin ol
-- ============================================

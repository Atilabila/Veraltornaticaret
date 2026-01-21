# Metal Poster Pro - Görev İlerleme Durumu (TASK_PROGRESS)

Bu dosya, projenin mevcut durumunu, tamamlanan işleri ve bekleyen kritik görevleri takip eder.

## ✅ Tamamlanan İşler

### 1. Ürün Verisi ve İsimlendirme
- `scripts/generate-products-from-public.js` güncellendi.
- Ürün ve resim dosyaları kategorilere göre düzenlendi.
- `src/lib/products.ts` statik veri dosyası oluşturuldu.

### 2. Supabase Altyapısı
- **Database Schema:** `SUPABASE_SETUP.sql` dosyası hazırlandı (Tablolar + Storage + RLS).
- **Migration Script:** `migrate-products.ts` hazırlandı ve hata yönetimi ile güçlendirildi.
- **Config:** `.env.local` dosyası yeni API anahtarlarıyla güncellendi.

### 3. UI/UX & Tasarım (Industrial Brutalism)
- **Global Stil:** `globals.css` @theme desteği ile güncellendi.
- **Ürün Detay Sayfası:** `ProductDetailClient.tsx` modüler hale getirildi (Scene, Config, Specs).
- **Dark Mode:** `ThemeToggle` bileşeni eklendi.
- **Admin Panel:**
    - `AdminDashboard.tsx` refaktör edildi.
    - `ImageUploader.tsx` bileşeni eklendi (Drag-and-drop & Supabase Storage).
    - Ürün ekleme/düzenleme modalları yeni resim yükleyiciyi kullanıyor.

---

## 🏗️ Bekleyen Kritik Görev (KULLANICI EYLEMİ GEREKLİ)

### ⚠️ Veritabanı Kurulumu
- **User Action:** `SUPABASE_SETUP.sql` içeriğinin Supabase Dashboard üzerinden çalıştırılması gerekiyor.
- Bu işlem tamamlanmadan admin paneli veya veri tabanı özellikleri çalışmayacaktır.

---

## 📝 Notlar
- Proje şu an hem **statik** (JSON fallback) hem de **dinamik** (Supabase) çalışabilecek hibrit yapıda.
- Admin Panelinde "Görsel Yönetimi" sekmesi artık aktif ve gerçek dosya yükleyebiliyor.

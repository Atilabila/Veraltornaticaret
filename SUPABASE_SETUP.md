# 🚀 Supabase Entegrasyon Kurulum Rehberi

## Metal Poster Pro - Veritabanı Kurulumu

Bu rehber, Metal Poster Pro projesini Supabase ile entegre etmek için gereken tüm adımları içerir.

---

## 📋 Gereksinimler

- Supabase hesabı ([supabase.com](https://supabase.com))
- Node.js ve npm kurulu olmalı
- Proje dosyaları

---

## 🔧 Adım 1: Supabase Projesi Oluşturma

1. [Supabase Dashboard](https://app.supabase.com)'a gidin
2. "New Project" butonuna tıklayın
3. Proje bilgilerini doldurun:
   - **Name**: metal-poster-pro
   - **Database Password**: Güçlü bir şifre seçin (kaydedin!)
   - **Region**: En yakın bölgeyi seçin (örn: Frankfurt)
4. "Create new project" butonuna tıklayın
5. Proje oluşturulmasını bekleyin (~2 dakika)

---

## 🗄️ Adım 2: Veritabanı Şemasını Oluşturma

1. Supabase Dashboard'da **SQL Editor** sekmesine gidin
2. "New query" butonuna tıklayın
3. `supabase/schema.sql` dosyasının içeriğini kopyalayın
4. SQL Editor'e yapıştırın
5. **RUN** butonuna tıklayın
6. ✅ "Success. No rows returned" mesajını görmelisiniz

---

## 📦 Adım 3: Örnek Verileri Yükleme (Opsiyonel)

1. SQL Editor'de yeni bir query açın
2. `supabase/seed.sql` dosyasının içeriğini kopyalayın
3. SQL Editor'e yapıştırın
4. **RUN** butonuna tıklayın

**NOT:** `seed.sql` sadece 3 örnek ürün içerir. Tüm ürünleri yüklemek için:
- `src/lib/products.ts` dosyasındaki tüm ürünleri SQL INSERT formatına çevirmeniz gerekir
- Veya admin panelinden manuel olarak ekleyebilirsiniz

---

## 🔑 Adım 4: API Anahtarlarını Alma

1. Supabase Dashboard'da **Settings** > **API** sekmesine gidin
2. Aşağıdaki bilgileri kopyalayın:
   - **Project URL** (örn: `https://xxxxx.supabase.co`)
   - **anon public** key
   - **service_role** key (GİZLİ - sadece backend'de kullanın!)

---

## ⚙️ Adım 5: Environment Değişkenlerini Ayarlama

1. `.env.local` dosyasını açın
2. Kopyaladığınız değerleri yapıştırın:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. Dosyayı kaydedin

---

## 🧪 Adım 6: Bağlantıyı Test Etme

Terminalde şu komutu çalıştırın:

```bash
npm run dev
```

Tarayıcıda `http://localhost:3000` adresine gidin ve:
- Ana sayfanın yüklendiğini kontrol edin
- Ürünlerin görüntülendiğini kontrol edin
- Console'da hata olmadığını kontrol edin

---

## 📊 Adım 7: Veritabanını İzleme

Supabase Dashboard'da:

1. **Table Editor** sekmesine gidin
2. `products` tablosunu seçin
3. Ürünlerin listelendiğini görün
4. **Database** > **Roles** sekmesinden RLS (Row Level Security) politikalarını kontrol edin

---

## 🔒 Güvenlik Notları

### ✅ YAPILMASI GEREKENLER:

- `.env.local` dosyasını **asla** Git'e commit etmeyin
- `.gitignore` dosyasında `.env.local` olduğundan emin olun
- `service_role` anahtarını **sadece** server-side kod'da kullanın
- Production'da RLS politikalarını gözden geçirin

### ❌ YAPILMAMASI GEREKENLER:

- `service_role` anahtarını client-side kodda kullanmayın
- `.env.local` dosyasını paylaşmayın
- Supabase şifrenizi basit tutmayın

---

## 🎨 Sonraki Adımlar

### 1. Admin Panel Oluşturma
- `/admin` route'u oluşturun
- Ürün ekleme/düzenleme/silme formu yapın
- Sipariş yönetim paneli ekleyin

### 2. Statik Verilerden Geçiş
- `src/lib/products.ts` yerine Supabase'den veri çekin
- Tüm ürün sayfalarını güncelleyin
- Cache stratejisi belirleyin (ISR, SSG, SSR)

### 3. Sipariş Sistemi
- Checkout sayfası oluşturun
- Ödeme entegrasyonu (Stripe, PayTR, vb.)
- Email bildirimleri

### 4. Performans Optimizasyonu
- Next.js ISR (Incremental Static Regeneration) kullanın
- Image optimization
- CDN entegrasyonu

---

## 🆘 Sorun Giderme

### Bağlantı Hatası
```
Error: Missing Supabase environment variables
```
**Çözüm:** `.env.local` dosyasını kontrol edin ve dev server'ı yeniden başlatın

### RLS Policy Hatası
```
Error: new row violates row-level security policy
```
**Çözüm:** SQL Editor'de RLS politikalarını kontrol edin veya geçici olarak devre dışı bırakın

### CORS Hatası
```
Access to fetch blocked by CORS policy
```
**Çözüm:** Supabase Dashboard > Settings > API > CORS ayarlarını kontrol edin

---

## 📚 Faydalı Linkler

- [Supabase Docs](https://supabase.com/docs)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Storage](https://supabase.com/docs/guides/storage)

---

## ✅ Kontrol Listesi

- [ ] Supabase projesi oluşturuldu
- [ ] Schema çalıştırıldı
- [ ] Seed data yüklendi (opsiyonel)
- [ ] API anahtarları kopyalandı
- [ ] `.env.local` dosyası güncellendi
- [ ] Dev server çalışıyor
- [ ] Ürünler görüntüleniyor
- [ ] Console'da hata yok

---

**Tebrikler! 🎉 Supabase entegrasyonu tamamlandı.**

Artık dinamik bir veritabanı ile çalışan, ölçeklenebilir bir e-ticaret platformunuz var!

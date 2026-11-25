# VERAL Torna & Teneke Ticaret - E-Ticaret & B2B Portal

**Proje Durumu:** MP-10 Tamamlandı (Admin Auth + Audit + Modular Architecture)  
**Son Güncelleme:** 2026-01-27

---

## 📌 Genel Bakış

Bu proje, VERAL Torna & Teneke Ticaret için geliştirilmiş bir **Next.js 15 (App Router)** tabanlı e-ticaret ve B2B portalıdır. Metal işleme ürünleri satışı, teklif yönetimi ve admin paneli içerir.

---

## 🛠️ Teknoloji Stack'i

- **Frontend:** Next.js 15 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS + Custom Brutalist Design System
- **Backend:** Supabase (PostgreSQL + Auth + Storage)
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Email:** Resend (SMTP)
- **Deployment:** Vercel (Production)

---

## ✅ Tamamlanan Milestone'lar

### **MP-01: Temel Altyapı**
- ✅ Next.js 15 + TypeScript kurulumu
- ✅ Tailwind CSS + Brutalist tasarım sistemi
- ✅ Temel sayfa yapısı (Home, Products, About, Contact)

### **MP-02: Ürün Kataloğu**
- ✅ Dinamik ürün listeleme
- ✅ Kategori filtreleme
- ✅ Ürün detay sayfaları
- ✅ SEO optimizasyonu

### **MP-03: Sepet & Checkout**
- ✅ Sepet yönetimi (Zustand)
- ✅ Checkout formu
- ✅ Sipariş özeti

### **MP-04: B2B Teklif Sistemi**
- ✅ Teklif formu (dosya yükleme)
- ✅ Supabase Storage entegrasyonu
- ✅ Admin teklif görüntüleme

### **MP-05: Sipariş Yönetimi**
- ✅ Sipariş oluşturma
- ✅ Sipariş geçmişi
- ✅ Durum takibi

### **MP-06: Email Entegrasyonu**
- ✅ Resend SMTP kurulumu
- ✅ Sipariş onay emailleri
- ✅ Teklif bildirimleri

### **MP-07: SEO & Performance**
- ✅ Metadata optimizasyonu
- ✅ Sitemap & robots.txt
- ✅ Image optimization

### **MP-08: Hybrid Sync & Order Management**
- ✅ Supabase-Zustand senkronizasyonu
- ✅ Real-time sipariş güncellemeleri
- ✅ Admin sipariş yönetimi

### **MP-09: Storage & SEO**
- ✅ Supabase Storage bucket yapılandırması
- ✅ RLS policies (quote-attachments)
- ✅ SEO meta tags

### **MP-10: Admin Auth Flow + Audit + Guardrails** ⭐ **YENİ**
- ✅ **Modüler Mimari:**
  - `src/lib/auth/requireAdmin.ts` - Authentication guard
  - `src/lib/audit/logAdminAction.ts` - Audit logging
  - `src/lib/supabase/admin.ts` - Admin client factory
  - `src/lib/supabase/browser.ts` - Browser client factory
- ✅ **Magic Link Authentication** (`/admin-login`)
- ✅ **Server-Side Route Guard** (`/admin/layout.tsx`)
- ✅ **Audit Logging System** (`admin_logs` table)
- ✅ **Admin Whitelist** (`admins` table)
- ✅ **Comprehensive Logging:** Order updates, quote views, product/category changes, content updates
- ✅ **Audit Logs UI** (Admin Dashboard tab)

---

## 🗄️ Database Schema (Supabase)

### **Tablolar:**
1. **products** - Ürün bilgileri
2. **categories** - Kategori bilgileri
3. **orders** - Sipariş kayıtları
4. **order_items** - Sipariş detayları
5. **quotes** - B2B teklif talepleri
6. **quote_attachments** - Teklif dosyaları (metadata)
7. **site_content** - CMS içerikleri
8. **admin_logs** ⭐ **YENİ** - Admin eylem kayıtları
9. **admins** ⭐ **YENİ** - Admin whitelist

### **Storage Buckets:**
- **quote-attachments** - Teklif dosyaları (private, RLS korumalı)

---

## 🔐 Güvenlik & Yetkilendirme

### **Admin Kimlik Doğrulama:**
1. **Primary Method:** Supabase Auth `app_metadata.role === "admin"`
2. **Fallback:** `admins` tablosunda email kontrolü (`is_active = true`)

### **Admin Yetkisi Verme:**
```sql
-- Supabase Dashboard > Auth > Users > [user] > app_metadata
{
  "role": "admin"
}
```

### **Audit Logging:**
- Tüm kritik admin işlemleri `admin_logs` tablosuna kaydedilir
- Kaydedilen bilgiler: Admin user ID, eylem tipi, etkilenen varlık, IP, user agent
- Admin Dashboard'da görüntülenebilir

---

## 🚀 Deployment & Environment

### **Environment Variables:**
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...  # ⚠️ SERVER ONLY

# Site
NEXT_PUBLIC_SITE_URL=https://www.veralteneketicaret.com

# Email (Resend)
RESEND_API_KEY=re_xxx...
```

### **Kritik Notlar:**
- ⚠️ `SUPABASE_SERVICE_ROLE_KEY` **asla** client-side kod içinde import edilmemelidir
- ⚠️ Bucket adı `quote-attachments` olarak sabitlenmiştir
- ⚠️ Magic link redirect URL'leri Supabase Dashboard'da allowlist'e eklenmelidir

---

## 📝 Sıradaki Adımlar

### **MP-11: Production Hardening** (Öneri)
- [ ] Rate limiting (API routes)
- [ ] CSRF protection
- [ ] Input validation (Zod schemas)
- [ ] Error boundary components
- [ ] Monitoring & alerting (Sentry)

### **MP-12: Advanced Features** (Opsiyonel)
- [ ] Multi-language support (i18n)
- [ ] Advanced analytics
- [ ] Product reviews
- [ ] Wishlist functionality

---

## 🎯 Önemli Dosyalar

### **Modüler Mimari:**
```
src/
├── lib/
│   ├── auth/
│   │   └── requireAdmin.ts          # Auth guard
│   ├── audit/
│   │   └── logAdminAction.ts        # Audit logger
│   └── supabase/
│       ├── admin.ts                 # Admin client factory
│       ├── browser.ts               # Browser client factory
│       └── server.ts                # SSR client factory
├── actions/
│   ├── admin.ts                     # Admin business logic
│   └── auth.ts                      # Auth actions
└── app/
    ├── admin/
    │   ├── layout.tsx               # Route guard
    │   └── page.tsx                 # Dashboard
    └── admin-login/
        └── page.tsx                 # Login page
```

### **Migrations:**
```
supabase/migrations/
├── 20260127_mp_10_admin_auth_v2.sql  # Admin auth + audit tables
└── 20260127_mp_09_storage.sql        # Storage buckets
```

---

## 📞 İletişim & Destek

**Proje Sahibi:** VERAL Torna & Teneke Ticaret  
**Geliştirici:** Antigravity AI Agent  
**Versiyon:** 1.0.0 (MP-10)

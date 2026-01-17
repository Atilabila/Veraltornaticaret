# 🗂️ Supabase Entegrasyon Dosya Yapısı

## Oluşturulan Dosyalar

```
metal-poster-pro/
│
├── .env.local                          # ⚠️ Supabase API anahtarları (GİZLİ)
├── .env.example                        # Environment değişkenleri şablonu
│
├── supabase/
│   ├── schema.sql                      # Veritabanı şeması (tablolar, indexler, RLS)
│   └── seed.sql                        # Örnek veri migration scripti
│
├── src/
│   └── lib/
│       └── supabase/
│           ├── client.ts               # Supabase client yapılandırması
│           ├── database.types.ts       # TypeScript database tipleri
│           ├── products.service.ts     # Ürün CRUD işlemleri
│           └── orders.service.ts       # Sipariş yönetimi
│
├── SUPABASE_SETUP.md                   # Detaylı kurulum rehberi
└── PROJECT_STATUS.md                   # Güncel proje durumu
```

---

## 📦 Kurulum Özeti

### 1. Paket Kurulumu ✅
```bash
npm install @supabase/supabase-js
```

### 2. Environment Değişkenleri ⚠️
`.env.local` dosyasını düzenleyin:
```env
NEXT_PUBLIC_SUPABASE_URL=your_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_key_here
```

### 3. Veritabanı Şeması 🗄️
Supabase SQL Editor'de çalıştırın:
- `supabase/schema.sql`
- `supabase/seed.sql` (opsiyonel)

---

## 🎯 Kullanım Örnekleri

### ProductService Kullanımı

```typescript
import { ProductService } from '@/lib/supabase/products.service';

// Tüm ürünleri getir
const products = await ProductService.getAllProducts();

// Kategoriye göre filtrele
const cars = await ProductService.getProductsByCategory('ARABA_PLAKA');

// Slug ile tek ürün
const product = await ProductService.getProductBySlug('klasik-ford-mustang-gt-metal-tablo');

// Arama
const results = await ProductService.searchProducts('mustang');

// Popüler ürünler
const featured = await ProductService.getFeaturedProducts(6);
```

### OrderService Kullanımı

```typescript
import { OrderService } from '@/lib/supabase/orders.service';

// Sipariş oluştur
const { order, items } = await OrderService.createOrder(
  {
    customer_name: 'Ahmet Yılmaz',
    customer_email: 'ahmet@example.com',
    customer_phone: '+90 555 123 4567',
    shipping_address: 'İstanbul, Türkiye',
    total_amount: 700,
  },
  [
    { product_id: 'CARS_01', quantity: 2, unit_price: 350 }
  ]
);

// Sipariş durumunu güncelle
await OrderService.updateOrderStatus(order.id, 'shipped');

// İstatistikler
const stats = await OrderService.getOrderStats();
```

---

## 🔐 Güvenlik

### ✅ Yapılması Gerekenler
- `.env.local` dosyasını Git'e commit etmeyin
- `service_role` anahtarını sadece server-side kullanın
- RLS (Row Level Security) politikalarını aktif tutun

### ❌ Yapılmaması Gerekenler
- API anahtarlarını client-side kodda hardcode etmeyin
- `.env.local` dosyasını paylaşmayın
- Production'da RLS'yi devre dışı bırakmayın

---

## 📊 Veritabanı Tabloları

### `products`
- Ürün bilgileri (isim, fiyat, açıklama, vb.)
- SEO metadata
- Stok takibi
- Görüntülenme sayısı

### `product_images`
- Farklı boyutlarda ürün görselleri (xs, s, m, l, xl)

### `orders`
- Sipariş bilgileri
- Müşteri detayları
- Sipariş durumu (pending, processing, shipped, delivered, cancelled)

### `order_items`
- Sipariş kalemleri
- Ürün-sipariş ilişkisi

---

## 🚀 Sonraki Adımlar

1. **Supabase Hesabı Oluştur** → [supabase.com](https://supabase.com)
2. **Şemayı Çalıştır** → SQL Editor'de `schema.sql`
3. **API Anahtarlarını Ekle** → `.env.local` dosyasına
4. **Test Et** → `npm run dev` ile kontrol et
5. **Frontend'i Entegre Et** → Statik verilerden Supabase'e geç

Detaylı adımlar için: **`SUPABASE_SETUP.md`** dosyasına bakın.

---

## 📞 Destek

Sorun yaşarsanız:
1. `SUPABASE_SETUP.md` dosyasındaki "Sorun Giderme" bölümüne bakın
2. Supabase Dashboard > Logs sekmesini kontrol edin
3. Browser console'da hata mesajlarını inceleyin

---

**Hazırlayan:** Antigravity AI  
**Tarih:** 17 Ocak 2026  
**Versiyon:** 1.0 - Supabase Ready

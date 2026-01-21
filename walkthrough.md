# Metal Poster Pro - Teknik Rehber ve İş Akışı (WALKTHROUGH)

Bu döküman, projenin teknik yapısını ve yeni bir geliştiricinin nasıl ilerlemesi gerektiğini anlatır.

## 🚀 Başlangıç

### 1. Ürün Üretimi
Yeni görseller eklendiğinde veya isimler değiştiğinde şu komutu çalıştırın:
```bash
node scripts/generate-products-from-public.js
```
Bu script `public/` klasöründeki alt dizinleri tarar ve `src/lib/products.ts` dosyasını otomatik günceller.

### 2. Veritabanı Senkronizasyonu
Yerel veriyi Supabase'e aktarmak için:
```bash
# .env.local dosyasında SUPABASE_SERVICE_ROLE_KEY tanımlı olmalıdır
npm run migrate
```

---

## 🎨 UI/UX ve Tasarım Standartları

Yeni yönergelere göre tasarım şu kurallara uymalıdır:

### Temalandırma
- **Açık Tema:** Temiz beyaz arka plan ve koyu metinler.
- **Koyu Tema:** Premium hissi için hafif gölgeli (shadow-brutal) kartlar ve kontrast bordurlar.

### Sayfa Düzenleri
- **Katalog:** Ürün kartları asla birbirinin üzerine binmemeli. `ProductCard` bileşeni içindeki padding değerleri korunmalı.
- **Detay Sayfası:** Butonlar ve içerik birbirinden ayrı (Flex/Grid) olmalı. `ProductDetailClient` içindeki kontrol grupları (Size, Orientation, Scene) mantıksal bloklara bölünmelidir.

---

## 🛠️ Teknik Mimari

### Bileşen Yapısı
- **`src/app/urunler/[slug]/page.tsx`**: Dinamik ürün sayfası. Veriyi sunucu tarafında (`Server Component`) çeker ve etkileşim için `ProductDetailClient`'ı çağırır.
- **`ProductDetailClient`**: Görsel konfigüratörün ve satın alma butonlarının bulunduğu ana etkileşim merkezidir.

### Veri Akışı
1. **Public/Asset:** Ham görseller.
2. **Script:** Görsellerden metadata üretimi.
3. **Lib/Products:** Statik veri kaynağı.
4. **Supabase:** Dinamik yönetim ve sipariş kaydı.

---

## 🎯 Bir Sonraki Adım İçin İpucu
`ProductDetailClient.tsx` dosyasını şu şekilde modüllere ayırarak başlayabilirsin:
- `ProductPreview.tsx` (Mockup alanı)
- `ProductConfig.tsx` (Boyut, Yön, Sahne seçimi)
- `ProductInfo.tsx` (Fiyat, Açıklama, Sepet)

Bu sayede kod daha okunabilir olur ve UI çakışmalarını çözmek kolaylaşır.
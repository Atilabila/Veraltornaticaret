# Gelecek Geliştirme: MetalPoster Pro Yol Haritası

Mevcut prototipi üretim seviyesinde, yüksek dönüşümlü bir satış makinesine dönüştürmek için bu adımları izleyin.

## 🔜 Acil Atılacak Adımlar

### 1. Ödeme Entegrasyonu (Iyzico)
- [ ] **API Kurulumu**: Iyzico Sandbox API anahtarlarını temin edin.
- [ ] **Uygulama**: `CheckoutFlow.tsx` içindeki sahte ödeme adımını gerçek Iyzico Checkout Form entegrasyonu ile değiştirin.
- [ ] **Webhooklar**: Ödeme durumu güncellemelerini almak ve sipariş onayını tetiklemek için `/api/webhooks/iyzico` rotasını oluşturun.

### 2. Veri Tabanı ve Kalıcılık
- [ ] **Veri Tabanı Bağlantısı**: Aşağıdakileri saklamak için bir DB (Supabase veya Prisma ile PostgreSQL) kurun:
  - Ürün Kataloğu (Fiyatlar, Stok).
  - Siparişler (Kargo detayları, ödeme durumu).
  - Müşteri Yorumları.
- [ ] **Admin API**: Admin panelinin gerçek zamanlı verileri çekebilmesi ve stok güncelleyebilmesi için API rotalarını yazın.

### 3. Medya Optimizasyonu
- [ ] **Statik Varlıklar**: `/public` klasöründeki AI üretimi görselleri, gerçek ürün fotoğraflarıyla değiştirin.
- [ ] **Dinamik Boyutlandırma**: Mobil 4G hızında <1sn yüklenme süresi için `next/image` özelliklerini (`sizes`, `priority`) optimize edin.

### 4. Admin Paneli Tamamlama
- [ ] **Ürün Yönetimi**: Fiyat düzenleme ve yeni tasarım yükleme özelliklerini içeren "Ürünler" sekmesini aktif edin.
- [ ] **Yorum Doğrulama**: Müşteri yorumlarını onaylama veya silme mantığını ekleyin.

## 🚀 Pazarlama ve Dönüşüm Özellikleri

### 5. FOMO ve Sosyal Kanıt
- [ ] **Dinamik Sayaç**: Gerçek DB verisine dayalı "Son 5 ürün kaldı!" sayacı ekleyin.
- [ ] **Canlı Satış Bildirimleri**: Sayfanın köşesinde küçük bildirimler: "[Şehir]'den bir kullanıcı Vintage Vespa satın aldı!"
- [ ] **Müşteri Galerisi**: Onaylı müşteri fotoğraflarını gösteren bir widget ekleyin.

### 6. Gelişmiş Etkileşim
- [ ] **Detaylı Zoom**: Metal dokusunu yakından göstermek için yüksek çözünürlüklü büyüteç özelliği ekleyin.
- [ ] **Özel Yükleme**: Kullanıcıların kendi fotoğraflarını metal üzerine bastırabileceği bir yükleme alanı ekleyin.

## 🏁 Yayına Alma (Deployment)
- [ ] **Vercel Entegrasyonu**: Repoyu Vercel'e bağlayın.
- [ ] **Alan Adı Kurulumu**: Üretim domainini ve SSL sertifikasını yapılandırın.
- [ ] **Çevre Değişkenleri**: API anahtarlarını ve DB kimlik bilgilerini güvenli bir şekilde saklayın.
  
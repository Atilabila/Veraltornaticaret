# 🏭 METAL POSTER PRO: CEREBRAL PROJECT TRANSFER PROTOCOL (V5.3-MAX)
**PROJECT HANDOVER REPORT FOR AI ORCHESTRATION & CODEX CLI EXECUTION**

---

## 📑 1. EXECUTIVE SUMMARY & ARCHITECTURAL VISION
**Metal Poster Pro**, klasik bir e-ticaret sitesinin ötesinde, endüstriyel üretimin ham estetiğini modern yazılım mühendisliğiyle birleştiren "high-octane" bir B2C platformudur. Marka kimliği **"Cyber-Industrial Brutalism"** üzerine kuruludur. Bu, tasarımın keskin hatlara, yüksek kontrasta, mekanik mikro-etkileşimlere ve bilgi odaklı (Information-First) bir yapıya sahip olması demektir.

Bu protokol, projenin mevcut durumunu, teknik DNA'sını ve gelecek roadmap'ini en ince ayrıntısına kadar dokümante eder. Hedef, bu veriyi alan bir "Decision-Maker AI"ın, hangi skilleri (SEO, Security, WebApp, Frontend-Design vb.) tetikleyeceğine karar vermesini ve **Codex CLI 5.3 Max**'in bu hedefleri sıfır hatayla uygulamasını sağlamaktır.

### 🎯 Çekirdek Misyon
- **Görünürlük:** SEO ve GEO (AI Search) ile pazar liderliği.
- **Dönüşüm:** WhatsApp tabanlı manuel sistemden, tam otomatik Iyzico ödeme gateway sistemine geçiş.
- **Deneyim:** Kullanıcıyı şaşırtacak premium mikro-etkileşimler (Framer Motion).
- **Performans:** Next.js 15 ve Tailwind 4 ile milisaniye bazında yanıt süreleri.

---

## 🛠️ 2. TECHNICAL STACK & ENGINE SPECS (THE INFRASTRUCTURE)
Projenin kalbi, 2025-2026 standartlarında en optimize teknolojilerle döşenmiştir.

| Layer | Technology | Specification |
|-------|------------|---------------|
| **Core Framework** | Next.js 15.1+ | App Router, Server Components, Streaming SSR. |
| **Styling Engine** | Tailwind CSS 4.0 | Utility-first, zero-runtime, modern grid system. |
| **Database & Auth** | Supabase (PostgreSQL) | Real-time listeners, Row Level Security (RLS). |
| **State Management** | Zustand | Cart, Filter ve Configurator için lightweight store. |
| **Motion Physics** | Framer Motion | Brutalist animations, spring transitions. |
| **Payment Gateway** | Iyzico | 3D Secure, automated order-to-DB sync. |
| **AI Content** | Gemini 2.0 + Fal.ai | Automated trend analysis & image generation. |

---

## 🏛️ 3. DESIGN SYSTEM: CYBER-INDUSTRIAL BRUTALISM
Tasarım kuralları esnetilemez (Immutable Design Rules). Her yeni komponent bu kurallara uymalıdır.

### 🎨 3.1 Renk Paleti (Hardware Codes)
- **Paper White (#FFFFFF):** Temel arka plan.
- **Near Black (#1A1A1A):** Ana metin ve endüstriyel kontürler.
- **Safety Orange (#FF6B00):** Kritik aksiyonlar (CTA), uyarılar, aktif durumlar.
- **Terminal Green (#00FF41):** Stok durumu, başarı mesajları, veri akışları.
- **Hazard Yellow (#FFA500):** İkincil vurgular, premium etiketler.

### 📐 3.2 Tipografi & Grid
- **Font A (Headings):** *Space Grotesk* (Bold/Black, All-Caps).
- **Font B (Data/UI):** *IBM Plex Mono* (Fiyatlar, Spesifikasyonlar, ID'ler).
- **Grid Strategy:** 12 sütunlu brutalist grid. Tüm elemanlar `border-2 border-black` ile çevrelenmiş kutular içindedir.
- **Shadows:** Yumuşak gölge yasaktır. Sadece sert ofset gölgeler (`shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`).

---

## 🛰️ 4. STRATEGIC SEO & GEO (AI ENGINE OPTIMIZATION)
Bu proje, sadece Google için değil, Perplexity, Claude ve ChatGPT gibi "Generative Engine"ler için de optimize edilmiştir.

### 🔍 4.1 Knowledge Base & JSON-LD
- **LocalBusinessSchema:** İzmir/Alsancak yerel işletme verisi merkezli.
- **KnowledgeBaseSchema:** Ürünlerin teknik özellikleri (metalin kalınlığı, boya kalitesi, montaj tipi) AI ajanlarının okuyabileceği yapılandırılmış (Structured Data) formatta sunulur.
- **Keyword Focus:** `Dosya Teli`, `Takvim Tenekesi`, `Metal Poster İzmir`, `UV Baskı Metal`, `Endüstriyel Etiket`.

### 📍 4.2 GEO Markers
- Proje, "İzmir Metal Baskı" ve "Türkiye Metal Poster Üretimi" dikeyinde otorite olmak üzere konumlandırılmıştır.
- Tüm `DynamicMetadata.tsx` dosyaları coğrafi konum (LTD/LNG) verilerini metatag olarak taşır.

---

## 💳 5. FUNCTIONAL MODULES (SYSTEM LOGIC)

### 🧺 5.1 Shopping Cart & Checkout Flow
- **Zustand Store (`useCartStore`):** LocalStorage senkronizasyonlu, hidrasyon sonrası çalışan yüksek performanslı sepet.
- **Checkout Protocol:**
  1. `Sepet`: Ürün miktarı ve varyasyon (boyut/oryantasyon) kontrolü.
  2. `Adres`: Dinamik il/ilçe seçimi, vergi dairesi (kurumsal) mantığı.
  3. `Ödeme`: Iyzico Checkout Form entegrasyonu (Safe & Secure).
  4. `Sipariş`: Başarılı ödeme sonrası Supabase `orders` tablosuna kayıt ve e-posta onayı.

### 🖼️ 5.2 The Mockup Engine (Dynamic Configurator)
- Ürünün duvardaki görüntüsünü simüle eden motor.
- **Özellikler:** Sayfa yenilenmeden Boyut (XS-XL), Oryantasyon (Yatay/Dikey) ve Arka Plan (Office/Garage) değişimi.
- **Framer Motion:** Posterin duvarda "magnetic drag" ile hareket ettirilmesi ve perspektif korunumu.

---

## 📂 6. DIRECTORY MAP & FILE ROLES (FOR CODEX CLI)
Codex CLI 5.3 Max için kritik dosya yolları:

- `src/app/layout.tsx`: Global provider'lar ve ana SEO head elementleri.
- `src/app/page.tsx`: Landing page orchestration.
- `src/components/layout/Navigation.tsx`: Premium header ve mobil menü (Framer Motion).
- `src/components/sections/Hero.tsx`: Ana dönüşüm alanı (Animations & CTAs).
- `src/components/seo/KnowledgeBaseSchema.tsx`: AI ajanları için veri besleme noktası.
- `src/lib/payment/`: Iyzico ve diğer ödeme provider'larının business logic katmanı.
- `src/store/`: Zustand state tanımları.
- `STRATEGIC_PLAN.md`: Mevcut fazların takip çizelgesi.
- `ULTIMATE_PROJECT_BIBLE.md`: Tasarım ve tasarım dışı tüm kuralların anayasası.

---

## 🚀 7. CURRENT STATUS & HANDOVER TASKS (PHASE 1-2 COMPLETED)
Şu ana kadar tamamlanan ve devredilen işler:

1. **Görünürlük Altyapısı (GEO):** `KnowledgeBaseSchema` eklendi, SEO meta verileri İzmir/Alsancak odaklı güncellendi.
2. **UI Mikro-Etkileşimler:**
   - Navigasyon menüsü Framer Motion ile mekanik bir yapıya kavuştu.
   - Hero butonu ve teknik spesifikasyon kutuları "Brutalist" animasyonlarla zenginleştirildi.
   - Logo ve CTA alanlarına "Scale & Tap" efektleri uygulandı.
3. **Teknik Temizlik:** `globals.css` optimize edildi, gereksiz animasyon kütüphaneleri (GSAP vb.) elendi, saf Framer Motion + Tailwind 4 mimarisine geçildi.

---

## 🔮 8. NEXT STEPS: THE REMAINING ROADMAP
Bundan sonraki AI ajanının odaklanması gereken alanlar:

### ⚡ FAZ 3: Ödeme & Sipariş Otomasyonu
- [ ] `PAYMENT_SETUP.md` rehberliğinde Iyzico API bağlantılarının gerçek ortamda (Production) test edilmesi.
- [ ] Sipariş sonrası otomatik e-fatura taslağı oluşturma mantığının kurulması.
- [ ] Stok takibi entegrasyonunun (Supabase Function) aktif edilmesi.

### 🧪 FAZ 4: Denetim & Optimizasyon
- [ ] `lighthouse_audit.py` ile mobil performans skorunun 95+ seviyesine çekilmesi.
- [ ] `security_scan.py` ile ödeme sayfasının sızma testinden geçirilmesi.
- [ ] `seo_checker.py` ile anahtar kelime yoğunluğunun GEO standartlarına göre optimize edilmesi.

---

## 🧠 9. AI AGENT SPECIAL DIRECTIVES (PROMPT TRIGGERS)
Bir sonraki AI ajanı için master komut:

> "Sana devredilen **Metal Poster Pro** projesinde, `SESSION_HANDOVER_PROTOCOL.md` dosyasını temel alarak ilerle. Tasarım kuralları için `ULTIMATE_PROJECT_BIBLE.md`'den şaşma. Birinci önceliğin **Faz 3 (Ödeme Sistemleri)** entegrasyonunu tamamlamak ve kullanıcı deneyimini **Cyber-Industrial Brutalism** estetiğiyle en üst seviyeye çıkarmaktır. Codex CLI 5.3 Max komutlarını kullanarak dosya bazlı (sequential) güncellemeler yap."

---

## 🛠️ 10. CODEX CLI 5.3 MAX EXECUTION SCRIPT (SAMPLE)
Gelecekteki operasyonlar için örnek komut dizisi:

```powershell
# 1. Proje Durumunu Kontrol Et
python .agent/scripts/checklist.py .

# 2. Ödeme Altyapısını Doğrula
view_file src/lib/payment/index.ts
view_file src/lib/payment/providers/iyzico.ts

# 3. UI/UX Denetimi Yap
python .agent/skills/frontend-design/scripts/ux_audit.py

# 4. SEO & GEO Skorlarını Güncelle
python .agent/skills/seo-fundamentals/scripts/seo_checker.py
```

---

## 🏁 FINAL NOTE: THE "RAZOR SHARP" (JİLET) STANDARD
Bu proje, her satır kodunda mükemmeliyeti hedefler. Hata kabul etmez. Her eleman bir CNC makinesi hassasiyetiyle yerleştirilmiştir. Devralan ajanın bu hassasiyeti koruması zorunludur.

**PROTOCOL COMPLETED. READY FOR THE NEXT AGENT.**

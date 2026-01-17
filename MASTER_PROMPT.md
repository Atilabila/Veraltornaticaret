# METALPOSTER PRO: KAPSAMLI UYGULAMA VE GELİŞTİRME REHBERİ (MASTER PROMPT)

Bu belge, "MetalPoster Pro" projesini hayalden gerçeğe dönüştürmek için hazırlanmış, 2000 kelimeyi aşkın teknik derinliğe sahip, her bir pikselin ve kod satırının mantığını açıklayan nihai talimatlar setidir. Bir kod asistanına veya bir geliştirici ekibine bu projeyi sıfırdan en üst kalitede inşa etmeleri için verilecek ana rehberdir.

---

## 1. MİSYON VE MARKA KİMLİĞİ: "SANATIN METALİK GELECEĞİ"

### 1.1 Temel Vizyon
MetalPoster Pro, sıradan bir e-ticaret sitesi değildir; teknoloji ile sanatın kesiştiği noktada duran dijital bir galeridir. Ürünümüz olan "Premium Alüminyum Baskılı Metal Posterler", kağıdın geçiciliğine ve kanvasın sıradanlığına bir başkaldırıdır. Bu nedenle web sitesinin kendisi de ürünün vaat ettiği dayanıklılığı, hassasiyeti ve ileri teknolojiyi yansıtmalıdır.

### 1.2 Marka Değerleri
- **Dayanıklılık (Industrial Durability):** Her şey sağlam, keskin ve ömür boyu kalıcı hissettirmelidir.
- **Metalik Hassasiyet (Metallic Precision):** Tasarımda kullanılan hatlar, lazer kesim kadar keskin olmalıdır.
- **Yüksek Teknoloji Zanaatkarlığı (Hi-Tech Craftsmanship):** Geleneksel sanatın dijital ve endüstriyel yöntemlerle modernize edilmesi.

### 1.3 Renk Paleti ve Dokular
- **Derin Uzay Laciverti (#0a192f):** Ana boşluk rengi. Kullanıcının dikkati dağılmamalı, posterler bu derin karanlık içinde parlamalıdır.
- **Soğuk Gri (#94a3b8):** Yardımcı vurgular ve metinler için.
- **Metalik Gümüş ve Barut Grisi:** Gradyanlar, kart kenarları ve buton yansımaları için.
- **Doku:** Fırçalanmış metal dokusu (brushed metal) ve buzlu cam (glassmorphism) her panelde hissedilmelidir.

---

## 2. MİMARİ TASARIM SİSTEMİ (UI/UX)

### 2.1 Tipografi Stratejisi
Sitede **Archivo** veya **Syne** gibi geometrik, teknolojik ve güçlü duruşu olan fontlar kullanılmalıdır.
- **Sıvı Tipografi (Fluid Typography):** Başlıklar sadece büyük değil, aynı zamanda karakter arası mesafesi daraltılmış (tracking-tighter) olmalıdır.
- **Metalik Metinler:** Kritik başlıklar `text-transparent bg-clip-text` özelliğiyle gümüş-beyaz metalik gradyanlara sahip olmalı, ışık posterin üzerinden geçerken metinler de parlamalıdır.

### 2.2 Mikro-Etkileşimler ve Fizik Kuralları
- **Anizotropik Parlama (Anisotropic Highlight):** Her ürün görseli dinamik bir ışık katmanına sahip olmalıdır. Framer Motion kullanarak, farenin (veya mobil cihazlarda jiroskopun) konumunu takip eden ve poster üzerinde hareket eden "beyazdan şeffafa" lineer bir gradyan uygulanmalıdır. Bu, fırçalanmış alüminyumun üzerine vuran gerçek ışığı taklit eder.
- **Manyetik Butonlar (Magnetic Buttons):** Ana çağrı butonları (CTA), imleç 50px yakınına geldiğinde imleci kendine doğru çeken bir "manyetik" etkiye sahip olmalıdır. Bu, kullanıcıya arayüzün "canlı" olduğu hissini verir.
- **İvme ve Yay (Spring Physics):** Hiçbir animasyon lineer olmamalıdır. `stiffness: 100, damping: 20` gibi değerlerle, fizik kurallarına uygun yaylı (spring) geçişler kullanılmalıdır.

---

## 3. BİLEŞEN SPESİFİKASYONLARI (DERİNLEMESİNE)

### 3.1 Hibrit Hero Bölümü: Gerçeklik ve Sanatın Buluşması
Hero bölümü kullanıcının nefesini kesmelidir.
- **Görsel Yapı:** Bölünmüş ekran (split-view) yaklaşımı. Bir tarafta, 3D uzayda yüzen (floating) ve ağır bir "tilt-shift" efekti olan metal bir poster. Diğer tarafta, aynı posterin minimalist, modern bir ofis duvarındaki sinematik mockup görüntüsü.
- **Senaryo:** Kullanıcı sayfayı aşağı kaydırdıkça, yüzen poster havada süzülerek ofis mockup'ındaki yerini almalı ve oraya "mıknatıslanarak" yerleşmelidir. Bu geçiş, Framer Motion'ın `layoutId` özelliğiyle pürüzsüzce sağlanmalıdır.

### 3.2 Makro-Doku Vitrini (Scroll-Driven Showcase)
"Dayanıklılık İçin Mühendislik Edildi" başlıklı bir bölüm.
- **Etkileşim:** Kullanıcı aşağı kaydırdıkça (scrollYProgress), ekranın ortasında posterin kenarına devasa bir zoom yapılır.
- **Detay:** 1.5mm'lik alüminyumun kesit kalınlığı, lazer kesim pürüzsüzlüğü ve UV mürekkebin metal üzerindeki dokusu makro çekimlerle gösterilmelidir. Kaydırma hızına bağlı olarak zoom seviyesi artmalı, kullanıcı sanki mikroskopla ürüne bakıyormuş gibi hissetmelidir.

### 3.3 Çok Adımlı Ürün Yapılandırıcı (Decision Engine)
Kullanıcının karar verme sürecini basitleştirmek ve oyunlaştırmak gerekir.
- **Adım 1 (Boyut):** S (20x30), M (30x45), L (40x60), XL (60x90). Seçim yapıldığında fiyat, mekanik bir sayaç gibi dönerek güncellenmelidir.
- **Adım 2 (Önizleme):** "Duvar Görünümü" (Oda içinde mockup) ve "Ürün Görünümü" (3D nesne) arasında geçiş. 3D modunda poster fare ile döndürülebilmelidir.
- **Adım 3 (Ödeme):** Ekranı kaplamayan, odaklanmış bir ödeme katmanı.

### 3.4 Mobil Öncelikli Optimizasyon
- **Yapışkan Ödeme Motoru (Sticky Buy Engine):** Mobil ekranların altında sabit, buzlu cam (backdrop-blur) efektli bir satın alma çubuğu.
- **Dokunmatik Hareketler:** Ürün galerilerinde kaydırma (swipe) ve metal dokusunu incelemek için "uzun bas ve yakınlaştır" (long-press to zoom) özellikleri.

---

## 4. TEKNİK YIĞIN VE BACKEND STRATEJİSİ

### 4.1 Frontend Altyapısı
- **Next.js 14+ (App Router):** SSR (Server-Side Rendering) ile hızlı ilk yükleme ve SEO avantajı.
- **TypeScript (Strict Mode):** Tip güvenliği ile hatasız bir ödeme akışı.
- **Tailwind CSS 4.0:** Performanslı stil yönetimi.
- **Framer Motion:** Karmaşık animasyon dizileri ve fizik tabanlı etkileşimler için.

### 4.2 Durum Yönetimi (State Management)
- **Zustand:** Sepet verileri, yapılandırma tercihleri (boyut, tasarım) ve kullanıcı bilgilerini global olarak yönetmek için. LocalStorage entegrasyonu ile sayfa yenilense bile sepet korunmalıdır.

### 4.3 Admin Paneli ve Operasyon
- **Yol:** `/admin` rotası, yetkisiz erişime kapalı (Auth).
- **Özellikler:**
  - **Gerçek Zamanlı Sipariş Takibi:** Yeni bir sipariş geldiğinde bildirim.
  - **Stok Yönetimi:** Belirli boyutları veya modelleri tek tıkla "Stokta Yok" yapma.
  - **Yorum Onay Sistemi:** Sosyal kanıt oluşturmak için gelen kullanıcı yorumlarını filtreleme ve onaylama.

---

## 5. "METAL" HİSSİ (CSS VE GÖRSEL MÜHENDİSLİK)

### 5.1 Glass-morphism ve Paneller
Tüm UI panelleri şu sınıfa sahip olmalıdır: `bg-slate-900/40 backdrop-blur-xl border border-white/10`. Bu, arayüzün posterin üzerinde yüzen teknolojik bir katman gibi görünmesini sağlar.

### 5.2 Metalik Kenarlık (Metallic Border)
Ürün kartlarının etrafında, kartın çevresini yavaşça dönen bir "konik gradyan" (conic gradient) olmalıdır. Bu efekt, metalin keskin kenarlarından seken bir ışık hüzmesini simüle eder.

### 5.3 Iyzico ve Ödeme Güvenliği
- **State Machine Pattern:** Ödeme akışı bir "Durum Makinesi" (State Machine) olarak kurgulanmalıdır (IDLE -> PENDING -> SUCCESS -> ERROR). 
- **IBAN Kopyalama:** Havale/EFT seçeneğinde IBAN numarasına tıklandığında kullanıcıya şık bir "Kopyalandı" mikro-animasyonu gösterilmelidir.

---

## 6. UYGULAMA SIRALAMASI VE TALİMATLAR

### Adım 1: Temel Düzen (Layout & Global Styles)
Öncelikle `Layout.tsx` ve metalik tasarım sistemini (CSS değişkenleri, animasyon anahtar kareleri) içeren `Global.css` oluşturulmalıdır.

### Adım 2: Etkileşimli Hero (Hero & 3D Logic)
Daha sonra, 3D tilt mantığı ve scroll-linked (kaydırmaya bağlı) animasyonları içeren `Hero.tsx` inşa edilmelidir.

### Adım 3: Ödeme Makinesi (Checkout Machine)
Son olarak, çok adımlı mantığı, form doğrulamalarını ve Iyzico entegrasyonunu yöneten `CheckoutMachine.tsx` hayata geçirilmelidir.

---

## 7. SON SÖZ VE ESTETİK ODAK
Metalin ruhuna odaklanın. Her bir piksel soğuk, keskin ve premium hissettirmelidir. Kullanıcı sayfada gezerken sadece bir web sitesinde değil, bir mühendislik harikasının içinde geziniyormuş gibi hissetmelidir. Siyahın derinliği ile gümüşün parıltısı arasındaki kontrast, MetalPoster Pro'nun başarısının anahtarıdır.

---

## [GENİŞLETİLMİŞ TEKNİK BİLGİ VE SENARYOLAR]

### 7.1 "Engineered to Last" Bölümü Detayları
Bu bölümde kullanılacak görsel varlıklar, posterin katman katman (layer-by-layer) nasıl oluşturulduğunu göstermelidir.
1. **Katman: Ham Alüminyum:** Pürüzlü, endüstriyel levha.
2. **Katman: Astar Boya:** Mürekkebin tutunması için özel solüsyon.
3. **Katman: UV Mürekkep:** Nokta nokta (dotted) baskı kalitesini gösteren mikroskobik detaylar.
4. **Katman: Koruyucu Vernik:** Parlaklığı ve çizilme direncini sağlayan son katman.
Bu katmanlar scroll sırasında üst üste binerek final ürünü oluşturmalıdır.

### 7.2 Iyzico Entegrasyonu ve API Güvenliği
Ödeme adımı başladığında sistem:
- Sepet toplamını sunucu tarafında doğrular.
- Kullanıcıya özel bir ödeme oturumu açar.
- `iyzipay` kütüphanesini kullanarak güvenli ödeme formunu (Checkout Form) ekrana basar.
- Başarılı ödeme sonrası, veri tabanındaki sipariş durumunu "Paid" (Ödendi) yapar ve başarı sayfasına (Success Page) yönlendirir.

### 7.3 Dinamik Stok ve FOMO Stratejisi
Yapılandırıcıda boyut seçerken:
- Eğer stok 10'un altına inerse, fiyatın hemen yanında kırmızı parlayan bir metinle "Sadece [Stok Sayısı] adet kaldı!" uyarısı belirmelidir.
- Bu veriler Next.js API Routes üzerinden gerçek zamanlı olarak admin panelindeki stok sayısından çekilmelidir.

### 7.4 Admin Paneli - Gelişmiş İstatistikler
Admin paneli sadece liste göstermemeli, aynı zamanda:
- Haftalık satış grafiği (Recharts veya Chart.js ile).
- En çok satılan poster modelleri ve boyut dağılımı.
- Ortalama sepet tutarı ve müşteri dönüşüm hunisi (Conversion Funnel).
Bu veriler, iş sahibinin operasyonu büyütmesi için gereken içgörüleri sağlamalıdır.

---

[Bu plan, projenin her aşamasında rehberlik edecek, hata payını sıfıra indirecek ve vizyonu gerçeğe dönüştürecek şekilde yapılandırılmıştır. MetalPoster Pro, bu rehber sayesinde yaşayan, nefes alan ve satan bir sanat eseri haline gelecektir.]

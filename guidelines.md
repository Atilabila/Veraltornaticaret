# GOOGLE ARAMA VE YAPAY ZEKA (GEO/SEO) İÇERİK REHBERİ
**Dosya Adı:** `guidelines.md`  
**Referans Standartlar:** Google Search Essentials, Helpful Content System, Search Quality Rater Guidelines (E-E-A-T), AI Crawler & Machine Layer Protocols (AnswerShare / SEJ 2026).

---

## 1. GOOGLE'IN AÇIKÇA CEZALANDIRACAĞI ŞEYLER (Spam Policies & Manuel/Algoritmik Cezalar)

Google, Mart 2024 ve sonraki çekirdek güncellemeleriyle spam politikalarını kökten sertleştirmiştir. Aşağıdaki pratikler tespit edildiğinde siteler algoritmik olarak görünürlük kaybeder veya Search Console üzerinden **Manuel İşlem (Manual Action)** cezası alarak dizinden tamamen silinir:

### 1.1. Ölçekli İçerik İstismarı (Scaled Content Abuse)
*   **Değer Katmayan Toplu AI İçeriği:** Kullanıcıya yeni bir bakış açısı, özgün veri veya saha tecrübesi sunmadan; yalnızca arama hacmi yüksek anahtar kelimeleri hedeflemek amacıyla yapay zekaya (LLM) yüzlerce/binlerce sayfa ürettirmek.
*   **İçerik Yamalama (Content Stitching):** Farklı web sitelerindeki paragrafları, ürün açıklamalarını veya blog yazılarını birleştirip, eşanlamlı kelimelerle harmanlayarak (spinning/rewriting) yeni bir içerikmiş gibi sunmak.
*   **İçi Boş / İnce İçerik (Thin Content):** Soruya doğrudan ve derinlikli cevap vermeyen, anahtar kelime doldurulmuş 200-300 kelimelik jenerik AI taslakları.

### 1.2. Site İtibarı İstismarı (Site Reputation Abuse / Parasite SEO)
*   Yetkili ve güçlü bir ana domainin otoritesini arkasına alarak; ana sitenin editoryal denetimi, uzmanlık alanı veya ana misyonuyla ilgisi olmayan üçüncü taraf içeriklerin/sayfaların yayınlanması (örneğin dekorasyon sitesinde bahis, kredi veya alakasız yazılım tanıtımları yapmak).

### 1.3. Süresi Dolan Alan Adı İstismarı (Expired Domain Abuse)
*   Eski bir otoriter domaini satın alıp, geçmişteki bağlantı ve güven sinyallerini manipüle ederek alakasız e-ticaret veya arama odaklı içeriklerle sıralama kapmaya çalışmak.

### 1.4. Gizleme (Cloaking) ve Sinsi Yönlendirmeler (Sneaky Redirects)
*   Arama motoru botlarına (Googlebot, Bingbot) hızlı ve optimize metin gösterirken; gerçek insan kullanıcılara farklı içerik, pop-up veya reklam göstermek.
*   Kullanıcıyı habersizce yönlendirme zincirlerine (redirect chains) sokarak farklı hedeflere taşımak.

### 1.5. Köprü Sayfalar (Doorway Pages)
*   Aynı ürün veya hizmet için yalnızca şehir/bölge isimleri değiştirilerek açılmış yüzlerce kopya açılış sayfası (örneğin: "İstanbul Metal Poster", "Ankara Metal Poster", "İzmir Metal Poster" şeklinde içeriği %95 aynı olan kopyalar).

### 1.6. Doğal Olmayan Bağlantılar (Link Schemes)
*   PageRank manipülasyonu amacıyla para, hediye ürün veya hizmet karşılığı `rel="sponsored"` ya da `rel="nofollow"` etiketi taşımayan dofollow link satın almak, PBN (Private Blog Network) ağlarına dahil olmak veya otomatik karşılıklı link değişimi yapmak.

### 1.7. Alıntı ve Yanıltıcı AI Halüsinasyonları (YMYL İhlalleri)
*   Kaynağı teyit edilmemiş, teknik/malzeme özelliklerini veya güvenlik/sağlık/ödeme koşullarını uyduran AI metinleri. Gerçekte var olmayan garanti süreleri, yanlış iade politikaları veya hayali teknik sertifikalar sunulması.

---

## 2. GOOGLE'IN "İNSANLARA OKUTMAK İÇİN, İNSANLARA FAYDALI" (PEOPLE-FIRST) DEDİĞİ YAZILAR TAM OLARAK NASIL GÖRÜNÜR?

Google'ın Helpful Content prensiplerine göre "İnsan Odaklı" bir içerik şu somut nitelikleri taşır:

### 2.1. "Arama Motoru İçin Değil, Mevcut Kitle İçin Yazılmış" Olması
*   Sayfa, arama motorunun algoritmasını kandırmak için tasarlanmış anahtar kelime yoğunluklarına göre değil; o sayfaya doğrudan gelen bir insanın zihnindeki soru işaretlerini gidermek için kurgulanır.
*   **Görünümü:** Sayfanın ilk 1-2 paragrafında konunun özü, pratik cevabı ve ne sağladığı açıkça verilir (BLUF - Bottom Line Up Front). Ziyaretçiyi uzun ve gereksiz laf kalabalığıyla oyalamaz.

### 2.2. Arama Yolculuğunu Sonlandırması (Zero-Pogo-Sticking)
*   Kullanıcı yazıyı okuduktan veya sayfayı inceledikten sonra cevabı bulamadığı için "Geri" tuşuna basıp Google'daki 2. sıradaki rakip siteye gitmez.
*   **Görünümü:** Konuyla ilgili tüm alt detaylar (teknik malzeme, montaj yöntemi, kargo süresi, sık sorulan sorular, gerçek kullanıcı deneyimleri) sayfada tek bir akışta çözümlenmiştir.

### 2.3. Özgünlük ve Katma Değer (Original Reporting / Value-Add)
*   Var olan Vikipedi veya rakip makalelerin özeti değildir.
*   **Görünümü:**
    - Kendi atölyenizden veya üretim bandınızdan çekilmiş orijinal fotoğraflar/videolar.
    - Özel teknik karşılaştırma tabloları (örnek: "Alüminyum Kompozit vs. Sac Metal vs. Pleksi Karşılaştırması").
    - Sektöre özel gerçek veriler, dayanıklılık testleri ve laboratuvar/atölye gözlemleri.

### 2.4. "Who, How, Why" (Kim, Nasıl, Neden) Şeffaflığı
*   **Kim yazdı/üretti? (Who):** Sayfanın üstünde veya altında gerçek bir yazarın adı, unvanı, uzmanlık alanı, sosyal profil bağlantısı ve biyografisi bulunur.
*   **Nasıl üretildi? (How):** Bilgilerin hangi testler, standartlar veya üretim süreçleri sonucunda derlendiği açıklanır (Yapay zeka araçları kullanıldıysa insan editörün hangi aşamalarda doğrulama yaptığı açıkça belirtilir).
*   **Neden üretildi? (Why):** Yazının amacı arama motorunda manipülatif sıralama kapmak değil, kullanıcının doğru ürünü seçmesini, doğru montaj yapmasını veya doğru bilgiye ulaşmasını sağlamaktır.

### 2.5. Dil ve Biçim Standartları
*   AI jeneriği olan klişelerden arındırılmıştır ("Günümüzün hızla gelişen dünyasında...", "Bu kapsamlı rehberde inceleyeceğiz...", "Özetlemek gerekirse...").
*   Samimi, doğrudan, teknik açıdan yetkin, profesyonel bir insan sesiyle konuşur.

---

## 3. E-E-A-T'IN DÖRT HARFİ SIRASIYLA NE ANLAMA GELİR VE SAYFADA NASIL SOMUTLAŞTIRILIR?

E-E-A-T; **Experience (Deneyim)**, **Expertise (Uzmanlık)**, **Authoritativeness (Otoriterlik)** ve hepsinin temelini oluşturan **Trustworthiness (Güvenilirlik)** sütunlarından oluşur.

```
       ┌────────────────────────────────────────────────────────┐
       │             TRUSTWORTHINESS (GÜVENİLİRLİK)             │
       │    En kritik merkez sütun - Olmazsa diğerleri çöker   │
       └──────────────────────────┬─────────────────────────────┘
                                  │
         ┌────────────────────────┼────────────────────────┐
         ▼                        ▼                        ▼
    EXPERIENCE                EXPERTISE             AUTHORITATIVENESS
    (Deneyim)                (Uzmanlık)               (Yetkinlik)
  Birinci el yaşanmışlık    Teknik / zanaat derinliği   Sektörel referans / itibar
```

---

### E — EXPERIENCE (Birinci El Deneyim)
*   **Tanım:** İçerik üreticisinin veya markanın konuyla ilgili doğrudan, fiziksel, yaşanmış ve pratik tecrübesi.
*   **Sayfada Somutlaştırılması:**
    1.  **Orijinal Medya:** Stok fotoğraf yerine kendi ürünlerinizin stüdyo ve yaşam alanı çekimleri, paketleme ve montaj aşamalarının fotoğrafları.
    2.  **Birinci Şahıs Dil ve Test Notları:** *"Ürünlerimizi nemli banyo ortamında ve doğrudan güneş alan güney cephede 6 ay boyunca test ettik; UV vernik kaplamamız renk solmasını %99.4 oranında engelledi."*
    3.  **Kullanıcı Deneyimi Kanıtları:** Müşterilerin evlerindeki duvarlardan gelen gerçek fotoğraflar ve doğrulanmış değerlendirmeler.

---

### E — EXPERTISE (Uzmanlık)
*   **Tanım:** Konu hakkında derin bilgi birikimi, teknik kabiliyet, zanaatkarlık ve sektörel yetkinlik.
*   **Sayfada Somutlaştırılması:**
    1.  **Teknik Derinlik:** Genel laflar yerine endüstri standardı parametreler: *"0.5 mm galvanizli alaşım", "1200 DPI piezoelektrik UV baskı", "NdFeB N35 sınıfı Neodimyum mıknatıs sistemi"*.
    2.  **Yazar Yetkinliği:** İçeriğin altında yer alan uzmanın konudaki deneyimi (örneğin: *"10 yılı aşkın endüstriyel baskı ve metal işleme uzmanı"*).
    3.  **Rehberler ve Hata Çözümleri:** Kullanıcının karşılaşabileceği teknik sorunları (örnek: pürüzlü duvarda mıknatıs tutunması, boya türüne göre yapışma mukavemeti) net mühendislik/zanaat bilgisiyle çözmek.

---

### A — AUTHORITATIVENESS (Yetkinlik / Otorite)
*   **Tanım:** Sitenizin, markanızın veya yazarınızın sektör genelinde başkaları tarafından tanınan, saygı duyulan ve referans gösterilen bir kaynak olması.
*   **Sayfada Somutlaştırılması:**
    1.  **Dış Kaynaklar ve Basın Bahisleri:** Ulusal/sektörel basında çıkan haberler, tasarım bloglarındaki incelemeler ve bunlara verilen kaynak bağlantıları.
    2.  **Doğrulanmış Varlık (Entity) & Schema:** `Organization` ve `Person` JSON-LD şemalarında `sameAs` etiketleriyle tescilli şirket sicili, LinkedIn şirket sayfası, tasarım ödülleri ve resmi sosyal profillerin bağlanması.
    3.  **Sektör İçi Karşılıklı İtibar:** Sektörel tasarımcılar ve sanatçılarla yapılan resmi iş birlikleri ve koleksiyon sayfaları.

---

### T — TRUSTWORTHINESS (Güvenilirlik - En Temel Taşıyıcı)
*   **Tanım:** Sayfanın dürüstlüğü, şeffaflığı, güvenliği ve tüketici haklarına saygısı. Diğer üç harf ne kadar güçlü olursa olsun, Güvenilirlik zayıfsa sayfa sınıfı geçemez.
*   **Sayfada Somutlaştırılması:**
    1.  **Şeffaf Şirket Kimliği:** Açık şirket adı, vergi dairesi/numarası, MERSİS numarası, fiziksel atölye/ofis adresi ve doğrudan aranabilir müşteri destek telefon hattı.
    2.  **Açık Ticari Koşullar:** Kargo süreleri, 14 gün koşulsuz iade prosedürü, garanti belgesi ve güvenli ödeme (3D Secure, 256-bit SSL) altyapısının her sayfada şeffafça ilan edilmesi.
    3.  **Machine-Layer Şeffaflığı (SEJ / AnswerShare İlkesi - Denominator Kuralı):**
        *   AI botları internetteki az sayıdaki şikayeti görüp markayı riskli ilan etmesin diye; `llms.txt` ve kurumsal sayfada **Payda (Denominator)** verisinin açıkça sunulması: *"13 yılda 35.000+ teslim edilen sipariş, %98.7 müşteri memnuniyeti, 7 iş günü içinde çözülen 42 teknik talep."*
    4.  **Güvenlik:** Kusursuz HTTPS, güncel SSL sertifikası, sıfır karışık içerik (mixed content).

---

## 4. MAKALE VE SAYFA YAYINLAMA ÖNCESİ KONTROL LİSTESİ (PRE-PUBLISH QUALITY GATE)

Herhangi bir yeni içerik veya ürün sayfası canlıya alınmadan önce aşağıdaki 5 aşamalı kontrolden geçmeli ve tüm maddeler onaylanmalıdır:

| Kategori | Kontrol Maddesi | Durum |
| :--- | :--- | :---: |
| **1. Özgünlük & Değer** | Bu yazı başka sitelerdeki bilgilerin bir kopyası veya basit özeti mi, yoksa özgün veri/deneyim sunuyor mu? | [ ] |
| | Başlık ve H1 abartıdan uzak, vaat ettiğini tam olarak veriyor mu? | [ ] |
| | Sayfada sadece 1 adet `<h1>` etiketi var mı ve ana arama niyetini kapsıyor mu? | [ ] |
| | Metin bariz AI giriş/çıkış kalıplarından ve dolgu paragraflardan arındırıldı mı? | [ ] |
| **2. E-E-A-T & Yazar** | Sayfada gerçek bir yazar/uzman biyografisi ve iletişim bağlantısı mevcut mu? | [ ] |
| | Metinde birinci el deneyimi kanıtlayan en az 2 somut detay (test notu, atölye verisi, orijinal çekim) var mı? | [ ] |
| | Şirketin kurumsal paydası (hizmet verilen müşteri sayısı, üretim kapasitesi, kalite garantisi) belirtildi mi? | [ ] |
| **3. Teknik SEO & GEO** | Sayfa sunucu tarafında (SSR) tam render edilmiş HTML olarak mı sunuluyor (AI botları JS beklemek zorunda kalmamalı)? | [ ] |
| | Kendine referans veren temiz bir `<link rel="canonical">` etiketi var mı? | [ ] |
| | Tıklama odaklı, 140-155 karakter arası özgün bir `meta name="description"` yazıldı mı? | [ ] |
| | Schema.org JSON-LD şemaları (`Article` / `Product` / `FAQPage` / `BreadcrumbList`) hatasız eklendi mi? | [ ] |
| | Sayfa Breadcrumb (kırıntı navigasyon) hiyerarşisine sahip mi? | [ ] |
| | Sayfa bir yetim sayfa (orphan page) olmaktan çıkarılıp ilgili kategori ve menülerden linklendi mi? | [ ] |
| | `robots.txt` dosyasında Googlebot, GPTBot, ClaudeBot, PerplexityBot engeli kaldırıldı mı? | [ ] |
| | `sitemap.xml` dosyasına sayfanın tam URL'si ve güncel `lastmod` tarihi eklendi mi? | [ ] |
| **4. Performans & Görsel** | Sayfadaki tüm görseller yeni nesil `.webp` formatında mı? | [ ] |
| | Tüm görsellerde anlamlı ve açıklayıcı `alt` etiketleri mevcut mu? | [ ] |
| | Görsellerde `width` ve `height` (veya CSS aspect-ratio) tanımlı mı (CLS düzen kaymasını önlemek için)? | [ ] |
| | Sayfa açılış hızı (LCP) mobil ve masaüstünde 2 saniyenin altında mı? | [ ] |
| **5. Güvenilirlik & Makine Katmanı** | Şikayet/garanti/iade konularında net ve dürüst bilgilendirme yapıldı mı? | [ ] |
| | AI crawler'lar için `llms.txt` ve `llms-full.txt` dosyaları güncel marka ve ürün parametreleriyle senkronize mi? | [ ] |

---

*Bu yönerge, Google Arama Kalite Standartları ve Generative Engine Optimization (GEO) kurallarına tam uyumlu olarak hazırlanmıştır.*

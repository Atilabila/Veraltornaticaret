# Metal Poster Pro - Teknik Devir Raporu
**Tarih:** 22 Ocak 2026  
**Proje:** Metal Poster E-Ticaret Sitesi  
**Mevcut Durum:** Ürün Detay Sayfası Görsel Önizleme Sistemi  

---

## 1. PROJE GENEL BAKIŞ

Metal Poster Pro, metal üzerine UV baskı metal poster satan bir e-ticaret sitesidir. Next.js 16, TypeScript, Tailwind CSS ve Zustand state management kullanılmaktadır.

**Temel Dosyalar:**
- `src/components/product/detail/ScenePreview.tsx` - Oda mockup önizleme bileşeni
- `src/components/product/detail/ConfigurationPanel.tsx` - Boyut/yapılandırma paneli
- `src/store/useConfiguratorStore.ts` - Global state (boyut, sahne, özel görsel vb.)

---

## 2. MEVCUT SORUNLAR

### 2.1 Gerçekçi Ölçekleme Sorunu (KRİTİK)

**Problem:** Poster boyutları mobilyalara göre gerçekçi oranlarda görünmüyor.

**Örnek Senaryo:**
- Koltuk genişliği: ~200 CM
- Seçilen poster: 60x90 CM (yatay modda 90cm genişlik)
- **Beklenen:** Poster, koltuğun %45'i kadar olmalı (90/200 = 0.45)
- **Gerçek:** Poster, koltuğun tamamını veya yarısından fazlasını kaplıyor

**Mevcut Hesaplama (Hatalı):**
```typescript
// ScenePreview.tsx - Satır ~50-70
const refWidthCm = 200; // Koltuk genişliği
const refWidthPercent = 50; // Koltuk ekranın %50'si
const posterWidthCm = portraitH; // Yatay modda (örn: 45x60 -> 60cm)
const calculatedWidth = (posterWidthCm / refWidthCm) * refWidthPercent;
```

**Sorunun Kökeni:**
1. `refWidthPercent = 50` yanlış - Koltuk ekranın %50'sini KAPLIYOR olabilir ama mockup görselindeki gerçek oran farklı
2. Her sahne için farklı referans değerleri gerekiyor ama sabit değerler kullanılıyor
3. Poster genişliği doğru hesaplansa bile, CSS `width` özelliği ile uygulama yanlış

### 2.2 Görsel Kırpma/Cropping Sorunu

**Problem:** Ürün görseli poster çerçevesine tam oturmuyor. Sol tarafta siyah şerit görünüyor.

**Mevcut Kod:**
```typescript
// ScenePreview.tsx - Satır ~190-210
<div style={{ aspectRatio: aspectRatio }}> // aspectRatio = "1.5 / 1" gibi
    {/* BLURRED BACKGROUND FILL */}
    <Image className="object-cover blur-[25px] opacity-40 scale-125" />
    
    {/* ACTUAL IMAGE */}
    <Image 
        style={{ objectFit: imageFit, transform: `scale(${imageScale})` }}
    />
</div>
```

**Sorunun Kökeni:**
1. `aspectRatio` hesaplaması: `${1 / size.ratio} / 1` - Bu formül portrait boyutları için düşünülmüş
2. SIZES verisinde `ratio` değerleri tutarsız:
   - `xs`: ratio = 0.5 (20x10 = 2:1)
   - `m`: ratio = 0.67 (45x30 = 1.5:1)
   - `l`: ratio = 0.75 (60x45 = 1.33:1)
   - `xl`: ratio = 0.67 (90x60 = 1.5:1)
3. Kaynak görsel aspect ratio'su ile poster aspect ratio'su uyuşmuyor

### 2.3 Yön (Orientation) Kaldırma Talebi

**Kullanıcı Talebi:** Dikey/Yatay seçeneği kaldırılsın, sadece YATAY mod olsun.

**Mevcut Durum:** 
- ORIENTATIONS array'i store'da hala var ama ConfigurationPanel'de kullanılmıyor
- Tüm hesaplamalar "landscape" varsayımıyla yapılıyor
- Ancak SIZES verisindeki boyutlar hala portrait formatında (20x10 = 20 yükseklik, 10 genişlik şeklinde yorumlanıyor)

---

## 3. ÇALIŞAN REFERANS SİSTEM

**URL:** https://veraltornaticaret.vercel.app/koleksiyon/ARABA_PLAKA/formula-1-grand-prix-teknik-sema

**Bu sistemdeki özellikler:**
1. Görsel çerçeveye TAM oturuyor (kırpma yok)
2. Ölçü değiştiğinde poster gerçekçi boyutta büyüyüp küçülüyor
3. Mobilya referansları hover'da görünüyor (SOFA ~200 CM)
4. 3D perspektif ve sürükle-bırak çalışıyor
5. Blur-fill tekniği ile boşluklar dolduruluyor

**Referans Kodun Yeri:**
`C:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro - Kopya\src\components\product\ProductDetailClient.tsx`

**Referans Kod Aspecti:**
```typescript
// ProductDetailClient.tsx - Satır ~320
aspectRatio: orientation === 'portrait' 
    ? `1 / ${1 / selectedSize.ratio}` 
    : `${1 / selectedSize.ratio} / 1`
```

---

## 4. ÖNERİLEN ÇÖZÜM YAKLAŞIMI

### 4.1 Ölçekleme İçin

1. **Her sahne için pixel-bazlı referans ölçümü yapın:**
   - Mockup görselini açın (örn: boho.png)
   - Koltuğun pixel genişliğini ölçün (örn: 800px)
   - Görselin toplam genişliğini alın (örn: 1200px)
   - Koltuk oranı = 800/1200 = %66.7

2. **Gerçek dünya ölçüsü ile eşleştirin:**
   - Koltuk ~200cm
   - 1 cm = (66.7% / 200) = %0.33 ekran genişliği
   - 60cm poster = 60 * 0.33 = %20 ekran genişliği

3. **Her SCENES elemanına bu değerleri ekleyin:**
```typescript
{
    id: 'boho',
    name: 'YAŞAM ALANI',
    image: '/mockups/boho.png',
    // Pixel ölçümlerinden hesaplanmış değerler:
    cmToPercent: 0.33, // 1 cm = %0.33 ekran genişliği
}
```

### 4.2 Görsel Kırpma İçin

1. **Sabit aspect ratio yerine kaynak görselin aspect ratio'sunu kullanın:**
```typescript
const [imgWidth, setImgWidth] = useState(0);
const [imgHeight, setImgHeight] = useState(0);

useEffect(() => {
    const img = new Image();
    img.onload = () => {
        setImgWidth(img.naturalWidth);
        setImgHeight(img.naturalHeight);
    };
    img.src = productImages[activeImageIndex];
}, [activeImageIndex]);

const imageAspect = imgWidth / imgHeight;
```

2. **Poster çerçevesini görsele göre ayarlayın:**
```typescript
// Eğer kaynak görsel landscape ise, poster da landscape olsun
// Aspect ratio'yu görselden al, boyutu seçilen ölçüden al
```

3. **object-contain kullanın, object-cover değil:**
```typescript
<Image className="object-contain" />
```

### 4.3 Yatay Mod Sadeleştirmesi

1. SIZES verisini yatay olarak düzeltin:
```typescript
export const SIZES = [
    { id: "xs", name: "10x20 CM", widthCm: 20, heightCm: 10, priceAdd: -100 },
    { id: "m", name: "30x45 CM", widthCm: 45, heightCm: 30, priceAdd: 200 },
    { id: "l", name: "45x60 CM", widthCm: 60, heightCm: 45, priceAdd: 500 },
    { id: "xl", name: "60x90 CM", widthCm: 90, heightCm: 60, priceAdd: 1000 },
];
```

2. Aspect ratio'yu widthCm/heightCm'den hesaplayın:
```typescript
const aspectRatio = size.widthCm / size.heightCm; // örn: 90/60 = 1.5
```

---

## 5. DOSYA YAPISI

```
src/
├── components/
│   └── product/
│       └── detail/
│           ├── ScenePreview.tsx      # Ana mockup önizleme (DÜZELTME GEREKLİ)
│           └── ConfigurationPanel.tsx # Boyut seçimi (DÜZELTME GEREKLİ)
├── store/
│   └── useConfiguratorStore.ts       # State yönetimi (SCENES, SIZES tanımları)
└── lib/
    └── products.ts                   # Ürün verileri
```

---

## 6. TEST SENARYOLARI

Çözüm uygulandıktan sonra şu testleri yapın:

1. **60x90 CM (YATAY)** seçildiğinde:
   - Poster genişliği ≈ koltuğun %45'i olmalı
   - Görsel kırpılmadan, tam görünmeli

2. **10x20 CM (YATAY)** seçildiğinde:
   - Poster genişliği ≈ koltuğun %10'u olmalı (küçük bir kare gibi)
   - Görsel kırpılmadan, tam görünmeli

3. **Farklı sahneler** arasında geçiş:
   - Her sahnede aynı boyut seçildiğinde, mobilyalara göre orantılı görünmeli

4. **Sürükle-bırak:**
   - Poster odada hareket ettirilebilmeli
   - Döndürme butonları çalışmalı

---

## 7. BAĞIMLILIKLAR

```json
{
  "next": "16.1.1",
  "react": "^19.0.0",
  "zustand": "^5.0.3",
  "framer-motion": "^12.0.6",
  "lucide-react": "^0.469.0",
  "tailwindcss": "^3.4.1"
}
```

---

## 8. ÇALIŞTIRMA

```bash
cd C:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro
npm run dev
# http://localhost:3000/urunler/araba-02 adresini ziyaret edin
```

---

## 9. ÖZET

**Ana Sorun:** Poster boyutlandırma algoritması yanlış. Mobilya referans ölçüleri (200cm koltuk) ile poster ölçüleri (60cm) arasındaki oran doğru hesaplanmıyor.

**Çözüm Anahtarı:** Her mockup görselini pixel bazında ölçüp, `1 cm = X% ekran genişliği` değerini hesaplayın. Bu değeri SCENES verisine ekleyin ve poster genişliğini `posterCm * cmToPercent` formülüyle hesaplayın.

**İkincil Sorun:** Görsel aspect ratio'su ile poster aspect ratio'su uyuşmuyor, bu yüzden kırpma oluyor. `object-contain` kullanılmalı veya blur-fill tekniği düzgün uygulanmalı.

---

*Bu rapor, başka bir AI veya geliştirici tarafından projenin devralınması için hazırlanmıştır.*

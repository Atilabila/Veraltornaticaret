# MILESTONE: Systematic Scaling & Smart-Fit Algorithm
**Tarih:** 22 Ocak 2026
**Durum:** Tamamlandı (Jilet Modu Aktif)

## 1. Vizyon
Metal Poster Pro projesinde, ürün görsellerinin gerçek dünya ortamlarında (yatak odası, tamirhane, salon vb.) milimetrik hassasiyetle ve görsel olarak kusursuz (boşluksuz/kırpılmasız) bir şekilde görüntülenmesi hedeflenmiştir.

## 2. Uygulanan Algoritmalar

### A. Sistematik Ölçekleme Motoru (SSA)
Bu motor, piksel dünyası ile gerçek dünya (Santimetre) arasındaki köprüyü kurar.
- **Dinamik Kalibrasyon:** Kullanıcı, sahnedeki bir referans nesnesinin (koltuk, yatak vb.) iki ucunu (A ve B noktaları) belirler.
- **Piksel/CM Oranı:** Algoritma, A-B noktaları arasındaki piksel mesafesini hesaplar ve bunu kullanıcının girdiği CM değerine oranlar.
- **Hassas Yerleşim:** Posterin genişliği (Wpx) = (Referans Px / Referans CM) * Poster CM formülüyle hesaplanır.

### B. Smart-Fit (Akıllı Oran) Teknolojisi
Kullanıcı deneyimini bozan "siyah boşluklar" veya "yanlış kırpma" sorunlarını ortadan kaldırır.
- **Otomatik Aspect Ratio Algılama:** Javascript `Image()` objesi kullanılarak ürün görselinin doğal en-boy oranı anlık olarak okunur.
- **Dinamik Çerçeve Şekillendirme:** Poster çerçevesi (kart), görselin oranına göre kendini saniyeler içinde yeniden şekillendirir.
- **Otomatik Yönlendirme:** Görsel dikeyse çerçeve dikey, yataysa yatay olur. Kullanıcının manuel ayar yapmasına gerek kalmaz.

## 3. Teknik Mimari
- **Zustand Store:** Kalibrasyon verileri (`calibrations`) her şablon için ayrı ayrı state'te tutulur.
- **MockupRenderer:** SVG tabanlı katmanlar ile A-B noktaları ve referans çizgisi görselleştirilir.
- **Next.js Image:** Maksimum çözünürlük için `unoptimized` ve `quality={100}` parametreleri kullanılır.

## 4. Kullanıcı Arayüzü (HUD)
- **Kalibrasyon Modu:** Interaktif sürükle-bırak noktaları ve anlık CM girişi.
- **Ruler (Cetvel) Görselleştirmesi:** Referans nesnenin üzerine çizilen dinamik ölçü çizgisi.
- **Smart-Fit Badge:** Sistem otomatik ölçekleme yaptığında kullanıcıya bilgi veren görsel geri bildirim.

## 5. Sonuç
Proje, piyasadaki standart mockup araçlarının ötesine geçerek, son kullanıcıya "kendi odasında ürünün tam boyutunu görme" imkanı sunan profesyonel bir e-ticaret deneyimine dönüştürülmüştür.

# TASKS — EXECUTION CHECKLIST

Bu dosya **ne yapılacağını**, **hangi sırayla** ve **ne zaman DONE sayılacağını** tanımlar.

Agent bu dosyayı bir backlog gibi ele alır.

---

## P0 — BLOCKER (DONE olmadan ilerlenmez)

### T0.1 — Global Layout Reset
- [ ] Global `container` tanımla (max-width + yatay padding)
- [ ] Section’ları grid/flex tabanlı hale getir
- [ ] Absolute positioning ile kurulmuş ana layout varsa kaldır

DONE =
- Hiçbir section ekran genişledikçe “yüzmüyor”
- Sağda/ solda anlamsız boşluk kalmıyor

---

### T0.2 — Responsive Stabilite
- [ ] 320 / 375 / 768 / 1024 / 1440 test
- [ ] Zoom %50 ve %30 test

DONE =
- İçerik üst üste binmiyor
- Metinler okunabilir
- Görseller konteyner dışına taşmıyor

---

### T0.3 — Hero Refactor
- [ ] 2 kolon grid (text + image)
- [ ] 1 ana CTA, 1 ikincil CTA
- [ ] 1024px altı stack

DONE =
- Hero tek bakışta “ne satılıyor + ne yapmalıyım” dedirtiyor

---

## P1 — CORE QUALITY

### T1.1 — Typography System
- [ ] Tipografi scale uygula (clamp)
- [ ] Font-weight sınırla (400/600/800)
- [ ] Küçük metinleri okunur hale getir

DONE =
- Aynı seviyedeki başlıklar aynı görünüyor
- “Rastgele küçük yazı” yok

---

### T1.2 — Product Card Standardization
- [ ] Tek ürün kartı bileşeni oluştur
- [ ] İçerik: ad / fiyat / kısa info / CTA
- [ ] Grid: desktop 3–4, tablet 2, mobile 1

DONE =
- Tüm ürünler aynı yapıda
- Kartlar eş yükseklikli

---

### T1.3 — CTA Flow
- [ ] CTA metinlerini sadeleştir
- [ ] CTA’lar sayfa içinde tekrar ediyor
- [ ] Desktop’ta alt bar içerik boğmuyor

DONE =
- Kullanıcı aşağı indikçe “ne yapacağını” kaybetmiyor

---

## P2 — POLISH (opsiyonel ama önerilir)

### T2.1 — Visual Cleanup
- [ ] Kalın siyah bantları azalt
- [ ] Etiketleri (badge) sadeleştir
- [ ] Görsel dilde tutarlılık sağla

---

### T2.2 — Trust Sections
- [ ] Yorumlar daha görünür
- [ ] “Üretim & Teslimat” net ve kısa
- [ ] Footer temiz ve okunur

---

## FINAL CHECK
Bir task **ancak şunlar sağlanırsa DONE sayılır**:
- Görsel değil, yapısal çözüm
- Responsive test yapılmış
- Alternatif çözüm düşünülmüş

“Çalışıyor gibi” = DONE değildir.

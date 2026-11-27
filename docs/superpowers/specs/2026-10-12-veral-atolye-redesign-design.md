# Veral "Atölye" Yeniden Tasarımı — Tasarım Dokümanı

Tarih: 2026-10-12
Branch: `feat/veral-gercek-urun-gorselleri` (müşteri görsel/metin değişiklikleriyle aynı PR)
Hedef branch: `feat/homepage-vision-cart-off` (canlı site bu branch'ten)

## 1. Amaç

Site bugün iki kimlik arasında kalmış: toptan imalat atölyesi (hizmet kartları, DIN tablosu) ve perakende metal poster mağazası (güvenli ödeme/taksit, "koleksiyondan seçin", 48 saatte kargo, isimsiz yorumlar). Katalog kaldırıldığı için mağaza dili boşa düşüyor ve site "boş" hissettiriyor. Yeni ürün posterleri siyah + pirinç/altın; mevcut açık gri + turuncu tema bunlarla çatışıyor.

Yeni tasarım:
- **Konumlandırma:** B2B imalat ana kimlik; metal poster/UV baskı ikincil hizmet, teklif usulüyle.
- **Görsel yön:** Koyu antrasit zemin, pirinç vurgu, serif başlıklar, metal doku.
- **Metin dili:** Sade, doğrulanabilir; teyit edilemeyen iddialar nötr ifade.

## 2. Kapsam

Dahil (tüm herkese açık sayfalar):
1. Ortak katman: tasarım token'ları (renk, font), `Navigation`, `Footer`, `PageShell`/`PageContainer`.
2. Ana sayfa `src/app/(shop)/page.tsx` ve bölümleri.
3. `/hizmetler`, `/hizmetler/[slug]`.
4. `/blog`, `/blog/[slug]`, yazar sayfaları.
5. `/hakkimizda`, `/iletisim`, `/teklif-al` (+ `/basarili`), `/sss`, `/uretim`.
6. Yasal sayfalar: `/kvkk`, `/gizlilik`, `/cerez`, `/kosullar`, `/sartlar`, `/mesafeli-satis`, `/on-bilgilendirme`, `/iade-iptal`.

Hariç / dokunulmaz:
- Hizmet metinleri ve görselleri (önceki commit'lerde müşteri talebiyle güncellenenler dahil). Sadece çerçeve/stil değişir.
- `PR.md` Bölüm 6 "Ek düzeltmeler": adres/telefon çelişkileri, `tel:` ters bölü, `LOG@VERAL.COM`, harita linki, `/hizmetler/giyotin-kesim` ve `/rulo-dilimleme` 404'leri, placeholder ürünler, header `Ti̇caret` (U+0307), footer `© 2024`, logo boyutu, yazar fotoğrafı. Yeni bileşenlerde bu değerler **birebir korunur**.
- Admin paneli (`/admin*`), test sayfaları (`/test`, `/test-supabase`, `/ui-playground`).
- Mağaza sayfaları (`/sepet`, `/odeme`, `/hesabim`, `/siparis*`, `/siparis-sorgula`, `/koleksiyon/*`, `/urunler/[slug]`): kod silinmez, yeniden tasarlanmaz; menü ve ana sayfadan linkleri kalkar, `robots: noindex` eklenir.

## 3. Görsel sistem

### Renk token'ları (CSS değişkeni + Tailwind)
| Token | Değer | Kullanım |
|---|---|---|
| `--atl-bg` | `#121110` | Sayfa zemini |
| `--atl-surface` | `#1b1a18` | Kart, panel |
| `--atl-surface-2` | `#23211e` | Hover, tablo başlığı |
| `--atl-line` | `#2e2b27` | Çizgi, kenarlık |
| `--atl-brass` | `#c9a35c` | Vurgu, CTA, ikon |
| `--atl-brass-light` | `#e3c78a` | Hover, başlık vurgusu |
| `--atl-text` | `#ece6da` | Ana metin |
| `--atl-muted` | `#a39b8c` | İkincil metin |

Kontrast: `--atl-text` / `--atl-bg` ve `--atl-muted` / `--atl-bg` WCAG AA (≥4.5:1) sağlamalı; CTA üzerinde koyu metin (`#121110` on `#c9a35c`). `--color-brand-accent` mevcut kullanımlar için `--atl-brass`'a yönlendirilir; turuncu `#d97706` kaldırılır.

### Tipografi (`next/font/google`, `latin-ext` subset)
- Başlık: **DM Serif Display** (400) — `--font-display`
- Gövde: **Archivo** (400/500/600/700) — `--font-body`
- Teknik etiket/spec/rozet: **IBM Plex Mono** (mevcut) — `--font-mono`

### Doku ve hareket
- Zeminde hafif fırçalanmış metal gren (CSS gradient + düşük opaklıklı SVG noise; ek görsel dosyası yok).
- İnce pirinç ayırıcı çizgi (posterlerdeki gibi, ortada küçük baklava işareti opsiyonel).
- Sayfa açılışında bölümlerin kademeli belirmesi (framer-motion zaten bağımlılık; `prefers-reduced-motion` saygı). Hover'da görsel ölçek büyütme yok; kenarlık pirince döner.

## 4. Bileşenler

Yeni/yeniden yazılan, tek sorumluluklu bileşenler `src/components/atolye/` altında:
- `SectionHeading` — üst etiket (mono), serif başlık, opsiyonel açıklama.
- `BrassRule` — pirinç ayırıcı.
- `ServiceCard` — 4:5 görsel (`serviceImageFit/Alt` kullanır), görselin **altında** rozet satırı (badge + capacity), başlık, açıklama, opsiyonel metric, CTA. Ana sayfa ve `/hizmetler` aynı bileşeni kullanır (bugün iki kopya var); `/hizmetler` varyantı `specs` listesini de gösterir.
- `ProcessSteps` — 4 adım: Çizim/ölçü gönder → Numune → Seri üretim → Sevkiyat.
- `CtaBand` — teklif + WhatsApp; telefon/adres değerleri mevcut kaynaklardan aynen alınır.

Veri: hizmet kart dizileri (`ServicesHomeSection`, `hizmetler/page.tsx`) yerlerinde ve birebir aynı kalır. İki dizinin başlık/açıklamaları birbirinden farklıdır; birleştirmek metin değişikliği olacağı için yapılmaz.

## 5. Sayfa yapıları

### Ana sayfa
1. Hero: `giyotin-kesim.webp` büyük; başlık "İzmir Alsancak'ta teneke ve tel imalatı"; alt metin; "Teklif Al" + "WhatsApp" CTA.
2. Üretim hatları: 6 `ServiceCard`.
3. `ProcessSteps`.
4. Metal baskı bandı: `metal-tabelalar.webp` + "Kurumsal / seri UV baskı için teklif" → `/hizmetler/miknatisli-magnet`.
5. Son 3 blog yazısı.
6. Konum / iletişim `CtaBand`.

Kaldırılan ana sayfa bölümleri: güvenli ödeme/taksit/hızlı sevkiyat/40 yıllık güvence bandı, "Hammaddeden duvarınıza" perakende süreç, isimsiz "Toptan İmalat Referanslarımız" yorumları, perakende odaklı hero metni ("Sanatta Asalet"). Bileşen dosyaları silinmez, sadece ana sayfadan çıkarılır.

### Header / Footer
- Menü: Üretim Hatları (`/hizmetler`) · Metal Baskı (`/hizmetler/miknatisli-magnet`) · Blog · Hakkımızda · İletişim; sağda "Teklif Al".
- Sepet ikonu, hesap ikonu ve `CartDrawer` layout'tan çıkarılır.
- Footer aynı link ve iletişim içeriğiyle yeni stil.

### Diğer sayfalar
Mevcut bilgi mimarisi korunur, yeni token/bileşenlerle yeniden giydirilir. Uzun metin sayfaları (blog yazısı, yasal) koyu zeminde okunabilirlik için max ~68ch satır, 1.7 satır aralığı.

## 6. Metin kuralları

- Teyit edilemeyen iddialar nötr ifade edilir; PR açıklamasında eski → yeni listesi verilir:
  - Kuruluş yılı / süre ("1980", "40 Yıllık", "Yarım Asırlık") → "Alsancak'ta uzun yıllardır" vb. (tutarsızlık PR'da sorulur).
  - "ISO 9001:2015", "%100 uyumlu", "10 yıl solmama garantisi", "ömür boyu renk garantisi" → kaldırılır veya "talep üzerine test/numune" gibi doğrulanabilir ifadeye çevrilir.
  - DIN EN 10202 hammadde standardı (malzeme normu, iddia değil) korunur.
- Hizmet kartı metinleri (title, badge, capacity, description, metric, specs) değişmez.
- Blog yazı içerikleri değişmez (sadece stil). Blog'daki "5.000+ büküm direnci" ifadeleri PR'da sorulur.

## 7. Hata durumları / kenar durumlar
- Supabase erişilemezken (`ENOTFOUND`, bugün böyle) sayfalar `defaultContent` ile render olmaya devam eder; yeni bileşenler DB alanı yoksa boş kutu render etmez.
- Görseller yerel; `sizes` her `fill` görselde verilir; hero `priority`.

## 8. Test / kabul
- `npm run build` başarılı; değişen dosyalarda yeni lint hatası yok.
- Masaüstü (1280) + mobil (375) ekran görüntüsü: `/`, `/hizmetler`, 4 hizmet detayı, `/blog`, 3 blog yazısı, `/hakkimizda`, `/iletisim`, `/teklif-al`, bir yasal sayfa.
- Konsolda 404 görsel yok; ölçü yazıları posterlerde okunur; rozetler poster başlığına binmez.
- Header/footer'da sepet/hesap yok; mağaza sayfaları `noindex`.
- Ek düzeltmeler listesindeki değerler değişmemiş (`git diff` ile kontrol).

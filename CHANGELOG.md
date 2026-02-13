# Metal Poster Pro - Degisiklik Gunlugu

Bu dosya kullaniciya yonelik degisiklik notlarini icerir.

## [Unreleased] - 2026-02-13

### Guvenlik
- Supabase `service_role` anahtarinin repoda yer alma riski azaltildi: hardcoded key kullanimlari kaldirildi, sadece ortam degiskenlerinden okunuyor.
- Browser/client tarafinda key sizmasini engellemek icin Supabase client artik repo icinde hardcoded placeholder anahtar bulundurmuyor.
- `public/` altinda bulunan debug log dosyalari kaldirildi ve `.gitignore` ile engellendi.

### Gelistirici Deneyimi
- Supabase kontrol scriptleri (`check_columns.js`, `check_counts.js`) `.env.local`/env uzerinden calisacak sekilde guncellendi.
- Playwright E2E konfigurasyonu: repo icinde anahtar gomulmesi kaldirildi; testler yerel env ile calisir.

### Dokumantasyon
- `N8N_AI_INTEGRATION.md`: secret/token icermeyecek sekilde sanitize edildi; env/credentials kullanimina yonlendirildi.
- Supabase kurulum dokumanlarinda ornek anahtarlar placeholder ile degistirildi.




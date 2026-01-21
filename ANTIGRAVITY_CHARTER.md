# Antigravity Charter (Degistirilemez Kurallar)

Bu belge, Metal Poster Pro projesinin vizyondan cikmamasini ve tum planin eksiksiz uygulanmasini garanti eden cekirdek kurallari tanimlar. Her sprint basinda ve sonunda bu kurallar okunur, onaylanir ve degisiklik gerektiren konular icin resmi karar kaydi acilir.

## Vizyon ve Kapsam

1) Scope disinda is alinmaz. Yeni talepler backlog'a girer, onay olmadan uygulanmaz.
2) Vizyon belgesi disinda kalan isler "deneme" olarak bile kod tabanina giremez.
3) Moduller arasi oncelik degisimi sadece urun sahipligi onayi ile olur.

## Veri ve Guvenlik

4) Tum CRUD islemleri tenant_id ile dogrulanir; aksi build kirilmasina neden olur.
5) RLS bypass yasaktir; servis role sadece backend kontrollu kullanilir.
6) Token yenileme hatalarinda kullaniciya net uyari ve yeniden giris akisi zorunludur.
7) Kisisel veri toplama amaci ve saklama suresi her ekranda acik yazilir.
8) Silme islemleri varsayilan soft delete; hard delete icin onay gerekir.

## Konfigurasyon ve Ortam

9) Supabase URL, anon key ve tum kritik anahtarlar sadece env ile yonetilir.
10) Kodda gomulu gizli deger bulunursa aninda temizlenir ve sebep raporlanir.
11) Dev, staging ve prod ortamlarinin karismasini engelleyen kontrol listesi zorunludur.

## Mimari ve Migrasyon

12) Tek dogrulanmis migration zinciri vardir; yeni alanlar once migration sonra kod.
13) Veritabani degisiklikleri dokumante edilir ve geri alma stratejisi yazilir.
14) Veri sozlesmesi olmayan API veya RPC kullanima alinmaz.

## Kalite ve Test

15) Kabul kriteri yazilmayan is "done" sayilmaz.
16) Minimum test seti olmadan release yapilmaz; kirmizi test prod'u bloklar.
17) Kritik ekranlar 2 saniyeyi asarsa performans gorevi acilir.
18) Her kritik hata tek log sozlesmesine gore raporlanir.

## Dokumantasyon ve Sahiplik

19) Her yeni modul icin kurulum, kullanim ve veri sozlesmesi guncellenir.
20) Her modulun is sahibi, teknik sahibi ve onaylayicisi bellidir.
21) Kurallar ayda bir gozden gecirilir, degisimler kayda alinir.

## Uygulama Disiplini

22) Scope disi isler icin degisiklik talebi acilmadan kod degisemez.
23) Uretimde sorun cikartan degisiklikler geri alma planina gore geri cekilir.
24) Tedarik edilen her yeni paket guvenlik ve lisans kontrolunden gecer.

---

Bu kurallarin ihlali, kalite, guvenlik ve guven kaybina neden olur. Antigravity yaklasimi, disiplini ve izlenebilirligi temel alir.

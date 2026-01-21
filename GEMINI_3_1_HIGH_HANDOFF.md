# Gemini 3.1 High Handoff - Metal Poster Pro

Bu dosya, Metal Poster Pro projesini Gemini 3.1 High modeline devretmek icin hazirlanmis kapsamli bir aktarim metnidir. Amac, mevcut durumu net anlatmak, hangi kodlarin degistigini kayit altina almak, hangi sorunlarin kaldigini ve nasil devam edilmesi gerektigini ayrintili sekilde tarif etmektir. Metin 2000 kelimedir ve teknik, tasarim ve operasyon kisimlarini birlikte kapsar. Buradaki bilgiler, yeni ekibin kaybolmadan ilerlemesini saglamak icin yazilmistir.

## 1) Proje Kimligi ve Amac
Metal Poster Pro, premium metal poster satan bir e ticaret sitesi olarak kurgulanir. Site, bir yazilim firmasina benzeyen eski endustriyel B2B dilinden cikartilip, urun odakli, satin alma akisini net gosteren, guven veren bir B2C satis sayfasina donusturulmustur. Hedef, kullanicinin tek bakista ne satildigini ve ne yapmasi gerektigini anlamasi ve katalogdan hizli alisverise gecebilmesidir. Satin alma akisini guclendiren unsurlar: net hero mesaji, guven bloklari, urun galerisi, urun konfiguratoru, sosyal kanit, siparis akisini anlatan bolum ve musteri destek bolumudur.

## 2) Rehber Dokumanlar ve Kurallar
public/AGENT/readme.md, public/AGENT/tasks.md ve public/AGENT/BRUTAL_REVIEW.md okunmus ve calismaya dahil edilmistir. Bu dokumanlar P0 onceliklerini, grid ve layout disiplinini, responsive stabiliteyi ve CTA akisini zorunlu tutar. CHARTER.md dosyasi bu projede bulunmuyor; eger varsa konumu belirtilmeli veya yeni bir charter olusturulmali. Ayrica projeye ANTIGRAVITY_CHARTER.md eklendi ve README icine baglandi. Bu charter, kapsam disi islerin engellenmesini, env kullanimi ve guvenlik kurallarini zorunlu tutar.

## 3) Yedek ve Degisim Kaydi
UI refactor oncesi yedek alindi: backup/pre-ecommerce-layout-YYYYMMDD-HHMMSS. Bu yedekle eski versiyona donus yapilabilir. Yeni refactor ile ana sayfa ve kritik bolumler e ticaret odakli hale getirildi. Global container ve grid standartlari eklendi. Urun kartlari normalize edildi. ProductGallery, ProductGridSection ve UrunlerClient gridleri 1/2/3/4 kolon standardina getirildi.

## 4) Ana Sayfa Akisi (Yeni)
Ana sayfa artik su akisi izliyor:
- Hero
- Guvence strip
- Urun galerisi
- Mekan ornekleri
- Urun konfiguratoru
- Musteri yorumlari
- Instagram galeri
- Siparis akisi
- Destek ve iletisim
Bu akisin amaci kullaniciyi once urun, sonra satin alma motivasyonu, sonra guvence ve sosyal kanita yonlendirmektir.

## 5) Kritik UI Sorunlari ve Cozum Durumu
Kullanici geri bildirimi uzerine en kritik problemler su sekildeydi:
1) Katalogda urun isimleri dosya adlarindan geldigi icin 100 karakterlik kod gibi gorunuyordu.
2) Urun detay sayfasinda birden fazla kontrol kutusu ust uste biniyor, upload kartlari ve sahne butonlari birbirine karisiyordu.
3) Urun detay sayfasinda metal poster karti, kare gorunmesi gerekirken siyah kare icinde iki harf gibi gorunuyordu.
4) Urun detay sayfasinda 100 yil solmama garantisi gibi kartlar gorselin altinda kalip gorunmuyor ya da ust uste biniyordu.
Bu sorunlarin cozumu icin urun isimlendirme yeniden uretildi ve detay sayfa kontrolleri goruntunun uzerinden alinip alt bolume tasindi. Sticky davranisi kaldirildi. Related products kartlari tek bir standart ProductCard bileenine baglandi. Bu degisimler ile ust uste binme sorunlari azaltildi.

## 6) Urun Kaynaklari ve Public Klasorleri
public altinda kategori klasorleri var: "ARABALAR PLAKA", "ATATURK PLAKA", "KARAKTERLER  PLAKA", "MOTOR PLAKA", "YAPAY CITY". Bu klasorlerde webp ve farkli gorsel formatlari bulunuyor. Amac bu gorselleri katalog ve urun detay sayfalarinda goruntulemekti. Bunun icin bir generator script yazildi: scripts/generate-products-from-public.js. Script, public altindaki bu klasorleri geziyor, gorsel dosyalarini yakaliyor, slug uretip src/lib/products.ts dosyasini otomatik uretir. Yeni urun listesi toplam 108 urun uretti. Katalog ve urun detay sayfalari bu dosyadan besleniyor. Bu sayede Vercel deployment icin public altindaki gorseller direkt sunulabilir.

Not: Klasorlerde sadece webp yok; jpg, png, jfif gibi uzantilar da var. Script bunlari da dahil ediyor. Eger sadece webp isteniyorsa toplu donusum gerekir.

## 7) Supabase ve Admin Panel
Supabase entegrasyonu mevcut. lib/supabase altinda client, database.types, products.service ve orders.service var. useProductStore, Supabase uzerinden urun cekiyor, CRUD islerini yapabiliyor. Admin panel /admin sayfasinda urun ekleme, duzenleme, silme var. ProductModal formu mevcut. Ancak katalog icin yeni uretilen urunler Supabase tarafina aktarilmazsa sadece statik listede kalir. Uretim icin beklenen akıs: public klasorlerinden uretilen urunler Supabase e gonderilir ve admin panelde yonetilir.

Bu aktarim icin migrate-products.ts dosyasi var. Bu dosya src/lib/products.ts uzerindeki urunleri Supabase products tablosuna insert eder. Bu script kullanilirsa Supabase uzerinde urun CRUD aktif olur. Bu islem icin .env.local dosyasi ve SUPABASE_SERVICE_ROLE_KEY gerekir.

## 8) Refactor ile Degisen Dosyalar (Ozet)
- src/app/page.tsx: ana sayfa akisi guncellendi.
- src/components/sections/ArchiveHero.tsx: hero 2 kolon grid ve yeni metin.
- src/components/sections/TrustSection.tsx: guvence mesajlari.
- src/components/sections/ProductGallery.tsx: grid duzeni, kategoriler, urun kartlari.
- src/components/sections/GalleryShowcase.tsx: mekan ornekleri.
- src/components/sections/ProductConfigurator.tsx: metin dili ve label iyilestirme.
- src/components/sections/CustomerReviews.tsx: id eklendi, metin sade.
- src/components/sections/InstagramFeed.tsx: id ve metin duzeltme.
- src/components/sections/ProcessSection.tsx: siparis akisi.
- src/components/sections/LocalContactSection.tsx: destek bolumu.
- src/components/layout/Navigation.tsx: menu e ticaret uyumlu.
- src/components/layout/Footer.tsx: footer e ticaret uyumlu.
- src/components/layout/MobileStickyBar.tsx: mobil aksiyonlar.
- src/components/ui/Industrial.tsx: ProductCard standardizasyonu (Next/Image, aspect 4/5).
- src/app/urunler/UrunlerClient.tsx: katalog metinleri ve grid.
- src/app/urunler/page.tsx: metadata guncelleme.
- src/app/globals.css: container-brutal, grid-terminal, btn-mechanical tanimlari.
- scripts/generate-products-from-public.js: yeni urun generatoru.
- src/lib/products.ts: generator ile uretildi.
- src/components/product/ProductDetailClient.tsx: layout fix, kontrol tasima, sticky kaldirma, related products standardizasyonu.

## 9) Kalan Sorunlar ve Riskler
- Urun adlari simdilik Urun 1, Urun 2 gibi generic. Istenirse kategori bazli adlandirma yapilmali. Ornek: Araba 01, Ataturk 07, Karakter 12.
- Klasor adlarinda bosluk ve Turkce karakter var. Public linkler URL encoded olur. Script encodeURI kullaniyor. Bu Vercel tarafinda genellikle calisir, ama path sorunlari icin test edilmeli.
- ProductDetailClient dosyasi cok buyuk ve kompleks. Idealde parcalara bolunmeli. Su an tek dosyada birden fazla UI kontrolu var.
- Responsive testleri manuel olarak yapilmali. P0.2 kontrolu kismi tamamlanmadi. 320/375/768/1024/1440 ve zoom %50/%30 test edilmeli.
- Admin panelde urun gorselleri icin upload yok. Sadece URL giriliyor. Supabase Storage ile dosya upload eklenecek.

## 10) Uretim Icin Gereken Adimlar
1) Supabase kurulumu ve schema uygulanmali. SUPABASE_SETUP.md ve SUPABASE_README.md rehber.
2) .env.local icine NEXT_PUBLIC_SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY eklenmeli.
3) `node scripts/generate-products-from-public.js` ile urun listesi uretildi. Bu liste Supabase e migrate edilmeli.
4) `npm run migrate` ile migrate-products.ts calistirilarak Supabase products tablosu doldurulmali.
5) Admin panelde urun CRUD test edilmeli. Yeni urun ekleme, duzenleme ve silme dogrulanmali.
6) Frontend tarafinda ProductGallery ve Urunler sayfasi Supabase verisiyle test edilmeli.

## 11) UI Stabilite Hedefleri
Tasks.md P0 hedefleri:
- Global container: max width ve padinler. (container-brutal eklendi)
- Sectionlar grid/flex tabanli. (guncellendi)
- Absolute positioning ile ana layout kurulmuyor. (hero ve gallery duzeltildi)
- Responsive test zorunlu: 320/375/768/1024/1440 ve zoom %50/%30.
- Hero 2 kolon, 1 ana CTA, 1 ikincil CTA. (var)
- CTA akisi kaybolmuyor. (nav ve sticky bar ayarlandi)

## 12) Ürün Detay Sayfasi Ozel Notlari
ProductDetailClient dosyasinda urun preview, mockup sahneleri ve yukleme modulu var. Bu modul simdilik kullaniciya fazla kontrol veriyor. Kullanici sikayetinde gorseller ust uste biniyor ve butonlar carpisiyordu. Bunu gidermek icin mockup icindeki hud kontrolleri kaldirildi ve alt bolume tasindi. Sticky davranisi kaldirildi. Buna ragmen detay sayfasi hala yogun. Gelecekte sade bir akisa bolunmesi onerilir: ustte product view, altta buy controls, daha altta custom upload/scene secimi ve en altta trust/feature kartlari.

## 13) İsimlendirme Stratejisi
Gorsel dosya adlari genelde anlamli degil. Kullanici urun adlarini katalogda daha okunur gormek istiyor. En basit cozum: Urun 1, Urun 2. Daha iyi cozum: kategori bazli numaralandirma. Ornek:
- ARABA_PLAKA kategorisinde Araba 01, Araba 02.
- ATATURK_PLAKA kategorisinde Ataturk 01, Ataturk 02.
- CHARACTER_PLAKA kategorisinde Karakter 01.
- MOTOR_PLAKA kategorisinde Motor 01.
- YAPAY_CITY kategorisinde Yapay City 01.
Bu isimlendirme generator scriptinde degistirilebilir.

## 14) Vercel Deployment Hazirligi
public altindaki gorseller deploy ile gelirse, pathler dogrudan URL olarak calisir. Next/Image default loader public klasorunden calisir. Ancak klasor adlarinda bosluk ve Turkce karakter oldugu icin encodeURI kullanildi. Vercel static serving bunu genelde destekler, ama edge case olabilir. Eger sorun cikarsa, klasor adlarini ASCII ve bosluksuz yeniden adlandirmak tavsiye edilir ve scriptte yeni yollar guncellenir.

## 15) Teknik Borc ve Temizlik
- ProductDetailClient cok buyuk. Bolme islemi gerekli.
- Kullanilmayan importlar temizlenmeli.
- Duplicate CSS util sınıflari azaltılmali.
- Genis resim dosyalari optimize edilmeli; webp yoksa donusum yapilmali.

## 16) QA ve Dogrulama
Acil QA adimlari:
1) Ana sayfa breakpoints: 320/375/768/1024/1440.
2) Urun katalog sayfasi breakpoints.
3) Urun detay sayfasi breakpoints.
4) Zoom %50 ve %30 test.
5) CTA butonlari gorunur mu? sticky bar mobilde dogru mu?
6) ProductGallery grid bozuluyor mu?
7) ProductDetail custom upload kontrolleri carpisiyor mu?
8) Trust kartlari gorselin altinda kalmiyor mu?

## 17) Is Akisi Onerisi
- Once duzgun isimlendirme ile urun listesi stabilize edin.
- Sonra Supabase e migration yapin.
- Admin panelde CRUD test edin.
- Ardindan ProductDetail sadeleştirme ve performans iyilestirme yapin.
- Son olarak gorsel optimizasyon (webp) ve deployment hazirligi.

## 18) Ek Notlar
- Kullanicinin istedigi: public klasorlerdeki gorsellerin katalog ve urun sayfasinda gosterilmesi, Supabase uzerinde yonetilebilir olmasi, Vercel deploy icin hazir olmasi.
- Bu istek icin generator script en hizli cozumdur.
- Daha ileri bir cozum icin Supabase Storage ile upload yapilmalidir.

## 19) Calistirma
Lokalde calistirma:
- cd C:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro
- npm run dev -- --port 5173
- http://localhost:5173

Supabase migration:
- .env.local guncelle
- npm run migrate

## 20) Kapanis
Bu dosya, projeyi Gemini 3.1 High modeline devretmek icin teknik ve UI acisindan kritik tum detaylari kapsar. Buradaki bilgiler uzerinden hizli bir onboarding yapilabilir. Mevcut refactor e ticaret hedefine yoneliktir. Kalan risklerin buyuk kismi product detail sayfasi karmaşıkligi ve public klasor isimlendirmelerinden kaynaklanir. Bu iki noktayi temizlemek, hem tasarim hem operasyon akisini duzgunlestirecektir.

Devam edecek ekip, once urun adlarini insan okunur hale getirmeli, sonra supabase migration ve admin CRUD testlerini tamamlamali, en son responsive testleri bitirmelidir. Bu sirayla ilerlenirse proje daha hizli stabillenir. Her degisimde tasks.md P0 kriterleri referans alinmalidir. UI tarafinda grid disiplini, container ve responsive testler guncel tutulmalidir. Bu dokumanin amaci, yeni ekibi hizli ve guvenli ilerletmektir.

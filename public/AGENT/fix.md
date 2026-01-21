WORKDIR: C:\Users\ati\.gemini\antigravity\scratch\metal-poster-pro

Problem:
1) Hero/başlık alanında yazılar dar alana sıkışıp ALT ALTA düşüyor.
2) Ürün kartlarında görseller farklı oran/çözünürlükte olduğu için kart içine TAM OTURMUYOR (taşıyor/boşluk bırakıyor).
Stack: Next.js + Tailwind.

Task (P0):
A) HERO LAYOUT FIX
- Hero bölümünü container + grid ile yeniden kur.
- Container: max-w-6xl, px-4 sm:px-6 lg:px-8.
- Layout: grid grid-cols-1 lg:grid-cols-2 gap-10 items-center.
- Sol metin wrapper: min-w-0 + max-w-[58ch].
- Başlık: text-[clamp(28px,4vw,56px)] font-extrabold leading-[1.05] tracking-tight.
- Satır kırılımı kontrolü için sadece gerektiğinde <br className="hidden sm:block" /> kullan; kelime kelime alt alta düşmeyecek.
- Herhangi bir w-48/w-56 gibi dar genişlik kısıtını kaldır.
- break-all gibi zorlayıcı kırılım sınıflarını kaldır.

B) PRODUCT CARD IMAGE NORMALIZATION
- Tüm ürün kartlarında görsel alanı sabit bir oran olsun: aspect-[4/5] (veya 3/4; birini seç ve her yerde aynı kullan).
- Image rendering Next/Image ile yapılacak:
  - wrapper: relative w-full aspect-[4/5] overflow-hidden rounded-xl bg-zinc-100
  - <Image fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
- Eğer kırpma istenmeyen yer varsa sadece o yerde object-contain + p-3 kullan, ama katalog grid’inde default object-cover.
- Kartların görseli hiçbir breakpoint’te taşmayacak; kart yüksekliği tutarlı olacak.

C) PRODUCT GRID FIX
- Ürün listeleme grid’i:
  - grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- Kart container:
  - rounded-2xl border border-black/10 bg-white p-4 shadow-sm
  - hover:-translate-y-0.5 hover:shadow-lg transition
- Kart başlık/fiyat alanları taşmayacak: min-w-0 + line-clamp (title için 2 satır).

D) QA / ACCEPTANCE
- 320 / 375 / 768 / 1024 / 1440 ekranlarda kontrol et.
- Zoom %50 ve %30’da layout çökmeyecek.
- Hero başlığı artık dikey harf yığını gibi görünmeyecek.
- Ürün kartı görselleri aynı oran ve hizaya sahip olacak.

Output:
- Değiştirdiğin dosyaları listele.
- Önce/sonra ekran görüntüsü alma adımlarını yaz (yerel dev server ile).
- Tek bir clean patch/PR mantığında commit üret.

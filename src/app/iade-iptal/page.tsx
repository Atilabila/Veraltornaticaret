import React from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

export default function IadeIptalPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white text-neutral-900">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
          <header className="space-y-2">
            <p className="text-[11px] font-black tracking-[0.3em] uppercase text-gray-500">İptal / İade Koşulları</p>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">İptal, İade ve Değişim Politikası</h1>
            <p className="text-sm text-gray-600">
              Son güncelleme: <span className="font-semibold">[GG.AA.YYYY]</span>
            </p>
          </header>

          <article className="space-y-8 text-sm leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-black">1. Kapsam</h2>
              <p>Bu politika, <span className="font-semibold">[ŞİRKET UNVANI]</span> tarafından satışı yapılan tüm ürünler için geçerlidir.</p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-black">2. Cayma Hakkı</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Alıcı, teslimden itibaren 14 gün içinde hiçbir gerekçe göstermeden cayma hakkını kullanabilir.</li>
                <li>Ürün kullanılmamış, hasarsız ve yeniden satılabilir durumda olmalıdır.</li>
                <li>İade başvurusu: [DESTEK E-POSTA] veya [TELEFON]</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-black">3. İstisnalar</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Kişiye özel üretilen ürünler veya alıcının talebiyle özelleştirilmiş tasarımlar.</li>
                <li>Hijyen ürünlerinde ambalaj açıldıysa.</li>
                <li>Hızlı bozulan veya son kullanma tarihi yaklaşan ürünler.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-black">4. İade Süreci</h2>
              <ol className="list-decimal list-inside space-y-1">
                <li>İade talebinizi iletin ve onay alın.</li>
                <li>Ürünü faturası ve tüm aksesuarlarıyla birlikte güvenli şekilde paketleyin.</li>
                <li>İade kargo kodu: [KARGO KODU/BEDAVA İADE DURUMU].</li>
                <li>Ürün kontrol edilir; uygun ise iade süreci başlatılır.</li>
              </ol>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-black">5. Ücret İadesi</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>İade onayından sonra en geç 14 gün içinde ödeme yönteminize iade yapılır.</li>
                <li>Kargo bedeli iadesi: [KARGO BEDELİ İADE POLİTİKASI].</li>
                <li>Taksitli alışverişlerde banka, iade tutarını taksit adedince yansıtabilir.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-black">6. İptal</h2>
              <p>Üretim başlamadan önce verilen siparişler için iptal talebi alınabilir. İptal için [DESTEK E-POSTA] üzerinden talep oluşturun.</p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-black">7. İletişim</h2>
              <p>
                Adres: [ŞİRKET ADRESİ] // Telefon: [TELEFON] // E-posta: [E-POSTA]. Uyuşmazlıklarda{" "}
                <strong>[ŞEHİR]</strong> Tüketici Hakem Heyetleri/Mahkemeleri yetkilidir.
              </p>
            </section>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}

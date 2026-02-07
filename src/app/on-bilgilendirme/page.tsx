import React from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

export default function OnBilgilendirmePage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white text-neutral-900">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
          <header className="space-y-2">
            <p className="text-[11px] font-black tracking-[0.3em] uppercase text-gray-500">Ön Bilgilendirme Formu</p>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">Sipariş Öncesi Bilgilendirme</h1>
            <p className="text-sm text-gray-600">
              Son güncelleme: <span className="font-semibold">[GG.AA.YYYY]</span>
            </p>
          </header>

          <article className="space-y-8 text-sm leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-black">1. Satıcı Bilgileri</h2>
              <p>
                [ŞİRKET UNVANI] // MERSİS / Vergi No: [MERSİS NO] // Adres: [ŞİRKET ADRESİ] // Telefon: [TELEFON] //
                E-posta: [E-POSTA]
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-black">2. Ürün / Hizmet Bilgileri</h2>
              <p>Ürün adı, temel nitelikleri, vergiler dahil toplam satış fiyatı ve kargo bedeli sipariş ekranında yer alır.</p>
              <p>Teslimat yöntemi ve süresi: [TESLİMAT SÜRESİ] (yasal azami 30 gün).</p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-black">3. Ödeme Şartları</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Ödeme yöntemi: [KREDİ KARTI / HAVALE / KAPIDA ÖDEME vb.]</li>
                <li>Taksitlendirme bankanın sunduğu vadelerle sınırlıdır.</li>
                <li>Kredi kartı bilgileriniz saklanmaz; güvenli ödeme sağlayıcısına iletilir.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-black">4. Cayma Hakkı</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Alıcı, teslimden itibaren 14 gün içinde cayma hakkını kullanabilir.</li>
                <li>İstisnalar: Kişiye özel ürünler, hızlı bozulan veya hijyenik ürünlerin ambalajı açılmışsa.</li>
                <li>Cayma bildirimi için: [DESTEK E-POSTA] / [TELEFON]</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-black">5. İade ve Masraflar</h2>
              <p>İade kargo bedeli: [KARGO ÜCRETİ DETAYI]. Ücret iadesi, ürün iade alınıp incelendikten sonra en geç 14 gün içinde yapılır.</p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-black">6. Şikayet ve Çözüm</h2>
              <p>
                Şikayetlerinizi <span className="font-semibold">[DESTEK E-POSTA]</span> adresine yazılı olarak iletebilirsiniz. Uyuşmazlıklarda{" "}
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

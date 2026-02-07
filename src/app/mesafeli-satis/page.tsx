import React from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";

export default function MesafeliSatisPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white text-neutral-900">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
          <header className="space-y-2">
            <p className="text-[11px] font-black tracking-[0.3em] uppercase text-gray-500">Mesafeli Satış Sözleşmesi</p>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              <span className="block">[ŞİRKET UNVANI]</span>
              <span className="text-sm font-semibold text-gray-600">Mesafeli Satış Hükümleri</span>
            </h1>
            <p className="text-sm text-gray-600">
              Son güncelleme: <span className="font-semibold">[GG.AA.YYYY]</span>
            </p>
          </header>

          <article className="space-y-8 text-sm leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-black">1. Taraflar</h2>
              <p>
                Satıcı: <span className="font-semibold">[ŞİRKET UNVANI]</span> - MERSİS / Vergi No: [MERSİS NO] - Adres:
                [ŞİRKET ADRESİ] - İletişim: [E-POSTA] / [TELEFON]
              </p>
              <p>Alıcı: Siteye üye olan veya misafir alışveriş yapan gerçek/tüzel kişi.</p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-black">2. Konu</h2>
              <p>
                İşbu sözleşme, alıcının <span className="font-semibold">[ALAN ADI]</span> adresinde sunduğu ürün/hizmetleri
                elektronik ortamda sipariş etmesine ve teslimine ilişkin usul ve esasları düzenler.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-black">3. Ürünler ve Fiyat</h2>
              <p>
                Ürün temel nitelikleri, tüm vergiler dahil satış fiyatı, kargo bedeli ve tahmini teslim süresi ürün
                sayfasında belirtilmiştir. Kampanya ve indirimler stok ve süre ile sınırlıdır.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-black">4. Ödeme ve Güvenlik</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Ödemeler güvenli ödeme altyapısı üzerinden alınır. Kart verileri saklanmaz, ödeme sağlayıcısına iletilir.</li>
                <li>Taksitlendirme, bankanızın sağladığı vadeler ile sınırlıdır.</li>
                <li>Ödeme onaylanmazsa sipariş işleme alınmaz.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-black">5. Teslimat</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Teslimat adresi: Alıcı tarafından belirtilen adres.</li>
                <li>Tahmini teslim süresi: [TESLİMAT SÜRESİ] (yasal azami 30 gün).</li>
                <li>Hasarlı paketlerde kargo görevlisiyle tutanak tutulmalı; aksi halde sorumluluk alıcıya geçer.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-black">6. Cayma Hakkı</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>Alıcı, teslimden itibaren 14 gün içinde cayma hakkını kullanabilir.</li>
                <li>İstisna: Kişiye özel üretilmiş ürünler, hızlı bozulan ürünler, ambalajı açılmış hijyen ürünleri.</li>
                <li>İade için ürünün kullanılmamış ve yeniden satılabilir durumda olması gerekir.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-black">7. İade ve Ücret İadesi</h2>
              <ul className="list-disc list-inside space-y-1">
                <li>İade talebi için [DESTEK E-POSTA] veya [TELEFON] üzerinden iletişime geçin.</li>
                <li>İade kargo bedeli: [KARGO ÜCRETİ DETAYI].</li>
                <li>Ücret iadesi, ürünün iadesi ve incelemesinden sonra 14 gün içinde yapılır.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-black">8. Uyuşmazlık</h2>
              <p>
                Uyuşmazlıklarda <strong>[ŞEHİR]</strong> Tüketici Hakem Heyetleri/Mahkemeleri yetkilidir. Alıcı, şikayet ve
                taleplerini <span className="font-semibold">[DESTEK E-POSTA]</span> üzerinden iletebilir.
              </p>
            </section>
          </article>
        </section>
      </main>
      <Footer />
    </>
  );
}

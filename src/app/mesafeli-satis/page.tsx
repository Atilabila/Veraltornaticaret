import { LegalPageLayout } from "@/components/layout/LegalPageLayout";

export default function MesafeliSatisPage() {
  return (
    <LegalPageLayout title="Mesafeli Satış Sözleşmesi" eyebrow="Tüketici hakları" updatedAt="[GG.AA.YYYY]">
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#161616]">1. Taraflar</h2>
        <p>
          Satıcı: <strong>[Şirket unvanı]</strong> — MERSİS: [MERSİS no] — Adres: [Şirket adresi] — İletişim: [E-posta] / [Telefon]
        </p>
        <p>Alıcı: Site üzerinden alışveriş yapan gerçek veya tüzel kişi.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#161616]">2. Konu</h2>
        <p>
          İşbu sözleşme, <strong>[Alan adı]</strong> üzerinden sunulan ürün ve hizmetlerin elektronik ortamda
          sipariş edilmesi ve teslimine ilişkin usul ve esasları düzenler.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#161616]">3. Cayma hakkı</h2>
        <p>
          Alıcı, teslimden itibaren 14 gün içinde cayma hakkını kullanabilir. Kişiye özel üretilmiş ürünler bu haktan istisnadır.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#161616]">4. Uyuşmazlık</h2>
        <p>
          Uyuşmazlıklarda <strong>[Şehir]</strong> Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri yetkilidir.
        </p>
      </section>
    </LegalPageLayout>
  );
}

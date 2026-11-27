import type { Metadata } from "next";
import { absUrl } from "@/lib/site";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";

export const metadata: Metadata = {
  title: "Mesafeli Satış Sözleşmesi",
  alternates: { canonical: absUrl("/mesafeli-satis") },
};

export default function MesafeliSatisPage() {
  return (
    <LegalPageLayout title="Mesafeli Satış Sözleşmesi" eyebrow="Tüketici hakları" updatedAt="16.11.2026">
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-atl-text">1. Taraflar</h2>
        <p>
          Satıcı: <strong>Veral Torna &amp; Teneke Ticaret</strong> — Adres: 1471 Sokak No:12/A, Alsancak / İzmir — İletişim: veraltornatic@hotmail.com / 0507 165 13 15. Vergi kimliği fatura üzerinde yazılıdır.
        </p>
        <p>Alıcı: Site üzerinden alışveriş yapan gerçek veya tüzel kişi.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-atl-text">2. Konu</h2>
        <p>
          İşbu sözleşme, <strong>veralteneketicaret.com</strong> üzerinden sunulan ürün ve hizmetlerin elektronik ortamda
          sipariş edilmesi ve teslimine ilişkin usul ve esasları düzenler.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-atl-text">3. Cayma hakkı</h2>
        <p>
          Alıcı, teslimden itibaren 14 gün içinde cayma hakkını kullanabilir. Kişiye özel üretilmiş ürünler bu haktan istisnadır.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-atl-text">4. Uyuşmazlık</h2>
        <p>
          Uyuşmazlıklarda <strong>İzmir</strong> Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri yetkilidir.
        </p>
      </section>
    </LegalPageLayout>
  );
}

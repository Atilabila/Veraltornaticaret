import { LegalPageLayout } from "@/components/layout/LegalPageLayout";

export default function OnBilgilendirmePage() {
  return (
    <LegalPageLayout title="Ön Bilgilendirme Formu" eyebrow="Sipariş öncesi bilgilendirme" updatedAt="[GG.AA.YYYY]">
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-[#161616]">1. Satıcı bilgileri</h2>
        <p>[Şirket unvanı] — MERSİS: [MERSİS no] — Adres: [Şirket adresi] — [Telefon] / [E-posta]</p>
      </section>
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-[#161616]">2. Ürün / hizmet</h2>
        <p>Fiyat, vergi, kargo ve teslimat süresi sipariş ekranında gösterilir.</p>
      </section>
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-[#161616]">3. Cayma hakkı</h2>
        <p>Teslimden itibaren 14 gün. Kişiye özel üretim istisnadır.</p>
      </section>
    </LegalPageLayout>
  );
}

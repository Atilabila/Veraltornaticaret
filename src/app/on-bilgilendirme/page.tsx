import type { Metadata } from "next";
import { absUrl } from "@/lib/site";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";

export const metadata: Metadata = {
  title: "Ön Bilgilendirme Formu",
  robots: { index: false, follow: false },
  alternates: { canonical: absUrl("/on-bilgilendirme") },
};

export default function OnBilgilendirmePage() {
  return (
    <LegalPageLayout title="Ön Bilgilendirme Formu" eyebrow="Sipariş öncesi bilgilendirme" updatedAt="16.11.2026">
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-atl-text">1. Satıcı bilgileri</h2>
        <p>Veral Torna &amp; Teneke Ticaret — 1471 Sokak No:12/A, Alsancak / İzmir — 0507 165 13 15 / veraltornatic@hotmail.com</p>
      </section>
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-atl-text">2. Ürün / hizmet</h2>
        <p>Fiyat, vergi, kargo ve teslimat süresi sipariş ekranında gösterilir.</p>
      </section>
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-atl-text">3. Cayma hakkı</h2>
        <p>Teslimden itibaren 14 gün. Kişiye özel üretim istisnadır.</p>
      </section>
    </LegalPageLayout>
  );
}

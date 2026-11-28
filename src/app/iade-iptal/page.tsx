import type { Metadata } from "next";
import { absUrl } from "@/lib/site";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";

export const metadata: Metadata = {
  title: "İptal ve İade Koşulları",
  robots: { index: false, follow: false },
  alternates: { canonical: absUrl("/iade-iptal") },
};

export default function IadeIptalPage() {
  return (
    <LegalPageLayout title="İptal ve İade Koşulları" eyebrow="Tüketici hakları" updatedAt="16.11.2026">
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-atl-text">1. Cayma hakkı</h2>
        <p>Teslimden itibaren 14 gün içinde cayma hakkı kullanılabilir. Ürün kullanılmamış ve yeniden satılabilir olmalıdır.</p>
      </section>
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-atl-text">2. İstisnalar</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Kişiye özel üretim</li>
          <li>Ambalajı açılmış hijyen ürünleri</li>
        </ul>
      </section>
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-atl-text">3. İade süreci</h2>
        <p>İade talebi: veraltornatic@hotmail.com. Onay sonrası ürün kontrol edilir; uygunsa en geç 14 gün içinde iade yapılır.</p>
      </section>
    </LegalPageLayout>
  );
}

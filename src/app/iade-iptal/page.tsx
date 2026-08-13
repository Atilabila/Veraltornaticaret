import { LegalPageLayout } from "@/components/layout/LegalPageLayout";

export default function IadeIptalPage() {
  return (
    <LegalPageLayout title="İptal ve İade Koşulları" eyebrow="Tüketici hakları" updatedAt="[GG.AA.YYYY]">
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-[#161616]">1. Cayma hakkı</h2>
        <p>Teslimden itibaren 14 gün içinde cayma hakkı kullanılabilir. Ürün kullanılmamış ve yeniden satılabilir olmalıdır.</p>
      </section>
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-[#161616]">2. İstisnalar</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Kişiye özel üretim</li>
          <li>Ambalajı açılmış hijyen ürünleri</li>
        </ul>
      </section>
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-[#161616]">3. İade süreci</h2>
        <p>İade talebi: [Destek e-posta]. Onay sonrası ürün kontrol edilir; uygunsa en geç 14 gün içinde iade yapılır.</p>
      </section>
    </LegalPageLayout>
  );
}

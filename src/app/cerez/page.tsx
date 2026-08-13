import { LegalPageLayout } from "@/components/layout/LegalPageLayout";

export default function CerezPolitikasiPage() {
  return (
    <LegalPageLayout title="Çerez Politikası" eyebrow="Çerez ve benzeri teknolojiler" updatedAt="[GG.AA.YYYY]">
      <section className="space-y-2">
        <h2 className="text-lg font-bold text-[#161616]">1. Amaç</h2>
        <p>
          Bu politika, <strong>[Şirket unvanı]</strong> tarafından işletilen <strong>[Alan adı]</strong> adresinde
          çerezlerin nasıl kullanıldığını açıklar.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-[#161616]">2. Çerez türleri</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Zorunlu çerezler: oturum ve sepet</li>
          <li>Analitik çerezler: kullanım istatistikleri</li>
          <li>İşlevsel çerezler: tercihlerin hatırlanması</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-[#161616]">3. Yönetim</h2>
        <p>Tarayıcı ayarlarından çerezleri silebilir veya engelleyebilirsiniz. Zorunlu çerezler kapatılırsa bazı işlevler çalışmayabilir.</p>
      </section>
    </LegalPageLayout>
  );
}

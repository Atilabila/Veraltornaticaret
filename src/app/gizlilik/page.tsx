import { LegalPageLayout } from "@/components/layout/LegalPageLayout";

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Gizlilik Politikası" eyebrow="Kişisel veriler" updatedAt="[GG.AA.YYYY]">
      <p>
        Bu Gizlilik Politikası, <strong>[Şirket unvanı]</strong> tarafından işletilen{" "}
        <strong>[Alan adı]</strong> sitesinde kişisel verilerinizin nasıl işlendiğini açıklar.
      </p>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#161616]">1. Veri sorumlusu</h2>
        <p>
          Veri sorumlusu: <strong>[Şirket unvanı]</strong>
          <span className="block">Adres: [Şirket adresi]</span>
          <span className="block">MERSİS: [MERSİS no]</span>
          <span className="block">İletişim: [E-posta] / [Telefon]</span>
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#161616]">2. İşlenen veriler</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Kimlik ve iletişim bilgileri</li>
          <li>Sipariş, sepet ve talep kayıtları</li>
          <li>Teknik veriler (IP, çerez, oturum kayıtları)</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#161616]">3. İşleme amaçları</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Sözleşme kurulması ve ifası</li>
          <li>Müşteri hizmetleri ve destek</li>
          <li>Yasal yükümlülüklerin yerine getirilmesi</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#161616]">4. Haklarınız</h2>
        <p>
          KVKK m.11 kapsamındaki haklarınızı kullanmak için{" "}
          <strong>[KVKK başvuru e-postası]</strong> adresine başvurabilirsiniz.
        </p>
      </section>
    </LegalPageLayout>
  );
}

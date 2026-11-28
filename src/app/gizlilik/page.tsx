import type { Metadata } from "next";
import { absUrl } from "@/lib/site";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  alternates: { canonical: absUrl("/gizlilik") },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Gizlilik Politikası" eyebrow="Kişisel veriler" updatedAt="16.11.2026">
      <p>
        Bu Gizlilik Politikası, <strong>Veral Torna &amp; Teneke Ticaret</strong> tarafından işletilen{" "}
        <strong>veralteneketicaret.com</strong> sitesinde kişisel verilerinizin nasıl işlendiğini açıklar.
      </p>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-atl-text">1. Veri sorumlusu</h2>
        <p>
          Veri sorumlusu: <strong>Veral Torna &amp; Teneke Ticaret</strong>
          <span className="block">Adres: 1471 Sokak No:12/A, Alsancak / İzmir</span>
          <span className="block">İletişim: veraltornatic@hotmail.com / 0507 165 13 15</span>
          <span className="block">Vergi kimliği fatura üzerinde yazılıdır.</span>
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-atl-text">2. İşlenen veriler</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Kimlik ve iletişim bilgileri</li>
          <li>Sipariş, sepet ve talep kayıtları</li>
          <li>Teknik veriler (IP, çerez, oturum kayıtları)</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-atl-text">3. İşleme amaçları</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Sözleşme kurulması ve ifası</li>
          <li>Müşteri hizmetleri ve destek</li>
          <li>Yasal yükümlülüklerin yerine getirilmesi</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-atl-text">4. Haklarınız</h2>
        <p>
          KVKK m.11 kapsamındaki haklarınızı kullanmak için{" "}
          <strong>veraltornatic@hotmail.com</strong> adresine başvurabilirsiniz.
        </p>
      </section>
    </LegalPageLayout>
  );
}

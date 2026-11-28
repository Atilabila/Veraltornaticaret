import type { Metadata } from "next";
import { absUrl } from "@/lib/site";
import { LegalPageLayout } from "@/components/layout/LegalPageLayout";

export const metadata: Metadata = {
    title: "KVKK Aydınlatma Metni",
    alternates: { canonical: absUrl("/kvkk") },
};

export default function KvkkPage() {
    return (
        <LegalPageLayout title="KVKK Aydınlatma Metni" eyebrow="Veri güvenliği">
            <section className="bg-atl-surface border border-atl-line p-6 space-y-4">
                <h2 className="text-lg font-bold text-atl-text">1. Veri sorumlusu</h2>
                <p>
                    6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca kişisel verileriniz; veri sorumlusu olarak
                    <strong> Veral Torna &amp; Teneke Ticaret</strong> tarafından aşağıda açıklanan kapsamda işlenebilir.
                </p>
                <div className="space-y-1">
                    <p>Adres: 1471 Sokak No:12/A, Alsancak / İzmir</p>
                    <p>İletişim: veraltornatic@hotmail.com / 0507 165 13 15</p>
                    <p>Vergi kimliği fatura üzerinde yazılıdır.</p>
                </div>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-atl-text border-l-4 border-[var(--color-brand-accent)] pl-4">2. İşleme amacı</h2>
                <p>
                    Toplanan kişisel verileriniz; ürün ve hizmetlerin sunulması, sipariş ve teslimat süreçlerinin yürütülmesi,
                    müşteri ilişkileri yönetimi ve yasal yükümlülüklerin yerine getirilmesi amaçlarıyla işlenmektedir.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-atl-text border-l-4 border-[var(--color-brand-accent)] pl-4">3. Aktarım</h2>
                <p>
                    Kişisel verileriniz; iş ortakları, lojistik firmaları ve kanunen yetkili mercilerle, KVKK&apos;nın 8. ve 9. maddelerinde
                    öngörülen şartlar çerçevesinde paylaşılabilir.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-atl-text border-l-4 border-[var(--color-brand-accent)] pl-4">4. Toplama yöntemi</h2>
                <p>
                    Verileriniz web sitesi, e-posta, telefon ve fiziki kanallar aracılığıyla; sözleşmenin kurulması ve ifası,
                    hukuki yükümlülük ve meşru menfaat hukuki sebeplerine dayanılarak toplanmaktadır.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-atl-text border-l-4 border-[var(--color-brand-accent)] pl-4">5. Haklarınız</h2>
                <p>
                    KVKK m.11 kapsamında verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, düzeltilmesini veya
                    silinmesini isteme haklarına sahipsiniz. Başvurularınızı yazılı olarak iletebilirsiniz.
                </p>
            </section>
        </LegalPageLayout>
    );
}

import { LegalPageLayout } from "@/components/layout/LegalPageLayout";

export default function KvkkPage() {
    return (
        <LegalPageLayout title="KVKK Aydınlatma Metni" eyebrow="Veri güvenliği">
            <section className="bg-white border border-[#c6c6c6] p-6 space-y-4">
                <h2 className="text-lg font-bold text-[#161616]">1. Veri sorumlusu</h2>
                <p>
                    6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca kişisel verileriniz; veri sorumlusu olarak
                    <strong> [Şirket unvanı]</strong> tarafından aşağıda açıklanan kapsamda işlenebilir.
                </p>
                <div className="text-sm space-y-1">
                    <p>Adres: [Şirket adresi]</p>
                    <p>MERSİS / Vergi No: [MERSİS no]</p>
                    <p>İletişim: [E-posta] / [Telefon]</p>
                </div>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-[#161616] border-l-4 border-[var(--color-brand-accent)] pl-4">2. İşleme amacı</h2>
                <p>
                    Toplanan kişisel verileriniz; ürün ve hizmetlerin sunulması, sipariş ve teslimat süreçlerinin yürütülmesi,
                    müşteri ilişkileri yönetimi ve yasal yükümlülüklerin yerine getirilmesi amaçlarıyla işlenmektedir.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-[#161616] border-l-4 border-[var(--color-brand-accent)] pl-4">3. Aktarım</h2>
                <p>
                    Kişisel verileriniz; iş ortakları, lojistik firmaları ve kanunen yetkili mercilerle, KVKK&apos;nın 8. ve 9. maddelerinde
                    öngörülen şartlar çerçevesinde paylaşılabilir.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-[#161616] border-l-4 border-[var(--color-brand-accent)] pl-4">4. Toplama yöntemi</h2>
                <p>
                    Verileriniz web sitesi, e-posta, telefon ve fiziki kanallar aracılığıyla; sözleşmenin kurulması ve ifası,
                    hukuki yükümlülük ve meşru menfaat hukuki sebeplerine dayanılarak toplanmaktadır.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-[#161616] border-l-4 border-[var(--color-brand-accent)] pl-4">5. Haklarınız</h2>
                <p>
                    KVKK m.11 kapsamında verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, düzeltilmesini veya
                    silinmesini isteme haklarına sahipsiniz. Başvurularınızı yazılı olarak iletebilirsiniz.
                </p>
            </section>
        </LegalPageLayout>
    );
}

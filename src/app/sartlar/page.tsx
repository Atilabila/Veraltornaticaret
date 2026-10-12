import { LegalPageLayout } from "@/components/layout/LegalPageLayout";

export default function SartlarPage() {
    return (
        <LegalPageLayout title="Kullanım Şartları" eyebrow="Hukuki metin" updatedAt="3 Şubat 2026">
            <section className="space-y-3">
                <h2 className="text-lg font-bold text-atl-text">1. Taraflar ve kabul</h2>
                <p>
                    İşbu Kullanım Şartları, <strong>[Şirket unvanı]</strong> tarafından işletilen web sitesi ve e-ticaret
                    platformunun kullanımına ilişkin kuralları belirler. Siteyi kullanan herkes bu şartları kabul etmiş sayılır.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-atl-text">2. Hizmet kapsamı</h2>
                <p>
                    Şirket, endüstriyel metal imalat ve ilgili ürün/hizmetler sunar. Fiyat, stok ve teknik bilgiler önceden
                    haber verilmeksizin güncellenebilir.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-atl-text">3. Fikri mülkiyet</h2>
                <p>
                    Sitedeki tasarım, metin ve görseller şirket mülkiyetindedir. Yazılı izin olmadan ticari kullanım yasaktır.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-atl-text">4. Sipariş ve ödeme</h2>
                <p>
                    Siparişler ödeme onayı sonrası işleme alınır. Özel üretim siparişlerde onaylanan tasarım esas alınır.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-atl-text">5. Teslimat</h2>
                <p>
                    Kargo hasarında alıcının kurye önünde tutanak tutması gerekir. Aksi halde sorumluluk alıcıya geçer.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-atl-text">6. Uyuşmazlık</h2>
                <p>
                    İhtilaflarda <strong>[Şehir]</strong> mahkemeleri yetkilidir. Destek: <strong>[Destek e-posta]</strong>
                </p>
            </section>

            <div className="bg-atl-bg border border-atl-line p-5 text-xs text-atl-muted leading-relaxed">
                Bu siteyi kullanarak Mesafeli Satış Sözleşmesi ve İptal/İade koşullarını da kabul etmiş sayılırsınız.
                Özel üretim ürünlerde kusur olmadıkça cayma hakkı kullanılamayabilir.
            </div>
        </LegalPageLayout>
    );
}

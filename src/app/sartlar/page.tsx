import { LegalPageLayout } from "@/components/layout/LegalPageLayout";

export default function SartlarPage() {
    return (
        <LegalPageLayout title="Kullanım Şartları" eyebrow="Hukuki metin" updatedAt="3 Şubat 2026">
            <section className="space-y-3">
                <h2 className="text-lg font-bold text-[#161616]">1. Taraflar ve kabul</h2>
                <p>
                    İşbu Kullanım Şartları, <strong>[Şirket unvanı]</strong> tarafından işletilen web sitesi ve e-ticaret
                    platformunun kullanımına ilişkin kuralları belirler. Siteyi kullanan herkes bu şartları kabul etmiş sayılır.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-[#161616]">2. Hizmet kapsamı</h2>
                <p>
                    Şirket, endüstriyel metal imalat ve ilgili ürün/hizmetler sunar. Fiyat, stok ve teknik bilgiler önceden
                    haber verilmeksizin güncellenebilir.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-[#161616]">3. Fikri mülkiyet</h2>
                <p>
                    Sitedeki tasarım, metin ve görseller şirket mülkiyetindedir. Yazılı izin olmadan ticari kullanım yasaktır.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-[#161616]">4. Sipariş ve ödeme</h2>
                <p>
                    Siparişler ödeme onayı sonrası işleme alınır. Özel üretim siparişlerde onaylanan tasarım esas alınır.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-[#161616]">5. Teslimat</h2>
                <p>
                    Kargo hasarında alıcının kurye önünde tutanak tutması gerekir. Aksi halde sorumluluk alıcıya geçer.
                </p>
            </section>

            <section className="space-y-3">
                <h2 className="text-lg font-bold text-[#161616]">6. Uyuşmazlık</h2>
                <p>
                    İhtilaflarda <strong>[Şehir]</strong> mahkemeleri yetkilidir. Destek: <strong>[Destek e-posta]</strong>
                </p>
            </section>

            <div className="bg-[#f4f4f4] border border-[#c6c6c6] p-5 text-xs text-[#525252] leading-relaxed">
                Bu siteyi kullanarak Mesafeli Satış Sözleşmesi ve İptal/İade koşullarını da kabul etmiş sayılırsınız.
                Özel üretim ürünlerde kusur olmadıkça cayma hakkı kullanılamayabilir.
            </div>
        </LegalPageLayout>
    );
}

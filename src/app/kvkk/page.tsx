import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { SystemLabel } from "@/components/ui/Industrial";

export default function KvkkPage() {
    return (
        <main className="min-h-screen bg-[#0A0A0A] text-white">
            <Navigation />

            <div className="container mx-auto px-6 pt-48 pb-24 max-w-4xl">
                <div className="flex flex-col gap-6 mb-16">
                    <SystemLabel text="HUKUKİ PROTOKOL // VERİ GÜVENLİĞİ" active />
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none">
                        KVKK <span className="text-gold-gradient normal-case italic font-serif font-normal tracking-normal border-b-4 border-[#D4AF37]/30">Aydınlatma Metni</span>
                    </h1>
                </div>

                <div className="prose prose-invert prose-slate max-w-none space-y-12 text-white/70 font-medium leading-relaxed">
                    <section className="bg-white/5 border border-white/10 p-10 rounded-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                        <h2 className="text-2xl font-black text-white uppercase mb-6 relative z-10 italic tracking-tighter">1. Veri Sorumlusu</h2>
                        <p className="relative z-10">
                            6698 sayılı Kişisel Verilerin Korunması Kanunu (“Kanun”) uyarınca, kişisel verileriniz; veri sorumlusu olarak <strong>[ŞİRKET UNVANI]</strong> (“Şirket”) tarafından aşağıda açıklanan kapsamda işlenebilecektir.
                        </p>
                        <div className="mt-4 text-sm text-white/80 space-y-1 relative z-10">
                            <p>Adres: [ŞİRKET ADRESİ]</p>
                            <p>MERSİS / Vergi No: [MERSİS NO]</p>
                            <p>İletişim: [E-POSTA] / [TELEFON]</p>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter border-l-4 border-[#D4AF37] pl-4">2. Kişisel Verilerin İşlenme Amacı</h2>
                        <p>
                            Toplanan kişisel verileriniz, Kanun’un 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları dahilinde; Şirketimiz tarafından sunulan ürün ve hizmetlerden sizleri faydalandırmak için gerekli çalışmaların iş birimlerimiz tarafından yapılması, ürün ve hizmetlerimizin beğeni, kullanım alışkanlıkları ve ihtiyaçlarınıza göre özelleştirilerek sizlere önerilmesi, Şirketimizin ve Şirketimizle iş ilişkisi içerisinde olan kişilerin hukuki ve ticari güvenliğinin temini amaçlarıyla işlenmektedir.
                        </p>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter border-l-4 border-[#D4AF37] pl-4">3. İşlenen Kişisel Verilerin Aktarımı</h2>
                        <p>
                            Kişisel verileriniz; yukarıda belirtilen amaçların gerçekleştirilmesi doğrultusunda; iş ortaklarımıza, tedarikçilerimize, kanunen yetkili kamu kurumlarına ve özel kişilere Kanun’un 8. ve 9. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları çerçevesinde aktarılabilecektir.
                        </p>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter border-l-4 border-[#D4AF37] pl-4">4. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi</h2>
                        <p>
                            Kişisel verileriniz Şirketimiz tarafından internet sitemiz, mobil uygulamalarımız, çağrı merkezimiz veya fiziki kanallar gibi farklı kanallarla; Kanun’un 5. ve 6. maddelerinde belirtilen hukuki sebeplere dayanarak toplanmaktadır. Bu süreçte toplanan kişisel verileriniz, ticari faaliyetlerimizin yürütülmesi ve yasal yükümlülüklerimizin yerine getirilmesi amacıyla işlenmektedir.
                        </p>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter border-l-4 border-[#D4AF37] pl-4">5. İlgili Kişinin Hakları</h2>
                        <p>
                            Kanun’un 11. maddesi uyarınca, kişisel veri sahibi olarak; verilerinizin işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını ve buna uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme gibi haklara sahipsiniz. Bu haklarınızı kullanmak için Şirketimize yazılı olarak başvurabilirsiniz.
                        </p>
                    </section>
                </div>
            </div>

            <Footer />
        </main>
    );
}

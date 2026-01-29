import React from "react";
import Link from "next/link";
import { Lock, Shield, Eye, Database } from "lucide-react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { SystemLabel } from "@/components/ui/Industrial";

export default function GizlilikPage() {
    return (
        <main className="min-h-screen bg-[#0A0A0A] text-white">
            <Navigation />

            <div className="container mx-auto px-6 pt-48 pb-24 max-w-4xl">
                <div className="flex flex-col gap-6 mb-16">
                    <SystemLabel text="GÜVENLİK PROTOKOLÜ // PRIVACY" active />
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none">
                        Gizlilik <span className="text-gold-gradient normal-case italic font-serif font-normal tracking-normal border-b-4 border-[#D4AF37]/30">Politikası</span>
                    </h1>
                </div>

                <div className="space-y-12 text-white/70 font-medium leading-relaxed">
                    {/* Security Layer */}
                    <section className="bg-white/5 border border-white/10 p-10 rounded-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                        <h2 className="text-2xl font-black text-white uppercase mb-6 relative z-10 italic tracking-tighter flex items-center gap-3">
                            <Lock className="w-6 h-6 text-[#D4AF37]" /> SSL ve Ödeme Güvenliği
                        </h2>
                        <p className="relative z-10">
                            Veral Torna & Teneke üzerinden gerçekleştirdiğiniz tüm işlemler emniyet altındadır. Ödeme aşamasında girilen kredi kartı bilgileri, <strong>256-bit SSL (Secure Sockets Layer)</strong> teknolojisi ile şifrelenerek doğrudan ilgili bankanın sistemine iletilir. Şirketimiz bünyesinde kredi kartı verileri kesinlikle depolanmaz ve personelimiz dahil üçüncü şahıslar tarafından erişilemez.
                        </p>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter border-l-4 border-[#D4AF37] pl-4 flex items-center gap-3">
                            <Database className="w-6 h-6" /> Bilgi Toplama Kapsamı
                        </h2>
                        <p>
                            Siparişlerinizin lojistik süreçlerini yönetmek, faturalandırma işlemlerini tamamlamak ve teknik destek sağlamak amacıyla; ad-soyad, teslimat adresi, iletişim numarası ve e-posta adresi gibi temel verileri topluyoruz. Bu veriler, hizmet kalitemizi artırmak ve yasal yükümlülüklerimizi yerine getirmek dışında kullanılmaz.
                        </p>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter border-l-4 border-[#D4AF37] pl-4 flex items-center gap-3">
                            <Eye className="w-6 h-6" /> Çerez (Cookie) Kullanımı
                        </h2>
                        <p>
                            İnternet sitemizde, kullanıcı deneyimini kişiselleştirmek ve site trafiğini analiz etmek amacıyla tanımlama bilgileri (çerezler) kullanılmaktadır. Çerezler, tarayıcınız aracılığıyla cihazınıza yerleştirilen küçük veri dosyalarıdır. Tarayıcı ayarlarınızdan çerez kullanımını kısıtlayabilirsiniz, ancak bu durum bazı site fonksiyonlarının çalışmasını engelleyebilir.
                        </p>
                    </section>

                    <section className="bg-[#111111] border border-white/5 p-10 rounded-2xl">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-6">Üçüncü Şahıslarla Paylaşım</h2>
                        <p>
                            Toplanan kişisel veriler, yalnızca siparişin teslimatı amacıyla kargo firmalarıyla ve yasal bir zorunluluk doğması halinde resmi makamlarla paylaşılır. Verileriniz hiçbir koşulda reklam veya pazarlama amacıyla başka kurum/kuruluşlara satılmaz veya devredilmez.
                        </p>
                    </section>
                </div>

                <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Son Güncelleme: 29 Ocak 2026</p>
                    <Link href="/kvkk" className="text-xs font-black text-[#D4AF37] uppercase tracking-widest hover:text-white transition-colors">
                        KVKK AYDINLATMA METNİ
                    </Link>
                </div>
            </div>

            <Footer />
        </main>
    );
}

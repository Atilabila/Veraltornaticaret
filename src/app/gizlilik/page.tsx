import React from "react";
import Link from "next/link";
import { ArrowLeft, Lock, Shield, Eye, Database } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GizlilikPage() {
    return (
        <main className="min-h-screen bg-background pt-32 pb-20">
            <div className="container max-w-4xl mx-auto px-6">

                {/* Header */}
                <div className="mb-12">
                    <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors group">
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Ana Sayfaya Dön
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Lock className="w-6 h-6 text-primary" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-zinc-900">
                            Gizlilik Politikası
                        </h1>
                    </div>
                    <p className="text-zinc-500 text-lg max-w-2xl">
                        Veral Torna & Teneke Ticaret olarak, kişisel verilerinizin güvenliğine en üst düzeyde önem veriyoruz.
                    </p>
                </div>

                {/* Content */}
                <div className="space-y-12">

                    {/* Section 1 */}
                    <section className="bg-white border border-zinc-200 p-8 rounded-2xl shadow-sm">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-zinc-900">
                            <Shield className="w-5 h-5 text-zinc-500" />
                            Veri Güvenliği
                        </h2>
                        <p className="text-zinc-600 leading-relaxed mb-4">
                            Sitemiz üzerinden gerçekleştirdiğiniz işlemlerde girmiş olduğunuz kredi kartı bilgileri, 256-bit SSL sertifikası ile şifrelenerek doğrudan bankaya iletilir. <span className="font-bold text-zinc-900">Kredi kartı bilgileriniz sistemimizde kesinlikle saklanmaz.</span>
                        </p>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <h2 className="text-xl font-bold mb-4 text-zinc-900 flex items-center gap-2">
                            <Database className="w-5 h-5 text-zinc-500" />
                            Hangi Verileri Topluyoruz?
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-200">
                                <h3 className="font-bold text-zinc-900 mb-2">Zorunlu Veriler</h3>
                                <p className="text-sm text-zinc-600">Siparişin size ulaşabilmesi için gerekli olan ad, soyad, adres, telefon ve fatura bilgilerini topluyoruz.</p>
                            </div>
                            <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-200">
                                <h3 className="font-bold text-zinc-900 mb-2">Çerezler (Cookies)</h3>
                                <p className="text-sm text-zinc-600">Size daha iyi bir alışveriş deneyimi sunmak, sepetinizi hatırlamak ve site performansını ölçmek için çerezler kullanıyoruz.</p>
                            </div>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <h2 className="text-xl font-bold mb-4 text-zinc-900 flex items-center gap-2">
                            <Eye className="w-5 h-5 text-zinc-500" />
                            Verilerin Kullanımı ve Paylaşımı
                        </h2>
                        <p className="text-zinc-600 leading-relaxed mb-4">
                            Kişisel verileriniz; siparişlerin işlenmesi, teslimatı, faturalandırılması ve müşteri hizmetleri desteği sağlamak amacıyla kullanılır. Yasal zorunluluklar haricinde, verileriniz üçüncü şahıslarla asla paylaşılmaz ve ticari amaçla satılmaz.
                        </p>
                    </section>

                    {/* Section 4 KVKK Info */}
                    <section className="bg-zinc-900 text-zinc-300 p-8 rounded-2xl">
                        <h2 className="text-xl font-bold mb-4 text-white">KVKK Kapsamında Haklarınız</h2>
                        <p className="leading-relaxed mb-4">
                            6698 sayılı Kişisel Verilerin Korunması Kanunu uyarınca, dilediğiniz zaman bizimle iletişime geçerek:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 marker:text-primary">
                            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
                            <li>İşlenmişse buna ilişkin bilgi talep etme,</li>
                            <li>Verilerinizin silinmesini veya yok edilmesini isteme</li>
                        </ul>
                        <p className="mt-6">
                            Hakkına sahipsiniz.
                        </p>
                    </section>

                </div>

                {/* Footer Actions */}
                <div className="mt-20 pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs text-zinc-400">Son Güncelleme: 27 Ocak 2026</p>
                    <Link href="/kvkk">
                        <Button variant="outline">
                            KVKK Aydınlatma Metni
                        </Button>
                    </Link>
                </div>

            </div>
        </main>
    )
}

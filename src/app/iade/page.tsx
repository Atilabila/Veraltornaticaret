import React from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw, ShieldCheck, Mail, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function IadePage() {
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
                            <RefreshCw className="w-6 h-6 text-primary" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-zinc-900">
                            İade ve Değişim Politikası
                        </h1>
                    </div>
                    <p className="text-zinc-500 text-lg max-w-2xl">
                        Müşteri memnuniyeti bizim önceliğimizdir. Satın aldığınız ürünlerden tamamen memnun kalmanız için adil ve şeffaf bir iade süreci sunuyoruz.
                    </p>
                </div>

                {/* Content */}
                <div className="space-y-12">

                    {/* Section 1 */}
                    <section className="bg-white border border-zinc-200 p-8 rounded-2xl shadow-sm">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-zinc-900">
                            <span className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-xs">01</span>
                            İade Şartları
                        </h2>
                        <ul className="space-y-4 text-zinc-600 list-disc pl-5 marker:text-primary">
                            <li>İade süresi, siparişinizin teslim edildiği tarihten itibaren <span className="font-bold text-zinc-900">14 gündür.</span></li>
                            <li>Ürünlerin kullanılmamış, hasar görmemiş ve orijinal ambalajında olması gerekmektedir.</li>
                            <li>Montajı yapılmış (duvara asılmış, bantları sökülmüş) ürünlerin iadesi, ürün tekrar satılabilir özelliğini yitirdiği için kabul edilmemektedir.</li>
                            <li>Kişiye özel üretilen (custom) ürünlerde, üretim hatası olmadığı sürece iade kabul edilmemektedir.</li>
                        </ul>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <h2 className="text-xl font-bold mb-4 text-zinc-900">2. İade Süreci Nasıl İşler?</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-200">
                                <div className="w-10 h-10 bg-white rounded-lg border border-zinc-200 flex items-center justify-center mb-4 font-bold text-primary">1</div>
                                <h3 className="font-bold text-zinc-900 mb-2">Talep Oluşturun</h3>
                                <p className="text-sm text-zinc-600">destek@veral.com.tr adresine sipariş numaranızla birlikte iade talebinizi iletin.</p>
                            </div>
                            <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-200">
                                <div className="w-10 h-10 bg-white rounded-lg border border-zinc-200 flex items-center justify-center mb-4 font-bold text-primary">2</div>
                                <h3 className="font-bold text-zinc-900 mb-2">Kargolayın</h3>
                                <p className="text-sm text-zinc-600">Size vereceğimiz anlaşmalı kargo kodu ile ürünü ücretsiz olarak bize gönderin.</p>
                            </div>
                            <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-200">
                                <div className="w-10 h-10 bg-white rounded-lg border border-zinc-200 flex items-center justify-center mb-4 font-bold text-primary">3</div>
                                <h3 className="font-bold text-zinc-900 mb-2">Ücret İadesi</h3>
                                <p className="text-sm text-zinc-600">Ürün elimize ulaşıp kontroller sağlandıktan sonra 3 iş günü içinde ücretiniz iade edilir.</p>
                            </div>
                        </div>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <h2 className="text-xl font-bold mb-4 text-zinc-900">3. Hasarlı Ürün Durumu</h2>
                        <div className="flex gap-4 p-6 bg-red-50 border border-red-100 rounded-xl">
                            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                            <div>
                                <h3 className="font-bold text-red-900 mb-2">Kargo Hasarları</h3>
                                <p className="text-sm text-red-800 leading-relaxed">
                                    Kargo teslimatı sırasında pakette gözle görülür bir hasar varsa (yırtık, ezik, ıslaklık vb.), lütfen paketi teslim almayınız ve kargo görevlisine <span className="font-bold">Hasar Tespit Tutanağı</span> tutturunuz. Tutanak tutulmayan hasarlı ürünlerin iadesi kabul edilememektedir.
                                </p>
                            </div>
                        </div>
                    </section>

                </div>
                {/* Footer Actions */}
                <div className="mt-20 pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs text-zinc-400">Son Güncelleme: 27 Ocak 2026</p>
                    <Link href="/iletisim">
                        <Button className="gap-2">
                            <Mail className="w-4 h-4" />
                            İade Talebi Oluştur
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    )
}

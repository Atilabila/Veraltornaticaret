"use client"

import React from "react";
import Link from "next/link";
import { ArrowLeft, Scale, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function KosullarPage() {
    return (
        <main className="min-h-screen bg-background pt-32 pb-20">
            <div className="container max-w-4xl mx-auto px-6">

                {/* Header */}
                <div className="mb-12">
                    <Link href="/odeme" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors group">
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Ödeme Sayfasına Dön
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Scale className="w-6 h-6 text-primary" />
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-zinc-900">
                            Mesafeli Satış Sözleşmesi
                        </h1>
                    </div>
                    <p className="text-zinc-500 text-lg max-w-2xl">
                        İşbu sözleşme, alıcı ve satıcı arasındaki hak ve yükümlülükleri, 6502 sayılı Tüketicinin Korunması Hakkında Kanun hükümleri gereğince düzenlemektedir.
                    </p>
                </div>

                {/* Content */}
                <div className="space-y-12">

                    {/* Section 1 */}
                    <section className="bg-white border border-zinc-200 p-8 rounded-2xl shadow-sm">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-zinc-900">
                            <span className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-xs">01</span>
                            Taraflar
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8 text-sm text-zinc-600">
                            <div className="space-y-2">
                                <h3 className="font-bold text-zinc-900 uppercase tracking-wider text-xs">Satıcı Bilgileri</h3>
                                <p><span className="font-medium text-zinc-900">Ünvan:</span> Veral Torna & Teneke Ticaret</p>
                                <p><span className="font-medium text-zinc-900">Adres:</span> Alsancak, İzmir / TÜRKİYE</p>
                                <p><span className="font-medium text-zinc-900">Telefon:</span> 0850 XXX XX XX</p>
                                <p><span className="font-medium text-zinc-900">E-posta:</span> info@metalposter.pro</p>
                                <p><span className="font-medium text-zinc-900">Vergi Dairesi:</span> Kordon V.D.</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-bold text-zinc-900 uppercase tracking-wider text-xs">Alıcı Bilgileri</h3>
                                <p>Sipariş sırasında "Alıcı" tarafından ödeme ve teslimat ekranlarında girilen ad, soyad ve iletişim bilgileri esas alınır.</p>
                            </div>
                        </div>
                    </section>

                    {/* Section 2 */}
                    <section>
                        <h2 className="text-xl font-bold mb-4 text-zinc-900">2. Sözleşmenin Konusu</h2>
                        <p className="text-zinc-600 leading-relaxed">
                            İşbu sözleşmenin konusu, Alıcının, Satıcıya ait web sitesi üzerinden elektronik ortamda siparişini verdiği aşağıda nitelikleri ve satış fiyatı belirtilen ürünün satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmelere Dair Yönetmelik hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.
                        </p>
                    </section>

                    {/* Section 3 */}
                    <section>
                        <h2 className="text-xl font-bold mb-4 text-zinc-900">3. Cayma Hakkı</h2>
                        <div className="bg-zinc-50 p-6 rounded-xl border border-zinc-200 space-y-4">
                            <div className="flex gap-4">
                                <RefreshCw className="w-6 h-6 text-primary flex-shrink-0" />
                                <div>
                                    <h3 className="font-bold text-zinc-900 mb-2">14 Gün İçinde İade</h3>
                                    <p className="text-zinc-600 text-sm leading-relaxed">
                                        Alıcı; mal satışına ilişkin mesafeli sözleşmelerde, ürünün kendisine veya gösterdiği adresteki kişi/kuruluşa teslim tarihinden itibaren 14 (on dört) gün içerisinde, hiçbir hukuki ve cezai sorumluluk üstlenmeksizin ve hiçbir gerekçe göstermeksizin malı reddederek sözleşmeden cayma hakkına sahiptir.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4 border-t border-zinc-200">
                                <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0" />
                                <div>
                                    <h3 className="font-bold text-zinc-900 mb-2">İade Koşulları</h3>
                                    <p className="text-zinc-600 text-sm leading-relaxed">
                                        Cayma hakkının kullanılması için bu süre içinde Satıcıya faks, e-posta veya telefon ile bildirimde bulunulması ve ürünün 6. madde hükümleri çerçevesinde kullanılmamış, ambalajı bozulmamış ve tekrar satılabilir özelliğini yitirmemiş olması şarttır.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section 4 */}
                    <section>
                        <h2 className="text-xl font-bold mb-4 text-zinc-900">4. Genel Hükümler</h2>
                        <ul className="space-y-4 text-zinc-600 list-disc pl-5 marker:text-primary">
                            <li>Alıcı, web sitesinde sözleşme konusu ürünün temel nitelikleri, satış fiyatı ve ödeme şekli ile teslimata ilişkin ön bilgileri okuyup bilgi sahibi olduğunu ve elektronik ortamda gerekli teyidi verdiğini beyan eder.</li>
                            <li>Sözleşme konusu ürün, yasal 30 günlük süreyi aşmamak koşulu ile her bir ürün için Alıcının yerleşim yerinin uzaklığına bağlı olarak internet sitesinde ön bilgiler içinde açıklanan süre zarfında Alıcı veya gösterdiği adresteki kişi/kuruluşa teslim edilir.</li>
                            <li>Ürünün teslimatı sırasında kargo yetkilisi huzurunda kontrol edilmesi, ezik, kırık, ambalajı yırtılmış vb. hasarlı ve ayıplı ürün teslim alınmamalıdır. Teslim alınan ürünün hasarsız ve sağlam olduğu kabul edilecektir.</li>
                        </ul>
                    </section>

                    {/* Section 5 */}
                    <section>
                        <h2 className="text-xl font-bold mb-4 text-zinc-900">5. Uyuşmazlıkların Çözümü</h2>
                        <p className="text-zinc-600 leading-relaxed">
                            İşbu sözleşmenin uygulanmasında, Sanayi ve Ticaret Bakanlığınca ilan edilen değere kadar Tüketici Hakem Heyetleri ile Alıcının veya Satıcının yerleşim yerindeki Tüketici Mahkemeleri yetkilidir.
                        </p>
                    </section>

                </div>

                {/* Footer Actions */}
                <div className="mt-20 pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs text-zinc-400">Son Güncelleme: 27 Ocak 2026</p>
                    <div className="flex gap-4">
                        <Button variant="outline" onClick={() => window.print()}>
                            Sayfayı Yazdır
                        </Button>
                        <Link href="/iletisim">
                            <Button>Bize Ulaşın</Button>
                        </Link>
                    </div>
                </div>

            </div>
        </main>
    );
}

import React from "react";
import Link from "next/link";
import { Scale, ShieldCheck, Truck, RefreshCw, Printer } from "lucide-react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { SystemLabel } from "@/components/ui/Industrial";

export default function KosullarPage() {
    return (
        <main className="min-h-screen bg-[#0A0A0A] text-white">
            <Navigation />

            <div className="container mx-auto px-6 pt-48 pb-24 max-w-4xl">
                <div className="flex flex-col gap-6 mb-16">
                    <SystemLabel text="HUKUKİ PROTOKOL // E-TİCARET" active />
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none">
                        Mesafeli <span className="text-gold-gradient normal-case italic font-serif font-normal tracking-normal border-b-4 border-[#D4AF37]/30">Satış Sözleşmesi</span>
                    </h1>
                </div>

                <div className="space-y-12 text-white/70 font-medium leading-relaxed">
                    <section className="bg-white/5 border border-white/10 p-10 rounded-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                        <h2 className="text-2xl font-black text-white uppercase mb-6 relative z-10 italic tracking-tighter flex items-center gap-3">
                            <Scale className="w-6 h-6 text-[#D4AF37]" /> 1. Taraflar
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8 relative z-10">
                            <div className="space-y-4">
                                <h3 className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest">SATICI BİLGİLERİ</h3>
                                <div className="text-sm space-y-1">
                                    <p className="text-white font-bold">VERAL Torna & Teneke Ticaret</p>
                                    <p>Alsancak, Konak, İzmir / TÜRKİYE</p>
                                    <p>Destek Hattı: +90 507 165 13 15</p>
                                    <p>E-posta: info@veralteneketicaret.com</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest">ALICI BİLGİLERİ</h3>
                                <p className="text-sm">
                                    Sipariş esnasında sistem kayıtlarına girilen ve fatura detaylarında belirtilen gerçek veya tüzel kişi "Alıcı" olarak kabul edilir.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter border-l-4 border-[#D4AF37] pl-4">2. Sözleşmenin Konusu</h2>
                        <p>
                            İşbu sözleşmenin konusu, Alıcının, Satıcıya ait internet sitesi üzerinden elektronik ortamda siparişini verdiği ürünlerin satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun hükümleri gereğince tarafların hak ve yükümlülüklerinin belirlenmesidir. 1.5mm endüstriyel metal plakalar ve UV baskı teknolojisi ile üretilen ürünlerin teknik hassasiyeti ve lojistik standartları bu sözleşmenin ayrılmaz bir parçasıdır.
                        </p>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter border-l-4 border-[#D4AF37] pl-4">3. Teslimat ve Lojistik Protokolü</h2>
                        <p>
                            Ürünler, yasal 30 günlük süreyi aşmamak kaydıyla, internet sitesinde belirtilen süreler doğrultusunda Alıcının belirttiği adrese güvenli ambalaj içerisinde teslim edilir. Kargo teslimatı sırasında ürünün kontrol edilmesi mecburidir. Hasar görmüş (ezik, bükülmüş, kırık) paketler "Hasar Tespit Tutanağı" tutulmadan teslim alınmamalıdır. Tutanak tutulmayan hasarlı paketlerde Alıcının iade hakkı saklı kalmakla birlikte ispat yükümlülüğü Alıcıya aittir.
                        </p>
                    </section>

                    <section className="bg-white/5 border border-white/10 p-10 rounded-2xl">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-8 flex items-center gap-3">
                            <RefreshCw className="w-6 h-6 text-[#D4AF37]" /> 4. Cayma Hakkı ve İade
                        </h2>
                        <div className="space-y-6 text-sm">
                            <p>
                                <strong>14 Gün Koşulsuz İade:</strong> Alıcı, standart katalog ürünlerinde, teslim tarihinden itibaren 14 gün içerisinde hiçbir gerekçe göstermeksizin cayma hakkını kullanabilir.
                            </p>
                            <p className="text-[#D4AF37] font-bold uppercase tracking-tighter">
                                İstisna: Kişiye özel tasarlanan, üzerine isim, tarih veya özel görsel eklenen "Kişiselleştirilmiş Üretimler"de cayma hakkı kullanılamaz.
                            </p>
                            <p>
                                İade edilecek ürünün orijinal ambalajı, aksesuarları ve faturası ile birlikte, tekrar satışa uygun kondisyonda gönderilmesi gerekmektedir.
                            </p>
                        </div>
                    </section>

                    <section className="space-y-6">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter border-l-4 border-[#D4AF37] pl-4">5. Yetkili Mahkeme</h2>
                        <p>
                            İşbu sözleşmeden doğacak uyuşmazlıklarda, T.C. Ticaret Bakanlığı tarafından her yıl ilan edilen değerlere kadar Tüketici Hakem Heyetleri, bu değerin üzerindeki uyuşmazlıklarda ise İzmir Tüketici Mahkemeleri yetkilidir.
                        </p>
                    </section>
                </div>

                <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Son Güncelleme: 29 Ocak 2026</p>
                    <div className="flex gap-4">
                        <button
                            onClick={() => window.print()}
                            className="flex items-center gap-2 text-xs font-black text-white/40 hover:text-white uppercase tracking-widest transition-colors"
                        >
                            <Printer className="w-4 h-4" /> SAYFAYI YAZDIR
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}

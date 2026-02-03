"use client";

import React from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

export default function SartlarPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navigation />

            <div className="container mx-auto px-6 py-32 lg:py-48 max-w-4xl">
                <header className="mb-16 border-l-8 border-black pl-8">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic">
                        KULLANIM <span className="text-[var(--color-brand-safety-orange)]">ŞARTLARI</span>
                    </h1>
                    <p className="mt-4 font-mono text-sm font-bold text-gray-500 uppercase tracking-widest">
                        SON GÜNCELLEME: 3 ŞUBAT 2026 // VERSİYON 2.1
                    </p>
                </header>

                <div className="space-y-12 text-gray-800 leading-relaxed font-medium">
                    <section>
                        <h2 className="text-xl font-black uppercase tracking-widest mb-4 flex items-center gap-4">
                            <span className="bg-black text-white px-2 py-1 text-sm font-mono">01</span>
                            TARAFLAR VE KABUL
                        </h2>
                        <p>
                            İşbu Kullanım Şartları ("Sözleşme"), <strong>VERAL Metal Works</strong> (Aşağıda "VERAL" veya "Şirket" olarak anılacaktır) tarafından işletilen web sitesi ve e-ticaret platformunun kullanımına ilişkin kuralları belirler. Siteye erişim sağlayan veya alışveriş yapan her kullanıcı, bu şartları okumuş, anlamış ve kabul etmiş sayılır.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-black uppercase tracking-widest mb-4 flex items-center gap-4">
                            <span className="bg-black text-white px-2 py-1 text-sm font-mono">02</span>
                            HİZMET KAPSAMI VE ÜRETİM
                        </h2>
                        <p>
                            VERAL, endüstriyel metal posterler, teneke kutular ve fason metal üretim hizmetleri sunan bir imalat platformudur. Sitede sergilenen ürünler, stok durumuna veya özel sipariş üzerine üretim periyoduna tabidir. Şirket, ürün fiyatlarında, teknik özelliklerde ve stok bilgilerinde önceden haber vermeksizin değişiklik yapma hakkını saklı tutar.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-black uppercase tracking-widest mb-4 flex items-center gap-4">
                            <span className="bg-black text-white px-2 py-1 text-sm font-mono">03</span>
                            FİKRİ MÜLKİYET HAKLARI
                        </h2>
                        <p>
                            Web sitesinde yer alan tüm tasarımlar, metinler, logolar, grafikler ve kullanılan özel üretim teknikleri VERAL mülkiyetindedir. Yazılı izin olmaksızın site içeriğinin kopyalanması, ticari amaçla kullanılması veya başka platformlarda paylaşılması durumunda hukuki süreç başlatılacaktır.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-black uppercase tracking-widest mb-4 flex items-center gap-4">
                            <span className="bg-black text-white px-2 py-1 text-sm font-mono">04</span>
                            SİPARİŞ VE ÖDEME KOŞULLARI
                        </h2>
                        <p>
                            Verilen siparişler, ödemenin onaylanmasını müteakip işleme alınır. Özel üretim (custom) siparişlerde, müşterinin onayladığı tasarım taslağı esas alınır. Sipariş onayı sonrası yapılacak değişiklikler ek ücrete tabi olabilir. Ödemeler, sunulan güvenli ödeme yöntemleriyle (Kredi Kartı, Havale/EFT) gerçekleştirilir.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-black uppercase tracking-widest mb-4 flex items-center gap-4">
                            <span className="bg-black text-white px-2 py-1 text-sm font-mono">05</span>
                            TESLİMAT VE SORUMLULUK
                        </h2>
                        <p>
                            Ürünler, belirtilen hazırlık süreci sonunda anlaşmalı kargo firmalarına teslim edilir. Kargo esnasında oluşabilecek fiziksel hasarların tespiti için alıcının paketi kurye önünde açması ve hasar tespit tutanağı tutturması zorunludur. Aksi halde VERAL sorumluluk kabul etmez.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-black uppercase tracking-widest mb-4 flex items-center gap-4">
                            <span className="bg-black text-white px-2 py-1 text-sm font-mono">06</span>
                            UYUŞMAZLIKLARIN ÇÖZÜMÜ
                        </h2>
                        <p>
                            Bu sözleşmeden doğacak ihtilaflarda İzmir Mahkemeleri ve İcra Daireleri yetkilidir. Kullanıcılar, her türlü soru ve talepleri için <strong>iletisim@veralmetal.com</strong> veya resmi iletişim numaralarımız üzerinden destek alabilirler.
                        </p>
                    </section>
                </div>

                <div className="mt-20 p-8 bg-gray-50 border-4 border-black font-mono text-xs uppercase tracking-widest leading-loose">
                    DİKKAT: BU SİTEYİ KULLANARAK "MESAFELİ SATIŞ SÖZLEŞMESİ" VE "İPTAL/İADE KOŞULLARI"NI DA KABUL ETMİŞ SAYILIRSINIZ. ÖZEL ÜRETİM ÜRÜNLERDE, KUSUR OLMADIĞI SÜRECE 6502 SAYILI KANUN GEREĞİ CAYMA HAKKI KULLANILAMAZ.
                </div>
            </div>

            <Footer />
        </main>
    );
}

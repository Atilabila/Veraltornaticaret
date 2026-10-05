import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { ArrowRight, HelpCircle, Phone, Sparkles, ShieldCheck, Factory, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
    title: "Sıkça Sorulan Sorular (SSS) | Metal İmalat & Toptan Dosya Teli | Veral Ticaret",
    description: "Toptan dosya teli, takvim tenekesi, giyotin sac kesim ve 4K UV mıknatıslı metal poster imalatı hakkında merak edilen tüm teknik ve ticari sorular: MOQ, termin süreleri, DIN EN 10202 hammadde normları.",
    alternates: {
        canonical: "https://veralteneketicaret.com/sss",
    },
    openGraph: {
        title: "Sıkça Sorulan Sorular | Veral Teneke Ticaret İzmir",
        description: "Metal imalat, toptan üretim ve teknik toleranslar hakkında merak edilen tüm soruların yanıtları.",
        url: "https://veralteneketicaret.com/sss",
    },
};

const faqData = [
    {
        category: "Toptan İmalat & Sipariş",
        question: "Toptan dosya teli siparişlerinde minimum sipariş miktarı (MOQ) nedir?",
        answer: "Standart üretim arşiv tipi dosya tellerinde koli bazlı toptan teslimat yapmaktayız (genellikle 1.000 adetlik paketler ve katları). Özel ebat veya özel nikelaj/polimer kaplama taleplerinde ise makine kalıp ayarları gereği minimum üretim partimiz 10.000 adettir. Günlük 50.000 adet üretim kapasitemizle acil siparişleri aynı gün ambara veya kargoya verebiliyoruz.",
    },
    {
        category: "Toptan İmalat & Sipariş",
        question: "Takvim tenekesi imalatında hangi hammadde ve ebatlar kullanılmaktadır?",
        answer: "0.22 mm ile 0.30 mm arasında değişen yüksek korozyon direncine sahip birinci kalite elektrolitik teneke (ETP) plakalar kullanıyoruz. Özel çift kanallı büküm kalıplarımız sayesinde kağıt veya kuşe takvim kenarlarını kesinlikle yırtmaz veya kesmez. 20 cm'den 100 cm'ye kadar matbaalar için standart askılı/askısız boy kesim yapıyoruz.",
    },
    {
        category: "Teknik Normlar & Malzeme",
        question: "Üretimleriniz hangi metalurji standartlarına (DIN/ISO) uygundur?",
        answer: "Tesislerimizde işlenen tüm elektrolitik teneke (ETP) ve TFS saclar, DIN EN 10202 normlarına tam uyumludur. Rockwell HR 30T sertlik skalasında TH-415 (T-52), TH-520 (T-61) ve TH-550 (T-65) temper derecelerinde hammadde işliyoruz. Her sevkiyat partisi için spektrometrik ve mikrometre ölçüm raporu sunulabilmektedir.",
    },
    {
        category: "Teknik Normlar & Malzeme",
        question: "Fason giyotin kesim ve rulo dilimlemede tolerans aralığınız nedir?",
        answer: "CNC dijital arka dayamalı giyotin makas hatlarımızda 3.000 mm boya ve 0.15 - 3.00 mm kalınlığa kadar ±0.05 mm hassasiyetle çapaksız dik gönyede kesim yapıyoruz. Dairesel bıçaklı rulo sac dilme (slitting) hattımızda ise minimum 8 mm şerit genişliğinde ±0.08 mm tolerans garantisi verilmektedir.",
    },
    {
        category: "UV Metal Poster & Baskı",
        question: "Mıknatıslı metal posterler duvara nasıl asılır? Duvarı delmek gerekir mi?",
        answer: "Kesinlikle matkap, vida veya çivi gerektirmez. Posterlerimizle birlikte gönderilen özel 3M VHB yapışkanlı manyetik koruyucu pedi duvara yapıştırmanız yeterlidir. Yüksek çekim gücüne sahip N35 sınıfı Neodimyum mıknatıs sistemi, 1.5 mm kalınlığındaki metal posterinizi sarsıntısız ve milimetrik olarak tutar. İstediğiniz zaman farklı bir metal posterle saniyeler içinde değiştirebilirsiniz.",
    },
    {
        category: "UV Metal Poster & Baskı",
        question: "Metal posterlerde UV baskı kalitesi nasıldır? Renkler solar mı veya çizilir mi?",
        answer: "Üretim hattımızda 1200x1200 DPI çözünürlüğünde endüstriyel piezoelektrik UV baskı teknolojisi kullanılmaktadır. Baskı anında ultraviyole ışıkla kürlenen özel pigment mürekkepler ve ardından uygulanan koruyucu mat vernik tabakası sayesinde tablolarımız doğrudan güneş ışığına, neme ve çizilmelere karşı 10 yıl renk canlılığı garantilidir.",
    },
    {
        category: "Lojistik & Teslimat",
        question: "Kargo ve teslimat süreci nasıl işlemektedir?",
        answer: "İzmir Alsancak 1471 Sokak'taki üretim merkezimizden çıkan ürünler, Türkiye'nin 81 iline anlaşmalı kargo firmaları veya toptan siparişler için ambar lojistiği ile gönderilir. Standart stoklu ürünler aynı gün veya ertesi iş günü sevk edilirken, özel üretim siparişleri 2-4 iş günü içinde kargoya teslim edilmektedir.",
    },
    {
        category: "Lojistik & Teslimat",
        question: "Hasarlı teslimat veya parça değişim garantiniz var mı?",
        answer: "Tüm kargolarımız özel sertleştirilmiş kraft ambalaj, çemberli palet ve köşe koruyucularla sevk edilir. Kargo kaynaklı herhangi bir eğilme, çizilme veya hasar durumunda, kargo hasar tutanağı dahi aranmaksızın 48 saat içinde yenisi ücretsiz olarak üretilip adresinize ulaştırılır.",
    },
];

export default function SSSPage() {
    const breadcrumbs = [
        { name: "Ana Sayfa", url: "/" },
        { name: "Sıkça Sorulan Sorular", url: "/sss" },
    ];

    return (
        <main className="min-h-screen bg-[#fafafa] text-[#161616]">
            <FAQSchema items={faqData} />
            <Navigation />

            <div className="pt-28 pb-4 px-4 md:px-8 max-w-5xl mx-auto">
                <Breadcrumb items={breadcrumbs} className="text-zinc-600" />
            </div>

            <section className="px-4 md:px-8 max-w-5xl mx-auto pb-20 pt-4">
                <div className="mb-12 text-center sm:text-left">
                    <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-amber-50 text-amber-900 border border-amber-600/20 shadow-sm mb-4">
                        <HelpCircle className="w-3.5 h-3.5 text-amber-700" /> DESTEK & TEKNİK BİLGİ MERKEZİ
                    </span>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 tracking-tight mb-4">
                        Sıkça Sorulan Sorular
                    </h1>
                    <p className="text-base md:text-lg text-zinc-600 max-w-2xl font-normal leading-relaxed">
                        Toptan dosya teli, takvim tenekesi, giyotin sac kesim, rulo dilimleme ve mıknatıslı UV metal poster imalat süreçlerimizle ilgili en çok merak edilen teknik ve ticari konular.
                    </p>
                </div>

                {/* FAQ ACCORDION LIST */}
                <div className="space-y-4 mb-16">
                    {faqData.map((item, index) => (
                        <details
                            key={index}
                            className="group border border-zinc-200 bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-200 hover:border-amber-500 hover:shadow-md"
                        >
                            <summary className="cursor-pointer p-6 font-bold text-zinc-900 list-none flex items-center justify-between gap-4 select-none">
                                <div className="space-y-1">
                                    <span className="text-[11px] font-mono font-bold text-amber-700 uppercase tracking-wider block">
                                        {item.category}
                                    </span>
                                    <span className="text-base sm:text-lg leading-snug">
                                        {item.question}
                                    </span>
                                </div>
                                <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-zinc-100 flex items-center justify-center text-amber-700 font-mono text-lg group-open:rotate-45 transition-transform duration-200 shadow-xs">
                                    +
                                </span>
                            </summary>
                            <div className="px-6 pb-6 text-zinc-600 text-sm sm:text-base leading-relaxed border-t border-zinc-100 pt-4 font-normal">
                                {item.answer}
                            </div>
                        </details>
                    ))}
                </div>

                {/* CALL TO ACTION BOX */}
                <div className="rounded-3xl border border-zinc-200 bg-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                    <div className="space-y-2 text-center md:text-left">
                        <span className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider block">
                            DOĞRUDAN USTA DESTEĞİ
                        </span>
                        <h2 className="text-xl md:text-2xl font-black text-zinc-900 flex items-center gap-2 justify-center md:justify-start">
                            <Sparkles className="w-5 h-5 text-amber-600" /> Başka bir sorunuz veya özel şartnameniz mi var?
                        </h2>
                        <p className="text-sm text-zinc-600 max-w-md">
                            İzmir Alsancak atölyemizdeki imalat uzmanlarımızla doğrudan görüşebilir veya hızlı teklif formumuzu doldurabilirsiniz.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href="/teklif-al"
                            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all hover:scale-105"
                        >
                            <span>Hızlı Teklif Al</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a
                            href="https://wa.me/905323794003"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-zinc-300 hover:bg-zinc-50 text-zinc-900 font-semibold text-xs transition-colors"
                        >
                            <Phone className="w-4 h-4 text-emerald-600" />
                            <span>WhatsApp Usta Hattı</span>
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

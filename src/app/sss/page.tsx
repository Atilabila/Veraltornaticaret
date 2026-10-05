import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { FAQSchema } from "@/components/seo/FAQSchema";
import { ArrowRight, HelpCircle, Phone, Sparkles } from "lucide-react";

export const metadata: Metadata = {
    title: "Sıkça Sorulan Sorular (SSS) | Metal Poster & Toptan İmalat | Veral Ticaret",
    description: "Toptan dosya teli, takvim tenekesi ve 4K UV metal poster imalatı hakkında merak edilenler: Mıknatıslı montaj, minimum sipariş adetleri, kargo ve kalite garantisi.",
    alternates: {
        canonical: "https://veralteneketicaret.com/sss",
    },
    openGraph: {
        title: "Sıkça Sorulan Sorular | Veral Torna & Teneke Ticaret",
        description: "Metal poster ve seri imalat süreçleri hakkında tüm teknik ve ticari sorularınızın yanıtları.",
        url: "https://veralteneketicaret.com/sss",
    },
};

const faqData = [
    {
        question: "Toptan dosya teli siparişlerinde minimum sipariş miktarı (MOQ) nedir?",
        answer: "Standart üretim arşiv tipi dosya tellerinde koli bazlı toptan teslimat yapmaktayız (genellikle 1.000 adet ve katları). Özel ebat veya özel kaplama taleplerinde ise makine kalıp ayarları gereği minimum üretim partisimiz 10.000 adettir. Günlük 50.000 adet üretim kapasitemizle acil siparişleri aynı gün ambara verebiliyoruz.",
    },
    {
        question: "Mıknatıslı metal posterler duvara nasıl asılır? Duvarı delmek gerekir mi?",
        answer: "Kesinlikle duvar delme, matkap veya çivi gerektirmez. Posterlerimizle birlikte gönderilen özel 3M VHB yapışkanlı manyetik koruyucu pedi duvara yapıştırmanız yeterlidir. Yüksek çekim gücüne sahip N35 sınıfı Neodimyum mıknatıs sistemi, 0.5mm kalınlığındaki metal posterinizi sarsıntısız ve milimetrik olarak tutar. İstediğiniz zaman farklı bir metal posterle saniyeler içinde değiştirebilirsiniz.",
    },
    {
        question: "Metal posterlerde UV baskı kalitesi nasıldır? Renkler solar mı veya çizilir mi?",
        answer: "Üretim hattımızda 1200x1200 DPI çözünürlüğünde endüstriyel piezoelektrik UV baskı teknolojisi kullanılmaktadır. Baskı anında ultraviyole ışıkla kürlenen özel pigment mürekkepler ve ardından uygulanan koruyucu mat vernik tabakası sayesinde tablolarımız doğrudan güneş ışığına, neme ve çizilmelere karşı 10 yıl renk canlılığı garantilidir.",
    },
    {
        question: "Takvim tenekesi imalatında hangi hammadde ve ebatlar kullanılmaktadır?",
        answer: "0.22 mm ile 0.30 mm arasında değişen yüksek korozyon direncine sahip birinci kalite elektrolitik teneke (ETP) plakalar kullanıyoruz. Özel büküm kalıplarımız sayesinde kağıt veya kuşe takvim kenarlarını kesinlikle yırtmaz veya kesmez. 20 cm'den 70 cm'ye kadar matbaalar için standart ve özel boy kesimler yapıyoruz.",
    },
    {
        question: "Özel görsel veya kurumsal logo ile kendi metal posterimizi ürettirebilir miyiz?",
        answer: "Evet. Şirketler, tasarımcılar ve bireysel kullanıcılar için kişiye özel (custom) metal poster baskı hizmetimiz mevcuttur. Yüksek çözünürlüklü görselinizi (minimum 300 DPI önerilir) teklif formumuzdan veya doğrudan destek hattımızdan ileterek onaylı prova baskı alabilirsiniz.",
    },
    {
        question: "Kargo ve teslimat süreci nasıl işlemektedir?",
        answer: "İzmir Alsancak'taki üretim merkezimizden çıkan ürünler, Türkiye'nin 81 iline anlaşmalı kargo firmaları veya toptan siparişler için ambar lojistiği ile gönderilir. Standart stoklu ürünler aynı gün veya ertesi iş günü sevk edilirken, özel üretim siparişleri 2-4 iş günü içinde kargoya teslim edilmektedir.",
    },
    {
        question: "Hasarlı teslimat veya iade koşullarınız nelerdir?",
        answer: "Tüm kargolarımız özel sertleştirilmiş kraft ambalaj ve köşe koruyucularla sevk edilir. Nadir de olsa kargo kaynaklı herhangi bir eğilme, çizilme veya hasar durumunda, kargo hasar tutanağı dahi aranmaksızın 48 saat içinde yenisi ücretsiz olarak üretilip adresinize kargolanır.",
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

            <section className="px-4 md:px-8 max-w-5xl mx-auto pb-16">
                <div className="mb-10 text-center sm:text-left">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none text-xs font-mono font-semibold tracking-widest uppercase bg-amber-50 text-amber-700 border border-amber-200 mb-4">
                        <HelpCircle className="w-3.5 h-3.5" /> DESTEK & BİLGİ MERKEZİ
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black text-[#161616] tracking-tight mb-4">
                        Sıkça Sorulan Sorular
                    </h1>
                    <p className="text-base md:text-lg text-zinc-600 max-w-2xl">
                        Toptan dosya teli, takvim tenekesi ve mıknatıslı UV metal poster imalat süreçlerimizle ilgili en çok merak edilen konular.
                    </p>
                </div>

                {/* FAQ ACCORDION LIST */}
                <div className="space-y-4 mb-14">
                    {faqData.map((item, index) => (
                        <details
                            key={index}
                            className="group border border-zinc-200 bg-white rounded-none shadow-sm overflow-hidden transition-colors hover:border-amber-500"
                        >
                            <summary className="cursor-pointer p-5 md:p-6 font-semibold text-[#161616] list-none flex items-center justify-between gap-4 select-none">
                                <span className="text-base md:text-lg leading-snug">{item.question}</span>
                                <span className="flex-shrink-0 w-8 h-8 rounded-none bg-zinc-100 flex items-center justify-center text-amber-700 font-mono text-lg group-open:rotate-45 transition-transform duration-200">
                                    +
                                </span>
                            </summary>
                            <div className="px-5 md:px-6 pb-6 text-zinc-700 text-sm md:text-base leading-relaxed border-t border-zinc-100 pt-4 font-normal">
                                {item.answer}
                            </div>
                        </details>
                    ))}
                </div>

                {/* CALL TO ACTION BOX */}
                <div className="rounded-none border border-zinc-200 bg-white p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                    <div className="space-y-2 text-center md:text-left">
                        <h2 className="text-xl md:text-2xl font-bold text-[#161616] flex items-center gap-2 justify-center md:justify-start">
                            <Sparkles className="w-5 h-5 text-amber-600" /> Başka bir sorunuz mu var?
                        </h2>
                        <p className="text-sm text-zinc-600 max-w-md">
                            İzmir Alsancak atölyemizdeki imalat uzmanlarımızla doğrudan görüşebilir veya hızlı teklif formumuzu doldurabilirsiniz.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href="/teklif-al"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm transition-colors shadow-sm"
                        >
                            Hızlı Teklif Al <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a
                            href="tel:+905323794003"
                            className="inline-flex items-center gap-2 px-5 py-3 border border-zinc-300 hover:bg-zinc-50 text-zinc-800 font-medium text-sm transition-colors"
                        >
                            <Phone className="w-4 h-4 text-amber-600" /> Usta Hattı
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

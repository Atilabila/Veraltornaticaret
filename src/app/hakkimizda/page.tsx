import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { AuthorCard } from "@/components/blog/AuthorCard";
import {
    MapPin,
    Hammer,
    Award,
    ShieldCheck,
    ArrowRight,
    CheckCircle2,
    Calendar,
    Cpu,
    Phone,
    SlidersHorizontal,
    Clock,
    Factory
} from "lucide-react";

export const metadata: Metadata = {
    title: "Hakkımızda | Veral Teneke Ticaret | İzmir Alsancak 1980",
    description: "1980'den bu yana İzmir Alsancak 1471 Sokak'ta toptan dosya teli, takvim tenekesi, giyotin sac kesim ve 4K UV mıknatıslı metal poster imalatı. Yarım asırlık torna ve metal şekillendirme hafızası.",
    alternates: {
        canonical: "https://veralteneketicaret.com/hakkimizda",
    },
    openGraph: {
        title: "Hakkımızda | Veral Torna & Teneke Ticaret İzmir",
        description: "İzmir Alsancak'ta 40 yılı aşkın süredir toptan dosya teli, takvim tenekesi ve mikron toleranslı metal imalatı.",
        url: "https://veralteneketicaret.com/hakkimizda",
    },
};

const timelineEvents = [
    {
        year: "1980",
        title: "Alsancak Torna Atölyesinin Kuruluşu",
        description: "İzmir Alsancak 1471 Sokak No:12/A adresinde ilk mekanik torna tezgahları ve pres kalıplarıyla endüstriyel metal parçaların üretimine başlandı.",
    },
    {
        year: "1995",
        title: "Dosya Teli ve Takvim Tenekesinde Seri Üretime Geçiş",
        description: "Türkiye genelindeki resmi arşiv kurumları, matbaalar ve kırtasiye toptancıları için günlük 25.000 adetlik seri tel büküm ve teneke çıta hattı kuruldu.",
    },
    {
        year: "2012",
        title: "CNC Giyotin & Rulo Dilimleme Hatları",
        description: "Müşteri özel ölçülerine göre mikron toleranslı rulo sac dilme (slitting) ve 3000 mm dijital arka dayamalı giyotin ebatlama tezgahları devreye alındı.",
    },
    {
        year: "2024+",
        title: "4K Endüstriyel UV Baskı & Mıknatıslı Montaj",
        description: "Geleneksel metal zanaatı, 1200 DPI piezoelektrik UV baskı fırınlama teknolojisi ve patentli mıknatıslı neodimyum duvar askı sistemiyle birleştirildi.",
    },
];

const machineryList = [
    {
        title: "Eksantrik Pres Hatları",
        spec: "10 - 160 Ton Kapasite",
        desc: "Progressiv ve tek vuruşlu kalıplarla seri dosya teli, tef zili ve özel sac parçası formlama.",
    },
    {
        title: "CNC Giyotin Makas",
        spec: "3.000 mm / ±0.05 mm Tolerans",
        desc: "Sacın düzlemsel liflerini bozmadan dik gönyede, çapaksız soğuk sac ve teneke ebatlama.",
    },
    {
        title: "Rulo Dilimleme (Slitting)",
        spec: "Min. 8 mm Dilme Eni",
        desc: "Çift taraflı döner çelik disk bıçaklarla yüksek hassasiyette şerit sac ve teneke sarımı.",
    },
    {
        title: "Endüstriyel 4K UV Kürleme",
        spec: "1200x1200 DPI Piezoelektrik",
        desc: "Güneş ışığında solmayan, suya ve neme dirençli çift kat mikronize fırın kürleme.",
    },
];

export default function AboutPage() {
    const breadcrumbs = [
        { name: "Ana Sayfa", url: "/" },
        { name: "Hakkımızda", url: "/hakkimizda" },
    ];

    const organizationJsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Veral Teneke Ticaret",
        "foundingDate": "1980",
        "director": {
            "@type": "Person",
            "name": "Oğuzcan Veral",
            "url": "https://veralteneketicaret.com/yazar/oguzcan-veral"
        },
        "url": "https://veralteneketicaret.com",
        "logo": "https://veralteneketicaret.com/veral-logo.png",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "1471 Sokak No:12/A Alsancak",
            "addressLocality": "Konak",
            "addressRegion": "İzmir",
            "postalCode": "35220",
            "addressCountry": "TR"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+90-532-379-4003",
            "contactType": "customer service",
            "areaServed": "TR",
            "availableLanguage": "Turkish"
        }
    };

    return (
        <main className="min-h-screen bg-[#fafafa] text-[#161616]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
            />
            <Navigation />

            <div className="pt-28 pb-4 px-4 md:px-8 max-w-7xl mx-auto">
                <Breadcrumb items={breadcrumbs} className="text-zinc-600" />
            </div>

            {/* HERO SECTION */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto pb-16 pt-4">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 space-y-6">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-amber-50 text-amber-900 border border-amber-600/20 shadow-sm">
                            <MapPin className="w-3.5 h-3.5 text-amber-700" /> İZMİR ALSANCAK · 1980&apos;DEN BUGÜNE
                        </span>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 tracking-tight leading-[1.1]">
                            Yarım Asırlık Metal Hafızası ve Zanaat Tutkusu
                        </h1>

                        <p className="text-base md:text-lg text-zinc-600 leading-relaxed font-normal">
                            Veral Teneke Ticaret, İzmir&apos;in kalbi Alsancak&apos;ta 1980 yılında kurulmuş, Türkiye&apos;nin en köklü metal kırtasiye, sac işleme ve teneke kalıplama atölyelerinden biridir. 
                            Geleneksel torna tezgahlarının mikron hassasiyetini, 21. yüzyılın 4K UV endüstriyel baskı teknolojisiyle birleştiriyoruz.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <Link
                                href="/hizmetler"
                                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm tracking-wider uppercase shadow-md shadow-amber-600/20 transition-all hover:scale-[1.02]"
                            >
                                <span>Üretim Hatlarımız</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/teklif-al"
                                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-zinc-300 hover:bg-zinc-100 text-zinc-900 font-semibold text-sm transition-colors shadow-sm"
                            >
                                <span>Toptan Fiyat Teklifi Al</span>
                            </Link>
                        </div>
                    </div>

                    {/* Authentic Workshop Photo */}
                    <div className="lg:col-span-5">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-200 bg-white shadow-xl p-2">
                            <div className="relative w-full h-full rounded-xl overflow-hidden bg-zinc-100">
                                <Image
                                    src="/hero-izmir-metal-poster.jpg"
                                    alt="İzmir Alsancak Veral Atölyesi ve Metal Sanatı"
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 500px"
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-5">
                                    <div className="text-xs font-mono text-white">
                                        <span className="text-amber-400 font-bold block mb-1">ALSANCAK İMALAT MERKEZİ</span>
                                        1471 Sokak No:12/A Konak / İzmir · 1980&apos;den Günümüze
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* STATS STRIP */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
                    <div className="p-6 rounded-xl bg-white border border-zinc-200 shadow-sm text-center">
                        <span className="block text-3xl md:text-4xl font-black text-zinc-900 font-mono mb-1">40+ Yıl</span>
                        <span className="text-xs font-mono uppercase tracking-wider text-amber-700 font-bold">Kesintisiz Üretim</span>
                    </div>
                    <div className="p-6 rounded-xl bg-white border border-zinc-200 shadow-sm text-center">
                        <span className="block text-3xl md:text-4xl font-black text-amber-700 font-mono mb-1">35.000+</span>
                        <span className="text-xs font-mono uppercase tracking-wider text-amber-700 font-bold">Teslim Edilen Sipariş</span>
                    </div>
                    <div className="p-6 rounded-xl bg-white border border-zinc-200 shadow-sm text-center">
                        <span className="block text-3xl md:text-4xl font-black text-zinc-900 font-mono mb-1">50.000</span>
                        <span className="text-xs font-mono uppercase tracking-wider text-amber-700 font-bold">Günlük Parça Kapasitesi</span>
                    </div>
                    <div className="p-6 rounded-xl bg-white border border-zinc-200 shadow-sm text-center">
                        <span className="block text-3xl md:text-4xl font-black text-amber-700 font-mono mb-1">%99.2</span>
                        <span className="text-xs font-mono uppercase tracking-wider text-amber-700 font-bold">Doğrulanmış Memnuniyet</span>
                    </div>
                </div>
            </section>

            {/* HERITAGE TIMELINE */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto py-16 border-t border-zinc-200">
                <div className="max-w-3xl mb-12">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-700 block mb-2">
                        TARİHÇEMİZ VE GELİŞİM SÜRECİ
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-black text-zinc-900 tracking-tight">
                        Alsancak&apos;ta Başlayan Yarım Asırlık Zanaat
                    </h2>
                    <p className="text-base text-zinc-600 mt-2">
                        Küçük bir mekanik torna atölyesinden Türkiye&apos;nin 81 iline sevkiyat yapan modern bir üretim merkezine uzanan serüvenimiz.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {timelineEvents.map((item, idx) => (
                        <div
                            key={idx}
                            className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm hover:border-amber-500 transition-colors flex flex-col justify-between"
                        >
                            <div>
                                <span className="inline-block px-3 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-600/20 text-xs font-mono font-bold mb-4">
                                    {item.year}
                                </span>
                                <h3 className="text-lg font-bold text-zinc-900 mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-zinc-600 leading-relaxed font-normal">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CRAFTSMAN & AUTHOR PROFILE */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto py-16 border-t border-zinc-200">
                <div className="max-w-3xl mb-8">
                    <span className="text-xs font-mono uppercase tracking-widest text-amber-700 block mb-2 font-bold">
                        ZANAATKÂR KİMLİĞİ & İMALAT DİREKTÖRÜ
                    </span>
                    <h2 className="text-2xl md:text-4xl font-black text-zinc-900">
                        Üretimimizin Başındaki İsim
                    </h2>
                </div>

                <AuthorCard />
            </section>

            {/* WORKSHOP MACHINERY SPECIFICATIONS */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto py-16 border-t border-zinc-200">
                <div className="max-w-3xl mb-12">
                    <span className="text-xs font-mono uppercase tracking-widest text-amber-700 block mb-2 font-bold">
                        MAKİNE VE TEZGAH ENVENTERİ
                    </span>
                    <h2 className="text-2xl md:text-4xl font-black text-zinc-900">
                        Atölyemizin Teknik Altyapısı
                    </h2>
                    <p className="text-base text-zinc-600 mt-2">
                        Yüksek tonajlı eksantrik presler, CNC giyotin makas ve rulo slitting tezgahlarıyla tüm siparişlerde sıfır hata toleransı.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {machineryList.map((m, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm flex flex-col justify-between">
                            <div>
                                <div className="text-xs font-mono font-bold text-amber-700 uppercase tracking-wider mb-1">
                                    {m.spec}
                                </div>
                                <h3 className="text-lg font-bold text-zinc-900 mb-2">
                                    {m.title}
                                </h3>
                                <p className="text-xs text-zinc-600 leading-relaxed">
                                    {m.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* PRODUCTION PILLARS */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto pb-24 border-t border-zinc-200 pt-16">
                <h2 className="text-2xl md:text-3xl font-black text-zinc-900 mb-8">
                    Kalite ve İmalat İlkelerimiz
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-8 rounded-2xl border border-zinc-200 bg-white space-y-4 shadow-sm">
                        <Hammer className="w-8 h-8 text-amber-600" />
                        <h3 className="text-lg font-bold text-zinc-900">Milimetrik Torna Kalıpları</h3>
                        <p className="text-sm text-zinc-600 leading-relaxed font-normal">
                            Kağıdı ve kuşe yüzeyleri zedelemeyen çift bükümlü kalıplarımız, kendi torna atölyemizde mikron hassasiyetinde taşlanarak üretilir.
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl border border-zinc-200 bg-white space-y-4 shadow-sm">
                        <ShieldCheck className="w-8 h-8 text-amber-600" />
                        <h3 className="text-lg font-bold text-zinc-900">DIN EN 10202 Akredite Kalite</h3>
                        <p className="text-sm text-zinc-600 leading-relaxed font-normal">
                            Üretimde yalnızca Avrupa normlarına uygun elektrolitik teneke (ETP) ve TFS sertifikalı sac hammaddeleri kullanılır.
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl border border-zinc-200 bg-white space-y-4 shadow-sm">
                        <Award className="w-8 h-8 text-amber-600" />
                        <h3 className="text-lg font-bold text-zinc-900">Doğrudan Üretici Güvencesi</h3>
                        <p className="text-sm text-zinc-600 leading-relaxed font-normal">
                            Aracı veya komisyoncu olmadan, İzmir Alsancak atölyemizden tüm Türkiye&apos;ye doğrudan fabrika fiyatlarıyla sevkiyat yapılır.
                        </p>
                    </div>
                </div>

                {/* BOTTOM CTA */}
                <div className="mt-12 rounded-3xl border border-zinc-200 bg-white p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2 text-center md:text-left">
                        <h3 className="text-xl md:text-2xl font-bold text-zinc-900">
                            Atölyemizle İletişime Geçin
                        </h3>
                        <p className="text-sm text-zinc-600 max-w-lg">
                            Toptan sipariş veya özel ebat imalat talepleriniz için Alsancak atölyemizi arayabilir ya da hızlı teklif formumuzu doldurabilirsiniz.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href="/teklif-al"
                            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                        >
                            <span>Teklif Formu</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a
                            href="tel:+905323794003"
                            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-zinc-300 hover:bg-zinc-50 text-zinc-900 font-semibold text-xs transition-colors"
                        >
                            <Phone className="w-4 h-4 text-amber-600" />
                            <span>0532 379 40 03</span>
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

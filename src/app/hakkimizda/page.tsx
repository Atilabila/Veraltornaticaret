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
    title: "Hakkımızda | Veral Teneke Ticaret | İzmir Alsancak",
    description: "İzmir Alsancak 1471 Sokak'ta toptan dosya teli, takvim tenekesi, giyotin sac kesim ve 4K UV mıknatıslı metal poster imalatı.",
    alternates: {
        canonical: "https://veralteneketicaret.com/hakkimizda",
    },
    openGraph: {
        title: "Hakkımızda | Veral Torna & Teneke Ticaret İzmir",
        description: "İzmir Alsancak'ta toptan dosya teli, takvim tenekesi ve mikron toleranslı metal imalatı.",
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
        <main className="min-h-screen bg-atl-bg text-atl-text">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
            />
            <Navigation />

            <div className="pt-28 pb-4 px-4 md:px-8 max-w-7xl mx-auto">
                <Breadcrumb items={breadcrumbs} className="text-atl-muted" />
            </div>

            {/* HERO SECTION */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto pb-16 pt-4">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 space-y-6">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-atl-brass-tint text-atl-brass border border-atl-brass/20 shadow-sm">
                            <MapPin className="w-3.5 h-3.5 text-atl-brass" /> İZMİR ALSANCAK ATÖLYESİ
                        </span>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display text-atl-text tracking-tight leading-[1.1]">
                            Alsancak&apos;ta Metal ve Teneke Zanaatı
                        </h1>

                        <p className="text-base md:text-lg text-atl-muted leading-relaxed font-normal">
                            Veral Teneke Ticaret, İzmir&apos;in kalbi Alsancak&apos;ta faaliyet gösteren bir metal kırtasiye, sac işleme ve teneke kalıplama atölyesidir. 
                            Geleneksel torna tezgahlarının mikron hassasiyetini, 21. yüzyılın 4K UV endüstriyel baskı teknolojisiyle birleştiriyoruz.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 pt-2">
                            <Link
                                href="/hizmetler"
                                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-atl-brass hover:bg-atl-brass-light text-atl-bg font-bold text-sm tracking-wider uppercase shadow-md shadow-black/20 transition-all hover:scale-[1.02]"
                            >
                                <span>Üretim Hatlarımız</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/teklif-al"
                                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-atl-line hover:bg-atl-surface-2 text-atl-text font-semibold text-sm transition-colors shadow-sm"
                            >
                                <span>Toptan Fiyat Teklifi Al</span>
                            </Link>
                        </div>
                    </div>

                    {/* Authentic Workshop Photo */}
                    <div className="lg:col-span-5">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-atl-line bg-atl-surface shadow-xl p-2">
                            <div className="relative w-full h-full rounded-xl overflow-hidden bg-atl-surface-2">
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
                                        <span className="text-atl-brass-light font-bold block mb-1">ALSANCAK İMALAT MERKEZİ</span>
                                        1471 Sokak No:12/A Konak / İzmir
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* STATS STRIP */}
                <div className="grid grid-cols-1 gap-4 mt-12">
                    <div className="max-w-xs p-6 rounded-xl bg-atl-surface border border-atl-line shadow-sm text-center">
                        <span className="block text-3xl md:text-4xl font-black text-atl-text font-mono mb-1">50.000</span>
                        <span className="text-xs font-mono uppercase tracking-wider text-atl-brass font-bold">Günlük Parça Kapasitesi</span>
                    </div>
                </div>
            </section>

            {/* HERITAGE TIMELINE */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto py-16 border-t border-atl-line">
                <div className="max-w-3xl mb-12">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-atl-brass block mb-2">
                        TARİHÇEMİZ VE GELİŞİM SÜRECİ
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-display text-atl-text tracking-tight">
                        Alsancak&apos;ta Başlayan Zanaat
                    </h2>
                    <p className="text-base text-atl-muted mt-2">
                        Küçük bir mekanik torna atölyesinden Türkiye&apos;nin 81 iline sevkiyat yapan modern bir üretim merkezine uzanan serüvenimiz.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {timelineEvents.map((item, idx) => (
                        <div
                            key={idx}
                            className="p-6 rounded-2xl bg-atl-surface border border-atl-line shadow-sm hover:border-atl-brass transition-colors flex flex-col justify-between"
                        >
                            <div>
                                <span className="inline-block px-3 py-1 rounded-md bg-atl-brass-tint text-atl-brass border border-atl-brass/20 text-xs font-mono font-bold mb-4">
                                    {item.year}
                                </span>
                                <h3 className="text-lg font-bold text-atl-text mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-atl-muted leading-relaxed font-normal">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CRAFTSMAN & AUTHOR PROFILE */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto py-16 border-t border-atl-line">
                <div className="max-w-3xl mb-8">
                    <span className="text-xs font-mono uppercase tracking-widest text-atl-brass block mb-2 font-bold">
                        ZANAATKÂR KİMLİĞİ & İMALAT DİREKTÖRÜ
                    </span>
                    <h2 className="text-2xl md:text-4xl font-display text-atl-text">
                        Üretimimizin Başındaki İsim
                    </h2>
                </div>

                <AuthorCard />
            </section>

            {/* WORKSHOP MACHINERY SPECIFICATIONS */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto py-16 border-t border-atl-line">
                <div className="max-w-3xl mb-12">
                    <span className="text-xs font-mono uppercase tracking-widest text-atl-brass block mb-2 font-bold">
                        MAKİNE VE TEZGAH ENVENTERİ
                    </span>
                    <h2 className="text-2xl md:text-4xl font-display text-atl-text">
                        Atölyemizin Teknik Altyapısı
                    </h2>
                    <p className="text-base text-atl-muted mt-2">
                        Yüksek tonajlı eksantrik presler, CNC giyotin makas ve rulo slitting tezgahlarıyla tüm siparişlerde sıfır hata toleransı.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {machineryList.map((m, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-atl-surface border border-atl-line shadow-sm flex flex-col justify-between">
                            <div>
                                <div className="text-xs font-mono font-bold text-atl-brass uppercase tracking-wider mb-1">
                                    {m.spec}
                                </div>
                                <h3 className="text-lg font-bold text-atl-text mb-2">
                                    {m.title}
                                </h3>
                                <p className="text-xs text-atl-muted leading-relaxed">
                                    {m.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* PRODUCTION PILLARS */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto pb-24 border-t border-atl-line pt-16">
                <h2 className="text-2xl md:text-3xl font-display text-atl-text mb-8">
                    Kalite ve İmalat İlkelerimiz
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-8 rounded-2xl border border-atl-line bg-atl-surface space-y-4 shadow-sm">
                        <Hammer className="w-8 h-8 text-atl-brass" />
                        <h3 className="text-lg font-bold text-atl-text">Milimetrik Torna Kalıpları</h3>
                        <p className="text-sm text-atl-muted leading-relaxed font-normal">
                            Kağıdı ve kuşe yüzeyleri zedelemeyen çift bükümlü kalıplarımız, kendi torna atölyemizde mikron hassasiyetinde taşlanarak üretilir.
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl border border-atl-line bg-atl-surface space-y-4 shadow-sm">
                        <ShieldCheck className="w-8 h-8 text-atl-brass" />
                        <h3 className="text-lg font-bold text-atl-text">DIN EN 10202 Uyumlu Hammadde</h3>
                        <p className="text-sm text-atl-muted leading-relaxed font-normal">
                            Üretimde yalnızca Avrupa normlarına uygun elektrolitik teneke (ETP) ve TFS sertifikalı sac hammaddeleri kullanılır.
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl border border-atl-line bg-atl-surface space-y-4 shadow-sm">
                        <Award className="w-8 h-8 text-atl-brass" />
                        <h3 className="text-lg font-bold text-atl-text">Doğrudan Üretici Güvencesi</h3>
                        <p className="text-sm text-atl-muted leading-relaxed font-normal">
                            Aracı veya komisyoncu olmadan, İzmir Alsancak atölyemizden tüm Türkiye&apos;ye doğrudan fabrika fiyatlarıyla sevkiyat yapılır.
                        </p>
                    </div>
                </div>

                {/* BOTTOM CTA */}
                <div className="mt-12 rounded-3xl border border-atl-line bg-atl-surface p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2 text-center md:text-left">
                        <h3 className="text-xl md:text-2xl font-bold text-atl-text">
                            Atölyemizle İletişime Geçin
                        </h3>
                        <p className="text-sm text-atl-muted max-w-lg">
                            Toptan sipariş veya özel ebat imalat talepleriniz için Alsancak atölyemizi arayabilir ya da hızlı teklif formumuzu doldurabilirsiniz.
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href="/teklif-al"
                            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-atl-brass hover:bg-atl-brass-light text-atl-bg font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                        >
                            <span>Teklif Formu</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a
                            href="tel:+905323794003"
                            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl border border-atl-line hover:bg-atl-surface-2 text-atl-text font-semibold text-xs transition-colors"
                        >
                            <Phone className="w-4 h-4 text-atl-brass" />
                            <span>0532 379 40 03</span>
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

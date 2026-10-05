import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { ShieldCheck, Award, Hammer, Clock, MapPin, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Hakkımızda | 40 Yıllık Metal & Teneke İmalat Geleneği | Veral Ticaret",
    description: "1980'den bu yana İzmir Alsancak'taki atölyemizde toptan dosya teli, takvim tenekesi ve 4K UV metal poster imalatı. 35.000+ tamamlanmış sipariş tecrübesi.",
    alternates: {
        canonical: "https://veralteneketicaret.com/hakkimizda",
    },
    openGraph: {
        title: "Hakkımızda | Veral Torna & Teneke Ticaret",
        description: "İzmir Alsancak'ta 40 yılı aşkın süredir endüstriyel metal işleme, torna kalıp ve UV metal poster baskı sanatı.",
        url: "https://veralteneketicaret.com/hakkimizda",
        images: [
            {
                url: "/alsancak-mockup.png",
                width: 1200,
                height: 630,
                alt: "Veral Torna & Teneke Alsancak Atölyesi",
            },
        ],
    },
};

export default function HakkimizdaPage() {
    const breadcrumbs = [
        { name: "Ana Sayfa", url: "/" },
        { name: "Hakkımızda", url: "/hakkimizda" },
    ];

    const organizationJsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Veral Torna & Teneke Ticaret",
        "foundingDate": "1980",
        "founder": {
            "@type": "Person",
            "name": "Atila Bila",
            "url": "https://veralteneketicaret.com/yazar/atila-bila"
        },
        "url": "https://veralteneketicaret.com",
        "logo": "https://veralteneketicaret.com/veral-logo.webp",
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
        <main className="min-h-screen bg-[#0e0e11] text-zinc-200">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
            />
            <Navigation />

            <div className="pt-28 pb-4 px-4 md:px-8 max-w-6xl mx-auto">
                <Breadcrumb items={breadcrumbs} />
            </div>

            {/* HERO SECTION */}
            <section className="px-4 md:px-8 max-w-6xl mx-auto pb-16">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-7 space-y-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-widest uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <MapPin className="w-3.5 h-3.5" /> İZMİR ALSANCAK · 1980&apos;DEN BUGÜNE
                        </span>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                            Yarım Asırlık Metal Hafızası ve Zanaat Tutkusu
                        </h1>
                        <p className="text-base md:text-lg text-zinc-300 leading-relaxed font-light">
                            Veral Torna & Teneke, İzmir&apos;in kalbi Alsancak&apos;ta 1980 yılında kurulmuş, Türkiye&apos;nin en köklü metal kırtasiye ve teneke işleme atölyelerinden biridir. 
                            Geleneksel torna tezgahlarının mikron hassasiyetini, 21. yüzyılın 1200 DPI endüstriyel UV baskı teknolojisiyle birleştiriyoruz.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-2">
                            <Link
                                href="/urunler"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-sm transition-colors shadow-lg shadow-emerald-500/20"
                            >
                                Üretim Kataloğu <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/yazar/atila-bila"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-zinc-700 hover:bg-zinc-800 text-white font-medium text-sm transition-colors"
                            >
                                Usta Biyografisi (E-E-A-T)
                            </Link>
                        </div>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
                            <Image
                                src="/alsancak-mockup.png"
                                alt="İzmir Alsancak Veral Atölyesi"
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 500px"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                                <div className="text-xs font-mono text-zinc-300">
                                    <span className="text-emerald-400 font-bold block mb-1">ALSANCAK İMALAT ÜSSÜ</span>
                                    1471 Sokak No:12/A Konak / İzmir
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SCALE DENOMINATOR & STATS */}
            <section className="border-t border-b border-zinc-800 bg-zinc-950/60 py-12 px-4 md:px-8">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <span className="block text-3xl md:text-5xl font-black text-white font-mono mb-2">40+ Yıl</span>
                        <span className="text-xs md:text-sm text-zinc-400 font-mono">Kesintisiz Üretim</span>
                    </div>
                    <div>
                        <span className="block text-3xl md:text-5xl font-black text-emerald-400 font-mono mb-2">35.000+</span>
                        <span className="text-xs md:text-sm text-zinc-400 font-mono">Teslim Edilen Sipariş</span>
                    </div>
                    <div>
                        <span className="block text-3xl md:text-5xl font-black text-white font-mono mb-2">50.000</span>
                        <span className="text-xs md:text-sm text-zinc-400 font-mono">Günlük Parça Kapasitesi</span>
                    </div>
                    <div>
                        <span className="block text-3xl md:text-5xl font-black text-emerald-400 font-mono mb-2">%98.7</span>
                        <span className="text-xs md:text-sm text-zinc-400 font-mono">Doğrulanmış Memnuniyet</span>
                    </div>
                </div>
            </section>

            {/* CRAFTSMANSHIP & E-E-A-T AUTHOR */}
            <section className="px-4 md:px-8 max-w-6xl mx-auto py-16">
                <div className="mb-10">
                    <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block mb-2 font-semibold">
                        ZANAATKÂR KİMLİĞİ & BAŞ USTA
                    </span>
                    <h2 className="text-2xl md:text-4xl font-black text-white">
                        Üretimimizin Başındaki İsim
                    </h2>
                </div>

                <AuthorCard />
            </section>

            {/* PRODUCTION PILLARS */}
            <section className="px-4 md:px-8 max-w-6xl mx-auto pb-24">
                <h2 className="text-2xl md:text-3xl font-black text-white mb-8">
                    Kalite ve İmalat İlkelerimiz
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-8 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-4">
                        <Hammer className="w-8 h-8 text-emerald-400" />
                        <h3 className="text-lg font-bold text-white">Milimetrik Torna Kalıpları</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Kağıdı ve kuşe yüzeyleri zedelemeyen çift bükümlü kalıplarımız, kendi torna atölyemizde mikron hassasiyetinde taşlanarak üretilir.
                        </p>
                    </div>

                    <div className="p-8 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-4">
                        <Award className="w-8 h-8 text-emerald-400" />
                        <h3 className="text-lg font-bold text-white">1200 DPI Piezo UV Baskı</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Alüminyum plakalar üzerine uygulanan ultraviyole kurutmalı mat vernik sayesinde posterlerimiz suya, güneşe ve çizilmeye 10 yıl dayanır.
                        </p>
                    </div>

                    <div className="p-8 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-4">
                        <ShieldCheck className="w-8 h-8 text-emerald-400" />
                        <h3 className="text-lg font-bold text-white">Hasarsız Teslimat Garantisi</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Güçlendirilmiş kraft kutular ve köşe tamponları ile sevk edilen tüm ürünlerde, kargo hasarı anında 48 saatte koşulsuz telafi edilir.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

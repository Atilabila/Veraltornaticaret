import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { AuthorCard } from "@/components/blog/AuthorCard";
import { MapPin, Hammer, Award, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
    title: "Hakkımızda | Veral Teneke & Torna İmalatı | İzmir Alsancak 1980",
    description: "1980'den bu yana İzmir Alsancak'ta toptan dosya teli, takvim tenekesi ve 4K UV baskılı mıknatıslı metal poster imalatı. 40 yılı aşkın metal hafızası ve zanaat tutkusu.",
    alternates: {
        canonical: "https://veralteneketicaret.com/hakkimizda",
    },
    openGraph: {
        title: "Hakkımızda | Veral Torna & Teneke Ticaret",
        description: "İzmir Alsancak'ta 40 yılı aşkın süredir toptan dosya teli, takvim tenekesi ve metal poster imalatı.",
        url: "https://veralteneketicaret.com/hakkimizda",
    },
};

export default function AboutPage() {
    const breadcrumbs = [
        { name: "Ana Sayfa", url: "/" },
        { name: "Hakkımızda", url: "/hakkimizda" },
    ];

    const organizationJsonLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Veral Torna & Teneke Ticaret",
        "foundingDate": "1980",
        "director": {
            "@type": "Person",
            "name": "Oğuzcan Veral",
            "url": "https://veralteneketicaret.com/yazar/oguzcan-veral"
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
        <main className="min-h-screen bg-[#fafafa] text-[#161616]">
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
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold tracking-widest uppercase bg-amber-50 text-amber-800 border border-amber-600/20">
                            <MapPin className="w-3.5 h-3.5 text-amber-700" /> İZMİR ALSANCAK · 1980&apos;DEN BUGÜNE
                        </span>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-zinc-900 tracking-tight leading-tight">
                            Yarım Asırlık Metal Hafızası ve Zanaat Tutkusu
                        </h1>
                        <p className="text-base md:text-lg text-zinc-600 leading-relaxed font-normal">
                            Veral Torna & Teneke, İzmir&apos;in kalbi Alsancak&apos;ta 1980 yılında kurulmuş, Türkiye&apos;nin en köklü metal kırtasiye ve teneke işleme atölyelerinden biridir. 
                            Geleneksel torna tezgahlarının mikron hassasiyetini, 21. yüzyılın 4K UV endüstriyel baskı teknolojisiyle birleştiriyoruz.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-2">
                            <Link
                                href="/urunler"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm transition-all shadow-md shadow-amber-600/20"
                            >
                                Üretim Kataloğu <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/yazar/oguzcan-veral"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-zinc-300 hover:bg-zinc-100 text-zinc-900 font-semibold text-sm transition-colors shadow-sm"
                            >
                                Atölye ve İmalatçı Biyografisi
                            </Link>
                        </div>
                    </div>

                    <div className="lg:col-span-5">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-200 bg-white shadow-xl">
                            <Image
                                src="/hero-izmir-metal-poster.jpg"
                                alt="İzmir Alsancak Veral Atölyesi ve Metal Sanatı"
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 500px"
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                                <div className="text-xs font-mono text-white">
                                    <span className="text-amber-400 font-bold block mb-1">ALSANCAK İMALAT ÜSSÜ</span>
                                    1471 Sokak No:12/A Konak / İzmir
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SCALE DENOMINATOR & STATS */}
            <section className="border-t border-b border-zinc-200 bg-white py-12 px-4 md:px-8">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <span className="block text-3xl md:text-5xl font-black text-zinc-900 font-mono mb-2">40+ Yıl</span>
                        <span className="text-xs md:text-sm text-zinc-500 font-mono">Kesintisiz Üretim</span>
                    </div>
                    <div>
                        <span className="block text-3xl md:text-5xl font-black text-amber-700 font-mono mb-2">35.000+</span>
                        <span className="text-xs md:text-sm text-zinc-500 font-mono">Teslim Edilen Sipariş</span>
                    </div>
                    <div>
                        <span className="block text-3xl md:text-5xl font-black text-zinc-900 font-mono mb-2">50.000</span>
                        <span className="text-xs md:text-sm text-zinc-500 font-mono">Günlük Parça Kapasitesi</span>
                    </div>
                    <div>
                        <span className="block text-3xl md:text-5xl font-black text-amber-700 font-mono mb-2">%98.7</span>
                        <span className="text-xs md:text-sm text-zinc-500 font-mono">Doğrulanmış Memnuniyet</span>
                    </div>
                </div>
            </section>

            {/* CRAFTSMANSHIP & AUTHOR */}
            <section className="px-4 md:px-8 max-w-6xl mx-auto py-16">
                <div className="mb-8">
                    <span className="text-xs font-mono uppercase tracking-widest text-amber-700 block mb-2 font-bold">
                        ZANAATKÂR KİMLİĞİ & İMALAT DİREKTÖRÜ
                    </span>
                    <h2 className="text-2xl md:text-4xl font-black text-zinc-900">
                        Üretimimizin Başındaki İsim
                    </h2>
                </div>

                <AuthorCard />
            </section>

            {/* PRODUCTION PILLARS */}
            <section className="px-4 md:px-8 max-w-6xl mx-auto pb-24">
                <h2 className="text-2xl md:text-3xl font-black text-zinc-900 mb-8">
                    Kalite ve İmalat İlkelerimiz
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-8 rounded-2xl border border-zinc-200 bg-white space-y-4 shadow-sm">
                        <Hammer className="w-8 h-8 text-amber-600" />
                        <h3 className="text-lg font-bold text-zinc-900">Milimetrik Torna Kalıpları</h3>
                        <p className="text-sm text-zinc-600 leading-relaxed">
                            Kağıdı ve kuşe yüzeyleri zedelemeyen çift bükümlü kalıplarımız, kendi torna atölyemizde mikron hassasiyetinde taşlanarak üretilir.
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl border border-zinc-200 bg-white space-y-4 shadow-sm">
                        <ShieldCheck className="w-8 h-8 text-amber-600" />
                        <h3 className="text-lg font-bold text-zinc-900">4K UV Kürleme Teknolojisi</h3>
                        <p className="text-sm text-zinc-600 leading-relaxed">
                            Metal poster ve levhalarda güneş ışığında solmayan, suya ve neme dirençli çift kat mikronize fırın kürleme kullanılır.
                        </p>
                    </div>

                    <div className="p-8 rounded-2xl border border-zinc-200 bg-white space-y-4 shadow-sm">
                        <Award className="w-8 h-8 text-amber-600" />
                        <h3 className="text-lg font-bold text-zinc-900">Doğrudan Üretici Güvencesi</h3>
                        <p className="text-sm text-zinc-600 leading-relaxed">
                            Aracı veya komisyoncu olmadan, İzmir Alsancak atölyemizden tüm Türkiye&apos;ye doğrudan fabrika fiyatlarıyla sevkiyat.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}

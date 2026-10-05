import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { Award, Hammer, ShieldCheck, Mail, Phone, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
    title: "Oğuzcan Veral | Metal Zanaatı ve Endüstriyel İmalat Direktörü | Veral Ticaret",
    description: "Veral Ticaret İmalat Direktörü ve Teknik Editörü Oğuzcan Veral'ın biyografisi, endüstriyel metal işleme deneyimi, kalite standartları ve İzmir Alsancak atölye birikimi.",
    alternates: {
        canonical: "https://veralteneketicaret.com/yazar/oguzcan-veral",
    },
    openGraph: {
        title: "Oğuzcan Veral - Metal Zanaatı ve Endüstriyel İmalat Direktörü",
        description: "Veral Ticaret İmalat Direktörü Oğuzcan Veral: Metal poster, toptan dosya teli ve takvim tenekesi üretiminde saha ve mühendislik tecrübesi.",
        url: "https://veralteneketicaret.com/yazar/oguzcan-veral",
        type: "profile",
        images: [
            {
                url: "/hero-izmir-metal-poster.jpg",
                width: 880,
                height: 734,
                alt: "Oğuzcan Veral - Veral Ticaret İmalat Direktörü",
            },
        ],
    },
};

const authorArticles = [
    {
        slug: "endustriyel-metal-baski-rehberi",
        title: "ENDÜSTRİYEL METAL BASKI PROTOKOLÜ: DİJİTAL DÖNÜŞÜM ANALİZİ",
        desc: "Metal yüzeylerde UV kürleme ve serigrafi baskı tekniklerinin dayanıklılık ve renk kalibrasyonu açısından laboratuvar karşılaştırması.",
        date: "12 Ocak 2026",
        readTime: "8 dk",
    },
    {
        slug: "takvim-tenekesi-imalati-izmir",
        title: "TAKVİM TENEKESİ İMALATI: İZMİR'DE SERİ ÜRETİM VE KALİTE STANDARTLARI",
        desc: "0.22mm - 0.30mm elektrolitik teneke plakaların kağıt yırtmayan çift kanal büküm teknolojisi ve matbaa tedarik süreçleri.",
        date: "3 Şubat 2026",
        readTime: "6 dk",
    },
    {
        slug: "dosya-teli-ve-arsiv-sistemleri",
        title: "DOSYA TELİ ÜRETİMİNDE MALZEME BİLİMİ: PASLANMAZ DİRENÇLİ ÇÖZÜMLER",
        desc: "DIN normlarına uygun esneklik ve 96 saatlik tuz sisi korozyon testlerinden geçen arşiv tipi dosya tellerinin üretim aşamaları.",
        date: "3 Şubat 2026",
        readTime: "5 dk",
    },
    {
        slug: "miknatisli-magnet-ve-metal-poster-estetigi",
        title: "MIKNATISLI MAGNET VE METAL POSTER: MODERN DEKORASYONDA YENİ NESİL DOKUNUŞ",
        desc: "N35 Neodimyum mıknatıs pedleri ile duvara hasar vermeden saniyeler içinde monte edilen 1200 DPI UV baskılı metal sanat tabloları.",
        date: "3 Şubat 2026",
        readTime: "9 dk",
    },
];

export default function OguzcanVeralProfilePage() {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Oğuzcan Veral",
        "jobTitle": "İmalat Direktörü ve Teknik Editör",
        "worksFor": {
            "@type": "Organization",
            "name": "Veral Torna & Teneke Ticaret",
            "url": "https://veralteneketicaret.com",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "1471 Sokak No:12/A Alsancak",
                "addressLocality": "Konak",
                "addressRegion": "İzmir",
                "addressCountry": "TR",
            },
        },
        "url": "https://veralteneketicaret.com/yazar/oguzcan-veral",
        "sameAs": [
            "https://veralteneketicaret.com/hakkimizda",
        ],
        "knowsAbout": [
            "Metal Poster İmalatı",
            "UV Dijital Kürleme",
            "Toptan Dosya Teli İmalatı",
            "Takvim Tenekesi Büküm Kalıpları",
            "Neodimyum Manyetik Montaj Sistemleri",
        ],
        "description": "İzmir Alsancak atölyesinde endüstriyel metal işleme, torna kalıp ve UV metal baskı teknolojilerine liderlik eden imalat direktörü ve teknik editör.",
    };

    const breadcrumbs = [
        { name: "Ana Sayfa", url: "/" },
        { name: "Yazarlar & Atölye", url: "/blog" },
        { name: "Oğuzcan Veral", url: "/yazar/oguzcan-veral" },
    ];

    return (
        <main className="min-h-screen bg-[#fafafa] text-[#161616]">
            {/* Person Schema.org Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />

            <Navigation />

            <div className="container mx-auto px-4 sm:px-6 lg:px-12 pt-8 pb-4">
                <Breadcrumb items={breadcrumbs} />
            </div>

            {/* Author Profile Header */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-12 py-10">
                <div className="rounded-3xl border border-zinc-200 bg-white p-8 md:p-14 shadow-lg relative overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        {/* Avatar / Portrait */}
                        <div className="lg:col-span-4 flex flex-col items-center sm:items-start">
                            <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-2xl overflow-hidden border-2 border-amber-600/30 bg-zinc-100 shadow-md">
                                <Image
                                    src="/hero-izmir-metal-poster.jpg"
                                    alt="Oğuzcan Veral - İmalat Direktörü"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="mt-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-600/20 text-xs font-mono font-semibold">
                                <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" /> Doğrulanmış İmalatçı & Editör
                            </div>
                        </div>

                        {/* Bio Details */}
                        <div className="lg:col-span-8 space-y-5">
                            <div>
                                <span className="text-xs font-mono font-bold tracking-widest text-amber-700 uppercase block mb-1">
                                    VERAL TİCARET // TEKNİK EDİTÖR
                                </span>
                                <h1 className="text-3xl sm:text-5xl font-black text-zinc-900 tracking-tight">
                                    Oğuzcan Veral
                                </h1>
                                <p className="text-sm sm:text-base text-zinc-600 font-medium mt-1">
                                    İmalat Direktörü • 2. Kuşak Metal Zanaatı & Seri Üretim Yönetimi
                                </p>
                            </div>

                            <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
                                İzmir Alsancak Sanayi Sitesi'ndeki 1471 Sokak atölyemizde 1980 yılından bu yana süregelen torna, pres ve metal levha işleme kültürünü modern UV kürleme teknolojileriyle birleştiren Oğuzcan Veral; toptan dosya teli, takvim tenekesi ve mıknatıslı metal poster üretim hatlarının kalite kontrol ve teknik şartname süreçlerini yönetmektedir.
                            </p>

                            {/* Experience Metrics */}
                            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-200">
                                <div>
                                    <span className="block text-2xl font-black font-mono text-zinc-900">1980</span>
                                    <span className="text-xs text-zinc-500 font-medium">Aile İmalat Geleneği</span>
                                </div>
                                <div>
                                    <span className="block text-2xl font-black font-mono text-zinc-900">35.000+</span>
                                    <span className="text-xs text-zinc-500 font-medium">Tamamlanan Sevkiyat</span>
                                </div>
                                <div>
                                    <span className="block text-2xl font-black font-mono text-zinc-900">%98.7</span>
                                    <span className="text-xs text-zinc-500 font-medium">Tolerans Memnuniyeti</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Published Technical Articles */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-12 py-12">
                <div className="mb-8">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 block mb-1">
                        TEKNİK ARŞİV
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-zinc-900">
                        Oğuzcan Veral Tarafından Hazırlanan Teknik İncelemeler
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {authorArticles.map((art) => (
                        <Link
                            key={art.slug}
                            href={`/blog/${art.slug}`}
                            className="p-6 rounded-2xl border border-zinc-200 bg-white hover:border-amber-600/60 hover:shadow-lg transition-all flex flex-col justify-between group"
                        >
                            <div>
                                <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono mb-3">
                                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {art.date}</span>
                                    <span>•</span>
                                    <span>{art.readTime} okuma</span>
                                </div>
                                <h3 className="text-lg font-bold text-zinc-900 group-hover:text-amber-700 transition-colors leading-snug mb-2">
                                    {art.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                                    {art.desc}
                                </p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-bold text-amber-700">
                                <span>İncelemeyi Oku</span>
                                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}

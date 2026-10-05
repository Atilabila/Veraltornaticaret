import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { Award, Hammer, ShieldCheck, Mail, Phone, Calendar, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
    title: "Atila Bila | Metal Zanaatı ve Endüstriyel Baskı Uzmanı | Veral Ticaret",
    description: "20 yılı aşkın endüstriyel metal işleme ve UV baskı uzmanı Atila Bila'nın biyografisi, teknik makaleleri, kalite protokolleri ve İzmir Alsancak atölye deneyimi.",
    alternates: {
        canonical: "https://veralteneketicaret.com/yazar/atila-bila",
    },
    openGraph: {
        title: "Atila Bila - Metal Zanaatı ve Endüstriyel Baskı Uzmanı",
        description: "Veral Ticaret Baş Ustası Atila Bila: Metal poster, toptan dosya teli ve takvim tenekesi üretiminde 20+ yıllık saha ve mühendislik tecrübesi.",
        url: "https://veralteneketicaret.com/yazar/atila-bila",
        type: "profile",
        images: [
            {
                url: "/images/production/atila-bila.webp",
                width: 800,
                height: 800,
                alt: "Atila Bila - Veral Ticaret İmalat Direktörü",
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

export default function AuthorProfilePage() {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Atila Bila",
        "jobTitle": "Metal İşleme Direktörü ve UV Baskı Uzmanı",
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
        "url": "https://veralteneketicaret.com/yazar/atila-bila",
        "sameAs": [
            "https://veralteneketicaret.com/hakkimizda",
            "https://linkedin.com",
        ],
        "knowsAbout": [
            "Metal Poster İmalatı",
            "UV Dijital Kürleme",
            "Toptan Dosya Teli İmalatı",
            "Takvim Tenekesi Büküm Kalıpları",
            "Neodimyum Manyetik Montaj Sistemleri",
        ],
        "description": "İzmir Alsancak atölyesinde 20 yılı aşkın süredir endüstriyel metal işleme, torna kalıp ve UV metal baskı teknolojilerine liderlik eden imalat uzmanı.",
    };

    const breadcrumbs = [
        { name: "Ana Sayfa", url: "/" },
        { name: "Yazarlar & Uzmanlar", url: "/blog" },
        { name: "Atila Bila", url: "/yazar/atila-bila" },
    ];

    return (
        <main className="min-h-screen bg-[#0e0e11] text-zinc-200">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />

            <Navigation />

            <div className="pt-28 pb-6 px-4 md:px-8 max-w-6xl mx-auto">
                <Breadcrumb items={breadcrumbs} />
            </div>

            {/* AUTHOR HERO CARD */}
            <section className="px-4 md:px-8 max-w-6xl mx-auto pb-16">
                <div className="border border-zinc-800 bg-zinc-900/80 rounded-2xl p-6 md:p-12 shadow-2xl backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

                    <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10">
                        {/* AVATAR / WORKSHOP BADGE */}
                        <div className="md:col-span-4 flex flex-col items-center text-center">
                            <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-2 border-zinc-700 bg-zinc-800 shadow-xl mb-6">
                                <Image
                                    src="/alsancak-mockup.png"
                                    alt="Atila Bila - Metal Zanaat Direktörü"
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 192px, 224px"
                                    className="object-cover"
                                />
                            </div>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Doğrulanmış Usta / E-E-A-T
                            </span>
                            <p className="text-xs text-zinc-400 font-mono">İzmir Alsancak Atölyesi</p>
                        </div>

                        {/* BIO DETAILS */}
                        <div className="md:col-span-8">
                            <span className="text-xs font-mono tracking-widest uppercase text-emerald-400 font-semibold mb-2 block">
                                UZMAN BİYOGRAFİSİ & TEKNİK DİREKTÖR
                            </span>
                            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
                                Atila Bila
                            </h1>
                            <p className="text-base md:text-lg text-zinc-300 leading-relaxed mb-6 font-light">
                                20 yılı aşkın süredir torna tezgahlarından endüstriyel UV baskı hatlarına uzanan metal işleme serüveninde, 
                                <strong className="text-white font-medium"> 35.000&apos;den fazla siparişin</strong> üretim kalitesini ve mühendislik hassasiyetini bizzat yönetmektedir.
                            </p>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-b border-zinc-800 py-6 mb-6">
                                <div>
                                    <span className="block text-2xl font-bold text-white font-mono">20+ Yıl</span>
                                    <span className="text-xs text-zinc-400">Atölye & Üretim</span>
                                </div>
                                <div>
                                    <span className="block text-2xl font-bold text-white font-mono">35.000+</span>
                                    <span className="text-xs text-zinc-400">Sevkiyat Onayı</span>
                                </div>
                                <div>
                                    <span className="block text-2xl font-bold text-emerald-400 font-mono">%98.7</span>
                                    <span className="text-xs text-zinc-400">Müşteri Memnuniyeti</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
                                <a href="tel:+905323794003" className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
                                    <Phone className="w-4 h-4 text-emerald-400" /> +90 532 379 40 03
                                </a>
                                <a href="mailto:info@veralteneketicaret.com" className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
                                    <Mail className="w-4 h-4 text-emerald-400" /> info@veralteneketicaret.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* EXPERTISE SQUARES */}
            <section className="px-4 md:px-8 max-w-6xl mx-auto pb-16">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <Hammer className="w-5 h-5 text-emerald-400" /> Uzmanlık ve Denetim Alanları
                </h2>
                <div className="grid sm:grid-cols-3 gap-6">
                    <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50">
                        <ShieldCheck className="w-8 h-8 text-emerald-400 mb-3" />
                        <h3 className="text-base font-bold text-white mb-2">Hammadde & Metalurji</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Elektrolitik kalaylı sac, galvaniz korozyon testleri ve büküm dayanımı standartlarının kontrolü.
                        </p>
                    </div>
                    <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50">
                        <Award className="w-8 h-8 text-emerald-400 mb-3" />
                        <h3 className="text-base font-bold text-white mb-2">1200 DPI UV Kürleme</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Alüminyum plakalarda çizilme direnci, renk profili kalibrasyonu ve vernik katman testi.
                        </p>
                    </div>
                    <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/50">
                        <Hammer className="w-8 h-8 text-emerald-400 mb-3" />
                        <h3 className="text-base font-bold text-white mb-2">Özel Pres Kalıpları</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Dosya teli ve takvim çıtalarında kağıt yırtmayan hassas açı kalıplarının üretimi.
                        </p>
                    </div>
                </div>
            </section>

            {/* AUTHOR'S ARTICLES */}
            <section className="px-4 md:px-8 max-w-6xl mx-auto pb-24">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 block mb-1">
                            YAYINLANMIŞ REHBERLER
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                            Atila Bila Tarafından Hazırlanan Teknik İncelemeler
                        </h2>
                    </div>
                    <Link
                        href="/blog"
                        className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                    >
                        Tüm Raporlar <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {authorArticles.map((art) => (
                        <Link
                            key={art.slug}
                            href={`/blog/${art.slug}`}
                            className="group block p-6 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800/60 hover:border-zinc-700 transition-all duration-200"
                        >
                            <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 mb-3">
                                <span className="flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5 text-zinc-400" /> {art.date}
                                </span>
                                <span>·</span>
                                <span>{art.readTime} okuma</span>
                            </div>
                            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors leading-snug mb-2">
                                {art.title}
                            </h3>
                            <p className="text-sm text-zinc-400 leading-relaxed mb-4 line-clamp-2">
                                {art.desc}
                            </p>
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
                                Makaleyi İncele <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                        </Link>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, Clock, Tag, ChevronLeft, Search, Instagram, Phone, Mail, FileText, Database, Activity } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Blog yazıları veritabanı
const blogPosts = [
    {
        id: "takvim-tenekesi-imalati-izmir",
        title: "TAKVİM TENEKESİ İMALATI: İZMİR'DE SERİ ÜRETİM VE KALİTE STANDARTLARI",
        excerpt: "TAKVİM YAYINCILIĞI İÇİN KRİTİK BİLEŞENLER. TENEKE KALINLIĞI, RENK HASSASİYETİ VE HIZLI TERMİN SÜREÇLERİNİN ANALİZİ.",
        category: "ENDÜSTRİYEL İMALAT",
        date: "03.02.2026",
        readTime: "06 DAKİKA",
        image: "/images/production/teneke.jpg",
        featured: true,
        tags: ["TAKVİM TENEKESİ", "İMALAT", "İZMİR", "SERİ ÜRETİM"],
    },
    {
        id: "dosya-teli-ve-arsiv-sistemleri",
        title: "DOSYA TELİ ÜRETİMİNDE MALZEME BİLİMİ: PASLANMAZ DİRENÇLİ ÇÖZÜMLER",
        excerpt: "KIRTASİYE VE ARŞİV SEKTÖRÜ İÇİN ENDÜSTRİYEL DOSYA TELİ ANALİZİ. METAL YORGUNLUĞU VE KOROZYON DİRENCİ PARAMETRELERİ.",
        category: "KIRTASİYE EKİPMANLARI",
        date: "03.02.2026",
        readTime: "05 DAKİKA",
        image: "/images/production/dosya-teli.jpg",
        featured: false,
        tags: ["DOSYA TELİ", "METAL", "ARŞİV", "ÜRETİM"],
    },
    {
        id: "miknatisli-magnet-ve-metal-poster-estetigi",
        title: "MIKNATISLI MAGNET VE METAL POSTER: MODERN DEKORASYONDA YENİ NESİL DOKUNUŞ",
        excerpt: "YAŞAM ALANLARINDA MANYETİK MONTAJIN AVANTAJLARI. UV BASKI KALİTESİYLE METAL POSTERLERİN ESTETİK ÜSTÜNLÜĞÜ.",
        category: "DEKORASYON",
        date: "03.02.2026",
        readTime: "09 DAKİKA",
        image: "/images/production/poster.jpg",
        featured: false,
        tags: ["METAL POSTER", "MAGNET", "DEKORASYON", "MIKNATISLI"],
    },
    {
        id: "endustriyel-metal-baski-rehberi",
        title: "ENDÜSTRİYEL METAL BASKI PROTOKOLÜ: DİJİTAL DÖNÜŞÜM ANALİZİ",
        excerpt: "METAL BASKI TEKNOLOJİLERİNİN EVRİMİ. UV, SERİGRAFİ VE LAZER KAZIMA YÖNTEMLERİNİN TEKNİK KARŞILAŞTIRMASI VE SEKTÖREL VERİMLİLİK RAPORU.",
        category: "ENDÜSTRİYEL BASKI",
        date: "12.01.2026",
        readTime: "08 DAKİKA",
        image: "/porsche.png",
        featured: true,
        tags: ["METAL", "UV BASKI", "SERİGRAFİ", "PLAKA"],
    },
];

const categories = ["TÜM KAYITLAR", "ENDÜSTRİYEL İMALAT", "DEKORASYON", "METAL POSTER", "ENDÜSTRİYEL BASKI"];

export default function BlogPage() {
    const [selectedCategory, setSelectedCategory] = useState("TÜM KAYITLAR");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = blogPosts.filter((post) => {
        const matchesCategory = selectedCategory === "TÜM KAYITLAR" || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const featuredPosts = blogPosts.filter((post) => post.featured);

    return (
        <main className="min-h-screen bg-white grid-terminal no-transition pb-24">
            {/* NAVIGATION_TERMINAL */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b-4 border-black py-4">
                <div className="container-brutal flex justify-between items-center gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 sm:gap-4 group shrink-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black flex items-center justify-center text-white font-black text-xl sm:text-2xl group-active:translate-x-1 group-active:translate-y-1 group-active:shadow-none transition-none shadow-[4px_4px_0px_0px_var(--color-brand-safety-orange)]">
                            V
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm sm:text-lg font-[Archivo Black] leading-none uppercase flex items-center gap-1">
                                VERAL <span className="text-[var(--color-brand-veral-green)] text-[8px] sm:text-[10px] bg-black px-1 py-0.5">IND</span>
                            </span>
                            <span className="text-[8px] sm:text-[10px] font-mono font-black text-black/40 uppercase tracking-[0.2em]">TORNA & TENEKE // TİCARET</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-8 font-mono font-bold text-sm">
                        <Link href="/" className="hover:bg-black hover:text-white px-2 py-1">ÜRETİM HATTI</Link>
                        <Link href="/urunler" className="hover:bg-black hover:text-white px-2 py-1">KATALOG DOSYALARI</Link>
                        <Link href="/hakkimizda" className="hover:bg-black hover:text-white px-2 py-1">TARİHÇE KAYDI</Link>
                        <Link href="/blog" className="px-2 py-1 bg-black text-white">RAPORLAR</Link>
                    </div>

                    <Link href="/" className="btn-mechanical bg-[var(--color-brand-safety-orange)] text-white text-[10px] sm:text-xs font-black px-4 sm:px-6 py-2 uppercase truncate max-w-[120px] sm:max-w-none">
                        ANA MERKEZE DÖN
                    </Link>
                </div>
            </nav>

            {/* HEADER_MODULE */}
            <section className="pt-40 pb-24 bg-[#E5E7EB] border-b-8 border-black">
                <div className="container-brutal">
                    <div className="max-w-4xl border-8 border-black bg-white p-12 shadow-brutal relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Database className="w-64 h-64 text-black" />
                        </div>
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-4 bg-black text-white px-4 py-1 font-mono text-xs font-black mb-8">
                                <Activity className="w-4 h-4 text-[var(--color-brand-safety-orange)]" />
                                [ MERKEZİ RAPOR VERİTABANI v2026 ]
                            </div>
                            <h1 className="text-4xl sm:text-5xl md:text-8xl font-[Archivo Black] leading-none mb-12 uppercase">
                                TEKNİK<br />
                                <span className="text-[var(--color-brand-safety-orange)]">RAPORLAR</span>
                            </h1>

                            {/* SEARCH_TERMINAL */}
                            <div className="relative border-4 border-black group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-8 h-8 text-black" />
                                <input
                                    type="text"
                                    placeholder="İÇERİK ARAMASINI BAŞLAT..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white font-mono font-black text-xl pl-20 pr-6 py-8 focus:outline-none focus:bg-[#FFD700] transition-none"
                                />
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 font-mono text-xs font-black opacity-30">
                                    [ ARAMAK İÇİN ENTER'A BASIN ]
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CATEGORY_TERMINAL */}
            <section className="py-12 border-b-8 border-black bg-white">
                <div className="container-brutal">
                    <div className="flex flex-wrap gap-4 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-8 py-4 font-mono font-black text-sm border-4 border-black shadow-brutal-sm transition-none uppercase ${selectedCategory === category
                                    ? "bg-black text-white shadow-none translate-x-1 translate-y-1"
                                    : "bg-white text-black hover:bg-[var(--color-brand-safety-orange)] hover:text-white"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURED_LOGS_MATRIX */}
            {selectedCategory === "ALL_LOGS" && searchQuery === "" && (
                <section className="py-24 bg-[#E5E7EB]">
                    <div className="container-brutal">
                        <div className="flex items-center gap-4 mb-16">
                            <div className="w-8 h-8 bg-black"></div>
                            <h2 className="text-4xl font-[Archivo Black] uppercase">ÖNCELİKLİ GÖNDERİLER</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-0 border-8 border-black shadow-brutal bg-white overflow-hidden">
                            {featuredPosts.map((post, index) => (
                                <article
                                    key={post.id}
                                    className="border-b-8 md:border-b-0 md:border-r-8 last:border-b-0 md:last:border-r-0 border-black transition-none group hover:bg-black/5"
                                >
                                    <div className="aspect-[16/9] relative overflow-hidden border-b-8 border-black transition-none">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute top-6 left-6 z-10">
                                            <span className="px-6 py-2 bg-[var(--color-brand-safety-orange)] text-white text-xs font-black border-2 border-black shadow-brutal-sm">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-12">
                                        <div className="flex gap-8 font-mono text-xs font-black text-black/40 mb-8 border-l-4 border-black pl-4">
                                            <span className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                {post.date}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                {post.readTime}
                                            </span>
                                        </div>
                                        <h3 className="text-3xl font-[Archivo Black] mb-6 leading-none group-hover:text-[var(--color-brand-safety-orange)]">
                                            {post.title}
                                        </h3>
                                        <p className="font-mono text-sm font-bold text-black/60 mb-10 leading-relaxed uppercase">
                                            {post.excerpt}
                                        </p>
                                        <Link
                                            href={`/blog/${post.id}`}
                                            className="btn-mechanical bg-black text-white text-sm font-black px-10 py-4 uppercase flex items-center justify-between group/btn"
                                        >
                                            DOSYAYA ERİŞ <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-none" />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ALL_REPORTS_GRID */}
            <section className="py-24">
                <div className="container-brutal">
                    <div className="flex items-center justify-between mb-16 px-8 border-l-8 border-black">
                        <h2 className="text-4xl font-[Archivo Black] uppercase">
                            {selectedCategory === "TÜM KAYITLAR" ? "KAYIT ARŞİVİ" : `SİSTEM ${selectedCategory}`}
                        </h2>
                        <div className="font-mono text-xs font-black text-black/30">
                            [ COUNT: {filteredPosts.length} ]
                        </div>
                    </div>

                    {filteredPosts.length === 0 ? (
                        <div className="border-8 border-black p-24 text-center bg-[#E5E7EB]">
                            <p className="font-mono text-xl font-black uppercase text-black/30">SORGUYLA EŞLEŞEN VERİ YOK</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {filteredPosts.map((post, index) => (
                                <article
                                    key={post.id}
                                    className="border-4 border-black bg-white shadow-brutal transition-none group hover:bg-[#FFD700]"
                                >
                                    <div className="aspect-[16/10] relative transition-none border-b-4 border-black">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-8">
                                        <div className="flex items-center justify-between text-[10px] font-mono font-black text-black/40 mb-4 uppercase">
                                            <span className="bg-black text-white px-2 py-0.5">{post.category}</span>
                                            <span>{post.readTime}</span>
                                        </div>
                                        <h3 className="text-xl font-[Archivo Black] mb-4 group-hover:text-black leading-tight uppercase">
                                            {post.title}
                                        </h3>
                                        <p className="font-mono text-xs font-bold text-black/60 mb-8 line-clamp-3 uppercase leading-relaxed">
                                            {post.excerpt}
                                        </p>
                                        <Link
                                            href={`/blog/${post.id}`}
                                            className="text-black font-black text-xs uppercase flex items-center gap-2 group-hover:gap-4 transition-none"
                                        >
                                            KAYDI AÇ <ArrowRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* FOOTER_TERMINAL */}
            <footer id="terminals" className="bg-black text-white py-24 border-t-8 border-[var(--color-brand-safety-orange)]">
                <div className="container-brutal">
                    <div className="grid lg:grid-cols-4 gap-16">
                        <div className="lg:col-span-2">
                            <Link href="/" className="inline-block mb-8">
                                <div className="w-16 h-16 bg-[var(--color-brand-safety-orange)] flex items-center justify-center text-white font-black text-4xl shadow-[6px_6px_0px_0px_white]">
                                    V
                                </div>
                            </Link>
                            <h2 className="text-5xl font-[Archivo Black] mb-6 uppercase tracking-tighter">
                                VERAL <span className="text-[var(--color-brand-safety-orange)]">TORNA & TENEKE</span>
                            </h2>
                            <div className="flex flex-wrap gap-4 font-mono font-bold">
                                <Link href="/blog" className="underline decoration-[var(--color-brand-safety-orange)] decoration-4 underline-offset-4 hover:bg-[var(--color-brand-safety-orange)] p-1">SERVİS KAYITLARI</Link>
                                <Link href="/urunler" className="underline decoration-[var(--color-brand-safety-orange)] decoration-4 underline-offset-4 hover:bg-[var(--color-brand-safety-orange)] p-1">ÜRETİM HATTI</Link>
                                <Link href="/hakkimizda" className="underline decoration-[var(--color-brand-safety-orange)] decoration-4 underline-offset-4 hover:bg-[var(--color-brand-safety-orange)] p-1">TARİHÇE VERİSİ</Link>
                            </div>
                        </div>

                        <div className="font-mono space-y-8">
                            <div>
                                <h4 className="font-black text-[var(--color-brand-safety-orange)] mb-4 uppercase">MERKEZ ÜS</h4>
                                <p className="text-sm border-l-4 border-white pl-4">
                                    1512 Sk. No: 42/1<br />
                                    Alsancak/İzmir<br />
                                    TÜRKİYE BÖLGESİ
                                </p>
                            </div>
                            <div>
                                <h4 className="font-black text-[var(--color-brand-safety-orange)] mb-4 uppercase">GİRİŞ TERMİNALLERİ</h4>
                                <p className="text-sm border-l-4 border-white pl-4">
                                    TEL: +90 507 165 13 15<br />
                                    E-POSTA: LOG@VERAL.COM<br />
                                    INSTA: @VERALTICARET
                                </p>
                            </div>
                        </div>

                        <div className="font-mono text-xs flex flex-col justify-between">
                            <div>
                                <span className="block text-[var(--color-brand-safety-orange)] font-black mb-2 uppercase">SİSTEM DURUMU</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-[#4CAF50] animate-pulse"></div>
                                    <span>TÜM SİSTEMLER AKTİF</span>
                                </div>
                            </div>
                            <div className="mt-12 text-white/30">
                                © 2026 VERAL TORNA & TENEKE<br />
                                ÜRETİM KAYDI v4.5.11
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}

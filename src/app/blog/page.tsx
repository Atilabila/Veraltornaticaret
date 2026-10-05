import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { BlogListClient } from "@/components/blog/BlogListClient";
import { Breadcrumb } from "@/components/seo/Breadcrumb";

export const metadata: Metadata = {
    title: "Teknik Raporlar & Blog | Metal İmalat & UV Baskı | Veral Ticaret",
    description: "Toptan dosya teli, takvim tenekesi, UV metal poster ve malzeme bilimi üzerine teknik incelemeler, saha testleri ve İzmir Alsancak atölye rehberleri.",
    alternates: {
        canonical: "https://veralteneketicaret.com/blog",
    },
    openGraph: {
        title: "Teknik Raporlar & Blog | Veral Torna & Teneke Ticaret",
        description: "Metal imalatı, 1200 DPI UV baskı, takvim çıtası ve dosya teli üretim standartları teknik veri tabanı.",
        url: "https://veralteneketicaret.com/blog",
    },
};

const blogPosts = [
    {
        id: "takvim-tenekesi-imalati-izmir",
        title: "TAKVİM TENEKESİ İMALATI: İZMİR'DE SERİ ÜRETİM VE KALİTE STANDARTLARI",
        excerpt: "Takvim yayıncılığı için kritik bileşenler: teneke kalınlığı, büküm hassasiyeti ve matbaa tedarik süreçleri.",
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
        excerpt: "Arşiv sektörü için galvanizli çelik dosya teli analizi: metal yorgunluğu ve 96 saatlik tuz sisi korozyon testleri.",
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
        excerpt: "N35 Neodimyum mıknatıs sistemi ile duvara hasar vermeden saniyeler içinde asılan 1200 DPI UV baskılı tablolar.",
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
        excerpt: "Metal yüzeylerde UV kürleme ve serigrafi baskı tekniklerinin dayanıklılık ve renk kalibrasyonu açısından laboratuvar karşılaştırması.",
        category: "ENDÜSTRİYEL BASKI",
        date: "12.01.2026",
        readTime: "08 DAKİKA",
        image: "/porsche.png",
        featured: true,
        tags: ["METAL", "UV BASKI", "SERİGRAFİ", "PLAKA"],
    },
];

const categories = ["TÜM KAYITLAR", "ENDÜSTRİYEL İMALAT", "DEKORASYON", "KIRTASİYE EKİPMANLARI", "ENDÜSTRİYEL BASKI"];

export default function BlogPage() {
    const breadcrumbs = [
        { name: "Ana Sayfa", url: "/" },
        { name: "Teknik Raporlar & Blog", url: "/blog" },
    ];

    return (
        <main className="min-h-screen bg-white grid-terminal no-transition pb-24">
            {/* NAVIGATION_TERMINAL */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b-4 border-black py-4">
                <div className="container-brutal flex justify-between items-center gap-4">
                    <Link href="/" className="flex items-center gap-2 sm:gap-4 group shrink-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black flex items-center justify-center text-white font-black text-xl sm:text-2xl group-active:translate-x-1 group-active:translate-y-1 group-active:shadow-none transition-none shadow-[4px_4px_0px_0px_var(--color-brand-safety-orange)]">
                            V
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm sm:text-lg font-[Archivo Black] leading-none uppercase flex items-center gap-1">
                                VERAL <span className="text-[var(--color-brand-veral-green)] text-[8px] sm:text-[10px] bg-black px-1 py-0.5">IND</span>
                            </span>
                            <span className="text-[8px] sm:text-[10px] font-mono font-black text-black/40 uppercase tracking-[0.2em]">TORNA & TENEKE</span>
                        </div>
                    </Link>

                    <div className="hidden lg:flex items-center gap-8 font-mono font-bold text-sm">
                        <Link href="/" className="hover:bg-black hover:text-white px-2 py-1">ÜRETİM HATTI</Link>
                        <Link href="/urunler" className="hover:bg-black hover:text-white px-2 py-1">KATALOG</Link>
                        <Link href="/hakkimizda" className="hover:bg-black hover:text-white px-2 py-1">HAKKIMIZDA</Link>
                        <Link href="/sss" className="hover:bg-black hover:text-white px-2 py-1">SSS</Link>
                        <Link href="/blog" className="px-2 py-1 bg-black text-white">RAPORLAR</Link>
                    </div>

                    <Link href="/" className="btn-mechanical bg-[var(--color-brand-safety-orange)] text-white text-[10px] sm:text-xs font-black px-4 sm:px-6 py-2 uppercase truncate max-w-[140px] sm:max-w-none">
                        ANA SAYFAYA DÖN
                    </Link>
                </div>
            </nav>

            <div className="pt-24 px-4 md:px-8 max-w-6xl mx-auto">
                <Breadcrumb items={breadcrumbs} className="text-black" />
            </div>

            <BlogListClient posts={blogPosts} categories={categories} />

            {/* FOOTER_TERMINAL */}
            <footer className="bg-zinc-900 text-white py-12 border-t border-zinc-700">
                <div className="container-brutal text-center font-mono opacity-80 text-xs">
                    © 2026 VERAL TORNA & TENEKE // TEKNİK RAPOR ARŞİVİ · <Link href="/yazar/oguzcan-veral" className="underline hover:text-amber-400">Teknik Editör: Oğuzcan Veral</Link>
                </div>
            </footer>
        </main>
    );
}

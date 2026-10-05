import React from "react";
import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { BlogListClient } from "@/components/blog/BlogListClient";

export const metadata: Metadata = {
    title: "Teknik Raporlar & Blog | Metalurji, Tolerans ve Zanaat | Veral Ticaret",
    description: "Toptan dosya teli, takvim tenekesi, DIN EN 10202 normları, mikron toleranslı giyotin kesim ve 4K UV metal baskı üzerine teknik incelemeler ve Alsancak atölye raporları.",
    alternates: {
        canonical: "https://veralteneketicaret.com/blog",
    },
    openGraph: {
        title: "Teknik Raporlar & Blog | Veral Teneke Ticaret İzmir",
        description: "Metal imalatı, 1200 DPI UV baskı, takvim çıtası ve dosya teli üretim standartları teknik veri tabanı.",
        url: "https://veralteneketicaret.com/blog",
    },
};

export const blogPosts = [
    {
        id: "takvim-tenekesi-imalati-izmir",
        title: "Takvim Tenekesi İmalatı: İzmir'de Seri Üretim ve DIN Kalite Standartları",
        excerpt: "Takvim yayıncılığı ve matbaalar için kritik parametreler: teneke kalınlığı, çift kanal koruyucu büküm radüsü ve korozyon direnci analizleri.",
        category: "ENDÜSTRİYEL İMALAT",
        date: "03.02.2026",
        readTime: "6 Dakika",
        image: "/images/services/takvim-teneke.jpg",
        featured: true,
        tags: ["Takvim Tenekesi", "Seri İmalat", "Alsancak", "DIN EN 10202"],
    },
    {
        id: "dosya-teli-ve-arsiv-sistemleri",
        title: "Dosya Teli Üretiminde Malzeme Bilimi: Paslanmaz ve Yüksek Elastikiyet",
        excerpt: "Devlet arşivleri ve kurumsal ofisler için polimer kaplı çelik dosya teli incelemesi: 5.000+ büküm direnci ve 96 saatlik tuz sisi korozyon testleri.",
        category: "KIRTASİYE EKİPMANLARI",
        date: "03.02.2026",
        readTime: "5 Dakika",
        image: "/images/services/dosya-teli.jpg",
        featured: false,
        tags: ["Dosya Teli", "Arşiv", "Polimer Kaplama", "Mekanik Direnç"],
    },
    {
        id: "giyotin-sac-kesim-ve-tolerans-standartlari",
        title: "CNC Giyotin Sac Kesiminde Tolerans ve Çapaksız Gönye Kriterleri",
        excerpt: "0.15 mm - 3.00 mm sac kalınlıklarında lif düzlemini bozmadan yapılan ±0.05 mm hassasiyetindeki endüstriyel makas ebatlama yöntemleri.",
        category: "ENDÜSTRİYEL İMALAT",
        date: "18.01.2026",
        readTime: "7 Dakika",
        image: "/images/services/giyotin-kesim.webp",
        featured: true,
        tags: ["Giyotin Kesim", "CNC Makas", "Tolerans", "DKP Sac"],
    },
    {
        id: "miknatisli-magnet-ve-metal-poster-estetigi",
        title: "Mıknatıslı Metal Posterler: N35 Neodimyum Askı Sistemi ile Duvarı Delmeden Montaj",
        excerpt: "Duvar delme, çivi ve matkap gerektirmeyen 3M VHB manyetik tutucu teknolojisi ve 1.5 mm çelik plaka üzerinde 4K UV kürlemeli mikronize baskı.",
        category: "DEKORASYON & SANAT",
        date: "10.01.2026",
        readTime: "8 Dakika",
        image: "/images/services/magnet-poster.jpg",
        featured: false,
        tags: ["Metal Poster", "Neodimyum", "Manyetik Montaj", "UV Kürleme"],
    },
    {
        id: "endustriyel-metal-baski-rehberi",
        title: "Endüstriyel 4K UV Metal Baskı: Fırın Kürleme ve Güneş Solmazlığı Analizi",
        excerpt: "Metal levhalarda 1200 DPI piezoelektrik baskı ve çift kat vernik kürleme. Dış mekan, nem ve UV ışınlarına karşı 10 yıllık dayanım karşılaştırması.",
        category: "ENDÜSTRİYEL BASKI",
        date: "05.01.2026",
        readTime: "8 Dakika",
        image: "/hero-izmir-metal-poster.jpg",
        featured: false,
        tags: ["4K UV Baskı", "Vernik Kürleme", "Solmazlık", "Alsancak Zanaat"],
    },
    {
        id: "rulo-sac-dilme-slitting-hatlari",
        title: "Rulo Teneke Sac Dilimleme (Slitting) ve Dar Şerit Sarım Mühendisliği",
        excerpt: "Dairesel çelik disk bıçaklarla minimum 8 mm genişliğe kadar mikron toleranslı rulo dilme ve neme dayanıklı ambalajlama operasyonları.",
        category: "ENDÜSTRİYEL İMALAT",
        date: "28.12.2025",
        readTime: "6 Dakika",
        image: "/images/services/rulo-dilimleme.webp",
        featured: false,
        tags: ["Rulo Dilme", "Slitting", "Şerit Sac", "Alsancak Hat"],
    },
];

const categories = [
    "TÜM KAYITLAR",
    "ENDÜSTRİYEL İMALAT",
    "KIRTASİYE EKİPMANLARI",
    "DEKORASYON & SANAT",
    "ENDÜSTRİYEL BASKI"
];

export default function BlogPage() {
    const breadcrumbs = [
        { name: "Ana Sayfa", url: "/" },
        { name: "Teknik Raporlar & Blog", url: "/blog" },
    ];

    return (
        <main className="min-h-screen bg-[#fafafa] text-[#161616]">
            <Navigation />

            {/* Breadcrumb Bar */}
            <div className="pt-28 pb-4 px-4 md:px-8 max-w-7xl mx-auto">
                <Breadcrumb items={breadcrumbs} className="text-zinc-600" />
            </div>

            {/* Blog List Client Container */}
            <BlogListClient posts={blogPosts} categories={categories} />

            <Footer />
        </main>
    );
}

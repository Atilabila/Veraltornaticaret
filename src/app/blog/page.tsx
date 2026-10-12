import React from "react";
import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { BlogListClient } from "@/components/blog/BlogListClient";
import { blogPosts } from "@/lib/blog-posts";

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

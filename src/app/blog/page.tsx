import React from "react";
import type { Metadata } from "next";
import { absUrl } from "@/lib/site";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { BlogListClient } from "@/components/blog/BlogListClient";
import { blogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
    title: "Atölye notları",
    description: "Dosya teli, takvim tenekesi, sac kesim ve metal baskı hakkında kısa notlar.",
    alternates: {
        canonical: absUrl("/blog"),
    },
    openGraph: {
        title: "Atölye notları | Veral Teneke Ticaret",
        description: "Dosya teli, takvim tenekesi, sac kesim ve metal baskı.",
        url: absUrl("/blog"),
    },
};

const categories = ["TÜM KAYITLAR", "Atölye"];

export default function BlogPage() {
    const breadcrumbs = [
        { name: "Ana Sayfa", url: "/" },
        { name: "Atölye notları", url: "/blog" },
    ];

    return (
        <main id="icerik" className="min-h-screen bg-atl-bg text-atl-text">
            <Navigation />

            {/* Breadcrumb Bar */}
            <div className="pt-28 pb-4 px-4 md:px-8 max-w-7xl mx-auto">
                <Breadcrumb items={breadcrumbs} className="text-atl-muted" />
            </div>

            {/* Blog List Client Container */}
            <BlogListClient posts={blogPosts} categories={categories} />

            <Footer />
        </main>
    );
}

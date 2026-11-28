import React from "react";
import type { Metadata } from "next";
import { absUrl, SITE_ORIGIN } from "@/lib/site";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { Calendar, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
    title: "Oğuzcan Veral",
    description: "Oğuzcan Veral, Veral Torna & Teneke Ticaret'in atölye sahibidir. Alsancak, 1471 Sokak No:12/A.",
    alternates: {
        canonical: absUrl("/yazar/oguzcan-veral"),
    },
    openGraph: {
        title: "Oğuzcan Veral",
        description: "Atölye sahibi. Alsancak, 1471 Sokak No:12/A.",
        url: absUrl("/yazar/oguzcan-veral"),
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

const authorArticles = blogPosts.map((post) => ({
    slug: post.id,
    title: post.title,
    desc: post.excerpt,
    date: post.date,
    readTime: post.readTime,
}));

export default function OguzcanVeralProfilePage() {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Oğuzcan Veral",
        "jobTitle": "Atölye sahibi",
        "worksFor": {
            "@type": "Organization",
            "name": "Veral Torna & Teneke Ticaret",
            "url": SITE_ORIGIN,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "1471 Sokak No:12/A Alsancak",
                "addressLocality": "Konak",
                "addressRegion": "İzmir",
                "addressCountry": "TR",
            },
        },
        "url": absUrl("/yazar/oguzcan-veral"),
        "sameAs": [
            absUrl("/hakkimizda"),
        ],
        "knowsAbout": [
            "Dosya teli",
            "Takvim tenekesi",
            "Tef zili",
            "Sac kesim",
            "Metal baskı",
        ],
        "description": "Veral Torna & Teneke Ticaret'in atölye sahibi. Alsancak, 1471 Sokak No:12/A.",
    };

    const breadcrumbs = [
        { name: "Ana Sayfa", url: "/" },
        { name: "Yazarlar & Atölye", url: "/blog" },
        { name: "Oğuzcan Veral", url: "/yazar/oguzcan-veral" },
    ];

    return (
        <main id="icerik" className="min-h-screen bg-atl-bg text-atl-text">
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
                <div className="rounded-3xl border border-atl-line bg-atl-surface p-8 md:p-14 shadow-lg relative overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        {/* Avatar / Portrait */}
                        <div className="lg:col-span-4 flex flex-col items-center sm:items-start">
                            <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-2xl overflow-hidden border-2 border-atl-brass/30 bg-atl-surface-2 shadow-md">
                                <Image
                                    src="/hero-izmir-metal-poster.jpg"
                                    alt="Oğuzcan Veral - İmalat Direktörü"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>

                        {/* Bio Details */}
                        <div className="lg:col-span-8 space-y-5">
                            <div>
                                <h1 className="text-3xl sm:text-5xl font-display text-atl-text tracking-tight">
                                    Oğuzcan Veral
                                </h1>
                                <p className="text-sm sm:text-base text-atl-muted font-medium mt-1">
                                    Atölye sahibi
                                </p>
                            </div>

                            <p className="text-sm sm:text-base text-atl-muted leading-relaxed">
                                Veral Torna & Teneke Ticaret&apos;in atölyesini yürütür. Adres: 1471 Sokak No:12/A, Alsancak / İzmir. Telefon: 0507 165 13 15.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Published Technical Articles */}
            <section className="container mx-auto px-4 sm:px-6 lg:px-12 py-12">
                <div className="mb-8">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-atl-brass block mb-1">
                        TEKNİK ARŞİV
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-display text-atl-text">
                        Kısa notlar
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {authorArticles.map((art) => (
                        <Link
                            key={art.slug}
                            href={`/blog/${art.slug}`}
                            className="p-6 rounded-2xl border border-atl-line bg-atl-surface hover:border-atl-brass/60 hover:shadow-lg transition-all flex flex-col justify-between group"
                        >
                            <div>
                                <div className="flex items-center gap-3 text-xs text-atl-muted font-mono mb-3">
                                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {art.date}</span>
                                    <span>•</span>
                                    <span>{art.readTime} okuma</span>
                                </div>
                                <h3 className="text-lg font-bold text-atl-text group-hover:text-atl-brass transition-colors leading-snug mb-2">
                                    {art.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-atl-muted leading-relaxed">
                                    {art.desc}
                                </p>
                            </div>
                            <div className="mt-4 pt-4 border-t border-atl-line flex items-center justify-between text-xs font-bold text-atl-brass">
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

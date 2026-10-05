"use client";

import React, { useState } from "react";
import { ArrowRight, Calendar, Clock, Search, Activity, Database } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface BlogPostItem {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
    image: string;
    featured: boolean;
    tags: string[];
}

interface BlogListClientProps {
    posts: BlogPostItem[];
    categories: string[];
}

export function BlogListClient({ posts, categories }: BlogListClientProps) {
    const [selectedCategory, setSelectedCategory] = useState("TÜM KAYITLAR");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredPosts = posts.filter((post) => {
        const matchesCategory = selectedCategory === "TÜM KAYITLAR" || post.category === selectedCategory;
        const matchesSearch =
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const featuredPosts = posts.filter((post) => post.featured);

    return (
        <div>
            {/* HEADER_MODULE */}
            <section className="pt-28 pb-16 bg-[#E5E7EB] border-b-8 border-black">
                <div className="container-brutal">
                    <div className="max-w-4xl border-8 border-black bg-white p-8 md:p-12 shadow-brutal relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                            <Database className="w-64 h-64 text-black" />
                        </div>
                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-3 bg-black text-white px-3 py-1 font-mono text-xs font-black mb-6">
                                <Activity className="w-4 h-4 text-[var(--color-brand-safety-orange)]" />
                                [ MERKEZİ TEKNİK RAPOR VERİTABANI v2026 ]
                            </div>
                            <h1 className="text-3xl sm:text-5xl md:text-7xl font-[Archivo Black] leading-none mb-8 uppercase">
                                TEKNİK <span className="text-[var(--color-brand-safety-orange)]">RAPORLAR</span>
                            </h1>

                            {/* SEARCH_TERMINAL */}
                            <div className="relative border-4 border-black group">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-black" />
                                <input
                                    type="text"
                                    placeholder="İÇERİK VEYA MALZEME ARA..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white font-mono font-bold text-base md:text-lg pl-16 pr-6 py-5 focus:outline-none focus:bg-[var(--color-brand-accent)] transition-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CATEGORY_TERMINAL */}
            <section className="py-8 border-b-8 border-black bg-white">
                <div className="container-brutal">
                    <div className="flex flex-wrap gap-3 justify-center">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-6 py-3 font-mono font-black text-xs md:text-sm border-4 border-black shadow-brutal-sm uppercase cursor-pointer ${
                                    selectedCategory === category
                                        ? "bg-black text-white shadow-none translate-x-0.5 translate-y-0.5"
                                        : "bg-white text-black hover:bg-[var(--color-brand-safety-orange)] hover:text-white"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURED POSTS */}
            {selectedCategory === "TÜM KAYITLAR" && searchQuery === "" && (
                <section className="py-16 bg-[#E5E7EB] border-b-8 border-black">
                    <div className="container-brutal">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="w-6 h-6 bg-black" />
                            <h2 className="text-2xl md:text-3xl font-[Archivo Black] uppercase">ÖNCELİKLİ RAPORLAR</h2>
                        </div>
                        <div className="grid md:grid-cols-2 gap-0 border-8 border-black shadow-brutal bg-white overflow-hidden">
                            {featuredPosts.map((post) => (
                                <article
                                    key={post.id}
                                    className="border-b-8 md:border-b-0 md:border-r-8 last:border-b-0 md:last:border-r-0 border-black group hover:bg-black/5"
                                >
                                    <div className="aspect-[16/9] relative overflow-hidden border-b-8 border-black">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            priority
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover"
                                        />
                                        <div className="absolute top-4 left-4 z-10">
                                            <span className="px-4 py-1.5 bg-[var(--color-brand-safety-orange)] text-white text-[11px] font-black border-2 border-black shadow-brutal-sm">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-8 md:p-10">
                                        <div className="flex gap-6 font-mono text-xs font-black text-black/50 mb-6 border-l-4 border-black pl-4">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {post.date}
                                            </span>
                                            <span className="flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5" />
                                                {post.readTime}
                                            </span>
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-[Archivo Black] mb-4 leading-snug group-hover:text-[var(--color-brand-safety-orange)]">
                                            {post.title}
                                        </h3>
                                        <p className="font-mono text-xs md:text-sm font-bold text-black/70 mb-8 leading-relaxed uppercase">
                                            {post.excerpt}
                                        </p>
                                        <Link
                                            href={`/blog/${post.id}`}
                                            className="bg-black text-white text-xs font-black px-6 py-3 uppercase flex items-center justify-between group/btn hover:bg-zinc-800 transition-colors"
                                        >
                                            DOSYAYI İNCELE <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform" />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ALL REPORTS GRID */}
            <section className="py-16">
                <div className="container-brutal">
                    <div className="flex items-center justify-between mb-12 px-6 border-l-8 border-black">
                        <h2 className="text-2xl md:text-3xl font-[Archivo Black] uppercase">
                            {selectedCategory === "TÜM KAYITLAR" ? "KAYIT ARŞİVİ" : `${selectedCategory} LİSTESİ`}
                        </h2>
                        <div className="font-mono text-xs font-black text-black/40">
                            [ ADET: {filteredPosts.length} ]
                        </div>
                    </div>

                    {filteredPosts.length === 0 ? (
                        <div className="border-8 border-black p-16 text-center bg-[#E5E7EB]">
                            <p className="font-mono text-lg font-black uppercase text-black/40">EŞLEŞEN RAPOR BULUNAMADI</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map((post) => (
                                <article
                                    key={post.id}
                                    className="border-4 border-black bg-white shadow-brutal transition-none group hover:bg-[var(--color-brand-accent)]"
                                >
                                    <div className="aspect-[16/10] relative border-b-4 border-black">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center justify-between text-[10px] font-mono font-black text-black/50 mb-3 uppercase">
                                            <span className="bg-black text-white px-2 py-0.5">{post.category}</span>
                                            <span>{post.readTime}</span>
                                        </div>
                                        <h3 className="text-lg font-[Archivo Black] mb-3 leading-snug group-hover:text-black uppercase line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="font-mono text-xs text-black/70 mb-6 uppercase line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                        <Link
                                            href={`/blog/${post.id}`}
                                            className="font-mono text-xs font-black text-black flex items-center justify-between group-hover:text-black"
                                        >
                                            RAPORU OKU <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

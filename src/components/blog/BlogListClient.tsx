"use client";

import React, { useState } from "react";
import { ArrowRight, Calendar, Clock, Search, BookOpen, Sparkles, Tag, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AuthorCard } from "./AuthorCard";

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
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    const featuredPost = posts.find((post) => post.featured) || posts[0];
    const nonFeaturedPosts = filteredPosts.filter((post) =>
        selectedCategory === "TÜM KAYITLAR" && searchQuery === "" ? post.id !== featuredPost?.id : true
    );

    return (
        <div className="pb-24">
            {/* HERO & SEARCH MODULE */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto pt-4 pb-12">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
                    <div className="max-w-3xl space-y-4">
                        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-amber-50 text-amber-900 border border-amber-600/20 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                            TEKNİK MAKALE VE SAHA RAPORLARI
                        </span>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 tracking-tight leading-[1.1]">
                            Metalurji, Tolerans ve Zanaat Hafızası
                        </h1>
                        <p className="text-base md:text-lg text-zinc-600 leading-relaxed font-normal">
                            İzmir Alsancak torna ve pres atölyemizden toptan dosya teli, takvim tenekesi, DIN EN 10202 normları ve 4K UV metal baskı teknolojisi üzerine teknik incelemeler.
                        </p>
                    </div>

                    {/* SEARCH INPUT */}
                    <div className="w-full lg:w-96 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Makale, hammadde veya konu ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-zinc-200 rounded-xl pl-12 pr-4 py-3.5 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 shadow-sm transition-all"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-zinc-400 hover:text-zinc-700"
                            >
                                Temizle
                            </button>
                        )}
                    </div>
                </div>

                {/* CATEGORY FILTER CHIPS */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-zinc-200">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                                selectedCategory === category
                                    ? "bg-amber-600 text-white shadow-md shadow-amber-600/20"
                                    : "bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:border-amber-500"
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </section>

            {/* FEATURED POST HERO CARD (When on "TÜM KAYITLAR" and no search) */}
            {selectedCategory === "TÜM KAYITLAR" && searchQuery === "" && featuredPost && (
                <section className="px-4 md:px-8 max-w-7xl mx-auto mb-16">
                    <div className="group rounded-3xl bg-white border border-zinc-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-500 transition-all duration-300">
                        <div className="grid lg:grid-cols-12 gap-0">
                            <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto bg-zinc-100 overflow-hidden">
                                <Image
                                    src={featuredPost.image}
                                    alt={featuredPost.title}
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 100vw, 700px"
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-mono font-bold text-amber-800 border border-amber-600/20 shadow-sm flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                                    ÖNE ÇIKAN TEKNİK RAPOR
                                </div>
                            </div>

                            <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
                                        <span className="text-amber-700 font-bold uppercase">{featuredPost.category}</span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5" /> {featuredPost.date}
                                        </span>
                                        <span>•</span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}
                                        </span>
                                    </div>

                                    <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 group-hover:text-amber-700 transition-colors leading-snug">
                                        <Link href={`/blog/${featuredPost.id}`}>
                                            {featuredPost.title}
                                        </Link>
                                    </h2>

                                    <p className="text-sm md:text-base text-zinc-600 leading-relaxed font-normal">
                                        {featuredPost.excerpt}
                                    </p>

                                    <div className="flex flex-wrap gap-1.5 pt-2">
                                        {featuredPost.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-700 text-xs font-mono font-medium"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-8">
                                    <Link
                                        href={`/blog/${featuredPost.id}`}
                                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-amber-600/20 group-hover:scale-105"
                                    >
                                        <span>Raporu İncele</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* BLOG POSTS BENTO GRID */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto mb-16">
                {nonFeaturedPosts.length === 0 ? (
                    <div className="p-12 text-center bg-white border border-zinc-200 rounded-3xl">
                        <p className="text-zinc-600 font-mono text-sm">
                            Aradığınız kriterlere uygun bir teknik rapor bulunamadı.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {nonFeaturedPosts.map((post) => (
                            <article
                                key={post.id}
                                className="group flex flex-col justify-between bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-amber-500 transition-all duration-300"
                            >
                                <div>
                                    <div className="relative w-full aspect-[16/10] bg-zinc-100 overflow-hidden border-b border-zinc-200">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            sizes="(min-width: 1024px) 380px, 92vw"
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono font-bold text-amber-800 border border-amber-600/20 shadow-sm">
                                            {post.category}
                                        </div>
                                        <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md text-white px-2 py-0.5 rounded text-[10px] font-mono font-semibold flex items-center gap-1">
                                            <Clock className="w-3 h-3 text-amber-400" />
                                            {post.readTime}
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-3">
                                            <Calendar className="w-3.5 h-3.5" />
                                            <span>{post.date}</span>
                                        </div>

                                        <h3 className="text-lg font-bold text-zinc-900 group-hover:text-amber-700 transition-colors leading-snug mb-3">
                                            <Link href={`/blog/${post.id}`}>
                                                {post.title}
                                            </Link>
                                        </h3>

                                        <p className="text-sm text-zinc-600 leading-relaxed font-normal mb-4 line-clamp-3">
                                            {post.excerpt}
                                        </p>

                                        <div className="flex flex-wrap gap-1">
                                            {post.tags.slice(0, 3).map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 text-[11px] font-mono"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 pt-0">
                                    <Link
                                        href={`/blog/${post.id}`}
                                        className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-zinc-50 group-hover:bg-amber-600 group-hover:text-white text-zinc-900 font-semibold text-xs transition-colors"
                                    >
                                        <span>Raporu Oku</span>
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>

            {/* AUTHOR ATTRIBUTION */}
            <section className="px-4 md:px-8 max-w-7xl mx-auto">
                <div className="mb-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-amber-700 block font-bold">
                        TEKNİK İÇERİK SORUMLUSU & BAŞYAZAR
                    </span>
                </div>
                <AuthorCard />
            </section>
        </div>
    );
}

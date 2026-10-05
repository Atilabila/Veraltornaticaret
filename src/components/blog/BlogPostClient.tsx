"use client";

import React from "react";
import { ArrowLeft, Calendar, Clock, Tag, Share2, ChevronRight, ArrowRight, ShieldCheck, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AuthorCard } from "./AuthorCard";

interface BlogPost {
    title: string;
    category: string;
    date: string;
    readTime: string;
    image: string;
    tags: string[];
    content: string;
}

export default function BlogPostClient({ post, slug, otherPosts }: { post: BlogPost, slug: string, otherPosts: any[] }) {
    return (
        <article className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
            {/* BREADCRUMB */}
            <nav className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-8 uppercase flex-wrap">
                <Link href="/" className="hover:text-amber-700 transition-colors">Ana Sayfa</Link>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                <Link href="/blog" className="hover:text-amber-700 transition-colors">Teknik Raporlar & Blog</Link>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-amber-800 font-bold">{post.category}</span>
            </nav>

            <div className="grid lg:grid-cols-12 gap-10 items-start">
                {/* SIDEBAR METADATA */}
                <aside className="lg:col-span-4 space-y-6">
                    <div className="bg-white border border-zinc-200 rounded-3xl p-6 lg:p-8 shadow-sm space-y-6 lg:sticky lg:top-28">
                        <div>
                            <span className="inline-block px-3 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-600/20 text-xs font-mono font-bold uppercase mb-4">
                                {post.category}
                            </span>
                            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 leading-snug tracking-tight">
                                {post.title}
                            </h1>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-zinc-200 text-xs font-mono text-zinc-600">
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-400 uppercase">Yayın Tarihi:</span>
                                <span className="font-semibold text-zinc-900 flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5 text-amber-600" /> {post.date}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-400 uppercase">Okuma Süresi:</span>
                                <span className="font-semibold text-zinc-900 flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5 text-amber-600" /> {post.readTime}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-400 uppercase">Yazar & Editör:</span>
                                <Link href="/yazar/oguzcan-veral" className="font-bold text-amber-700 hover:underline">
                                    Oğuzcan Veral
                                </Link>
                            </div>
                        </div>

                        {/* TAGS */}
                        <div className="pt-4 border-t border-zinc-200">
                            <span className="block text-xs font-mono font-bold text-zinc-400 uppercase mb-2">Etiketler</span>
                            <div className="flex flex-wrap gap-1.5">
                                {post.tags.map((tag) => (
                                    <span key={tag} className="px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-700 text-xs font-mono font-medium">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* WORKSHOP RFQ CALLOUT */}
                        <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-600/20 space-y-3">
                            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-amber-600" /> DOĞRUDAN İMALAT DESTEĞİ
                            </span>
                            <p className="text-xs text-zinc-700 leading-relaxed font-normal">
                                Bu konudaki teknik şartnameniz veya toptan imalat siparişiniz için atölye şefimizle doğrudan görüşün.
                            </p>
                            <Link
                                href="/teklif-al"
                                className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
                            >
                                <span>Hızlı Teklif Al</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                </aside>

                {/* MAIN CONTENT BODY */}
                <div className="lg:col-span-8 bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 lg:p-14 shadow-sm">
                    {/* COVER IMAGE */}
                    <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 mb-10 shadow-sm">
                        <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            priority
                            sizes="(max-width: 1024px) 100vw, 800px"
                            className="object-cover"
                        />
                    </div>

                    {/* FORMATTED ARTICLE CONTENT */}
                    <div
                        className="text-zinc-800 text-base md:text-lg leading-relaxed space-y-6"
                        dangerouslySetInnerHTML={{ __html: formatMarkdown(post.content) }}
                    />

                    {/* AUTHOR CARD */}
                    <div className="mt-14 pt-8 border-t border-zinc-200">
                        <AuthorCard />
                    </div>
                </div>
            </div>

            {/* RELATED ARTICLES */}
            {otherPosts && otherPosts.length > 0 && (
                <section className="mt-20 pt-12 border-t border-zinc-200">
                    <div className="mb-8">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-amber-700 block mb-1">
                            ÖNERİLEN İNCELEMELER
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
                            İlgili Teknik Raporlar
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {otherPosts.map((otherPost) => (
                            <Link
                                key={otherPost.id}
                                href={`/blog/${otherPost.id}`}
                                className="group p-6 rounded-2xl bg-white border border-zinc-200 shadow-sm hover:shadow-lg hover:border-amber-500 transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-3">
                                        <span className="text-amber-700 font-bold uppercase">{otherPost.category}</span>
                                        <span>{otherPost.readTime}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-zinc-900 group-hover:text-amber-700 transition-colors leading-snug mb-3">
                                        {otherPost.title}
                                    </h3>
                                </div>
                                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 pt-4 border-t border-zinc-100">
                                    <span>Raporu Oku</span>
                                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </article>
    );
}

function formatMarkdown(content: string): string {
    let html = content
        .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-zinc-900 mt-10 mb-4 tracking-tight flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-amber-600 inline-block"></span>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 class="text-2xl sm:text-3xl font-black text-zinc-900 mt-12 mb-6 tracking-tight border-b border-zinc-200 pb-3">$1</h2>')
        .replace(/^# (.*$)/gim, '<h2 class="text-2xl sm:text-3xl font-black text-zinc-900 mb-6 tracking-tight border-b border-zinc-200 pb-3">$1</h2>')
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-zinc-900">$1</strong>')
        .replace(/^- (.*$)/gim, '<li class="ml-6 list-none flex items-start gap-2.5 before:content-[\'•\'] before:text-amber-600 before:font-bold mb-2.5 text-zinc-700 font-normal">$1</li>')
        .replace(/^\d+\. (.*$)/gim, '<li class="ml-6 list-decimal mb-2.5 text-zinc-700 font-normal pl-1">$1</li>')
        .replace(/^---$/gim, '<hr class="border-t border-zinc-200 my-10" />')
        .replace(/\n\n/g, '</p><p class="mb-6 leading-relaxed font-normal text-zinc-700">');

    html = '<p class="mb-6 leading-relaxed font-normal text-zinc-700">' + html + '</p>';

    return html;
}

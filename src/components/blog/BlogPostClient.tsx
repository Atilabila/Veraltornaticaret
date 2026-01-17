"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Tag, Share2, ChevronRight, Terminal, ChevronLeft, ArrowRight, Activity } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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
        <article className="pt-40 pb-24">
            <div className="container-brutal">
                {/* BREADCRUMB_LOG */}
                <div className="flex items-center gap-4 font-mono text-xs font-black mb-12 uppercase">
                    <Link href="/blog" className="text-black/40 hover:text-black hover:bg-[#FFD700] px-2 py-1 border-2 border-transparent hover:border-black">RAPORLAR</Link>
                    <ChevronRight className="w-4 h-4 text-black/20" />
                    <span className="bg-black text-white px-2 py-1">{post.category}</span>
                    <ChevronRight className="w-4 h-4 text-black/20" />
                    <span className="text-black/30 truncate max-w-[200px]">{post.title}</span>
                </div>

                <div className="grid lg:grid-cols-12 gap-0 border-8 border-black shadow-brutal bg-white overflow-hidden">
                    {/* SIDEBAR_META */}
                    <aside className="lg:col-span-4 border-b-8 lg:border-b-0 lg:border-r-8 border-black bg-[#E5E7EB] p-12">
                        <div className="sticky top-48">
                            <div className="mb-12">
                                <div className="inline-flex items-center gap-2 bg-black text-white px-3 py-1 font-mono text-[10px] font-black mb-4">
                                    [ DOSYA TANIMLAYICI ]
                                </div>
                                <h1 className="text-4xl font-[Archivo Black] leading-tight mb-8">
                                    {post.title}
                                </h1>
                            </div>

                            <div className="space-y-8 font-mono">
                                <div className="border-l-4 border-black pl-4">
                                    <span className="block text-[10px] font-black text-black/40 mb-1">YAYIN TARİHİ</span>
                                    <span className="text-sm font-bold flex items-center gap-2">
                                        <Calendar className="w-4 h-4" /> {post.date}
                                    </span>
                                </div>
                                <div className="border-l-4 border-black pl-4">
                                    <span className="block text-[10px] font-black text-black/40 mb-1">OKUMA SÜRESİ</span>
                                    <span className="text-sm font-bold flex items-center gap-2">
                                        <Clock className="w-4 h-4" /> {post.readTime}
                                    </span>
                                </div>
                                <div className="border-l-4 border-black pl-4">
                                    <span className="block text-[10px] font-black text-black/40 mb-1">ETİKETLER</span>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {post.tags.map((tag) => (
                                            <span key={tag} className="px-2 py-0.5 bg-white border-2 border-black text-[10px] font-black">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* CONTENT_STREAM */}
                    <div className="lg:col-span-8 p-12 md:p-20">
                        <div className="aspect-[21/9] relative border-8 border-black mb-16 shadow-brutal-sm">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 grid-terminal opacity-30" />
                        </div>

                        <div
                            className="font-mono text-lg font-bold leading-relaxed space-y-8 prose-industrial"
                            dangerouslySetInnerHTML={{ __html: formatMarkdown(post.content) }}
                        />
                    </div>
                </div>

                {/* RELATED_MODULES */}
                <div className="mt-24">
                    <div className="flex items-center gap-4 mb-12">
                        <Terminal className="w-8 h-8" />
                        <h2 className="text-3xl font-[Archivo Black] uppercase">İLGİLİ YAZILAR</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {otherPosts.map((otherPost) => (
                            <Link
                                key={otherPost.id}
                                href={`/blog/${otherPost.id}`}
                                className="border-4 border-black bg-white p-8 shadow-brutal transition-none hover:bg-[#FFD700] group"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <span className="bg-black text-white px-2 py-0.5 font-mono text-[10px] font-black">{otherPost.category}</span>
                                    <Activity className="w-6 h-6 opacity-30 group-hover:opacity-100" />
                                </div>
                                <h3 className="text-2xl font-[Archivo Black] mb-4 group-hover:text-black uppercase leading-tight">
                                    {otherPost.title}
                                </h3>
                                <div className="font-mono text-xs font-black text-black/40 flex items-center gap-2">
                                    YAZIYI OKU <ArrowRight className="w-4 h-4" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
}

function formatMarkdown(content: string): string {
    let html = content
        .replace(/^### (.*$)/gim, '<h3 class="text-xl font-[Archivo Black] text-[var(--color-brand-safety-orange)] mt-12 mb-6 uppercase border-b-4 border-black pb-2">$1</h3>')
        .replace(/^## (.*$)/gim, '<h2 class="text-3xl font-[Archivo Black] text-black mt-16 mb-8 uppercase border-b-8 border-black pb-4">$2</h2>')
        .replace(/^# (.*$)/gim, '<h1 class="text-4xl font-[Archivo Black] text-black mb-12 uppercase">$1</h1>')
        .replace(/\*\*(.*?)\*\*/g, '<strong class="bg-[#FFD700] px-1 text-black">$1</strong>')
        .replace(/^- (.*$)/gim, '<li class="ml-8 list-none flex items-start gap-4 before:content-[\'>>\'] before:text-[var(--color-brand-safety-orange)] mb-2">$1</li>')
        .replace(/^---$/gim, '<hr class="border-t-8 border-black my-16" />')
        .replace(/\n\n/g, '</p><p class="mb-6">');

    html = '<p class="mb-6">' + html + '</p>';

    return html;
}

"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Search, FileText, HelpCircle, Phone } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageContainer } from "@/components/layout/PageContainer";

export default function NotFound() {
    return (
        <PageShell variant="muted" padded={false}>
            <PageContainer className="min-h-[75vh] flex flex-col items-center justify-center text-center py-20 px-4">
                <div className="space-y-6 max-w-xl">
                    <span className="inline-block px-3 py-1 rounded font-mono text-xs font-bold uppercase tracking-widest bg-zinc-800 text-emerald-400 border border-zinc-700">
                        [ HATA KODU: 404 // SAYFA MEVCUT DEĞİL ]
                    </span>

                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                        Aradığınız Sayfa Bulunamadı
                    </h1>

                    <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                        Ulaşmaya çalıştığınız içerik taşınmış, adı değiştirilmiş veya yayından kaldırılmış olabilir. Aşağıdaki hızlı bağlantıları kullanarak aradığınız ürüne veya imalat hattına hemen ulaşabilirsiniz.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-left">
                        <Link
                            href="/urunler"
                            className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:border-emerald-500/50 hover:bg-zinc-800/80 transition-all group"
                        >
                            <Search className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                            <span className="block text-sm font-bold text-white">Ürün Kataloğu</span>
                            <span className="text-xs text-zinc-500">Tüm metal ürünler</span>
                        </Link>

                        <Link
                            href="/hizmetler"
                            className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:border-emerald-500/50 hover:bg-zinc-800/80 transition-all group"
                        >
                            <FileText className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                            <span className="block text-sm font-bold text-white">İmalat Hatları</span>
                            <span className="text-xs text-zinc-500">Torna & teneke</span>
                        </Link>

                        <Link
                            href="/sss"
                            className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:border-emerald-500/50 hover:bg-zinc-800/80 transition-all group"
                        >
                            <HelpCircle className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                            <span className="block text-sm font-bold text-white">Sıkça Sorulanlar</span>
                            <span className="text-xs text-zinc-500">Mıknatıs & kargo</span>
                        </Link>

                        <Link
                            href="/teklif-al"
                            className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/60 hover:border-emerald-500/50 hover:bg-zinc-800/80 transition-all group"
                        >
                            <Phone className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                            <span className="block text-sm font-bold text-white">Hızlı Teklif</span>
                            <span className="text-xs text-zinc-500">Toptan fiyat al</span>
                        </Link>
                    </div>

                    <div className="pt-6">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-emerald-500 text-black font-semibold text-sm hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
                        >
                            <ArrowLeft className="w-4 h-4" /> Ana Sayfaya Dön
                        </Link>
                    </div>
                </div>
            </PageContainer>
        </PageShell>
    );
}
